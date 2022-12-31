import React, {useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearChatroom } from "../../../store/features/siteControll";
import io from "socket.io-client";
import "../../../css/Chatarea/chat.css";
import { useEffect,useState } from "react";
const socket = io.connect("http://192.168.0.103:5000",{
  query: {
    userId: '12345'
  }});

function Index() {
  const dispatch = useDispatch();
  const msgAreaRef = useRef(null);
  const chatbox = useSelector((state) => state.sitecontrol.chatArea);



  const scrollToBottom = () => {
    msgAreaRef.current?.scrollIntoView({ behavior: "smooth" })
    console.log(msgAreaRef.current?.scrollIntoView({ behavior: "smooth" }))
  }

  const closechat = () => {
    dispatch(clearChatroom());
  };
  const uid = 123;
  const [msgs,setMsgs] = useState([
    {
      uid: 123,
      text: "Hi i am kallyan",
    },
    {
      uid: 223,
      text: "Hello ! Kallyan , alock this side",
    }
  ])
  const [Userscount, setUserscount] = useState();
  const [message,setMessage] = useState();
  const sendMsg = (text) => {
    console.log("sent")
    socket.emit("message", { message: message });
    console.log(msgs)
    let arr = msgs ;
    arr.push({
      uid: 123,
      text: message
    })
    setMsgs(arr)
    setMessage("")
    scrollToBottom();
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      scrollToBottom();
      let arr = msgs ;
    arr.push({
      uid: 223,
      text: data
    })
    setMsgs(arr)
    });
    socket.on("users", (data) => {
      setUserscount(data);
    });
  }, [socket]);

  return (
    <>
      {chatbox.status && (
        <div
          className={`msgbar z-40 w-full md:w-1/4 h-screen py-1 px-1 flex flex-col  bg-slate-300 ${
            chatbox.status ? "-right-0" : "-right-3/4 hidden"
          } fixed top-0 transition-all duration-500 bottom-0`}
        >
          {/* <p onClick={closechat}>Close</p>
        <h1>hello chat{chatbox.roomid}</h1> */}
          <div className="header flex">
            <div className="backbtn px-5" onClick={closechat}>
              back
            </div>
            <div className="avatar">
              {/* <p>{chatbox.roomid}</p> */}
              <p>{Userscount}</p>
            </div>
            <div className="uname"></div>
          </div>
          <div className="msgbody pb-[55px] " ref={msgAreaRef}>
            {/* <div className="msg float-right clear-both right">Hi !</div>
           <div className="msg float-left clear-both left">Hello my friend</div> */}
            {msgs.map((cont, idx) => {
              if (uid === cont.uid)
                return (
                  <div className="msg float-right clear-both right">
                    {cont.text}
                  </div>
                );
              else
                return (
                  <div className="msg float-left clear-both left">
                    {cont.text}
                  </div>
                );
            })}
          </div>
          <div className="msginputbox flex fixed bottom-0 md:static left-0">
            <div className="textinputarea">
              <input type="text" placeholder="Enter your message " value={message} onChange={(e)=>{setMessage(e.target.value)}} />
            </div>
            <button
              className="textsendarea flex  justify-center items-center"
              onClick={()=> sendMsg(message)}
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
