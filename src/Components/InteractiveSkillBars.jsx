import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillsData = [
  { name: 'JavaScript', level: 90, color: '#F7DF1E' },
  { name: 'React', level: 85, color: '#61DAFB' },
  { name: 'Node.js', level: 80, color: '#68A063' },
  { name: 'Python', level: 75, color: '#306998' },
  { name: 'Java', level: 70, color: '#ED8B00' },
  { name: 'C++', level: 65, color: '#00599C' }
];

const SkillBar = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="skill-bar-container"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percentage">{skill.level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const InteractiveSkillBars = () => {
  return (
    <div className="interactive-skills-section">
      <motion.h2
        className="skills-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Technical Skills
      </motion.h2>
      <div className="skills-container">
        {skillsData.map((skill, index) => (
          <SkillBar key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

export default InteractiveSkillBars;