import { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [User, setUser] = useState({
    name:'',
    dept:'',
    msg :[]
  });
  useEffect(() => {
   async function getData(){
    let data = await axios.get("http://localhost:5000/user/62a720a397fd379e630c43bd")
    let user = data.data[0]
    setUser({...user})
   }
   getData();
    
  },[]);

  return <div className="User">
    Name : {User.name}
    Dept : {User.dept}
    <h4>Messages</h4>
    {
        User.msg.map((item)=>{
            return <p>{item}</p>
        })
    }
  </div>;
}

export default User;
