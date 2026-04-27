// src/services/api.js

import axios from "axios";
// Get API URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// 1. SET AUTHORIZATION HEADER
export const setAuthHeader = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// 2. AUTH ENDPOINTS
export const registerUser = (username, email, password) => {
  return API.post("/auth/register", { username, email, password });
};

export const loginUser = (email, password) => {
  return API.post("/auth/login", { email, password });
};

// 3. USER ENDPOINTS
export const getProfile = () => {
  return API.get("/user/profile");
};

export const updateProfile = (bio, skills, profilePicture) => {
  return API.put("/user/profile", { bio, skills, profilePicture });
};

export default API;