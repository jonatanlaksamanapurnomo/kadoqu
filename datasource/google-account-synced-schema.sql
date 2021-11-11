drop table IF EXISTS "google_account_synced";

create TABLE "google_account_synced" (
    "google_id" text not null ,
    "user_id" uuid not null,
    "brithdays" JSON not null,
    "email" text not null
);
create UNIQUE INDEX "user_googlee_id" ON "google_account_synced" ("google_id");
