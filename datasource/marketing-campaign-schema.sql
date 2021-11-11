drop table IF EXISTS "campaign";

create TABLE "campaign" (
    "id" serial primary key,
    "campaign_name" text not null,
    "products" json not null,
    "primary_discount" int default 0,
    "secondary_discount" int default 0,
    "campaign_total_sales" float8 default 0,
    "campaign_start" timestamptz not null ,
    "campaign_total_budget" float8 default 0,
	  "campaign_end" timestamptz not null
);
