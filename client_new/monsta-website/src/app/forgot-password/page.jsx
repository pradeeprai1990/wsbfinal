"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import "./forgot-password.css"

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL}/user/forgot-password`, {
                email: email
            })
            if (response.data.status) {
                setMessage('Password reset link has been sent to your email')
            } else {
                setMessage('Email not found')
            }
        } catch (error) {
            setMessage('Something went wrong. Please try again.')
        }
        setIsLoading(false)
    }

    return (
        <div>
            <div className="breadcrumbs_area">
                <div className="container">   
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb_content">
                                <h3>Forgot Password</h3>
                                <ul>
                                    <li><Link href="/">home</Link></li>
                                    <li> {">"}</li>
                                    <li>Forgot Password</li>
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
                                <h2>Reset Password</h2>
                                <form onSubmit={handleSubmit}>
                                    <p>   
                                        <label>Email address <span>*</span></label>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </p>
                                    {message && (
                                        <p className="message" style={{ color: message.includes('sent') ? 'green' : 'red' }}>
                                            {message}
                                        </p>
                                    )}
                                    <div className="login_submit">
                                        <Link href="/login-register">Back to Login</Link>
                                        <button type="submit" disabled={isLoading}>
                                            {isLoading ? 'Sending...' : 'Reset Password'}
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
