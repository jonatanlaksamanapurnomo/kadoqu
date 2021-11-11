import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Query, withApollo } from "react-apollo";
import ReactExport from "react-data-export";
import { QUERY_GET_USERS } from "../gql/user";
import { paginationOption } from "../data/listConstant";
import {
  getFullDate,
  getFullDateTimeName,
  getFullDateTime
} from "../utils/dateTimeFormatter";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";

const { SearchBar } = Search;
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = props => (
  <ExcelFile
    element={
      <Button color="primary" className="ml-1">
        <i className="fa fa-download" /> Export Excel
      </Button>
    }
    filename={`Customers-${getFullDateTimeName(new Date())}`}
  >
    <ExcelSheet data={props.data} name="Customers">
      <ExcelColumn label="E-mail" value="email" />
      <ExcelColumn label="First Name" value="firstName" />
      <ExcelColumn label="Last Name" value="lastName" />
      <ExcelColumn
        label="Gender"
        value={col =>
          col.gender === 2 ? "Male" : col.gender === 1 ? "Female" : "-"
        }
      />
      <ExcelColumn label="Phone Number" value="phone" />
      <ExcelColumn
        label="Birth Date"
        value={col => getFullDate(new Date(parseInt(col.birthDate)))}
      />
      <ExcelColumn
        label="Created At"
        value={col => getFullDateTime(new Date(parseInt(col.createdAt)))}
      />
      <ExcelColumn label="Active" value="isActive" />
    </ExcelSheet>
  </ExcelFile>
);

const UserList = props => {
  const columns = [
    {
      dataField: "id",
      hidden: true,
      csvExport: false
    },
    {
      dataField: "email",
      text: "E-mail",
      sort: true
    },
    {
      dataField: "firstName",
      text: "First Name",
      sort: true
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: true
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
      formatter: cell => (cell === 2 ? "Male" : cell === 1 ? "Female" : "-")
    },
    {
      dataField: "phone",
      text: "Phone Number",
      sort: true
    },
    {
      dataField: "birthDate",
      text: "Birth Date",
      sort: true,
      formatter: cell => getFullDate(new Date(parseInt(cell)))
    }
  ];
  const defaultSorted = [{ dataField: "firstName", order: "asc" }];

  return (
    <Query query={QUERY_GET_USERS}>
      {({ loading, error, data }) =>
        loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error! {error.message}</p>
        ) : (
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={data.getUsers}
            columns={columns}
            search
            exportCSV={{ onlyExportFiltered: true, exportAll: false }}
          >
            {props => (
              <Card>
                <CardHeader>
                  <h2 className="mb-0">Customers</h2>
                </CardHeader>
                <CardBody>
                  <div className="mb-1 text-right">
                    {/* <Button
                      color="success"
                      onClick={() => props.csvProps.onExport()}
                    >
                      <i className="fa fa-download" /> Export CSV
                    </Button> */}
                    <ExportExcel data={data.getUsers} />
                  </div>
                  <SearchBar {...props.searchProps} />
                  <div className="chart-wrapper">
                    <BootstrapTable
                      bootstrap4
                      defaultSorted={defaultSorted}
                      pagination={paginationFactory(paginationOption)}
                      wrapperClasses="table-responsive"
                      {...props.baseProps}
                    />
                  </div>
                </CardBody>
              </Card>
            )}
          </ToolkitProvider>
        )
      }
    </Query>
  );
};

export default withApollo(UserList);
