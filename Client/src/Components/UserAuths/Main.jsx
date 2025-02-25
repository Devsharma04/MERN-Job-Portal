import style from "../../Css/UserAuths/Main.module.css";
import logos from "../../assets/logos.js";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import { Route, Routes } from "react-router-dom";
const SignUpPage = () => {
  return (
    <div className={style.container}>
      {/* First wrapper */}
      <div className={style.wrapper}>
        <div className={`${style.item} ${style.item1}`}>
          <img src={logos.google} alt="" />
        </div>
        <div className={`${style.item} ${style.item2}`}>
          <img src={logos.wipro} alt="" width={"60%"} />
        </div>
        <div className={`${style.item} ${style.item3}`}>
          <img src={logos.accenture} alt="" />
        </div>
        <div className={`${style.item} ${style.item4}`}>
          <img src={logos.microsoft} alt="" />
        </div>
        <div className={`${style.item} ${style.item5}`}>
          <img src={logos.hcl} alt="" />
        </div>
        <div className={`${style.item} ${style.item6}`}>
          <img src={logos.capgemini} alt="" />
        </div>
        <div className={`${style.item} ${style.item7}`}>
          <img src={logos.cognizant} alt="" />
        </div>
      </div>

      {/* Sign-up and signin form section */}
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      {/* Second wrapper */}
      <div className={style.wrapper}>
        <div className={`${style.item} ${style.item1}`}>
          <img src={logos.infosys} alt="" />
        </div>
        <div className={`${style.item} ${style.item2}`}>
          <img src={logos.intel} alt="" width={"60%"} />
        </div>
        <div className={`${style.item} ${style.item3}`}>
          <img src={logos.jio} alt="" width={"70%"} />
        </div>
        <div className={`${style.item} ${style.item4}`}>
          <img src={logos.swiggy} alt="" />
        </div>
        <div className={`${style.item} ${style.item5}`}>
          <img src={logos.tatamotors} alt="" width={"80%"} />
        </div>
        <div className={`${style.item} ${style.item6}`}>
          <img src={logos.techmahindra} alt="" />
        </div>
        <div className={`${style.item} ${style.item7}`}>
          <img src={logos.zomato} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
