import routes from "./routes";

const adminOnlyUrls = new Set(
  routes
    .map(route => (route.adminOnly ? route.path : null))
    .filter(el => el != null)
);

const merchantOnlyUrls = new Set(
  routes
    .map(route => (route.merchantOnly ? route.path : null))
    .filter(el => el != null)
);

const ITEMS = [
  {
    name: "Dashboard",

    children: [
      {
        name: "Main Dashboard",
        url: "/dashboard",
        icon: "icon-home"
      },
      {
        name: "Merchant Tournament",
        url: "/merchant/tournament",
        icon: "icon-trophy"
      }
    ]
  },
  {
    title: true,
    name: "Fluid Data",
    wrapper: {
      // optional wrapper object
      element: "", // required valid HTML5 element tag
      attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    },
    class: "" // optional class names space delimited list for title item ex: "text-center"
  },
  {
    name: "Products",
    url: "/products",
    icon: "icon-present",
    children: [
      {
        name: "Product List",
        url: "/products/list",
        icon: "icon-list"
      },
      {
        name: "Product List by Category",
        url: "/products/list-by-category",
        icon: "icon-list"
      },
      {
        name: "Add Product",
        url: "/products/add",
        icon: "icon-plus"
      },
      {
        name: "Add Holiday Product",
        url: "/products/add-holiday",
        icon: "icon-plane"
      },
      {
        name: "Product Review",
        url: "/products/review",
        icon: "icon-eyeglass"
      },
      {
        name: "Product Reviewed",
        url: "/products/rejected",
        icon: "icon-ban"
      }
    ]
  },
  {
    name: "Orders",
    url: "/orders",
    icon: "icon-basket-loaded",
    children: [
      {
        name: "Ongoing",
        url: "/orders/ongoing",
        icon: "icon-fire"
      },
      {
        name: "Past",
        url: "/orders/past",
        icon: "icon-drawer"
      },
      {
        name: "Canceled",
        url: "/orders/canceled",
        icon: "icon-close"
      },
      {
        name: "All",
        url: "/orders/all",
        icon: "icon-list"
      }
    ]
  },
  {
    name: "Vouchers",
    url: "/vouchers",
    icon: "icon-tag",
    children: [
      {
        name: "Voucher List",
        url: "/vouchers/list",
        icon: "icon-list"
      },
      {
        name: "Add Voucher",
        url: "/vouchers/add",
        icon: "icon-plus"
      },
      {
        name: "Voucher Usages",
        url: "/voucher-usages/list",
        icon: "icon-list"
      }
    ]
  },
  {
    name: "Chat",
    url: "/chat",
    icon: "icon-bubbles"
  },
  {
    title: true,
    name: "KPI Items",
    wrapper: {
      element: "",
      attributes: {}
    },
    class: ""
  },
  {
    name: "Marketing",
    url: "/marketing",
    icon: "icon-globe",
    children: [
      {
        name: "add Campaign",
        url: "/marketing/add/campaign",
        icon: "icon-plus"
      },
      {
        name: "List Campaign",
        url: "/marketing/campaign",
        icon: "icon-graph"
      },
      {
        name: "Chart ",
        url: "/marketing/chart",
        icon: "icon-pie-chart"
      }
      // {
      //   name: "Sales",
      //   url: "/marketing/sales",
      //   icon: "icon-basket-loaded"
      // }
    ]
  },
  {
    name: "Transaction",
    url: "/transaction",
    icon: "icon-wallet"
  },
  {
    name: "Product Rating",
    url: "/product/rating",
    icon: "icon-user-follow"
  },
  {
    name: "Customer Profile",
    url: "/customer-profile",
    icon: "icon-pencil"
  },
  {
    name: "Product",
    url: "/product",
    icon: "icon-pencil"
  },
  {
    name: "Gida",
    url: "/gida-kpi",
    icon: "icon-pencil"
  },
  {
    title: true,
    name: "Rigid Data",
    wrapper: {
      element: "",
      attributes: {}
    },
    class: ""
  },
  {
    name: "Categories",
    url: "/categories",
    icon: "icon-paper-clip",
    children: [
      {
        name: "Gift Categories",
        url: "/categories/gift",
        icon: "icon-present"
      },
      {
        name: "Store Categories",
        url: "/categories/store",
        icon: "icon-tag"
      },
      {
        name: "Event Categories",
        url: "/categories/event",
        icon: "icon-clock"
      },
      {
        name: "Holiday Categories",
        url: "/categories/holiday",
        icon: "icon-plane"
      }
    ]
  },
  {
    name: "Wrapping Lab",
    url: "/wrapping-lab",
    icon: "icon-magic-wand",
    children: [
      {
        name: "Wrappers",
        url: "/wrapping-lab/wrappers",
        icon: "icon-present"
      },
      {
        name: "Ribbons",
        url: "/wrapping-lab/ribbons",
        icon: "icon-badge"
      }
    ]
  },
  {
    name: "GIdA",
    url: "/gida",
    icon: "icon-emotsmile"
  },
  {
    name: "Add Testimonies",
    url: "/testimonies/add",
    icon: "icon-tag"
  },
  {
    name: "List Testimonies",
    url: "/testimonies/list",
    icon: "icon-tag"
  },
  {
    name: "Banners",
    url: "/banners",
    icon: "icon-picture",
    children: [
      {
        name: "Category Banners",
        url: "/banners/category",
        icon: "icon-tag"
      },
      {
        name: "Carousel Banners",
        url: "/banners/carousel",
        icon: "icon-layers"
      },
      {
        name: "Other Banners",
        url: "/banners/other",
        icon: "icon-frame"
      }
    ]
  },
  {
    name: "Promotions",
    url: "/promotions",
    icon: "icon-graph",
    children: [
      {
        name: "Promotion List",
        url: "/promotions/list",
        icon: "icon-list"
      },
      {
        name: "Add Promotion",
        url: "/promotions/add",
        icon: "icon-plus"
      },
    ]
  },
  {
    title: true,
    name: "User Management",
    wrapper: {
      element: "",
      attributes: {}
    }
  },
  {
    name: "Customers",
    url: "/customers",
    icon: "icon-user"
  },
  {
    name: "Add User",
    url: "/users/add",
    icon: "icon-user-follow"
  },
  {
    name: "Edit / Remove User",
    url: "/users",
    icon: "icon-pencil"
  }
];

const filterItems = (navItems, urlFilter) => {
  let filteredItems = [];
  navItems
    .slice()
    .reverse()
    .forEach(item => {
      let newItem = { ...item };
      if (newItem.title) {
        if (filteredItems.length === 0 || filteredItems.slice(-1)[0].title) {
          return;
        }
        filteredItems.push(newItem);
        return;
      }
      if (item.children) {
        const newChildren = item.children
          .map(child => (urlFilter.has(child.url) ? null : { ...child }))
          .filter(el => el != null);
        if (newChildren.length === 0) {
          delete newItem.children;
        } else {
          newItem.children = newChildren;
        }
      }
      if (!urlFilter.has(newItem.url)) {
        filteredItems.push(newItem);
      }
    });
  filteredItems.reverse();
  return filteredItems;
};

export default isAdmin => ({
  items: isAdmin
    ? filterItems(ITEMS, merchantOnlyUrls)
    : filterItems(ITEMS, adminOnlyUrls)
});
