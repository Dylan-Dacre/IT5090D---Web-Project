import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCirclePlus,
  faCircleMinus,
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
    <div className="edit-container">
      <h2>Edit Task</h2>
      <div className="edit-form">
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
              <div className="sub-container" key={index}>
                <input
                  type="text"
                  name="subtasks"
                  value={subtask.title}
                  onChange={(e) => handleSubtaskChange(e, index)}
                />
                <button
                  className="sub-remove"
                  type="button"
                  onClick={() => handleRemoveSubtask(index)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </span>
                </button>
              </div>
            ))}
          </label>
          <button className="sub-add" type="button" onClick={handleAddSubtask}>
            <span>
              <FontAwesomeIcon icon={faCirclePlus} />
            </span>
          </button>
          <div className="edit-controls">
            <button className="icon-close" onClick={onClose}>
              <span>
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
            </button>
            <button className="edit-sub" type="submit">
              <span>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
