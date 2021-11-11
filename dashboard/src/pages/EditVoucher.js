import React, { Component } from "react";
import { Alert, Tab, Tabs } from "react-bootstrap";
import { withApollo, Query } from "react-apollo";
import Swal from "sweetalert2";
import {
  QUERY_GET_VOUCHER,
  MUTATION_DELETE_VOUCHER,
  QUERY_GET_VOUCHERS
} from "../gql/voucher";
import { isAdmin, getUserName } from "../utils/userChecker";
import EditVoucherFragment from "../components/EditVoucherFragment";
import EditVoucherCodeFragment from "../components/EditVoucherCodeFragment";
import EditVoucherCategoryFragment from "../components/EditVoucherCategoryFragment";
import EditVoucherProductFragment from "../components/EditVoucherProductFragment";
import EditVoucherMerchantFragment from "../components/EditVoucherMerchantFragment";
import Toast from "../components/Toast";

class EditVoucher extends Component {
  state = {
    alert: {
      message: "",
      variant: undefined
    }
  };

  componentDidMount = () => {
    this.props.client
      .query({
        query: QUERY_GET_VOUCHER,
        variables: {
          id: this.props.match.params.id
        }
      })
      .then(({ data }) => {
        if (!data) return this.props.history.push("/404");
        const { merchant, isEnable } = data.getVoucher;
        if (!isAdmin() && (isEnable || merchant !== getUserName())) {
          return this.props.history.push("/404");
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
    const voucherId = this.props.match.params.id;
    const query = {
      query: QUERY_GET_VOUCHER,
      variables: {
        id: voucherId
      }
    };
    return (
      <Query {...query}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>{error.message || error}</p>;
          const voucher = data.getVoucher;

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
                  Edit <strong>{voucher.name}</strong>
                </h4>
                <h3>
                  <i
                    className="fa fa-trash text-danger cursor-pointer"
                    onClick={() => {
                      Swal.fire({
                        title: `Delete ${voucher.name}?`,
                        text: "You won't be able to revert this!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes!"
                      }).then(result => {
                        if (result.value) {
                          this.props.client
                            .mutate({
                              mutation: MUTATION_DELETE_VOUCHER,
                              variables: {
                                id: voucherId
                              },
                              refetchQueries: [{ query: QUERY_GET_VOUCHERS }]
                            })
                            .then(() => {
                              Toast.fire({
                                type: "success",
                                title: `${voucher.name} has been deleted`
                              });
                              this.props.history.push("/vouchers");
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
                <Tab eventKey={0} title="Voucher">
                  <EditVoucherFragment
                    voucherId={voucherId}
                    voucher={voucher}
                    setAlert={this.setAlert}
                    query={query}
                    toast={Toast}
                  />
                </Tab>
                <Tab eventKey={1} title="Codes">
                  <EditVoucherCodeFragment
                    voucherId={voucherId}
                    voucher={voucher}
                    setAlert={this.setAlert}
                    query={query}
                    toast={Toast}
                  />
                </Tab>
                <Tab eventKey={2} title="Categories">
                  <EditVoucherCategoryFragment
                    voucherId={voucherId}
                    voucher={voucher}
                    setAlert={this.setAlert}
                    toast={Toast}
                  />
                </Tab>
                <Tab eventKey={3} title="Products">
                  <EditVoucherProductFragment
                    voucherId={voucherId}
                    voucher={voucher}
                    setAlert={this.setAlert}
                    toast={Toast}
                  />
                </Tab>
                <Tab eventKey={4} title="Merchants">
                  <EditVoucherMerchantFragment
                    voucherId={voucherId}
                    voucher={voucher}
                    setAlert={this.setAlert}
                    toast={Toast}
                  />
                </Tab>
              </Tabs>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(EditVoucher);
