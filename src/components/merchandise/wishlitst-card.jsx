import React, { Fragment, memo } from "react";

//router
import { Link } from "react-router-dom";

const WishlistCard = memo((props) => {
  return (
    <Fragment>
      <tr>
        <td className="product-remove">
          <div>
            <Link to="#" className="remove">
              <i className="far fa-trash-alt"></i>
            </Link>
          </div>
        </td>
        <td className="product-name">
          <Link to="/product-detail">
            <img src={props.thumbnail} className="img-fluid" loading="lazy" />
          </Link>
          <Link
            className="product-title ms-4"
            to="/product-detail"
          >
            {props.product_name}
          </Link>
        </td>
        <td className="product-price">
          <span className="text-secondary">
            <del>{props.price}</del> {props.final_price}
          </span>
        </td>
        <td className="product-stock-status">
          <span className="wishlist-in-stock">{props.stockStatus}</span>
        </td>
        <td className="product-add-to-cart">
          <Link
            className="iq-button btn btn-hover"
            to="/product-detail"
          >
            {" "}
            View Product{" "}
          </Link>
        </td>
      </tr>
    </Fragment>
  );
});
export default WishlistCard;
