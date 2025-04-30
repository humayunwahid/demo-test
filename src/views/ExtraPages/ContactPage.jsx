import { memo, Fragment, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';


// react-bootstrap
import { Container, Row, Col, Form } from "react-bootstrap";
import BreadcrumbWidget from "../../components/BreadcrumbWidget";

const ContactPage = memo(() => {

  // / State for input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    toast.success('Your query is received.'); // Show the toast notification
    // Clear the form
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: ""
    });

  };


  return (
    <Fragment>
      <BreadcrumbWidget title="Contact Us" />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="section-padding">
        <Container>
          <Row>
            <Col lg="8">
              <div className="title-box">
                <h2>Contact Us</h2>
                <p className="mb-0">
                  To learn more about how Ary Zap can help you, contact us.
                </p>
              </div>
              <Form className="mb-5 mb-lg-0"  onSubmit={handleSubmit}>
                <Row>
                  <Col md="6" className="mb-4 mb-lg-5">
                    <input
                      type="text"
                      className="form-control font-size-14"
                      placeholder="Your Name*"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required=""
                    />
                  </Col>
                  <Col md="6" className="mb-4 mb-lg-5">
                    <input
                      type="text"
                      className="form-control font-size-14"
                      placeholder="Last Name*"
                      required=""
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      
                    />
                  </Col>
                  <Col md="6" className="mb-4 mb-lg-5">
                    <input
                      type="tel"
                      className="form-control font-size-14"
                      placeholder="Phone Number*"
                      required=""
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md="6" className="mb-4 mb-lg-5">
                    <input
                      type="email"
                      className="form-control font-size-14"
                      placeholder="Your Email*"
                      required=""
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md="12" className="mb-4 mb-lg-5">
                    <textarea
                      className="form-control font-size-14"
                      cols="40"
                      rows="10"
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </Col>
                  <Col>
                    <div className="iq-button">
                      <button type="submit" className="btn">
                        Send Message
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col lg="1" className="d-none d-lg-block"></Col>
            <Col lg="3">
              <div className="border-bottom pb-4 mb-4">
                <h5>Come See Us</h5>
                <span>
                6th Floor Madina City Mall, Block, Abdullah Haroon Rd, Saddar، Saddar, Karachi, Karachi City, Sindh 74400, Pakistan
                </span>
              </div>
              <div className="border-bottom pb-4 mb-4">
                <h5>Get In Touch</h5>
                <Link className="text-primary">info@aryzap.com</Link>
                {/* <p className="mb-0">(144) 1234 4567</p> */}
              </div>
              <div>
                <h5>Follow Us</h5>
                <ul className="p-0 m-0 mt-4 list-unstyled widget_social_media">
                  <li className="">
                    <Link
                      to="https://www.facebook.com/aryzappk/"
                      className="position-relative"
                    >
                      <i className="fab fa-facebook"></i>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to="https://twitter.com/aryzapofficial"
                      className="position-relative"
                    >
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  {/* <li className="">
                    <Link to="https://github.com/" className="position-relative">
                      <i className="fab fa-github"></i>
                    </Link>
                  </li> */}
                  <li className="">
                    <Link
                      to="https://www.instagram.com/officialaryzap/"
                      className="position-relative"
                    >
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="map">
        <Container fluid className="p-0">
          {/* <iframe
            loading="lazy"
            className="w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902543.2003194243!2d-118.04220880485131!3d36.56083290513502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80be29b9f4abb783%3A0x4757dc6be1305318!2sInyo%20National%20Forest!5e0!3m2!1sen!2sin!4v1576668158879!5m2!1sen!2sin"
            height="600"
          ></iframe> */}
          <div style={{ width: '100%' }}>
            <iframe
              title="Map Location"
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=6th%20Floor%20Madina%20City%20Mall,%20Block,%20Abdullah%20Haroon%20Rd,%20Saddar%D8%8C%20Saddar,%20Karachi,%20Karachi%20City,%20Sindh%2074400,%20Pakistan+(ARY%20News%20Block)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              allowFullScreen
            ></iframe>
          </div>
        </Container>
      </div>
    </Fragment>
  );
});

ContactPage.displayName = "ContactPage";
export default ContactPage;
