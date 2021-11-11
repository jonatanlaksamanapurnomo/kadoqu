TRUNCATE TABLE "holiday_categories";

INSERT INTO "holiday_categories" (
  "name", "default_banner", "wide_banner", "filter_banner", "mobile_banner"
) VALUES (
	'Internasional',
	'/_DES__Tombol_Kadoqu_Holiday_InternasionalNew.png',
	'/Kadoqu_Holiday/DES/internasional.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Holiday/buttons/_DES__Banner_Filter_Kadoqu_Holiday_Internasional.png',
	'/Kadoqu_Holiday/buttons/_MOB__Tombol_Kadoqu_Holiday_Internasional.png'
), (
	'Domestik',
	'/_DES__Tombol_Kadoqu_Holiday_DomestikNew.png',
	'/Kadoqu_Holiday/DES/domestik.png',
	'https://ik.imagekit.io/nwiq66cx3pvsy/Kadoqu_Holiday/buttons/_DES__Banner_Filter_Kadoqu_Holiday_Domestik.png',
	'/Kadoqu_Holiday/buttons/_MOB__Tombol_Kadoqu_Holiday_Domestik.png'
);
