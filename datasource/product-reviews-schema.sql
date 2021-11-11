drop table IF EXISTS "product_reviews";

create TABLE "product_reviews" (
  "id" serial primary key,
  "merchant_id" uuid not null references admins(id) on delete cascade,
  "product_id" uuid not null references products(id) on delete cascade,
  "rejection_message" text default null,
  "is_reviewed" boolean default false
);
