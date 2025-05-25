'use client'
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import "../globals.css";
import Link from 'next/link';
import Testimonial from '../commanComponents/Testimonial';


export default function page() {
    return (
        <>
            <Container fluid className='breadcrumbs_area'>
                <Container className='breadcrumb_content'>
                    <Row>
                        <Col lg={12}>
                            <h3>About Us</h3>
                            <ul className='p-0'>
                                <li><Link href="/">home</Link></li>
                                <li>&gt;</li>
                                <li>About Us</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Container>
                <Row>
                    <Col lg={12}>


                        <div className='about_thumb'>
                            <img src='/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg' alt='about-us' className='img-fluid' />
                        </div>

                        <div className="about_content">
                            <h2>Welcome to Monsta!</h2>
                            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem. </p>
                            <span>“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</span>
                        </div>

                    </Col>
                </Row>
            </Container>

            <Testimonial />


        </>
    )
}
