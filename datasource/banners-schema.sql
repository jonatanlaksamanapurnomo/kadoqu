drop table IF EXISTS "banners";

create TABLE "banners" (
    "id" serial primary key,
    "image" text not null,
    "rank" int not null default 0,
    "url" text not null default '/1001-inspirasi-kado/1',
    "location" text default 'HOME__CAROUSEL'
);
