import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [jobData, setJobData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:3000/api/getData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        "http://localhost:3000/api/CreatedJobs",
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

  useEffect(() => {
    fetchUserData();
    fetchJobData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        fetchUserData,
        jobData,
        fetchJobData,
        setSearch,
        search,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
