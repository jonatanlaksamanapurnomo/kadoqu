import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import IMAGES from "../data/images";

import "./GidaNotFound.css";

const GidaNotFound = props => (
  <Container className="gida-not-found-container">
    <Row>
      <Col lg="5" className="text-center">
        <img src={IMAGES["Mama GIdA"]["plain"]} alt="GIdA" />
      </Col>
      <Col lg="7" className="gida-not-found-instructions">
        <h1>
          Sepertinya tidak ada
          <br />
          rekomendasi yang cocok
        </h1>
        <h3>
          Tapi gak usah khawatir, yuk kontak GIdA langsung
          <br />
          untuk bantuan lebih lanjut tentang masalah kamu
        </h3>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/628112181600"
        >
          <button
            className="kadoqu-primary-button short"
            onClick={() => props.history.push("/")}
          >
            Kontak GIdA
          </button>
        </a>
      </Col>
    </Row>
  </Container>
);

export default GidaNotFound;
