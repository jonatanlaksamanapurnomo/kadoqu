import React from "react";
// import { Card, Col, Form, Row } from "react-bootstrap";
// import { Bar } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import "./Chart.css";

const QUERY_GET_USERS_AGE_COUNT = gql`
  query getUsersAgeCount {
    getUsersAgeCount {
      age
      count
    }
  }
`;
const brandWarning = getStyle("--warning");

class AgeCustomerChart extends React.Component {
  render() {
    return (
      <Query query={QUERY_GET_USERS_AGE_COUNT}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          let ages = [0, 0, 0, 0, 0, 0, 0];
          let agesLabel = [
            "<15",
            "15-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65+"
          ];
          data.getUsersAgeCount.forEach(item => {
            if (item.age < 15) {
              ages[0] += item.count;
            } else if (item.age >= 15 && item.age <= 24) {
              ages[1] += item.count;
            } else if (item.age >= 25 && item.age <= 34) {
              ages[2] += item.count;
            } else if (item.age >= 35 && item.age <= 44) {
              ages[3] += item.count;
            } else if (item.age >= 45 && item.age <= 54) {
              ages[4] += item.count;
            } else if (item.age >= 55 && item.age <= 64) {
              ages[5] += item.count;
            } else {
              ages[6] += item.count;
            }
          });

          ages.push();
          const dataProvince = {
            labels: agesLabel,
            datasets: [
              {
                label: "Banyak",
                backgroundColor: brandWarning,
                borderColor: brandWarning,
                borderWidth: 1,
                hoverBackgroundColor: brandWarning,
                hoverBorderColor: brandWarning,
                data: ages
              }
            ]
          };
          return (
            <>
              {ages.length > 0 ? (
                <Bar
                  data={dataProvince}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    },
                    plugins: {
                      datalabels: {
                        formatter: (value, ctx) => {
                          let sum = 0;
                          let dataArr = ctx.chart.data.datasets[0].data;
                          dataArr.forEach(data => {
                            sum += data;
                          });
                          let percentage =
                            ((value * 100) / sum).toFixed(2) + "%";
                          return percentage;
                        },
                        color: "#000000"
                      }
                    },
                    
                  }}
                />
              ) : (
                <h1>Belum memiliki data!</h1>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default AgeCustomerChart;
