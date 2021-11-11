import React from "react";
import {
  Col,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  FormFeedback
} from "reactstrap";
// import { ProgressBar } from "react-bootstrap";
import { Image } from "react-bootstrap";
import FileBase64 from "react-file-base64";

import "./FormComponents.css";

const getDashedName = name =>
  name
    .toLowerCase()
    .split(" ")
    .join("-");

const getCamelCasedName = name =>
  name
    .toLowerCase()
    .split(" ")
    .map((word, idx) =>
      idx === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");

const fieldNameSize = 3;
const formSizeSmall = 12;
const formSizeMedium = 9;

const TextInput = props => (
  <FormGroup row>
    <Col md={fieldNameSize}>
      <Label htmlFor={`add-product-${getDashedName(props.fieldName)}`}>
        {props.label || props.fieldName}
      </Label>
    </Col>
    <Col xs={formSizeSmall} md={formSizeMedium}>
      <InputGroup>
        {props.leftUnit && (
          <InputGroupAddon addonType="append">{props.leftUnit}</InputGroupAddon>
        )}
        <Input
          disabled={props.disabled}
          readOnly={props.readOnly || false}
          type={props.type || "text"}
          id={`add-product-${getDashedName(props.fieldName)}`}
          name={getCamelCasedName(props.fieldName)}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder || props.fieldName}
          value={typeof props.value !== "undefined" ? props.value : undefined}
          onChange={e => {
            e.target.value = props.numeric
              ? e.target.value.replace(props.float ? /[^.0-9]/g : /[\D]/g, "")
              : e.target.value;
            if (!props.onChange) return;
            props.onChange(e);
          }}
          onBlur={props.onBlur || undefined}
          valid={props.valid === "true"}
          invalid={props.invalid === "true"}
        />
        {props.unit && (
          <InputGroupAddon addonType="append">{props.unit}</InputGroupAddon>
        )}
      </InputGroup>
      <FormFeedback
        valid={props.valid || undefined}
        invalid={props.invalid || undefined}
      >
        {props.feedback}
      </FormFeedback>
      <FormText color="muted">{props.additionalInfo}</FormText>
      <FormText color="danger">{props.additionalInfoAlertInfo}</FormText>
      {props.float ? (
        <FormText color="muted">
          Separate decimal places with full stop (.)
        </FormText>
      ) : null}
    </Col>
  </FormGroup>
);

const TextAreaInput = props => (
  <FormGroup row>
    <Col md={fieldNameSize}>
      <Label htmlFor={`add-product-${getDashedName(props.fieldName)}`}>
        {props.fieldName}
      </Label>
    </Col>
    <Col xs={formSizeSmall} md={formSizeMedium}>
      <Input
        type="textarea"
        id={`add-product-${getDashedName(props.fieldName)}`}
        name={getCamelCasedName(props.fieldName)}
        rows={props.rows || 2}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder || props.fieldName}
        value={typeof props.value !== "undefined" ? props.value : undefined}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </Col>
  </FormGroup>
);

const MultipleInlineInput = props => (
  <FormGroup row>
    <Col md={fieldNameSize}>
      <Label>{props.fieldName}</Label>
    </Col>
    <Col xs={formSizeSmall} md={formSizeMedium}>
      {props.options.map(option => (
        <FormGroup
          check
          inline
          key={option}
          className={props.formSize ? `col-${props.formSize}` : null}
        >
          <Input
            className="form-check-input"
            type={props.type}
            id={`add-product-${getDashedName(props.fieldName)}-${getDashedName(
              option
            )}`}
            name={getCamelCasedName(props.fieldName)}
            value={option}
            checked={
              props.value
                ? typeof props.value === "string"
                  ? props.value === option
                  : props.value.has(option)
                : undefined
            }
            onChange={props.onChange}
            defaultChecked={
              typeof props.defaultValue !== "undefined"
                ? props.defaultValue === option
                : props.defaultChecked
                ? new Set(props.defaultChecked).has(option)
                : undefined
            }
          />
          <Label
            className="form-check-label"
            check
            htmlFor={`add-product-${getDashedName(
              props.fieldName
            )}-${getDashedName(option)}`}
          >
            {option}
          </Label>
        </FormGroup>
      ))}
    </Col>
  </FormGroup>
);

const MultipleExpandableInput = props => (
  <FormGroup row>
    <Col md={fieldNameSize}>
      <Label>{props.fieldName}</Label>
    </Col>
    <Col xs={formSizeSmall} md={formSizeMedium}>
      {props.options.map(option => (
        <FormGroup check className={"checkbox"} key={option}>
          <Input
            className="form-check-input"
            type="checkbox"
            id={`add-product-${getDashedName(props.fieldName)}-${getDashedName(
              option
            )}`}
            name={getCamelCasedName(props.fieldName)}
            defaultChecked={
              props.defaultChecked
                ? new Set(props.defaultChecked).has(option)
                : undefined
            }
            value={option}
            checked={props.value ? props.value.has(option) : undefined}
            onChange={props.onChange}
          />
          <Label
            className="form-check-label"
            check
            htmlFor={`add-product-${getDashedName(
              props.fieldName
            )}-${getDashedName(option)}`}
          >
            {option}
          </Label>
        </FormGroup>
      ))}
      <Input
        className="new-option-input"
        type="text"
        placeholder="Add other option..."
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            let option = e.target.value;
            let newOption = document.createElement("div");
            newOption.classList.add("checkbox", "form-check");
            let inputButton = document.createElement("input");
            inputButton.setAttribute(
              "id",
              `add-product-${getDashedName(props.fieldName)}-${getDashedName(
                option
              )}`
            );
            inputButton.setAttribute("class", "form-check-input");
            inputButton.setAttribute("type", "checkbox");
            inputButton.setAttribute("value", option);
            inputButton.setAttribute(
              "checked",
              props.value ? props.value.has(option) : undefined
            );
            inputButton.setAttribute("onChange", props.onChange);
            inputButton.setAttribute(
              "name",
              getCamelCasedName(props.fieldName)
            );
            let inputLabel = document.createElement("label");
            inputLabel.setAttribute(
              "for",
              `add-product-${getDashedName(props.fieldName)}-${getDashedName(
                option
              )}`
            );
            inputLabel.setAttribute("class", "form-check-label");
            inputLabel.innerHTML = option;
            newOption.appendChild(inputButton);
            newOption.appendChild(inputLabel);
            e.target.parentNode.insertBefore(newOption, e.target);
            e.target.value = "";
          }
        }}
      />
    </Col>
  </FormGroup>
);

const MultipleChoiceInput = props => (
  <FormGroup row>
    <Col md={fieldNameSize}>
      <Label htmlFor={`add-product-${getDashedName(props.fieldName)}`}>
        {props.fieldName}
      </Label>
    </Col>
    <Col xs={formSizeSmall} md={formSizeMedium}>
      <Input
        type="select"
        name={getCamelCasedName(props.fieldName)}
        id={`add-product-${getDashedName(props.fieldName)}`}
        defaultValue={props.defaultValue || 0}
        value={props.value || undefined}
        onChange={props.onChange}
      >
        <option value={0} disabled>
          Please select
        </option>
        {Array.isArray(props.options)
          ? Array.from(new Set(props.options)).map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : Object.entries(props.options).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
      </Input>
    </Col>
  </FormGroup>
);

const PhotosUploader = props => {
  // let progressLoading = null;
  return (
    <React.Fragment>
      <FileBase64
        className="form-control"
        multiple={true}
        onDone={photos => {
          props.handlePhotos(photos);
        }}
        accept="image/*"
      />
      {props.photos.length > 0 && (
        <FormText color="muted">Click photo to remove</FormText>
      )}
      <div className="photo-uploader-preview">
        {props.photos.map((item, idx) => {
          // progressLoading += 1;
          return (
            <div className="px-0 mr-3 mt-3" key={idx}>
              <Image
                onClick={() => props.removePhoto(idx)}
                src={item}
                fluid
                className="h-100"
              />
            </div>
          );
        })}
      </div>
      {/* {progressLoading !== null ? (
        <div className="mt-5">
          <strong>Upload Progress</strong>
          <ProgressBar
            variant="success"
            // animated
            now={(progressLoading / props.photos.length) * 100 || 0}
            label={`${(progressLoading / props.photos.length) * 100 || 0}%`}
          />
          <div className="text-right">
            {progressLoading}/{props.photos.length}
          </div>
        </div>
      ) : (
        ""
      )} */}
    </React.Fragment>
  );
};
const MultipleSelectionInlineInput = props => (
  <FormGroup row>
    <Col md={fieldNameSize}>
      <Label>{props.fieldName}</Label>
    </Col>
    <Col xs={formSizeSmall} md={formSizeMedium}>
      <FormGroup
        check
        inline
        className={props.formSize ? `col-${props.formSize}` : null}
      >
        <Input
          className="form-check-input"
          type={props.type}
          id={`add-product-${getDashedName(props.fieldName)}-${getDashedName(
            "Gift"
          )}`}
          name={getCamelCasedName(props.fieldName)}
          value={"Gift"}
          onClick={props.onClick}
          checked={
            props.value
              ? typeof props.value === "string"
                ? props.value === "Gift"
                : props.value.has("Gift")
              : undefined
          }
          onChange={props.onChange}
          defaultChecked={
            typeof props.defaultValue !== "undefined"
              ? props.defaultValue === "Gift"
              : props.defaultChecked
              ? new Set(props.defaultChecked).has("Gift")
              : undefined
          }
        />
        <Label
          className="form-check-label"
          check
          htmlFor={`add-product-${getDashedName(
            props.fieldName
          )}-${getDashedName("Gift")}`}
        >
          {"Gift"}
        </Label>
      </FormGroup>
      {props.options.map(option => (
        <FormGroup
          check
          inline
          key={option}
          className={props.formSize ? `col-${props.formSize}` : null}
        >
          <Input
            className="form-check-input"
            type={props.type}
            id={`add-product-${getDashedName(props.fieldName)}-${getDashedName(
              option
            )}`}
            name={getCamelCasedName(props.fieldName)}
            value={option}
            onClick={props.onClick}
            checked={
              props.value
                ? typeof props.value === "string"
                  ? props.value === option
                  : props.value.has(option)
                : undefined
            }
            onChange={props.onChange}
            defaultChecked={
              typeof props.defaultValue !== "undefined"
                ? props.defaultValue === option
                : props.defaultChecked
                ? new Set(props.defaultChecked).has(option)
                : undefined
            }
          />
          <Label
            className="form-check-label"
            check
            htmlFor={`add-product-${getDashedName(
              props.fieldName
            )}-${getDashedName(option)}`}
          >
            {option}
          </Label>
        </FormGroup>
      ))}
    </Col>
  </FormGroup>
);

export {
  TextInput,
  TextAreaInput,
  MultipleInlineInput,
  MultipleChoiceInput,
  MultipleExpandableInput,
  PhotosUploader,
  MultipleSelectionInlineInput
};
