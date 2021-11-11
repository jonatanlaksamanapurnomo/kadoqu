import React from "react";
import Slider from "rc-slider";
import { Col, Form } from "react-bootstrap";
import { validateNumeric } from "../utils/regexInputConverter";
import { numericToCurrency } from "../utils/formatter";
import showTransformationsPhoto from "../library/ShowImageTransformation";

import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./ProductFilter.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const ProductFilterChoiceBrand = props => (
  <div className={props.choices.length > 12 ? "form-check-filter" : ""}>
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
            className="kadoqu-checkbox-button"
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
  </div>
);

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
          className="kadoqu-checkbox-button"
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

const ProductFilter = props => {
  const onClickCheckboxes = (filterType, changedChoice, isChecked) => {
    let applied = props.applied;
    if (isChecked) {
      applied[filterType].add(changedChoice);
    } else {
      applied[filterType].delete(changedChoice);
    }
    props.setFilter(applied);
  };
  return (
    <div id="product-filter" className="mb-5">
      {(props.appliedEvent || props.appliedCategory) && props.filterBanner && (
        <img
          alt="Filter"
          className="w-100"
          src={showTransformationsPhoto(280, 145, props.filterBanner)}
        />
      )}
      <Form
        className="card-body"
        onReset={e => {
          e.preventDefault();
          props.resetFilter();
        }}
        onSubmit={e => {
          e.preventDefault();
          props.applyFilter();
        }}
      >
        <div className="product-filter-button-container">
          <button type="submit" className="kadoqu-primary-button short">
            Pasang Filter
          </button>
        </div>
        <div className="product-filter-button-container">
          <button type="reset" className="kadoqu-grey-button short">
            Hapus Filter
          </button>
        </div>
        {props.filterStore ? (
          <div className="product-filter-group">
            <h5 className="font-weight-bold">Kategori Inspirasi Kado</h5>
            <ProductFilterChoice
              choices={props.available.events}
              groupTitle="events"
              values={props.applied.events}
              updateAppliedFilter={onClickCheckboxes}
            />
            <div className="product-filter-group">
              <h5 className="font-weight-bold">Kategori Gift</h5>
              <ProductFilterChoice
                choices={props.available.categories}
                groupTitle="categories"
                values={props.applied.categories}
                updateAppliedFilter={onClickCheckboxes}
              />
            </div>
          </div>
        ) : props.filterHoliday ? (
          <div className="product-filter-group">
            <h5 className="font-weight-bold">Kategori</h5>
            <ProductFilterChoice
              choices={props.available.holidays}
              groupTitle="holidays"
              values={props.applied.holidays}
              updateAppliedFilter={onClickCheckboxes}
            />
          </div>
        ) : props.appliedCategory ? (
          props.available.subcategories.length === 0 ? null : (
            <div className="product-filter-group">
              <h5 className="font-weight-bold">Sub-Kategori</h5>
              <ProductFilterChoice
                choices={props.available.subcategories}
                groupTitle="subcategories"
                values={props.applied.subcategories}
                updateAppliedFilter={onClickCheckboxes}
              />
            </div>
          )
        ) : (
          <div className="product-filter-group">
            <h5 className="font-weight-bold">Kategori</h5>
            <ProductFilterChoice
              choices={props.available.categories}
              groupTitle="categories"
              values={props.applied.categories}
              updateAppliedFilter={onClickCheckboxes}
            />
          </div>
        )}

        <div className="product-filter-group">
          <h5 className="font-weight-bold">Harga</h5>
          <Range
            min={props.available.price[0]}
            max={props.available.price[1]}
            value={[props.applied.price[0], props.applied.price[1]]}
            tipFormatter={value => `Rp ${numericToCurrency(value, true)}`}
            allowCross={false}
            step={1000}
            pushable={1000}
            onChange={value => {
              let applied = props.applied;
              applied["price"] = value;
              props.setFilter(applied);
            }}
          />
          <div className="mt-2 product-filter-price d-flex">
            <Form.Group className="d-flex" md="6" controlId="minPrice">
              <Form.Label column sm={3}>
                Min
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="minPrice"
                  value={numericToCurrency(props.applied.price[0])}
                  onChange={e => {
                    let applied = props.applied;
                    applied["price"][0] = e.target.value
                      ? parseInt(validateNumeric(e.target.value))
                      : 0;
                    props.setFilter(applied);
                  }}
                  onBlur={() => {
                    if (props.applied.price[0] > props.applied.price[1]) {
                      props.setFilter({
                        ...props.applied,
                        price: [props.applied.price[1], props.applied.price[0]]
                      });
                    }
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="d-flex" md="6" controlId="maxPrice">
              <Form.Label column sm={3}>
                Max
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="maxPrice"
                  value={numericToCurrency(props.applied.price[1])}
                  onChange={e => {
                    let applied = props.applied;
                    applied["price"][1] = e.target.value
                      ? parseInt(validateNumeric(e.target.value))
                      : 0;
                    if (applied["price"][1] > props.available.price[1]) {
                      applied["price"][1] = props.available.price[1];
                    }
                    props.setFilter(applied);
                  }}
                  onBlur={() => {
                    if (props.applied.price[0] > props.applied.price[1]) {
                      props.setFilter({
                        ...props.applied,
                        price: [props.applied.price[1], props.applied.price[0]]
                      });
                    }
                  }}
                />
              </Col>
            </Form.Group>
          </div>
        </div>

        {/*<div className="product-filter-group">*/}
        {/*  <h5 className="font-weight-bold">Penawaran</h5>*/}
        {/*  <ProductFilterChoice*/}
        {/*    choices={props.available.offers}*/}
        {/*    groupTitle="offers"*/}
        {/*    values={props.applied.offers}*/}
        {/*    updateAppliedFilter={onClickCheckboxes}*/}
        {/*  />*/}
        {/*</div>*/}

        {/* Disable these filters until BC teams is ready
              <div className="product-filter-group">
                <h5 className="font-weight-bold">Warna</h5>
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
                          onClickCheckboxes("colors", option, e.target.checked)
                        }
                      />
                    </label>
                  );
                })}
              </div>

              <div className="product-filter-group">
                <h5 className="font-weight-bold">Dukungan Pengiriman</h5>
                <ProductFilterChoice
                  choices={props.available.shippingSupports}
                  groupTitle="shippingSupports"
                  values={props.applied.shippingSupports}
                  updateAppliedFilter={onClickCheckboxes}
                />
              </div>
              */}

        <div className="product-filter-group">
          <h5 className="font-weight-bold">Brand</h5>
          <ProductFilterChoiceBrand
            choices={props.available.brands}
            groupTitle="brands"
            values={props.applied.brands}
            updateAppliedFilter={onClickCheckboxes}
          />
        </div>
      </Form>
    </div>
  );
};

export default ProductFilter;
