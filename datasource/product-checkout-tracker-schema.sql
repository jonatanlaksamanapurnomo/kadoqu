DROP TABLE IF EXISTS "product-checkout-tracker" cascade;

CREATE TABLE "product-checkout-tracker" (
    "id" serial primary key,
    "user_id" uuid not null,
    "product_id" uuid not null,
    "gida_option" json default null,
	"order_id" uuid not null,
    "search_input" text default null,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);
