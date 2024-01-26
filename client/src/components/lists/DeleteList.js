import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const DeleteList = ({ list, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/lists/${list.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      );

      if (response.ok) {
        console.log("List deleted successfully");
      } else {
        console.error("Error deleting list");
      }
    } catch (error) {
      console.error("Error deleting list", error);
    }

    onClose();
  };

  return (
    <div className="background">
      <div className="delete-container">
        <h2>Delete List</h2>
        <p>Are you sure you want to delete this list?</p>
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
              handleDelete();
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

export default DeleteList;
