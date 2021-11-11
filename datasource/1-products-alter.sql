alter table products add COLUMN IF NOT EXISTS date json default null;
alter table products add COLUMN IF NOT EXISTS po_notes text default '';
alter table products add COLUMN IF NOT EXISTS is_custome_order boolean default false;
alter table products add COLUMN IF NOT EXISTS is_custome_photo boolean default false;
alter table products add COLUMN IF NOT EXISTS is_custome_color boolean default false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS min_qty INTEGER DEFAULT 1;
ALTER TABLE products ADD COLUMN IF NOT EXISTS multiple_qty INTEGER DEFAULT 1;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_digital BOOLEAN DEFAULT FALSE;
