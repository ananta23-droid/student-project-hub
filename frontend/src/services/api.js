// src/services/api.js

import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
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