import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { IconContext } from "react-icons";
import { setNav } from "../../../store/features/siteControll";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../../store/features/user";
function Sidebar() {
  const navigate = useNavigate()
  const auth = useSelector(state=> state.userdet.auth)
  const dispatch = useDispatch();
  const nav = useSelector((state)=>state.sitecontrol.navBar)
  const handleClick=()=>{
    dispatch(setNav(!nav))
  }
  const logout=()=>
  {
   window.localStorage.removeItem("opentalk")
   dispatch(resetUser())
   navigate('/home')
  }
  return (
    <ul
      className={`sidebar z-40 w-3/4 md:w-1/4 h-screen py-5 px-2 flex flex-col justify-center items-center bg-slate-300 fixed top-0 ${
        nav ? "-left-0" : "-left-3/4"
      } transition-all duration-500 bottom-0`}
    >
      <div className="absolute top-0 right-0 p-2">
        <IconContext.Provider value={{ color: "red", size: "25px" }}>
          <AiOutlineCloseCircle onClick={handleClick}/>
        </IconContext.Provider>
      </div>
      <NavLink to="/home">
        <li>Home</li>
      </NavLink>
      {auth&&<NavLink to="/user">
        <li>User</li>
      </NavLink>}
      <NavLink to="">
        <li>Contact Us</li>
      </NavLink>
      <NavLink to="">
        <li>About Us</li>
      </NavLink>
      <NavLink to="">
        <li>Privacy &amp; Policy</li>
      </NavLink>
      {auth&&<div className="flex justify-center absolute bottom-0 left-0 right-0 p-2 bg-red-600 text-white" onClick={logout}>
        Logout
        <IconContext.Provider value={{ color: "white", size: "25px" }} >
          <AiOutlineCloseCircle onClick={handleClick} className="mx-3"/>
        </IconContext.Provider>
      </div>}
    </ul>
  );
}

export default Sidebar;
