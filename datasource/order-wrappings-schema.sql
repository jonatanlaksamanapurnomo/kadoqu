DROP TABLE IF EXISTS "order_wrappings";

CREATE TABLE "order_wrappings" (
    "id" uuid primary key DEFAULT uuid_generate_v4 (),
    "order_id" uuid not null references orders(id) on delete cascade,
    "wrapper" json not null,
    "ribbon" json DEFAULT null,
    "greeting_card" json DEFAULT null
);
