import React from "react";
import Slider from "rc-slider";
import { Button, Form, Col, Row, Tab, Nav, Container } from "react-bootstrap";
import { validateNumeric } from "../utils/regexInputConverter";
import { numericToCurrency } from "../utils/formatter";

import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./ProductFilter.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const ProductFilterChoice = props => (
  <Form.Group>
    {props.choices.map(option => {
      return (
        <Form.Check
          custom
          value={option}
          key={option}
          label={option}
          name={props.groupTitle}
          type="checkbox"
          className="kadoqu-checkbox-button product-filter-mob-choice"
          checked={props.values.has(option)}
          id={
            "product-filter-choice-" +
            props.groupTitle +
            "-" +
            option
              .toLowerCase()
              .split(" ")
              .join("-")
          }
          onChange={e =>
            props.updateAppliedFilter(
              props.groupTitle,
              option,
              e.target.checked
            )
          }
        />
      );
    })}
  </Form.Group>
);

const ProductFilterMob = props => {
  const onClickCheckboxes = (filterType, changedChoice, isChecked) => {
    let applied = props.applied;
    console.log(applied);
    if (isChecked) {
      applied[filterType].add(changedChoice);
    } else {
      applied[filterType].delete(changedChoice);
    }
    props.setFilter(applied);
  };

  const hideFilterPane = () => {
    document
      .getElementById("product-list-banner-mob")
      .classList.remove("d-none");
    document.getElementById("filternav").style.width = "0";
    document.getElementById("filternav").style.height = "0";
    document
      .getElementById("product-list-page")
      .classList.remove("filter-active");
    props.hideFilter();
  };

  return (
    <div id="filternav" className="filternav">
      <Container>
        <Row className="filter-mob-row mb-3 align-items-center">
          <Col xs={7} className="filter-name-event">
            Filter {props.appliedEvent && `Event ${props.appliedEvent}`}
            {props.appliedCategory && `Kategori ${props.appliedCategory}`}
          </Col>
          <Col xs={5} className="text-right">
            <Button
              onClick={hideFilterPane}
              variant="link"
              className="keluarbtn-mob"
            >
              Kembali
            </Button>
          </Col>
        </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="categories">
          <Row>
            <Col xs={5} className="menu-filter-mob">
              <Nav className="flex-column">
                <Nav.Item>
                  {props.filterStore ? (
                    <>
                      <Nav.Link eventKey="categories">
                        {props.appliedCategory && "Sub-"}Kategori Inpirasi Kado
                      </Nav.Link>
                      <Nav.Link eventKey="categoriesGift">
                        Kategori Gift
                      </Nav.Link>
                    </>
                  ) : (
                    <Nav.Link eventKey="categories">
                      {props.appliedCategory && "Sub-"}Kategori
                    </Nav.Link>
                  )}
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="price">Harga</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="offers">Penawaran</Nav.Link>
                </Nav.Item>
                {/* Disable these filters until BC teams is ready
                  <Nav.Item>
                    <Nav.Link eventKey="colors">Warna</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="shippings">Pengiriman</Nav.Link>
                  </Nav.Item>
                  */}
                <Nav.Item>
                  <Nav.Link eventKey="brands">Brand</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sort">Urutan</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xs={7} className="product-filter-mob-content">
              <Tab.Content>
                <Tab.Pane eventKey="categories">
                  {props.filterStore ? (
                    <ProductFilterChoice
                      choices={props.available.events}
                      groupTitle="events"
                      values={props.applied.events}
                      updateAppliedFilter={onClickCheckboxes}
                    />
                  ) : props.filterHoliday ? (
                    <ProductFilterChoice
                      choices={props.available.holidays}
                      groupTitle="holidays"
                      values={props.applied.holidays}
                      updateAppliedFilter={onClickCheckboxes}
                    />
                  ) : props.appliedCategory ? (
                    props.available.subcategories.length === 0 ? (
                      "Kategori ini tidak memiliki sub-kategori"
                    ) : (
                      <ProductFilterChoice
                        choices={props.available.subcategories}
                        groupTitle="subcategories"
                        values={props.applied.subcategories}
                        updateAppliedFilter={onClickCheckboxes}
                      />
                    )
                  ) : (
                    <ProductFilterChoice
                      choices={props.available.categories}
                      groupTitle="categories"
                      values={props.applied.categories}
                      updateAppliedFilter={onClickCheckboxes}
                    />
                  )}
                </Tab.Pane>
                {props.filterStore && (
                  <Tab.Pane eventKey="categoriesGift">
                    <ProductFilterChoice
                      choices={props.available.categories}
                      groupTitle="categories"
                      values={props.applied.categories}
                      updateAppliedFilter={onClickCheckboxes}
                    />
                  </Tab.Pane>
                )}
                <Tab.Pane eventKey="price" className="pl-2">
                  <Row>
                    <Form.Group className="d-flex" controlId="minPrice">
                      <Form.Label column xs={3}>
                        Min
                      </Form.Label>
                      <Col xs={9}>
                        <Form.Control
                          type="text"
                          name="minPrice"
                          value={numericToCurrency(props.applied.price[0])}
                          className="product-filter-mob-price"
                          onChange={e => {
                            let applied = props.applied;
                            applied["price"][0] = e.target.value
                              ? parseInt(validateNumeric(e.target.value))
                              : 0;
                            props.setFilter(applied);
                          }}
                          onBlur={() => {
                            if (
                              props.applied.price[0] > props.applied.price[1]
                            ) {
                              props.setFilter({
                                ...props.applied,
                                price: [
                                  props.applied.price[1],
                                  props.applied.price[0]
                                ]
                              });
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group>
                      <Col
                        xs={{ span: 3, offset: 9 }}
                        className="product-filter-mob-range"
                      >
                        <Range
                          min={props.available.price[0]}
                          max={props.available.price[1]}
                          value={[
                            props.applied.price[0],
                            props.applied.price[1]
                          ]}
                          tipFormatter={value =>
                            `Rp ${numericToCurrency(value, true)}`
                          }
                          allowCross={false}
                          step={1000}
                          pushable={1000}
                          vertical
                          reverse
                          onChange={value => {
                            let applied = props.applied;
                            applied["price"] = value;
                            props.setFilter(applied);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="d-flex" controlId="maxPrice">
                      <Form.Label column xs={3}>
                        Max
                      </Form.Label>
                      <Col xs={9}>
                        <Form.Control
                          type="text"
                          name="maxPrice"
                          value={numericToCurrency(props.applied.price[1])}
                          className="product-filter-mob-price"
                          onChange={e => {
                            let applied = props.applied;
                            applied["price"][1] = e.target.value
                              ? parseInt(validateNumeric(e.target.value))
                              : 0;
                            if (
                              applied["price"][1] > props.available.price[1]
                            ) {
                              applied["price"][1] = props.available.price[1];
                            }
                            props.setFilter(applied);
                          }}
                          onBlur={() => {
                            if (
                              props.applied.price[0] > props.applied.price[1]
                            ) {
                              props.setFilter({
                                ...props.applied,
                                price: [
                                  props.applied.price[1],
                                  props.applied.price[0]
                                ]
                              });
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="offers">
                  <ProductFilterChoice
                    choices={props.available.offers}
                    groupTitle="offers"
                    values={props.applied.offers}
                    updateAppliedFilter={onClickCheckboxes}
                  />
                </Tab.Pane>
                {/* Disable these filters until BC teams is ready
                  <Tab.Pane eventKey="colors">
                    {props.available.colors.map(function(option) {
                      return (
                        <label key={option}>
                          <input
                            type="checkbox"
                            name="colors"
                            className="product-filter-checkbox-round"
                            style={{ backgroundColor: option }}
                            checked={props.applied.colors.has(option)}
                            onChange={e =>
                              onClickCheckboxes(
                                "colors",
                                option,
                                e.target.checked
                              )
                            }
                          />
                        </label>
                      );
                    })}
                  </Tab.Pane>
                  <Tab.Pane eventKey="shippings">
                    <ProductFilterChoice
                      choices={props.available.shippingSupports}
                      groupTitle="shippingSupports"
                      values={props.applied.shippingSupports}
                      updateAppliedFilter={onClickCheckboxes}
                    />
                  </Tab.Pane>
                  */}
                <Tab.Pane eventKey="brands">
                  <ProductFilterChoice
                    choices={props.available.brands}
                    groupTitle="brands"
                    values={props.applied.brands}
                    updateAppliedFilter={onClickCheckboxes}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="sort">
                  <Form.Group>
                    {Object.keys(props.sortingChoices).map((value, idx) => {
                      return (
                        <Form.Check
                          custom
                          value={value}
                          key={idx}
                          label={value}
                          name="sort"
                          type="radio"
                          className="kadoqu-checkbox-button product-filter-mob-choice"
                          checked={props.sortMethod === value}
                          id={
                            "product-filter-choice-" +
                            "sort" +
                            "-" +
                            value
                              .toLowerCase()
                              .split(" ")
                              .join("-")
                          }
                          onChange={e => {
                            props.selectSortingMethod(e);
                            hideFilterPane();
                          }}
                        />
                      );
                    })}
                  </Form.Group>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      <Container className="product-filter-mob-filter">
        <Row>
          <Col xs={6} className="text-center">
            <Button
              className="kadoqu-primary-button-green"
              onClick={() => {
                props.applyFilter();
                hideFilterPane();
              }}
            >
              Pasang Filter
            </Button>
          </Col>
          <Col xs={6} className="text-center">
            <Button
              className="kadoqu-primary-button-grey"
              onClick={() => {
                props.resetFilter();
                hideFilterPane();
              }}
            >
              Hapus Filter
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductFilterMob;
