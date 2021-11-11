import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { PhotosUploader } from "./FormComponents";

import uploadPhoto from "../library/uploadfoto";
import {
  MUTATION_ADD_PRODUCT_GIFT_CATEGORY,
  MUTATION_ADD_PRODUCT_STORE_CATEGORY
} from "../gql/product-category";
import { MUTATION_PHOTO_UPLOAD_TOKEN, MUTATION_ADD_PHOTO } from "../gql/photo";
import { MUTATION_ADD_PRODUCT_COLOR } from "../gql/color";
import { MUTATION_ADD_PRODUCT_REVIEW } from "../gql/product-review";
import { LoadingAlert, CloseLoadingAlert } from "../components/Loader";
import { QUERY_GET_PRODUCT } from "../gql/product";
import { getUserName, isAdmin } from "../utils/userChecker";
import { QUERY_GET_PRODUCTS } from "../gql/product";
import { MUTATION_ADD_PRODUCT_HOLIDAY_CATEGORIES } from "../gql/holiday-category";
import { getMerchantCategory } from "../utils/userChecker";

const QUERY_GET_CATEGORIES = gql`
  query getParentCategories {
    getParentCategories {
      name
    }
  }
`;

const QUERY_GET_SUBCATEGORIES = gql`
  query getSubCategories($parentName: String) {
    getSubCategories(parentName: $parentName) {
      name
    }
  }
`;

const QUERY_GET_STORE_CATEGORIES = gql`
  query getStoreCategories {
    getStoreCategories {
      name
    }
  }
`;

class AddProductSecondForm extends React.Component {
  state = {
    productName: "",
    giftCategoriesChoice: [],
    storeCategoriesChoice: [],
    getMerchantCategory: getMerchantCategory().name,
    formData: {
      giftCategories: new Set(),
      giftSubCategories: {},
      storeCategories: new Set(),
      colors: new Set(),
      photos: [],
      holidayCategories: new Set()
    }
  };
  componentDidMount = () => {
    const { client, productId } = this.props;
    client
      .query({
        query: QUERY_GET_PRODUCT,
        variables: { id: productId }
      })
      .then(({ data: { getProduct } }) => {
        if (!getProduct) return;
        this.setState({ productName: getProduct.name });
      });

    client
      .query({
        query: QUERY_GET_CATEGORIES
      })
      .then(({ data: { getParentCategories } }) => {
        if (!getParentCategories) return;
        this.setState({
          giftCategoriesChoice: getParentCategories.map(
            category => category.name
          )
        });
      });

    client
      .query({
        query: QUERY_GET_STORE_CATEGORIES
      })
      .then(({ data: { getStoreCategories } }) => {
        if (!getStoreCategories) return;
        this.setState({
          storeCategoriesChoice: getStoreCategories.map(
            category => category.name
          )
        });
      });
  };

  render() {
    const onClickCheckboxes = (formNode, changedChoice, isChecked) => {
      let newData = this.state.formData;
      if (isChecked) {
        newData[formNode].add(changedChoice);
      } else {
        newData[formNode].delete(changedChoice);
      }
      this.setState({ formData: newData });
    };
    if (!this.state.productName) {
      return "Product ID not exist!";
    }
    return (
      <div className="add-product-form">
        <Form
          action=""
          onSubmit={e => {
            e.preventDefault();
            LoadingAlert("Adding " + this.state.productName + "..");
            let { giftSubCategories, ...input } = this.state.formData;
            Object.keys(input).forEach(key => {
              if (!Array.isArray(input[key])) {
                input[key] = Array.from(input[key]);
              }
            });
            Object.keys(giftSubCategories).forEach(key => {
              input.giftCategories = [].concat(
                input.giftCategories,
                giftSubCategories[key]
              );
            });

            const { client, productId } = this.props;
            let photoPromises = [];
            let promises = [];
            input.photos.forEach((photoBase64, idx) => {
              const fileName =
                ~~(Date.now() / 1000) +
                "_" +
                idx +
                "_" +
                this.state.productName
                  .toLowerCase()
                  .replace(/\s/g, "X")
                  .replace(/\W/g, "")
                  .replace(/[X]/g, "-");
              photoPromises.push(
                client
                  .mutate({
                    mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                    variables: { filename: fileName }
                  })
                  .then(({ data }) =>
                    uploadPhoto(
                      data.createUploadToken.hash,
                      photoBase64.split(",")[1],
                      fileName,
                      data.createUploadToken.timestamp
                    ).then(photoUrl =>
                      promises.push(
                        client.mutate({
                          mutation: MUTATION_ADD_PHOTO,
                          variables: {
                            productId: productId,
                            productName: this.state.productName,
                            url: photoUrl
                          }
                        })
                      )
                    )
                  )
              );
            });
            input.colors.forEach(color => {
              promises.push(
                client.mutate({
                  mutation: MUTATION_ADD_PRODUCT_COLOR,
                  variables: {
                    productId: productId,
                    color: color
                  }
                })
              );
            });
            input.giftCategories.forEach(category => {
              promises.push(
                client.mutate({
                  mutation: MUTATION_ADD_PRODUCT_GIFT_CATEGORY,
                  variables: {
                    productId: productId,
                    category: category
                  }
                })
              );
            });
            input.storeCategories.forEach(category => {
              promises.push(
                client.mutate({
                  mutation: MUTATION_ADD_PRODUCT_STORE_CATEGORY,
                  variables: {
                    productId: productId,
                    category: category
                  }
                })
              );
            });
            input.holidayCategories.forEach(category => {
              promises.push(
                client.mutate({
                  mutation: MUTATION_ADD_PRODUCT_HOLIDAY_CATEGORIES,
                  variables: {
                    productId: productId,
                    name: category
                  }
                })
              );
            });

            promises.push(
              client.mutate({
                mutation: MUTATION_ADD_PRODUCT_REVIEW,
                variables: {
                  productId: productId
                },
                refetchQueries: [
                  isAdmin()
                    ? { query: QUERY_GET_PRODUCTS }
                    : {
                      query: QUERY_GET_PRODUCTS,
                      variables: {
                        merchant: getUserName()
                      }
                    }
                ]
              })
            );
            Promise.all(photoPromises)
              .then(() => {
                Promise.all(promises)
                  .then(() => {
                    this.setState(
                      {
                        isLoading: false
                      },
                      CloseLoadingAlert()
                    );
                    this.props.navigateToThirdForm(productId);
                  })
                  .catch(error => console.log(error));
              })
              .catch(error => console.log(error));
          }}
          className="form-horizontal"
        >
          <Card>
            <CardHeader>
              <h3>{this.state.productName}</h3>
            </CardHeader>
            <CardBody>
              <FormGroup>
                {(this.state.getMerchantCategory === "Gift" || isAdmin()) && (
                  <div>
                    <h4>Gift Category</h4>
                    <Row>
                      {this.state.giftCategoriesChoice.map(category => {
                        return (
                          <Col md={4} xs={6} key={category}>
                            <FormGroup check inline>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id={
                                  "gift-" +
                                  category.toLowerCase().replace(/[\W]/g, "-")
                                }
                                name="parentCategories"
                                value={category}
                                checked={this.state.formData.giftCategories.has(
                                  category
                                )}
                                onChange={e =>
                                  onClickCheckboxes(
                                    "giftCategories",
                                    category,
                                    e.target.checked
                                  )
                                }
                              />
                              <Label
                                className="form-check-label"
                                check
                                htmlFor={
                                  "gift-" +
                                  category.toLowerCase().replace(/[\W]/g, "-")
                                }
                              >
                                {category}
                              </Label>
                            </FormGroup>
                            {!this.state.formData.giftCategories.has(
                              category
                            ) ? null : (
                              <Query
                                query={QUERY_GET_SUBCATEGORIES}
                                variables={{ parentName: category }}
                              >
                                {({ loading, error, data }) => {
                                  if (loading) return null;
                                  if (error) return `Error!: ${error}`;

                                  const subcategories = data.getSubCategories.map(
                                    subcategory => {
                                      return {
                                        value: subcategory.name,
                                        label: subcategory.name
                                      };
                                    }
                                  );
                                  if (subcategories.length === 0) return null;
                                  return (
                                    <Select
                                      key={subcategories}
                                      className="mb-3"
                                      loseMenuOnSelect={false}
                                      components={makeAnimated()}
                                      isMulti
                                      options={subcategories}
                                      placeholder="Select sub-categories..."
                                      onChange={e => {
                                        let subcategories = this.state.formData
                                          .giftSubCategories;
                                        subcategories[category] = e.map(
                                          entry => entry.value
                                        );
                                        this.setState({
                                          formData: {
                                            ...this.state.formData,
                                            giftSubCategories: subcategories
                                          }
                                        });
                                      }}
                                    />
                                  );
                                }}
                              </Query>
                            )}
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                )}

              </FormGroup>
              <FormGroup>
                {(this.state.getMerchantCategory === "Gift" || isAdmin()) && (
                  <div>
                    <h4>Store Category</h4>
                    <Row>
                      {this.state.storeCategoriesChoice.map(category => {
                        return (
                          <Col md={4} xs={6} key={category}>
                            <FormGroup check inline>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id={
                                  "store-" +
                                  category.toLowerCase().replace(/[\W]/g, "-")
                                }
                                name="storeCategories"
                                value={category}
                                onChange={e =>
                                  onClickCheckboxes(
                                    "storeCategories",
                                    category,
                                    e.target.checked
                                  )
                                }
                              />
                              <Label
                                className="form-check-label"
                                check
                                htmlFor={
                                  "store-" +
                                  category.toLowerCase().replace(/[\W]/g, "-")
                                }
                              >
                                {category}
                              </Label>
                            </FormGroup>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                )}

              </FormGroup>
              <FormGroup>
                <h4>Color</h4>
                <Row>
                  <Col>
                    {[
                      "red",
                      "blue",
                      "black",
                      "yellow",
                      "white",
                      "green",
                      "grey",
                      "pink"
                    ].map(color => {
                      return (
                        <label key={color}>
                          <input
                            type="checkbox"
                            name="colors"
                            className="color-input"
                            style={{ backgroundColor: color }}
                            checked={this.state.formData.colors.has(color)}
                            onChange={e =>
                              onClickCheckboxes(
                                "colors",
                                color,
                                e.target.checked
                              )
                            }
                          />
                        </label>
                      );
                    })}
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <div>
                  <h4 className="d-inline">Photo</h4> (Only displayed photos
                  would be uploaded)
                </div>
                <p>First Selected Photo will be thumbnail </p>
                <PhotosUploader
                  photos={this.state.formData.photos}
                  handlePhotos={photos => {
                    let newPhotos = this.state.formData.photos;
                    const inputPhotos = [];
                    photos.forEach(photo => {
                      if (photo.type.startsWith("image/")) {
                        inputPhotos.push(photo.base64);
                      }
                    });
                    newPhotos = newPhotos.concat(inputPhotos);
                    this.setState({
                      formData: { ...this.state.formData, photos: newPhotos }
                    });
                  }}
                  removePhoto={index => {
                    const newPhotos = this.state.formData.photos;
                    newPhotos.splice(index, 1);
                    this.setState({
                      formData: { ...this.state.formData, photos: newPhotos }
                    });
                  }}
                />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o"/> Submit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() =>
                  this.setState({
                    formData: {
                      giftCategories: new Set(),
                      giftSubCategories: {},
                      storeCategories: new Set(),
                      colors: new Set(),
                      photos: []
                    }
                  })
                }
              >
                <i className="fa fa-ban"/> Reset
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </div>
    );
  }
}

export default withApollo(AddProductSecondForm);
