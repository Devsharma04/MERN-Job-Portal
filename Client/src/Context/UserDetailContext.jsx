import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [jobData, setJobData] = useState([]);
  const [search, setSearch] = useState("");
  const [Jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}getData`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchJobData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}CreatedJobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobData(response?.data);
    } catch (error) {
      console.error("Error fetching Jobs:", error);
    }
  };
  const getAllJobs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}alljobs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setJobs(response.data.getData);
      setAppliedJobs(response.data.appliedJobs);
    } catch (error) {
      console.log(error);
    }
  };
  const getApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}applications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setApplications(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchUserData();
    fetchJobData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        getApplications,
        applications,
        data,
        Jobs,
        appliedJobs,
        setData,
        fetchUserData,
        jobData,
        fetchJobData,
        setSearch,
        getAllJobs,
        search,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
