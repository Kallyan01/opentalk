import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getUser from "../../API/getAPI/getUser";
import { saveUser } from "../../store/features/user";
import Loader from "../../components/site/loader"
import { setLoader } from "../../store/features/siteControll";
function Dashboard() {
  const loaderStatus = useSelector((state)=>state.sitecontrol.loader)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [LinkVisits, setLinkVisits] = useState(0);
  const [Messages, setMessages] = useState([]);
  const data = useSelector((state) => state.userdet);
  const [refresh,setRefresh] =useState(false)
  useEffect(() => {
    const userauthdata = JSON.parse(window.localStorage.getItem("opentalk"));
    if (userauthdata) {
      const userdatafetch = async (url) => {
        getUser(url)
        .then((user)=>{
          if(user.data.auth)
          {
            dispatch(saveUser({ ...user.data }));
            setLinkVisits(user.data.linkvisits);
            setMessages([...user.data.msgs]);
            dispatch(setLoader(false))
          }
          else
          {
            console.log(user.data.err)
            navigate('/home')
          }
        }).catch((err)=>{
          console.log(err)
        })
      };
      // console.log(Messages)
      userdatafetch(
        `http://localhost:5000/user/${userauthdata._id}/${userauthdata.authcode}`
      );
    } else {
      navigate("/home");
    }
  }, [refresh]);
  return (
    <div className="dashboard p-5">
      <Loader status={loaderStatus}/>
      <div className="stats flex flex-row w-full justify-center align-middle bg-gray-light rounded-xl">
        <div className="linkClk flex flex-col w-1/2 justify-center align-middle p-5">
          <div className="title font-medium text-xl text-center p-1">
            Linkvisits
          </div>
          <div className="value text-violate text-4xl font-semibold text-center p-4">
            {LinkVisits}
          </div>
        </div>
        <div className="msgRec flex flex-col w-1/2 justify-center align-middle p-5">
          <div className="title font-medium text-xl text-center p-1">
            Messages
          </div>
          <div className="value text-violate text-4xl font-semibold text-center p-4">
            {Messages.length}
          </div>
        </div>
      </div>
      <div className="messages flex flex-col ">
        <div className="flex flex-row p-1">
          <p className="font-medium text-xl text-center">Messages</p>
          <p onClick={()=>{setRefresh(!refresh)}}>refresh</p>
        </div>
        <div className="msglist flex flex-col ">
          {Messages.map((msg, idx) => {
            return (
              <div className="card my-1  flex flex-row w-full p-3 minheight items-center bg-gray-light rounded-xl">
                {msg.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
