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
import {Mutation, Query, withApollo} from "react-apollo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextInput,
  TextAreaInput,
  MultipleInlineInput
} from "./FormComponents";

import {isAdmin} from "../utils/userChecker";
import {addDays} from "../utils/dateTimeFormatter";
import {QUERY_GET_MERCHANT_CODES, MUTATION_ADD_PRODUCT} from "../gql/product";
import {MUTATION_ADD_PRODUCT_SHIPPING_SUPPORTS} from "../gql/shipping-support";
import {LoadingAlert, CloseLoadingAlert} from "./Loader";

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
      capitalPrice: ""
    },
    invalidDiscount: false
  };

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
      capitalPrice: ""
    });
  };

  render() {
    return (
      <div className="add-product-form">
        <Mutation mutation={MUTATION_ADD_PRODUCT}>
          {(addProduct, {loading}) => {
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
                  if (shippingMethods.length === 0) {
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
                    poNotes: userInput.poNotes ? userInput.poNotes.value : ""
                  };
                  let otherAttr;
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

                  // do mutation
                  addProduct({
                    variables: {
                      input: Object.assign(inputForm, otherAttr)
                    }
                  }).then(res => {
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
                    Promise.all(promises)
                      .then(() => this.props.navigateToSecondForm(id))
                      .catch(err => alert(err));
                  });
                }}
                className="form-horizontal"
              >
                <Card>
                  <CardHeader>
                    <h3>Add Holiday Product</h3>
                  </CardHeader>
                  <CardBody>
                    <TextInput
                      fieldName="Name"
                      onChange={e =>
                        this.setProductData({name: e.target.value})
                      }
                    />
                    {!isAdmin() ? null : (
                      <Query query={QUERY_GET_MERCHANT_CODES}>
                        {({loading, error, data}) => (
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
                                      let merchant = e.target.value.split("||");
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
                        )}
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
                        this.setProductData({longDescription: e.target.value})
                      }
                    />
                    <hr/>
                    <TextInput
                      fieldName="Kadoqu Capital Price"
                      numeric
                      additionalInfo="Harga beli Kadoqu"
                      value={
                        isAdmin()
                          ? this.state.productData.capitalPrice || 0
                          : this.state.productData.discountPrice
                          ? this.state.productData.discountPrice * 0.9
                          : this.state.merchantPrice * 0.9 || 0
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
                        isAdmin() ? "Capital / merchant's price" : undefined
                      }
                      onChange={e => {
                        document.getElementById(
                          "add-product-discounted-price"
                        ).value = "";
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
                          this.setProductData({price: e.target.value})
                        }
                      />
                    )}

                    <TextInput
                      fieldName="Discounted Price"
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
                              (isAdmin()
                                ? this.state.productData.price
                                : this.state.productData.merchantPrice) - 1
                            )
                            );
                        this.setProductData({
                          discountPrice: e.target.value
                        });
                      }}
                    />
                    {!isAdmin() ||
                    !this.state.productData.discountPrice ? null : (
                      <MultipleInlineInput
                        type="radio"
                        fieldName="Discount Owner"
                        formSize={3}
                        options={["Kadoqu", "Merchant"]}
                        defaultValue="Kadoqu"
                        onChange={e =>
                          this.setProductData({discountOwner: e.target.value})
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
                        this.setProductData({stock: e.target.value})
                      }
                    />
                    <hr/>
                    <TextInput
                      fieldName="Weight"
                      numeric
                      float
                      onChange={e =>
                        this.setProductData({weight: e.target.value})
                      }
                      unit="gram"
                    />
                    <TextInput
                      fieldName="Length"
                      numeric
                      float
                      onChange={e =>
                        this.setProductData({length: e.target.value})
                      }
                      unit="cm"
                    />
                    <TextInput
                      fieldName="Width"
                      numeric
                      float
                      onChange={e =>
                        this.setProductData({width: e.target.value})
                      }
                      unit="cm"
                    />
                    <TextInput
                      fieldName="Height"
                      numeric
                      float
                      onChange={e =>
                        this.setProductData({height: e.target.value})
                      }
                      unit="cm"
                    />
                    <hr/>
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
                    <hr/>
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
                    <FormGroup check>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="add-product-is-po"
                        name="isPo"
                        value={true}
                        onChange={(e) => {
                          this.setProductData({isPo: e.target.checked});

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
                    {this.state.productData.isPo === true && (
                      <FormGroup>
                        <TextAreaInput
                          fieldName="Po Notes"
                          rows={5}
                          onChange={e =>
                            this.setProductData({poNotes: e.target.value})
                          }
                        />
                      </FormGroup>
                    )}
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o"/> Submit
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
                      <i className="fa fa-ban"/> Reset
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
