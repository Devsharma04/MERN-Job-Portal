import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Createdjobs.module.css";

function Createdjobs() {
  const [data, setData] = useState([]);
  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      const response = await axios.get(
        "http://localhost:3000/api/CreatedJobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching Jobs:", error);
    }
  };

  const deleteJob = async (jobId) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      await axios.delete(`http://localhost:3000/api/deletejob/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUserData();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className={style.container}>
      <h2 className={style.heading}>Jobs Created by You</h2>

      <div className={style.jobsList}>
        {data.map((job) => (
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
              <button>Applicants</button>
              <button onClick={() => deleteJob(job._id)}>Delete</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Createdjobs;
