import "./App.css";
import Hero from "./Components/hero.jsx";
import Navbar from "./Components/navbar.jsx";
import Projects from "./Components/projects.jsx";
import AboutMe from "./Components/aboutme.jsx";
import Skills from "./Components/skills.jsx";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [cursorVariant, setCursorVariant] = useState("default");
  const [customCursor, setCustomCursor] = useState("cursor");

  useEffect(() => {
    const mousemove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mousemove);

    return () => window.removeEventListener("mousemove", mousemove);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
    },
  };

  const textEnter = (cursor) => {
    setCustomCursor(cursor);
  };

  const textLeave = () => {
    setCustomCursor("cursor");
  };

  return (
    <ReactLenis root>
      <Navbar></Navbar>
      <Hero
        onPointerEnter={textEnter}
        onPointerLeave={textLeave}
      ></Hero>
      <Skills></Skills>
      <Projects
        onPointerEnter={textEnter}
        onPointerLeave={textLeave}
      ></Projects>
      <AboutMe></AboutMe>
      <motion.div
        className={customCursor}
        variants={variants}
        animate={cursorVariant}
      >
        {customCursor === "cursor-project" && "Go to Project"}
      </motion.div>
    </ReactLenis>
  );
}

export default App;