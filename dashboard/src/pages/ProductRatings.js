import React from "react";
import { Button, Card, Col, Form, Row, Image } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import "../components/dashboardItems/Chart.css";
import NavLink from "../components/NavLink";

const QUERY_GET_FEEDBACKSPRODUCT = gql`
  query getFilteredRatingsProduct(
    $field: String
    $rate: Int
    $sortBehavior: String
  ) {
    getFilteredRatingsProduct(
      filterField: $field
      filterValue: $rate
      sort: $sortBehavior
    ) {
      id
      orderId
      rating
      image
      description
      user {
        fullName
        email
      }
      product {
        name
      }
      order {
        number
      }
    }
  }
`;

class ProductRating extends React.Component {
  state = {
    variables: {
      sortBehavior: "DESC",
      field: undefined,
      rate: undefined
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
    const { variables } = this.state;
    const { sortBehavior } = variables;
    return (
      <Query
        query={QUERY_GET_FEEDBACKSPRODUCT}
        variables={variables}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          return (
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <h4 className="font-weight-bold mb-0">Product Rating</h4>
                  <div>
                    <Form.Group
                      controlId="filter-checkbox"
                      className="d-inline-block mr-2"
                    ></Form.Group>

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
                {data.getFilteredRatingsProduct.length === 0 ? (
                  <div className="text-muted small">
                    No ratings ever recorded in this period
                  </div>
                ) : (
                  <div>
                    <div className="d-flex justify-content-between text-muted small font-weight-italic mb-1">
                      <span>
                        <span className="font-weight-bold">
                          {data.getFilteredRatingsProduct.length}
                        </span>{" "}
                        entr
                        {data.getFilteredRatingsProduct.length === 1
                          ? "y"
                          : "ies"}
                      </span>
                      <span>
                        Sorted{" "}
                        {sortBehavior === "ASC"
                          ? "oldest to newest"
                          : "newest to oldest"}
                      </span>
                    </div>
                    <div className="overflow-auto">
                      <Row>
                        <Col>
                          <div>
                            <span className="font-weight-bold">
                              <h3>Order No.</h3>
                            </span>{" "}
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <span className="font-weight-bold">
                              <h3> User</h3>
                            </span>{" "}
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <span className="font-weight-bold">
                              <h3> Product</h3>
                            </span>{" "}
                          </div>
                        </Col>
                        <Col>
                          <h3> Rating</h3>
                        </Col>
                        <Col>
                          <h3> Image</h3>
                        </Col>
                        <Col>
                          <div>
                            {" "}
                            <h3> Description </h3>
                          </div>
                        </Col>
                      </Row>
                      {data.getFilteredRatingsProduct.map(
                        (
                          {
                            orderId,
                            order,
                            user,
                            product,
                            rating,
                            image,
                            description
                          },
                          index
                        ) => {
                          return (
                            <NavLink
                              key={index}
                              className="mt-3 p-0 text-dark"
                              href={"/order/" + orderId}
                            >
                              <Row>
                                <Col>
                                  <div>
                                    <span className="font-weight-bold">
                                      {order.number}
                                    </span>{" "}
                                  </div>
                                </Col>
                                <Col>
                                  <div>
                                    <span className="font-weight-bold">
                                      {user.fullName}
                                    </span>{" "}
                                  </div>
                                </Col>
                                <Col>
                                  <div>
                                    <span className="font-weight-bold">
                                      {product.name}
                                    </span>{" "}
                                  </div>
                                </Col>
                                <Col>
                                  <Row key="5">
                                    {Array(rating)
                                      .fill("dummy")
                                      .map((dummy, index) => (
                                        <i
                                          key={index}
                                          className="fa fa-star text-warning"
                                        />
                                      ))}
                                  </Row>
                                </Col>
                                <Col>
                                  <Image
                                    width="50%"
                                    src={image}
                                    className="w-20"
                                  />
                                </Col>
                                <Col>
                                  <div>{description}</div>
                                </Col>
                              </Row>
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

export default ProductRating;
