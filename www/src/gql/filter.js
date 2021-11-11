import gql from "graphql-tag";

const QUERY_GET_FILTERS = gql`
    query getFilters($query:String) {
        getParentCategories {
            name
            children {
                name
            }
        }
        getStoreCategories {
            name
        }
        getHolidayCategories {
            name
        }
        getMerchants {
            name
        }
        searchProductHeader(query:$query){
            name
            merchant
            storeCategories
            holidayCategories
            categories
            merchantData
        }
    }
`;

const QUERY_GET_PRODUCTS_FROM_ELASTICSEARCH = gql`
    query searchProducts($query : String){
        searchProducts(query:$query){
            id
            name
            merchant
        }
    }
`;

export { QUERY_GET_FILTERS, QUERY_GET_PRODUCTS_FROM_ELASTICSEARCH };
