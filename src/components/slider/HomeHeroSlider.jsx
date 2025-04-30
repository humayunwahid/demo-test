import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FsLightbox from "fslightbox-react";
//function
import { generateImgPath } from "../../StaticData/data";

export default function HomeHeroSlider({ list }) {
  const [toggler, setToggler] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // New state to track active slide

  const handleVideoOpen = (source) => {
    setVideoSource(source);
    setToggler(!toggler);
  };

  return (
    <>
      <Swiper
        navigation={{
          prevEl: "#home-banner-slider-prev",
          nextEl: "#home-banner-slider-next",
        }}
        // navigation={false}
        id="home-banner-slider"
        className="iq-main-slider banner-home-swiper overflow-hidden mb-0 min-vh-100"
        modules={[Navigation]}
        loop={true}
        wrapperClass="m-0 p-0"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Listen for slide change
      >
        {list.map((item, index) => (
          <SwiperSlide className="slide s-bg-1 p-0" key={index}>
            <SlideItem
              item={item}
              index={index}
              activeIndex={activeIndex}
              handleVideoOpen={handleVideoOpen}
            />
          </SwiperSlide>
        ))}

        <div className="swiper-banner-button-prev swiper-nav" id="home-banner-slider-prev">
          <i></i>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44" fill="none" stroke="currentColor">
            <circle r="20" cy="22" cx="22"></circle>
          </svg>
        </div>

        <div className="swiper-banner-button-next swiper-nav" id="home-banner-slider-next">
          <i></i>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44" fill="none" stroke="currentColor">
            <circle r="20" cy="22" cx="22"></circle>
          </svg>
        </div>
      </Swiper>

      <FsLightbox toggler={toggler} sources={[videoSource]} />
    </>
  );
}

function SlideItem({ item, index, activeIndex, handleVideoOpen }) {
  const [showVideo, setShowVideo] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (index === activeIndex) {
      setShowVideo(false);
      timerRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 5000);
    } else {
      clearTimeout(timerRef.current);
      setShowVideo(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [activeIndex, index]);

  const videoSrc = item.data.ost;

  return (
      <div className="position-relative w-100 h-100 overflow-hidden" style={{ boxShadow: "rgb(0, 0, 0) 2px -62px 89px 10px inset" }}>

        {/* Background Image */}
        <img
          src={`https://demo-api.aryzap.com/public/slider/${item.items}`}
          alt="banner-home-swiper-image"
          className="w-100 h-100 position-absolute top-0 start-0 object-fit-cover"
          style={{
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* Background Video (fade in) */}
        {videoSrc && (
          <video
            src="https://vod.aryzap.com/0a59cdf8vodsgp1313565080/22e8172e1397757909720882140/oMN0ffUaiwIA.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-100 h-100 position-absolute top-0 start-0 object-fit-cover"
            style={{
              objectFit: "cover",
              zIndex: 1,
              opacity: showVideo ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          />
        )}

        {/* Black Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(0,0,0,0.4)", zIndex: 2 }}></div>

        {/* Foreground Content */}
        <div className="container-fluid position-relative h-100" style={{ zIndex: 3, boxShadow: "rgb(0 0 0) 1px -70px 70px -5px inset" }}>
          <div className="slider-inner h-100">
            <div className="row align-items-center iq-ltr-direction h-100">
              <div className="col-lg-4 col-md-12">
                <h1 className="texture-text big-font-5 letter-spacing-1 line-count-1 text-uppercase mb-0 RightAnimate">
                  {item.data.title != null ? item.data.title : item.title}
                </h1>

                <div className="d-flex flex-wrap align-items-center r-mb-23 RightAnimate-two">
                    <div className="slider-ratting d-flex align-items-center">
                      <ul className="ratting-start p-0 m-0 list-inline text-warning d-flex align-items-center justify-content-left">
                        <li>
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </li>
                        <li>
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </li>
                        <li>
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </li>
                        <li>
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </li>
                        <li>
                          <i className="fa fa-star-half" aria-hidden="true"></i>
                        </li>
                      </ul>
                      <span className="text-white ms-2 font-size-14 fw-500">
                        4.3/5
                      </span>
                      <span className="ms-2">
                        <img
                          src={generateImgPath("/assets/images/movies/imdb-logo.svg")}
                          alt="imdb logo"
                          className="img-fluid"
                        />
                      </span>
                    </div>
                    
                   
                  </div>

                <div className="flex-wrap align-items-center r-mb-23 RightAnimate-two">
                  <span className="badge rounded-0 text-white text-uppercase p-1 mx-1">action</span>
                  <span className="badge rounded-0 text-white text-uppercase p-1 mx-1">romance</span>
                  <span className="badge rounded-0 text-white text-uppercase p-1 mx-1">drama</span>
                </div>

                <p className="line-count-2 RightAnimate-two">
                  {item.data.description}
                </p>

                {/* {item.data.seriesType !== "live-event" && item.data.cast && item.data.cast !== "null" && (
                  <div className="trending-list RightAnimate-three">
                    <div className="text-primary genres fw-500">
                      Cast:
                      <span className="fw-normal text-white text-decoration-none ms-2">
                        {Array.isArray(item.data.cast) ? item.data.cast.join(", ") : item.data.cast}
                      </span>
                    </div>
                  </div>
                )} */}

                <div className="RightAnimate-four">
                  <div className="iq-button">
                    {item.data.seriesType === "live-event" ? (
                      <Link
                        to={`/live-event/${item.data.seriesLayout}/${item.data._id}`}
                        className="btn text-uppercase position-relative"
                      >
                        <span className="button-text">watch now</span>
                        <i className="fa-solid fa-play"></i>
                      </Link>
                    ) : (
                      <>
                        <Link
                          to={`/series/v2/${item.data._id}`}
                          className="btn text-uppercase position-relative"
                        >
                          <span className="button-text">play now</span>
                          <i className="fa-solid fa-play"></i>
                        </Link>

                        {videoSrc && (
                          <Link
                            className="btn text-uppercase position-relative rating btn bg-light mx-2"
                            onClick={() => handleVideoOpen(videoSrc)}
                          >
                            <span className="button-text text-dark">
                              {item.data.seriesType !== "show" ? "WATCH PROMO" : "WATCH OST"}
                            </span>
                            <i className="text-dark fa-solid fa-play"></i>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

