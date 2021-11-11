DROP TABLE IF EXISTS "survey_log" cascade;

CREATE TABLE "survey_log" (
    "id" serial primary key,
    "guest_id" uuid,
    "user_id" uuid,
    "person" text not null,
    "event" text not null,
    "traits" text not null,
    "created_at" timestamptz default now()
);
