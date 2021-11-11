DROP TABLE IF EXISTS "gida_feedback";

CREATE TABLE "gida_feedback" (
    "id" serial primary key,
    "username" text not null,
    "rating" int not null ,
    "kecepatan_cs" boolean default  false ,
    "service" boolean default false ,
    "kualitas_product" boolean default  false ,
    "kualitas_wrapping" boolean default  false,
    "keamanan_packing" boolean default  false,
    "description" text
);
