import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { MONTHS, KADOQU_START_YEAR } from "../../data/constants";
import { addMonths } from "../../utils/dateTimeFormatter";
import { rpFormat } from "../../utils/currencyFormatter";
import { getUserName } from "../../utils/userChecker";

import "./Chart.css";

// const brandPrimary = getStyle("--primary");
// const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
// const brandWarning = getStyle("--warning");
// const brandDanger = getStyle("--danger");

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
      },
      label: function(tooltipItem, data) {
        let label = data.datasets[tooltipItem.datasetIndex].label;
        let datasetLabel =
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return label + ": " + rpFormat(datasetLabel);
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
          //   maxTicksLimit: 5,
          //   stepSize: Math.ceil(250 / 5),
          //   max: 250
          callback: function(value, index, values) {
            return rpFormat(value);
          }
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

const plugins = [
  {
    afterDraw: (chartInstance, easing) => {
      //   const ctx = chartInstance.chart.ctx;
      //   ctx.fillText("This text drawn by a plugin", 100, 100);
    }
  }
];

const QUERY_GET_MONTHLY_SALES = gql`
  query getMonthlySales(
    $startDate: ParsedDateInput
    $endDate: ParsedDateInput
    $merchant: String
  ) {
    getMonthlySalesMerchant(
      startDate: $startDate
      endDate: $endDate
      merchant: $merchant
    )
  }
`;

class SalesChart extends React.Component {
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
        query={QUERY_GET_MONTHLY_SALES}
        variables={{
          startDate: { month: start.month, year: start.year },
          endDate: { month: end.month, year: end.year },
          merchant: getUserName()
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const monthlySales = data.getMonthlySalesMerchant;
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
                label: "Sales",
                type: "line",
                lineTension: 0.1,
                fill: false,
                borderColor: brandInfo,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 2,
                data: monthlySales
              }
            ]
          };
          return (
            <Card className="chart-container">
              <Card.Body>
                <Row className="chart-title-section">
                  <Col xs={3}>
                    <h4 className="font-weight-bold mb-0">Period</h4>
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
                <div className="revenue-chart-wrapper">
                  <Bar
                    data={chartData}
                    options={options}
                    plugins={plugins}
                    height={300}
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

export default SalesChart;
