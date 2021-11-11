const {db} = require("../db");

const typeDefs = `
  type Campaign{
    id:Int
    name:String
    products:JSON
    primaryDiscount:Int
    secondaryDiscount:Int
    totalSales:Float
    totalBudget:Float
    campaignStart:Date
    campaignEnd:Date
  }

  type nCampaignPerMonth{
    month:String
    total:Int
  }
  type campaignBudgetPerMonth{
    month:String
    total:Float
  }
  type SalesPerCampaign{
    campaign:String
    sales:Float
  }
  type BudgetPerCampaign{
    campaign:String
    budget:Float
  }
  input InputCampaign{
    name:String
    products:JSON
    primaryDiscount:Int
    secondaryDiscount:Int
    campaignStart:Date
    campaignEnd:Date
  }
   extend type Query{
      getCampaignById(id:Int):Campaign
     getAllCampaign(startDate:Date , endDate:Date):[Campaign]
     getnCampaignPerMonth(startDate:Date , endDate:Date):[nCampaignPerMonth]
     getTotalBudgetPerMonth(startDate:Date , endDate:Date):[campaignBudgetPerMonth]
     getBudgetPerCampaign(startDate:Date , endDate:Date):[BudgetPerCampaign]
     getSalesPerCampaign(startDate:Date , endDate:Date):[SalesPerCampaign]
     getOrderHistoryByCampaign(campaignId:String):[JSON]

   }
   extend type Mutation{
      addCampaign(input:InputCampaign):Boolean
      countTotalSales(orders:[JSON]):Boolean
      countSelectedCampaignSales(selectedCampaign:[JSON]):Boolean
      discountProductByCampaign(id:Int):String
      deleteCampaign(id:Int):Boolean
      discountProductOnSelectedCampaign(idCampaign:Int) : Boolean
      jobDiscountProductCampaign:Boolean
   }

`;

const fieldNameMapper = campaign => ({
  id: campaign.id,
  name: campaign.campaign_name,
  products: campaign.products,
  primaryDiscount: campaign.primary_discount,
  secondaryDiscount: campaign.secondary_discount,
  totalSales: campaign.campaign_total_sales,
  totalBudget: campaign.campaign_total_budget,
  campaignStart: campaign.campaign_start,
  campaignEnd: campaign.campaign_end
});

const nCampaignPerMonthMapper = data => ({
    month: new Date(data.date).toLocaleString('default', {month: 'long'}),
    total: data.count
  })
;

const campaignBudgetPerMonth = data => ({
  campaign: data.campaign_name,
  budget: data.budget
});
const campaignSalesPerMonth = data => ({
  campaign: data.campaign_name,
  sales: data.sales
});


function CalculateDiscount(disc, price) {
  let total_1 = Math.round(price * disc / 100);
  return price - total_1;
}


function dateBetweenCheck(from, to, check) {

  let fDate, lDate, cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDate = Date.parse(check);
  if ((cDate <= lDate && cDate >= fDate)) {
    return true;
  }
  return false;
}

function dateBetweenCheck2(from, to, check) {

  let fDate, lDate, cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDate = check;

  if ((cDate <= lDate && cDate >= fDate)) {
    return true;
  }
  return false;
}


const resolvers = {
  Query: {
    getCampaignById: (_, {id}) => {
      return db.one("select * from campaign where  id = $1 ", id)
        .then(campaign => fieldNameMapper(campaign));
    },
    getOrderHistoryByCampaign: (_, {campaignId}) => {

      return db.one("select * from campaign where id = $1", [campaignId])
        .then(campaign => {
          let sql = "select order_products.order_id , orders.no,order_products.product,order_products.quantity,orders.order_status_id ,order_products.created_at  from order_products inner  join orders on order_products.order_id = orders.id where orders.created_at >= $1  and orders.created_at <= $2 and orders.order_status_id > 1 and orders.order_status_id < 6   order by orders.created_at asc";
          return db.any(sql, [new Date(campaign.campaign_start), new Date(campaign.campaign_end)])
            .then((orders) => {
              let campaignProduct = campaign.products.products;
              let filteredOrder = orders.filter(n => campaignProduct.some(n2 => n.product.id == n2.id));
              return filteredOrder;
            });

        });
    },
    getAllCampaign: (_, {startDate = null, endDate = null}) => {
      return db.any("select * from campaign  where campaign_start > $1 and campaign_end <= $2 ", [new Date(startDate), new Date(endDate)])
        .then(res => res.map(fieldNameMapper));
    },
    getnCampaignPerMonth: (_, {startDate = null, endDate = null}) => {

      return db.any("select  date_trunc('month',campaign_start) as \"date\" , count(id)  from campaign where campaign_start > $1 and campaign_end <= $2  group by date  ORDER BY date_trunc('month', campaign_start) asc", [new Date(startDate), new Date(endDate)])
        .then(res => res.map(nCampaignPerMonthMapper));
    },
    getTotalBudgetPerMonth: (_, {startDate = null, endDate = null}) => {
      return db.any(" select  date_trunc('month',campaign_start) as \"date\" , sum(campaign_total_budget) as \"count\"  from campaign where campaign_start > $1 and campaign_end <= $2  group by \"date\" ORDER BY date_trunc('month', campaign_start) asc ", [new Date(startDate), new Date(endDate)])
        .then(res => {
          return res.map(nCampaignPerMonthMapper);
        });
    },
    getBudgetPerCampaign: (_, {startDate = null, endDate = null}) => {
      return db.any("select  campaign_name , sum(campaign_total_budget) as \"budget\"  from campaign where campaign_start > $1 and campaign_end <= $2  group by campaign_name , campaign_start order by campaign_start asc;", [new Date(startDate), new Date(endDate)])
        .then(res => res.map(campaignBudgetPerMonth));
    },
    getSalesPerCampaign: (_, {startDate = null, endDate = null}) => {
      return db.any("select  campaign_name , sum(campaign_total_sales) as \"sales\"  from campaign  where campaign_start > $1 and campaign_end <= $2 group by campaign_name , campaign_start order by campaign_start asc", [new Date(startDate), new Date(endDate)])
        .then(res => res.map(campaignSalesPerMonth));
    }
  },
  Mutation: {
    jobDiscountProductCampaign: () => {
      return db.any("select * from campaign ")
        .then(campaigns => {
          campaigns.forEach(campaign => {
            if (dateBetweenCheck2(campaign.campaign_start, campaign.campaign_end, Date.now())) {
              let productsArr = campaign.products.products;
              let discountPromises = [];
              if (productsArr.length > 0) {
                productsArr.forEach(item => {
                  let firstDiscountPrice = CalculateDiscount(campaign.primary_discount, item.price);
                  let secondDiscountPrice = CalculateDiscount(campaign.secondary_discount, firstDiscountPrice);
                  discountPromises.push(
                    db.none("update products set kadoqu_discount = $1 , kadoqu_discount_until = $2 where  id = $3", [secondDiscountPrice, campaign.campaign_end, item.id])
                  );
                });
                return Promise.all(discountPromises)
                  .then(() => {
                    return true;
                  });
              } else {
                return false;
              }

            } else {
              return false;
            }
          });
        });
    },
    discountProductOnSelectedCampaign: (_, {idCampaign}) => {
      return db.one("select * from campaign where id = $1", [idCampaign])
        .then(campaign => {
          if (dateBetweenCheck2(campaign.campaign_start, campaign.campaign_end, Date.now())) {
            let productsArr = campaign.products.products;
            let discountPromises = [];
            if (productsArr.length > 0) {
              productsArr.forEach(item => {
                let firstDiscountPrice = CalculateDiscount(campaign.primary_discount, item.price);
                let secondDiscountPrice = CalculateDiscount(campaign.secondary_discount, firstDiscountPrice);
                discountPromises.push(
                  db.none("update products set kadoqu_discount = $1 , kadoqu_discount_until = $2 where  id = $3", [secondDiscountPrice, campaign.campaign_end, item.id])
                );
              });
              return Promise.all(discountPromises)
                .then(() => {
                  return true;
                });
            } else {
              return false;
            }

          } else {
            return false;
          }

        });
    },
    countSelectedCampaignSales: (_, {selectedCampaign}) => {
      if (selectedCampaign.length > 0) {

        selectedCampaign.forEach(item => {
          let sql = "select order_products.order_id , order_products.product,order_products.quantity,orders.order_status_id ,order_products.created_at  from order_products inner  join orders on order_products.order_id = orders.id where orders.created_at >= $1  and orders.created_at <= $2 and orders.order_status_id > 1 and orders.order_status_id < 6 order by orders.created_at asc";
          return db.any(sql, [new Date(item.campaignStart), new Date(item.campaignEnd)])
            .then(orders => {

              let campaignProduct = item.products.products;
              let filteredOrder = orders.filter(n => campaignProduct.some(n2 => n.product.id == n2.id));
              let totalBudgetThisCampaign = 0;
              let totalSalesThisCampaign = 0;
              console.log(filteredOrder);
              filteredOrder.forEach(orders => {
                if (orders.product.kadoquDiscount !== 0 || orders.product.kadoquDiscount !== null) {
                  totalBudgetThisCampaign += orders.product.kadoquDiscount * orders.quantity;
                } else {
                  totalBudgetThisCampaign += orders.product.merchantDiscount * orders.quantity;
                }

                totalSalesThisCampaign += orders.product.price * orders.quantity;
              });
              db.none("update campaign set campaign_total_budget =  $1 ,  campaign_total_sales = $3 where id = $2 ", [totalBudgetThisCampaign, item.id, totalSalesThisCampaign]);
              return true;
            })
            .catch((e) => new Error(e.message));
        });
      } else {
        return false;
      }


    },
    deleteCampaign: (_, {id}) => {
      return db.one("delete from campaign where id = $1 returning *", [id])
        .then(() => true)
        .catch(() => false);
    },
    discountProductByCampaign: (_, {id}) => {
      return db.one("select * from campaign where id = $1", [id])
        .then(res => {
          let productsInCampaign = res.products.products;
          let primaryDiscount = res.primary_discount;
          let secondaryDiscount = res.secondary_discount;
          let campaignStartDate = res.campaign_start;
          let campaignEndDate = res.campaign_end;
          let dateNow = Date.now();
          if (dateBetweenCheck2(campaignStartDate, campaignEndDate, dateNow)) {
            productsInCampaign.forEach(prouct => {
              //todo optimize this with merchant discount :)
              let productId = prouct.id;
              let firstDiscountPrice = CalculateDiscount(primaryDiscount, prouct.merchantPrice);
              let secondDiscountPrice = CalculateDiscount(secondaryDiscount, firstDiscountPrice);
              db.none("update products set kadoqu_discount = $1 , kadoqu_discount_until = $2 where  id = $3", [secondDiscountPrice, campaignEndDate, productId]);
            });
            return "sukses";
          } else {
            return "Campaign ini Sudah Tidak Berlaku lagi";
          }

        });
    },
    addCampaign: (_, {input}) => {
      return db.one("insert into campaign (campaign_name , products , campaign_start,campaign_end,primary_discount , secondary_discount) values($1 , $2 , $3 , $4 , $5 , $6) returning *", [input.name, input.products, input.campaignStart, input.campaignEnd, input.primaryDiscount, input.secondaryDiscount])
        .then(() => true)
        .catch((e) => new Error(e.message));
    },
    countTotalSales: (_, {orders}) => {
      //cause this function will count from all campaign so we need to reeset total sales so the value dosent increase repeatly
      // TODO will optimize this code with date but for know it must be work :) deadline mepet gengs -jooo
      db.none("update campaign set campaign_total_sales = 0");
      db.none("update campaign set campaign_total_budget = 0");
      return db.any("select * from campaign")
        .then(res => {
          res.forEach(campaign => {
            let totalBudgetPerCampaign = 0;
            let totalSalesPerCampaign = 0;
            let arrProductCampaign = campaign.products.products;
            orders.forEach(order => {
              if (dateBetweenCheck(campaign.campaign_start, campaign.campaign_end, order.createdAt)) {
                let productsWithoutWrapping = order.orderProducts;
                let uniqueProdutWithoutWrapping = [];
                arrProductCampaign.forEach(productCampaign => {
                  productsWithoutWrapping.forEach(orderProduct => {
                    if (productCampaign.id === orderProduct.product.id) {
                      uniqueProdutWithoutWrapping.push(orderProduct);
                    }
                  });
                });
                uniqueProdutWithoutWrapping.forEach(product => {
                  totalBudgetPerCampaign += product.product.kadoquDiscount * product.quantity;
                  totalSalesPerCampaign += product.product.price * product.quantity;
                });
                let productsWithWrapping = order.orderWrappings;
                productsWithWrapping.forEach(wrapper => {
                  let productsWithWrapping = wrapper.items;
                  let uniqueProductWithWrapping = [];
                  arrProductCampaign.forEach(productCampaign => {
                    productsWithWrapping.forEach(orderProduct => {
                      if (productCampaign.id === orderProduct.product.id) {
                        uniqueProductWithWrapping.push(orderProduct);
                      }
                    });
                  });
                  uniqueProductWithWrapping.forEach(product => {
                    totalBudgetPerCampaign += product.product.kadoquDiscount * product.quantity;
                    totalSalesPerCampaign += product.product.price * product.quantity;
                  });
                });
              }
            });
            // console.log(totalBudgetPerCampaign);
            db.none("update campaign set campaign_total_budget =  campaign_total_budget + $1 where id = $2 ", [totalBudgetPerCampaign, campaign.id]);
            db.none("update campaign set campaign_total_sales =  campaign_total_sales + $1 where id = $2 ", [totalSalesPerCampaign, campaign.id]);
            return true;
          });
        });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
