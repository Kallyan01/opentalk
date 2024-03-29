import React from "react";
import inf from "../../../asset/loaders/Infinity.svg";
import { useSelector} from "react-redux";
import { setLoader } from "../../../store/features/siteControll";

function Index() {
  const loaderStatus = useSelector((state)=>state.sitecontrol.loader)
  return (
    <div className={`${loaderStatus?'block':'hidden'} bg-white/30  loaderscreen h-screen w-full absolute top-0 left-0 bottom-0 flex justify-center items-center`}>
      <div className="loaderCont  px-8">
        <img src={inf} alt="loader" />
      </div>
    </div>
  );
}

export default Index;
