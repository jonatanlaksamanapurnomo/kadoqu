DROP TABLE IF EXISTS "order_tracks";

CREATE TABLE "order_tracks" (
    "id" serial primary key,
    "order_id" uuid not null references orders(id) on delete cascade,
    "order_status_id" serial not null,
    "date" timestamptz default now(),
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);
