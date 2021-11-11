import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import gql from "graphql-tag";
import { Form } from "react-bootstrap";
import { Query } from "react-apollo";
import { addMonths } from "../../utils/dateTimeFormatter";
import { MONTHS, KADOQU_START_YEAR } from "../../data/constants";

import "./Chart.css";

const colors = [
  getStyle("--red"),
  getStyle("--orange"),
  getStyle("--green"),
  getStyle("--cyan"),
  getStyle("--purple")
];

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
  plugins: { datalabels: { display: false } },
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

const QUERY_GET_TOTAL_PRODUCT_PER_CATEGORIES = gql`
  query getTotalProductsPerCategoryCounts(
    $startDate: ParsedDateInput
    $endDate: ParsedDateInput
  ) {
    getTotalProductsPerCategoryCounts(
      startDate: $startDate
      endDate: $endDate
    ) {
      category
      quantity
    }
  }
`;

class TotalProductsCategoriesChart extends React.Component {
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
        query={QUERY_GET_TOTAL_PRODUCT_PER_CATEGORIES}
        variables={{
          startDate: start,
          endDate: end
        }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const products = data.getTotalProductsPerCategoryCounts;
          let datasets = [];

          products.forEach((product, index) => {
            const color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
            datasets.push({
              type: "line",
              label: product.category,
              lineTension: 0.1,
              fill: false,
              borderColor: colors[index % colors.length],
              pointHoverBackgroundColor: "#fff",
              borderWidth: 2,
              data: product.quantity
            });
            let total = 0;
            let barData = new Array(products.length).fill(0);
            product.quantity.forEach((quantity, index) => {
              total += parseInt(quantity);
              barData[index] = total;
            });
            datasets.push({
              type: "bar",
              label: `Total Products In ${product.category} Category All Time`,
              backgroundColor: color,
              borderColor: color,
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
                      Total Product/Category
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
                </Row>
                <Row>
                  <Col xs={12} className="sales-chart-wrapper">
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

export default TotalProductsCategoriesChart;
