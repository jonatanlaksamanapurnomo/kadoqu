import React from "react";
import { Card, Form, OverlayTrigger, Popover } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { numericToCurrency } from "../../utils/formatter";

const QUERY_GET_TOP_CUSTOMER = gql`
  query getTopCustomer {
    getMostActiveCustomer {
      id
      name
      email
      ordersMade
      lastActivity
    }
    getBiggestSpenderCustomer {
      id
      name
      email
      totalSpent
      lastActivity
    }
  }
`;

class TopCustomer extends React.Component {
  state = {
    isMostActive: true
  };
  render() {
    const { isMostActive } = this.state;
    return (
      <Query query={QUERY_GET_TOP_CUSTOMER} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const { name, email, ordersMade, totalSpent, lastActivity } = data[
            isMostActive ? "getMostActiveCustomer" : "getBiggestSpenderCustomer"
          ];
          if (!name) {
            return (
              <Card className="chart-container">
                <Card.Body className="text-center d-flex flex-column justify-content-center">
                  <div className="small text-muted my-2">
                    This is top customer section, but no transaction has ever
                    been done
                  </div>
                </Card.Body>
              </Card>
            );
          }
          return (
            <Card className="chart-container">
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <div>
                  The{" "}
                  <Form.Control
                    as="select"
                    className="h-auto py-0 px-1"
                    value={isMostActive}
                    onChange={e => {
                      const choice = e.target.value;
                      this.setState({
                        isMostActive:
                          typeof choice === "boolean"
                            ? choice
                            : choice === "true"
                      });
                    }}
                  >
                    <option value={true}>most active</option>
                    <option value={false}>biggest spender</option>
                  </Form.Control>{" "}
                  customer is
                </div>
                <OverlayTrigger
                  trigger={["hover", "click"]}
                  rootClose
                  placement="bottom"
                  overlay={
                    <Popover className="text-left p-3 bg-light">
                      <div>
                        {isMostActive
                          ? "Orders made: " + ordersMade
                          : "Money spent: Rp" + numericToCurrency(totalSpent)}
                      </div>
                      <div>
                        Last order:{" "}
                        {new Date(lastActivity).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric"
                        })}
                      </div>
                    </Popover>
                  }
                >
                  <div className="cursor-pointer">
                    <h4 className="font-weight-bold mb-0 mt-3">{name}</h4>
                    <div>({email})</div>
                  </div>
                </OverlayTrigger>
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default TopCustomer;
