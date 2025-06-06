"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './checkout.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { cartDataList } from '../slice/cartSlice';
import { redirect } from 'next/navigation';
import { useRazorpay } from "react-razorpay";

export default function CheckoutPage() {
    const {Razorpay} = useRazorpay();
    let [orderStatus,setorderStatus]=useState(false)
    let dispatch=useDispatch()
    let cartData = useSelector((store) => store.cartStore.cart);
    const token = useSelector((store) => store.loginStore.token);
    // Calculate totals
    const subtotal = cartData.reduce((total, item) => total + (item.product.prodcutsalePrice * item.qty), 0);

    const totQty = cartData.reduce((total, item) => total + (item.qty), 0);

    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        city: '',
        state: '',
        postcode: '',
        phone: '',
        email: '',
       
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let obj={...formData}
        
        obj[name]=value
        setFormData(obj)
        
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

      
        
        // Create order object with all form data and cart details
        

        console.log('Order Data:', formData);

        let myCart=cartData.map((item)=>{
             let obj= {...item.product}
             obj['qty']=item.qty
             obj['color']=item.productColor

             return obj
        })
      

        let paymentMethod=e.target.payment.value

        let finalObj={
            shippingAddess:formData,
            orderItems: myCart,
            paymentMethod,
            total,
            shipping,
            orderQty:totQty
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASEURL}/order/order-save`,
                finalObj,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status==1) {
                // Refresh cart data
                console.log(response.data.msg)
                dispatch(cartDataList( {cartData:[],imagePath:''} ))
                setorderStatus(true)
                
            }
            else{
                //Online
                console.log(response.data)

                const options = {
                    key: "rzp_test_WAft3lA6ly3OBc",
                    amount: response.data.amount, // Amount in paise
                    currency: "INR",
                    name: "WSCube tech",
                    description: "Test Transaction",
                    order_id:response.data.id, // Generate order_id on server
                    handler:async (response) => {

                  
                      axios.post(
                        `${process.env.NEXT_PUBLIC_API_BASEURL}/order/verify-order`,
                        response,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    ).then((res)=>res.data)
                    .then((finalRes)=>{
                        console.log(finalRes)
                         if(finalRes.status==1){
                            dispatch(cartDataList( {cartData:[],imagePath:''} ))
                            setorderStatus(true)
                         }  
                    })


                      
                    },
                    prefill: {
                      name: "John Doe",
                      email: "john.doe@example.com",
                      contact: "9999999999",
                    },
                    theme: {
                      color: "#F37254",
                    },
                  };
              
                  const razorpayInstance = new Razorpay(options);
                  razorpayInstance.open();
            }
        } catch (error) {
            console.log('Error updating quantity:', error);
        }

        // Here you can add your API call to submit the order
        // Example: await submitOrder(orderData);
    };

    useEffect(()=>{
        if(orderStatus){
            redirect('/thanks-order')
        }
    },[orderStatus])

    return (
        <div className="checkout_page">
            <div className="container-fluid breadcrumbs_area">
                <div className="container breadcrumb_content">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>Checkout</h3>
                            <ul className="p-0">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>&gt;</li>
                                <li>Checkout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container checkout_content">
                <form className="row" onSubmit={handleSubmit}>
                    {/* Left Column - Shipping & Payment Details */}
                    <div className="col-lg-8 col-md-7">
                        <div className="checkout_form">
                            <h3>Billing Details</h3>
                            
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label>First Name *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label>Last Name *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Company Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Street Address *</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        placeholder="House number and street name" 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleInputChange}
                                        placeholder="Apartment, suite, unit etc. (optional)" 
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label>Town / City *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label>State / County *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label>Postcode / ZIP *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="postcode"
                                                value={formData.postcode}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label>Phone *</label>
                                            <input 
                                                type="tel" 
                                                className="form-control" 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Email Address *</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>

                                <div className="payment_method">
                                    <h3>Payment Method</h3>
                                    <div className="payment_option">
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="payment" 
                                                id="razorpay" 
                                                value="2"
                                                
                                            />
                                            <label className="form-check-label" htmlFor="razorpay">
                                                Razorpay Online Payment
                                            </label>
                                        </div>
                                        <p>Pay securely using Razorpay. We accept all major credit/debit cards, UPI, and net banking.</p>
                                    </div>
                                    <div className="payment_option">
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="payment" 
                                                id="cash-delivery" 
                                                value="1"
                                               
                                            />
                                            <label className="form-check-label" htmlFor="cash-delivery">
                                                Cash On Delivery
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="col-lg-4 col-md-5">
                        <div className="order_summary">
                            <h3>Your Order</h3>
                            <div className="order_table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.product.productName} × {item.qty}</td>
                                                <td>Rs. {item.product.prodcutsalePrice * item.qty}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td>Subtotal</td>
                                            <td>Rs. {subtotal}</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td>Free</td>
                                        </tr>
                                        <tr className="order_total">
                                            <td>Total</td>
                                            <td>Rs. {total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button type="submit" className="place_order_btn">Place Order</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
