import React from "react";
import { Card, Col, Form, ProgressBar, Row } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "../../utils/dateTimeFormatter";

import "./Chart.css";

const QUERY_GET_AVERAGE_RATINGS = gql`
  query getAverageRatings($startDate: Date, $endDate: Date) {
    getAverageRatings(startDate: $startDate, endDate: $endDate) {
      ratingCount
      speedCS
      service
      productQuality
      wrappingQuality
      productSafety
      productSatisfaction
    }
  }
`;

const KEY_TITLE_MAPPER = {
  speedCS: "CS Speed",
  service: "Service",
  productQuality: "Product Quality",
  wrappingQuality: "Wrapping Quality",
  productSafety: "Product Safety",
  productSatisfaction : "Product Satisfaction"
};

class Ratings extends React.Component {
  state = {
    period: 0,
    start: new Date(2017, 0),
    end: new Date()
  };
  render() {
    const { start, end, period } = this.state;
    return (
      <Query
        query={QUERY_GET_AVERAGE_RATINGS}
        variables={{
          startDate: start,
          endDate: end
        }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const {
            ratingCount,
            __typename,
            ...ratings
          } = data.getAverageRatings;
          return (
            <Card className="chart-container">
              <Card.Body>
                <h4 className="font-weight-bold mb-0">Ratings</h4>
                <div className="chart-title-section">
                  <Form.Control
                    as="select"
                    className="h-auto py-1 px-1"
                    value={period}
                    onChange={e => {
                      const isAllTime = e.target.value === 0;
                      this.setState({
                        period: e.target.value,
                        start: isAllTime
                          ? new Date(2017, 0)
                          : addMonths(new Date(), -1),
                        end: new Date()
                      });
                    }}
                  >
                    <option value={0}>All time</option>
                    <option value={1}>Period:</option>
                  </Form.Control>
                  {period !== 0 && (
                    <span className="ratings-period-range">
                      <DatePicker
                        selected={start}
                        showMonthYearPicker
                        minDate={new Date(2017, 0)}
                        maxDate={end}
                        onChange={e => {
                          const newDate = new Date(e);
                          this.setState({ start: newDate });
                        }}
                        dateFormat="MMM yy"
                      />
                      to
                      <DatePicker
                        selected={end}
                        showMonthYearPicker
                        minDate={start}
                        maxDate={new Date()}
                        onChange={e => {
                          const newDate = new Date(e);
                          this.setState({ end: newDate });
                        }}
                        dateFormat="MMM yy"
                      />
                    </span>
                  )}
                </div>
                {ratingCount === 0 ? (
                  <div className="text-muted small">
                    No ratings ever recorded in this period
                  </div>
                ) : (
                  <div>
                    {Object.entries(ratings).map(([key, value]) => {
                      const fieldName = KEY_TITLE_MAPPER[key];
                      return (
                        <Row noGutters key={fieldName} className="mt-2">
                          <Col xs={5}>{fieldName}</Col>
                          <Col xs={5}>
                            <ProgressBar
                              variant="warning"
                              now={(value / 5) * 100}
                              label={`${(value / 5) * 100}%`}
                            />
                          </Col>
                          <Col xs={2} className="text-right">
                            {value} / 5
                          </Col>
                        </Row>
                      );
                    })}
                    <div className="text-right text-muted small font-weight-italic mt-1">
                      Based on ratings for{" "}
                      <span className="font-weight-bold">{ratingCount}</span>{" "}
                      order{ratingCount === 1 ? "" : "s"}
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

export default Ratings;
