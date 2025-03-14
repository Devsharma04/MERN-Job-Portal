import React, { useContext, useState } from "react";
import style from "./Profile.module.css";
import { FaPencil } from "react-icons/fa6";
import { UserContext } from "../../../Context/UserDetailContext";
import UpdateProfile from "./UpdateProfile";
import Default from "../../../assets/userDefaultIMG.png";
import { MdOutlineEmail } from "react-icons/md";
import { TbPhone } from "react-icons/tb";
import { motion } from "framer-motion";
function Profile() {
  const [modal, setModal] = useState(false);
  const { data } = useContext(UserContext);

  return (
    <>
      <motion.div
        className={style.container}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      >
        <div className={style.form}>
          <div className={style.profileSection}>
            <div className={style.img}>
              <img src={data.img ? data.img : Default} alt="" />
            </div>
            <div className={style.details}>
              <h1 className="text-zinc-500 font-medium">{`${data.fname} ${data.lname}`}</h1>
              <p> {data.bio}</p>
            </div>
            <FaPencil
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setModal(true)}
            />
          </div>
          <div className={style.emailPh}>
            <h1>
              <MdOutlineEmail />
              <span> {data.email}</span>
            </h1>
            <h1>
              <TbPhone />
              <span> {data.phone}</span>
            </h1>
          </div>
          <div className={style.skills}>
            <h1>Skills</h1>
            <div>
              {data.skills?.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
          </div>
          <div className={style.resume}>
            <a href={data?.resume} target="_blank">
              See Resume
            </a>
          </div>
        </div>
      </motion.div>
      {modal && <UpdateProfile setModal={setModal} Dp={data.img} />}
    </>
  );
}

export default Profile;
