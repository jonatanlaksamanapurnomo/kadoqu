import React from "react";
import { Card } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY_GET_AVERAGE_PROCESSING_TIME = gql`
  query getAverageProcessingTime {
    getAverageProcessingTime
  }
`;

class AverageProcessingTime extends React.Component {
  render() {
    return (
      <Query
        query={QUERY_GET_AVERAGE_PROCESSING_TIME}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const time = data.getAverageProcessingTime;
          if (!time) {
            return (
              <Card className="chart-container">
                <Card.Body className="text-center d-flex flex-column justify-content-center">
                  <div className="small text-muted my-2">
                    This is average processing time section, but no transaction
                    has ever been done
                  </div>
                </Card.Body>
              </Card>
            );
          }
          return (
            <Card className="chart-container">
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <span>
                  On average, we need
                  <h4 className="font-weight-bold mb-0">{time}</h4>
                  for processing orders
                </span>
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default AverageProcessingTime;
