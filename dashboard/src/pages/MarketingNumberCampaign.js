import React, { Component } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { withApollo, Query } from "react-apollo";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { paginationOption } from "../data/listConstant";
import {
  QUERY_CAMPAIGNS,
  // MUTATION_COUNT_TOTAL_SALES,
  // MUTATION_DISCOUNT_PRODUCT_PER_CAMPAIGN,
  MUTATION_DELETE_CAMPAIGN,
  MUTATION_COUNT_TOTAL_SELECTED_CAMPAIGN_SALES,
  MUTATION_DISCOUNT_ONSELECTED_CAMPAIGN
} from "../gql/Marketing";
// import {QUERY_GET_PAYMENT_REVIEW_ORDER} from "../gql/order";
import { rpFormat } from "../utils/currencyFormatter";
import Swal from "sweetalert2";
import { addMonths, getFullDateTime } from "../utils/dateTimeFormatter";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./List.css";
import DatePicker from "react-datepicker";

const { SearchBar } = Search;

class MarketingNumberCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCampaign: [],
      startDate: addMonths(new Date(), -1),
      endDate: addMonths(new Date(), 1)
    };
  }

  render() {
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: (row, isSelect) => {
        this.setState({
          selectedCampaign: isSelect
            ? this.state.selectedCampaign.concat([row])
            : this.state.selectedCampaign.filter(el => el.id !== row.id)
        });
      },
      onSelectAll: (isSelect, rows) => {
        this.setState({
          selectedCampaign: isSelect ? rows : []
        });
      }
    };
    const columns = [
      {
        dataField: "id",
        text: "Campaign Id",
        hidden: true
      },
      {
        dataField: "name",
        text: "Campaign Name",
        footer: "Total:"
      },
      {
        dataField: "primaryDiscount",
        text: "Primary Discount",
        hidden: true
      },
      {
        dataField: "secondaryDiscount",
        text: "Secondary Discount",
        hidden: true
      },
      {
        dataField: "campaignStart",
        text: "Campaign Start",
        footer: "",

        formatter: cell => getFullDateTime(cell)
      },
      {
        dataField: "campaignEnd",
        text: "Campaign End",
        footer: "",
        formatter: cell => getFullDateTime(cell)
      },
      {
        dataField: "totalBudget",
        text: "Budget/Campaign (IDR)",
        hidden: false,
        formatter: cell => rpFormat(cell || 0),
        footer: columnData => {
          return `${rpFormat(
            columnData.reduce((acc, item) => acc + (item || 0), 0)
          )}`;
        }
      },
      {
        dataField: "totalSales",
        text: "Sales/Campaign (IDR)",
        formatter: cell => rpFormat(cell || 0),
        footer: columnData => {
          return `${rpFormat(
            columnData.reduce((acc, item) => acc + (item || 0), 0)
          )}`;
        }
      },
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
              <i
                onClick={() => {
                  this.props.history.push(`/campaign/detail/${row.id}`);
                }}
                style={{ color: "lightblue" }}
                className="fa fa-info"
              ></i>
              <i
                style={{ color: "orange" }}
                onClick={() => {
                  this.props.client
                    .mutate({
                      mutation: MUTATION_DISCOUNT_ONSELECTED_CAMPAIGN,
                      variables: {
                        idCampaign: row.id
                      }
                    })
                    .then(res => {
                      if (res.data.discountProductOnSelectedCampaign) {
                        Swal.fire(
                          "yey!",
                          "Product Berhasil Di Discount!",
                          "success"
                        );
                      } else {
                        Swal.fire(
                          "Opps!",
                          "Mungkin Tanggal Campaign Sudah tidak valid / product campaign kosong",
                          "error"
                        );
                      }
                    });
                }}
                className="fa fa-percent "
              ></i>
              <i
                onClick={() => {
                  Swal.fire({
                    title: `Delete ${row.name}?`,
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes!"
                  }).then(res => {
                    if (res.value) {
                      this.props.client.mutate({
                        mutation: MUTATION_DELETE_CAMPAIGN,
                        variables: {
                          id: row.id
                        },
                        refetchQueries: [{ query: QUERY_CAMPAIGNS }]
                      });
                    }
                  });
                }}
                className="fa fa-trash"
              ></i>
            </div>
          );
        }
      }
    ];

    return (
      <Card>
        <CardHeader>
          <h3 className="lead">Campaign</h3>
        </CardHeader>
        <CardBody>
          <Query
            query={QUERY_CAMPAIGNS}
            variables={{
              startDate: this.state.startDate,
              endDate: this.state.endDate
            }}
          >
            {({ loading, error, data }) => {
              if (!loading && !error) {
                return (
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <p>Start</p>
                        <DatePicker
                          onChange={e => {
                            this.setState({
                              startDate: e
                            });
                          }}
                          selected={this.state.startDate}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                      <div className="col-6">
                        <p>end</p>
                        <DatePicker
                          onChange={e => {
                            this.setState({
                              endDate: e
                            });
                          }}
                          selected={this.state.endDate}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </div>
                    <ToolkitProvider
                      keyField="id"
                      data={data.getAllCampaign}
                      columns={columns}
                      search
                    >
                      {props => (
                        <div>
                          <SearchBar {...props.searchProps} />
                          <BootstrapTable
                            keyField="id"
                            pagination={paginationFactory(paginationOption)}
                            selectRow={selectRow}
                            {...props.baseProps}
                          />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                );
              } else if (loading) {
                return <p>Loading Campaign</p>;
              } else {
                return <p>Error!!!</p>;
              }
            }}
          </Query>
        </CardBody>
        <CardFooter>
          <Button
            onClick={e => {
              e.preventDefault();
              this.props.client
                .mutate({
                  mutation: MUTATION_COUNT_TOTAL_SELECTED_CAMPAIGN_SALES,
                  variables: {
                    selectedCampaign: this.state.selectedCampaign
                  },
                  refetchQueries: [{ query: QUERY_CAMPAIGNS }]
                })
                .then(({ loading, error, data }) => {
                  if (!loading && !error) {
                    Swal.fire({
                      position: "center",
                      type: "success",
                      title: "All Campaign Total Sales Has been counted ",
                      showConfirmButton: false,
                      timer: 1500
                    });
                  }
                  if (loading) {
                    console.log("loading");
                  }
                });
              // this.props.client
              //   .query({
              //     query: QUERY_GET_PAYMENT_REVIEW_ORDER
              //   })
              //   .then(({loading, error, data}) => {
              //     if (!loading && !error) {
              //       let orders = [];
              //       data.getAllPaymentReviewOrder.forEach(order =>
              //         orders.push(order)
              //       );
              //       this.props.client
              //         .mutate({
              //           mutation: MUTATION_COUNT_TOTAL_SALES,
              //           variables: {
              //             orders: orders
              //           },
              //           refetchQueries: [{query: QUERY_CAMPAIGNS}]
              //         })
              //         .then(() => {
              //           Swal.fire({
              //             position: "center",
              //             type: "success",
              //             title: "All Campaign Total Sales Has been counted ",
              //             showConfirmButton: false,
              //             timer: 1500
              //           });
              //         });
              //     }
              //   });
            }}
            color="success"
          >
            {" "}
            Hitung Total Sales
          </Button>
          <small>
            {" "}
            all i want for christmas is <strike>you</strike> <b>Food</b>
          </small>
        </CardFooter>
      </Card>
    );
  }
}

export default withApollo(MarketingNumberCampaign);
