import React from "react";
import { Card, CardBody, CardHeader, Input } from "reactstrap";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import {
  Button,
  Col,
  Row,
  Alert,
  Container,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import Swal from "sweetalert2";
import AddGiftCategoryModal from "../components/AddGiftCategoryModal";

import "./UserList.css";
import "./EditGiftCategory.css";
import {
  QUERY_GET_PARENT_CATEGORIES,
  MUTATION_DELETE_GIFT_CATEGORY
} from "../gql/category";

const QUERY_GET_CATEGORY = gql`
  query getCategory($id: String) {
    getCategory(id: $id) {
      id
      name
      children {
        id
        name
      }
    }
  }
`;

const MUTATION_UPDATE_GIFT_CATEGORY_NAME = gql`
  mutation updateCategoryName($id: String, $newName: String) {
    updateCategoryName(id: $id, newName: $newName)
  }
`;

const MUTATION_UPDATE_GIFT_CATEGORY_PARENT = gql`
  mutation updateCategoryParent($id: String, $newParentId: String) {
    updateCategoryParent(id: $id, newParentId: $newParentId)
  }
`;

class EditGiftCategory extends React.Component {
  state = {
    isEditCategory: false,
    isAddingSub: false,
    alert: {
      message: "",
      variant: undefined
    },
    activeSubs: new Set(),
    subcategoryOnEdit: null
  };
  resetAlert = () => {
    this.setState({
      alert: {
        message: "",
        variant: undefined
      }
    });
  };
  handleSubcategoryClick = (e, id) => {
    if (this.state.activeSubs.has(id)) {
      let temp = this.state.activeSubs;
      temp.delete(id);
      this.setState({ activeSubs: temp });
      return;
    }
    this.setState({ activeSubs: this.state.activeSubs.add(id) });
  };
  handleSubcategoryDoubleClick = (e, id) => {
    this.setState({ subcategoryOnEdit: id });
  };
  editCategory = (id, oldName, newName, isParent = false) => {
    if (oldName === newName || newName === "") {
      if (isParent) this.setState({ isEditCategory: false });
      else this.setState({ subcategoryOnEdit: null });
      return;
    }
    this.props.client
      .mutate({
        mutation: MUTATION_UPDATE_GIFT_CATEGORY_NAME,
        variables: {
          id: id,
          newName: newName
        },
        refetchQueries: [
          {
            query: QUERY_GET_CATEGORY,
            variables: { id: id }
          }
        ]
      })
      .then(() =>
        this.setState({
          isEditCategory: false,
          subcategoryOnEdit: null,
          alert: {
            message: `${
              isParent ? "C" : "Subc"
            }ategory name has been updated: ${oldName} -> ${newName}`,
            variant: "success"
          }
        })
      )
      .catch(error =>
        this.setState({
          alert: {
            message: error.message,
            variant: "danger"
          }
        })
      );
  };
  moveSubcategory = (id, destinationId, destinationName) => {
    Swal.fire({
      title: "Move selected subcategories?",
      text: `You are about to change the selected categories' parent to ${destinationName}`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, move all!"
    }).then(result => {
      if (result.value) {
        const promises = Array.from(this.state.activeSubs).map(subcategoryId =>
          this.props.client.mutate({
            mutation: MUTATION_UPDATE_GIFT_CATEGORY_PARENT,
            variables: {
              id: subcategoryId,
              newParentId: destinationId
            },
            refetchQueries: [
              {
                query: QUERY_GET_CATEGORY,
                variables: { id: id }
              },
              {
                query: QUERY_GET_CATEGORY,
                variables: { id: destinationId }
              }
            ]
          })
        );
        Promise.all(promises)
          .then(() =>
            this.setState({
              activeSubs: new Set(),
              alert: {
                message: `All selected subcategories have been moved`,
                variant: "success"
              }
            })
          )
          .catch(error =>
            this.setState({
              alert: {
                message: error.message,
                variant: "danger"
              }
            })
          );
      }
    });
  };
  deleteAllSelected = id => {
    Swal.fire({
      title: "Delete all selected subcategories?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!"
    }).then(result => {
      if (result.value) {
        const promises = Array.from(this.state.activeSubs).map(subcategoryId =>
          this.props.client.mutate({
            mutation: MUTATION_DELETE_GIFT_CATEGORY,
            variables: {
              id: subcategoryId
            },
            refetchQueries: [
              {
                query: QUERY_GET_CATEGORY,
                variables: { id: id }
              }
            ]
          })
        );
        Promise.all(promises)
          .then(() =>
            this.setState({
              activeSubs: new Set(),
              alert: {
                message: `All selected subcategories have been deleted`,
                variant: "success"
              }
            })
          )
          .catch(error =>
            this.setState({
              alert: {
                message: error.message,
                variant: "danger"
              }
            })
          );
      }
    });
  };
  render() {
    const categoryId = this.props.match.params.id;
    return (
      <Query query={QUERY_GET_CATEGORY} variables={{ id: categoryId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          const categoryName = data.getCategory.name;
          const subcategories = data.getCategory.children;
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
              <Card>
                <CardHeader>
                  <h2 className="mb-0 position-relative">
                    Category:{" "}
                    {this.state.isEditCategory ? (
                      <Input
                        className="d-inline-block w-50"
                        autoFocus
                        defaultValue={categoryName}
                        onKeyUp={e =>
                          e.keyCode === 13
                            ? this.editCategory(
                                categoryId,
                                categoryName,
                                e.target.value,
                                true
                              )
                            : null
                        }
                        onBlur={() => this.setState({ isEditCategory: false })}
                      />
                    ) : (
                      <React.Fragment>
                        {categoryName}
                        <i
                          className="fa fa-pencil position-absolute h6 text-info"
                          onClick={() =>
                            this.setState({ isEditCategory: true })
                          }
                        />
                      </React.Fragment>
                    )}
                  </h2>
                </CardHeader>
                <CardBody>
                  <Row className="no-gutter">
                    <Col
                      sm={{ span: 12, order: 2 }}
                      md={2}
                      className="border-left action-buttons"
                    >
                      <Button
                        variant="light"
                        onClick={() => this.setState({ isAddingSub: true })}
                      >
                        Add New Subcategory
                      </Button>
                      {subcategories.length === 0 ? null : (
                        <React.Fragment>
                          {Array.from(this.state.activeSubs).join(",") ===
                          subcategories
                            .map(subcategory => subcategory.id)
                            .join(",") ? (
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                this.setState({
                                  activeSubs: new Set()
                                })
                              }
                            >
                              Unselect All
                            </Button>
                          ) : (
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                this.setState({
                                  activeSubs: new Set(
                                    subcategories.map(
                                      subcategory => subcategory.id
                                    )
                                  )
                                })
                              }
                            >
                              Select All
                            </Button>
                          )}
                        </React.Fragment>
                      )}
                      {this.state.activeSubs.size !== 1 ? null : (
                        <Button
                          variant="warning"
                          onClick={() =>
                            this.setState({
                              subcategoryOnEdit: this.state.activeSubs
                                .values()
                                .next().value
                            })
                          }
                        >
                          Edit
                        </Button>
                      )}
                      {this.state.activeSubs.size < 1 ? null : (
                        <React.Fragment>
                          <Button
                            variant="danger"
                            onClick={() => this.deleteAllSelected(categoryId)}
                          >
                            Delete
                          </Button>
                          <DropdownButton
                            title="Move"
                            drop="left"
                            variant="info"
                          >
                            <Query query={QUERY_GET_PARENT_CATEGORIES}>
                              {({ loading, error, data }) =>
                                loading ? (
                                  <Dropdown.Item eventKey="loading">
                                    Loading...
                                  </Dropdown.Item>
                                ) : error ? null : (
                                  data.getParentCategories.map(category => (
                                    <Dropdown.Item
                                      key={category.id}
                                      eventKey={category.name}
                                      onClick={() =>
                                        this.moveSubcategory(
                                          categoryId,
                                          category.id,
                                          category.name
                                        )
                                      }
                                    >
                                      {category.name}
                                    </Dropdown.Item>
                                  ))
                                )
                              }
                            </Query>
                          </DropdownButton>
                        </React.Fragment>
                      )}
                    </Col>
                    <Col sm={{ span: 12, order: 1 }} md={10}>
                      <Container fluid>
                        <Row>
                          {subcategories.map(subcategory => (
                            <Col sm={6} key={subcategory.id}>
                              {this.state.subcategoryOnEdit ===
                              subcategory.id ? (
                                <Input
                                  autoFocus
                                  defaultValue={subcategory.name}
                                  onKeyUp={e =>
                                    e.keyCode === 13
                                      ? this.editCategory(
                                          subcategory.id,
                                          subcategory.name,
                                          e.target.value
                                        )
                                      : null
                                  }
                                  onBlur={() =>
                                    this.setState({ subcategoryOnEdit: null })
                                  }
                                />
                              ) : (
                                <div
                                  className={
                                    "edit-subcategory-card" +
                                    (this.state.activeSubs.has(subcategory.id)
                                      ? " active"
                                      : "")
                                  }
                                  value={subcategory.id}
                                  onClick={e =>
                                    this.handleSubcategoryClick(
                                      e,
                                      subcategory.id
                                    )
                                  }
                                  onDoubleClick={e =>
                                    this.handleSubcategoryDoubleClick(
                                      e,
                                      subcategory.id
                                    )
                                  }
                                >
                                  {subcategory.name}
                                </div>
                              )}
                            </Col>
                          ))}
                          <Col sm={6}>
                            <div
                              className="edit-subcategory-card add"
                              onClick={() =>
                                this.setState({ isAddingSub: true })
                              }
                            >
                              <i className="icon-plus" />
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <AddGiftCategoryModal
                categoryId={categoryId}
                categoryName={categoryName}
                show={this.state.isAddingSub}
                onHide={() => this.setState({ isAddingSub: false })}
                refetchQueries={[
                  { query: QUERY_GET_CATEGORY, variables: { id: categoryId } }
                ]}
              />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(EditGiftCategory);
