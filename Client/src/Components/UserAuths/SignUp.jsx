import React, { useState } from "react";
import Jobdekho from "../../assets/JobDekho.mp4";
import style from "./SignInUp.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CursorAnimation from "../Animation/CursorAnimation";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { IoMdEye } from "react-icons/io";
import SyncLoader from "react-spinners/SyncLoader";
function Main() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handelformsubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}signup`,
        data
      );
      toast.success(response.data.message);
      e.target.reset();
    } catch (error) {
      console.log("error in handel submit", error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={style.container}>
      {loading && (
        <div className={style.loader}>
          <SyncLoader color="#4b49ac" size={15} />
        </div>
      )}
      <CursorAnimation />
      <div className={style.videoContainer}>
        <video src={Jobdekho} autoPlay loop muted></video>
        <p>
          Welcome to JobDekho, your gateway to endless career opportunities!
          Whether you're seeking your dream job or the perfect candidate, we’re
          here to connect talent with the right opportunities.
        </p>
      </div>
      <div className={style.form}>
        <form onSubmit={handelformsubmit}>
          <div className={style.group}>
            <div className={style.group2}>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                required
              />
            </div>
            <div className={style.group2}>
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className={style.group2}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className={style.group2}>
            <label htmlFor="phone">Phone</label>
            <input type="phone" name="phone" placeholder="Phone" required />
          </div>
          <div className={style.group3}>
            <label htmlFor="password">Password</label>
            <div className={style.pass}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              {isPasswordVisible ? (
                <IoMdEye
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <PiEyeClosedDuotone
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>
          <button className={style.btn} type="submit">
            Register
          </button>

          <p>
            Already have an account ?{" "}
            <Link to="/login">
              {" "}
              <span className={style.glow}>Log in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Main;
