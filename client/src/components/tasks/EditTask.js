import React, { useState } from "react";
import "./CreateTask.css";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const EditTask = ({ task, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
          body: JSON.stringify(editedTask),
        }
      );

      console.log("Edit response: ", response);

      if (response.ok) {
        console.log("Task edited successfully");
      } else {
        console.error("Error editing task");
      }
    } catch (error) {
      console.error("Error editing task", error);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubtaskChange = (e, subtaskIndex) => {
    const { value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.map((subtask, index) =>
        index === subtaskIndex ? { ...subtask, title: value } : subtask
      ),
    }));
  };

  const handleAddSubtask = () => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      subtasks: [...prevTask.subtasks, { title: "", completed: false }],
    }));
  };

  const handleRemoveSubtask = (subtaskIndex) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.filter((_, index) => index !== subtaskIndex),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Subtasks:
          {editedTask.subtasks.map((subtask, index) => (
            <div key={index}>
              <input
                type="text"
                name="subtasks"
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(e, index)}
              />
              <button type="button" onClick={() => handleRemoveSubtask(index)}>
                Remove Subtask
              </button>
            </div>
          ))}
        </label>
        <button type="button" onClick={handleAddSubtask}>
          Add Subtask
        </button>
        <div className="edit-controls">
          <button className="edit-close" onClick={onClose}>
            <span>
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          </button>
          <button className="edit-edit" type="submit">
            <span>
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
