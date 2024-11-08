import React, { useEffect, useState } from "react";
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
  Breadcrumbs,
  Link,
} from "@mui/material";
import axios from "axios"; // Import Axios
import baseUrl from "../config.jsx";
import { useScreenSize } from "../context/ScreenSizeContext";

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
  const { isSmallScreen, isTabletScreen, isLargeScreen } = useScreenSize(); // Moved hook call inside component

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Fetch tasks on component mount and on page refresh
    fetchTasks();

    // Optional: Set an interval to fetch updates every minute
    const intervalId = setInterval(fetchTasks, 60000); // 60000 ms = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
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
      color="red"
      padding={2}
      align="center"
      sx={{
        maxWidth: "100%",
        backgroundImage:
          "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
      }}
      height="100vh"
    >
      {/* Breadcrumbs Navigation */}
      <Box px={2} mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Task Manager</Typography>
        </Breadcrumbs>
      </Box>

      <Card
        sx={{
          backgroundColor: "#e6ece9",
          maxWidth: isSmallScreen ? "100%" : isTabletScreen ? "90%" : "50%", // Use the screen size values here
        }}
      >
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
                      width: "100%",
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
