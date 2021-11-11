DROP TABLE IF EXISTS "event_categories";

CREATE TABLE "event_categories" (
    "id" uuid primary key DEFAULT uuid_generate_v4 (),
    "name" text not null,
    "default_banner" text default null,
    "wide_banner" text default null,
    "mobile_banner" text default null,
    "filter_banner" text default null,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);