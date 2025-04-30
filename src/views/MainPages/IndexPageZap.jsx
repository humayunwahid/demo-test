import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  memo,
} from "react";
import HomeHeroSlider from "../../components/slider/HomeHeroSlider";
import SectionSlider from "../../components/slider/SectionSlider";
import Loader from "../../components/ReactLoader";
import { Helmet } from "react-helmet";
import { useEnterExit } from "../../utilities/usePage";
import { getUser, isAuthenticated } from "../../firebase";
import axios from "axios";
import BlankSpace from "../../components/BlankSpace";
import Leaderboard from "../../Ads/Leaderboard";
import toast, { Toaster } from "react-hot-toast";
import CardStyleWithFav from "../../components/cards/CardStyleWithFav";
import CardStyleSingle from "../../components/cards/CardStyle-single";
import TopTenMoviesToWatch from "../../components/sections/TopTenMoviesToWatch";
import { getConfig } from '../../../config';
import TopTenCard from "../../components/cards/TopTenCard";

const AuthContext = createContext();

const HomePage = memo(({ children }) => {
  const config = getConfig();
  const [homeData, setHomeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const title = "ARY ZAP - A Video Streaming Portal";
  const description =
    "ARYZAP.com is a video streaming platform, where you can watch all dramas, comedy shows, tv shows like jeeto pakistan, latest news about sports, video songs and trailers of all hit pakistani movies and much more in HD Quality.";

  useEnterExit();

  // Memoized `fetchFavorites` function
  const fetchFavorites = useCallback(async (currentUser) => {
    if (currentUser) {
      try {
        const response = await axios.get(
          `${config.appApiHomeEndpoint}/api/v2/fav/user/${currentUser.uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${config.authToken}`

          }
        }
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    }
  }, []);



  const fetchLocation = useCallback(async () => {
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
  }, []);

  // Fetch home data
  const fetchData = useCallback(async (loc) => {
    try {
      const resp = await fetch(
        `${config.appApiHomeEndpoint
        }/api/v2/homev2/${config.builderId}/${loc}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${config.authToken}`

        }
      }
      );
      // const resp = await fetch(
      //   `${config.appApiHomeEndpoint
      //   }/api/homev2/67600becc8c316e82cda17f6/${loc}`
      // );
      // const resp = await fetch(
      //   `${config.appApiHomeEndpoint
      //   }/api/homev2/67600becc8c316e82cda17f6/${loc}`
      // );
      const result = await resp.json();
      setHomeData(result.home);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);



  useEffect(() => {
    const initialize = async () => {
      const currentUser = getUser();
      const Authenticated = isAuthenticated();
      setUser(currentUser);
      await fetchFavorites(currentUser);


      const loc = location || (await fetchLocation());
      if (loc) {
        await fetchData(loc);
      }
    };

    if (homeData === null) {
      initialize();
    }
  }, [homeData, location, fetchFavorites, fetchLocation, fetchData]);

  // Memoize `homeData` mapping
  const renderHomeData = useMemo(
    () =>
      homeData?.homeData?.map((item, i) => (
        <Fragment key={i}>
          {item.type === "ImageSlider" && (
            <>
              <HomeHeroSlider list={item.data.slider.sliderData} />
              <Leaderboard />
            </>
          )}
  
          {item.type === "Category" && item.data.series?.length > 0 && (
            <SectionSlider
              title={item.name}
              list={
                item.name === "LATEST DRAMAS"
                  ? item.data.series
                      .filter((data) => data.status === "published")
                      .map((data, index) => ({ ...data, countValue: index + 1 }))
                  : item.data.series.filter((data) => data.status === "published")
              }
              type={item.type}
              className="upcomimg-block streamit-block"
              slidesPerView={
                item.name === "SHOWS"
                  ? "3"
                  : item.name === "LIVE STREAMS"
                  ? "5"
                  : "6"
              }
            >
              {(data) => {
                const isLatest = item.name === "LATEST DRAMAS";
  
                return isLatest ? (
                  <TopTenCard
                    imagePath={`https://demo-api.aryzap.com/public/${data.imagePoster}`}
                    countValue={data.countValue}
                    link={
                      data.seriesType === "live"
                        ? `/live/${data.seriesLayout}/${data._id}`
                        : data.seriesType === "live-event"
                        ? `/live-event/${data.seriesLayout}/${data._id}`
                        : data.seriesType === "singleVideo"
                        ? `/watch/${data.seriesLayout}/${data._id}`
                        : data.cdnPlatform === "dm"
                        ? `/series/v2/${data._id}`
                        : data.cdnPlatform === "yt"
                        ? `/series/v1/${data._id}`
                        : `/series/v3/${data._id}`
                    }
                  />
                ) : (
                  <CardStyleWithFav
                    image={
                      item.name === "SHOWS" || item.name === "LIVE STREAMS"
                        ? `https://demo-api.aryzap.com/public/${data.imageCoverBig}`
                        : `https://demo-api.aryzap.com/public/${data.imagePoster}`
                    }
                    seriesType={data.seriesType}
                    id={data._id}
                    title={data.title}
                    watchlistLink="/playlist"
                    link={
                      data.seriesType === "live"
                        ? `/live/${data.seriesLayout}/${data._id}`
                        : data.seriesType === "live-event"
                        ? `/live-event/${data.seriesLayout}/${data._id}`
                        : data.seriesType === "singleVideo"
                        ? `/watch/${data.seriesLayout}/${data._id}`
                        : data.cdnPlatform === "dm"
                        ? `/series/v2/${data._id}`
                        : data.cdnPlatform === "yt"
                        ? `/series/v1/${data._id}`
                        : `/series/v3/${data._id}`
                    }
                    isFavorite={favorites.some(
                      (fav) => fav.seriesId?._id === data._id
                    )}
                    name={data.name}
                  />
                );
              }}
            </SectionSlider>
          )}
  
          {item.type === "SingleSeries" &&
            item.data.episode?.length > 0 && (
              <SectionSlider
                title={item.name}
                list={item.data.episode.filter(
                  (episode) =>
                    episode.title !== "Private video" &&
                    episode.title !== "Deleted video"
                )}
                className="upcomimg-block streamit-block"
                slidesPerView={
                  item.name === "Drama's OST" || item.name === "TELEFILMS"
                    ? "3"
                    : "4"
                }
                link={
                  item.items === "dm"
                    ? `/series/v2/${item.data.episode[0].seriesId}`
                    : item.items === "cdn"
                    ? `/series/v3/${item.data.episode[0].seriesId}`
                    : `/series/v1/${item.data.episode[0].seriesId}`
                }
              >
                {(datas) => (
                  <CardStyleSingle
                    image={
                      item.items === "cdn"
                        ? "https://demo-api.aryzap.com/public/" +
                          datas.imagePath
                        : datas.imagePath
                    }
                    title={
                      item.items === "cdn"
                        ? datas.description
                        : datas.title
                    }
                    watchlistLink="/playlist"
                    link={
                      item.items === "dm"
                        ? `/video/2/${datas.videoDmId}/${datas.seriesId}`
                        : item.items === "cdn"
                        ? `/video/3/${datas._id}/${datas.seriesId}`
                        : `/video/1/${datas.videoYtId}/${datas.seriesId}`
                    }
                    sectionTitle={item.name}
                  />
                )}
              </SectionSlider>
            )}
  
          {item.type === "SeriesByGenres" && (
            <SectionSlider
              title={item.name}
              list={item.items}
              className="upcomimg-block streamit-block"
              slidesPerView={"6"}
              link={`/view-all-by-genre/${item.items}/${item.name}`}
              type={item.type}
            >
              {(data) => (
                <CardStyleWithFav
                  image={
                    item.name === "SHOWS" || item.name === "LIVE STREAMS"
                      ? "https://demo-api.aryzap.com/public/" +
                        data.imageCoverBig
                      : "https://demo-api.aryzap.com/public/" +
                        data.imagePoster
                  }
                  seriesType={data.seriesType}
                  id={data._id}
                  title={data.title}
                  watchlistLink="/playlist"
                  link={
                    data.seriesType === "live"
                      ? `/live/${data.seriesLayout}/${data._id}`
                      : data.seriesType === "live-event"
                      ? `/live-event/${data.seriesLayout}/${data._id}`
                      : data.seriesType === "singleVideo"
                      ? `/watch/${data.seriesLayout}/${data._id}`
                      : data.cdnPlatform === "dm"
                      ? `/series/v2/${data._id}`
                      : data.cdnPlatform === "yt"
                      ? `/series/v1/${data._id}`
                      : `/series/v3/${data._id}`
                  }
                  isFavorite={favorites.some(
                    (fav) => fav.seriesId?._id === data._id
                  )}
                  name={data.name}
                />
              )}
            </SectionSlider>
          )}
        </Fragment>
      )),
    [homeData, favorites]
  );
  
  return (
    <>
      {!isLoading && (
        <Helmet>
          <title>{title}</title>

          <meta name="description" content={description} />
        </Helmet>
      )}
      <AuthContext.Provider value={{ user, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
      <Toaster />
      {isLoading ? (
        <>
          <Loader />
          <BlankSpace />
        </>
      ) : (
        renderHomeData
      )}
    </>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
