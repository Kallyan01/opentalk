import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import coreimg from "../asset/img2.png";
import { useParams } from "react-router-dom";
import getUser from "../API/getAPI/getUser";
import Loader from "../components/site/loader";
import { setLoader } from "../store/features/siteControll";
import { setNoti } from "../store/features/siteControll";
import CreateUser from "../API/postAPI/createUser";
import Createacc from "../components/site/Createacc";

function Msgbox() {
  const userauthdata = JSON.parse(window.localStorage.getItem("opentalk"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useParams();
  const createUser = () => {
    return true;
  };
  const [User, setUser] = useState({
    name: "",
    joindate: new Date(),
    activedate: new Date(),
    chatrooms: [],
    msgs: [],
    linkvisits: 0,
    ip: "",
    location: {
      latitude: "",
      longitude: "",
    },
  });
  const [Msg, setMsg] = useState({
    uid: "",
    text: "",
    ip: "",
    time: new Date().toString(),
    location: {
      latitude: "",
      longitude: "",
    },
  });
  const [delivarySts, setDelivarySts] = useState(false);
  useEffect(() => {
    if (!userauthdata) {
      createtempacc();
    }
    setMsg({ ...Msg, uid: userauthdata ? userauthdata._id : "" });
  }, [Msg.text]);
  useEffect(() => {
    if (!userauthdata) {
      axios.get("https://geolocation-db.com/json/").then((data) => {
        setUser({ ...User, ip: data.data.IPv4 });
      });
    }
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getuser/${_id}`)
      .then((data) => {
        console.log(data.data);
        setUser({ name: data?.data?.username });
        dispatch(setLoader(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setNoti({
            msg: "User Not Found",
            tout: 2000,
            vis: true,
          })
        );
        navigate("/home");
      });
  }, []);
  useEffect(() => {
    if (_id !== userauthdata._id) {
      axios.get("https://geolocation-db.com/json/").then((data) => {
        setMsg({ ...Msg, ip: data.data.IPv4 });
      });
      getLocation();
      axios
        .get(`${process.env.REACT_APP_API_URL}/linkview/inc/${_id}`)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  }, []);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    setMsg({
      ...Msg,
      location: {
        latitude: position.coords.latitude,
        ...Msg.location,
      },
    });
    setMsg({
      ...Msg,
      location: {
        ...Msg.location,
        longitude: position.coords.longitude,
      },
    });
    console.log(Msg);
  }
  async function sendMsg(event) {
    event.preventDefault();
    console.log(Msg);
    if (_id !== userauthdata._id) {
      let url = `${process.env.REACT_APP_API_URL}/user/${_id}/sentmsg`;
      let bodyContent = {
        msgs: Msg,
      };
      axios
        .post(url, bodyContent)
        .then((data) => {
          setDelivarySts(true);
          dispatch(
            setNoti({
              msg: "Message Sent",
              tout: 1000,
              vis: true,
            })
          );
          setMsg({ ...Msg, text: "" });
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(
        setNoti({
          msg: "You can't send message to yourself",
          tout: 2000,
          vis: true,
        })
      );
    }
  }
  const createtempacc = async () => {
    CreateUser(`${process.env.REACT_APP_API_URL}/tempuser/create`, User)
      .then((data) => {
        localStorage.setItem(
          "opentalk",
          JSON.stringify({
            _id: data?.data?._id,
            authcode: data?.data?.authcode,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="text-violate w-full h-screen flex align-middle flex-col">
      {/* <Createacc visible={true}/> */}
      <div className="messagearea m-auto">
        <p className="text-4xl font-semibold px-9 my-2">Hey,</p>
        <p className="text-2xl font-semibold px-9">
          Send {User?.name?.toUpperCase()} Your Secret Message here
        </p>
        <form className="px-10 flex flex-col" onSubmit={sendMsg}>
          <div className="sndmsg my-4 relative">
            <textarea
              className="parabox w-full"
              rows="8"
              value={Msg.text}
              onChange={(e) => setMsg({ ...Msg, text: e.target.value })}
            ></textarea>
            <p className="absolute bottom-2 right-2">{Msg.text.length}/1000</p>
          </div>
          <span>
            We ensure you , that {User?.name} will naver know who you are{" "}
          </span>
          <input
            type="submit"
            className="btn bg-violate text-white"
            value="Send The Secret Message"
            required
          />
        </form>
      </div>
    </div>
  );
}

export default Msgbox;
