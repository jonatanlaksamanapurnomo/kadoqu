DROP TYPE IF EXISTS "testimony_categories" CASCADE;
DROP TABLE IF EXISTS "testimonies";

CREATE TYPE testimony_categories AS ENUM ('Custom Gift', 'Hampers Gift', 'Wrapping Lab', 'Holiday');
CREATE TABLE "testimonies" (
    "id" serial primary key,
    "name" text not null,
    "short_description" text default null,
    "budget" float8 not null,
    "testimony" text not null,
    "image" text not null,
    "category" testimony_categories default 'Custom Gift'
);
