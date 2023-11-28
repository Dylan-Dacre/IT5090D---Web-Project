import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

const EditList = ({ list, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [editedList, setEditedList] = useState({ ...list });

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/lists/${list._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
          body: JSON.stringify(editedList),
        }
      );
      if (response.ok) {
        console.log("List edited successfully");
      } else {
        console.error("Error editing list");
      }
    } catch (error) {
      console.error("Error editing list", error);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedList((prevList) => ({ ...prevList, [name]: value }));
  };

  const handleListitemChange = (e, listitemIndex) => {
    const { value } = e.target;
    setEditedList((prevList) => ({
      ...prevList,
      listitems: prevList.listitems.map((listitem, index) =>
        index === listitemIndex ? { ...listitem, title: value } : listitem
      ),
    }));
  };

  const handleAddListitem = () => {
    setEditedList((prevList) => ({
      ...prevList,
      listitems: [...prevList.listitems, { title: "" }],
    }));
  };

  const handleRemoveListitem = (listitemIndex) => {
    setEditedList((prevList) => ({
      ...prevList,
      listitems: prevList.listitems.filter(
        (listitem, index) => index !== listitemIndex
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <div className="edit-container">
      <h2>Edit List</h2>
      <div className="edit-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={editedList.title}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={editedList.description}
            onChange={handleChange}
          />
          <label htmlFor="listitems">List Items</label>
          {editedList.listitems.map((listitem, index) => (
            <div key={index} className="sub-container">
              <input
                type="text"
                name="listitems"
                value={listitem.title}
                onChange={(e) => handleListitemChange(e, index)}
              />
              <button
                type="button"
                className="sub-remove"
                onClick={() => handleRemoveListitem(index)}
              >
                <span>
                  <FontAwesomeIcon icon={faCircleMinus} />
                </span>
              </button>
            </div>
          ))}
          <button type="button" className="sub-add" onClick={handleAddListitem}>
            <span>
              <FontAwesomeIcon icon={faCirclePlus} />
            </span>
          </button>
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
  );
};

export default EditList;
