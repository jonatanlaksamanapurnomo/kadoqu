import React from "react";
import FileBase64 from "react-file-base64";
import { Col, Row } from "react-bootstrap";

const BannerPreview = props => {
  const { version, src, onDone } = props;
  return (
    <React.Fragment>
      <strong>{version} version</strong>
      <Row className="mb-3">
        <Col xs={9}>
          <img alt={`${version} banner`} src={src} className="w-100" />
        </Col>
        <Col xs={3}>
          Upload new image:
          <FileBase64
            className="form-control"
            multiple={false}
            onDone={onDone}
            accept="image/*"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BannerPreview;
