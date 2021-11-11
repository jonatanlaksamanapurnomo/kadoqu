TRUNCATE TABLE "order_tracks" RESTART IDENTITY CASCADE;

INSERT INTO "order_tracks" (
    "order_id",
    "order_status_id"
) VALUES (
    'c28d141f-c0a9-431c-a228-2bf63e228c24',
    1
);

INSERT INTO "order_tracks" (
    "order_id",
    "order_status_id"
) VALUES (
    'c28d141f-c0a9-431c-a228-2bf63e228c25',
    1
),(
    'c28d141f-c0a9-431c-a228-2bf63e228c25',
    2
);