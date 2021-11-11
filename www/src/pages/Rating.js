import React, { Fragment, Component } from "react";
import {
  Button,
  FormControl,
  Form,
  Row,
  Col,
  Container,
  Card
} from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import FileBase64 from "react-file-base64";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";
import uploadPhoto from "../library/uploadfoto";
import { PopUpRating } from "../components/SweetAlerts";
import showTransformationsPhoto from "../library/ShowImageTransformation";
import { LoadingAlert, CloseLoadingAlert } from "../components/Loader";

import "./Rating.css";

const QUERY_GET_USER_LAST_ORDER = gql`
  query getUserLastOrder {
    getUserLastOrder {
      id
    }
  }
`;

const QUERY_CHECK_RATING_BY_ORDER_ID = gql`
  query checkRatingByOrderId($orderId: String) {
    checkRatingByOrderId(orderId: $orderId)
  }
`;

const QUERY_GET_PRODUCTS_BY_ORDER_ID = gql`
  query getProductsByOrderId($id: String) {
    getProductsByOrderId(id: $id) {
      id
      name
      merchant
      photos {
        url
      }
    }
  }
`;

const MUTATION_ADD_RATING = gql`
  mutation addRating($input: RatingInput) {
    addRating(input: $input)
  }
`;

const MUTATION_ADD_RATING_PRODUCT = gql`
  mutation addRatingProduct($input: RatingProductInput) {
    addRatingProduct(input: $input)
  }
`;

const StarRating = props => (
  <Form.Group as={Row} className="rating-form-group">
    <Form.Label column xs={5} md={4} className="rating-form-label">
      {props.name}
    </Form.Label>
    <Col xs={7} md={8}>
      <StarRatings
        rating={props.rating}
        starRatedColor="#FFDF00"
        changeRating={e => props.changeRating(e)}
        starHoverColor="#FFDF00"
        numberOfStars={5}
        starDimension="2rem"
        starSpacing="5px"
      />
    </Col>
  </Form.Group>
);

const ProductRating = props => {
  const { id, name, photos, state, handleProductRating } = props;

  return (
    <Form>
      <img
        src={showTransformationsPhoto(200, 200, (photos[0] || {}).url)}
        alt={name}
      />
      <h3>{name}</h3>
      <StarRating
        name="Rating"
        rating={(state && state.rating) || 0}
        changeRating={e =>
          handleProductRating(id, {
            rating: e
          })
        }
      />
      Image
      <br />
      <div className="rating-upload-image">
        <FileBase64
          name="photo"
          accept="image/*"
          onDone={file => {
            if (file.type.startsWith("image/")) {
              handleProductRating(id, { image: file.base64 });
            }
          }}
        />
        {state && state.image && (
          <img src={state.image} alt="" className="w-50 mt-2" />
        )}
      </div>
      <Form.Group className="mt-4">
        <Form.Label className="rating-form-label">Deskripsi</Form.Label>
        <FormControl
          as="textarea"
          rows="3"
          onChange={e => {
            handleProductRating(id, {
              description: e.target.value
            });
          }}
        />
      </Form.Group>
    </Form>
  );
};

class Rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: props.match.params.id,
      speedCS: 0,
      service: 0,
      productQuality: 0,
      wrappingQuality: 0,
      productSafety: 0,
      productSatisfaction: 0,
      description: "",
      productRatings: {}
    };
  }

  componentWillMount() {
    const { match, client, history } = this.props;

    if (!match.params.id) {
      client
        .query({
          query: QUERY_GET_USER_LAST_ORDER
        })
        .then(({ data: { getUserLastOrder: { id } } }) => {
          this.setState({
            orderId: id
          });
          client
            .query({
              query: QUERY_CHECK_RATING_BY_ORDER_ID,
              variables: { orderId: id }
            })
            .then(({ data: { checkRatingByOrderId: res } }) => {
              if (res) {
                history.push("/");
              }
            });
        })
        .catch(() => history.push("/"));
    } else {
      client
        .query({
          query: QUERY_CHECK_RATING_BY_ORDER_ID,
          variables: { orderId: match.params.id }
        })
        .then(({ data: { checkRatingByOrderId: res } }) => {
          if (res) {
            history.push("/");
          }
        });
    }
  }

  handleProductRating = (id, value) => {
    const productRating = {
      [id]: Object.assign(this.state.productRatings[id] || {}, value)
    };
    this.setState({
      productRatings: Object.assign(this.state.productRatings, productRating)
    });
  };

  render() {
    return (
      <Fragment>
        <Container className="mt-5 mb-5">
          <Row>
            <Col xs={12} md={{ span: 8, offset: 2 }}>
              <Card>
                <Card.Body>
                  <h2 className="rating-title">
                    Thank you for your last order
                  </h2>
                  <p className="lead">Bantu GIdA meningkatkan pelayanan</p>{" "}
                  <Form>
                    <StarRating
                      name="Kecepatan"
                      rating={this.state.speedCS}
                      changeRating={e =>
                        this.setState({
                          speedCS: e
                        })
                      }
                    />
                    <StarRating
                      name="Service"
                      rating={this.state.service}
                      changeRating={e =>
                        this.setState({
                          service: e
                        })
                      }
                    />
                    <StarRating
                      name="Kualitas Produk"
                      rating={this.state.productQuality}
                      changeRating={e =>
                        this.setState({
                          productQuality: e
                        })
                      }
                    />
                    <StarRating
                      name="Kualitas Wrapping"
                      rating={this.state.wrappingQuality}
                      changeRating={e =>
                        this.setState({
                          wrappingQuality: e
                        })
                      }
                    />
                    <StarRating
                      name="Keamanan Produk"
                      rating={this.state.productSafety}
                      changeRating={e =>
                        this.setState({
                          productSafety: e
                        })
                      }
                    />
                    <StarRating
                      name="Kepuasan Produk Keseluruhan"
                      rating={this.state.productSatisfaction}
                      changeRating={e =>
                        this.setState({
                          productSatisfaction: e
                        })
                      }
                    />
                    <Form.Group className="mt-4">
                      <Form.Label className="rating-form-label">
                        Deskripsi
                      </Form.Label>
                      <FormControl
                        as="textarea"
                        rows="3"
                        onChange={e => {
                          this.setState({
                            description: e.target.value
                          });
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{ span: 8, offset: 2 }}>
              <Card>
                <Card.Body>
                  <h2 className="rating-title">Product Rating</h2>
                  <p className="lead">
                    Beritahu kepuasanmu mengenai barang yang GIdA berikan ya!
                  </p>
                  <Query
                    query={QUERY_GET_PRODUCTS_BY_ORDER_ID}
                    variables={{ id: this.state.orderId }}
                  >
                    {({ error, loading, data }) => {
                      if (error) return <p>{error.message}</p>;
                      if (loading) return <p>Loading...</p>;
                      const products = data.getProductsByOrderId;

                      return (
                        <Fragment>
                          {products.map(e => (
                            <ProductRating
                              id={e.id}
                              name={e.name}
                              photos={e.photos}
                              state={this.state.productRatings[e.id]}
                              handleProductRating={this.handleProductRating}
                            />
                          ))}
                          <div className="d-flex justify-content-center mt-5 product-rating">
                            <Button
                              className="kadoqu-primary-button w-50 rating-submit-button"
                              onClick={() => {
                                const { orderId, productRatings } = this.state;
                                const { client, history } = this.props;

                                LoadingAlert("Loading...");
                                let promises = [];
                                promises.push(
                                  client.mutate({
                                    mutation: MUTATION_ADD_RATING,
                                    variables: {
                                      input: {
                                        orderId: this.state.orderId,
                                        speedCS: this.state.speedCS,
                                        service: this.state.service,
                                        productQuality: this.state
                                          .productQuality,
                                        wrappingQuality: this.state
                                          .wrappingQuality,
                                        productSafety: this.state.productSafety,
                                        productSatisfaction: this.state
                                          .productSatisfaction,
                                        description: this.state.description
                                      }
                                    }
                                  })
                                );
                                Object.entries(productRatings).forEach(
                                  (
                                    [key, { rating, image, description }],
                                    idx
                                  ) => {
                                    const fileName = [
                                      ~~(Date.now() / 1000),
                                      "rating-products",
                                      this.state.orderId,
                                      idx
                                    ].join("_");

                                    promises.push(
                                      client
                                        .mutate({
                                          mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                                          variables: { filename: fileName }
                                        })
                                        .then(({ data }) =>
                                          uploadPhoto(
                                            data.createUploadToken.hash,
                                            image.split(",")[1],
                                            fileName,
                                            data.createUploadToken.timestamp,
                                            "rating_products"
                                          ).then(url => {
                                            client.mutate({
                                              mutation: MUTATION_ADD_RATING_PRODUCT,
                                              variables: {
                                                input: {
                                                  orderId: orderId,
                                                  productId: key,
                                                  rating: rating,
                                                  image: url,
                                                  description: description
                                                }
                                              }
                                            });
                                          })
                                        )
                                    );
                                  }
                                );

                                Promise.all(promises)
                                  .then(() => {
                                    CloseLoadingAlert();
                                    PopUpRating(() => {
                                      history.push("/");
                                      document.body.scrollTop = 0;
                                      document.documentElement.scrollTop = 0;
                                    });
                                  })
                                  .catch(e => console.log(e));
                              }}
                            >
                              Submit
                            </Button>
                          </div>
                        </Fragment>
                      );
                    }}
                  </Query>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default withApollo(Rating);
