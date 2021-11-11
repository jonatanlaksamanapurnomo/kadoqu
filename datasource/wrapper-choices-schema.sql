DROP TABLE IF EXISTS "wrapper_choices";

CREATE TABLE "wrapper_choices" (
    "id" serial primary key,
    "wrapper_type_id" integer not null,
    "name" text not null default '',
    "url" text not null,
    "rank" int default 0
);

CREATE INDEX "wrapper_choices_idx" ON "wrapper_choices" ("wrapper_type_id");
