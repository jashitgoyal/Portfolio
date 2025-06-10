import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="floating-elements">
      <motion.div
        className="floating-element element-1"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="floating-element element-2"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />
      <motion.div
        className="floating-element element-3"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
};

export default FloatingElements;