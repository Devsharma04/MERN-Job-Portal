import React, { useContext, useState } from "react";
import style from "./UpdateProfile.module.css";
import Default from "../../../assets/userDefaultIMG.png";
import axios from "axios";
import { UserContext } from "../../../Context/UserDetailContext";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
function UpdateProfile({ setModal, Dp }) {
  const [loading, setLoading] = useState(false);
  const { fetchUserData } = useContext(UserContext);
  const [previewImg, setPreviewImg] = useState(Dp || Default);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };
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
        `${import.meta.env.VITE_SERVER_URL}profileUpdate`,
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
            <SyncLoader color="#4b49ac" size={15} />
          </div>
        )}
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          {" "}
          {/* used stopPropagation because without this if u click modal it will close because its under modalback div */}
          <div className={style.img}>
            <input
              type="file"
              name="img"
              id="img"
              onChange={handleImagePreview}
              hidden
            />
            <label htmlFor="img">
              <img src={previewImg} alt="" />
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

            <div className={style.bio}>
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                rows={4}
                cols={37}
                placeholder="Bio"
              ></textarea>
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
