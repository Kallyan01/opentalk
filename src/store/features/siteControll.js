import { createSlice } from "@reduxjs/toolkit/";
const initialState = {
    navBar : false,
    theme : 'light',
    loader: true,
    notification:{
        msg: ' ',
        tout: 1000,
        vis: false
    }
}

const auth = createSlice({
    name : 'siteControll',
    initialState,
    reducers:{
        setNav : (state,action)=>{
           return {...state, navBar : action.payload}
        },
        setTheme : (state,action)=>{
            return {...state, theme: action.payload}
        },
        setLoader :(state,action)=>{
            return {...state,loader: action.payload}
        },
        setNoti :(state,action)=>{
            return {...state,notification:{
                msg: action.payload.msg,
                tout: action.payload.tout,
                vis:  action.payload.vis
            }
            }
        }
    }
})

export default auth.reducer
export const{setNav,setTheme,setLoader,setNoti} = auth.actions