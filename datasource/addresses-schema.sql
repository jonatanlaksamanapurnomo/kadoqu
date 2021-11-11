DROP TABLE IF EXISTS "addresses";

CREATE TABLE "addresses" (
    "id" serial primary key,
    "user_id" uuid not null,
    "street" text not null,
    "name" text not null,
    "phone" text not null,
    "alias" text not null,
    "city" text not null,
    "city_id" text not null,
    "province" text not null,
    "province_id" text not null,
    "subdistrict" text not null,
    "subdistrict_id" text not null,
    "post_code" text not null,
    "primary_address" boolean not null,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);

CREATE INDEX "addresses_user_idx" ON "addresses" ("user_id");
