import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";
import ScrollToTop from "../../utils/ScrollToTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Notes = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [notes, setNotes] = useState([]);
  const [isCreateNoteVisible, setIsCreateNoteVisible] = useState(false);
  const [isEditNoteVisible, setIsEditNoteVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isDeleteNoteVisible, setIsDeleteNoteVisible] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [updateNotes, setUpdateNotes] = useState(false);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5001/api/notes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  const openCreateNote = () => {
    setIsCreateNoteVisible(true);
  };

  const closeCreateNote = () => {
    setIsCreateNoteVisible(false);
    setUpdateNotes(!updateNotes);
  };

  const openEditNote = (note) => {
    setIsEditNoteVisible(true);
    setNoteToEdit(note);
  };

  const closeEditNote = () => {
    setIsEditNoteVisible(false);
    setUpdateNotes(!updateNotes);
  };

  const openDeleteNote = (note) => {
    setIsDeleteNoteVisible(true);
    setNoteToDelete(note);
  };

  const closeDeleteNote = () => {
    setIsDeleteNoteVisible(false);
    setUpdateNotes(!updateNotes);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateNotes]);

  return (
    <div className="content-container">
      <h1>Notes</h1>
      <div className="list-container">
        <ul className="list">
          {notes.map((note) => (
            <li className="main-list-item" key={note._id}>
              <h2>{note.title}</h2>
              <p className="item-description">{note.content}</p>
              <div className="controls">
                <button
                  className="icon-pen"
                  onClick={(e) => {
                    e.preventDefault();
                    openEditNote(note);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                </button>
                <button
                  className="icon-trash"
                  onClick={(e) => {
                    e.preventDefault();
                    openDeleteNote(note);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="new-item" onClick={openCreateNote}>
        <span>
          <FontAwesomeIcon icon={faCirclePlus} />
        </span>
      </button>
      {isCreateNoteVisible && <CreateNote onClose={closeCreateNote} />}
      {isEditNoteVisible && noteToEdit !== null && (
        <EditNote note={noteToEdit} onClose={closeEditNote} />
      )}
      {isDeleteNoteVisible && noteToDelete !== null && (
        <DeleteNote note={noteToDelete} onClose={closeDeleteNote} />
      )}
      <ScrollToTop />
    </div>
  );
};

export default Notes;
