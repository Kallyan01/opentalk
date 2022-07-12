import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";

function Index() {
 let msg= useSelector((state)=>state.sitecontrol.notification.msg);
 let vis = useSelector((state)=>state.sitecontrol.notification.vis);
 let tout = useSelector((state)=>state.sitecontrol.notification.tout);
 console.log(msg)
  const [Visibility,setVisibility] = useState(false)
  useEffect(() => {
        setVisibility(vis)
  }, [])
  
  setTimeout(()=>{
  setVisibility(false)
  },tout)
  return (
    <div className={`${Visibility?'block':'hidden'} qnotimask absolute top-6 left-0 w-full flex justify-center items-center`}>
      <div className="qnoti bg-black rounded-xl text-white py-1 px-2">
        <p className="">{msg ? msg : "lorem lip"}</p>
      </div>
    </div>
  );
}

export default Index;
