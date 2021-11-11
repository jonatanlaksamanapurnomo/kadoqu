TRUNCATE TABLE "users" CASCADE;

INSERT INTO "users"(
  "phone",
  "email",
  "password",
  "first_name",
  "last_name"
)
VALUES (
  '62811753899',
  'andre@susan.to',
  crypt('d', gen_salt('bf')),
  'Andre S',
  'Susanto'
), (
  '62811753899',
  'gitgit@kadoqu.com',
  crypt('johnspassword', gen_salt('bf')),
  'Gitgit',
  'A'
), (
  '62895325839650',
  'williamonlly@gmail.com',
  crypt('wilsut', gen_salt('bf')),
  'William',
  'Sutanto'
);

INSERT INTO "users"(
  "id",
  "phone",
  "email",
  "password",
  "first_name",
  "last_name"
)
VALUES (
  'e297311d-c4e2-45a6-8e0b-ad04c8b11ca7',
  '62811753899',
  'jonatanlaksamanapurnomo@gmail.com',
  crypt('123123jojo', gen_salt('bf')),
  'Jonatan',
  'Laksamana'
), (
  'e297311d-d1f5-45a6-8e0b-ad04c8b11ca8',
  '62811753899',
  'giselasupardi@gmail.com',
  crypt('abc123', gen_salt('bf')),
  'Gisela',
  'S'
),(
  'e297321d-d1f5-45a6-8e0b-ad04c8e11ca8',
  '6281958524733',
  'naofal.leo.agusta98@gmailc.om',
  crypt('d', gen_salt('bf')),
  'Naofal',
  'Leo Agusta'
),
(
  'e297539d-d1f5-45a6-8e0b-ad04c8e11ca8',
  '624858493045',
  'larasoctaa@gmail.com',
  crypt('d', gen_salt('bf')),
  'Lara',
  'octa'
);
