import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import { Button, FormText } from "react-bootstrap";
import Swal from "sweetalert2";
import AddGiftCategoryModal from "../components/AddGiftCategoryModal";
import { MUTATION_DELETE_GIFT_CATEGORY } from "../gql/category";
import { paginationOption } from "../data/listConstant";
import Toast from "../components/Toast";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css";

const { SearchBar } = Search;

const QUERY_GET_GIFT_CATEGORIES = gql`
  query getParentCategories {
    getParentCategories {
      id
      name
      children {
        id
        name
      }
    }
  }
`;

class GiftCategoryList extends React.Component {
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
        dataField: "children",
        text: "Children Categories",
        formatter: cell => cell.map(category => category.name).join(", ")
      },
      {
        dataField: "action",
        text: "Action",
        headerAlign: "center",
        isDummyField: true,
        formatter: (cell, row, rowIndex) => (
          <div className="d-flex justify-content-around list-action-cell p-n2">
            <i
              className="fa fa-pencil"
              onClick={() =>
                this.props.history.push({
                  pathname: `/categories/gift/edit/${row.id}`
                })
              }
            />
            <i
              className="fa fa-trash"
              onClick={() => {
                Swal.fire({
                  title: `Delete ${row.name} with all its subcategories?`,
                  text: "You won't be able to revert this!",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete all!"
                }).then(result => {
                  if (result.value) {
                    const idArray = [row.id].concat(
                      Array.from(
                        row.children.map(subcategory => subcategory.id)
                      )
                    );
                    const promises = idArray.map(categoryId =>
                      this.props.client.mutate({
                        mutation: MUTATION_DELETE_GIFT_CATEGORY,
                        variables: {
                          id: categoryId
                        },
                        refetchQueries: [
                          {
                            query: QUERY_GET_GIFT_CATEGORIES
                          }
                        ]
                      })
                    );
                    Promise.all(promises)
                      .then(() =>
                        Toast.fire({
                          type: "success",
                          title: `${row.name} and its children have been deleted`
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
        <Query query={QUERY_GET_GIFT_CATEGORIES}>
          {({ loading, error, data }) =>
            loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error! {error.message}</p>
            ) : (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={data.getParentCategories}
                columns={columns}
                search={{
                  searchFormatted: true
                }}
              >
                {props => (
                  <Card>
                    <CardHeader>
                      <h2 className="mb-0">Gift Categories</h2>
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
                        To edit, please click on pencil icon in "Action" section
                      </FormText>
                      <BootstrapTable
                        bootstrap4
                        pagination={paginationFactory(paginationOption)}
                        {...props.baseProps}
                      />
                    </CardBody>
                  </Card>
                )}
              </ToolkitProvider>
            )
          }
        </Query>
        <AddGiftCategoryModal
          show={this.state.isModalOpen}
          onHide={() => this.setState({ isModalOpen: false })}
          refetchQueries={[{ query: QUERY_GET_GIFT_CATEGORIES }]}
        />
      </React.Fragment>
    );
  }
}

export default withApollo(GiftCategoryList);
