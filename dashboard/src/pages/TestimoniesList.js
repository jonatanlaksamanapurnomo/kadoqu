import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader} from "reactstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Query, withApollo } from "react-apollo";
import { paginationOption } from "../data/listConstant";
import { QUERY_GET_TESTIMONY } from "../gql/testimony";


import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";
import "./UserList.css";




const TestimoniesList = props => {
    function imageFormatter(cell, row){
        return ( <img src={cell} alt="" className="w-25 mt-2" />
        )
      }

  
  const columns = [
    {
      dataField: "id",
      hidden: true
    },
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "short_description",
      text: "Short Desc",
      sort: true
    },
    {
      dataField: "testimony",
      text: "testimony",
      sort: true
    },
    {
        dataField: "image",
        // hidden: true
        text : "Image",
        formatter:imageFormatter
      },
    {
      dataField: "category",
      text: "Category",
      sort: true
    }
    
    //,
    // {
    //   dataField: "action",
    //   text: "Action",
    //   isDummyField: true,
    //   formatter: (cell, row, rowIndex) => (
    //     <div className="d-flex justify-content-around list-action-cell p-n2">
    //       <i
    //         className="fa fa-pencil"
    //         onClick={() =>
    //           props.history.push({ pathname: `/users/edit/${row.id}` })
    //         }
    //       />
    //       <i
    //         className="fa fa-trash"
    //         onClick={() => {
    //           const deleteConfirmation = window.confirm(
    //             `Are you sure you want to remove ${row.name}?`
    //           );
    //           if (!deleteConfirmation) return;
    //           return props.client
    //             .mutate({
    //               mutation: MUTATE_DELETE_ADMIN,
    //               variables: { id: row.id },
    //               refetchQueries: [{ query: QUERY_GET_ADMINS }]
    //             })
    //             .then()
    //             .catch(error => alert(error));
    //         }}
    //       />
    //     </div>
    //   )
    // }
  ];
  const defaultSorted = [{ dataField: "name", order: "asc" }];
  return (
    <Query query={QUERY_GET_TESTIMONY}>
      {({ loading, error, data }) =>
        loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error! {error.message}</p>
        ) : (
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={data.getTestimonies}
            columns={columns}
            search
          >
            {props => (
              <Card>
                <CardHeader>
                  <h2 className="mb-0">testimony</h2>
                </CardHeader>
                <CardBody>
                  <div className="mb-1 text-right">
                    {/* <Button
                      color="success"
                      onClick={() => props.csvProps.onExport()}
                    >
                      <i className="fa fa-download" /> Export CSV
                    </Button> */}
                    {/* <ExportExcel data={data.getAdmins} /> */}
                  </div>
                  {/* <SearchBar {...props.searchProps} /> */}
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

export default withApollo(TestimoniesList);
