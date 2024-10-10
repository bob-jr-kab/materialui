import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Stack,
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
  backgroundColor: "#B8001F",
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
          <Box alignItems="center" justifyContent="center">
            <TextField
              onChange={handleInputChange}
              id="text-field"
              label="Enter a task..."
              variant="outlined"
              value={newTask}
            />
            <StyledButton onClick={addTask} variant="contained">
              ADD
            </StyledButton>
          </Box>

          <Box>
            <List>
              {tasks.map(
                (
                  task,
                  index // Include index in the map function
                ) => (
                  <ListItem
                    key={task._id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography sx={{ flexGrow: 1 }}>
                      {index + 1}. {task.task} {/* Display index with task */}
                    </Typography>

                    <DeleteButton onClick={() => deleteTask(task._id)}>
                      X
                    </DeleteButton>
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ToDoList;
