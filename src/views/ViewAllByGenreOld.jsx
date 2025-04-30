import { Fragment, memo, useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardStyle from "../components/cards/CardStyle";
import BreadCrumbWidget from "../components/BreadcrumbWidget";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../components/ReactLoader";
import LeaderboardInner from "../Ads/LeaderboardInner";
import toast, { Toaster } from "react-hot-toast";
import { getConfig } from '../../config';

const ViewAllByGenre = memo(() => {
    
  const config = getConfig();
  const { genreId } = useParams();
  const { genreId } = useParams();
  const [location, setLocation] = useState("PK"); // Default to "PK"
  const [datas, setDatas] = useState({ series: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
      
      } catch (error) {
        console.error("Error fetching location:", error);
        const fallbackCode = "PK";
        setLocation(fallbackCode);    
      }
    // --- 
  }, []);

  const fetchData = async (isLoadMore = false) => {
    if (!isLoadMore) setIsLoading(true);
    else setIsLoadingMore(true);

    try {
      if (!isLoadMore) {
        await fetchLocation(); // Ensure location is fetched first
        const genreResponse = await fetch(`https://demo-api.aryzap.com/api/genres/${genreId}`);
        const genreData = await genreResponse.json();
        setTitle(genreData.title);
      }

      const seriesResponse = await fetch(
        `https://demo-api.aryzap.com/api/genres/genreid/pg/${genreId}?page=${page}&limit=10`
      );
      const seriesData = await seriesResponse.json();

      if (seriesData.series && seriesData.series.length > 0) {
        setDatas((prev) => ({
          ...seriesData,
          series: [
            ...(prev?.series || []), // Ensure previous series exists or fallback to an empty array
            ...seriesData.series.filter(
              (newItem) => !(prev?.series || []).some((prevItem) => prevItem._id === newItem._id)
            ),
          ],
        }));
        console.warn(datas);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [genreId, page]);

  const loadMore = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  return (
    <Fragment>
      {!isLoading && (
        <Helmet>
          <title>{title}</title>
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="article:publisher" content="https://www.facebook.com/aryzappk" />
          <meta property="article:published_time" content={new Date().toISOString()} />
          <meta property="article:modified_time" content={new Date().toISOString()} />
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
              {datas?.series?.filter((data) => data.status === "published").length > 0 ? (
                <Row className="row row-cols-xl-5 row-cols-md-4 row-cols-2">
                  {datas.series
                    .filter((data) => data.status === "published")
                    .map((item, index) => (
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
            {hasMore && (
              <div className="text-center mt-3">
                <button
                  onClick={loadMore}
                  className="btn btn-primary"
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </Container>
        </div>
      )}
    </Fragment>
  );
});

ViewAllByGenre.displayName = "ViewAllByGenre";
export default ViewAllByGenre;
