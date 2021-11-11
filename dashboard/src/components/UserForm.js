import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup
} from "reactstrap";
import { isAdmin, getMerchantLevelTax } from "../utils/userChecker";
import { Mutation, withApollo } from "react-apollo";
import { MultipleInlineInput, TextInput } from "../components/FormComponents";
import { QUERY_GET_ADMINS } from "../pages/UserList";
import { QUERY_GET_MERCHANT_CODES } from "../gql/product";
import { QUERY_GET_ALL_LEAGUE } from "../gql/merchantLeague";
import Swal from "sweetalert2";
import AddUsersModal from "../components/AddUsersModal";
import "./Footer.css";

class UserForm extends React.Component {

  componentDidMount() {
    this.props.client.query({
      query: QUERY_GET_ALL_LEAGUE
    }).then(({ data: { getAllLeague } }) => {
      this.setState({
        merchantLeagues: getAllLeague
      });
    });

  }

  state = {
    formData: {
      email: this.props.data ? this.props.data.email : "",
      password: "",
      name: this.props.data ? this.props.data.name : "",
      role: this.props.data
        ? this.props.data.role[0].toUpperCase() +
        this.props.data.role.substring(1)
        : "Merchant",
      code: this.props.data ? this.props.data.code : "",
      phone: this.props.data ? this.props.data.phone : "",
      email2: this.props.data ? this.props.data.email2 : "",
      merchantLevel: this.props.data ? this.props.data.merchantLevel : "20%",
      leagueId: this.props.data ? this.props.data.leagueId : 0,
      categoryId: 1,
      badge_photo_url: this.props.data ? this.props.data.badge_photo_url : "https://ik.imagekit.io/nwiq66cx3pvsy/badge-basic.png"
    },
    isCSVModalOpen: false,
    category: "Gift",
    merchantLeagues: []
  };

  setFormData = newData => {
    this.setState({ formData: { ...this.state.formData, ...newData } });
  };


  render() {
    return (
      <div className="add-product-form">
        <Mutation mutation={this.props.mutation}>
          {adminMutation => {
            return (
              <Form
                action=""
                onSubmit={e => {
                  e.preventDefault();
                  const { code, ...otherData } = this.state.formData;
                  if (
                    Object.values(otherData).includes("") ||
                    (this.state.formData.role === "Merchant" && code === "")
                  ) {
                    if (!this.props.isEdit) {
                      alert("Please complete all fields!");
                      return;
                    }
                    let confirm = window.confirm(
                      "Empty field will remain unchanged. Proceed?"
                    );
                    if (!confirm) return;
                  }
                  let variables = {
                    input: { ...this.state.formData }
                  };
                  if (this.props.isEdit) {
                    variables["userId"] = this.props.id;
                  }

                  adminMutation({
                    variables: variables,
                    refetchQueries: [
                      { query: QUERY_GET_ADMINS },
                      { query: QUERY_GET_MERCHANT_CODES }
                    ]
                  })
                    .then(() => {
                      Swal.fire(
                        "Good job!",
                        "Anda Berhasil Mengedit Merchant!",
                        "success"
                      ).then(() => {
                        this.props.history.push({
                          pathname: `/users`
                        });
                      });

                    })
                    .catch(error =>
                      alert(
                        error.graphQLErrors
                          ? error.graphQLErrors.map(x => x.message)
                          : error
                      )
                    );
                }}
                className="form-horizontal"
              >
                <Card>
                  <CardHeader>
                    <h3>
                      {this.props.isEdit
                        ? `Edit ${this.state.formData.role}`
                        : "Add User"}
                    </h3>
                  </CardHeader>
                  <CardBody>
                    {this.props.isEdit ? null : (
                      <MultipleInlineInput
                        fieldName="Role"
                        type="radio"
                        options={["Merchant", "Admin"]}
                        value={this.state.formData.role}
                        onChange={e =>
                          this.setFormData({ role: e.target.value })
                        }
                      />
                    )}
                    {(isAdmin()) && (
                      <MultipleInlineInput
                        fieldName="Category"
                        type="radio"
                        options={["Gift", "Magical Moment", "Company Celebration", "Birthday Package", "Case", "Holiday"]}
                        value={this.state.category}
                        onChange={e => {
                          switch (e.target.value) {
                            case "Gift":
                              this.setFormData({ categoryId: 1 });
                              break;
                            case "Magical Moment":
                              this.setFormData({ categoryId: 2 });
                              break;
                            case "Company Celebration":
                              this.setFormData({ categoryId: 3 });
                              break;
                            case "Birthday Package":
                              this.setFormData({ categoryId: 4 });
                              break;
                            case "Case":
                              this.setFormData({ categoryId: 5 });
                              break;
                            case "Holiday":
                              this.setFormData({ categoryId: 6 });
                              break;
                            default:
                            //    do nothing
                          }
                          this.setState({
                            category: e.target.value
                          });
                        }}
                      />
                    )}
                    <TextInput
                      disabled={!isAdmin()}
                      fieldName="Merchant Code"
                      value={this.state.formData.code}
                      onChange={e => {
                        if (e.target.value.length > 3) return;
                        this.setFormData({
                          code: e.target.value
                            .replace(/[^a-zA-Z]/g, "")
                            .toUpperCase()
                        });
                      }}
                    />
                    <TextInput
                      disabled={!isAdmin()}
                      fieldName="Name"
                      value={this.state.formData.name}
                      onChange={e => this.setFormData({ name: e.target.value })}
                    />
                    <TextInput
                      disabled={!isAdmin()}
                      fieldName="Username"
                      type="text"
                      value={this.state.formData.email}
                      onChange={e =>
                        this.setFormData({ email: e.target.value })
                      }
                    />
                    <TextInput
                      disabled={!isAdmin()}
                      fieldName="email"
                      type="text"
                      value={this.state.formData.email2}
                      onChange={e => {
                        this.setFormData({ email2: e.target.value });
                      }}
                    />
                    <TextInput
                      fieldName="Password"
                      type="password"
                      value={this.state.formData.password}
                      onChange={e =>
                        this.setFormData({ password: e.target.value })
                      }
                    />
                    <FormGroup row>
                      <Col xs={0} md={3}/>
                      <Col xs={12} md={9}>
                        <div
                          className="password-peeker mt-n3"
                          onMouseDown={() =>
                            (document.getElementsByName("password")[0].type =
                              "text")
                          }
                          onMouseUp={() =>
                            (document.getElementsByName("password")[0].type =
                              "password")
                          }
                        >
                          <i className="fa fa-eye mr-1"/>
                          Peek password
                        </div>
                      </Col>
                    </FormGroup>

                    <TextInput
                      fieldName="Phone"
                      value={this.state.formData.phone}
                      onChange={e =>
                        this.setFormData({
                          phone: e.target.value.replace(/[\D]/g, "")
                        })
                      }
                    />

                    {(isAdmin()) && (
                      <>
                        <MultipleInlineInput

                          fieldName="Merchant Level"
                          type="radio"
                          options={["10%", "20%", "25%", "30%"]}
                          value={this.state.formData.merchantLevel}
                          onChange={e =>
                            this.setFormData({ merchantLevel: e.target.value })
                          }
                        />
                        <MultipleInlineInput
                          fieldName="Merchant League"
                          type="radio"
                          options={this.state.merchantLeagues.map(item => item.name)}
                          value={this.state.merchantLeagues.filter(item => item.id === parseInt(this.state.formData.leagueId)).map(item => item.name)[0]}
                          onChange={e => {
                            let league_name = e.target.value;
                            let selectedId = this.state.merchantLeagues.filter(item => item.name === league_name).map(item => item.id)[0];
                            this.setFormData({ leagueId: selectedId });
                          }}
                        />
                      </>
                    )}

                    <div className="Merchant-level-text"><h6>Merchant level</h6>
                    </div>
                    <img
                      src={getMerchantLevelTax() === 20 ? "https://ik.imagekit.io/nwiq66cx3pvsy/badge-basic.png" :
                        getMerchantLevelTax() === 25 ? "https://ik.imagekit.io/nwiq66cx3pvsy/badge-premium.png" :
                          getMerchantLevelTax() === 30 ? "https://ik.imagekit.io/nwiq66cx3pvsy/badge-advance.png" :
                            " "} alt="" className="level-badge"/>
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o"/> Submit
                    </Button>
                    <Button
                      onClick={
                        () => {
                          this.setFormData({

                            email: this.props.data ? this.props.data.email : "",
                            password: this.props.data
                              ? this.props.data.password
                              : "",
                            name: this.props.data ? this.props.data.name : "",
                            role: this.props.data
                              ? this.props.data.role[0].toUpperCase() +
                              this.props.data.role.substring(1)
                              : "Merchant",
                            code: this.props.data ? this.props.data.code : "",
                            phone: this.props.data ? this.props.data.phone : "",
                            email2: this.props.data ? this.props.data.email2 : ""
                          });
                        }
                      }
                      size="sm"
                      color="danger"
                    >
                      <i className="fa fa-ban"/> Reset
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            );
          }}
        </Mutation>
        <AddUsersModal
          show={this.state.isCSVModalOpen}
          onHide={() => this.setState({ isCSVModalOpen: false })}
        />
      </div>
    );
  }
}

export default withApollo(UserForm);
