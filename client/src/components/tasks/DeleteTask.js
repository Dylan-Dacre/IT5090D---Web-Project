import React, { useState } from "react";
import "./CreateTask.css";
import { useAuth0 } from "@auth0/auth0-react";

const DeleteTask = ({ taskId }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      );

      if (response.ok) {
        setIsDeleted(true);
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div>
      {!isDeleted ? (
        <button onClick={handleDelete}>Delete</button>
      ) : (
        <div>Task deleted</div>
      )}
    </div>
  );
};

export default DeleteTask;
