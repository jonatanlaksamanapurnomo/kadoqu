import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader } from "reactstrap";
import { DebounceInput } from "react-debounce-input";
import { InputGroup, FormControl, Row, Col, Spinner } from "react-bootstrap";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Query, withApollo } from "react-apollo";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import cellEditFactory from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";
import { AppSwitch } from "@coreui/react";
import ReactExport from "react-data-export";
import AddProductCSVModal from "../components/AddProductCSVModal";
import NavLink from "../components/NavLink";
import { paginationOption } from "../data/listConstant";
import { isAdmin } from "../utils/userChecker";
import { rpFormat } from "../utils/currencyFormatter";
import {
  MUTATION_DELETE_PRODUCT,
  MUTATION_EDIT_PRODUCT,
  QUERY_GET_PRODUCT,
  QUERY_GET_PRODUCTS,
  QUERY_GET_ALL_PRODUCTS
} from "../gql/product";
import { MUTATION_DELETE_PHOTO } from "../gql/photo";
import { LoadingAlert, CloseLoadingAlert } from "../components/Loader";
import {
  getFullDateTime,
  getFullDateTimeName
} from "../utils/dateTimeFormatter";
import Toast from "../components/Toast";
import {
  MUTATION_DELETE_DOCUMENT,
  MUTATION_ADD_DOCUMENT,
  MUTATION_DELETE_ALL_DOCUMENT,
  MUTATION_ADD_ALL_DOCUMENT
} from "../gql/elasticsearch";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";
import "./OrderList.css";
import {
  MUTATION_ADD_PRODUCT_REVIEW,
  MUTATION_SET_PRODUCT_REVIEWS_STATUS
} from "../gql/product-review";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = props => (
  <ExcelFile
    element={
      <Button color="primary" className="ml-1">
        <i className="fa fa-download"/> Export Excel
      </Button>
    }
    filename={`Products-${getFullDateTimeName(new Date())}`}
  >
    <ExcelSheet data={props.data} name="Products">
      <ExcelColumn label="SKU" value="sku"/>
      <ExcelColumn label="Name" value="name"/>
      <ExcelColumn label="Merchant" value="merchant"/>
      <ExcelColumn label="Short Description" value="shortDescription"/>
      <ExcelColumn label="Long Description" value="longDescription"/>
      <ExcelColumn label="Shipment Description" value="shipmentDescription"/>
      <ExcelColumn label="Capital Price" value="capitalPrice"/>
      <ExcelColumn label="Merchant Price" value="merchantPrice"/>
      <ExcelColumn label="Price" value="price"/>
      <ExcelColumn
        label="Merchant Discount"
        value={col => col.merchantDiscount || ""}
      />
      <ExcelColumn
        label="Merchant Discount Until"
        value={col =>
          col.merchantDiscountUntil
            ? getFullDateTime(col.merchantDiscountUntil)
            : ""
        }
      />
      <ExcelColumn
        label="Kadoqu Discount"
        value={col => col.kadoquDiscount || ""}
      />
      <ExcelColumn
        label="Kadoqu Discount Until"
        value={col =>
          col.kadoquDiscountUntil
            ? getFullDateTime(col.kadoquDiscountUntil)
            : ""
        }
      />
      <ExcelColumn label="Stock" value="stock"/>
      <ExcelColumn label="PO" value={col => (col.isPo ? "True" : "False")}/>
      <ExcelColumn
        label="Enabled"
        value={col => (col.isEnable ? "True" : "False")}
      />
      <ExcelColumn label="URL Key" value="slug"/>
    </ExcelSheet>
  </ExcelFile>
);

class ProductList extends React.Component {
  state = {
    isCSVModalOpen: false,
    selectedProducts: [],
    alert: {
      message: "",
      variant: undefined
    },
    page: 1,
    sizePerPage: 10,
    keyword: "",
    currentPage: "",
    reviewedProducts: []
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

  handleTableChange = (
    type,
    { page, sizePerPage, filters, sortField, sortOrder, cellEdit }
  ) => {
    switch (type) {
      case "pagination":
        this.setState({
          page: page,
          sizePerPage: sizePerPage,
          selectedProducts: []
        });
        break;
      // case 'search':
      //   this.setState({
      //     search:
      //   })
      case "filter":
        this.setState({
          filters: filters
        });
        break;
      case "sort":
        this.setState({
          sortField: sortField || "date",
          isAscending: sortOrder === "asc"
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { page, sizePerPage, keyword } = this.state;
    const query = {
      query: QUERY_GET_ALL_PRODUCTS,
      variables: {
        limit: sizePerPage,
        offset: (page - 1) * sizePerPage,
        keyword: keyword
      }
    };
    const columns = [
      {
        dataField: "id",
        hidden: true,
        csvExport: false
      },
      {
        dataField: "sku",
        text: "SKU",
        editable: false,
        csvExport: false,
        sort: true
      },
      {
        dataField: "name",
        text: "Product Name",
        editable: false,
        sort: true
      },
      {
        dataField: "slug",
        text: "URL Key",
        editable: false,
        sort: true
      },
      {
        dataField: "merchant",
        text: "Merchant Name",
        editable: false,
        sort: true
      },
      {
        dataField: "isEnable",
        text: "Enabled",
        style: { width: "2rem", fontSize: "large" },
        classes: "text-center p-1 align-middle",
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
              if (isAdmin()) {
                if (!isEnable) {
                  return this.props.client
                    .mutate({
                      mutation: MUTATION_DELETE_DOCUMENT,
                      variables: {
                        id: row.id
                      }
                    })
                    .then(() => {
                      editorProps.onUpdate(isEnable);
                      return;
                    });
                }
                return this.props.client
                  .mutate({
                    mutation: MUTATION_ADD_DOCUMENT,
                    variables: {
                      data: row
                    }
                  })
                  .then(() => {
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
                  });
              } else {
                if (!isEnable) {
                  Swal.fire({
                    title: "Oops...",
                    text: "Anda Tidak Bisa Mengubah Status Product Yang sedang active!",
                    footer: "<a href>Why do I have this issue?</a>"
                  }).then(() => {
                    this.props.history.push("/products/list");
                  });
                } else {
                  this.props.client.mutate({
                    mutation: MUTATION_ADD_PRODUCT_REVIEW,
                    variables: {
                      productId: row.id
                    }
                  }).then((e) => {
                    this.props.client.mutate({
                      mutation: MUTATION_SET_PRODUCT_REVIEWS_STATUS,
                      variables: {
                        status: false,
                        productId: row.id
                      }
                    }).then(() => {
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Request Product Anda Akan Segera Kami Proses",
                        showConfirmButton: true
                      }).then(() => {
                        this.props.history.push("/products/rejected");
                      });
                    });
                  });
                }
              }

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
        dataField: "stock",
        text: "Stock",
        sort: true
      },
      {
        dataField: "price",
        text: "Price",
        editable: false,
        sort: true,
        formatter: (cell, row) => rpFormat(isAdmin() ? cell : row.merchantPrice)
      },
      // {
      //   dataField: "score",
      //   text: "Score"
      // },
      {
        dataField: "action",
        text: "Action",
        headerAlign: "center",
        style: { width: "8rem" },
        isDummyField: true,
        editable: false,
        csvExport: false,
        formatter: (cell, row) => {
          return (
            <div
              className="d-flex justify-content-around list-action-cell p-n2">
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="fa fa-pencil"
                href={`/products/edit/${row.id}`}
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
                      let promises = [
                        this.props.client
                          .query({
                            query: QUERY_GET_PRODUCT,
                            variables: {
                              id: row.id
                            }
                          })
                          .then(res => {
                            const { photos } = res.data.getProduct;
                            photos.forEach(item => {
                              this.props.client.mutate({
                                mutation: MUTATION_DELETE_PHOTO,
                                variables: {
                                  productId: row.id,
                                  url: item.url
                                }
                              });
                            });
                          }),
                        this.props.client.mutate({
                          mutation: MUTATION_DELETE_PRODUCT,
                          variables: {
                            id: row.id
                          },
                          refetchQueries: [query]
                        })
                      ];
                      Promise.all(promises)
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
          );
        }
      }
    ];
    const defaultSorted = [{ dataField: "sku", order: "asc" }];
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
        const edits =
          column.dataField === "isEnable"
            ? { isEnable: Boolean(newValue) }
            : { stock: parseInt(newValue) };
        this.props.client
          .mutate({
            mutation: MUTATION_EDIT_PRODUCT,
            variables: {
              id: row.id,
              edits: {
                ...edits
              }
            },
            refetchQueries: [query]
          })
          .then(() => {
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
          selectedProducts: isSelect
            ? this.state.selectedProducts.concat([row])
            : this.state.selectedProducts.filter(el => el.id !== row.id)
        }),
      onSelectAll: (isSelect, rows) => {
        this.setState({
          selectedProducts: isSelect ? rows : []
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
        <Card className="order-list-card">
          <CardHeader className="d-flex justify-content-between">
            <h2 className="mb-0">Products</h2>
            {isAdmin() && (
              <NavLink href="/products/list-by-category">
                <small>See product list by category</small>
              </NavLink>
            )}
          </CardHeader>

          <CardBody>
            <Row>
              <Col xs={6} className="mb-3">
                <Query
                  query={QUERY_GET_PRODUCTS}
                >
                  {({ loading, error, data }) => {
                    if (loading)
                      return (
                        <Row className="text-center">
                          <Col xs={12}>
                            <Spinner animation="border"/>
                          </Col>
                          <Col xs={12} className="mt-2">
                            <p>Loading Buttons...</p>
                          </Col>
                        </Row>
                      );
                    if (error) return <p>Oops! {error.message}</p>;
                    return (
                      <span>
                        <Button
                          onClick={() => {
                            let promises = [];
                            let products = data.getProductsDashboard;

                            promises.push(
                              this.props.client.mutate({
                                mutation: MUTATION_DELETE_ALL_DOCUMENT
                              })
                            );
                            promises.push(
                              this.props.client.mutate({
                                mutation: MUTATION_ADD_ALL_DOCUMENT,
                                variables: {
                                  data: products
                                }
                              })
                            );
                            return Promise.all(promises).then(() =>
                              Swal.fire(
                                "Good job!",
                                "Product Document Updateed! Now Product can be searched in website",
                                "success"
                              )
                            );
                          }}
                        >
                          Import Product Document
                        </Button>

                        <ExportExcel data={data.getProductsDashboard}/>
                      </span>
                    );
                  }}
                </Query>
              </Col>
              <Col xs={12}>
                <InputGroup className="mb-3">
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={500}
                    element={FormControl}
                    onChange={event =>
                      this.setState({
                        keyword: event.target.value,
                        page: 1,
                        sizePerPage: 10,
                        selectedProducts: []
                      })
                    }
                  />
                </InputGroup>
              </Col>
            </Row>
            <Query {...query}>
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <Row className="text-center">
                      <Col xs={12}>
                        <Spinner animation="border"/>
                      </Col>
                      <Col xs={12} className="mt-2">
                        <p>Loading Data...</p>
                      </Col>
                    </Row>
                  );
                if (error) {
                  return `${error.message}`;
                }
                const totalSize = data.getAllProductsDashboard.length;
                let products = data.getAllProductsDashboard.products;
                return (
                  <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={
                      data.getAllProductsDashboard.products
                        ? products
                        : []
                    }
                    columns={columns}
                    search
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                  >
                    {props => {
                      return (
                        <div>
                          <div
                            className="d-flex justify-content-between float-right mb-1">
                            {this.state.selectedProducts.length === 0 ? null : (
                              <span>
                                {!isAdmin() ? null : (
                                  <DropdownButton
                                    variant="info"
                                    as={ButtonGroup}
                                    title={
                                      <span>
                                        <i className="fa fa-flash"/> Fast Edit
                                      </span>
                                    }
                                    id="edit-nested-dropdown"
                                  >
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        Swal.fire({
                                          title:
                                            "Enable all selected products?",
                                          type: "question",
                                          showCancelButton: true,
                                          confirmButtonColor: "#3085d6",
                                          cancelButtonColor: "#d33",
                                          confirmButtonText: "Yes!"
                                        }).then(result => {
                                          if (result.value) {
                                            const promises = this.state.selectedProducts.map(
                                              product =>
                                                this.props.client.mutate({
                                                  mutation: MUTATION_EDIT_PRODUCT,
                                                  variables: {
                                                    id: product.id,
                                                    edits: {
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
                                                    "Products are now enabled!",
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
                                        const promises = this.state.selectedProducts.map(
                                          product =>
                                            this.props.client.mutate({
                                              mutation: MUTATION_EDIT_PRODUCT,
                                              variables: {
                                                id: product.id,
                                                edits: {
                                                  isEnable: false
                                                }
                                              },
                                              refetchQueries: [query]
                                            })
                                        );
                                        Promise.all(promises)
                                          .then(() =>
                                            this.setAlert({
                                              message:
                                                "Products are now disabled!",
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
                                      title: `Delete all selected products?`,
                                      text: "You won't be able to revert this!",
                                      type: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes!"
                                    }).then(result => {
                                      LoadingAlert();
                                      if (result.value) {
                                        const promises = this.state.selectedProducts.map(
                                          product => {
                                            let secondPromises = [
                                              product.photos.forEach(item => {
                                                this.props.client.mutate({
                                                  mutation: MUTATION_DELETE_PHOTO,
                                                  variables: {
                                                    productId: product.id,
                                                    url: item.url
                                                  }
                                                });
                                              }),
                                              this.props.client.mutate({
                                                mutation: MUTATION_DELETE_PRODUCT,
                                                variables: {
                                                  id: product.id
                                                },
                                                refetchQueries: [query]
                                              })
                                            ];
                                            return Promise.all(secondPromises);
                                          }
                                        );
                                        Promise.all(promises)
                                          .then(() => {
                                            this.setState({
                                              selectedProducts: []
                                            });
                                            CloseLoadingAlert();
                                            this.setAlert({
                                              message:
                                                "Products are successfully deleted!",
                                              variant: "success"
                                            });
                                          })
                                          .catch(error =>
                                            Toast.fire({
                                              title: `Oopszzz! ${error.message ||
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
                                  <i className="fa fa-trash"/> Delete Selected
                                  Product
                                  {this.state.selectedProducts.length === 1
                                    ? null
                                    : "s"}
                                </Button>
                              </span>
                            )}
                          </div>
                          {/* <SearchBar {...props.searchProps} /> */}
                          <BootstrapTable
                            keyField="id"
                            bootstrap4
                            remote
                            pagination={paginationFactory(
                              paginationOption(page, sizePerPage, totalSize)
                            )}
                            selectRow={selectRow}
                            filter={filterFactory()}
                            defaultSorted={defaultSorted}
                            cellEdit={cellEditFactory(cellEditOption)}
                            onTableChange={this.handleTableChange}
                            {...props.baseProps}
                            wrapperClasses="table-responsive"
                          />
                        </div>
                      );
                    }}
                  </ToolkitProvider>
                );
              }}
            </Query>
          </CardBody>
        </Card>
        <AddProductCSVModal
          show={this.state.isCSVModalOpen}
          onHide={() => this.setState({ isCSVModalOpen: false })}
        />
      </React.Fragment>
    );
  }
}

export default withApollo(ProductList);
