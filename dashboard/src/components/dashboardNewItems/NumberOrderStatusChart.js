import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { HorizontalBar } from "react-chartjs-2";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { MONTHS, KADOQU_START_YEAR } from "../../data/constants";
import { addMonths } from "../../utils/dateTimeFormatter";

import "./Chart.css";

const plugins = [
  {
    afterDraw: (chartInstance, easing) => {
      //   const ctx = chartInstance.chart.ctx;
      //   ctx.fillText("This text drawn by a plugin", 100, 100);
    }
  }
];

const QUERY_GET_MONTHLY_REVENUES = gql`
  query getMonthlyNumberOrder(
    $startDate: ParsedDateInput
    $endDate: ParsedDateInput
  ) {
    getMonthlyNumberOrder(startDate: $startDate, endDate: $endDate) {
      done
      process
      cancel
    }
  }
`;

class NumberOrderStatusChart extends React.Component {
  state = {
    start: {
      month: addMonths(new Date(), -6).getMonth() + 1,
      year: addMonths(new Date(), -6).getFullYear()
    },
    end: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  };
  render() {
    const { start, end } = this.state;
    return (
      <Query
        query={QUERY_GET_MONTHLY_REVENUES}
        variables={{
          startDate: { month: start.month, year: start.year },
          endDate: { month: end.month, year: end.year }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const monthlyNumberOrder = data.getMonthlyNumberOrder;
          const chartData = {
            labels: Array.from(
              {
                length:
                  (end.year - start.year) * 12 + (end.month - start.month + 1)
              },
              (e, index) => {
                const currentDate = addMonths(
                  new Date(start.year, start.month - 1),
                  index
                );
                return `${
                  MONTHS[currentDate.getMonth()]
                } '${currentDate.getFullYear() % 100}`;
              }
            ),
            datasets: [
              {
                label: "Done",
                backgroundColor: "#CFF0CC",
                borderColor: "#CFF0CC",
                borderWidth: 1,
                hoverBackgroundColor: "#CFF0CC",
                hoverBorderColor: "#CFF0CC",
                data: monthlyNumberOrder.done
              },
              {
                label: "Process",
                backgroundColor: "#80CEE1",
                borderColor: "#80CEE1",
                borderWidth: 1,
                hoverBackgroundColor: "#80CEE1",
                hoverBorderColor: "#80CEE1",
                data: monthlyNumberOrder.process
              },
              {
                label: "Cancel",
                backgroundColor: "#FF6961",
                borderColor: "#FF6961",
                borderWidth: 1,
                hoverBackgroundColor: "#FF6961",
                hoverBorderColor: "#FF6961",
                data: monthlyNumberOrder.cancel
              }
            ]
          };

          return (
            <Card className="chart-container">
              <Card.Body>
                <Row className="chart-title-section">
                  <Col xs={8}>
                    <h5 className="font-weight-bold mb-0">Period</h5>
                  </Col>
                  <Col xs={8} className="text-right">
                    <Form.Control
                      as="select"
                      value={start.month}
                      onChange={e => {
                        if (
                          start.year === end.year &&
                          e.target.value > end.month
                        )
                          return;
                        this.setState({
                          start: { ...start, month: parseInt(e.target.value) }
                        });
                      }}
                    >
                      {MONTHS.map((month, index) => (
                        <option
                          key={month}
                          value={index + 1}
                          disabled={
                            start.year === end.year && index + 1 > end.month
                          }
                        >
                          {month}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control
                      as="select"
                      value={start.year}
                      onChange={e =>
                        this.setState({
                          start: { ...start, year: parseInt(e.target.value) }
                        })
                      }
                    >
                      {Array.from(
                        {
                          length:
                            new Date().getFullYear() - KADOQU_START_YEAR + 1
                        },
                        (e, index) => KADOQU_START_YEAR + index
                      ).map(year => (
                        <option
                          key={year}
                          value={year}
                          disabled={year > end.year}
                        >
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                    to
                    <Form.Control
                      as="select"
                      value={end.month}
                      onChange={e => {
                        if (
                          start.year === end.year &&
                          e.target.value < start.month
                        )
                          return;
                        this.setState({
                          end: { ...end, month: parseInt(e.target.value) }
                        });
                      }}
                    >
                      {MONTHS.map((month, index) => (
                        <option
                          key={month}
                          value={index + 1}
                          disabled={
                            start.year === end.year && index + 1 < start.month
                          }
                        >
                          {month}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control
                      as="select"
                      value={end.year}
                      onChange={e =>
                        this.setState({
                          end: { ...end, year: parseInt(e.target.value) }
                        })
                      }
                    >
                      {Array.from(
                        {
                          length:
                            new Date().getFullYear() - KADOQU_START_YEAR + 1
                        },
                        (e, index) => KADOQU_START_YEAR + index
                      ).map(year => (
                        <option
                          key={year}
                          value={year}
                          disabled={year < start.year}
                        >
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
                <div className="revenue-chart-wrapper">
                  <HorizontalBar
                    data={chartData}
                    plugins={plugins}
                    options={{
                      maintainAspectRatio: false,
                      plugins: { datalabels: { display: false } }
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default NumberOrderStatusChart;
