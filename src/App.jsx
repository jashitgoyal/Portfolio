import "./App.css";
import Hero from "./Components/hero.jsx";
import Navbar from "./Components/navbar.jsx";
import Projects from "./Components/projects.jsx";
import AboutMe from "./Components/aboutme.jsx";
import Skills from "./Components/skills.jsx";
import Timeline from "./Components/Timeline.jsx";
import TestimonialCarousel from "./Components/TestimonialCarousel.jsx";
import ContactForm from "./Components/ContactForm.jsx";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function App() {
  const [customCursor, setCustomCursor] = useState("cursor");
  
  // Use motion values for smoother cursor tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Apply spring physics for ultra-smooth movement
  const springX = useSpring(cursorX, { 
    damping: 25, 
    stiffness: 700, 
    mass: 0.5 
  });
  const springY = useSpring(cursorY, { 
    damping: 25, 
    stiffness: 700, 
    mass: 0.5 
  });

  useEffect(() => {
    const mousemove = (e) => {
      const { clientX, clientY } = e;
      const offsetX = customCursor === "cursor" ? 16 : customCursor === "cursor-hero" ? 60 : 40;
      const offsetY = customCursor === "cursor" ? 16 : customCursor === "cursor-hero" ? 60 : 40;
      
      cursorX.set(clientX - offsetX);
      cursorY.set(clientY - offsetY);
    };

    window.addEventListener("mousemove", mousemove);
    return () => window.removeEventListener("mousemove", mousemove);
  }, [customCursor, cursorX, cursorY]);

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
      <Timeline />
      <TestimonialCarousel />
      <AboutMe />
      <ContactForm />
      <motion.div
        className={customCursor}
        style={{
          x: springX,
          y: springY,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 700,
          mass: 0.5
        }}
      >
        {customCursor === "cursor-project" && "Go to Project"}
      </motion.div>
    </ReactLenis>
  );
}

export default App;