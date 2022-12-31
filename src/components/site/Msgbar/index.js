import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Msgtab from "./Msgtab";
import "./index.css";
import { FaArrowLeft } from "react-icons/fa";

import { setMsgbar } from "../../../store/features/siteControll";
import axios from "axios";
import { useState } from "react";
function Index() {
  const userauthdata = JSON.parse(window.localStorage.getItem("opentalk"));
  const dispatch = useDispatch();

  const msgbar = useSelector((state) => state.sitecontrol.msgBar);

  const handleClosemsgbar = () => {
    dispatch(setMsgbar(!msgbar));
  };
  let [Listroom, setListroom] = useState([]);
useEffect(()=>{
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/chatrooms/${userauthdata?._id}/${userauthdata?.authcode}`
    )
    .then((data) => {
      setListroom(data.data);
    });
},[msgbar])   //change the api req on createroom click

  return (
    <div
      className={`msgbar z-40 w-full md:w-1/4 h-screen py-1 px-1 flex flex-col  bg-slate-200 fixed top-0 ${
        msgbar ? "-right-0" : "-right-full"
      } transition-all duration-500 bottom-0`}
    >
      <div className="msgareaheader flex items-center p-2">
        <FaArrowLeft size={20} className="icons mx-2" onClick={handleClosemsgbar} />
        <p className="text-3">Messages</p>
      </div>
      <div className="msgsarea ">
        {Listroom.map((user, idx) => {
          return (
            <Msgtab
              key={user.uname + idx}
              name={user.uid}
              roomid={user.roomid}
            />
            
          );
        })}
      </div>
    </div>
  );
}

export default Index;
