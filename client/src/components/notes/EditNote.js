import React, { useState } from "react";
import "./EditNote.css";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const EditNote = ({ note, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [editedNote, setEditedNote] = useState({ ...note });

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/notes/${note._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
          body: JSON.stringify(editedNote),
        }
      );
      if (response.ok) {
        console.log("Note edited successfully");
      } else {
        console.log("Error editing note");
      }
    } catch (error) {
      console.error("Error editing note", error);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <div className="edit-note-container">
      <h2>Edit Note</h2>
      <div className="edit-note-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
          />
          <div className="edit-controls">
            <button className="edit-close" onClick={onClose}>
              <span>
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
            </button>
            <button className="edit-save" type="submit">
              <span>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
