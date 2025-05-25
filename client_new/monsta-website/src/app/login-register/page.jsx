"use client"
import React, { useEffect, useState } from 'react'
import "./login-register.css"
import axios from 'axios'
import { apiBaseUrl } from '../config'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function page() {

    let [otpStatus,setOtpStatus]=useState(false)
    let [registerStatus,setregisterStatus]=useState(false)
    let saveUser=(event)=>{
        event.preventDefault()

        let formValue=new FormData(event.target)

        if(otpStatus){
                //Check OTP
                axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL}/user/check-otp`,formValue)
                .then((res)=>{
                    console.log(res.data)
                    setregisterStatus(true)
                })
        }
        else{
            axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL}/user/register`,formValue)
            .then((res)=>{
                if(res.data.status){
                    setOtpStatus(true)
                }
            })
        }

      

    }

    useEffect(()=>{
        if(registerStatus){
            redirect("/thanks")
        }
      
    },[registerStatus])
  return (
    <div>
    
    <div class="breadcrumbs_area">
        <div class="container">   
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb_content">
                        <h3>My account</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>My account</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    <div class="customer_login">
        <div class="container">
            <div class="row">
               
                <div class="col-lg-6 col-md-6">
                    <div class="account_form">
                        <h2>login</h2>
                        <form action="#">
                            <p>   
                                <label>Username or email <span>*</span></label>
                                <input type="text"/>
                             </p>
                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password"/>
                             </p>   
                            <div class="login_submit">
                               <Link href="/forgot-password">Lost your password?</Link>
                                <label for="remember">
                                    <input id="remember" type="checkbox"/>
                                    Remember me
                                </label>
                                <button type="submit">login</button>
                                
                            </div>

                        </form>
                     </div>    
                </div>
                
                <div class="col-lg-6 col-md-6">
                    <div class="account_form register">
                        <h2>Register</h2>
                        <form action="#" onSubmit={saveUser}>
                            <p>   
                                <label>Email address  <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                             <p>   
                                <label>Phone Number <span>*</span></label>
                                <input type="text" name='phone'/>
                             </p>
                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password" name='password'/>
                             </p>

                            {
                            otpStatus && 
                                  <p>
                                  <label>OTP <span>*</span></label>
                                 <input type="text" name='otp'/>
                             </p>
                            
                            }
                              

                            <div class="login_submit">
                                <button type="submit">  { otpStatus ? "OTP Check" : "Register" }  </button>
                            </div>
                        </form>
                    </div>    
                </div>
                
            </div>
        </div>    
    </div>
    
    </div>
  )
}
