import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import NavLink from "../components/NavLink";

import "./GidaStart.css";

const GidaStart = props => (
  <Container className="container start-page-margin">
    <Row className="row justify-content-center">
      <Col xs="8" sm="12" className="text-center">
        <img
          className="start-page-image-container"
          src="https://ik.imagekit.io/nwiq66cx3pvsy/Landing_Page/mama-gida.svg"
          alt="GIdA"
        />
      </Col>
    </Row>
    <Row className="row justify-content-center mt-4">
      <Col xs="12" sm="8" className="text-center">
        <h1 className="start-page-title">
          <span className="start-page-mama-gida-text">Mama GIdA</span> bisa tau
          kado apa yang dicari
        </h1>
      </Col>
    </Row>
    <Row className="row justify-content-center mt-4">
      <Col sm="8" className="text-center">
        <NavLink href="/gida-search-engine/criteria" className="p-0">
          <button className="kadoqu-primary-button long">Mulai</button>
        </NavLink>
      </Col>
    </Row>
  </Container>
);

export default GidaStart;
