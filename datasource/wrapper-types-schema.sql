DROP TABLE IF EXISTS "wrapper_types";

CREATE TABLE "wrapper_types" (
    "id" serial primary key,
    "name" text not null,
    "price" integer not null,
    "thumbnail" text not null,
    "rank" int default 0
);
