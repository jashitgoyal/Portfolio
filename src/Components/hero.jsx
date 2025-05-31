import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import "../App.css";

const Hero = (props) => {
  useEffect(() => {
    const text = new SplitType(".stagger-text", { types: "chars" });
    let chars = text.chars;
    gsap.from(chars, {
      duration: 0.5,
      ease: "back.out",
      y: 100,
      opacity: 0,
      stagger: 0.05,
    });

    gsap.to(".hero-text-3", {
      duration: 1,
      opacity: 0.4,
      y: -250,
    });
    gsap.to(".hero-text-4", {
      duration: 1,
      opacity: 0.2,
      y: -500,
    });
  }, []);

  return (
    <div className="hero-div">
      <div 
        className="hero-text"
        onPointerEnter={() => props.onPointerEnter("cursor-hero")}
        onPointerLeave={props.onPointerLeave}
      >
        <div className="stagger-text hero-text-1">Hey I'm</div>
        <div className="stagger-text hero-text-2">Jashit</div>
        <div className="stagger-text hero-text-3">Jashit</div>
        <div className="stagger-text hero-text-4">Jashit</div>
      </div>
    </div>
  );
};

export default Hero;