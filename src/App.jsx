import "./App.css";
import Footer from "./Components/footer.jsx";
import Hero from "./Components/hero.jsx";
import Navbar from "./Components/navbar.jsx";
import Projects from "./Components/projects.jsx";
import AboutMe from "./Components/aboutme.jsx";
import Skills from "./Components/skills.jsx";
import { ReactLenis, useLenis } from "lenis/react";

function App() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });
  return (
    <ReactLenis root>
      <Navbar></Navbar>
      <Hero></Hero>
      <Skills></Skills>
      <Projects></Projects>
      <AboutMe></AboutMe>
    </ReactLenis>
  );
}

export default App;
