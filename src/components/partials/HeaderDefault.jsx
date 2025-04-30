import { memo, Fragment, useState, useEffect, createContext } from "react";
import { useLocation   } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle, signInWithApple, logout, db, isAuthenticated, getUser } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Cookies from 'universal-cookie';
import toast, { Toaster } from 'react-hot-toast';

// react-bootstrap
import {
  Button,
  Nav,
  Collapse,
  Navbar,
  Offcanvas,
  Container,
  Dropdown,
} from "react-bootstrap";

// react-router
import { Link, useNavigate } from "react-router-dom";

// components
import Logo from "../logo";
import CustomToggle from "../CustomToggle";

// img
// import user_img from "/assets/images/user/user1.webp";
import user_img from "/assets/images/user/user2.png";
import ott from "/assets/images/mega-menu/new-home.webp";
import home from "/assets/images/mega-menu/home.webp";
import movie from "/assets/images/mega-menu/movie.webp";
import tvshow from "/assets/images/mega-menu/tv-show.webp";
import video from "/assets/images/mega-menu/video.webp";
import shop from "/assets/images/mega-menu/shop-home.webp";



const AuthContext = createContext();

const HeaderDefault = memo(({children}) => {
  const [isMega, setIsMega] = useState(true);
  const location = useLocation();
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);


	const [userNameFetched, setUserNameFetched] = useState(false);
	const [searchField, setSearchField] = useState("");
	const [user, setUser] = useState(null);
  const [name, setName] = useState("Loading...");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (searchField.trim()) {
      navigate(`/search/${encodeURIComponent(searchField)}`);
    }
  };


  

  

  useEffect(() => {
  
   
    setShow(false);
  // Function to load the Google Analytics script
  const loadAnalyticsScript = () => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TVCEQ5YCP0';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', 'G-TVCEQ5YCP0');
    };
  };

  // Load Google Analytics script
  loadAnalyticsScript();

  const currentUser = getUser();
  const Authenticated = isAuthenticated();
  setUser(currentUser);

  if (Authenticated) {
    const userID = currentUser.uid;
    setName(
      currentUser.displayName 
        ? currentUser.displayName 
        : currentUser.providerData[0].displayName 
        ? currentUser.providerData[0].displayName 
        : "N/A"
    );

    // Get the meta title of the current page

  
    const updateTitle = () => {
      const pageTitle = document.title;
      // alert(pageTitle);
      // alert (userID + " " + pageTitle);
      if (window.gtag) {
        gtag('set', {
          'user_id': userID,
          'screen_name': pageTitle
       });
}
    };

   // Add a short delay to ensure the title has been set
   setTimeout(updateTitle, 3000);

   // Set user ID in Google Analytics
    
  } else {
    setName("Guest");
  }

  const handleScroll = () => {
    const headerSticky = document.querySelector(".header-sticky");
    if (headerSticky) {
      if (window.scrollY > 1) {
        headerSticky.classList.add("sticky");
      } else {
        headerSticky.classList.remove("sticky");
      }
    }
  };

  const updateIsMega = () => {
    setIsMega(location.pathname === "/");
  };

  window.addEventListener("scroll", handleScroll);
  updateIsMega();

  // Cleanup
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };

}, [location]); // Add location as a dependency

  
  return (
    <>
    
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
    <Fragment>
      <Toaster />
      <header className="header-center-home header-default header-sticky">
        <Navbar
          expand="xl"
          className="nav navbar-light iq-navbar header-hover-menu py-xl-0"
        >
          <Container fluid className="navbar-inner">
            <div className="d-flex align-items-center justify-content-between w-100 landing-header">
              <div className="d-flex gap-3 gap-xl-0 align-items-center">
                <div>
                  <button
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#navbar_main"
                    aria-controls="navbar_main"
                    className="d-xl-none btn btn-primary rounded-pill p-1 pt-0 toggle-rounded-btn"
                    onClick={() => setShow1(!show1)}
                  >
                    <svg width="20px" className="icon-20" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <Logo></Logo>
              </div>
              <Navbar
                expand="xl"
                className={`offcanvas mobile-offcanvas nav hover-nav horizontal-nav py-xl-0 ${
                  show1 === true ? "show" : ""
                } ${isMega ? "mega-menu-content" : ""}`}
                style={{
                  visibility: `${show1 === true ? "visible" : "hidden"}`,
                }}
                id="navbar_main"
              >
                <Container fluid className="container-fluid p-lg-0">
                  <Offcanvas.Header className="px-0" closeButton>
                    <div className="navbar-brand ms-3">
                      <Logo></Logo>
                    </div>
                  </Offcanvas.Header>
                  <ul
                    className="navbar-nav iq-nav-menu list-unstyled"
                    id="header-menu"
                  >
                    <Nav.Item as="li">
                      <Nav.Link 
                        href="/"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className={`${location.pathname === "/" ||
                            location.pathname === "/home" ||
                            location.pathname === "/movies" ||
                            location.pathname === "/tv-shows" ||
                            location.pathname === "/videos" ||
                            location.pathname === "/merchandise-store"
                            ? "active"
                            : ""
                          }`}
                      >
                        <span className="item-name">HOME</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link
                        aria-expanded={open1}
                        href="/view-all/Category/ARY%20ZAP%20EXCLUSIVE"
                        onClick={() => setOpen1(!open1)}
                        className={`${
                          location.pathname === "/related-merchandise" ||
                          location.pathname === "/restricted-content" ||
                          location.pathname === "/playlist" ||
                          location.pathname === "/geners" ||
                          location.pathname === "/cast" ||
                          location.pathname === "/tags"
                            ? "active"
                            : ""
                        }`}
                      >
                        <span className="item-name">EXCLUSIVE</span>
                        {/* <span className="menu-icon ms-2">
                          <i
                            className="fa fa-caret-down toggledrop-desktop right-icon"
                            aria-hidden="true"
                          ></i>
                          <span className="toggle-menu">
                            <i
                              className="fa fa-plus  arrow-active text-white"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa fa-minus  arrow-hover text-white"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </span> */}
                      </Nav.Link>
                      {/* <Collapse in={open1} className="sub-nav list-unstyled">
                        <ul>
                          <Nav.Item as="li">
                            <Link
                              to="/restricted-content"
                              className={`${
                                location.pathname === "/restricted-content"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Restricted Content{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/related-merchandise"
                              className={`${
                                location.pathname === "/related-merchandise"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Related Merchandise{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/playlist"
                              className={`${
                                location.pathname === "/playlist"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Playlist{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/geners"
                              className={`${
                                location.pathname === "/geners" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              Genres{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/cast"
                              className={`${
                                location.pathname === "/cast" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              Cast{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/tags"
                              className={`${
                                location.pathname === "/tags" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              Tags{" "}
                            </Link>
                          </Nav.Item>
                        </ul>
                      </Collapse> */}
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link
                        aria-expanded={open2}
                        href="/view-all/Category/LIVE%20STREAMS"
                        onClick={() => setOpen2(!open2)}
                        className={`${
                          location.pathname === "/about-us" ||
                          location.pathname === "/contact-us" ||
                          location.pathname === "/faq" ||
                          location.pathname === "/PrivacyPolicy" ||
                          location.pathname === "/pricing" ||
                          location.pathname === "/coming-soon"
                            ? "active"
                            : ""
                        }`}
                      >
                        <span className="item-name">LIVE STREAMS</span>
                        {/* <span className="menu-icon ms-2">
                          <i
                            className="fa fa-caret-down toggledrop-desktop right-icon"
                            aria-hidden="true"
                          ></i>
                          <span className="toggle-menu">
                            <i
                              className="fa fa-plus  arrow-active text-white"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa fa-minus  arrow-hover text-white"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </span> */}
                      </Nav.Link>
                      {/* <Collapse in={open2} className="sub-nav list-unstyled">
                        <ul>
                          <Nav.Item as="li">
                            <Link
                              to="/about-us"
                              className={`${
                                location.pathname === "/about-us"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              About Us{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/contact-us"
                              className={`${
                                location.pathname === "/contact-us"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Contact Us{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/faq"
                              className={`${
                                location.pathname === "/faq" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              FAQ{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/PrivacyPolicy"
                              className={`${
                                location.pathname === "/PrivacyPolicy"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Privacy Policy{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/pricing"
                              className={`${
                                location.pathname === "/pricing" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              Pricing Plan{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/coming-soon"
                              className={`${
                                location.pathname === "/coming-soon"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Coming Soon{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Nav.Link
                              aria-expanded={open3}
                              href="#homePages"
                              onClick={() => setOpen3(!open3)}
                              className={`${
                                location.pathname === "/error-page-one" ||
                                location.pathname === "/error-page-two"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span className="item-name">Error Pages</span>
                              <span className="menu-icon">
                                <i
                                  className="fa fa-caret-right toggledrop-desktop right-icon"
                                  aria-hidden="true"
                                ></i>
                                <span className="toggle-menu">
                                  <i
                                    className="fa fa-plus  arrow-active text-white"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    className="fa fa-minus  arrow-hover text-white"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </span>
                            </Nav.Link>
                            <Collapse
                              in={open3}
                              className="sub-nav list-unstyled"
                            >
                              <ul>
                                <Nav.Item as="li">
                                  <Link
                                    to="/error-page-one"
                                    className={`${
                                      location.pathname === "/error-page-one"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Error Page 1{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/error-page-two"
                                    className={`${
                                      location.pathname === "/error-page-two"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Error Page 2{" "}
                                  </Link>
                                </Nav.Item>
                              </ul>
                            </Collapse>
                          </Nav.Item>
                        </ul>
                      </Collapse> */}
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link
                        aria-expanded={open4}
                        href="/view-all/Category/SHOWS"
                        onClick={() => setOpen4(!open4)}
                        className={`${
                          location.pathname === "/blogs" ||
                          location.pathname === "/blogs/single" ||
                          location.pathname === "/blogs/double" ||
                          location.pathname === "/blogs/large-grid" ||
                          location.pathname === "blogs/small-grid" ||
                          location.pathname === "/blogs-sidebar/left" ||
                          location.pathname === "/blogs-sidebar/right" ||
                          location.pathname ===
                            "/blog-template/everything-you-need-to-know-about" ||
                          location.pathname ===
                            "/blogs-detail/the-most-anticipated-movies" ||
                          location.pathname === "/blog-single/audio" ||
                          location.pathname === "/blog-single/video" ||
                          location.pathname === "/blog-single/link" ||
                          location.pathname === "/blog-single/quote" ||
                          location.pathname === "/blog-single/gallery"
                            ? "active"
                            : ""
                        }`}
                      >
                        <span className="item-name">SHOWS</span>
                        {/* <span className="menu-icon ms-2">
                          <i
                            className="fa fa-caret-down toggledrop-desktop right-icon"
                            aria-hidden="true"
                          ></i>
                          <span className="toggle-menu">
                            <i
                              className="fa fa-plus  arrow-active text-white"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa fa-minus  arrow-hover text-white"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </span> */}
                      </Nav.Link>
                      {/* <Collapse in={open4} className="sub-nav list-unstyled">
                        <ul>
                          <Nav.Item as="li">
                            <Link
                              to="/blogs"
                              className={`${
                                location.pathname === "/blogs" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              Listing{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Nav.Link
                              aria-expanded={open5}
                              href="#homePages"
                              onClick={() => setOpen5(!open5)}
                              className={`${
                                location.pathname === "/blogs/single" ||
                                location.pathname === "/blogs/double" ||
                                location.pathname === "/blogs/large-grid" ||
                                location.pathname === "/blogs/small-grid"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span className="item-name">Blog grid</span>
                              <span className="menu-icon">
                                <i
                                  className="fa fa-caret-right toggledrop-desktop right-icon"
                                  aria-hidden="true"
                                ></i>
                                <span className="toggle-menu">
                                  <i
                                    className="fa fa-plus  arrow-active text-white"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    className="fa fa-minus  arrow-hover text-white"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </span>
                            </Nav.Link>
                            <Collapse
                              in={open5}
                              className="sub-nav list-unstyled"
                            >
                              <ul>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blogs/single"
                                    className={`${
                                      location.pathname === "/blogs/single"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    1 Column{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blogs/double"
                                    className={`${
                                      location.pathname === "/blogs/double"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    2 column
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blogs/large-grid"
                                    className={`${
                                      location.pathname === "/blogs/large-grid"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    3 column{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blogs/small-grid"
                                    className={`${
                                      location.pathname === "/blogs/small-grid"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    4 column{" "}
                                  </Link>
                                </Nav.Item>
                              </ul>
                            </Collapse>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Nav.Link
                              aria-expanded={open6}
                              href="#homePages"
                              onClick={() => setOpen6(!open6)}
                              className={`${
                                location.pathname === "/blogs-sidebar/left" ||
                                location.pathname === "/blogs-sidebar/right"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span className="item-name">Blog Sidebar</span>
                              <span className="menu-icon">
                                <i
                                  className="fa fa-caret-right toggledrop-desktop right-icon"
                                  aria-hidden="true"
                                ></i>
                                <span className="toggle-menu">
                                  <i
                                    className="fa fa-plus  arrow-active text-white"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    className="fa fa-minus  arrow-hover text-white"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </span>
                            </Nav.Link>
                            <Collapse
                              in={open6}
                              className="sub-nav list-unstyled"
                            >
                              <ul>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blogs-sidebar/left"
                                    className={`${
                                      location.pathname ===
                                      "/blogs-sidebar/left"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Left Sidebar{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blogs-sidebar/right"
                                    className={`${
                                      location.pathname ===
                                      "/blogs-sidebar/right"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Right Sidebar{" "}
                                  </Link>
                                </Nav.Item>
                              </ul>
                            </Collapse>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Nav.Link
                              aria-expanded={open7}
                              href="#homePages"
                              onClick={() => setOpen7(!open7)}
                              className={`${
                                location.pathname ===
                                  "/blog-template/everything-you-need-to-know-about" ||
                                location.pathname ===
                                  "/blogs-detail/the-most-anticipated-movies" ||
                                location.pathname === "/blog-single/audio" ||
                                location.pathname === "/blog-single/video" ||
                                location.pathname === "/blog-single/link" ||
                                location.pathname === "/blog-single/quote" ||
                                location.pathname === "/blog-single/gallery"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span className="item-name">Blog Single</span>
                              <span className="menu-icon">
                                <i
                                  className="fa fa-caret-right toggledrop-desktop right-icon"
                                  aria-hidden="true"
                                ></i>
                                <span className="toggle-menu">
                                  <i
                                    className="fa fa-plus  arrow-active text-white"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    className="fa fa-minus  arrow-hover text-white"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </span>
                            </Nav.Link>
                            <Collapse
                              in={open7}
                              className="sub-nav list-unstyled"
                            >
                              <ul>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blog-template/everything-you-need-to-know-about"
                                    className={`${
                                      location.pathname ===
                                      "/blog-template/everything-you-need-to-know-about"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Blog Template{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blogs-detail/the-most-anticipated-movies"
                                    className={`${
                                      location.pathname ===
                                      "/blogs-detail/the-most-anticipated-movies"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Standard{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blog-single/audio"
                                    className={`${
                                      location.pathname === "/blog-single/audio"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Audio{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blog-single/video"
                                    className={`${
                                      location.pathname === "/blog-single/video"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Video{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blog-single/link"
                                    className={`${
                                      location.pathname === "/blog-single/link"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Link{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blog-single/quote"
                                    className={`${
                                      location.pathname === "/blog-single/quote" ? "active" : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Quote{" "}
                                  </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                  <Link
                                    to="/blog-single/gallery"
                                    className={`${
                                      location.pathname ===
                                      "/blog-single/gallery"
                                        ? "active"
                                        : ""
                                    } nav-link`}
                                  >
                                    {" "}
                                    Gallery{" "}
                                  </Link>
                                </Nav.Item>
                              </ul>
                            </Collapse>
                          </Nav.Item>
                        </ul>
                      </Collapse> */}
                    </Nav.Item>
                    {/* <Nav.Item as="li">
                      <Nav.Link
                        aria-expanded={open8}
                        href="#homePages"
                        onClick={() => setOpen8(!open8)}
                        className={`${
                          location.pathname === "/shop" ||
                          location.pathname === "/account" ||
                          location.pathname === "/cart" ||
                          location.pathname === "/wishlist" ||
                          location.pathname === "/checkout" ||
                          location.pathname === "/track-order"
                            ? "active"
                            : ""
                        }`}
                      >
                        <span className="item-name">Shop</span>
                        <span className="menu-icon ms-2">
                          <i
                            className="fa fa-caret-down toggledrop-desktop right-icon"
                            aria-hidden="true"
                          ></i>
                          <span className="toggle-menu">
                            <i
                              className="fa fa-plus arrow-active text-white"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa fa-minus arrow-hover text-white"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </span>
                      </Nav.Link>
                      <Collapse in={open8} className="sub-nav list-unstyled">
                        <ul>
                          <Nav.Item as="li">
                            <Link
                              to="/shop"
                              className={`${
                                location.pathname === "/shop" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              Shop{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/account"
                              className={`${
                                location.pathname === "/account" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              My Account Page{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/cart"
                              className={`${
                                location.pathname === "/cart" ? "active" : ""
                              } nav-link`}
                            >
                              {" "}
                              Cart Page{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/wishlist"
                              className={`${
                                location.pathname === "/wishlist"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Wishlist Page{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/checkout"
                              className={`${
                                location.pathname === "/checkout"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Checkout Page{" "}
                            </Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link
                              to="/track-order"
                              className={`${
                                location.pathname === "/track-order"
                                  ? "active"
                                  : ""
                              } nav-link`}
                            >
                              {" "}
                              Order Tracking{" "}
                            </Link>
                          </Nav.Item>
                        </ul>
                      </Collapse>
                    </Nav.Item> */}
                  </ul>
                </Container>
              </Navbar>
              <div className="right-panel">
                <Button
                  id="navbar-toggle"
                  bsPrefix="navbar-toggler"
                  type="button"
                  aria-expanded={show}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  onClick={() => setShow(!show)}
                >
                  <span className="navbar-toggler-btn">
                    <span className="navbar-toggler-icon"></span>
                  </span>
                </Button>
                <div
                  className={`navbar-collapse ${
                    show === true ? "collapse show" : "collapse"
                  }`}
                  id="navbarSupportedContent"
                >
                  <div className="other-menu-items mt-3">
                      <ul className="list-unstyled">
                      <li><Link
                            to="/"
                            className="iq-sub-card d-flex align-items-center gap-3"
                          >Home</Link>
                          </li>
                      <li><Link
                            to="/view-all/Category/LIVE%20STREAMS"
                            className="iq-sub-card d-flex align-items-center gap-3"
                          >Live Stream</Link></li>
                      <li><Link
                            to="/view-all/Category/ARY%20ZAP%20EXCLUSIVE"
                            className="iq-sub-card d-flex align-items-center gap-3"
                          >Exclusive</Link></li>
                      <li><Link
                            to="/view-all/Category/SHOWS"
                            className="iq-sub-card d-flex align-items-center gap-3"
                          >Shows</Link></li>
                      </ul>
                  </div>
                  <ul className="navbar-nav align-items-center ms-auto mb-2 mb-xl-0">
                    <Dropdown
                      as="li"
                      className="nav-item dropdown iq-responsive-menu"
                    >
                      <div className="search-box">
                        <Dropdown.Toggle
                          as={CustomToggle}
                          href="#"
                          variant="nav-link p-0"
                        >
                          <div className="btn-icon btn-sm rounded-pill btn-action">
                            <span className="btn-inner">
                              <svg
                                className="icon-20"
                                width="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="11.7669"
                                  cy="11.7666"
                                  r="8.98856"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></circle>
                                <path
                                  d="M18.0186 18.4851L21.5426 22"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          as="ul"
                          className="p-0 dropdown-search m-0 iq-search-bar"
                          style={{ width: "20rem" }}
                        >
                          <li className="p-0">
                          <form onSubmit={handleSearchSubmit} className="form-group input-group mb-0">
                            <div className="form-group input-group mb-0">
                              <input
                                type="text"
                                className="form-control border-0"
                                placeholder="Search..."
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                              />
                              <button type="submit" className="search-submit">
                                <svg
                                  className="icon-15"
                                  width="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="11.7669"
                                    cy="11.7666"
                                    r="8.98856"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></circle>
                                  <path
                                    d="M18.0186 18.4851L21.5426 22"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                            </form>
                          </li>
                        </Dropdown.Menu>
                      </div>
                    </Dropdown>
                    <Dropdown as="li" className="nav-item">
                      <Dropdown.Toggle
                        as={CustomToggle}
                        href="#"
                        variant=" nav-link d-flex align-items-center"
                        size="sm"
                        id="dropdownMenuButton1"
                      >
                        <div className="btn-icon rounded-pill user-icons">
                          <span className="btn-inner">
                            <svg
                              className="icon-18"
                              width="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M19.2036 8.66919V12.6792"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M21.2497 10.6741H17.1597"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        as="ul"
                        className="dropdown-menu-end dropdown-user border-0 p-0 m-0"
                      >
                        <li className="user-info d-flex align-items-center gap-3 mb-3">
                        {user && user.photoURL ? (
                          <img className="avatar-img img-fluid" src={user.photoURL} alt="User Avatar" />
                        ) : (
                          <img src={user_img} className="img-fluid" alt="Default Avatar" loading="lazy" />
                        )}

                          
                          

                          <span className={`font-size-14 fw-500 ${name && name.includes('@') ? '' : 'text-capitalize'} text-white`}>
                            {user ? <span>{name}</span> : "Guest User"}
                          </span>


                        </li>
                        
                        {user &&
                        <>
                        <li>
                          <Link
                            to="/account"
                            className="iq-sub-card d-flex align-items-center gap-3"
                          >
                            
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 22"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.84455 20.6621C4.15273 20.6621 1 20.0876 1 17.7868C1 15.486 4.13273 13.3621 7.84455 13.3621C11.5364 13.3621 14.6891 15.4654 14.6891 17.7662C14.6891 20.066 11.5564 20.6621 7.84455 20.6621Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.83725 10.1738C10.26 10.1738 12.2236 8.21015 12.2236 5.78742C12.2236 3.36469 10.26 1.40015 7.83725 1.40015C5.41452 1.40015 3.44998 3.36469 3.44998 5.78742C3.4418 8.20196 5.3918 10.1656 7.80634 10.1738C7.81725 10.1738 7.82725 10.1738 7.83725 10.1738Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <h6 className="mb-0 font-size-14 fw-normal">
                              My Account
                            </h6>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/my-list"
                            className="iq-sub-card d-flex align-items-center gap-3"
                          >
                           <i className="fa-regular fa-heart"></i>
                            <h6 className="mb-0 font-size-14 fw-normal">
                              My List
                            </h6>
                          </Link>
                        </li>                        
                        </>
                        }
                        {user && <li>
                          <Link
                            onClick={() => logout()}
                            className="iq-sub-card iq-logout-2 mt-1 d-flex justify-content-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M1.82209 15.9999C1.46654 15.9999 1.16283 15.874 0.910981 15.6221C0.659129 15.3703 0.533203 15.0666 0.533203 14.711V1.73322C0.533203 1.37767 0.659129 1.07397 0.910981 0.822114C1.16283 0.570262 1.46654 0.444336 1.82209 0.444336H7.95543V1.44434H1.82209C1.74802 1.44434 1.68135 1.47397 1.62209 1.53322C1.56283 1.59248 1.5332 1.65915 1.5332 1.73322V14.711C1.5332 14.7851 1.56283 14.8517 1.62209 14.911C1.68135 14.9703 1.74802 14.9999 1.82209 14.9999H7.95543V15.9999H1.82209ZM12.0888 11.5999L11.3554 10.8888L13.5332 8.73322H5.68876V7.711H13.511L11.3332 5.55545L12.0665 4.82211L15.4665 8.24434L12.0888 11.5999Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <h6 className="mb-0 font-size-14 fw-normal">
                              Logout
                            </h6>
                          </Link>
                        </li>}
                        {!user &&                          
                          <Link to="/login"
                            
                            className="iq-sub-card iq-logout-2 mt-1 d-flex justify-content-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M1.82209 15.9999C1.46654 15.9999 1.16283 15.874 0.910981 15.6221C0.659129 15.3703 0.533203 15.0666 0.533203 14.711V1.73322C0.533203 1.37767 0.659129 1.07397 0.910981 0.822114C1.16283 0.570262 1.46654 0.444336 1.82209 0.444336H7.95543V1.44434H1.82209C1.74802 1.44434 1.68135 1.47397 1.62209 1.53322C1.56283 1.59248 1.5332 1.65915 1.5332 1.73322V14.711C1.5332 14.7851 1.56283 14.8517 1.62209 14.911C1.68135 14.9703 1.74802 14.9999 1.82209 14.9999H7.95543V15.9999H1.82209ZM12.0888 11.5999L11.3554 10.8888L13.5332 8.73322H5.68876V7.711H13.511L11.3332 5.55545L12.0665 4.82211L15.4665 8.24434L12.0888 11.5999Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <h6 className="mb-0 font-size-14 fw-normal">
                              Sign In 
                            </h6>
                          </Link>
                          }
                      </Dropdown.Menu>
                    </Dropdown>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Navbar>
      </header>
    </Fragment>
    </>
  );
});

HeaderDefault.displayName = "HeaderDefault";
export default HeaderDefault;
