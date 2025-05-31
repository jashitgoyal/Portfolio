import React from 'react';
import { motion } from 'framer-motion';

const technologies = {
  front: "React",
  back: "Node.js",
  right: "Python",
  left: "Java",
  top: "TypeScript",
  bottom: "MongoDB"
};

const TechStack = () => {
  return (
    <motion.div 
      className="tech-stack"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="cube">
        {Object.entries(technologies).map(([face, tech]) => (
          <div key={face} className={`cube-face ${face}`}>
            {tech}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechStack;