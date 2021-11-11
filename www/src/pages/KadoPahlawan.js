import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Col, Row, Container, Image } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { Query } from "react-apollo";
import ReactPlaceholder from "react-placeholder";
import { RectShape } from "react-placeholder/lib/placeholders";
import ProductItem from "../components/ProductItem";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import {
  QUERY_GET_KADO_PAHLAWAN_PRODUCTS,
  QUERY_GET_TOTAL_CARE_PACKAGES
} from "../gql/kadoPahlawan";
// import IMAGES from "../data/images";

import "react-placeholder/lib/reactPlaceholder.css";
import "./KadoPahlawan.css";

const awesomePlaceholder = (
  <Row className="my-awesome-placeholder">
    {Array(12)
      .fill()
      .map((item, index) => (
        <Col xs={6} lg={3} key={index}>
          <RectShape
            color="lightgray"
            style={{ width: 280, height: 320, marginBottom: "1rem" }}
          />
        </Col>
      ))}
  </Row>
);

const ListOfProducts = props => {
  const { products } = props;
  return (
    <Row>
      {products.map(product => {
        return (
          <Col xs={6} lg={3} key={product.id}>
            <ProductItem
              details={{
                ...product,
                photo: product.photos[0] ? product.photos[0].url : ""
              }}
              query={props.query}
              isMobile={props.isMobile}
            />
          </Col>
        );
      })}
    </Row>
  );
};

const query = { query: QUERY_GET_KADO_PAHLAWAN_PRODUCTS };

class KadoPahlawan extends Component {
  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          const isMobile = !isDesktop;
          return (
            <React.Fragment>
              <Helmet>
                <title>Kadoqu.com | Kado Pahlawan</title>
              </Helmet>
              <Image
                className="kids-party-banner"
                fluid
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Kado_Pahlawan_Kesehatan.jpg"
                alt="Gallery Banner"
              />
              <Container fluid>
                <Row>
                  <Col lg={8} md={8} xs={8}>
                    <div
                      className={`kadoqu-primary-color ${
                        isMobile ? "Pahlawan-title-mob" : "Pahlawan-title"
                      }`}
                    >
                      <span className="black-title">Tentang </span>Kado Pahlawan
                      Kesehatan
                    </div>
                    <div
                      className={
                        isMobile ? "Pahlawan-detail-mob" : "Pahlawan-detail"
                      }
                    >
                      Halaman ini dibuat untuk mengapresiasikan tenaga medis
                      sebagai frontline melawan Covid-19. Setiap produk akan
                      disalurkan sebagai rewarding Pahlawan Kesehatan oleh
                      Kadoqu ke rumah sakit & puskesmas yang membutuhkan.
                    </div>
                    <div
                      className={
                        isMobile ? "Merchant-detail-mob" : "Pahlawan-detail"
                      }
                    >
                      Cek{" "}
                      <a href="#faq">
                        <span className="kadoqu-primary-color">
                          <b>FAQ</b>
                        </span>
                      </a>{" "}
                      untuk info lebih lanjut
                    </div>
                  </Col>
                  <Col className="col-total-pahlawan" lg={4} md={4} xs={4}>
                    <div className="pahlawan-total">
                      <span className="judul-total">Total Kado Pahlawan</span>

                      <br/>
                      <span className="jumlah-angka">
                        <Query
                          query={QUERY_GET_TOTAL_CARE_PACKAGES}
                          fetchPolicy="network-only"
                        >
                          {({ loading, error, data }) => {
                            if (loading) return <p>...</p>;
                            if (error) return <p>{error.message || error}</p>;

                            return data.getTotalCarePackages;
                          }}
                        </Query>
                      </span>
                      <div className="judul-subtotal">
                        paket sudah diterima oleh pahlawan kesehatan di seluruh
                        Bandung.
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Row noGutters={isMobile} className="Pahlawan-package">
                <div className={isMobile ? "Produk-MM-Mob" : "Produk-pahlawan"}>
                  <p>Pilihan Kado</p>
                  <hr
                    className={
                      isMobile ? "produk-line-MM-Mob" : "produk-line-MM"
                    }
                  />
                </div>
                <Query fetchPolicy="network-only" {...query}>
                  {({ loading, error, data }) => {
                    return (
                      <Container
                        fluid
                        className="kado-pahlawan-container-product"
                      >
                        <ReactPlaceholder
                          showLoadingAnimation
                          type="media"
                          customPlaceholder={awesomePlaceholder}
                          ready={!(loading || error)}
                        >
                          <ListOfProducts
                            products={data.getKadoPahlawanProducts}
                          />
                        </ReactPlaceholder>
                      </Container>
                    );
                  }}
                </Query>
                <div
                  ref={el => (this.container = el)}
                  className="gida-result-mobile-container"
                  onMouseDown={this.startSliding}
                  onMouseLeave={this.stopSliding}
                  onMouseUp={this.stopSliding}
                  onMouseMove={this.onSliding}
                ></div>
              </Row>
              <Container>
                <Row className="pahlawan-form">

                  <Col>
                    <Image
                      className="kids-party-banner"
                      fluid
                      src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Kado_Pahlawan_Kesehatan_Custom.jpg"
                      alt="Gallery Banner"
                    />{" "}
                    <div
                      className={
                        isMobile ? "button-kontak" : "button-kontak-des"
                      }
                    >
                      <a
                        href="https://wa.me/628112181600"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <button
                          type="submit"
                          className={`kadoqu-primary-button-green ${
                            isMobile ? "pahlawan-button-mob" : "pahlawan-button"
                          }`}
                        >
                          Kontak GIdA
                        </button>
                      </a>
                    </div>
                  </Col>

                </Row>
                <Row id="faq">
                  <div
                    className={`kadoqu-primary-color ${
                      isMobile ? "FAQ-Question-mob" : "FAQ-Question"
                    }`}
                  >
                    FAQ
                  </div>
                </Row>
                <Row>
                  <div
                    className={isMobile ? "FAQ-Question-mob" : "FAQ-Question"}
                  >
                    Apa itu Kado Pahlawan Kesehatan?
                  </div>
                </Row>
                <Row>
                  <div className={isMobile ? "FAQ-Answer-mob" : "FAQ-Answer"}>
                    Kado Pahlawan Kesehatan adalah halaman khusus untuk kamu
                    yang mau memberi apresiasi bagi tim medis untuk perjuangan
                    mereka di garis terdepan.
                  </div>
                </Row>
                <Row>
                  <div
                    className={isMobile ? "FAQ-Question-mob" : "FAQ-Question"}
                  >
                    Bagaimana cara memberi Kado Pahlawan Kesehatan?
                  </div>
                </Row>
                <Row>
                  <div className={isMobile ? "FAQ-Answer-mob" : "FAQ-Answer"}>
                    Beli salah satu produk di halaman ini, setelah itu tim
                    kadoqu.com akan mengantarkan kado pilihanmu untuk tim medis
                    yang bertugas di rumah sakit/puskesmas tertentu sesuai
                    pilihan tim kadoqu.com.
                  </div>
                </Row>
                <Row>
                  <div
                    className={isMobile ? "FAQ-Question-mob" : "FAQ-Question"}
                  >
                    Siapa yang akan menerima Kado Pahlawan Kesehatan?
                  </div>
                </Row>
                <Row>
                  <div className={isMobile ? "FAQ-Answer-mob" : "FAQ-Answer"}>
                    Dokter, perawat, dan staf lain di rumah sakit tertentu yang
                    sudah kami pilih (area Bandung).
                  </div>
                </Row>
                <Row>
                  <div
                    className={isMobile ? "FAQ-Question-mob" : "FAQ-Question"}
                  >
                    Kapan Kado Pahlawan Kesehatan akan dikirim?
                  </div>
                </Row>
                <Row>
                  <div className={isMobile ? "FAQ-Answer-mob" : "FAQ-Answer"}>
                    Kami akan mengirimkan kado kamu serentak pada tanggal 7 Juni
                    2020.
                  </div>
                </Row>
                <Row>
                  <div
                    className={isMobile ? "FAQ-Question-mob" : "FAQ-Question"}
                  >
                    Apa yang akan saya terima saat saya membeli Kado Pahlawan
                    Kesehatan?
                  </div>
                </Row>
                <Row>
                  <div className={isMobile ? "FAQ-Answer-mob" : "FAQ-Answer"}>
                    Kamu akan menerima laporan pengiriman dari kami dan kode
                    voucher 10% di kadoqu.com untuk pembelian berikutnya.
                  </div>
                </Row>
                <Row>
                  <div
                    className={isMobile ? "FAQ-Question-mob" : "FAQ-Question"}
                  >
                    Apakah saya boleh request rumah sakit atau puskesmas
                    penerima?
                  </div>
                </Row>
                <Row>
                  <div className={isMobile ? "FAQ-Answer-mob" : "FAQ-Answer"}>
                    Ya, jika kamu melakukan pembelian minimal 5 paket, kamu
                    dapat request ke rumah sakit atau puskesmas pilihanmu. Mohon
                    beri info kepada tim kadoqu.com mengenai hal ini.
                  </div>
                </Row>
                <Row>
                  <div
                    className={isMobile ? "FAQ-Question-mob" : "FAQ-Question"}
                  >
                    Apakah saya dikenakan biaya lain saat pembelian?
                  </div>
                </Row>
                <Row>
                  <div className={isMobile ? "FAQ-Answer-mob" : "FAQ-Answer"}>
                    Tidak, kamu hanya akan dibebankan harga paket sebagai
                    besaran donasi. Kamu bebas dari ongkos kirim dan biaya
                    bungkus kado.
                  </div>
                </Row>
                <br/>
              </Container>
            </React.Fragment>
          );
        }}
      </MediaQuery>
    );
  }
}

export default KadoPahlawan;
