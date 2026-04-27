const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Hide password from queries (security)
    },

    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
  },
  { timestamps: true }
);

// Create model
const User = mongoose.model("User", userSchema);

// Export model
module.exports = User;