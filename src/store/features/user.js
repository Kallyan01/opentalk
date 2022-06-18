import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  joindate: "",
  activedate: "",
  msgs: [],
  userid: "",
  authcode: "",
  password: "",
  linkvisits: 0,
};

const userSlice = createSlice({
  name: "userdetails",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state,...action.payload };
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const {setUser,clearUser} = userSlice.actions;
