import axios from "axios";
import { useEffect, useContext, useState } from "react";
import style from "./createdjobs.module.css";
import { UserContext } from "../../../Context/UserDetailContext";
import Applicants from "../Applicants/Applicants";
import { motion } from "framer-motion";
function Createdjobs() {
  const { jobData, fetchJobData, search } = useContext(UserContext);
  const [Modal, setModal] = useState(false);
  const [applicant, setApplicants] = useState([]);

  const deleteJob = async (jobId) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}deletejob/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUserData();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  useEffect(() => {
    fetchJobData();
  }, []);

  const filteredJobs = jobData.filter(
    (job) =>
      job.position?.toLowerCase().includes(search) ||
      job.company?.toLowerCase().includes(search)
  );
  const jobToDisplay = filteredJobs.length > 0 ? filteredJobs : jobData;

  return (
    <motion.div
      className={style.container}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <h2 className={style.heading}>Jobs Created by You</h2>

      <div className={style.jobsList}>
        {jobToDisplay.map((job) => (
          <div key={job._id} className={style.jobCard}>
            <h3> {job.position}</h3>

            <p>
              <strong>Company:</strong>
              {job.company}
            </p>
            <p>
              <strong>Salary:</strong>
              {job.Salary}
            </p>
            <p>
              <strong>Location:</strong>
              {job.location}
            </p>
            <p className={style.description}>
              <strong>description:</strong>
              {job.description}
            </p>
            <p>
              <button
                onClick={() => {
                  setApplicants(job.applicants);
                  setModal(true);
                }}
              >
                Applicants {job.applicants?.length}
              </button>
              <button onClick={() => deleteJob(job._id)}>Delete</button>
            </p>
          </div>
        ))}
      </div>
      {Modal && <Applicants setModal={setModal} applicant={applicant} />}
    </motion.div>
  );
}

export default Createdjobs;
