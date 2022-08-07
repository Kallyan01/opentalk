import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearChatroom } from "../../../store/features/siteControll";
import "../../../css/Chatarea/chat.css";
function Index() {
  const dispatch = useDispatch();
  const chatbox = useSelector((state) => state.sitecontrol.chatArea);
  console.log(chatbox);
  const closechat = () => {
    dispatch(clearChatroom());
  };
  const uid = 123
  const msgs = [
    {
      uid: 123,
      text: "Hi i am kallyan",
    },
    {
      uid: 223,
      text: "Hello ! Kallyan , alock this side",
    },
    {
      uid: 123,
      text: "I have a question ! can i ask?",
    },
    {
      uid: 223,
      text: "Yes ! Kallyan please",
    },
    {
      uid: 123,
      text: "I wanted to beacome a fullstack engineer what should be my path",
    },
    {
      uid: 223,
      text: "Oh! so see this things depends time to time so , can we have a call to discuss about this ,in chat it would be bit difficult to discuss all the things ",
    },
    {
      uid: 123,
      text: "Yes ! sure",
    },
    {
      uid: 123,
      text: "Here is my No - 7044580949",
    },
  ];
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
              <p>Av</p>
            </div>
            <div className="uname">

            </div> 
          </div>
          <div className="msgbody ">
            {/* <div className="msg float-right clear-both right">Hi !</div>
           <div className="msg float-left clear-both left">Hello my friend</div> */}
            {msgs.map((cont, idx) => {
              if (uid == cont.uid)
               return <div className="msg float-right clear-both right">
                  {cont.text}
                </div>;
              else
               return <div className="msg float-left clear-both left">
                  {cont.text}
                </div>;
            })}
          </div>
          <div className="msginputbox flex fixed bottom-0 md:static left-0">
            <div className="textinputarea">
              <input type="text" placeholder="hi" />
            </div>
            <div className="textsendarea flex  justify-center items-center">
              SEND
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
