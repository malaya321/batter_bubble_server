const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const path = require("path");
const pool = require("./src/config/db");


// Load environment variables
dotenv.config();

const app = express();

// ✅ Database Connection Validation
(async () => {
    try {
        await pool.getConnection();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Exit the app if the DB connection fails
    }
})();

// ✅ Middleware
app.use(helmet());                           // Security headers
app.use(xss());                              // Prevent XSS attacks
app.use(hpp());                              // Prevent HTTP param pollution
app.use(cookieParser());                     // Parse cookies
app.use(express.json());                     // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// ✅ Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,                   // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
});
app.use("/api", limiter);

// ✅ CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
};
app.use(cors(corsOptions));

// ✅ Logger
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}

// ✅ Routes
const authRouter = require("./src/routes/authRoutes");
app.use("/api/v1/auth", authRouter);

const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);


// ✅ Health check route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "API is running smoothly",
        timestamp: new Date().toISOString(),
    });
});

// ✅ Global 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

// ✅ Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);
    res.status(500).json({ message: "Internal server error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
