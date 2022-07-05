import { createSlice } from "@reduxjs/toolkit/";
const initialState = {
    navBar : false,
    theme : 'light',
    loader: true
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
        }
    }
})

export default auth.reducer
export const{setNav,setTheme,setLoader} = auth.actions