drop table IF EXISTS "tags" cascade;

create TABLE "tags" (
    "id" serial primary key,
    "name" text not null,
    "product_id" uuid references products(id) on delete cascade,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);

--CREATE INDEX "tags_product_idx" ON "tags" ("product_id");
