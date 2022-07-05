import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth";
import siteControl from "./features/siteControll";
import userSlice from "./features/user";
const store = configureStore({
   reducer:{
    appauth : auth,
    sitecontrol : siteControl,
    userdet : userSlice
   }
})

export default store;