drop table IF EXISTS "email_broadcast";

create TABLE "email_broadcast" (
    "id" serial,
    "email" text primary key
);
