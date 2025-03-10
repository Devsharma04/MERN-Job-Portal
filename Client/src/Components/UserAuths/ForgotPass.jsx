import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import CursorAnimation from "../Animation/CursorAnimation";
function ForgotPass() {
  // const navigate = useNavigate();
  const [step, setStep] = useState("initial"); // initial loading otp newpassword
  const [email, setEmail] = useState(""); // Add this to store email
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    setEmail(data.email); // Store email when sending OTP

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}reset-password`,
        data
      );
      toast.success(response.data.message);
      setStep("loading");
      setTimeout(() => {
        setStep("otp");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handelVerifyOTP = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    console.log(data.OTP);

    // Include the stored email with the OTP
    const verificationData = {
      email: email,
      OTP: data.OTP,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}reset-password/`,
        verificationData
      );
      toast.success(response.data.message);
      // navigate("/reset-password");
      setStep("newpassword");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  const handelNewPassword = async (e) => {
    e.preventDefault();

    // const token = localStorage.getItem("authToken");
    // Include the stored email with the OTP

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}reset-password/`,
        { email: email, password: password },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <CursorAnimation />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md  z-10">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          {step === "otp" ? "Enter OTP" : "Forgot Password"}
        </h2>
        {step === "initial" && (
          <p className="mt-2 text-sm text-gray-500 text-center">
            Enter your email address to reset your password.
          </p>
        )}

        {step === "initial" && (
          <form onSubmit={handleSendOTP} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#7978e9] rounded-lg hover:bg-[#4b49ac] focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === "loading" && (
          <div className="flex justify-center items-center mt-6">
            <div className="loader border-t-2 border-blue-600 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}

        {step === "otp" && (
          <form className="mt-6" onSubmit={handelVerifyOTP}>
            <div className="mb-4">
              <label
                htmlFor="OTP"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                type="text"
                name="OTP"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Enter OTP"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#7978e9] rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === "newpassword" && (
          <form className="mt-6" onSubmit={handelNewPassword}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Enter new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#7978e9] rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              Confirm
            </button>
          </form>
        )}

        <div className="mt-4 text-sm text-center text-gray-500">
          <Link to="/login">
            <a className="text-blue-600 hover:underline">Back to Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
