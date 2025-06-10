import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedButton = ({ children, onClick, className, variant = 'primary' }) => {
  return (
    <motion.button
      className={`animated-button ${variant} ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ 
        scale: 0.95,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.span
        initial={{ y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export const AnimatedInput = ({ placeholder, type = 'text', ...props }) => {
  return (
    <motion.div className="animated-input-container">
      <motion.input
        type={type}
        placeholder={placeholder}
        className="animated-input"
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 0 3px rgba(0, 109, 119, 0.1)"
        }}
        transition={{ duration: 0.2 }}
        {...props}
      />
    </motion.div>
  );
};

export const AnimatedIcon = ({ children, className }) => {
  return (
    <motion.div
      className={`animated-icon ${className}`}
      whileHover={{
        rotate: 360,
        scale: 1.2
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default { AnimatedButton, AnimatedInput, AnimatedIcon };