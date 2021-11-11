import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { addDays, addMonths, getFullDate } from "../../utils/dateTimeFormatter";

import "./Chart.css";

const brandPrimary = getStyle("--primary");
const brandWarning = getStyle("--warning");

const options = {
  plugins: { datalabels: { display: false } },
  legend: {
    display: true,
    position: "bottom"
  },
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor
        };
      }
    }
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1
          //   maxTicksLimit: 5,
          //   max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 1,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

const QUERY_GET_SALES = gql`
  query getSales($startDate: Date, $endDate: Date) {
    getUserCheckoutCounts(startDate: $startDate, endDate: $endDate)
    getPaidOrderCounts(startDate: $startDate, endDate: $endDate)
  }
`;

class SalesChart extends React.Component {
  state = {
    start: addDays(new Date(), -9),
    end: new Date(),
    growthStart: addMonths(new Date(), -1),
    growthEnd: new Date()
  };
  render() {
    const { start, end, growthStart, growthEnd } = this.state;
    const CheckoutGrowth = () => (
      <Query
        query={QUERY_GET_SALES}
        variables={{
          startDate: new Date(
            growthStart.getFullYear(),
            growthStart.getMonth(),
            1
          ),
          endDate: new Date(
            growthStart.getFullYear(),
            growthStart.getMonth() + 1,
            0
          )
        }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading || error) return "...";
          const comparisonCheckoutSum = data.getUserCheckoutCounts.reduce(
            (sum, currentCount) => sum + currentCount,
            0
          );
          return (
            <Query
              query={QUERY_GET_SALES}
              variables={{
                startDate: new Date(
                  growthEnd.getFullYear(),
                  growthEnd.getMonth(),
                  1
                ),
                endDate: new Date(
                  growthEnd.getFullYear(),
                  growthEnd.getMonth() + 1,
                  0
                )
              }}
              fetchPolicy="network-only"
            >
              {({ loading, error, data }) => {
                if (loading || error) return "...";
                const checkoutSum = data.getUserCheckoutCounts.reduce(
                  (sum, currentCount) => sum + currentCount,
                  0
                );
                const ratio =
                  (checkoutSum - comparisonCheckoutSum) / comparisonCheckoutSum;
                if (isFinite(ratio)) {
                  return (
                    <div
                      className={
                        "mt-1 sales-chart-growth text-" +
                        (ratio > 0
                          ? "success"
                          : ratio === 0
                          ? "info"
                          : "danger")
                      }
                    >
                      {(ratio * 100).toFixed(2) + "%"}
                    </div>
                  );
                }
                return <div className="text-muted">Unable to compare</div>;
              }}
            </Query>
          );
        }}
      </Query>
    );
    return (
      <Query
        query={QUERY_GET_SALES}
        variables={{
          startDate: start,
          endDate: end
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const checkouts = data.getUserCheckoutCounts;
          const paidOrders = data.getPaidOrderCounts;

          const chartData = {
            labels: checkouts.map((e, index) => {
              const currentDate = addDays(start, index);
              return getFullDate(currentDate);
            }),
            datasets: [
              {
                label: "Checkouts Count",
                lineTension: 0.1,
                fill: false,
                borderColor: brandWarning,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 2,
                data: checkouts
              },
              {
                label: "Paid Orders Count",
                lineTension: 0.1,
                fill: false,
                borderColor: brandPrimary,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 2,
                data: paidOrders
              }
            ]
          };
          return (
            <Card className="chart-container">
              <Card.Body>
                <Row className="chart-title-section">
                  <Col>
                    <h4 className="font-weight-bold mb-0">Sales</h4>
                  </Col>
                  <Col className="text-right">
                    Period:
                    <DatePicker
                      selected={start}
                      maxDate={end}
                      onChange={e => {
                        const newDate = new Date(e);
                        this.setState({ start: newDate });
                      }}
                      dateFormat="dd MMM yyyy"
                    />
                    to
                    <DatePicker
                      selected={end}
                      minDate={start}
                      maxDate={new Date()}
                      onChange={e => {
                        const newDate = new Date(e);
                        this.setState({ end: newDate });
                      }}
                      dateFormat="dd MMM yyyy"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={8}>
                    <div className="text-center mb-5">
                      Between {getFullDate(start)} and {getFullDate(end)} there
                      are
                      <div className="d-flex justify-content-even align-items-center">
                        <div xs={6} className="text-warning">
                          <span className="sales-chart-growth">
                            {checkouts.reduce(
                              (sum, currentCount) => sum + currentCount,
                              0
                            )}
                          </span>
                          <div className="small">checkouts</div>
                        </div>
                        &
                        <div xs={6} className="text-primary">
                          <span className="sales-chart-growth">
                            {paidOrders.reduce(
                              (sum, currentCount) => sum + currentCount,
                              0
                            )}
                          </span>
                          <div className="small">paid orders</div>
                        </div>
                      </div>
                    </div>
                    <div xs={12} className="text-center">
                      Customer checkout growth:
                      <CheckoutGrowth />
                      <small className="sales-chart-growth-range">
                        <DatePicker
                          selected={growthStart}
                          showMonthYearPicker
                          onChange={e => {
                            const newDate = new Date(e);
                            this.setState({ growthStart: newDate });
                          }}
                          dateFormat="MMM yy"
                        />{" "}
                        compared to{" "}
                        <DatePicker
                          selected={growthEnd}
                          showMonthYearPicker
                          onChange={e => {
                            const newDate = new Date(e);
                            this.setState({ growthEnd: newDate });
                          }}
                          dateFormat="MMM yy"
                        />
                      </small>
                    </div>
                  </Col>
                  <Col xs={9} className="sales-chart-wrapper">
                    <Line data={chartData} options={options} height={300} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default SalesChart;
