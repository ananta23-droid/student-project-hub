import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import * as api from "../services/api";

export default function Profile() {
  const { user, loading, syncUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // Sync user data when loaded
  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      setSkills(user.skills || []);
      setProfilePicture(
        user.profilePicture || "https://via.placeholder.com/150"
      );
    }
  }, [user]);

  // Add skill
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Save profile
  const handleSaveProfile = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.updateProfile(bio, skills, profilePicture);
      const updatedUser = response.data?.user;

      if (updatedUser) {
        syncUser(updatedUser);
      }

      setSuccess("Profile updated successfully!");
      setIsEditing(false);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isEditing
                  ? "bg-gray-500 hover:bg-gray-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Success */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* VIEW MODE */}
          {!isEditing ? (
            <div className="space-y-6">

              {/* Profile Picture */}
              <div>
                <label className="text-gray-600 font-semibold block mb-2">
                  Profile Picture
                </label>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              </div>

              {/* Username */}
              <div>
                <label className="text-gray-600 font-semibold">Username</label>
                <p className="text-xl text-gray-800">{user?.username}</p>
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-600 font-semibold">Email</label>
                <p className="text-xl text-gray-800">{user?.email}</p>
              </div>

              {/* Bio */}
              <div>
                <label className="text-gray-600 font-semibold">Bio</label>
                <p className="text-xl text-gray-800">
                  {bio || "No bio yet"}
                </p>
              </div>

              {/* Skills */}
              <div>
                <label className="text-gray-600 font-semibold">Skills</label>

                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-800">No skills added</p>
                )}
              </div>
            </div>
          ) : (
            /* EDIT MODE */
            <div className="space-y-6">

              {/* Bio */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {bio.length}/500 characters
                </p>
              </div>

              {/* Profile Picture */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Profile Picture URL
                </label>

                <input
                  type="text"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <img
                  src={profilePicture}
                  alt="Preview"
                  className="w-24 h-24 rounded-full mt-3 object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Skills
                </label>

                <div className="flex gap-2 mb-3">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleAddSkill()
                    }
                    className="flex-1 px-4 py-2 border rounded-lg"
                    placeholder="Add skill"
                  />

                  <button
                    onClick={handleAddSkill}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-red-500 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}