TRUNCATE TABLE "wrapper_types" RESTART IDENTITY;

INSERT INTO "wrapper_types" (
    "rank", "name", "price", "thumbnail"
) VALUES (
    0, 'Kertas Kado Regular', 5000, 'https://ik.imagekit.io/nwiq66cx3pvsy/Wrapping_Lab/wrapper/kertas_kado_regular/button.jpg'
), (
    1, 'Kertas Kado Premium', 10000, 'https://ik.imagekit.io/nwiq66cx3pvsy/Wrapping_Lab/wrapper/kertas_kado_premium/button.jpg'
), (
    2, 'Plastik Parcel', 2500, 'https://ik.imagekit.io/nwiq66cx3pvsy/Wrapping_Lab/wrapper/plastik_parcel/button.jpg'
);
