import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Popover,
  Row
} from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import "./Chart.css";
import NavLink from "../NavLink";

const QUERY_GET_FEEDBACKS = gql`
  query getFilteredRatings($field: String, $rate: Int, $sortBehavior: String) {
    getFilteredRatings(
      filterField: $field
      filterValue: $rate
      sort: $sortBehavior
    ) {
      orderId
      description
      speedCS
      service
      productQuality
      wrappingQuality
      productSafety
      user {
        fullName
        email
      }
    }
  }
`;

const KEY_FIELD_MAPPER = {
  "CS Speed": "speed_cs",
  Service: "service",
  "Product Quality": "product_quality",
  "Wrapping Quality": "wrapping_quality",
  "Product Safety": "product_safety"
};

class Feedbacks extends React.Component {
  state = {
    variables: {
      sortBehavior: "DESC",
      field: undefined,
      rate: undefined
    },
    filterForm: {
      filterField: Object.values(KEY_FIELD_MAPPER)[0],
      filterRate: 1
    },
    displayFilter: false
  };
  setVariables = newVar => {
    this.setState({ variables: Object.assign(this.state.variables, newVar) });
  };
  setFilterForm = newState => {
    this.setState({
      filterForm: Object.assign(this.state.filterForm, newState)
    });
  };
  render() {
    const { displayFilter, variables, filterForm } = this.state;
    const { sortBehavior } = variables;
    const { filterField, filterRate } = filterForm;
    return (
      <Query
        query={QUERY_GET_FEEDBACKS}
        variables={variables}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          return (
            <Card className="chart-container">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <h4 className="font-weight-bold mb-0">Feedbacks</h4>
                  <div>
                    <Form.Group
                      controlId="filter-checkbox"
                      className="d-inline-block mr-2"
                    >
                      <Form.Check
                        type="checkbox"
                        label={displayFilter ? "Filter: " : "Filter?"}
                        className="d-inline-block"
                        checked={displayFilter}
                        onChange={e => {
                          this.setState({ displayFilter: e.target.checked });
                          this.setVariables({
                            field: undefined,
                            rate: undefined
                          });
                        }}
                      />
                    </Form.Group>
                    {displayFilter && (
                      <Form
                        className="d-inline-block"
                        onSubmit={e => {
                          e.preventDefault();
                          this.setVariables({
                            field: filterField,
                            rate: filterRate
                          });
                        }}
                      >
                        <Form.Control
                          as="select"
                          className="h-auto py-1 px-1"
                          value={filterField}
                          onChange={e => {
                            this.setFilterForm({
                              filterField: e.target.value
                            });
                          }}
                        >
                          {Object.entries(KEY_FIELD_MAPPER).map(
                            ([text, fieldName]) => (
                              <option key={text} value={fieldName}>
                                {text}
                              </option>
                            )
                          )}
                        </Form.Control>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="1"
                          value={filterRate}
                          onChange={e => {
                            this.setFilterForm({
                              filterRate: parseInt(e.target.value)
                            });
                          }}
                        />
                        <Button type="submit" variant="info" className="mr-2">
                          <i className="fa fa-filter" />
                        </Button>
                      </Form>
                    )}
                    <Button
                      onClick={() =>
                        this.setVariables({
                          sortBehavior: sortBehavior === "ASC" ? "DESC" : "ASC"
                        })
                      }
                    >
                      Sort{" "}
                      <i
                        className={
                          "fa fa-long-arrow-" +
                          (sortBehavior === "ASC" ? "up" : "down")
                        }
                      />
                    </Button>
                  </div>
                </div>
                {data.getFilteredRatings.length === 0 ? (
                  <div className="text-muted small">
                    No ratings ever recorded in this period
                  </div>
                ) : (
                  <div>
                    <div className="d-flex justify-content-between text-muted small font-weight-italic mb-1">
                      <span>
                        <span className="font-weight-bold">
                          {data.getFilteredRatings.length}
                        </span>{" "}
                        entr{data.getFilteredRatings.length === 1 ? "y" : "ies"}
                      </span>
                      <span>
                        Sorted{" "}
                        {sortBehavior === "ASC"
                          ? "oldest to newest"
                          : "newest to oldest"}
                      </span>
                    </div>
                    <div
                      className="overflow-auto"
                      style={{ maxHeight: "170px" }}
                    >
                      {data.getFilteredRatings.map(
                        (
                          {
                            user,
                            description,
                            orderId,
                            speedCS,
                            service,
                            productQuality,
                            wrappingQuality,
                            productSafety
                          },
                          index
                        ) => {
                          const avgScore =
                            (speedCS +
                              service +
                              productQuality +
                              wrappingQuality +
                              productSafety) /
                            5;
                          const ratings = {
                            "CS Speed": speedCS,
                            Service: service,
                            "Product Quality": productQuality,
                            "Wrapping Quality": wrappingQuality,
                            "Product Safety": productSafety
                          };
                          return (
                            <NavLink
                              key={index}
                              className="mt-3 p-0 text-dark"
                              href={"/order/" + orderId}
                            >
                              <div className="d-flex justify-content-between">
                                <div>
                                  <span className="font-weight-bold">
                                    {user.fullName}
                                  </span>{" "}
                                  <span className="small">{user.email}</span>
                                </div>

                                <OverlayTrigger
                                  trigger={["hover", "click"]}
                                  rootClose
                                  placement="left"
                                  overlay={
                                    <Popover
                                      className="text-left p-3 bg-light statistics-popover"
                                      style={{ width: "18rem" }}
                                    >
                                      {Object.entries(ratings).map(
                                        ([key, value]) => (
                                          <Row noGutters key={key}>
                                            <Col xs="7">{key}</Col>
                                            <Col xs="5">
                                              {Array(value)
                                                .fill("dummy")
                                                .map((dummy, index) => (
                                                  <i
                                                    key={index}
                                                    className="fa fa-star text-warning"
                                                  />
                                                ))}
                                            </Col>
                                          </Row>
                                        )
                                      )}
                                    </Popover>
                                  }
                                >
                                  <div>
                                    <i className="text-warning fa fa-star" />{" "}
                                    {avgScore}
                                  </div>
                                </OverlayTrigger>
                              </div>
                              <div>{description}</div>
                            </NavLink>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Feedbacks;
