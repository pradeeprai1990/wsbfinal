import { createSlice } from "@reduxjs/toolkit";



export let cartSlice=createSlice({
    name:"cartData",
    initialState:{
        cart:[],
        imagePath:''
    },
    reducers:{
       
        cartDataList:function(state,data){
            state.cart=data.payload.cartData
            state.imagePath=data.payload.imagePath
        }
       
    }
})

export const { cartDataList} = cartSlice.actions
export default cartSlice.reducer


//state { user:null },

//reqData = { _id:234234234,userEmail:'pradeep.9977@gmail.com',userPassword:'3sdfs' }