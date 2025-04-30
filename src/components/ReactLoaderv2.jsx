import { CirclesWithBar } from "react-loader-spinner";
import { Fragment, memo } from "react";

const Loaderv2 = memo(() => {
  return (
    <Fragment>
      <div
        className="spinner-overlay"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height for proper centering
        }}
      >
        <CirclesWithBar
          height="100"
          width="100"
          color="#e50914"
          outerCircleColor="#e50914"
          innerCircleColor="#e50914"
          barColor="#e50914"
          ariaLabel="Loading config ..."
          visible={true}
        />
        {/* Text label below the loader */}
        <p
          style={{
            color: "white",
            marginTop: "10px",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Loading config...
        </p>
      </div>
    </Fragment>
  );
});

Loaderv2.displayName = "Loaderv2";
export default Loaderv2;
