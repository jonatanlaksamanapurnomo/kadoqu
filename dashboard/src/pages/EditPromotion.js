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
import { Image, Alert } from "react-bootstrap";
import { AppSwitch } from "@coreui/react";
import { TextInput, TextAreaInput } from "../components/FormComponents";
import { QUERY_GET_PROMOTION, MUTATION_EDIT_PROMOTION } from "../gql/promotion";
import { QUERY_GET_PRODUCTS } from "../gql/product";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";
import { LoadingAlert, CloseLoadingAlert } from "../components/Loader";
import { paginationOption } from "../data/listConstant";
import uploadPhoto from "../library/uploadfoto";

import "react-datepicker/dist/react-datepicker.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const { SearchBar } = Search;

class EditPromotion extends React.Component {
  state = {
    alert: {
      message: "",
      variant: undefined
    },
    promotionData: {
      isEnable: null,
      name: null,
      slug: null,
      description: null,
      validFrom: null,
      validTo: null
    },
    selectedProducts: [],
    photo: null,
    loading: true
  };

  setPromotionData = newData => {
    this.setState(Object.assign(this.state.promotionData, newData));
  };

  emptyPromotionData = () => {
    this.setState({
      promotionData: {
        isEnable: null,
        name: null,
        slug: null,
        description: null,
        validFrom: this.state.validFrom,
        validTo: this.state.validTo
      },
      selectedProducts: [],
      photo: null
    });
  };

  setAlert = ({ message, variant }) => {
    this.setState(
      {
        alert: {
          message: message,
          variant: variant
        }
      },
      () => window.scrollTo(0, 0)
    );
  };

  resetAlert = () => {
    this.setState({
      alert: {
        message: "",
        variant: undefined
      }
    });
  };

  render() {
    const promotionId = this.props.match.params.id;
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
    const selectRow = (isAdd = true) => ({
      mode: "checkbox",
      clickToSelect: true,
      hideSelectAll: false,
      clickToEdit: true,
      onSelect: (row, isSelect) => {
        this.setState({
          selectedProducts: isAdd
            ? this.state.selectedProducts.concat([row.id])
            : this.state.selectedProducts.filter(el => el !== row.id)
        });
        return false;
      },
      onSelectAll: (isSelect, rows) => {
        this.setState({
          selectedProducts: isAdd
            ? this.state.selectedProducts.concat(rows.map(e => e.id))
            : this.state.selectedProducts.filter(
                el => !rows.map(e => e.id).includes(el)
              )
        });
        return [];
      }
    });

    return (
      <Query query={QUERY_GET_PROMOTION} variables={{ id: promotionId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          const promotion = data.getPromotion;
          if (this.state.loading)
            this.setState({ loading: false }, () => {
              this.setPromotionData({
                validFrom: promotion.validFrom && new Date(promotion.validFrom),
                validTo: promotion.validTo && new Date(promotion.validTo)
              });
              this.setState({
                selectedProducts: promotion.products
              });
            });

          return (
            <Mutation mutation={MUTATION_EDIT_PROMOTION}>
              {editPromotion => {
                return (
                  <React.Fragment>
                    <Alert
                      show={this.state.alert.message !== ""}
                      variant={this.state.alert.variant}
                      onClose={this.resetAlert}
                      dismissible
                    >
                      {this.state.alert.message}
                    </Alert>
                    <Form
                      action=""
                      onSubmit={e => {
                        e.preventDefault();

                        let edits = { products: this.state.selectedProducts };
                        Object.entries(this.state.promotionData).forEach(
                          ([key, value]) => {
                            if (
                              value === null &&
                              !["validFrom", "validTo"].includes(key)
                            )
                              return;
                            switch (key) {
                              case "isEnable":
                              case "name":
                              case "slug":
                              case "description":
                                edits[key] = value;
                                break;
                              case "validFrom":
                              case "validTo":
                                edits[key] = value && value.toISOString();
                                break;
                              default:
                                break;
                            }
                          }
                        );

                        let promise = Promise.resolve();
                        const photo = this.state.photo;
                        if (photo) {
                          const filename =
                            ~~(Date.now() / 1000) +
                            "_" +
                            (edits.name || promotion.name)
                              .toLowerCase()
                              .replace(/\s/g, "X")
                              .replace(/\W/g, "")
                              .replace(/[X]/g, "-");
                          promise = this.props.client
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
                            );
                        }

                        // do mutation
                        LoadingAlert("Editing Promotion...");
                        promise
                          .then(photoUrl =>
                            editPromotion({
                              variables: {
                                id: promotionId,
                                input: photoUrl
                                  ? Object.assign(edits, {
                                      banner: photoUrl
                                    })
                                  : edits
                              },
                              refetchQueries: [
                                {
                                  query: QUERY_GET_PROMOTION,
                                  variables: {
                                    id: promotionId
                                  }
                                }
                              ]
                            })
                              .then(() => {
                                CloseLoadingAlert();
                                this.setAlert({
                                  message: `Success! ${promotion.name} has been updated!`,
                                  variant: "success"
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
                          });
                      }}
                      className="form-horizontal"
                    >
                      <Card>
                        <CardHeader>
                          <h3>Edit Promotion</h3>
                        </CardHeader>
                        <CardBody>
                          <FormGroup row>
                            <Col md={3}>
                              <Label htmlFor="is-enable">Enable</Label>
                            </Col>
                            <Col xs={12} md={9}>
                              <AppSwitch
                                className={"mx-1"}
                                variant={"pill"}
                                color={"success"}
                                defaultChecked={promotion.isEnable}
                                onChange={e =>
                                  this.setPromotionData({
                                    isEnable: e.target.checked
                                  })
                                }
                              />
                            </Col>
                          </FormGroup>
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
                              <Image
                                fluid
                                src={this.state.photo || promotion.banner}
                                className="mt-3"
                              />
                            </Col>
                          </FormGroup>
                          <TextInput
                            fieldName="Name"
                            defaultValue={promotion.name}
                            onChange={e =>
                              this.setPromotionData({ name: e.target.value })
                            }
                            onBlur={e => {
                              const slug = e.target.value
                                .trim()
                                .toLowerCase()
                                .replace(/\s+/g, "-");
                              document.getElementById(
                                "add-product-slug"
                              ).value = slug;
                              this.setPromotionData({ slug: slug });
                            }}
                          />
                          <TextInput
                            fieldName="Slug"
                            defaultValue={promotion.slug}
                            onChange={e => {
                              this.setPromotionData({ slug: e.target.value });
                            }}
                          />
                          <TextAreaInput
                            fieldName="Description"
                            rows={3}
                            defaultValue={promotion.description}
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
                                <>
                                  <div>
                                    <ToolkitProvider
                                      bootstrap4
                                      keyField="id"
                                      data={data.getProductsDashboard.filter(
                                        e =>
                                          this.state.selectedProducts.includes(
                                            e.id
                                          )
                                      )}
                                      columns={columns}
                                      search
                                    >
                                      {props => (
                                        <div>
                                          <h4>Selected Products</h4>
                                          <SearchBar {...props.searchProps} />
                                          <BootstrapTable
                                            bootstrap4
                                            pagination={paginationFactory(
                                              paginationOption
                                            )}
                                            selectRow={selectRow(false)}
                                            defaultSorted={defaultSorted}
                                            {...props.baseProps}
                                            wrapperClasses="table-responsive"
                                          />
                                        </div>
                                      )}
                                    </ToolkitProvider>
                                  </div>
                                  <div className="mt-3">
                                    <ToolkitProvider
                                      bootstrap4
                                      keyField="id"
                                      data={data.getProductsDashboard.filter(
                                        e =>
                                          !this.state.selectedProducts.includes(
                                            e.id
                                          )
                                      )}
                                      columns={columns}
                                      search
                                    >
                                      {props => (
                                        <div>
                                          <h4>Products</h4>
                                          <SearchBar {...props.searchProps} />
                                          <BootstrapTable
                                            bootstrap4
                                            pagination={paginationFactory(
                                              paginationOption
                                            )}
                                            selectRow={selectRow(true)}
                                            defaultSorted={defaultSorted}
                                            {...props.baseProps}
                                            wrapperClasses="table-responsive"
                                          />
                                        </div>
                                      )}
                                    </ToolkitProvider>
                                  </div>
                                </>
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
                  </React.Fragment>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(EditPromotion);
