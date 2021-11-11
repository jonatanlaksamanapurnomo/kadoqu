drop table IF EXISTS "products" cascade;
drop sequence if exists "sku";

create sequence "sku";
create TABLE "products"
(
  "id" uuid primary key DEFAULT uuid_generate_v4(),
  "name" text not null,
  "merchant" text not null,
  "sku" text default '',
  "slug" text not null,
  "short_description" text default '',
  "long_description" text default '',
  "shipment_description" text default '',
  "price" float8 not null,
  --harga jual  web yang udah di tambah 20%
  "merchant_price" float8,
  --harga jual merchant
  "capital_price" float8 default 0,
  --harga beli kadoqu
  "merchant_discount" float8 default 0,
  "merchant_discount_until" timestamptz default null,
  "kadoqu_discount" float8 default 0,
  "kadoqu_discount_until" timestamptz default null,
  "in_stock" boolean default true,
  "is_enable" boolean default false,
  "is_po" boolean default false,
  "new_to_date" timestamptz,
  "stock" bigint default 0,
  "weight" float8 default 0,
  "length" float8 default 0,
  "width" float8 default 0,
  "height" float8 default 0,
  "score" json default null,
  "po_notes" text default '',
  "is_custome_order" boolean default false,
  "is_custome_photo" boolean default false,
  "is_custome_color" boolean default false,
  "date" json default null,
  "min_qty" integer default 1,
  "multiple_qty" integer default 1,
  "is_digital" boolean default false,
  "created_at" timestamptz default now(),
  "updated_at" timestamptz default null
);
