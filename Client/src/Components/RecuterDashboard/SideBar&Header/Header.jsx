import React, { useContext } from "react";
import { UserContext } from "../../../Context/UserDetailContext";
import style from "./Header.module.css";
import JobDekho from "../../../assets/JobDekho.mp4";
import { FaSearch } from "react-icons/fa";
import { HiBars3CenterLeft } from "react-icons/hi2";
import Default from "../../../assets/userDefaultIMG.png";
import { MdNotificationsNone } from "react-icons/md";
function Header({ toggleNav }) {
  const { data } = useContext(UserContext);
  return (
    <div className={style.container}>
      <HiBars3CenterLeft className={`${style.bars}`} onClick={toggleNav} />
      <div className={style.videoContainer}>
        <video src={JobDekho} autoPlay loop muted></video>
      </div>
      <div className={style.search}>
        <FaSearch />
        <input type="text" placeholder="Search Jobs" />
      </div>
      <div>
        <div className={style.img}>
          <MdNotificationsNone />
          <img src={data.img ? data.img : Default} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Header;
