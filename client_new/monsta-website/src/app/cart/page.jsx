"use client"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './cart.css';

export default function CartPage() {
    const cartData = useSelector((store) => store.cartStore.cart);
    const imagePath = useSelector((store) => store.cartStore.imagePath);
    const token = useSelector((store) => store.loginStore.token);
    const dispatch = useDispatch();

    // Calculate totals
    const subtotal = cartData.reduce((total, item) => total + (item.product.prodcutsalePrice * item.qty), 0);


    
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    const updateQuantity = async (productId, newQty) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASEURL}/cart/updatequantity`,
                {
                    productId,
                    qty: newQty
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                // Refresh cart data
                const cartResponse = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASEURL}/cart/cartlist`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                dispatch(cartDataList({ cartData: cartResponse.data.data, imagePath: cartResponse.data.staticPath }));
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (productId) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASEURL}/cart/removeitem`,
                {
                    productId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                // Refresh cart data
                const cartResponse = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASEURL}/cart/cartlist`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                dispatch(cartDataList({ cartData: cartResponse.data.data, imagePath: cartResponse.data.staticPath }));
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <div className="cart_page">
            <div className="container-fluid breadcrumbs_area">
                <div className="container breadcrumb_content">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>Shopping Cart</h3>
                            <ul className="p-0">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>&gt;</li>
                                <li>Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Container className="cart_content">
                {cartData.length === 0 ? (
                    <div className="empty_cart text-center py-5">
                        <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" alt="Empty Cart" />
                        <h4>Your shopping cart is empty!</h4>
                        <Link href="/">
                            <Button variant="primary" className="mt-3">Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <Row>
                        <Col lg={8} md={12}>
                            <div className="cart_table">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="cart_product">
                                                        <img src={imagePath + item.product.productImage} alt={item.product.productName} />
                                                        <h5>{item.product.productName}</h5>
                                                    </div>
                                                </td>
                                                <td>Rs. {item.product.prodcutsalePrice}</td>
                                                <td>
                                                    <div className="quantity_buttons">
                                                        <Button 
                                                            variant="outline-secondary" 
                                                            size="sm"
                                                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.qty - 1))}
                                                        >
                                                            -
                                                        </Button>
                                                        <span>{item.qty}</span>
                                                        <Button 
                                                            variant="outline-secondary" 
                                                            size="sm"
                                                            onClick={() => updateQuantity(item.product.id, item.qty + 1)}
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td>Rs. {item.product.prodcutsalePrice * item.qty}</td>
                                                <td>
                                                    <Button 
                                                        variant="link" 
                                                        className="text-danger"
                                                        onClick={() => removeItem(item.product.id)}
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col lg={4} md={12}>
                            <div className="cart_summary">
                                <h4>Cart Summary</h4>
                                <div className="summary_item">
                                    <span>Subtotal</span>
                                    <span>Rs. {subtotal}</span>
                                </div>
                                <div className="summary_item">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="summary_item total">
                                    <span>Total</span>
                                    <span>Rs. {total}</span>
                                </div>
                                <Link href="/checkout">
                                    <Button variant="primary" className="w-100 mt-3">Proceed to Checkout</Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="outline-secondary" className="w-100 mt-2">Continue Shopping</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}
