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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <ul>
                {task.subtasks.map((subtask, index) => (
                  <li
                    key={index}
                    style={{
                      textDecoration: subtask.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {subtask.description}
                    <button className="icon-complete">
                      <span>
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button className="icon-pen" onClick={EditTask}>
                <span>
                  <FontAwesomeIcon icon={faPen} />
                </span>
              </button>
              <button className="icon-complete">
                <span>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
              </button>
              <button className="icon-trash" onClick={DeleteTask}>
                <span>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="new-task" onClick={openCreateTask}>
        <span>
          <FontAwesomeIcon icon={faCirclePlus} />
        </span>
      </button>

      {isCreateTaskVisible && <CreateTask onClose={closeCreateTask} />}
    </div>
  );
};

export default Tasks;
