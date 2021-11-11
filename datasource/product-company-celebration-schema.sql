DROP TABLE IF EXISTS "product_company_celebration_categories" cascade;

CREATE TABLE "product_company_celebration_categories" (
    "id" serial primary key,
    "name" text not null,
    "product_id" uuid references products(id) on delete cascade,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);
