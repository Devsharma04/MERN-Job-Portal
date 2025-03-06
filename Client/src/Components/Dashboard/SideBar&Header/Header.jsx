import React, { useContext, useState } from "react";
import { UserContext } from "../../../Context/UserDetailContext";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import JobDekho from "../../../assets/JobDekho.mp4";
import { FaSearch } from "react-icons/fa";
import { HiBars3CenterLeft } from "react-icons/hi2";
import Default from "../../../assets/userDefaultIMG.png";
import { MdNotificationsNone } from "react-icons/md";

function Header({ toggleNav }) {
  const { data, setSearch } = useContext(UserContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };
  const toggleDropdown = (e) => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div className={style.container} onClick={hideDropdown}>
      <HiBars3CenterLeft className={`${style.bars}`} onClick={toggleNav} />
      <div className={style.videoContainer}>
        <video src={JobDekho} autoPlay loop muted></video>
      </div>
      <div className={style.search}>
        <FaSearch />
        <input
          type="text"
          placeholder="Search Jobs"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div
        className={style.profileContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <MdNotificationsNone className={style.notificationIcon} />
        <img
          src={data.img ? data.img : Default}
          alt="Profile"
          className={style.profileImg}
          onClick={toggleDropdown}
        />
        <div
          className={`${style.dropdown} ${isDropdownVisible ? style.show : ""}`}
        >
          <Link to="/login">
            <button onClick={handleLogout}>Sign Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
