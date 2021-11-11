alter table admins add COLUMN IF NOT EXISTS "is_special_admin" boolean default false;
alter table admins add COLUMN IF NOT EXISTS "merchant_level" float default 10;
alter table admins add COLUMN if NOT EXISTS "category_id" integer default 1;
alter table admins add COLUMN if NOT EXISTS "badge_photo_url" text default '';
alter table admins add COLUMN IF NOT EXISTS "league_id" int  default 0;
