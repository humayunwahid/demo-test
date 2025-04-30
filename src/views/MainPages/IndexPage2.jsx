import { Fragment, useState, useEffect, memo } from "react";
import HomeHeroSlider from "../../components/slider/HomeHeroSlider";
import SectionSlider from "../../components/slider/SectionSlider";
import LiveEventSlider from "../../components/sections/LiveEventSlider";
import PlaylistSlider from "../../components/sections/PlaylistSlider";
import GenreSlider from "../../components/sections/GenreSlider";
import TopTenMoviesToWatch from "../../components/sections/TopTenMoviesToWatch";
import CardStyle from "../../components/cards/CardStyle";
import CardStyleSingle from "../../components/cards/CardStyle-single";

import {
  Col,
  Container,
  Row,
  Nav,
  Tab,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEnterExit } from "../../utilities/usePage"

const HomePage = memo(() => {
  const [homeData, setHomeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEnterExit();

  useEffect(() => {
    if (homeData === null) {
      setIsLoading(true);
      fetch('https://zapi.aryzap.com/api/home/660a63c532045aa2ce1c6aa1')
        .then((resp) => resp.json())
        .then((result) => {
          setHomeData(result.home);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }
  }, [homeData]);

  return (
    <>
      <HomeHeroSlider />
      {isLoading ? (
        <p>Loadingsss...</p>
      ) : (
        <>
          {homeData && homeData.homeData.map((item, i) => (
            <Fragment key={i}>
              {item.type === "Category" && (
                <SectionSlider
                  title={item.name}
                  list={item.data.series}
                  className="upcomimg-block streamit-block"
                  slidesPerView="6"
                >
                  {(data) => (
                    // <h2> {data.title} </h2>
                    <CardStyle
                      image={"https://zapi.aryzap.com/" + data.imagePoster}
                      // title={data.name}
                      // movieTime={data.movieTime}
                      watchlistLink="/playlist"
                      link={"/series/" + data._id}
                    />
                  )}
                </SectionSlider>
              )}
              {item.type === "SingleSeries" && (
              <>

                <SectionSlider
                  title={item.name}
                  list={item.data.episode}
                  className="upcomimg-block streamit-block"
                  slidesPerView="4"
                >
                  {(datas) => (
                    // <h2> {data.title} </h2>
                    <CardStyleSingle
                      image={datas.snippet.thumbnails.high.url}
                      title={datas.snippet.title}
                      // movieTime={data.movieTime}
                      watchlistLink="/playlist"
                      link={"/series/"+datas.contentDetails.videoId}
                    />
                  )}
                </SectionSlider>
              
              
              </>
              )}
            </Fragment>
          ))}
        </>
      )}
      {/* <LiveEventSlider type="liveevents" title="Live Events"/>
      <LiveEventSlider type="livechannels" title="Live Channels"/>
      <PlaylistSlider playlistid="2"/>
      <TopTenMoviesToWatch />
      <PlaylistSlider playlistid="3"/>
      <GenreSlider/>
      <PlaylistSlider playlistid="4"/>
      <PlaylistSlider playlistid="8"/>
      <PlaylistSlider playlistid="9"/> */}
    </>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
