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
  Label,
  FormText
} from "reactstrap";
import { Mutation, withApollo } from "react-apollo";
import DatePicker from "react-datepicker";
import { TextInput, TextAreaInput } from "./FormComponents";
import { MUTATION_ADD_VOUCHER, QUERY_GET_VOUCHERS } from "../gql/voucher";
import { LoadingAlert, CloseLoadingAlert } from "../components/Loader";

import "react-datepicker/dist/react-datepicker.css";

class AddVoucherForm extends React.Component {
  state = {
    voucherData: {
      // code: "",
      name: "",
      description: "",
      validFrom: "",
      validTo: "",
      minPurchase: "",
      percentDiscount: "",
      maxDiscount: "",
      stock: "",
      maxUsage: ""
    }
  };

  setVoucherData = newData => {
    this.setState(Object.assign(this.state.voucherData, newData));
  };

  emptyVoucherData = () => {
    this.setVoucherData({
      // code: "",
      name: "",
      description: "",
      validFrom: "",
      validTo: "",
      minPurchase: "",
      percentDiscount: "",
      maxDiscount: "",
      stock: "",
      maxUsage: ""
    });
  };

  render() {
    return (
      <div className="add-product-form">
        <Mutation mutation={MUTATION_ADD_VOUCHER}>
          {(addVoucher, { loading }) => {
            if (loading) {
              LoadingAlert("Adding Voucher..");
            } else {
              CloseLoadingAlert();
            }
            return (
              <Form
                action=""
                onSubmit={e => {
                  e.preventDefault();
                  // validate product data
                  const arr = Object.entries(this.state.voucherData);
                  for (let i = 0; i < arr.length; i++) {
                    const key = arr[i][0],
                      value = arr[i][1];
                    if (
                      key === "description" ||
                      key === "validFrom" ||
                      key === "validTo" ||
                      key === "maxDiscount" ||
                      key === "stock" ||
                      key === "maxUsage"
                    ) {
                      continue;
                    }
                    if (value === "") {
                      alert("Please complete all fields!");
                      return;
                    }
                  }
                  const userInput = e.target;

                  // prepare data
                  let inputForm = {
                    // code: isMerchant()
                    //   ? getMerchantCode()
                    //   : "" + userInput.code.value,
                    name: userInput.name.value,
                    description: userInput.description.value,
                    isEnable: false,
                    validFrom:
                      this.state.voucherData.validFrom !== ""
                        ? this.state.voucherData.validFrom.toISOString()
                        : null,
                    validTo:
                      this.state.voucherData.validTo !== ""
                        ? this.state.voucherData.validTo.toISOString()
                        : null,
                    minPurchase: parseFloat(userInput.minPurchase.value),
                    percentDiscount: parseFloat(
                      userInput.percentDiscount.value
                    ),
                    maxDiscount: parseFloat(userInput.maxDiscount.value),
                    stock: parseInt(userInput.stock.value),
                    maxUsage: parseInt(userInput.maxUsage.value)
                  };

                  // do mutation
                  addVoucher({
                    variables: {
                      input: inputForm
                    },
                    refetchQueries: [{ query: QUERY_GET_VOUCHERS }]
                  })
                    .then(() => {
                      this.props.history.push({
                        pathname: `/vouchers/`
                      });
                    })
                    .catch(e => alert(e));
                }}
                className="form-horizontal"
              >
                <Card>
                  <CardHeader>
                    <h3>Add Voucher</h3>
                  </CardHeader>
                  <CardBody>
                    {/* <TextInput
                      fieldName="Code"
                      leftUnit={isMerchant() ? getMerchantCode() : false}
                      onChange={e =>
                        this.setVoucherData({ code: e.target.value })
                      }
                    /> */}
                    <TextInput
                      fieldName="Name"
                      onChange={e =>
                        this.setVoucherData({ name: e.target.value })
                      }
                    />
                    <TextAreaInput
                      fieldName="Description"
                      rows={3}
                      onChange={e =>
                        this.setVoucherData({
                          description: e.target.value
                        })
                      }
                    />
                    <hr />
                    <FormGroup row>
                      <Col md={3}>
                        <Label htmlFor="add-product-discount-end-date">
                          Valid From
                        </Label>
                      </Col>
                      <Col xs={12} md={6}>
                        <DatePicker
                          name="validFrom"
                          selected={this.state.voucherData.validFrom}
                          onChange={e => {
                            this.setVoucherData({
                              validFrom: e
                            });
                          }}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="dd/MM/yyyy HH:mm"
                        />
                      </Col>
                      <Col xs={12} md={{ size: 6, offset: 3 }}>
                        <FormText color="muted">
                          Leave empty if there is no valid date from
                        </FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={3}>
                        <Label htmlFor="add-product-discount-end-date">
                          Valid To
                        </Label>
                      </Col>
                      <Col xs={12} md={6}>
                        <DatePicker
                          name="validTo"
                          selected={this.state.voucherData.validTo}
                          onChange={e => {
                            this.setVoucherData({
                              validTo: e
                            });
                          }}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="dd/MM/yyyy HH:mm"
                        />
                      </Col>
                      <Col xs={12} md={{ size: 6, offset: 3 }}>
                        <FormText color="muted">
                          Leave empty if there is no valid date to
                        </FormText>
                      </Col>
                    </FormGroup>
                    <hr />
                    <TextInput
                      fieldName="Min Purchase"
                      numeric
                      float
                      additionalInfo="Min Rp 0"
                      onChange={e =>
                        this.setVoucherData({ minPurchase: e.target.value })
                      }
                    />
                    <TextInput
                      fieldName="Percent Discount"
                      numeric
                      float
                      additionalInfo="Discount (0% - 100%)"
                      unit="%"
                      onChange={e =>
                        this.setVoucherData({
                          percentDiscount: e.target.value
                        })
                      }
                    />
                    <TextInput
                      fieldName="Max Discount"
                      numeric
                      float
                      additionalInfo="Leave empty if there is no max discount"
                      onChange={e =>
                        this.setVoucherData({
                          maxDiscount: e.target.value
                        })
                      }
                    />
                    <TextInput
                      fieldName="Stock"
                      numeric
                      additionalInfo="Leave empty if there is unlimited stock"
                      onChange={e =>
                        this.setVoucherData({ stock: e.target.value })
                      }
                    />
                    <TextInput
                      fieldName="Max Usage"
                      numeric
                      additionalInfo="Leave empty if there is unlimited max usage per user"
                      onChange={e =>
                        this.setVoucherData({ maxUsage: e.target.value })
                      }
                    />
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
                        this.emptyVoucherData();
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

export default withApollo(AddVoucherForm);
