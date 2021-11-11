import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const MAX_PRODUCT_ADMIN_PER_PAGE = 6;
const MAX_PRODUCT_CUSTOMER_PER_PAGE = 5;

// Create styles
const styles = StyleSheet.create({
  page: {
    color: "#059487",
  },
  header: {
    width: "100%",
    marginHorizontal: 30,
    marginTop: 30,
    flexDirection: "row",
  },
  kadoquLogo: {
    maxWidth: "40%",
  },
  headerLogo: {
    flexGrow: 8,
  },
  headerInvoice: {
    flexGrow: 4,
    marginTop: -5,
  },
  invoiceTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  headerDate: {
    fontSize: "15pt",
    marginBottom: 3,
  },
  billAndPayment: {
    width: "100%",
    marginHorizontal: 34,
    height: "80px",
    marginTop: 25,
    flexDirection: "row",
    fontSize: "12pt",
  },
  bill: {
    flexGrow: 7.5,
  },
  billTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  payment: {
    flexGrow: 4.5,
  },
  p: {
    marginBottom: 3,
  },
  table: {
    display: "table",
    width: "100%",
    fontSize: "11pt",
    marginTop: 30,
    height: "310px",
  },
  tableCustomer: {
    display: "table",
    paddingHorizontal: 34,
    width: "100%",
    fontSize: "11pt",
    marginTop: 30,
    height: "220px",
  },
  tableRow: {
    marginHorizontal: 5,
    flexDirection: "row",
  },
  tableRowCustomer: {
    flexDirection: "row",
  },
  productHeadRow: {
    marginHorizontal: 5,
    flexDirection: "row",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#059487",
    paddingVertical: 5,
  },
  productRow: {
    marginHorizontal: 5,
    flexDirection: "row",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#059487",
    paddingVertical: 5,
  },
  productCustRow: {
    marginHorizontal: 5,
    flexDirection: "row",
    borderStyle: "solid",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#059487",
    paddingVertical: 5,
  },
  skuCol: {
    width: "13%",
  },
  qtyCol: {
    width: "5%",
  },
  qtyCustCol: {
    width: "10%",
  },
  productCol: {
    width: "16%",
  },
  productCustCol: {
    width: "50%",
  },
  priceCol: {
    width: "11.5%",
  },
  priceCustCol: {
    width: "20%",
  },
  otherPriceCol: {
    width: "10%",
  },
  subtotal: {
    width: "14.5%",
  },
  subtotalCust: {
    width: "20%",
  },
  productNames: {
    maxLines: 2,
  },
  footer: {
    paddingHorizontal: 34,
    marginBottom: 10,
    width: "100%",
    fontSize: "12pt",
  },
  totalSummary: {
    marginBottom: 15,
    width: "100%",
    marginLeft: "65%",
  },
  red: {
    color: "#cd002e",
    paddingVertical: 1,
  },
  grandTotalText: {
    paddingVertical: 1,
  },
  shippingAddress: {
    width: "100%",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#059487",
    paddingTop: 15,
    flexDirection: "row",
  },
  delivery: {
    flexGrow: 10,
  },
  headline: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 1.5,
  },
  headlineDelivery: {
    marginTop: 15,
    marginBottom: 1.5,
    fontFamily: "Helvetica-Bold",
  },
  sender: {
    flexGrow: 2,
    marginTop: 40,
  },
  senderWarehouse: {
    flexGrow: 2,
  },
  shippingText: {
    marginBottom: 1.5,
  },
  pageNumber: {
    position: "absolute",
    right: 8,
    top: 5,
    fontSize: "10pt",
  },
  thankYouWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  thankYou: {
    width: "100%",
    backgroundColor: "#059487",
    paddingVertical: 18,
  },
  thankYouText: {
    color: "white",
    margin: "auto",
  },
  gida: {
    maxWidth: "20%",
    position: "relative",
    left: 450,
    top: 5.5,
  },
  wrappingImage: {
    maxWidth: "70px",
    marginTop: 5,
  },
  wrappinLab: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 5,
    height: "110px",
  },
  wrapper: {
    width: "33,3%",
    flexGrow: 5,
  },
  wrapperBold: {
    marginBottom: 1.5,
    fontFamily: "Helvetica-Bold",
  },
  wrappingId: {
    fontFamily: "Helvetica-Bold",
    fontSize: "14pt",
    marginLeft: 5,
    marginBottom: 5,
  },
  greetings: {
    fontSize: "8pt",
  },
});

const ContentCustomer = (props) => {
  const { products } = props;
  return (
    <View style={styles.tableCustomer}>
      <View style={styles.productHeadRow}>
        <View style={styles.qtyCustCol}>
          <Text>QTY</Text>
        </View>
        <View style={styles.productCustCol}>
          <Text>Description</Text>
        </View>
        <View style={styles.priceCustCol}>
          <Text>Price</Text>
        </View>
        <View style={styles.subtotalCust}>
          <Text>Total</Text>
        </View>
      </View>
      {products.map((item, index) => {
        let { quantity, product } = item;
        return (
          <View
            style={styles.productCustRow}
            key={`product-${product.name}-${index}`}
          >
            <View style={styles.qtyCustCol}>
              <Text>{quantity}</Text>
            </View>
            <View style={styles.productCustCol}>
              <Text style={styles.productNames}>{product.name}</Text>
            </View>
            <View style={styles.priceCustCol}>
              <Text>{product.priceForCust}</Text>
            </View>
            <View style={styles.subtotalCust}>
              <Text>{product.subtotal}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const ContentAdmin = (props) => {
  const { products } = props;
  return (
    <View style={styles.table}>
      {props.wrappingItem && (
        <View>
          <View>
            <Text style={styles.wrappingId}>
              {props.wrappingItem.id} | Wrapping fee: Rp{" "}
              {props.wrappingItem.fee}
            </Text>
          </View>
          <View style={styles.wrappinLab}>
            {props.wrappingItem.wrapper && (
              <View style={styles.wrapper}>
                <Text style={styles.wrapperBold}>Wrapper :</Text>
                <Text>
                  {props.wrappingItem.wrapper.type} -{" "}
                  {props.wrappingItem.wrapper.name}
                </Text>
                <Image
                  src={props.wrappingItem.wrapper.image}
                  style={styles.wrappingImage}
                />
              </View>
            )}
            {props.wrappingItem.ribbon && (
              <View style={styles.wrapper}>
                <Text style={styles.wrapperBold}>Ribbon :</Text>
                <Text>
                  {props.wrappingItem.ribbon.type} -{" "}
                  {props.wrappingItem.ribbon.name}
                </Text>
                <Image
                  src={props.wrappingItem.ribbon.image}
                  style={styles.wrappingImage}
                />
              </View>
            )}
            {props.wrappingItem.greetingCard && (
              <View style={styles.wrapper}>
                <Text style={styles.wrapperBold}>Greeting Card :</Text>
                <Text>{props.wrappingItem.greetingCard.event}</Text>
                <Text style={styles.greetings}>
                  "{props.wrappingItem.greetingCard.greetings}"
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
      <View style={styles.tableRow}>
        <View style={styles.qtyCol}>
          <Text>QTY</Text>
        </View>
        <View style={styles.skuCol}>
          <Text>SKU</Text>
        </View>
        <View style={styles.productCol}>
          <Text>Product</Text>
        </View>
        <View style={styles.priceCol}>
          <Text>Merchant Price</Text>
        </View>
        <View style={styles.priceCol}>
          <Text>Kadoqu Buying Price</Text>
        </View>
        <View style={styles.priceCol}>
          <Text>Kadoqu Selling Price</Text>
        </View>
        <View style={styles.otherPriceCol}>
          <Text>Digital Marketing</Text>
        </View>
        <View style={styles.otherPriceCol}>
          <Text>Merchant Discount Price</Text>
        </View>
        <View style={styles.subtotal}>
          <Text>Subtotal</Text>
        </View>
      </View>
      {products.map((item, index) => {
        let { quantity, product } = item;
        return (
          <View
            style={styles.productRow}
            key={`product-${product.name}-${index}`}
          >
            <View style={styles.qtyCol}>
              <Text>{quantity}</Text>
            </View>
            <View style={styles.skuCol}>
              <Text>{product.sku}</Text>
            </View>
            <View style={styles.productCol}>
              <Text style={styles.productNames}>{product.name}</Text>
            </View>
            <View style={styles.priceCol}>
              <Text>{product.merchantPrice}</Text>
            </View>
            <View style={styles.priceCol}>
              <Text>{product.capitalPrice}</Text>
            </View>
            <View style={styles.priceCol}>
              <Text>{product.price}</Text>
            </View>
            <View style={styles.otherPriceCol}>
              <Text>{product.kadoquDiscount}</Text>
            </View>
            <View style={styles.otherPriceCol}>
              <Text>{product.merchantDiscount}</Text>
            </View>
            <View style={styles.subtotal}>
              <Text>{product.subtotal}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const BillAndPayment = (props) => {
  let { view } = props;
  let { billingAddress } = view;
  return (
    <View style={styles.billAndPayment}>
      <View style={styles.bill}>
        <Text style={styles.billTitle}>BILL TO </Text>
        {view.shippingMethod !== "No Shipping" ? (
          <>
            <Text style={styles.p}>{billingAddress.name}</Text>
            <Text style={styles.p}>
              {billingAddress.city}, {billingAddress.province}
            </Text>
            <Text style={styles.p}>{billingAddress.postCode}</Text>
          </>
        ) : (
          <Text style={styles.p}>No Billing Address</Text>
        )}
      </View>
      <View style={styles.payment}>
        <Text style={styles.billTitle}>
          PAYMENT METHOD :{" "}
          {view.paymentConfirmationData ? view.paymentMethod : "-"}{" "}
        </Text>
        {view.paymentConfirmationData.status ? (
          <>
            <Text style={styles.billTitle}>
              PAYMENT STATUS : {view.paymentConfirmationData.bank}
            </Text>
            <Text style={styles.billTitle}>by</Text>
            <Text style={styles.billTitle}>
              {view.paymentConfirmationData.accountName}
            </Text>
            <Text style={styles.billTitle}>
              {view.paymentConfirmationData.transferTime}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.billTitle}>PAYMENT STATUS : NOT PAID</Text>
          </>
        )}
      </View>
    </View>
  );
};

const Header = (props) => {
  let { view } = props;
  return (
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <Image
          src="https://ik.imagekit.io/nwiq66cx3pvsy/kadoqu_HJeQl-ptdN.jpg"
          style={styles.kadoquLogo}
        />
      </View>
      <View style={styles.headerInvoice}>
        <Text style={styles.invoiceTitle}>
          INVOICE {props.type === "admin" ? "ADMIN" : ""}
        </Text>
        <Text style={styles.headerDate}>{view.createdAt}</Text>
        <Text>Order #{view.number}</Text>
      </View>
    </View>
  );
};
const Footer = (props) => {
  const { view } = props;
  const { shippingAddress } = view;
  return (
    <View style={styles.footer}>
      <View style={styles.totalSummary}>
        <Text style={styles.grandTotalText}>
          Total : Rp {view.productTotal}
        </Text>
        <Text style={styles.red}>Diskon Promo : Rp {view.productDiscount}</Text>
        <Text style={styles.red}>
          Diskon Voucher : Rp {view.voucherDiscount}
        </Text>
        <Text style={styles.grandTotalText}>
          Wrapping Fee : Rp {view.wrappingFee}
        </Text>
        <Text style={styles.grandTotalText}>
          Shipping Fee : Rp {view.shippingFee}
        </Text>
        <Text style={styles.grandTotalText}>Donation : Rp {view.donation}</Text>
        <Text style={styles.grandTotalText}>GRAND TOTAL : Rp {view.total}</Text>
      </View>
      <View style={styles.shippingAddress}>
        <View style={styles.delivery}>
          <Text style={styles.headline}>SHIPPING METHOD</Text>
          <Text style={styles.shippingText}>{view.shippingMethod}</Text>
          {view.shippingMethod !== "Ambil di Warehouse" &&
            view.shippingMethod !== "No Shipping" && (
              <>
                <Text style={styles.headlineDelivery}>DELIVERY ADDRESS</Text>
                <Text style={styles.shippingText}>{shippingAddress.name}</Text>
                <Text style={styles.shippingText}>
                  {shippingAddress.street}
                </Text>
                <Text style={styles.shippingText}>
                  {shippingAddress.country}
                </Text>
                <Text style={styles.shippingText}>
                  {shippingAddress.postCode}
                </Text>
                <Text style={styles.shippingText}>{shippingAddress.phone}</Text>
              </>
            )}
        </View>
        <View
          style={
            view.shippingMethod !== "Ambil di Warehouse" &&
            view.shippingMethod !== "No Shipping"
              ? styles.sender
              : styles.senderWarehouse
          }
        >
          <Text style={styles.headline}> SENDER ADDRESS</Text>
          <Text style={styles.shippingText}>Kadoqu.com</Text>
          <Text style={styles.shippingText}>Jl. Prof. Eyckman 28P</Text>
          <Text style={styles.shippingText}>Pasteur, Sukajadi</Text>
          <Text style={styles.shippingText}>Bandung, Jawa Barat</Text>
          <Text style={styles.shippingText}>14161</Text>
          <Text style={styles.shippingText}>08112181600</Text>
        </View>
      </View>
    </View>
  );
};

const ThankYouFooter = () => {
  return (
    <View style={styles.thankYouWrapper}>
      <Image
        src="https://ik.imagekit.io/nwiq66cx3pvsy/gidapdf.jpg"
        style={styles.gida}
      />
      <View style={styles.thankYou}>
        <Text style={styles.thankYouText}>THANK YOU FOR YOUR ORDER !</Text>
      </View>
    </View>
  );
};
// Create Document Component
const InvoiceAdmin = (props) => {
  let orders = [];

  console.log(props);
  if (!Array.isArray(props.view)) {
    var { view } = props;
    var { products, wrappingLab } = view;
    var page = 0;
    var totalPage = 0;
    products.forEach((element, index) => {
      if (
        index %
          (props.type === "admin"
            ? MAX_PRODUCT_ADMIN_PER_PAGE
            : MAX_PRODUCT_CUSTOMER_PER_PAGE) ===
        0
      )
        totalPage++;
    });

    if (props.type === "admin") {
      totalPage += wrappingLab.length;
    }
  } else {
    orders = props.view;
  }
  return (
    <Document>
      {orders.length > 0 ? (
        orders.map((view) => {
          let page = 0;
          let totalPage = 0;
          let { products, wrappingLab } = view;
          products.forEach((element, index) => {
            if (
              index %
                (props.type === "admin"
                  ? MAX_PRODUCT_ADMIN_PER_PAGE
                  : MAX_PRODUCT_CUSTOMER_PER_PAGE) ===
              0
            )
              totalPage++;
          });
          if (props.type === "admin") {
            totalPage += wrappingLab.length;
          }
          return (
            <>
              {products.map((items, index) => {
                if (
                  index %
                    (props.type === "admin"
                      ? MAX_PRODUCT_ADMIN_PER_PAGE
                      : MAX_PRODUCT_CUSTOMER_PER_PAGE) ===
                  0
                ) {
                  page++;
                  return (
                    <Page
                      size="A4"
                      style={styles.page}
                      key={`invoice-${props.type}-#${view.order}-${index}`}
                    >
                      <Header view={view} type={props.type} />
                      <BillAndPayment view={view} />
                      {props.type === "admin" ? (
                        <ContentAdmin
                          products={products.slice(
                            index,
                            index + MAX_PRODUCT_ADMIN_PER_PAGE
                          )}
                        />
                      ) : (
                        <ContentCustomer
                          products={products.slice(
                            index,
                            index + MAX_PRODUCT_CUSTOMER_PER_PAGE
                          )}
                        />
                      )}
                      <Footer view={view} />
                      <Text
                        style={styles.pageNumber}
                      >{`${page} of ${totalPage} page(s) for order #${view.number}`}</Text>
                      {props.type !== "admin" && <ThankYouFooter />}
                    </Page>
                  );
                }
                return <></>;
              })}

              {props.type === "admin" &&
                wrappingLab.map((items, index) => {
                  page++;
                  return (
                    <Page
                      size="A4"
                      style={styles.page}
                      key={`invoice-${props.type}-wrapping-lab-#${view.order}-${index}`}
                    >
                      <Header view={view} type={props.type} />
                      <BillAndPayment view={view} />
                      {props.type === "admin" ? (
                        <ContentAdmin
                          products={items.products}
                          wrappingItem={items.wrappingData}
                        />
                      ) : (
                        <ContentCustomer products={items.products} />
                      )}
                      <Footer view={view} />
                      <Text style={styles.pageNumber}>
                        {`${page} of ${totalPage} page(s) for order #${view.number}`}
                      </Text>
                      {props.type !== "admin" && <ThankYouFooter />}
                    </Page>
                  );
                })}
            </>
          );
        })
      ) : (
        <>
          {products.map((items, index) => {
            if (
              index %
                (props.type === "admin"
                  ? MAX_PRODUCT_ADMIN_PER_PAGE
                  : MAX_PRODUCT_CUSTOMER_PER_PAGE) ===
              0
            ) {
              page++;
              return (
                <Page
                  size="A4"
                  style={styles.page}
                  key={`invoice-${props.type}-#${view.order}-${index}`}
                >
                  <Header view={view} type={props.type} />
                  <BillAndPayment view={view} />
                  {props.type === "admin" ? (
                    <ContentAdmin
                      products={products.slice(
                        index,
                        index + MAX_PRODUCT_ADMIN_PER_PAGE
                      )}
                    />
                  ) : (
                    <ContentCustomer
                      products={products.slice(
                        index,
                        index + MAX_PRODUCT_CUSTOMER_PER_PAGE
                      )}
                    />
                  )}
                  <Footer view={view} />
                  <Text style={styles.pageNumber}>
                    {`${page} of ${totalPage}`} page(s)
                  </Text>
                  {props.type !== "admin" && <ThankYouFooter />}
                </Page>
              );
            }
            return <></>;
          })}

          {props.type === "admin" &&
            wrappingLab.map((items, index) => {
              page++;
              console.log(items);
              return (
                <Page
                  size="A4"
                  style={styles.page}
                  key={`invoice-${props.type}-wrapping-lab-#${view.order}-${index}`}
                >
                  <Header view={view} type={props.type} />
                  <BillAndPayment view={view} />
                  {props.type === "admin" ? (
                    <ContentAdmin
                      products={items.products}
                      wrappingItem={items.wrappingData}
                    />
                  ) : (
                    <ContentCustomer
                      products={items.products}
                      wrappingItem={items.wrappingData}
                    />
                  )}
                  <Footer view={view} />
                  <Text style={styles.pageNumber}>
                    {`${page} of ${totalPage}`} page(s)
                  </Text>
                  {props.type !== "admin" && <ThankYouFooter />}
                </Page>
              );
            })}
        </>
      )}
    </Document>
  );
};
export default InvoiceAdmin;
