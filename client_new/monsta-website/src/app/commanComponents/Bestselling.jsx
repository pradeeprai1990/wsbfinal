"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globals.css"
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Bestselling({ product, productPath }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Default for large screens
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <>
            <section className='product_section p_bottom p_section1 py-5'>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="section_title">
                                <h2>Bestselling Products</h2>
                            </div>
                        </Col>


                        <Col lg={12} className='py-3'>
                            <Slider {...settings}>

                                {product.length >= 1 &&

                                    product.map((items, index) => {

                                        return (
                                            <ProductCard productPath={productPath} items={items} key={index} />
                                        )
                                    })


                                }



                            </Slider>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    )
}

function ProductCard({ items, productPath }) {

    let token = useSelector((store) => store.loginStore.token)

    let [color, setColor] = useState('')
    let { productName, prodcutactualPrice, prodcutsalePrice, productImage, subSubCategory, productColor, _id } = items
    console.log(color)
    let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL
    let addToCart = () => {
        if (token != "") {
            let obj = {
                color,
                product: {
                    id: _id,
                    productName,
                    prodcutsalePrice,
                    productImage
                }
            }

            axios.post(
                `${apiBaseUrl}/cart/addtocart`,
                obj,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                }

            )
            .then((res)=>{
                console.log(res.data)
            })
        }
        else {
            alert("Please First Login")
        }
    }


    return (
        <Card className='single_product'>
            <Card.Img variant="top" src={productPath + productImage} />
            <Card.Body className='product_content'>

                <Card.Title >
                    {subSubCategory.subSubcategoryName}
                </Card.Title>

                <h3><Link href="https://wscubetech.co/Assignments/furniture/product-details/isaac-chest-of-drawer">

                    {productName}


                </Link></h3>


                <div className="price_box">
                    <span className="old_price">Rs. {prodcutactualPrice}</span>
                    <span className="current_price">Rs.  {prodcutsalePrice}</span>
                </div>
                <div className='d-flex gap-3 justify-content-center'>

                    {productColor.map((colorItems, index) =>

                        <button className={`${color == colorItems._id ? 'btn btn-success' : ''} p-2`} onClick={() => setColor(colorItems._id)} key={index}>
                            {colorItems.colorName}
                        </button>)}

                </div>
                <div className="action_links mt-3">
                    <ul className='d-flex'>
                        <li>
                            <a className="wishlist_tooltip" title="Add to Wishlist">
                                <span className="icon">
                                    <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/heart-regular.svg" className="wishlist_img" />
                                </span>
                            </a>
                        </li>

                        <li className="add_to_cart">
                            <a title="Add to Cart" id="">
                                <div className="cartShow" onClick={addToCart}>add to cart</div>
                                <div className="cartHide d-none">Loading...</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </Card.Body>
        </Card>
    )
}