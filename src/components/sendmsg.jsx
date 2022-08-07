import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../store/features/siteControll";
function Sendmsg() {
  const dispatch = useDispatch();
  const [Msg, setMsg] = useState();
  useEffect(() => {
    dispatch(setLoader(false));
  }, []);
  async function sendMsg(event) {
    event.preventDefault();

    let bodyContent = {
      msg: Msg,
    };
    let url = `${process.env.REACT_APP_API_URL}/user/62a720a397fd379e630c43bd/sentmsg`;

    axios
      .post(url, bodyContent)
      .then((data) => {
        setMsg("");
      })
      .catch((err) => console.log(err));
  }
  return (
    <form onSubmit={sendMsg}>
      <input
        type="text"
        name=""
        value={Msg}
        onChange={(e) => setMsg(e.target.value)}
        id=""
      />
      <input type="submit" value="Send" />
    </form>
  );
}

export default Sendmsg;
