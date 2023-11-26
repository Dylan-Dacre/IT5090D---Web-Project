import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Tasks.css";

const Tasks = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        setTask(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    getTask();
  }, [getAccessTokenSilently]);

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
    </div>
  );
};

export default Tasks;
