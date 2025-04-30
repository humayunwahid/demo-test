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
// import { useNavigate } from "react-router-dom";
const modules = [Navigation];

import { generateImgPath } from "../StaticData/data";
import { useEnterExit } from "../utilities/usePage";
import Radaint from "./Radiant";
import RadiantNew from "./RadiantNew";
import Loader from "../components/ReactLoader";
 
// alert(videoid);
const SingleVideoTwo = memo(() => {
  useEnterExit();
  const navigate = useNavigate();
  const playerRef = React.useRef(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { channel } = useParams();

  useEffect(() => {
    // Fetch video source from API
    fetchVideoSource();
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  const fetchVideoSource = async () => {
    try {
      // Fetch data from API
      const response = await fetch("https://zapi.aryzap.com/api/series/"+ channel);
      if (!response.ok) {
        throw new Error("Failed to fetch video source");
      }
      const data = await response.json();
      // Assuming the API response has a 'src' field containing the video source
      setVideoSrc(data.seriesDM);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching video source:", error);
    }
  };


 // alert(channel);
 // alert(testvalue);
  // const videoJsOptions = {
  //   autoplay: false,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   className: "dailysingle",
  //   techOrder: ["html5"],
  //   sources: [
  //     {
  //       // src: "https://arynewsm.aryzap.com/v1/0183ea205add0b8ed5941a38bc6f/018ad63928611ea50695040da296/main.m3u8",
  //       src: videoSrc,
  //       type: 'application/x-mpegURL'
  //     },
  //   ],
  //   //youtube: { iv_load_policy: 1 },
  // };

  // const handlePlayerReady = (player) => {
  //   playerRef.current = player;

  //   // You can handle player events here, for example:
  //   player.on("waiting", () => {
  //     videojs.log("player is waiting");
  //   });

  //   player.on("dispose", () => {
  //     videojs.log("player will dispose");
  //   });
  // };

  // date, type
  const shows = {
    id: 1,
    slug: "zombie-world",
    thumbnail: generateImgPath("/assets/images/genre/01.webp"),
    title: "Zombie World",
    detail:
      "Zombie Island is a 1998 direct-to-video animated comedy horror film based on Hanna-Barbera's Scooby-Doo Saturday-morning cartoons. In the film, Shaggy, Scooby, Fred, Velma, and Daphne reunite after a year-long hiatus from Mystery, Inc. to investigate a bayou island said to be haunted by the ghost of the pirate Morgan Moonscar. The film was directed by Jim Stenstrum, from a screenplay by Glenn Leopold.",
    season_type: "2 Season",
    certificate: "Adventure",
    rating: 4.5,
    likes: 9,
    rating_from: "Imdb",
    geners: ["action", "adventure", "drama"],
    tags: ["brother", "brother-relationship", "kings", "vikings"],
    video_link: "",
    video_type: "video",
    is_restricted: false,

    cast: [
      {
        title: "James Chinlund",
        thumbnail: generateImgPath("/assets/images/genre/g1.webp"),
        as: "As James",
      },
      {
        title: "James Earl Jones",
        thumbnail: generateImgPath("/assets/images/genre/g2.webp"),
        as: "As Jones",
      },
    ],
    crew: [
      {
        title: "Jeff Nathanson ",
        thumbnail: generateImgPath("/assets/images/genre/g3.webp"),
        as: "Writing",
      },
      {
        title: "Irene Mecchis ",
        thumbnail: generateImgPath("/assets/images/genre/g5.webp"),
        as: "Writing",
      },
      {
        title: "Karen Gilchrist ",
        thumbnail: generateImgPath("/assets/images/genre/g4.webp"),
        as: "Production",
      },
    ],
    created_by_username: "Admin",
    created_at: "Feb 2019",
    ranking: "#1 in Series Today ",
    date: "Nov 2020",
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
                      {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
                    <div className="">
                      {/* <PlyrLive link={item.url} adurl={item.adurl} /> */}
                      {isLoading == false ?
                      <RadiantNew link={videoSrc}/>
                      : null }
                      {/* <Radiant link="https://arynewsm.aryzap.com/v1/0183ea205add0b8ed5941a38bc6f/018ad63928611ea50695040da296/main.m3u8?uuid=34341"/> */}
										</div>
                    
                    {/* <iframe className="dailysingle" frameBorder="0" allowFullScreen={true} allow="autoplay" autoPlay={true}
                    title= "ARY ZAP | A Video Streaming Portal" 
                    width="100%" 

                    src= { "https://geo.dailymotion.com/player/xahs0.html?video=x8rd600"}>
                    </iframe> */}

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
