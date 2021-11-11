import React from "react";
import { Carousel, Image, Row, Col } from "react-bootstrap";
import NavLink from "./NavLink";

import "./MerchantCarousel.css";

const MERCHANT = [
  {name:"Artink",src:"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Artink.png"},
  {name:"Aphrodite" ,src:"https://ik.imagekit.io/nwiq66cx3pvsy/logo-aphrodite-crafts.jpg"},
  {name:"BandungBouquet",src:"https://ik.imagekit.io/nwiq66cx3pvsy/logo-bandung-bouquet.jpg"},
  {name:"BRO", src:"https://ik.imagekit.io/nwiq66cx3pvsy/logo-bro-homemade-brownies.jpg"},
  {name:"Caia",src:"https://ik.imagekit.io/nwiq66cx3pvsy/logo-caia-cakery.jpg"},
  {name:"Caramelt", src:"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Caramelt.png"},
    {name:"Ciclay",src: "https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Ci.clay.png"},
{name:"Castella",src: "https://ik.imagekit.io/nwiq66cx3pvsy/logo-castella.jpg"},
{name:"Cavelaid",src: "https://ik.imagekit.io/nwiq66cx3pvsy/logo-cavelaid.jpg"},
  {name:"Comeliest",src:"https://ik.imagekit.io/nwiq66cx3pvsy/logo-comeliest-scrapbook.jpg"},
    {name:"DearPastry",src:"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Dear_Pastry.JPG"},
  {name:"Edibelle" ,src:"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Edibelle.jpg"},  
  {name:"HomBaker",src: "https://ik.imagekit.io/nwiq66cx3pvsy/logo-hombaker-bakery.jpg"},
  {name:"Putriolvi",src: "https://ik.imagekit.io/nwiq66cx3pvsy/logo-putriolvi.jpg"},
{name:"TinyTreats",src: "https://ik.imagekit.io/nwiq66cx3pvsy/logo-tiny-treats.jpg"},
  {name:"Viflowers" ,src:"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Viflowerss_1_.png"},
  {name:"Wallts",src: "https://ik.imagekit.io/nwiq66cx3pvsy/logo-wallts-wallet-goods.jpg"},
  {name:"HandmadeMemory",src :"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Handmade_Memory.png"},
  {name:"IndoFlourish" ,src:"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Indonesia_Flourish.png"},
  {name:"IstanaBalon",src: "https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Istana_Balon.jpg"},
  {name:"Jiwalu" ,src:"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Jiwalu.jpg"},
  {name:"Jiyyalush",src: "https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Jiyyalush.jpg"},
{name:"Ladywood",src: "https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Ladywood_1.png"},
  {name:"MissP" ,src: "https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Miss_P.png"},
  {name:"Naratisa",src:"https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Naratisa.png"},
  {name:"OpenTrip",src: "https://ik.imagekit.io/nwiq66cx3pvsy/Logo_Opentrip.jpg"},
  {name:"FloralQueen",src: "https://ik.imagekit.io/nwiq66cx3pvsy/Logo_The_Floral_Queen.jpg"},


];

const MerchantLogo = props => (
  <NavLink href={props.link}>
    <div className="merchant-preview-item-container d-flex justify-content-center align-items-center">
      <Image fluid src={props.src} alt={props.alt} />
    </div>
  </NavLink>
);

const MerchantCarousel = props => (
  <Row>
  <Col className={"merchant-preview-container " + props.className}>
    <div className="merchant-preview-title">Partner Kami</div>
    <Carousel
      className="merchant-preview-carousel carousel-5 d-none d-md-flex"
      interval={4000}
      controls={false}
      indicators={false}
    >
      {/* TODO: get images and testimonies from database */}
      {MERCHANT.map((e, i) =>
        <Carousel.Item key={i}>
          <Row className="merchant-preview-content" noGutters>
            {Array.from(Array(5), (e2, j) => {
              let merchant = MERCHANT[(i+j)%MERCHANT.length]
              return (
                <Col key={i + "-" + j}>
                  <MerchantLogo
                     link={"/partner"}
                    src={merchant.src}
                    alt={merchant.name}
                  />
                </Col>
              )
            })}
          </Row>
        </Carousel.Item>
      )}
    </Carousel>
    <Carousel
      className="merchant-preview-carousel carousel-4 d-xs-flex d-md-none"
      interval={2000}
      controls={false}
      indicators={false}
    >
      {/* TODO: get images and testimonies from database */}
      {MERCHANT.map((e, i) =>
        <Carousel.Item key={i}>
          <Row className="merchant-preview-content" noGutters>
            {Array.from(Array(4), (e2, j) => {
              let merchant = MERCHANT[(i+j)%MERCHANT.length]
              return (
                <Col key={i + "-" + j}>
                  <MerchantLogo
                    link="/partner"
                    src={merchant.src}
                    alt={merchant.name}
                  />
                </Col>
              )
            })}
          </Row>
        </Carousel.Item>
      )}
    </Carousel>
    {/* TODO: get merchant */}
  </Col>
  </Row>
);

export default MerchantCarousel;
