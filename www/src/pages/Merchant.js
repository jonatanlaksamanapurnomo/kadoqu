import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {Row,Col, Image} from "react-bootstrap";
import "./Career.css";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import IMAGES from "../data/images";
import gql from "graphql-tag";
import ProductItem from "../components/ProductItem";
import { Query, withApollo} from "react-apollo";
import ProductNotFoundNotice from "../components/ProductNotFoundNotice";

import "./Merchant.css";

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
  const id = props.id;

  const MerchantName ={
    Artink :"artink",
Aphrodite :"Aphrodite Crafts",
BandungBouquet :"Bouquet Bandung",
BRO : "Bro! Homemade Brownies",
Caia :"Caia Cakery",
Caramelt :"https://ik.imagekit.io/nwiq66cx3pvsy/badge-caramelt-patisserie.jpg",
Castella :"Castella Projects",
Cavelaid :"Cavela.id",
Comeliest :"Comeliest Scrapbook",
Edible :"https://ik.imagekit.io/nwiq66cx3pvsy/badge-edibelle-bouquet.jpg",
HomBaker : "Hombaker Bakery",
Ladywood :"Ladywood Floral",
MissP :"MissP Cookies",
Naratisa :"Naratisa Home Basic",
TheFloralQueen :"https://ik.imagekit.io/nwiq66cx3pvsy/badge-the-floral-queen.jpg",
Putriolvi : "by.putriolvi",
TinyTreats : "Tiny Treats",
Viflowers :"https://ik.imagekit.io/nwiq66cx3pvsy/badge-viflowerss.jpg",
Wallts :"Wallts Wallet Goods",
FloralQueen :"The Floral Queen",
OpenTrip :"Opentrip",
Jiyyalush :"Jiyyalush",
Jiwalu : "Jiwalu Creative",
IstanaBalon :"Istana Balloon",
IndoFlourish : "Indonesia Flourish",
HandmadeMemory : "HandmadeMemory"

  }
  const query = {
    query: QUERY_GET_PRODUCTSBYMERCHANT,
    variables: {
       merchant : `${MerchantName[id]}`
    }
  };
  return (
    <Query {...query}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (data.getProductsMerchant.length === 0) {
         return (

          <ProductNotFoundNotice/>

         );

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
              // console.log(productCategories);
              return (
                <Col xs={6} key={product.id}>
                  <ProductItem
                    details={{
                      id: product.id,
                      slug: product.slug,
                      merchant: product.merchant,
                      name: product.name,
                      photo: product.photos[0] ? product.photos[0].url : "",
                      price: product.price
                                        }}
                    query={query}
                    isMobile={props.isMobile}

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


class Merchant extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      banner: this.props.match.params.id,
      merchantname : "artnik"
    };
  }


  

  render() {

    const id = this.props.match.params.id;
   

    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          return (
            <React.Fragment>
              <Helmet>
                <title>Kadoqu.com | Merchant Page</title>
              </Helmet>
              <Image
                className="career-banner"
                fluid
                src={IMAGES.Merchant[id]}
                alt="Career Banner"
              />
       
              <div className="career-detail-desc-bg"></div>
              {isDesktop ? <div className="Produk-Popular"><p>Semua Produk</p><hr className="produk-line"/></div> :
                <div className="Produk-Popular-mob"><p>Semua Produk</p></div>  }
             
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
            </React.Fragment>
          );
        }}
      </MediaQuery>
    );
  }
}

export default withApollo(Merchant);
