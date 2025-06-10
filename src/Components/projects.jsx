import React from "react";
import { motion } from "framer-motion";
import HoverDistortion from "./HoverDistortion";
import TextReveal from "./TextReveal";
import ParallaxElement from "./ParallaxElement";
import "../App.css";

const projectData = [
  {
    title: "Project 1",
    description: "A cool project that looks like a mini webpage!",
    url: "https://project1.com"
  },
  {
    title: "Project 2",
    description: "Another amazing project with great features!",
    url: "https://project2.com"
  },
  {
    title: "Project 3",
    description: "An innovative solution for modern problems",
    url: "https://project3.com"
  },
  {
    title: "Project 4",
    description: "Pushing the boundaries of web development",
    url: "https://project4.com"
  },
  {
    title: "Project 5",
    description: "Creating seamless user experiences",
    url: "https://project5.com"
  },
  {
    title: "Project 6",
    description: "Revolutionary tech solutions",
    url: "https://project6.com"
  }
];

function Projects(props) {
  const handleProjectClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="projects-div">
      <ParallaxElement speed={0.3}>
        <TextReveal className="projects-heading" delay={0.2}>
          Projects
        </TextReveal>
      </ParallaxElement>
      
      <motion.div
        className="project-grid"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {projectData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotateY: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
          >
            <HoverDistortion>
              <div
                className="project-card"
                onClick={() => handleProjectClick(project.url)}
                onPointerEnter={() => props.onPointerEnter("cursor-project")}
                onPointerLeave={props.onPointerLeave}
              >
                <div className="top-bar">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="content">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>
                </div>
              </div>
            </HoverDistortion>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Projects;