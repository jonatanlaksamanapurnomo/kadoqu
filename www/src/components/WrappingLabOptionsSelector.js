import React, { Component } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Query } from "react-apollo";
import MediaQuery from "react-responsive";
import {
  QUERY_GET_RIBBONS,
  QUERY_GET_WRAPPERS,
  QUERY_GET_WRAPPING_LAB_PROPERTIES
} from "../gql/wrapping-lab";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./WrappingLabOptionsSelector.css";

const ImageContainer = props => (
  <div
    className={
      "wrapping-lab-options-image-container" + (props.selected ? " active" : "")
    }
  >
    {props.children}
  </div>
);

const SelectionItem = ({ item, setState, selected, setItem }) => {
  const { choices, id, name, price, thumbnail, additionalInfo } = item;
  return (
    <div
      className="wrapping-lab-selection"
      onClick={() =>
        choices.length
          ? setState(item)
          : setItem({
              type: {
                id,
                name,
                price,
                thumbnail
              },
              instance: {}
            })
      }
    >
      <ImageContainer selected={selected.type.id === id}>
        {thumbnail === "" ? (
          <div
            className={
              "bg-white d-flex justify-content-center align-items-center" +
              (selected.type.id === -1 ? "" : " border border-dark")
            }
          >
            <i className="text-danger fas fa-times fa-7x" />
          </div>
        ) : (
          <img
            className="w-100 h-100"
            src={
              id === selected.type.id
                ? selected.instance.url || thumbnail
                : thumbnail
            }
            alt={name}
          />
        )}
      </ImageContainer>
      <div className="wrapping-lab-selector-image-name">
        {name}
        {additionalInfo && <div>({additionalInfo})</div>}
      </div>
      <div className="kadoqu-primary-color">Rp {price}</div>
    </div>
  );
};

class DesktopOptionsSelector extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openedWrapper: {},
      openedRibbon: {}
    };
  }

  render() {
    const {
      setWrapper,
      selectedWrapper,
      setRibbon,
      selectedRibbon
    } = this.props;
    const STATE_NAMES = {
      wrapper: "openedWrapper",
      ribbon: "openedRibbon"
    };
    const SelectionModal = ({ property, stateName, setItem, selected }) => {
      const openedItem = this.state[stateName];
      return (
        <Modal
          dialogClassName="wrapping-lab-modal"
          show={typeof openedItem.id !== "undefined"}
          onHide={() => this.setState({ [stateName]: {} })}
          centered
        >
          <Modal.Header>
            <Modal.Title className="text-uppercase kadoqu-primary-color mt-2">
              Pilih {property} - {openedItem.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="d-flex justify-content-center">
              <Row noGutters>
                {openedItem.id &&
                  openedItem.choices.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        "m-2 wrapping-lab-selector-image-clickable" +
                        (selected.instance.id === item.id ? " active" : "")
                      }
                      onClick={() => {
                        const { choices, ...type } = openedItem;
                        setItem({
                          type: type,
                          instance: { ...item }
                        });
                        this.setState({
                          [stateName]: {}
                        });
                      }}
                    >
                      <img
                        className="w-100 h-100"
                        src={item.url}
                        alt={item.name}
                      />
                    </div>
                  ))}
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      );
    };
    return (
      <React.Fragment>
        <div className="wrapping-lab-section-title mb-0">
          Pilih Wrapping{" "}
          <span className="wrapping-lab-selector-disclaimer">
            (Corak wrapping dapat berubah sewaktu-waktu, kontak CS untuk info
            lebih lanjut)
          </span>{" "}
        </div>
        <div className="ml-3">
          <Query query={QUERY_GET_WRAPPERS}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return data.getWrapperTypes.map((wrapperType, idx) => (
                <SelectionItem
                  key={idx}
                  item={wrapperType}
                  setItem={setWrapper}
                  selected={selectedWrapper}
                  setState={item =>
                    this.setState({
                      [STATE_NAMES.wrapper]: item
                    })
                  }
                />
              ));
            }}
          </Query>
        </div>

        <div className="wrapping-lab-section-title mb-0">
          Pilih Pita{" "}
          <span className="wrapping-lab-selector-disclaimer">
            (Bentuk dan warna pita dapat berubah sewaktu-waktu, kontak CS untuk
            info lebih lanjut)
          </span>{" "}
        </div>
        <div className="ml-3">
          <Query query={QUERY_GET_RIBBONS}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return (
                <React.Fragment>
                  <SelectionItem
                    item={{
                      id: -1,
                      name: "Tanpa Pita",
                      price: 0,
                      thumbnail: "",
                      choices: []
                    }}
                    setItem={setRibbon}
                    selected={selectedRibbon}
                    setState={item =>
                      this.setState({
                        [STATE_NAMES.ribbon]: item
                      })
                    }
                  />
                  {data.getRibbonTypes.map((ribbonType, idx) => (
                    <SelectionItem
                      key={idx}
                      item={ribbonType}
                      setItem={setRibbon}
                      selected={selectedRibbon}
                      setState={item =>
                        this.setState({
                          [STATE_NAMES.ribbon]: item
                        })
                      }
                    />
                  ))}
                </React.Fragment>
              );
            }}
          </Query>
        </div>

        <SelectionModal
          property="Wrapping"
          stateName={STATE_NAMES.wrapper}
          setItem={setWrapper}
          selected={selectedWrapper}
        />

        <SelectionModal
          property="Pita"
          stateName={STATE_NAMES.ribbon}
          setItem={setRibbon}
          selected={selectedRibbon}
        />
      </React.Fragment>
    );
  }
}

const MobileVariantSelection = ({
  property,
  selected,
  data,
  setItem,
  setMobilePage,
  goBack
}) => {
  return (
    <div>
      <div className="wrapping-lab-option-selector-mobile-title-container">
        <i
          onClick={goBack}
          className="fas fa-chevron-left kadoqu-primary-color cursor-pointer mr-2"
        />
        Pilih {property}
      </div>
      <Container fluid className="wrapping-lab-option-selector-mobile-variants">
        <Row noGutters>
          {data.map((item, idx) => (
            <Col xs={4} md={3} key={idx}>
              <div
                className={
                  "my-2 wrapping-lab-selector-image-clickable" +
                  (selected.instance.id === item.id ? " active" : "")
                }
                onClick={() => {
                  setItem(item);
                  setMobilePage();
                }}
              >
                <img src={item.url} alt={item.name} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const MobileTypeSelection = ({
  property,
  selected,
  data,
  setItem,
  setMobilePage,
  goBack
}) => {
  return (
    <div>
      <div className="wrapping-lab-option-selector-mobile-title-container">
        <i
          onClick={goBack}
          className="fas fa-chevron-left kadoqu-primary-color cursor-pointer mr-2"
        />
        Pilih {property}
      </div>
      <Container fluid className="wrapping-lab-option-selector-mobile-content">
        {!data ? (
          "Loading..."
        ) : (
          <Row>
            {data.map((item, idx) => (
              <Col xs={6} md={4} key={idx}>
                <SelectionItem
                  item={item}
                  setItem={item => {
                    setItem(item);
                    setMobilePage();
                  }}
                  selected={selected}
                  setState={item => {
                    setMobilePage(
                      <MobileVariantSelection
                        property={property === "Wrapping" ? "Corak" : "Warna"}
                        selected={selected}
                        data={item.choices}
                        setItem={instance => {
                          const { choices, ...type } = item;
                          setItem({
                            type,
                            instance
                          });
                        }}
                        setMobilePage={setMobilePage}
                        goBack={goBack}
                      />
                    );
                  }}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

const MobileOptionsSelector = props => {
  const {
    selectedWrapper,
    setWrapper,
    selectedRibbon,
    setRibbon,
    setMobilePage,
    goBack
  } = props;
  const SelectionButton = ({ property, selected, defaultImage, onClick }) => (
    <div
      className="wrapping-lab-option-selector-mobile-container kadoqu-image-button"
      onClick={onClick}
    >
      <div className="wrapping-lab-option-selector-mobile-layer" />
      <div className="wrapping-lab-option-selector-mobile-text">
        {!selected.type.id ? (
          <span className="text-uppercase">
            Pilih
            <br />
            {property}
          </span>
        ) : (
          <React.Fragment>
            {selected.type.name}
            <br />
            <span className="kadoqu-primary-color">
              Rp {selected.type.price}
            </span>
          </React.Fragment>
        )}
      </div>
      {!defaultImage ? (
        <span className="mr-2">Loading...</span>
      ) : selected.type.id === -1 ? null : (
        <img
          alt={property}
          src={
            selected.type.id
              ? selected.instance.url || selected.type.thumbnail
              : defaultImage
          }
        />
      )}
    </div>
  );
  return (
    <Query query={QUERY_GET_WRAPPING_LAB_PROPERTIES}>
      {({ loading, error, data }) => (
        <React.Fragment>
          <SelectionButton
            property="wrapping"
            selected={selectedWrapper}
            defaultImage={
              loading || error ? null : data.getWrapperTypes[0].thumbnail
            }
            onClick={() =>
              setMobilePage(
                <MobileTypeSelection
                  property="Wrapping"
                  selected={selectedWrapper}
                  data={loading || error ? null : data.getWrapperTypes}
                  setItem={setWrapper}
                  setMobilePage={setMobilePage}
                  goBack={goBack}
                />
              )
            }
          />
          <SelectionButton
            property="pita"
            selected={selectedRibbon}
            defaultImage={
              loading || error ? null : data.getRibbonTypes[0].thumbnail
            }
            onClick={() =>
              setMobilePage(
                <MobileTypeSelection
                  property="Pita"
                  selected={selectedRibbon}
                  data={
                    loading || error
                      ? null
                      : [
                          {
                            id: -1,
                            name: "Tanpa Pita",
                            price: 0,
                            thumbnail: "",
                            choices: []
                          }
                        ].concat(data.getRibbonTypes)
                  }
                  setItem={setRibbon}
                  setMobilePage={setMobilePage}
                  goBack={goBack}
                />
              )
            }
          />
        </React.Fragment>
      )}
    </Query>
  );
};

const WrappingLabOptionsSelector = props => (
  <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
    {isDesktop =>
      isDesktop ? (
        <DesktopOptionsSelector {...props} />
      ) : (
        <MobileOptionsSelector {...props} />
      )
    }
  </MediaQuery>
);

export default WrappingLabOptionsSelector;
