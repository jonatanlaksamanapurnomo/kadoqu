import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { withApollo, Query } from "react-apollo";
import { QUERY_GET_NCAMPAIGN_PER_MONTH } from "../../gql/Marketing";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "../../utils/dateTimeFormatter";

class NCampaignPerMonthChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: [],
      count: [],
      startDate: addMonths(new Date(new Date().getFullYear(), 0, 1), 0),
      endDate: addMonths(new Date(), 0)
    };
  }

  render() {
    return (
      <Query
        query={QUERY_GET_NCAMPAIGN_PER_MONTH}
        variables={{
          startDate: this.state.startDate,
          endDate: this.state.endDate
        }}
      >
        {({ loading, error, data }) => {
          if (!loading && !error) {
            let arrObj = data.getnCampaignPerMonth;
            let month = [];
            let count = [];
            arrObj.forEach(item => {
              let arrValues = Object.values(item);
              month.push(arrValues[0]);
              count.push(arrValues[1]);
            });

            let nCampaignPerMonthChart = {
              labels: month,
              datasets: [
                {
                  label: "Jumlah Campaign Per Bulan",
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  data: count
                }
              ]
            };
            return (
              <div>
                <div className="row">
                  <div className="col-6">
                    <p>Start</p>
                    <DatePicker
                      onChange={e => {
                        this.setState({
                          startDate: e
                        });
                      }}
                      selected={this.state.startDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="col-6">
                    <p>end</p>
                    <DatePicker
                      onChange={e => {
                        this.setState({
                          endDate: e
                        });
                      }}
                      selected={this.state.endDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>

                <Bar
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            max: 20,
                            min: 0,
                            stepSize: 5
                          }
                        }
                      ]
                    }
                  }}
                  data={nCampaignPerMonthChart}
                />
              </div>
            );
          } else {
            return "error";
          }
        }}
      </Query>
    );
  }
}

export default withApollo(NCampaignPerMonthChart);
