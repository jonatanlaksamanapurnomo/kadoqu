truncate table "ratings" RESTART IDENTITY;

insert into "ratings"
(
    "order_id",
    "user_id",
    "speed_cs",
    "service",
    "product_quality",
    "wrapping_quality",
    "product_safety",
    "product_satisfaction",
    "description"
) values (
    'c28d141f-c0a9-431c-a228-2bf63e228c26',
    'e297311d-d1f5-45a6-8e0b-ad04c8b11ca8',
    4,
    3,
    4,
    5,
    2,
    4,
    'CS ramah, barang cukup baik, wrapping-nya juga lucu. Sayangnya barang rusak dalam perjalanan. Kecepatan pelayanan perlu ditingkatkan'
);
