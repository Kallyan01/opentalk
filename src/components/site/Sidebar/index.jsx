import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { IconContext } from "react-icons";
import { setNav } from "../../../store/features/siteControll";
import { AiOutlineCloseCircle } from "react-icons/ai";
function Sidebar() {
  const dispatch = useDispatch();
  const nav = useSelector((state)=>state.sitecontrol.navBar)
  const handleClick=()=>{
    dispatch(setNav(!nav))
  }
  return (
    <ul
      className={`sidebar h-screen w-3/4 md:w-1/4 py-5 px-2 flex flex-col justify-center items-center bg-violet-700 absolute top-0 ${
        nav ? "-left-0" : "-left-3/4"
      } transition-all duration-500 bottom-0`}
    >
      <div className="absolute top-0 right-0 p-2">
        <IconContext.Provider value={{ color: "white", size: "25px" }}>
          <AiOutlineCloseCircle onClick={handleClick}/>
        </IconContext.Provider>
      </div>
      <NavLink to="/home">
        <li>Home</li>
      </NavLink>
      <NavLink to="">
        <li>User</li>
      </NavLink>
      <NavLink to="">
        <li>Contact Us</li>
      </NavLink>
      <NavLink to="">
        <li>About Us</li>
      </NavLink>
      <NavLink to="">
        <li>Privacy &amp; Policy</li>
      </NavLink>
    </ul>
  );
}

export default Sidebar;
