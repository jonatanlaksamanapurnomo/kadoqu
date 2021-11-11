DROP TABLE IF EXISTS "user_favorite_products";

CREATE TABLE "user_favorite_products" (
    "id" serial primary key,
    "user_id" uuid not null references users(id) on delete cascade,
    "product_id" uuid not null references products(id) on delete cascade,
    "created_at" timestamptz default now()
);
