import "./App.css";
import Hero from "./Components/hero.jsx";
import Navbar from "./Components/navbar.jsx";
import Projects from "./Components/projects.jsx";
import AboutMe from "./Components/aboutme.jsx";
import Skills from "./Components/skills.jsx";
import { ReactLenis, useLenis } from "lenis/react";
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

    return window.addEventListener("mousemove", mousemove);
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
    // setCursorVariant("text");
    setCustomCursor(cursor);
    console.log("entered");
  };

  const textLeave = () => {
    // setCursorVariant("default");
    setCustomCursor("cursor");
    console.log("left");
  };

  return (
    <ReactLenis root>
      <Navbar></Navbar>
      <Hero
      // onPointerEnter={() => textEnter("cursor-hero")}
      // onPointerLeave={textLeave}
      ></Hero>
      <Skills></Skills>
      <Projects
        onPointerEnter={() => textEnter("cursor-skills")}
        onPointerLeave={textLeave}
      ></Projects>
      <AboutMe></AboutMe>
      <motion.div
        className={customCursor}
        variants={variants}
        animate={cursorVariant}
      ></motion.div>
    </ReactLenis>
  );
}

export default App;
