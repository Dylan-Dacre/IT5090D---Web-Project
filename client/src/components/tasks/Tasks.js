import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Tasks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5001/api/tasks", {
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    });
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
      <button>
        <span className="icon-plus">
          <FontAwesomeIcon icon={faCirclePlus} />
        </span>
      </button>
    </div>
  );
};

export default Tasks;
