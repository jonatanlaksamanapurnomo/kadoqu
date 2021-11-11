import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Query, withApollo } from "react-apollo";
import ReactExport from "react-data-export";
import { paginationOption } from "../data/listConstant";
import {
  getFullDateTimeName,
  getFullDateTime
} from "../utils/dateTimeFormatter";
import { QUERY_GET_ADMINS, MUTATE_DELETE_ADMIN } from "../gql/admin";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";
import "./UserList.css";

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
    filename={`Admins-${getFullDateTimeName(new Date())}`}
  >
    <ExcelSheet data={props.data} name="Admins">
      <ExcelColumn label="E-mail" value="email" />
      <ExcelColumn label="Name" value="name" />
      <ExcelColumn label="Merchant Code" value="code" />
      <ExcelColumn label="Phone Number" value="phone" />
      <ExcelColumn label="Role" value="role" />
      <ExcelColumn label="Merchant Level" value="merchantLevel" />
      <ExcelColumn
        label="Created At"
        value={col => getFullDateTime(new Date(parseInt(col.createdAt)))}
      />
    </ExcelSheet>
  </ExcelFile>
);

const UserList = props => {
  function imageFormatter(cell, row){
    var image =""
    switch (cell) {
      case 10:
        image =" ";
        break;
      case 20:
        image ="https://ik.imagekit.io/nwiq66cx3pvsy/badge-basic.png";
        break;
      case 25 :
        image ="https://ik.imagekit.io/nwiq66cx3pvsy/badge-premium.png";
        break;
      case 30:
        image ="https://ik.imagekit.io/nwiq66cx3pvsy/badge-advance.png";
        break;
      default:
        image ="https://ik.imagekit.io/nwiq66cx3pvsy/badge-basic.png";
break;
    }
    return ( <img src={image} alt="" className="w-25" />

    )
  }

  const columns = [
    {
      dataField: "id",
      hidden: true
    },
    {
      dataField: "email",
      text: "E-mail",
      sort: true
    },
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "code",
      text: "Merchant Code",
      sort: true
    },
    {
      dataField: "phone",
      text: "Phone Number",
      sort: true
    },
    {
      dataField: "role",
      hidden: true
    },
    {
      dataField: "merchantLevel",
      // hidden: true
      text : "Image",
      formatter:imageFormatter
    },
    {
      dataField: "action",
      text: "Action",
      isDummyField: true,
      formatter: (cell, row, rowIndex) => (
        <div className="d-flex justify-content-around list-action-cell p-n2">
          <i
            className="fa fa-pencil"
            onClick={() =>
              props.history.push({ pathname: `/users/edit/${row.id}` })
            }
          />
          <i
            className="fa fa-trash"
            onClick={() => {
              const deleteConfirmation = window.confirm(
                `Are you sure you want to remove ${row.name}?`
              );
              if (!deleteConfirmation) return;
              return props.client
                .mutate({
                  mutation: MUTATE_DELETE_ADMIN,
                  variables: { id: row.id },
                  refetchQueries: [{ query: QUERY_GET_ADMINS }]
                })
                .then()
                .catch(error => alert(error));
            }}
          />
        </div>
      )
    }
  ];
  const defaultSorted = [{ dataField: "name", order: "asc" }];
  return (
    <Query query={QUERY_GET_ADMINS}>
      {({ loading, error, data }) =>
        loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error! {error.message}</p>
        ) : (
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={data.getAdmins}
            columns={columns}
            search
          >
            {props => (
              <Card>
                <CardHeader>
                  <h2 className="mb-0">Users</h2>
                </CardHeader>
                <CardBody>
                  <div className="mb-1 text-right">
                    {/* <Button
                      color="success"
                      onClick={() => props.csvProps.onExport()}
                    >
                      <i className="fa fa-download" /> Export CSV
                    </Button> */}
                    <ExportExcel data={data.getAdmins} />
                  </div>
                  <SearchBar {...props.searchProps} />
                  <div className="chart-wrapper">
                    <BootstrapTable
                      bootstrap4
                      defaultSorted={defaultSorted}
                      pagination={paginationFactory(paginationOption)}
                      wrapperClasses="table-responsive"
                      rowClasses={row =>
                        row.role === "admin"
                          ? "user-list-admin-row"
                          : "user-list-merchant-row"
                      }
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
export { QUERY_GET_ADMINS };
