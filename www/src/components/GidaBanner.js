import React from "react";
import { Row, Col } from "react-bootstrap";

import "./GidaBanner.css";

const GidaBannerItem = props => (
  <Row className="gida-banner-item">
    <Col sm={4} className="gida-banner-item-holder">
      <img className="gida-banner-image" src={props.image} alt={props.title} />
    </Col>
    <Col sm={8} className="gida-banner-item-holder">
      <span className="gida-banner-title">{props.title}</span>
      <p className="gida-banner-content">{props.content}</p>
    </Col>
  </Row>
);

const GidaBanner = props => (
  <Row className={"gida-banner-container " + props.className}>
    <Col>
      <GidaBannerItem
        image="https://ik.imagekit.io/nwiq66cx3pvsy/Landing_Page/gida-tanya-gida.png"
        title="Tanya GIdA"
        content="Gak nemu kado yang pas buat si dia?
          Gak usah bingung.
          Yuk tanya GIdA untuk rekomendasi kado yang cocok untuk orang spesial kamu."
      />
    </Col>
    <Col>
      <GidaBannerItem
        image="https://ik.imagekit.io/nwiq66cx3pvsy/Landing_Page/gida-ide-kado-gida.png"
        title="Ide Kado GIdA"
        content="GIdA bakal kasih rekomendasi kado yang kamu perlukan.
          Kurang puas sama hasilnya?
          Tanya GIdA lagi aja!"
      />
    </Col>
    <Col>
      <GidaBannerItem
        image="https://ik.imagekit.io/nwiq66cx3pvsy/Landing_Page/gida-bungkus-kado.png"
        title="Bungkus Kado"
        content="Kado pilihan kamu sudah dibungkus rapi sama GIdA
          dan siap dikirim buat jadi kejutan orang tersayang."
      />
    </Col>
  </Row>
);

export default GidaBanner;
