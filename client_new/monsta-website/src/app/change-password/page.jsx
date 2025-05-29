"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import "./change-password.css"
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function ChangePassword() {


    
    const router = useRouter()
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
            let obj={
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }
            axios.post(
                `${process.env.NEXT_PUBLIC_API_BASEURL}/user/change-password`,
                obj,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    
                },
            })
            .then((res)=>{
                console.log(res.data)
            })


           
    }

    return (
        <div>
            <div className="breadcrumbs_area">
                <div className="container">   
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb_content">
                                <h3>Change Password</h3>
                                <ul>
                                    <li><Link href="/">home</Link></li>
                                    <li> {">"}</li>
                                    <li>Change Password</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>         
            </div>

            <div className="customer_login">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="account_form">
                                <h2>Change Password</h2>
                                <form onSubmit={handleSubmit}>
                                    <p>   
                                        <label>Current Password <span>*</span></label>
                                        <input 
                                            type="password" 
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </p>
                                    <p>   
                                        <label>New Password <span>*</span></label>
                                        <input 
                                            type="password" 
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </p>
                                    <p>   
                                        <label>Confirm New Password <span>*</span></label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </p>
                                   
                                    <div className="login_submit">
                                        <Link href="/my-dashboard">Back to Dashboard</Link>
                                        <button type="submit" disabled={isLoading}>
                                            {isLoading ? 'Changing...' : 'Change Password'}
                                        </button>
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