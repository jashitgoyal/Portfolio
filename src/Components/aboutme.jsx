import React from "react";
import { motion } from "framer-motion";
import "../App.css";

function AboutMe() {
  return (
    <section className="about-me-section">
      <motion.div
        className="about-me-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 80 }}
      >
        <motion.h2
          className="greeting"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Hey there! 👋
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          I'm <span className="highlight">Jashit</span>, a curious developer
          with a passion for turning ideas into reality. Whether it's coding
          websites, creating cool tech, or diving into Java, I’m always up for
          the challenge!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          When I'm not working on tech, you can catch me with a cup of chai ☕,
          listening to music 🎶, or brainstorming my next big idea 💡.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Let's create something amazing together! 🚀
        </motion.p>

        <motion.div
          className="social-links"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a
            href="https://github.com/jashit"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jashit/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/jashit"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            Twitter
          </a>
        </motion.div>

        <motion.a
          href="/resume.pdf" // Link to your resume (make sure to replace with the actual path)
          download
          className="download-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Download Resume
        </motion.a>
      </motion.div>
    </section>
  );
}

export default AboutMe;
