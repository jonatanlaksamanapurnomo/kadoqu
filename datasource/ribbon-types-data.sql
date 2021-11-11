TRUNCATE TABLE "ribbon_types" RESTART IDENTITY;

INSERT INTO "ribbon_types" (
    "rank", "name", "info", "price", "thumbnail"
) VALUES (
    0, 'Pita Tarik S', 'lebar: 10cm', 5000, 'https://ik.imagekit.io/nwiq66cx3pvsy/Wrapping_Lab/ribbon/pita_tarik_s/button.jpg'
), (
    1, 'Pita Tarik M', 'lebar: 16cm', 7500, 'https://ik.imagekit.io/nwiq66cx3pvsy/Wrapping_Lab/ribbon/pita_tarik_m/button.jpg'
), (
    2, 'Pita Satin', 'harga per meter', 4500, 'https://ik.imagekit.io/nwiq66cx3pvsy/Wrapping_Lab/ribbon/pita_satin/button.jpg'
);
