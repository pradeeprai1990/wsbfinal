import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../Config";
import { loginContext } from "../../MainContext";

export default function Login() {

  let {user,setUser}  =useContext(loginContext)

  const navigate = useNavigate();
  let [error,setError]=useState('')
  

  let checkLogin=(event)=>{
    event.preventDefault()

    let username=event.target.userName.value
    let password=event.target.password.value
    let obj={
      username,
      password
    }
    axios.post(`${apiBaseUrl}/auth/login`,obj)
    .then((res)=>res.data)
    .then((finalRes)=>{
      if(finalRes.status){

        setUser(finalRes.data)
       
      }
      else{
        setError(finalRes.msg)
        setTimeout(()=>{
          setError('')
        },2000)
      }
    })
  }

  useEffect(()=>{
      if(user){
        navigate('/dashboard')
      }
  },[user])
  
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className=""
            src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg"
            alt="logo"
          />
          
        </a>
        <form autoComplete="off"
          onSubmit={checkLogin}
          className="w-[500px] bg-white rounded-lg shadow-2xl p-6 space-y-4"
        >
          { error!='' &&  <p className="text-red-500"> {error} </p> }
          
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              UserName
            </label>
            <input
              type="text"
              id="email"
              required
              name="userName"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter Email"
            />
            
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter Password"
            />
            
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
