TRUNCATE TABLE "categories";

INSERT INTO "categories" (
    "id",
    "name",
    "default_banner",
    "wide_banner"
) VALUES (
    '5848de99-1307-4722-92b4-3a48ff15cf86',
    'Bunga',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/bunga.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/bunga.png'
), (
    'a68efa5b-eece-4c37-a200-20ce2690669c',
    'Cake & Cookies',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/cake_cookies.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/cake_cookies.png'
);

INSERT INTO "categories" (
    "name", "parent_id"
) VALUES (
    'Bunga Asli', '5848de99-1307-4722-92b4-3a48ff15cf86'
), (
    'Bunga Kertas', '5848de99-1307-4722-92b4-3a48ff15cf86'
), (
    'Cupcakes', 'a68efa5b-eece-4c37-a200-20ce2690669c'
);

INSERT INTO "categories" (
    "name", "default_banner", "wide_banner"
) VALUES (
	'Boneka',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/boneka.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/boneka.png'
), (
	'Couples',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/couples.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/couples.png'
), (
	'Hampers',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/hampers.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/hampers.png'
), (
	'Party Accessories',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/party_accessories.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/party_accessories.png'
), (
	'Photos & Frames',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/photos_frames.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/photos_frames.png'
), (
	'Souvenir',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/souvenir.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/souvenir.png'
), (
	'Others',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/DES/others.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Gift/MOB/others.png'
);
