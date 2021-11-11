import React from "react";
import { withRouter } from "react-router-dom";
import MediaQuery from "react-responsive";
import { Container } from "react-bootstrap";
import GidaSearchEngine from "../components/GidaSearchEngine";
import IMAGES from "../data/images";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./GidaCriteriaInput.css";

const GidaCriteriaInput = props => (
  <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
    {isDesktop => (
      <Container
        className={
          "gida-criteria-input-container text-center" +
          (isDesktop ? " vh-100" : "")
        }
      >
        <div
          className={
            !isDesktop
              ? "d-flex h-100 justify-content-center align-items-center flex-column"
              : ""
          }
        >
          {!isDesktop && (
            <img src={IMAGES["Mama GIdA"]["ball of forecast"]} alt="GIdA"></img>
          )}
          <GidaSearchEngine break={!isDesktop} />
        </div>
      </Container>
    )}
  </MediaQuery>
);

export default withRouter(GidaCriteriaInput);
