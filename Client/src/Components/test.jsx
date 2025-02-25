import React from "react";
import axios from "axios";
function test() {
  axios.defaults.withCredentials = true;
  const handeltest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/testing");
      // console.log(response.headers);
      const token = response.headers["authorization"].split("Bearer ")[1];
      localStorage.setItem("authToken", token);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen
    w-full"
    >
      <button onClick={handeltest}>test</button>
    </div>
  );
}

export default test;
