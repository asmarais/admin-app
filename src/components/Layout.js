import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  return (
    <div>
      <Sidebar hidden={sidebarHidden} />
      <div className="content">
        <Navbar onMenuClick={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
