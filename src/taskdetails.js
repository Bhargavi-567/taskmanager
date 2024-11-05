import React from "react";
import { useParams } from "react-router-dom";
import "./taskdetails.css";
const TaskDetails = () => {
  const { id } = useParams();
  const originalData = localStorage.getItem('tasks');
  const tasks = JSON.parse(originalData);
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return <div>Task not found</div>;
  }
  return (
    <>
    <div className="details">
    <h1>{task.title}</h1>
    <p>{task.description.split('\n').map((line, index) => line.trim() ? <div key={index}>• {line.trim()}</div> : null)}</p>
    <p>{task.status}</p>
    <button className="BackButton"onClick={() => window.history.back()}>Back</button>
  </div>
  </>
    
  );
};
export default TaskDetails;
