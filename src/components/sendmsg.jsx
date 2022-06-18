import axios from "axios";
import React, { useState, useEffect } from "react";

function Sendmsg() {
  const [Msg, setMsg] = useState();

  async function sendMsg(event) {
    event.preventDefault();

    let bodyContent = {
      "msg": Msg,
    };
    let url = "http://localhost:5000/user/62a720a397fd379e630c43bd/sentmsg";
    
    
      axios.post(url,bodyContent)
      .then((data)=>{
        setMsg('')
      })
      .catch((err)=>console.log(err))
    
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
