import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', icon: Icon }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30",
    secondary: "bg-surface text-foreground hover:bg-surfaceLight border border-border",
    outline: "bg-transparent text-foreground border border-primary hover:bg-primary/10",
    danger: "bg-danger/20 text-danger hover:bg-danger/30 border border-danger/50"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon && <Icon className="text-xl" />}
      {children}
    </motion.button>
  );
};

export default Button;
