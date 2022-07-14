import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { setLoader } from '../../store/features/siteControll'
import { saveUser } from '../../store/features/user'
import { useNavigate } from 'react-router-dom'
import getUser from '../../API/getAPI/getUser'
function Userpage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const uid = useSelector((state)=>state.userdet._id)
    const upass = useSelector((state)=>state.userdet.password)
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
    <div className="text-violate w-full h-screen flex justify-center align-middle flex-col">
      <h2>Details</h2>
      <p>UserID:{uid}</p>
      <p>Password:{upass}</p>
    </div>
  )
}

export default Userpage