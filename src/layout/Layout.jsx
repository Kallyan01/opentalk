import React from "react";
import { Outlet } from "react-router-dom";
import coreimg from "../asset/img2.png";
import Navbar from "../components/site/Navbar";
import Sidebar from "../components/site/Sidebar";
import Msgbar from "../components/site/Msgbar";
import Chatarea from "../components/site/Chatarea";

function Layout() {
  return (
    <div className="layout flex flex-col h-screen overflow-hidden">
      <div className="h-[5%] md:h-[7%]">
        <Navbar />
      </div>
      <Sidebar />
      <Msgbar />
      <Chatarea />
      <div className=" flex w-full h-[93%]">
        <div className="md:w-2/3 md:flex hidden justify-center flex-col">
          <div className="w-full flex justify-center align-middle">
            <img src={coreimg} alt="" height={300} width={500} />
          </div>
          <div className="w-full flex justify-center align-middle p-5 mt-10">
            <p className="uppercase font-bold text-3xl">Welcome To OpenTlk</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
