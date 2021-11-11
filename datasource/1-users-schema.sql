drop table IF EXISTS "users" CASCADE;

create TABLE "users" (
    "id" uuid primary key DEFAULT uuid_generate_v4 (),
    "phone" text not null,
    "email" text not null,
    "password" text not null,
    "first_name" text not null,
    "last_name" text not null,
    "photo" int default 6,
    "gender" int default 0,
    "is_active" boolean default true,
    "birthdate" date default now(),
    "is_google_sync" boolean default false,
    "created_at" timestamptz default now(),
	  "updated_at" timestamptz default null
);

create UNIQUE INDEX "user_email_idx" ON "users" ("email");
