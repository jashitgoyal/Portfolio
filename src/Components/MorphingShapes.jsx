import React from 'react';
import { motion } from 'framer-motion';

const MorphingShapes = () => {
  return (
    <div className="morphing-shapes">
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="morphing-shape shape-1"
        animate={{
          d: [
            "M100,20 Q180,100 100,180 Q20,100 100,20",
            "M100,40 Q160,100 100,160 Q40,100 100,40",
            "M100,20 Q180,100 100,180 Q20,100 100,20"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.path
          fill="rgba(0, 109, 119, 0.1)"
          d="M100,20 Q180,100 100,180 Q20,100 100,20"
        />
      </motion.svg>

      <motion.div
        className="floating-circle"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="floating-square"
        animate={{
          x: [0, 30, 0],
          rotate: [0, 90, 0],
          borderRadius: ["0%", "50%", "0%"]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default MorphingShapes;