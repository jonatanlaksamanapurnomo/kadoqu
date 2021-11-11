import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {Col, Row, Container, Image} from "react-bootstrap";
import "./AboutUs.css";
import MediaQuery from "react-responsive";
import {
  MIN_DESKTOP_SIZE
} from "../data/constants";

class AboutUs extends Component {

  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {

          const isMobile = !isDesktop;
          return (
            <Container
              className="About-us-container"
            >
              <Helmet>
                <title>Kadoqu.com | About Us</title>
              </Helmet>
              <Row noGutters={isMobile}>
                <Col
                  xs={isMobile ? 12 : {span: 11, offset: 1}}
                  className={
                    isMobile ? "bg-kadoqu-primary cart-mob-title" : "mb-5"
                  }
                >
                  <div
                    className={isMobile ? "kadoqu-page-title AboutUs-title-mob" : "kadoqu-page-title AboutUs-title"}>

                    About Us
                  </div>
                  <div className={
                    isMobile ? "AboutUs-detail-mobile" : "AboutUs-detail"
                  }>

                    Kadoqu.com merupakan perusahaan kado online
                    yang menyediakan jasa pencarian kado untuk segala jenis
                    acara. Mulai dari anniversary, graduation, ulang tahun,
                    hingga hari ibu.
                  </div>

                </Col>
                <Col className="AboutUs-part">
                  <div className="font-weight-bold mb-3 AboutUs-part-text-left">
                    Gift Wrapped
                    <div
                      className="kadoqu-primary-color Kadoqu-Number">249</div>
                  </div>
                </Col>
                <Col className="AboutUs-part">
                  <div className="font-weight-bold mb-3 AboutUs-part-text">
                    Celebrations
                    <div
                      className="kadoqu-primary-color Kadoqu-Number">167</div>
                  </div>
                </Col>
                <Col className="AboutUs-part">
                  <div
                    className="font-weight-bold mb-3 AboutUs-part-text-right">
                    Product Variation
                    <div
                      className="kadoqu-primary-color Kadoqu-Number">1186</div>
                  </div>
                </Col>

              </Row>

              <Row className="AboutUs-Section">
                <Col>
                  <Image fluid className="AboutUs-image"
                         src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__About_Us_01.jpg"/>
                </Col>
              </Row>
              <Row className="AboutUs-Section">
                <Col>
                  <div className={
                    isMobile ? "AboutUs-Quote-mob" : "AboutUs-Quote"
                  }>
                    <div className="quote-mark-left">{"\u201c"}</div>
                    Kadoqu.com memiliki komitmen untuk
                    selalu memberikan hadiah dan kejutan
                    menarik bagi orang yang kamu sayang
                    <div className="quote-mark-right">{"\u201d"}</div>
                  </div>

                </Col>
                <Col>
                  <Image className={
                    isMobile ? "AboutUs-image-quote-mob" : "AboutUs-image-quote"
                  }
                         src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__About_Us_02.jpg"/>
                </Col>
              </Row>
              <Row className="AboutUs-Section">
                <Col>
                  <Image className="AboutUs-image-visi"
                         src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__About_Us_03.jpg"/>
                </Col>
                <Col>
                  <div className={
                    isMobile ? "AboutUs-VisiMisi-mob" : "AboutUs-VisiMisi"
                  }>
                    <div className={
                      isMobile ? "AboutUs-Section-title-mob" : "AboutUs-Section-title"
                    }>Visi
                    </div>
                    Top of mind online gift store specialist

                    <div className={
                      isMobile ? "AboutUs-Section-title-mob" : "AboutUs-Section-title"
                    }>Misi</div>
                    Fulfill people needs of perfect gist for every occasion
                  </div>

                </Col>

              </Row>
              {/* <hr fluid className="AboutUs-line"/> */}
              {/*

                <div className="kadoqu-page-title AboutUs-subtitle">
                <img    width="30%" height="70%"
                className="Gida-avatar-aboutUS"
                            alt="GidA"
                              src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Avatar_06.png"
                            />
               GIdA
             </div>
             <div className="AboutUs-detail-Gida">

               GIdA ( Gift Idea Assistant ) adalah robot asisten yang siap membantu
               kamu memenuhi kebutuhan kado untuk perayaan spesial kamu
             </div>
             <Col className="AboutUs-GidaMenu">
               <div className="AboutUs-Menutitle">
             Event Reminder
             </div>
             <hr className="GidaMenu-Line"/>
             <p className="GidaMenu-Desc">Fitur GIdA yang bisa membantu kamu menginat hari special</p>
             <img    width="60%" height="70%"
                className="Gida-avatar-aboutUS AboutUs-Menutitle"
                            alt="GidA"
                              src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Avatar_06.png"
                            />
             </Col>
             <Col className="AboutUs-GidaMenu">
               <div className="AboutUs-Menutitle">
             GidA Search Engine
             </div>
             <hr className="GidaMenu-Line"/>
             <p className="GidaMenu-Desc">Fitur GIdA untuk cari rekomendasi kado</p>
             <img   width="60%" height="70%"
                className="Gida-avatar-aboutUS AboutUs-Menutitle"
                            alt="GidA"
                              src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Avatar_06.png"
                            />
             </Col>
             <Col className="AboutUs-GidaMenu">
               <div className="AboutUs-Menutitle">
             Wrapping Lab
             </div>
             <hr className="GidaMenu-Line"/>
             <p className="GidaMenu-Desc">Fitur GIdA dimana kamu bisa bungkus kado sesuai keinginan kamu</p>
             <img   width="60%" height="70%"
                className="Gida-avatar-aboutUS AboutUs-Menutitle"
                            alt="GidA"
                              src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES___MOB__Avatar_06.png"
                            />
             </Col>
               */}
            </Container>
          );
        }}
      </MediaQuery>
    );
  }
}

export default AboutUs;
