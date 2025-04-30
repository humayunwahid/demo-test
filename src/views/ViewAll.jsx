import { Fragment, memo, useEffect, useState, useCallback, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardStyle from "../components/cards/CardStyle";
import BreadCrumbWidget from "../components/BreadcrumbWidget";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import Loader from "../components/ReactLoader";
import LeaderboardInner from "../Ads/LeaderboardInner";
import {ShimmerDiv} from "shimmer-effects-react";


import { getConfig } from '../../config';

const ViewAll = memo(() => {
    
  const config = getConfig();
  const { title } = useParams();

  const [location, setLocation] = useState(null);
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [totalSeries, setTotalSeries] = useState(0); // To track total available series
  const observerRef = useRef();

  const [shimmerCount, setShimmerCount] = useState(6);
  const [shimmerHeight, setShimmerHeight] = useState(320);
    

    
      

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
            setShimmerCount(5); // Desktop view
            setShimmerHeight(320); // Adjust height for desktop
          }
        };
    
        updateShimmerSettings(); // Run on component mount
        window.addEventListener("resize", updateShimmerSettings); // Update on resize
    
        return () => {
          window.removeEventListener("resize", updateShimmerSettings); // Cleanup listener
        };
      }, []);


  const fetchLocation = useCallback(async () => {
     // --- 
     try {
      // Add cache-busting parameter with timestamp and random number
      const cacheBuster = `deviceID=${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
      const url = `${config.appClouflareLocationIp
      }?${cacheBuster}`;
      
      const resp = await fetch(url);
      
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
  
      const results = await resp.json();
      const countryCode = (results.country_code?.toUpperCase() || "PK");
      
      console.log("Detected country code:", countryCode);
      setLocation(countryCode);
      return countryCode;
      
    } catch (error) {
      console.error("Error fetching location:", error);
      const fallbackCode = "PK";
      setLocation(fallbackCode);    
      return fallbackCode;
    }
    // --- 
  }, []);

  const fetchData = useCallback(async () => {
    if (!location || isFetching) return;

    setIsFetching(true);

    try {
      const response = await fetch(
        `https://demo-api.aryzap.com/api/series/byCatID/pg/${title}/${location}?limit=10&page=${page}`
      );
      const result = await response.json();

      if (result.series) {
        setDatas((prev) => [...prev, ...result.series]);
        setTotalSeries(result.pagination.totalSeries);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  }, [location, page, title]);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      const loc = await fetchLocation();
      setLocation(loc);
    };
    initialize();
  }, [fetchLocation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Intersection Observer
  useEffect(() => {
    const target = document.querySelector("#load-more");

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && datas.length < totalSeries) {
          console.log("Observer triggered. Incrementing page...");
          setPage((prevPage) => prevPage + 1); // Update page
        }
      },
      { threshold: 1.0 }
    );

    if (target) observerRef.current.observe(target);

    return () => observerRef.current.disconnect();
  }, [isFetching, datas.length, totalSeries]);

  return (
    <Fragment>
      {!isLoading && (
        <Helmet>
          <title>{`${title}`}</title>
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content={title}
            data-react-helmet="true"
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
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="720" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@aryzapofficial" />
          <meta name="twitter:site" content="@aryzapofficial" />
        </Helmet>
      )}
      <Toaster />
      <BreadCrumbWidget title={title} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="section-padding sec-pad">
          <LeaderboardInner />
          <Container fluid>
            <div className="card-style-grid">
              {datas.length > 0 ? (
                <Row className={"row row-cols-xl-5 row-cols-md-4 row-cols-2"}>
                  {datas.map((item, index) => (
                    <Col key={index} className="mb-2 c-padding">
                      <CardStyle
                        image={`https://demo-api.aryzap.com/public/${
                          item.seriesType === "live"
                            ? item.imageCoverBig
                            : item.imagePoster
                        }`}
                        link={
                          item.seriesType === "live"
                            ? `/live/${item.seriesLayout}/${item._id}`
                            : item.seriesType === "live-event"
                            ? `/live-event/${item.seriesLayout}/${item._id}`

                            : item.seriesType === "singleVideo"
                            ? `/watch/${item.seriesLayout}/${item._id}`
                            : item.cdnPlatform === "dm"
                            ? `/series/v2/${item._id}`
                            : item.cdnPlatform === "yt"
                            ? `/series/v1/${item._id}`
                            : `/series/v3/${item._id}`
                        }
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center">
                  <p>No Content is available for this category yet.</p>
                </div>
              )}
            </div>
            {isFetching && (
              // <div className="shimmer-placeholder">
              //   <p>Loading more content...</p>
              // </div>


              <div className="d-flex justify-content-between">
                {Array.from({ length: shimmerCount }).map((_, index) => (
                  <ShimmerDiv
                    key={index}
                    mode="custom"
                    from={"#131313"}
                    via={"#242323"}
                    to={"#131313"}
                    height={shimmerHeight} // Dynamically set height
                    width={250}
                    className="m-1"
                  />
                ))}              
              </div>


            )}
            <div id="load-more" style={{ height: "1px" }}></div>
          </Container>
        </div>
      )}
    </Fragment>
  );
});

ViewAll.displayName = "ViewAll";
export default ViewAll;
