import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./assets/scss/streamit.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/rtl.scss";
import "animate.css/animate.css";
import "choices.js/public/assets/styles/choices.min.css";

// router
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// store
import { store } from "./store/index";
import { Provider } from "react-redux";

// index router
import { IndexRouters } from "./router/index";

import { fetchConfig } from "../config";
import Loader from "./components/ReactLoader";
import Loaderv2 from "./components/ReactLoaderv2";

import BlankSpace from "./components/BlankSpace";

import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([...IndexRouters], {
  basename: import.meta.env.VITE_URL,
});

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await fetchConfig();
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize app:", error);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
       
        {/* <Loaderv2 /> */}
        <BlankSpace />
        <BlankSpace />
        
        {/* You can add a blank space component here if needed */}
      </>
    );
  }

  // return (
  //   <React.StrictMode>
  //     <Provider store={store}>
  //       <App>
  //         <RouterProvider router={router}></RouterProvider>
  //       </App>
  //     </Provider>
  //   </React.StrictMode>
  // );

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary>
          <App>
            <RouterProvider router={router} />
          </App>
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>
  );

}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
