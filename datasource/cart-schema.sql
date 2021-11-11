drop table IF EXISTS "cart";

create TABLE "cart" (
    "id" serial primary key,
    "user_id" uuid not null,
    "cart" json,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);
