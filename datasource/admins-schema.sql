drop table IF EXISTS "admins" CASCADE;

create TABLE "admins" (
    "id" uuid primary key DEFAULT uuid_generate_v4(),
    "phone" text not null,
    "email" text not null,    --this is username
    "email2" text not null default '' , -- this is email
    "password" text not null,
    "name" text not null,
    "role" text default 'merchant',
    "merchant_code" text default null,
    "badge_photo_url" text default '',
    "is_special_admin" boolean default false,
    "merchant_level" float default 10,
    "category_id" integer default 1,
    "league_id" int  default 0,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);

create UNIQUE INDEX "admin_email_idx" ON "admins"("email");
