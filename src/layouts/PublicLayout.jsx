import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground">
      {/* Background blobs for premium feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      <nav className="fixed w-full z-50 glass-panel border-b border-border px-6 py-4 rounded-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <FaGraduationCap className="text-primary text-3xl" />
            <span>Class<span className="text-secondary">Mind</span> AI</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          </div>
          <Link to="/login" className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all font-semibold border border-border">
            Login
          </Link>
        </div>
      </nav>

      <main className="flex-1 pt-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="border-t border-border py-8 z-10 bg-surface mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} ClassMind AI. The Invisible Classroom Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
