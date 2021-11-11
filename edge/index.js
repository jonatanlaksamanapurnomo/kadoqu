const { ApolloServer, gql } = require("apollo-server");
const { merge } = require("lodash");
const { logger } = require("./logger");
// jwt
let jwt = require("jsonwebtoken");
// Merge all schema here!
const schemaUser = require("./schema/user");
const schemaAddress = require("./schema/address");
const schemaCategory = require("./schema/category");
const schemaStoreCategory = require("./schema/storeCategory");
const schemaHolidayCategory = require("./schema/holidayCategory");
const schemaEventCategory = require("./schema/eventCategory");
const schemaOrder = require("./schema/order");
const schemaOrderProduct = require("./schema/orderProduct");
const schemaOrderWrapping = require("./schema/orderWrapping");
const schemaOrderStatus = require("./schema/orderStatus");
const schemaOrderTrack = require("./schema/orderTracks");
const schemaPhoto = require("./schema/photo");
const schemaProduct = require("./schema/product");
const schemaTag = require("./schema/tag");
const schemaFavoriteProduct = require("./schema/favoriteProduct");
const schemaProductGiftCategory = require("./schema/productGiftCategory");
const schemaProductStoreCategory = require("./schema/productStoreCategory");
const schemaProductHolidayCategory = require("./schema/productHolidayCategory");
const schemaProductColor = require("./schema/productColor");
const schemaProductShippingSupport = require("./schema/productShippingSupport");
const schemaVoucher = require("./schema/voucher");
const rajaOngkir = require("./schema/rajaongkir");
const email = require("./schema/mail");
const sms = require("./schema/sms");
const schemaProductClickedTracker = require("./schema/productClickedTracker");
const schemaProductAddedToCartTracker = require("./schema/productAddedToCart");
const schemaEmail = require("./schema/emailBroadcast");
const faq = require("./schema/faqCategory");
const faqSub = require("./schema/faqSubCategory");
const schemaWrapperType = require("./schema/wrapperType");
const schemaWrapperChoice = require("./schema/wrapperChoice");
const schemaRibbonType = require("./schema/ribbonType");
const schemaRibbonChoice = require("./schema/ribbonChoice");
const schemaBanner = require("./schema/banner");
const schemaAdmin = require("./schema/admin");
const schemaMerchant = require("./schema/merchant");
const schemaGidaFeedback = require("./schema/gidaFeedback");
const schemaSurveyLog = require("./schema/surveyLog");
const schemaTestimony = require("./schema/testimony");
const schemaRating = require("./schema/rating");
const schemaGidaOption = require("./schema/gidaOption");
const schemaProductReview = require("./schema/productReview");
const schemaStatistic = require("./schema/statistic");
const schemaOrderCustome = require("./schema/orderCustome");
const schemaPdf = require("./schema/pdf");
const schemaAddCampaign = require("./schema/MarketingCampaign");
const schemaGoogleAccount = require("./schema/googleAccount");
const schemaTracker = require("./schema/tracker");
const schemaProductCategories = require("./schema/productCategories");
const schemaOrderHoliday = require("./schema/orderHoliday");
const schemaElasticSearch = require("./schema/elasticsearch");
const schemaLeague = require("./schema/merchantLeague");
const schemaMerchantTournament = require("./schema/merchantTournament");
const schemaDeployHistory = require("./schema/deployHistory");
const schemaKadoPahlawan = require("./schema/kadoPahlawan");
const schemaCart = require("./schema/cart");
const schemaProductCheckoutTracker = require("./schema/productCheckoutTracker");
const schemaPromotion = require("./schema/promotion");

const Query = `
  type Query {
    _empty: String
  }
`;

const Mutation = `
  type Mutation {
    _empty: String
  }
`;

const server = new ApolloServer({
  typeDefs: gql(
    [
      Query,
      Mutation,
      schemaUser.typeDefs,
      schemaAddress.typeDefs,
      schemaCategory.typeDefs,
      schemaStoreCategory.typeDefs,
      schemaHolidayCategory.typeDefs,
      schemaEventCategory.typeDefs,
      schemaOrder.typeDefs,
      schemaOrderProduct.typeDefs,
      schemaOrderWrapping.typeDefs,
      schemaOrderTrack.typeDefs,
      schemaOrderStatus.typeDefs,
      schemaPhoto.typeDefs,
      schemaProduct.typeDefs,
      schemaTag.typeDefs,
      schemaFavoriteProduct.typeDefs,
      schemaProductGiftCategory.typeDefs,
      schemaProductStoreCategory.typeDefs,
      schemaProductClickedTracker.typeDefs,
      schemaProductHolidayCategory.typeDefs,
      schemaProductColor.typeDefs,
      schemaProductShippingSupport.typeDefs,
      schemaVoucher.typeDefs,
      rajaOngkir.typeDefs,
      email.typeDefs,
      sms.typeDefs,
      schemaEmail.typeDefs,
      faq.typeDefs,
      faqSub.typeDefs,
      schemaWrapperType.typeDefs,
      schemaWrapperChoice.typeDefs,
      schemaRibbonType.typeDefs,
      schemaRibbonChoice.typeDefs,
      schemaBanner.typeDefs,
      schemaAdmin.typeDefs,
      schemaMerchant.typeDefs,
      schemaGidaFeedback.typeDefs,
      schemaSurveyLog.typeDefs,
      schemaTestimony.typeDefs,
      schemaRating.typeDefs,
      schemaGidaOption.typeDefs,
      schemaProductReview.typeDefs,
      schemaStatistic.typeDefs,
      schemaOrderCustome.typeDefs,
      schemaPdf.typeDefs,
      schemaAddCampaign.typeDefs,
      schemaGoogleAccount.typeDefs,
      schemaTracker.typeDefs,
      schemaProductCategories.typeDefs,
      schemaOrderHoliday.typeDefs,
      schemaElasticSearch.typeDefs,
      schemaLeague.typeDefs,
      schemaMerchantTournament.typeDefs,
      schemaDeployHistory.typeDefs,
      schemaKadoPahlawan.typeDefs,
      schemaCart.typeDefs,
      schemaProductAddedToCartTracker.typeDefs,
      schemaProductCheckoutTracker.typeDefs,
      schemaPromotion.typeDefs
    ].join("\n")
  ),
  resolvers: merge(
    schemaUser.resolvers,
    schemaAddress.resolvers,
    schemaCategory.resolvers,
    schemaStoreCategory.resolvers,
    schemaOrder.resolvers,
    schemaOrderProduct.resolvers,
    schemaOrderWrapping.resolvers,
    schemaOrderTrack.resolvers,
    schemaOrderStatus.resolvers,
    schemaPhoto.resolvers,
    schemaProduct.resolvers,
    schemaTag.resolvers,
    schemaFavoriteProduct.resolvers,
    schemaProductGiftCategory.resolvers,
    schemaProductStoreCategory.resolvers,
    schemaProductHolidayCategory.resolvers,
    schemaProductColor.resolvers,
    schemaHolidayCategory.resolvers,
    schemaProductShippingSupport.resolvers,
    schemaVoucher.resolvers,
    rajaOngkir.resolvers,
    email.resolvers,
    sms.resolvers,
    schemaEmail.resolvers,
    faq.resolvers,
    faqSub.resolvers,
    schemaWrapperType.resolvers,
    schemaWrapperChoice.resolvers,
    schemaRibbonType.resolvers,
    schemaRibbonChoice.resolvers,
    schemaBanner.resolvers,
    schemaAdmin.resolvers,
    schemaMerchant.resolvers,
    schemaGidaFeedback.resolvers,
    schemaSurveyLog.resolvers,
    schemaTestimony.resolvers,
    schemaRating.resolvers,
    schemaGidaOption.resolvers,
    schemaProductReview.resolvers,
    schemaStatistic.resolvers,
    schemaOrderCustome.resolvers,
    schemaPdf.resolvers,
    schemaAddCampaign.resolvers,
    schemaGoogleAccount.resolvers,
    schemaTracker.resolvers,
    schemaProductCategories.resolvers,
    schemaOrderHoliday.resolvers,
    schemaElasticSearch.resolvers,
    schemaLeague.resolvers,
    schemaMerchantTournament.resolvers,
    schemaDeployHistory.resolvers,
    schemaKadoPahlawan.resolvers,
    schemaCart.resolvers,
    schemaProductClickedTracker.resolvers,
    schemaProductAddedToCartTracker.resolvers,
    schemaProductCheckoutTracker.resolvers,
    schemaPromotion.resolvers
  ),
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || "";
    const resi = req.headers.resi || "";
    // get the user token from the headers
    const token = tokenWithBearer.split(" ")[1];
    try {
      let user = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
      user.resi = resi;
      // console.log(user);
      return { user };
    } catch (err) {
      // lets print on terminal
    }

    // try {
    //   return google_accses_token;
    // } catch (e) {}
  }
});

server.listen().then(({ url }) => {
  logger.info(`Listening on ${url}`);
});
