import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Context/UserDetailContext";
import style from "./Home.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoLocationSharp } from "react-icons/io5";
import SyncLoader from "react-spinners/SyncLoader";
function Home() {
  const { data, search, Jobs, getAllJobs, appliedJobs, getApplications } =
    useContext(UserContext);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getApplications();
    getAllJobs();
  }, []);

  const applyJob = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}apply/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      toast.success(response.data.message);
      await getAllJobs();
      getApplications();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  const filteredJobs = Jobs.filter(
    (job) =>
      job.position?.toLowerCase().includes(search) ||
      job.company?.toLowerCase().includes(search)
  );
  const jobToDisplay = filteredJobs.length > 0 ? filteredJobs : Jobs;

  return (
    <motion.div
      className={style.container}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {loading && (
        <div className={style.loader}>
          <SyncLoader color="#4b49ac" size={15} />
        </div>
      )}
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
