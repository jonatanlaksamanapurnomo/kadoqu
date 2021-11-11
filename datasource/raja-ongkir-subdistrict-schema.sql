drop table IF EXISTS "raja_ongkir_subdistrict" cascade;

create TABLE "raja_ongkir_subdistrict" (
    "subdistrict_id"  text  primary key,
    "province_id" text not null,
    "province" text not null,
    "city_id" text not null ,
    "city" text not null ,
    "type" text not null ,
    "subdistrict_name" text not null
);
