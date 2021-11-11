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
  Label
} from "reactstrap";
import { Mutation, Query, withApollo } from "react-apollo";
import DatePicker from "react-datepicker";
import {
  TextInput,
  TextAreaInput,
  MultipleInlineInput
} from "./FormComponents";
import { isAdmin, getMerchantLevelTax } from "../utils/userChecker";
import { addDays } from "../utils/dateTimeFormatter";
import {
  QUERY_GET_MERCHANT_CODES,
  MUTATION_ADD_PRODUCT,
  MUTATION_ADD_MAGICAL_MOMENT_CATEGORY,
  MUTATION_ADD_COMPANY_CELEBRATION_CATEGORY,
  MUTATION_ADD_BIRTHDAY_PACKAGE_CATEGORY,
  MUTATION_ADD_CASE_CATEGORY
} from "../gql/product";
import { MUTATION_ADD_PRODUCT_SHIPPING_SUPPORTS } from "../gql/shipping-support";
import { LoadingAlert, CloseLoadingAlert } from "../components/Loader";
import { getMerchantCategory } from "../utils/userChecker";
import Toast from "./Toast";

import "react-datepicker/dist/react-datepicker.css";

class AddProductFirstForm extends React.Component {
  state = {
    productData: {
      name: "",
      merchant: "",
      code: "",
      shortDescription: "",
      longDescription: "",
      shipmentDescription: "",
      merchantPrice: "",
      price: "",
      discountPrice: "",
      discountUntil: "",
      discountOwner: "Kadoqu",
      newToDate: addDays(new Date(), 7),
      stock: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      capitalPrice: "",
      minQty: 1,
      multipleQty: 1
    },
    invalidDiscount: false
  };

  componentDidMount() {
    console.log(getMerchantCategory());
  }

  setProductData = newData => {
    this.setState(Object.assign(this.state.productData, newData));
  };

  emptyProductData = () => {
    this.setProductData({
      name: "",
      code: "",
      merchant: "",
      shortDescription: "",
      longDescription: "",
      shipmentDescription: "",
      merchantPrice: "",
      price: "",
      discountPrice: "",
      discountUntil: "",
      discountOwner: "Kadoqu",
      newToDate: addDays(new Date(), 7),
      stock: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      capitalPrice: "",
      minQty: 1,
      multipleQty: 1
    });
  };

  render() {
    return (
      <div className="add-product-form">
        <Mutation mutation={MUTATION_ADD_PRODUCT}>
          {(addProduct, { loading }) => {
            if (loading) {
              LoadingAlert("Loading..");
            } else {
              CloseLoadingAlert();
            }
            return (
              <Form
                action=""
                onSubmit={e => {
                  e.preventDefault();
                  // validate product data
                  const arr = Object.entries(this.state.productData);
                  for (let i = 0; i < arr.length; i++) {
                    const key = arr[i][0],
                      value = arr[i][1];
                    if (
                      key === "shipmentDescription" ||
                      key === "capitalPrice" ||
                      key === "discountPrice" ||
                      key === "price" ||
                      (!isAdmin() &&
                        (key === "code" ||
                          key === "merchant" ||
                          key === "discountOwner"))
                    ) {
                      continue;
                    }
                    if (
                      value === "" &&
                      !(
                        this.state.productData.discountPrice === "" &&
                        (key === "discountUntil" || key === "discountOwner")
                      )
                    ) {
                      alert("Please complete all fields!");
                      return;
                    }
                  }
                  const userInput = e.target;
                  // collect shipping methods
                  let shippingMethods = [];
                  userInput.shippingMethod.forEach(method => {
                    if (method.checked) shippingMethods.push(method.value);
                  });
                  // validate shipping methods
                  if (!this.state.isDigital && shippingMethods.length === 0) {
                    alert("Please choose supported shipping method!");
                    return;
                  }
                  // prepare data
                  let inputForm = {
                    name: userInput.name.value,
                    shortDescription: userInput.shortDescription.value,
                    longDescription: userInput.longDescription.value,
                    shipmentDescription: userInput.shipmentDescription.value,
                    merchantPrice: parseFloat(userInput.price.value),
                    discountPrice:
                      userInput.discountedPrice &&
                      userInput.discountedPrice.value !== ""
                        ? parseFloat(userInput.discountedPrice.value)
                        : null,
                    discountUntil:
                      this.state.productData.discountPrice !== ""
                        ? this.state.productData.discountUntil.toISOString()
                        : null,
                    isPo: userInput.isPo.checked,
                    newToDate:
                      this.state.productData.newToDate !== ""
                        ? this.state.productData.newToDate.toISOString()
                        : null,
                    stock: parseInt(userInput.stock.value),
                    weight: parseFloat(userInput.weight.value),
                    length: parseFloat(userInput.length.value),
                    width: parseFloat(userInput.width.value),
                    height: parseFloat(userInput.height.value),
                    poNotes: userInput.poNotes ? userInput.poNotes.value : "",
                    isCustomeOrder: userInput.isCustomeOrder.checked,
                    isCustomePhoto:
                      userInput.isCustomeOrder.checked &&
                      userInput.isCustomePhoto.checked,
                    isCustomeColor:
                      userInput.isCustomeOrder.checked &&
                      userInput.isCustomeColor.checked,
                    minQty: parseInt(userInput.minimumOrderQty.value),
                    multipleQty: parseInt(userInput.orderQtyMultiple.value),
                    isDigital: userInput.isDigital.checked
                  };
                  let otherAttr = {};
                  if (isAdmin()) {
                    otherAttr = {
                      price: parseFloat(userInput.sellingPrice.value),
                      capitalPrice: parseFloat(
                        userInput.kadoquCapitalPrice.value
                      ),
                      merchant: userInput.merchant.value.split("||")[1],
                      merchantCode: userInput.merchant.value.split("||")[0],
                      discountOwner:
                        this.state.productData.discountPrice !== ""
                          ? userInput.discountOwner.value.toLowerCase()
                          : ""
                    };
                  }
                  console.log(Object.assign(inputForm));
                  // do mutation
                  addProduct({
                    variables: {
                      input: Object.assign(inputForm, otherAttr)
                    }
                  })
                    .then(res => {
                      const id = res.data.addProduct;
                      let promises = [];
                      shippingMethods.forEach(method => {
                        promises.push(
                          this.props.client.mutate({
                            mutation: MUTATION_ADD_PRODUCT_SHIPPING_SUPPORTS,
                            variables: {
                              productId: id,
                              shippingSupport: method
                            }
                          })
                        );
                      });
                      switch (getMerchantCategory().name) {
                        case "Magical Moment":
                          promises.push(
                            this.props.client.mutate({
                              mutation: MUTATION_ADD_MAGICAL_MOMENT_CATEGORY,
                              variables: {
                                productId: id
                              }
                            })
                          );
                          break;
                        case "Company Celebration":
                          promises.push(
                            this.props.client.mutate({
                              mutation: MUTATION_ADD_COMPANY_CELEBRATION_CATEGORY,
                              variables: {
                                productId: id
                              }
                            })
                          );
                          break;
                        case "Birthday Package":
                          promises.push(
                            this.props.client.mutate({
                              mutation: MUTATION_ADD_BIRTHDAY_PACKAGE_CATEGORY,
                              variables: {
                                productId: id
                              }
                            })
                          );
                          break;
                        case "Case":
                          promises.push(
                            this.props.client.mutate({
                              mutation: MUTATION_ADD_CASE_CATEGORY,
                              variables: {
                                productId: id
                              }
                            })
                          );
                          break;
                        default:
                          break;
                      }
                      Promise.all(promises)
                        .then(() => this.props.navigateToSecondForm(id))
                        .catch(err => alert(err));
                    })
                    .catch(error =>
                      Toast.fire({
                        type: "error",
                        title: `${error.message || error}`
                      })
                    );
                }}
                className="form-horizontal"
              >
                <Card>
                  <CardHeader>
                    <h3>Add Product</h3>
                  </CardHeader>
                  <CardBody>
                    <TextInput
                      fieldName="Name"
                      onChange={e =>
                        this.setProductData({ name: e.target.value })
                      }
                    />
                    {!isAdmin() ? null : (
                      <Query query={QUERY_GET_MERCHANT_CODES}>
                        {({ loading, error, data }) => {
                          return (
                            <React.Fragment>
                              {loading ? <p>Loading ...</p> : null}
                              {loading || error ? null : (
                                <FormGroup row>
                                  <Col md={3}>
                                    <Label htmlFor="add-product-merchant">
                                      Merchant
                                    </Label>
                                  </Col>
                                  <Col xs={12} md={9}>
                                    <Input
                                      type="select"
                                      name="merchant"
                                      id="add-product-merchant"
                                      defaultValue={0}
                                      onChange={e => {
                                        let merchant = e.target.value.split(
                                          "||"
                                        );
                                        this.setProductData({
                                          code: merchant[0],
                                          merchant: merchant[1]
                                        });
                                      }}
                                    >
                                      <option value={0} disabled>
                                        Please select
                                      </option>
                                      <option value="KDQ||Kadoqu.com">
                                        KDQ (Kadoqu.com)
                                      </option>
                                      {data.getMerchants.map(merchant => (
                                        <option
                                          key={merchant.code}
                                          value={`${merchant.code}||${merchant.name}`}
                                        >
                                          {`${merchant.code} (${merchant.name})`}
                                        </option>
                                      ))}
                                    </Input>
                                  </Col>
                                </FormGroup>
                              )}
                            </React.Fragment>
                          );
                        }}
                      </Query>
                    )}
                    <TextAreaInput
                      fieldName="Short Description"
                      rows={3}
                      onChange={e =>
                        this.setProductData({
                          shortDescription: e.target.value
                        })
                      }
                    />
                    <TextAreaInput
                      fieldName="Long Description"
                      rows={5}
                      onChange={e =>
                        this.setProductData({ longDescription: e.target.value })
                      }
                    />
                    <hr />
                    <TextInput
                      fieldName="Minimum Order Qty"
                      defaultValue="1"
                      numeric
                      onChange={e =>
                        this.setProductData({ minQty: e.target.value })
                      }
                    />
                    <TextInput
                      fieldName="Order Qty Multiple"
                      defaultValue="1"
                      numeric
                      onChange={e =>
                        this.setProductData({ multipleQty: e.target.value })
                      }
                    />
                    <TextInput
                      fieldName="Kadoqu Capital Price"
                      numeric
                      additionalInfo="Harga beli Kadoqu"
                      value={
                        isAdmin()
                          ? this.state.productData.capitalPrice || 0
                          : this.state.productData.discountPrice
                          ? this.state.productData.discountPrice *
                            (1 - getMerchantLevelTax() / 100)
                          : this.state.merchantPrice *
                              (1 - getMerchantLevelTax() / 100) || 0
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
                      additionalInfo={
                        isAdmin() ? "Merchant Price = Selling Price" : undefined
                      }
                      onChange={e => {
                        // document.getElementById(
                        //   "add-product-discounted-price"
                        // ).value = "";
                        this.setProductData({
                          merchantPrice: e.target.value,
                          discountPrice: ""
                        });
                      }}
                    />
                    {!isAdmin() ? null : (
                      <TextInput
                        fieldName="Selling Price"
                        numeric
                        onChange={e =>
                          this.setProductData({ price: e.target.value })
                        }
                      />
                    )}
                    {isAdmin() && (
                      <TextInput
                        fieldName="Discounted Price"
                        numeric
                        additionalInfo={
                          isAdmin()
                            ? "Discounted Price = Selling Price"
                            : "Harga setelah didiskon"
                        }
                        onChange={e => {
                          e.target.value = isNaN(e.target.value)
                            ? ""
                            : Math.max(
                                0,
                                Math.min(
                                  e.target.value,
                                  ((isAdmin() &&
                                    this.state.productData.price) ||
                                    this.state.productData.merchantPrice) - 1
                                )
                              );
                          this.setProductData({
                            discountPrice: e.target.value
                          });
                        }}
                      />
                    )}
                    {!isAdmin() ||
                    !this.state.productData.discountPrice ? null : (
                      <MultipleInlineInput
                        type="radio"
                        fieldName="Discount Owner"
                        formSize={3}
                        options={["Kadoqu", "Merchant"]}
                        defaultValue="Kadoqu"
                        onChange={e =>
                          this.setProductData({ discountOwner: e.target.value })
                        }
                      />
                    )}
                    {!this.state.productData.discountPrice ? null : (
                      <FormGroup row>
                        <Col md={3}>
                          <Label htmlFor="add-product-discount-end-date">
                            Discount Until
                          </Label>
                        </Col>
                        <Col xs={12} md={6}>
                          <DatePicker
                            name="discountUntil"
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
                    <TextInput
                      fieldName="Stock"
                      numeric
                      onChange={e =>
                        this.setProductData({ stock: e.target.value })
                      }
                    />
                    <hr />
                    <TextInput
                      fieldName="Weight"
                      numeric
                      float
                      onChange={e =>
                        this.setProductData({ weight: e.target.value })
                      }
                      unit="gram"
                    />
                    <TextInput
                      fieldName="Length"
                      numeric
                      float
                      onChange={e =>
                        this.setProductData({ length: e.target.value })
                      }
                      unit="cm"
                    />
                    <TextInput
                      fieldName="Width"
                      numeric
                      float
                      onChange={e =>
                        this.setProductData({ width: e.target.value })
                      }
                      unit="cm"
                    />
                    <TextInput
                      fieldName="Height"
                      numeric
                      float
                      onChange={e =>
                        this.setProductData({ height: e.target.value })
                      }
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
                    />
                    <TextAreaInput
                      fieldName="Shipment Description"
                      rows={3}
                      onChange={e =>
                        this.setProductData({
                          shipmentDescription: e.target.value
                        })
                      }
                    />
                    <hr />
                    <FormGroup row>
                      <Col xs={6} md={3}>
                        <Label htmlFor="add-product-new-tag-end-date">
                          Set product as new to date
                        </Label>
                      </Col>
                      <Col xs={6} md={3}>
                        <DatePicker
                          name="newToDate"
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
                            value={true}
                            onChange={e => {
                              this.setProductData({ isPo: e.target.checked });
                            }}
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
                    {this.state.productData.isPo === true && (
                      <FormGroup>
                        <TextInput
                          fieldName="Po Notes"
                          numeric
                          onChange={e =>
                            this.setProductData({ poNotes: e.target.value })
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
                            name="isCustomeOrder"
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
                            htmlFor="add-product-is-po"
                          >
                            Custome Order ?
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
                                name="isCustomePhoto"
                                value={true}
                                onChange={e => {
                                  this.setProductData({
                                    isCustomePhoto: e.target.checked
                                  });
                                }}
                              />
                              <Label
                                className="form-check-label"
                                check
                                htmlFor="add-product-is-custome-photo"
                              >
                                Custome photo ?
                              </Label>
                            </FormGroup>
                          </div>
                          <div className="col-4">
                            <FormGroup check>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id="add-product-is-custome-color"
                                name="isCustomeColor"
                                value={true}
                                onChange={e => {
                                  this.setProductData({
                                    isCustomeColor: e.target.checked
                                  });
                                }}
                              />
                              <Label
                                className="form-check-label"
                                check
                                htmlFor="add-product-is-custome-color"
                              >
                                Custome color?
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
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o" /> Submit
                    </Button>
                    <Button
                      type="reset"
                      size="sm"
                      color="danger"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        this.emptyProductData();
                      }}
                    >
                      <i className="fa fa-ban" /> Reset
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withApollo(AddProductFirstForm);
