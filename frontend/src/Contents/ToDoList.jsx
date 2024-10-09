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
import React, { useState } from "react";

const StyledButton = styled(Button)({
  backgroundColor: "#6A9C89",
  textTransform: "none",
});
const StyledButton2 = styled(Button)({
  backgroundColor: "#384B70",
  textTransform: "none",
});

const DeleteButton = styled(Button)({
  backgroundColor: "#B8001F",
  textTransform: "none",
});

const ToDoList = () => {
  const [tasks, setTask] = useState(["Eat fufu", "sleep", "Go to Dima"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTask((t) => [...t, newTask]);
      setNewTask("");
    }
  }
  function deleteTask(index) {
    setTask(tasks.filter((_, i) => i !== index));
  }
  function moveTaskUp() {}
  function moveTaskDown() {}

  return (
    <Box
      bgcolor="#E9EFEC"
      color="red"
      // flex={8}
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
          title="To DO List Program"
          subheader="September 16, 2024"
        />{" "}
        <Divider />
        <CardContent>
          <h3> My To Do List</h3>
          <Box alignItems="center" justifyContent="center">
            <TextField
              onChange={handleInputChange}
              id="text-feild"
              label="Enter a task..."
              multiline
              maxRows={4}
              variant="outlined"
            />
            <StyledButton onClick={addTask} variant="contained">
              ADD
            </StyledButton>
          </Box>

          <Box>
            <List>
              {tasks.map((task, index) => (
                <ListItem key={index}>
                  {index + 1}.{task}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="right"
                    justifyContent="center"
                    sx={{ marginLeft: 10 }}
                  ></Stack>
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
