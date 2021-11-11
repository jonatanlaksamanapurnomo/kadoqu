import React from "react";
// import { Card, Col, Form, Row } from "react-bootstrap";
// import { HorizontalBar } from "react-chartjs-2";
import { HorizontalBar } from "react-chartjs-2";
import { Button, Form, Col } from "react-bootstrap";
// import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
// import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import "./Chart.css";

const QUERY_GET_PROVINCE_CUSTOMERS = gql`
  query queryGetProvinceCustomers {
    getUsersProvince {
      province
      count
    }
  }
`;

const QUERY_GET_CITY_CUSTOMERS = gql`
  query queryGetCityCustomers($province: String) {
    getUsersCity(province: $province) {
      city
      count
    }
  }
`;

class RegionCustomerChart extends React.Component {
  state = {
    province: "",
    show: false,
    maxProvince: 0,
    maxCity: 0
  };
  render() {
    return (
      <Query query={QUERY_GET_PROVINCE_CUSTOMERS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          let provinces = [];
          let i = 0;
          let provincesChoice = [];
          //   let cities = [];
          data.getUsersProvince.forEach(item => {
            const color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
            provinces.push({
              label: item.province,
              backgroundColor: color,
              borderColor: color,
              borderWidth: 1,
              hoverBackgroundColor: color,
              hoverBorderColor: color,
              data: [item.count]
            });
            if (this.state.maxProvince < item.count) {
              this.setState({
                maxProvince: item.count
              });
            }
            provincesChoice.push(item.province);
          });
          const dataProvince = {
            labels: ["Provinsi"],
            datasets: provinces
          };
          return (
            <>
              <Button
                onClick={() => {
                  this.setState({
                    show: !this.state.show
                  });
                }}
              >
                {this.state.show ? "Lihat Provinsi" : "Lihat Kota / Provinsi"}
              </Button>
              {!this.state.show ? (
                <>
                  {provinces.length > 0 ? (
                    <HorizontalBar
                      height={100}
                      data={dataProvince}
                      options={{
                        scales: {
                          xAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                                max: this.state.maxProvince,
                                min: 0,
                                stepSize: parseInt(this.state.maxProvince / 10)
                              }
                            }
                          ]
                        },
                        responsive: true,
                        plugins: { datalabels: { display: false } }
                      }}
                    />
                  ) : (
                    <h1>Belum memiliki data!</h1>
                  )}
                </>
              ) : (
                <>
                  <Form.Control
                    required
                    as="select"
                    name="province"
                    defaultValue={this.state.province}
                    onChange={e => {
                      this.setState({
                        province: e.target.value
                      });
                    }}
                    className="float-right"
                  >
                    <React.Fragment>
                      <option value="" data-id="">
                        Pilih provinsi
                      </option>
                      {provincesChoice.map(p => {
                        i++;
                        return (
                          <option key={i} value={p}>
                            {p}
                          </option>
                        );
                      })}
                    </React.Fragment>
                  </Form.Control>
                  {this.state.province !== "" ? (
                    <Query
                      query={QUERY_GET_CITY_CUSTOMERS}
                      variables={{ province: this.state.province }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return error.message;
                        let cities = [];
                        data.getUsersCity.forEach(item => {
                          const color =
                            "#" +
                            ((Math.random() * 0xffffff) << 0).toString(16);
                          cities.push({
                            label: item.city,
                            backgroundColor: color,
                            borderColor: color,
                            borderWidth: 1,
                            hoverBackgroundColor: color,
                            hoverBorderColor: color,
                            data: [item.count]
                          });
                          if (this.state.maxCity < item.count) {
                            this.setState({ maxCity: item.count });
                          }
                        });
                        const dataCities = {
                          labels: [this.state.province],
                          datasets: cities
                        };
                        return (
                          <HorizontalBar
                            height={100}
                            data={dataCities}
                            options={{
                              scales: {
                                xAxes: [
                                  {
                                    ticks: {
                                      beginAtZero: true,
                                      max: this.state.maxCity,
                                      min: 0,
                                      stepSize: parseInt(
                                        this.state.maxCity / 10
                                      )
                                    }
                                  }
                                ]
                              },
                              responsive: true,

                              plugins: { datalabels: { display: false } }
                            }}
                          />
                        );
                      }}
                    </Query>
                  ) : (
                    <Col xs={12} className="d-flex justify-content-center my-5">
                      <h1>Pilih Provinsi Terlebih Dahulu!!</h1>
                    </Col>
                  )}
                </>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default RegionCustomerChart;
