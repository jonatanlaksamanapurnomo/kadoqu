import React from "react";
import { Card } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY_GET_TOTAL_GIDA = gql`
  query getGidaUser {
    getGidaUser
  }
`;

class TotalGida extends React.Component {
  render() {
    return (
      <Query query={QUERY_GET_TOTAL_GIDA}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const allUsersCount = data.getGidaUser;
          if (allUsersCount === 0) {
            return (
              <Card className="chart-container">
                <Card.Body className="text-center d-flex flex-column justify-content-center">
                  <div className="small text-muted my-2">0</div>
                </Card.Body>
              </Card>
            );
          }
          return (
            <Card className="chart-container">
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <span>
                  <div className="d-flex justify-content-even align-items-center">
                    <div xs={6} className="text-warning">
                      Total Gida User <br />
                      <span className="sales-chart-growth">
                        {allUsersCount} <br />
                        Users
                      </span>
                    </div>
                  </div>
                  <div></div>
                </span>
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default TotalGida;
