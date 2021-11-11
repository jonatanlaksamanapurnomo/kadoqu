import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { withApollo } from "react-apollo";
// import { Query } from "react-apollo";
// `import gql from "graphql-tag";

const dataRating = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember"
  ],
  datasets: [
    {
      label: "CS Speed",
      backgroundColor: "#CFF0CC",
      borderColor: "#CFF0CC",
      borderWidth: 1,
      hoverBackgroundColor: "#CFF0CC",
      hoverBorderColor: "#CFF0CC",
      data: [4.6, 0, 0, 0, 0, 0, 0]
    },
    {
      label: "Service",
      backgroundColor: "#80CEE1",
      borderColor: "#80CEE1",
      borderWidth: 1,
      hoverBackgroundColor: "#80CEE1",
      hoverBorderColor: "#80CEE1",
      data: [4.3, 0, 0, 0, 0, 0, 0]
    },
    {
      label: "Product Quality",
      backgroundColor: "#FF6961",
      borderColor: "#FF6961",
      borderWidth: 1,
      hoverBackgroundColor: "#FF6961",
      hoverBorderColor: "#FF6961",
      data: [4.6, 0, 0, 0, 0, 0, 0]
    },
    {
      label: "Wrapping Quality",
      backgroundColor: "#FF6981",
      borderColor: "#FF6961",
      borderWidth: 1,
      hoverBackgroundColor: "#FF6961",
      hoverBorderColor: "#FF6961",
      data: [5, 0, 0, 0, 0, 0, 0]
    },
    {
      label: "Product Safety",
      backgroundColor: "#FD6961",
      borderColor: "#FF6961",
      borderWidth: 1,
      hoverBackgroundColor: "#FF6961",
      hoverBorderColor: "#FF6961",
      data: [4.5, 0, 0, 0, 0, 0, 0]
    }
  ]
};
// const QUERY_GET_AVERAGE_RATINGS = gql`
//   query getAverageRatings($startDate: Date, $endDate: Date) {
//     getAverageRatings(startDate: $startDate, endDate: $endDate) {
//       ratingCount
//       speedCS
//       service
//       productQuality
//       wrappingQuality
//       productSafety
//     }
//   }
// `;
class ShoppingExperience extends Component {
  render() {
    return (
      <Line
        data={dataRating}
        options={{
          plugins: { datalabels: { display: false } }
        }}
      />
    );
  }
}
export default withApollo(ShoppingExperience);
