import React from "react";

function index({visible}) {
  return (
    <>
    {visible && <div className="text-violate bg-slate-200 h-1/3 md:h-1/2 z-50 fixed rounded-2xl top-0 left-0 right-0 bottom-0 w-11/12 md:w-1/2 m-auto flex justify-center align-middle flex-col">
      <p className="text-3xl font-semibold px-5 md:px-10">What's Your Name ?</p>
      <form className="px-10 flex flex-col" onSubmit={()=>console.log("hi")}>
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
    </div>}
    </>
  );
}

export default index;
