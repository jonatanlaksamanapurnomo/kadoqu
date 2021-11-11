import React from "react";
import {Tab, Tabs, Button, Modal, Carousel} from "react-bootstrap";
import {withApollo} from "react-apollo";
import FileBase64 from "react-file-base64";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {
  QUERY_GET_BANNERS,
  MUTATION_DELETE_BANNER,
  MUTATION_UPDATE_BANNER_RANK,
  MUTATION_ADD_BANNER,
  MUTATION_SET_REDIRECT_URL_BANNER
} from "../gql/banner";
import Toast from "../components/Toast";
import {BANNER_LOCATION} from "../data/constants";
import {MUTATION_PHOTO_UPLOAD_TOKEN} from "../gql/photo";
import uploadPhoto from "../library/uploadfoto";
import showTransformationsPhoto from "../library/showTransformationsPhoto";
import Swal from "sweetalert2";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the bannerCandidates look a bit nicer
  userSelect: "none",
  margin: `0 ${grid}px 0 0`,
  height: "100%",
  border: isDragging ? "none" : "1px solid lightgrey",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "pink" : "mistyrose",
  padding: grid,
  height: "9rem",
  display: "flex",
  overflow: "auto"
});

class DraggingArea extends React.Component {
  state = {
    toBeRemoved: [],
    toBeSaved: []
  };

  fetchSavedCarouselState = () => {
    const {client} = this.props;
    client
      .query({
        query: QUERY_GET_BANNERS,
        variables: {location: this.props.location}
      })
      .then(({data}) => this.setState({toBeSaved: data.getBanners}))
      .catch(error =>
        Toast.fire({type: "error", title: error.message || error})
      );
  };

  componentDidMount = () => {
    this.fetchSavedCarouselState();
  };

  componentDidUpdate = () => {
    if (this.props.resetList) {
      this.setState({toBeRemoved: []});
      this.fetchSavedCarouselState();
      this.props.deactivateListReset();
    }
  };

  id2List = {
    toBeRemovedItems: "toBeRemoved",
    toBeSavedItems: "toBeSaved"
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const toBeRemoved = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = {toBeRemoved};

      if (source.droppableId === "toBeSavedItems") {
        state = {toBeSaved: toBeRemoved};
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        toBeRemoved: result.toBeRemovedItems,
        toBeSaved: result.toBeSavedItems
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <h4 className="text-info d-inline">Upload new banners here:</h4>{" "}
          <FileBase64
            className="form-control"
            multiple={true}
            onDone={photos => {
              console.log(photos);
              const {toBeRemoved} = this.state;
              const inputPhotos = [];
              photos.forEach(photo => {
                if (photo.type.startsWith("image/")) {
                  inputPhotos.push({
                    image: photo.base64
                  });
                }
              });
              const newPhotos = toBeRemoved.concat(inputPhotos);
              this.setState({
                toBeRemoved: newPhotos
              });
            }}
            accept="image/*"
          />
          <div className="text-muted">
            Uploaded photos would appear here; you can also put unwanted banners
            here to be removed
          </div>
          <Droppable droppableId="toBeRemovedItems" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {this.state.toBeRemoved.map(({image}, index) => (
                  <Draggable
                    key={index}
                    draggableId={`item-remove-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <img
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        src={showTransformationsPhoto(1000,1000,image)}
                        alt={index}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <h3 className="text-info text-uppercase mb-0 mt-3">
            To be saved banners
          </h3>
          <Droppable droppableId="toBeSavedItems" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {this.state.toBeSaved.map(({id, image}, index) => (
                  <Draggable
                    key={index}
                    index={index}
                    draggableId={`item-save-${index}`}
                  >
                    {(provided, snapshot) => (
                      <img
                        onClick={() => {
                          Swal.fire({
                            title: 'Enter Your URL to this Banner Image',
                            input: 'url',
                            inputAttributes: {
                              autocapitalize: 'off'
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Look up',
                            showLoaderOnConfirm: true,
                            preConfirm: (url) => {
                              return this.props.client.mutate({
                                mutation: MUTATION_SET_REDIRECT_URL_BANNER,
                                variables: {
                                  id: id,
                                  url: url
                                }
                              }).then(res => {
                                if (res.data.setUrlRedirectURL) {
                                  return res;
                                } else {
                                  throw new Error("Url Gagal Di pasang")
                                }
                              })
                            },
                            allowOutsideClick: () => !Swal.isLoading()
                          }).then((result) => {
                            if(!result.dismiss){
                              if (result.value.data.setUrlRedirectURL) {
                                Swal.fire({
                                  title: "URL Berhasil di pasang"
                                })
                              }
                            }
                          });
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        src={showTransformationsPhoto(1000, 1000, image)}
                        alt={index}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          block
          variant="success"
          className="mt-3"
          onClick={() => {
            const {openPreview, location} = this.props;
            const {toBeRemoved, toBeSaved} = this.state;
            openPreview({
              removedItems: toBeRemoved,
              savedItems: toBeSaved,
              location
            });
          }}
        >
          Save
        </Button>
      </React.Fragment>
    );
  }
}

class EditCarouselBanners extends React.Component {
  state = {
    isPreviewOpen: false,
    mutationVariables: {},
    resetList: false
  };
  openPreview = variables =>
    this.setState({isPreviewOpen: true, mutationVariables: variables});
  closePreview = () =>
    this.setState({isPreviewOpen: false, mutationVariables: {}});

  saveCarousel = () => {
    const {savedItems, removedItems, location} = this.state.mutationVariables;
    const refetchQueries = [
      {
        query: QUERY_GET_BANNERS,
        variables: {
          location
        }
      }
    ];
    let isEditOccured = false;
    for (let i = 0; i < savedItems.length; i++) {
      if (!savedItems[i].id || savedItems[i].rank !== i) {
        isEditOccured = true;
        break;
      }
    }
    for (let i = 0; i < removedItems.length; i++) {
      if (removedItems[i].id) {
        isEditOccured = true;
        break;
      }
    }
    if (!isEditOccured) {
      Toast.fire({type: "warning", title: "No changes detected"});
      return;
    }
    document.body.classList.add("waiting");
    const deletePromises = removedItems
      .filter(({id}) => id)
      .map(({id}) => {
        return this.props.client.mutate({
          mutation: MUTATION_DELETE_BANNER,
          variables: {
            id: id
          },
          refetchQueries
        });
      });
    const updatePromises = savedItems
      .map(({id}, index) => {
        if (!id) return null;
        return this.props.client.mutate({
          mutation: MUTATION_UPDATE_BANNER_RANK,
          variables: {
            id: id,
            rank: index
          },
          refetchQueries
        });
      })
      .filter(mutation => mutation !== null);
    const createPromises = savedItems
      .map((item, index) => {
        if (item.id) return null;
        const filename = ~~(Date.now() / 1000) + "_" + location + "_" + index;
        return this.props.client
          .mutate({
            mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
            variables: {filename: filename}
          })
          .then(({data}) =>
            uploadPhoto(
              data.createUploadToken.hash,
              item.image.split(",")[1],
              filename,
              data.createUploadToken.timestamp,
              "/Banners/"
            ).then(photoUrl =>
              this.props.client.mutate({
                mutation: MUTATION_ADD_BANNER,
                variables: {
                  image: photoUrl,
                  location,
                  rank: index
                },
                refetchQueries
              })
            )
          );
      })
      .filter(mutation => mutation !== null);

    Promise.all(
      [].concat.apply([], [deletePromises, updatePromises, createPromises])
    )
      .then(() => {
        Toast.fire({type: "success", title: "Carousel successfully saved"});
        this.setState({resetList: true}, this.closePreview);
        document.body.classList.remove("waiting");
      })
      .catch(error => {
        document.body.classList.remove("waiting");
        console.log(error.message);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Tabs defaultActiveKey={0} id="uncontrolled-tab">
          <Tab eventKey={0} title="Landing Page Banners">
            <DraggingArea
              client={this.props.client}
              location={BANNER_LOCATION["carousels"]["home"]}
              openPreview={this.openPreview}
              resetList={this.state.resetList}
              deactivateListReset={() => this.setState({resetList: false})}
            />
          </Tab>
        </Tabs>
        <Modal
          show={this.state.isPreviewOpen}
          onHide={this.closePreview}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel interval={3500} indicators={false}>
              {(this.state.mutationVariables.savedItems || []).map(
                (item, index) => {
                  return (
                    <Carousel.Item key={index} className="w-100">
                      <img alt="" className="d-block w-100"
                           src={showTransformationsPhoto(1000, 1000, item.image)}/>
                    </Carousel.Item>
                  );
                }
              )}
            </Carousel>
            <Button
              block
              variant="success"
              className="mt-3"
              onClick={this.saveCarousel}
            >
              Proceed Save
            </Button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withApollo(EditCarouselBanners);
