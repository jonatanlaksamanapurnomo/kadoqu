import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { withApollo, Mutation } from "react-apollo";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form
} from "reactstrap";
import { Alert } from "react-bootstrap";
import cellEditFactory from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";
import { TextInput } from "./FormComponents";
import { paginationOption } from "../data/listConstant";
import { isAdmin } from "../utils/userChecker";
import {
  MUTATION_ADD_VOUCHER_CODE,
  MUTATION_EDIT_VOUCHER_CODE,
  MUTATION_DELETE_VOUCHER_CODE
} from "../gql/voucher";
import Toast from "./Toast";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../pages/List.css";

const { SearchBar } = Search;

class EditVoucherCodeFragment extends React.Component {
  state = {
    selectedVouchers: [],
    alert: {
      message: "",
      variant: undefined
    }
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
    const codes = this.props.voucher.voucherCodes;
    const columns = [
      {
        dataField: "id",
        hidden: true,
        csvExport: false
      },
      {
        dataField: "code",
        text: "Code",
        sort: true
      },
      {
        dataField: "action",
        text: "Action",
        headerAlign: "center",
        style: { width: "8rem" },
        isDummyField: true,
        editable: false,
        csvExport: false,
        formatter: (cell, row) =>
          !isAdmin() && row.isEnable ? (
            <div className="text-muted text-center small p-n2">
              Actions disabled for this voucher
            </div>
          ) : (
            <div className="d-flex justify-content-around list-action-cell p-n2">
              <i
                className="fa fa-trash"
                onClick={e => {
                  e.stopPropagation();
                  Swal.fire({
                    title: `Delete ${row.code}?`,
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
                          mutation: MUTATION_DELETE_VOUCHER_CODE,
                          variables: {
                            id: row.id
                          },
                          refetchQueries: [this.props.query]
                        })
                        .then(() =>
                          this.setAlert({
                            message: `${row.code} is successfully deleted!`,
                            variant: "success"
                          })
                        )
                        .catch(error =>
                          Toast.fire({
                            title: `Oops! ${error.message || error}`,
                            type: "error"
                          })
                        );
                    }
                  });
                }}
              />
            </div>
          )
      }
    ];
    const defaultSorted = [{ dataField: "code", order: "asc" }];
    const cellEditOption = {
      mode: "dbclick",
      blurToSave: false,
      beforeSaveCell: (oldValue, newValue, row, column, done) => {
        if (
          !(column.dataField === "code") ||
          oldValue === newValue ||
          newValue === ""
        )
          return;
        const input = { code: newValue };
        this.props.client
          .mutate({
            mutation: MUTATION_EDIT_VOUCHER_CODE,
            variables: {
              id: row.id,
              input: {
                ...input
              }
            },
            refetchQueries: [this.props.query]
          })
          .then(() => {
            Toast.fire({
              type: "success",
              title: `Code of ${row.code} has been updated`
            });
            done();
          })
          .catch(error =>
            Toast.fire({
              type: "error",
              title: `Oops! ${error.message || error}`
            })
          );
      }
    };
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      hideSelectAll: false,
      clickToEdit: true,
      onSelect: (row, isSelect) =>
        this.setState({
          selectedVouchers: isSelect
            ? this.state.selectedVouchers.concat([row])
            : this.state.selectedVouchers.filter(el => el.id !== row.id)
        }),
      onSelectAll: (isSelect, rows) => {
        this.setState({
          selectedVouchers: isSelect ? rows : []
        });
      }
    };

    return (
      <React.Fragment>
        <Alert
          show={this.state.alert.message !== ""}
          variant={this.state.alert.variant}
          onClose={this.resetAlert}
          dismissible
        >
          {this.state.alert.message}
        </Alert>
        <Mutation mutation={MUTATION_ADD_VOUCHER_CODE}>
          {(addVoucherCode, { loading }) => {
            if (loading) {
              LoadingAlert("Adding Voucher Code...");
            } else {
              CloseLoadingAlert();
            }
            return (
              <Form
                action=""
                className="form-horizontal"
                onSubmit={e => {
                  e.preventDefault();
                  const input = e.target;
                  let inputForm = {
                    code: input.code.value,
                    voucherId: this.props.voucherId
                  };

                  addVoucherCode({
                    variables: {
                      input: inputForm
                    },
                    refetchQueries: [this.props.query]
                  })
                    .then(() => {
                      this.props.setAlert({
                        message: `${inputForm.code} is successfully added!`,
                        variant: "success"
                      });
                    })
                    .catch(error => {
                      Toast.fire({
                        type: "error",
                        title: `Oops! ${error.message || error}`
                      });
                    });
                }}
              >
                <Card>
                  <CardHeader>Add Voucher Code</CardHeader>
                  <CardBody>
                    <TextInput fieldName="Code" />
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
        <hr />
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={codes}
          columns={columns}
          search
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
        >
          {props => (
            <>
              <h4>Code</h4>
              <div className="d-flex justify-content-between mb-1">
                <span>
                  {/* <Button
                            variant="success"
                            className="ml-1"
                            onClick={() => props.csvProps.onExport()}
                          >
                            <i className="fa fa-download" /> Export CSV
                          </Button> */}
                </span>
                {this.state.selectedVouchers.length > 0 && (
                  <span>
                    <Button
                      onClick={() => {
                        Swal.fire({
                          title: `Delete all selected voucher codes?`,
                          text: "You won't be able to revert this!",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes!"
                        }).then(result => {
                          if (result.value) {
                            const promises = this.state.selectedVouchers.map(
                              voucher =>
                                this.props.client.mutate({
                                  mutation: MUTATION_DELETE_VOUCHER_CODE,
                                  variables: {
                                    id: voucher.id
                                  },
                                  refetchQueries: [this.props.query]
                                })
                            );
                            Promise.all(promises)
                              .then(() => {
                                this.setState({ selectedVouchers: [] });
                                this.setAlert({
                                  message:
                                    "Voucher codes are successfully deleted!",
                                  variant: "success"
                                });
                              })
                              .catch(error =>
                                Toast.fire({
                                  title: `Oops! ${error.message || error}`,
                                  type: "error"
                                })
                              );
                          }
                        });
                      }}
                      variant="danger"
                      className="ml-1"
                    >
                      <i className="fa fa-trash" /> Delete Selected Voucher
                      {this.state.selectedVouchers.length > 1 && "s"}
                    </Button>
                  </span>
                )}
              </div>
              <SearchBar {...props.searchProps} />
              <BootstrapTable
                bootstrap4
                pagination={paginationFactory(paginationOption)}
                selectRow={selectRow}
                defaultSorted={defaultSorted}
                cellEdit={cellEditFactory(cellEditOption)}
                {...props.baseProps}
                wrapperClasses="table-responsive"
              />
            </>
          )}
        </ToolkitProvider>
      </React.Fragment>
    );
  }
}

export default withApollo(EditVoucherCodeFragment);
