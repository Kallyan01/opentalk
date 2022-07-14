import React from "react";
import { Outlet } from "react-router-dom";
import coreimg from "../asset/img2.png";
import Navbar from "../components/site/Navbar";
import Sidebar from "../components/site/Sidebar";

function Layout() {
  return (
    <div className="layout flex flex-col h-screen">
     <Navbar/>
     <Sidebar/>
      <div className="body flex w-full">
        <div className="left md:w-1/2 md:flex hidden justify-center flex-col">
          <div className="w-full flex justify-center align-middle">
            <img src={coreimg} alt="" height={300} width={500} />
          </div>
          <div className="w-full flex justify-center align-middle p-5 mt-10">
            <p className="uppercase font-bold text-3xl">Welcome To OpenTalk</p>
          </div>
        </div>
        <div className="right w-full md:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
