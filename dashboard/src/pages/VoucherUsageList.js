import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Query, withApollo } from "react-apollo";
import { Alert } from "react-bootstrap";
import { paginationOption } from "../data/listConstant";
import { numericToCurrency } from "../utils/formatter";
import { QUERY_GET_VOUCHER_USAGES } from "../gql/voucher";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";

const { SearchBar } = Search;

class VoucherUsageList extends React.Component {
  state = {
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
    const query = { query: QUERY_GET_VOUCHER_USAGES };
    const columns = [
      {
        dataField: "id",
        hidden: true,
        csvExport: false
      },
      {
        dataField: "voucherCode.voucher.name",
        text: "Name",
        editable: false,
        sort: true
      },
      {
        dataField: "voucherCode.voucher.merchant",
        text: "Merchant",
        editable: false,
        sort: true,
        formatter: cell => cell || "-"
      },
      {
        dataField: "voucherCode.code",
        text: "Code",
        editable: false,
        sort: true
      },
      {
        dataField: "user.firstName",
        text: "User",
        editable: false,
        sort: true
      },
      {
        dataField: "order.voucherDiscount",
        text: "Voucher Discount",
        editable: false,
        sort: true,
        formatter: cell => "Rp " + numericToCurrency(cell || 0)
      },
      {
        dataField: "order.total",
        text: "Grand Total",
        editable: false,
        sort: true,
        formatter: cell => "Rp " + numericToCurrency(cell || 0)
      },
      {
        dataField: "order.createdAt",
        text: "Date",
        editable: false,
        sort: true,
        formatter: cell => (cell ? new Date(cell).toLocaleString() : "-")
      }
    ];
    const defaultSorted = [{ dataField: "order.createdAt", order: "desc" }];
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
                data={data.getVoucherUsages}
                columns={columns}
                search
                exportCSV={{ onlyExportFiltered: true, exportAll: false }}
              >
                {props => (
                  <Card>
                    <CardHeader className="d-flex justify-content-between">
                      <h2 className="mb-0">Voucher Usages</h2>
                    </CardHeader>
                    <CardBody>
                      <div className="mb-1 text-right">
                        <span>
                          {/* <Button
                            variant="success"
                            className="ml-1"
                            onClick={() => props.csvProps.onExport()}
                          >
                            <i className="fa fa-download" /> Export CSV
                          </Button> */}
                        </span>
                      </div>
                      <SearchBar {...props.searchProps} />
                      <BootstrapTable
                        bootstrap4
                        pagination={paginationFactory(paginationOption)}
                        defaultSorted={defaultSorted}
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

export default withApollo(VoucherUsageList);
