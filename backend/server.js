import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  "https://multiappclient.vercel.app", // Production frontend
  "http://localhost:3000", // Local development frontend
];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE"], // Allowed methods
    credentials: true, // Enable credentials like cookies if needed
  })
);

// Middleware for parsing JSON data
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Content Security Policy Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' https://vercel.live https://multiappclient.vercel.app; script-src 'self' 'unsafe-inline' https://vercel.live; img-src 'self' data: https://vercel.live;"
  );
  next();
});
// Connect to the database and start the server
connectDB()
  .then(() => {
    // Start the server only if the DB connection is successful
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  });

export default app;
