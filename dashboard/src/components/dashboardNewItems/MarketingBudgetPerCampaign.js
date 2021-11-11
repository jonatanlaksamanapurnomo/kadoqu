import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { withApollo, Query } from "react-apollo";
import { QUERY_GET_BUDGET_PER_CAMPAIGN } from "../../gql/Marketing";
import { addMonths } from "../../utils/dateTimeFormatter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class MarketingBudgetPerCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: [],
      budget: [],
      startDate: addMonths(new Date(new Date().getFullYear(), 0, 1), 0),
      endDate: addMonths(new Date(), 0)
    };
  }

  render() {
    return (
      <Query
        query={QUERY_GET_BUDGET_PER_CAMPAIGN}
        variables={{
          startDate: this.state.startDate,
          endDate: this.state.endDate
        }}
      >
        {({ loading, error, data }) => {
          if (!loading && !error) {
            let arrObj = data.getBudgetPerCampaign;
            let campaign = [];
            let budget = [];
            arrObj.forEach(item => {
              let arrValues = Object.values(item);
              campaign.push(arrValues[0]);
              budget.push(arrValues[1]);
            });

            let nCampaignPerMonthChart = {
              labels: campaign,
              datasets: [
                {
                  label: "Monthly Sales Rp",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: budget
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
                <Line
                  options={{
                    plugins: { datalabels: { display: false } },
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            min: 0
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

export default withApollo(MarketingBudgetPerCampaign);
