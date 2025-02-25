import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Nav from "./Nav";
import CursorAnimation from "../CursorAnimation";
import Home from "./Home";
import Header from "./Header";
import Profile from "./Profile/Profile";
import Settings from "./Settings/Settings";
import Application from "./Applications/Application";

function Dashboard() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex relative h-screen w-full overflow-hidden">
      <CursorAnimation />

      <Nav isNavOpen={isNavOpen} />
      <Header toggleNav={() => setIsNavOpen(!isNavOpen)} />

      <div className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
