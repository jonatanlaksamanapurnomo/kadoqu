DROP TABLE IF EXISTS "product_case_categories" cascade;

CREATE TABLE "product_case_categories" (
    "id" serial primary key,
    "name" text not null,
    "product_id" uuid references products(id) on delete cascade,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);
