<center>
<h1>Kadoqu.com</h1>
</center>

This is the documentation file for Kadoqu<span>.com applications which divided into 3: _edge_ for back-end, _www_ for customers, and _dashboard_ for admins and merchants.

## Table of Contents

1. [Modules](#modules)
   - [Products](#products)
   - [Categories](#categories)
   - [Wrapping Lab](#wrapping-lab)
   - [Cart & Checkout](#cart--checkout)
   - [Orders](#orders)
   - [Gallery](#gallery-testimonies)
   - [Sweet Alert](#sweet-alert)
2. [Side Notes](#side-notes)
3. [Contributors](#contributors)

## Modules

### Products

#### 1. Data Structure

```javascript
Product: {
	id: String,
	name: String,
	merchant: String,
	sku: String, // generated upon add product, & can be changed if admin change the merchant
	slug: String, // URL key for a product
	shortDescription: String,
	longDescription: String,
	price: Float, // price offered to customer
	merchantPrice: Float, // capital price
	merchantDiscount: Float, // price after discount
	merchantDiscountUntil: Date,
	kadoquDiscount: Float, // price after discount
	kadoquDiscountUntil: Date,
	isEnable: Boolean,
	isPo: Boolean,
	newToDate: Date, // the last time a product considered as new
	stock: Int,
	weight: Float, // in gram
	length: Float, // in centimeter
	width: Float, // in centimeter
	height: Float, // in centimeter
	score: JSON,
	createdAt: String,
	updatedAt: String,
	categories: [Category],
	storeCategories: [StoreCategory],
	photos: [Photo],
	colors: [ProductColor],
	shippingSupports: [ProductShippingSupport]
}
```

SKU notation: `XXXdddddddddd` with X as merchant code & d as digits, an iterative value across all products (even with different merchant code) padded with 0.

#### 2. [www] Product List

Product list is made as a component because it is used in several page (1001 Inspirasi Kado and Kadoqu Gift). Product list has 3 main features that explained as below.

##### a) Fetching

Product list fetched with query `getAvailableProducts` which accepts column's name for sorting and also sorting method (symbolized as true for `isAscending`), filters, and limit + offset. Note that this query **only fetch enabled products**. This query returns object with length and products field. Length is the product count for all profucts possible under provided filters, while products is the products fetched with limit and offset applied.

##### b) Sort

Currently, there are only 4 available sorting methods defined as constant object in `ProductList.js` with key as the string displayed to customer & value as the sorting column's name and sorting method. The value is written under notation `<column name>|<1 or 2>` that would later be splitted upon query calling. 1 symbolized ASCENDING and 2 symbolized DESCENDING.

By default, products are sorted by create date, from the newest to the oldest.

##### c) Filter

Product cand be filtered by categories, price, offers, brands, and name. There are actually 2 more filters available: colors and shipping support, but currently hidden as requested by BC team.

The filters recapped in this table below.

| Filter        |         Query         | Description                                                                                                                                                                                                                                      |
| ------------- | :-------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Events        | `getStoreCategories`  | Only accessible in 1001 Inspirasi Kado page under the _Kategori_ headline                                                                                                                                                                        |
| Categories    | `getParentCategories` | Only accessible in Kadoqu Gift page under the _Kategori_ headline                                                                                                                                                                                |
| Subcategories | `getParentCategories` | Actually fetched along with Category object as children, the array then selected by filtering the categories array and fetch its children's name. If one category set then the _Kategori_ section will be replace by _Sub-Kategori_              |
| Price         |           -           | Constantly set as array of integer (`[0, 5000000]`), the first element indicate the lower bound (minimum price) and vice-versa                                                                                                                   |
| Offers        |           -           | Constantly set as array of string (`["New", "Sale", "Pre-Order"]`) which then mapped manually in edge. Pre-order is using the information provided by admin -- saved in is_po column, while new and sale filters have not functionated properly. |
| Brands        |    `getMerchants`     | Merchants array concatenated with "Kadoqu<span>.com" in front (because Kadoqu<span>.com is not considered as a merchant in database)                                                                                                             |

Name is a special case for filter as it is, unlike the rest, can only be accessed from header's search bar. It will be explained further in the next sub-chapter.

#### 3. [www] Search

As mentioned before, header in www app provides search functionality. The suggestions can be divided into 3 sections: string matching for name and brand, categories and/or subcategories, and brands.

After customer choose one the suggestions, they will be brought to either one of the pages contains product list. The searched item is communicated to the product list component via URL param. Categories / brands will be queried with key `filterCategories`, `filterSubCategories`, or `filterBrands`, while name will be using `others` key.

#### 4. [www] Product Detail

The page where user can see the detail of the product. After clicking buy, the system will check if stock subtracted by quantity in cart is sufficient for the newly requested quantity. If not, will display [pop-up](#sweet-alert).

#### 5. [dashboard] Product List

In this page, admin can see and search for all products while merchant only granted access for their products. Admins / merchants are allowed to edit / delete products by clicking the action buttons. A button to display add-via-CSV modal is also put in this page. Here, admins & merchants can also do a quick edit towards product's stock by double clicking on the cell. Moreover, admins are also granted access quick edit to enable/disable products, either by double-clicking or with button for selected item(s).

The table along with search and pagination was made with [React Bootstrap Table](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/about.html).

#### 6. [dashboard] Add Product Form

This page is divided into 2 parts: basic details of products which stored in the main `products` table and derived details such as categories, photos, and colors.

Most of the form fields are using pre-defined components stored in `FormComponents.js`. Accommodate placeholder, value, onClick, onBlur, basic numeric (& float) validation.

#### 7. [dashboard] Add Products via CSV

Consists of 3 parts: CSV upload, images uploads, and database mutation. Only accepts following columns:

- sku (only retrieve merchant code from here)
- name
- image (list of photos name that will be uploaded later, can be separated by coma '**,**' or semi-colon '**;**')
- price
- special_price (discounted price)
- weight
- color
- status (enabled or not)
- description (long description)
- short_description
- qty (stock)
- capitalprice
- merchant
- store_category
- gift_category

#### 8. [dashboard] Edit Product Form

Basically provide ability to edit the product. Admins will be given additional access including enabling product and edit score. Score will be used for GIdA recommendation system.

#### 9. [dashboard] Delete Product

Deleting products can be done via product list or delete button inside edit product form with basic confirmation using [Swal](#sweet-alert).

<hr>

### Categories

There are 2 types of categories in Kadoqu, namely store categories and gift categories. Store used for categorized products by events, while gift categorized by the products's type.

#### Store Categories

Store categories simply store id, name, create/update date, and banners. For wider banner used in mobile view of product list, it goes under the name of `wide_banner` and as for the generally used banner -- a more squared one -- stored in `default_banner` column.

#### Gift Categories

Gift categories are pretty similar to store categories but with the addition of `parent_id` column because gift categories might have sub-categories (only 1 level depth). A `null` value indicates that the category is a parent category and vice-versa.

<hr>

### Wrapping Lab

#### 1. Data Structure

```javascript
Wrapper / Ribbon { // both has a same structure
	id: Int, // type's ID
	name: Int, // type
	price: Float,
	thumbnail: String,
	choices: { // provided variations
		id: Int,
		name: Int,
		url: String
	}
}

WrappingLabItem { // defined as cartPackage in cart / OrderWrapping in database
	id: String, // timestamp
	wrapper: {
		typeId: Int,
		type: String,
		wrapperId: Int, // might be null if type does not have any variant
		name: String, // might be null if type does not have any variant
		price: Float,
		image: String // variant's image if exist, else type's image
	}
	ribbon: { // might be null if customer choose to use no ribbon
		typeId: Int,
		type: String,
		ribbonId: Int, // might be null if type does not have any variant
		name: String, // might be null if type does not have any variant
		price: Float,
		image: String // variant's image if exist, else type's image
	}
	greetingCard: { // might be null if customer choose to not purchase greeting card
		event: String,
		greetings: String
	}
	items: [Product]
}
```

#### 2. [www] Drag and Drop Section

##### Dragging Area

The container implemented by saving state of cursor on mouse down, then calculate how far it went as the cursor move. If the mouse leave / up, the calculation process stopped.

In order to allow dragging only product -- not including the container even though the container is also draggable -- a state was saved, called `preventScroll` which saved by each of the dragging areas. The state is set to true if the mouse hover on the item inside that area. And set to false upon leaving the product.

##### List of Displayed Item

The wrapped items is pretty straight-forwarded, it was saved in state saved in wrapping lab page (props in DnD component). But, the "cart" section is the result of cart subtracted by wrapped items achieved by iterating both list.

##### Data Transfer

Data transfer was done by utilizing built-in HTML event property with product object transferred by stringify it first using built-in JSON method. The string then parsed by the receiving area after dropping the item.

#### 3. [www] Wrapper & Ribbon Selector Section

##### Type Selection

The type selection rendered by fetching all wrapper / ribbon types from database, with addition to "no ribbon" for ribbon selection. If the selected wrapper / ribbon has no variant, then it is immediately chosen and set to the state. In the other hand, a wrapper / ribbon with variants will display modal of variants selection and won't be chosen unless one of the variant is selected.

##### Variant Selection

Provided in modal, variants selection will display all items listed in state under the name of opened[Ribbon | Wrapper]. The ribbon / wrapper will then set along with the type to the wrapping lab page's state (props in the component). The modal closed & the image of the type will be replaced by the chosen variant's image.

#### 4. [www] Review Section

Basically this section just sum up all the chosen items + 10k for wrapping fee and 5k for greeting card if the customer requested greeting card. Both the wrapping fee and greeting card currently defined as constants in `data/constants.js`.

#### 5. [dashboard] Wrapping Lab Data

Wrappers and ribbons can be added, edited, and removed by admins. They are saved in imagekit under the directory of _/Wrapping_Lab/[wrapper | ribbon]/<<span>type name>/_

<hr>

### Cart & Checkout

#### 1. Local Storage "Cart" Data Structure

```javascript
cart: {
  items: [Product];
  packages: [WrappingLabItem];
}
```

#### 2. Cart

Cart fetched by using Query component then mapped to be rendered. Items will be rendered as `CartProductItem` component in a div just below the rendered packages. Each package will be rendered as individual div containing `CartProductItem`s mapped from its items with additional collapsible ribbon storing its wrapper and ribbon data. The collapsible-ribbon's color defined in CSS file, utilizing the pseudo-element selector for odd-even container.

Each addition, subtraction, or deletion of item and/or package is using mutation defined in `App.js`.

#### 3. Checkout

An empty cart (both items and packages are empty list) will cause the page to bounce back to `/cart`.

Each wrapping lab item rendered as wrapping lab price followed by its items detail.

<hr>

### Orders

#### 1. Data Structure

```javascript
OrderProduct {
	id: Int,
	orderId: String,
	wrappingId: String,
	product: JSON,
	quantity: Int
}

OrderWrapping {
	id: String, // uuid
	orderId: String,
	wrapper: Wrapper, // saved as JSON in database
	ribbon: Ribbon, // saved as JSON in database
	greetingCard: { // saved as JSON in database
		event: String,
		greetings: String
	},
	items: [OrderProduct]
}

Order {
	id: String, // uuid
	userId: String,
	user: User,
	number: Int,
	billingAddress: JSON,
	shippingAddress: JSON,
	shippingMethod: String,
	courierCode: String,
	courierService: String,
	shippingFee: Float,
	resi: String,
	voucherCode: String,
	voucherDiscount: Float,
	orderProducts: [OrderProduct],
	orderWrappings: [OrderWrapping],
	productDiscount: Float,
	productTotal: Float,
	weightTotal: Float,
	total: Float,
	paymentMethod: String,
	orderStatusId: Int,
	orderStatus: OrderStatus,
	wrappingFee:Float,
	paymentConfirmationData: { // stored as JSON in database
		accountName: String,
		bank: String,
		nominal: Float,
		transferTime: DateTime,
		receipt: String
	},
	createdAt: DateTime,
	updatedAt: DateTime
}
```

#### 2. [edge] Order in General

Upon sending add order mutation request, client browser will only send ID of product and wrapper / ribbon type & variant. The server will then fetch from the database to ensure the JSON stored for order products and order wrappings are true. If customer requested products more than stock, the server will throw error, informing which product(s) is/are insufficient.

`paymentConfirmationData` can be set by user in _Konfirmasi Pembayaran_ page.

There are 6 statuses of order:
ID | Status
:---: | :---:
1 | pending
2 | payment_review
3 | processing
4 | shipping
5 | completed
6 | canceled

Addresses are saved as JSON because we only save the ID, future change / even deletion will make the order data not true anymore.

#### 3. [edge] Order Products

Each order product stored in database are requested separately after storing order wrappings and primary order data. And insertion of each order product will subtract the stock stored in database. Product saved as JSON to capture the state to when customer order it.

#### 4. [edge] Order Wrappings

Similar to order products, each order wrapping stored in database are requested separately after storing primary order data to get the order ID. Wrapper and ribbon saved as JSON to capture the state to when customer choose them.

#### 5. [dashboard] Order Detail

Admins are allowed to change order status from and to:

| From             | To  |
| ---------------- | :-: |
| 2                |  3  |
| 3                |  4  |
| 4                |  5  |
| 1, 2, 3, 4, or 5 |  6  |

And as for the 1 to 2 transition, it is automatically set after user sent payment confirmation data. Each transition will result in notification to the customer via e-mail.

If the customer chose online ojek for the shipping method, admins can also notify the new shipping fee to the customer. And if the customer chose courier shipping method, admins are obligated to input receipt (resi) number to perform 3-to-4-transition.

<hr>

### Gallery (Testimonies)

#### Data Structure

```javascript
Testimony {
	id: Int
	name: String // gift's name
	shortDescription: String // gift's content
	budget: Float
	testimony: String
	image: String
	category: String // enum type of 'Custom Gift', 'Hampers Gift', and 'Wrapping Lab'
}
```

#### Desktop Gallery Popover

Render while looping the gallery items, and implemented using many condition logic:

- Is the current item the last item on the line or the last item in the list?
- Is there any active item?
- Is the active item placed in the line above the popover-supposed-to-be-placed?
- Is the active item placed after the other-popover-before?

And the placement of speech bubble's triangle also rendered using logic with a switch statement and pre-defined value in form of percentage.

<hr>

### Title Banner

It has its own class as several pages require title banner. The advantage of using this title banner is that this component is already responsive. Just need to provide the image, the title, and the text that would be displayed. Examples can be found in gallery page and wrapping lab page.

<hr>

### Sweet Alert

A component widely use for pop-up, either alert or confirmation. Get a detailed docs [here](https://sweetalert2.github.io/). Several examples are:

- added-to-cart pop-up,
- insufficient-stock pop-up, and
- delete-from-cart cconfirmation

<br><br><br>

## Side Notes

1. Responsiveness set using MediaQuery from "react-responsive" library.
2. All image stored in database refer to URL in imagekit.io.

   > An image should never be transferred directly to edge in order to ease the server load. Instead, create upload token for image kit, upload it to imagekit, then finally send the image URL to our server.

3. Never do direct access to window's local storage and define it in App.js query / mutation instead.
4. Define constant URL images in `data/images.js`, especially if they are reused in several components.

<br><br><br>

## Contributors

These are the people that have contributed in building Kadoqu.com application:

- Andre Susanto
- De Gitgit Agitya
- Audry Nyonata
- Gisela Supardi
- Jonathan Laksamana Purnomo
- Laras Octa S.
- Naofal Leo Agusta
- William Sutanto
