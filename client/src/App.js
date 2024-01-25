import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/Header";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/tasks/Tasks";
import Lists from "./components/lists/Lists";
import Notes from "./components/notes/Notes";
import Goals from "./components/goals/Goals";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="/tasks" element={<ProtectedRoute />}>
            <Route index element={<Tasks />} />
          </Route>

          <Route path="/lists" element={<ProtectedRoute />}>
            <Route index element={<Lists />} />
          </Route>

          <Route path="/notes" element={<ProtectedRoute />}>
            <Route index element={<Notes />} />
          </Route>

          <Route path="/goals" element={<ProtectedRoute />}>
            <Route index element={<Goals />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
