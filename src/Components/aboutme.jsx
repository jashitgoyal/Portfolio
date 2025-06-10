import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import TextReveal from "./TextReveal";
import HoverDistortion from "./HoverDistortion";
import { AnimatedIcon } from "./MicroInteractions";
import "../App.css";

function AboutMe() {
  return (
    <section className="about-me-section">
      <HoverDistortion className="about-me-container">
        <TextReveal className="greeting" delay={0.2}>
          Hey there! 👋
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          I'm <span className="highlight">Jashit</span>, a curious developer
          with a passion for turning ideas into reality. Whether it's coding
          websites, creating cool tech, or diving into Java, I'm always up for
          the challenge!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          When I'm not working on tech, you can catch me with a cup of chai{" "}
          <AnimatedIcon>☕</AnimatedIcon>, listening to music{" "}
          <AnimatedIcon>🎶</AnimatedIcon>, or brainstorming my next big idea{" "}
          <AnimatedIcon>💡</AnimatedIcon>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          Let's create something amazing together! 🚀
        </motion.p>

        <motion.div
          className="social-links"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <MagneticButton>
            <a
              href="https://github.com/jashit"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              GitHub
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://www.linkedin.com/in/jashit/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              LinkedIn
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://twitter.com/jashit"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              Twitter
            </a>
          </MagneticButton>
        </motion.div>

        <MagneticButton>
          <motion.a
            href="/resume.pdf"
            download
            className="download-button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            Download Resume
          </motion.a>
        </MagneticButton>
      </HoverDistortion>
    </section>
  );
}

export default AboutMe;