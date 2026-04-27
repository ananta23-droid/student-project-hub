// src/components/Navbar.jsx

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          🎓 Student Hub
        </Link>

        {/* Links & User Menu */}
        <div className="flex items-center gap-6">
          {user && (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-semibold"
              >
                {user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}