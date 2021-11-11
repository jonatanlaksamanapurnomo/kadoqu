import gql from "graphql-tag";

const QUERY_GET_ALL_LEAGUE = gql`
  query getAllLeague{
    getAllLeague{
      id
      name
      description
    }
  }
`;
const QUERY_GET_MERCHANT_QUERY_POINT = gql`
  query  getMerchantTournamentPoints($merchant: String , $id:String){
    getMerchantTournamentPoints(merchant: $merchant)
    getAdmin(userId: $id) {
      id
      name
      code
      email
      email2
      phone
      role
      badgePhotoUrl
      leagueId
    }
    getMerchantTournamentMonthlySales(merchant:$merchant)
  }

`;

export { QUERY_GET_ALL_LEAGUE, QUERY_GET_MERCHANT_QUERY_POINT };
