drop table IF EXISTS "order_custome";

create TABLE "order_custome" (
    "id" uuid primary key DEFAULT uuid_generate_v4 (),
    "order_id" uuid not null references orders(id) on delete cascade,
    "photos" json DEFAULT null,
    "products" json default null,
    "isi_ucapan" text DEFAULT '',
    "notes_dari_customer" text default '',
    "product_color" text default '',
    "magical_moment_form" json default null,

);
