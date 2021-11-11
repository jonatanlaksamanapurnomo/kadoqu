truncate table "banners" RESTART IDENTITY;

insert into "banners" (
    "image", "rank"
) values (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/1001-inpirasi-kado_desktop.png', 1
);

insert into "banners" (
    "image", "location"
) values (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/1001-inpirasi-kado_desktop.png',
    '1001_INSPIRASI_KADO__DES__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/1001-inpirasi-kado_mobile.png',
    '1001_INSPIRASI_KADO__MOB__TITLE'
),

 (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/kadoqu-gift_desktop.png',
    'KADOQU_GIFT__DES__TITLE'
),(
'https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Magical_Moment__1_.jpg',
'KADOQU_MAGICAL_DES_TITLE'
),
('https://ik.imagekit.io/nwiq66cx3pvsy/_MOB__Banner_Magical_Moment.jpg',
'KADOQU_MAGICAL_MOB_TITLE')
, (
'https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Kids_Party.jpg',
'KADOQU_KIDS_PARTY_DES_TITLE'
)
, (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/kadoqu-gift_desktop.png',
    'KADOQU_GIFT__DES__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/kadoqu-gift_mobile.png',
    'KADOQU_GIFT__MOB__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/kadoqu_holiday_desktop.jpg',
    'KADOQU_HOLIDAY__DES__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/kadoqu_holiday_mobile.png',
    'KADOQU_HOLIDAY__MOB__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/gallery_desktop.png',
    'GALLERY__DES__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/gallery_mobile.png',
    'GALLERY__MOB__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/wrapping-lab_desktop.jpg',
    'WRAPPING_LAB__DES__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/wrapping-lab_mobile.png',
    'WRAPPING_LAB__MOB__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/partner_desktop.png',
    'PARTNER__DES__TITLE'
), (
    'https://ik.imagekit.io/nwiq66cx3pvsy/Banners/partner_mobile.png',
    'PARTNER__MOB__TITLE'
);
