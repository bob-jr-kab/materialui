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
const corsOptions = {
  origin: [
    "https://multiappclient-h0a3rwhh7-bob-jr-kabs-projects.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
// Routes
app.use("/api/tasks", taskRoutes);

connectDB()
  .then(() => {
    // Start server only after successful DB connection
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  });

export default app;
