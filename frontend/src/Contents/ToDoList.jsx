import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  styled,
  Button,
  Typography,
  TextField,
  Divider,
  Box,
  List,
  ListItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import baseUrl from "../config.jsx";

const StyledButton = styled(Button)({
  backgroundColor: "#6A9C89",
  textTransform: "none",
});

const DeleteButton = styled(Button)({
  backgroundColor: "transparent",
  color: "red",
  textTransform: "none",
});

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Check if tasks are stored in localStorage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      fetchTasks(); // Fetch tasks if not found in localStorage
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/tasks`);
      if (Array.isArray(response.data)) {
        setTasks(response.data);
        localStorage.setItem("tasks", JSON.stringify(response.data)); // Save to localStorage
      } else {
        console.error("Received data is not an array:", response.data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const response = await axios.post(`${baseUrl}/api/tasks`, {
          task: newTask,
        });
        const updatedTasks = [...tasks, response.data];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update localStorage
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/tasks/${id}`);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update localStorage
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Box
      bgcolor="#E9EFEC"
      color="red"
      padding={2}
      align="center"
      sx={{ width: "100%" }}
      height="100vh"
    >
      <Card sx={{ maxWidth: { xs: "100%", sm: "50%", marginTop: "50px" } }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#C4DAD2" }} aria-label="recipe">
              T
            </Avatar>
          }
          title="Task manager Program"
          subheader="September 16, 2024"
        />
        <Divider />
        <CardContent>
          <h3> Task manager</h3>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <TextField
              onChange={handleInputChange}
              id="text-field"
              label="Enter a task..."
              value={newTask}
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px", // Adjust the height here
                },
                "& .MuiInputLabel-root": {
                  lineHeight: "20px", // Center label vertically
                },
              }}
            />
            <StyledButton onClick={addTask} variant="contained">
              ADD
            </StyledButton>
          </Box>

          <Box>
            <List>
              {Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <ListItem
                    key={task._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "400px",
                    }}
                  >
                    <Typography sx={{ flexGrow: 1 }}>
                      {index + 1}. {task.task}
                    </Typography>
                    <DeleteButton onClick={() => deleteTask(task._id)}>
                      X
                    </DeleteButton>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Typography>No tasks available</Typography>
                </ListItem>
              )}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ToDoList;
