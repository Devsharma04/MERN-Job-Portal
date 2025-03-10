import React from "react";
import axios from "axios";
import style from "./Role.module.css";
import CursorAnimation from "../Animation/CursorAnimation";
import Jobdekho from "../../assets/JobDekho.mp4";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Role() {
  const navigate = useNavigate();
  const handelonclick = async (role) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      navigate(response.data.redirect);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <>
      <CursorAnimation />
      <div className={style.videoContainer}>
        <video src={Jobdekho} autoPlay loop muted></video>
      </div>
      <div className={style.role}>
        <div className={style.left}>
          <p>
            Ready to find your next opportunity? Explore a wide range of jobs
            tailored to your skills and interests. Let's get you hired!
          </p>
          <button
            onClick={() => handelonclick("Job Seaker")}
            className={style.button}
          >
            Looking For Jobs
          </button>
        </div>

        <div className={style.right}>
          <p>
            Looking for the perfect candidate? Post your job openings and
            connect with top talent. Your next team member is just a click away!
          </p>
          <button
            onClick={() => handelonclick("Recuiter")}
            className={style.button}
          >
            Looking For Candidate
          </button>
        </div>
      </div>
    </>
  );
}

export default Role;
