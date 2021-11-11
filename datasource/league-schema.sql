drop table IF EXISTS "merchant_league";

create TABLE "merchant_league" (
   "id" serial primary key,
    "name" text not null,
    "description" text not null,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default null
);
create UNIQUE INDEX "league_id_idx" ON "merchant_league" ("id");
