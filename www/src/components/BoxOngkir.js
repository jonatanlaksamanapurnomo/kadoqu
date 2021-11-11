import React from "react";
import Button from "react-bootstrap/Button";
import "./BoxOngkir.css";

const BoxOngkir = props => (
  <div className="kotakongkir">
    <h4 className="Judulboxkanan">ESTIMASI ONGKOS KIRIM</h4>
    <h6 className="info">Masukan kota tujuan</h6>
    <input className="kotatujuan" />
    <Button className="tomboldicart">Cek</Button>
  </div>
);

export default BoxOngkir;
