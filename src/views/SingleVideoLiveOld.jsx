import React, { Fragment, memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Row, Col, Container, Nav, Tab, Form } from "react-bootstrap";

import { Link } from "react-router-dom";
import ReviewComponent from "../components/ReviewComponent";
import Sources from "../components/Sources";

import { Navigation } from "swiper/modules";
import UpcomingMovies from "../components/sections/UpcomingMovies";
import FsLightBox from "../components/fslight-box";
import RatingStar from "../components/rating-star";
import VideoJS from "../components/plugins/VideoJs";
import { BsArrowLeft } from "react-icons/bs";
const modules = [Navigation];

import { generateImgPath } from "../StaticData/data";
import { useEnterExit } from "../utilities/usePage";
import Radaint from "./Radiant";
import RadiantNew from "./RadiantNew";
import Loader from "../components/ReactLoader";

const SingleVideoTwo = memo(() => {
  useEnterExit();
  const navigate = useNavigate();
  const playerRef = React.useRef(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { channel } = useParams();

  useEffect(() => {
    fetchVideoSource();
    alert("Hello");
  }, []); 

  const fetchVideoSource = async () => {
    try {
      const response = await fetch("https://zapi.aryzap.com/api/series/"+ channel);
      if (!response.ok) {
        throw new Error("Failed to fetch video source");
      }
      const data = await response.json();
      setVideoSrc(data.seriesDM);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching video source:", error);
    }
  };

  return (
    <Fragment>
      
      {isLoading && (
        <Loader/>
      )}
      <div className="iq-main-slider site-video">        
        <Container fluid>
          <Row>
            <Col md="12" lg="12">
              <div className="pt-0">
                <div className="player">
                    <div className="back">
                      <BsArrowLeft onClick={() => navigate(-1)}/>
                    </div>                    
                    <div className="">
                      {isLoading == false ?
                      <RadiantNew link={videoSrc}/>
                      : null }
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

SingleVideoTwo.displayName = "SingleVideoTwo";
export default SingleVideoTwo;
