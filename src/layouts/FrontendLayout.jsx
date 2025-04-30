import { memo, Fragment, Suspense, useState, useEffect, useRef } from "react";

// Import react-top-loading-bar
import LoadingBar from 'react-top-loading-bar';

// reacr-router
import { Outlet, Link, useLocation } from "react-router-dom";

// header
import HeaderDefault from "../components/partials/HeaderDefault";
import HeaderMerchandise from "../components/merchandise/partials/HeaderDefault";

// footer
import  FooterDefault from "../components/partials/FooterDefault"
import MerchandiseFooter from "../components/merchandise/partials/FooterDefault";
// import Loader from "../components/Loader";
// // ditection component
// import ThemeScheme from "../components/coustmizer/theme-scheme";

const FrontendLayout = memo((props) => {
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");
  const loadingBarRef = useRef(null); // <-- create ref
  const location = useLocation(); // <-- track route changes

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

  // NEW: Trigger loading bar on route change
  useEffect(() => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart(); // start when navigating
      setTimeout(() => {
        loadingBarRef.current.complete(); // complete after slight delay (simulate content load)
      }, 500); // you can adjust timing
    }
  }, [location]); // location dependency => run on route change

  return (
    <Fragment>
       {/* Loading Bar */}
       <LoadingBar color="#e50914" ref={loadingBarRef} height={3} shadow={true} />
      {/* <Loader></Loader> */}
      <main className="main-content">
        {
          props.HeaderMega === "true" && 
        <HeaderDefault></HeaderDefault>
        }
        {
          props.HeaderMerchandise === "true" &&
          <HeaderMerchandise></HeaderMerchandise>
        }
        <Suspense fallback={<div className="react-load"></div>}>
          <Outlet></Outlet>
        </Suspense>
      </main>
      {props.FooterMerchandise === "true" ? <MerchandiseFooter/>  : <FooterDefault /> }
      <div
          id="back-to-top"
          style={{ display: "none"}}
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
  );
});

FrontendLayout.displayName = "FrontendLayout";
export default FrontendLayout;
