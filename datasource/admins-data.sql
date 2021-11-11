TRUNCATE TABLE "admins";

INSERT INTO "admins"(
"id",
"phone",
"email",
"password",
"name",
"role",
"merchant_code"
)
VALUES (
'bfd0405d-6318-462b-b77b-542ea82aec21',
'6281380008200',
'jojo@natan.com',
crypt('123123jojo', gen_salt('bf')),
'Andre S',
'admin',
null
),
(
'bfd0405d-6318-462b-b77b-542ea82aec23',
'6281380008200',
'adminMaster',
crypt('amoraBahuhe567', gen_salt('bf')),
'Andre S',
'admin',
null
);
