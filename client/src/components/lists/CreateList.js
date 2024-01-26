import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const CreateList = ({ onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [newList, setNewList] = useState({
    title: "",
    description: "",
    listitems: [{ title: "" }],
  });

  const handleChange = (e, listitemIndex) => {
    const { name, value } = e.target;
    if (name === "listitems") {
      setNewList((prev) => ({
        ...prev,
        listitems: prev.listitems.map((listitem, index) =>
          index === listitemIndex ? { ...listitem, title: value } : listitem
        ),
      }));
    } else {
      setNewList((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddListitem = () => {
    setNewList((prev) => ({
      ...prev,
      listitems: [...prev.listitems, { title: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonBlankListitems = newList.listitems.filter(
      (listitem) => listitem.title !== ""
    );

    const listToCreate = {
      ...newList,
      listitems: nonBlankListitems,
    };

    try {
      const response = await fetch("http://localhost:1337/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
        body: JSON.stringify(listToCreate),
      });

      if (response.ok) {
        console.log("List created successfully");
      } else {
        console.error("Error creating list");
      }
    } catch (error) {
      console.error("Error creating list", error);
    }

    onClose();
  };

  return (
    <div className="background">
      <div className="create-container">
        <h2>New List</h2>
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={newList.title}
              onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={newList.description}
              onChange={handleChange}
            />
            <label htmlFor="listitems">List Items:</label>
            {newList.listitems.map((listitem, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="listitems"
                  value={listitem.title}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            ))}
            <button
              className="add-sub-item"
              type="button"
              onClick={handleAddListitem}
            >
              <span>
                <FontAwesomeIcon icon={faCirclePlus} />
              </span>
            </button>
            <button className="submit" type="submit">
              submit
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

export default CreateList;
