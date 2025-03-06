import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Context/UserDetailContext";
import style from "./Home.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoLocationSharp } from "react-icons/io5";

function Home() {
  const { data, search } = useContext(UserContext);
  const [Jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/alljobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setJobs(response.data.getData);
      setAppliedJobs(response.data.appliedJobs);
    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/apply/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      toast.success(response.data.message);
      getAllJobs();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const filteredJobs = Jobs.filter(
    (job) =>
      job.position?.toLowerCase().includes(search) ||
      job.company?.toLowerCase().includes(search)
  );
  const jobToDisplay = filteredJobs.length > 0 ? filteredJobs : Jobs;

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <motion.div
      className={style.container}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className={style.heading}>
        <h1>Hi, {data.fname}!</h1>
        <p>
          Here are your top job recommendations based on your profile and goals
        </p>
      </div>

      <div className={style.cardContainer}>
        {jobToDisplay.length === 0 ? (
          <p className={style.noJobs}>No jobs are currently available</p>
        ) : (
          jobToDisplay.map((details, index) => (
            <div key={index} className={style.card}>
              <h1 className={style.title}>{details.position}</h1>
              <h2 className={style.company}>{details.company}</h2>
              <p className={style.location}>
                <span>
                  <IoLocationSharp />
                </span>
                {details.location}
              </p>
              <h4 className={style.salary}> Salary: ₹ {details.Salary}</h4>
              <p className={style.description}>{details.description}</p>
              {appliedJobs.includes(details._id) ? (
                <button className={style.appliedBtn}>Applied</button>
              ) : (
                <button
                  className={style.applyBtn}
                  onClick={() => applyJob(details._id)}
                >
                  Apply Now
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Home;
