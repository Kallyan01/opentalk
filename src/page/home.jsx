import React from "react";
import { useState } from "react";
import createUser from "../API/postAPI/createUser";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "../store/features/user";
import coreimg from "../asset/img2.png";
import {useNavigate} from 'react-router-dom'
import { setLoader } from "../store/features/siteControll";
function Home() {
  const userauthdata = JSON.parse(window.localStorage.getItem("opentalk"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [User, setUser] = useState({
    name: "",
    joindate: new Date(),
    activedate: new Date(),
    msgs: [],
    linkvisits: 0,
    ip: "",
    location: {
      latitude: "",
      longitude: "",
    },
  });
  useEffect(() => {
    if(userauthdata)
    {

      navigate('/dashboard')
    } 
    axios.get("https://geolocation-db.com/json/").then((data) => {
      setUser({ ...User, ip: data.data.IPv4 });
    });
    getLocation();
    dispatch(setLoader(false))
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
    setUser({
      ...User,
      location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
    });
  }

  const handleCreate = async (event) => {
    dispatch(setLoader(true))
    event.preventDefault();
    createUser(`${process.env.REACT_APP_API_URL}/user/create`, User)
    .then((data) => {
      dispatch(saveUser({ ...data.data }));
      localStorage.setItem("opentalk", JSON.stringify({
        _id : data.data._id,
        authcode : data.data.authcode
      }));
      navigate('/dashboard')
      })
      .catch((err) =>
      { 
        dispatch(setLoader(false))
        console.log(err)
      }
      )
  };
  return (
    <div className="text-violate w-full h-screen flex justify-center align-middle flex-col">
      <img src={coreimg} className="mx-auto md:hidden" height="40%" width="100%" alt="" />
      <p className="text-4xl font-semibold px-10">What's Your Name ?</p>
      <form className="px-10 flex flex-col" onSubmit={createUser}>
        <div className="textBox my-4">
        <input className="impBox w-full" type="text" value={User.name} placeholder="Enter Your Name" onChange={(e)=>setUser({...User,name:e.target.value})} />
        </div>
        <div className="startBtn">
          <button className="btn bg-violate text-white" onClick={handleCreate}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
