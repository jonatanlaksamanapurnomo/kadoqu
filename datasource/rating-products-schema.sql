DROP TABLE IF EXISTS "rating_products";

CREATE TABLE "rating_products"
(
  "id" serial primary key,
  "order_id" uuid not null,
  "user_id" uuid not null,
  "product_id" uuid not null,
  "rating" integer not null,
  "image" text,
  "description" text not null,
  "created_at" timestamptz default now()
);
