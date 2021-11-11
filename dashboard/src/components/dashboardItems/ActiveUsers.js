import React from "react";
import { Card } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY_GET_ACTIVE_USER = gql`
  query getActiveUsersCount {
    getActiveUsersCount
    getUsers {
      id
    }
  }
`;

class ActiveUsers extends React.Component {
  render() {
    return (
      <Query query={QUERY_GET_ACTIVE_USER} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const activeUser = data.getActiveUsersCount;
          const allUsersCount = data.getUsers.length;
          if (allUsersCount === 0) {
            return (
              <Card className="chart-container">
                <Card.Body className="text-center d-flex flex-column justify-content-center">
                  <div className="small text-muted my-2">
                    This is active customer section, but no customer registered
                  </div>
                </Card.Body>
              </Card>
            );
          }
          const activeUserPercentage = (activeUser / allUsersCount) * 100;
          return (
            <Card className="chart-container">
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <span>
                  Currently we have
                  <h4 className="font-weight-bold mb-0">
                    {activeUserPercentage.toFixed(2)}%
                  </h4>
                  <div>
                    active users ({activeUser} / {allUsersCount})
                  </div>
                </span>
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default ActiveUsers;
