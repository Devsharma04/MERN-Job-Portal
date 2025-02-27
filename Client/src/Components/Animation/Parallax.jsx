import React, { useEffect, useRef } from "react";
import logos from "../assets/logos";
import Style from "./Parallax.module.css";

function Parallax() {
  const layerRef = useRef(null);
  const sFront = 150;
  let animationFrame;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!layerRef.current) return; // Prevent errors if ref is null

      const x = (e.clientX - window.innerWidth / 2) / sFront;
      const y = (e.clientY - window.innerHeight / 2) / sFront;

      // Use requestAnimationFrame for smoother animation
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        layerRef.current.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className={Style.container}>
      <div ref={layerRef} className={Style.layer}>
        <img src={logos.wipro} alt="" />
        <img src={logos.google} alt="" />
        <img src={logos.accenture} alt="" />
        <img src={logos.microsoft} alt="" />
        <img src={logos.hcl} alt="" />
        <img src={logos.capgemini} alt="" />
        <img src={logos.cognizant} alt="" />
        <img src={logos.infosys} alt="" />
        <img src={logos.intel} alt="" />
        <img src={logos.swiggy} alt="" />
        <img src={logos.tatamotors} alt="" />
        <img src={logos.techmahindra} alt="" />
        <img src={logos.zomato} alt="" />
        <img src={logos.jio} alt="" />
      </div>
    </div>
  );
}

export default Parallax;
