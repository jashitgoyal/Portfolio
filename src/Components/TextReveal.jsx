import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitType from 'split-type';

const TextReveal = ({ children, className, delay = 0, stagger = 0.05 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (ref.current && isInView) {
      const splitText = new SplitType(ref.current, { types: 'words,chars' });
      
      splitText.chars?.forEach((char, index) => {
        char.style.display = 'inline-block';
        char.style.opacity = '0';
        char.style.transform = 'translateY(100px)';
        char.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay + index * stagger}s`;
        
        setTimeout(() => {
          char.style.opacity = '1';
          char.style.transform = 'translateY(0px)';
        }, 100);
      });
    }
  }, [isInView, delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default TextReveal;