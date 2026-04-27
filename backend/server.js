// 1. Import packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// 2. Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// 3. Create Express app
const app = express();

// 4. Middleware
app.use(cors());
app.use(express.json());

// 6. Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// 7. Use routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// 8. Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// 9. Start server only after DB is ready
const startServer = async () => {
  const PORT = process.env.PORT || 5000;

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing in backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();