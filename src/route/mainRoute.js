import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../page/home";
import Messagebox from "../page/msgbox"
import Dashboard from "../page/auth/dashboard";
import Userpage from "../page/auth/userpage";

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="sendmsg/:_id" element={<Messagebox />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<Userpage />} />
      </Route>
    </Routes>
  );
}

export default MainRoute;
