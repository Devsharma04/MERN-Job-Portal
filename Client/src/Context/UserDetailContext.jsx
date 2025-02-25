import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState({});

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

  useEffect(() => {
    fetchUserData(); // Fetch user data on mount
  }, []);

  return (
    <UserContext.Provider value={{ data, setData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
