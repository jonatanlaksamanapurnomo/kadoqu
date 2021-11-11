drop table IF EXISTS "orders" CASCADE;

create TABLE "orders" (
    "id" uuid primary key DEFAULT uuid_generate_v4 (),
    "user_id" uuid not null,
    "no" serial,
    "billing_address" json,
    "shipping_address" json,
    "shipping_method" text not null,
    "courier_code" text,
    "courier_service" text,
    "shipping_fee" float8,
    "resi" text,
    "voucher_code" text,
    "voucher_discount" float8,
    "product_discount" float8,
    "product_total" float8 not null,
    "weight_total" float8 not null,
    "total" float8 not null,
    "payment_method" text not null,
    "order_status_id" serial not null,
    "wrapping_fee" float not null default  0,
    "payment_confirmation_data" json default null,
    "waybill_track" json default null,
    "donation" float8 default null,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);
