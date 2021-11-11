const KADOQU_NAME_AS_MERCHANT = "Kadoqu.com";

const KADOQU_START_YEAR = 2017;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

// const LIGA_LOGO ={
//   logo :{
// 1 :"https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga1.png",
// 2 :"https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga2.png",
// 3: "https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga3.png",
// 4: "https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga4.png",
// 5: "https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament-liga5.png"
//   }
// }

const BANNER_LOCATION = {
  carousels: {
    home: "HOME__CAROUSEL"
  },
  titles: {
    gallery: {
      desktop: "GALLERY__DES__TITLE",
      mobile: "GALLERY__MOB__TITLE"
    },
    "wrapping-lab": {
      desktop: "WRAPPING_LAB__DES__TITLE",
      mobile: "WRAPPING_LAB__MOB__TITLE"
    },
    "our-partners": {
      desktop: "PARTNER__DES__TITLE",
      mobile: "PARTNER__MOB__TITLE"
    }
  },
  "product list": {
    "1001-inspirasi-kado": {
      desktop: "1001_INSPIRASI_KADO__DES__TITLE",
      mobile: "1001_INSPIRASI_KADO__MOB__TITLE"
    },
    "kadoqu-gift": {
      desktop: "KADOQU_GIFT__DES__TITLE",
      mobile: "KADOQU_GIFT__MOB__TITLE"
    }
  }
};

const PRODUCT_CATEGORIES = [
  { id: 1, name: "Gift" },
  { id: 2, name: "Magical Moment" },
  { id: 3, name: "Company Celebration" },
  { id: 4, name: "Birthday Package" },
  { id: 5, name: "Case" },
  { id: 6, name: "Holiday" }
];

export {
  KADOQU_NAME_AS_MERCHANT,
  KADOQU_START_YEAR,
  MONTHS,
  BANNER_LOCATION,
  PRODUCT_CATEGORIES
};

export const AppString = {
  ID: "id",
  PHOTO_URL: "photoUrl",
  NICKNAME: "nickname",
  ABOUT_ME: "aboutMe",
  NODE_MESSAGES: "messages",
  NODE_USERS: "users",
  UPLOAD_CHANGED: "state_changed",
  DOC_ADDED: "added",
  PREFIX_IMAGE: "image/"
};
