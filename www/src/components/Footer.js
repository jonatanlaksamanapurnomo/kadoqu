import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MediaQuery from "react-responsive";
import NavLink from "./NavLink";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./Footer.css";
import IMAGES from "../data/images";

const SocialMediaSection = props => (
  <React.Fragment>
    <Row >
    <Col lg={2} xs={2} md={2} className="logo-image">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.facebook.com/kadoqushop"
    >

      <span className="fa-stack kadoqu-image-button">
         <img className="logo-image-temp logo-image" src="https://ik.imagekit.io/nwiq66cx3pvsy/iconfb.jpg" alt="Facebook Logo" />
      </span>
    </a>
    </Col>
    <Col lg={2} xs={2} md={2} className="logo-image">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.instagram.com/kadoqu_com/"
    >

      <span className="fa-stack kadoqu-image-button">
      <img className="logo-image-temp logo-image" src="https://ik.imagekit.io/nwiq66cx3pvsy/iconig.jpg"  alt="Instagram Logo"  />

      </span>
    </a>
    </Col>
    <Col lg={2} xs={2} md={2} className="logo-image">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://wa.me/628112181600"
    >
      <span className="fa-stack kadoqu-image-button">
      <img className="logo-image-temp logo-image" src="https://ik.imagekit.io/nwiq66cx3pvsy/iconwa.jpg" alt="Whatsapp Logo"  />

      
        {/* <i className="fas fa-square fa-stack-2x"></i>
        <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i> */}
      </span>
    </a>
  </Col>
  </Row>
  </React.Fragment>
);

const Footer = props => (
  <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
    {isDesktop =>
      isDesktop ? (
        <Container fluid className="footer">
          <Row>
            <Col xs={4}>
              <img
                src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png"
                className="footer-logo mb-3"
                alt="Kadoqu.com"
              />
              <div className="text-justify">
                Kadoqu.com adalah online gift store pertama dan terbesar di
                Indonesia yang menyediakan berbagai macam jenis kado bagi orang
                tersayang. Kadoqu memberikan kemudahan bagi para konsumen yang
                mencari kado berkualitas, lengkap dan dibuat khusus untuk
                memenuhi kebutuhan konsumen.
              </div>

              <div className="mt-5">
                <h6>Contact Us</h6>
                <div className="d-flex">
                  <i className="fas fa-map-marker-alt fa-2x mr-2" />
                  <div>
                    Jln. Professor Eyckman No.28 Pav., Pasteur, Sukajadi,
                    Bandung, 40161 Jawa Barat, Indonesia
                    <br />
                    08112181600
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={5}>
              <Row>
                <Col xs={4}>
                  <h6>Layanan Kami</h6>
                  <ul className="list-unstyled quick-links">
                    <li>
                      <NavLink href="/gida">GIdA</NavLink>
                    </li>
                    <li>
                      <NavLink href="/1001-inspirasi-kado">
                        1001 Inspirasi Kado
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/kadoqu-holiday">Kadoqu Holiday</NavLink>
                    </li>
                    <li>
                      <NavLink href="/company-celebration">
                        Company Celebration
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/magical-moment">Magical Moment</NavLink>
                    </li>
                    <li>
                      <NavLink href="/kids-party">Kids Party</NavLink>
                    </li>
                  </ul>
                </Col>
                <Col xs={4}>
                  <h6>Tentang Kami</h6>
                  <ul className="list-unstyled quick-links">
                    <li>
                      <NavLink href="/about-us">About Us</NavLink>
                    </li>
                    <li>
                      <NavLink href="/career">Karir</NavLink>
                    </li>
                    <li>
                      <NavLink href="/merchants">Partner Kami</NavLink>
                    </li>
                    <li>
                      <NavLink href="/merchant-callout">Merchant Callout</NavLink>
                    </li>
                    <li>
                      <NavLink href="/privacy-policy">
                        Kebijakan Privasi
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/terms-and-condition">
                        Persyaratan & Ketentuan
                      </NavLink>
                    </li>
                  </ul>
                </Col>
                <Col xs={4}>
                  <NavLink href="/faq">
                    <h6>FAQ</h6>
                  </NavLink>
                  <ul className="list-unstyled quick-links text-left">
                    <li className="">
                      <NavLink href="/faq">Merchant</NavLink>
                    </li>
                    <li className="">
                      <NavLink href="/faq">Customer</NavLink>
                    </li>
                    <li className="">
                      <NavLink href="/faq">Pengiriman</NavLink>
                    </li>
                    <li className="">
                      <NavLink href="/faq">Promo & Diskon</NavLink>
                    </li>
                    <li className="">
                      <NavLink href="/faq">GIdA</NavLink>
                    </li>
                  </ul>
                </Col>
              </Row>
              <div className="mt-3">
                <h6 className="kadoqu-primary-color m-0">
                  Ingin Tahu Info Terbaru dari kadoqu.com?
                </h6>
                <div>Masukan email kamu untuk berlangganan</div>
                <Form className="form-inline">
                  <Row noGutters className="w-100">
                    <Col xs={8}>
                      <Form.Control type="text" className="w-100 h-100" />
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                      <Button className="kadoqu-primary-button w-75">
                        Daftar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            <Col xs={3}>
              <div>
                <h6>Pembayaran</h6>
                <div>
                  {Object.entries(IMAGES["Bank Logo"]).map(([name, url]) => (
                    <img
                      key={name}
                      src={url}
                      alt={name}
                      className="footer-bank-logo mr-2"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h6>Jasa Pengiriman</h6>
                <div className="footer-shipping-partner">
                  {Object.entries(IMAGES["Shipment Method"])
                    .reduce((all, one, index) => {
                      const chunk = Math.floor(index / 2);
                      all[chunk] = [].concat(all[chunk] || [], [one]);
                      return all;
                    }, [])
                    .map((chunk, index) => (
                      <div className="mb-2" key={index}>
                        {chunk.map(([name, url]) => (
                          <img
                            key={name}
                            src={url}
                            alt={name}
                            className="footer-shipping-partner-logo mr-2"
                          />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              <div className="mt-4 footer-social-media-section">
                <h6>Social Media</h6>
                <SocialMediaSection />
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid className="footer-mobile-container text-center">
          <div>
            <NavLink href="/about-us">
              <h6>About Us</h6>
            </NavLink>
            <hr />
            <NavLink href="/career">
              <h6>Karir</h6>
            </NavLink>
            <hr />
            <NavLink>
              <h6>Back to Top</h6>
            </NavLink>
          </div>
          <div className="mt-4 footer-social-media-section">
            <SocialMediaSection />
          </div>
        </Container>
      )
    }
  </MediaQuery>
);

export default Footer;
