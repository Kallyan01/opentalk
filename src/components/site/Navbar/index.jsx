import React from "react";
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setNav } from "../../../store/features/siteControll";
import { setMsgbar } from "../../../store/features/siteControll";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { HiMenuAlt1 } from "react-icons/hi";
import {TbMessages} from "react-icons/tb";

function Navbar() {
  const dispatch = useDispatch();
  const nav = useSelector((state)=>state.sitecontrol.navBar)
  const msgBar = useSelector((state)=>state.sitecontrol.msgBar)
  const handleSidebar=()=>{
    dispatch(setNav(!nav))
  }
  const handleMsg=()=>{
    dispatch(setMsgbar(!nav))
  }
  return (
    <div className="navbar flex justify-between w-full fixed top-0">
      <div className="bmenu p-2">
          <HiMenuAlt1 size={30} onClick={handleSidebar}/>
      </div>
      <div className="msgbox p-2">
        <TbMessages size={30} onClick={handleMsg}/>
      </div>
      
    </div>
  );
}

export default Navbar;
