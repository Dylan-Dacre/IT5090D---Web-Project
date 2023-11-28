import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Tasks.css";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPen,
  faTrash,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);
  const [isDeleteTaskVisible, setIsDeleteTaskVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isEditTaskVisible, setIsEditTaskVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5001/api/tasks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    });
    const data = await response.json();
    setTasks(data);
  };

  const openCreateTask = () => {
    setIsCreateTaskVisible(true);
  };

  const closeCreateTask = () => {
    setIsCreateTaskVisible(false);
  };

  const openDeleteTask = (task) => {
    console.log(task);
    setTaskToDelete(task);
    setIsDeleteTaskVisible(true);
  };

  const closeDeleteTask = () => {
    setTaskToDelete(null);
    setIsDeleteTaskVisible(false);
  };

  const openEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditTaskVisible(true);
  };

  const closeEditTask = () => {
    setTaskToEdit(null);
    setIsEditTaskVisible(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <div className="task-list">
        <ul className="main-list">
          {tasks.map((task) => (
            <li className="main-task" key={task._id}>
              <h2 className="task-title">{task.title}</h2>
              <p className="description">{task.description}</p>
              <ul className="subtask-list">
                {task.subtasks.map((subtask, index) => (
                  <li
                    className="subtask"
                    key={index}
                    style={{
                      textDecoration: subtask.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {subtask.title}
                    <button className="subtask-complete">
                      <span>
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="controls">
                <button
                  className="icon-pen"
                  onClick={(e) => {
                    e.preventDefault();
                    openEditTask(task);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                </button>
                <button className="icon-complete">
                  <span>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                </button>
                <button
                  className="icon-trash"
                  onClick={(e) => {
                    e.preventDefault();
                    openDeleteTask(task);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="new-task" onClick={openCreateTask}>
        <span>
          <FontAwesomeIcon icon={faCirclePlus} />
        </span>
      </button>
      {isDeleteTaskVisible && taskToDelete !== null && (
        <DeleteTask task={taskToDelete} onClose={closeDeleteTask} />
      )}
      {isEditTaskVisible && taskToEdit !== null && (
        <EditTask task={taskToEdit} onClose={closeEditTask} />
      )}
      {isCreateTaskVisible && <CreateTask onClose={closeCreateTask} />}
    </div>
  );
};

export default Tasks;
