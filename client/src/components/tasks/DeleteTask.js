import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const DeleteTask = ({ task, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/tasks/${task._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      );

      if (response.ok) {
        console.log("Task deleted successfully");
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }

    onClose();
  };

  return (
    <div className="delete-container">
      <h2>Delete Task</h2>
      <p>Are you sure you want to delete this task?</p>
      <div className="del-controls">
        <button className="icon-close" onClick={onClose}>
          <span>
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        </button>
        <button
          className="icon-trash"
          onClick={(e) => {
            e.preventDefault();
            handleDelete(task);
          }}
        >
          <span>
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default DeleteTask;
