import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setNav } from "../../../store/features/siteControll";
import { useSelector } from "react-redux/es/hooks/useSelector";
function Navbar() {
  const dispatch = useDispatch();
  const nav = useSelector((state)=>state.sitecontrol.navBar)
  const handleClick=()=>{
    dispatch(setNav(!nav))
  }
  return (
    <div className="navbar flex w-full fixed top-0">
      <div className="bmenu w-full py-4 px-2">
        <IconContext.Provider value={{ color: "black", size: "35px" }}>
          <HiMenuAlt1 onClick={handleClick}/>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Navbar;
