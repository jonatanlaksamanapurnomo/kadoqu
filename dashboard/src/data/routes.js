import React from "react";

const Home = React.lazy(() => import("../pages/Home"));
const AddProductForm = React.lazy(() => import("../pages/AddProductForm"));
const AddProductHolidayForm = React.lazy(() =>
  import("../pages/AddProductHolidayForm")
);

const ProductList = React.lazy(() => import("../pages/ProductList"));
const ProductListByCategory = React.lazy(() =>
  import("../pages/ProductListByCategory")
);
const EditProduct = React.lazy(() => import("../pages/EditProduct"));
const ProductReview = React.lazy(() => import("../pages/ProductReview"));
const RejectedProductList = React.lazy(() =>
  import("../pages/RejectedProductList")
);
const MerchantTournament = React.lazy(() =>
  import("../pages/MerchantTournament")
);

const OrderList = React.lazy(() => import("../pages/OrderList"));
const OrderDetail = React.lazy(() => import("../pages/OrderDetail"));
const AddUser = React.lazy(() => import("../pages/AddUser"));
const UserList = React.lazy(() => import("../pages/UserList"));
const EditUser = React.lazy(() => import("../pages/EditUser"));
const GiftCategoryList = React.lazy(() => import("../pages/GiftCategoryList"));
const StoreCategoryList = React.lazy(() =>
  import("../pages/StoreCategoryList")
);
const EventCategoryList = React.lazy(() =>
  import("../pages/EventCategoryList")
);
const HolidayCategoryList = React.lazy(() =>
  import("../pages/HolidayCategoryList")
);
const EditGiftCategory = React.lazy(() => import("../pages/EditGiftCategory"));
const EditWrapper = React.lazy(() => import("../pages/EditWrapper"));
const EditRibbon = React.lazy(() => import("../pages/EditRibbon"));
const GidaOptionList = React.lazy(() => import("../pages/GidaOptionList"));
const EditCategoryBanners = React.lazy(() =>
  import("../pages/EditCategoryBanners")
);
const EditCarouselBanners = React.lazy(() =>
  import("../pages/EditCarouselBanners")
);
const EditBanners = React.lazy(() => import("../pages/EditBanners"));
const VoucherList = React.lazy(() => import("../pages/VoucherList"));
const AddVoucher = React.lazy(() => import("../pages/AddVoucher"));
const EditVoucher = React.lazy(() => import("../pages/EditVoucher"));
const VoucherUsageList = React.lazy(() => import("../pages/VoucherUsageList"));
const CustomerList = React.lazy(() => import("../pages/CustomerList"));
const AddCamapign = React.lazy(() => import("../pages/MarketingAddCampaign"));
const NumberOfCampaign = React.lazy(() =>
  import("../pages/MarketingNumberCampaign")
);
const MarketingChart = React.lazy(() => import("../pages/MarketingChart"));
const MarketingSales = React.lazy(() => import("../pages/MarketingSales"));
const Testimonies = React.lazy(() => import("../pages/AddTestimonies"));
const TestimoniesList = React.lazy(() => import("../pages/TestimoniesList"));
const CampaignDetailPage = React.lazy(() => import("../pages/CampaignDetail"));
const Chat = React.lazy(() => import("../pages/Chat"));
const ProductRating = React.lazy(() => import("../pages/ProductRatings"));
const PromotionList = React.lazy(() => import("../pages/PromotionList"));
const AddPromotion = React.lazy(() => import("../pages/AddPromotion"));
const EditPromotion = React.lazy(() => import("../pages/EditPromotion"));

const routes = [
  { path: "/dashboard", name: "Home", component: Home },
  {
    path: "/campaign/detail/:id",
    exact: true,
    name: "CampaignDetail",
    component: CampaignDetailPage
  },
  {
    path: "/marketing/add/campaign",
    exact: true,
    name: "AddCampaign",
    component: AddCamapign
  },
  {
    path: "/marketing/campaign",
    exact: true,
    name: "MarketingCampaign",
    component: NumberOfCampaign
  },
  {
    path: "/marketing/chart",
    exact: true,
    name: "MarketingBudget",
    component: MarketingChart
  },
  {
    path: "/marketing/sales",
    exact: true,
    name: "MarketingSales",
    component: MarketingSales
  },
  {
    path: "/products/add",
    exact: true,
    name: "Add Product",
    component: AddProductForm
  },

  {
    path: "/products/add-holiday",
    exact: true,
    name: "Add Product Holiday",
    component: AddProductHolidayForm
  },
  {
    path: "/products",
    name: "Products",
    exact: true
  },
  {
    path: "/products/list",
    exact: true,
    name: "Product List",
    component: ProductList
  },
  {
    path: "/products/list-by-category",
    exact: true,
    name: "Product List",
    component: ProductListByCategory
  },
  {
    path: "/products/edit/:id",
    exact: true,
    name: "Edit Product",
    component: EditProduct
  },
  {
    path: "/products/review",
    exact: true,
    name: "Product Review",
    component: ProductReview,
    adminOnly: true
  },
  {
    path: "/products/rejected",
    exact: true,
    name: "Rejected Products",
    component: RejectedProductList,
    merchantOnly: true
  },
  {
    path: "/orders",
    name: "Orders",
    exact: true
  },
  {
    path: "/orders/:state",
    name: "Order List",
    exact: true,
    component: OrderList
  },

  {
    path: "/order/:id",
    name: "Detail",
    exact: true,
    component: OrderDetail
  },
  {
    path: "/vouchers",
    name: "Vouchers",
    exact: true,
    adminOnly: true
  },
  {
    path: "/vouchers/list",
    name: "Voucher List",
    exact: true,
    component: VoucherList,
    adminOnly: true
  },
  {
    path: "/vouchers/add",
    name: "Add Voucher",
    exact: true,
    component: AddVoucher,
    adminOnly: true
  },
  {
    path: "/vouchers/edit/:id",
    name: "Edit Voucher",
    exact: true,
    component: EditVoucher,
    adminOnly: true
  },
  {
    path: "/voucher-usages/list",
    name: "Voucher Usage List",
    exact: true,
    component: VoucherUsageList,
    adminOnly: true
  },
  {
    path: "/users/add",
    exact: true,
    name: "Add User",
    component: AddUser,
    adminOnly: true
  },
  {
    path: "/customers",
    exact: true,
    name: "Customer List",
    component: CustomerList,
    adminOnly: true
  },
  {
    path: "/users",
    exact: true,
    name: "User List",
    component: UserList,
    adminOnly: true
  },
  {
    path: "/users/edit/:id",
    exact: true,
    name: "Edit User",
    component: EditUser
  },
  {
    path: "/categories",
    exact: true,
    name: "categories",
    adminOnly: true
  },
  {
    path: "/categories/gift",
    exact: true,
    name: "Gift Category List",
    component: GiftCategoryList,
    adminOnly: true
  },
  {
    path: "/categories/holiday",
    exact: true,
    name: "Holiday Category List",
    component: HolidayCategoryList,
    adminOnly: true
  },
  {
    path: "/categories/store",
    exact: true,
    name: "Store Category List",
    component: StoreCategoryList,
    adminOnly: true
  },
  {
    path: "/categories/event",
    exact: true,
    name: "Event Category List",
    component: EventCategoryList,
    adminOnly: true
  },
  {
    path: "/categories/gift/edit/:id",
    exact: true,
    name: "Edit Gift Category",
    component: EditGiftCategory,
    adminOnly: true
  },
  {
    path: "/wrapping-lab",
    exact: true,
    name: "Wrapping Lab",
    adminOnly: true
  },
  {
    path: "/wrapping-lab/wrappers",
    exact: true,
    name: "Wrappers",
    component: EditWrapper,
    adminOnly: true
  },
  {
    path: "/wrapping-lab/ribbons",
    exact: true,
    name: "Ribbons",
    component: EditRibbon,
    adminOnly: true
  },
  {
    path: "/gida",
    exact: true,
    name: "GIdA",
    component: GidaOptionList,
    adminOnly: true
  },
  {
    path: "/banners",
    exact: true,
    name: "Banners",
    adminOnly: true
  },
  {
    path: "/banners/other",
    exact: true,
    name: "Other Banners",
    component: EditBanners,
    adminOnly: true
  },
  {
    path: "/banners/carousel",
    exact: true,
    name: "Carousel Banners",
    component: EditCarouselBanners,
    adminOnly: true
  },
  {
    path: "/banners/category",
    exact: true,
    name: "Category Banners",
    component: EditCategoryBanners,
    adminOnly: true
  },
  {
    path: "/testimonies/add",
    exact: true,
    name: "Add testimony",
    component: Testimonies,
    adminOnly: true
  },
  {
    path: "/testimonies/list",
    exact: true,
    name: "List testimony",
    component: TestimoniesList,
    adminOnly: true
  },
  {
    path: "/merchant/tournament",
    exact: true,
    name: "Merchant Tournament",
    component: MerchantTournament
  },
  {
    path: "/product/rating",
    exact: true,
    name: "Product Rating",
    component: ProductRating
  },
  {
    path: "/chat",
    exact: true,
    name: "Chat",
    component: Chat,
    adminOnly: true
  },
  {
    path: "/promotions/list",
    exact: true,
    name: "Promotion List",
    component: PromotionList,
    adminOnly: true
  },
  {
    path: "/promotions/add",
    exact: true,
    name: "Add Promotion",
    component: AddPromotion,
    adminOnly: true
  },
  {
    path: "/promotions/edit/:id",
    exact: true,
    name: "Edit Promotion",
    component: EditPromotion,
    adminOnly: true
  }
];

export default routes;
