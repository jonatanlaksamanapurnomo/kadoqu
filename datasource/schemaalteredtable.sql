ALTER TABLE orders ADD COLUMN IF NOT EXISTS waybill_track JSON DEFAULT NULL;
alter table products add COLUMN IF NOT EXISTS date json default null;
alter table products add COLUMN IF NOT EXISTS po_notes text default '';
alter table products add COLUMN IF NOT EXISTS is_custome_order boolean default false;
alter table products add COLUMN IF NOT EXISTS is_custome_photo boolean default false;
alter table products add COLUMN IF NOT EXISTS is_custome_color boolean default false;

alter table users add COLUMN IF NOT EXISTS is_active boolean default true;
alter table users add COLUMN IF NOT EXISTS is_google_sync boolean default false;
alter table vouchers add COLUMN IF NOT EXISTS products text[] default '{}'
alter table admins add COLUMN IF NOT EXISTS "is_special_admin" boolean default false;
alter table admins add COLUMN IF NOT EXISTS "merchant_level" float default 10;
alter table admins add COLUMN if NOT EXISTS "category_id" integer default 1;
alter table admins add COLUMN if NOT EXISTS "badge_photo_url" text default '';
alter table banners add COLUMN if NOT EXISTS "url" text not null  default '/1001-inspirasi-kado/1';
alter table campaign add COLUMN IF NOT EXISTS "campaign_total_budget" float8 default 0;
alter table order_custome add COLUMN IF NOT EXISTS "product_color" text default '';
alter table order_custome add COLUMN IF NOT EXISTS "products" json default null;
alter table order_products add COLUMN IF NOT EXISTS custome_order_id uuid default null;
alter table order_products add COLUMN IF NOT EXISTS order_holiday_id uuid default null;
alter table product_reviews add COLUMN IF NOT EXISTS is_reviewed boolean default false;
ALTER TABLE product_reviews ADD CONSTRAINT product_reviews_merchant_id_fkey FOREIGN KEY (merchant_id) REFERENCES admins (id) ON DELETE CASCADE;
ALTER TABLE product_reviews ADD CONSTRAINT product_reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;
alter table ratings add COLUMN IF NOT EXISTS product_satisfaction integer default 0;
