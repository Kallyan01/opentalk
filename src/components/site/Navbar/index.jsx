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
    <div className="navbar relative flex justify-between w-full h5">
      <div className="bmenu p-2">
          <HiMenuAlt1 size={30} className='icons' onClick={handleSidebar}/>
      </div>
      <div className="msgbox p-2">
        <TbMessages size={30} className='icons' onClick={handleMsg}/>
      </div>
      
    </div>
  );
}

export default Navbar;
