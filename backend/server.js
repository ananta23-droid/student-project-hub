const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// =====================
// 1. Load environment variables
// =====================
dotenv.config({ path: path.join(__dirname, ".env") });

// =====================
// 2. Create Express app
// =====================
const app = express();

// =====================
// 3. Middleware
// =====================
app.use(express.json());

// =====================
// 4. CORS Configuration
// =====================
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// =====================
// 5. Import Routes
// =====================
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// =====================
// 6. Use Routes
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// =====================
// 7. Test Route
// =====================
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// =====================
// 8. Health Check (for Render)
// =====================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
  });
});

// =====================
// 9. Start Server AFTER DB Connection
// =====================
const startServer = async () => {
  const PORT = process.env.PORT || 5000;

  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing in environment variables");
    process.exit(1);
  }

  try {
    // Connect MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// =====================
// 10. Initialize App
// =====================
startServer();