import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";
import { FaHome } from "react-icons/fa";
import { RiNewspaperFill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";

function Nav({ isNavOpen }) {
  const [color, setColor] = useState(1);

  return (
    <>
      <div className={isNavOpen ? style.Mobilecontainer : style.container}>
        {/*----------------- input style */}

        <div className="relative">
          {/*----------------- input style */}
          <Link to="/dashboard/home">
            <div
              className={`${color === 1 ? style.active : style.btn}`}
              onClick={() => setColor(1)}
            >
              <h1 className="flex items-center gap-8">
                {" "}
                <FaHome />
                Dashboard
              </h1>
            </div>
          </Link>
          <Link to="/dashboard/applications">
            <div
              className={color === 2 ? style.active : style.btn}
              onClick={() => setColor(2)}
            >
              <h1 className="flex items-center gap-8">
                {" "}
                <RiNewspaperFill />
                Applications
              </h1>
            </div>
          </Link>
          <Link to="/dashboard/profile">
            <div
              className={color === 3 ? style.active : style.btn}
              onClick={() => setColor(3)}
            >
              <h1 className="flex items-center gap-8">
                {" "}
                <ImProfile />
                Profile
              </h1>
            </div>
          </Link>
          {/* <Link to="/dashboard/settings">
            <div
              className={color === 4 ? style.active : style.btn}
              onClick={() => setColor(4)}
            >
              <h1 className="flex items-center gap-8">
                {" "}
                <IoSettings />
                Settings
              </h1>
            </div>
          </Link> */}
        </div>
        <div>
          <Link to="/dashboard/ContactUs">
            <div
              className={color === 5 ? style.active : style.btn}
              onClick={() => setColor(5)}
            >
              <h1 className="flex items-center gap-8">
                <BiSolidHelpCircle />
                Contact Us
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Nav;
