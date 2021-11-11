import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import {
  MUTATION_REMOVE_FAVORITE_PRODUCT,
  MUTATION_ADD_FAVORITE_PRODUCT
} from "../gql/favorite";
// import { PopUpFavorite } from "./SweetAlerts";

const FavoriteStar = ({
  className = "",
  product,
  refetchQueries = [],
  ...props
}) => {
  const { id, isFavorite } = product;
  return (
    <Mutation
      mutation={
        isFavorite
          ? MUTATION_REMOVE_FAVORITE_PRODUCT
          : MUTATION_ADD_FAVORITE_PRODUCT
      }
      variables={{ id: id }}
      refetchQueries={refetchQueries}
    >
      {mutation => (
        <i
          className={
            className +
            " fas fa-star favorite-star" +
            (isFavorite ? " active" : "")
          }
          onClick={e => {
            e.stopPropagation();
            mutation()
              // .then(() => PopUpFavorite(!isFavorite, name))
              .catch(error => {
                if (!error.message.includes("login")) {
                  return console.log(error.message || error);
                }
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                props.history.push({
                  pathname: "/login",
                  state: {
                    errMesage: "Anda harus login / register terlebih dahulu",
                    from: props.location
                  }
                });
              });
          }}
        />
      )}
    </Mutation>
  );
};

export default withRouter(FavoriteStar);
