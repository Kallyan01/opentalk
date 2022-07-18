import React from "react";
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setNav } from "../../../store/features/siteControll";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { HiMenuAlt1 } from "react-icons/hi";
import {TbMessages} from "react-icons/tb";

function Navbar() {
  const dispatch = useDispatch();
  const nav = useSelector((state)=>state.sitecontrol.navBar)
  const handleClick=()=>{
    dispatch(setNav(!nav))
  }
  return (
    <div className="navbar flex justify-between w-full fixed top-0">
      <div className="bmenu p-2">
          <HiMenuAlt1 size={30} onClick={handleClick}/>
      </div>
      <div className="msgbox p-2">
        <TbMessages size={30} />
      </div>
      
    </div>
  );
}

export default Navbar;
