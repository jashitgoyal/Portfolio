import "./App.css";
import Hero from "./Components/hero.jsx";
import Navbar from "./Components/navbar.jsx";
import Projects from "./Components/projects.jsx";
import AboutMe from "./Components/aboutme.jsx";
import Skills from "./Components/skills.jsx";
import TechStack from "./Components/TechStack.jsx";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const cursorX = useSpring(0, { damping: 10, stiffness: 500 }); // Increased stiffness even more
  const cursorY = useSpring(0, { damping: 10, stiffness: 500 }); // Reduced damping for snappier response

  const [customCursor, setCustomCursor] = useState("cursor");

  useEffect(() => {
    const mousemove = (e) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX - (customCursor === "cursor" ? 16 : customCursor === "cursor-hero" ? 60 : 40));
      cursorY.set(clientY - (customCursor === "cursor" ? 16 : customCursor === "cursor-hero" ? 60 : 40));
    };

    window.addEventListener("mousemove", mousemove);
    return () => window.removeEventListener("mousemove", mousemove);
  }, [customCursor]);

  const textEnter = (cursor) => {
    setCustomCursor(cursor);
  };

  const textLeave = () => {
    setCustomCursor("cursor");
  };

  return (
    <ReactLenis root>
      <Navbar />
      <Hero
        onPointerEnter={() => textEnter("cursor-hero")}
        onPointerLeave={textLeave}
      />
      <Skills />
      <Projects
        onPointerEnter={() => textEnter("cursor-project")}
        onPointerLeave={textLeave}
      />
      <TechStack />
      <AboutMe />
      <motion.div
        className={customCursor}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {customCursor === "cursor-project" && "Go to Project"}
      </motion.div>
    </ReactLenis>
  );
}

export default App;