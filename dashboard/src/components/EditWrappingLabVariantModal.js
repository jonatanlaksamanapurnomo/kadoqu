import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Mutation } from "react-apollo";
import Toast from "./Toast";
import { validateNumeric } from "../utils/regexInputConverter";

const EditWrappingLabVariantModal = props => (
  <Modal
    dialogClassName="wrapping-lab-properties-variant-modal"
    size="lg"
    show={props.show}
    onHide={props.onHide}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title className="text-uppercase mt-2">
        {props.property} - {props.type.name}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Button className="mb-3" onClick={() => props.addVariant(props.type.id)}>
        <i className="fa fa-plus mr-1" />
        Add New {props.property} Variant
      </Button>
      <Container fluid>
        <Row noGutters>
          {(props.type.choices || []).length === 0 ? (
            <div className="text-center">
              {props.type.name} currently has no variant
            </div>
          ) : (
            props.type.choices.map((variant, idx) => (
              <div
                key={idx}
                className="wrapping-lab-properties-variant-container"
              >
                <div>
                  <img className="w-100" src={variant.url} alt={variant.name} />
                </div>
                <Mutation {...props.updateMutation}>
                  {update => (
                    <React.Fragment>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          const formInput = e.target.name;
                          update({
                            variables: {
                              id: variant.id,
                              name: formInput.value
                            }
                          })
                            .then(() => {
                              Toast.fire({
                                type: "success",
                                title: `${props.property}'s name updated`
                              });
                              formInput.blur();
                            })
                            .catch(error =>
                              Toast.fire({
                                type: "error",
                                title: error.message
                              })
                            );
                        }}
                      >
                        <input
                          placeholder="name"
                          name="name"
                          defaultValue={variant.name}
                        />
                      </form>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          const formInput = e.target.rank;
                          update({
                            variables: {
                              id: variant.id,
                              rank: parseInt(formInput.value)
                            }
                          })
                            .then(() => {
                              Toast.fire({
                                type: "success",
                                title: `${props.property}'s rank updated`
                              });
                              formInput.blur();
                            })
                            .catch(error =>
                              Toast.fire({
                                type: "error",
                                title: error.message
                              })
                            );
                        }}
                      >
                        <Row noGutters>
                          <Col xs="4">Rank:</Col>
                          <Col>
                            <input
                              className="d-inline-block"
                              placeholder="rank"
                              name="rank"
                              defaultValue={variant.rank}
                              onChange={e =>
                                (e.target.value = parseInt(
                                  validateNumeric(e.target.value)
                                ))
                              }
                            />
                          </Col>
                        </Row>
                      </form>
                    </React.Fragment>
                  )}
                </Mutation>
                <Mutation {...props.deleteMutation}>
                  {deleteVariant => (
                    <i
                      className="fa fa-trash"
                      onClick={() => {
                        const wrapperName = variant.name;
                        deleteVariant({
                          variables: {
                            id: variant.id
                          }
                        })
                          .then(() =>
                            Toast.fire({
                              type: "success",
                              title: `${props.property} ${wrapperName} has been deleted`
                            })
                          )
                          .catch(error =>
                            Toast.fire({
                              type: "error",
                              title: error.message
                            })
                          );
                      }}
                    />
                  )}
                </Mutation>
              </div>
            ))
          )}
        </Row>
      </Container>
    </Modal.Body>
  </Modal>
);

export default EditWrappingLabVariantModal;
