import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Tasks.css";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import CompleteTask from "./CompleteTask";
import ScrollToTop from "../../utils/ScrollToTop";
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
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [subtaskIndex, setSubtaskIndex] = useState(null);
  const [updateTasks, setUpdateTasks] = useState(false);

  const fetchData = async () => {
    const response = await fetch("https://moodoo.app:1337/api/tasks", {
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
    setUpdateTasks(!updateTasks);
  };

  const openDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteTaskVisible(true);
  };

  const closeDeleteTask = () => {
    setTaskToDelete(null);
    setIsDeleteTaskVisible(false);
    setUpdateTasks(!updateTasks);
  };

  const openEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditTaskVisible(true);
  };

  const closeEditTask = () => {
    setTaskToEdit(null);
    setIsEditTaskVisible(false);
    setUpdateTasks(!updateTasks);
  };

  const completeTask = (task, subtaskIndex) => {
    setTaskToComplete(task);
    setSubtaskIndex(subtaskIndex);
    setUpdateTasks(!updateTasks);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTasks]);

  return (
    <div className="content-container">
      <h1>Tasks</h1>
      <div className="list-container">
        <ul className="list">
          {tasks.map((task) => (
            <li className="main-list-item" key={task._id}>
              <h2>{task.title}</h2>
              <p className="item-description">{task.description}</p>
              <ul className="inner-list">
                {task.subtasks.map((subtask, index) => (
                  <li
                    className="inner-list-item"
                    key={index}
                    style={{
                      textDecoration: subtask.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {subtask.title}
                    <button
                      className="subtask-complete"
                      onClick={(e) => {
                        e.preventDefault();
                        completeTask(task, index);
                      }}
                    >
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
                <button
                  className="icon-complete"
                  onClick={(e) => {
                    e.preventDefault();
                    completeTask(task);
                  }}
                >
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
      <button className="new-item" onClick={openCreateTask}>
        <span>
          <FontAwesomeIcon icon={faCirclePlus} />
        </span>
      </button>
      {isCreateTaskVisible && <CreateTask onClose={closeCreateTask} />}
      {isEditTaskVisible && taskToEdit !== null && (
        <EditTask task={taskToEdit} onClose={closeEditTask} />
      )}
      {isDeleteTaskVisible && taskToDelete !== null && (
        <DeleteTask task={taskToDelete} onClose={closeDeleteTask} />
      )}
      {taskToComplete !== null && (
        <CompleteTask
          task={taskToComplete}
          subtaskIndex={subtaskIndex}
          onClose={() => setTaskToComplete(null)}
        />
      )}
      <ScrollToTop />
    </div>
  );
};

export default Tasks;
