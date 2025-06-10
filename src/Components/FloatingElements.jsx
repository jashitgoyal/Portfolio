import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { id: 1, size: 60, delay: 0 },
    { id: 2, size: 40, delay: 1 },
    { id: 3, size: 80, delay: 2 },
    { id: 4, size: 30, delay: 0.5 },
    { id: 5, size: 50, delay: 1.5 }
  ];

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="floating-element"
          style={{
            width: element.size,
            height: element.size,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;