import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import gql from "graphql-tag";
import { Form } from "react-bootstrap";
import { Query } from "react-apollo";
import { monthNumToName, addMonths } from "../../utils/dateTimeFormatter";
import { MONTHS, KADOQU_START_YEAR } from "../../data/constants";

import "./Chart.css";

// const monthsInRange = (start, end) => {
//   let months;
//   months = (end.getFullYear() - start.getFullYear()) * 12;
//   months += end.getMonth() - start.getMonth() + 1;
//   return months <= 0 ? 0 : months;
// };

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

const QUERY_GET_TOTAL_PRODUCT_PER_MERCHANT = gql`
  query getTotalProductsPerMerchantCounts(
    $startDate: ParsedDateInput
    $endDate: ParsedDateInput
    $merchant: String
  ) {
    getTotalProductsPerMerchantCounts(
      startDate: $startDate
      endDate: $endDate
      merchant: $merchant
    ) {
      merchant
      quantity
    }
  }
`;

const QUERY_GET_MERCHANTS = gql`
  query getMerchants {
    getMerchants {
      name
      code
    }
  }
`;

class TotalProductMerchantsChart extends React.Component {
  state = {
    start: {
      month: addMonths(new Date(), -6).getMonth() + 1,
      year: addMonths(new Date(), -6).getFullYear()
    },
    end: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    },
    merchant: ""
  };
  render() {
    const { start, end, merchant } = this.state;
    return (
      <Query
        query={QUERY_GET_TOTAL_PRODUCT_PER_MERCHANT}
        variables={{
          startDate: start,
          endDate: end,
          merchant: merchant
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const products = data.getTotalProductsPerMerchantCounts;
          let datasets = [];
          let barData = new Array(products.length).fill(0);
          let total = 0;
          products.forEach(element => {
            element.quantity.forEach((quantity, index) => {
              total += parseInt(quantity);
              barData[index] = total;
            });
          });
          products.forEach(product => {
            datasets.push({
              type: "line",
              label: `Total Product(s) By ${product.merchant} Per Month`,
              lineTension: 0.1,
              fill: false,
              borderColor: brandWarning,
              pointHoverBackgroundColor: "#fff",
              borderWidth: 2,
              data: product.quantity
            });
            datasets.push({
              type: "bar",
              label: `Total Products By ${product.merchant} All Time`,
              backgroundColor: hexToRgba(brandSuccess, 10),
              borderColor: brandSuccess,
              borderWidth: 2,
              data: barData
            });
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
            datasets: datasets
          };
          return (
            <Card className="chart-container">
              <Card.Body>
                <Row className="chart-title-section">
                  <Col xs={6}>
                    <h4 className="font-weight-bold mb-0">
                      Total Products/Merchant
                    </h4>
                  </Col>
                  <Col xs={6} className="text-right">
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
                  <Col className="text-right mt-2 justify-align-items">
                    Merchant:{" "}
                    <Query query={QUERY_GET_MERCHANTS}>
                      {({ loading, error, data }) => {
                        if (loading || error) {
                          return <p>Loading</p>;
                        }
                        return (
                          <Form.Control
                            required
                            as="select"
                            name="province"
                            defaultValue={this.state.merchant}
                            onChange={e => {
                              this.setState({
                                merchant: e.target.value
                              });
                            }}
                            className="float-right"
                          >
                            <React.Fragment>
                              <option value="" data-id="">
                                Pilih Merchant
                              </option>
                              {data.getMerchants.map((merchant, index) => (
                                <option key={index} value={merchant.name}>
                                  {merchant.name}
                                </option>
                              ))}
                            </React.Fragment>
                          </Form.Control>
                        );
                      }}
                    </Query>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}>
                    {products.length > 0 ? (
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
                              {products.map(product => {
                                return product.quantity.reduce(
                                  (sum, currentCount) => {
                                    return sum + currentCount;
                                  },
                                  0
                                );
                              })}
                            </span>
                            <div className="small">
                              new products from {this.state.merchant}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
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

export default TotalProductMerchantsChart;
