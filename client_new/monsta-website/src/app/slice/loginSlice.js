import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"

export let loginSlice=createSlice({
    name:"loginData",
    initialState:{
        user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
        token:Cookies.get("token") ?? ''
    },
    reducers:{
        loginData:function(state,reqData){
           
            state.user=reqData.payload.user //Object
            state.token=reqData.payload.token
            Cookies.set('user', JSON.stringify(reqData.payload.user))
            Cookies.set('token', state.token )
        },
        logOut:function(state){
            state.user=null
            state.token=''
            Cookies.remove("user")
            Cookies.remove("token")
        }
    }
})

export const { loginData, logOut} = loginSlice.actions
export default loginSlice.reducer


//state { user:null },

//reqData = { _id:234234234,userEmail:'pradeep.9977@gmail.com',userPassword:'3sdfs' }