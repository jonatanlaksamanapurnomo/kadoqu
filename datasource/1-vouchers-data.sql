TRUNCATE TABLE "vouchers" cascade;

INSERT INTO "vouchers"
  (
  -- "code",
  "is_enable",
  "min_purchase",
  "percent_discount",
  "max_discount",
  "stock",
  "max_usage"
  )
VALUES
  (
    -- 'DISKON10',
    true,
    50000,
    10,
    20000,
    10,
    1
  ),
  (
    -- 'HABIS',
    true,
    0,
    0,
    0,
    0,
    1
  ),
  (
    -- 'KUOTAUSERHABIS',
    true,
    0,
    0,
    0,
    1,
    0
  );
