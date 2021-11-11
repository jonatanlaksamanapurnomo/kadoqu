import React from "react";
import { Card, CardBody, CardHeader , CardFooter } from "reactstrap";
import { Query } from "react-apollo";
import NavLink from "../components/NavLink";
import {getUserId   } from "../utils/userChecker";
import Swal from "sweetalert2";
import { QUERY_GET_REJECTED_PRODUCT_REVIEWS , QUERY_GET_PRODUCT_REVIEWS_BY_MERCHANT  } from "../gql/product-review";

const RejectedProductList = props => {
  const query = {
    query: QUERY_GET_REJECTED_PRODUCT_REVIEWS,
  };
  const get_product_reviews_query = {
    query:QUERY_GET_PRODUCT_REVIEWS_BY_MERCHANT,
    variables:{
      merchantId:getUserId()
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="mb-0">Requested Enabling Product</h2>
        </CardHeader>
        <CardBody>
          <Query {...get_product_reviews_query}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return `error`;
              const reviews = data.getProductReviewsByMerchant;
              if (reviews.length === 0) {
                return "Anda tidak memiliki product untuk kami review ";
              }
              return reviews.map(review => {
                const { id, product, rejectionMessage } = review;
                return (
                  <NavLink
                    key={id}
                    className="p-0 mb-3"
                  >
                    <div
                      onClick={() => {
                        Swal.fire({
                          position: 'center',
                          title: 'Mohon Tunggu Product Anda Sedang Kami Review',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }}
                      className="btn btn-outline-dark d-flex align-items-center text-left rounded-0"
                      style={{ height: "4rem" }}
                    >
                      <span>
                      <h4 className="mb-0 font-weight-bold">{product.name}</h4>
                        {rejectionMessage}
                    </span>
                    </div>
                  </NavLink>
                );
              });
            }}
          </Query>
        </CardBody>
        <CardFooter>
          <span>Pastikan Harga Product Sudah Sesuai dengan yang anda inginkan</span>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="mb-0">Rejected Products</h2>
        </CardHeader>
        <CardBody>
          <Query {...query}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return `error`;
              const reviews = data.getRejectedProductReviews;
              if (reviews.length === 0) {
                return "Hurray! You have no rejected products";
              }
              return reviews.map(review => {
                const { id, product, productId, rejectionMessage } = review;
                return (
                  <NavLink
                    key={id}
                    className="p-0 mb-3"
                    href={"/products/edit/" + productId}
                  >
                    <div
                      className="btn btn-outline-dark d-flex align-items-center text-left rounded-0"
                      style={{ height: "4rem" }}
                    >
                      <img
                        className="h-100 mr-1 d-block"
                        src={(product.photos[0] || {}).url}
                        alt=""
                      />
                      <span>
                      <h4 className="mb-0 font-weight-bold">{product.name}</h4>
                        {rejectionMessage}
                    </span>
                    </div>
                  </NavLink>
                );
              });
            }}
          </Query>
        </CardBody>
      </Card>
    </div>
  );
};

export default RejectedProductList;
