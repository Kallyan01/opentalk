import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { VscCopy } from "react-icons/vsc";
import getUser from "../../API/getAPI/getUser";
import { saveUser } from "../../store/features/user";
import { setLoader } from "../../store/features/siteControll";
import { setNoti } from "../../store/features/siteControll";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FaFacebook,FaWhatsapp,FaTwitter } from "react-icons/fa";
import {RiRefreshLine} from "react-icons/ri";
import {Gettime} from "../../helper/Gettime";
import {TbMessageShare} from "react-icons/tb"
import {createRoom} from "../../API/postAPI/createChatroom";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [LinkVisits, setLinkVisits] = useState(0);
  const [Messages, setMessages] = useState([]);
  const [Sharelink, setSharelink] = useState("");
  const userdata = useSelector((state) => state.userdet);
  const [refresh, setRefresh] = useState(false);

  const copyUrl = async(e) => {
    dispatch(
      setNoti({
        msg: 'Copy Success',
        tout: 1000,
        vis: true,
      })
    );
  };
  const userauthdata = {
    _id: 0,
    authcode: 0,
  };
  useEffect(() => {
    const userauthdata = JSON.parse(window.localStorage.getItem("opentalk"));
    if (userauthdata != null) {
      const userdatafetch = async (url) => {
        getUser(url)
          .then((user) => {
            if (user.data.auth) {
              dispatch(saveUser({ ...user.data }));
              setLinkVisits(user.data.linkvisits);
              setMessages([...user.data.msgs]);
              dispatch(setLoader(false));
              setSharelink(
                `${process.env.REACT_APP_URL}/sendmsg/${user.data._id}`
              );
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              window.localStorage.removeItem("opentalk");
              setTimeout(() => {
                navigate("/home");
              }, 2000);
            }
            console.error(err);
          });
      };
      userdatafetch(
        `${process.env.REACT_APP_API_URL}/user/${userauthdata._id}/${userauthdata.authcode}`
      );
    } else {
      navigate("/home");
    }
  }, [refresh]);
  const getStatvalue = (value) => {
    if (value > 99 && value < 1000) return value;
    if (value > 999 && value < 9999999) {
      value = (value / 1000).toPrecision(2);
      return value + "K";
    }
    if (value > 9999999) {
      value = (value / 1000000).toPrecision(3);

      return value + "M";
    }
    return value;
  };

  const handlePTPmseeage = async(uid1,uid2) =>{
    createRoom({
      users: [uid1,uid2],
      msgs: [],
    }).then(data=>{
      console.log(data)
    })
  }
  return (
    <div className="dashboard p-5 mt-10 md:mt-auto">
      <div className=" dashtab-1 stats flex flex-row w-full justify-center align-middle bg-gray-light rounded-xl">
        <div className="linkClk flex flex-col w-1/2 justify-center align-middle p-5">
          <div className="title text-1 font-medium text-xl text-center p-1">
            Linkvisits
          </div>
          <div className="value text-violate text-3xl font-semibold text-center p-4">
            {getStatvalue(LinkVisits)}
          </div>
        </div>
        <div className="msgRec flex flex-col w-1/2 justify-center align-middle p-5">
          <div className="title text-1 font-medium text-xl text-center p-1">
            Messages
          </div>
          <div className="value text-violate text-3xl font-semibold text-center p-4">
            {getStatvalue(Messages.length)}
          </div>
        </div>
      </div>
      <div className="dashtab-1 shareArea bg-gray-light rounded-xl my-2 flex flex-col justify-center items-center w-full p-2">
        <div className="dashtab-2 shareLink bg-slate-200 text-violate rounded-xl py-1 px-1 md:px-7 flex row w-full justify-between items-center">
          <input
            className="bg-transparent w-full text-sm px-1"
            type="text"
            name="linkshare"
            value={Sharelink}
            disabled
          />
          <CopyToClipboard text={Sharelink}
          onCopy={copyUrl}>
          <VscCopy size={25} className="m-2" />
        </CopyToClipboard>
        </div>
        <div className="text-3 my-2 shareText text-center w-full text-xs">
          <p>Share Now</p>
        </div>
        <div className="shareIcon flex flex-row w-full justify-center items-center">
          <a
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`Want to send ${userdata.name} a secret message anonymously send it here via this link https://opentlk.ml/sendmsg/${userdata._id}`)}&amp;src=sdkpreparse`}
            className="fb-xfbml-parse-ignore"
          >
           <FaFacebook size={25} className='icons mx-2'/>
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Want to send ${userdata.name} a secret message anonymously send it here via this link https://opentlk.ml/sendmsg/${userdata._id}`)} `}
            data-action="share/whatsapp/share"
          >
            <FaWhatsapp size={25} className='icons mx-2'/>
          </a>
          <a
            className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Want to send ${userdata.name} a secret message anonymously send it here via this link https://opentlk.ml/sendmsg/${userdata._id}`)}`}
            data-size="large"
          >
            <FaTwitter size={25} className='icons mx-2'/>
          </a>
          {/* twitter */}
        </div>
      </div>
      <div className="messages flex flex-col ">
        <div className="flex flex-row p-1">
          <p className="font-medium text-1 text-xl text-center">Messages</p>
          <p className="refrbtn flex justify-center items-center"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <RiRefreshLine size={20} className='icons mx-2'/>
          </p>
        </div>
        <div className="msglist flex flex-col ">
          {Messages.map((msg, idx) => {
            return (
              <div className="dashtab-1 card my-1  flex flex-row justify-between w-full p-2 minheight items-center bg-gray-light rounded-xl">
                <div className="message text-1">{msg.text}</div>
                <div className="msgext flex flex-col-reverse w-10  h-full justify-between ">
                  <div className="chatbtn ml-auto" ><TbMessageShare size={20} className='icons mx-2' onClick={()=>handlePTPmseeage(userdata._id, msg.uid)}/></div>
                  <div className="msgtime text-3">{Gettime(msg?.time)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
