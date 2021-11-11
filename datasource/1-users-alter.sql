alter table users add COLUMN IF NOT EXISTS is_active boolean default true;
alter table users add COLUMN IF NOT EXISTS is_google_sync boolean default false;
