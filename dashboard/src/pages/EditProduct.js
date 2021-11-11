import React, { Component } from "react";
import { Alert, Tab, Tabs } from "react-bootstrap";
import { withApollo, Query } from "react-apollo";
import Swal from "sweetalert2";
import {
  QUERY_GET_PRODUCT,
  MUTATION_DELETE_PRODUCT,
  QUERY_GET_PRODUCTS
} from "../gql/product";
import { MUTATION_DELETE_PHOTO } from "../gql/photo";
import { QUERY_GET_REJECTED_PRODUCT_REVIEW } from "../gql/product-review";
import { getUserName, isAdmin, isMerchant } from "../utils/userChecker";
import EditProductBasicDetailFragment from "../components/EditProductBasicDetailFragment";
import EditProductCategoryFragment from "../components/EditProductCategoryFragment";
import EditProductPhotoFragment from "../components/EditProductPhotoFragment";
import EditProductColorFragment from "../components/EditProductColorFragment";
import EditProductScoreFragment from "../components/EditProductScoreFragment";
import Toast from "../components/Toast";

import "./EditProduct.css";
import { getMerchantCategory } from "../utils/userChecker";

class EditProduct extends Component {
  state = {
    alert: {
      message: "",
      variant: undefined
    }
  };
  componentDidMount = () => {
    this.props.client
      .query({
        query: QUERY_GET_PRODUCT,
        variables: {
          id: this.props.match.params.id
        }
      })
      .then(({ data }) => {
        if (!data) return this.props.history.push("/404");
        const { merchant, isEnable } = data.getProduct;
        if (!isAdmin() && (isEnable || merchant !== getUserName())) {
          // return this.props.history.push("/404");
        }
      })
      .catch(error => {
        if (
          error.message === "GraphQL error: No data returned from the query."
        ) {
          return this.props.history.push("/404");
        }
        console.log(error.message);
      });
  };

  setAlert = ({ message, variant }) => {
    this.setState(
      {
        alert: {
          message: message,
          variant: variant
        }
      },
      () => window.scrollTo(0, 0)
    );
  };
  resetAlert = () => {
    this.setState({
      alert: {
        message: "",
        variant: undefined
      }
    });
  };

  render() {
    const productId = this.props.match.params.id;
    const query = {
      query: QUERY_GET_PRODUCT,
      variables: {
        id: productId
      }
    };
    return (
      <Query {...query} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading ...</p>;
          }
          if (error) {
            return <p>{error.message || error}</p>;
          }
          const productDetail = data.getProduct;
          return (
            <div className="mb-3">
              <Alert
                show={this.state.alert.message !== ""}
                variant={this.state.alert.variant}
                onClose={this.resetAlert}
                dismissible
              >
                {this.state.alert.message}
              </Alert>
              <div className="d-flex justify-content-between">
                <h4 className="d-inline-block">
                  <i
                    className="fa fa-chevron-left mr-3 cursor-pointer"
                    onClick={() => this.props.history.goBack()}
                  />
                  Edit <strong>{data.getProduct.name}</strong>
                </h4>
                <h3>
                  <i
                    className="fa fa-trash text-danger cursor-pointer"
                    onClick={() => {
                      Swal.fire({
                        title: `Delete ${data.getProduct.name}?`,
                        text: "You won't be able to revert this!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes!"
                      }).then(result => {
                        if (result.value) {
                          const { photos } = data.getProduct;
                          let promises = [
                            photos.forEach(item => {
                              this.props.client.mutate({
                                mutation: MUTATION_DELETE_PHOTO,
                                variables: {
                                  productId: productId,
                                  url: item.url
                                }
                              });
                            }),
                            this.props.client.mutate({
                              mutation: MUTATION_DELETE_PRODUCT,
                              variables: {
                                id: productId
                              },
                              refetchQueries: [{ query: QUERY_GET_PRODUCTS }]
                            })
                          ];
                          Promise.all(promises)
                            .then(() => {
                              Toast.fire({
                                type: "success",
                                title: `${data.getProduct.name} has been deleted`
                              });
                              this.props.history.push("/products");
                            })
                            .catch(error =>
                              Toast.fire({
                                type: "error",
                                title: `${error.message || error}`
                              })
                            );
                        }
                      });
                    }}
                  />
                </h3>
              </div>
              <Tabs defaultActiveKey={0} id="uncontrolled-tab">
                <Tab eventKey={0} title="Basic Details">
                  <EditProductBasicDetailFragment
                    productId={productId}
                    productDetail={productDetail}
                    setAlert={this.setAlert}
                    query={query}
                    toast={Toast}
                  />
                </Tab>
                {(getMerchantCategory().name === "Holiday" ||
                  getMerchantCategory().name === "Gift" ||
                  isAdmin()) && (
                  <Tab eventKey={1} title="Categories">
                    <EditProductCategoryFragment
                      productId={productId}
                      productDetail={productDetail}
                      setAlert={this.setAlert}
                      toast={Toast}
                    />
                  </Tab>
                )}
                <Tab eventKey={2} title="Photos">
                  <EditProductPhotoFragment
                    productId={productId}
                    productDetail={productDetail}
                    setAlert={this.setAlert}
                    query={query}
                    toast={Toast}
                  />
                </Tab>
                <Tab eventKey={3} title="Colors">
                  <EditProductColorFragment
                    productId={productId}
                    productDetail={productDetail}
                    setAlert={this.setAlert}
                    query={query}
                    toast={Toast}
                  />
                </Tab>
                <Tab eventKey={4} title="Score">
                  <EditProductScoreFragment
                    productId={productId}
                    productDetail={productDetail}
                    setAlert={this.setAlert}
                    query={query}
                    toast={Toast}
                  />
                </Tab>
                {/* {(getMerchantCategory().name === "Holiday" || isAdmin()) && (
                  <Tab eventKey={5} title="Date">
                    <EditProductHolidayDate
                      productId={productId}
                      productDetail={productDetail}
                      setAlert={this.setAlert}
                      query={query}
                      toast={Toast}
                    />
                  </Tab>
                )} */}
              </Tabs>
              {isMerchant() && (
                <Query
                  query={QUERY_GET_REJECTED_PRODUCT_REVIEW}
                  variables={{ productId }}
                >
                  {({ loading, error, data }) =>
                    !loading &&
                    !error &&
                    data.getRejectedProductReview.rejectionMessage !== "" && (
                      <div className="edit-product-rejection-message">
                        <strong className="d-block">
                          This product got rejected because:
                        </strong>
                        {data.getRejectedProductReview.rejectionMessage}
                      </div>
                    )
                  }
                </Query>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(EditProduct);
