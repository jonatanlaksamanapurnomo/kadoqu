DROP TABLE IF EXISTS "voucher_usages" CASCADE;

CREATE TABLE "voucher_usages"
(
  "id" serial primary key,
  "voucher_code_id" uuid not null references voucher_codes(id),
  "order_id" uuid not null references orders(id),
  "user_id" uuid not null references users(id)
);
