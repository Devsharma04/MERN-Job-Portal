import style from "./SignInUp.module.css";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserDetailContext";
import Jobdekho from "../../assets/JobDekho.mp4";
import { Link, useNavigate } from "react-router-dom";
import CursorAnimation from "../Animation/CursorAnimation";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchUserData } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}login`,
        data
      );
      console.log("form submitted");
      const token = response.headers["authorization"].split("Bearer ")[1];
      localStorage.setItem("authToken", token);
      fetchUserData();
      navigate(response.data.redirect);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={style.container}>
      {loading && (
        <div className={style.loader}>
          <SyncLoader color="#4b49ac" size={15} />
        </div>
      )}
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

          <p>
            Don't have an account ?{" "}
            <Link to="/" className={style.glow}>
              {" "}
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
