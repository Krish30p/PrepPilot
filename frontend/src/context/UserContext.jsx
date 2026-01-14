import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);

        // ✅ NORMALIZE BACKEND RESPONSE (CRITICAL FIX)
        const profile = res.data?.user || res.data;

        setUser({
          _id: profile?._id || "",
          name: profile?.name || "User",
          email: profile?.email || "",
        });
      } catch (err) {
        console.error("Auth failed:", err);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser({
      _id: userData?._id || "",
      name: userData?.name || "User",
      email: userData?.email || "",
    });

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
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
