import React from "react";

import {Carousel} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import showTransformationsPhoto from "../library/ShowImageTransformation";

class SlidingCarousel extends React.Component {
  state = {
    startPos: null,
    activeIndex: 0
  };

  componentDidMount() {
    this.dragImage = new Image(0, 0);
    this.dragImage.src = // transparent image to replace ghost component
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }

  render() {
    const {startPos, activeIndex} = this.state;
    const {data, ...carouselProps} = this.props;
    const handleSelect = selectedIndex => {
      this.setState({activeIndex: selectedIndex});
    };
    const handleStartPos = e => {
      this.setState({startPos: e.clientX});
    };
    const handleEndPos = e => {
      const xDifference = startPos - e.clientX;
      if (Math.abs(xDifference) < 30) return;
      const maxSlide = data.length;
      if (xDifference > 0) {
        handleSelect(activeIndex + 1 > maxSlide ? 0 : activeIndex + 1);
        return;
      }
      handleSelect(activeIndex - 1 < 0 ? maxSlide : activeIndex - 1);
    };
    return (
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        {...carouselProps}
      >
        {/* it is assumed every item has same dimension ratio*/}
        {data.map(({id, image, url}) => {
          // console.log(url);
          return (
            <Carousel.Item
              key={id}
              onDragStart={e => {
                e.dataTransfer.setDragImage(this.dragImage, 0, 0);
                handleStartPos(e);
              }}
              onClick={() => {
                window.location.href = url
              }}
              onDragEnd={handleEndPos}
              onTouchStart={e => handleStartPos(e.changedTouches[0])}
              onTouchEnd={e => handleEndPos(e.changedTouches[0])}
            >
              <img src={showTransformationsPhoto(1578, 650, image)} alt=""/>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}

export default withRouter(SlidingCarousel);
