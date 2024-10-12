// api/apiHandler.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
connectDB().catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
});

// Define the task schema and model
const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

// Routes
app.post("/", async (req, res) => {
  const newTask = new Task({ task: req.body.task });
  await newTask.save();
  res.json(newTask);
});

app.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Export the serverless function
export default async (req, res) => {
  await app(req, res); // Forward the request to the express app
};
