
import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on app start
  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.AUTH.GET_PROFILE
        );

        // IMPORTANT: profile response has NO token
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Used ONLY after login / register
  const updateUser = (userData) => {
    setUser({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
    });

    // ✅ DO NOT overwrite token unless it exists
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }

    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
