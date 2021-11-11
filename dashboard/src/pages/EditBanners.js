import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import {Query, withApollo} from "react-apollo";
import Swal from "sweetalert2";
import BannerPreview from "../components/BannerPreview";
import Toast from "../components/Toast";
import {BANNER_LOCATION} from "../data/constants";
import {QUERY_GET_BANNER, MUTATION_UPDATE_BANNER_IMAGE} from "../gql/banner";
import {MUTATION_PHOTO_UPLOAD_TOKEN} from "../gql/photo";
import uploadPhoto from "../library/uploadfoto";
import showTransformationsPhoto from "../library/showTransformationsPhoto";

class EditBannerContent extends React.Component {
  state = {
    currentLocation: Object.keys(this.props.locations)[0]
  };

  render() {
    const locationKeys = Object.keys(this.props.locations);
    const {locations} = this.props;
    const {currentLocation} = this.state;
    const onUploadPhotoDone = (photo, version, id) => {
      const {type, base64} = photo;
      if (!type.startsWith("image/")) {
        Toast.fire({
          type: "error",
          title: "Uploaded file is not an image"
        });
        return;
      }
      Swal.fire({
        title: `Preview for new ${version} banner`,
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
            ~~(Date.now() / 1000) + "_" + currentLocation + "_" + version;
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
              "/Banners/"
            ).then(photoUrl =>
              this.props.client
              .mutate({
                mutation: MUTATION_UPDATE_BANNER_IMAGE,
                variables: {
                  id,
                  image: photoUrl
                },
                refetchQueries: [
                  {
                    query: QUERY_GET_BANNER,
                    variables: {
                      location:
                        locations[currentLocation][version.toLowerCase()]
                    }
                  }
                ]
              })
              .then(() => {
                Toast.fire({
                  type: "success",
                  title: "Banner successfully updated"
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
        <div className="text-right mb-2">
          Choose banner location to be changed:{" "}
          <select
            onChange={e => this.setState({currentLocation: e.target.value})}
          >
            {locationKeys.map(location => (
              <option key={location} value={location}>
                {location.split("-").join(" ")}
              </option>
            ))}
          </select>
        </div>
        {["Desktop", "Mobile"].map(version => (
          <Query
            key={version}
            query={QUERY_GET_BANNER}
            variables={{
              location: locations[currentLocation][version.toLowerCase()]
            }}
          >
            {({loading, error, data}) =>
              loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <BannerPreview
                  version={version}
                  src={showTransformationsPhoto(500, 500, data.getBanner.image)}
                  onDone={photo =>
                    onUploadPhotoDone(
                      photo,
                      version.toLowerCase(),
                      data.getBanner.id
                    )
                  }
                />
              )
            }
          </Query>
        ))}
      </React.Fragment>
    );
  }
}

const EditBanners = props => (
  <React.Fragment>
    <h2 className="mb-0">Banners</h2>
    <Tabs defaultActiveKey={0} id="uncontrolled-tab">
      <Tab eventKey={0} title="Title Banners">
        <EditBannerContent locations={BANNER_LOCATION["titles"]} {...props} />
      </Tab>
      <Tab eventKey={1} title="Product List Banners">
        <EditBannerContent
          locations={BANNER_LOCATION["product list"]}
          {...props}
        />
      </Tab>
    </Tabs>
  </React.Fragment>
);

export default withApollo(EditBanners);
