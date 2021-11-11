import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {Query} from "react-apollo";
//import SlidingCarousel from "../components/SlidingCarousel";
import IMAGES from "../data/images";
import ProductItem from "../components/ProductItem";
import gql from "graphql-tag";
import {Col, Image, Row} from "react-bootstrap";
import "./MagicalMoment.css";
import MediaQuery from "react-responsive";
import {QUERY_GET_BANNERS} from "../gql/banner";
import {BANNER_LOCATION, MIN_DESKTOP_SIZE} from "../data/constants";
import showTransformationsPhoto from "../library/ShowImageTransformation";

const QUERY_GET_PRODUCTSBYMERCHANT = gql`
  query getProductsMerchant($merchant: String) {
    getProductsMerchant(merchant: $merchant) {
      id
      name
      merchant
      shortDescription
      longDescription
      price
      capitalPrice
      kadoquDiscount
      shipmentDescription
      merchantDiscount
      merchantPrice
      merchantDiscountUntil
      kadoquDiscountUntil
      inStock
      score
      slug
      isPo
      isEnable
      sku
      stock
      weight
      length
      width
      height
      categories {
        name
      }
      storeCategories {
        name
      }
      photos {
        url
      }
      tags {
        name
      }
      colors {
        name
      }
      shippingSupports {
        id
        name
      }
      holidayCategories{
        id
        name
      }
    }
  }
`;


const Results = props => {

  const query = {
    query: QUERY_GET_PRODUCTSBYMERCHANT,
    variables: {
       merchant : "K2U Party Designer"
    }
  };
  return (
    <Query {...query}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (data.getProductsMerchant.length === 0) {
          props.history.push("/");
        }
        // console.log(data);
        if (props.isMobile) {
          return (
            <div
            />
          );
        }
        return (
          <Row>
            {data.getProductsMerchant.map(product => {
              let productCategories = [];
              product.categories.forEach(category => {
                productCategories.push(category.name);
              });
              console.log(product.photos)

              // console.log(productCategories);
              return (
                <Col xs={3} key={product.id}>
                  <ProductItem
                            isMobile={props.isMobile}

                    details={{
                      id: product.id,
                      slug: product.slug,
                      merchant: product.merchant,
                      name: product.name,
                      photo: product.photos[0] ? product.photos[0].url : "",
                      price: product.price
                                        }}
                    query={query}
                  />
                </Col>
              );
            })}
          </Row>
        );
      }}
    </Query>
  );
};

class MagicalMoment extends Component {
  constructor() {
    super();

    this.state = {
      slidingState: {
        startX: 0,
        currentScrollLeft: 0,
        isDown: false,
        merchantname : " "
      }
    }
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

    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {

          const isMobile = !isDesktop;
          return (
            <React.Fragment>

              <Helmet>
                <title>Kadoqu.com | Magical Moment</title>
              </Helmet>
              <Query
                query={QUERY_GET_BANNERS}

                variables={isMobile ? {location: BANNER_LOCATION["magical-moment"]["title"]["desktop"]} : {location: BANNER_LOCATION["magical-moment"]["title"]["desktop"]}}
              >
                {({loading, error, data}) => {
                  if (loading) {
                    return (
                      <div
                        className="home-empty-carousel-banner">Loading...</div>
                    )
                  }
                  if (error) {
                    return (
                      <div className="home-empty-carousel-banner"/>
                    )
                  }
                  return (
                    <Image
                      className="magical-banner"
                      src={showTransformationsPhoto(1578, 650, data.getBanners[0].image)}
                      alt="Product not found"
                    />
                  )
                }
                }
              </Query>

              <div className="text-center">

                <div
                  className={isMobile ? "MagicalMoment-subtitle" : "MagicalMoment-subtitle"}>

                  What is Magical Moment?
                </div>

                <div
                  className={isMobile ? "MagicalMoment-subtitlesecond" : "MagicalMoment-subtitlesecond"}>

                  Kadoqu Magical Moment is a full service event planning company
                  based in Bandung City specializing in <br></br>event
                  management and production for milestone events like birthdays,
                  bridal showers, baby showers and more.
                </div>
                <div
                  className={isMobile ? "MagicalMoment-subtitlesecond" : "MagicalMoment-subtitlesecond"}>

                  Kadoqu Magical Moment helps people organize their special
                  moment to celebrate a party <br></br> and express love with a
                  helpful and friendly service
                </div>
                <div
                  className={isMobile ? "MagicalMoment-subtitlesecond" : "MagicalMoment-subtitlesecond"}>

                  Our parties are uniquely customized and tailored to each of
                  our clients needs making it a speacial
                  experience <br></br> for you and your guests as well as
                  allowing the host to be a guest at their party
                </div>
              </div>
              <div className="MagicalMoment-package">


                <Row noGutters={isMobile} className="w-100">
                <div className={isMobile ? "Produk-MM-Mob" : "Produk-MM"}
><p>Kadoqu.com</p><hr className={isMobile ?"produk-line-MM-Mob" : "produk-line-MM"} /></div>

                  <div
                    ref={el => (this.container = el)}
                    className="gida-result-mobile-container"
                    onMouseDown={this.startSliding}
                    onMouseLeave={this.stopSliding}
                    onMouseUp={this.stopSliding}
                    onMouseMove={this.onSliding}
                  >
                    <Image
                      className={isMobile ? "w-50 magical-card-mob" : "w-25 Magical-card"}
                      src={IMAGES["Magical Moment"]["Deluxe"]}
                      alt="Product not found"

                    />
                    <Image
                      className={isMobile ? "w-50 magical-card-mob" : "w-25 Magical-card"}
                      src={IMAGES["Magical Moment"]["Special"]}
                      alt="Product not found"

                    />
                    <Image
                      className={isMobile ? "w-50 magical-card-mob" : "w-25 Magical-card"}
                      src={IMAGES["Magical Moment"]["Luxury"]}
                      alt="Product not found"

                    />

                    <Image
                      className={isMobile ? "w-50 magical-card-mob" : "w-25 Magical-card"}
                      src={IMAGES["Magical Moment"]["Royal"]}
                      alt="Product not found"

                    />
                  </div>
                </Row>


              </div>
              <Row>
<div className="career-detail-desc-bg"></div>
              <div className={isMobile ? "Produk-MM-Mob" : "Produk-MM"}><p>K2U Party Designer</p>
              <hr className={isMobile ? "produk-line-MM2-Mob" : "produk-line-MM2"}/></div>
              <div className="merchant-product">
              <Results
                  id={this.props.match.params.id}
                  offset={this.state.offset}
                  // isMobile={!isDesktop}
                  history={this.props.history}
                  reset={this.state.resetSlider}
                  restartResetState={() =>
                    this.setState({ resetSlider: false })
                  }
                  className="result-merchant"
                />
              </div>

</Row>
{/* 
              <div
                className={isMobile ? "MagicalMoment-Image-right-mob" : "MagicalMoment-Image-right"}>
                <img className={isMobile ? "MagicalMoment-Image-right-mob" : ""}
                     src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Best_View_Venue_1_.jpg"
                     alt="Magical Moment Package"></img>
              </div>

              <div className="MagicalMoment-Image">
                <img className={isMobile ? "MagicalMoment-Image-right-mob" : ""}
                     src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__City_Night_View.jpg"
                     alt="Magical Moment Package"></img>
              </div>

              <Row
                className="w-100 d-flex text-center justify-content-center mm-contact">
                <Col xs={isMobile ? 6 : 5}>
                  <div className="Magical-extra-box">
                    <div className="Magical-Orange-Line"></div>

                    <div
                      className={isMobile ? "MagicalMoment-subtitle-menu" : "MagicalMoment-subtitle-menu"}>

                      Additional Service
                    </div>

                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-bold"}>

                      Wine
                    </div>
                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-price"}>
                      Rp 750.000
                    </div>

                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-bold"}>

                      Videography
                    </div>
                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-price"}>
                      Rp 2.000.000
                    </div>

                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-bold"}>

                      Custom Gift
                    </div>
                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-price"}>
                      Custom Price
                    </div>

                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-bold"}>

                      Cake
                    </div>
                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-price"}>
                      Custom Price
                    </div>
                    <div className="CompanyCelebration-Batas"></div>

                  </div>

                </Col>
                <Col xs={isMobile ? 6 : 5}>
                  <div className="Magical-extra-box">
                    <div className="Magical-Orange-Line"></div>

                    <div
                      className={isMobile ? "MagicalMoment-subtitle-menu" : "MagicalMoment-subtitle-menu"}>

                      How to Order
                    </div>

                    <div
                      className={isMobile ? "MagicalMoment-subtitlesecond-price" : "MagicalMoment-subtitlesecond-price"}>
                      Please contact us trough our customer service to get
                      further information about this product and how to order
                    </div>
                    <a href="https://wa.me/628112181600">

                      <button
                        type="submit"
                        className="kadoqu-primary-button-green MagicalMoment-contactus-button m-0"
                      >
                        Contact Us!
                      </button>
                    </a>
                    <div className="CompanyCelebration-Batas"></div>

                  </div>
                </Col> */}
{/* 
              </Row> */}
              <div className="CompanyCelebration-Batas"></div>
            </React.Fragment>

          );
        }}
      </MediaQuery>
    );
  }
}

export default MagicalMoment;
