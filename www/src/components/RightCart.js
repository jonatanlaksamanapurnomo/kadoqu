import React, { Component } from "react";
// import { Row, Col } from "react-bootstrap";
import "./RightCart.css";
import Productitemcart from "../components/ProductItemCart";
import Button from "react-bootstrap/Button";

class RightCart extends Component {
  render() {
    return (
      <div className="right-cart-container">
        <i class="fas fa-shopping-basket fa-3x" id="logo-right-cart" />
        <h1 className="judul-right-cart"> Isi Keranjang</h1>
        <div className="kotakwrap-right">
          <div id="ItemBuy" className="ItemBuyTop-right">
            <div className="gambargift">
              <img
                className="gambargift"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/1001-inspirasi-kado.svg"
                alt=""
              />
            </div>
            <h4 className="JudulWrapping">Wrapping Lab 1</h4>
            <h3 className="HargaWrapping-right">Rp 15000</h3>
            <Button
              variant="link"
              className="logodown-right"
              onClick={() => this.myFunction()}
            >
              <i class="fas fa-chevron-down fa-1x" />
            </Button>{" "}
            <Button variant="link" className="logoclose-right">
              <i class="fas fa-times fa-1x " />
            </Button>
            <div id="myDIV" className="kertaskado">
              <img src="https://via.placeholder.com/40" />
              <h3 className="jeniskertaskado">Kertas Kado Premium</h3>
              <h3 className="warnakertaskado">Pink</h3>
            </div>
            <div id="myDIV2" className="Pita">
              <img src="https://via.placeholder.com/40" />
              <h3 className="jenispita">Pita Tarik S</h3>
              <h3 className="warnapita">Merah</h3>
            </div>
          </div>
          <div className="ItemBuy-right">
            <Productitemcart />
            <hr className="garisabuabu" />
            <Productitemcart />
          </div>
        </div>
        <div className="kotakwrap-right">
          <div id="ItemBuy" className="ItemBuyTop-right">
            <div className="gambargift">
              <img
                className="gambargift"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/1001-inspirasi-kado.svg"
                alt=""
              />
            </div>
            <h4 className="JudulWrapping">Wrapping Lab 1</h4>
            <h3 className="HargaWrapping-right">Rp 15000</h3>
            <Button
              variant="link"
              className="logodown-right"
              onClick={() => this.myFunction()}
            >
              <i class="fas fa-chevron-down fa-1x" />
            </Button>{" "}
            <Button variant="link" className="logoclose-right">
              <i class="fas fa-times fa-1x " />
            </Button>
            <div id="myDIV" className="kertaskado">
              <img src="https://via.placeholder.com/40" />
              <h3 className="jeniskertaskado">Kertas Kado Premium</h3>
              <h3 className="warnakertaskado">Pink</h3>
            </div>
            <div id="myDIV2" className="Pita">
              <img src="https://via.placeholder.com/40" />
              <h3 className="jenispita">Pita Tarik S</h3>
              <h3 className="warnapita">Merah</h3>
            </div>
          </div>
          <div className="ItemBuy-right">
            <Productitemcart />
          </div>
        </div>

        <Button className="glda-btn-right">Proses Checkout</Button>
      </div>
    );
  }
}

export default RightCart;
