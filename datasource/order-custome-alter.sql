alter table order_custome add COLUMN IF NOT EXISTS "product_color" text default '';
alter table order_custome add COLUMN IF NOT EXISTS "products" json default null;
alter table order_custome add COLUMN IF NOT EXISTS "magical_moment_form" json default null;
