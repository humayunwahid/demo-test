import { Fragment, memo, useState, useEffect } from "react"

// react-bootstrap
import { Col, Container, Row } from "react-bootstrap"

// react-router
import { Link } from "react-router-dom";

// components
import BreadcrumbWidget from "../components/BreadcrumbWidget";


import { useEnterExit } from "../utilities/usePage"

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const user_docid = cookies.get('user_docid');

const PricingPage = memo(() => {

  const [packageData, setPackageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEnterExit();

  useEffect(() => {
    if (packageData === null) {
      setIsLoading(true);
      fetch('https://zapi.aryzap.com/api/packages')
        .then((resp) => resp.json())
        .then((result) => {
          setPackageData(result);
          setIsLoading(false);
        })
        
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }
  }, [packageData]);

  return (
    <Fragment>
      <BreadcrumbWidget title="Our Plans"/>
      <div className="section-padding">
        <Container>
          <Row>
            <Col lg="4" md="6" className="mb-3 mb-lg-0">
              <div className="pricing-plan-wrapper">
                <div className="pricing-plan-header">
                  <h4 className="plan-name text-capitalize text-body mb-0">Free</h4>
                </div>
                <div className="pricing-details">
                  <div className="pricing-plan-description">
                    <ul className="list-inline p-0">
                      <li>
                        <i className="fas fa-check text-primary"></i>
                        <span className="font-size-18 fw-500">Ads free movies and shows</span>
                      </li>
                      <li>
                        <i className="fas fa-times"></i>
                        <span className="font-size-18 fw-500">Watch on TV or Laptop</span>
                      </li>
                      <li>
                        <i className="fas fa-times"></i>
                        <span className="font-size-18 fw-500">Streamit Special</span>
                      </li>
                      <li>
                        <i className="fas fa-times"></i>
                        <span className="font-size-18 fw-500">Max video quality</span>
                      </li>                      
                      <li>
                        <i className="fas fa-check text-primary"></i>
                        <span className="font-size-18 fw-500">Allow Screens 1</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-plan-footer">
                    <div className="iq-button">
                      <Link to="#" className="btn text-uppercase position-relative">
                        <span className="button-text">select free</span>
                        <i className="fa-solid fa-play"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            {packageData && packageData.map((item, i) => (
              
            <Col lg="4" md="6" className="mb-3 mb-lg-0">
              <div className="pricing-plan-wrapper">
                <div className="pricing-plan-discount bg-primary p-2 text-center">
                  <span className="text-white">Save 20%</span>
                </div>
                <div className="pricing-plan-header">
                  <h4 className="plan-name text-capitalize text-body">{item.packageName}</h4>
                  {/* <span className="sale-price text-decoration-line-through">$49</span> */}
                  <span className="main-price text-primary">Rs {item.packagePrice}</span>
                  <span className="font-size-18">/ 1 Month</span>
                </div>
                <div className="pricing-details">
                  <div className="pricing-plan-description">
                    <ul className="list-inline p-0">
                      <li>
                        <i className="fas fa-check text-primary"></i>
                        <span className="font-size-18 fw-500">Ads free movies and shows</span>
                      </li>
                      <li>
                        <i className="fas fa-check text-primary"></i>
                        <span className="font-size-18 fw-500">Watch on TV or Laptop</span>
                      </li>
                      <li>
                        <i className="fas fa-check text-primary"></i>
                        <span className="font-size-18 fw-500">Streamit Special</span>
                      </li>
                      <li>
                        <i className="fas fa-check text-primary"></i>
                        <span className="font-size-18 fw-500">Max video quality</span>
                      </li>
                      <li>
                        <i className="fas fa-check text-primary"></i>
                        <span className="font-size-18 fw-500">Allow Screens {item.packageAllowScreens}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-plan-footer">
                    <div className="iq-button">
                      
                      <Link to='payment.aryzap.com' className="btn text-uppercase position-relative">
                        <span className="button-text">select premium</span>
                        <i className="fa-solid fa-play"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Fragment>
  )
})

PricingPage.displayName = "PricingPage"
export default PricingPage;

