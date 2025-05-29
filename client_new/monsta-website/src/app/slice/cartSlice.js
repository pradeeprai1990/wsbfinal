import { createSlice } from "@reduxjs/toolkit";


export let cartSlice=createSlice({
    name:"cartData",
    initialState:{
        cart:[]
    },
    reducers:{
       addTocart:function(state){
            state.cart.push({})
        },
        changeQty:function(state){
            state.cart="null"
        },
        deleteQty:function(state){
            state.cart="null"
        }
    }
})

export const { addTocart, changeQty,deleteQty} = cartSlice.actions
export default cartSlice.reducer


//state { user:null },

//reqData = { _id:234234234,userEmail:'pradeep.9977@gmail.com',userPassword:'3sdfs' }