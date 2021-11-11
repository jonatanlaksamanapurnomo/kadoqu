drop table IF EXISTS "ratings";

create TABLE "ratings"
(
    "id" serial primary key,
    "order_id" uuid not null,
    "user_id" uuid not null,
    "speed_cs" integer not null,
    "service" integer not null,
    "product_quality" integer not null,
    "wrapping_quality" integer not null,
    "product_safety" integer not null,
     "product_satisfaction" integer not null,
    "description" text not null,
    "created_at" timestamptz default now()
);
