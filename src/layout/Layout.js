import React from "react";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="layout">
      <div className="left">Left</div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
