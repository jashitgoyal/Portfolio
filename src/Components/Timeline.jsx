import React from 'react';
import { motion } from 'framer-motion';

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
        <motion.h2
          className="timeline-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My Journey
        </motion.h2>
        
        <div className="timeline">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${item.type}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h3 className="timeline-item-title">{item.title}</h3>
                <h4 className="timeline-company">{item.company}</h4>
                <p className="timeline-description">{item.description}</p>
              </div>
              <div className="timeline-dot"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;