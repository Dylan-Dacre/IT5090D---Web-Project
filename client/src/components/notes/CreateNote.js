import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const CreateNote = ({ onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  const handleCreate = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        console.log("Note created successfully");
      } else {
        console.log("Error creating note");
      }
    } catch (error) {
      console.error("Error creating note", error);
    }

    onClose();
  };

  return (
    <div className="background">
      <div className="create-container">
        <h2>New Note</h2>
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newNote.title}
              onChange={handleCreate}
            />
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={newNote.content}
              onChange={handleCreate}
            />
            <button className="submit" type="submit">
              Submit
            </button>
            <button className="icon-close" type="button" onClick={onClose}>
              <span>
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
