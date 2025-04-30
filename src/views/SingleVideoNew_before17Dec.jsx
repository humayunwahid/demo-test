import React, { Fragment, memo, useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link, useLocation  } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import ReactPlayer from 'react-player/youtube';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, isAuthenticated } from "../firebase.jsx";
import FollowUs from "../components/blog/sidebar/FollowUs.jsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from "react-helmet";
import axios from 'axios';
import LeaderboardInner from '../Ads/LeaderboardInner.jsx';
import MrecInner from '../Ads/MrecInner.jsx';
import ErrorPage2 from "./ExtraPages/ErrorPage2.jsx";

import RadiantNew from "./RadiantNew.jsx";
import Cookies from 'universal-cookie';

import { getConfig } from '../../config.js';





const SingleVideoNew = memo(() => {
  const config = getConfig();

  const cookies = new Cookies();
  // alert(cookies.get('videoSource') +  " Helol");
  const videoSource = location.state?.videoSource;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [isLoading, setIsLoading] = useState(true);
  const [related, setRelated] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { videoid, platformid, playlistid, position } = useParams(); 

  // alert(playlistid);
  const [playlistidnew, setPlaylistidnew] = useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const _class = position === 'left' ? "flex-lg-row-reverse" : "";
  const seasonRef = useRef(null);
  const [time, setTime] = useState(null);
  const [description, setDescription] = useState("");
  const [FeatureImage, setFeatureImage] = useState("");
  const [videoPlatformUrl, setVideoPlatformUrl] = useState(null);
  const currentURL = window.location.href;
  const [hasError, setHasError] = useState(false);

  // const YOUTUBE_API_KEY = 'AIzaSyDJraNMuVIoIVQWVnrejH6-OzoEEYNtFls'
  const YOUTUBE_API_KEY = `${config.appYtApiKey}`
    
  let videoPlatformUrlDM, videoPlatformUrlYT;
  

  if (platformid === '1') {
     videoPlatformUrlYT = `https://www.youtube.com/embed/${videoid}`;
  
  
  } else if (platformid === '2') {
    videoPlatformUrlDM = `https://geo.dailymotion.com/player/xahry.html?video=${videoid}`;
   
  } 




  
  useEffect(() => {
    if (platformid !== "1" && platformid !== "2" && platformid !== "3") {
      setHasError(true);
      return; // Exit early if the platform ID is invalid
    }
  
    if (platformid === '2') {
      // Fetch Dailymotion video details
      fetch(`https://api.dailymotion.com/video/${videoid}?fields=id,url,published,title,uploaded_time,updated_time,thumbnail_180_url`)
        .then((resp) => resp.json())
        .then((results) => {
          setTime(results.uploaded_time);
          setTitle(results.title);
          setDescription(results.title);
          setFeatureImage(results.thumbnail_180_url);
        })
        .catch((error) => {
          console.error('Error fetching Dailymotion video data:', error);
          setHasError(true);
        });
  
      // Fetch Dailymotion playlists
      fetch(`https://api.dailymotion.com/video/${videoid}/playlists`)
        .then((resp) => resp.json())
        .then((results) => {
          if (results.list && results.list.length > 0) {
            setPlaylistidnew(results.list[0].id);
          } else {
            setHasError(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching Dailymotion playlists:", error);
          setHasError(true);
        });
    } else if (platformid === '1') {
      // Fetch YouTube video details
      fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoid}&key=${YOUTUBE_API_KEY}&part=snippet`)
        .then((resp) => resp.json())
        .then((results) => {
          if (results.items && results.items.length > 0) {
            setTitle(results.items[0].snippet.title);
            setDescription(results.items[0].snippet.description);
            setFeatureImage(results.items[0].snippet.thumbnails.high.url); // Ensure correct path to `url`
          } else {
            setHasError(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching YouTube video data:", error);
          setHasError(true);
        });
    } else if (platformid === '3') {
      // Fetch custom video source for platform 3
      fetch(`https://pythoncron.arylive.com/get-cdn-episode/${videoid}`)
        .then((resp) => resp.json())
        .then((results) => {
          if (results) {            
            setVideoPlatformUrl(results.videoSource);
            setFeatureImage(results.imagePath); // Assuming `thumbnail` is part of the response
            setTitle(results.title); // Adjust based on the response structure
            setDescription(results.description); // Adjust based on the response structure
            setIsLoading(false);
          } else {
            setHasError(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching custom platform video data:", error);
          setHasError(true);
        });
    }
  }, [videoid, platformid]);
  

  const fetchRelatedVideos = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      
      setRelated(result);
      setTotalPages(result.total / 10);
      // alert(result.total);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching playlist:', error);
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    //  alert(newPage + playlistidnew);
    let url;
    if (platformid === '2') {
      
      url = `https://api.dailymotion.com/playlist/${playlistidnew}/videos?fields=thumbnail_180_url,title,id,views_total,duration,owner.screenname,owner&page=${newPage}&limit=10`;
    } else if (platformid === '1') {
      url = `https://demo-api.aryzap.com/api/yt/${playlistid}?page=${newPage}`;
    }
    fetchRelatedVideos(url);

     // Scroll to the specific tab
     if (seasonRef.current) {
      seasonRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  };

  useEffect(() => {
    const dailymotionUrl = `https://api.dailymotion.com/playlist/${playlistid}/videos?fields=thumbnail_180_url,title,id,views_total,duration,owner.screenname,owner&page=${page}&limit=10`;
    const youtubeUrl = `https://demo-api.aryzap.com/api/yt/${playlistid}`;

    if (platformid === '2' && !related) {

      fetchRelatedVideos(dailymotionUrl);
    }
    if (platformid === '1' && !related) {

      fetchRelatedVideos(youtubeUrl);
    }
    if (platformid === '3' && !related) {

      fetchRelatedVideos(`https://demo-api.aryzap.com/api/yt/${playlistid}`);
    }
  }, [platformid, related, playlistid, page]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const Authenticated = isAuthenticated();
    if (!Authenticated) {
      navigate("/login");
    }
  }, [navigate]);

   

  const renderDailymotionVideos = (videos) => (
    <Container>
      <Row>
        <Col lg="12" sm="12" className="widget p-10" ref={seasonRef}>
          <ul className="list-inline m-0 p-0">
            {videos.map((item, i) => (
              <>
              {title != item.title ?
              <li className="d-flex align-items-center justify-content-between bg-black mt-2 px-2" key={item.title + "ep"}>
                <div className="d-flex align-items-center gap-3">
                  <div className="image-box single flex-shrink-0">
                    <Link to={`/video/2/${item.id}/${item.owner}`}>
                      <img
                        src={item.thumbnail_180_url}
                        alt="image-icon"
                        className="img-fluid rounded"
                      />
                    </Link>
                  </div>
                  <div className="image-details">
                    <Link to={`/video/2/${item.id}/${item.owner}`}>
                      <h6 className="mb-1 text-capitalize">{item.title}</h6>
                    </Link>
                    <small>{Math.round(item.duration / 60)} minutes</small>
                  </div>
                </div>
                <div
                  className="iq-button singleVideoButon"
                  data-animation-in="fadeInUp"
                  data-delay-in="1.2"
                >
                  <Link
                    to={`/video/2/${item.id}/${item.owner}`}
                    className="btn text-uppercase position-relative"
                  >
                    <span className="button-text">Play Now</span>
                    <i className="fa-solid fa-play"></i>
                  </Link>
                </div>
              </li>
               : null } 
              </>
            ))}
          </ul>
          <div className="pagination d-flex align-items-center justify-content-center mt-2 px-2 py-2">
            <Button className="mx-2 py-2" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Previous</Button>
            <Button className="mx-2 py-2" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>Next</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
  const renderYoutubeVideosNew = (videos) => (
    <Container>
      <Row>
        <Col lg="12" sm="12" className="widget p-10" ref={seasonRef}>
          <ul className="list-inline m-0 p-0">
            {videos?.slice(0, 10).map((item, i) => (
              
              <>
              {title !== item.title && item.title !== "Private video" && item.title !== "Deleted video" ?
              <>
              <li className="d-flex align-items-center justify-content-between bg-black mt-2 px-2" key={item.title + "ep"}>
                <div className="d-flex align-items-center gap-3">
                  <div className="image-box single flex-shrink-0">
                    <Link  to={`/video/1/${item.videoYtId}/${item.seriesId}`}>
                      <img
                        src={item.imagePath}
                        alt="image-icon"
                        className="img-fluid rounded"
                      />
                    </Link>
                  </div>
                  <div className="image-details">
                    <Link  to={`/video/1/${item.videoYtId}/${item.seriesId}`}>
                      <h6 className="mb-1 text-capitalize">{item.title}</h6>
                    </Link>
                    {/* <small>{Math.round(item.duration / 60)} minutes</small> */}
                  </div>
                </div>
                
                <div
                  className="iq-button singleVideoButon"
                  data-animation-in="fadeInUp"
                  data-delay-in="1.2"
                >
                  <Link
                   to={`/video/1/${item.videoYtId}/${item.seriesId}`}
                    className="btn text-uppercase position-relative"
                  >
                    <span className="button-text">Play Now</span>
                    <i className="fa-solid fa-play"></i>
                  </Link>
                </div>
              </li>
              </>
               : null } 
              </>
            ))}
            
            <div
                className="iq-button singleVideoButon mt-4 text-center"
                data-animation-in="fadeInUp"
                data-delay-in="1.2"
              >
                <Link
                to={`/series/v1/${playlistid}`}
                  className="btn text-uppercase position-relative"
                >
                  <span className="button-text">View Full Playlist</span>
                  <i className="fa-solid fa-play"></i>
                </Link>
              </div>
          </ul>
          {/* <div className="pagination d-flex align-items-center justify-content-center mt-2 px-2 py-2">
            <Button className="mx-2 py-2" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Previous</Button>
            <Button className="mx-2 py-2" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>Next</Button>
          </div> */}
        </Col>
      </Row>
    </Container>
  )
  const renderCdnVideos = (videos) => (
    <Container>
      <Row>
        <Col lg="12" sm="12" className="widget p-10" ref={seasonRef}>
          <ul className="list-inline m-0 p-0">
            {videos?.slice(0, 10).map((item, i) => (
              
              
              <>
              <li className="d-flex align-items-center justify-content-between bg-black mt-2 px-2" key={item.title + "ep"}>
                <div className="d-flex align-items-center gap-3">
                  <div className="image-box single flex-shrink-0">
                    <Link  to={`/video/3/${item._id}/${item.seriesId}`}>
                      <img
                        src={item.imagePath}
                        alt="image-icon"
                        className="img-fluid rounded"
                      />
                    </Link>
                  </div>
                  <div className="image-details">
                    <Link  to={`/video/3/${item._id}/${item.seriesId}`}>
                      <h6 className="mb-1 text-capitalize">{item.title}</h6>
                    </Link>
                    {/* <small>{Math.round(item.duration / 60)} minutes</small> */}
                  </div>
                </div>
                
                <div
                  className="iq-button singleVideoButon"
                  data-animation-in="fadeInUp"
                  data-delay-in="1.2"
                >
                  <Link
                   to={`/video/3/${item._id}/${item.seriesId}`}
                    className="btn text-uppercase position-relative"
                  >
                    <span className="button-text">Play Now</span>
                    <i className="fa-solid fa-play"></i>
                  </Link>
                </div>
              </li>
              </>
            ))}
            
            <div
                className="iq-button singleVideoButon mt-4 text-center"
                data-animation-in="fadeInUp"
                data-delay-in="1.2"
              >
                <Link
                to={`/series/v1/${playlistid}`}
                  className="btn text-uppercase position-relative"
                >
                  <span className="button-text">View Full Playlist</span>
                  <i className="fa-solid fa-play"></i>
                </Link>
              </div>
          </ul>
          {/* <div className="pagination d-flex align-items-center justify-content-center mt-2 px-2 py-2">
            <Button className="mx-2 py-2" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Previous</Button>
            <Button className="mx-2 py-2" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>Next</Button>
          </div> */}
        </Col>
      </Row>
    </Container>
  )


  const renderYouTubeVideos = (videos) => (
    <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 mt-5">
      {videos.map((item, i) => (
        
        <Col className="mb-4" key={i}>
          <div className="watchlist-warpper card-hover-style-two">
            <div className="block-images position-relative w-100">
              <div className="img-box">
                <Link
                  to={`/video/1/${item.videoYtId}/${item.id}`}
                  className="position-absolute top-0 bottom-0 start-0 end-0"
                ></Link>
                <img
                  src={item.imagePath}
                  alt="video-thumbnail"
                  className="img-fluid object-cover w-100 d-block border-0"
                />
              </div>
              <div className="card-description">
                <h5 className="text-capitalize fw-500">
                  <Link to={`/video/1/${item.videoYtId}/${item.id}`}>
                    {item.snippet.title}
                  </Link>
                </h5>
                {/* <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center gap-1 font-size-12">
                    <i className="fa-solid fa-earth-americas text-primary"></i>
                    <span className="text-body fw-semibold text-capitalize">
                      {item.snippet.videoOwnerChannelTitle}
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );

  const renderSkeleton = () => (
    <Row className="row-cols-1 row-cols-md-1 row-cols-lg-12 mt-5">
      {Array(8).fill().map((_, i) => (
        <Col className="mb-4" key={i}>
          <div className="watchlist-warpper card-hover-style-two">
            <div className="block-images position-relative w-100">
              <Skeleton height={30} />
              {/* <div className="card-description mt-3">
                <Skeleton count={2} />
              </div> */}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );

  if (hasError) {
    return <ErrorPage2 />; // Render the error page if there's an error
  }

  return (
    <Fragment>
      {isLoading == false ? (
        <Helmet>
          <title>{`${title}`}</title>
          <meta name="description" content={`${description}`} />
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content={title}
            data-react-helmet="true"
          />
          <meta property="og:description" content={description} />
          <meta
            property="og:url"
            content={currentURL}
          />
          <meta
            property="og:site_name"
            content={title}
            data-react-helmet="true"
          />
          <meta
            property="article:publisher"
            content="https://www.facebook.com/aryzappk"
          />
          <meta
            property="article:published_time"
            content={new Date().toLocaleString()}
          />
          <meta
            property="article:modified_time"
            content={new Date().toLocaleString()}
          />
          <meta
            property="og:image"
            // content={"https://demo-api.aryzap.com/public/" + FeatureImage}
            content={FeatureImage}
            data-react-helmet="true"
          />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="720" />
          {/* <meta property="fb:app_id" content="375569812886822" /> */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@aryzapofficial" />
          <meta name="twitter:site" content="@aryzapofficial" />
        </Helmet>
      ) : null}
      <div className='section-padding mx-2 mt-3  '>
        <Container>
          <LeaderboardInner/>
          <Row className={_class}>
            <Col lg="9" sm="12" className='align-items-start'>
              <div className="player mobileMT-30">
              {platformid === '1' ? (
                <div className="single-video">
                  <iframe
                    className="dailysingle"
                    src={videoPlatformUrlYT}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                  <h5 className="videoTitle mt-4">{title}</h5>
                </div>
              ) : platformid === '2' ? (
                <div className="single-video">
                  <iframe
                    className="dailysingle"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay"
                    autoPlay
                    title="ARY ZAP | A Video Streaming Portal"
                    width="100%"
                    src={videoPlatformUrlDM}
                  ></iframe>
                  <h5 className="videoTitle mt-4">{title}</h5>
                </div>
              ) : (
                <>
                {videoPlatformUrl !== null ? 
                  <>   
                      <div className="single-video-live">
                            <Fragment>
                                <RadiantNew key={videoPlatformUrl} link={videoPlatformUrl} adsManager="https://pubads.g.doubleclick.net/gampad/live/ads?iu=/67551462/LaLiga-ARYZap-App_PR&description_url=https%3A%2F%2Faryzap.com%2Flaliga-2023%2F&tfcd=0&npa=0&sz=176x144%7C300x250%7C320x180%7C352x288%7C375x210%7C400x300%7C640x360%7C640x480%7C854x480%7C1280x720&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=" title={title} version={'v2'} />      
                            </Fragment>
                        <h5 className="videoTitle mt-4 text-uppercase">{title}</h5>
                    </div>  
                    </> 
                : null
                }
                </>   
          
              )
              }

              </div>
            </Col>
            <Col lg="3" sm="12" className='text-center mobileMT-40 fix-title'>
              {/* <img src="/assets/images/4694255592973182053.png" alt="Ad"/> */}
              <MrecInner/>
              <a target="_blank" href="https://apps.apple.com/pk/app/ary-zap/id1475260911">
                <img className="mt-4" src="/assets/images/apps/Apple.png" alt="" />
              </a>
              <a target="_blank" href="https://play.google.com/store/apps/details?id=com.release.arylive&hl=en">
                <img className="mt-2 mb-4" src="/assets/images/apps/Android Button.png" alt="" />
              </a>
              <FollowUs heading="Share Video On:" />
            </Col>
          </Row>
          {isLoading && renderSkeleton()}
          {!isLoading && platformid === '2' && related && renderDailymotionVideos(related.list)}
          {!isLoading && platformid === '1' && related && renderYoutubeVideosNew(related.episode)}
          {!isLoading && platformid === '3' && related && renderCdnVideos(related.episode)}
        </Container>
      </div>
    </Fragment>
  );
});

SingleVideoNew.displayName = "SingleVideoNew";
export default SingleVideoNew;