import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const DeleteGoal = ({ goal, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/goals${goal._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      );

      if (response.ok) {
        console.log("Goal deleted successfully");
      } else {
        console.error("Error deleting goal");
      }
    } catch (error) {
      console.error("Error deleting goal", error);
    }

    onClose();
  };

  return (
    <div className="background">
      <div className="delete-container">
        <h2>Delete Goal</h2>
        <p>Are you sure you want to delete this goal?</p>
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
              handleDelete(goal);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteGoal;
