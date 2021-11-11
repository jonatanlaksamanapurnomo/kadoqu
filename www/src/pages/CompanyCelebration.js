import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import "./CompanyCelebration.css";
import MediaQuery from "react-responsive";
import "react-alice-carousel/lib/alice-carousel.css";
import IMAGES from "../data/images";
import { MIN_DESKTOP_SIZE } from "../data/constants";

class CompanyCelebration extends Component {
  constructor() {
    super();

    this.state = {
      slidingState: {
        startX: 0,
        currentScrollLeft: 0,
        isDown: false
      },
      Standart: true
    };
  }

  changePackage() {
    this.setState({ Standart: !this.state.Standart });
  }
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
    let Company_package = this.state.Standart
      ? "CompanyCelebration-package"
      : "CompanyCelebration-package-premium";
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          const isMobile = !isDesktop;
          return (
            <React.Fragment>
              <Container className="CompanyCelebration-container">
                <Helmet>
                  <title>Kadoqu.com | Company Celebration</title>
                </Helmet>
                <Row>
                  <Col xs={4} className="">
                    <Image
                      className={
                        isMobile
                          ? "CompanyCelebration-image-mob"
                          : "CompanyCelebration-image"
                      }
                      src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Company_Celebration.jpg"
                    />
                  </Col>
                  <Col>
                    <div
                      className={
                        isMobile
                          ? "kadoqu-page-title CompanyCelebration-title-mob"
                          : "kadoqu-page-title CompanyCelebration-title"
                      }
                    >
                      Company Celebration
                    </div>

                    <div
                      className={
                        isMobile
                          ? "CompanyCelebration-subtitle-mob"
                          : " CompanyCelebration-subtitle"
                      }
                    >
                      What is Company Celebration?
                    </div>

                    <div
                      className={
                        isMobile
                          ? "CompanyCelebration-subtitlesecond-mob"
                          : "CompanyCelebration-subtitlesecond"
                      }
                    >
                      Create a memorable celebration for company <br></br>{" "}
                      events & employee important moment
                    </div>
                    <div
                      className={
                        isMobile
                          ? "CompanyCelebration-subtitle-mob"
                          : " CompanyCelebration-subtitle"
                      }
                    >
                      What you should use Company Celebration?
                    </div>

                    <div
                      className={
                        isMobile
                          ? "CompanyCelebration-subtitlesecond-mob"
                          : "CompanyCelebration-subtitlesecond"
                      }
                    >
                      {" "}
                      Simply to give employee apreciation and recognition
                    </div>
                  </Col>
                </Row>
              </Container>
              <div className={Company_package}>
                <Row noGutters={isMobile}>
                  <div
                    className={
                      isMobile
                        ? "kadoqu-page-title Celebration-menu-mob"
                        : "kadoqu-page-title Celebration-menu"
                    }
                  >
                    <Button
                      className={
                        isMobile ? "Celebration-menu-mob" : "Celebration-menu"
                      }
                      onClick={this.changePackage.bind(this)}
                    >
                      Standard Package
                    </Button>
                  </div>
                  <div
                    className={
                      isMobile
                        ? "kadoqu-page-title Celebration-menu-premium-mob"
                        : "kadoqu-page-title Celebration-menu-premium"
                    }
                  >
                    <Button
                      className={
                        isMobile
                          ? "Celebration-menu-premium-mob"
                          : "Celebration-menu-premium"
                      }
                      onClick={this.changePackage.bind(this)}
                    >
                      Premium Package
                    </Button>
                  </div>
                </Row>

                <Row noGutters={isMobile}>
                  {this.state.Standart ? (
                    <div
                      ref={el => (this.container = el)}
                      className="gida-result-mobile-container"
                      onMouseDown={this.startSliding}
                      onMouseLeave={this.stopSliding}
                      onMouseUp={this.stopSliding}
                      onMouseMove={this.onSliding}
                    >
                      <Image
                        className={
                          isMobile
                            ? "w-50 Celebration-card-mob"
                            : "w25 Celebration-card"
                        }
                        src={IMAGES["Company Celebration"]["Exciting"]}
                        alt="Product not found"
                      />
                      <Image
                        className={
                          isMobile
                            ? "w-50 Celebration-card-mob"
                            : "w25 Celebration-card"
                        }
                        src={IMAGES["Company Celebration"]["Joyfull"]}
                        alt="Product not found"
                      />
                      <Image
                        className={
                          isMobile
                            ? "w-50 Celebration-card-mob"
                            : "w25 Celebration-card"
                        }
                        src={IMAGES["Company Celebration"]["Happiness"]}
                        alt="Product not found"
                      />

                      <Image
                        className={
                          isMobile
                            ? "w-50 Celebration-card-mob"
                            : "w25 Celebration-card"
                        }
                        src={IMAGES["Company Celebration"]["Memorable"]}
                        alt="Product not found"
                      />
                    </div>
                  ) : (
                    <div
                      ref={el => (this.container = el)}
                      className="gida-result-mobile-container"
                      onMouseDown={this.startSliding}
                      onMouseLeave={this.stopSliding}
                      onMouseUp={this.stopSliding}
                      onMouseMove={this.onSliding}
                    >
                      <Image
                        className={
                          isMobile
                            ? "w-50 Celebration-card-mob"
                            : "w25 Celebration-card"
                        }
                        src={IMAGES["Company Celebration"]["Exclusive"]}
                        alt="Product not found"
                      />
                    </div>
                  )}
                </Row>
                <div
                  className={
                    isMobile
                      ? "CompanyCelebration-contactus-mob"
                      : "CompanyCelebration-contactus"
                  }
                >
                  Please contact us trough our customer service to get further
                  information about this product and how to order
                </div>
                <a href="https://wa.me/628112181600">
                  <button
                    type="submit"
                    className={
                      isMobile
                        ? "kadoqu-primary-button-green CompanyCelebration-contactus-button-mob"
                        : "kadoqu-primary-button-green CompanyCelebration-contactus-button"
                    }
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

export default CompanyCelebration;
