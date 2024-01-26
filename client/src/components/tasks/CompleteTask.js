import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CompleteTask = ({ task, subtaskIndex, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const handleComplete = async () => {
      try {
        const completeTask = { ...task };

        if (subtaskIndex !== undefined && subtaskIndex !== null) {
          completeTask.subtasks[subtaskIndex].completed = true;
        } else {
          completeTask.completed = true;
        }

        const response = await fetch(
          `https://moodoo.app:1337/api/tasks/${task._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getAccessTokenSilently()}`,
            },
            body: JSON.stringify(completeTask),
          }
        );

        if (response.ok) {
          console.log("Task/subtask marked as completed successfully");
        } else {
          console.error("Error marking task/subtask as completed");
        }
      } catch (error) {
        console.error("Error completing task/subtask", error);
      }

      onClose();
    };

    handleComplete();
  }, [task, subtaskIndex, getAccessTokenSilently, onClose]);
};

export default CompleteTask;
