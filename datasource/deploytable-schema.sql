drop table IF EXISTS "deploy_history";

create TABLE "deploy_history" (
    "id" serial,
    "name" text  ,
    "status" text  ,
    "product" text  ,
    "created_at" timestamptz  default now()
);
