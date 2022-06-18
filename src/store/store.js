import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth";
import siteControll from "./features/siteControll";
import userSlice from "./features/user";
const store = configureStore({
   reducer:{
    appauth : auth,
    sitecontroll : siteControll,
    userdet : userSlice
   }
})

export default store;