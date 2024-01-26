import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const CreateGoal = ({ onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalToCreate = {
      ...newGoal,
      dateCreated: new Date(),
      dateCompleted: null,
      completed: false,
    };

    try {
      const response = await fetch("https://moodoo.app:1337/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
        body: JSON.stringify(goalToCreate),
      });

      if (response.ok) {
        console.log("Goal created successfully");
      } else {
        console.error("Error creating goal");
      }
    } catch (error) {
      console.error("Error creating goal", error);
    }

    onClose();
  };

  return (
    <div className="background">
      <div className="create-container">
        <h2>Create Goal</h2>
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={newGoal.title}
              onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={newGoal.description}
              onChange={handleChange}
            />
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
        <button className="icon-close" onClick={onClose}>
          <span>
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreateGoal;
