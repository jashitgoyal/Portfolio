import React, { useEffect } from "react";
import "../App.css"; // Importing the updated dark theme styles
import { gsap } from "gsap";

const Footer = () => {
  useEffect(() => {
    // Animation for footer entrance
    gsap.fromTo(
      ".footer-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">Get in Touch</h2>
        <ul className="footer-links">
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
        </ul>
        <div className="footer-buttons">
          <a
            href="/path/to/resume.pdf"
            download="Jashit_Goyal_Resume.pdf"
            className="footer-btn"
          >
            Download Resume
          </a>
          <a
            href="mailto:your_email@example.com"
            className="footer-btn footer-btn-alt"
          >
            Mail Me
          </a>
        </div>
        <p className="footer-credits">
          &copy; 2025 Jashit Goyal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
