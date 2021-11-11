import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Col, Row, Image } from "react-bootstrap";
import "./Career.css";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";
// import NavLink from "../components/NavLink";
import { Link } from "react-router-dom";
import IMAGES from "../data/images";

class Partner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      karir: " "
    };
  }

  render() {
    const ImageButton = props => (
      <Link to={{ pathname: props.link, data: props.alt }}>
        <Image src={props.src} alt={props.alt} className={props.className} />
      </Link>
    );
    const arr = [
      "Aphrodite",
      "Artink",
      // "Balonia",
      "BandungBouquet",
      "BRO" ,
      "Caia",
      "Caramelt",
      // "Ciclay",
      "Castella",
      "Cavelaid" ,
      "Comeliest" ,
      // "DearPastry",
      "Edibelle",
      // "Ergoo",
      // "Fayre",
      // "Givegift",
      // "HandmadeMemory",
      "HomBaker" ,
      // "OpenTrip",
      // "IndoFlourish",
      // "IstanaBalon",
      // "Jiwalu",
      // "Jiyyalush",
      // "K2U",
      "Ladywood" ,
      // "Lavatere",
      // "Luxio",
      "MissP",
      "Naratisa",
      // "Nioart",
      // "Phillorist",
      // "Rokaloka",
      // "Sunflorist",
      "FloralQueen",
      // "Thevivi",
      "Putriolvi" ,
      "TinyTreats" ,
      "Viflowers",
      // "Volks",
      "Wallts"
    ];
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          const isMobile = !isDesktop;
          return (
            <React.Fragment>
              <Helmet>
                <title>Kadoqu.com | Partner Kami</title>
              </Helmet>
              <Image
                className="career-banner"
                fluid
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Partner_Kami_Tulisan.png"
                alt="Career Banner"
              />
              <Row noGutters={isMobile} className="p-5 career-image-left">
         
                {arr.map(value => (
                <Col lg={2} md={4} xs={4}>
                    <ImageButton
                      link={`/Merchant/${value}`}
                      src={IMAGES.MerchantLogo[value]}
                      alt={value}
                      className="w-100 kadoqu-image-button career-image"
                    />
                  </Col>
                ))}
          
         
              </Row>
            </React.Fragment>
          );
        }}
      </MediaQuery>
    );
  }
}

export default Partner;
