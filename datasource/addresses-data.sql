TRUNCATE TABLE "addresses" RESTART IDENTITY;

INSERT INTO "addresses" (
    "user_id",
    "alias",
    "name",
    "phone",
    "street",
    "city",
    "city_id",
    "province",
    "province_id",
    "subdistrict",
    "subdistrict_id",
    "post_code",
    "primary_address"
) VALUES (
    'e297311d-c4e2-45a6-8e0b-ad04c8b11ca7',
    'Kantor',
    'Mr. X',
    '09123123',
    'Prof. Eyckman 28 Pavilliun',
    'Bandung',
    '23',
    'Jawa Barat',
    '1',
    'Sukajadi',
    '364',
    '12345',
    true
), (
    'e297311d-c4e2-45a6-8e0b-ad04c8b11ca7',
    'Kosan',
    'Mr. Y',
    '09123123',
    'Jalan Babakan Jeruk II',
    'Bandung',
    '23',
    'Jawa Barat',
    '1',
    'Sukajadi',
    '364',
    '12345',
    false
), (
    'e297311d-c4e2-45a6-8e0b-ad04c8b11ca7',
    'Kosan 2',
    'Mr. Z',
    '09123123',
    'Jalan Banda',
    'Bandung',
    '23',
    'Jawa Barat',
    '1',
    'Sukajadi',
    '364',
    '12345',
    false
);
