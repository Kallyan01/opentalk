import { createSlice } from "@reduxjs/toolkit/";
const initialState = {
    auth : false
}

const auth = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        setAuth: (state,action)=>{
            state.auth = action.payload
        },
        clearAuth: (state)=>{
            state.auth = false
        },
    }
})

export default auth.reducer
export const{setAuth,clearAuth} = auth.actions