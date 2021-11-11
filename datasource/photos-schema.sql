drop table IF EXISTS "photos" cascade;

create TABLE "photos" (
    "product_id" uuid references products(id) on delete cascade,
    "caption" text ,
    "url" text not null,
    "rank"  integer default 0
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);

create INDEX "photos_product_idx" ON "photos" ("product_id");
