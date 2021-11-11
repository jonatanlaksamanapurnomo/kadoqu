import React from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { Query } from "react-apollo";
import NavLink from "./NavLink";
import GalleryItem from "./GalleryItem";
import { QUERY_GET_TESTIMONIES } from "../gql/testimony";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./GalleryCarousel.css";

const DESKTOP_CHUNK_SIZE = 7;
const MOBILE_CHUNK_SIZE = 4;
const MAX_PAGINATION = 4;

function chunk(arr, chunkSize) {
  var R = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}

const GalleryCarousel = props => (
  <Row>
    <Col className={props.className}>
      <div className="gallery-carousel-title">Our Satisfied Customer</div>
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => (
          <Query
            query={QUERY_GET_TESTIMONIES}
            variables={{
              limit:
                MAX_PAGINATION *
                (isDesktop ? DESKTOP_CHUNK_SIZE : MOBILE_CHUNK_SIZE)
            }}
          >
            {({ loading, error, data }) =>
              !loading &&
              !error && (
                <React.Fragment>
                  <Carousel
                    className="gallery-carousel"
                    interval={3500}
                    controls={false}
                  >
                    {isDesktop
                      ? chunk(data.getTestimonies, 7).map(
                          (galleryItems7, i) => {
                            let firstItem = galleryItems7.shift();
                            return (
                              <Carousel.Item key={i} className="w-100">
                                <Row noGutters>
                                  <Col md={5}>
                                    <GalleryItem
                                      className="gallery-carousel-left gallery-carousel-item-large"
                                      src={firstItem.image}
                                      alt={firstItem.name}
                                      testimony={firstItem.testimony}
                                    />
                                  </Col>
                                  <Col className="d-flex flex-column justify-content-between">
                                    {chunk(galleryItems7, 3).map(
                                      (galleryItems3, j) => (
                                        <Row
                                          className="gallery-carousel-right"
                                          key={j}
                                        >
                                          {galleryItems3.map(
                                            (galleryItem, k) => (
                                              <Col md={4} key={k}>
                                                <GalleryItem
                                                  src={galleryItem.image}
                                                  alt={galleryItem.name}
                                                  testimony={
                                                    galleryItem.testimony
                                                  }
                                                />
                                              </Col>
                                            )
                                          )}
                                        </Row>
                                      )
                                    )}
                                  </Col>
                                </Row>
                              </Carousel.Item>
                            );
                          }
                        )
                      : chunk(data.getTestimonies, 4).map((galleryItems, i) => (
                          <Carousel.Item key={i}>
                            <Row>
                              {galleryItems.map((galleryItem, j) => (
                                <Col
                                  xs={3}
                                  key={j}
                                  className="gallery-carousel-item"
                                >
                                  <GalleryItem
                                    src={galleryItem.image}
                                    alt={galleryItem.name}
                                    testimony={galleryItem.testimony}
                                  />
                                </Col>
                              ))}
                            </Row>
                          </Carousel.Item>
                        ))}
                  </Carousel>
                </React.Fragment>
              )
            }
          </Query>
        )}
      </MediaQuery>
      <div className="gallery-carousel-button d-flex mt-0 mr-0">
        <NavLink href="/gallery">
          <button className="kadoqu-primary-button short">Lihat Gallery</button>
        </NavLink>
      </div>
    </Col>
  </Row>
);

export default GalleryCarousel;
