import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Tasks from "./components/Tasks";
import Lists from "./components/Lists";
import Notes from "./components/Notes";

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
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/tasks" element={<ProtectedRoute />}>
            <Route index element={<Tasks />} />
          </Route>

          <Route path="/lists" element={<ProtectedRoute />}>
            <Route index element={<Lists />} />
          </Route>

          <Route path="/notes" element={<ProtectedRoute />}>
            <Route index element={<Notes />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
