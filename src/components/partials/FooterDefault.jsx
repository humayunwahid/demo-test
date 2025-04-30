import { memo, Fragment, useState, useEffect } from "react";

// react-router
import { Link,useLocation } from "react-router-dom";

// react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

// components
import LogoFooter from "../LogoFooter";

// image
import apple from '/assets/images/footer/apple.webp';
import playstore from '/assets/images/footer/google-play.webp';
import androidTV from '/assets/images/footer/android-tv.png';

import { getUser } from "../../firebase";

const FooterMega = memo(() => {
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");  
	
  const location = useLocation();

  const user = getUser();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 250) {
      setAnimationClass("animate__fadeIn");
    } else {
      setAnimationClass("animate__fadeOut");
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);
  return (
    <>
      <Fragment>
        <footer className="footer footer-default">
          <Container fluid>
            <div className="footer-top">
              <Row>
                <Col xl={3} lg={6} className="mb-lg-0">
                  <div className="footer-logo">
                    <LogoFooter></LogoFooter>
                  </div>
                  <p className="mb-4 font-size-14">
                  ARYZAP.com is a video streaming platform, where you can watch all dramas, comedy shows, tv shows like jeeto pakistan, latest news about sports, video songs and trailers of all hit pakistani movies and much more in HD Quality.
                  </p>
                  <p className="mb-4 font-size-14">
                    Email us:{" "}
                    <span className="text-white">info@aryzap.com</span>
                  </p>
                  {/* <p className="text-uppercase letter-spacing-1 font-size-14 mb-1">
                    customer services
                  </p>
                  <p className="mb-0 contact text-white">+ (480) 555-0103</p> */}
                </Col>
                <Col xl={2} lg={6} className="mb-5 mb-lg-0">
                  <h4 className="footer-link-title">Quick Links</h4>
                  <ul className="list-unstyled footer-menu">
                  <li className="mb-3">
                      <Link to="/" className="ms-3">
                        home
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link to="./about-us" className="ms-3">
                        about us
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link to="/contact-us" className="ms-3">
                      contact us
                      </Link>
                    </li>
                    {/* <li className="mb-3">
                      <Link to="/blogs" className="ms-3">
                        Blog
                      </Link>
                    </li> */}
                    {/* <li className="mb-3">
                      <Link to="./pricing" className="ms-3">
                        Pricing Plan
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link to="./faq" className="ms-3">
                        FAQ
                      </Link>
                    </li> */}
                  </ul>
                </Col>
                <Col xl={2} lg={6} className="mb-5 mb-lg-0">
                  <h4 className="footer-link-title">Trending</h4>
                  <ul className="list-unstyled footer-menu">
                    <li className="mb-3">
                      <Link to="/view-all/Category/ARY%20ZAP%20EXCLUSIVE" className="ms-3">
                        Exclusive
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link to="/view-all/Category/LIVE%20STREAMS" className="ms-3">
                        Live Streams
                      </Link>
                    </li>
                    <li>
                      <Link to="/view-all/Category/SHOWS" className="ms-3">
                        Shows
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col xl={2} lg={6} className="mb-5 mb-lg-0">
                  <h4 className="footer-link-title">ARY Platforms</h4>
                  <ul className="list-unstyled footer-menu">
                    <li className="mb-3">
                      <Link to="https://arynews.tv/" className="ms-3">
                        ARY News
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link to="https://arydigital.tv/" className="ms-3">
                      ARY Digital
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link to="https://aryqtv.tv/" className="ms-3">
                      ARY Qtv
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link to="https://aryzindagi.tv/" className="ms-3">
                      ARY Zindagi
                      </Link>
                    </li>
                    
                  </ul>
                </Col>
                <Col xl={3} lg={6}>
                   <h4 className="footer-link-title">Follow Us:</h4>
                  {/* <div className="mailchimp mailchimp-dark">
                    <div className="input-group mb-3 mt-4">
                      <input
                        type="text"
                        className="form-control mb-0 font-size-14"
                        placeholder="Email*"
                        aria-describedby="button-addon2"
                      />
                      <div className="iq-button">
                        <button
                          type="submit"
                          className="btn btn-sm"
                          id="button-addon2"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div> */}
                  <div className="d-flex align-items-center mt-5">
                    {/* <span className="font-size-14 me-2">Follow Us:</span> */}
                    <ul className="p-0 m-0 list-unstyled widget_social_media">
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
            </div>
            <div className="footer-bottom border-top">
              <Row className="align-items-center">
                <Col md={6}>
                  <ul className="menu list-inline p-0 d-flex flex-wrap align-items-center">
                    <li className="menu-item">
                      <Link to="/terms-of-use"> Terms Of Use </Link>
                    </li>
                    <li id="menu-item-7316" className="menu-item">
                      <Link to="/privacyPolicy"> Privacy-Policy </Link>
                    </li>
                    {/* <li className="menu-item">
                      <Link to="/faq"> FAQ </Link>
                    </li> */}
                    {user &&
                    <li className="menu-item">
                      <Link to="/my-list"> My List </Link>
                    </li>
                    }
                  </ul>
                  <p className="font-size-14">
                    © <span className="currentYear">{new Date().getFullYear()}</span>{" "}
                    <span className="text-primary">ARY ZAP</span>. All Rights
                    Reserved. All videos and shows on this platform are
                    trademarks of, and all related images and content are the
                    property of, ARY Network. Duplication and copy of this is
                    strictly prohibited. All rights reserved.
                  </p>
                </Col>
                <Col md={2}></Col>
                <Col md={4} className="right">
                  <h6 className="font-size-14 pb-1">Download ARYZAP</h6>
                  <div className="d-flex align-items-center">
                    <Link className="app-image" to="https://play.google.com/store/apps/details?id=com.release.arylive&hl=en&gl=US&pli=1">
                      <img
                        src={playstore}
                        loading="lazy"
                        alt="play-store"
                      />
                    </Link>
                    <br />
                    <Link className="ms-3 app-image" to="https://apps.apple.com/cy/app/ary-zap/id1475260911">
                      <img
                        src={apple}
                        loading="lazy"
                        alt="app-store"
                      />
                    </Link>
                    <Link className="ms-3 app-image" to="https://play.google.com/store/apps/details?id=com.release.aryzaptv&hl=en&pli=1">
                      <img
                        src={androidTV}
                        loading="lazy"
                        alt="app-store"
                      />
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </footer>
        <div
          id="back-to-top"
          style={{ display: "none" }}
          className={`animate__animated ${animationClass}`}
          onClick={scrollToTop}
        >
          <Link
            className="p-0 btn bg-primary btn-sm position-fixed top border-0 rounded-circle"
            id="top"
            to="#top"
          >
            <i className="fa-solid fa-chevron-up"></i>
          </Link>
        </div>
      </Fragment>
    </>
  );
});
FooterMega.displayName = "FooterMega";
export default FooterMega;
