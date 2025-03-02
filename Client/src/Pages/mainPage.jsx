import React from "react";
import style from "./mainPage.module.css";
import JobDekho from "../assets/JobDekho.mp4";
import Parallax from "../Components/Animation/Parallax.jsx";
function Home() {
  return (
    <>
      <Parallax />
      <nav className={style.nav}>
        <div>
          <video
            autoPlay
            loop
            muted
            src={JobDekho}
            className="w-[10rem]"
          ></video>
        </div>
        <div>
          <h4 curs>Pricing</h4>
          <h4>About Us</h4>
        </div>
        <div>
          <h4>Login</h4>
          <h4>Sign Up</h4>
        </div>
      </nav>
    </>
  );
}

export default Home;
