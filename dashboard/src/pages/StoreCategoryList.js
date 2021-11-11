import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Query, withApollo } from "react-apollo";
import { Button, FormText } from "react-bootstrap";
import Swal from "sweetalert2";
import AddStoreCategoryModal from "../components/AddStoreCategoryModal";
import {
  QUERY_GET_STORE_CATEGORIES,
  MUTATION_DELETE_STORE_CATEGORY,
  MUTATION_UPDATE_STORE_CATEGORY
} from "../gql/store-category";
import { paginationOption } from "../data/listConstant";
import Toast from "../components/Toast";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";

const { SearchBar } = Search;

class StoreCategoryList extends React.Component {
  state = {
    isModalOpen: false
  };
  render() {
    const columns = [
      {
        dataField: "id",
        hidden: true
      },
      {
        dataField: "name",
        text: "Category Name",
        sort: true
      },
      {
        dataField: "action",
        text: "Action",
        editable: false,
        headerAlign: "center",
        style: { width: "2rem" },
        isDummyField: true,
        formatter: (cell, row, rowIndex) => (
          <div className="d-flex justify-content-around list-action-cell p-n2">
            <i
              className="fa fa-trash"
              onClick={() => {
                Swal.fire({
                  title: `Delete ${row.name}?`,
                  text: "You won't be able to revert this!",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete all!"
                }).then(result => {
                  if (result.value) {
                    this.props.client
                      .mutate({
                        mutation: MUTATION_DELETE_STORE_CATEGORY,
                        variables: {
                          id: row.id
                        },
                        refetchQueries: [
                          {
                            query: QUERY_GET_STORE_CATEGORIES
                          }
                        ]
                      })
                      .then(() =>
                        Toast.fire({
                          type: "success",
                          title: `Category "${row.name}" has been deleted`
                        })
                      )
                      .catch(error =>
                        Toast.fire({
                          type: "error",
                          title: error.message
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
    return (
      <React.Fragment>
        <Query query={QUERY_GET_STORE_CATEGORIES}>
          {({ loading, error, data }) =>
            loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error! {error.message}</p>
            ) : (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={data.getStoreCategories}
                columns={columns}
                search={{
                  searchFormatted: true
                }}
              >
                {props => (
                  <Card>
                    <CardHeader>
                      <h2 className="mb-0">Store Categories</h2>
                    </CardHeader>
                    <CardBody>
                      <div className="text-right mb-1">
                        <Button
                          onClick={() => this.setState({ isModalOpen: true })}
                        >
                          <i className="icon-plus" /> Add New Category
                        </Button>
                      </div>
                      <SearchBar {...props.searchProps} />
                      <FormText color="muted">
                        To edit, please double click on the text then enter it
                      </FormText>
                      <BootstrapTable
                        bootstrap4
                        pagination={paginationFactory(paginationOption)}
                        cellEdit={cellEditFactory({
                          mode: "dbclick",
                          blurToSave: false,
                          beforeSaveCell: (
                            oldValue,
                            newValue,
                            row,
                            column,
                            done
                          ) => {
                            if (
                              column.dataField !== "name" ||
                              oldValue === newValue ||
                              newValue === ""
                            )
                              return;
                            this.props.client
                              .mutate({
                                mutation: MUTATION_UPDATE_STORE_CATEGORY,
                                variables: {
                                  id: row.id,
                                  newName: newValue
                                },
                                refetchQueries: [
                                  { query: QUERY_GET_STORE_CATEGORIES }
                                ]
                              })
                              .then(() => {
                                Toast.fire({
                                  type: "success",
                                  title: `${oldValue} is now changed into ${newValue}`
                                });
                                done();
                              });
                          }
                        })}
                        {...props.baseProps}
                      />
                    </CardBody>
                  </Card>
                )}
              </ToolkitProvider>
            )
          }
        </Query>
        <AddStoreCategoryModal
          show={this.state.isModalOpen}
          onHide={() => this.setState({ isModalOpen: false })}
          refetchQueries={[{ query: QUERY_GET_STORE_CATEGORIES }]}
        />
      </React.Fragment>
    );
  }
}

export default withApollo(StoreCategoryList);
