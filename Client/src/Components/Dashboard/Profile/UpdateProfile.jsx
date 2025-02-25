import React, { useContext, useState } from "react";
import style from "../../../Css/Dashboard/ProfileCss/UpdateProfile.module.css";
import Default from "../../../assets/userDefaultIMG.png";
import axios from "axios";
import { UserContext } from "../../../Context/UserDetailContext";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
function UpdateProfile({ setModal, Dp }) {
  const [loading, setLoading] = useState(false);
  const { fetchUserData } = useContext(UserContext);
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(e.target);
    const imgInput = document.querySelector("#img"); // Select file input by ID
    if (imgInput.files.length > 0) {
      formdata.append("img", imgInput.files[0]); // Append file to FormData
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/profileUpdate",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchUserData();
      setModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.modalback} onClick={() => setModal(false)}>
        {loading && (
          <div className={style.loader}>
            <ClipLoader color="#4b49ac" size={60} />
          </div>
        )}
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          {" "}
          {/* used stopPropagation because without this if u click modal it will close because its under modalback div */}
          <div className={style.img}>
            <input type="file" name="img" id="img" hidden />
            <label htmlFor="img">
              <img src={Dp ? Dp : Default} alt="" />
            </label>
          </div>
          <form className={style.form} onSubmit={handleUserUpdate}>
            <div className={style.group1}>
              <label htmlFor="fname">First Name</label>
              <input type="text" name="fname" placeholder="First Name" />
            </div>
            <div className={style.group1}>
              <label htmlFor="fname">Last Name</label>
              <input type="text" name="lname" placeholder="Last Name" />
            </div>
            <div className={style.group1}>
              <label htmlFor="fname">Email</label>
              <input type="text" name="email" placeholder="Email" />
            </div>
            <div className={style.group1}>
              <label htmlFor="fname">Phone</label>
              <input type="text" name="phone" placeholder="phone" />
            </div>
            <div className={style.group1}>
              <label htmlFor="fname">Skills</label>
              <input type="text" name="skills" placeholder="Skills" />
            </div>
            <div className={style.bio}>
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                rows={4}
                cols={37}
                placeholder="Bio"
              ></textarea>
            </div>
            <div className={style.group1}>
              <label htmlFor="resume">Update Resume</label>
              <input type="file" name="resume" accept=".pdf,.doc,.docx" />
            </div>

            <button className={style.btn}>Update</button>
          </form>
        </div>
      </div>
      ;
    </>
  );
}

export default UpdateProfile;
