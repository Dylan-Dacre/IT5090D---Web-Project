import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const EditGoal = ({ goal, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://moodoo.app:1337/api/goals/${goal._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
          body: JSON.stringify(editedGoal),
        }
      );
      if (response.ok) {
        console.log("Goal edited successfully");
      } else {
        console.error("Error editing goal");
      }
    } catch (error) {
      console.error("Error editing goal", error);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <div className="background">
      <div className="edit-container">
        <h2>Edit Goal</h2>
        <div className="edit-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={editedGoal.title}
              onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={editedGoal.description}
              onChange={handleChange}
            />
            <div className="edit-controls">
              <button className="icon-close" onClick={onClose}>
                <span>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              </button>
              <button className="edit-sub" type="submit">
                <span>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;
