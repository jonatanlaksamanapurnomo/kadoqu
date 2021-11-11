import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Label,
  FormText
} from "reactstrap";
import { Query, Mutation, withApollo } from "react-apollo";
import DatePicker from "react-datepicker";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import FileBase64 from "react-file-base64";
import { Image } from "react-bootstrap";
import { TextInput, TextAreaInput } from "../components/FormComponents";
import { MUTATION_ADD_PROMOTION, QUERY_GET_PROMOTIONS } from "../gql/promotion";
import { QUERY_GET_PRODUCTS } from "../gql/product";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";
import { LoadingAlert, CloseLoadingAlert } from "../components/Loader";
import { paginationOption } from "../data/listConstant";
import uploadPhoto from "../library/uploadfoto";

import "react-datepicker/dist/react-datepicker.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const { SearchBar } = Search;

class AddPromotion extends React.Component {
  state = {
    promotionData: {
      name: "",
      slug: "",
      description: "",
      validFrom: "",
      validTo: ""
    },
    selectedProducts: [],
    photo: ""
  };

  setPromotionData = newData => {
    this.setState(Object.assign(this.state.promotionData, newData));
  };

  emptyPromotionData = () => {
    this.setState({
      promotionData: {
        name: "",
        slug: "",
        description: "",
        validFrom: "",
        validTo: ""
      },
      selectedProducts: [],
      photo: ""
    });
  };

  render() {
    const columns = [
      {
        dataField: "id",
        hidden: true,
        csvExport: false
      },
      {
        dataField: "sku",
        text: "SKU",
        editable: false,
        csvExport: false,
        sort: true
      },
      {
        dataField: "name",
        text: "Name",
        editable: false,
        sort: true
      },
      {
        dataField: "slug",
        text: "URL Key",
        editable: false,
        sort: true
      },
      {
        dataField: "merchant",
        text: "Merchant",
        editable: false,
        sort: true
      }
    ];
    const defaultSorted = [{ dataField: "sku", order: "asc" }];
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      hideSelectAll: false,
      clickToEdit: true,
      onSelect: (row, isSelect) =>
        this.setState({
          selectedProducts: isSelect
            ? this.state.selectedProducts.concat([row.id])
            : this.state.selectedProducts.filter(el => el !== row.id)
        }),
      onSelectAll: (isSelect, rows) =>
        this.setState({
          selectedProducts: isSelect ? rows.map(e => e.id) : []
        })
    };

    return (
      <Mutation mutation={MUTATION_ADD_PROMOTION}>
        {addPromotion => {
          return (
            <Form
              action=""
              onSubmit={e => {
                e.preventDefault();

                // validate product data
                const arr = Object.entries(this.state.promotionData);
                for (let i = 0; i < arr.length; i++) {
                  const key = arr[i][0],
                    value = arr[i][1];
                  if (["description", "validFrom", "validTo"].includes(key)) {
                    continue;
                  }
                  if (value === "") {
                    alert("Please complete all fields!");
                    return;
                  }
                }

                // prepare data
                const userInput = e.target;
                let inputForm = {
                  name: userInput.name.value,
                  slug: userInput.slug.value,
                  description: userInput.description.value,
                  isEnable: false,
                  validFrom:
                    this.state.promotionData.validFrom !== ""
                      ? this.state.promotionData.validFrom.toISOString()
                      : null,
                  validTo:
                    this.state.promotionData.validTo !== ""
                      ? this.state.promotionData.validTo.toISOString()
                      : null,
                  products: this.state.selectedProducts,
                  merchants: []
                };

                const photo = this.state.photo;
                const filename =
                  ~~(Date.now() / 1000) +
                  "_" +
                  userInput.name.value
                    .toLowerCase()
                    .replace(/\s/g, "X")
                    .replace(/\W/g, "")
                    .replace(/[X]/g, "-");

                // do mutation
                LoadingAlert("Adding Promotion...");
                this.props.client
                  .mutate({
                    mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                    variables: { filename: filename }
                  })
                  .then(({ data }) =>
                    uploadPhoto(
                      data.createUploadToken.hash,
                      photo.split(",")[1],
                      filename,
                      data.createUploadToken.timestamp,
                      "/Banners/"
                    )
                      .then(photoUrl =>
                        addPromotion({
                          variables: {
                            input: Object.assign(inputForm, {
                              banner: photoUrl
                            })
                          },
                          refetchQueries: [{ query: QUERY_GET_PROMOTIONS }]
                        })
                          .then(() => {
                            CloseLoadingAlert();
                            this.props.history.push({
                              pathname: `/promotions/`
                            });
                          })
                          .catch(e => {
                            CloseLoadingAlert();
                            alert(e);
                          })
                      )
                      .catch(e => {
                        CloseLoadingAlert();
                        alert(e);
                      })
                  )
                  .catch(e => {
                    CloseLoadingAlert();
                    alert(e);
                  });
              }}
              className="form-horizontal"
            >
              <Card>
                <CardHeader>
                  <h3>Add Promotion</h3>
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col md={3}>Banner</Col>
                    <Col xs={12} md={6}>
                      <FileBase64
                        className="form-control"
                        onDone={photo => {
                          if (photo.type.startsWith("image/")) {
                            this.setState({
                              photo: photo.base64
                            });
                          }
                        }}
                        accept="image/*"
                      />
                      {this.state.photo && (
                        <Image fluid src={this.state.photo} className="mt-3" />
                      )}
                    </Col>
                  </FormGroup>
                  <TextInput
                    fieldName="Name"
                    onChange={e =>
                      this.setPromotionData({ name: e.target.value })
                    }
                    onBlur={e => {
                      const slug = e.target.value
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-");
                      document.getElementById("add-product-slug").value = slug;
                      this.setPromotionData({ slug: slug });
                    }}
                  />
                  <TextInput
                    fieldName="Slug"
                    onChange={e => {
                      this.setPromotionData({ slug: e.target.value });
                    }}
                  />
                  <TextAreaInput
                    fieldName="Description"
                    rows={3}
                    onChange={e =>
                      this.setPromotionData({
                        description: e.target.value
                      })
                    }
                  />
                  <hr />
                  <FormGroup row>
                    <Col md={3}>
                      <Label>Valid From</Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <DatePicker
                        name="validFrom"
                        selected={this.state.promotionData.validFrom}
                        onChange={e => {
                          this.setPromotionData({
                            validFrom: e
                          });
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="dd/MM/yyyy HH:mm"
                      />
                    </Col>
                    <Col xs={12} md={{ size: 6, offset: 3 }}>
                      <FormText color="muted">
                        Leave empty if there is no valid date from
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md={3}>
                      <Label>Valid To</Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <DatePicker
                        name="validTo"
                        selected={this.state.promotionData.validTo}
                        onChange={e => {
                          this.setPromotionData({
                            validTo: e
                          });
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="dd/MM/yyyy HH:mm"
                      />
                    </Col>
                    <Col xs={12} md={{ size: 6, offset: 3 }}>
                      <FormText color="muted">
                        Leave empty if there is no valid date to
                      </FormText>
                    </Col>
                  </FormGroup>
                  <hr />
                  <Query query={QUERY_GET_PRODUCTS}>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>{error.message}</p>;

                      return (
                        <ToolkitProvider
                          bootstrap4
                          keyField="id"
                          data={data.getProductsDashboard}
                          columns={columns}
                          search
                        >
                          {props => (
                            <div>
                              <p>Products</p>
                              <SearchBar {...props.searchProps} />
                              <BootstrapTable
                                bootstrap4
                                pagination={paginationFactory(paginationOption)}
                                selectRow={selectRow}
                                defaultSorted={defaultSorted}
                                {...props.baseProps}
                                wrapperClasses="table-responsive"
                              />
                            </div>
                          )}
                        </ToolkitProvider>
                      );
                    }}
                  </Query>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o" /> Submit
                  </Button>
                  <Button
                    type="reset"
                    size="sm"
                    color="danger"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      this.emptyPromotionData();
                    }}
                  >
                    <i className="fa fa-ban" /> Reset
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default withApollo(AddPromotion);
