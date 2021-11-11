import React from "react";
import {withRouter} from "react-router-dom";
import {withApollo} from "react-apollo";
import {Button, Col, Form, Input} from "reactstrap";
import {Mutation, Query} from "react-apollo";
import {Row, Container} from "react-bootstrap";
import {MUTATION_EDIT_PRODUCT} from "../gql/product";
import {getMerchantLevelTax} from "../utils/userChecker";
import {QUERY_GET_GIDA_OPTIONS} from "../gql/gida-option";
import {LoadingAlert, CloseLoadingAlert} from "./Loader";
import {
  MUTATION_ADD_PRODUCT_REVIEW,
  MUTATION_SET_PRODUCT_REVIEWS_STATUS
} from "../gql/product-review";
import { MUTATION_DELETE_DOCUMENT } from "../gql/elasticsearch";

class EditProductScoreFragment extends React.Component {
  state = {
    formData: {
      relationship: {},
      event: {},
      personality: {}
    },
    totalScore: {
      relationship: 0,
      event: 0,
      personality: 0
    },
    maxScore: 30
  };
  componentDidMount = () => {
    this.resetFormData();
  };
  resetFormData = () => {
    if (this.props.productDetail) {
      this.setFormData({
        relationship: this.props.productDetail.score
          ? {...this.props.productDetail.score.relationship} || {}
          : {},
        event: this.props.productDetail.score
          ? {...this.props.productDetail.score.event} || {}
          : {},
        personality: this.props.productDetail.score
          ? {...this.props.productDetail.score.personality} || {}
          : {}
      });
    } else {
      this.setFormData({
        relationship: {},
        event: {},
        personality: {}
      });
    }
  };
  setFormData = (newData, val = null) => {
    const newScore = {};
    ["relationship", "event", "personality"].forEach(data => {
      newScore[data] = this.state.maxScore;
      let total = 0;
      if (!newData[data]) {
        Object.entries(this.state.formData[data.toLowerCase()]).forEach(
          ([key, values]) => {
            if (total + values <= newScore[data]) {
              total += values;
            } else {
              const temp = total;
              total = newScore[data];
              this.setData(data, key, newScore[data] - temp);
            }
          }
        );
      } else {
        Object.entries(newData[data.toLowerCase()]).forEach(([key, values]) => {
          if (total + values <= newScore[data]) {
            total += values;
          } else {
            const temp = total;
            total = newScore[data];
            this.setData(data, key, newScore[data] - temp);
          }
        });
      }
      newScore[data] -= total;
    });
    this.setState({
      formData: Object.assign(this.state.formData, newData),
      totalScore: Object.assign(this.state.totalScore, newScore)
    });
  };
  setData = (aspect, key, value = 1) => {
    let newValue = this.state.formData[aspect];
    newValue[key] = parseInt(value);
    if (newValue[key]) this.setFormData({aspect: newValue});
  };
  addValue = e => {
    return e.target.value > 10 ? 10 : e.target.value < 1 ? 1 : e.target.value;
  };
  removeData = (aspect, key) => {
    let newValue = this.state.formData[aspect];
    delete newValue[key];
    this.setFormData({aspect: newValue});
  };

  render() {
    const productDetail = this.props.productDetail || {};
    const Toast = this.props.toast;
    return (
      <Mutation mutation={MUTATION_EDIT_PRODUCT}>
        {(editProduct, {loading}) => {
          if (loading) {
            LoadingAlert("Editing Product Score");
          } else {
            CloseLoadingAlert();
          }
          return (
            <Form
              onReset={e => {
                e.preventDefault();
                this.resetFormData();
              }}
              onSubmit={e => {
                e.preventDefault();
                let {relationship, event, personality} = this.state.formData;
                const score = {
                  relationship: relationship,
                  event: event,
                  personality: personality
                };
                const obj = this.props.productDetail
                  ? {refetchQueries: [this.props.query]}
                  : {};
                editProduct({
                  variables: {
                    id: this.props.productId,
                    edits: {
                      score: score
                    },
                    merchantLevelTax: getMerchantLevelTax()
                  },
                  ...obj
                })
                  .then(() => {
                    this.props.productDetail &&
                    this.props.setAlert({
                      message: `Success! ${productDetail.name ||
                      ""} score has been updated!`,
                      variant: "success"
                    });
                    !this.props.productDetail &&
                    this.props.history.push("/products");
                  })
                  .catch(error => {
                    Toast.fire({
                      type: "error",
                      title: `Oops! ${error.message || error}`
                    });
                  });
              }}
              className="form-horizontal"
            >
              <Container fluid>
                <Query query={QUERY_GET_GIDA_OPTIONS}>
                  {({loading, error, data}) => {
                    if (loading) return <option>Loading...</option>;
                    if (error) {
                      console.log("Error!: ", error);
                    }
                    return (
                      <Row>
                        {Object.entries({
                          Relationship: data.getGidaRelationshipOptions,
                          Event: data.getGidaEventOptions,
                          Personality: data.getGidaPersonalityOptions
                        }).map(([aspect, datas], idx) => (
                          <Col
                            key={aspect}
                            sm={12}
                            md={true}
                            className={idx === 0 ? null : "border-left"}
                          >
                            <strong className="text-center">{aspect}</strong>
                            <span className="float-right">
                              <strong>Sisa Point : </strong>
                              {
                                this.state.totalScore[
                                  aspect.toLocaleLowerCase()
                                  ]
                              }
                            </span>
                            {Object.entries(
                              this.state.formData[aspect.toLowerCase()]
                            ).map(([key, value]) => (
                              <Row
                                key={key}
                                noGutters
                                className="align-items-center mb-1 mt-2"
                              >
                                <Col xs={7}>{key}</Col>
                                <Col xs={4}>
                                  <Input
                                    type="number"
                                    value={value}
                                    onChange={e => {
                                      this.setData(
                                        aspect.toLowerCase(),
                                        key,
                                        e.target.value > 10
                                          ? 10
                                          : e.target.value < 1
                                          ? 1
                                          : e.target.value
                                      );
                                    }}
                                  />
                                </Col>
                                <Col xs={1} className="text-right">
                                  <i
                                    className="fa fa-times text-danger"
                                    onClick={() =>
                                      this.removeData(aspect.toLowerCase(), key)
                                    }
                                  />
                                </Col>
                              </Row>
                            ))}
                            <Row className="mt-3">
                              <Col xs={12}>
                                <strong>Tambah {aspect}</strong>
                              </Col>
                              <Col xs={8} className="mt-2">
                                <Input
                                  type="select"
                                  value={0}
                                  onChange={event => {
                                    if (
                                      this.state.totalScore[
                                        aspect.toLocaleLowerCase()
                                        ] > 0
                                    ) {
                                      this.setData(
                                        aspect.toLowerCase(),
                                        event.target.value
                                      );
                                    } else {
                                      Toast.fire({
                                        type: "error",
                                        title: `Sisa poin ${aspect.toLowerCase()} telah habis!`
                                      });
                                    }
                                  }}
                                >
                                  <React.Fragment>
                                    <option disabled value={0}>
                                      Pilih {aspect}
                                    </option>
                                    {datas.map(datum =>
                                      Object.keys(
                                        this.state.formData[
                                          aspect.toLowerCase()
                                          ]
                                      ).includes(datum.value.toLowerCase()) ? (
                                        ""
                                      ) : (
                                        <option
                                          key={datum.id}
                                          value={datum.value.toLowerCase()}
                                        >
                                          {datum.value}
                                        </option>
                                      )
                                    )}
                                  </React.Fragment>
                                </Input>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </Row>
                    );
                  }}
                </Query>
              </Container>
              <div className="mt-3 d-flex justify-content-center">
                <Button
                  onClick={() => {
                    this.props.client
                      .mutate({
                        mutation: MUTATION_ADD_PRODUCT_REVIEW,
                        variables: {
                          productId: this.props.productId
                        }
                      })
                      .then(() => {
                        this.props.client.mutate({
                          mutation:MUTATION_DELETE_DOCUMENT,
                          variables:{
                            id:this.props.productDetail.id
                          }
                        });
                        this.props.client.mutate({
                          mutation: MUTATION_SET_PRODUCT_REVIEWS_STATUS,
                          variables: {
                            status: false,
                            productId: this.props.productId
                          }
                        });
                      });
                  }}
                  type="submit"
                  color="primary"
                  className="w-25 mr-2"
                >
                  Save
                </Button>
                <Button type="reset" color="secondary" className="w-25">
                  Reset
                </Button>
              </div>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default withApollo(withRouter(EditProductScoreFragment));
