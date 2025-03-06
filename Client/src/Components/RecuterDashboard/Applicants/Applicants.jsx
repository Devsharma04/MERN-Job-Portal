import React, { useState } from "react";
import style from "./applicants.module.css";
import { FaWpforms } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
function Applicants({ applicant, setModal }) {
  const [expandedApplicant, setExpandedApplicant] = useState(null);

  const toggleExpand = (id) => {
    setExpandedApplicant(expandedApplicant === id ? null : id);
  };

  return (
    <div className={style.modalback} onClick={() => setModal(false)}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <h2 className={style.heading}>
          <FaWpforms />
        </h2>
        <ul className={style.list}>
          {applicant.map((app) => (
            <li key={app._id} className={style.applicantCard}>
              <div
                className={style.applicantHeader}
                onClick={() => toggleExpand(app._id)}
              >
                <div>
                  <strong>Name:</strong>{" "}
                  <span>
                    {app.fname} {app.lname}
                  </span>
                </div>
                <button className={style.toggleButton}>
                  {expandedApplicant === app._id ? (
                    <FaAngleUp />
                  ) : (
                    <FaAngleDown />
                  )}
                </button>
              </div>

              {expandedApplicant === app._id && (
                <div className={style.applicantDetails}>
                  <p>
                    <strong>Email:</strong> <span>{app.email}</span>
                  </p>
                  <p>
                    <strong>Phone:</strong> <span>{app.phone}</span>
                  </p>
                  <p>
                    <strong>Skills:</strong>
                    <span> {app.profile?.skills?.join(", ")}</span>
                  </p>
                  {app.profile?.resume && (
                    <p>
                      <strong>Resume:</strong>{" "}
                      <a
                        href={app.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Applicants;
