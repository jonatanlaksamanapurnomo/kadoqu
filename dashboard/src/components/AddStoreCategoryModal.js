import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Mutation } from "react-apollo";
import { TextInput } from "./FormComponents";
import Toast from "./Toast";
import { MUTATION_ADD_STORE_CATEGORY } from "../gql/store-category";

class AddStoreCategoryModal extends Component {
  state = {
    name: ""
  };

  resetForm = () => {
    this.setState({
      name: ""
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
          <Modal.Title>Add Store Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Mutation mutation={MUTATION_ADD_STORE_CATEGORY}>
            {addStoreCategory => {
              return (
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    if (this.state.name === "") {
                      Toast.fire({
                        type: "warning",
                        title: "Please fill in the category name!"
                      });
                      return;
                    }
                    let promises = [];
                    this.state.name.split(/[\s]*[;][\s]*/g).forEach(name =>
                      promises.push(
                        addStoreCategory({
                          variables: {
                            name: name
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
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                    additionalInfo={
                      "For multiple categories input, separate with semicolon ( ; )"
                    }
                  />
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

export default AddStoreCategoryModal;
