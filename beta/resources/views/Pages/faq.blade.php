@include('Parent.header')
<div class="content-push" style="padding-left: 10%;padding-right: 10%;">
    <div class="solusi_pembeli_title">
        SELAMAT DATANG DI PUSAT SOLUSI
    </div>
    <div class="sol_pembli_title_child">
        Topik apa yang ingin kamu cari tahu ?
    </div>
    <div style="margin: 0 auto; max-width: 100%; width: 830px;; max-height: 100%; margin-top: 20px;"> 
        <div class="faq-grid">
            <div class="testing_div">
                <a href="javascript:void(0)" style="color: black;">
                    <img src="asset/faq/icon_faqmerchant.png" class="image_solusi" onclick="showAccordions(1)">
                    <div class="title_grid_solusi">
                        MERCHANT 
                    </div>
                </a>
            </div>
            <div class="testing_div">
                <a href="javascript:void(0)" style="color: black;">
                    <img src="asset/faq/icon_faqcustomer.png" class="image_solusi" onclick="showAccordions(2)">
                    <div class="title_grid_solusi">
                        CUSTOMER 
                    </div>
                </a>
            </div>
            <div class="testing_div">
                <a href="javascript:void(0)" style="color: black;">
                    <img src="asset/faq/icon_faqpengiriman.png" class="image_solusi" onclick="showAccordions(3)">
                    <div class="title_grid_solusi">
                        PENGIRMAN 
                    </div>
                </a>
            </div>
            <div class="testing_div">
                <a href="javascript:void(0)" style="color: black;" onclick="showAccordions(4)">
                    <img src="asset/faq/icon_faqpengembalian.png" class="image_solusi">
                    <div class="title_grid_solusi">
                        PENGEMBALIAN 
                    </div>
                </a>
            </div>
            <div class="testing_div">
                <a href="javascript:void(0)" style="color: black;">
                    <img src="asset/faq/icon_faqpromo.png" class="image_solusi" onclick="showAccordions(5)">
                    <div class="title_grid_solusi">
                        KUPON & PROMO 
                    </div>
                </a>
            </div>
            <div class="testing_div">
                <a href="javascript:void(0)" style="color: black;">
                    <img src="asset/faq/icon_faqstore.png" class="image_solusi" onclick="showAccordions(6)">
                    <div class="title_grid_solusi">
                        KADOQU STORE 
                    </div>
                </a>
            </div>
            <div class="testing_div">
                <a href="javascript:void(0)" style="color: black;">
                    <img src="asset/faq/icon_faqgift.png" class="image_solusi" onclick="showAccordions(7)">
                    <div class="title_grid_solusi">
                        KADOQU GIFT 
                    </div>
                </a>
            </div>
            <div class="testing_div">
                <a href="javascript:void(0)" style="color: black;">
                    <img src="asset/faq/icon_faqgida.png" class="image_solusi" onclick="showAccordions(8)">
                    <div class="title_grid_solusi">
                        GIDA 
                    </div>
                </a>
            </div>
            <div class="faq-grid-child-ajukan">
                <a href="javascript:void(0)" style="color: black;" onclick="showAccordions(9)">
                    <img src="asset/gida/gida_3.png" class="image_solusi ajukan-img" >
                    <div class="title_grid_solusi ajukan-title">
                        AJUKAN PENGEMBALIAN 
                    </div>
                </a>
            </div>
        </div>
    </div>
    <hr class="faq-hr">
    <div id="accordions-here">
        <div id="faq-gida" class="accordion-ke-1">
            <div class="row">
                <div class="col-md-12">
                    <div class="title-accordion-dekstop" style="margin-left: 1%;">
                        <div class="col-xs-1">
                            <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                                <img src="asset/faq/icon_faqmerchant.png" class="rounded mx-auto d-block" style="width: 100px;">
                            </div>
                        </div>
                        <div class="col-xs-11" style="height: 100px;">
                            <div style="display: flex;width: 100%;height: 100px;">
                                <div class="faq-title" style="margin-top: 0;padding:15px;">FAQ Merchant</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="title-accordion-mobile">
                <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                    <table>
                        <thead>
                            <col width="50">
                            <tr>
                                <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                                <th>
                                    <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">FAQ Merchant</div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div style="padding-left: 10%;padding-right: 10%">
                <div class="row" style="margin-top: 70px;font-family: arial;">
                    <div>
                        <div id="faq-1" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(1)">
                            <div id="x-1" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa itu Merchant Kadoqu.com ?</div><i id="faq-i-1" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq1" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px">Merchant Kadoqu.com merupakan UMKM/Startup/Perusahaan yang bergabung bekerjasama dengan Kadoqu.com untuk memasarkan dan menjual produknya dan mencapai sukses bersama Kadoqu.com.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-2" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(2)">
                            <div id="x-2" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Siapa saja yang bisa menjadi Merchant Kadoqu.com ?</div><i id="faq-i-2" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq2" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px"><i>Startup</i>, UMKM atau usaha baik dimiliki oleh perorangan atau kelompok yang memiliki produk-produk kreatif, unik, menarik, memiliki daya jual tinggi, dan sesuai dengan pangsa pasar Kadoqu.com, bisa bergabung untuk menjadi merchant kami. </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-3" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(3)">
                            <div id="x-3" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Kenapa harus menjadi Merchant Kadoqu.com ?</div><i id="faq-i-3" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq3" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px">Produk mu akan lebih dikenal secara luas, terutama untuk kamu yang belum memiliki sistem khusus secara online. Kadoqu.com akan membantu memasarkan produk kamu melalui website dan online social media lainnya dari Kadoqu.com dengan menampilkan foto-foto terbaik dari produk kamu untuk bisa menarik perhatian konsumen, tanpa dipungut bayaran apapun.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-4" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(4)">
                            <div id="x-4" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana caranya menjadi Merchant Kadoqu.com ?</div><i id="faq-i-4" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq4" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px">Kamu bisa menghubungi tim Kadoqu.com untuk menjadi <i>merchant</i> yang nanti akan dihubungkan langsung dengan Tim Business <i>Development</i> (Tim BD) yang secara khusus menangani merchant-merchant dari Kadoqu.com. Silahkan hubungi tim kami melalui email <i>partner@kadoqu.com</i></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-5" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(5)">
                            <div id="x-5" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Produk seperti apa yang bisa dijual oleh Merchant Kadoqu.com ?</div><i id="faq-i-5" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq5" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px">Produk-produk untuk kebutuhan sehari-hari atau sebagai hiasan dan produk-produk cocok untuk dijadikan sebagai kado pun bisa bergabung menjadi merchant Kadoqu.com</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-6" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(6)">
                            <div id="x-6" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah ada pembayaran khusus untuk menjadi Merchant Kadoqu.com ?</div><i id="faq-i-6" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq6" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px">Kami tidak membebani merchant dengan joining fee dan maintenance fee. Kami hanya mengenakan commission fee sebesar 10% untuk setiap penjualan produk.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-7" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(7)">
                            <div id="x-7" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana Merchant Kadoqu.com menerima pembayaran dari penjualan produknya ?</div><i id="faq-i-7" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq7" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px">Setelah produk sampai pada konsumen, maka pembayaran akan secara otomatis diteruskan kepada merchant Kadoqu.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="customer" class="accordion-ke-2" style="display: none;">
            <div class="row">
                <div class="col-md-12">
                    <div class="title-accordion-dekstop" style="margin-left: 1%;">
                        <div class="col-xs-1">
                            <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                                <img src="asset/faq/icon_faqcustomer.png" class="rounded mx-auto d-block" style="width: 100px;">
                            </div>
                        </div>
                        <div class="col-xs-11" style="height: 100px;">
                            <div style="display: flex;width: 100%;height: 100px;">
                                <div class="faq-title" style="margin-top: 0;padding:15px;">FAQ Customer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="title-accordion-mobile">
                <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                    <table>
                        <thead>
                            <col width="50">
                            <tr>
                                <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                                <th>
                                    <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">Customerrrrr</div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div style="padding-left: 10%;padding-right: 10%">
                <div class="row" style="margin-top: 70px;font-family: arial;">
                    <div>
                        <div id="faq-8" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(8)">
                            <div id="x-8" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa itu Kadoqu.com ?</div><i id="faq-i-8" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq8" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px;">Kadoqu.com adalah sebuah start-up yang melakukan aktivitas bisnis secara online maupun offline. Kadoqu.com menawarkan produk-produk yang bekerjasama dengan merchant atau start up yang ada di Indonesia untuk memasarkan dan menjual produknya. Kadoqu.com memiliki dua jenis layanan berbeda untuk konsumen, yaitu Kadoqu Store dan Kadoqu Gift.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-9" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(9)">
                            <div id="x-9" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa saja barang yang tersedia di Kadoqu.com ?</div><i id="faq-i-9" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq9" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px;">Kadoqu menyediakan beragam kategori dan variasi barang yang cocok dijadikan kado. Terdapat 2 kategori barang yang kami sediakan yaitu Kadoqu Store dan Kadoqu Gift. Kami berusaha untuk menyediakan barang untuk kebutuhan hadiah bagi orang yang kamu sayang.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-10" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(10)">
                            <div id="x-10" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara saya membayar barang ?</div><i id="faq-i-10" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq10" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px;">Kadoqu memberikan kemudahan kepada Anda dalam bertransaksi di web Kadoqu. Kadoqu menyediakan tiga metode pembayaran yang menjamin kenyamanan dan keamanan Anda. Dengan berbelanja di Kadoqu, Anda dapat dengan mudah memilih metode pembayaran yang Anda inginkan dengan pilihan sebagai berikut:</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-11" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(11)">
                            <div id="x-11" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Berapa nomor rekening BCA Kadoqu.com?</div><i id="faq-i-11" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq11" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px;">BCA 517 030 8079 a/nFrigard Harjono</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-12" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(12)">
                            <div id="x-12" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Berapa nomor rekening Bank BNI Kadoqu.com?</div><i id="faq-i-12" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq12" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px;">BNI 041 968 6981 a/nFrigard Harjono</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-13" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(13)">
                            <div id="x-13" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Berapa nomor rekening Bank Mandiri Kadoqu.com?</div><i id="faq-i-13" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq13" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px;">Mandiri 131 001 409 3902 a/nFrigard Harjono</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-14" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(14)">
                            <div id="x-14" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui ATM BCA?</div><i id="faq-i-14" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq14" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px;">
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Masukkan kartu ATM dan nomor PIN Anda
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Pilih menu “Transaksi Lainnya”, pilih menu “Transfer”, lalu pilih menu “Ke Rekening BCA”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Masukkan nomor rekening: 5170308079, lalu pilih menu “Benar”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Masukkan nominal jumlah transfer, lalu pilih menu “Benar”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Periksa kembali data transaksi, lalu pilih menu “Benar”
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-15" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(15)">
                            <div id="x-15" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui e-Banking BCA?</div><i id="faq-i-15" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq15" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 18px;">
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Masukkan user ID dan nomor PIN Internet Banking Anda
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Pilih menu “Transfer Dana”, pilih menu “Transfer Ke Rek. BCA”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Pilih nomor rekening: 5170308079
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Masukkan nominal jumlah transfer
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Masukkan nomor pesanan Anda di kolom “Berita”, lalu masukkan “Respon KeyBCA”, kemudian tekan tombol “Lanjutkan”
                                    </div>
                                    <div style="display: inline-flex;">
                                        <span style="font-size: 20px">*</span>Periksa kembali data transaksi, masukkan “Respon KeyBCA”, lalu tekan tombol “Kirim”
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-16" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(16)">
                            <div id="x-16" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui teller bank BCA?</div><i id="faq-i-16" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq16" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 25px;">
                                    <div style="display: inline-flex;line-height: 20px;">
                                        <span style="font-size: 20px">*</span>Silakan ambil formulir setoran, lalu isi dengan data-data sebagai berikut:
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        1. Tanggal: Diisi dengan tanggal Anda transfer
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        2. Jenis Rekening: Tahapan
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        3. No. Rekening: 517 030 8079
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        4. Nama Pemilik Rekening: Frigard Harjono
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        5. Berita/Keterangan: Diisi dengan Nomor Pesanan Anda
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        6. Nama, Alamat, Informasi Penyetor silakan diisi dengan data-data Anda
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        7. Mata Uang: Rupiah
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        8. Kolom Tunai/No. Warkat: Tunai
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        9. Kolom Jumlah Rupiah: Diisi dengan angka jumlah transfer
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        10. Kolom Terbilang: Diisi dengan teks jumlah transfer
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;margin-top: 20px;">
                                        <span style="font-size: 20px">*</span>Serahkan formulir tersebut dan uang tunai ke Teller
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        <span style="font-size: 20px">*</span>Simpan salinan formulir tersebut sebagai bukti pembayaran pesanan Anda
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-17" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(17)">
                            <div id="x-17" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui ATM BNI?</div><i id="faq-i-17" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq17" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 25px;">
                                    <div style="display: inline-flex;line-height: 20px;">
                                        1. Masukkan kartu ATM dan nomor PIN Anda
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        2. Pilih menu “Transfer”, pilih menu “Dari Rekening Tabungan”, lalu pilih menu “Ke Rekening BNI”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        3. Masukkan nomor rekening: 0419686981, lalu pilih menu “Tekan Jika Benar”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        4. Masukkan nominal jumlah transfer, lalu pilih menu “Tekan Jika Benar”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        5. Periksa kembali data transaksi, lalu pilih menu “Tekan Jika Ya”
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-18" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(18)">
                            <div id="x-18" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui e-Banking BNI?</div><i id="faq-i-18" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq18" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 25px;">
                                    <div style="display: inline-flex;line-height: 20px;">
                                        1. Masukkan user ID dan nomor PIN Internet Banking Anda
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        2. Pilih menu “Transaksi”, pilih menu “Inisiasi Transaksi Transfer”, lalu pilih menu “Transfer Antar Rek. BNI”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        3. Masukkan nomor rekening: 5170308079, nama: Frigard Harjono, check (opsional) “Tambahkan ke Daftar Rekening Tujuan”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        4. Masukkan nominal jumlah transfer
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        5. Masukkan nomor pesanan Anda di kolom “Berita” dan masukkan e-Mail (opsional): info@Kadoqu.com di kolom “e-Mail Penerima”, kemudian tekan tombol “Lanjutkan”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        6. Periksa kembali data transaksi, masukkan “Respon BNI e-Secure”, lalu tekan tombol “Proses”
                                    </div>
                                    <br>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-19" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(19)">
                            <div id="x-19" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui teller bank BNI?</div><i id="faq-i-19" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq19" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 25px;">
                                    <div style="display: inline-flex;line-height: 20px;">
                                        <span style="font-size: 20px">*</span>Silakan ambil formulir setoran, lalu isi dengan data-data sebagai berikut:
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        1. Tanggal: Diisi dengan tanggal Anda transfer
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        2. Jenis Rekening: Taplus
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        3. No. Rekening: 041 968 6981
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        4. Nama Pemilik Rekening: Frigard Harjono
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        5. Berita/Keterangan: Diisi dengan Nomor Pesanan Anda
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        6. Nama, Alamat, Informasi Penyetor silakan diisi dengan data-data Anda
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        7. Mata Uang: IDR
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        8. Setoran: Tunai
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        9. Kolom Jumlah Rupiah: Diisi dengan angka jumlah transfer
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        10. Kolom Terbilang: Diisi dengan teks jumlah transfer
                                    </div>
                                    <div style="display: inline-flex;line-height: 20px;margin-top: 20px;">
                                        <span style="font-size: 20px">*</span>Serahkan formulir tersebut dan uang tunai ke Teller
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        <span style="font-size: 20px">*</span>Simpan salinan formulir tersebut sebagai bukti pembayaran pesanan Anda
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-20" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(20)">
                            <div id="x-20" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui ATM BNI?</div><i id="faq-i-20" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq20" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 25px;">
                                    <div style="display: inline-flex;line-height: 20px;">
                                        1. Masukkan kartu ATM dan nomor PIN Anda
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        2. Pilih menu “Transaksi Lainnya”, pilih menu “Transfer”, lalu pilih menu “Ke Rekening Mandiri"
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        3. Masukkan nomor rekening: 1310014093902, lalu pilih menu “Benar”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        4. Masukkan nominal jumlah transfer, lalu pilih menu “Benar”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        5. Periksa kembali data transaksi, lalu pilih menu “Benar”
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="faq-21" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(21)">
                            <div id="x-21" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui e-Banking Bank Mandiri?</div><i id="faq-i-21" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                            <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                        </div>
                        <div class="clear"></div>
                        <div class="col-md-12 nopadding">
                            <div style="display: none;width: 100%;"  id="collapseFaq21" class="its-collapse">
                                <p style="word-wrap: break-word;line-height: 25px;">
                                    <div style="display: inline-flex;line-height: 20px;">
                                        1. Masukkan user ID dan nomor PIN Internet Banking Anda
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                        2. Pilih menu “Transfer”, pilih menu “Rekening Mandiri”
                                    </div>
                                    <br>
                                    <div style="display: inline-flex;line-height: 20px;">
                                       3. Masukkan nominal jumlah transfer
                                   </div>
                                   <br>
                                   <div style="display: inline-flex;line-height: 20px;">
                                       4. Masukkan nomor rekening: 1310014093902, check (opsional) “Simpan ke Daftar Transfer”, lalu pilih “Tanggal Transfer Sekarang”
                                   </div>
                                   <br>
                                   <div style="display: inline-flex;line-height: 20px;">
                                    5. Masukkan nomor pesanan Anda di kolom “Berita” dan masukkan e-Mail (opsional): info@Kadoqu.com di kolom “e-Mail Penerima”
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    6. Periksa kembali data transaksi, masukkan “PIN Mandiri”, lalu tekan tombol “Kirim”
                                </div>
                                <br>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-22" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(22)">
                        <div id="x-22" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara bayar melalui teller bank Mandiri?</div><i id="faq-i-22" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq22" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 25px;">
                                <div style="display: inline-flex;line-height: 20px;">
                                    <span style="font-size: 20px">*</span>Silakan ambil formulir setoran, lalu isi dengan data-data sebagai berikut:
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    1. Tanggal: Diisi dengan tanggal Anda transfer
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    2. Jenis Rekening: Transfer
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    3. Untuk kolom Penerima:
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;margin-left: 15px;">
                                    a. Penerima: Penduduk
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;margin-left: 15px;">
                                    b. Nama: Frigard Harjono
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;margin-left: 15px;">
                                    c. No. Rekening: 131 001 409 3902
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;margin-left: 15px;">
                                    d. Bank: Mandiri
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;margin-left: 15px;">
                                    e. Berita untuk Penerima: Diisi dengan Nomor Pesanan Anda
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    4. Untuk kolom Pengirim:
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;margin-left: 15px;">
                                    a. Nama, Alamat, Informasi Pengirim silakan diisi dengan data-data Anda
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    5. Untuk kolom Sumber Dana Transaksi silakan diisi dengan Tunai/Debet rekening
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    6. Kolom Jumlah Setoran: Diisi dengan angka jumlah transfer
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    7. Kolom Terbilang: Diisi dengan teks jumlah transfer
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;margin-top: 20px;">
                                    <span style="font-size: 20px">*</span>Serahkan formulir tersebut dan uang tunai ke Teller
                                </div>
                                <br>
                                <div style="display: inline-flex;line-height: 20px;">
                                    <span style="font-size: 20px">*</span>Simpan salinan formulir tersebut sebagai bukti pembayaran pesanan Anda
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="pengiriman" class="accordion-ke-3" style="display: none;">
        <div class="row">
            <div class="col-md-12">
                <div class="title-accordion-dekstop" style="margin-left: 1%;">
                    <div class="col-xs-1">
                        <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                            <img src="asset/faq/icon_faqpengiriman.png" class="rounded mx-auto d-block" style="width: 100px;">
                        </div>
                    </div>
                    <div class="col-xs-11" style="height: 100px;">
                        <div style="display: flex;width: 100%;height: 100px;">
                            <div class="faq-title" style="margin-top: 0;padding:15px;">Semua tentang pengiriman</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-accordion-mobile">
            <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                <table>
                    <thead>
                        <col width="50">
                        <tr>
                            <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                            <th>
                                <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">Semua tentang pengiriman</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div style="padding-left: 10%;padding-right: 10%">
            <div class="row" style="margin-top: 70px;font-family: arial;">
                <div>
                    <div id="faq-24" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(24)">
                        <div id="x-24" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana pengiriman barang dari Kadoqu Store dan Kadoqu Gift?</div><i id="faq-i-24" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq24" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Kadoqu akan selalu mengirimkan barang di hari yang sama dengan hari Anda memesan barang di web Kadoqu yang tidak melewati hari dan jam operasional Kadoqu, Senin s.d Jum’at pukul 09:00 WIB – 17.00 WIB dan Sabtu pukul 09:00 WIB – 12:00 WIB.</p>
                            <p style="word-wrap: break-word;line-height: 18px;margin-top: 20px;">Jika Anda melakukan pemesanan barang di web Kadoqu melewati hari dan jam operasional Kadoqu dan/atau hari Minggu atau Libur Nasional, maka proses pengiriman barang akan dilakukan di hari berikutnya.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-25" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(25)">
                        <div id="x-25" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa itu subsidi ongkos kirim ?</div><i id="faq-i-2" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq25" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Ongkos kirim gratis* ke seluruh Indonesia ! </p>
                            <div style="display: inline-flex;line-height: 20px;">
                                <span style="font-size: 20px">*</span>Kadoqu memberikan subsidi ongkos kirim, gratis! 50% (atau maksimum Rp15.000) dari ongkos kirim yang harus Anda bayarkan apabila pesanan Anda setidaknya senilai Rp150.000 (setelah diskon) untuk setiap satu kali pemesanan / checkout.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-26" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(26)">
                        <div id="x-26" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara melacak status pengiriman pesanan saya ?</div><i id="faq-i-26" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq26" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Anda dapat melacak pesanan Anda selama 24 jam/7 hari dengan mengikuti langkah-langkah berikut:</p>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Buka web Kadoqu.com.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Masukkan nomor kiriman atau nomor resi yang Anda terima via e-Mail atau SMS dari Kadoqu di kolom “Lacak Pesanan”
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Tekan tombol Search / Cari. Maka sistem akan memberi tahu lokasi barang anda.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-27" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(27)">
                        <div id="x-27" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah ada batasan wilayah pengiriman barang?</div><i id="faq-i-27" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq27" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Kategori produk Food &amp; Beverage basah seperti nasi kotak, cake, camilan basah, bunga segar, untuk sementara hanya dapat dikirim di wilayah kota Bandung. Hal ini dilakukan untuk mencegah kerusakan barang karena perjalanan dan waktu pengiriman.</p>
                        </div>
                    </div>
                </div>                     
            </div>
        </div>
    </div>
    <div id="pengajuan-pengembalian" class="accordion-ke-4" style="display: none;">
        <div class="row">
            <div class="col-md-12">
                <div class="title-accordion-dekstop" style="margin-left: 1%;">
                    <div class="col-xs-1">
                        <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                            <img src="asset/faq/icon_faqpengembalian.png" class="rounded mx-auto d-block" style="width: 100px;">
                        </div>
                    </div>
                    <div class="col-xs-11" style="height: 100px;">
                        <div style="display: flex;width: 100%;height: 100px;">
                            <div class="faq-title" style="margin-top: 0;padding:15px;">Semua tentang pengembalian</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-accordion-mobile">
            <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                <table>
                    <thead>
                        <col width="50">
                        <tr>
                            <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                            <th>
                                <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">Semua tentang pengembalian</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div style="padding-left: 10%;padding-right: 10%">
            <div class="row" style="margin-top: 70px;font-family: arial;">
                <div>
                    <div id="faq-28" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(28)">
                        <div id="x-28" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah saya bisa mengajukan pengembalian barang? Bagaimana caranya ?</div><i id="faq-i-28" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq28" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Bisa, sebelum Anda mengembalikan barang, pastikan Anda telah membaca Kebijakan Pengembalian Barang Kadoqu guna memastikan barang Anda layak untuk dikembalikan.</p>
                            <p style="word-wrap: break-word;line-height: 20px;margin-top: 20px;">Apabila pengembalian barang Anda telah sesuai dengan persyaratan, pengembalian barang dapat dimulai dengan langkah sebagai berikut:</p>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Pastikan barang masih dalam bungkus dan di segel (termasuk aksesoris atau bonus barang).
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Isi Formulir Pengembalian Barang dengan lengkap di sini.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Kemas ulang barang yang akan dikembalikan dengan baik.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Kirim ke alamat Warehouse Kadoqu di Jl. Professor Eyckman No. 28 Pav., Kel. Pasteur Kec. Sukajadi, Bandung 40161, Jawa Barat - Indonesia.
                            </div>
                            <p style="word-wrap: break-word;margin-top: 20px;">CATATAN:</p>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Pengembalian barang WAJIB disertai pengisian Formulir Pengembalian Barang yang diisi dengan lengkap.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Pengembalian barang yang tidak disertai pengisian Formulir Pengembalian Barang tidak akan diproses.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Ongkos kirim pengembalian barang sepenuhnya menjadi tanggungan Anda, Kadoqu tidak akan menggantinya.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Pengembalian barang akan diproses dalam waktu paling lambat 14 hari kerja sejak barang yang Anda kembalikan diterima Kadoqu.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-29" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(29)">
                        <div id="x-29" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa saja syarat pengembalian barang?</div><i id="faq-i-29" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq29" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Anda dapat melakukan pengembalian barang dengan 2 syarat barang berikut ini :</p>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                a. Barang tidak sesuai pesanan – ditukar dengan barang yang seharusnya – batas waktu pengembalian produk 3 hari setelah barang diterima.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                b. Barang rusak, cacat saat diterima.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-30" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(30)">
                        <div id="x-30" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa saja barang yang tidak dapat dilakukan pengembalian?</div><i id="faq-i-30" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq30" class="its-collapse">
                            <div style="display: inline-flex;line-height: 20px;">
                                a. Karena alasan kebersihan, kesehatan dan kualitas, jika barang sudah dibuka segelnya – Kategori : Food and Beverage, Custom Product, Kosmetik, Jam Tangan, Kaos Kaki, Anting, bunga segar.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                b. Pembeli berubah pikiran.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                c. Barang sudah tidak di perlukan.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                d. Harga barang dibawah Rp. 20.000.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-31" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(31)">
                        <div id="x-31" class="x-title">Bagaimana kebijakan dalam pengembalian barang ?</div><i id="faq-i-31" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq31" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Anda selalu diperbolehkan untuk mengembalikan barang ke Kadoqu dalam waktu 3 hari kerja sejak tanggal penerimaan. Penghitungan dimulai dari tanggal Anda menerima barang sampai engan tanggal cap pos yang Kadoqu terima yang tertera pada dokumen pengiriman yang Anda kembalikan ke Kadoqu.</p>
                            <p style="word-wrap: break-word;line-height: 20px;margin-top: 20px;">Berikut syarat dan ketentuan pengembalian barang yang berlaku dan sah di Kadoqu:</p>
                            <ul style="list-style: circle;margin-left: 15px;line-height: 20px;">
                                <li>Barang dapat dikembalikan dalam waktu 3 hari kerja sejak tanggal penerimaan.</li>
                                <li>Formulir Pengembalian Barang yang telah diisi dengan lengkap.</li>
                                <li>Barang yang dikembalikan harus dalam keadaan yang sama saat Anda terima termasuk kelengkapannya, tidak ada bagian yang hilang, tidak dalam keadaan rusak, kotor dan/atau sudah pernah dicuci, termasuk kemasan (dus / plastik) asli.</li>
                                <li>Kadoqu berhak menolak penerimaan pengembalian barang jika tidak sesuai syarat dan ketentuan dan/atau alasan dan kondisi yang tidak terpenuhi seperti yang tertulis pada tabel di bawah ini.</li>
                            </ul>
                            <div  style="overflow-x:auto;">
                                <table class="table" style="border:1px solid;margin-top: 40px;">
                                    <thead>
                                        <tr>
                                            <th style="text-align: center;">Alasan</th>
                                            <th style="text-align: center;">Baru</th>
                                            <th style="text-align: center;">Tersegel</th>
                                            <th style="text-align: center;">Tidak Rusak</th>
                                            <th style="text-align: center;">Tag & Lable Tersedia</th>
                                            <th style="text-align: center;">Lengkap (Aksesoris, Hadiah,Kemasan (Dus / Plastik) Asli)</th>
                                        </tr>
                                    </thead>
                                    <tbody style="text-align: center;">
                                        <tr>
                                            <td>Rusak</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>X</td>
                                            <td>X</td>
                                        </tr>
                                        <tr>
                                            <td>Cacat</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>X</td>
                                            <td>X</td>
                                            <td>X</td>
                                        </tr>
                                        <tr>
                                            <td>Tidak sesuai dengan foto dan deskripsi web</td>
                                            <td>X</td>
                                            <td>-</td>
                                            <td>X</td>
                                            <td>X</td>
                                            <td>X</td>
                                        </tr>
                                        <tr>
                                            <td>Tidak sesuai dengan pesanan</td>
                                            <td>X</td>
                                            <td>-</td>
                                            <td>X</td>
                                            <td>X</td>
                                            <td>X</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p style="word-wrap: break-word;line-height: 20px;margin-top: 20px;">CATATAN:</p>
                            <p style="word-wrap: break-word;line-height: 20px;">Apabila pengembalian barang Anda dinyatakan tidak sah, Customer Service Kadoqu akan menghubungi Anda sebelum mengembalikannya kembali kepada Anda. Ongkos kirim pengembalian barang yang telah Anda lakukan sebelumnya tidak akan Kadoqu ganti.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-32" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(32)">
                        <div id="x-32" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara mengembalikan ongkos kirim ?</div><i id="faq-i-32" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq32" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Pengembalian ongkos kirim gratis* ke Kadoqu!</p>
                            <p style="word-wrap: break-word;line-height: 20px;margin-top: 20px">*Kadoqu akan mengganti ongkos kirim yang telah Anda keluarkan saat mengembalikan barang ke Kadoqu, gratis! maksimal s.d Rp25.000, caranya cukup dengan mengisi Formulir Pengembalian Ongkos Kirim. Pengembalian ongkos kirim dapat dimulai dengan langkah sebagai berikut:</p>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Isi Formulir Pengembalian Ongkos Kirim dengan lengkap di sini.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Unggah foto bukti produk rusak/tidak sesuai pesanan
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Unggah foto / bukti resi pengiriman pengembalian barang dengan format file .pdf atau .jpg
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;">
                                - Permintaan pengembalian ongkos kirim Anda telah selesai.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-33" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(33)">
                        <div id="x-33" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana jika saya ingin mengembalikan produk ke Kadoqu.com tapi return packing slip hilang/rusak ?</div><i id="faq-i-33" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq33" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Jangan khawatir, silakan unduh dan/atau print Return Packing Slip di sini dan lengkapi dengan data-data yang diperlukan seperti pada contoh di bawah ini:</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-34" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(34)">
                        <div id="x-34" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara melakukan Refund (pengembalian dana)?</div><i id="faq-i-34" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq34" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Refund (pengembalian dana) dapat anda lakukan dengan salah satu syarat berikut :</p>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                a. Barang tidak sesuai pesanan, mau ditukar tetapi out of stock.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                b. Barang yang diinginkan out of stock.
                            </div>
                            <p style="word-wrap: break-word;line-height: 20px;">Pengembalian Dana (Refund) akan dilakukan ke rekening bank Pembeli yang terdaftar saat melakukan pembayaran pesanan. Proses refund dapat dilakukan melalui halaman “Solusi Pembeli”. Silahkan kontak customer service kami untuk bantuan.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-35" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(35)">
                        <div id="x-35" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Kepada siapa biaya kurir pengiriman kembali barang harus ditanggung?</div><i id="faq-i-35" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq35" class="its-collapse">
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                a. Alasan barang tidak sesuai – oleh merchant
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                b. Alasan lain dapat diselesaikan dengan diskusi dengan customer support kadoqu.com melalui email hello@kadoqu.com
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-36" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(36)">
                        <div id="x-36" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana jika barang saya tidak sampai sesuai waktu estimasi pengiriman?</div><i id="faq-i-36" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq36" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Jika barang yang dipesan belum diterima dalam waktu lebih dari 7 hari kerja atau hilang di perjalanan, maka hal ini merupakan tanggung jawab dari pihak kurir (Layanan Pengiriman), dan bukan tanggung jawab pihak kadoqu.com. Kebijakan refund tidak dapat berlaku.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-37" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(37)">
                        <div id="x-37" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah ada batas waktu komplain barang?</div><i id="faq-i-37" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq37" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Ya, ada. Pembeli tidak bisa lagi mengajukan komplain terhadap pesanan yang sama setelah 3 hari sejak status complain telah selesai atau dibatalkan yang dinyatakan oleh kadoqu.com via email.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-38" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(38)">
                        <div id="x-38" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah Kadoqu.com akan membantu saya dalam mengatasi komplain?</div><i id="faq-i-11" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq38" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 20px;">Ya, tentu saja! Kadoqu.com memfasilitasi proses diskusi pengembalian, penukaran produk, pengembalian dana dengan menyediakan halaman “Solusi Pembeli (Link)”. Pada halaman “Solusi Pembeli” yang disediakan, pembeli dapat melaporkan keluhan pesanan dalam kurun 1×24 jam dari waktu pembeli menerima produk. Setelah Permintaan Pengembalian (Return Request) diterima dan diproses oleh Customer Service kami, maka Customer Service kami akan segera menghubungi pembeli melalui alamat surat elektronik (email) atau telepon untuk mengkonfirmasikan Return Request pembeli. Apabila Return Request disetujui, Customer Service akan memberikan informasi mengenai metode pengiriman produk yang dikembalikan.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="kupon-promo" class="accordion-ke-5" style="display: none;">
        <div class="row">
            <div class="col-md-12">
                <div class="title-accordion-dekstop" style="margin-left: 1%;">
                    <div class="col-xs-1">
                        <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                            <img src="asset/faq/icon_faqpromo.png" class="rounded mx-auto d-block" style="width: 100px;">
                        </div>
                    </div>
                    <div class="col-xs-11" style="height: 100px;">
                        <div style="display: flex;width: 100%;height: 100px;">
                            <div class="faq-title" style="margin-top: 0;padding:15px;">Semua tentang Kupon, Promo, dan Diskon</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-accordion-mobile">
            <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                <table>
                    <thead>
                        <col width="50">
                        <tr>
                            <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                            <th>
                                <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">Semua tentang Kupon, Promo, dan Diskon</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div style="padding-left: 10%;padding-right: 10%">
            <div class="row" style="margin-top: 70px;font-family: arial;">
                <div>
                    <div id="faq-39" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(39)">
                        <div id="x-39" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara saya mendapatkan kupon yang berlaku di Kadoqu.com ?</div><i id="faq-i-39" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq39" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Anda bisa mendapatkan kupon yang berlaku di Kadoqu.com dengan cara mendaftar/berlangganan newsletter kami atau mengikuti akun sosial media kami di Facebook, Twitter, maupun Instagram.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-391" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(391)">
                        <div id="x-391" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara saya menggunakan kupon ?</div><i id="faq-i-391" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq391" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Anda dapat menggunakan kupon yang Anda miliki pada saat Anda mulai memproses keranjang belanja Anda di kolom yang tersedia pada halaman keranjang belanja Anda. Masukkan kupon/kode kupon yang Anda miliki tersebut (di sebelah kiri halaman), lalu tekan tombol “Berlaku/Terapkan Kupon”. Potongan/penyesuaian harga akan terjadi untuk keranjang belanja Anda tersebut. Mohon dicatat bahwa kupon yang Anda miliki masih dalam masa berlaku dan telah berhasil digunakan pada saat pemrosesan keranjang belanja Anda sebelum selesai penempatan pesanan.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-40" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(40)">
                        <div id="x-40" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana jika masa berlaku kupon telah habis, sudah lewat dari waktu yang ditentukan ?</div><i id="faq-i-40" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq40" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Kupon yang telah habis masa berlakunya, sudah lewat dari waktu yang ditentukan sudah tida berlaku lagi.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-41" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(41)">
                        <div id="x-41" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah saya tetap dapat menggunakan kupon jika masa berlaku kupon telah habis, sudah lewat dari waktu yang ditentukan ?</div><i id="faq-i-41" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq41" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Maaf, Anda tidak dapat menggunakan kupon jika masa berlaku kupon Anda telah habis, sudah lewat dari waktu yang ditentukan. Namun Anda jangan khawatir, kami akan selalu memberikan kupon-kupon terbaru dalam periode-periode waktu tertentu dan mengingatkan Anda untuk menggunakan kupon Anda sebelum masa berlakunya habis.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-42" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(42)">
                        <div id="x-42" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Berapa lama masa berlaku kupon ?</div><i id="faq-i-42" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq42" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Bervariasi. Masa berlaku kupon akan kami informasikan baik di website maupun akun sosial media kami. Jika Anda menerima kupon melalui e-Mail, masa berlaku kupon akan kami informasikan di e-Mail.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-43" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(43)">
                        <div id="x-43" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah saya bisa menggunakan kupon untuk pesanan yang sudah ada sebelumnya ?</div><i id="faq-i-43" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq43" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Maaf, kami tidak dapat menambahkan kupon ke dalam pesanan Anda melalui sistem. Kupon/kode kupon harus Anda masukkan ketika Anda berada pada halaman keranjang belanja Anda sebelum selesai penempatan pesanan.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-44" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(44)">
                        <div id="x-44" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah saya bisa menggunakan beberapa kupon yang berbeda dalam satu pesanan ?</div><i id="faq-i-44" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq44" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Anda hanya dapat menggunakan kupon sebanyak 1 kali per transaksi.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-45" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(45)">
                        <div id="x-45" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah kupon berlaku untuk semua barang ?</div><i id="faq-i-45" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq45" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Maaf, kupon hanya berlaku dan hanya dapat digunakan untuk barang-barang yang tidak termasuk dalam promo dan/atau diskon yang sedang berlangsung di Kadoqu.com</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-46" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(46)">
                        <div id="x-46" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana saya mengetahui adanya promo, diskon di Kadoqu.com ?</div><i id="faq-i-46" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq46" class="its-collapse">
                            <p style="word-wrap: break-word;">Anda dapat mengetahui berbagai promo, diskon yang sedang berlangsung di Kadoqu.com dengan cara mendaftar/berlangganan newsletter kami, mengikuti akun sosial media kami di Facebook, Twitter, maupun Instagram, atau dapat juga melihat langsung tepat di website kami Kadoqu.com</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-47" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(47)">
                        <div id="x-47" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Jika sedang berlangsung promo, diskon di Kadoqu.com, apakah saya dapat membeli/membayar atas sebagian/seluruh pesanan saya menggunakan kupon ?</div><i id="faq-i-47" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq47" class="its-collapse">
                            <p style="word-wrap: break-word;">Ya, jika sedang berlangsung promo dan/atau diskon di Kadoqu.com, kupon/kode kupon yang Anda miliki tetap dapat digunakan namun terbatas hanya berlaku untuk barang-barang yang tidak termasuk dalam promo dan/atau diskon.</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
    <div id="kadoqu-store" class="accordion-ke-6" style="display: none;">
        <div class="row">
            <div class="col-md-12">
                <div class="title-accordion-dekstop" style="margin-left: 1%;">
                    <div class="col-xs-1">
                        <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                            <img src="asset/faq/icon_faqstore.png" class="rounded mx-auto d-block" style="width: 100px;">
                        </div>
                    </div>
                    <div class="col-xs-11" style="height: 100px;">
                        <div style="display: flex;width: 100%;height: 100px;">
                            <div class="faq-title" style="margin-top: 0;padding:15px;">Semua Tentang Kadoqu Store</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-accordion-mobile">
            <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                <table>
                    <thead>
                        <col width="50">
                        <tr>
                            <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                            <th>
                                <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">Semua Tentang Kadoqu Store</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div style="padding-left: 10%;padding-right: 10%">
            <div class="row" style="margin-top: 70px;font-family: arial;">
                <div>
                    <div id="faq-48" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(48)">
                        <div id="x-48" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa itu Kadoqu Store ?</div><i id="faq-i-48" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq48" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Kadoqu Store adalah kategori produk yang menawarkan produk-produk retail untuk kebutuhan sehari-hari seperti pakaian, tas, alat kecantikan, dan lain-lain yang bekerjasama dengan merchant atau start up yang ada di Indonesia. Barang di Kadoqu store bisa dibungkus dan jadi kado juga lho!</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-49" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(49)">
                        <div id="x-49" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara berbelanja di Kadoqu Store ?</div><i id="faq-i-49" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq49" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Hanya dengan 8 langkah saja, Anda sudah dapat membeli barang yang Anda inginkan dengan langkah di Kadoqu Store sebagai berikut:</p>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                1. Pilih Barang<br>Pilih barang favorit yang Anda inginkan.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                2. Periksa Informasi Barang<br>Periksa informasi barang yang tersedia (deskripsi, ukuran, warna, dan ketersediaan barang). Pastikan barang yang Anda pilih sesuai dengan yang Anda inginkan, tekan tombol Beli untuk memasukkan barang tersebut ke dalam keranjang belanja Anda, kemudian tekan tombol View Cart &amp; Checkout melihat dan memproses keranjang belanja Anda atau Not Now untuk melanjutkan belanja.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                3. Konfirmasi Keranjang Belanja<br>Periksa kembali barang yang Anda pesan. Jika sudah sesuai, tekan tombol Lanjutkan ke checkout untuk mulai memproses keranjang belanja Anda.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                4. Isi Data Diri<br>Pilih metode Checkout yang Anda inginkan disertai dengan menekan tombol Lanjutkan:
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                <ul style="list-style: circle;margin-left: 25px;line-height: 20px;">
                                    <li>Checkout sebagai tamu -&gt; Memproses pesanan tanpa membuat akun di web Kadoqu.</li>
                                    <li>Daftar -&gt; Memproses pesanan dengan membuat akun di web Kadoqu, login untuk pengecekan riwayat dan status pesanan Anda. Kemudian masukkan informasi yang dibutuhkan dengan benar dan lengkap.</li>
                                </ul>
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                5. Pilih Metode Pengiriman<br>Pilih metode pengiriman yang Anda inginkan. Informasi lebih lanjut mengenai Metode Pengiriman silakan klik di sini.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                6. Pilih Metode Pembayaran<br>Pilih metode pembayaran yang Anda inginkan. Informasi lebih lanjut mengenai Metode Pembayaran silakan klik di sini.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                7. Tempatkan Pesanan<br>Periksa kembali daftar barang yang Anda pesan (beserta biaya ongkos kirim). Jika sudah sesuai, tekan tombol Penempatan pesanan untuk menyelesaikan keranjang belanja / pesanan Anda.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                8. Konfirmasi Pesanan<br>Catat nomor pesanan Anda. Konfirmasi pesanan akan dikirimkan juga ke Anda melalui e-Mail dan SMS.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-50" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(50)">
                        <div id="x-50" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah boleh membeli produk dari Kadoqu Store untuk dijadikan sebuah kado  Bagaimana pemesanannya ?</div><i id="faq-i-50" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq50" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Tentu saja boleh, kamu hanya mengikuti proses pemesanan dan masuk ke dalam proses pembungkusan kado.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="kadoqu-gift" class="accordion-ke-7" style="display: none;">
        <div class="row">
            <div class="col-md-12">
                <div class="title-accordion-dekstop" style="margin-left: 1%;">
                    <div class="col-xs-1">
                        <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                            <img src="asset/faq/icon_faqgift.png" class="rounded mx-auto d-block" style="width: 100px;">
                        </div>
                    </div>
                    <div class="col-xs-11" style="height: 100px;">
                        <div style="display: flex;width: 100%;height: 100px;">
                            <div class="faq-title" style="margin-top: 0;padding:15px;">Semua Tentang Kadoqu Gift</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-accordion-mobile">
            <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                <table>
                    <thead>
                        <col width="50">
                        <tr>
                            <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                            <th>
                                <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">Semua Tentang Kadoqu Gift</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div style="padding-left: 10%;padding-right: 10%">
            <div class="row" style="margin-top: 70px;font-family: arial;">
                <div>
                    <div id="faq-51" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(51)">
                        <div id="x-51" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa itu Kadoqu Gift ?</div><i id="faq-i-51" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq51" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Kadoqu Gift adalah kategori produk yang menawarkan beragam jenis barang yang cocok dijadikan sebuah kado, baik kado modern maupun handmade terbaik karya pengrajin dan UMKM di Indonesia.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-52" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(52)">
                        <div id="x-52" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah boleh membeli produk dari Kadoqu Gift untuk pribadi (bukan untuk dijadikan sebagai kado) ?</div><i id="faq-i-52" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq52" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Tentu saja boleh, anda hanya mengikuti proses pemesanan tanpa harus melewati proses pemilihan pembungkusan kado.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-53" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(53)">
                        <div id="x-53" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Bagaimana cara berbelanja di Kadoqu Gift ?</div><i id="faq-i-53" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq53" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Berbelanja di Kadoqu Gift hampir sama dengan proses berbelanja di Kadoqu Store. Hanya saja di Kadoqu Gift kamu harus melewati proses pembungkusan kado sebagai berikut :</p>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                1. Pilih Barang<br>Pilih barang favorit yang Anda inginkan.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                2. Periksa Informasi Barang<br>Periksa informasi barang yang tersedia (deskripsi, ukuran, warna, dan ketersediaan barang). Pastikan barang yang Anda pilih sesuai dengan yang Anda inginkan, tekan tombol Beli untuk memasukkan barang tersebut ke dalam keranjang belanja Anda, kemudian tekan tombol View Cart &amp; Checkout melihat dan memproses keranjang belanja Anda atau Not Now untuk melanjutkan belanja.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                3. Konfirmasi Keranjang Belanja<br>Periksa kembali barang yang Anda pesan. Jika sudah sesuai, tekan tombol Lanjutkan ke checkout untuk mulai memproses keranjang belanja Anda.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                4. Isi Data Diri<br>Pilih metode Checkout yang Anda inginkan disertai dengan menekan tombol Lanjutkan:
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                <ul style="list-style: circle;margin-left: 25px;line-height: 20px;">
                                    <li>Checkout sebagai tamu -&gt; Memproses pesanan tanpa membuat akun di web Kadoqu.</li>
                                    <li>Daftar -&gt; Memproses pesanan dengan membuat akun di web Kadoqu, login untuk pengecekan riwayat dan status pesanan Anda. Kemudian masukkan informasi yang dibutuhkan dengan benar dan lengkap.</li>
                                </ul>
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                5. Pilih Metode Pengiriman<br>Pilih metode pengiriman yang Anda inginkan. Informasi lebih lanjut mengenai Metode Pengiriman silakan klik di sini.
                            </div>

                            
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                6. Pilih Metode Pembayaran<br>Pilih metode pembayaran yang Anda inginkan. Informasi lebih lanjut mengenai Metode Pembayaran silakan klik di sini.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                7. Tempatkan Pesanan<br>Periksa kembali daftar barang yang Anda pesan (beserta biaya ongkos kirim). Jika sudah sesuai, tekan tombol Penempatan pesanan untuk menyelesaikan keranjang belanja / pesanan Anda.
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                8. Masuk ke dalam proses pembungkusan kado
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 30px;">
                                - memilih warna dan design bungkus kado
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 30px;">
                                - memilih design dan hiasan pembungkusan kado
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 30px;">
                                - membuat kartu ucapan
                            </div>
                            <br>
                            <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                                9. Konfirmasi Pesanan<br>Catat nomor pesanan Anda. Konfirmasi pesanan akan dikirimkan juga ke Anda melalui e-Maildan SMS.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-54" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(54)">
                        <div id="x-54" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa itu bungkus pesanan gratis ?</div><i id="faq-i-54" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq54" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Anda ingin memberikan hadiah atau kado kepada teman / keluarga Anda ? Bungkus pesanan Anda gratis* di Kadoqu !</p>
                            <br>
                            <p style="word-wrap: break-word;line-height: 18px;">* Kadoqu menyediakan pelayanan wrapping gratis di setiap pesanan Anda tanpa syarat dan ketentuan apapun.</p>
                            <br>
                            <p style="word-wrap: break-word;line-height: 18px;">Caranya cukup dengan mengaktifkan opsi Buat kertas kado yang baru, atau jika Anda telah memiliki pilihan kertas kado pada pesanan sebelumnya dan ingin menambahkan pada kertas kado yang sama, maka pilih opsi Tambahkan ke dalam kertas kado yang sama, yang ada pada halaman Produk.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="gida" class="accordion-ke-8" style="display: none;">
        <div class="row">
            <div class="col-md-12">
                <div class="title-accordion-dekstop" style="margin-left: 1%;">
                    <div class="col-xs-1">
                        <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                            <img src="asset/faq/icon_faqgida.png" class="rounded mx-auto d-block" style="width: 100px;">
                        </div>
                    </div>
                    <div class="col-xs-11" style="height: 100px;">
                        <div style="display: flex;width: 100%;height: 100px;">
                            <div class="faq-title" style="margin-top: 0;padding:15px;">FAQ About GIdA</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-accordion-mobile">
            <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                <table>
                    <thead>
                        <col width="50">
                        <tr>
                            <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                            <th>
                                <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">FAQ About GIdA</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div style="padding-left: 10%;padding-right: 10%">
            <div class="row" style="margin-top: 70px;font-family: arial;">
                <div>
                    <div id="faq-55" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(55)">
                        <div id="x-55" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa itu GIdA ?</div><i id="faq-i-55" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq55" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">GIDA adalah sebuah robot yang berfungsi sebagai “Gift Idea Assistant” yang akan mempermudah kamu memenuhi kebutuhan untuk memilih kado yang tepat.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-56" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(56)">
                        <div id="x-56" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apa saja yang bisa GIDA lakukan?</div><i id="faq-i-56" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq56" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">GIdA akan membantu kamu memilih kado yang tepat, sesuai dengan personality seseorang yang ingin kamu berikan kado dengan budget yang sudah kamu sediakan. GIdA juga menyediakan jasa wrapping (bungkus kado) dan kartu ucapan yang dapat kamu pilih di website kami sesuai persediaan. Agar moment-moment istimewa mu tidak terlewatkan, silahkan isi GIdA Calendar Event agar GIdA bisa mengingatkan selebrasi tanggal-tanggal spesial mu disetiap bulannya.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-57" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(57)">
                        <div id="x-57" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apakah saya bisa bertanya dengan GIdA atau harus lewat CS Kadoqu.com?</div><i id="faq-i-57" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq57" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Apabila kamu ingin bertanya tentang : (apa2 aja yang bisa dijawab sama GIdA) kamu bisa bertanya dengan GIdA langsung. Apabila kamu ingin bertanya diluar lingkup pertanyaan tersebut, hubungi CS Kadoqu.com +62 811-2181-600 (WA) untuk mengetahui info lebih lanjut.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="faq-58" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(58)">
                        <div id="x-58" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Apabila GIdA tidak merespons pertanyaan saya dengan benar. Apakah saya harus menghubungi CS Kadoqu.com?</div><i id="faq-i-58" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                        <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-12 nopadding">
                        <div style="display: none;width: 100%;"  id="collapseFaq58" class="its-collapse">
                            <p style="word-wrap: break-word;line-height: 18px;">Untuk saat ini, kemampuan GIdA belum ditahap sempurna. Sehingga memungkinkan GIdA tidak bisa menjawab pertanyaan mu dengan benar. Silahkan hubungi CS Kadoqu.com +62 811-2181-600 (WA) untuk mengetahui info lebih lanjut.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div id="kebijakan-pengembalian" class="accordion-ke-9" style="display: none;">
        <div class="row">
            <div class="col-md-12">
                <div class="title-accordion-dekstop" style="margin-left: 1%;">
                    <div class="col-md-12">
                        <div style="display: flex;width: 100%;">
                            <div class="faq-title">Pengajuan Pengembalian Barang</div>
                        </div>
                    </div>
                    <div class="col-md-12" style="margin-top: 10px">
                        <div style="display: flex;width: 100%;">
                            <p>Silahkan isi form dibawah ini sesuai dengan data diri akun customer untuk mengajukan pengembalian barang yang telah di terima</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-accordion-mobile">
            <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
                <table>
                    <thead>
                        <col width="50">
                        <tr>
                            <th style="font-size: 25px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                            <th>
                                <div class="faq-title" style="margin-top: 13px;font-size: 20px;margin-left: 10px;">Pengajuan Pengembalian Barang</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div style="padding-left: 10%;padding-right: 10%">
            <div class="row" style="margin-top: 70px;    font-family: arial;">
                <form>
                    <span style="display: block; padding-top: 10px; font-size: 20px; padding-bottom: 10px;">
                        Nama
                    </span>
                    <input type="text" class="simple-field pengembalian-form"  required style="background: #F9F9F9;margin-bottom: 10px !important">
                    <div class="row">
                        <div class="col-md-6 p-2">
                            <span style="display: block; padding-top: 10px; font-size: 20px; padding-bottom: 10px;">
                                Email
                            </span>
                            <input class="simple-field pengembalian-form" type="email" style="margin-bottom: 10px !important"/>
                        </div>
                        <div class="col-md-6 p-2">
                            <span style="display: block; padding-top: 10px; font-size: 20px; padding-bottom: 10px;">
                                No Handphone
                            </span>
                            <input class="simple-field pengembalian-form" type="number" style="margin-bottom: 10px !important"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <span style="display: block; padding-top: 10px; font-size: 20px; padding-bottom: 10px;">
                                No. Order
                            </span>
                            <input class="simple-field pengembalian-form" type="number" style="margin-bottom: 10px !important"/>
                        </div>
                        <div class="col-md-6">
                            <span style="display: block; padding-top: 10px; font-size: 20px; padding-bottom: 10px;">
                                No. Resi
                            </span>
                            <input class="simple-field pengembalian-form" type="number" style="margin-bottom: 10px !important"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <span style="display: block; padding-top: 10px; font-size: 20px; padding-bottom: 10px;">
                                Jenis Keluhan
                            </span>
                            <div class="simple-drop-down simple-field size-1" style="background: #F9F9F9;">
                                <select required>
                                    <option>Pilih Salah Satu</option>
                                    <option>-</option>
                                    <option>-</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <span style="display: block; padding-top: 10px; font-size: 20px; padding-bottom: 10px;">
                                Pilih Solusi
                            </span>
                            <div class="simple-drop-down simple-field size-1" style="background: #F9F9F9;">
                                <select required>
                                    <option>Pilih Salah Satu</option>
                                    <option>-</option>
                                    <option>-</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <span style="display: block; padding-top: 10px; font-size: 20px; padding-bottom: 10px;">
                                Jenis Keluhan
                            </span>
                            <input type="text" class="input-konfirmasi-pembayaran" id="disini" style="background: #F9F9F9 !important;width: 90%" disabled>
                            <div style="width: 30px;height: 30px;background: #01998d;float: right;cursor: pointer">
                                <i class="fa fa-angle-up" style="color: white;font-size: 30px;margin-left: 6px;"></i>
                                <input type="file" name="file" id="fileInphut" class="input-pengajuan" onchange="test()"/>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;width: 100%;margin-top: 50px;justify-content: center;">
                       <div class="row">
                           <div class="col-md-6">
                            <button class="button style-7 button-vocer button-konfirmasi-pembayaran" type="submit">Proses Pengajuan
                            </button>
                        </div>
                        <div class="col-md-6">
                            <a class="button style-7 button-vocer button-konfirmasi-pembayaran">Kontak CS
                            </a>
                        </div>
                    </div>
                </div>
            </form> 
        </div>
    </div>
</div>
<div id="cara-pembelian" class="accordion-ke-10" style="display: none;">
    <div class="row">
        <div class="col-md-12">
            <div class="title-accordion-dekstop" style="margin-left: 1%;">
                <div class="col-xs-1">
                    <div style="display: flex;width: 100%;height: 100px;justify-content: center;">
                        <img src="asset/faq/icon_faqstore.png" class="rounded mx-auto d-block" style="width: 100px;">
                    </div>
                </div>
                <div class="col-xs-11" style="height: 100px;">
                    <div style="display: flex;width: 100%;height: 100px;">
                        <div class="faq-title" style="margin-top: 0;padding:15px;">Cara Pembelian</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="title-accordion-mobile">
        <div class="col-xs-12" style="height: 50px;background: #CBEAE5;position: absolute;right: 0;">
            <table>
                <thead>
                    <col width="50">
                    <tr>
                        <th style="font-size: 30px;text-align: right;"><i class="fa fa-angle-left"></i></th>
                        <th>
                            <div class="faq-title" style="margin-top: 13px;font-size: 25px;margin-left: 10px;">Cara Pembelian</div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <div style="padding-left: 10%;padding-right: 10%">
        <div class="row" style="margin-top: 70px;font-family: arial;">
            <div>
                <div id="faq-100" class="col-md-12 nopadding" style="cursor: pointer;margin-top: 10px;" onclick="buka(100)">
                    <div id="x-100" class="col-md-12 x-title" style="padding-right:30px;padding-left:0px;">Cara Pembelian Barang</div><i id="faq-i-100" style="font-size: 20px;margin-top: 5px;" class="faq-i fa fa-angle-down icon-faq-item"></i>
                    <hr class="faq-hr" style="width: 100%;margin-top: 10px;">
                </div>
                <div class="clear"></div>
                <div class="col-md-12 nopadding">
                    <div style="display: none;width: 100%;"  id="collapseFaq100" class="its-collapse">
                        <p style="word-wrap: break-word;line-height: 18px;">KADOQU memberikan kemudahan kepada Anda dalam berbelanja di web KADOQU. Hanya dengan 8 langkah saja, Anda sudah dapat membeli barang yang Anda inginkan dengan langkah sebagai berikut:</p>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            1. Pilih Barang<br>Pilih barang favorit yang Anda inginkan.
                        </div>
                        <br>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            2. Periksa Informasi Barang<br>Periksa informasi barang yang tersedia (deskripsi, ukuran, warna, dan ketersediaan barang). Pastikan barang yang Anda pilih sesuai dengan yang Anda inginkan, tekan tombol Beli untuk memasukkan barang tersebut ke dalam keranjang belanja Anda, kemudian tekan tombol View Cart &amp; Checkout melihat dan memproses keranjang belanja Anda atau Not Now untuk melanjutkan belanja.
                        </div>
                        <br>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            3. Konfirmasi Keranjang Belanja<br>Periksa kembali barang yang Anda pesan. Jika sudah sesuai, tekan tombol Lanjutkan ke checkout untuk mulai memproses keranjang belanja Anda.
                        </div>
                        <br>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            4. Isi Data Diri<br>Pilih metode Checkout yang Anda inginkan disertai dengan menekan tombol Lanjutkan:
                        </div>
                        <br>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            <ul style="list-style: circle;margin-left: 25px;line-height: 20px;">
                                <li>Checkout sebagai tamu -&gt; Memproses pesanan tanpa membuat akun di web Kadoqu.</li>
                                <li>Daftar -&gt; Memproses pesanan dengan membuat akun di web Kadoqu, login untuk pengecekan riwayat dan status pesanan Anda. Kemudian masukkan informasi yang dibutuhkan dengan benar dan lengkap.</li>
                            </ul>
                        </div>
                        <br>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            5. Pilih Metode Pengiriman<br>Pilih metode pengiriman yang Anda inginkan. Informasi lebih lanjut mengenai Metode Pengiriman silakan klik di sini.
                        </div>
                        <br>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            6. Pilih Metode Pembayaran<br>Pilih metode pembayaran yang Anda inginkan. Informasi lebih lanjut mengenai Metode Pembayaran silakan klik di sini.
                        </div>
                        <br>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            7. Tempatkan Pesanan<br>Periksa kembali daftar barang yang Anda pesan (beserta biaya ongkos kirim). Jika sudah sesuai, tekan tombol Penempatan pesanan untuk menyelesaikan keranjang belanja / pesanan Anda.
                        </div>
                        <br>
                        <div style="display: inline-flex;line-height: 20px;margin-left: 20px;">
                            8. Konfirmasi Pesanan<br>Catat nomor pesanan Anda. Konfirmasi pesanan akan dikirimkan juga ke Anda melalui e-Mail dan SMS.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>


</div>
@section('scripts')
<script type="text/javascript">
    //get url 
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    var id      = getUrlVars()['openId'];

    function test() {
        var input = $('#fileInphut').val();
        $('#disini').val(input);    
    }

    //Menampilkan detail grid yang dipilih
    let showAccordions = (arg) => {
        for (var i = 1; i <= 9; i++) {
            $(`.accordion-ke-${i}`).fadeOut();
            $(`.accordion-ke-${id}`).fadeOut();
        }
        $(`.accordion-ke-${arg}`).fadeIn('slow/400/fast');
    };

    //selection collapse by id
    if (id == undefined) {
        showAccordions(1);
    } else {
        showAccordions(id);
    }

    function buka (arg) {
            /*
        * Otomatis Menutup collapse yang sudah terbuka jika tidak sama seperti tab collapse 
        * $(`#collapseFaq${arg} yang di tekan....
        *
        * Jika ingin dirubah usahakan waktu tutup lebih cepat dari pada waktu buka
        * Contoh : conf buka -> slow/400/fast, maka conf tutup -> slow/200/fast
        *
        * TTD Programmer Bertopeng - Achi (*＞ｖ＜)ゞ*゜+
        */
        if(!$(`#collapseFaq${arg}`).hasClass('collapse-open')){
            $(`.collapse-open`).slideToggle('slow/200/fast', function(a){
                $(`.its-collapse`).removeClass("collapse-open");
                $(`.x-title`).css({"color": "black"});
                $(`.x-title`).addClass('faq-active');
                $(`.x-title`).removeClass('faq-normal');
                $(`.faq-i`).attr('class','faq-i fa fa-angle-down icon-faq-item');
            }) 
        }

        $(`#collapseFaq${arg}`).slideToggle('slow/200/fast', function(a){    
            if ($(`#x-${arg}`).hasClass('faq-normal')) {
                $(`#x-${arg}`).css({"color": "black"});
                $(`#x-${arg}`).addClass('faq-active');
                $(`#x-${arg}`).removeClass('faq-normal');
                $(`#collapseFaq${arg}`).removeClass('collapse-open');
                $(`#faq-i-${arg}`).attr('class','faq-i fa fa-angle-down icon-faq-item');
            } else {
                $(`#x-${arg}`).css({"color": "#248C82"});
                $(`#x-${arg}`).removeClass('faq-active');
                $(`#x-${arg}`).addClass('faq-normal');
                $(`#collapseFaq${arg}`).addClass('collapse-open');
                $(`#faq-i-${arg}`).attr('class','faq-i fa fa-angle-left icon-faq-item');
            }
        }) ;
    }
</script>
@endsection
@include('Parent.footer')