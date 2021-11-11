import React from "react";
import Swal from "sweetalert2";
import { Query, withApollo } from "react-apollo";
import {
  Button,
  Col,
  Container,
  Overlay,
  Popover,
  Row,
  Badge
} from "react-bootstrap";
import Toast from "../components/Toast";
import {
  QUERY_GET_GROUPED_PRODUCT_REVIEWS,
  QUERY_GET_PRODUCT_REVIEWS_BY_MERCHANT,
  MUTATION_UPDATE_PRODUCT_REVIEW,
  MUTATION_DELETE_PRODUCT_REVIEW,
  MUTATION_SET_PRODUCT_REVIEWS_STATUS
} from "../gql/product-review";
import { QUERY_GET_PRODUCTS, MUTATION_EDIT_PRODUCT } from "../gql/product";
import { numericToCurrency } from "../utils/formatter";
import showTransformationsPhoto from "../library/showTransformationsPhoto";
import "./ProductReview.css";
import {MUTATION_ADD_DOCUMENT} from "../gql/elasticsearch";

class ProductReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMerchant: null,
      activeProduct: null,
      reviews: {},
      showStates: new Set()
    };
    this.target = {};
  }

  setActiveMerchant = merchant => {
    this.setState({
      activeMerchant: merchant,
      activeProduct: null
    });
    this.resetReview();
  };
  setActiveProduct = product => {
    this.setState({
      activeProduct: product
    });
    this.resetReview();
  };
  removeRejectionReason = field => {
    let { reviews } = this.state;
    delete reviews[field];
    this.setState({ reviews: reviews });
  };
  submitRejectionReason = (field, reason = "") => {
    let { reviews } = this.state;
    if (reason.length === 0) {
      this.removeRejectionReason(field);
      return;
    }
    reviews[field] = reason;
    this.setState({ reviews: reviews });
  };
  resetReview = () => {
    this.setState({ reviews: {}, showStates: new Set() });
  };
  ReviewElement = props => {
    const { children, sectionName } = props;
    const { showStates, reviews } = this.state;
    const submit = e => this.submitRejectionReason(sectionName, e.target.value);
    const handleOnClick = () => {
      let shows = this.state.showStates;
      if (showStates.has(sectionName)) {
        shows.delete(sectionName);
      } else {
        shows.add(sectionName);
      }
      this.setState({
        showStates: shows
      });
    };
    return (
      <React.Fragment>
        <div
          onClick={handleOnClick}
          ref={ref => (this.target[sectionName] = ref)}
          className="product-review-element"
        >
          {children}
        </div>
        <Overlay
          show={showStates.has(sectionName)}
          target={this.target[sectionName]}
          placement="left"
        >
          <Popover
            id={"product-review-popover-" + sectionName.toLowerCase()}
            className="product-review-popover"
          >
            <form
              onSubmit={e => {
                e.preventDefault();
                e.target.reason.blur();
              }}
            >
              <input
                name="reason"
                placeholder="Rejection reason"
                defaultValue={reviews[sectionName] || ""}
                onBlur={submit}
              />
            </form>
          </Popover>
        </Overlay>
      </React.Fragment>
    );
  };
  reject = ({ id, rejectionMessage }) => {
    const { reviews, showStates, activeMerchant } = this.state;
    const defaultInputValue =
      Object.keys(reviews).length === 0
        ? rejectionMessage || ""
        : Object.entries(reviews)
            .map(([field, reason]) =>
              showStates.has(field) ? `${field}: ${reason}` : null
            )
            .filter(el => el !== null)
            .join("\n");
    Swal.fire({
      customClass: {
        input: "small"
      },
      title: "Rejecting...",
      text: "Why do you reject this product?",
      input: "textarea",
      inputValue: defaultInputValue,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#f86c6b"
    }).then(res => {
      if (res.dismiss) return;
      const { client } = this.props;
      client
        .mutate({
          mutation: MUTATION_UPDATE_PRODUCT_REVIEW,
          variables: {
            id: id,
            rejectionMessage: res.value
          },
          refetchQueries: [
            {
              query: QUERY_GET_PRODUCT_REVIEWS_BY_MERCHANT,
              variables: {
                merchantId: activeMerchant
              }
            }
          ]
        })
        .then(() => {
          Toast.fire({ type: "success", title: "Rejection message sent" });
          this.resetReview();
        })
        .catch(error =>
          Toast.fire({ type: "error", title: error.message || error })
        );
    });
  };
  approve = ({ id, product }, enable = false) => {
    const { client } = this.props;
    const { activeMerchant } = this.state;
    const refetchQueries = [
      {
        query: QUERY_GET_GROUPED_PRODUCT_REVIEWS
      },
      {
        query: QUERY_GET_PRODUCT_REVIEWS_BY_MERCHANT,
        variables: {
          merchantId: activeMerchant
        }
      }
    ];
    let promises = [
      client.mutate({
        mutation: MUTATION_DELETE_PRODUCT_REVIEW,
        variables: {
          id: id
        },
        refetchQueries
      })
    ];
    if (enable) {
      promises.push(
        client.mutate({
          mutation: MUTATION_EDIT_PRODUCT,
          variables: {
            id: product.id,
            edits: {
              isEnable: true
            }
          },
          refetchQueries: [{ query: QUERY_GET_PRODUCTS }]
        })
      );
      promises.push(
        client.mutate({
          mutation:MUTATION_ADD_DOCUMENT,
          variables:{
            data:[product]
          }
        })
      );
    }
    Promise.all(promises)
      .then(() => {
        Toast.fire({
          type: "success",
          title:
            product.name + " has been approved" + (enable ? " and enabled" : "")
        });
        this.setActiveMerchant(null);
      })
      .catch(error =>
        Toast.fire({ type: "error", title: error.message || error })
      );
  };

  render() {
    const { activeMerchant, activeProduct } = this.state;
    return (
      <div className="bg-white">
        <h2>Product Review</h2>
        <Query query={QUERY_GET_GROUPED_PRODUCT_REVIEWS}>
          {({ loading, error, data }) =>
            loading ? (
              "Loading..."
            ) : error ? (
              error.message
            ) : (
              <div className="product-review-merchants">
                {data.getProductReviewsGroupedByMerchant.map(
                  ({ count, merchant: { id, name, photo } }) => (
                    <div
                      key={id}
                      className="product-review-merchant-box"
                      onClick={() => this.setActiveMerchant(id)}
                    >
                      <img
                        src={showTransformationsPhoto(500, 500, photo)}
                        alt=""
                        className="mr-1"
                      />
                      {name}
                      <Badge pill variant="danger" className="ml-1">
                        {count}
                      </Badge>
                    </div>
                  )
                )}
              </div>
            )
          }
        </Query>
        {activeMerchant && (
          <Query
            query={QUERY_GET_PRODUCT_REVIEWS_BY_MERCHANT}
            variables={{ merchantId: activeMerchant }}
          >
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return error.message;
              const reviewData = data.getProductReviewsByMerchant;
              const selectedData = reviewData.find(
                data => data.productId === activeProduct
              ) || { product: {} };
              const {
                id,
                name,
                merchant,
                merchantPrice,
                price,
                photos,
                shortDescription,
                longDescription,
                shipmentDescription,
                merchantDiscount,
                merchantDiscountUntil,
                isPo,
                stock,
                weight,
                length,
                width,
                height,
                categories,
                storeCategories,
                colors,
                shippingSupports
              } = selectedData.product;
              return (
                <Container fluid className="product-review-container">
                  <Row>
                    {activeMerchant && (
                      <Col xs={8} className="bg-light text-muted py-3">
                        {reviewData.map(
                          ({ product, rejectionMessage, isReviewed }) => (
                            <div
                              key={product.id}
                              className={
                                "mb-3 " +
                                (rejectionMessage ? "text-success " : "") +
                                (activeProduct !== product.id
                                  ? "cursor-pointer"
                                  : "font-weight-bold text-dark")
                              }
                              onClick={() => this.setActiveProduct(product.id)}
                            >
                              <p
                                className={
                                  isReviewed ? "text-success" : "text-danger"
                                }
                              >
                                {product.name}
                              </p>
                            </div>
                          )
                        )}
                      </Col>
                    )}

                    {activeProduct && reviewData && (
                      <Col>
                        <div className=" mb-2">
                            <Row>
                              {isPo && (
                                <Col xs={12} className="m-auto">
                                  <this.ReviewElement sectionName="PO">
                                    <span className="bg-info">PO</span>
                                  </this.ReviewElement>
                                </Col>
                              )}
                              <Col xs={12}>
                                <h3 className="mb-0">{name}</h3>
                                <div className="small">by {merchant}</div>
                              </Col>
                            </Row>
                          <Row  className="prod-review-mob">
                          <div>
                            <Button
                              variant="success"
                              className="mr-1"
                              onClick={() => this.approve(selectedData, true)}
                            >
                              <i className="fa fa-upload" /> Accept & Enable
                            </Button>
                            <Button
                              variant="warning"
                              className="mr-1"
                              onClick={() => this.approve(selectedData)}
                            >
                              <i className="fa fa-check" /> Accept
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                this.props.client
                                  .mutate({
                                    mutation: MUTATION_SET_PRODUCT_REVIEWS_STATUS,
                                    variables: {
                                      status: true,
                                      productId: id
                                    }
                                  })
                                  .then(() => {
                                    this.reject(selectedData);
                                  });
                              }}
                            >
                              <i className="fa fa-level-down" /> Reject
                            </Button>

                          </div>
                          </Row>
                        </div>
                        <this.ReviewElement sectionName="photos">
                          {photos.length === 0 ? (
                            <span className="product-review-no-data">
                              No photo uploaded
                            </span>
                          ) : (
                            <div className="product-review-photos">
                              {photos.map(({ url }, index) => (
                                <img
                                  key={index}
                                  src={showTransformationsPhoto(500, 500, url)}
                                  alt=""
                                />
                              ))}
                            </div>
                          )}
                        </this.ReviewElement>
                        <div className="mt-4">
                          <this.ReviewElement sectionName="short description">
                            <React.Fragment>
                              <div className="product-review-field-name">
                                <span>Short description</span>
                                <span>:</span>
                              </div>
                              {shortDescription}
                            </React.Fragment>
                          </this.ReviewElement>
                          <this.ReviewElement sectionName="long description">
                            <React.Fragment>
                              <div className="product-review-field-name">
                                <span>Long description</span>
                                <span>:</span>
                              </div>
                              {longDescription}
                            </React.Fragment>
                          </this.ReviewElement>
                        </div>
                        <Row className="mt-4">
                          <Col>
                            <this.ReviewElement sectionName="stock">
                              <React.Fragment>
                                <div className="product-review-field-name">
                                  <span>Stock</span>
                                  <span>:</span>
                                </div>
                                {stock}
                              </React.Fragment>
                            </this.ReviewElement>
                            <this.ReviewElement sectionName="merchant price">
                              <React.Fragment>
                                <div className="product-review-field-name">
                                  <span>Merchant Price</span>
                                  <span>:</span>
                                </div>
                                Rp{numericToCurrency(merchantPrice)}
                              </React.Fragment>
                            </this.ReviewElement>
                            <this.ReviewElement sectionName="price">
                              <React.Fragment>
                                <div className="product-review-field-name">
                                  <span>Price</span>
                                  <span>:</span>
                                </div>
                                Rp{numericToCurrency(price)}
                              </React.Fragment>
                            </this.ReviewElement>
                            <this.ReviewElement sectionName="discounted price">
                              <React.Fragment>
                                <div className="product-review-field-name">
                                  <span>Discounted price</span>
                                  <span>:</span>
                                </div>
                                {!merchantDiscount
                                  ? "-"
                                  : `Rp${numericToCurrency(
                                      merchantDiscount
                                    )} until ${new Date(
                                      merchantDiscountUntil
                                    ).toLocaleDateString("id-ID", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric"
                                    })}`}
                              </React.Fragment>
                            </this.ReviewElement>
                          </Col>
                          <Col>
                            <this.ReviewElement sectionName="dimension">
                              <React.Fragment>
                                <div className="product-review-field-name">
                                  <span>Dimension</span>
                                  <span>:</span>
                                </div>
                                {length}cm x {width}cm x {height}cm
                              </React.Fragment>
                            </this.ReviewElement>
                            <this.ReviewElement sectionName="weight">
                              <React.Fragment>
                                <div className="product-review-field-name">
                                  <span>Weight</span>
                                  <span>:</span>
                                </div>
                                {weight} gram
                              </React.Fragment>
                            </this.ReviewElement>
                          </Col>
                        </Row>
                        <div className="mt-4">
                          <this.ReviewElement sectionName="shipping method">
                            <React.Fragment>
                              <div className="product-review-field-name">
                                <span>Shipping method</span>
                                <span>:</span>
                              </div>
                              {storeCategories.length === 0 ? (
                                <span className="product-review-no-data">
                                  No shipping support registered
                                </span>
                              ) : (
                                shippingSupports
                                  .map(({ name }) => name)
                                  .join(", ")
                              )}
                            </React.Fragment>
                          </this.ReviewElement>
                          <this.ReviewElement sectionName="shipment description">
                            <React.Fragment>
                              <div className="product-review-field-name">
                                <span>Description</span>
                                <span>:</span>
                              </div>
                              {shipmentDescription}
                            </React.Fragment>
                          </this.ReviewElement>
                        </div>
                        <div className="mt-4">
                          <this.ReviewElement sectionName="gift category">
                            <React.Fragment>
                              <div className="product-review-field-name">
                                <span>Gift category</span>
                                <span>:</span>
                              </div>
                              {storeCategories.length === 0 ? (
                                <span className="product-review-no-data">
                                  No gift category registered
                                </span>
                              ) : (
                                categories.map(({ name }) => name).join(", ")
                              )}
                            </React.Fragment>
                          </this.ReviewElement>
                          <this.ReviewElement sectionName="store category">
                            <React.Fragment>
                              <div className="product-review-field-name">
                                <span>Store category</span>
                                <span>:</span>
                              </div>
                              {storeCategories.length === 0 ? (
                                <span className="product-review-no-data">
                                  No store category registered
                                </span>
                              ) : (
                                storeCategories
                                  .map(({ name }) => name)
                                  .join(", ")
                              )}
                            </React.Fragment>
                          </this.ReviewElement>
                          <this.ReviewElement sectionName="color">
                            <React.Fragment>
                              <div className="product-review-field-name">
                                <span>Color</span>
                                <span>:</span>
                              </div>
                              {storeCategories.length === 0 ? (
                                <span className="product-review-no-data">
                                  No color registered
                                </span>
                              ) : (
                                colors.map(({ name }) => (
                                  <div
                                    key={name}
                                    className="product-review-color-box"
                                    style={{ background: name }}
                                  />
                                ))
                              )}
                            </React.Fragment>
                          </this.ReviewElement>
                        </div>
                      </Col>
                    )}
                  </Row>
                </Container>
              );
            }}
          </Query>
        )}
      </div>
    );
  }
}

export default withApollo(ProductReview);
