DROP TABLE IF EXISTS "order_holidays";

CREATE TABLE "order_holidays" (
  "id" uuid primary key DEFAULT uuid_generate_v4(),
  "order_id" uuid not null references orders(id) on delete cascade,
  "date_from" date default null,
  "date_to" date default null
  -- "day" text default ''
);
