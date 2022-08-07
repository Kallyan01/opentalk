import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Msgtab from "./Msgtab";
import "./index.css";
import {FaArrowLeft}  from "react-icons/fa";

import { setMsgbar } from "../../../store/features/siteControll";
function Index() {
  const dispatch= useDispatch()

  const msgbar = useSelector((state) => state.sitecontrol.msgBar);

  const handleClosemsgbar=()=>{
    dispatch(setMsgbar(!msgbar))
  }
  let listroom = [
    {
      roomid: "b3g423hkk342b",
      users: ['asjdjhas7d6a87d6','23h4kh23kh4'], //add this
      msgs :[
        {
          uid:"23h4kh23kh4",
          text: "hey there",
          time: "12:45 PM"
        },
        {
          uid:"23h4kh23kh2",
          text: "Hi i am ram",
          time: "12:46 PM"
        },
        
      ]
    },
    {
      roomid: "c3g42432k342b",
      users: ['asjdjhas7d6a87d6','23h4kh23kh4'], //add this
      msgs :[
        {
          uid:"23h4kh23kh4",
          text: "hey there",
          time: "12:45 PM"
        },
        {
          uid:"784923kh23kh2",
          text: "Hi i am ram",
          time: "12:46 PM"
        },
        {
          uid:"23h4kh23kh4",
          text: "How is your school going",
          time: "12:55 PM"
        },
      ]
    },
    {
      roomid: "bhjfh7hkk342b",
      users: ['asjdjhas7d6a87d6','23h4kh23kh4'], //add this
      msgs :[
        {
          uid:"23h4kh23kh4",
          text: "hey there",
          time: "12:45 PM"
        },
        {
          uid:"23h4kh23kh2",
          text: "Hi i am ram",
          time: "12:46 PM"
        }
      ]
    },
    {
      roomid: "b389dgak342b",
      users: ['asjdjhas7d6a87d6','23h4kh23kh4'], //add this
      msgs :[
        {
          uid:"23h4kh23kh4",
          text: "hey there",
          time: "12:45 PM"
        },
        {
          uid:"23h4kh23kh2",
          text: "Hi i am ram",
          time: "12:46 PM"
        }
      ]
    },
  ]

  return (
    <div
      className={`msgbar z-40 w-full md:w-1/4 h-screen py-1 px-1 flex flex-col  bg-slate-300 fixed top-0 ${
        msgbar ? "-right-0" : "-right-full"
      } transition-all duration-500 bottom-0`}
    >
          <div className="msgareaheader flex items-center p-2">
            <FaArrowLeft size={20} className='mx-2' onClick={handleClosemsgbar}/>
            <p >Messages</p>
          </div>
          <div className="msgsarea ">
            
            {listroom.map((user,idx)=>{
            return <Msgtab key={user.uname+idx} name={user.users[0]}  msgs={user.msgs} roomid={user.roomid}/>
            })}
          </div>
    </div>
  );
}

export default Index;
