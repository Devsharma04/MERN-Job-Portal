import React, { useEffect } from "react";
import style from "./Cursor.module.css";
import { gsap } from "gsap";
function CursorAnimation() {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      gsap.to("#cursor", {
        x: clientX - 20 / 2,
        y: clientY - 20 / 2,
        duration: 2,
        delay: 0,
        ease: "elastic.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <>
      <div id="cursor" className={style.cursorani}></div>
    </>
  );
}

export default CursorAnimation;
