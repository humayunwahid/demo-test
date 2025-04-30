import { Fragment, memo } from "react";

//react bootstrap
import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { generateImgPath } from "../StaticData/data";

// Define the image paths
const defaultImagePath = generateImgPath("/assets/images/pages/01.webp");
const islamicProgramsImagePath = generateImgPath("/assets/images/banners/qtv-banner.webp");
const newsTalkShowsImagePath = generateImgPath("/assets/images/banners/news-banner.webp");

const BreadCrumbWidget = memo((props) => {
  // Determine which imagePath to use
  const imagePath = props.title === "ISLAMIC PROGRAMS" 
    ? islamicProgramsImagePath 
    : props.title === "NEWS TALK SHOWS"
    ? newsTalkShowsImagePath
    : defaultImagePath;

  return (
    <Fragment>
      <div
        className="iq-breadcrumb"
        style={{ backgroundImage: `url(${imagePath})` }}
      >
        <Container fluid>
          <Row className="align-items-center">
            <Col sm="12">
              <nav className="text-center">
                <h2 className="title text-capitalize">{props.title}</h2>
                <Breadcrumb
                  className="main-bg"
                  listProps={{
                    className: "text-center justify-content-center",
                  }}
                >
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
});

BreadCrumbWidget.displayName = "BreadCrumbWidget";
export default BreadCrumbWidget;
