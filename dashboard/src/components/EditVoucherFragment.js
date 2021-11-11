import React from "react";
import { Button, Col, Form, FormGroup, Label, FormText } from "reactstrap";
import { AppSwitch } from "@coreui/react";
import { Mutation, withApollo } from "react-apollo";
import DatePicker from "react-datepicker";
import { TextInput, TextAreaInput } from "./FormComponents";
import { isAdmin } from "../utils/userChecker";
import { MUTATION_EDIT_VOUCHER } from "../gql/voucher";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";

import "react-datepicker/dist/react-datepicker.css";

class EditVoucherFragment extends React.Component {
  state = {
    voucherData: {
      // code: null,
      name: null,
      description: null,
      validFrom: this.props.voucher.validFrom
        ? new Date(this.props.voucher.validFrom)
        : null,
      validTo: this.props.voucher.validTo
        ? new Date(this.props.voucher.validTo)
        : null,
      minPurchase: null,
      percentDiscount: null,
      maxDiscount: null,
      stock: null,
      maxUsage: null
    }
  };

  setVoucherData = newData => {
    this.setState({
      voucherData: Object.assign(this.state.voucherData, newData)
    });
  };

  emptyVoucherData = () => {
    this.setState({
      voucherData: {
        // code: null,
        name: null,
        description: null,
        validFrom: null,
        validTo: null,
        minPurchase: null,
        percentDiscount: null,
        maxDiscount: null,
        stock: null,
        maxUsage: null
      }
    });
  };

  render() {
    const Toast = this.props.toast;
    const voucher = this.props.voucher;
    return (
      <Mutation mutation={MUTATION_EDIT_VOUCHER}>
        {(editVoucher, { loading }) => {
          if (loading) {
            LoadingAlert("Editing Voucher..");
          } else {
            CloseLoadingAlert();
          }
          return (
            <Form
              onSubmit={e => {
                e.preventDefault();
                let edits = {};
                let isEdited = false;
                Object.entries(this.state.voucherData).forEach(
                  ([key, value]) => {
                    isEdited =
                      isEdited ||
                      (value !== null &&
                        key !== "validFrom" &&
                        key !== "validTo");
                    let date;
                    if (
                      value === null &&
                      key !== "validFrom" &&
                      key !== "validTo"
                    )
                      return;
                    switch (key) {
                      // case "code":
                      //   edits[key] = isMerchant()
                      //     ? getMerchantCode()
                      //     : "" + value;
                      //   break;
                      case "validFrom":
                        if (value) {
                          date = value.toISOString();
                          if (voucher.validFrom !== date) {
                            edits[key] = date;
                            isEdited = true;
                          }
                        } else {
                          edits[key] = null;
                          isEdited = true;
                        }
                        break;
                      case "validTo":
                        if (value) {
                          date = value.toISOString();
                          if (voucher.validTo !== date) {
                            edits[key] = date;
                            isEdited = true;
                          }
                        } else {
                          edits[key] = null;
                          isEdited = true;
                        }
                        break;
                      case "minPurchase":
                      case "percentDiscount":
                      case "maxDiscount":
                        edits[key] = parseFloat(value);
                        break;
                      case "stock":
                      case "maxUsage":
                        edits[key] = parseInt(value);
                        break;
                      default:
                        edits[key] = value;
                        break;
                    }
                  }
                );
                // check if edit occured to prevent useless mutation call
                if (!isEdited) {
                  Toast.fire({ type: "warning", title: "No edit detected" });
                  return;
                }
                // do mutation
                editVoucher({
                  variables: {
                    id: this.props.voucherId,
                    input: edits
                  },
                  refetchQueries: [this.props.query]
                })
                  .then(() => {
                    this.props.setAlert({
                      message: `Success! ${voucher.name} has been updated!`,
                      variant: "success"
                    });
                    const validFrom = this.state.voucherData.validFrom;
                    const validTo = this.state.voucherData.validTo;
                    this.emptyVoucherData();
                    this.setVoucherData({
                      validFrom: validFrom,
                      validTo: validTo
                    });
                  })
                  .catch(error => {
                    Toast.fire({
                      type: "error",
                      title: `Oops! ${error.message || error}`
                    });
                    this.emptyVoucherData();
                  });
              }}
              onReset={() => {
                this.emptyVoucherData();
                this.setVoucherData({
                  validFrom: voucher.validFrom
                    ? new Date(voucher.validFrom)
                    : null,
                  validTo: voucher.validTo ? new Date(voucher.validTo) : null
                });
              }}
            >
              {!isAdmin() ? null : (
                <React.Fragment>
                  <FormGroup row>
                    <Col md={3}>
                      <Label htmlFor="is-enable">Enable voucher?</Label>
                    </Col>
                    <Col xs={12} md={9}>
                      <AppSwitch
                        className={"mx-1"}
                        variant={"pill"}
                        color={"success"}
                        defaultChecked={voucher.isEnable}
                        onChange={e =>
                          this.setVoucherData({ isEnable: e.target.checked })
                        }
                      />
                    </Col>
                  </FormGroup>
                  <hr />
                </React.Fragment>
              )}
              {/* <TextInput
                fieldName="Code"
                leftUnit={isMerchant() ? getMerchantCode() : false}
                defaultValue={voucher.code}
                onChange={e => this.setVoucherData({ code: e.target.value })}
              /> */}
              <TextInput
                fieldName="Name"
                defaultValue={voucher.name}
                onChange={e => this.setVoucherData({ name: e.target.value })}
              />
              <TextAreaInput
                fieldName="Description"
                rows={3}
                defaultValue={voucher.description}
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
                defaultValue={voucher.minPurchase}
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
                defaultValue={voucher.percentDiscount}
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
                defaultValue={voucher.maxDiscount}
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
                defaultValue={voucher.stock}
                onChange={e => this.setVoucherData({ stock: e.target.value })}
              />
              <TextInput
                fieldName="Max Usage"
                numeric
                additionalInfo="Leave empty if there is unlimited max usage per user"
                defaultValue={voucher.maxUsage}
                onChange={e =>
                  this.setVoucherData({ maxUsage: e.target.value })
                }
              />
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

export default withApollo(EditVoucherFragment);
