import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  name: "",
  activedate: "",
  msgs: [],
  _id: "",
  linkvisits: 0,
  password: ""
};

const userSlice = createSlice({
  name: "userdetails",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      return {...action.payload };
    },
    clearUser: (state) => {
      return initialState;
    },
    resetUser: (state)=>{
      return {
        auth: false,
        name: "",
        activedate: "",
        msgs: [],
        _id: "",
        linkvisits: 0,
        password: ""
      }
    }
  },
});

export default userSlice.reducer;
export const {saveUser,clearUser,resetUser} = userSlice.actions;
