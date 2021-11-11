DROP TABLE IF EXISTS "ribbon_types";

CREATE TABLE "ribbon_types" (
    "id" serial primary key,
    "name" text not null,
    "info" text default null,
    "price" integer not null,
    "thumbnail" text not null,
    "rank" int default 0
);
