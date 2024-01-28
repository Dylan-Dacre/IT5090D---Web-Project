import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CreateGoal from "./CreateGoal";
import EditGoal from "./EditGoal";
import DeleteGoal from "./DeleteGoal";
import CompleteGoal from "./CompleteGoal";
import ScrollToTop from "../../utils/ScrollToTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPen,
  faTrash,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const moment = require("moment-timezone");

const Goals = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [goals, setGoals] = useState([]);
  const [isCreateGoalVisible, setIsCreateGoalVisible] = useState(false);
  const [isDeleteGoalVisible, setIsDeleteGoalVisible] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [isEditGoalVisible, setIsEditGoalVisible] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [goalToComplete, setGoalToComplete] = useState(null);
  const [updateGoals, setUpdateGoals] = useState(false);

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/goals`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    });
    const data = await response.json();
    setGoals(data);
  };

  const formatDate = (utcDate) => {
    const nzstDate = moment(utcDate)
      .tz("Pacific/Auckland")
      .format("DD/MM/YYYY");
    return nzstDate;
  };

  const openCreateGoal = () => {
    setIsCreateGoalVisible(true);
  };

  const closeCreateGoal = () => {
    setIsCreateGoalVisible(false);
    setUpdateGoals(!updateGoals);
  };

  const openDeleteGoal = (goal) => {
    setGoalToDelete(goal);
    setIsDeleteGoalVisible(true);
  };

  const closeDeleteGoal = () => {
    setGoalToDelete(null);
    setIsDeleteGoalVisible(false);
    setUpdateGoals(!updateGoals);
  };

  const openEditGoal = (goal) => {
    setGoalToEdit(goal);
    setIsEditGoalVisible(true);
  };

  const closeEditGoal = () => {
    setGoalToEdit(null);
    setIsEditGoalVisible(false);
    setUpdateGoals(!updateGoals);
  };

  const openCompleteGoal = (goal) => {
    setGoalToComplete(goal);
  };

  const closeCompleteGoal = () => {
    setGoalToComplete(null);
    setUpdateGoals(!updateGoals);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateGoals]);

  return (
    <div className="content-container">
      <h1>Goals</h1>
      <div className="list-container">
        <ul className="list">
          {goals.map((goal) => (
            <li className="main-list-item" key={goal._id}>
              <h2>{goal.title}</h2>
              <p className="item-description">{goal.description}</p>
              <p className="date">
                Goal Created: {formatDate(goal.dateCreated)}
              </p>
              <div className="controls">
                <button
                  className="icon-pen"
                  onClick={(e) => {
                    e.preventDefault();
                    openEditGoal(goal);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                </button>
                <button
                  className="icon-complete"
                  onClick={(e) => {
                    e.preventDefault();
                    openCompleteGoal(goal);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                </button>
                <button
                  className="icon-trash"
                  onClick={(e) => {
                    e.preventDefault();
                    openDeleteGoal(goal);
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
      <button className="new-item" onClick={openCreateGoal}>
        <span>
          <FontAwesomeIcon icon={faCirclePlus} />
        </span>
      </button>
      {isCreateGoalVisible && <CreateGoal onClose={closeCreateGoal} />}
      {isEditGoalVisible && (
        <EditGoal goal={goalToEdit} onClose={closeEditGoal} />
      )}
      {isDeleteGoalVisible && (
        <DeleteGoal goal={goalToDelete} onClose={closeDeleteGoal} />
      )}
      {goalToComplete && (
        <CompleteGoal goal={goalToComplete} onClose={closeCompleteGoal} />
      )}
      <ScrollToTop />
    </div>
  );
};

export default Goals;
