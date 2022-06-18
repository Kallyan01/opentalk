import { createSlice } from "@reduxjs/toolkit/";
const initialState = {
    navBar : false,
    theme : 'light',
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
        }
    }
})

export default auth.reducer
export const{setNav,setTheme} = auth.actions