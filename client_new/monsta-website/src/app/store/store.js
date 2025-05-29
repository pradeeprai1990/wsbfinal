// const { configureStore } = require("@reduxjs/toolkit");
import {configureStore} from "@reduxjs/toolkit"
import  loginSlice from "../slice/loginSlice"
import  cartSlice  from "../slice/cartSlice"


export let myStore=configureStore({
   reducer:{
      loginStore:loginSlice,
      cartStore:cartSlice
   }
})