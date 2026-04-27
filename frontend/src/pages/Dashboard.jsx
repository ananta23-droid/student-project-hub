// src/pages/Dashboard.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome, {user?.username}! 👋
            </h1>
            <p className="text-lg opacity-90">
              Let's build amazing projects together
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 font-semibold mb-2">Projects</h3>
              <p className="text-3xl font-bold text-blue-500">0</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 font-semibold mb-2">Skills</h3>
              <p className="text-3xl font-bold text-green-500">
                {user?.skills?.length || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 font-semibold mb-2">Collaborators</h3>
              <p className="text-3xl font-bold text-purple-500">0</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/profile"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                👤 View Profile
              </h3>
              <p className="text-gray-600">
                Check and update your profile information
              </p>
            </Link>

            <button className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                📁 New Project (Coming Soon)
              </h3>
              <p className="text-gray-600">
                Create a new project and invite collaborators
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}