import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { setLoader } from '../../store/features/siteControll'
import { saveUser } from '../../store/features/user'
import { useNavigate } from 'react-router-dom'
import getUser from '../../API/getAPI/getUser'
import { useState } from 'react'
function Userpage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const uid = useSelector((state)=>state.userdet._id)
    const upass = useSelector((state)=>state.userdet.password)
    const [Showpass,setShowpass] = useState(false)
    const handleshowpass =()=>{
      setShowpass(!Showpass)
    }
    useEffect(() => {
        const userauthdata = JSON.parse(window.localStorage.getItem("opentalk"));
        if (userauthdata && uid.length===0) {
            const userdatafetch = async (url) => {
              console.log('req')
            getUser(url)
            .then((user)=>{
              if(user.data.auth)
              {
                dispatch(saveUser({ ...user.data }));
                dispatch(setLoader(false))
              }
              else
              {
                console.log(user.data.err)
                navigate('/home')
              }
            }).catch((err)=>{
              navigate("/home");
              console.log(err)
            })
          };
          userdatafetch(`${process.env.REACT_APP_API_URL}/user/${userauthdata._id}/${userauthdata.authcode}`
          );
        } 
        if(!userauthdata) {
          navigate("/home");
        }
      }, []);
    
 
  return (
    <div className="text-violate px-10 w-full h-screen flex justify-center align-middle flex-col">
      <form action="">
        <label className='flex flex-col'>User Id
        <input  className='impBox w-full' type="text" name="UserId" value={uid} disabled/>
        </label>
        <label className='flex flex-col '>Password
        <div className="passfield relative flex items-center">
        <input className='impBox w-full' type={Showpass?'text':'password'} name="Password" value={upass} disabled/>
        {Showpass && <p onClick={handleshowpass} className='absolute right-0 px-2'>Hide</p>}
        {!Showpass&& <p onClick={handleshowpass} className='absolute right-0 px-2'>Show</p>}
        </div>
        </label>
      </form>
    </div>
  )
}

export default Userpage