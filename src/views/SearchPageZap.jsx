import { Fragment, memo, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardStyleWithFav from "../components/cards/CardStyleWithFav";
import BreadCrumbWidget from "../components/BreadcrumbWidget";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";
import Loader from "../components/ReactLoader";
import LeaderboardInner from "../Ads/LeaderboardInner";

const SearchPage = memo(() => { 
  const { query } = useParams();
  
  const [datas, setDatas] = useState(null);
  const [EpisodeDatas, setEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      fetch(`https://demo-api.aryzap.com/api/search/${query}`)
        .then((resp) => resp.json())
        .then((result) => {
          setDatas(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setIsLoading(false);
        });
  }, [query]);

  const renderSection = (type, title) => {
    if (!datas || !datas.series) return null;

    // const filteredItems = datas.series.filter(item => item.seriesType === type);

    const filteredItems = datas.series.filter(item => {
        if (type === "show") {
            return item.seriesType === "show" || item.seriesType === "programs";
        }
        return item.seriesType === type;
    });
    //  Debugging: Log filteredItems to confirm
     console.log("Filtered Items:", filteredItems);

    if (filteredItems.length === 0) return null;

    // console.log(datas);

    return (
      <div key={type}>
            <div className="d-flex align-items-end justify-content-between mb-2 mt-4">
              <h5 className="main-title text-capitalize mb-0 fw-bolder">{title}</h5>
            </div>

        <Row className="row row-cols-xl-5 row-cols-md-4 row-cols-2">
          {filteredItems.map((item, index) => (
            <Col key={index} className="mb-2 c-padding">
              <CardStyleWithFav
                image={`https://demo-api.aryzap.com/public/${item.imagePoster}`}
                link={
                  item.seriesType === "live"
                    ? `/live/${item.seriesLayout}/${item._id}`
                    : item.seriesType === "singleVideo"
                            ? `/watch/${item.seriesLayout}/${item._id}`
                    : item.seriesType === "live-event"
                    
                    ? `/live-event/${item.seriesLayout}/${item._id}`
                    : `/series/v2/${item._id}`
                }
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  };


  const renderEpisode = (title) => {
    if (!datas || !datas.episodes) return null;

    const filteredItemsEpisodes = datas.episodes;

    if (filteredItemsEpisodes.length === 0) return null;

    return (
      <div>
            <div className="d-flex align-items-end justify-content-between mb-2 mt-4">
              <h5 className="main-title text-capitalize mb-0 fw-bolder">{title}</h5>
              
              <Link
                to={'link ? link : `/view-all/${type}/${title}`'}
                className="iq-view-all text-decoration-none text-light btn btn-primary  view-all-btn "
             //   onClick={handleViewAllClick}
              >
                View All
              </Link>
            </div>

        <Row className="row row-cols-xl-5 row-cols-md-4 row-cols-2">
          {filteredItemsEpisodes.slice(0, 15).map((items, index) => (
            <Col key={index} className="mb-5">
              <CardStyleWithFav
                image={`${items.imagePath}`}
                // link={items.videoYtId }
                link={"/video/1/"+items.videoYtId+"/"+items.seriesId}
              />
              <div class="card-description pb-0 mt-2">
                <h5 class="text-capitalize fw-500">
                  <a href={"/video/1/"+items.videoYtId+"/"+items.seriesId}>{items.title}</a>
                </h5>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };
  const renderCast = (title) => {
    if (!datas || !datas.cast) return null;

    const filteredItemsCast = datas.cast;

    if (filteredItemsCast.length === 0) return null;

    return (
      <div>
            <div className="d-flex align-items-end justify-content-between mb-2 mt-4">
              <h5 className="main-title text-capitalize mb-0 fw-bolder">{title}</h5>
              
              {/* <Link
                to={'link ? link : `/view-all/${type}/${title}`'}
                className="iq-view-all text-decoration-none text-light btn btn-primary  view-all-btn "
              >
                View All
              </Link> */}
            </div>

        <Row className="row row-cols-xl-5 row-cols-md-4 row-cols-2">
          {filteredItemsCast.slice(0, 15).map((items, index) => (
            items !== "null" && (
            <Col key={index} className="mb-3">
              <div className="cast">
              <Link
                to={`/cast-view-all/${items}/`}
                className="iq-view-all text-decoration-none text-light btn btn-primary  view-all-btn "
              >
                {items}
              </Link>      
              </div>      
            </Col>
            )
          ))}
        </Row>
      </div>
    );
  };

  return (
    <Fragment>
      {isLoading == false ? (
        <Helmet>
          <title>{`Search Results for '${query}'`}</title>
          <meta name="description" content={`Search Results for '${query}'`} />
        </Helmet>
      ) : null}
      <Toaster />
      <BreadCrumbWidget title={`Search Results for '${query}'`}/>

      <LeaderboardInner/>
      <div className="section-padding sec-pad">
      <Container fluid>
        <div className="card-style-grid">
          {isLoading ? (
            <Loader/>
          ) : (
            datas && (
              <>
                {renderSection('show', 'PROGRAMS AND SHOWS')}
                {/* {renderSection('programs', 'PROGRAMS')} */}
                {renderSection('live', 'LIVE CHANNELS')}
                {renderSection('live-event', 'LIVE EVENTS')}
                {/* {renderEpisode('EPISODES')} */}
                {renderCast('Cast')}
              </>
            )
          )}
        </div>
      </Container>

      </div>
    </Fragment>
  );
});

SearchPage.displayName = "SearchPage";
export default SearchPage;
