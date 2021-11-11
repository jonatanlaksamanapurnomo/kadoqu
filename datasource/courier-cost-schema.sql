drop table IF EXISTS "courier_cost" cascade;

create TABLE "courier_cost" (
    -- "province_id" text not null,
    -- "province" text not null,
    -- "city_id" text not null ,
    -- "city" text not null,
    "no" serial primary key,
    "subdistrict_id"  text not null,
    -- "subdistrict_name" text not null,
    "courier" text not null,
    "courier_name" text not null,
    "service" text not null,
    "cost" float8 not null,
    -- "weight" float8 not null,
    "estimated" text not null,
    "description" text not null
);

create UNIQUE INDEX "id_cost" ON "courier_cost" ("no");
