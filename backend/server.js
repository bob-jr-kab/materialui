// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"; // Import dotenv
import { connectDB } from "./config/db.js";
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const port = process.env.PORT || 5000;

// Define the task schema and model
const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

// Routes
app.post("/tasks", async (req, res) => {
  const newTask = new Task({ task: req.body.task });
  await newTask.save();
  res.json(newTask);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Start the serverconnectDB()
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
