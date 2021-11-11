import React from "react";
import { Input } from "reactstrap";
import { Mutation, Query } from "react-apollo";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  QUERY_GET_GIDA_OPTIONS,
  MUTATION_ADD_GIDA_OPTION,
  MUTATION_DELETE_GIDA_OPTION,
  MUTATION_UPDATE_GIDA_OPTION
} from "../gql/gida-option";

import "../components/FormComponents.css";
import Toast from "../components/Toast";

class EditForm extends React.Component {
  state = {
    isEditing: false
  };
  startEdit = () => {
    this.setState({ isEditing: true });
  };
  quitEdit = () => {
    this.setState({ isEditing: false });
  };
  render() {
    if (!this.state.isEditing) {
      return (
        <div onDoubleClick={this.startEdit}>{this.props.option.value}</div>
      );
    }
    return (
      <Mutation mutation={MUTATION_UPDATE_GIDA_OPTION}>
        {updateGidaOption => (
          <form
            onSubmit={e => {
              e.preventDefault();
              const oldValue = this.props.option.value;
              const newValue = e.target.newOption.value;
              updateGidaOption({
                variables: {
                  id: this.props.option.id,
                  newValue: e.target.newOption.value
                },
                refetchQueries: [{ query: QUERY_GET_GIDA_OPTIONS }]
              })
                .then(() => {
                  Toast.fire({
                    type: "success",
                    title: `${oldValue} has been updated to ${newValue}`
                  });
                  this.quitEdit();
                })
                .catch(error =>
                  Toast.fire({
                    type: "error",
                    title: error.message || error
                  })
                );
            }}
          >
            <Input
              name="newOption"
              type="text"
              defaultValue={this.props.option.value}
              onBlur={this.quitEdit}
            />
          </form>
        )}
      </Mutation>
    );
  }
}

const GidaOptionList = props => (
  <Card>
    <Card.Header>
      <h2 className="mb-0">GIdA Search Engine Options</h2>
    </Card.Header>
    <Card.Body>
      <small className="text-muted">
        Double click to edit, enter to submit
      </small>
      <Query query={QUERY_GET_GIDA_OPTIONS}>
        {({ loading, error, data }) =>
          loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            <Container fluid className="mt-4">
              <Row>
                {Object.entries({
                  Relationship: data.getGidaRelationshipOptions,
                  Event: data.getGidaEventOptions,
                  Personality: data.getGidaPersonalityOptions
                }).map(([key, data], idx) => (
                  <Col
                    key={key}
                    sm={12}
                    md={true}
                    className={idx === 0 ? null : "border-left"}
                  >
                    <h4 className="text-center font-weight-bold mb-2">{key}</h4>
                    <Mutation mutation={MUTATION_ADD_GIDA_OPTION}>
                      {addGidaOption => (
                        <form
                          onSubmit={e => {
                            const formNode = e.target;
                            e.preventDefault();
                            addGidaOption({
                              variables: {
                                category: key,
                                value: e.target.newOption.value
                              },
                              refetchQueries: [
                                { query: QUERY_GET_GIDA_OPTIONS }
                              ]
                            })
                              .then(() => {
                                Toast.fire({
                                  type: "success",
                                  title: `A new ${key.toLowerCase()} has been added`
                                });
                                formNode.reset();
                              })
                              .catch(error =>
                                Toast.fire({
                                  type: "error",
                                  title: error.message || error
                                })
                              );
                          }}
                        >
                          <Input
                            className="new-option-input p-0 mb-2"
                            name="newOption"
                            type="text"
                            placeholder={`Enter new ${key.toLowerCase()}`}
                          />
                        </form>
                      )}
                    </Mutation>
                    {data.map(datum => (
                      <Row
                        key={datum.id}
                        noGutters
                        className="align-items-center mb-1"
                      >
                        <Col xs={11}>
                          <EditForm option={datum} />
                        </Col>
                        <Col xs={1} className="text-right">
                          <Mutation mutation={MUTATION_DELETE_GIDA_OPTION}>
                            {deleteGidaOption => (
                              <i
                                className="fa fa-times text-danger cursor-pointer"
                                onClick={() => {
                                  const value = datum.value;
                                  deleteGidaOption({
                                    variables: {
                                      id: datum.id
                                    },
                                    refetchQueries: [
                                      { query: QUERY_GET_GIDA_OPTIONS }
                                    ]
                                  })
                                    .then(() => {
                                      Toast.fire({
                                        type: "success",
                                        title: `${value} has been deleted`
                                      });
                                    })
                                    .catch(error =>
                                      Toast.fire({
                                        type: "error",
                                        title: error.message || error
                                      })
                                    );
                                }}
                              />
                            )}
                          </Mutation>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                ))}
              </Row>
            </Container>
          )
        }
      </Query>
    </Card.Body>
  </Card>
);

export default GidaOptionList;
