import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ width = '100%', height = '20px', className = '' }) => {
  return (
    <motion.div
      className={`loading-skeleton ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <LoadingSkeleton height="200px" className="skeleton-image" />
      <div className="skeleton-content">
        <LoadingSkeleton height="24px" width="80%" />
        <LoadingSkeleton height="16px" width="60%" />
        <LoadingSkeleton height="16px" width="90%" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;