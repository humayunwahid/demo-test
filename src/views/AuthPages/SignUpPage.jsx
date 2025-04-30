import { Fragment, useState, useEffect, memo } from "react";

//react-bootstrap
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { useAuthState } from "react-firebase-hooks/auth";

//react-router-dom
import { Link, useNavigate, useLocation} from 'react-router-dom'


import { getConfig } from '../../../config';



import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
    signInWithApple,
    logout,
    isAuthenticated
    
  } from "../../firebase";

import toast, { Toaster } from 'react-hot-toast';
import Loader from "../../components/ReactLoader";

import Logo from '../../components/logo'


const SignUpPage = memo(() => {
    
    const config = getConfig();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [location, setLocation] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState(null);
    const [accept, setAccept] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const redirectLocation = useLocation();
    const [isLoading, setisLoading] = useState(true);
    const Authenticated = isAuthenticated();


    
    
      useEffect(() => {
        if (Authenticated == true) {

            const searchParams = new URLSearchParams(redirectLocation.search);
            const redirectTo = searchParams.get('redirect') || '/';
            navigate(redirectTo);
        //    navigate("/");
                        
        }

        // Create an async function inside the effect
        const fetchCountryCode = async () => {
            if (!location) {
            setisLoading(true);
            try {
                // Add cache-busting parameter
                const cacheBuster = `deviceID=${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
                const url = `${config.appClouflareLocationIp
        }?${cacheBuster}`;

                const resp = await fetch(url);
                if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
                }

                const results = await resp.json();
                const countryCode = (results.country_code?.toUpperCase() || 'PK');

                console.log("Detected country code:", countryCode);
                setLocation(countryCode);
            } catch (error) {
                console.error("Error fetching location:", error);
                const fallbackCode = 'PK';
                setLocation(fallbackCode);
            } finally {
                setisLoading(false);
            }
            }
        };

        // Call the async function
        fetchCountryCode();
        
        const isFormValid = name !== "" && email !== "" && password !== "" && accept !== false && password === confirmPassword;
        setFormValid(isFormValid);
            


      }, [user, isLoading, name, email, password, accept]);


      

    const register = () => {
        
        if (!formValid) {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match.");
            }
            else if (accept==false){
                toast.error("Please accept terms & conditions.");
            } else {
                toast.error("Please fill in all required fields.");
            }
        } else {
            setisLoading(true);
            registerWithEmailAndPassword(name, email, password, location, phone, dob);
            
        }
    };

    
    return (
        <Fragment>
        <Toaster />
        {isLoading ? (
            <Loader/>
        ) : (
            <main className='main-content'>
                <div className='vh-100' style={{ backgroundImage: "url(/assets/images/pages/01.webp)", backgroundSize: 'cover', backgroundRepeat: "no-repeat", position: 'relative', minHeight: '500px' }}>
                    <Container>
                        <Row className='justify-content-center align-items-center height-self-center vh-100'>
                            <Col lg="8" md="12" className='align-self-center'>
                                <div className="user-login-card bg-body py-3">
                                    
                                    <div className='text-center'>
                                            <Logo />
                                    </div>
                                    <h4 className='text-center mb-4'>Create Your Account</h4>
                                    <Row lg="2" className='row-cols-1 g-2 g-lg-2'>                                       

                                        <Col>
                                            <Form.Label className='text-white fw-500 mb-2'>Full Name *</Form.Label>
                                            <Form.Control type="text" className='rounded-0' value={name}
                                            onChange={(e) => setName(e.target.value)} required />
                                        </Col>                                        
                                      
                                        <Col>
                                            <Form.Label className='text-white fw-500 mb-2'>Email *</Form.Label>
                                            <Form.Control type="email" className='rounded-0' value={email}
                                            onChange={(e) => setEmail(e.target.value)} required />
                                        </Col>
                                        <Col>
                                            <Form.Label className='text-white fw-500 mb-2'>Phone</Form.Label>
                                            <Form.Control type="text" className='rounded-0' value={phone}
                                            onChange={(e) => setPhone(e.target.value)} />
                                        </Col>
                                        <Col>
                                            <Form.Label className='text-white fw-500 mb-2'>Date Of Birth</Form.Label>
                                            <Form.Control type="date" className='rounded-0' value={dob}
                                            onChange={(e) => setDob(e.target.value)} />
                                        </Col>
                                        
                                        <Col>
                                            <Form.Label className='text-white fw-500 mb-2'>Password *</Form.Label>
                                            <Form.Control type="password" className='rounded-0' value={password}
                                            onChange={(e) => setPassword(e.target.value)} required />
                                        </Col>
                                        <Col>
                                            <Form.Label className='text-white fw-500 mb-2'>Confirm Password *</Form.Label>
                                            <Form.Control type="password" className='rounded-0' value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} required />
                                        </Col>

                                        <Form.Control
                                                            type="hidden"
                                            className="register__textBox"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                                        />
                                        

                                    </Row>
                                    <Form.Label className='list-group-item d-flex align-items-center mt-3 mb-3 text-white'>
                                        <Form.Check.Input checked={accept} onChange={(e) => setAccept(e.target.checked)} required className='m-0 me-2' type='checkbox' />
                                        I've read and accept the 
                                        <Link to="/terms-of-use" className='ms-1' >
                                        terms & conditions*
                                        </Link>
                                    </Form.Label>
                                    <Row className='text-center'>
                                        <Col lg="3"></Col>
                                        <Col lg="6">
                                            <div className="full-button">
                                                <div className="iq-button">
                                                    <Button onClick={register} className="btn text-uppercase position-relative">
                                                        <span className="button-text">Sign Up</span>
                                                        <i className="fa-solid fa-play"></i>
                                                    </Button>
                                                </div>

                                    <div className="seperator d-flex justify-content-center align-items-center">
                                        <span className="line"></span>
                                        <span className="mx-2">OR SIGN UP WITH</span>
                                        <span className="line"></span>
                                    </div>
                                                
                                    <ul className="p-0 pt-4 m-0 list-unstyled widget_social_media text-center">
                                        <li className="">
                                            <Link  onClick={() => signInWithGoogle(location)} className="position-relative">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FBC02D"></path>
                                                <path d="M3.15283 7.3455L6.43833 9.755C7.32733 7.554 9.48033 6 11.9998 6C13.5293 6 14.9208 6.577 15.9803 7.5195L18.8088 4.691C17.0228 3.0265 14.6338 2 11.9998 2C8.15883 2 4.82783 4.1685 3.15283 7.3455Z" fill="#E53935"></path>
                                                <path d="M12.0002 22.0001C14.5832 22.0001 16.9302 21.0116 18.7047 19.4041L15.6097 16.7851C14.6057 17.5456 13.3577 18.0001 12.0002 18.0001C9.39916 18.0001 7.19066 16.3416 6.35866 14.0271L3.09766 16.5396C4.75266 19.7781 8.11366 22.0001 12.0002 22.0001Z" fill="#4CAF50"></path>
                                                <path d="M21.8055 10.0415L21.7975 10H21H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855C15.6085 16.785 15.609 16.785 15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1565C0"></path>
                                                </svg>
                                            </Link>
                                        </li>
                                        <li className="">
                                            <Link onClick={() => signInWithApple(location)} className="position-relative">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x="0px"
                                                    y="0px"
                                                    width="30"
                                                    height="30"
                                                    viewBox="0 0 256 256"
                                                >
                                                    <g
                                                    fill="#ffffff"
                                                    fillRule="nonzero"
                                                    stroke="none"
                                                    strokeWidth="1"
                                                    strokeLinecap="butt"
                                                    strokeLinejoin="miter"
                                                    strokeMiterlimit="10"
                                                    strokeDasharray=""
                                                    strokeDashoffset="0"
                                                    fontFamily="none"
                                                    fontWeight="none"
                                                    fontSize="none"
                                                    textAnchor="none"
                                                    style={{ mixBlendMode: 'normal' }}
                                                    >
                                                    <g transform="scale(4.12, 4.12)">
                                                        <path
                                                        d="M44.52734,34.75c-1.07812,2.39453 -1.59766,3.46484 -2.98437,5.57813c-1.94141,2.95313 -4.67969,6.64063 -8.0625,6.66406c-3.01172,0.02734 -3.78906,-1.96484 -7.87891,-1.92969c-4.08594,0.01953 -4.9375,1.96875 -7.95312,1.9375c-3.38672,-0.03125 -5.97656,-3.35156 -7.91797,-6.30078c-5.42969,-8.26953 -6.00391,-17.96484 -2.64844,-23.12109c2.375,-3.65625 6.12891,-5.80469 9.65625,-5.80469c3.59375,0 5.85156,1.97266 8.82031,1.97266c2.88281,0 4.63672,-1.97656 8.79297,-1.97656c3.14063,0 6.46094,1.71094 8.83594,4.66406c-7.76562,4.25781 -6.50391,15.34766 1.33984,18.31641zM31.19531,8.46875c1.51172,-1.94141 2.66016,-4.67969 2.24219,-7.46875c-2.46484,0.16797 -5.34766,1.74219 -7.03125,3.78125c-1.52734,1.85938 -2.79297,4.61719 -2.30078,7.28516c2.69141,0.08594 5.47656,-1.51953 7.08984,-3.59766z"
                                                        />
                                                    </g>
                                                    </g>
                                                </svg>
                                            </Link>
                                        </li>
                                    </ul>
                                                <p className="mt-2 mb-0 fw-normal">Already have an account?<a href="/login" className="ms-1">Sign In</a></p>
                                            </div>
                                        </Col>
                                        <Col lg="3"></Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </main>
        )}
        </Fragment>
    )
})

SignUpPage.displayName = "SignUpPage"
export default SignUpPage