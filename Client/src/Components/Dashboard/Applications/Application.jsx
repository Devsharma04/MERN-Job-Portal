import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Application.module.css";

function Application() {
  const [applications, setApplications] = useState([]);

  const getApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/applications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setApplications(response.data);
      console.log(applications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className={style.container}>
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
    </div>
  );
}

export default Application;
