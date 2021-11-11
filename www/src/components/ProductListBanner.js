import React, {Component} from "react";
import {Row, Col, Image} from "react-bootstrap";
import showTransformationsPhoto from "../library/ShowImageTransformation";

import "./ProductListBanner.css";

class ProductListBanner extends Component {
  state = {
    disablePrev: true,
    disableNext: false,
    slidingState: {
      startX: 0,
      currentScrollLeft: 0,
      isDown: false
    }
  };

  scrollPrev = () => {
    this.setState({disableNext: false});

    let h = this.container.scrollTop - this.container.firstChild.clientHeight;

    if (h <= 0) this.setState({disablePrev: true});

    this.container.scrollTo({
      behavior: "smooth",
      top: h
    });
  };

  scrollNext = () => {
    this.setState({disablePrev: false});

    let h = this.container.scrollTop + this.container.firstChild.clientHeight;

    if (this.container.scrollHeight - this.container.clientHeight - h <= 0)
      this.setState({disableNext: true});

    this.container.scrollTo({
      behavior: "smooth",
      top: h
    });
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
    const pageName = this.props.pageName;
    const isMobile = this.props.isMobile;
    return (
      <Row
        className={
          isMobile
            ? "product-list-banner-mob"
            : "product-list-banner position-relative"
        }
        noGutters
      >
        <Col xs={isMobile ? 12 : 9}>
          <Image
            id="product-list-banner-image"
            className={
              isMobile
                ? "career-banner"
                : "w-100 shadow"
            }         
               src={
                isMobile
                  ? showTransformationsPhoto(1817, 500, this.props.mainImageSrc)
                  : showTransformationsPhoto(1817, 800, this.props.mainImageSrc)
              }  
            alt={pageName}
          />
        </Col>
        {!isMobile ? (
          <Col
            xs={{span: 3, offset: 9}}
            className="pl-4 pr-5 h-100 position-absolute"
          >
            <div className="h-100 position-relative vertical-thumbnail">
              {this.props.holiday ? (
                ""
              ) : (
                <div
                  className={
                    "w-100 position-absolute vertical-thumbnail-control prev text-center " +
                    (this.state.disablePrev ? "disabled" : "")
                  }
                >
                  <i
                    className="fas fa-chevron-circle-up"
                    onClick={() => this.scrollPrev()}
                    ref={el => (this.prevButton = el)}
                  />
                </div>
              )}

              <div
                id="vertical-thumbnail-content"
                className="h-100 vertical-thumbnail-content"
                ref={el => (this.container = el)}
              >
                {this.props.data
                .filter(datum => datum.image !== null)
                .map(datum => {

                  return (
                    <Image
                      key={datum.name}
                      className={
                        this.props.holiday
                          ? "w-100 shadow cursor-pointer holiday"
                          : "w-100 shadow cursor-pointer"
                      }  
                      src={
                        this.props.holiday
                          ? showTransformationsPhoto(380,290, datum.image)
                          : showTransformationsPhoto(917, 500, datum.image)
                      }  
                      alt={datum.name}
                      onClick={() => this.props.setFilter(datum.name)}
                    />
                  );
                })}
              </div>
              <div
                className="w-100 position-absolute vertical-thumbnail-bottom shadow">
                &nbsp;
              </div>
              {this.props.holiday ? (
                ""
              ) : (
                <div
                  className={
                    "w-100 position-absolute vertical-thumbnail-control next text-center " +
                    (this.state.disableNext ? "disabled" : "")
                  }
                >
                  <i
                    className="fas fa-chevron-circle-down"
                    onMouseDown={() => this.scrollNext()}
                    ref={el => (this.nextButton = el)}
                  />
                </div>
              )}
            </div>
          </Col>
        ) : (
          <Col xs={12} id="product-list-banner-mob">
            <div
              ref={el => (this.container = el)}
              className={
                this.props.data.length > 2
                  ? "product-list-banner-mobile-container"
                  : "product-list-holiday-banner-mobile-container"
              }
              onMouseDown={this.startSliding}
              onMouseLeave={this.stopSliding}
              onMouseUp={this.stopSliding}
              onMouseMove={this.onSliding}
            >
              {this.props.data.map(datum => {
                return (
                  <Image
                    key={datum.name}
                    src={
                      this.props.holiday
                        ? showTransformationsPhoto(1000,290, datum.image)
                        : showTransformationsPhoto(917, 500, datum.image)
                    }  
                    alt={datum.name}
                    onClick={() => this.props.setFilter(datum.name)}
                  />
          
                );
              })}
            </div>
          </Col>
        )}
      </Row>
    );
  }
}

export default ProductListBanner;