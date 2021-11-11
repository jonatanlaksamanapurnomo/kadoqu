import React, { Component } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { withApollo, Query } from "react-apollo";
import NavLink from "../components/NavLink";
import SlidingCarousel from "../components/SlidingCarousel";
import GidaBanner from "../components/GidaBanner";
import GidaSearchEngine, {
  GidaSearchEngineTitle
} from "../components/GidaSearchEngine";
import GalleryCarousel from "../components/GalleryCarousel";
// import Quote from "../components/Quote";
import MerchantCarousel from "../components/MerchantCarousel";
import InfoKadoqu from "../components/InfoKadoqu";
import { QUERY_GET_BANNERS } from "../gql/banner";
import { BANNER_LOCATION } from "../data/constants";

import "./Home.css";

const ImageButton = props => (
  <NavLink href={props.link}>
    <Image src={props.src} alt={props.alt} className={props.className}/>
  </NavLink>
);

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Kadoqu.com</title>
        </Helmet>
        <Query
          query={QUERY_GET_BANNERS}
          variables={{ location: BANNER_LOCATION["home"]["carousel"] }}
        >
          {({ loading, error, data }) =>
            loading ? (
              <div className="home-empty-carousel-banner">Loading...</div>
            ) : error ? (
              <div className="home-empty-carousel-banner"/>
            ) : (
              <SlidingCarousel
                className="home-gida-carousel"
                interval={3000}
                indicators={true}
                controls={false}
                data={data.getBanners}
              />
            )
          }
        </Query>
        <GidaBanner className="d-none d-md-flex"/>
        <Container className="home-container">
          <Row className="home-item-padding home-gida-search-engine" noGutters>
            <Col xs={5} className="pr-2">
              <img
                className="w-100"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/Landing_Page/mama-gida.svg"
                alt="Mama GIdA"
              />
            </Col>
            <Col xs={7}>
              <GidaSearchEngineTitle/>
              <GidaSearchEngine home={true}/>
            </Col>
          </Row>
          <Row className="home-item-padding home-other-service-section">
            <Col xs={6}>
              <ImageButton
                link="/gida"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Tombol_GIdA_1_.png"
                alt="GIdA Menu"
                className="w-100 kadoqu-image-button"
              />
            </Col>
            <Col xs={6} className="d-flex flex-column justify-content-between">
              <ImageButton
                link="/1001-inspirasi-kado"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/Landing_Page/banner-1001-inspirasi-kado.png"
                alt="Inspirasi Kado"
                className="w-100 kadoqu-image-button"
              />
              <ImageButton
                link="/kadoqu-holiday"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Tombol_Kadoqu_Holiday.png"
                alt="Kadoqu Gift"
                className="w-100 kadoqu-image-button"
              />
            </Col>
          </Row>
          <Row className="home-item-padding-second home-other-service-section">
            <Col xs={4} className="">
              <ImageButton
                link="/company-celebration"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Tombol_Company_Celebration.png"
                alt="Company Celebration"
                className="w-100 kadoqu-image-button"
              />
            </Col>
            <Col xs={4} className="">
              <ImageButton
                link="/magical-moment"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Tombol_Magical_Moment.png"
                alt="Magical Moment"
                className="w-100 kadoqu-image-button"
              />
            </Col>
            <Col xs={4} className="">
              <ImageButton
                link="/kids-party"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Tombol_Kids_Party.png"
                alt="Kids Party"
                className="w-100 kadoqu-image-button"
              />
            </Col>
          </Row>
          <GalleryCarousel className="home-item-padding"/>
          {/* <Quote className="home-item-padding"/> */}
          <MerchantCarousel className="home-item-padding"/>
        </Container>
        <InfoKadoqu className="d-none d-md-block"/>
      </React.Fragment>
    );
  }
}

export default withApollo(Home);
