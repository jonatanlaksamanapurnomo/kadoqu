import React from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { MONTHS, KADOQU_START_YEAR } from "../../data/constants";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { addMonths, monthNumToName } from "../../utils/dateTimeFormatter";

import "./Chart.css";

//const brandPrimary = getStyle("--primary");
const brandWarning = getStyle("--warning");
const brandSuccess = getStyle("--success");

const options = {
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
  plugins: { datalabels: { display: false } },
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
          beginAtZero: true
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

const QUERY_GET_TOTAL_MERCHANT = gql`
  query getTotalMerchantCounts(
    $startDate: ParsedDateInput
    $endDate: ParsedDateInput
  ) {
    getTotalMerchantCounts(startDate: $startDate, endDate: $endDate)
  }
`;

class TotalMerchantsChart extends React.Component {
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
        query={QUERY_GET_TOTAL_MERCHANT}
        variables={{
          startDate: start,
          endDate: end
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const merchants = data.getTotalMerchantCounts;
          let total = 0;
          let barData = new Array(merchants.length).fill(0);
          merchants.forEach((element, index) => {
            total += element;
            barData[index] = total;
          });
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
                type: "line",
                label: "Merchants Count",
                lineTension: 0.1,
                fill: false,
                borderColor: brandWarning,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 2,
                data: merchants
              },
              {
                type: "bar",
                label: "Total Merchants All Time",
                backgroundColor: hexToRgba(brandSuccess, 10),
                borderColor: brandSuccess,
                borderWidth: 2,
                data: barData
              }
            ]
          };
          return (
            <Card className="chart-container">
              <Card.Body>
                <Row className="chart-title-section">
                  <Col>
                    <h4 className="font-weight-bold mb-0">Total Merchant</h4>
                  </Col>
                  <Col className="text-right">
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
                <Row>
                  <Col xs={8}>
                    <div className="text-center mb-5">
                      Between{" "}
                      <span className="text-warning">{`${monthNumToName(
                        start.month
                      )}, ${start.year}`}</span>{" "}
                      and{" "}
                      <span className="text-warning">{`${monthNumToName(
                        end.month
                      )}, ${end.year}`}</span>{" "}
                      there are
                      <div className="d-flex justify-content-even align-items-center">
                        <div xs={6} className="text-warning">
                          <span className="sales-chart-growth">
                            {merchants.reduce(
                              (sum, currentCount) => sum + currentCount,
                              0
                            )}
                          </span>
                          <div className="small">new merchants</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={10} className="sales-chart-wrapper">
                    <Bar data={chartData} options={options} height={400} />
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

export default TotalMerchantsChart;
