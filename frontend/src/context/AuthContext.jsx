// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import * as api from "../services/api";

// Create context
export const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 1. LOAD USER FROM LOCALSTORAGE ON APP START
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // Also set token in api header for future requests
      api.setAuthHeader(savedToken);
    }

    setLoading(false);
  }, []);

  // 2. LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const response = await api.loginUser(email, password);
      const { token: newToken, user: userData } = response.data;

      // Save to state
      setToken(newToken);
      syncUser(userData);

      // Save to localStorage
      localStorage.setItem("token", newToken);

      // Set token in api header
      api.setAuthHeader(newToken);

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // 3. REGISTER FUNCTION
  const register = async (username, email, password) => {
    try {
      const response = await api.registerUser(username, email, password);
      const { token: newToken, user: userData } = response.data;

      // Save to state
      setToken(newToken);
      syncUser(userData);

      // Save to localStorage
      localStorage.setItem("token", newToken);

      // Set token in api header
      api.setAuthHeader(newToken);

      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  // 4. LOGOUT FUNCTION
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.setAuthHeader(null);
  };

  // 5. COMPUTED STATE
  const isAuthenticated = !!token;

  // Return provider with value
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        syncUser,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};