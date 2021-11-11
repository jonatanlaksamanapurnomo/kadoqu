import React, {Fragment, Component} from "react";
import {Helmet} from "react-helmet";
import {Col, Container, Row, Image, Button} from "react-bootstrap";
import MediaQuery from "react-responsive";
import { withApollo, Query } from "react-apollo";

import NavLink from "../components/NavLink";
import GalleryItem from "../components/GalleryItem";
import PaginationButtons from "../components/PaginationButtons";
import {MIN_DESKTOP_SIZE} from "../data/constants";
import IMAGES from "../data/images";
//import { numericToCurrency } from "../utils/formatter";
import {
  QUERY_GET_TESTIMONY_CATEGORIES,
  QUERY_GET_TESTIMONIES
} from "../gql/testimony";

import "./Gallery.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "",
      offset: 0,
      activeItem: {},
      categories: [],
      isEndReached: false,
      prevYPosition: 0
    };
  }

  componentDidMount = () => {
    this.props.client
      .query({
        query: QUERY_GET_TESTIMONY_CATEGORIES
      })
      .then(({data}) => {
        this.setState({categories: data.getTestimonyCategories});
      });
  };

  backToTop = () => {
    document.getElementsByClassName("gallery-container")[0] &&
    window.scrollTo(
      0,
      document.getElementsByClassName("gallery-container")[0].offsetTop
    );
  };

  loadMore = () => {
    this.setState(oldState => ({
      offset: oldState.offset + 1,
      activeItem: {}
    }));
  };

  changeCategory = newCategory => {
    document
      .getElementById("gallery-items-container")
      .classList.replace("opacity-1", "opacity-0");
    this.setState({isEndReached: false});
    setTimeout(() => {
      this.setState(
        {
          currentCategory: newCategory,
          offset: 0,
          activeItem: {}
        },
        () =>
          document.getElementById("gallery-items-container") &&
          document
            .getElementById("gallery-items-container")
            .classList.replace("opacity-0", "opacity-1")
      );
    }, 400);
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Kadoqu.com | Gallery</title>
        </Helmet>
        <Image
          className="kids-party-banner"
          fluid
          src="https://ik.imagekit.io/nwiq66cx3pvsy/Banners/gallery_desktop.png"
          alt="Gallery Banner"
        />
        {/* <TitleBanner className="shadow" route="gallery" /> */}
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => (
            <MediaQuery minWidth={768}>
              {isTablet => {
                const itemsPerRow = isDesktop ? 4 : isTablet ? 3 : 2;
                const itemsPerBatch = 4 * itemsPerRow;
                let trianglePosition;
                switch (this.state.activeItem.index % itemsPerRow) {
                  case 0:
                    trianglePosition = 11;
                    break;
                  case 1:
                    trianglePosition = 37;
                    break;
                  case 2:
                    trianglePosition = 62;
                    break;
                  case 3:
                    trianglePosition = 88;
                    break;
                  default:
                    break;
                }
                const activeItem = this.state.activeItem.item;
                if (!isDesktop && activeItem) {
                  this.backToTop();
                  return (
                    <div className="gallery-details-mob-container">
                      <img
                        src={activeItem.image}
                        alt={activeItem.name}
                        className="w-100"
                      />
                      <h3>{activeItem.name}</h3>
                      {activeItem.shortDescription && (
                        <span>
                          ({activeItem.shortDescription})
                          <br/>
                        </span>
                      )}
                      <br/>
                      Testimoni: {activeItem.testimony}
                      <div>
                        <Button
                          className="kadoqu-primary-button"
                          onClick={() => {
                            this.setState({activeItem: {}}, () =>
                              window.scrollTo(0, this.state.prevYPosition)
                            );
                            document.getElementsByClassName(
                              "footer-mobile-container"
                            )[0] &&
                            document
                              .getElementsByClassName(
                                "footer-mobile-container"
                              )[0]
                              .classList.remove("d-none");
                            document.body.style.backgroundImage =
                              "-webkit-linear-gradient(172deg, #d1eff7 0%, #d1eff7 50%, #f9f9f9 50%, #f9f9f9 50%)";
                          }}
                        >
                          Kembali
                        </Button>
                      </div>
                    </div>
                  );
                }
                return (
                  <Container className="gallery-container" fluid>
                    {isDesktop && (
                      <div className="font-weight-light">
                        <p>
                          <NavLink href="/" className="d-inline p-0 text-dark">
                            <span className="fas fa-home pr-2"/>
                            Home
                          </NavLink>{" "}
                          > Gallery
                        </p>
                      </div>
                    )}
                    <div
                      className="gallery-menu-container d-flex justify-content-center mb-4">
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <Button
                            onClick={() => this.changeCategory("")}
                            className={
                              "gallery-category-btn" +
                              (this.state.currentCategory === ""
                                ? " active"
                                : "")
                            }
                          >
                            All Gift
                          </Button>
                        </li>

                        {this.state.categories.map((category, idx) => (
                          <li key={idx} className="list-inline-item">
                            <Button
                              onClick={() => this.changeCategory(category)}
                              className={
                                "gallery-category-btn" +
                                (this.state.currentCategory === category
                                  ? " active"
                                  : "")
                              }
                            >
                              {category}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Query
                      query={QUERY_GET_TESTIMONIES}
                      variables={{
                        limit: isDesktop
                          ? (this.state.offset + 1) * 16
                          : 4 * itemsPerRow,
                        offset:
                          this.state.offset *
                          (isDesktop ? 0 : isTablet ? 12 : 8),
                        category: this.state.currentCategory
                      }}
                    >
                      {({loading, error, data, fetchMore}) =>
                        loading ? (
                          <div className="text-center">Loading...</div>
                        ) : error ? (
                          <div className="text-center">
                            Error! {error.message || error}
                          </div>
                        ) : (
                          <React.Fragment>
                            <Row
                              id="gallery-items-container"
                              className="opacity-1"
                            >
                              {data.getTestimonies.map((item, idx) => (
                                <React.Fragment key={idx}>
                                  <Col
                                    xs={12 / itemsPerRow}
                                    className={`mb-${isDesktop ? 4 : 3}`}
                                    onClick={() => {
                                      this.setState({
                                        activeItem:
                                          this.state.activeItem.index === idx
                                            ? {}
                                            : {index: idx, item: item},
                                        prevYPosition: window.scrollY
                                      });
                                      if (!isDesktop) {
                                        document.getElementsByClassName(
                                          "footer-mobile-container"
                                        )[0] &&
                                        document
                                          .getElementsByClassName(
                                            "footer-mobile-container"
                                          )[0]
                                          .classList.add("d-none");
                                        document.body.style.backgroundImage =
                                          "none";
                                        document.body.style.backgroundColor =
                                          "white";
                                      }
                                    }}
                                  >
                                    <GalleryItem
                                      className={
                                        "cursor-pointer" +
                                        (this.state.activeItem.index === idx
                                          ? " active"
                                          : "")
                                      }
                                      src={item.image}
                                      alt={item.name}
                                      testimony={item.testimony}
                                    />
                                  </Col>
                                  {isDesktop &&
                                  ((idx + 1) % itemsPerRow === 0 ||
                                    idx + 1 === data.getTestimonies.length) &&
                                  this.state.activeItem.index !== undefined &&
                                  (this.state.activeItem.index < idx + 1 &&
                                    this.state.activeItem.index >=
                                    (Math.floor(idx / 4) + 1) * 4 -
                                    itemsPerRow) && (
                                    <Col
                                      xs={12}
                                      className="position-relative"
                                    >
                                      <div
                                        className="gallery-testimony-popover-triangle"
                                        style={{
                                          left: `${trianglePosition}%`
                                        }}
                                      />
                                      <div
                                        className="gallery-testimony-popover shadow mb-4">
                                        <img
                                          src={activeItem.image}
                                          alt={activeItem.name}
                                        />
                                        <div className="font-weight-light">
                                          <h3>{activeItem.name}</h3>
                                          {activeItem.shortDescription && (
                                            <span>
                                                ({activeItem.shortDescription})
                                                <br/>
                                              </span>
                                          )}
                                          <br/>
                                          Testimoni: {activeItem.testimony}
                                        </div>
                                      </div>
                                    </Col>
                                  )}
                                </React.Fragment>
                              ))}
                            </Row>
                            <div className="d-flex justify-content-center">
                              {isDesktop ? (
                                <button
                                  onClick={() => {
                                    if (
                                      data.getTestimonies.length %
                                      itemsPerBatch !==
                                      0 ||
                                      this.state.isEndReached
                                    ) {
                                      this.backToTop();
                                      return;
                                    }
                                    fetchMore({
                                      variables: {
                                        offset: data.getTestimonies.length
                                      },
                                      updateQuery: (
                                        prev,
                                        {fetchMoreResult}
                                      ) => {
                                        if (!fetchMoreResult) return prev;
                                        if (
                                          fetchMoreResult.getTestimonies
                                            .length %
                                          16 !==
                                          0 ||
                                          fetchMoreResult.getTestimonies
                                            .length === 0
                                        ) {
                                          this.setState({
                                            isEndReached: true
                                          });
                                        }
                                        return Object.assign({}, prev, {
                                          getTestimonies: [
                                            ...prev.getTestimonies,
                                            ...fetchMoreResult.getTestimonies
                                          ]
                                        });
                                      }
                                    });
                                  }}
                                  className="kadoqu-primary-button long gallery-btn"
                                >
                                  {!(
                                    data.getTestimonies.length %
                                    itemsPerBatch !==
                                    0 || this.state.isEndReached
                                  )
                                    ? "Lihat yang lain"
                                    : "Kembali ke atas"}
                                </button>
                              ) : (
                                <PaginationButtons
                                  currentPage={this.state.offset + 1}
                                  setPage={newPage => {
                                    this.setState({offset: newPage - 1});
                                    this.backToTop();
                                  }}
                                  itemsLength={data.getTestimoniesLength}
                                  limitPerPage={itemsPerBatch}
                                />
                              )}
                            </div>
                          </React.Fragment>
                        )
                      }
                    </Query>
                    <div className="gallery-footer">
                      <Image
                        className="w-100"
                        src={IMAGES["Gallery Page"]["bottom-banner"]}
                      />
                      <Col
                        xs={{offset: 6, span: 6}}
                        className="gallery-footer-content"
                      >
                        <div>
                          <h3>
                            Mau kado kamu <br/> sebagus & sespesial <br/>{" "}
                            kado-kado di atas?
                          </h3>
                          <span>Yuk, tanya GIdA sekarang!</span>
                          <NavLink className="p-0" href="/gida">
                            <Button className="kadoqu-primary-button">
                              Tanya GIdA
                            </Button>
                          </NavLink>
                        </div>
                      </Col>
                    </div>
                  </Container>
                );
              }}
            </MediaQuery>
          )}
        </MediaQuery>
      </Fragment>
    );
  }
}

export default withApollo(Gallery);
