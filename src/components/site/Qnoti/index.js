import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import {setNoti} from "../../../store/features/siteControll"
function Index() {
  const dispatch = useDispatch()
 let msg= useSelector((state)=>state.sitecontrol.notification.msg);
 let vis = useSelector((state)=>state.sitecontrol.notification.vis);
 let tout = useSelector((state)=>state.sitecontrol.notification.tout);
  
  setTimeout(()=>{
    dispatch(setNoti({
      msg: "",
    tout: 0,
    vis: false,
    }))
  },tout)
  return (
    <div className={`${vis?'block':'hidden'} qnotimask fixed top-6 left-0 w-full flex justify-center items-center`}>
      <div className="qnoti bg-black rounded-xl text-white py-1 px-2">
        <p className="">{msg ? msg : "lorem lip"}</p>
      </div>
    </div>
  );
}

export default Index;
