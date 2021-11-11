DROP TABLE IF EXISTS "categories";

CREATE TABLE "categories" (
    "id" uuid primary key DEFAULT uuid_generate_v4 (),
    "name" text not null,
    "parent_id" uuid default null,
    "default_banner" text default null,
    "wide_banner" text default null,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);
