import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,

} from "reactstrap";
import uploadPhoto from "../library/uploadfoto";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";
import { Mutation, withApollo } from "react-apollo";
import { TextInput, TextAreaInput,MultipleInlineInput } from "../components/FormComponents";
import { LoadingAlert, CloseLoadingAlert } from "../components/Loader";
import FileBase64 from "react-file-base64";
import Swal from "sweetalert2";

import { MUTATION_ADD_TESTIMONY } from "../gql/testimony";

class AddTestimonies extends React.Component {
  state = {
    voucherData: {
        name: "",
        short_description: "",
        budget: 0,
        testimony: "",
        image: "",
        category: ""
    },
    base64: null

  };

  setVoucherData = newData => {
    this.setState(Object.assign(this.state.voucherData, newData));
  };

  emptyVoucherData = () => {
    this.setVoucherData({
        name: "",
        short_description: "",
        budget:0 ,
        testimony: "",
        image: "",
        category: "",
        base64: null,
        isAddModalOpen: false

    });
  };

  render() {
   

    return (
      <div className="add-product-form">
        <Mutation mutation={MUTATION_ADD_TESTIMONY}>
          {(addTestimony, { loading }) => {
            if (loading) {
              LoadingAlert("Adding Testimonies..");
            } else {
              CloseLoadingAlert();
            }
            return (
              <Form
                action=""
                onSubmit={e => {
                  e.preventDefault();

                  const filename = `${~~(Date.now() / 1000)}_testi`;
                  this.props.client
                    .mutate({
                      mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                      variables: { filename: filename }
                    })
                    .then(({ data }) =>
                      uploadPhoto(
                        data.createUploadToken.hash,
                        this.state.base64.split(",")[1],
                        filename,
                        data.createUploadToken.timestamp,
                        `/Testi/${this.props.property}/${this.state.name}`
                          
                          
                      )
                        .then(photoUrl =>
                          this.props.client
                          .mutate({
                            mutation:MUTATION_ADD_TESTIMONY,
                            variables: {
                              input:{
                                name: this.state.name,
                                short_description:this.state.short_description,
                                budget: 0,
                                testimony: this.state.testimony,
                                category: this.state.category,
                                image: photoUrl
                              }
                              
                              
                            }
                          })
                            .then(() => {
                              this.setState(
                                { name: "", base64: null },
                                () => {
                                  Swal.fire(
                                    'Sukses Message!',
                                    'Testimoni Berhasil di tambahkan!',
                                    'success',
                                  ).then(() => {
                                    this.props.history.push("/testimonies/list");
                                  })                                }
                              );
                            })
                            .catch(error => console.log(error.message))
                        )
                        .catch(error => console.log(error.message))
                    );
                
                }}
                className="form-horizontal"
              >
                <Card>
                  <CardHeader>
                    <h3>Add Testimony</h3>
                  </CardHeader>
                  <CardBody>
                
                    <TextInput
                      fieldName="Name"
                      onChange={e =>
                        this.setState({ name: e.target.value })
                      }
                    />
                    <TextInput
                      fieldName="short_description"
                      onChange={e =>
                        this.setState({ short_description: e.target.value })
                      }
                    />
                  
                    <TextAreaInput
                      fieldName="Testimony"
                      rows={3}
                      onChange={e =>
                        this.setState({
                          testimony: e.target.value
                        })
                      }
                    />
                  
             
                
                    <MultipleInlineInput
                        fieldName="Category"
                        type="radio"
                        options={["Custom Gift", "Hampers Gift" , "Wrapping Lab" , "Holiday" ]}
                        value={this.state.category}
                        onChange={e =>{
                     
                          this.setState({
                            category:e.target.value
                          });
                        }}
                      />
                        Image:{" "}
                         <FileBase64
                  className="form-control"
                  name="photo"
                  accept="image/*"
                  onDone={file => {
                    if (file.type.startsWith("image/")) {
                      this.setState({ base64: file.base64 });
                    }
                  }}
                />
                {this.state.base64 && (
                  <img src={this.state.base64} alt="" className="w-50 mt-2" />
                )}
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o" /> Submit
                    </Button>
                
                  </CardFooter>
                </Card>
              </Form>
            );
          }}
        </Mutation>
              {/* <Button
                    className="mb-3"
                    onClick={() => this.setState({ isAddModalOpen: true })}
                  >
                    <i className="fa fa-plus mr-1" />
                    Add New Testi
                  </Button>
                  <AddTestimoniesModal
                    show={this.state.isAddModalOpen}
                    onHide={() => this.setState({ isAddModalOpen: false })}
                    property={pageName.slice(0, -1)}
                   
                    
                  /> */}
      </div>
    );
  }
}

export default withApollo(AddTestimonies);
