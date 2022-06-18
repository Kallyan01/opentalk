import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../page/home";
function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default MainRoute;
