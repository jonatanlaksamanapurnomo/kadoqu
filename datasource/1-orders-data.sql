TRUNCATE TABLE "orders" RESTART IDENTITY CASCADE;

INSERT INTO "orders" (
    "id",
    "user_id",
    "billing_address",
    "shipping_address",
    "weight_total",
    "product_total",
    "product_discount",
    "wrapping_fee",
    "voucher_code",
    "voucher_discount",
    "shipping_method",
    "courier_code",
    "courier_service",
    "shipping_fee",
    "resi",
    "total",
    "payment_method",
    "order_status_id",
    "created_at",
    "updated_at"
) VALUES (
    'c28d141f-c0a9-431c-a228-2bf63e228c24',
    'e297311d-c4e2-45a6-8e0b-ad04c8b11ca7',
    '{
      "alias": "Kantor",
      "name": "Mr. X",
      "phone": "09123123",
      "street": "Prof. Eyckman 28 Pavilliun",
      "city": "Bandung",
      "city_id": "23",
      "province": "Jawa Barat",
      "province_id": "1",
      "subdistrict": "Sukajadi",
      "subdistrict_id": "364",
      "post_code": "12345"
    }',
    '{
      "alias": "Kantor",
      "name": "Mr. X",
      "phone": "09123123",
      "street": "Prof. Eyckman 28 Pavilliun",
      "city": "Bandung",
      "city_id": "23",
      "province": "Jawa Barat",
      "province_id": "1",
      "subdistrict": "Sukajadi",
      "subdistrict_id": "364",
      "post_code": "12345"
    }',
    0.5,
    400000,
    0,
    19000,
    'DISKON50',
    50000,
    'courier',
    'JNE',
    'YES',
    20000,
    null,
    389000,
    'BCA',
    1,
    '2019-10-25 12:00:00',
    '2019-10-25 12:00:00'
);

INSERT INTO "orders" (
    "id",
    "user_id",
    "billing_address",
    "shipping_address",
    "weight_total",
    "product_total",
    "product_discount",
    "wrapping_fee",
    "voucher_code",
    "voucher_discount",
    "shipping_method",
    "courier_code",
    "courier_service",
    "shipping_fee",
    "resi",
    "total",
    "payment_method",
    "order_status_id",
    "payment_confirmation_data",
    "created_at",
    "updated_at"
) VALUES (
    'c28d141f-c0a9-431c-a228-2bf63e228c25',
    'e297311d-c4e2-45a6-8e0b-ad04c8b11ca7',
    '{
      "alias": "Kosan",
      "name": "Mr. Y",
      "phone": "08140510",
      "street": "Prof. Eyckman 50 Pavilliun",
      "city": "Bandung",
      "city_id": "23",
      "province": "Jawa Barat",
      "province_id": "1",
      "subdistrict": "Sukajadi",
      "subdistrict_id": "364",
      "post_code": "12345"
    }',
    '{
      "alias": "Kosan",
      "name": "Mr. Y",
      "phone": "08140510",
      "street": "Prof. Eyckman 50 Pavilliun",
      "city": "Bandung",
      "city_id": "23",
      "province": "Jawa Barat",
      "province_id": "1",
      "subdistrict": "Sukajadi",
      "subdistrict_id": "364",
      "post_code": "12345"
    }',
    0.75,
    745000,
    null,
    0,
    null,
    null,
    'WAREHOUSE',
    null,
    null,
    0,
    null,
    745000,
    'GO-PAY',
    2,
    '{
      "accountName": "Audry",
      "bank": "Mandiri",
      "nominal": 745000,
      "transferTime": 1571983075
    }',
    '2019-10-25 12:00:00',
    '2019-10-25 15:00:00'
), (
    'c28d141f-c0a9-431c-a228-2bf63e228c26',
    'e297311d-d1f5-45a6-8e0b-ad04c8b11ca8',
    '{
      "alias": "Kosan",
      "name": "Mr. Y",
      "phone": "08140510",
      "street": "Prof. Eyckman 50 Pavilliun",
      "city": "Bandung",
      "city_id": "23",
      "province": "Jawa Barat",
      "province_id": "1",
      "subdistrict": "Sukajadi",
      "subdistrict_id": "364",
      "post_code": "12345"
    }',
    '{
      "alias": "Kosan",
      "name": "Mr. Y",
      "phone": "08140510",
      "street": "Prof. Eyckman 50 Pavilliun",
      "city": "Bandung",
      "city_id": "23",
      "province": "Jawa Barat",
      "province_id": "1",
      "subdistrict": "Sukajadi",
      "subdistrict_id": "364",
      "post_code": "12345"
    }',
    0.75,
    224000,
    14000,
    19000,
    null,
    null,
    'WAREHOUSE',
    null,
    null,
    0,
    null,
    210000,
    'Bank transfer',
    5,
    '{
      "accountName": "Gisela",
      "bank": "BCA",
      "nominal": 210000,
      "transferTime": 1568095099
    }',
    '2019-09-10 12:00:00',
    '2019-09-13 12:00:00'
);
