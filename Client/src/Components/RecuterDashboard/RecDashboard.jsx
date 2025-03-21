import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import CursorAnimation from "../Animation/CursorAnimation";
import CreateJob from "./CreateJob/CreateJob";
import Nav from "./SideBar&Header/Nav";
import Header from "./SideBar&Header/Header";
import Createdjobs from "./CreatedJobs/Createdjobs";
import Profile from "./Profile/Profile";
import Contact from "../Contact Us/ContactUs";
function Dashboard() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex relative h-screen w-full overflow-hidden">
      <CursorAnimation />

      <Nav isNavOpen={isNavOpen} />
      <Header toggleNav={() => setIsNavOpen(!isNavOpen)} />

      <div className="flex-1">
        <Routes>
          <Route index element={<Createdjobs />} />
          <Route path="/CreateJob" element={<CreateJob />} />
          <Route path="/CreatedJobs" element={<Createdjobs />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ContactUs" element={<Contact />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
