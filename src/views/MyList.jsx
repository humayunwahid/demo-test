import { Fragment, memo, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardStyleWithRemove from "../components/cards/CardStyleWithRemove";
import BreadCrumbWidget from "../components/BreadcrumbWidget";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import { auth, isAuthenticated, getUser } from "../firebase";

import SectionSlider from "../components/slider/SectionSlider";
import {Link, useNavigate} from 'react-router-dom'
import { Helmet } from "react-helmet";

// import { ShimmerButton, ShimmerTitle } from "react-shimmer-effects";


// component
// import VerticalShimmer from "../components/card/shimmer/vertical-card-shimmer";

// import { Image, Shimmer } from 'react-shimmer'

const MyList = memo(() => { 

  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("ARY ZAP - My List");
  const navigate = useNavigate();

  useEffect(() => {    
    const currentUser = getUser();
    const Authenticated = isAuthenticated();
    setUser(currentUser);
    if (currentUser) {
      setIsLoading(true);
      fetch(`https://demo-api.aryzap.com/api/fav/user/${currentUser.uid}`)
        .then((resp) => resp.json())        
        .then((result) => {
          // Filter out any items without a seriesId
          const filteredResult = result.filter(item => item.seriesId !== undefined);
          
          // Sort result so that items with seriesType 'programs' are at the end
          const sortedResult = filteredResult.sort((a, b) => {
            if (a.seriesId.seriesType === 'programs') return 1;
            if (b.seriesId.seriesType === 'programs') return -1;
            return 0;
          });
          setIsLoading(false);
          setDatas(sortedResult);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching data: ", error);
        });
    } else {
      navigate("/");
    }
    setIsLoading(false);
  }, [datas]);
  
  

  // Separate items based on seriesType
  const programsAndShows = datas?.filter(item => item.seriesId.seriesType === "show" || item.seriesId.seriesType === "programs") || [];
  const programs = datas?.filter(item => 
    item.seriesId.seriesType === "programs" || item.seriesId.seriesType === "shows"
  ) || [];


  return (
    <Fragment>
      {isLoading == false ? (
        <Helmet>
          <title>{`${title}`}</title>
        </Helmet>
      ) : null}
      <Toaster />
      <BreadCrumbWidget title="My List" />
      <div className="section-padding">
        <Container fluid>
          <div className="card-style-grid">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {programsAndShows.length > 0 && (

                  <>
                  <Row className="row row-cols-xl-5 row-cols-md-4 row-cols-2 mb-4">
                    {programsAndShows.map((item, index) => (
                      <Col key={index} className="mb-2 c-padding">
                        <CardStyleWithRemove
                          image={`https://demo-api.aryzap.com/public/${item.seriesId.imagePoster}`}
                          link={
                            item.seriesId.seriesType === "live"
                              ? `/live/${item.seriesId.ost}/${item.seriesId._id}`
                              : item.seriesId.seriesType === "live-event"
                              ? `/live-event/${item.seriesId.ost}/${item.seriesId._id}`
                              : `/series/v2/${item.seriesId._id}`
                          }
                          id={item.seriesId._id}
                        />
                      </Col>
                    ))}
                  </Row>
                  </>
                )}
{/* 
                {programs.length > 0 && (
                  <>
                  <h5 className="my-3 text-center bg-primary py-2 fw-bolder">SHOWS</h5>
                  <Row className="row row-cols-xl-3 row-cols-md-4 row-cols-2">
                    {programs.map((item, index) => (
                      <Col key={index} className="mb-5">
                        <CardStyleWithRemove
                          image={`https://demo-api.aryzap.com/public/${item.seriesId.imagePoster}`}
                          link={
                            item.seriesId.seriesType === "live"
                              ? `/live/${item.seriesId.ost}/${item.seriesId._id}`
                              : item.seriesId.seriesType === "live-event"
                              ? `/live-event/${item.seriesId.ost}/${item.seriesId._id}`
                              : `/series/v2/${item.seriesId._id}`
                          }
                          id={item.seriesId._id}
                        />
                      </Col>
                    ))}
                  </Row>
                  </>
                )} */}

                {datas && datas.length === 0 && (
                  <p className='text-center w-100'>You haven't added anything to your list.</p>
                )}
              </>
            )}
          </div>
        </Container>
      </div>
    </Fragment>
  );
});

MyList.displayName = "MyList";
export default MyList;