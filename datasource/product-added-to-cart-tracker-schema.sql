DROP TABLE IF EXISTS "product-added-to-cart-tracker" cascade;

CREATE TABLE "product-added-to-cart-tracker" (
    "id" serial primary key,
    "user_id" uuid not null,
    "product_id" uuid not null,
    "gida_option" json default null,
    "search_input" text defaul null,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);
