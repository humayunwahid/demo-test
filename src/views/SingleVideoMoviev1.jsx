import React, { Fragment, memo, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { auth, isAuthenticated, getUser } from "../firebase";
import RadiantNew from "./RadiantNew";
import Loader from "../components/ReactLoader";
import { useEnterExit } from "../utilities/usePage";

const SingleVideoMoviev1 = memo(() => {
  useEnterExit();
  const location = useLocation();

  const navigate = useNavigate();
  const playerRef = React.useRef(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState("");
  const [FeatureImage, setFeatureImage] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { channel } = useParams();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [key, setKey] = useState(null);
  const [secretKey, setSecretKey] = useState(null);  
  const [adsManager, setAdsManager] = useState("");
  const currentURL = window.location.href;


  const [isLive, setIsLive] = useState(null);
  // const [url, setUrl] = useState(null);
  const [promo, setPromo] = useState(null);
  const [CDNWebLink, setCDNWebLink] = useState(null);

  useEffect(() => {
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

    // Fetch video source from API
    fetchVideoSource();

    const currentUser = getUser();
    const Authenticated = isAuthenticated();
    setUser(currentUser);

    if (!Authenticated) {
      // navigate("/login");
      navigate(`/login?redirect=${location.pathname}`);

    } else {
      const userID = currentUser.uid;
    }

    // Set page as loaded after everything has been fetched/loaded
    setIsPageLoaded(true);
  }, [channel, navigate]);

  useEffect(() => {
    if (isPageLoaded && title && user) {
      // Update title and send analytics event when page is fully loaded
      const pageTitle = title;
      // alert(pageTitle + " " + user.uid);
      if (window.gtag) {
        gtag('set', {
          'user_id': user.uid,
          'screen_name': pageTitle
       });
}
    }
  }, [isPageLoaded, title, user]);

  // const fetchVideoSource = async () => {
  //   try {
  //     // Fetch data from API
  //     const response = await fetch("https://demo-api.aryzap.com/api/series/" + channel);
  //     const liveLinks = await fetch(`https://aryzap.com/api/livelinks.php`);

  //     if (!response.ok || !liveLinks.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const data = await response.json();
  //     const liveData = await liveLinks.json();
      

      
  //     setKey(liveData);
  //     setSecretKey(data.seiresCDNWebKey);
  //     setTitle(data.title);
  //     setDescription(data.description);
  //     setFeatureImage(data.imageCoverDesktop);      
  //     setAdsManager(data.trailer);

  //     // Assuming the API response has a 'src' field containing the video source
  //     setVideoSrc(data.seiresCDN);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching video source:", error);
  //   }
  // };

  const fetchVideoSource = async (maxRetries = 3) => {
    let attempts = 0;
    let success = false;
  
    while (attempts < maxRetries && !success) {
      try {
        attempts++;
        // console.log(`Attempt ${attempts} to fetch video source`);
  
        const response = await fetch(`https://demo-api.aryzap.com/api/series/${channel}`);
        if (!response.ok) throw new Error("Failed to fetch series data");
  
        const data = await response.json();
        if (!data.seiresCDNWebLink) {
          throw new Error("Incomplete data received");
        }
  
        setSecretKey(data.seiresCDNWebKey);
        setCDNWebLink(data.seiresCDNWebLink);
        setTitle(data.title || "Untitled Video");
        setDescription(data.description || "No description available");
        setFeatureImage(data.imageCoverDesktop || "default-image.jpg");
        setAdsManager(data.adsManager.tag || "");
        setVideoSrc(data.seiresCDNWebLink || "");
        setPromo(data.trailer || "");
        setIsLive(data.isLive);
        setPosterImage(data.imagePoster);
  
        // const liveLinks = await fetch(
        //   `https://aryzap.com/api/livelinks_new.php?key=${data.seiresCDNWebKey}&path=${data.seiresCDNWebLink}`
        // );
        // if (!liveLinks.ok) throw new Error("Failed to fetch live links");
  
        // const liveData = await liveLinks.json();
        // if (liveData[0]?.signed_url) {
        //   setUrl(liveData[0].signed_url);
        // } else {
        //   console.warn("Signed URL missing from live links response");
        // }
  
        setIsLoading(false);
        success = true; // Mark as successful to exit the retry loop
      } catch (error) {
        console.error(`Error fetching video source (Attempt ${attempts}):`, error);
  
        if (attempts >= maxRetries) {
          // console.error("Max retries reached. Unable to fetch video source.");
          setIsLoading(false);
        } else {
          console.warn("Retrying fetch video source...");
        }
      }
    }
  };

  return (
    <Fragment>
      {!isLoading && (
        <Helmet>
          <title>{`${title}`}</title>
          <meta name="description" content={`${description}`} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} data-react-helmet="true" />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={currentURL} />
          <meta property="og:site_name" content={title} data-react-helmet="true" />
          <meta property="article:publisher" content="https://www.facebook.com/aryzappk" />
          <meta property="article:published_time" content={new Date().toLocaleString()} />
          <meta property="article:modified_time" content={new Date().toLocaleString()} />
          <meta property="og:image" content={"https://demo-api.aryzap.com/public/" + FeatureImage} data-react-helmet="true" />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="720" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@aryzapofficial" />
          <meta name="twitter:site" content="@aryzapofficial" />
        </Helmet>
      )}

      {isLoading && <Loader />}

      <div className="iq-main-slider site-video">
        <Container fluid>
          <Row>
            <Col lg="12" md="12">
              <div className="pt-0">
                <div className="player">
                  <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                  </div>
                  <div className="">
                    {/* {key && key.map((item, i) => (
                      <Fragment key={i}>
                        {item.key === secretKey && (
                          <RadiantNew link={item.url} adsManager={adsManager} title={title} version={'v1'} />                          
                        )}
                      </Fragment>
                    ))} */}

                    {videoSrc ? (
                          <Fragment>
                            <RadiantNew link={videoSrc} adsManager={adsManager} title={title} version={'v1'} />
                          </Fragment>
                        ) : null} 
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
});

SingleVideoMoviev1.displayName = "SingleVideoMoviev1";
export default SingleVideoMoviev1;