DROP TABLE IF EXISTS "promotions" CASCADE;

CREATE TABLE "promotions"
(
  "id" uuid primary key DEFAULT uuid_generate_v4(),
  "slug" text not null,
  "name" text default '',
  "description" text default '',
  "banner" text default '',
  "is_enable" boolean not null default false,
  "valid_from" timestamptz default null,
  "valid_to" timestamptz default null,
  "products" text[] default '{}',
  "merchants" text[] default '{}',
  "created_at" timestamptz default now(),
  "updated_at" timestamptz default null
);
