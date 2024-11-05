import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./taskmanager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currenttask, setcurrenttask] = useState(null);
  const [snackbar, setSnackbar] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handledelete = (tobedeleted) => {
    setTasks((prevtasks) => {
      const afterdeletion = prevtasks.filter(
        (task) => task.id !== tobedeleted.id
      );
      localStorage.setItem("tasks", JSON.stringify(afterdeletion));
      return afterdeletion;
    });
  };

  const handleEdit = (tasktobeedited) => {
    setcurrenttask(tasktobeedited);
    setOpen(true);
  };
  const handleOpen = () => {
    setcurrenttask(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTask = (task) => {
    setTasks((prevTasks) => {
      if (currenttask) {
        const updatedtasks = prevTasks.map((t) =>
          t.id === currenttask.id ? { ...t, ...task } : t
        );
        localStorage.setItem("tasks", JSON.stringify(updatedtasks));
        return updatedtasks;
      } else {
        const addedtasks = [
          ...prevTasks,
          { ...task, id: Date.now(), completed: false },
        ];
        localStorage.setItem("tasks", JSON.stringify(addedtasks));
        return addedtasks;
      }
    });
    handleClose();
    setSnackbar(true);
  };
  const toggleTaskCompletion = (taskToToggle) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskToToggle.id
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    taskToToggle.completed = !taskToToggle.completed;

    setNotification(
      `Task "${taskToToggle.title}" has been ${
        taskToToggle.completed ? "completed" : "not completed"
      }.`
    );

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus === "completed") return task.completed;
    if (selectedStatus === "notcompleted") return !task.completed;
    return true;
  });
  const handleSnackbarClose = () => {
    setSnackbar(false);
  };
  const status = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Completed",
      value: "completed",
    },
    {
      label: "Not Completed",
      value: "notcompleted",
    },
  ];
  return (
    <div className="total">
      <div className="TaskmanagerHolder">
        <div className="TaskManager">
          <div className="TopElements">
            <div className="Heading">
              <h1>Task Manager </h1>
            </div>
            <Autocomplete
              className="autocomplete"
              disablePortal
              options={status}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSelectedStatus(newValue.value);
                } else {
                  setSelectedStatus("all");
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Filter By Status" />
              )}
              sx={{
                marginTop: "20px",
                marginLeft: "20px",
                marginRight: "11px",
              }}
            />
          </div>
          <TaskForm
            addTask={addTask}
            open={open}
            onClose={handleClose}
            updatedtasks={currenttask}
          />
          <TaskList
            tasks={filteredTasks}
            onDelete={handledelete}
            onEdit={handleEdit}
            onToggleCompletion={toggleTaskCompletion}
            notification={notification}
          />
          <Button
            variant="contained"
            className="createButton"
            onClick={handleOpen}
            endIcon={<AddIcon />}
            sx={{
              marginTop: "2%",
              textAlign: "center",
              paddingLeft: "28%",
              paddingRight: "28%",
            }}
          >
            Add New Task
          </Button>
          <Snackbar
            className="snackbar"
            open={snackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={
              currenttask
                ? "Task Updated Successfully"
                : "Task Added Successfully"
            }
            severity="success"
            sx={{
              "& .MuiSnackbarContent-root": {
                backgroundColor: "green",
                color: "white",
                borderRadius: "4px",
                padding: "0.5rem",
                alignContent: "center",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
