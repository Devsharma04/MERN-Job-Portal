import style from "../../Css/UserAuths/SignInUp.module.css";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserDetailContext";
import Jobdekho from "../../assets/JobDekho.mp4";
import { Link, useNavigate } from "react-router-dom";
import CursorAnimation from "../Animation/CursorAnimation";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { fetchUserData } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handelLogin = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data
      );
      console.log("form submitted");
      const token = response.headers["authorization"].split("Bearer ")[1];
      localStorage.setItem("authToken", token);
      fetchUserData();
      navigate(response.data.redirect);
    } catch (error) {
      console.log("error in handel submit", error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className={style.container}>
      <CursorAnimation />
      <div className={style.videoContainer}>
        <video src={Jobdekho} autoPlay loop muted></video>
        <p>
          Welcome to JobDekho, your gateway to endless career opportunities!
          Whether you're seeking your dream job or the perfect candidate, we’re
          here to connect talent with the right opportunities.
        </p>
      </div>
      <div className={style.form}>
        <form onSubmit={handelLogin}>
          <div className={style.group2}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" required />
          </div>

          <div className={style.group3}>
            <label htmlFor="loginpassword">Password</label>
            <div className={style.pass}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="loginpassword"
                placeholder="Password"
                required
              />
              {isPasswordVisible ? (
                <IoMdEye
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <PiEyeClosedDuotone
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>

          <button className={style.btn} type="submit">
            Login
          </button>

          <Link to="/ForgotPass">
            {" "}
            <p className={style.glow}>Forget Password ?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
