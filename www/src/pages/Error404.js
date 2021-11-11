import React from "react";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import IMAGES from "../data/images";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import NavLink from "../components/NavLink";

import "./ErrorPage.css";

const Error404Component = ({ isMobile }) => (
  <Container
    fluid
    className="error-page bg-kadoqu-primary mb-5 text-center pt-5 pb-5"
  >
    <Row className={!isMobile && "d-flex align-items-center"}>
      <Col xs={isMobile ? 12 : { span: 3, offset: 2 }} className="text-center">
        <Image
          className={isMobile ? "w-50" : "w-100"}
          src={IMAGES["Error Page"]["product-not-found"]}
          alt="Product not found"
        />
      </Col>
      <Col
        xs={isMobile ? 12 : undefined}
        className={`text-${isMobile ? "center" : "left"}`}
      >
        <div
          className={`kadoqu-primary-color font-weight-bold mb-n2 text-uppercase display-${
            isMobile ? "4" : "3"
          }`}
        >
          Oh noo....
        </div>
        <h1 className="text-dark font-weight-bold mb-0 text-uppercase">
          Gift not found
        </h1>
        <div className={"font-weight-light" + (isMobile ? " d-inline" : "")}>
          Don't worry, stay calm,{" "}
        </div>
        <div
          className={
            "font-weight-light" + (isMobile ? " d-inline clearfix" : "")
          }
        >
          we will find your gift ASAP
        </div>
        <NavLink className="p-0" href="/">
          <Button
            className={`kadoqu-primary-button ${
              isMobile ? "long mt-3" : "short mt-5"
            }`}
          >
            Home
          </Button>
        </NavLink>
      </Col>
    </Row>
  </Container>
);

const Error404 = props => (
  <React.Fragment>
    <Helmet>
      <title>Kadoqu.com | 404</title>
    </Helmet>
    <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
      {isDesktop => <Error404Component isMobile={!isDesktop} />}
    </MediaQuery>
  </React.Fragment>
);

export default Error404;
