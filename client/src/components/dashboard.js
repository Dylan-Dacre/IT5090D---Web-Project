import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Weather from "../utils/Weather";
import Calendar from "../utils/Calendar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="weather-container">
        <Weather />
      </div>
      <div className="calendar-container">
        <Calendar />
      </div>
      <div className="links-container">
        <button onClick={() => navigate("/tasks")}>Tasks</button>
        <button onClick={() => navigate("/lists")}>Lists</button>
        <button onClick={() => navigate("/notes")}>Notes</button>
        <button onClick={() => navigate("/goals")}>Goals</button>
      </div>
    </div>
  );
};

export default Dashboard;
