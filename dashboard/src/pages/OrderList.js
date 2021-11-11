import React from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Card, CardBody, CardHeader } from "reactstrap";
import {
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Spinner
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { DebounceInput } from "react-debounce-input";
import filterFactory from "react-bootstrap-table2-filter";
import { Query, withApollo } from "react-apollo";
import ReactExport from "react-data-export";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  QUERY_GET_ORDER_STATUS,
  QUERY_GET_ORDERS_BY_STATUS,
  QUERY_GET_ORDERS_BY_STATUS_ALL
} from "../gql/order";
import { paginationOption } from "../data/listConstant";
import { numericToCurrency } from "../utils/formatter";
import { isAdmin, getUserName } from "../utils/userChecker";
import { getFullDate, getFullDateTimeName } from "../utils/dateTimeFormatter";
import { compareValues } from "../utils/sort";
import DownloadInvoices from "../components/DownloadInvoices";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./List.css";
import "./OrderList.css";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const MerchantName = getUserName();
// const ExportExcel = props => {
//   let data = [];
//   return (

//   );
// };

class ExportExcel extends React.Component {
  state = {
    statuses: []
  };
  componentDidMount = () => {
    this.setState({
      statuses: this.props.statuses
    });
  };

  componentDidUpdate = () => {
    if (
      JSON.stringify(this.props.statuses) !==
      JSON.stringify(this.state.statuses)
    ) {
      this.setState({
        statuses: this.props.statuses
      });
    }
  };
  render() {
    let { statuses } = this.state;
    return (
      <Query
        query={QUERY_GET_ORDERS_BY_STATUS_ALL}
        variables={{
          statuses: statuses
        }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Row className="text-center">
                <Col xs={12}>
                  <Spinner animation="border" />
                </Col>
                <Col xs={12} className="mt-2">
                  <p>Loading Invoices Button...</p>
                </Col>
              </Row>
            );
          if (error) return <p>Oops! {error.message}</p>;
          let orders = [];
          orders = data.getAllOrdersStatusList;
          orders.forEach(order => {
            order.merchants = [
              ...new Set([
                ...order.orderProducts.map(e => e.product.merchant),
                ...[].concat(
                  ...order.orderWrappings.map(e =>
                    e.items.map(item => item.product.merchant)
                  )
                )
              ])
            ].join(", ");
            order.products = [
              ...new Set([
                ...order.orderProducts.map(e => e.product.name),
                ...[].concat(
                  ...order.orderWrappings.map(e =>
                    e.items.map(item => item.product.name)
                  )
                )
              ])
            ].join(", ");
            order.totalProducts = [
              ...order.orderProducts.map(e => e.quantity),
              ...[].concat(
                ...order.orderWrappings.map(e =>
                  e.items.map(item => item.quantity)
                )
              )
            ].reduce((total, value) => total + parseInt(value), 0);
          });
          let orderList = JSON.parse(JSON.stringify(orders)).sort(
            compareValues("number")
          );
          let orderDetails = [];
          orderList.forEach(order => {
            if (order.orderWrappings.length > 0) {
              order.orderWrappings.forEach(item => {
                item.items.forEach(products => {
                  const orderProduct = order.orderProducts.find(
                    e => e.product.id === products.product.id
                  );
                  if (orderProduct) {
                    orderProduct.quantity += products.quantity;
                  } else {
                    order.orderProducts.push({
                      product: {
                        ...products.product
                      },
                      quantity: products.quantity
                    });
                  }
                });
              });
            }
          });
          let no = 0;
          orderList.forEach(order => {
            if (order.orderProducts.length > 0) no++;
            order.orderProducts.forEach((value, i) => {
              if (isAdmin()) {
                orderDetails.push(
                  Object.assign({}, order, {
                    no: no,
                    product: value.product,
                    quantity: value.quantity,
                    subtotal: value.quantity * value.product.price,
                    ...(i === 0 && {
                      shipping: order.shippingFee,
                      customerPayment: order.total - order.shippingFee,
                      totalCustomerPayment: order.total
                    })
                  })
                );
              } else if (
                order.orderProducts[i].product.merchant === MerchantName
              ) {
                orderDetails.push(
                  Object.assign({}, order, {
                    no: no,
                    product: value.product,
                    quantity: value.quantity,
                    subtotal: value.quantity * value.product.price
                  })
                );
              }
            });
            if (isAdmin()) {
              let wrappingDetails = [];
              order.orderWrappings.forEach(value => {
                const ribbon = value.ribbon;
                const wrapper = value.wrapper;
                const greetingCard = value.greetingCard;
                if (ribbon) {
                  const orderRibbon = wrappingDetails
                    .filter(e => e.product.ribbonId)
                    .find(e => e.product.typeId === ribbon.typeId);
                  if (orderRibbon) {
                    orderRibbon.quantity++;
                  } else {
                    wrappingDetails.push(
                      Object.assign({}, order, {
                        no: no,
                        product: Object.assign({}, ribbon, {
                          name: ribbon.type,
                          merchantPrice: 0
                        }),
                        quantity: 1
                      })
                    );
                  }
                }
                if (wrapper) {
                  const orderWrapper = wrappingDetails
                    .filter(e => e.product.wrapperId)
                    .find(e => e.product.typeId === wrapper.typeId);
                  if (orderWrapper) {
                    orderWrapper.quantity++;
                  } else {
                    wrappingDetails.push(
                      Object.assign({}, order, {
                        no: no,
                        product: Object.assign({}, wrapper, {
                          name: wrapper.type,
                          merchantPrice: 0
                        }),
                        quantity: 1
                      })
                    );
                  }
                }
                if (greetingCard) {
                  wrappingDetails.push(
                    Object.assign({}, order, {
                      no: no,
                      product: {
                        name: "Greeting Card",
                        merchantPrice: 0,
                        price: 5000
                      },
                      quantity: 1
                    })
                  );
                }
              });
              orderDetails = orderDetails.concat(wrappingDetails);
            }
          });
          //make order detail distinc
          return (
            <ExcelFile
              element={
                <Button color="primary" className="ml-1">
                  <i className="fa fa-download" /> Export Summary
                </Button>
              }
              filename={`Orders ${getFullDateTimeName(new Date())}`}
            >
              <ExcelSheet data={orderDetails} name="Orders">
                <ExcelColumn label="No" value="no" />
                <ExcelColumn label="No Order" value="number" />
                <ExcelColumn
                  label="Order Date"
                  value={col =>
                    col.createdAt !== null ? getFullDate(col.createdAt) : ""
                  }
                />
                <ExcelColumn
                  label="Payment Date"
                  value={col => {
                    const orderTrack = col.orderTracks.find(
                      e => e.orderStatusId === "2"
                    );
                    return (
                      orderTrack &&
                      orderTrack.createdAt &&
                      getFullDate(orderTrack.createdAt)
                    );
                  }}
                />
                <ExcelColumn
                  label="Product SKU"
                  value={col => col.product.sku}
                />
                <ExcelColumn
                  label="Product Name"
                  value={col => col.product.name}
                />
                <ExcelColumn
                  label="Merchant"
                  value={col => col.product.merchant || "-"}
                />
                <ExcelColumn label="Qty" value={col => col.quantity} />
                <ExcelColumn
                  label="Merchant Price"
                  value={col => col.product.merchantPrice}
                />
                <ExcelColumn
                  label="Merchant Discount"
                  value={col => {
                    const merchantDiscountUntil = Date.parse(
                      col.product.merchantDiscountUntil
                    );
                    const orderDate = Date.parse(col.createdAt);
                    if (orderDate <= merchantDiscountUntil)
                      return col.product.merchantDiscount || "-";

                    return "-";
                  }}
                />
                <ExcelColumn
                  label="Merchant Discount Until"
                  value={col => {
                    const merchantDiscountUntil = Date.parse(
                      col.product.merchantDiscountUntil
                    );
                    const orderDate = Date.parse(col.createdAt);
                    if (orderDate <= merchantDiscountUntil)
                      return getFullDate(col.product.merchantDiscountUntil);

                    return "-";
                  }}
                />
                <ExcelColumn
                  label="Kadoqu Capital Price"
                  value={col => {
                    let kadoquCapitalPrice;
                    const merchantDiscountUntil = Date.parse(
                      col.product.merchantDiscountUntil
                    );
                    const orderDate = Date.parse(col.createdAt);
                    //klo pas order ini terjadid ada discount dari merchant
                    if (orderDate <= merchantDiscountUntil) {
                      const merchantDiscount = col.product.merchantDiscount;
                      kadoquCapitalPrice = 0.9 * merchantDiscount;
                    } else {
                      kadoquCapitalPrice = col.product.capitalPrice
                        ? col.product.capitalPrice
                        : 0.9 * col.product.merchantPrice;
                    }

                    return kadoquCapitalPrice;
                  }}
                />
                <ExcelColumn
                  label="Kadoqu Selling Price"
                  value={col => {
                    let kadoquSellingPrice;
                    const merchantDiscountUntil = Date.parse(
                      col.product.merchantDiscountUntil
                    );
                    const orderDate = Date.parse(col.createdAt);
                    //klo waktu ngeorder masi  ada merchant discount
                    if (orderDate <= merchantDiscountUntil) {
                      const merchantDiscount = col.product.merchantDiscount;
                      kadoquSellingPrice = merchantDiscount;
                    } else {
                      kadoquSellingPrice = col.product.price;
                    }

                    return kadoquSellingPrice;
                  }}
                />
                <ExcelColumn
                  label="Kadoqu Discount"
                  value={col => {
                    const kadoquDiscountUntil = Date.parse(
                      col.product.kadoquDiscountUntil
                    );
                    const orderDate = Date.parse(col.createdAt);
                    if (orderDate <= kadoquDiscountUntil)
                      return col.product.kadoquDiscount || "-";

                    return "-";
                  }}
                />
                <ExcelColumn
                  label="Kadoqu Discount Until"
                  value={col => {
                    const kadoquDiscountUntil = Date.parse(
                      col.product.kadoquDiscountUntil
                    );
                    const orderDate = Date.parse(col.createdAt);
                    if (orderDate <= kadoquDiscountUntil)
                      return getFullDate(col.product.kadoquDiscountUntil);

                    return "-";
                  }}
                />
                {/* <ExcelColumn
                  label="Voucher Discount"
                  value={col =>
                    col.voucherDiscount !== null ? col.voucherDiscount : "-"
                  }
                />
                <ExcelColumn
                  label="Voucher Code"
                  value={col =>
                    col.voucherCode !== null ? col.voucherCode : "-"
                  }
                /> */}
                <ExcelColumn
                  label="Digital Marketing"
                  value={col => {
                    let biayaDigitalMarketing = 0;
                    const kadoquDiscountUntil = Date.parse(
                      col.product.kadoquDiscountUntil
                    );
                    // const merchantDiscountUntil = Date.parse(
                    //   col.product.merchantDiscountUntil
                    // );
                    const orderDate = Date.parse(col.createdAt);
                    // const voucherCode = col.voucherCode !== null ? col.voucherCode : "";
                    //klo waktu ngeorde masi ada discount dari kadoqu
                    if (orderDate <= kadoquDiscountUntil) {
                      const kadoquDiscount = col.product.kadoquDiscount;
                      const price = col.product.price;
                      biayaDigitalMarketing = price - kadoquDiscount;
                      // Digital marketing dihitung dari kadoqu discount saja
                      //klo ada discount dari merchant berarti bdm di itung dair harga discount merchant
                      // if (orderDate <= merchantDiscountUntil) {
                      //   let merchantDiscount = col.product.merchantDiscount;
                      //   biayaDigitalMarketing =
                      //     merchantDiscount +
                      //     merchantDiscount * 0.2 -
                      //     (kadoquDiscount + (kadoquDiscount * 20) / 100);
                      // }
                    }

                    //disini blm di hitung klo voucher dari merchant
                    // if (voucherCode !== "") {
                    //   const voucherDiscount = col.voucherDiscount;
                    //   biayaDigitalMarketing += voucherDiscount;
                    // }

                    return biayaDigitalMarketing;
                  }}
                />
                <ExcelColumn
                  label="Total Kadoqu Capital Price"
                  value={col => {
                    let kadoquCapitalPrice;
                    const qty = col.quantity;
                    const merchantDiscountUntil = Date.parse(
                      col.product.merchantDiscountUntil
                    );
                    const orderDate = Date.parse(col.createdAt);
                    //klo pas order ini terjadid ada discount dari merchant
                    if (orderDate <= merchantDiscountUntil) {
                      const merchantDiscount = col.product.merchantDiscount;
                      kadoquCapitalPrice = 0.9 * merchantDiscount;
                    } else {
                      kadoquCapitalPrice = col.product.capitalPrice
                        ? col.product.capitalPrice
                        : 0.9 * col.product.merchantPrice;
                    }

                    return qty * kadoquCapitalPrice;
                  }}
                />
                <ExcelColumn
                  label="Total Selling Price"
                  value={col => {
                    let kadoquSellingPrice;
                    const qty = col.quantity;
                    const merchantDiscountUntil = Date.parse(
                      col.product.merchantDiscountUntil
                    );
                    const orderDate = Date.parse(col.createdAt);
                    //klo waktu ngeorder masi  ada merchant discount
                    if (orderDate <= merchantDiscountUntil) {
                      const merchantDiscount = col.product.merchantDiscount;
                      kadoquSellingPrice = merchantDiscount;
                    } else {
                      kadoquSellingPrice = col.product.price;
                    }

                    return qty * kadoquSellingPrice;
                  }}
                />
                <ExcelColumn
                  label="Total Digital Marketing"
                  value={col => {
                    let biayaDigitalMarketing = 0;
                    const qty = col.quantity;
                    const kadoquDiscountUntil = Date.parse(
                      col.product.kadoquDiscountUntil
                    );
                    // const merchantDiscountUntil = Date.parse(
                    //   col.product.merchantDiscountUntil
                    // );
                    const orderDate = Date.parse(col.createdAt);
                    // const voucherCode = col.voucherCode !== null ? col.voucherCode : "";
                    //klo waktu ngeorde masi ada discount dari kadoqu
                    if (orderDate <= kadoquDiscountUntil) {
                      const kadoquDiscount = col.product.kadoquDiscount;
                      const price = col.product.price;
                      biayaDigitalMarketing = price - kadoquDiscount;
                      // Digital marketing dihitung dari kadoqu discount saja
                      //klo ada discount dari merchant berarti bdm di itung dair harga discount merchant
                      // if (orderDate <= merchantDiscountUntil) {
                      //   let merchantDiscount = col.product.merchantDiscount;
                      //   biayaDigitalMarketing =
                      //     merchantDiscount +
                      //     merchantDiscount * 0.2 -
                      //     (kadoquDiscount + (kadoquDiscount * 20) / 100);
                      // }
                    }

                    //disini blm di hitung klo voucher dari merchant
                    // if (voucherCode !== "") {
                    //   const voucherDiscount = col.voucherDiscount;
                    //   biayaDigitalMarketing += voucherDiscount;
                    // }

                    return qty * biayaDigitalMarketing;
                  }}
                />
                <ExcelColumn label="Customer Payment" value="customerPayment" />
                <ExcelColumn label="Shipping Fee" value="shipping" />
                <ExcelColumn
                  label="Total Customer Payment"
                  value="totalCustomerPayment"
                />
                {/* <ExcelColumn*/}
                {/*  label="Billing"*/}
                {/*  value={col => col.billingAddress.name + "\n" + col.billingAddress.phone}*/}
                {/*/> */}
                {/*<ExcelColumn*/}
                {/*  label="Shipping"*/}
                {/*  value={col =>*/}
                {/*    col.shippingAddress.name + "\n" + col.shippingAddress.phone*/}
                {/*  }*/}
                {/*/> */}
                <ExcelColumn label="Payment Method" value="paymentMethod" />
                <ExcelColumn
                  label="Bank Payment"
                  value={col =>
                    col.paymentConfirmationData &&
                    col.paymentConfirmationData.bank
                  }
                />
                <ExcelColumn
                  label="Customer Name"
                  value={col => col.user.firstName + " " + col.user.lastName}
                />
                <ExcelColumn
                  label="Customer Phone"
                  value={col => col.user.phone}
                />
                <ExcelColumn label="Shipping Method" value="shippingMethod" />
                <ExcelColumn
                  label="Billing Address"
                  value={col =>
                    col.billingAddress
                      ? col.billingAddress.street +
                        ", " +
                        col.billingAddress.subdistrict +
                        "\n" +
                        col.billingAddress.city +
                        ", " +
                        col.billingAddress.province +
                        "\n" +
                        col.billingAddress.postCode
                      : ""
                  }
                />
                <ExcelColumn
                  label="Shipping Address"
                  value={col =>
                    col.shippingAddress
                      ? col.shippingAddress.street +
                        ", " +
                        col.shippingAddress.subdistrict +
                        "\n" +
                        col.shippingAddress.city +
                        ", " +
                        col.shippingAddress.province +
                        "\n" +
                        col.shippingAddress.postCode
                      : ""
                  }
                />
                {/*<ExcelColumn label="Courier Code" value="courierCode"/>*/}
                {/*<ExcelColumn label="Courier Service" value="courierService"/>*/}
                {/*<ExcelColumn label="No Resi" value="resi"/>*/}
                {/*<ExcelColumn label="Voucher Discount" value="voucherDiscount"/>*/}
                {/*<ExcelColumn label="Voucher Code" value="voucherCode"/>*/}
                {/*<ExcelColumn label="Product Discount" value="productDiscount"/>*/}
                <ExcelColumn
                  label="Status"
                  value={col => col.orderStatus.status}
                />
              </ExcelSheet>
            </ExcelFile>
          );
        }}
      </Query>
    );
  }
}
class OrderList extends React.Component {
  state = {
    statusList: {},
    selectedProducts: [],
    page: 1,
    sizePerPage: 10,
    start: null,
    end: null,
    filterDate: "order",
    keyword: "",
    currentPage: ""
  };

  componentDidMount = () => {
    if (
      !["ongoing", "past", "canceled", "all"].includes(
        this.props.match.params.state
      )
    ) {
      this.props.history.push("/orders/ongoing");
    }
    console.log(this.props);
    this.props.client
      .query({
        query: QUERY_GET_ORDER_STATUS
      })
      .then(({ data }) => {
        console.log(data);
        if (!data.getOrderStatuses) {
          return;
        }

        this.setState({
          statusList: Object.assign(
            {},
            ...data.getOrderStatuses.map(statusItem => ({
              [statusItem.id]: statusItem.id
            }))
          ),
          currentPage: this.props.location.pathname
        });
      });
  };
  componentDidUpdate = () => {
    if (this.props.location.pathname !== this.state.currentPage) {
      this.setState({
        page: 1,
        sizePerPage: 10,
        start: null,
        end: null,
        filterDate: "order",
        keyword: "",
        currentPage: this.props.location.pathname,
        selectedProducts: []
      });
    }
  };

  // getAllOrders = param => {
  //   console.log("test");

  // };

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
    const columns = [
      {
        dataField: "id",
        hidden: true,
        csvExport: false
      },
      {
        dataField: "number",
        text: "Order No",
        csvExport: false,
        sort: true
      },
      {
        dataField: "billingAddress.name",
        text: "Bill to",
        sort: true
      },
      {
        dataField: "shippingAddress.name",
        text: "Ship to",
        sort: true
      },
      {
        dataField: "merchants",
        hidden: !isAdmin(),
        text: "Merchants",
        csvExport: false,
        sort: true
      },
      {
        dataField: "products",
        text: "Barang Belanjaan",
        csvExport: false,
        sort: true
      },
      {
        dataField: "totalProducts",
        text: "Total Jumlah Barang",
        csvExport: false,
        sort: true
      },
      {
        dataField: "total",
        hidden: !isAdmin(),
        text: "Grand Total (IDR)",
        classes: "text-right",
        sort: true,
        formatter: (cell, row) => numericToCurrency(cell)
      },
      {
        dataField: "createdAt",
        text: "Order Date",
        sort: true,
        formatter: cell => getFullDate(cell)
      },
      {
        dataField: "orderStatus.status",
        text: "Status",
        sort: true,
        style: (cell, row) => {
          const startEventDate = new Date("2020/03/23");
          const createdAt = new Date(row.createdAt);
          if (
            createdAt >= startEventDate &&
            row.orderStatus.id > 1 &&
            row.orderStatus.id < 6 &&
            row.total - (row.shippingFee || 0) >= 150000
          )
            return {
              backgroundColor: "#77dd77"
            };

          return {};
        }
      },
      {
        dataField: "action",
        text: "Action",
        headerAlign: "center",
        isDummyField: true,
        formatter: (cell, row) => (
          <div className="d-flex justify-content-around list-action-cell p-n2">
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="fa fa-list text-primary"
              href={`/order/${row.id}`}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {" "}
            </a>
          </div>
        ),
        csvExport: false
      }
    ];
    const defaultSorted = [{ dataField: "number", order: "desc" }];
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
    let statuses = Object.values(this.state.statusList).filter(el => {
      switch (this.props.match.params.state) {
        case "ongoing":
          return el !== 5 && el !== 6;
        case "past":
          return el === 5;
        case "canceled":
          return el === 6;
        case "all":
          return el !== 1 && el !== 6;
        default:
          return false;
      }
    });
    const { page, sizePerPage, keyword, start, end } = this.state;
    return (
      statuses.length > 0 && (
        <Card className="order-list-card">
          <CardHeader>
            <h2 className="mb-0">Orders</h2>
          </CardHeader>
          <CardBody className="list-bootstrap-table">
            <Row>
              <Col xs={12} className="mb-3">
                Start Date{" "}
                <DatePicker
                  selected={start}
                  maxDate={end}
                  isClearable
                  dateFormat="dd/MM/yyyy"
                  onChange={e => this.setState({ start: e })}
                />{" "}
                End Date{" "}
                <DatePicker
                  selected={end}
                  minDate={start}
                  isClearable
                  dateFormat="dd/MM/yyyy"
                  onChange={e => {
                    if (e) {
                      e.setHours(23);
                      e.setMinutes(59);
                      e.setSeconds(59);
                    }
                    this.setState({ end: e });
                  }}
                />
                <Select
                  placeholder="Filter Date"
                  options={[
                    {
                      label: "Order Date",
                      value: "order"
                    },
                    {
                      label: "Payment Date",
                      value: "payment"
                    }
                  ]}
                  className="mt-3"
                  onChange={e => this.setState({ filterDate: e.value })}
                />
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
              <Col xs={3}>
                <div className="mb-3">
                  {isAdmin() && <ExportExcel statuses={statuses} />}
                </div>
              </Col>
            </Row>
            <Query
              query={QUERY_GET_ORDERS_BY_STATUS}
              variables={{
                statuses: statuses,
                limit: sizePerPage,
                offset: (page - 1) * sizePerPage,
                keyword: keyword,
                start:
                  start && start !== "" && (end && end !== "") ? start : "",
                end: start && start !== "" && (end && end !== "") ? end : ""
              }}
              fetchPolicy="cache-and-network"
            >
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <Row className="text-center">
                      <Col xs={12}>
                        <Spinner animation="border" />
                      </Col>
                      <Col xs={12} className="mt-2">
                        <p>Loading Data...</p>
                      </Col>
                    </Row>
                  );
                if (error) return <p>Oops! {error.message}</p>;
                // console.log(data.getOrderStatusList);
                // const separatedOrders = data.getOrderStatusList.map(
                //   orderStatusObject => orderStatusObject.orders
                // );
                let orders = [];
                const totalSize = data.getOrderStatusList.length;
                orders = data.getOrderStatusList.orders;
                // separatedOrders.forEach(orderArray => {
                //   orders = orders.concat(orderArray);
                // });
                // orders = orders.filter(e => {
                //   switch (this.state.filterDate) {
                //     case "order":
                //       return (
                //         (!this.state.start ||
                //           new Date(e.createdAt) >= this.state.start) &&
                //         (!this.state.end || new Date(e.createdAt) <= this.state.end)
                //       );
                //     case "payment":
                //       const orderTrack = e.orderTracks.find(
                //         e => e.orderStatusId === "2"
                //       );
                //       if (orderTrack && orderTrack.createdAt) {
                //         const paymentDate = new Date(orderTrack.createdAt);
                //         return (
                //           (!this.state.start || paymentDate >= this.state.start) &&
                //           (!this.state.end || paymentDate <= this.state.end)
                //         );
                //       } else return false;
                //     default:
                //       return true;
                //   }
                // });
                orders.forEach(order => {
                  order.merchants = [
                    ...new Set([
                      ...order.orderProducts.map(e => e.product.merchant),
                      ...[].concat(
                        ...order.orderWrappings.map(e =>
                          e.items.map(item => item.product.merchant)
                        )
                      )
                    ])
                  ].join(", ");
                  order.products = [
                    ...new Set([
                      ...order.orderProducts.map(e => e.product.name),
                      ...[].concat(
                        ...order.orderWrappings.map(e =>
                          e.items.map(item => item.product.name)
                        )
                      )
                    ])
                  ].join(", ");
                  order.totalProducts = [
                    ...order.orderProducts.map(e => e.quantity),
                    ...[].concat(
                      ...order.orderWrappings.map(e =>
                        e.items.map(item => item.quantity)
                      )
                    )
                  ].reduce((total, value) => total + parseInt(value), 0);
                });
                let orderList = JSON.parse(JSON.stringify(orders)).sort(
                  compareValues("number")
                );
                let orderDetails = [];
                orderList.forEach(order => {
                  if (order.orderWrappings.length > 0) {
                    order.orderWrappings.forEach(item => {
                      item.items.forEach(products => {
                        const orderProduct = order.orderProducts.find(
                          e => e.product.id === products.product.id
                        );
                        if (orderProduct) {
                          orderProduct.quantity += products.quantity;
                        } else {
                          order.orderProducts.push({
                            product: { ...products.product },
                            quantity: products.quantity
                          });
                        }
                      });
                    });
                  }
                });
                let no = 0;
                orderList.forEach(order => {
                  if (order.orderProducts.length > 0) no++;
                  order.orderProducts.forEach((value, i) => {
                    if (isAdmin()) {
                      orderDetails.push(
                        Object.assign({}, order, {
                          no: no,
                          product: value.product,
                          quantity: value.quantity,
                          subtotal: value.quantity * value.product.price,
                          ...(i === 0 && {
                            shipping: order.shippingFee,
                            customerPayment: order.total - order.shippingFee,
                            totalCustomerPayment: order.total
                          })
                        })
                      );
                    } else if (
                      order.orderProducts[i].product.merchant === MerchantName
                    ) {
                      orderDetails.push(
                        Object.assign({}, order, {
                          no: no,
                          product: value.product,
                          quantity: value.quantity,
                          subtotal: value.quantity * value.product.price
                        })
                      );
                    }
                  });
                  if (isAdmin()) {
                    let wrappingDetails = [];
                    order.orderWrappings.forEach(value => {
                      const ribbon = value.ribbon;
                      const wrapper = value.wrapper;
                      const greetingCard = value.greetingCard;
                      if (ribbon) {
                        const orderRibbon = wrappingDetails
                          .filter(e => e.product.ribbonId)
                          .find(e => e.product.typeId === ribbon.typeId);
                        if (orderRibbon) {
                          orderRibbon.quantity++;
                        } else {
                          wrappingDetails.push(
                            Object.assign({}, order, {
                              no: no,
                              product: Object.assign({}, ribbon, {
                                name: ribbon.type,
                                merchantPrice: 0
                              }),
                              quantity: 1
                            })
                          );
                        }
                      }
                      if (wrapper) {
                        const orderWrapper = wrappingDetails
                          .filter(e => e.product.wrapperId)
                          .find(e => e.product.typeId === wrapper.typeId);
                        if (orderWrapper) {
                          orderWrapper.quantity++;
                        } else {
                          wrappingDetails.push(
                            Object.assign({}, order, {
                              no: no,
                              product: Object.assign({}, wrapper, {
                                name: wrapper.type,
                                merchantPrice: 0
                              }),
                              quantity: 1
                            })
                          );
                        }
                      }
                      if (greetingCard) {
                        wrappingDetails.push(
                          Object.assign({}, order, {
                            no: no,
                            product: {
                              name: "Greeting Card",
                              merchantPrice: 0,
                              price: 5000
                            },
                            quantity: 1
                          })
                        );
                      }
                    });
                    orderDetails = orderDetails.concat(wrappingDetails);
                  }
                });
                //make order detail distinc
                return (
                  <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={isAdmin() ? orders : orderDetails}
                    columns={columns}
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                    search
                  >
                    {props => {
                      return (
                        <div>
                          {this.state.selectedProducts.length > 0 && (
                            <div className="float-right">
                              <DownloadInvoices
                                orders={this.state.selectedProducts}
                              />
                            </div>
                          )}
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
      )
    );
  }
}

export default withApollo(OrderList);
