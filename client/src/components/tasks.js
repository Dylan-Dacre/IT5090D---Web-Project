import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Tasks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("Access Token:", token);

        // Decode the token manually and log the payload
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedToken = JSON.parse(atob(base64));
        console.log("Decoded Token Payload:", decodedToken);

        const response = await fetch("http://localhost:5001/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setTasks(responseData);
      } catch (error) {
        console.error(error);

        // Additional logging for decoding errors
        if (error.name === "SyntaxError") {
          console.error("Error decoding token payload:", error.message);
        }
      }
    };

    if (isAuthenticated && !isLoading) {
      fetchTasks();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

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
