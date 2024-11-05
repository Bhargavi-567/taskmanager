import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./tasklist.css";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { Task } from "@mui/icons-material";

const TaskList = ({
  tasks,
  onDelete,
  onEdit,
  onToggleCompletion,
  notification,
  setNotification,
}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [tasktodelete, setTaskToDelete] = useState(null);
  const goToTaskDetails = (id) => {
    navigate(`/taskdetail/${id}`);
  };
  const handleModalopen = (task) => {
    setTaskToDelete(task);
    setOpenModal(true);
  };
  const handleModalclose = () => {
    setOpenModal(false);
  };
  const confirmDelete = () => {
    onDelete(tasktodelete);
    handleModalclose();
  };
  return (
    <div className="taskCard">
      {notification && <div className="notification">{notification}</div>}
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => goToTaskDetails(task.id)}
              className={`taskItem ${task.completed ? "completed" : ""}`}
            >
              <div className="TaskCardHeader">
                <h3 className="title">{task.title}</h3>

                <p className="statusText">
                  {task.completed ? "Done" : "In Progress"}
                </p>
              </div>
              <div className="iconContainer">
                <button
                  className="EditButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  aria-label="Edit task"
                >
                  <EditIcon className="taskIcon" />
                  Edit
                </button>
                <button
                  className="DeleteButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalopen(task);
                  }}
                  aria-label="Delete task"
                >
                  <DeleteIcon className="taskIcon" />
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompletion(task);
                  }}
                  className="CompleteButton"
                  aria-label="Toggle task completion"
                  disabled={task.completed}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="taskCheckbox"
                  />
                  Mark As Done
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Modal
        class="Modalclass"
        open={openModal}
        onClose={handleModalclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalContent">
          <h2 id="modal-modal-title">Are You Sure?</h2>
          <p id="modal-modal-description">
            Are you sure you want to delete the task {"     "}
            <strong>"{tasktodelete?.title}"</strong>?
          </p>
          <div className="modalActions">
            <Button onClick={handleModalclose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={confirmDelete} variant="contained" color="error">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskList;
