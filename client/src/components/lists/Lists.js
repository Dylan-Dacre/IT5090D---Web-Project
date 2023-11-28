import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CreateList from "./CreateList";
import EditList from "./EditList";
import DeleteList from "./DeleteList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

const Lists = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [lists, setLists] = useState([]);
  const [isCreateListVisible, setIsCreateListVisible] = useState(false);
  const [isEditListVisible, setIsEditListVisible] = useState(false);
  const [listToEdit, setListToEdit] = useState(null);
  const [isDeleteListVisible, setIsDeleteListVisible] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [updateLists, setUpdateLists] = useState(false);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5001/api/lists", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    });
    const data = await response.json();
    setLists(data);
  };

  const openCreateList = () => {
    setIsCreateListVisible(true);
  };

  const closeCreateList = () => {
    setIsCreateListVisible(false);
    setUpdateLists(!updateLists);
  };

  const openEditList = (list) => {
    setListToEdit(list);
    setIsEditListVisible(true);
  };

  const closeEditList = () => {
    setIsEditListVisible(false);
    setUpdateLists(!updateLists);
  };

  const openDeleteList = (list) => {
    setListToDelete(list);
    setIsDeleteListVisible(true);
  };

  const closeDeleteList = () => {
    setIsDeleteListVisible(false);
    setUpdateLists(!updateLists);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLists]);

  return (
    <div className="content-container">
      <h1>Lists</h1>
      <div className="list-container">
        <ul className="list">
          {lists.map((list) => (
            <li className="main-list-item" key={list._id}>
              <h2>{list.title}</h2>
              <p className="item-description">{list.description}</p>
              <ul className="inner-list">
                {list.listitems.map((listitem, index) => (
                  <li className="inner-list-item" key={index}>
                    <p>{listitem.title}</p>
                  </li>
                ))}
              </ul>
              <div className="controls">
                <button
                  className="icon-pen"
                  onClick={(e) => {
                    e.preventDefault();
                    openEditList(list);
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
                    openDeleteList(list);
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
      <button className="new-item" onClick={openCreateList}>
        <span>
          <FontAwesomeIcon icon={faCirclePlus} />
        </span>
      </button>
      {isCreateListVisible && <CreateList onClose={closeCreateList} />}
      {isEditListVisible && listToEdit !== null && (
        <EditList list={listToEdit} onClose={closeEditList} />
      )}
      {isDeleteListVisible && listToDelete !== null && (
        <DeleteList list={listToDelete} onClose={closeDeleteList} />
      )}
    </div>
  );
};

export default Lists;
