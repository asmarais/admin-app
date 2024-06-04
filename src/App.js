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
import Login from "./pages/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/events" element={<Events />} />
          <Route path="/participantruns" element={<Runs />} />
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/team" element={<Team />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
