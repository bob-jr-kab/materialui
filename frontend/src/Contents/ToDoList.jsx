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
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    setTasks(response.data);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      const response = await axios.post("http://localhost:5000/tasks", {
        task: newTask,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask("");
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
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
          title="To Do List Program"
          subheader="September 16, 2024"
        />
        <Divider />
        <CardContent>
          <h3> My To Do List</h3>
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
              {tasks.map((task, index) => (
                <ListItem
                  key={task._id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography sx={{ flexGrow: 1 }}>
                    {index + 1}. {task.task}
                  </Typography>

                  <DeleteButton onClick={() => deleteTask(task._id)}>
                    X
                  </DeleteButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ToDoList;
