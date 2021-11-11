import React from "react";
// import { Card, Col, Form, Row } from "react-bootstrap";
// import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
// import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
// import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import "./Chart.css";

const QUERY_GET_GENDER_COUNT = gql`
  query getGenderCount {
    getWomenCount
    getManCount
    getUnsetGenderCount
  }
`;

class GenderCustomerChart extends React.Component {
  render() {
    return (
      <Query query={QUERY_GET_GENDER_COUNT}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const dataPie = {
            labels: ["Wanita", "Pria", "Gender Belum Dipilih"],
            datasets: [
              {
                data: [
                  data.getWomenCount,
                  data.getManCount,
                  data.getUnsetGenderCount
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#A6CE38"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#A6CE38"]
              }
            ]
          };
          return (
            <Pie
              data={dataPie}
              options={{
                plugins: {
                  datalabels: {
                    formatter: (value, ctx) => {
                      let sum = 0;
                      let dataArr = ctx.chart.data.datasets[0].data;
                      dataArr.forEach(data => {
                        sum += data;
                      });
                      let percentage = ((value * 100) / sum).toFixed(2) + "%";
                      return percentage;
                    },
                    color: "#fff"
                  }
                }
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default GenderCustomerChart;
