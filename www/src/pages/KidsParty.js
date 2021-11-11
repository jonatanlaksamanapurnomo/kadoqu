import React, { Component } from "react";
import { Helmet } from "react-helmet";
import IMAGES from "../data/images";

import { Image, Row, Col } from "react-bootstrap";
import "./KidsParty.css";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";

class KidsParty extends Component {
  state = {
    disablePrev: true,
    disableNext: false,
    slidingState: {
      startX: 0,
      currentScrollLeft: 0,
      isDown: false
    }
  };
  startSliding = e => {
    e.preventDefault();
    const slider = this.container;
    slider.classList.add("active");
    this.setState({
      slidingState: Object.assign(this.state.slidingState, {
        isDown: true,
        startX: e.pageX,
        currentScrollLeft: slider.scrollLeft
      })
    });
  };
  stopSliding = () => {
    this.setState({
      slidingState: Object.assign(this.state.slidingState, {
        isDown: false
      })
    });
    const slider = this.container;
    slider.classList.remove("active");
  };
  onSliding = e => {
    if (!this.state.slidingState.isDown) {
      return;
    }
    const slider = this.container;
    const walk = (e.pageX - this.state.slidingState.startX) * 1.4;
    this.setState({}, () => {
      slider.scrollLeft = this.state.slidingState.currentScrollLeft - walk;
    });
  };
  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          const isMobile = !isDesktop;
          return (
            <React.Fragment>
              <Helmet>
                <title>Kadoqu.com | Kids Party</title>
              </Helmet>

              {/* <Query
          query={QUERY_GET_BANNERS}
          variables={{ location: BANNER_LOCATION["kids-party"]["title"]["desktop"] }}
        >
          {({ loading, error, data }) =>
            loading ? (
              <div className="home-empty-carousel-banner">Loading...</div>
            ) : error ? (
              <div className="home-empty-carousel-banner" />
            ) : (
              <SlidingCarousel
                className="kids-party-banner"
                interval={5000}
                indicators={false}
                controls={false}
                data={data.getBanners}
              />
            )
          }
          </Query> */}
              <Image
                className="kids-party-banner"
                fluid
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Kids_Party.jpg"
                alt="Kids Party Banner"
              />
              {!isMobile ? (
                <Row className="Kids-menu-card">
                  <Col xs={3}>
                    <Image
                      className={
                        isMobile ? "w-30 Celebration-card-mob" : "w25 Kids-card"
                      }
                      src={IMAGES["Kids Party"]["Snacky"]}
                      alt="Product not found"
                    />
                  </Col>
                  <Col xs={3}>
                    <Image
                      className={
                        isMobile ? "w-30 Celebration-card-mob" : "w25 Kids-card"
                      }
                      src={IMAGES["Kids Party"]["Tools"]}
                      alt="Product not found"
                    />
                  </Col>
                  <Col xs={3}>
                    <Image
                      className={
                        isMobile ? "w-30 Celebration-card-mob" : "w25 Kids-card"
                      }
                      src={IMAGES["Kids Party"]["Lunchy"]}
                      alt="Product not found"
                    />
                  </Col>
                  <Col xs={3}>
                    <Image
                      className={
                        isMobile ? "w-5 Celebration-card-mob" : "w25 Kids-card"
                      }
                      src={IMAGES["Kids Party"]["Ultimate"]}
                      alt="Product not found"
                    />
                  </Col>
                </Row>
              ) : (
                <Col xs={12}>
                  <div
                    className="slider-kids-party"
                    ref={el => (this.container = el)}
                    onMouseDown={this.startSliding}
                    onMouseLeave={this.stopSliding}
                    onMouseUp={this.stopSliding}
                    onMouseMove={this.onSliding}
                  >
                    <Image
                      className="Kids-card"
                      src={IMAGES["Kids Party"]["Snacky"]}
                      alt="Product not found"
                    />
                    <Image
                      className="Kids-card"
                      src={IMAGES["Kids Party"]["Tools"]}
                      alt="Product not found"
                    />
                    <Image
                      className="Kids-card"
                      src={IMAGES["Kids Party"]["Lunchy"]}
                      alt="Product not found"
                    />
                    <Image
                      className="Kids-card"
                      src={IMAGES["Kids Party"]["Ultimate"]}
                      alt="Product not found"
                    />
                  </div>
                </Col>
              )}
              <div className="Kids-ContactUs-Menu">
                <div className="KidsParty-subtitle">How to Order </div>

                <div className="KidsParty-subtitlesecond">
                  Please contact us trough our customer service to get further
                  information about this product and how to order
                </div>
                <a href="https://wa.me/628112181600">
                  <button
                    type="submit"
                    className="kadoqu-primary-button kids-party-contact"
                    // {
                    //   isMobile
                    //     ? "kadoqu-primary-button-green CompanyCelebration-contactus-button-mob"
                    //     : "kadoqu-primary-button-green MagicalMoment-contactus-button"
                    // }
                  >
                    Contact Us!
                  </button>
                </a>
              </div>
              <div className="CompanyCelebration-Batas"></div>
            </React.Fragment>
          );
        }}
      </MediaQuery>
    );
  }
}

export default KidsParty;
