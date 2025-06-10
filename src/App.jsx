import "./App.css";
import Hero from "./Components/hero.jsx";
import Navbar from "./Components/navbar.jsx";
import Projects from "./Components/projects.jsx";
import AboutMe from "./Components/aboutme.jsx";
import InteractiveSkillBars from "./Components/InteractiveSkillBars.jsx";
import Timeline from "./Components/Timeline.jsx";
import TestimonialCarousel from "./Components/TestimonialCarousel.jsx";
import ContactForm from "./Components/ContactForm.jsx";
import MorphingShapes from "./Components/MorphingShapes.jsx";
import FloatingElements from "./Components/FloatingElements.jsx";
import PageTransition, { SectionTransition } from "./Components/PageTransition.jsx";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function App() {
  const [customCursor, setCustomCursor] = useState("cursor");
  
  // Use motion values for ultra-smooth cursor tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Apply enhanced spring physics for buttery smooth movement
  const springX = useSpring(cursorX, { 
    damping: 30, 
    stiffness: 800, 
    mass: 0.3 
  });
  const springY = useSpring(cursorY, { 
    damping: 30, 
    stiffness: 800, 
    mass: 0.3 
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
      <PageTransition>
        <FloatingElements />
        <MorphingShapes />
        
        <Navbar />
        
        <SectionTransition>
          <Hero
            onPointerEnter={() => textEnter("cursor-hero")}
            onPointerLeave={textLeave}
          />
        </SectionTransition>
        
        <SectionTransition delay={0.2}>
          <InteractiveSkillBars />
        </SectionTransition>
        
        <SectionTransition delay={0.3}>
          <Projects
            onPointerEnter={() => textEnter("cursor-project")}
            onPointerLeave={textLeave}
          />
        </SectionTransition>
        
        <SectionTransition delay={0.4}>
          <Timeline />
        </SectionTransition>
        
        <SectionTransition delay={0.5}>
          <TestimonialCarousel />
        </SectionTransition>
        
        <SectionTransition delay={0.6}>
          <AboutMe />
        </SectionTransition>
        
        <SectionTransition delay={0.7}>
          <ContactForm />
        </SectionTransition>
        
        <motion.div
          className={customCursor}
          style={{
            x: springX,
            y: springY,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 800,
            mass: 0.3
          }}
        >
          {customCursor === "cursor-project" && "Go to Project"}
        </motion.div>
      </PageTransition>
    </ReactLenis>
  );
}

export default App;