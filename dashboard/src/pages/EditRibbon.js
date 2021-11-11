import React from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { Query, Mutation } from "react-apollo";
import {
  QUERY_GET_RIBBONS,
  MUTATION_UPDATE_RIBBON_CHOICE,
  MUTATION_DELETE_RIBBON_CHOICE,
  MUTATION_UPDATE_RIBBON_TYPE_THUMBNAIL,
  MUTATION_UPDATE_RIBBON_TYPE,
  MUTATION_ADD_RIBBON_TYPE,
  MUTATION_ADD_RIBBON_CHOICE,
  MUTATION_DELETE_RIBBON_TYPE
} from "../gql/wrapping-lab-ribbon";
import { TextInput } from "../components/FormComponents";
import { validateNumeric } from "../utils/regexInputConverter";
import EditWrappingLabVariantModal from "../components/EditWrappingLabVariantModal";
import EditWrappingLabPropertyThumbnailModal from "../components/EditWrappingLabPropertyThumbnailModal";
import AddWrappingLabPropertyModal from "../components/AddWrappingLabPropertyModal";
import AddWrappingLabVariantModal from "../components/AddWrappingLabVariantModal";
import Toast from "../components/Toast";

import "./WrappingLabProperties.css";

class EditRibbon extends React.Component {
  state = {
    activeTypeId: null,
    thumbnailChangingId: null,
    addVariantTypeId: null,
    isAddModalOpen: false
  };
  render() {
    const pageName = "Ribbons";
    const query = { query: QUERY_GET_RIBBONS };
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
                    Add New {pageName.slice(0, -1)}
                  </Button>
                  <Accordion>
                    {data.getRibbonTypes.map((ribbonType, idx) => (
                      <Card
                        className="wrapping-lab-properties-item cursor-pointer"
                        key={idx}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey={idx}>
                          <div className="d-flex justify-content-between">
                            <span>
                              <img
                                src={ribbonType.thumbnail}
                                alt="Thumbnail"
                                className="wrapping-lab-properties-type-thumbnail"
                              />
                              {ribbonType.name}
                            </span>
                            <Mutation
                              mutation={MUTATION_DELETE_RIBBON_TYPE}
                              refetchQueries={[query]}
                            >
                              {deleteRibbonType => (
                                <Mutation
                                  mutation={MUTATION_DELETE_RIBBON_CHOICE}
                                  refetchQueries={[query]}
                                >
                                  {deleteRibbonVariant => (
                                    <i
                                      className="fa fa-trash text-danger cursor-pointer"
                                      onClick={e => {
                                        document.body.classList.add("waiting");
                                        e.target.classList.remove(
                                          "cursor-pointer"
                                        );
                                        const promises = ribbonType.choices.map(
                                          ({ id }) =>
                                            deleteRibbonVariant({
                                              variables: { id: id }
                                            }).catch(error =>
                                              console.log(error.message)
                                            )
                                        );
                                        Promise.all(promises)
                                          .then(() =>
                                            deleteRibbonType({
                                              variables: {
                                                id: ribbonType.id
                                              }
                                            }).then(() => {
                                              document.body.classList.remove(
                                                "waiting"
                                              );
                                              const ribbonName =
                                                ribbonType.name;
                                              Toast.fire({
                                                type: "success",
                                                title: `${ribbonName} has been deleted`
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
                            <Mutation mutation={MUTATION_UPDATE_RIBBON_TYPE}>
                              {updateRibbonType => (
                                <Form
                                  className="mt-3"
                                  onSubmit={e => {
                                    e.preventDefault();
                                    updateRibbonType({
                                      variables: {
                                        id: ribbonType.id,
                                        rank: parseInt(e.target.rank.value),
                                        name: e.target.ribbonType.value,
                                        price: parseFloat(e.target.price.value),
                                        info: e.target.additionalInfo.value
                                      },
                                      refetchQueries: [query]
                                    })
                                      .then(() =>
                                        Toast.fire({
                                          type: "success",
                                          title: `${ribbonType.name} has been updated`
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
                                    fieldName="Ribbon Type"
                                    defaultValue={ribbonType.name}
                                  />
                                  <TextInput
                                    numeric
                                    fieldName="Rank"
                                    defaultValue={ribbonType.rank}
                                  />
                                  <TextInput
                                    fieldName="Price"
                                    defaultValue={ribbonType.price}
                                    onChange={e =>
                                      (e.target.value = validateNumeric(
                                        e.target.value
                                      ))
                                    }
                                  />
                                  <TextInput
                                    fieldName="Additional Info"
                                    placeholder="Example: lebar: 20cm"
                                    defaultValue={ribbonType.additionalInfo}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline-info"
                                    className="wrapping-lab-properties-buttons mr-2"
                                    onClick={() =>
                                      this.setState({
                                        thumbnailChangingId: ribbonType.id
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
                                        activeTypeId: ribbonType.id
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
                      data.getRibbonTypes.find(
                        type => type.id === this.state.activeTypeId
                      ) || {}
                    }
                    updateMutation={{
                      mutation: MUTATION_UPDATE_RIBBON_CHOICE,
                      refetchQueries: [query]
                    }}
                    deleteMutation={{
                      mutation: MUTATION_DELETE_RIBBON_CHOICE,
                      refetchQueries: [query]
                    }}
                    addVariant={id => this.setState({ addVariantTypeId: id })}
                  />
                  <EditWrappingLabPropertyThumbnailModal
                    show={this.state.thumbnailChangingId !== null}
                    onHide={() => this.setState({ thumbnailChangingId: null })}
                    property={pageName.slice(0, -1)}
                    type={
                      data.getRibbonTypes.find(
                        type => type.id === this.state.thumbnailChangingId
                      ) || {}
                    }
                    mutation={{
                      mutation: MUTATION_UPDATE_RIBBON_TYPE_THUMBNAIL,
                      refetchQueries: [query]
                    }}
                  />
                  <AddWrappingLabPropertyModal
                    show={this.state.isAddModalOpen}
                    onHide={() => this.setState({ isAddModalOpen: false })}
                    property={pageName.slice(0, -1)}
                    mutation={{
                      mutation: MUTATION_ADD_RIBBON_TYPE,
                      refetchQueries: [query]
                    }}
                  />
                  <AddWrappingLabVariantModal
                    show={this.state.addVariantTypeId !== null}
                    onHide={() => this.setState({ addVariantTypeId: null })}
                    property={pageName.slice(0, -1)}
                    type={
                      data.getRibbonTypes.find(
                        type => type.id === this.state.addVariantTypeId
                      ) || {}
                    }
                    mutation={{
                      mutation: MUTATION_ADD_RIBBON_CHOICE,
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

export default EditRibbon;
