import React from "react";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import IMAGES from "../data/images";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import NavLink from "../components/NavLink";

import "./ErrorPage.css";

const ErrorUnderConstructionComponent = ({ isMobile, isPortrait }) => (
  <Container
    fluid
    className="error-page bg-kadoqu-primary mb-5 text-center pt-5 pb-5"
  >
    <Row className={!isMobile && "d-flex align-items-center"}>
      <Col
        xs={isMobile ? 12 : { span: 3, offset: isPortrait ? 0 : 2 }}
        className="text-center"
      >
        <Image
          className={isMobile ? "w-50" : "w-100"}
          src={IMAGES["Error Page"]["under-construction"]}
          alt="Product not found"
        />
      </Col>
      <Col
        xs={isMobile ? 12 : undefined}
        className={`text-${isMobile ? "center" : "left"}`}
      >
        <div
          className={`text-dark font-weight-bold mb-0 text-uppercase ${
            isMobile ? "h3" : isPortrait ? "h2" : "h1"
          }`}
        >
          This page is
        </div>
        <h1
          className={`kadoqu-primary-color font-weight-bold line-height-initial text-uppercase ${
            isMobile || isPortrait ? "" : "display-4"
          }`}
        >
          under
          <br />
          construction
        </h1>
        <div className={"font-weight-light"}>
          Sorry for this inconveniences,
        </div>
        <div className={"font-weight-light"}>
          GIdA is working really hard on this page
        </div>
        <NavLink className="p-0" href="/">
          <Button
            className={`kadoqu-primary-button ${
              isMobile ? "long" : "short"
            } mt-3`}
          >
            Home
          </Button>
        </NavLink>
      </Col>
    </Row>
  </Container>
);

const ErrorUnderConstruction = props => (
  <React.Fragment>
    <Helmet>
      <title>
        Kadoqu.com |{" "}
        {props.location.pathname
          .split("/")[1]
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.substring(1))
          .join(" ")}
      </title>
    </Helmet>
    <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
      {matchesDesktop => (
        <MediaQuery orientation="portrait">
          {matchesPortrait => (
            <ErrorUnderConstructionComponent
              isMobile={!matchesDesktop}
              isPortrait={matchesPortrait}
            />
          )}
        </MediaQuery>
      )}
    </MediaQuery>
  </React.Fragment>
);

export default ErrorUnderConstruction;
