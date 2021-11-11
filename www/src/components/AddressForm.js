import React, {Component} from "react";
import {Button, Form, Col, Alert} from "react-bootstrap";
import {
  validateNumeric
  //  validateAlphabetic
} from "../utils/regexInputConverter";

import "./AddressForm.css";
import gql from "graphql-tag";
import {Query, Mutation, withApollo} from "react-apollo";
import {withRouter} from "react-router-dom";
import {DeleteAddressCardConfirmation} from "./SweetAlerts";
import {LoadingAlert, CloseLoadingAlert} from "./Loader";
import Swal from "sweetalert2";
/*
Return address form component that could be used to add new address or edit/delete existing address

Input:
address <Object> - address that wanted to be edited/deleted
onDismiss <function> - function to be called upon clicking back button and after submit
*/

const fragments = {
  address: gql`
    fragment AddressFormAddress on Address {
      id
      alias
      name
      phone
      street
      subdistrict
      subdistrictId
      city
      cityId
      province
      provinceId
      postCode
      primaryAddress
    }
  `
};

export const GET_USER_ADDRESSES = gql`
  query getUserAddresses {
    me {
      addresses {
        ...AddressFormAddress
      }
    }
  }
  ${fragments.address}
`;

const ADD_ADDRESS = gql`
  mutation AddAddress($input: AddressInput) {
    addAddress(input: $input) {
      ...AddressFormAddress
    }
  }
  ${fragments.address}
`;

const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($input: AddressInput, $id: Int) {
    updateAddress(input: $input, id: $id) {
      ...AddressFormAddress
    }
  }
  ${fragments.address}
`;

const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: Int) {
    deleteAddress(id: $id) {
      ...AddressFormAddress
    }
  }
  ${fragments.address}
`;

const GET_PROVINCE = gql`
  query GetProvince {
    getProvince {
      province_id
      province
    }
  }
`;

const GET_CITY = gql`
  query GetCity($provinceId: String) {
    getCity(province_id: $provinceId) {
      city_id
      type
      city_name
    }
  }
`;

const GET_SUBDISTRICT = gql`
  query GetSubdistrict($cityId: String) {
    getSubdistrict(city: $cityId) {
      subdistrict_id
      subdistrict_name
    }
  }
`;

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.address
      ? this.props.address
      : {
        id: "",
        alias: "",
        name: "",
        phone: "",
        street: "",
        subdistrict: "",
        subdistrictId: "",
        city: "",
        cityId: "",
        province: "",
        provinceId: "",
        postCode: "",
        alertStatus: false
      };
  }

  handleInput = e => {
    // const ALPHABET_GROUP = ["subdistrict", "city", "province"];
    const NUMERIC_GROUP = ["phone", "postCode"];
    const RAJAONGKIR_GROUP = ["subdistrict", "city", "province"];
    const caller = e.target.id.split(".")[1];
    // if (ALPHABET_GROUP.includes(caller)) {
    //   this.setState({
    //     [caller]: validateAlphabetic(e.target.value)
    //   });
    //   return;
    // }

    e.target.classList.add("address-form-container");
    e.target.classList.add("form-control");
    e.target.classList.remove("address-form-field-error");
    if (RAJAONGKIR_GROUP.includes(caller)) {
      if (caller === "province") {
        this.setState({
          subdistrict: "",
          subdistrictId: "",
          city: "",
          cityId: ""
        });
      }
      this.setState({
        [caller]: e.target.value,
        [caller + "Id"]: e.target.options[e.target.selectedIndex].getAttribute(
          "data-id"
        )
      });
      return;
    }
    if (NUMERIC_GROUP.includes(caller)) {
      this.setState({
        [caller]: validateNumeric(e.target.value)
      });
      return;
    }
    this.setState({[caller]: e.target.value});
  };

  deleteAddressCard = onClick => {
    LoadingAlert(`Menghapus Alamat ${this.state.alias} - ${this.state.name}`);
    this.props.client
    .mutate({
      mutation: DELETE_ADDRESS,
      variables: {id: this.state.id},
      refetchQueries: [{query: GET_USER_ADDRESSES}]
    })
    .then(() => {
      CloseLoadingAlert();
      onClick();
    })
    .catch(error => {
      CloseLoadingAlert();
      setTimeout(
        () =>
          Swal.fire({
            type: "error",
            title: "Alamat tidak berhasil dihapus!",
            text: error.message.replace(/GraphQL error:[\s]*/, ""),
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          }),
        250
      );
    });
  };

  componentDidMount() {
    if (this.state.province) {
      this.props.client
      .query({
        query: GET_PROVINCE
      })
      .then(res => {
        this.provinceInput = this.state.province;
        return this.props.client
        .query({
          query: GET_CITY,
          variables: {provinceId: this.state.provinceId}
        })
        .then(res => {
          this.cityInput = this.state.city;
          this.subdistrictInput = this.state.subdistrict;
          return res;
        });
      });
    }
  }

  render() {
    //console.log("State", this.state);
    const Province = ({onChange}) => (
      <Form.Group
        as={Col}
        lg={4}
        sm={6}
        xs={6}
        controlId="addressForm.province"
      >
        <Form.Label>Provinsi</Form.Label>
        <Form.Control
          required
          as="select"
          name="province"
          defaultValue={this.state.province}
          onChange={onChange}
          ref={el => (this.provinceInput = el)}
        >
          <Query query={GET_PROVINCE}>
            {({loading, error, data}) => {
              if (loading) return <option>Loading...</option>;
              if (error) {
                console.log("Error!: ", error);
                return <option>Pilih provinsi</option>;
              }
              return (
                <React.Fragment>
                  <option value="" data-id="">
                    Pilih provinsi
                  </option>
                  {data.getProvince.map(
                    p => (
                      //{
                      // if (this.state.province === p.province) {
                      //   return (
                      //     <option
                      //       key={p.province_id}
                      //       value={p.province}
                      //       data-id={p.province_id}
                      //       selected
                      //     >
                      //       {p.province}
                      //     </option>
                      //   );
                      // } else {
                      //   return
                      <option
                        key={p.province_id}
                        value={p.province}
                        data-id={p.province_id}
                      >
                        {p.province}
                      </option>
                    )
                    //   }
                    // }
                  )}
                </React.Fragment>
              );
            }}
          </Query>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Mohon isi provinsi.
        </Form.Control.Feedback>
      </Form.Group>
    );

    const City = ({onChange}) => (
      <Form.Group as={Col} lg={4} sm={6} xs={6} controlId="addressForm.city">
        <Form.Label>Kota/Kabupaten</Form.Label>
        <Form.Control
          required
          as="select"
          name="city"
          defaultValue={this.state.city}
          onChange={onChange}
          ref={el => (this.cityInput = el)}
        >
          {this.state.provinceId ? (
            <Query
              query={GET_CITY}
              variables={{provinceId: this.state.provinceId}}
            >
              {({loading, error, data}) => {
                if (loading) return <option>Loading...</option>;
                if (error) {
                  console.log("Error!: ", error);
                  return <option>Pilih kota/kabupaten</option>;
                }
                return (
                  <React.Fragment>
                    <option value="" data-id="">
                      Pilih kota/kabupaten
                    </option>
                    {data.getCity.map(
                      c => (
                        //{
                        // if (this.state.cityId === c.city_id) {
                        //   return (
                        //     <option
                        //       key={c.city_id}
                        //       value={c.type + " " + c.city_name}
                        //       data-id={c.city_id}
                        //       selected
                        //     >
                        //       {c.type + " " + c.city_name}
                        //     </option>
                        //   );
                        // } else {
                        //   return
                        <option
                          key={c.city_id}
                          value={c.type + " " + c.city_name}
                          data-id={c.city_id}
                        >
                          {c.type + " " + c.city_name}
                        </option>
                      )
                      //   }
                      // }
                    )}
                  </React.Fragment>
                );
              }}
            </Query>
          ) : (
            <option>Pilih kota/kabupaten</option>
          )}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Mohon isi kota/kabupaten.
        </Form.Control.Feedback>
      </Form.Group>
    );

    const Subdistrict = ({onChange}) => (
      <Form.Group
        as={Col}
        lg={4}
        sm={6}
        xs={6}
        controlId="addressForm.subdistrict"
      >
        <Form.Label>Kecamatan</Form.Label>
        <Form.Control
          required
          as="select"
          name="subdistrict"
          defaultValue={this.state.subdistrict}
          onChange={onChange}
          ref={el => (this.subdistrictInput = el)}
        >
          {this.state.cityId ? (
            <Query
              query={GET_SUBDISTRICT}
              variables={{cityId: this.state.cityId}}
            >
              {({loading, error, data}) => {
                if (loading) return <option>Loading...</option>;
                if (error) {
                  console.log("Error!: ", error);
                  return <option>Pilih kecamatan</option>;
                }
                return (
                  <React.Fragment>
                    <option value="" data-id="">
                      Pilih kecamatan
                    </option>
                    {data.getSubdistrict.map(
                      sd => (
                        // {
                        //   if (this.state.subdistrictId === sd.subdistrict_id) {
                        //     return (
                        //       <option
                        //         key={sd.subdistrict_id}
                        //         value={sd.subdistrict_name}
                        //         data-id={sd.subdistrict_id}
                        //         selected
                        //       >
                        //         {sd.subdistrict_name}
                        //       </option>
                        //     );
                        //   } else {
                        //return
                        <option
                          key={sd.subdistrict_id}
                          value={sd.subdistrict_name}
                          data-id={sd.subdistrict_id}
                        >
                          {sd.subdistrict_name}
                        </option>
                      )
                      //}
                      //}
                    )}
                  </React.Fragment>
                );
              }}
            </Query>
          ) : (
            <option>Pilih kecamatan</option>
          )}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Mohon isi kota/kabupaten.
        </Form.Control.Feedback>
      </Form.Group>
    );

    const AddAddress = props => {
      const {className, onClick} = props;
      return (
        <Mutation
          mutation={ADD_ADDRESS}
          update={(cache, {data: {addAddress}}) => {
            const {me} = cache.readQuery({query: GET_USER_ADDRESSES});
            cache.writeQuery({
              query: GET_USER_ADDRESSES,
              data: {
                me: {
                  ...me,
                  addresses: [...me.addresses, addAddress]
                }
              }
            });
          }}
        >
          {(addAddress, {loading, error, data}) => {
            if (loading) {
              LoadingAlert(
                `Menambahkan Alamat ${this.state.alias} - ${this.state.name}..`
              );
            }
            return (
              <React.Fragment>
                <Form
                  className="col-md-5 col-sm-6"
                  onSubmit={e => {
                    e.preventDefault();
                    let addressInput = {
                      alias: this.state.alias,
                      name: this.state.name,
                      phone: this.state.phone,
                      street: this.state.street,
                      subdistrict: this.state.subdistrict,
                      subdistrictId: this.state.subdistrictId,
                      city: this.state.city,
                      cityId: this.state.cityId,
                      province: this.state.province,
                      provinceId: this.state.provinceId,
                      postCode: this.state.postCode
                    };
                    if (
                      addressInput.alias !== "" &&
                      addressInput.name !== "" &&
                      addressInput.phone !== "" &&
                      addressInput.street !== "" &&
                      addressInput.province !== "" &&
                      addressInput.subdistrict !== "" &&
                      addressInput.city !== "" &&
                      addressInput.provinceId !== "" &&
                      addressInput.subdistrictId !== "" &&
                      addressInput.cityId !== "" &&
                      addressInput.postCode !== ""
                    ) {
                      addAddress({variables: {input: addressInput}}).catch(
                        error => {
                          CloseLoadingAlert();
                          setTimeout(
                            () =>
                              Swal.fire({
                                type: "error",
                                title: "Alamat tidak berhasil ditambahkan!",
                                text: error.message.replace(
                                  /GraphQL error:[\s]*/,
                                  ""
                                ),
                                timer: 2000,
                                showCancelButton: false,
                                showConfirmButton: false
                              }),
                            250
                          );
                        }
                      );
                      if (onClick) {
                        CloseLoadingAlert();
                        onClick();
                      }
                    } else {
                      [
                        "addressForm.name",
                        "addressForm.alias",
                        "addressForm.phone",
                        "addressForm.postCode",
                        "addressForm.subdistrict",
                        "addressForm.city",
                        "addressForm.province",
                        "addressForm.street"
                      ].forEach(field => {
                        if (
                          document.getElementById(field).value === "" ||
                          document.getElementById(field).value ===
                          "Pilih kecamatan" ||
                          document.getElementById(field).value ===
                          "Pilih kota/kabupaten" ||
                          document.getElementById(field).value ===
                          "Pilih provinsi"
                        ) {
                          document
                          .getElementById(field)
                          .classList.remove("address-form-container");
                          document
                          .getElementById(field)
                          .classList.remove("form-control");
                          document
                          .getElementById(field)
                          .classList.add("address-form-field-error");
                        }
                      });
                      props.alertStatus(true);
                    }
                  }}
                >
                  <button
                    type="submit"
                    className={
                      "w-100 kadoqu-primary-button-green active " + className
                    }
                    disabled={loading || data}
                  >
                    Simpan
                  </button>
                </Form>
              </React.Fragment>
            );
          }}
        </Mutation>
      );
    };

    const UpdateAddress = props => {
      const {className, onClick} = props;
      return (
        <Mutation
          mutation={UPDATE_ADDRESS}
          update={(cache, {data: {updateAddress}}) => {
            const {me} = cache.readQuery({query: GET_USER_ADDRESSES});
            let idx = me.addresses.findIndex(e => e.id === updateAddress.id);
            me.addresses[idx] = updateAddress;
            cache.writeQuery({
              query: GET_USER_ADDRESSES,
              data: {me: me}
            });
          }}
        >
          {(updateAddress, {loading, error, data}) => {
            if (loading) {
              LoadingAlert(
                `Mengubah Alamat ${this.state.alias} - ${this.state.name} ..`
              );
            }
            return (
              <React.Fragment>
                <Form
                  className="col-md-5 col-sm-6"
                  onSubmit={e => {
                    e.preventDefault();
                    let addressInput = {
                      alias: this.state.alias,
                      name: this.state.name,
                      phone: this.state.phone,
                      street: this.state.street,
                      subdistrict: this.state.subdistrict,
                      subdistrictId: this.state.subdistrictId,
                      city: this.state.city,
                      cityId: this.state.cityId,
                      province: this.state.province,
                      provinceId: this.state.provinceId,
                      postCode: this.state.postCode
                    };

                    if (
                      addressInput.alias !== "" &&
                      addressInput.name !== "" &&
                      addressInput.phone !== "" &&
                      addressInput.street !== "" &&
                      addressInput.province !== "" &&
                      addressInput.subdistrict !== "" &&
                      addressInput.city !== "" &&
                      addressInput.provinceId !== "" &&
                      addressInput.subdistrictId !== "" &&
                      addressInput.cityId !== "" &&
                      addressInput.postCode !== ""
                    ) {
                      updateAddress({
                        variables: {input: addressInput, id: this.state.id}
                      }).catch(error => {
                        CloseLoadingAlert();
                        setTimeout(
                          () =>
                            Swal.fire({
                              type: "error",
                              title: "Alamat tidak berhasil diubah!",
                              text: error.message.replace(
                                /GraphQL error:[\s]*/,
                                ""
                              ),
                              timer: 2000,
                              showCancelButton: false,
                              showConfirmButton: false
                            }),
                          250
                        );
                      });
                      if (onClick) {
                        CloseLoadingAlert();
                        onClick();
                      }
                    } else {
                      [
                        "addressForm.name",
                        "addressForm.alias",
                        "addressForm.phone",
                        "addressForm.postCode",
                        "addressForm.subdistrict",
                        "addressForm.city",
                        "addressForm.province",
                        "addressForm.street"
                      ].forEach(field => {
                        if (
                          document.getElementById(field).value === "" ||
                          document.getElementById(field).value ===
                          "Pilih kecamatan" ||
                          document.getElementById(field).value ===
                          "Pilih kota/kabupaten" ||
                          document.getElementById(field).value ===
                          "Pilih provinsi"
                        ) {
                          document
                          .getElementById(field)
                          .classList.remove("address-form-container");
                          document
                          .getElementById(field)
                          .classList.remove("form-control");
                          document
                          .getElementById(field)
                          .classList.add("address-form-field-error");
                        }
                      });
                      props.alertStatus(true);
                    }
                  }}
                >
                  <button
                    type="submit"
                    className={
                      "w-100 kadoqu-primary-button-green active " + className
                    }
                    disabled={loading}
                  >
                    Simpan
                  </button>
                </Form>
              </React.Fragment>
            );
          }}
        </Mutation>
      );
    };

    const DeleteAddress = props => {
      const {className, onClick, isDesktop} = props;
      if (isDesktop) {
        return (
          <Button
            onClick={() =>
              DeleteAddressCardConfirmation(this.state.alias, () =>
                this.deleteAddressCard(onClick)
              )
            }
            className={"address-form-delete-button " + className}
          >
            <i
              className="far fa-trash-alt fa-3x address-form-delete cursor-pointer"/>
          </Button>
        );
      }
      return (
        <Button
          className={"address-form-delete-button " + className}
          onClick={() =>
            DeleteAddressCardConfirmation(this.state.alias, () =>
              this.deleteAddressCard(onClick)
            )
          }
        >
          <i
            className="far fa-trash-alt fa-3x address-form-delete cursor-pointer"/>
        </Button>
      );
    };
    return (
      <div className="address-form">
        <div
          className={
            this.props.isDesktop
              ? "address-form-container"
              : "address-form-container p-3"
          }
        >
          {this.state.alertStatus && (
            <Alert variant="danger">Lengkapi Dulu Form nya !!</Alert>
          )}
          <Form.Row>
            <Form.Group as={Col} lg={12} controlId="addressForm.alias">
              <Form.Label>
                Sebutan Alamat{" "}
                {this.props.isDesktop ? (
                  "(contoh: rumah, toko, kantor)"
                ) : (
                  <small className="black">(contoh: rumah, toko, kantor)</small>
                )}
              </Form.Label>
              <Form.Control
                required
                type="text"
                value={this.state.alias}
                onChange={this.handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Mohon isi sebutan alamat.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              as={Col}
              lg={6}
              sm={6}
              xs={6}
              controlId="addressForm.name"
            >
              <Form.Label>Penerima</Form.Label>
              <Form.Control
                required
                type="text"
                value={this.state.name}
                onChange={this.handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Mohon isi nama penerima.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              lg={5}
              sm={6}
              xs={6}
              controlId="addressForm.phone"
            >
              <Form.Label>No. Handphone</Form.Label>
              <Form.Control
                required
                type="tel"
                value={this.state.phone}
                onChange={this.handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Mohon isi nomor telepon penerima.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} lg={11} controlId="addressForm.street">
              <Form.Label>Alamat Lengkap</Form.Label>
              <Form.Control
                required
                type="text"
                value={this.state.street}
                onChange={this.handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Mohon isi alamat.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>

            <Province onChange={this.handleInput} />
            <City onChange={this.handleInput} />
            <Subdistrict onChange={this.handleInput} />
            <Form.Group
              as={Col}
              lg={4}
              sm={6}
              xs={6}
              controlId="addressForm.postCode"
            >
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                required
                type="text"
                value={this.state.postCode}
                onChange={this.handleInput}
                minLength={5}
                maxLength={5}
              />
              <Form.Control.Feedback type="invalid">
                Mohon isi kode pos.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </div>
        <div className="address-form-buttons d-flex">
          {this.props.address ? (
            <UpdateAddress
              alertStatus={e => {
                this.setState({
                  alertStatus: true
                });
              }}
              onClick={this.props.onDismiss}
            />
          ) : (
            <AddAddress
              alertStatus={e => {
                this.setState({
                  alertStatus: true
                });
              }}
              onClick={this.props.onDismiss}
            />
          )}
          <button
            className="address-form-back-button col-md-5 col-sm-6"
            onClick={this.props.onBack}
          >
            Kembali
          </button>
          {this.props.address ? (
            <DeleteAddress
              onClick={this.props.onDelete}
              isDesktop={this.props.isDesktop}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default withApollo(withRouter(AddressForm));
