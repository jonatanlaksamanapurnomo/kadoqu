DROP TYPE IF EXISTS "gida_option_categories" CASCADE;
DROP TABLE IF EXISTS "gida_options";

CREATE TYPE gida_option_categories AS ENUM ('Relationship', 'Event', 'Personality');
CREATE TABLE "gida_options" (
    "id" serial primary key,
    "value" text not null,
    "category" gida_option_categories not null
);
