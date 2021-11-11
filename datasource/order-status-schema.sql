DROP TABLE IF EXISTS "order_status";

CREATE TABLE "order_status" (
    "id" serial primary key,
    "status" text not null,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);
