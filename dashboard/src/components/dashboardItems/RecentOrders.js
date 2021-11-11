import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import NavLink from "../NavLink";
import { numericToCurrency } from "../../utils/formatter";

const QUERY_GET_RECENT_ORDERS = gql`
  query getRecentOrders {
    getRecentOrders {
      id
      number
      user {
        firstName
      }
      total
    }
  }
`;

class RecentOrders extends React.Component {
  render() {
    return (
      <Query query={QUERY_GET_RECENT_ORDERS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const recentOrders = data.getRecentOrders;
          return (
            <Card className="chart-container">
              <Card.Body>
                <h4 className="font-weight-bold mb-3 d-inline-block">
                  Recent Orders
                </h4>
                <div>
                  {recentOrders.map((recentOrder, index) => (
                    <Row key={index} noGutters className="mb-2">
                      <Col xs={1}>
                        <NavLink
                          className="p-0"
                          href={"order/" + recentOrder.id}
                        >
                          #{recentOrder.number}
                        </NavLink>
                      </Col>
                      <Col xs={6}>{recentOrder.user.firstName}</Col>
                      <Col xs={5} className="text-right">
                        Rp{numericToCurrency(recentOrder.total)}
                      </Col>
                    </Row>
                  ))}
                </div>
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default RecentOrders;
