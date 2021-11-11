DROP TABLE IF EXISTS "faq_sub_category";

CREATE TABLE "faq_sub_category" (
    "id" serial primary key,
    "id_faq_category" integer not null,
    "name" text not null,
    "content" text not null
);

CREATE INDEX "faq_sub_category_idx" ON "faq_sub_category" ("id_faq_category");
