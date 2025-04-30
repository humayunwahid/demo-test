import { memo } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

const ContinueWatchCard = memo(
  ({ link, imagePath, dataLeftTime, progressValue }) => {
    return (
      <div className="iq-watching-block">
        <div className="block-images position-relative">
          <div className="iq-image-box overly-images">
            <Link to={link} className="d-block">
              <img
                src={imagePath}
                alt="movie-card"
                className="img-fluid object-cover w-100 d-block border-0"
              />
            </Link>
          </div>
          <div className="iq-preogress">
            <span className="data-left-timing font-size-14 fw-500 text-lowercase">
              {dataLeftTime}
            </span>
            <ProgressBar now={progressValue} style={{ height: "1px" }} />
          </div>
        </div>
      </div>
    );
  }
);

ContinueWatchCard.displayName = "ContinueWatchCard";
export default ContinueWatchCard;
