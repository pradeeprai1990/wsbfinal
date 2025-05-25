"use client";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./my-dashboard.css";

export default function DashboardPage() {
    return (
        <>
            <Container fluid className="breadcrumbs_area">
                <Container className="breadcrumb_content">
                    <Row>
                        <Col lg={12}>
                            <h3>My Dashboard</h3>
                            <ul className="p-0">
                                <li>
                                    <Link href="/">home</Link>
                                </li>
                                <li>&gt;</li>
                                <li>My Dashboard</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Container>

            {/* Main Content */}
            <section className="main_content_area">
                <Container>
                    <div className="account_dashboard">
                        <Row>
                            {/* Sidebar */}
                            <Col sm={12} md={3} lg={3}>
                                <div className="dashboard_tab_button">
                                    <ul className="nav flex-column dashboard-list" role="tablist">
                                        <li className="nav-item">
                                            <Link href="" className="nav-link">
                                                My Dashboard
                                            </Link>


                                        </li>
                                        <li className="nav-item">
                                            <Link href="" className="nav-link">
                                                Orders
                                            </Link>


                                        </li>
                                        <li className="nav-item">
                                            <Link href="" className="nav-link">
                                                Addresses
                                            </Link>


                                        </li>
                                        <li className="nav-item">
                                            <Link href="" className="nav-link">
                                                My Profile
                                            </Link>


                                        </li>
                                        <li className="nav-item">
                                            <Link href="" className="nav-link">
                                                Change Password
                                            </Link>


                                        </li>
                                        <li className="nav-item">
                                            <Link href="" className="nav-link">
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>

                            {/* Tab Content */}
                            <Col sm={12} md={9} lg={9}>
                                <div className="tab-content dashboard_content">
                                    <div className="tab-pane fade show active" id="dashboard" role="tabpanel">
                                        <h3>My Dashboard</h3>
                                        <p>
                                            From your account dashboard, you can easily check &amp; view your{" "}
                                            <Link href="#">recent orders</Link>, manage your{" "}
                                            <Link href="#">shipping and billing addresses</Link>, and{" "}
                                            <Link href="#">edit your password and account details</Link>.
                                        </p>
                                    </div>

                                    <div className="tab-pane fade" id="orders" role="tabpanel">
                                        <h3>Orders</h3>
                                        <p>Your order history will appear here.</p>
                                    </div>

                                    <div className="tab-pane fade" id="address" role="tabpanel">
                                        <h3>Addresses</h3>
                                        <p>Manage your shipping and billing addresses here.</p>
                                    </div>

                                    <div className="tab-pane fade" id="my-profile" role="tabpanel">
                                        <h3>My Profile</h3>
                                        <p>Edit your profile information here.</p>
                                    </div>

                                    <div className="tab-pane fade" id="change-password" role="tabpanel">
                                        <h3>Change Password</h3>
                                        <p>Change your password here.</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
}
