DROP TABLE IF EXISTS "vouchers" CASCADE;

CREATE TABLE "vouchers"
(
  "id" uuid primary key DEFAULT uuid_generate_v4(),
  "name" text default '',
  "merchant" text default null,
  "description" text default '',
  "is_enable" boolean not null default false,
  "valid_from" timestamptz default null,
  "valid_to" timestamptz default null,
  "min_purchase" float8 not null default 0,
  "percent_discount" float8 not null default 0,
  "max_discount" float8 default null,
  "stock" integer default 0,
  "max_usage" integer default 0,
  "gift_categories" text[] default '{}',
  "store_categories" text[] default '{}',
  "products" text[] default '{}',
  "merchants" text[] default '{}',
  "created_at" timestamptz default now(),
  "updated_at" timestamptz default null
);
