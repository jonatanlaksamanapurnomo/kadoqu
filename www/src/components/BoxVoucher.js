import React, { Component } from "react";
import "./BoxVoucher.css";
import { Form, Row, Col } from "react-bootstrap";
import { withApollo } from "react-apollo";
import { QUERY_CHECK_VOUCHER } from "../gql/voucher";
import { QUERY_GET_CART } from "../gql/cart";

class BoxVoucher extends Component {
  state = {
    voucher: ""
  };

  voucherVerify = code => {
    this.props.client
      .query({
        query: QUERY_GET_CART
      })
      .then(res => {
        const { items, packages } = res.data.getCart;
        return this.props.client
          .query({
            query: QUERY_CHECK_VOUCHER,
            variables: {
              code: code
            },
            fetchPolicy: "no-cache"
          })
          .then(({ data }) => {
            let voucher = data.checkVoucher;
            voucher.code = code;
            let products = [];
            items.forEach(item => {
              if (item.discountPrice) return;
              const product = products.find(
                e => e.idProduct === item.idProduct
              );
              if (product) product.quantity += item.quantity;
              else products.push({ ...item });
            });
            packages.forEach(value => {
              value.items.forEach(item => {
                if (item.discountPrice) return;
                const product = products.find(
                  e => e.idProduct === item.idProduct
                );
                if (product) product.quantity += item.quantity;
                else products.push({ ...item });
              });
            });
            let totalDiscountedPrice = 0;
            products.forEach(value => {
              let isConditionProducts = true;
              let isConditionMerchants = true;
              let isConditionGiftCategories = true;
              let isConditionStoreCategories = true;
              if (voucher.products.length)
                isConditionProducts =
                  voucher.products.filter(e => e === value.idProduct).length >
                  0;
              if (voucher.merchants.length)
                isConditionMerchants =
                  voucher.merchants.filter(e => e === value.merchant).length >
                  0;
              if (voucher.giftCategories.length)
                isConditionGiftCategories =
                  voucher.giftCategories.filter(category =>
                    value.categories.map(e => e.name).includes(category)
                  ).length > 0;
              if (voucher.storeCategories.length)
                isConditionStoreCategories =
                  voucher.storeCategories.filter(category =>
                    value.storeCategories.map(e => e.name).includes(category)
                  ).length > 0;
              if (
                isConditionProducts &&
                isConditionMerchants &&
                isConditionGiftCategories &&
                isConditionStoreCategories
              ) {
                totalDiscountedPrice += value.quantity * value.price;
              }
            });

            if (totalDiscountedPrice === 0)
              return this.props.failed("Syarat dan Ketentuan Berlaku");
            if (totalDiscountedPrice < voucher.minPurchase)
              return this.props.failed(
                `Minimal Transaksi ${parseFloat(voucher.minPurchase)
                  .toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`
              );
            let discount =
              (voucher.percentDiscount * totalDiscountedPrice) / 100;
            if (voucher.maxDiscount)
              discount = Math.min(discount, voucher.maxDiscount);
            voucher.discount = discount;
            this.props.success(voucher);
          })
          .catch(res => {
            this.props.failed(res.message.substr(15));
          });
      });
  };

  render() {
    return (
      <div className="kotakvoucher">
        <Form
          onSubmit={e => {
            e.preventDefault();
            this.voucherVerify(this.state.voucher);
          }}
        >
          <Row className="d-flex align-items-center">
            <Col xs={12} sm={4} md={12}>
              <h4 className="judul">KODE VOUCHER</h4>
              <h6 className="info">Masukan kode voucher yang kamu miliki</h6>
            </Col>
            <Col xs={12} sm={8} md={12}>
              <div className="input-group">
                <input
                  type="text"
                  onChange={e => {
                    this.setState({
                      voucher: e.target.value
                    });
                  }}
                  className="form-control kodevoucher"
                />
                <div className="input-group-append">
                  <button className="btn tombol" type="submit">
                    Pakai
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default withApollo(BoxVoucher);
