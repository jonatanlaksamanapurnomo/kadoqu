import React from "react";
import { withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";
import { Button, Col, Form } from "reactstrap";
import { Mutation } from "react-apollo";
import { Row, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { MUTATION_EDIT_PRODUCT } from "../gql/product";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";
import {
  MUTATION_ADD_PRODUCT_REVIEW,
  MUTATION_SET_PRODUCT_REVIEWS_STATUS
} from "../gql/product-review";

import "react-datepicker/dist/react-datepicker.css";

class EditProductHolidyDate extends React.Component {
  state = {
    dates: [],
    days: []
  };

  componentDidMount = () => {
    this.resetFormData();
  };

  resetFormData = () => {
    if (this.props.productDetail && this.props.productDetail.date) {
      this.setState({
        dates:
          this.props.productDetail.date.dates.map(value => ({
            from: new Date(value.from),
            to: new Date(value.to)
          })) || [],
        days: this.props.productDetail.date.days || []
      });
    } else {
      this.setState({
        dates: [],
        days: []
      });
    }
  };

  addData = () => {
    this.setState({
      dates: [
        ...this.state.dates,
        {
          from: new Date(),
          to: new Date()
        }
      ]
    });
  };

  setData = (i, key, value) => {
    let dates = this.state.dates;
    dates[i][key] = value;
    this.setState({ dates: dates });
  };

  removeData = i => {
    let dates = this.state.dates;
    dates.splice(i, 1);
    this.setState({ dates: dates });
  };

  render() {
    const productDetail = this.props.productDetail || {};
    const Toast = this.props.toast;
    return (
      <Mutation mutation={MUTATION_EDIT_PRODUCT}>
        {(editProduct, { loading }) => {
          if (loading) {
            LoadingAlert("Editing Product Holiday");
          } else {
            CloseLoadingAlert();
          }
          return (
            <Form
              onReset={e => {
                e.preventDefault();
                this.resetFormData();
              }}
              onSubmit={e => {
                e.preventDefault();
                const dates = this.state.dates.map(value => ({
                  from: value.from.toDateString(),
                  to: value.to.toDateString()
                }));
                const days = this.state.days;
                const obj = this.props.productDetail
                  ? { refetchQueries: [this.props.query] }
                  : {};

                editProduct({
                  variables: {
                    id: this.props.productId,
                    edits: {
                      date: {
                        dates: dates,
                        days: days
                      }
                    }
                  },
                  ...obj
                })
                  .then(() => {
                    this.props.productDetail &&
                      this.props.setAlert({
                        message: `Success! ${productDetail.name ||
                          ""} date has been updated!`,
                        variant: "success"
                      });
                    !this.props.productDetail &&
                      this.props.history.push("/products");
                  })
                  .catch(error => {
                    Toast.fire({
                      type: "error",
                      title: `Oops! ${error.message || error}`
                    });
                  });
              }}
              className="form-horizontal"
            >
              <Container fluid>
                <Row>
                  <Col xs={12}>
                    <h3>Dates</h3>
                  </Col>
                  {this.state.dates.map((value, i) => (
                    <>
                      <Col xs={2}>#{i + 1}</Col>
                      <Col xs={4}>
                        Date From{" "}
                        <DatePicker
                          selected={value.from}
                          onChange={e => {
                            this.setData(i, "from", e);
                          }}
                          dateFormat="dd/MM/yyyy"
                          minDate={new Date()}
                        />
                      </Col>
                      <Col xs={4}>
                        Date To{" "}
                        <DatePicker
                          selected={value.to}
                          onChange={e => {
                            this.setData(i, "to", e);
                          }}
                          dateFormat="dd/MM/yyyy"
                          minDate={value.from}
                        />
                      </Col>
                      <Col xs={2}>
                        <Button
                          color="danger"
                          onClick={() => this.removeData(i)}
                        >
                          <i className="fa fa-trash" />
                        </Button>
                      </Col>
                    </>
                  ))}
                  <Col xs={12}>
                    <Button color="success" onClick={this.addData}>
                      <i className="fa fa-plus"></i> Add
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col xs={12}>
                    <h3>Days</h3>
                  </Col>
                  <Col xs={6}>
                    <Select
                      isMulti
                      value={this.state.days.map(value => ({
                        label: value,
                        value: value
                      }))}
                      options={[
                        "Everyday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday"
                      ].map(value => ({
                        label: value,
                        value: value
                      }))}
                      onChange={e =>
                        this.setState({
                          days: e ? e.map(value => value.value) : []
                        })
                      }
                    ></Select>
                  </Col>
                </Row>
              </Container>
              <div className="mt-3 d-flex justify-content-center">
                <Button
                  onClick={() => {
                    this.props.client
                      .mutate({
                        mutation: MUTATION_ADD_PRODUCT_REVIEW,
                        variables: {
                          productId: this.props.productId
                        }
                      })
                      .then(() => {
                        this.props.client.mutate({
                          mutation: MUTATION_SET_PRODUCT_REVIEWS_STATUS,
                          variables: {
                            status: false,
                            productId: this.props.productId
                          }
                        });
                      });
                  }}
                  type="submit"
                  color="primary"
                  className="w-25 mr-2"
                >
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

export default withApollo(withRouter(EditProductHolidyDate));
