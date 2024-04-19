import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import Participants from "./pages/Participants";
import Events from "./pages/Events";
import Runs from "./pages/Runs";
import Team from "./pages/Team";

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };
  return (
    <Router>
      <div>
        <Sidebar hidden={sidebarHidden} />
        <div className="content">
          <Navbar onMenuClick={toggleSidebar} />
          <Routes>
            <Route default path="/" element={<Dashboard />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/events" element={<Events />} />
            <Route path="/participantruns" element={<Runs />} />
            <Route path="/team" element={<Team />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
