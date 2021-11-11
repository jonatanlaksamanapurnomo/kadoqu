DROP TABLE IF EXISTS "voucher_codes" CASCADE;

CREATE TABLE "voucher_codes"
(
  "id" uuid primary key DEFAULT uuid_generate_v4(),
  "voucher_id" uuid not null references vouchers(id) on delete cascade,
  "code" text not null,
  "created_at" timestamptz default now(),
  "updated_at" timestamptz default null
);
