import React from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { Query, Mutation } from "react-apollo";
import {
  QUERY_GET_WRAPPERS,
  MUTATION_UPDATE_WRAPPER_CHOICE,
  MUTATION_DELETE_WRAPPER_CHOICE,
  MUTATION_UPDATE_WRAPPER_TYPE_THUMBNAIL,
  MUTATION_UPDATE_WRAPPER_TYPE,
  MUTATION_ADD_WRAPPER_TYPE,
  MUTATION_ADD_WRAPPER_CHOICE,
  MUTATION_DELETE_WRAPPER_TYPE
} from "../gql/wrapping-lab-wrapper";
import { TextInput } from "../components/FormComponents";
import { validateNumeric } from "../utils/regexInputConverter";
import EditWrappingLabVariantModal from "../components/EditWrappingLabVariantModal";
import EditWrappingLabPropertyThumbnailModal from "../components/EditWrappingLabPropertyThumbnailModal";
import AddWrappingLabPropertyModal from "../components/AddWrappingLabPropertyModal";
import AddWrappingLabVariantModal from "../components/AddWrappingLabVariantModal";
import Toast from "../components/Toast";

import "./WrappingLabProperties.css";

class EditWrapper extends React.Component {
  state = {
    activeTypeId: null,
    thumbnailChangingId: null,
    addVariantTypeId: null,
    isAddModalOpen: false
  };
  render() {
    const pageName = "Wrappers";
    const query = { query: QUERY_GET_WRAPPERS };
    return (
      <Card className="wrapping-lab-properties-container">
        <Card.Header>
          <h2 className="mb-0">{pageName}</h2>
        </Card.Header>
        <Card.Body>
          <Query {...query}>
            {({ loading, error, data }) =>
              loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-center">{error.message || error}</div>
              ) : (
                <React.Fragment>
                  <Button
                    className="mb-3"
                    onClick={() => this.setState({ isAddModalOpen: true })}
                  >
                    <i className="fa fa-plus mr-1" />
                    Add New Wrapper
                  </Button>
                  <Accordion>
                    {data.getWrapperTypes.map((wrapperType, idx) => (
                      <Card
                        className="wrapping-lab-properties-item cursor-pointer"
                        key={idx}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey={idx}>
                          <div className="d-flex justify-content-between">
                            <span>
                              <img
                                src={wrapperType.thumbnail}
                                alt="Thumbnail"
                                className="wrapping-lab-properties-type-thumbnail"
                              />
                              {wrapperType.name}
                            </span>
                            <Mutation
                              mutation={MUTATION_DELETE_WRAPPER_TYPE}
                              refetchQueries={[query]}
                            >
                              {deleteWrapperType => (
                                <Mutation
                                  mutation={MUTATION_DELETE_WRAPPER_CHOICE}
                                  refetchQueries={[query]}
                                >
                                  {deleteWrapperVariant => (
                                    <i
                                      className="fa fa-trash text-danger cursor-pointer"
                                      onClick={e => {
                                        document.body.classList.add("waiting");
                                        e.target.classList.remove(
                                          "cursor-pointer"
                                        );
                                        const promises = wrapperType.choices.map(
                                          ({ id }) =>
                                            deleteWrapperVariant({
                                              variables: { id: id }
                                            }).catch(error =>
                                              console.log(error.message)
                                            )
                                        );
                                        Promise.all(promises)
                                          .then(() =>
                                            deleteWrapperType({
                                              variables: {
                                                id: wrapperType.id
                                              }
                                            }).then(() => {
                                              document.body.classList.remove(
                                                "waiting"
                                              );
                                              const wrapperName =
                                                wrapperType.name;
                                              Toast.fire({
                                                type: "success",
                                                title: `${wrapperName} has been deleted`
                                              });
                                            })
                                          )
                                          .catch(error => {
                                            document.body.classList.remove(
                                              "waiting"
                                            );
                                            e.target.classList.add(
                                              "cursor-pointer"
                                            );
                                            Toast.fire({
                                              type: "error",
                                              title: `${error.message || error}`
                                            });
                                          });
                                      }}
                                    />
                                  )}
                                </Mutation>
                              )}
                            </Mutation>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={idx}>
                          <Card.Body>
                            <small className="text-muted">
                              Rank would be used for arrangement; the higher the
                              rank, the later item displayed
                            </small>
                            <Mutation mutation={MUTATION_UPDATE_WRAPPER_TYPE}>
                              {updateWrapperType => (
                                <Form
                                  className="mt-3"
                                  onSubmit={e => {
                                    e.preventDefault();
                                    updateWrapperType({
                                      variables: {
                                        id: wrapperType.id,
                                        rank: parseInt(e.target.rank.value),
                                        name: e.target.wrapperType.value,
                                        price: parseFloat(e.target.price.value)
                                      },
                                      refetchQueries: [query]
                                    })
                                      .then(() =>
                                        Toast.fire({
                                          type: "success",
                                          title: `${wrapperType.name} has been updated`
                                        })
                                      )
                                      .catch(error =>
                                        Toast.fire({
                                          type: "error",
                                          title: error.message || error
                                        })
                                      );
                                  }}
                                >
                                  <TextInput
                                    fieldName="Wrapper Type"
                                    defaultValue={wrapperType.name}
                                  />
                                  <TextInput
                                    numeric
                                    fieldName="Rank"
                                    defaultValue={wrapperType.rank}
                                  />
                                  <TextInput
                                    fieldName="Price"
                                    defaultValue={wrapperType.price}
                                    onChange={e =>
                                      (e.target.value = validateNumeric(
                                        e.target.value
                                      ))
                                    }
                                  />
                                  <Button
                                    type="button"
                                    variant="outline-info"
                                    className="wrapping-lab-properties-buttons mr-2"
                                    onClick={() =>
                                      this.setState({
                                        thumbnailChangingId: wrapperType.id
                                      })
                                    }
                                  >
                                    Change Thumbnail
                                  </Button>
                                  <Button
                                    variant="outline-secondary"
                                    type="button"
                                    className="wrapping-lab-properties-buttons"
                                    onClick={() =>
                                      this.setState({
                                        activeTypeId: wrapperType.id
                                      })
                                    }
                                  >
                                    Manage Variants
                                  </Button>
                                  <Button
                                    block
                                    variant="success"
                                    type="submit"
                                    className="mt-2"
                                  >
                                    Save
                                  </Button>
                                </Form>
                              )}
                            </Mutation>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                  <EditWrappingLabVariantModal
                    show={
                      this.state.activeTypeId !== null &&
                      this.state.addVariantTypeId === null
                    }
                    onHide={() => this.setState({ activeTypeId: null })}
                    property={pageName.slice(0, -1)}
                    type={
                      data.getWrapperTypes.find(
                        type => type.id === this.state.activeTypeId
                      ) || {}
                    }
                    updateMutation={{
                      mutation: MUTATION_UPDATE_WRAPPER_CHOICE,
                      refetchQueries: [query]
                    }}
                    deleteMutation={{
                      mutation: MUTATION_DELETE_WRAPPER_CHOICE,
                      refetchQueries: [query]
                    }}
                    addVariant={id => this.setState({ addVariantTypeId: id })}
                  />
                  <EditWrappingLabPropertyThumbnailModal
                    show={this.state.thumbnailChangingId !== null}
                    onHide={() => this.setState({ thumbnailChangingId: null })}
                    property={pageName.slice(0, -1)}
                    type={
                      data.getWrapperTypes.find(
                        type => type.id === this.state.thumbnailChangingId
                      ) || {}
                    }
                    mutation={{
                      mutation: MUTATION_UPDATE_WRAPPER_TYPE_THUMBNAIL,
                      refetchQueries: [query]
                    }}
                  />
                  <AddWrappingLabPropertyModal
                    show={this.state.isAddModalOpen}
                    onHide={() => this.setState({ isAddModalOpen: false })}
                    property={pageName.slice(0, -1)}
                    mutation={{
                      mutation: MUTATION_ADD_WRAPPER_TYPE,
                      refetchQueries: [query]
                    }}
                  />
                  <AddWrappingLabVariantModal
                    show={this.state.addVariantTypeId !== null}
                    onHide={() => this.setState({ addVariantTypeId: null })}
                    property={pageName.slice(0, -1)}
                    type={
                      data.getWrapperTypes.find(
                        type => type.id === this.state.addVariantTypeId
                      ) || {}
                    }
                    mutation={{
                      mutation: MUTATION_ADD_WRAPPER_CHOICE,
                      refetchQueries: [query]
                    }}
                  />
                </React.Fragment>
              )
            }
          </Query>
        </Card.Body>
      </Card>
    );
  }
}

export default EditWrapper;
