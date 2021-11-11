import React from "react";
import { Button, FormText } from "react-bootstrap";
import { withApollo } from "react-apollo";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";
import AddProductPhotoModal from "./AddProductPhotoModal";
import {
  MUTATION_UPDATE_PHOTO_CAPTION,
  MUTATION_DELETE_PHOTO,
  MUTATION_SET_RANK_TO_ZERO,
  MUTATION_UPDATE_RANK_BY_URL
} from "../gql/photo";

import "./EditProductPhotoFragment.css";
import {
  MUTATION_ADD_PRODUCT_REVIEW,
  MUTATION_SET_PRODUCT_REVIEWS_STATUS
} from "../gql/product-review";
import showTransformationsPhoto from "../library/showTransformationsPhoto";
import { MUTATION_DELETE_DOCUMENT } from "../gql/elasticsearch";

class EditProductPhotoFragment extends React.Component {
  state = {
    selectedPhotos: [],
    isModalOpen: false
  };
  setThumbnail = (productDetail) => {
    this.props.client.mutate({
      mutation: MUTATION_SET_RANK_TO_ZERO,
      variables: {
        productId: productDetail.id
      }
    }).then(() => {
      this.props.client.mutate({
        mutation: MUTATION_UPDATE_RANK_BY_URL,
        variables: {
          url: this.state.selectedPhotos[0].url,
          rank: 1
        },
        refetchQueries: [this.props.query]
      });
    });
  };
  deleteSelectedPhotos = () => {
    Swal.fire({
      title: `Delete all selected photos?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!"
    }).then(result => {
      if (result.value) {
        let promises = [
          this.props.client
            .mutate({
              mutation: MUTATION_ADD_PRODUCT_REVIEW,
              variables: {
                productId: this.props.productId
              }
            })
            .then(() => {
              this.props.client.mutate({
                mutation: MUTATION_DELETE_DOCUMENT,
                variables: {
                  id: this.props.productDetail.id
                }
              });
              this.props.client.mutate({
                mutation: MUTATION_SET_PRODUCT_REVIEWS_STATUS,
                variables: {
                  status: false,
                  productId: this.props.productId
                }
              });
            })
        ];
        this.state.selectedPhotos.forEach(photo =>
          promises.push(
            this.props.client.mutate({
              mutation: MUTATION_DELETE_PHOTO,
              variables: {
                productId: this.props.productId,
                url: photo.url
              },
              refetchQueries: [this.props.query]
            })
          )
        );
        Promise.all(promises)
          .then(() => {
            this.setState({ selectedPhotos: [] });
            this.props.setAlert({
              message: "Photos have been successfully deleted",
              variant: "success"
            });
          })
          .catch(error =>
            Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 1500
            }).fire({ type: "error", title: error.message || error })
          );
      }
    });
  };

  render() {
    const productDetail = this.props.productDetail;
    const Toast = this.props.toast;
    return (
      <div>
        <div className="mb-1 d-flex justify-content-between">
          <Button onClick={() => this.setState({ isModalOpen: true })}>
            <i className="icon-plus new"/> Add New Photos
          </Button>
          {this.state.selectedPhotos.length === 0 ? null : (
            <Button
              variant="danger"
              onClick={() => this.deleteSelectedPhotos()}
            >
              <i className="icon-trash"/> Delete Selected Photos
            </Button>
          )}
          {this.state.selectedPhotos.length !== 1 ? null : (
            <Button
              variant="primary"
              onClick={() => {
                this.setThumbnail(productDetail);
              }}
            >
              Set As Thumbnail
            </Button>
          )}
        </div>
        {productDetail.photos.length === 0 ? (
          <div
            className="text-center cursor-pointer"
            color="muted"
            onClick={() => this.setState({ isModalOpen: true })}
          >
            {productDetail.name} has no photo. Add now!
          </div>
        ) : (
          <React.Fragment>
            <FormText color="muted">
              Double click caption to edit, enter to save. Select photo(s) to
              delete.
            </FormText>
            <BootstrapTable
              selectRow={{
                mode: "checkbox",
                clickToSelect: true,
                hideSelectAll: false,
                clickToEdit: true,
                onSelect: (row, isSelect) =>
                  this.setState({
                    selectedPhotos: isSelect
                      ? this.state.selectedPhotos.concat([row])
                      : this.state.selectedPhotos.filter(
                        el => el.url !== row.url
                      )
                  }),
                onSelectAll: (isSelect, rows) => {
                  this.setState({
                    selectedPhotos: isSelect ? rows : []
                  });
                }
              }}
              cellEdit={cellEditFactory({
                mode: "dbclick",
                blurToSave: false,
                beforeSaveCell: (oldValue, newValue, row, column, done) => {
                  if (
                    column.dataField !== "caption" ||
                    oldValue === newValue ||
                    newValue === ""
                  )
                    return;
                  this.props.client
                    .mutate({
                      mutation: MUTATION_UPDATE_PHOTO_CAPTION,
                      variables: {
                        productId: this.props.productId,
                        url: row.url,
                        newCaption: newValue
                      },
                      refetchQueries: [this.props.query]
                    })
                    .then(() => {
                      Toast.fire({
                        type: "success",
                        title: `Caption is updated`
                      });
                      done();
                    });
                }
              })}
              keyField="url"
              data={productDetail.photos}
              columns={[
                {
                  dataField: "url",
                  text: "Photo",
                  headerClasses: "edit-product-photo-column",
                  classes: "edit-product-photo-cell",
                  formatter: (cell, row) => {
                    return (
                      <a
                        href="/#"
                        onClick={e => {
                          e.preventDefault();
                          console.log(cell);
                          fetch(cell).then(response => {
                            response.blob().then(blob => {
                              let url = window.URL.createObjectURL(blob);
                              let a = document.createElement("a");
                              a.href = url;
                              a.download = row.caption;
                              a.click();
                            });
                          });
                        }}
                      >
                        <img src={showTransformationsPhoto(500, 500, cell)}
                             alt={row.caption}/>
                      </a>
                    );
                  },
                  editable: false
                },
                {
                  dataField: "caption",
                  text: "Caption",
                  headerClasses: "edit-product-caption-column"
                }
              ]}
            />
          </React.Fragment>
        )}
        <AddProductPhotoModal
          productId={this.props.productId}
          productName={productDetail.name}
          show={this.state.isModalOpen}
          onHide={() => this.setState({ isModalOpen: false })}
          query={this.props.query}
          setAlert={this.props.setAlert}
          toast={Toast}
        />
      </div>
    );
  }
}

export default withApollo(EditProductPhotoFragment);
