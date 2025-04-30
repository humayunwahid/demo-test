import { memo } from "react";
import { Link } from "react-router-dom";

const TopTenCard = memo((props) => {
  return (

    <div className="iq-top-ten-block">
    <div className="block-image position-relative">
      <div className="img-box d-flex align-items-center">
        <Link className="overly-images" to={props.link}>
          <img
            src={`/assets/images/count/${props.countValue}.png`}
            alt="count number"
            className="svg-icon"
          />
          <img
            src={props.imagePath}
            alt="movie-card"
            className="posterImage img-fluid object-cover"
          />
        </Link>
      </div>
    </div>
  </div>

    // <div className="iq-top-ten-block">
    //   <div className="block-image position-relative">
    //     <div className="img-box">
    //       <Link className="overly-images" to={props.link}>
    //         <img
    //           src={props.imagePath}
    //           alt="movie-card"
    //           className="img-fluid object-cover"
    //         />
    //       </Link>
    //       <span className="top-ten-numbers texture-text">{props.countValue}</span>
    //     </div>
    //   </div>
    // </div>
  );
});

TopTenCard.displayName = "TopTenCard";
export default TopTenCard;
