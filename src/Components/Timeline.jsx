import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import HoverDistortion from './HoverDistortion';

const timelineData = [
  {
    year: '2024',
    title: 'Full Stack Developer',
    company: 'Tech Company',
    description: 'Leading development of modern web applications using React and Node.js',
    type: 'work'
  },
  {
    year: '2023',
    title: 'Computer Science Degree',
    company: 'University Name',
    description: 'Graduated with honors, specializing in software engineering',
    type: 'education'
  },
  {
    year: '2022',
    title: 'Frontend Developer Intern',
    company: 'Startup Inc.',
    description: 'Built responsive web interfaces and improved user experience',
    type: 'work'
  },
  {
    year: '2021',
    title: 'First Open Source Contribution',
    company: 'GitHub',
    description: 'Started contributing to open source projects and building portfolio',
    type: 'milestone'
  }
];

const Timeline = () => {
  return (
    <section className="timeline-section">
      <div className="timeline-container">
        <TextReveal className="timeline-title" delay={0.2}>
          My Journey
        </TextReveal>
        
        <div className="timeline">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${item.type}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              <HoverDistortion>
                <div className="timeline-content">
                  <motion.div
                    className="timeline-year"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {item.year}
                  </motion.div>
                  <motion.h3
                    className="timeline-item-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.h4
                    className="timeline-company"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {item.company}
                  </motion.h4>
                  <motion.p
                    className="timeline-description"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    viewport={{ once: true }}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </HoverDistortion>
              <motion.div
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;