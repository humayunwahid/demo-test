import React, { Fragment, memo, useState, useEffect } from 'react'

//react bootstrap
import { Col, Container, Form, Row } from 'react-bootstrap'

//react-router-dom
import { Link, useNavigate } from 'react-router-dom'


import { auth, sendPasswordResetEmail } from "../../firebase";


import toast, { Toaster } from 'react-hot-toast';

import { useAuthState } from "react-firebase-hooks/auth";


const LostPassword = memo(() => {
    
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate  = useNavigate();
    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) 
        navigate("/");
    
      }, [user, loading]);
    
    return (
        <Fragment>
            
      
            <Toaster />
            <main className='main-content'>
                <div className='vh-100' style={{ backgroundImage: "url(/assets/images/pages/01.webp)", backgroundSize: 'cover', backgroundRepeat: "no-repeat", position: 'relative', minHeight: '500px' }}>
                    <Container>
                        <Row className='justify-content-center align-items-center height-self-center vh-100'>
                            <Col lg="5" md="12" className='align-self-center'>
                                <div className='user-login-card bg-body'>
                                    <p> Please enter your email address. You will receive a link to create a new password via email.</p>
                                    <Form action='post'>
                                        <Form.Group className='mb-5'>
                                            <Form.Label className='text-white fw-500 mb-2'>Email Address</Form.Label>
                                            <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-0' />
                                            
                                        </Form.Group>
                                        <div className="iq-button">
                                            <Link to="#" onClick={() => sendPasswordResetEmail(email)} className="btn text-uppercase position-relative">
                                                <span className="button-text">Get new password</span>
                                                <i className="fa-solid fa-play"></i>
                                            </Link>
                                        </div>
                                        <div className="seperator d-flex justify-content-center align-items-center">
                                            <span className="line">
                                            </span>
                                        </div>
                                        <div className="iq-button">                                            
                                            <Link to="/login" className="btn text-uppercase position-relative">
                                                <span className="button-text">log in</span>
                                                <i className="fa-solid fa-play"></i>
                                            </Link>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </main>
        </Fragment>
    )
})

LostPassword.displayName = "LostPassword"
export default LostPassword