import React, { Component } from "react";
import { withApollo, Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, Col, Row, ProgressBar, Table, Image } from "react-bootstrap";
import { getUserId, isAdmin, isLoggedIn } from "../utils/userChecker";
import { QUERY_GET_MERCHANT_QUERY_POINT } from "../gql/merchantLeague";
import MerchantTournamentStandings from "../components/dashboardNewItems/MerchantTournament/MerchantTournamentStandings";
import MediaQuery from "react-responsive";

import "./MerchantTournament.css";

const LIGA_LOGO = {
  logo: {
    1: "https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga1.png",
    2: "https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga2.png",
    3: "https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga3.png",
    4: "https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga4.png",
    5: "https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga5.png"
  }
};
const LEAGUE_INFORMATION = [
  {
    id:0,
    name:"Belum Terdaftars",
    pointStep: [
      {
        step: 1,
        point:-1,
        reward: "Not Register"
      },
      {
        step: 2,
        point:-1,
        reward: "Not Register"
      },
      {
        step: 3,
        point:-1,
        reward: "Not Register"
      },
      {
        step: 4,
        point:-1,
        reward: "Not Register"
      },
      {
        step: 5,
        point:-1,
        reward: "Not Register"
      },
      {
        step: 6,
        point:-1,
        reward: "Not Register"
      }
    ]
  },
  {
    id: 1,
    name: "Liga 1",
    pointStep: [
      {
        step: 1,
        point: 75,
        reward: "Voucher Yogya 50K"
      },
      {
        step: 2,
        point: 250,
        reward: "Voucher MAP 200K"
      },
      {
        step: 3,
        point: 625,
        reward: "JBL Go"
      },
      {
        step: 4,
        point: 1125,
        reward: "Gopay 500k"
      },
      {
        step: 5,
        point: 1875,
        reward: "Hard disk Ext 1 TB Seagate"
      },
      {
        step: 6,
        point: 2875,
        reward: "Emas Antam 5gr"
      }
    ]
  },
  {
    id: 2,
    name: "Liga 2",
    pointStep: [
      {
        step: 1,
        point: 350,
        reward: "Voucher MAP 150K"
      },
      {
        step: 2,
        point: 875,
        reward: "Voucher Yogya 250K"
      },
      {
        step: 3,
        point: 1750,
        reward: "Gopay 500k"
      },
      {
        step: 4,
        point: 3500,
        reward: "Google Home"
      },
      {
        step: 5,
        point: 5950,
        reward: "Microwave"
      },
      {
        step: 6,
        point: 9450,
        reward: "IPhone X"
      }
    ]
  },
  {
    id: 3,
    name: "Liga 3",
    pointStep: [
      {
        step: 1,
        point: 2250,
        reward: "Gopay 500k"
      },
      {
        step: 2,
        point: 5250,
        reward: "Hard disk Ext 1 TB Seagate"
      },
      {
        step: 3,
        point: 9000,
        reward: "Microwave Sharp"
      },
      {
        step: 4,
        point: 13500,
        reward: "Airpods Gen 2"
      },
      {
        step: 5,
        point: 18750,
        reward: "SAMSUNG Smart LED TV 43 Inch FHD Digital - UA43N5500AKPXD"
      },
      {
        step: 6,
        point: 24750,
        reward: "Motor Honda Vario 125 CBS"
      }
    ]
  },
  {
    id: 4,
    name: "Liga 4",
    pointStep: [
      {
        step: 1,
        point: 7500,
        reward: "Gopay 500k"
      },
      {
        step: 2,
        point: 19500,
        reward: "Smart Watch Amazfit Xiaomi"
      },
      {
        step: 3,
        point: 34500,
        reward: "SAMSUNG LED TV 40 Inch FHD Digital - 40N5000"
      },
      {
        step: 4,
        point: 54500,
        reward: "FUJIFILM X-A5 Kit XC15-45mm f/3.5-5.6 OIS PZ - Brown"
      },
      {
        step: 5,
        point: 79500,
        reward: "Iphone XR 256"
      },
      {
        step: 6,
        point: 109500,
        reward: "Honda PCX 150 ABS"
      }
    ]
  },
  {
    id: 5,
    name: "Liga 5",
    pointStep: [
      {
        step: 1,
        point: 10000,
        reward: "Voucher MAP 1 jt"
      },
      {
        step: 2,
        point: 25000,
        reward: "Xiaomi Note 8 4/64Gb"
      },
      {
        step: 3,
        point: 50000,
        reward: "Samsung Galaxy Watch"
      },
      {
        step: 4,
        point: 80000,
        reward: "Iphone XR 256"
      },
      {
        step: 5,
        point: 120000,
        reward: "Honda Vario 150cc"
      },
      {
        step: 6,
        point: 170000,
        reward: "Emas Antam 100gr"
      }
    ]
  }
];
const Logo = LIGA_LOGO["logo"];

class MerchantTournament extends Component {
  state = {
    ProgressBar: "875/1250",
    liga: 1,
    merchantName: "",
    leagueNow: {}
  };

  componentDidMount() {
    if (isLoggedIn()) {
      this.props.client
        .query({
          query: QUERY_GET_MERCHANT_QUERY_POINT,
          variables: {
            merchant: this.state.merchantName,
            id: getUserId()
          }
        })
        .then(({ data: { getAdmin } }) => {
            let leagueNow = LEAGUE_INFORMATION.filter(
              item => item.id === getAdmin.leagueId
            )[0];
            this.setState({
              liga: getAdmin.leagueId,
              merchantName: getAdmin.name,
              leagueNow: leagueNow
            });
        });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <MediaQuery minWidth={992}>
      {isDesktop => {
 return (
      <React.Fragment>
        <Helmet>
          <title>Merchant Tournament</title>
        </Helmet>
        {isAdmin() ? (
          <MerchantTournamentStandings />
        ) : (
          <Query
            query={QUERY_GET_MERCHANT_QUERY_POINT}
            pollInterval={1000}
            variables={{
              merchant: this.state.merchantName,
              id: getUserId()
            }}
          >
            {({
              error,
              loading,
              data: {
                getMerchantTournamentPoints,
                getAdmin,
                getMerchantTournamentMonthlySales
              }
            }) => {
              if (!loading) {
                let leagueNow = LEAGUE_INFORMATION.filter(
                  item => item.id === getAdmin.leagueId
                )[0];
                let rewardNow =
                  leagueNow.pointStep.filter(
                    item => getMerchantTournamentPoints <= item.point
                  )[0] || leagueNow.pointStep[leagueNow.pointStep.length - 1];
                return (
                  <Card className="chart-container">
                    <Card.Body>
                      <Row
                        className={
                          this.state.liga === 2
                            ? "progess-section liga2"
                            : this.state.liga === 3
                            ? "progess-section liga3"
                            : this.state.liga === 4
                            ? "progess-section liga4"
                            : this.state.liga === 5
                            ? "progess-section liga5"
                            : "progess-section"
                        }
                      >
                        <Col xl={2} md={2} xs={2}>
                          <Image
                            align="center"
                            className={!isDesktop ?"liga-logo-mob": "liga-logo"}
                            src={Logo[this.state.liga]}
                          ></Image>
                        </Col>
                        <Col
                          xl={6}
                          md={6}
                          xs={4}
                          className={!isDesktop ?"progess-bar-section-mob": "progess-bar-section"}
                        >
                          <p className={!isDesktop ?"progress-info-mob": "progress-info"} align="center">
                            {" "}
                            {rewardNow.point - getMerchantTournamentPoints} to
                            Unlock the next prize{" "}
                          </p>

                          <ProgressBar
                            className={!isDesktop ?"progress-bar-mob": "progress-bar"}
                            variant="info"
                            min={0}
                            max={rewardNow.point}
                            now={getMerchantTournamentPoints}
                            label={`${getMerchantTournamentPoints}/${rewardNow.point}`}
                          />
                        </Col>
                        <Col className={!isDesktop ?"col-mob": ""} ></Col>
                        <Col
                          xs={4}
                          md={2}
                          xl={2}
                          className={
                            this.state.liga === 2
                              ? "liga2-bar"
                              : this.state.liga === 3
                              ? "liga3-bar"
                              : this.state.liga === 4
                              ? "liga4-bar"
                              : this.state.liga === 5
                              ? "liga5-bar"
                              : "progess-prize-section"
                          }
                        >
                          <div className={!isDesktop ?"prize-section-mob": "prize-section"}>
                            <p className={!isDesktop ?"prize-name-next-mob": "prize-name-next"} align="center">
                              Next Prize :
                            </p>
                            <p className={!isDesktop ?"prize-name-mob": "prize-name"} align="center">
                              <b>{rewardNow.reward}  </b>
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <Row className={!isDesktop ? "tabel-section-mob":"table-section"}>
                        <Col>
                          <Table bordered hover>
                            <thead>
                              <tr>
                                <th colspan="4">
                                  <h3  className={!isDesktop ?"tabel-tournament-mob" :""} align="center">Sales total</h3>
                                  <br />
                                  <h1
                                    align="center"
                                    className={!isDesktop ? "sales-total-section-mob" :"sales-total-section"}
                                  >
                                    {" "}
                                    Rp{" "}
                                    {getMerchantTournamentMonthlySales.reduce(
                                      (acc, curr) => acc + curr,
                                      0
                                    )}
                                  </h1>
                                </th>
                                <th colspan="2">
                                  <h3  className={!isDesktop ?"tabel-tournament-mob" :""} align="center">Point total</h3>
                                  <br />
                                  <h1
                                    align="center"
                                    className={!isDesktop ? "sales-total-section-mob" :"sales-total-section"}
                                  >
                                    {" "}
                                    {getMerchantTournamentPoints}{" "}
                                  </h1>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">April</h5> <br />{" "}
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">
                                    {" "}
                                    Rp {
                                      getMerchantTournamentMonthlySales[0]
                                    }{" "}
                                  </h5>
                                </td>
                                <td>
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">Mei</h5> <br />{" "}
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">
                                    {" "}
                                    Rp {
                                      getMerchantTournamentMonthlySales[1]
                                    }{" "}
                                  </h5>
                                </td>
                                <td>
                                  <h5  className={!isDesktop ?"tabel-tournament-mob" :""} align="center">Juni</h5> <br />{" "}
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">
                                    {" "}
                                    Rp {
                                      getMerchantTournamentMonthlySales[2]
                                    }{" "}
                                  </h5>
                                </td>
                                <td>
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">Juli</h5> <br />{" "}
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">
                                    {" "}
                                    Rp {
                                      getMerchantTournamentMonthlySales[3]
                                    }{" "}
                                  </h5>
                                </td>
                                <td>
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">Agustus</h5> <br />{" "}
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :""} align="center">
                                    {" "}
                                    Rp {
                                      getMerchantTournamentMonthlySales[4]
                                    }{" "}
                                  </h5>
                                </td>
                                <td>
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :" "} align="center">September</h5> <br />{" "}
                                  <h5 className={!isDesktop ?"tabel-tournament-mob" :" "} align="center">
                                    Rp {getMerchantTournamentMonthlySales[5]}{" "}
                                  </h5>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                        <Col xl="auto" md="auto">
                          <Table bordered hover>
                            <thead>
                              <tr>
                                <th colspan="2">
                                  <h3 align="center">
                                    <b>Prize</b>
                                  </h3>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <b></b>
                                  <h6 align="center">
                                    {leagueNow.pointStep[0].point}
                                  </h6>
                                  <h6 align="center">
                                    {" "}
                                    {leagueNow.pointStep[0].reward}{" "}
                                  </h6>
                                </td>
                                <td>
                                  <h6 align="center">
                                    {leagueNow.pointStep[1].point}
                                  </h6>
                                  <h6 align="center">
                                    {leagueNow.pointStep[1].reward}
                                  </h6>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 align="center">
                                    {leagueNow.pointStep[2].point}
                                  </h6>
                                  <h6 align="center">
                                    {" "}
                                    {leagueNow.pointStep[2].reward}{" "}
                                  </h6>
                                </td>
                                <td>
                                  <h6 align="center">
                                    {leagueNow.pointStep[3].point}
                                  </h6>
                                  <h6 align="center">
                                    {" "}
                                    {leagueNow.pointStep[3].reward}{" "}
                                  </h6>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 align="center">
                                    {leagueNow.pointStep[4].point}
                                  </h6>
                                  <h6 align="center">
                                    {" "}
                                    {leagueNow.pointStep[4].reward}{" "}
                                  </h6>
                                </td>
                                <td>
                                  <h6 align="center">
                                    {leagueNow.pointStep[5].point}
                                  </h6>
                                  <h6 align="center">
                                    {" "}
                                    {leagueNow.pointStep[5].reward}{" "}
                                  </h6>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row className="table-section">
                        <ul>
                          <h3>
                            <b>Syarat & Ketentuan </b>
                          </h3>

                          <li>
                            {" "}
                            Officially join kadoqu.com dengan level tertentu
                            (basic/premium/advance).
                          </li>
                          <li>
                            Sales yang terhitung dari transaksi di platform
                            kadoqu.com sesuai periode tournament.
                          </li>
                          <li>
                            Periode Turnamen 20 Maret - 20 September 2020.
                          </li>
                          <li>
                            Penghitungan point yaitu setiap Rp 10.000 harga
                            produk sama dengan 1 point.
                          </li>
                          <li>
                            Order, sales, point adalah akumulasi selama 6 bulan.
                          </li>
                          <li>
                            Merchant dapat melihat point dan reward di merchant
                            dashboard secara real time.
                          </li>
                          <li>
                            Point hangus jika tidak diredeem di akhir periode
                            turnamen.
                          </li>
                          <li>
                            Point hanya dapat diredeem 1x di akhir periode
                            turnamen.
                          </li>
                          <li>
                            Redeem dilakukan di bulan ke 6 (September 2020).
                          </li>
                          <li>
                            Hadiah dibagikan saat merchant gathering 2020
                            (Oktober 2020).
                          </li>
                          <li>
                            Keikutsertaan liga ditentukan oleh kadoqu.com dengan
                            pertimbangan harga product.
                          </li>
                          <li>
                            Ketentuan Point dan Reward sesuai dengan
                            keikutsertaan dalam Liga tertentu.
                          </li>
                        </ul>
                      </Row>
                      <Row className="table-section">
                        <ul>
                          <h3>
                            <b>FAQ</b>
                          </h3>

                          <li>
                            <b> Apa itu Kadoqu Merchant Tournament ?</b> <br />
                            Setiap merchant akan berjuang untuk mencapai sales
                            terbaik dalam waktu 6 bulan.
                          </li>
                          <li>
                            <b>
                              {" "}
                              Apa benefit dari Kadoqu Merchant Tournament ?
                            </b>
                            <br />
                            Merchant dengan sales performance yang baik masing -
                            masing akan mendapatkan reward prizes !
                          </li>
                          <li>
                            <b>
                              {" "}
                              Apa saja hadiah yang bisa didapatkan oleh
                              Merchants ?
                            </b>{" "}
                            <br />
                            Setiap liga akan mendapatkan hadiah yang berbeda.
                            Merchant dapat melihat hadiah yang tersedia pada
                            Merchant Dashboard masing - masing.
                          </li>
                          <li>
                            <b> Kapan periode waktu Tournament ini ?</b> <br />
                            Sales yang dihitung hanya per tanggal 20 Maret
                            sampai 20 September 2020
                            <br />
                            <b>
                              {" "}
                              Pengumuman akan diumumkan bulan Oktober 2020 pada
                              saat Kadoqu Merchant Gathering 2020. Tanggal pasti
                              akan diumumkan kemudian.{" "}
                            </b>
                          </li>
                          <li>
                            <b> Bagaimana cara kerja Tournament ini ?</b> <br />
                            <ul>
                              <li>
                                Setiap merchant Kadoqu berhak untuk mengikuti
                                event ini, tetapi masuk dalam Liga Tournament
                                yang berbeda antara satu dan lainnya.
                              </li>
                              <li>
                                Liga Merchant ditentukan oleh pihak Kadoqu
                                berdasarkan harga produk yang tertera pada
                                website Kadoqu.
                              </li>
                              <li>
                                Setiap sales merchant kemudian akan diubah
                                menjadi point. Setelah mencapai jumlah yang
                                sudah ditentukan (berbeda di setiap Liga), point
                                ini dapat ditukarkan dengan hadiah menarik dari
                                Kadoqu.
                              </li>
                              <li>
                                Setiap sales senilai Rp 10.000 akan ditukarkan
                                dengan 1 point
                              </li>
                              <li>
                                Semakin banyak sales yang dihasilkan di Kadoqu,
                                semakin besar juga kesempatan merchant untuk
                                mendapatkan hadiah dengan nilai lebih besar.
                              </li>
                              <li>
                                Merchant tidak bisa berpindah Liga selama masa
                                Tournament
                              </li>
                              <li>
                                Sisa point yang tidak ditukarkan akan dianggap
                                hangus per tanggal Oktober 2020 atau pada saat
                                Kadoqu Merchant Gathering 2020.
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              } else {
                return <p>Loading...</p>;
              }
            }}
          </Query>
        )}
      </React.Fragment>
 );
        }}
        </MediaQuery>
    );
  }
}

export default withApollo(withRouter(MerchantTournament));
