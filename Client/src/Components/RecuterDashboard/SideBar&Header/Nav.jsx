import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";
import { FaHome } from "react-icons/fa";
import { RiNewspaperFill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
function Nav({ isNavOpen }) {
  const [color, setColor] = useState(1);
  useGSAP(() => {});

  return (
    <>
      <div className={isNavOpen ? style.Mobilecontainer : style.container}>
        {/*----------------- input style */}

        <div className="relative">
          {/*----------------- input style */}
          <Link to="/RecuterDashboard/CreatedJobs">
            <div
              className={`${color === 1 ? style.active : style.btn}`}
              onClick={() => setColor(1)}
            >
              <h1 className="flex items-center gap-8">
                {" "}
                <FaHome />
                CreatedJobs
              </h1>
            </div>
          </Link>
          <Link to="/RecuterDashboard/Profile">
            <div
              className={color === 2 ? style.active : style.btn}
              onClick={() => setColor(2)}
            >
              <h1 className="flex items-center gap-8">
                {" "}
                <RiNewspaperFill />
                Profile
              </h1>
            </div>
          </Link>
          <Link to="/RecuterDashboard/CreateJob">
            <div
              className={color === 3 ? style.active : style.btn}
              onClick={() => setColor(3)}
            >
              <h1 className="flex items-center gap-8">
                {" "}
                <ImProfile />
                Create Jobs
              </h1>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/RecuterDashboard/ContactUs">
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
