truncate table "tags" cascade;

insert into "tags" (
    "product_id",
    "name"
) values (
    'a11d9be5-9724-4bb5-9c85-5bcd8308dc16','tag-1'
), (
    'a11d9be5-9724-4bb5-9c85-5bcd8308dc16','tag-2'
), (
    'e297311d-c4e2-45a6-8e0b-ad04c8b11ca7','tag-3'
);
