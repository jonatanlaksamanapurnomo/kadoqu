import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import {Query, withApollo} from "react-apollo";
import {Col, Row} from "react-bootstrap";
import Swal from "sweetalert2";
import Toast from "../components/Toast";
import BannerPreview from "../components/BannerPreview";
import {
  QUERY_GET_GIFT_CATEGORIES_BANNERS,
  MUTATION_UPDATE_GIFT_CATEGORY_BANNER
} from "../gql/category";
import {
  QUERY_GET_STORE_CATEGORIES_BANNERS,
  MUTATION_UPDATE_STORE_CATEGORY_BANNER
} from "../gql/store-category";
import {MUTATION_PHOTO_UPLOAD_TOKEN} from "../gql/photo";
import uploadPhoto from "../library/uploadfoto";
import showTransformationsPhoto from "../library/showTransformationsPhoto";

class EditCategoryBanners extends React.Component {
  state = {
    isGiftCategory: true,
    activeCategory: null
  };
  setActiveCategory = value => {
    this.setState({
      activeCategory: value
    });
  };

  render() {
    const query = {
      query: this.state.isGiftCategory
        ? QUERY_GET_GIFT_CATEGORIES_BANNERS
        : QUERY_GET_STORE_CATEGORIES_BANNERS
    };
    const onUploadPhotoDone = (photo, version, category) => {
      const {type, base64} = photo;
      if (!type.startsWith("image/")) {
        Toast.fire({
          type: "error",
          title: "Uploaded file is not an image"
        });
        return;
      }
      Swal.fire({
        title: `Preview for new ${version.toLowerCase()} banner`,
        imageUrl: base64,
        imageAlt: "Preview",
        reverseButtons: true,
        confirmButtonText: "Upload",
        showCancelButton: true,
        cancelButtonText: "Cancel"
      }).then(result => {
        if (result.value) {
          document.body.classList.add("waiting");
          const filename =
            ~~(Date.now() / 1000) +
            "_" +
            category.name.toLowerCase().replace(/[\W]/g, "_");
          return this.props.client
          .mutate({
            mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
            variables: {filename: filename}
          })
          .then(({data}) =>
            uploadPhoto(
              data.createUploadToken.hash,
              base64.split(",")[1],
              filename,
              data.createUploadToken.timestamp,
              `/${
                this.state.isGiftCategory
                  ? "Kadoqu_Gift"
                  : "1001_Inspirasi_Kado"
              }/${version.slice(0, 3).toUpperCase()}/`
            ).then(photoUrl =>
              this.props.client
              .mutate({
                mutation: this.state.isGiftCategory
                  ? MUTATION_UPDATE_GIFT_CATEGORY_BANNER
                  : MUTATION_UPDATE_STORE_CATEGORY_BANNER,
                variables: {
                  id: category.id,
                  bannerType: version,
                  image: photoUrl
                },
                refetchQueries: [query]
              })
              .then(() => {
                Toast.fire({
                  type: "success",
                  title: "Banner successfully updated!!!"
                });
                document.body.classList.remove("waiting");
              })
              .catch(error => {
                document.body.classList.remove("waiting");
                console.log(error.message);
              })
            )
          );
        }
      });
    };
    return (
      <React.Fragment>
        <Query {...query}>
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.message}</p>;
            const categories = this.state.isGiftCategory
              ? data.getParentCategories
              : data.getStoreCategories;
            const activeCategory = categories.find(
              ({id}) => id === this.state.activeCategory
            );
            return (
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <h2 className="mb-0">
                    Banners
                    of {this.state.isGiftCategory ? "Gift" : "Store"}{" "}
                    Category
                  </h2>
                  <small
                    className="text-primary cursor-pointer"
                    onClick={() =>
                      this.setState({
                        isGiftCategory: !this.state.isGiftCategory,
                        activeCategory: null
                      })
                    }
                  >
                    Switch
                    to {this.state.isGiftCategory ? "store" : "gift"}{" "}
                    category
                  </small>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs={12} md={12} lg={3}
                         className="bg-light text-muted py-3">
                      {categories.map(category => (
                        <React.Fragment key={category.id}>
                          <div
                            className={
                              "mt-3 " +
                              ((activeCategory || {}).name !== category.name
                                ? "cursor-pointer"
                                : "font-weight-bold text-dark")
                            }
                            onClick={() => this.setActiveCategory(category.id)}
                          >
                            {category.name}
                          </div>
                        </React.Fragment>
                      ))}
                    </Col>
                    <Col xs={12} md={12} lg={3}>
                      <div className="d-flex justify-content-between mb-2">
                        <h3>{(activeCategory || {}).name}</h3>
                      </div>
                      {!this.state.activeCategory ? (
                        "Please choose a category..."
                      ) : (
                        <React.Fragment>
                          <Col xs={12} md={12} lg={3}>
                            <BannerPreview
                              version="Desktop"
                              src={showTransformationsPhoto(500, 500, activeCategory.images.default)}
                              onDone={photo =>
                                onUploadPhotoDone(
                                  photo,
                                  "desktop",
                                  activeCategory
                                )
                              }
                            />
                          </Col>
                          <Col xs={12} md={12} lg={3}>
                            <BannerPreview
                              version="Mobile"
                              src={showTransformationsPhoto(500, 500, activeCategory.images.wide)}
                              onDone={photo =>
                                onUploadPhotoDone(photo, "mobile", activeCategory)
                              }
                            />
                          </Col>
                        </React.Fragment>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withApollo(EditCategoryBanners);
