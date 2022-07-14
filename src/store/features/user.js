import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export default userSlice.reducer;
export const {saveUser,clearUser} = userSlice.actions;
