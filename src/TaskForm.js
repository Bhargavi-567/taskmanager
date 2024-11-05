import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./TaskForm.css";

const TaskForm = ({ addTask, open, onClose, updatedtasks }) => {
  const [taskInput, setTaskInput] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskInput) {
      setError("Task title is required.");
      return;
    }
    setError("");
    addTask({ title: taskInput, description: taskDescription });
    setTaskInput("");
    setTaskDescription("");
    navigate("/");
    onClose();
  };

  const handleClose = () => {
    setTaskInput(updatedtasks ? updatedtasks.title : "");
    setTaskDescription(updatedtasks ? updatedtasks.description : "");
    setError(""); 
    onClose();
  };

  useEffect(() => {
    if (updatedtasks) {
      setTaskInput(updatedtasks.title);
      setTaskDescription(updatedtasks.description);
    }
  }, [updatedtasks]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTaskDescription((prev) =>`${prev}\n.`);
    }
  }

  /* useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, inputRef]); */

  return (
    open && (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the task you want to add.
          </DialogContentText>
          
          <TextField
            margin="dense"
            label="Task"
            type="text"
            fullWidth
            variant="outlined"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            error={!!error}
            autoComplete="off"
            autoFocus ={open}
            helperText={error}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "grey",
                },
                "&:hover fieldset": {
                  borderColor: "blue",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green",
                },
              },
            }}
          />
          <TextField
           autoFocus ={true}
               autoComplete="off"
            type="text"
            value={taskDescription}
            label="Description"
            onChange={(e) => setTaskDescription(e.target.value)}
/*             onKeyDown={handleKeyPress}
 */            margin="dense"
            variant="outlined"
            multiline 
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "grey",
                },
                "&:hover fieldset": {
                  borderColor: "blue",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default TaskForm;
