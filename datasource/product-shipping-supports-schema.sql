DROP TABLE IF EXISTS "product_shipping_supports" cascade;

CREATE TABLE "product_shipping_supports" (
    "id" serial primary key,
    "name" text not null,
    "product_id" uuid references products(id) on delete cascade,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);
