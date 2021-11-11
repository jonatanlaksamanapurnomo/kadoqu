DROP TABLE IF EXISTS "product_colors" cascade;

CREATE TABLE "product_colors" (
    "id" serial primary key,
    "name" text not null,
    "product_id" uuid references products(id) on delete cascade,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);
