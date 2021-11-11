import React from "react";
import MediaQuery from "react-responsive";
import { Row, Col, Image, Container } from "react-bootstrap";
import IMAGES from "../data/images";
import { MIN_DESKTOP_SIZE } from "../data/constants";

const ProductNotFoundNoticeComponent = props => (
  <Container fluid className={props.className}>
    <Row className={!props.isMobile && "d-flex align-items-center"}>
      <Col
        xs={props.isMobile ? 12 : { span: 3, offset: 1 }}
        className="text-center"
      >
        <Image
          className={props.isMobile ? "w-50" : "w-100"}
          src={IMAGES["Error Page"]["product-not-found"]}
          alt="Product not found"
        />
      </Col>
      <Col
        xs={props.isMobile ? 12 : 8}
        className={props.isMobile ? "text-center" : "text-left"}
      >
        <h3 className="kadoqu-primary-color font-weight-bold mb-0">
          GIdA gak nemu barangnya
        </h3>
        <div className="font-weight-light">
          Coba pakai kata lain atau kurangi filternya
        </div>
      </Col>
    </Row>
  </Container>
);

const ProductNotFoundNotice = props => (
  <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
    {isDesktop =>
      isDesktop ? (
        <div className="bg-white shadow text-center p-5">
          <ProductNotFoundNoticeComponent isMobile={!isDesktop} />
        </div>
      ) : (
        <ProductNotFoundNoticeComponent
          isMobile={!isDesktop}
          className="mb-5"
        />
      )
    }
  </MediaQuery>
);

export default ProductNotFoundNotice;
