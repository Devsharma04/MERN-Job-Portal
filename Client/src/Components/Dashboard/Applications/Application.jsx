import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Application.module.css";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
function Application() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const getApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}applications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setApplications(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <motion.div
      className={style.container}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {loading && (
        <div className={style.loader}>
          <ClipLoader color="#4b49ac" size={60} />
        </div>
      )}
      <h2 className={style.heading}>Your Job Applications</h2>

      {applications.length === 0 ? (
        <div className={style.noApplications}>No Applications Found..</div>
      ) : (
        <div className={style.cardContainer}>
          {applications.map((app, index) => (
            <div key={index} className={style.card}>
              <h2 className={style.company}>{app.company}</h2>
              <h3 className={style.role}>{app.position}</h3>
              <p className={style.location}>
                <strong>Location:</strong> {app.location}
              </p>
              <p className={style.salary}>
                <strong>Salary:</strong> {app.Salary}
              </p>
              <p className={style.description}>{app.description}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Application;
