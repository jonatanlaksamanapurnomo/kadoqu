import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { withApollo, Query } from "react-apollo";
import {
  Alert,
  Button,
  DropdownButton,
  ButtonGroup,
  Dropdown
} from "react-bootstrap";
import cellEditFactory from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";
import { AppSwitch } from "@coreui/react";
import { paginationOption } from "../data/listConstant";
import { isAdmin } from "../utils/userChecker";
import { numericToCurrency } from "../utils/formatter";
import {
  QUERY_GET_VOUCHERS,
  MUTATION_EDIT_VOUCHER,
  MUTATION_DELETE_VOUCHER
} from "../gql/voucher";
import Toast from "../components/Toast";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";

const { SearchBar } = Search;

class VoucherList extends React.Component {
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
    const query = { query: QUERY_GET_VOUCHERS };
    const columns = [
      {
        dataField: "id",
        hidden: true,
        csvExport: false
      },
      {
        dataField: "name",
        text: "Name",
        editable: false,
        sort: true
      },
      {
        dataField: "merchant",
        text: "Merchant",
        editable: false,
        sort: true,
        formatter: cell => cell || "-"
      },
      {
        dataField: "isEnable",
        text: "Enabled",
        style: { width: "2rem", fontSize: "large" },
        classes: "text-center p-1 align-middle",
        hidden: !isAdmin(),
        editable: isAdmin(),
        sort: true,
        editorRenderer: (editorProps, value, row) => (
          <AppSwitch
            className={"mx-1"}
            variant={"pill"}
            color={"success"}
            defaultChecked={value}
            onChange={e => {
              const isEnable = e.target.checked;
              e.preventDefault();
              if (!isEnable) {
                editorProps.onUpdate(isEnable);
                return;
              }
              Swal.fire({
                title: `Enable ${row.name}?`,
                type: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
              }).then(result => {
                if (result.value) {
                  editorProps.onUpdate(isEnable);
                }
              });
            }}
          />
        ),
        formatter: cell => (
          <i
            className={
              "fa fa-" +
              (cell ? "check-circle text-success" : "times-circle text-danger")
            }
          />
        )
      },
      {
        dataField: "validFrom",
        text: "Valid From",
        editable: false,
        sort: true,
        formatter: cell => (cell ? new Date(cell).toLocaleString() : "-")
      },
      {
        dataField: "validTo",
        text: "Valid To",
        editable: false,
        sort: true,
        formatter: cell => (cell ? new Date(cell).toLocaleString() : "-")
      },
      {
        dataField: "minPurchase",
        text: "Min Purchase",
        editable: false,
        sort: true,
        formatter: cell => "Rp " + numericToCurrency(cell || 0)
      },
      {
        dataField: "percentDiscount",
        text: "Discount (%)",
        editable: false,
        sort: true,
        formatter: cell => cell + "%"
      },
      {
        dataField: "maxDiscount",
        text: "Max Discount",
        editable: false,
        sort: true,
        formatter: cell =>
          cell !== null ? "Rp " + numericToCurrency(cell) : "Unlimited"
      },
      {
        dataField: "stock",
        text: "Stock",
        editable: false,
        sort: true,
        formatter: cell => (cell !== null ? cell : "Unlimited")
      },
      {
        dataField: "maxUsage",
        text: "Max Usage",
        editable: false,
        sort: true,
        formatter: cell => (cell !== null ? cell : "Unlimited")
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
              {/* <a
                rel="noopener noreferrer"
                target="_blank"
                className="fa fa-list"
                href={`/vouchers/${row.id}`}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {" "}
              </a> */}
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="fa fa-pencil"
                href={`/vouchers/edit/${row.id}`}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {" "}
              </a>
              <i
                className="fa fa-trash"
                onClick={e => {
                  e.stopPropagation();
                  Swal.fire({
                    title: `Delete ${row.name}?`,
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
                            id: row.id
                          },
                          refetchQueries: [query]
                        })
                        .then(() =>
                          this.setAlert({
                            message: `${row.name} is successfully deleted!`,
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
    const defaultSorted = [{ dataField: "name", order: "asc" }];
    const cellEditOption = {
      mode: "dbclick",
      blurToSave: false,
      beforeSaveCell: (oldValue, newValue, row, column, done) => {
        if (
          !(column.dataField === "isEnable" || column.dataField === "stock") ||
          oldValue === newValue ||
          newValue === ""
        )
          return;
        if (column.dataField === "stock" && /\D/g.test(newValue)) {
          Toast.fire({
            type: "warning",
            title: "Stock should be in integer"
          });
          return;
        }
        const input =
          column.dataField === "isEnable"
            ? { isEnable: Boolean(newValue) }
            : { stock: parseInt(newValue) };
        this.props.client
          .mutate({
            mutation: MUTATION_EDIT_VOUCHER,
            variables: {
              id: row.id,
              input: {
                ...input
              }
            },
            refetchQueries: [query]
          })
          .then(e => {
            Toast.fire({
              type: "success",
              title:
                column.dataField === "isEnable"
                  ? `${row.name} is ${newValue ? "enabled" : "disabled"}`
                  : `Stock of ${row.name} has beed updated`
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
        <Query {...query}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `error`;
            return (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={data.getVouchers}
                columns={columns}
                search
                exportCSV={{ onlyExportFiltered: true, exportAll: false }}
              >
                {props => (
                  <Card>
                    <CardHeader className="d-flex justify-content-between">
                      <h2 className="mb-0">Vouchers</h2>
                    </CardHeader>
                    <CardBody>
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
                        {this.state.selectedVouchers.length === 0 ? null : (
                          <span>
                            {!isAdmin() ? null : (
                              <DropdownButton
                                variant="info"
                                as={ButtonGroup}
                                title={
                                  <span>
                                    <i className="fa fa-flash" /> Fast Edit
                                  </span>
                                }
                                id="edit-nested-dropdown"
                              >
                                <Dropdown.Item
                                  as="button"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Enable all selected vouchers?",
                                      type: "question",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes!"
                                    }).then(result => {
                                      if (result.value) {
                                        const promises = this.state.selectedVouchers.map(
                                          voucher =>
                                            this.props.client.mutate({
                                              mutation: MUTATION_EDIT_VOUCHER,
                                              variables: {
                                                id: voucher.id,
                                                input: {
                                                  isEnable: true
                                                }
                                              },
                                              refetchQueries: [query]
                                            })
                                        );
                                        Promise.all(promises)
                                          .then(() =>
                                            this.setAlert({
                                              message:
                                                "Vouchers are now enabled!",
                                              variant: "success"
                                            })
                                          )
                                          .catch(error =>
                                            Toast.fire({
                                              title: `Oops! ${error.message ||
                                                error}`,
                                              type: "error"
                                            })
                                          );
                                      }
                                    });
                                  }}
                                >
                                  Enable selected
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() => {
                                    const promises = this.state.selectedVouchers.map(
                                      voucher =>
                                        this.props.client.mutate({
                                          mutation: MUTATION_EDIT_VOUCHER,
                                          variables: {
                                            id: voucher.id,
                                            input: {
                                              isEnable: false
                                            }
                                          },
                                          refetchQueries: [query]
                                        })
                                    );
                                    Promise.all(promises)
                                      .then(() =>
                                        this.setAlert({
                                          message: "Vouchers are now disabled!",
                                          variant: "success"
                                        })
                                      )
                                      .catch(error =>
                                        Toast.fire({
                                          title: `Oops! ${error.message ||
                                            error}`,
                                          type: "error"
                                        })
                                      );
                                  }}
                                >
                                  Disable selected
                                </Dropdown.Item>
                              </DropdownButton>
                            )}
                            <Button
                              onClick={() => {
                                Swal.fire({
                                  title: `Delete all selected vouchers?`,
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
                                          mutation: MUTATION_DELETE_VOUCHER,
                                          variables: {
                                            id: voucher.id
                                          },
                                          refetchQueries: [query]
                                        })
                                    );
                                    Promise.all(promises)
                                      .then(() => {
                                        this.setState({ selectedVouchers: [] });
                                        this.setAlert({
                                          message:
                                            "Vouchers are successfully deleted!",
                                          variant: "success"
                                        });
                                      })
                                      .catch(error =>
                                        Toast.fire({
                                          title: `Oops! ${error.message ||
                                            error}`,
                                          type: "error"
                                        })
                                      );
                                  }
                                });
                              }}
                              variant="danger"
                              className="ml-1"
                            >
                              <i className="fa fa-trash" /> Delete Selected
                              Voucher
                              {this.state.selectedVouchers.length === 1
                                ? null
                                : "s"}
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
                    </CardBody>
                  </Card>
                )}
              </ToolkitProvider>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withApollo(VoucherList);
