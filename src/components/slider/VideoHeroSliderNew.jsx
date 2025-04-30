import React, { memo, Fragment, useState, useCallback, useEffect } from "react";

// react-bootstrap
import { Button, Col, Row } from "react-bootstrap";

// react-router
import { Link } from "react-router-dom";

// react fs-lightbox
import FsLightbox from "fslightbox-react";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// img
import img1 from "/assets/images/video/banner-1.webp";
import img2 from "/assets/images/video/banner-2.webp";
import img3 from "/assets/images/video/banner-3.webp";

import { auth, isAuthenticated, getUser } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { toast } from "react-hot-toast";

const VideoHeroSliderNew = memo((props) => {
  const [user] = useAuthState(auth);
  const Authenticated = isAuthenticated();
  const [toggler, setToggler] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentUser = getUser();
  const title = props.title;
  const coverimage = props.image;
  const description = props.description;
  const ost = props.ost;
  const promo = props.promo;
  const genreId = props.genre;
  // const id = props.id;
  const episode1 = props.firstEpisode;
  const series = props.series;  
  const seriesid = props.seriesId;
  const platform_type = props.type || 2;
  const specificImagePart = "BG-BLACK";
  const seriesType = props.seriesType;

  const cleanImageUrl = (url) => {
    return url.replace(/(desktop\/)+/, "desktop/");
  };

  const cleanedCoverImage = coverimage ? cleanImageUrl(coverimage) : "";

  const imageSrc =
    coverimage &&
      (coverimage.includes(specificImagePart) ||
        coverimage.includes("undefined") ||
        coverimage.includes("null"))
      ? genreId === "669a467156ded50194cf0df0"
        ? "/assets/images/banners/news-banner.webp"
        : genreId === "65e6ea981a094a45057a1137"
          ? "/assets/images/banners/qtv-banner.webp"
          : "/assets/images/banners/digital-banner.webp"
      : `https://demo-api.aryzap.com/public/${cleanedCoverImage}`;

  // Fetch initial favorite status on mount
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (Authenticated && currentUser?.uid && seriesid) {
        try {
          const response = await axios.get(
            `https://demo-api.aryzap.com/api/fav/status?userId=${currentUser.uid}&seriesId=${seriesid}`
          );
          if (response.status === 200) {
            setIsFavorite(response.data.isFavorite);
          }
        } catch (error) {
          console.error("Error fetching favorite status:", error.message);
        }
      }
    };

    fetchFavoriteStatus();
  }, [Authenticated, currentUser?.uid, seriesid]);

  const toggleFavorite = useCallback(async () => {
    if (!Authenticated) {
      toast("Login Required!", { icon: "👤" });
      return;
    }

    const payload = { userId: currentUser?.uid, seriesId: seriesid };

    try {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      const response = await axios.post(
        "https://demo-api.aryzap.com/api/fav/cda",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        const { message } = response.data;
        if (message === "Favorite added successfully") {
          toast("Added to favorites!", { icon: "❤️" });
        } else if (message === "Favorite removed successfully") {
          toast("Removed from favorites!", { icon: "💔" });
        } else {
          throw new Error("Unexpected response message");
        }
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.response?.data || error.message);
      toast.error("Failed to toggle favorite!");
      setIsFavorite((prev) => !prev);
    }
  }, [Authenticated, seriesid, currentUser?.uid, isFavorite]);

  const [showRating, setShowRating] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [userRating, setUserRating] = useState(null); // To store the current user's rating
  const [ratingLoading, setRatingLoading] = useState(true);

  // Fetch the current user's rating for the series
  useEffect(() => {
    const fetchUserRating = async () => {
      if (!currentUser || !seriesid) return;

      try {
        const response = await fetch(
          `https://demo-api.aryzap.com/api/ratings/user/${currentUser?.uid}/${seriesid}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserRating(data); // Set the user's rating

          //alert(data.rate);
          setIsRated(!!data); // Set isRated to true if the user has rated
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      } finally {
        setRatingLoading(false);
      }
    };

    fetchUserRating();
  }, [currentUser, seriesid]);

  // Submit a rating
  const submitRating = async (ratingValue) => {
    const apiUrl = "https://demo-api.aryzap.com/api/ratings/create";
    //console.log(id + " " + currentUser.uid + " " + ratingValue);

    const ratingData = {
      seriesId: seriesid,
      userId: currentUser.uid,
      rate: ratingValue,
      comments: ratingValue === 3 ? "Liked this drama" : ratingValue === 1 ? "Didn't like this drama" : "Best drama!",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      // Log the status code and response for debugging
      console.log("Response Status:", response.status);
      const responseData = await response.json();
      console.log("Response Body:", responseData);

      if (response.ok) {
        setIsRated(true);
        // alert("Thank you for your rating!");
        // toast("Thank you for your rating!");
        toast("Thank you for your rating!",{duration: 1000,icon: "👻"});
        setShowRating(false);
        setUserRating(ratingData); // Update local state with new rating
      } else {
        alert(`Failed to submit your rating. Error: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred. Please try again.");
    }
  };


  // Toggle the rating options visibility
  const toggleRatingOptions = () => {
    setShowRating(!showRating);
  };

  return (
    <Fragment>
      <section className="banner-container padding-top-80">
        <div className="movie-banner">
          <div id="banner-detail-slider" className="banner-container">
            <div className="movie-banner tvshows-slider">
              <Swiper
                navigation={{
                  prevEl: ".swiper-banner-button-prev",
                  nextEl: ".swiper-banner-button-next",
                }}
                slidesPerView={1}
                modules={[Navigation]}
                loop={true}
                centeredSlides={true}
              >
                <SwiperSlide>
                  <div className="movie-banner-image">
                    <img
                      src={imageSrc}
                      className="flipimage"
                      alt="movie-banner-image"
                    />
                  </div>
                  <div className="shows-contentnew h-100">
                    <Row className="align-items-center h-100">
                      <Col lg="7" md="12" className="p-5 p-remove">
                        <h1
                          className="texture-text big-font letter-spacing-1 text-uppercase RightAnimate-two"
                          data-animation-in="fadeInLeft"
                          data-delay-in="0.6"
                        >
                          {title}
                        </h1>
                        <div
                          className="flex-wrap align-items-center fadeInLeft animated"
                          data-animation-in="fadeInLeft"
                          style={{ opacity: 1 }}
                        >
                          <p
                            className="movie-banner-text line-count-3"
                            data-animation-in="fadeInUp"
                            data-delay-in="1.2"
                          >
                            {description}
                          </p>
                        </div>
                        <div className="iq-button series-banner-d-flex gap-3" data-animation-in="fadeInUp" data-delay-in="1.2">
                          <Link  to={"/video/"+platform_type+"/" + episode1 + "/" + seriesid} className="btn text-uppercase position-relative">
                            <span className="button-text">Play Now</span>
                            <i className="fa-solid fa-play"></i>
                          </Link>

                          {/* {(seriesType === "show" || seriesType === "programs") && (
                            <>
                              <span className="favorites-icon" onClick={toggleFavorite} style={{ cursor: "pointer" }}>
                                {isFavorite ? (
                                  <i className="fa-solid fa-heart fa-lg" style={{ color: "red" }} title="Remove from Favorites"></i>
                                ) : (
                                  <i className="fa-regular fa-heart fa-lg" title="Add to Favorites"></i>
                                )}
                              </span>

                            </>
                          )} */}
                          {Authenticated ?
                          <Button className="btn text-uppercase position-relative rating" onClick={toggleRatingOptions}>
                            {/* <span className="button-text">Rate this</span> */}
                            <span
                              className={`fa-solid ${userRating && userRating.rate === 1
                                  ? "fa-thumbs-down"
                                  : userRating && userRating.rate === 3
                                  ? "fa-thumbs-up"
                                  : userRating && userRating.rate === 5
                                    ? "fa-heart"
                                    : "fa-thumbs-up"
                                }`}
                            >
                              <b>
                                {userRating
                                  ? userRating.rate === 1
                                    ? "Not For Me"
                                    : userRating.rate === 3
                                      ? "I Like This"
                                      : userRating.rate === 5
                                        ? "I Love This"
                                        : "Rate This"
                                  : "Rate This"}
                              </b>
                            </span>
                            {/* <span className="button-text"> Rate this</span> */}
                            {/* <i className="fa-solid fa-thumbs-up"></i> */}
                          </Button>
                          : null }
                      
                          
                          {/* Content Rating Tooltip UI */}

                          {showRating && (
                            <div className="content-rating-tooltip">
                              {/* Dislike option */}
                              <div
                                className={userRating && userRating.rate === 1 ? "selected rating-option" : "rating-option"}
                                onClick={() => submitRating(1)}
                                title="Dislike"
                              >
                                <i className="fa-solid fa-thumbs-down"></i>
                              </div>

                              {/* Like option (3 rating) */}
                              <div
                                className={userRating && userRating.rate === 3 ? "selected rating-option" : "rating-option"}
                                onClick={() => submitRating(3)}
                                title="Like"
                              >
                                <i className="fa-solid fa-thumbs-up"></i>
                              </div>

                              {/* Love option (5 rating) */}
                              <div
                                className={userRating && userRating.rate === 5 ? "selected rating-option" : "rating-option"}
                                onClick={() => submitRating(5)}
                                title="Love"
                              >
                                <i className="fa-solid fa-heart"></i>
                                {/* <i className="fa-solid fa-heart"></i> */}
                                {/* <i className="fa-solid fa-heart"></i> */}
                              </div>
                            </div>
                          )}

                        

                        </div>
                      </Col>
                      <Col
                        lg="5"
                        md="12"
                        className="trailor-video iq-slider d-none d-lg-block"
                      >
                        {(seriesType !== "islamicShow" && seriesType !== "programs") && 
                        ((ost && ost !== "null" && ost !== "") || (promo && promo !== "null" && promo !== "")) ? (
                        <Link to="#" className="video-open playbtn" tabIndex="0">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="80px"
                            height="80px"
                            viewBox="0 0 213.7 213.7"
                            enableBackground="new 0 0 213.7 213.7"
                            xmlSpace="preserve"
                            onClick={() => setToggler(!toggler)}
                          >
                            <polygon
                              className="triangle"
                              fill="none"
                              strokeWidth="7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              points="73.5,62.5 148.5,105.8 73.5,149.1"
                            ></polygon>
                            <circle
                              className="circle"
                              fill="none"
                              strokeWidth="7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              cx="106.8"
                              cy="106.8"
                              r="103.3"
                            ></circle>
                          </svg>
                          <span className="w-trailor" onClick={() => setToggler(!toggler)}>
                            {ost && ost !== "null" && ost !== "" ? "Watch Ost" : "Watch Promo"}
                          </span>
                        </Link>
                      ) : null}



                        
                      </Col>
                    </Row>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <FsLightbox
        toggler={toggler}
        sources={[
          ost && ost !== "null" && ost !== "" 
            ? ost 
            : promo && promo !== "null" && promo !== "" 
            ? promo 
            : null
        ]}
        // sources={[{"/assets/images/video/trailer.mp4"}]}
      />
    </Fragment>
  );
});

export default VideoHeroSliderNew;