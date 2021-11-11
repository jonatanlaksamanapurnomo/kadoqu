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
import {
  QUERY_GET_PROMOTIONS,
  MUTATION_EDIT_PROMOTION,
  MUTATION_DELETE_PROMOTION
} from "../gql/promotion";
import Toast from "../components/Toast";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";

const { SearchBar } = Search;

class PromotionList extends React.Component {
  state = {
    selectedPromotions: [],
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
    const query = { query: QUERY_GET_PROMOTIONS };
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
        dataField: "slug",
        text: "Slug",
        editable: false,
        sort: true
      },
      {
        dataField: "isEnable",
        text: "Enabled",
        style: { width: "2rem", fontSize: "large" },
        classes: "text-center p-1 align-middle",
        editable: true,
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
        dataField: "action",
        text: "Action",
        headerAlign: "center",
        style: { width: "8rem" },
        isDummyField: true,
        editable: false,
        csvExport: false,
        formatter: (cell, row) => (
          <div className="d-flex justify-content-around list-action-cell p-n2">
            {/* <a
                rel="noopener noreferrer"
                target="_blank"
                className="fa fa-list"
                href={`/promotions/${row.id}`}
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
              href={`/promotions/edit/${row.id}`}
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
                        mutation: MUTATION_DELETE_PROMOTION,
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
          !(column.dataField === "isEnable") ||
          oldValue === newValue ||
          newValue === ""
        )
          return;
        const input = { isEnable: Boolean(newValue) };
        this.props.client
          .mutate({
            mutation: MUTATION_EDIT_PROMOTION,
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
              title: `${row.name} is ${newValue ? "enabled" : "disabled"}`
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
          selectedPromotions: isSelect
            ? this.state.selectedPromotions.concat([row])
            : this.state.selectedPromotions.filter(el => el.id !== row.id)
        }),
      onSelectAll: (isSelect, rows) => {
        this.setState({
          selectedPromotions: isSelect ? rows : []
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
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.message}</p>;

            return (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={data.getPromotions}
                columns={columns}
                search
                exportCSV={{ onlyExportFiltered: true, exportAll: false }}
              >
                {props => (
                  <Card>
                    <CardHeader className="d-flex justify-content-between">
                      <h2 className="mb-0">Promotions</h2>
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
                        {this.state.selectedPromotions.length === 0 ? null : (
                          <span>
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
                                    title: "Enable all selected promotions?",
                                    type: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes!"
                                  }).then(result => {
                                    if (result.value) {
                                      const promises = this.state.selectedPromotions.map(
                                        promotion =>
                                          this.props.client.mutate({
                                            mutation: MUTATION_EDIT_PROMOTION,
                                            variables: {
                                              id: promotion.id,
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
                                              "Promotions are now enabled!",
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
                                  const promises = this.state.selectedPromotions.map(
                                    promotion =>
                                      this.props.client.mutate({
                                        mutation: MUTATION_EDIT_PROMOTION,
                                        variables: {
                                          id: promotion.id,
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
                                        message: "Promotions are now disabled!",
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
                            <Button
                              onClick={() => {
                                Swal.fire({
                                  title: `Delete all selected promotions?`,
                                  text: "You won't be able to revert this!",
                                  type: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes!"
                                }).then(result => {
                                  if (result.value) {
                                    const promises = this.state.selectedPromotions.map(
                                      promotion =>
                                        this.props.client.mutate({
                                          mutation: MUTATION_DELETE_PROMOTION,
                                          variables: {
                                            id: promotion.id
                                          },
                                          refetchQueries: [query]
                                        })
                                    );
                                    Promise.all(promises)
                                      .then(() => {
                                        this.setState({
                                          selectedPromotions: []
                                        });
                                        this.setAlert({
                                          message:
                                            "Promotions are successfully deleted!",
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
                              Promotion
                              {this.state.selectedPromotions.length === 1
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

export default withApollo(PromotionList);
