import React from "react";
import style from "./contact.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
function ContactUs() {
  const handleSendMessage = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}contactUs`,
        data
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <motion.div
      className={style.container}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className={style.formBox}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSendMessage}>
          <div className={style.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              placeholder="Enter your message"
              required
            />
          </div>

          <button type="submit" className={style.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ContactUs;
