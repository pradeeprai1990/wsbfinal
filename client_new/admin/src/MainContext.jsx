import React, { createContext, useEffect, useState } from 'react'

export let loginContext=createContext()
export default function MainContext({children}) {

  let [user,setUser]=useState( localStorage.getItem("USER") ?  JSON.parse(localStorage.getItem("USER")) : null )  

let obj={
    user,
    setUser
}
  useEffect(()=>{

    localStorage.setItem("USER",JSON.stringify(user))

  },[user])

  return (
    <loginContext.Provider value={obj}>
        {children}
    </loginContext.Provider>
  )
}
