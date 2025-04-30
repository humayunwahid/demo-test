import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller, EffectFade, Autoplay } from "swiper/modules";
import { Container, Row, Tab, Nav, Col } from "react-bootstrap";
import EpisodeCard from "../cards/EpisodeCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { generateImgPath } from "../../StaticData/data";

export default function () {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbSwiper, setThumbSwiper] = useState(null);

  const [trendingSlider, setTrendingSlider] = useState([
    {
      image: generateImgPath("/assets/images/movies/ott1.webp"),
    },
    {
      image: generateImgPath("/assets/images/movies/ott2.webp"),
    },
    {
      image: generateImgPath("/assets/images/movies/ott3.webp"),
    },
    {
      image: generateImgPath("/assets/images/movies/banner1.webp"),
    },
    {
      image: generateImgPath("/assets/images/movies/banner2.webp"),
    },
    {
      image: generateImgPath("/assets/images/movies/banner3.webp"),
    },
  ]);

  const [episode, setEpisode] = useState([
    {
      image: "/assets/images/tv-show/episodes/01.webp",
      showEpisod: "S01E01",
      episodDate: "October 1, 2022",
      episodTime: "45min",
      episodTitle: "Episode 1",
    },
    {
      image: "/assets/images/tv-show/episodes/02.webp",
      showEpisod: "S01E02",
      episodDate: "October 8, 2022",
      episodTime: "35min",
      episodTitle: "Episode 2",
    },
    {
      image: "/assets/images/tv-show/episodes/03.webp",
      showEpisod: "S01E03",
      episodDate: "October 15, 2022",
      episodTime: "36min",
      episodTitle: "Episode 3",
    },
    {
      image: "/assets/images/tv-show/episodes/04.webp",
      showEpisod: "S01E04",
      episodDate: "October 22, 2022",
      episodTime: "41min",
      episodTitle: "Episode 4",
    },
    {
      image: "/assets/images/tv-show/episodes/05.webp",
      showEpisod: "S01E05",
      episodDate: "October 22, 2022",
      episodTime: "41min",
      episodTitle: "Episode 5",
    },
  ]);
  return (
    <>
      <section className="tranding-tab-slider section-padding">
        <Container fluid>
          <Row className="m-0 p-0">
            <div
              id="iq-trending"
              className="s-margin iq-tvshow-tabs iq-trending-tabs overflow-hidden"
            >
              <div className="d-flex align-items-center justify-content-between px-0 px-md-3">
                <h5 className="main-title text-capitalize mb-0">Trending</h5>
              </div>
              <div className="trending-contens position-relative">
                <div
                  id="gallery-top"
                  className="swiper gallery-thumbs"
                  data-swiper="gallery-top"
                >
                  <Swiper
                    slidesPerView={5}
                    modules={[Navigation, Controller, Autoplay]}
                    touchRatio={0.2}
                    slideToClickedSlide={true}
                    centeredSlides={true}
                    className="list-inline p-0 m-0 trending-slider-nav align-items-center"
                    controller={{ control: thumbSwiper }}
                    onSwiper={setMainSwiper}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      479: {
                        slidesPerView: 3,
                      },
                      1000: {
                        slidesPerView: 5,
                      },
                    }}
                  >
                    {trendingSlider.map((data) => (
                      <SwiperSlide
                        key={data.image + "thumb"}
                        as="li"
                        className="swiper-slide"
                      >
                        <Link to="#">
                          <div className="movie-swiper position-relative">
                            <img src={data.image} alt="img" />
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <Swiper
                  modules={[Navigation, Controller, EffectFade]}
                  spaceBetween={0}
                  effect="fade"
                  slidesPerView={1}
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                  className="list-inline p-0 m-0 d-flex align-items-center trending-slider trending-tab-slider"
                  controller={{ control: mainSwiper }}
                  onSwiper={setThumbSwiper}
                >
                  {trendingSlider.map((data) => (
                    <SwiperSlide
                      key={data.image + "main"}
                      as="li"
                      className="slider-big-img-1 p-0"
                    >
                      <div className="trending-tab-slider-image">
                        <img src={data.image} alt="trending-tab-slider-image" />
                      </div>
                      <div className="tranding-block position-relative">
                        <div className="trending-custom-tab">
                          <div className="tab-title-info position-relative">
                            <div className="tranding-block position-relative">
                              <div className="trending-custom-tab">
                                <div className="tab-title-info position-relative">
                                  <Tab.Container
                                    id="left-tabs-example"
                                    defaultActiveKey="first"
                                  >
                                    <Nav
                                      variant="pills"
                                      className="trending-pills iq-custom-tab d-flex nav nav-pills justify-content-center align-items-center text-center list-inline"
                                    >
                                      <Nav.Item>
                                        <Nav.Link eventKey="first">
                                          Overview
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="second">
                                          Episodes
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="three">
                                          Trailers
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="four">
                                          Similar Like This
                                        </Nav.Link>
                                      </Nav.Item>
                                    </Nav>
                                    <Tab.Content className="tab-content trending-content">
                                      <Tab.Pane eventKey="first">
                                        <div className="trending-info align-items-center w-100 animate__animated animate__fadeInUp iq-ltr-direction">
                                          <h1 className="trending-text big-title text-uppercase texture-text">
                                            the hero camp
                                          </h1>
                                          <div className="d-flex align-items-center text-white text-detail flex-wrap">
                                            <span>3 Seasons</span>
                                            <span className="trending-year">
                                              2023
                                            </span>
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap series mb-4 gap-3">
                                            <router-link to="#">
                                              <img
                                                src="/assets/images/movies/trending-label.webp"
                                                className="img-fluid"
                                                alt=""
                                              />
                                            </router-link>
                                            <span className="text-gold">
                                              #2 in Series Today
                                            </span>
                                          </div>
                                          <p className="trending-dec line-count-3">
                                            The point of using Lorem Ipsum is
                                            that it has a more-or-less normal
                                            distribution of letters, as opposed
                                            to using 'Content here.
                                          </p>
                                          <div className="p-btns">
                                            <div className="iq-button">
                                              <Link
                                                to="/movies-detail"
                                                className="btn text-uppercase position-relative"
                                              >
                                                <span className="button-text">
                                                  Play Now
                                                </span>
                                                <i className="fa-solid fa-play"></i>
                                              </Link>
                                            </div>
                                          </div>
                                          <div className="trending-list mt-4">
                                            <div className="text-primary title">
                                              Starring:{" "}
                                              <span className="text-body">
                                                Wagner Moura, Boyd Holbrook,
                                                Joanna
                                              </span>
                                            </div>
                                            <div className="text-primary title">
                                              Genres:{" "}
                                              <span className="text-body">
                                                Crime, Action, Thriller,
                                                Biography
                                              </span>
                                            </div>
                                            <div className="text-primary title">
                                              This Is:{" "}
                                              <span className="text-body">
                                                Violent, Forceful
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="second">
                                        <div className="trending-info align-items-center w-100 animate__animated animate__fadeInUp iq-ltr-direction">
                                          <h1 className="trending-text big-title text-uppercase texture-text">
                                            the hero camp
                                          </h1>
                                          <div className="d-flex align-items-center text-white text-detail flex-wrap mb-4">
                                            <span className="season_date ms-2">
                                              {" "}
                                              2 Seasons{" "}
                                            </span>
                                            <span className="trending-year">
                                              Feb 2019
                                            </span>
                                          </div>
                                          <div className="iq-custom-select d-inline-block sea-epi mb-4">
                                            <select
                                              name="cars"
                                              className="form-control select2-basic-single js-states season-select"
                                            >
                                              <option value="season1">
                                                Season 1
                                              </option>
                                              <option value="season2">
                                                Season 2
                                              </option>
                                              <option value="season3">
                                                Season 3
                                              </option>
                                            </select>
                                          </div>
                                          <div
                                            className="position-relative swiper swiper-card streamit-block"
                                            data-slide="4"
                                            data-laptop="3"
                                            data-tab="2"
                                            data-mobile="2"
                                            data-mobile-sm="1"
                                            data-autoplay="false"
                                            data-loop="false"
                                            data-navigation="true"
                                            data-pagination="true"
                                          >
                                            <Swiper
                                              className="p-0 m-0 list-inline"
                                              slidesPerView={4}
                                            >
                                              {episode.map((edata, index) => (
                                                <SwiperSlide
                                                  as="li"
                                                  key={index}
                                                  className="swiper-slide"
                                                >
                                                  <EpisodeCard
                                                    link={edata.link}
                                                    image={edata.image}
                                                    showEpisod={
                                                      edata.showEpisod
                                                    }
                                                    episodDate={
                                                      edata.episodDate
                                                    }
                                                    episodTime={
                                                      edata.episodTime
                                                    }
                                                    episodTitle={
                                                      edata.episodTitle
                                                    }
                                                  ></EpisodeCard>
                                                </SwiperSlide>
                                              ))}
                                            </Swiper>
                                            <div className="swiper-button swiper-button-next"></div>
                                            <div className="swiper-button swiper-button-prev"></div>
                                          </div>
                                        </div>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="three">
                                        <div className="trending-info align-items-center w-100 animate__animated animate__fadeInUp iq-ltr-direction text-center">
                                          <h3 className="trending-text big-title text-uppercase texture-text mt-2">
                                            Watch Trailer
                                          </h3>
                                          <div className="episodes-contens mt-5">
                                            <div className="tab-watch-trailer-container d-inline-block rounded-3 overflow-hidden">
                                              <div className="tab-watch-trailer position-relative rounded-3 overflow-hidden">
                                                <img
                                                  src="/assets/images/tv-show/season/01.webp"
                                                  className="trailer-image"
                                                  alt="trailer-image"
                                                />
                                                <Link
                                                  to="/assets/images/video/trailer.mp4"
                                                  className="video-open playbtn text-decoration-none"
                                                  tabIndex="0"
                                                >
                                                  <svg
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    width="80px"
                                                    height="80px"
                                                    viewBox="0 0 213.7 213.7"
                                                    enableBackground="new 0 0 213.7 213.7"
                                                    xmlSpace="preserve"
                                                  >
                                                    <polygon
                                                      className="triangle"
                                                      fill="none"
                                                      strokeWidth="7"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeMiterlimit="10"
                                                      points="73.5,62.5 148.5,105.8 73.5,149.1 "
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
                                                  <span className="w-trailor text-uppercase">
                                                    {" "}
                                                    Watch Trailer{" "}
                                                  </span>
                                                </Link>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="four">
                                        <div className="trending-info align-items-center w-100 animate__animated animate__fadeInUp iq-ltr-direction">
                                          <h3 className="trending-text big-title text-uppercase texture-text mb-5">
                                            Recommended For You
                                          </h3>
                                          <div
                                            className="position-relative swiper swiper-card streamit-block"
                                            data-slide="4"
                                            data-laptop="3"
                                            data-tab="2"
                                            data-mobile="1"
                                            data-mobile-sm="1"
                                            data-autoplay="false"
                                            data-loop="false"
                                            data-navigation="true"
                                            data-pagination="true"
                                          >
                                            <Swiper
                                              className="p-0 swiper-wrapper m-0 list-inline"
                                              slidesPerView="4"
                                            >
                                              {episode.map((eData, index) => (
                                                <SwiperSlide
                                                  as="li"
                                                  key={index}
                                                  className="swiper-slide"
                                                >
                                                  <EpisodeCard
                                                    link={eData.link}
                                                    image={eData.image}
                                                    showEpisod={
                                                      eData.showEpisod
                                                    }
                                                    episodDate={
                                                      eData.episodDate
                                                    }
                                                    episodTime={
                                                      eData.episodTime
                                                    }
                                                    episodTitle={
                                                      eData.episodTitle
                                                    }
                                                  ></EpisodeCard>
                                                </SwiperSlide>
                                              ))}
                                            </Swiper>
                                            <div className="swiper-button swiper-button-next"></div>
                                            <div className="swiper-button swiper-button-prev"></div>
                                          </div>
                                        </div>
                                      </Tab.Pane>
                                    </Tab.Content>
                                  </Tab.Container>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="swiper-arrow swiper-button-next">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div className="swiper-arrow swiper-button-prev">
                    <i className="fa-solid fa-chevron-left"></i>
                  </div>
                </Swiper>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}
