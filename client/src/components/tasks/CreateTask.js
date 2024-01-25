import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const CreateTask = ({ onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subtasks: [{ title: "", completed: false }],
  });

  const handleChange = (e, subtaskIndex) => {
    const { name, value } = e.target;
    if (name === "subtasks") {
      setNewTask((prev) => ({
        ...prev,
        subtasks: prev.subtasks.map((subtask, index) =>
          index === subtaskIndex ? { ...subtask, title: value } : subtask
        ),
      }));
    } else {
      setNewTask((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSubtask = () => {
    setNewTask((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, { title: "", completed: false }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonBlankSubtasks = newTask.subtasks.filter(
      (subtask) => subtask.title !== ""
    );

    const taskToCreate = {
      ...newTask,
      subtasks: nonBlankSubtasks,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:5001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
        body: JSON.stringify(taskToCreate),
      });

      if (response.ok) {
        console.log("Task created successfully");
      } else {
        console.error("Error creating task");
      }
    } catch (error) {
      console.error("Error creating task", error);
    }

    onClose();
  };

  return (
    <div className="background">
      <div className="create-container">
        <h2>New Task</h2>
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleChange}
            />
            <label htmlFor="subtasks">Subtasks:</label>
            {newTask.subtasks.map((subtask, index) => (
              <div key={index}>
                <input
                  type="text"
                  id={`subtask-${index}`}
                  name="subtasks"
                  value={subtask.title}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            ))}
            <button
              className="add-sub-item"
              type="button"
              onClick={handleAddSubtask}
            >
              <span>
                <FontAwesomeIcon icon={faCirclePlus} />
              </span>
            </button>
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
        <button className="icon-close" onClick={onClose}>
          <span>
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
