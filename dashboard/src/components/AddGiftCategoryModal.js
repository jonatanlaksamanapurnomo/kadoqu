import React, { Component } from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import { Form, Button, Modal } from "react-bootstrap";
import { Query, Mutation } from "react-apollo";
import { TextInput } from "./FormComponents";
import {
  MUTATION_ADD_GIFT_CATEGORY,
  QUERY_GET_PARENT_CATEGORIES
} from "../gql/category";
import Toast from "./Toast";

class AddGiftCategoryModal extends Component {
  state = {
    formData: {
      name: "",
      parentId: this.props.categoryId || ""
    },
    isSubCategory: this.props.categoryId ? true : false
  };

  setFormData = newData => {
    this.setState({ formData: { ...this.state.formData, ...newData } });
  };

  resetForm = () => {
    this.setState({
      formData: {
        name: "",
        parentId: this.props.categoryId || ""
      },
      isSubCategory: this.props.categoryId ? true : false
    });
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Gift Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Mutation mutation={MUTATION_ADD_GIFT_CATEGORY}>
            {addCategory => {
              return (
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    if (this.state.formData.name === "") {
                      Toast.fire({
                        type: "warning",
                        title: "Please fill in the category name!"
                      });
                      return;
                    }
                    if (
                      this.state.isSubCategory &&
                      this.state.formData.parentId === ""
                    ) {
                      Toast.fire({
                        type: "warning",
                        title: "Please choose the parent category!"
                      });
                      return;
                    }
                    const parentId = this.state.formData.parentId;
                    let promises = [];
                    this.state.formData.name
                      .split(/[\s]*[;][\s]*/g)
                      .forEach(name =>
                        promises.push(
                          addCategory({
                            variables: {
                              name: name,
                              parentId: parentId !== "" ? parentId : null
                            },
                            refetchQueries: this.props.refetchQueries
                          })
                        )
                      );
                    Promise.all(promises)
                      .then(() => {
                        this.resetForm();
                        this.props.onHide();
                      })
                      .catch(error =>
                        Toast.fire({
                          type: "error",
                          title: error.message || error
                        })
                      );
                  }}
                >
                  <TextInput
                    fieldName="Category Name"
                    value={this.state.formData.name}
                    onChange={e => this.setFormData({ name: e.target.value })}
                    additionalInfo={
                      "For multiple categories input, separate with semicolon ( ; )"
                    }
                  />
                  <FormGroup check>
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="add-category-is-sub"
                      name="isSub"
                      checked={this.state.isSubCategory}
                      onChange={e => {
                        if (this.props.categoryId) return;
                        this.setState({ isSubCategory: e.target.checked });
                        if (e.target.checked) return;
                        this.setFormData({ parentId: "" });
                      }}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="add-category-is-sub"
                    >
                      Sub-category?
                    </Label>
                  </FormGroup>
                  {!this.state.isSubCategory ? null : (
                    <FormGroup row>
                      <Col md={3}>
                        <Label htmlFor="add-category-parent">
                          Parent Category
                        </Label>
                      </Col>
                      {this.props.categoryId ? (
                        <p>{this.props.categoryName}</p>
                      ) : (
                        <Col xs={12} md={9}>
                          <Input
                            type="select"
                            name="parentCategory"
                            id="add-category-parent"
                            onChange={e =>
                              this.setFormData({
                                parentId: e.target.value
                              })
                            }
                            value={this.state.formData.parentId}
                          >
                            <Query query={QUERY_GET_PARENT_CATEGORIES}>
                              {({ loading, error, data }) => (
                                <React.Fragment>
                                  {loading ? <p>Loading ...</p> : null}
                                  {loading || error ? null : (
                                    <React.Fragment>
                                      <option value="">Please choose...</option>
                                      {data.getParentCategories.map(
                                        category => (
                                          <option
                                            key={category.name}
                                            value={category.id}
                                          >
                                            {category.name}
                                          </option>
                                        )
                                      )}
                                    </React.Fragment>
                                  )}
                                </React.Fragment>
                              )}
                            </Query>
                          </Input>
                          <Form.Control.Feedback type="invalid">
                            Please choose a username.
                          </Form.Control.Feedback>
                        </Col>
                      )}
                    </FormGroup>
                  )}
                  <Button type="submit" className="mt-3" block>
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Mutation>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddGiftCategoryModal;
