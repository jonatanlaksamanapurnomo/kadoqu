import React, { Component } from "react";

import { Form, Button, Image, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import { MUTATION_ADD_CART_ITEM, QUERY_GET_CART } from "../gql/cart";
import format from "date-fns/format";
import { PhotosUploader } from "../components/PhotosUploader";
import { withApollo } from "react-apollo";
import { QUERY_GET_PRODUCT_BY_SLUG } from "../gql/product";
import uuid from "react-uuid";
import Swal from "sweetalert2";
import ProductItem from "../components/ProductItem";

import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./MagicalMoment.css";


class MagicalMomentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: {},
      magicalMomentData: {
        name: "",
        perayaan: "",
        venueAcara: "",
        temaAcara: "",
        waktuAcara: new Date(),
        photos: []
      }
    };
  }

  componentDidMount() {
    let { slug } = this.props.match.params;
    this.props.client.query({
      query: QUERY_GET_PRODUCT_BY_SLUG,
      variables: {
        slug: slug
      }
    }).then(({ data: { getProductBySlug } }) => {
      this.setState({
        productData: getProductBySlug
      });
    });
  }

  setMagicalMomentData(newData) {
    this.setState({
      magicalMomenData: Object.assign(this.state.magicalMomentData, newData)
    });
  }

  addToCart() {
    let { productData } = this.state;
    let cartItem = {
      idProduct: productData.id,
      slug: productData.slug,
      quantity: 1,
      productName: productData.name,
      merchant: productData.merchant,
      price: productData.price,
      capitalPrice: productData.capitalPrice,
      discountPrice: productData.discountPrice,
      image: productData.photos[0].url,
      weight: productData.weight,
      length: productData.length,
      width: productData.width,
      height: productData.height,
      categories: productData.categories,
      storeCategories: productData.storeCategories,
      shippingSupports: productData.shippingSupports,
      date: null,
      day: null,
      isiUcapan: "",
      photos: null,
      customerNotes: "",
      customeColor: "",
      isCustomeOrder: true,
      customeOrderId: uuid()
    };

    cartItem = Object.assign(cartItem, { magicalMomentData: this.state.magicalMomenData });
    cartItem = Object.assign(cartItem, { photos: { image: this.state.magicalMomentData.photos } });
    this.props.client.mutate({
      mutation: MUTATION_ADD_CART_ITEM,
      variables: cartItem,
      refetchQueries: QUERY_GET_CART
    }).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your edit has been saved Please Wait We Processing it",
        showConfirmButton: false,
        timer: 2500
      }).then(() => this.props.history.push("/cart"));
    });
  }

  render() {
    let { productData } = this.state;
    return (
       <MediaQuery minWidth={MIN_DESKTOP_SIZE}>

        {isDesktop => {

          const isMobile = !isDesktop;
          return (

            <div
              className={isMobile ? "MM-form-container-mob" : "MM-form-container"}>
              <Row className={isMobile ? "" : "row-mm"}>
                <Col xl={10} md={10} xs={4} className="row-mm">
                  <div className="MM-Form">
                    <Image
                      className="kids-party-banner"
                      fluid
                      src="https://ik.imagekit.io/nwiq66cx3pvsy/MM-Form-Banner.jpg"
                      alt="Gallery Banner"
                    />
                    <Form className="login-form" onSubmit={(e) => {
                      e.preventDefault();
                      //call this func
                      this.addToCart();

                    }}>
                      <p
                        className={isMobile ? "MM-info-mob" : "MM-info"}>Sebelum
                        book Magical Moment, silahkan isi informasi dibawah
                        ini</p>
                      <Form.Group>
                        <Form.Label> <span
                          className="form-label-mm">Nama </span> <span
                          className="note-mm">(Mr & Ms/Mrs untuk dinner atau nama anak untuk dekor anak )</span></Form.Label>
                        <Form.Control onChange={(e) => {
                          this.setMagicalMomentData({ name: e.target.value });
                        }} type="text"/>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label> <span
                          className="form-label-mm">Perayaan</span></Form.Label>
                        <Form.Control onChange={(e) => {
                          this.setMagicalMomentData({ perayaan: e.target.value });
                        }} type="text"/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> <span
                          className="form-label-mm">Venue Acara</span></Form.Label>
                        <Form.Control onChange={e => {
                          this.setMagicalMomentData({ venueAcara: e.target.value });
                        }} type="text"/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> <span
                          className="form-label-mm">Tema Acara </span><span
                          className="note-mm">(Tema acara hanya untuk produk dekor anak)</span></Form.Label>
                        <Form.Control onChange={e => {
                          this.setMagicalMomentData({ temaAcara: e.target.value });
                        }} type="text"/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> <span className="form-label-mm">Tanggal & Jam Acara</span></Form.Label>
                        <br/>
                        <DatePicker
                          selected={new Date()}
                          minDate={new Date()}
                          dateFormat="yyyy/MM/dd"
                          onDone={(e) => {
                            this.setMagicalMomentData({ waktuAcara: format(e, "yyyy/MM/dd") });
                          }}
                          showPopperArrow={false}/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> <span
                          className="form-label-mm">Upload Foto</span></Form.Label>
                        <br/>

                        <PhotosUploader
                          photos={this.state.magicalMomentData.photos}
                          handlePhotos={photos => {
                            let newPhotos = this.state.magicalMomentData.photos;
                            const inputPhotos = [];
                            photos.forEach(photo => {
                              if (photo.type.startsWith("image/")) {
                                inputPhotos.push(photo.base64);
                              }
                            });
                            newPhotos = newPhotos.concat(inputPhotos);
                            this.setMagicalMomentData({ photos: newPhotos });
                          }}
                          removePhoto={index => {
                            const newPhotos = this.state.magicalMomentData.photos;
                            newPhotos.splice(index, 1);
                            this.setMagicalMomentData({ photos: newPhotos });
                          }}/>
                      </Form.Group>
                      <Button
                        className={isMobile ? "mt-3 kadoqu-primary-button login-button mm-form-button-mob" : "mt-3 kadoqu-primary-button login-button mm-form-button"}
                        type="submit">
                        BOOK NOW
                      </Button>
                      <br/>
                    </Form>
                  </div>
                </Col>
                <Col className={isMobile ? "row-mm-2-mob" : "row-mm-2"} xs={12}
                     md={2}>
                  <h6> Pesanan Anda : </h6>
                  <ProductItem
                    details={{
                      id: productData.id,
                      slug: productData.slug,
                      merchant: productData.merchant,
                      name: productData.name,
                      photo: productData.photos ? productData.photos[0].url : "https://giphy.com/gifs/foosball-y1ZBcOGOOtlpC",
                      price: parseInt(productData.price)
                    }}/>

                </Col>
              </Row>
            </div>

          );
        }}
      </MediaQuery>
    );
  }}


export default withApollo(MagicalMomentForm);
