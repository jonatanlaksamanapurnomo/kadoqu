DROP TABLE IF EXISTS "product-clicked-tracker" cascade;

CREATE TABLE "product-clicked-tracker" (
    "id" serial primary key,
    "user_id" uuid not null,
    "product_id" uuid not null,
    "gida_option" json default null,
    "search_input" text default null,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);
