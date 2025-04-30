import { memo, useRef, useState, useEffect } from "react";

// react-bootstrap
import { Container } from "react-bootstrap";

import {ShimmerTable, ShimmerContentBlock, ShimmerDiv} from "shimmer-effects-react";

import ErrorBoundary from "../../components/ErrorBoundary";


// react-router
import { Link } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const modules = [Autoplay, Navigation];



function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const SectionSlider = memo(
  
  ({
    children,
    title,
    list,
    slidesPerView = 6,
    spaceBetween = 0,
    className = "",
    link,
    type,
  }) => {
    // if list is greater than 6 then loop unlimiteddd 
    const loop = list.length > 6;
    const isviewAll = list.length > 6;
    const isviewAllshows = list.length > 3;
    const isviewAlllivestream = list.length > 5;
    const isviewAllDramaOst = list.length > 3;

    const slider = useRef(null);
    const [visible, setVisible] = useState(false);
    const [lazyList, setLazyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shimmerCount, setShimmerCount] = useState(6);
    
    const [shimmerHeight, setShimmerHeight] = useState(320);

    const handleViewAllClick = () => {
      localStorage.setItem("listData", JSON.stringify(list));
    };
    

      useEffect(() => {
        
        const updateShimmerSettings  = () => {
          const width = window.innerWidth;
          
          if (width < 768) {
            setShimmerCount(2); // Mobile view
            setShimmerHeight(250); // Adjust height for mobile
          } else if (width >= 768 && width < 1024) {
            setShimmerCount(4); // Tablet view
            setShimmerHeight(280); // Adjust height for tablet
          } else {
            setShimmerCount(6); // Desktop view
            setShimmerHeight(320); // Adjust height for desktop
          }
        };
    
        updateShimmerSettings(); // Run on component mount
        window.addEventListener("resize", updateShimmerSettings); // Update on resize
    
        return () => {
          window.removeEventListener("resize", updateShimmerSettings); // Cleanup listener
        };
      }, []);

    

    // Intersection Observer for Lazy Loading
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (slider.current) {
        observer.observe(slider.current);
      }

      return () => {
        if (slider.current) {
          observer.unobserve(slider.current);
        }
      };
    }, []);

    // Fetch movies when visible and type is SeriesByGenres
    useEffect(() => {
      if (visible && type === "SeriesByGenres" && lazyList.length === 0) {
        setLoading(true);
        fetch(`https://demo-api.aryzap.com/api/genres/genreid/pg/${list}`)
          .then((response) => response.json())
          .then((data) => {
            // console.log("Lazylist: ",data.series);
            setLazyList(data.series); // Adjust this based on your API's response format
            setLoading(false); 
          })
          .catch((error) => {
            console.error("Error fetching movies:", error);
            setLoading(false);
          });
      }
    }, [visible, type, list, lazyList]);

    const initSwiper = (swiper) => {
      addCustomClassToVisibleSlides(swiper);
    };

    const addCustomClassToVisibleSlides = (swiper) => {
      if (slider.current) {
        if (swiper) {
          slider.current
            .querySelectorAll(".swiper-slide")
            .forEach((separateSlide) => separateSlide.classList.remove("last"));

          const swiperSlide = slider.current.querySelectorAll(
            ".swiper-slide-visible"
          );

          const lastVisibleSlide = swiperSlide[swiperSlide.length - 1];

          setTimeout(() => {
            if (lastVisibleSlide) {
              lastVisibleSlide.classList.add("swiper-active", "last");
            }
          }, 0);
        }
      }
    };

    // Define breakpoints
    const getBreakpoints = () => {
      return title === "SHOWS" || title === "Drama's OST"
        ? {
            0: { slidesPerView: 1, spaceBetween: 0 },
            576: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 3, spaceBetween: 0 },
            1025: { slidesPerView: slidesPerView, spaceBetween: 0 },
            1500: { slidesPerView: slidesPerView, spaceBetween: 0 },
          }
        : {
            0: { slidesPerView: 2, spaceBetween: 0 },
            576: { slidesPerView: 2, spaceBetween: 0 },
            768: { slidesPerView: 3, spaceBetween: 0 },
            1025: { slidesPerView: slidesPerView, spaceBetween: 0 },
            1500: { slidesPerView: slidesPerView, spaceBetween: 0 },
          };
    };

    return (
      <div className={className}>
        <Container fluid>
          <div
            className="overflow-hidden card-style-slider"
            ref={slider}
          >
            {/* {!(type === "SeriesByGenres" && loading) && ( */}
            <div className="d-flex align-items-end justify-content-between px-1 mb-2 mt-4">
              <h5 className="main-title mb-0 fw-bolder text-uppercase">
                {!loading ? title : null}
              </h5>
              {(title === "SHOWS" && isviewAllshows) ||
                (title === "LIVE STREAMS" && isviewAlllivestream) ||
                (title === "Drama's OST" && isviewAllDramaOst) ||
                (isviewAll && title !== "SHOWS" && title !== "LIVE STREAMS" && title !== "Drama's OST") ? (
                  <Link
                    to={link ? link : `/view-all/${type}/${title}`}
                    className="iq-view-all text-decoration-none text-light btn btn-primary view-all-btn"
                    onClick={handleViewAllClick}
                  > 
                    View All
                  </Link>
                ) : null}
            </div>

            {/* // )} */}

            {loading ? (
              // <div className="shimmer">Loading...</div> // Replace with your shimmer effect
              // <ShimmerTable mode="light" row={1} col={6} border={1} borderColor={"#e50914"} rounded={0.25} rowGap={10} colPadding={[5, 5, 5, 5]} />
              // <ShimmerContentBlock mode="light" rounded={1} items={1} itemsGap={20} thumbnailHeight={300} thumbnailWidth={300} thumbnailRounded={1} contentDetailsPosition="start" contentDetailTextLines={0} />
              <div className="d-flex justify-content-between">
                {Array.from({ length: shimmerCount }).map((_, index) => (
                  <ShimmerDiv
                    key={index}
                    mode="custom"
                    from={"#131313"}
                    via={"#242323"}
                    to={"#131313"}
                    height={shimmerHeight} // Dynamically set height
                    width={220}
                    className="m-1"
                  />
                ))}
                
              </div>
            ) : (
              <Swiper
                className="position-relative swiper swiper-card"
                slidesPerView={slidesPerView}
                loop={lazyList.length > 6}
                watchSlidesProgress
                spaceBetween={spaceBetween}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                breakpoints={getBreakpoints()}
                onSwiper={initSwiper}
                onSlideChange={initSwiper}
                modules={modules}
              >

                {(type !== "SeriesByGenres" ? list : lazyList).map((data, index) => (
                  <SwiperSlide  tag="li" key={index + generateUUID() + "slider"}>
                    {children(data)}
                  </SwiperSlide>
                ))}


                <div className="swiper-button swiper-button-next"></div>
                <div className="swiper-button swiper-button-prev"></div>
              </Swiper>
            )}
          </div>
        </Container>
      </div>
    );
  }
  
);


SectionSlider.displayName = "SectionSlider";

export default SectionSlider;
