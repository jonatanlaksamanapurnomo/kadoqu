drop table IF EXISTS "order_products";

create TABLE "order_products" (
    "id" serial primary key,
    "order_id" uuid not null references orders(id) on delete cascade,
    "wrapping_id" uuid DEFAULT null,
    "custome_order_id" uuid default null,
    "order_holiday_id" uuid default null,
    "product" json not null,
    "quantity" integer not null,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT null
);
