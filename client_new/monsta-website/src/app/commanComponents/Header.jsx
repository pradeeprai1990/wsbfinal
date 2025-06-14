
"use client";
import React, { useEffect, useState } from "react";
import "./Header.css";
import { AccordionBody, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { FaBars, FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from 'react-bootstrap/Accordion';
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../slice/loginSlice";
import axios from "axios";
import { cartDataList } from "../slice/cartSlice";

export default function Header() {

    //Call 
    let userData = useSelector((store) => store.loginStore.user)
    let cartData = useSelector((store) => store.cartStore.cart)
    let token=useSelector((store)=>store.loginStore.token)
    console.log(cartData)
    //
    let dispatch=useDispatch()

    console.log(userData)

    const [showCart, setShowCart] = useState(false);

    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);

    // formenu
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let getCartData=()=>{
        axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL}/cart/cartlist`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
                
            }
        
        )
        .then((res)=>res.data)
        .then((finalRes)=>{
            dispatch(cartDataList( {cartData:finalRes.data,imagePath:finalRes.staticPath} ))
            
        })
    }

    useEffect(()=>{
        if(token){
            getCartData()


        }
        else{
            dispatch(cartDataList( {cartData:[],imagePath:''} ))
        }
    },[token])

    return (
        <>
            {/* Desktop Header */}
            <div className="d-none d-lg-block" >
                <Container fluid className="border-bottom myheader-top ">
                    <Container>
                        <Row className="align-items-center justify-content-between  ">
                            <Col lg={7} md={12} className="p-0">
                                <div className="top-header">
                                    <p><span>Contact us 24/7</span>: +91-9781234560 / furniture@gmail.com</p>
                                </div>
                            </Col>
                            <Col lg={5} md={12}>

                                {userData ?
                                    <ul className="auth d-flex justify-content-end">
                                        <li onClick={()=>dispatch(logOut())}>LogOut</li>
                                    </ul>
                                    :
                                    <Link href={"/login-register"}>
                                        <ul className="auth d-flex justify-content-end">
                                            <li>Login &nbsp;/</li>
                                            <li>Register</li>
                                        </ul>
                                    </Link>

                                }


                            </Col>
                        </Row>
                    </Container>
                </Container>

                {/* Main Header */}
                <Container fluid className="main_header border-bottom">
                    <Container>
                        <Row className="align-items-center justify-content-between  py-4">
                            <Col lg={7}>
                                <div className="logo">
                                    <Link href={"/"} >
                                        <img
                                            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                                            className="img-fluid"
                                            alt="logo"
                                        />
                                    </Link>
                                </div>
                            </Col>
                            <Col>
                                <div className="p-0 m-0 mid-right-div  ">
                                    <div className="border">
                                        <input placeholder="Search product..." className="border-0 px-2 py-2" autoFocus />
                                        <IoIosSearch className="fs-5" />
                                    </div>
                                    <div className="border text-center py-2">
                                        <FaHeart className="fs-4" />
                                    </div>
                                    <div className="border threeBoxDiv" style={{ cursor: "pointer" }} onClick={handleShowCart}>
                                        <span className="cart_quantity"> {cartData.length} </span>
                                        <IoCart className="fs-5 ms-3 " />
                                        <span className="h-50 border mx-2 border-end"></span>
                                        <span className="fw-bold">Rs. 00 <IoIosArrowDown /></span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>

                <Container fluid className="border-bottom border-1">
                    <div className="menu">
                        <nav>
                            <ul className="d-flex justify-content-center">
                                <li className="active">
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="#">LIVING <FaAngleDown /></Link>

                                    <ul className="mega_menu d-flex">
                                        <li>
                                            <a>Tables</a>
                                            <ul>
                                                <li><Link href={"/categories"}>Side and End Tables</Link></li>
                                                <li><Link href={"/categories"}>Nest Of Tables</Link></li>
                                                <li><Link href={"/categories"}>Console Table</Link></li>
                                                <li><Link href={"/categories"}>Coffee Table Sets</Link></li>
                                                <li><Link href={"/categories"}>Coffee Tables</Link></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>Living Storage</a>
                                            <ul>
                                                <li><a href="#">Prayer Units</a></li>
                                                <li><a href="#">Display Unit</a></li>
                                                <li><a href="#">Shoe Racks</a></li>
                                                <li><a href="#">Chest Of Drawers</a></li>
                                                <li><a href="#">Cabinets and Sideboard</a></li>
                                                <li><a href="#">Bookshelves</a></li>
                                                <li><a href="#">TV Units</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>Mirrors</a>
                                            <ul>
                                                <li><a href="#">Wooden Mirrors</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="#">SOFA <FaAngleDown /></Link>

                                    <ul className="mega_menu d-flex">
                                        <li>
                                            <a>Sofa Cum Bed</a>
                                            <ul>
                                                <li><a href="#">Wooden Sofa Cum Bed</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>Sofa Sets</a>
                                            <ul>
                                                <li><a href="#">L Shape Sofa</a></li>
                                                <li><a href="#">1 Seater Sofa</a></li>
                                                <li><a href="#">2 Seater Sofa</a></li>
                                                <li><a href="#">3 Seater Sofa</a></li>
                                                <li><a href="#">4 Seater Sofa</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>Swing Jhula</a>
                                            <ul>
                                                <li><a href="#">Wooden Jhula</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="#">PAGES <FaAngleDown /></Link>

                                    <ul className="sub_menu">
                                        <li><a href="/about-us">About Us</a></li>
                                        <li><a href="#">Cart</a></li>
                                        <li><a href="#">Checkout</a></li>
                                        <li><Link href={"/frequently-questions"}>Frequently Questions</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="/contact-us">CONTACT US</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Container>
            </div>

            {/* Mobile Header */}
            <div className="bg-white px-2 py-3 d-flex justify-content-between d-block d-lg-none">
                <div className="logo">
                    <img
                        src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                        className="img-fluid"
                        alt="logo"
                    />
                </div>
                <div className="d-flex gap-4">
                    <div className="border p-2"><FaHeart className="fs-4" /></div>
                    <div className="position-relative border p-2" onClick={handleShowCart}>
                        <span className="cart_quantity">0</span>
                        <IoCart className="fs-4" />
                    </div>
                    <div className="barIcon" onClick={handleShow} ><FaBars /></div>
                    <OffcanvasMenu className="mobileMenu" show={show} setShow={setShow} />

                </div>

            </div>

            {/* Cart Modal */}
            <CartModal showCart={showCart} handleClose={handleCloseCart} />
        </>
    );
}

// Cart Modal Component
function CartModal({ showCart, handleClose }) {

    let cartData = useSelector((store) => store.cartStore.cart)
  
    const [cartItem, setcartItem] = useState(false);



    return (
        <Offcanvas className="modalClass " show={showCart} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                {cartData.length==0?
                    <>
                        <div className="">
                            <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" />                         </div>

                        <div className="border-top border-bottom py-3 px-3 text-center">
                            Your shopping cart is empty!
                        </div>
                    </>
                    :
                    <>
                       {cartData.map((items,index)=>   <CartItem data={items} key={index} />  )}
                       
                    </>
                }

                {cartItem ?
                    ""
                    :
                    <CartTotal show={showCart} onHide={handleClose} />
                }

            </Offcanvas.Body>
        </Offcanvas>
    );
}

// Cart Item Component
function CartItem({data}) {
    let imagePath = useSelector((store) => store.cartStore.imagePath)
    return (
        <div className="d-flex justify-content-between border-bottom py-3">
            <div className="w-25">
                <img src={imagePath+data.product.productImage} className="img-fluid" alt="cart-item" />
            </div>
            <div>
                <small className="text-secondary d-block">{data.product.productName}</small>
                <small className="text-secondary d-block">Qty:  {data.qty} </small>
                <b className="text-secondary">Rs. {data.product.prodcutsalePrice}  </b>
            </div>
            <div><RxCross2 /></div>
        </div>
    );
}

// Cart Total Component
function CartTotal({onHide}) {
    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between">
                <div>Subtotal</div>
                <div>Rs. 10,100</div>
            </div>
            <div className="bg-dark cartBtn p-1 mt-2">
            <Link href={'/cart'}>  <button onClick={()=>onHide(false)} className="d-block">VIEW CART</button></Link>
                <Link href={'/checkout'}>
                 <button className="d-block" onClick={()=>onHide(false)}>CHECKOUT</button>
                </Link>
            </div>
        </div>
    );
}


// offcanwas menu
function OffcanvasMenu({ show, setShow }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Offcanvas show={show} onHide={handleClose} className="menuOffCanwas" >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>

            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>Contact us 24/7 : +91-9781234560 </p>
                <p>furniture@gmail.com </p>

                <Accordion>
                    <Accordion.Item eventKey="0" className="noneArrow">
                        <Accordion.Header> <Link href={"/"} >Home Us</Link> </Accordion.Header>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Living</Accordion.Header>
                        <Accordion.Body>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Tables</Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Living Storage</Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Mirrors</Accordion.Header>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Sofa</Accordion.Header>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Pages</Accordion.Header>
                        <Accordion.Body>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header> <Link href={"/about-us"} >About Us</Link> </Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><Link href={"/cart"} >Cart</Link>  </Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header> <Link href={"/checkout"} >Checkout</Link> </Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Frequently Asked Questions</Accordion.Header>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4" className="noneArrow">
                        <Accordion.Header>Login / Register</Accordion.Header>
                    </Accordion.Item>
                </Accordion>

            </Offcanvas.Body>
        </Offcanvas>
    )
}
