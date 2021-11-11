import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { AppSwitch } from "@coreui/react";
import { Mutation, Query, withApollo } from "react-apollo";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MultipleChoiceInput,
  MultipleInlineInput,
  TextAreaInput,
  TextInput
} from "./FormComponents";
import {
  MUTATION_EDIT_PRODUCT,
  QUERY_GET_MERCHANT_CODES,
  QUERY_GET_PRODUCT
} from "../gql/product";
import {
  MUTATION_ADD_PRODUCT_SHIPPING_SUPPORTS,
  MUTATION_DELETE_PRODUCT_SHIPPING_SUPPORTS
} from "../gql/shipping-support";
import { isAdmin, getMerchantLevelTax } from "../utils/userChecker";
import { subtractSet } from "../utils/setOperator";
import { addDays } from "../utils/dateTimeFormatter";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";
import {
  MUTATION_SET_PRODUCT_REVIEWS_STATUS,
  MUTATION_ADD_PRODUCT_REVIEW
} from "../gql/product-review";
import {
  MUTATION_ADD_DOCUMENT,
  MUTATION_DELETE_DOCUMENT
} from "../gql/elasticsearch";

class EditProductBasicDetailFragment extends Component {
  state = {
    productData: {
      name: null,
      merchantCode: null,
      merchant: null,
      shortDescription: null,
      longDescription: null,
      merchantPrice: null,
      price: null,
      capitalPrice: null,
      discountPrice: null,
      discountUntil: this.props.productDetail.merchantDiscountUntil
        ? new Date(this.props.productDetail.merchantDiscountUntil)
        : null,
      kadoquDiscountPrice: null,
      kadoquDiscountUntil: this.props.productDetail.kadoquDiscountUntil
        ? new Date(this.props.productDetail.kadoquDiscountUntil)
        : null,
      stock: null,
      weight: null,
      length: null,
      width: null,
      height: null,
      poNotes: this.props.productDetail.poNotes,
      isCustomeOrder: this.props.productDetail.isCustomeOrder,
      isCustomePhoto: this.props.productDetail.isCustomePhoto,
      isCustomeColor: this.props.productDetail.isCustomeColor,
      shipmentDescription: null,
      newToDate: this.props.productDetail.newToDate
        ? new Date(this.props.productDetail.newToDate)
        : null,
      isPo: null,
      minQty: null,
      multipleQty: null,
      isDigital: null
    }
  };

  setProductData = newData => {
    this.setState({
      productData: Object.assign(this.state.productData, newData)
    });
  };

  switchDocumentElasticSearch(value) {
    if (value === true) {
      return this.props.client.mutate({
        mutation: MUTATION_ADD_DOCUMENT,
        variables: {
          data: [this.props.productDetail]
        }
      });
    } else {
      return this.props.client.mutate({
        mutation: MUTATION_DELETE_DOCUMENT,
        variables: {
          id: this.props.productDetail.id
        }
      });
    }
  }

  emptyProductData = () => {
    this.setState({
      productData: {
        name: null,
        merchantCode: null,
        merchant: null,
        shortDescription: null,
        longDescription: null,
        merchantPrice: null,
        price: null,
        capitalPrice: null,
        discountPrice: null,
        discountUntil: null,
        kadoquDiscountPrice: null,
        kadoquDiscountUntil: null,
        stock: null,
        weight: null,
        length: null,
        width: null,
        height: null,
        shipmentDescription: null,
        newToDate: null,
        isPo: null,
        minQty: null,
        multipleQty: null,
        isDigital: null
      }
    });
  };

  render() {
    const Toast = this.props.toast;
    const productDetail = this.props.productDetail;
    return (
      <Mutation mutation={MUTATION_EDIT_PRODUCT}>
        {(editProduct, { loading }) => {
          if (loading) {
            LoadingAlert("Editing Product: " + productDetail.name + "..");
          } else {
            CloseLoadingAlert();
          }
          return (
            <Form
              onSubmit={e => {
                e.preventDefault();
                const userInput = e.target;
                // collect shipping methods
                let shippingMethods = [];
                userInput.shippingMethod.forEach(method => {
                  if (method.checked) shippingMethods.push(method.value);
                });
                // define what should be added to the database
                let shippingSupports = [];
                shippingSupports = productDetail.shippingSupports.map(
                  shippingSupport => shippingSupport.name
                );
                const shippingMethodsAddition = Array.from(
                  subtractSet(
                    new Set(shippingMethods),
                    new Set(shippingSupports)
                  )
                );
                // define what should be removed from the database
                const shippingMethodsSubtraction = Array.from(
                  subtractSet(
                    new Set(shippingSupports),
                    new Set(shippingMethods)
                  )
                );
                let edits = {};
                let isEdited = false;
                Object.entries(this.state.productData).forEach(
                  ([key, value]) => {
                    isEdited =
                      isEdited ||
                      (value !== null &&
                        ![
                          "discountUntil",
                          "kadoquDiscountUntil",
                          "newToDate"
                        ].includes(key));
                    let date;
                    if (value === null) return;
                    switch (key) {
                      case "merchantPrice":
                      case "price":
                      case "discountPrice":
                      case "kadoquCapitalPrice":
                      case "kadoquDiscountPrice":
                      case "weight":
                      case "length":
                      case "width":
                      case "isEnable":
                        edits[key] = value;
                        this.switchDocumentElasticSearch(value);
                        break;
                      case "height":
                        edits[key] = parseFloat(value);
                        break;
                      case "stock":
                      case "minQty":
                      case "multipleQty":
                        edits[key] = parseInt(value);
                        break;
                      case "discountUntil":
                        date = value.toISOString();
                        if (productDetail.merchantDiscountUntil !== date) {
                          edits[key] = date;
                          isEdited = true;
                        }
                        break;
                      case "kadoquDiscountUntil":
                        date = value.toISOString();
                        if (productDetail.kadoquDiscountUntil !== date) {
                          edits[key] = date;
                          isEdited = true;
                        }
                        break;
                      case "newToDate":
                        date = value.toISOString();
                        if (productDetail.newToDate !== date) {
                          edits[key] = date;
                          isEdited = true;
                        }
                        break;
                      default:
                        edits[key] = value;
                        break;
                    }
                  }
                );

                if (
                  ((parseFloat(this.state.productData.discountPrice) ||
                    (this.state.productData.discountPrice === null &&
                      parseFloat(productDetail.merchantDiscount))) &&
                    !this.state.productData.discountUntil) ||
                  (isAdmin() &&
                    ((parseFloat(this.state.productData.kadoquDiscountPrice) ||
                      (this.state.productData.kadoquDiscountPrice === null &&
                        parseFloat(productDetail.kadoquDiscount))) &&
                      !this.state.productData.kadoquDiscountUntil))
                ) {
                  Toast.fire({
                    type: "warning",
                    title: "Discounted Price / Discount Until Date Missing!"
                  });
                  return;
                }

                if (
                  this.state.productData.discountPrice === "" ||
                  this.state.productData.discountPrice === "0"
                ) {
                  edits = Object.assign(edits, {
                    discountPrice: null,
                    discountUntil: null
                  });
                  isEdited = true;
                }

                if (
                  isAdmin() &&
                  (this.state.productData.kadoquDiscountPrice === "" ||
                    this.state.productData.kadoquDiscountPrice === "0")
                ) {
                  edits = Object.assign(edits, {
                    kadoquDiscountPrice: null,
                    kadoquDiscountUntil: null
                  });
                  isEdited = true;
                }

                // check if edit occured to prevent useless mutation call
                if (
                  !isEdited &&
                  shippingMethodsAddition.length === 0 &&
                  shippingMethodsSubtraction.length === 0
                ) {
                  Toast.fire({ type: "warning", title: "No edit detected" });
                  return;
                }

                // do mutation
                const mutate = edits =>
                  Promise.all([
                    editProduct({
                      variables: {
                        id: this.props.productId,
                        edits: edits
                      },
                      refetchQueries: [
                        {
                          query: QUERY_GET_PRODUCT,
                          variables: {
                            id: this.props.productId
                          }
                        }
                      ]
                    }),
                    this.props.client
                      .mutate({
                        mutation: MUTATION_ADD_PRODUCT_REVIEW,
                        variables: {
                          productId: this.props.productId
                        }
                      })
                      .then(() => {
                        this.props.client.mutate({
                          mutation: MUTATION_DELETE_DOCUMENT,
                          variables: {
                            id: this.props.productDetail.id
                          }
                        });
                        this.props.client.mutate({
                          mutation: MUTATION_SET_PRODUCT_REVIEWS_STATUS,
                          variables: {
                            status: false,
                            productId: this.props.productId
                          }
                        });
                      }),
                    ...shippingMethodsAddition.map(method =>
                      this.props.client.mutate({
                        mutation: MUTATION_ADD_PRODUCT_SHIPPING_SUPPORTS,
                        variables: {
                          productId: this.props.productId,
                          shippingSupport: method
                        }
                      })
                    ),
                    ...shippingMethodsSubtraction.map(method =>
                      this.props.client.mutate({
                        mutation: MUTATION_DELETE_PRODUCT_SHIPPING_SUPPORTS,
                        variables: {
                          productId: this.props.productId,
                          shippingSupport: method
                        }
                      })
                    )
                  ])
                    .then(() => {
                      this.props.setAlert({
                        message: `Success! ${productDetail.name} has been updated!`,
                        variant: "success"
                      });
                      const discountUntil = this.state.productData
                        .discountUntil;
                      const kadoquDiscountUntil = this.state.productData
                        .kadoquDiscountUntil;
                      const newToDate = this.state.productData.newToDate;
                      this.emptyProductData();
                      this.setProductData({
                        discountUntil: discountUntil,
                        kadoquDiscountUntil: kadoquDiscountUntil,
                        newToDate: newToDate
                      });
                    })
                    .catch(error => {
                      Toast.fire({
                        type: "error",
                        title: `Oops! ${error.message || error}`
                      });
                    });
                if ("merchant" in edits) {
                  Swal.fire({
                    title: "A change in merchant detected",
                    text:
                      "You are about to change the merchant, do you want to change the SKU as well? This action can not be reverted",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, change it!",
                    cancelButtonText: "No, let it be the same"
                  }).then(result => {
                    if (result) {
                      edits["isUpdateSku"] = true;
                    }
                    mutate(edits);
                  });
                } else {
                  mutate(edits);
                }
              }}
              onReset={() => {
                this.emptyProductData();
                this.setProductData({
                  discountUntil: productDetail.merchantDiscountUntil
                    ? new Date(productDetail.merchantDiscountUntil)
                    : null,
                  kadoquDiscountUntil: productDetail.kadoquDiscountUntil
                    ? new Date(productDetail.kadoquDiscountUntil)
                    : null,
                  newToDate: productDetail.newToDate
                    ? new Date(productDetail.newToDate)
                    : null
                });
              }}
            >
              {!isAdmin() ? null : (
                <React.Fragment>
                  <FormGroup row>
                    <Col md={3}>
                      <Label htmlFor="is-enable">Enable product?</Label>
                    </Col>
                    <Col xs={12} md={9}>
                      <AppSwitch
                        className={"mx-1"}
                        variant={"pill"}
                        color={"success"}
                        defaultChecked={productDetail.isEnable}
                        onChange={e =>
                          this.setProductData({ isEnable: e.target.checked })
                        }
                      />
                    </Col>
                  </FormGroup>
                  <hr />
                </React.Fragment>
              )}
              <TextInput
                fieldName="Name"
                defaultValue={productDetail.name}
                onChange={e => this.setProductData({ name: e.target.value })}
              />
              <FormGroup row>
                <Col md={3}>
                  <Label htmlFor="is-enable">URL Key</Label>
                </Col>
                <Col xs={12} md={9}>
                  {productDetail.slug}
                </Col>
              </FormGroup>
              {!isAdmin() ? null : (
                <Query query={QUERY_GET_MERCHANT_CODES}>
                  {({ loading, error, data }) => (
                    <React.Fragment>
                      {loading ? <p>Loading ...</p> : null}
                      {loading || error ? null : (
                        <MultipleChoiceInput
                          fieldName="Merchant"
                          defaultValue={`${
                            data.getMerchants.filter(
                              merchantData =>
                                merchantData.name === productDetail.merchant
                            )[0]
                              ? data.getMerchants.filter(
                                  merchantData =>
                                    merchantData.name === productDetail.merchant
                                )[0].code
                              : "KDQ"
                          }||${productDetail.merchant}`}
                          onChange={e => {
                            let merchant = e.target.value.split("||");
                            this.setProductData({
                              merchantCode: merchant[0],
                              merchant: merchant[1]
                            });
                          }}
                          options={Object.assign(
                            { "KDQ (Kadoqu.com)": "KDQ||Kadoqu.com" },
                            ...data.getMerchants.map(merchant => ({
                              [`${merchant.code} (${merchant.name})`]: `${merchant.code}||${merchant.name}`
                            }))
                          )}
                        />
                      )}
                    </React.Fragment>
                  )}
                </Query>
              )}
              <TextAreaInput
                fieldName="Short Description"
                rows={3}
                defaultValue={productDetail.shortDescription}
                onChange={e => {
                  this.setProductData({
                    shortDescription: e.target.value
                  });
                }}
              />
              <TextAreaInput
                fieldName="Long Description"
                rows={5}
                defaultValue={productDetail.longDescription}
                onChange={e =>
                  this.setProductData({
                    longDescription: e.target.value
                  })
                }
              />
              <hr />
              <TextInput
                fieldName="Minimum Order Qty"
                defaultValue={productDetail.minQty}
                numeric
                onChange={e => this.setProductData({ minQty: e.target.value })}
              />
              <TextInput
                fieldName="Order Qty Multiple"
                defaultValue={productDetail.multipleQty}
                numeric
                onChange={e =>
                  this.setProductData({ multipleQty: e.target.value })
                }
              />
              <TextInput
                fieldName="Kadoqu Capital Price"
                numeric
                additionalInfo="Harga beli Kadoqu"
                defaultValue={
                  isAdmin()
                    ? productDetail.capitalPrice
                    : productDetail.merchantDiscount
                    ? (1 - getMerchantLevelTax() / 100) *
                      productDetail.merchantDiscount
                    : productDetail.capitalPrice
                }
                readOnly={isAdmin() ? false : true}
                onChange={e => {
                  this.setProductData({
                    capitalPrice: parseFloat(e.target.value)
                  });
                }}
              />
              <TextInput
                fieldName="Price"
                numeric
                defaultValue={
                  productDetail.merchantPrice !== null
                    ? productDetail.merchantPrice
                    : 0
                }
                additionalInfo={
                  isAdmin() ? "Merchant Price = Selling Price" : undefined
                }
                onChange={e => {
                  if (!isAdmin()) {
                    document.getElementById(
                      "add-product-kadoqu-capital-price"
                    ).value =
                      (1 - getMerchantLevelTax() / 100) * e.target.value;
                  }
                  // document.getElementById(
                  //   isAdmin()
                  //     ? "add-product-discounted-price-(merchant)"
                  //     : "add-product-discounted-price"
                  // ).value = "";
                  this.setProductData({
                    merchantPrice: parseInt(e.target.value),
                    discountPrice: ""
                  });
                }}
              />
              {!isAdmin() ? null : (
                <TextInput
                  fieldName="Selling Price"
                  defaultValue={productDetail.price}
                  numeric
                  onChange={e => {
                    this.setProductData({
                      price: parseInt(e.target.value),
                      kadoquDiscountPrice: ""
                    });
                  }}
                />
              )}
              {isAdmin() && (
                <TextInput
                  fieldName={
                    "Discounted Price" + (isAdmin() ? " (Merchant)" : "")
                  }
                  defaultValue={
                    productDetail.merchantDiscount !== null
                      ? productDetail.merchantDiscount
                      : 0
                  }
                  numeric
                  additionalInfo={
                    isAdmin()
                      ? "Selling Price = Discounted Price"
                      : "Harga setelah didiskon"
                  }
                  onChange={e => {
                    e.target.value =
                      e.target.value === ""
                        ? ""
                        : Math.max(
                            0,
                            Math.min(
                              e.target.value,
                              (this.state.productData.merchantPrice ||
                                productDetail.merchantPrice) - 1
                            )
                          );
                    if (!isAdmin()) {
                      document.getElementById(
                        "add-product-kadoqu-capital-price"
                      ).value =
                        (1 - getMerchantLevelTax() / 100) *
                        (e.target.value ||
                          this.state.productData.merchantPrice ||
                          productDetail.merchantPrice);
                    }
                    this.setProductData({
                      discountPrice: e.target.value
                    });
                  }}
                />
              )}
              {!(
                parseFloat(this.state.productData.discountPrice) ||
                (this.state.productData.discountPrice === null &&
                  productDetail.merchantDiscount)
              ) ? null : (
                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="add-product-discount-end-date">
                      {isAdmin() ? " Merchant " : ""} Discount Until
                    </Label>
                  </Col>
                  <Col xs={12} md={6}>
                    <DatePicker
                      selected={this.state.productData.discountUntil}
                      onChange={e => {
                        this.setProductData({
                          discountUntil: e
                        });
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="dd/MM/yyyy HH:mm"
                      minDate={new Date()}
                      maxDate={addDays(new Date(), 30)}
                    />
                  </Col>
                </FormGroup>
              )}
              {!isAdmin() ? null : (
                <React.Fragment>
                  <TextInput
                    fieldName="Discounted Price (Kadoqu)"
                    defaultValue={
                      productDetail.kadoquDiscount !== null
                        ? productDetail.kadoquDiscount
                        : 0
                    }
                    numeric
                    additionalInfo={
                      isAdmin()
                        ? "Selling Price =  Discounted Price"
                        : undefined
                    }
                    onChange={e => {
                      e.target.value =
                        e.target.value === ""
                          ? ""
                          : Math.max(
                              0,
                              Math.min(
                                e.target.value,
                                (this.state.productData.price ||
                                  productDetail.price) - 1
                              )
                            );
                      this.setProductData({
                        kadoquDiscountPrice: e.target.value
                      });
                    }}
                  />
                  {!(
                    parseFloat(this.state.productData.kadoquDiscountPrice) ||
                    (this.state.productData.kadoquDiscountPrice === null &&
                      productDetail.kadoquDiscount)
                  ) ? null : (
                    <FormGroup row>
                      <Col md={3}>
                        <Label htmlFor="edit-product-kadoqu-discount-end-date">
                          Kadoqu Discount Until
                        </Label>
                      </Col>
                      <Col xs={12} md={6}>
                        <DatePicker
                          selected={this.state.productData.kadoquDiscountUntil}
                          onChange={e => {
                            this.setProductData({
                              kadoquDiscountUntil: e
                            });
                          }}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="dd/MM/yyyy HH:mm"
                        />
                      </Col>
                    </FormGroup>
                  )}
                </React.Fragment>
              )}
              <TextInput
                fieldName="Stock"
                defaultValue={productDetail.stock}
                numeric
                onChange={e => this.setProductData({ stock: e.target.value })}
              />
              <hr />
              <TextInput
                fieldName="Weight"
                defaultValue={productDetail.weight}
                numeric
                float
                onChange={e =>
                  this.setProductData({ weight: parseFloat(e.target.value) })
                }
                unit="gram"
              />
              <TextInput
                fieldName="Length"
                defaultValue={productDetail.length}
                numeric
                float
                onChange={e => this.setProductData({ length: e.target.value })}
                unit="cm"
              />
              <TextInput
                fieldName="Width"
                defaultValue={productDetail.width}
                numeric
                float
                onChange={e => this.setProductData({ width: e.target.value })}
                unit="cm"
              />
              <TextInput
                fieldName="Height"
                defaultValue={productDetail.height}
                numeric
                float
                onChange={e => this.setProductData({ height: e.target.value })}
                unit="cm"
              />
              <hr />
              <MultipleInlineInput
                type="checkbox"
                fieldName="Shipping Method"
                formSize={3}
                options={[
                  "JNE Reguler",
                  "JNE OKE",
                  "JNE YES",
                  // "TIKI Reguler",
                  // "TIKI ONS",
                  "J&T",
                  // "SiCepat Reguler",
                  // "SiCepat BEST",
                  // "Ninja",
                  "Go-Send"
                ]}
                defaultChecked={productDetail.shippingSupports.map(
                  shippingSupport => shippingSupport.name
                )}
              />
              <TextAreaInput
                fieldName="Shipment Description"
                defaultValue={productDetail.shipmentDescription}
                rows={3}
                onChange={e =>
                  this.setProductData({
                    shipmentDescription: e.target.value
                  })
                }
              />
              <hr />
              <FormGroup row>
                <Col md={3}>
                  <Label>End of New Date</Label>
                </Col>
                <Col xs={12} md={6}>
                  <DatePicker
                    selected={this.state.productData.newToDate}
                    onChange={e => {
                      this.setProductData({
                        newToDate: e
                      });
                    }}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 30)}
                  />
                </Col>
              </FormGroup>
              <div className="row">
                <div className="col-4">
                  <FormGroup check>
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="add-product-is-po"
                      name="isPo"
                      defaultChecked={productDetail.isPo}
                      value={true}
                      onChange={e =>
                        this.setProductData({
                          isPo: e.target.checked
                        })
                      }
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="add-product-is-po"
                    >
                      Pre-Order?
                    </Label>
                  </FormGroup>
                </div>
              </div>
              {((productDetail.isPo && this.state.productData.isPo === null) ||
                this.state.productData.isPo) && (
                <FormGroup>
                  <TextInput
                    fieldName="Po Notes"
                    numeric
                    defaultValue={productDetail.poNotes}
                    onChange={e =>
                      this.setProductData({
                        poNotes: e.target.value
                      })
                    }
                    additionalInfo="Processing time (day)"
                    unit="day(s)"
                  />
                </FormGroup>
              )}
              <div className="row mt-5">
                <div className="col-4">
                  <FormGroup check>
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="add-product-is-custome-order"
                      name="isPo"
                      defaultChecked={productDetail.isCustomeOrder}
                      value={true}
                      onChange={e => {
                        this.setProductData({
                          isCustomeOrder: e.target.checked
                        });
                      }}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="add-product-is-custome-orde"
                    >
                      Custome Order?
                    </Label>
                  </FormGroup>
                </div>
                {this.state.productData.isCustomeOrder === true && (
                  <>
                    <div className="col-4">
                      <FormGroup check>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="add-product-is-custome-photo"
                          name="isPo"
                          defaultChecked={productDetail.isCustomePhoto}
                          value={true}
                          onChange={e =>
                            this.setProductData({
                              isCustomePhoto: e.target.checked
                            })
                          }
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="add-product-is-custome-photo"
                        >
                          Use Photo?
                        </Label>
                      </FormGroup>
                    </div>
                    <div className="col-4">
                      <FormGroup check>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="add-product-is-custome-colors"
                          name="isPo"
                          defaultChecked={productDetail.isCustomeColor}
                          value={true}
                          onChange={e =>
                            this.setProductData({
                              isCustomeColor: e.target.checked
                            })
                          }
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="add-product-is-custome-colors"
                        >
                          custome color?
                        </Label>
                      </FormGroup>
                    </div>
                  </>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <FormGroup check>
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="add-product-is-digital"
                      name="isDigital"
                      defaultChecked={productDetail.isDigital}
                      value={true}
                      onChange={e => {
                        this.setProductData({
                          isDigital: e.target.checked
                        });
                      }}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="add-product-is-digital"
                    >
                      Digital Product
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-center">
                <Button type="submit" color="primary" className="w-25 mr-2">
                  Save
                </Button>
                <Button type="reset" color="secondary" className="w-25">
                  Reset
                </Button>
              </div>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default withApollo(EditProductBasicDetailFragment);
