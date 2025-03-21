import { useState, useContext } from "react";
import style from "./Create.module.css";
import axios from "axios";
import { UserContext } from "../../../Context/UserDetailContext";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
import { motion } from "framer-motion";

function CreateJob() {
  const [loading, setLoading] = useState(false);
  const { fetchJobData } = useContext(UserContext);
  const handelFromSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}createjob`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success(response.data.message);
      await fetchJobData();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      className={style.container}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {loading && (
        <div className={style.loader}>
          <SyncLoader color="#4b49ac" size={15} />
        </div>
      )}
      <form onSubmit={handelFromSubmit} className={style.main}>
        <div>
          <label htmlFor="company">Company Name</label>
          <input type="text" name="company" />
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <input type="text" name="position" />
        </div>
        <div>
          <label htmlFor="description">job description</label>
          <input type="text" name="description" />
        </div>
        <div>
          <label htmlFor="Salary">Salary</label>
          <input type="number" name="Salary" />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input type="text" name="location" />
        </div>
        <button type="submit">Create Job</button>
      </form>
    </motion.div>
  );
}

export default CreateJob;
