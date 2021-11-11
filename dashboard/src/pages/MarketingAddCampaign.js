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
  Label
} from "reactstrap";
import {Mutation, withApollo} from "react-apollo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MultipleSelectionInlineInput,
  TextInput
} from "../components/FormComponents";
import {addDays} from "../utils/dateTimeFormatter";
import {MUTATION_ADD_CAMPAIGN} from "../gql/Marketing";
import {LoadingAlert, CloseLoadingAlert} from "../components/Loader";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import {paginationOption} from "../data/listConstant";
import {
  QUERY_GET_PRODUCTS,
  QUERY_GET_ADMIN_ROLE
} from "../gql/product";
import {QUERY_CAMPAIGNS} from "../gql/Marketing";
import Swal from "sweetalert2";
import {
  QUERY_GET_PRODUCT_BY_MAGICAL_MOMENT_CATEGORY,
  QUERY_GET_CATEGORY

} from "../gql/product-category";

const {SearchBar} = Search;


class MarketingAddCampaign extends React.Component {
  state = {
    allProducts: [],
    selectedProducts: [],
    option: [],
    allCategory: [],
    availableProductByCategory: [],
    input: {
      name: "",
      products: {},
      primaryDiscount: 0,
      secondaryDiscount: 0,
      campaignStart: addDays(new Date(), 0),
      campaignEnd: addDays(new Date(), 7),

    },
    invalidDiscount: false
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }


  setinput = newData => {
    this.setState(Object.assign(this.state.input, newData));
  };

  emptyinput = () => {
    this.setinput({
      name: "",
      campaignStart: addDays(new Date(), 7),
      campaignEnd: addDays(new Date(), 7),
      products: {}
    });
  };


  componentDidMount() {
    this.props.client.query({
      query: QUERY_GET_ADMIN_ROLE
    }).then(admin => {
      let option = [];
      admin.data.getAdminRoleUsers.forEach(adminObj => {
        option.push(adminObj.name);
      });
      this.setState({
        allCategory: option
      });

    });
    this.props.client.query({
      query: QUERY_GET_PRODUCT_BY_MAGICAL_MOMENT_CATEGORY
    }).then(({data}) => {
      let arr = [];
      arr.push(data.getProductBirthdayPackages);
      arr.push(data.getProductCasees);
      arr.push(data.getProductMagicalMoments);
      arr.push(data.getProductCompanyCelebrations);
      arr.push(data.getProductHolidays);
      this.setState({
          availableProductByCategory: arr
        },
        () => {
          // console.log(this.state.availableProductByCategory);
        });
    });
    this.props.client.query({
      query: QUERY_GET_CATEGORY
    }).then(({data}) => {
      let option = [];
      data.getProductCategories.forEach(item => {
        if (item.name !== "Gift") {
          option.push(item.name);
        }
      });
      this.setState({
        option
      });


    });
    this.props.client.query({
      query: QUERY_GET_PRODUCTS
    })
      .then(({data}) => {
        this.setState({
          allProducts: data.getProductsDashboard
        });
      });
  }

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
        text: "Product Name",
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
        text: "Merchant Name",
        editable: false,
        sort: true
      }
    ];
    const defaultSorted = [{dataField: "sku", order: "asc"}];
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      hideSelectAll: false,
      clickToEdit: true,
      onSelect: (row, isSelect) =>
        this.setState({
          selectedProducts: isSelect
            ? this.state.selectedProducts.concat([row])
            : this.state.selectedProducts.filter(el => el.id !== row.id)
        }),
      onSelectAll: (isSelect, rows) => {
        this.setState({
          selectedProducts: isSelect ? rows : []
        });
      }
    };
    return (
      <div className="add-product-form">
        <Mutation mutation={MUTATION_ADD_CAMPAIGN}>
          {(addCampaign, {loading}) => {
            if (loading) {
              LoadingAlert("Loading..");
            } else {
              CloseLoadingAlert();
            }
            return (
              <Form
                action=""
                className="form-horizontal"
                onSubmit={e => {
                  e.preventDefault();
                }}
              >
                <Card>
                  <CardHeader>
                    <h3>Add Campaign</h3>
                  </CardHeader>
                  <CardBody>
                    <TextInput
                      fieldName="Name"
                      onChange={e =>
                        this.setinput({name: e.target.value})
                      }
                    />
                    <FormGroup row>
                      <Col xs={6} md={3}>
                        <Label htmlFor="add-product-new-tag-end-date">
                          Campaign Start
                        </Label>
                      </Col>
                      <Col xs={6} md={3}>
                        <DatePicker
                          name="campaignStart"
                          selected={this.state.input.campaignStart}
                          onChange={e => {
                            this.setinput({
                              campaignStart: e
                            });
                          }}
                          showTimeSelect
                          timeFormat="HH:mm"
                          dateFormat="MMMM d, yyyy h:mm aa"
                        />
                      </Col>
                      <Col xs={6} md={3}>
                        <Label htmlFor="add-product-new-tag-end-date">
                          Campaign End
                        </Label>
                      </Col>
                      <Col xs={6} md={3}>
                        <DatePicker
                          name="campaignEnd"
                          selected={this.state.input.campaignEnd}
                          onChange={e => {
                            this.setinput({
                              campaignEnd: e
                            });
                          }}
                          showTimeSelect
                          timeFormat="HH:mm"
                          dateFormat="MMMM d, yyyy h:mm aa"

                        />
                      </Col>
                    </FormGroup>
                    <TextInput
                      fieldName="Primary Discount"
                      numeric
                      onChange={e =>
                        this.setinput({primaryDiscount: parseInt(e.target.value)})
                      }
                    />
                    <TextInput
                      fieldName="Secondary Discount"
                      numeric
                      onChange={e =>
                        this.setinput({secondaryDiscount: parseInt(e.target.value)})
                      }
                    />
                    <Label>
                      <h3>Products in this Campaign</h3>
                      <small className="text-info">Choose 1 the way you like to
                        select
                        product you can't use checkbox and table in same
                        time</small>
                    </Label>
                    <ToolkitProvider
                      bootstrap4
                      keyField="id"
                      data={this.state.allProducts}
                      columns={columns}
                      search
                    >
                      {props => (
                        <div>

                          <MultipleSelectionInlineInput
                            type="checkbox"
                            onChange={(e) => {
                              let checked = e.target.checked;
                              let value = e.target.value;
                              if (checked === true) {
                                if (value === "Gift") {
                                  this.setState({
                                    selectedProducts: this.myRef.current.props.data.filter(item => !this.state.allCategory.includes(item.merchant))
                                  }, () => {
                                    // console.log(this.state.selectedProducts);

                                  });
                                } else if (value === "Birthday Package") {
                                  let temp = this.state.availableProductByCategory[0];
                                  let arr = [];
                                  temp.forEach(item => {
                                    arr.push(item.product);
                                  });
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.concat(arr)
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Case") {
                                  let temp = this.state.availableProductByCategory[1];
                                  let arr = [];
                                  temp.forEach(item => {
                                    arr.push(item.product);
                                  });
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.concat(arr)
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Magical Moment") {
                                  let temp = this.state.availableProductByCategory[2];
                                  let arr = [];
                                  temp.forEach(item => {
                                    arr.push(item.product);
                                  });
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.concat(arr)
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Company Celebration") {
                                  let temp = this.state.availableProductByCategory[3];
                                  let arr = [];
                                  temp.forEach(item => {
                                    arr.push(item.product);
                                  });
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.concat(arr)
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Holiday") {
                                  let temp = this.state.availableProductByCategory[4];
                                  let arr = [];
                                  temp.forEach(item => {
                                    arr.push(item.product);
                                  });
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.concat(arr)
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                }

                              } else {
                                if (value === "Gift") {
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.filter(item => this.state.allCategory.includes(item.merchant))
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Birthday Package") {
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.filter(item => item.merchant !== "Birthday Package")
                                  }, () => {

                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Case") {
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.filter(item => item.merchant !== "gida")
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Magical Moment") {
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.filter(item => item.merchant !== "kadoquMagicMoment" && item.merchant !== "K2U Party Designer" && item.merchant !== "Magical Moment")
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Company Celebration") {
                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.filter(item => item.merchant !== "Company Celebration")
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                } else if (value === "Holiday") {

                                  this.setState({
                                    selectedProducts: this.state.selectedProducts.filter(item => item.merchant !== "Kadoqu Holiday")
                                  }, () => {
                                    // console.log(this.state.selectedProducts);
                                  });
                                }
                              }
                            }}
                            fieldName="Select All From Merchant"
                            formSize={4}
                            options={this.state.option}
                          />
                          <SearchBar {...props.searchProps} />

                          <BootstrapTable
                            ref={this.myRef}
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
                  </CardBody>
                  <CardFooter>
                    <Button onClick={e => {
                      e.preventDefault();
                      let input = this.state.input;
                      input.products.products = this.state.selectedProducts;
                      addCampaign({
                        variables: {
                          input: input
                        },
                        refetchQueries: [{query: QUERY_CAMPAIGNS}]
                      }).then(() => {
                        Swal.fire(
                          'Sukses Message!',
                          'Event Berhasil di tambahkan!',
                          'success',
                        ).then(() => {
                          this.props.history.push("/marketing/campaign");
                        })
                      });
                    }} type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o"/> Submit
                    </Button>
                    <Button
                      type="reset"
                      size="sm"
                      color="danger"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        this.emptyinput();
                      }}
                    >
                      <i className="fa fa-ban"/> Reset
                    </Button>
                    <small> all i want for christmas
                      is <strike>you</strike> <b>Food</b>
                    </small>
                  </CardFooter>
                </Card>
              </Form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withApollo(MarketingAddCampaign);
