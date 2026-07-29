const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./src').filter(file => file.endsWith('.jsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace dark mode classes with theme-agnostic / light mode classes
  content = content.replace(/text-white/g, 'text-foreground');
  content = content.replace(/text-gray-300/g, 'text-gray-600');
  content = content.replace(/text-gray-400/g, 'text-muted');
  content = content.replace(/text-gray-500/g, 'text-muted');
  
  content = content.replace(/border-white\/10/g, 'border-border');
  content = content.replace(/border-white\/5/g, 'border-border');
  content = content.replace(/border-white\/20/g, 'border-border');
  
  content = content.replace(/bg-white\/5/g, 'bg-gray-50');
  content = content.replace(/bg-white\/10/g, 'bg-gray-100');
  content = content.replace(/bg-white\/20/g, 'bg-gray-200');
  
  content = content.replace(/bg-surface\/50/g, 'bg-surface');
  content = content.replace(/bg-surface\/40/g, 'bg-surface');
  content = content.replace(/bg-surface\/60/g, 'bg-surface');
  content = content.replace(/bg-surface\/30/g, 'bg-surface');
  
  content = content.replace(/bg-background/g, 'bg-background');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
