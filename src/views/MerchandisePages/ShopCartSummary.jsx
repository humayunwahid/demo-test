import React, { Fragment, memo } from "react";

//react bootstrap
import { Container, Row, Col } from "react-bootstrap";

//components
import BreadCrumbWidget from "../../../components/partials/theme/breadcrumb-widget";
import { Link } from "react-router-dom";

const ShopCartSummary = memo(() => {
  return (
    <Fragment>
      <BreadCrumbWidget title="Cart Summary" />
      <Container fluid>
        <div className="page-header">
          <ul className="page-items">
            <li className="page_item active">
              <span className="pre-heading"> 1 </span>
              <span className="page_link">Shopping Cart</span>
            </li>
            <li className="page_item">
              <span className="pre-heading"> 2 </span>
              <span className="page_link">Checkout</span>
            </li>
            <li className="page_item">
              <span className="pre-heading"> 3 </span>
              <span className="page_link">Order Summary</span>
            </li>
          </ul>
        </div>
        <div className="order">
          <p className="thank">Thank you. Your order has been received.</p>
          <ul className="details">
            <li className="detail">
              ORDER NUMBER:<strong>15823</strong>
            </li>
            <li className="detail">
              DATE:<strong>June 22, 2022</strong>
            </li>
            <li className="detail">
              EMAIL:<strong>jondoe@gmail.com</strong>
            </li>
            <li className="detail">
              TOTAL:<strong>$25.00</strong>
            </li>
            <li className="detail">
              PAYMENT METHOD:<strong>Direct bank transfer</strong>
            </li>
          </ul>
        </div>
        <h5 className="order_details">Order Details</h5>
        <Row>
          <Col lg="8">
            <section className="maintable">
              <table className="shop_table">
                <thead>
                  <tr>
                    <th className="product-name">Product</th>
                    <th className="product-total">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="order_item">
                    <td className="product-name">
                      <Link to="#">Back Pack &nbsp;</Link>
                      <strong className="product-quantity">×&nbsp;1</strong>
                    </td>
                    <td className="product-total">
                      <span className="amount">
                        <bdi>
                          <span className="">$</span>25.00
                        </bdi>
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="order_item">
                    <th scope="row bill-total">Subtotal:</th>
                    <td>
                      <span className="amount">
                        <span className="">$</span>25.00
                      </span>
                    </td>
                  </tr>
                  <tr className="order_item">
                    <th scope="row bill-total">Payment method:</th>
                    <td>Direct bank transfer</td>
                  </tr>
                  <tr>
                    <th scope="row bill-total">Total:</th>
                    <td>
                      <span className="amount">
                        <span className="">$</span>25.00
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </section>
          </Col>
          <Col lg="4">
            <section className="bill_section">
              <h5 className="bill_address">Billing address</h5>
              <address>
                <div className="table-responsive bill_table">
                  <table>
                    <tbody className="bill_body">
                      <tr>
                        <td className="label-name">Name</td>
                        <td className="seprator">
                          <span>:</span>
                        </td>
                        <td className="last-name">test</td>
                      </tr>
                      <tr>
                        <td className="label-name">Company</td>
                        <td className="seprator">
                          <span>:</span>
                        </td>
                        <td className="last-name">test</td>
                      </tr>
                      <tr>
                        <td className="label-name">Country</td>
                        <td className="seprator">
                          <span>:</span>
                        </td>
                        <td className="last-name">US</td>
                      </tr>
                      <tr>
                        <td className="label-name">Address</td>
                        <td className="seprator">
                          <span>:</span>
                        </td>
                        <td className="last-name">dccc</td>
                      </tr>
                      <tr>
                        <td className="label-name">E-mail</td>
                        <td className="seprator">
                          <span>:</span>
                        </td>
                        <td className="last-name">jondoe@gmail.com</td>
                      </tr>
                      <tr>
                        <td className="label-name">Phone</td>
                        <td className="seprator">
                          <span>:</span>
                        </td>
                        <td className="last-name">96465216515</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </address>
            </section>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
});

ShopCartSummary.displayName = "ShopCartSummary";
export default ShopCartSummary;
