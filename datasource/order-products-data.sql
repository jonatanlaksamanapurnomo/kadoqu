truncate table "order_products";

--insert into "order_products" (
--    "order_id",
--    "product",
--    "quantity"
--) values (
--    'c28d141f-c0a9-431c-a228-2bf63e228c24',
--    '{ "id": "bfd0405d-6318-462b-b77b-542ea82aec09",
--       "name": "Product 39",
--       "merchant": "Kadoqu.com",
--       "price": 100000,
--       "merchantPrice": 1000,
--       "merchantDiscount": 0,
--       "kadoquDiscount": 0,
--       "inStock": true,
--       "slug": "slug_dummy",
--       "isEnable": true,
--       "isPo": true,
--       "stock": 10,
--       "weight": 12.5,
--       "length": 0,
--       "width": 0,
--       "height": 0,
--       "sku": "",
--       "merchantDiscountUntil": null,
--       "kadoquDiscountUntil": null
--     }
--        ',
--    2
--), (
--    'c28d141f-c0a9-431c-a228-2bf63e228c24',
--    '{ "id": "bfd0405d-6318-462b-b77b-542ea82aec08",
--       "name": "Product 38",
--       "merchant": "Kadoqu.com",
--       "price": 100000,
--       "merchantPrice": 1000,
--       "merchantDiscount": 0,
--       "kadoquDiscount": 0,
--       "inStock": true,
--       "slug": "slug_dummy",
--       "isEnable": true,
--       "isPo": true,
--       "stock": 10,
--       "weight": 12.5,
--       "length": 0,
--       "width": 0,
--       "height": 0,
--       "sku": "",
--       "merchantDiscountUntil": null,
--       "kadoquDiscountUntil": null
--     }
--        ',
--    1
--), (
--    'c28d141f-c0a9-431c-a228-2bf63e228c25',
--    '{ "id": "bfd0405d-6318-462b-b77b-542ea82aec09",
--       "name": "Product 39",
--       "merchant": "Kadoqu.com",
--       "price": 100000,
--       "merchantPrice": 1000,
--       "merchantDiscount": 0,
--       "kadoquDiscount": 0,
--       "inStock": true,
--       "slug": "slug_dummy",
--       "isEnable": true,
--       "isPo": true,
--       "stock": 10,
--       "weight": 12.5,
--       "length": 0,
--       "width": 0,
--       "height": 0,
--       "sku": "",
--       "merchantDiscountUntil": null,
--       "kadoquDiscountUntil": null
--     }
--        ',
--    6
--), (
--    'c28d141f-c0a9-431c-a228-2bf63e228c26',
--    '{
--        "id": "bfd0405d-6318-462b-b77b-542ea82abd18",
--        "name": "Bunga Kertas Dandelion",
--        "merchant": "Amora",
--        "price": 70000,
--        "merchantPrice": 67000,
--        "merchantDiscount": 0,
--        "kadoquDiscount": 60000,
--        "inStock": true,
--        "slug": "bunga_kertas_dandelion",
--        "isEnable": true,
--        "isPo": true,
--        "stock": 10,
--        "weight": 12.5,
--        "length": 0,
--        "width": 0,
--        "height": 0,
--        "sku": "AMR0000000001",
--        "merchantDiscountUntil": null,
--        "kadoquDiscountUntil": null
--    }',
--    2
--);
--
--insert into "order_products" (
--    "order_id",
--    "wrapping_id",
--    "product",
--    "quantity"
--) values (
--    'c28d141f-c0a9-431c-a228-2bf63e228c24',
--    'e28d141f-c4b0-431c-a228-2bf63e332c21',
--    '{
--        "id": "bfd0405d-6318-462b-b77b-542ea82aec09",
--        "name": "Product 39",
--        "merchant": "Kadoqu.com",
--        "price": 100000,
--        "merchantPrice": 1000,
--        "merchantDiscount": 0,
--        "kadoquDiscount": 0,
--        "inStock": true,
--        "slug": "slug_dummy",
--        "isEnable": true,
--        "isPo": true,
--        "stock": 10,
--        "weight": 12.5,
--        "length": 0,
--        "width": 0,
--        "height": 0,
--        "sku": "",
--        "merchantDiscountUntil": null,
--        "kadoquDiscountUntil": null
--    }',
--    1
--), (
--    'c28d141f-c0a9-431c-a228-2bf63e228c26',
--    'e28d141f-c4b0-431c-a228-2bf63e332c22',
--    '{
--        "id": "bfd0405d-6318-462b-b77b-972ea82aec09",
--        "name": "Buket Bunga",
--        "merchant": "Kadoqu.com",
--        "price": 100000,
--        "merchantPrice": 90000,
--        "merchantDiscount": 0,
--        "kadoquDiscount": 0,
--        "inStock": true,
--        "slug": "buket_bunga",
--        "isEnable": true,
--        "isPo": true,
--        "stock": 10,
--        "weight": 12.5,
--        "length": 0,
--        "width": 0,
--        "height": 0,
--        "sku": "KDQ0000000001",
--        "merchantDiscountUntil": null,
--        "kadoquDiscountUntil": null
--    }',
--    1
--);

insert into "order_products" (
    "order_id",
    "custome_order_id",
    "product",
    "quantity"
) values (
    'c28d141f-c0a9-431c-a228-2bf63e228c24',
    '438221d7-4aa2-4f80-91bf-ba533b9a5ca5',
    '{
        "id": "bfd0405d-6318-462b-b77b-542ea82aec09",
        "name": "Product 39",
        "merchant": "Kadoqu.com",
        "price": 100000,
        "merchantPrice": 1000,
        "merchantDiscount": 0,
        "kadoquDiscount": 0,
        "inStock": true,
        "slug": "slug_dummy",
        "isEnable": true,
        "isPo": true,
        "stock": 10,
        "weight": 12.5,
        "length": 0,
        "width": 0,
        "height": 0,
        "sku": "",
        "merchantDiscountUntil": null,
        "kadoquDiscountUntil": null
    }',
    1
),
(
    'c28d141f-c0a9-431c-a228-2bf63e228c24',
    '438221d7-4aa2-4f80-91bf-ba533b9a5ca5',
    '{
        "id": "bfd0405d-6318-462b-b77b-542ea82aec09",
        "name": "Product 49",
        "merchant": "Kadoqu.com",
        "price": 100000,
        "merchantPrice": 1000,
        "merchantDiscount": 0,
        "kadoquDiscount": 0,
        "inStock": true,
        "slug": "slug_dummy",
        "isEnable": true,
        "isPo": true,
        "stock": 10,
        "weight": 12.5,
        "length": 0,
        "width": 0,
        "height": 0,
        "sku": "",
        "merchantDiscountUntil": null,
        "kadoquDiscountUntil": null
    }',
    1
),
(
    'c28d141f-c0a9-431c-a228-2bf63e228c24',
    '438221d7-4aa2-4f80-91bf-ba533b9a5ca6',
    '{
        "id": "bfd0405d-6318-462b-b77b-542ea82aec08",
        "name": "Product 49",
        "merchant": "Kadoqu.com",
        "price": 100000,
        "merchantPrice": 1000,
        "merchantDiscount": 0,
        "kadoquDiscount": 0,
        "inStock": true,
        "slug": "slug_dummy",
        "isEnable": true,
        "isPo": true,
        "stock": 10,
        "weight": 12.5,
        "length": 0,
        "width": 0,
        "height": 0,
        "sku": "",
        "merchantDiscountUntil": null,
        "kadoquDiscountUntil": null
    }',
    1
);
