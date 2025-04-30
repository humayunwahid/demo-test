import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";

const CastCard = memo((props) => {
  return (
    <Fragment>
      <div class="iq-cast">
        <img src={props.image} alt={`cast-${props.title}`} loading="lazy" />
        <div class="card-img-overlay iq-cast-body">
          <h6 class="cast-title fw-500">
            <Link to="/cast-detail">{props.title}</Link>
          </h6>
          <span class="cast-subtitle">{props.category}</span>
        </div>
      </div>
    </Fragment>
  );
});

CastCard.displayName = "CastCard";
export default CastCard;
