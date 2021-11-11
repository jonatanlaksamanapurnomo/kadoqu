import React, { Component } from "react";
import IMAGES from "../data/images";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import "./EditPhoto.css";
import { MUTATION_UPDATE_PHOTO_PROFILE, GET_USER } from "../gql/user";
import { Mutation, withApollo } from "react-apollo";
import { MUTATION_SET_TOKEN, QUERY_GET_TOKEN } from "../gql/token";
import { withRouter, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

const photoProfile = IMAGES["Photo Profile"];

class EditPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  componentDidMount = () => {
    this.props.client
      .query({
        query: GET_USER
      })
      .then(res => {
        const user = res.data.me;

        this.setState({
          selected: user.photo
        });
      })
      .catch(
        <Redirect
          to={{
            pathname: "/login",
            state: {
              errMesage: "Anda Harus Login/Register Terlebih Dahulu",
              from: this.props.location
            }
          }}
        />
      );
  };
  render() {
    const { isDesktop } = this.props;
    return (
      <Mutation mutation={MUTATION_UPDATE_PHOTO_PROFILE}>
        {(updatePhotoProfile, { loading }) => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              const index = parseInt(this.state.selected);
              updatePhotoProfile({
                variables: {
                  id: index
                }
              }).then(res => {
                return this.props.client
                  .mutate({
                    mutation: MUTATION_SET_TOKEN,
                    variables: {
                      token: res.data.updatePhotoProfile
                    },
                    refetchQueries: [
                      { query: QUERY_GET_TOKEN },
                      { query: GET_USER }
                    ]
                  })
                  .then(() => {
                    Swal.fire(
                      {
                        title: "Foto berhasil diubah!",
                        imageUrl: photoProfile[index],
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: "",
                        timer: 1500,
                        showCancelButton: false,
                        showConfirmButton: false
                      },
                      setTimeout(() => {
                        this.props.history.push("/profile");
                      }, 1)
                    );
                  })
                  .catch(error => console.log(error.message));
              });
            }}
          >
            <div className={`mt-5 ${isDesktop ? "" : "px-4"}`}>
              <Row className={isDesktop ? "" : "d-flex justify-content-center"}>
                {Object.entries(photoProfile).map(([name, url]) => (
                  <Col
                    xs={4}
                    key={name}
                    className="edit-photo-image-col d-flex justify-content-center"
                  >
                    <Image
                      src={url}
                      alt=""
                      className={`${
                        parseInt(this.state.selected) === parseInt(name)
                          ? "edit-photo-selected"
                          : ""
                      } edit-photo-image`}
                      onClick={() => {
                        this.setState({
                          selected: name
                        });
                      }}
                    />
                  </Col>
                ))}
              </Row>
              <div
                className={`w-100${
                  isDesktop ? "" : " d-flex justify-content-center"
                }`}
              >
                <Button
                  size="lg"
                  type="submit"
                  className=" margin-bottom-mobile exitButton mt-5 kadoqu-primary-button-green"
                >
                  {isDesktop ? "Simpan" : "Pilih"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Mutation>
    );
  }
}
export default withApollo(withRouter(EditPhoto));
