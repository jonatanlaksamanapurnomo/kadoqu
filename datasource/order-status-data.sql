TRUNCATE TABLE "order_status" RESTART IDENTITY;

INSERT INTO "order_status" (
    "id",
    "status"
) VALUES (
    1,
    'pending'
), (
    2,
    'payment_review'
), (
    3,
    'processing'
), (
    4,
    'shipping'
), (
    5,
    'complete'
), (
    6,
    'canceled'
);
