import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Col, Row, Image } from "react-bootstrap";
import "./MerchantCallout.css";
import MediaQuery from "react-responsive";
import {
  MIN_DESKTOP_SIZE
} from "../data/constants";

class MerchantCallout extends Component {

  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {

          const isMobile = !isDesktop;
          return (
            <React.Fragment>

              <Helmet>
                <title>Kadoqu.com | Merchant Callout</title>
              </Helmet>
              <Image
                className="kids-party-banner"
                fluid
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES_-Merchant-Callout1.jpg"
                alt="Kids Party Banner"
              />
              <div
                className="kadoqu-primary-color Merchant-title">About Kadoqu.com
              </div>
              <div className={
                isMobile ? "Merchant-detail-mob" : "Merchant-detail"
              }>

                Kadoqu.com merupakan online shop yang berbasis pada website.
                Kami membantu orang - orang dalam mempersiapkan hadiah untuk
                hari spesial mereka. Melalui website, konsumen dapat memilih
                hadiah dan dapat melakukan transaksi langsung dimana saja. Tidak
                hanya itu saja, Customer Service kadoqu.com juga siap membantu
                konsumen apabila terdapat request sesuatu barang atau permintaan
                lain terkait dengan transaksi yang terjadi di website. Kami
                tidak memiliki toko offline, karena semua transaksi bersifat
                online. Tetapi jangan khawatir, kami dapat melakukan pengiriman
                ke seluruh Indonesia dengan menggunakan kurir ataupun
                menggunakan ojek online.

                Kadoqu.com berdomisili di Kota Bandung, Jawa Barat, Indonesia.
                Kami bekerja sama dengan online shop dan UMKM lokal untuk
                menyediakan produk hadiah di website kadoqu. Melalui kerja sama
                ini, online shop dan UMKM lokal dapat memasarkan produk mereka
                ke seluruh Indonesia dengan cara yang lebih mudah.
              </div>
              <Row className="Callout-Section">
                <Col>
                  <Image className="Callout-image-visi"
                         src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES_-Merchant-Callout2.jpg"/>
                </Col>
                <Col>
                  <div className={
                    isMobile ? "Merchant-section-two-mob" : "Merchant-section-two"
                  }>

                    <div className={
                      isMobile ? "kadoqu-primary-color Merchant-subtitle" : "kadoqu-primary-color Merchant-subtitle"
                    }
                    >Why Join Us?
                    </div>


                    <div
                      className={isMobile ? "join-us-section-mob" : "join-us-section"}>
                      <ul className="list-callout">

                        - Trusted online store since 2018 <br></br>
                        - Growing 15% sales per month <br></br>
                        - Get potential customers<br></br>
                        - Improve business awareness<br></br>
                        - We are using InstaAds, GoogleAds, etc to help your
                        business grow<br></br>
                        - Promotion up to 25.000.000 IDR per month<br></br>
                        - Delivery expenses from merchant will be fully covered
                        by Kadoqu<br></br>


                      </ul>
                    </div>
                    <div
                      className="kadoqu-primary-color Merchant-subtitle">What
                      are we looking for in merchant ?
                    </div>

                    <div
                      className={isMobile ? "join-us-section-mob" : "join-us-section"}>
                      <ul className="list-callout">

                        - Cooperative merchant <br></br>
                        - Unique and specialized in gifts
                        <br></br>
                        - Actively selling products through social media
                        (Instagram, Facebook, etc)
                        <br></br>


                      </ul>
                    </div>
                  </div>
                </Col>

              </Row>
              <Row>
                <div className="form-callout-section">
                  <div className="kadoqu-primary-color Merchant-title-last">How
                    to join us ?
                  </div>
                  <div className={
                    isMobile ? "AboutUs-detail-mobile" : "Merchant-detail-last"
                  }>

                    Simply fill this form and our team will contact you soon.

                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdFQrNYnlUNy__YO_P9wwlJRin5iErhywQnTiqaBi2JWpWrvg/viewform?usp=pp_url">
                    <button
                      type="submit"
                      className={
                        isMobile
                          ? "kadoqu-primary-button-green callout-button-mob"
                          : "kadoqu-primary-button-green callout-button"
                      }
                    >
                      Join Now!
                    </button>
                  </a>
                </div>

              </Row>
              <div></div>

            </React.Fragment>
          );
        }}
      </MediaQuery>
    );
  }
}

export default MerchantCallout;
