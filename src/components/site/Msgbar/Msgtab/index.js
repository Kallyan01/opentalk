import React from "react";
import { setChatroom } from "../../../../store/features/siteControll";
import { useDispatch } from "react-redux";
function Index({name,roomid,msgs}) {
  const dispatch = useDispatch()
  const chat=(uid,uname)=>{
     dispatch(setChatroom({
      status: true,
      name: uname,
      roomid: roomid
     }))
  }
  return (
    <div className=" flex flex-row justify-between w-full px-2 my-2 bg-slate-400 rounded-lg" onClick={()=>chat(roomid,name)}>
      <div className="left flex flex-row justify-between items-center">
        <div className="propic flex justify-center items-center rounded-full bg-red-600 h-10 w-10">
          R
        </div>
        <div className="det px-3">
          <p className="name font-semibold">{name}</p>
          {/* <p className="lastmsg">{msgs[msgs.length-1].text}</p> */}
        </div>
      </div>
      <div className="right flex flex-row">
        <div className="time">
          {/* <p className="timelastmsg text-xs">{msgs[msgs.length-1].time}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Index;
