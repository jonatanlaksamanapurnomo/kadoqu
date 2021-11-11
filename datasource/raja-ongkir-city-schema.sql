drop table IF EXISTS "raja_ongkir_city" cascade;

create TABLE "raja_ongkir_city" (
    "city_id"  text  primary key,
    "province_id" text not null,
    "province" text not null,
    "type" text not null ,
    "city_name" text not null ,
    "postal_code" text not null
);
