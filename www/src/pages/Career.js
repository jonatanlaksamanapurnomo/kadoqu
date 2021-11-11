import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Col, Row, Image } from "react-bootstrap";
import "./Career.css";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";
// import NavLink from "../components/NavLink";
import { Link } from "react-router-dom";
import IMAGES from "../data/images";

class Career extends Component {
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
      "WD",
      "LA",
      "HDB",
      "GW",
      "GD",
      "FA",
      "CP",
      "CMS",
      "CM",
      "BD", "OF","PD"
    ];
    const avail = ["SE", "DM", "SMS"];
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          const isMobile = !isDesktop;
          return (
            <React.Fragment>
              <Helmet>
                <title>Kadoqu.com | Career</title>
              </Helmet>
              <Image
                className="career-banner"
                fluid
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Hiring_Tulisan_Baru.jpg"
                alt="Career Banner"
              />
              <Row noGutters={isMobile} className="p-5 career-image-left">
                <Col xs={12}>
                  <div
                    className={
                      isMobile
                        ? "kadoqu-page-title Career-title-mob"
                        : "kadoqu-page-title Career-title"
                    }
                  >
                    Job Vacancy
                  </div>
                </Col>
                {avail.map(value => (
                  <Col xs={4}>
                    <ImageButton
                      link={`/Career-detail/${value}`}
                      src={IMAGES.Careerbutton[value]}
                      alt={value}
                      className="w-100 kadoqu-image-button career-image"
                    />
                  </Col>
                ))}
                    <Col xs={12}>
                  <div
                    className={
                      isMobile
                        ? "kadoqu-page-title Career-title-mob"
                        : "kadoqu-page-title Career-title-avail"
                    }
                  >
                    Not Available
                  </div>
                </Col>
                {arr.map(value => (
                  <Col xs={4}>
                    <ImageButton
                      link="/"
                      src={IMAGES.Careerbutton[value]}
                      alt={value}
                      className="w-100 kadoqu-image-button career-image disable"
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

export default Career;
