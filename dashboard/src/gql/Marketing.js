import gql from "graphql-tag";

const MUTATION_ADD_CAMPAIGN = gql`
  mutation addCampaign($input:InputCampaign){
    addCampaign(input:$input)
  }
`;

const QUERY_CAMPAIGNS = gql`
  query getAllCampaign ($startDate:Date , $endDate:Date){
    getAllCampaign (startDate:$startDate , endDate:$endDate){
      id
      name
      primaryDiscount
      secondaryDiscount
      products
      totalSales
      totalBudget
      campaignStart
      campaignEnd
    }
  }
`;
const MUTATION_COUNT_TOTAL_SALES = gql`
  mutation countTotalSales ($orders : [JSON]) {
    countTotalSales(orders:$orders)
  }
`;

const MUTATION_COUNT_TOTAL_SELECTED_CAMPAIGN_SALES = gql`
  mutation countSelectedCampaignSales($selectedCampaign:[JSON]){
    countSelectedCampaignSales(selectedCampaign:$selectedCampaign)
  }

`;
const MUTATION_DISCOUNT_PRODUCT_PER_CAMPAIGN = gql`
  mutation discountProductByCampaign($id :Int){
    discountProductByCampaign(id:$id)
  }
`;
const MUTATION_DELETE_CAMPAIGN = gql`
  mutation  deleteCampaign($id :Int){
    deleteCampaign(id:$id)
  }
`;
const QUERY_GET_NCAMPAIGN_PER_MONTH = gql`
  query getnCampaignPerMonth ($startDate:Date , $endDate:Date) {
    getnCampaignPerMonth (startDate:$startDate , endDate:$endDate) {
      month
      total
    }
  }
`;
const QUERY_GET_CAMPAIGN_BUDGET_PER_MONTH = gql`
  query getTotalBudgetPerMonth ($startDate:Date , $endDate:Date){
    getTotalBudgetPerMonth (startDate:$startDate , endDate:$endDate){
      month
      total
    }
  }
`;

const QUERY_GET_BUDGET_PER_CAMPAIGN = gql`
  query getBudgetPerCampaign($startDate:Date , $endDate:Date){
    getBudgetPerCampaign(startDate:$startDate , endDate:$endDate){
      campaign
      budget
    }
  }
`;
const QUERY_GET_SALES_PER_CAMPAIGN = gql`
  query getSalesPerCampaign($startDate:Date , $endDate:Date){
    getSalesPerCampaign(startDate:$startDate , endDate:$endDate){
      campaign
      sales
    }
  }
`;
const MUTATION_DISCOUNT_ONSELECTED_CAMPAIGN = gql`
  mutation discountProductOnSelectedCampaign($idCampaign:Int){
    discountProductOnSelectedCampaign(idCampaign:$idCampaign)
  }
`;
const QUERY_GET_CAMPAIGN_ORDER_HISTORY = gql`
  query getOrderHistoryByCampaign($campaignId:String){
    getOrderHistoryByCampaign(campaignId:$campaignId)
  }
`;

const QUERY_GET_CAMPAIGN_BY_ID = gql`
  query getCampaignById($id :Int){
    getCampaignById(id : $id){
      id
      name
      products
      primaryDiscount
      secondaryDiscount
      totalSales
      totalBudget
      campaignStart
      campaignEnd
    }
  }
`;
export {
  MUTATION_ADD_CAMPAIGN,
  QUERY_CAMPAIGNS,
  MUTATION_COUNT_TOTAL_SALES,
  MUTATION_DISCOUNT_PRODUCT_PER_CAMPAIGN,
  MUTATION_DELETE_CAMPAIGN,
  QUERY_GET_NCAMPAIGN_PER_MONTH,
  QUERY_GET_CAMPAIGN_BUDGET_PER_MONTH,
  QUERY_GET_BUDGET_PER_CAMPAIGN,
  QUERY_GET_SALES_PER_CAMPAIGN,
  MUTATION_COUNT_TOTAL_SELECTED_CAMPAIGN_SALES,
  MUTATION_DISCOUNT_ONSELECTED_CAMPAIGN,
  QUERY_GET_CAMPAIGN_ORDER_HISTORY,
  QUERY_GET_CAMPAIGN_BY_ID
};
