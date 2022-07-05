import React from "react";
import inf from "../../../asset/loaders/Infinity.svg";
function Index({status}) {
  return (
    <div className={`${status?'block':'hidden'} bg-white/30  loaderscreen h-screen w-full absolute top-0 left-0 bottom-0 flex justify-center items-center`}>
      <div className="loaderCont bg-slate-200 px-8">
        <img src={inf} alt="loader" />
      </div>
    </div>
  );
}

export default Index;
