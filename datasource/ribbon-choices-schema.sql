DROP TABLE IF EXISTS "ribbon_choices";

CREATE TABLE "ribbon_choices" (
    "id" serial primary key,
    "ribbon_type_id" integer not null,
    "name" text not null default '',
    "url" text not null,
    "rank" int default 0
);

CREATE INDEX "ribbon_choices_idx" ON "ribbon_choices" ("ribbon_type_id");
