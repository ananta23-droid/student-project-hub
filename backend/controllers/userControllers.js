// controllers/userController.js

const User = require("../models/User");

// GET user profile (protected route)
exports.getProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        skills: user.skills,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE user profile (protected route)
exports.updateProfile = async (req, res) => {
  try {
    const { bio, skills, profilePicture } = req.body;

    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { bio, skills, profilePicture },
      { new: true, runValidators: true } // new: true returns updated doc
    );

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        skills: user.skills,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};