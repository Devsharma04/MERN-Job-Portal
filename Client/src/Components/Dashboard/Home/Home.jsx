import React, { useContext } from "react";
import { UserContext } from "../../../Context/UserDetailContext";
import style from "./Home.module.css";
import Jobs from "../Jobs.json";

function Home() {
  const { data } = useContext(UserContext);

  return (
    <div className={style.container}>
      <div className={style.heading}>
        <h1>Hi, {data.fname}!</h1>
        <p>
          Here are your top job recommendations based on your profile and goals
        </p>
      </div>
      <div className={style.cardcontainer}>
        {Jobs.map((details, index) => {
          return (
            <div key={index} className={style.cards}>
              <h1 className={style.title}>{details.title}</h1>
              <h2 className={style.company}>{details.company}</h2>
              <p className={style.location}>{details.location}</p>
              <h4 className={style.salary}>{details.salary}</h4>
              <button className={style.applyBtn}>Apply Now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
