import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Quote.css";

const QUOTE =
  "The greatest gift that you can give to others is the gift of unconditional love and acceptance";

const Quote = props => (
  <Row className="d-flex justify-content-center">
    <Col
      xs={8}
      sm={7}
      className={"quote-container text-center " + props.className}
    >
      <div className="quote-mark">{"\u201c"}</div>
      <p className="quote-text">{QUOTE}</p>
      <div className="quote-mark">{"\u201d"}</div>
    </Col>
  </Row>
);

export default Quote;
