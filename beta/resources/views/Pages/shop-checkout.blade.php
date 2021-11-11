@include('Parent.header')
<input type="hidden" id="totalberatbarang">
<input type="hidden" id="jumlah-sub-total">
<div id="content-block">
    <div class="content-push" style="padding-left: 10%;padding-right: 10%;">
    <div class="information-blocks" style="margin-top: 20px;border-bottom: 1px #e6e6e6 solid;margin-bottom: 40px; padding-bottom: 20px;">
        <h2 class="cart-column-title hide-border cekout">Checkout</h2>
        <div class="row" style=" margin-right: 0px; margin-left: 0px;">
            <div class="col-md-6 col-sm-12 col-xs-12 information-entry">
                <div class="row">
                    <div class="col-md-2 col-sm-2 col-xs-12 tab-wrap-1">
                        <div class="tab">
                           <!--  <button class="btn-sender col-sm-12 col-xs-3 tablinks active nopadding">
                                <img style="max-width: 100%" src="asset/cart/icon_sender.jpg">
                                <p>sender</p>
                            </button> -->
                            <div class="form-blancer-checkout">
                                <button id="reciver-btn" class="btn-reciver col-sm-12 col-xs-3 tablinks active nopadding">
                                <img style="max-width: 100%" src="asset/cart/icon_reciever.jpg">
                                <p>Reciver</p>
                            </button>
                            <button id="deliver-btn" class="btn-deliver col-sm-12 col-xs-3 tablinks nopadding">
                                <img style="max-width: 100%" src="asset/cart/icon_delivery.jpg">
                                <p>Deliver</p>
                            </button>
                            <button id="payment-btn" class="btn-payment col-sm-12 col-xs-3 tablinks nopadding">
                                <img style="max-width: 100%" src="asset/cart/icon_payment.jpg">
                                <p>Payment</p>
                            </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 col-sm-10 col-xs-12">
                       <!--  <div id="sender" class="tabcontent" style=" ">

                            <h2 class="cart-column-title hide-border cekout-sub">Data Pengirim</h2>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Name Depan<span>*</span></label>
                                    <input class="simple-field" type="text" placeholder="Masukan Nama Depan Pengirim" required value="" />
                                    <label>Email<span>*</span></label>
                                    <input class="simple-field" type="email" placeholder="Masukan Alamat Email Pengirim" required value="" />
                                    <label>Alamat Pengirim<span>*</span></label>
                                    <input class="simple-field" type="text" placeholder="Masukan Alamat pengirim" required value="" />
                                </div>
                                <div class="col-md-6">
                                    <label>Name Belakang</label>
                                    <input class="simple-field" type="text" placeholder="Masukan Nama Depan Pengirim" required value="" />
                                </div>
                                <div class="clear"></div>

                                <div class="col-md-6" style="padding-top:25px">
                                    <label>Telepon<span>*</span></label>
                                    <input class="simple-field" type="text" placeholder="Masukan Nomer Telepon Pengirim" required value="" />
                                    <label>Negara</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding-top:25px">
                                    <label>Kode Pos</label>
                                    <input class="simple-field" type="text" placeholder="Masukan Kode Pos Pengirim" required value="" />
                                </div>
                                <div class="clear"></div>

                                <div class="col-md-6" style="padding-top:25px">
                                    <label>Provinsi</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                    <label>Kecamatan</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding-top:25px">
                                    <label>Kab Kota</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div id="to-reciver" class="button style-7 col-md-5 col-sm-6 col-xs-12" style="display: block; margin-top: 10px; float: right;">Selanjutnya
                            </div>

                        </div> -->
                        <div id="reciver" class="tabcontent" style=" ">
                            <h2 class="cart-column-title hide-border cekout-sub" style="padding-bottom: 0px;">Data Penerima</h2>
                            <!-- <label class="checkbox-entry">
                                <input type="checkbox" /> <span class="check"></span> Gunakan Data Pengirim
                            </label> -->
                            <div class="row">
                                <form id="kesatu">
                                <div class="col-md-6">
                                    <label>Name<span>*</span></label>
                                    <input class="simple-field" type="text" name="nama_penerima" id="nama_penerima" placeholder="Masukan Penerima" title="Nama tidak boleh kosong" required/>
                                </div>
                                <div class="col-md-6">
                                    <label>Telepon<span>*</span></label>
                                    <input class="simple-field" type="tel" pattern="^\d{>10}$" id="telepon-penerima" placeholder="Masukan Nomer Telepon Penerima" required/>
                                    <div id="telepon-validation" style="position: absolute;margin-top: -20px;color: red;"></div>
                                </div>
                                <div class="col-md-12">
                                    <div id="penerima-validation" style="position: absolute;margin-top: -20px;color: red;"></div>
                                    <label>Email<span>*</span></label>
                                    <input class="simple-field" type="email" id="email-penerima" placeholder="Masukan Alamat Email Penerima" required/>
                                    <div id="email-validation" style="position: absolute;margin-top: -20px;color: red;"></div>
                                    <label>Alamat Penerima<span>*</span></label>
                                    <input class="simple-field" type="text" id="alamat_penerima" placeholder="Masukan Alamat Penerima" required/>
                                    <div id="alamat-validation" style="position: absolute;margin-top: -20px;color: red;"></div>
                                </div>
                                <div class="col-md-6">
                                    <label>Provinsi</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select id="provinsi" name="provinsi" required>
                                            <option value="">Pilih Provinsi</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Kab Kota</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select id="kab-kota" name="kab-kota" required>
                                            <option value="">Pilih Kota/Kab</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Kecamatan</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select id="kecamatan" name="kecamatan" required>
                                            <option value="">Pilih Kecamatan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Kode Pos</label>
                                    <input class="simple-field" id="kode-pos" type="number" placeholder="Masukan Kode Pos" required/>
                                </div>

                                <!-- <div class="col-md-6">
                                    <label>Name Belakang</label>
                                    <input class="simple-field" type="text" placeholder="Masukan Nama Depan Penerima" required value="" />
                                </div> -->
                                <!-- <div class="clear"></div>

                                <div class="col-md-6" style="padding-top:25px">
                                    <label>Telepon<span>*</span></label>
                                    <input class="simple-field" type="text" placeholder="Masukan Nomer Telepon Penerima" required value="" />
                                    <label>Negara</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding-top:25px">
                                    <label>Kode Pos</label>
                                    <input class="simple-field" type="text" placeholder="Masukan Kode Pos Penerima" required value="" />
                                </div>
                                <div class="clear"></div>

                                <div class="col-md-6" style="padding-top:25px">
                                    <label>Provinsi</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                    <label>Kecamatan</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding-top:25px">
                                    <label>Kab Kota</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div> -->
                            </div>
                            <div class="button style-7 col-md-6 col-md-5 col-sm-6 col-xs-12" style="display: block; margin-top: 10px; float: right;"><input type="submit"> Selanjutnya
                            </div>
                            </form>

                        </div>
                        <div id="deliver" class="tabcontent" style=" display: none;">
                            <form id="jenis-pengiriman">
                            <h2 class="cart-column-title hide-border cekout-sub">Metode Pengiriman</h2>
                            <label class="checkbox-entry radio">
                                <input type="radio" name="metode" checked value="Kirim Ke Alamat Penerima" /> <span class="check"></span> Kirim Ke Alamat Penerima
                            </label>
                            <label class="checkbox-entry radio">
                                <input type="radio" name="metode" value="Ambil Di Warehose Kadoqu.com" /> <span class="check"></span> Ambil Di Warehose Kadoqu.com
                            </label>
                            <label class="checkbox-entry radio">
                                <!-- <input type="radio" name="metode" /> <span class="check"></span> Kirim Melalui Kirir -->
                                <div class="clear"></div>
                                <div class="simple-drop-down simple-field size-1" style="margin-left: 25px; width: 250px;">
                                    <select id="selctor" name="selector" required>
                                        <option value="">Pilih Kurir</option>
                                        <option value="jne">JNE</option>
                                    </select>
                                </div>
                                <div class="clear"></div>
                                <div class="simple-drop-down simple-field size-1" style="margin-left: 25px; width: 250px; display: none;" id="detail-delivery">
                                    <select id="biaya-kurir" name="biaya-kurir" required>
                                        <option value="">Pilih Service</option>
                                    </select>
                                </div>
                                <div class="clear"></div>
                            </label>
                            <div id="kurir-validation" style="position: absolute;margin-top: -2%;color: red;margin-left: 8%;"></div>
                            <div class="button style-7 col-md-5 col-sm-6 col-xs-12" style="display: block; margin-top: 10px; float: right;"><input type="submit">Selanjutnya
                            </div>
                            </form>

                        </div>
                        <div id="payment" class="tabcontent" style=" display: none;">
                            <h2 class="cart-column-title hide-border cekout-sub">Metode Pembayaran</h2>
                            <div style="overflow-x:auto;">
                                <table class="payment">
                                <tr>
                                    <td>
                                        <label class="checkbox-entry radio">
                                            <input type="radio" name="bank" value="Bank Transfer" checked/> <span class="check"></span>
                                        </label>
                                    </td>
                                    <td>Bank Transfer</td>
                                    <td>
                                        <img class="logo-bank" src="asset/payment/BCA-bank-logo-transparent-1024x318.png" alt="" />
                                    </td>
                                    <td>
                                        <img class="logo-bank" src="asset/payment/Bank_Mandiri_logo.svg.png" alt="" />
                                    </td>
                                    <td>
                                        <img class="logo-bank" src="asset/payment/Logo%20Bank%20BNI%20PNG.png" alt="" />
                                    </td>
                                </tr>
                            </table>
                            </div>
                            <a href="#hasil-rincian" title="">
                            <div onclick="checkAgain()" id="to-rincian" class="button style-7 col-md-5 col-sm-6 col-xs-12" style="display: block; margin-top: 10px; float: right;"> Rincikan Pesanan
                            </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5 col-sm-12 col-xs-12 information-entry bg-green-1" style="float: right ;">
                <h3 class="cart-column-title judul-cart-kanan">Rincian Barang</h3>
                <div class="traditional-cart-entry style-1 isi-cart-kanan" id="cart-list">
                    
                </div>
                <div class="row">
                    <div class="col-md-3" style="float: right; text-align: left">
                        <h5 class="subtotal" id="sub-total"></h5>
                        <h5 class="Potongan">-</h5>
                        <h5 class="ongkir" id="total-ongkos-kirim">-</h5>
                        <h5 class="Total" id="total"></h5>

                    </div>
                    <div class="col-md-5" style="float: right ;text-align: right">
                        <h5 class="subtotal">Subtotal</h5>
                        <h5 class="Potongan">Potongan</h5>
                        <h5 class="ongkir">Ongkos Kirim</h5>
                        <h5 class="Total">Total Keseluruhan</h5>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div id="hasil-rincian" class="row">
        <div class="rincian-hasil-detail">
            <div class="information-blocks content-text-widget-container" style="padding: 0;border-top: 0px ;">
                <div class="row row-flex nopadding">
                    <div class="content-text-widget nopadding information-entry col-sm-4">

                        <div class="clear"></div>
                        <div class="content">
                            <h3 class="title rincian-title">Penerima</h3>
                            <div class="row">
                                <img class="col-xs-4" src="asset/cart/icon_reciever.jpg">
                                <div class="col-xs-8">
                                    <div class="description" id="show-penerima">Nama,email</div>
                                    <div class="description" id="show-alamat">Alamat,telepon,kode</div>
                                    <!-- <div class="description">Negara,Provinsi,Kota,Kecamatan</div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-text-widget nopadding information-entry col-sm-4" style="padding: 30px 70px 30px 30px;border-right: 1px #009a8e solid;">
                        <div class="content">
                            <h3 class="title rincian-title">Metode Pengiriman</h3>
                            <div class="row">
                                <img class="col-xs-4" src="asset/cart/icon_delivery.jpg">
                                <div class="col-xs-8">
                                    <div class="description" id="show-kurir"><!-- Kurir Pengiriman --></div>
                                    <div class="description" id="show-biaya"><!-- Biaya Rp. 10.000 --></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-text-widget nopadding information-entry col-sm-4">
                        <div class="content">
                            <h3 class="title rincian-title">Metode Pembayaran</h3>
                            <div class="row">
                                <img class="col-xs-4" src="asset/cart/icon_payment.jpg">
                                <div class="col-xs-8">
                                    <div class="description" id="show-metode">Bank Transfer</div>
                                    <div class="description" id="total-description"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="proses-delay" class="button style-7 col-md-2 open-subscribe" style="margin-bottom: 20px; display: block; margin-top: 10px; float: right;" onclick="Checkout()">Proses Pesanan
        </div>
    </div>
</div>
</div>

<!-- Modals -->
<div id="subscribe-popup" class="overlay-popup">
    <div class="overflow">
        <div class="table-view">
            <div class="cell-view">
                <div class="close-layer"></div>
                <div class="popup-container popup-relative">
                    <img class="popup-background" src="asset/cart/banner_done%201.jpg" alt="" />
                    <p class="col-md-6 col-xs-8">Pesanan Kamu Sudah Diproses!</p>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
<script type="text/javascript">
    $('#reciver-btn').on('click', function() {
        if ($(this).hasClass('active')) {
            $('#reciver').fadeIn('slow');
            $('#payment').fadeOut('fast');  
            $('#deliver').fadeOut('fast');
        }
    });
    $('#deliver-btn').on('click', function() {
        if ($(this).hasClass('active')) {
            $('#reciver').fadeOut('fast');
            $('#payment').fadeOut('fast');  
            $('#deliver').fadeIn('slow');
        }
    });
    $('#payment-btn').on('click', function() {
        if ($(this).hasClass('active')) {
            $('#reciver').fadeOut('fast');
            $('#payment').fadeIn('slow');  
            $('#deliver').fadeOut('fast');
        }
    });
     
 $('#kesatu').on('submit', function(e) {
    e.preventDefault();
    if($('#nama_penerima').valid()){
        $('#reciver').fadeOut('slow', function() {
            $('#deliver').fadeIn('slow');
            $('.btn-deliver').addClass('active');
        });
    }
 });

 $('#jenis-pengiriman').on('submit', function(e) {
    e.preventDefault();
    if($('#biaya-kurir').valid()){
        $('#deliver').fadeOut('slow', function() {
            $('#payment').fadeIn('slow');
            $('.btn-payment').addClass('active');
        });
    }
 });

    function getProvinsi() {
        $.ajax({
            url: 'https://admin.kadoqu.com/api/province',
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (data) {
                let listdata;
                $.each(data.rajaongkir.results, function(index, el) {
                    listdata = listdata + `<option value="${el.province_id}" >${el.province}</option>`;
                });
                $('#provinsi').append(listdata);
            }
        });
        getKota();
    } getProvinsi();

    //Get Kota
    function getKota() {
    $("#provinsi").on('change',function(){
    getValueKota=$(this).val();
    let listKota;
    
    $.ajax({
        url: 'https://admin.kadoqu.com/api/city?province='+getValueKota,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
            $.each(data.rajaongkir.results, function(index, el) {
                listKota = listKota + `<option value="${el.city_id}">${el.type} ${el.city_name}</option>`;
            });
            $('#kab-kota').html(listKota);
            }
        });
    });
    getKecamatan();
    }

    //Get Kecamatam
    function getKecamatan() {
    $("#kab-kota").on('change',function(){
    getValueKec=$(this).val();
    let listKecamatan;
  
    $.ajax({
        url: 'https://admin.kadoqu.com/api/subdistrict?city='+getValueKec,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
            $.each(data.rajaongkir.results, function(index, el) {
                listKecamatan = listKecamatan + `<option value="${el.subdistrict_id}">${el.subdistrict_name}</option>`;
            });
            $('#kecamatan').html(listKecamatan);
            }
        });
    });
    }
    //Get id Kecamatam
    function getKecId() {
    $("#kab-kota").on('change',function(){
    getKecIde=$(this).val();
    let listKecamatan;
    $('#kecamatan').html("");
    $.ajax({
        url: 'https://admin.kadoqu.com/api/subdistrict?city='+getKecIde,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
            $.each(data.rajaongkir.results, function(index, el) {
                listKecamatan = listKecamatan + `<option value="${el.subdistrict_id}">${el.subdistrict_name}</option>`;
            });
            $('#kecamatan').html(listKecamatan);
            }
        });
    });
    }


    //Get Ongkir
    $("#selctor").on('change',function(){
    testselectorr=$('#selctor').val();
    $('#total-ongkos-kirim').html("");
        var weight = $('#totalberatbarang').val();
        if (weight < 1000) {
            weight = 1000;
        }
        console.log(weight)
        var destination = $('#kecamatan').val();
        var kurir =  $('select[name=selector]').val();
        $.ajax({
            url: 'https://admin.kadoqu.com/api/cost',
            type: 'POST',
            dataType: 'json',
            data: {
                origin: 364, //->Kecamatan Sukajadi
                originType: 'subdistrict',
                destination: destination,
                destinationType : 'subdistrict',
                weight: weight,
                courier: kurir
            },
        })
        .done(function(data) {
            let listdata;
            let biyayakirim;
            let totaljumlah = $('#jumlah-sub-total').val();
            let totalkeseluruhan = 0;
            $.each(data.rajaongkir.results, function(index, el) {
                $.each(el.costs, function(index, value) {
                    $.each(value.cost, function(index, app) {
                        console.log(app.value)
                        listdata = listdata + `<option value="${app.value}">${value.service}</option>`;
                    });
                });
            });
            $('#detail-delivery').show('slow/400/fast', function (){
                $('#biaya-kurir').append(listdata);
                 $("#biaya-kurir").on('change',function(){
                    biyayakirim=$('#biaya-kurir').val();
                    totalkeseluruhan = parseInt(totaljumlah) +parseInt(biyayakirim);
                    $('#total').html(convertToRupiah(totalkeseluruhan.toString()));
                    $('#total-description').html(convertToRupiah(totalkeseluruhan.toString()))
                    $('#total-ongkos-kirim').html(convertToRupiah(biyayakirim.toString()));
                    $('#show-biaya').html(convertToRupiah(biyayakirim));
                 });
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });

    let guest = Cookies.getJSON('guest');
    let user  = Cookies.get('token');
    function cekCookies() {
        if (user != undefined) {
            userCookies(user);
        } else {
            cartGuest();
        }
    } cekCookies();
    
    //Guest cart
    function cartGuest(){
        let listdata= '';
        var totaljumlah = 0;
        $('#cart-list').html();
        $.each(guest, function(index, el) {
            let jumlah = parseInt(el.jumlah);
            let harga = parseInt(el.hargaProduk);
            let total = jumlah * harga;
            totaljumlah+=total;
            listdata = listdata + `
            <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                <div class="col-md-3" style="text-align: center"><img style="width: 100%;" src="https://admin.kadoqu.com/produk/${el.fotoProduk}"></div>
                <div class="col-md-6 col-xs-8">
                    <h5 class="detail-barang">${el.namaProduk}</h5>
                    <h5 class="detail-barang">${convertToRupiah(el.hargaProduk)}</h5>
                    <div class="quantity-selector detail-info-entry detail-barang" style="">
                        <div class="entry number edited" id="tampilkan">${el.jumlah}</div>
                    </div>
                </div>
                <div class="col-md-3 col-xs-4" style="text-align: right">
                    <h5 class="rincian-rp">${convertToRupiah(total.toString())}</h5>
                </div>
            </div>
            `;
        });
        $('#cart-list').html(listdata);
        $('#jumlah-sub-total').val(totaljumlah);
        $('#sub-total').html(convertToRupiah(totaljumlah.toString()));
        $('#cart-list-1').hide();
        $('#cart-list-2').hide();
        $('#cart-list-3').hide();

    }

     function userCookies (user) {
        $.ajax({
            url: 'https://admin.kadoqu.com/api/details',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            type: 'POST',
            crossDomain: true,
            success: function(data, status) {
                let listdata= '';
                var totaljumlah = 0;
                var berat = 0;
                var totalberat=0;
                $.each(data.success.cart, function(index, el) {
                    console.log(el)
                    var jumlahbarang= parseInt(el.jumlah);
                    var beratbarang= parseInt(el.product.weight);
                    totalberat = jumlahbarang * beratbarang;
                    let jumlah = el.jumlah;
                    let harga = parseInt(el.product.hargaJual);
                    let total = jumlah * harga;
                    totaljumlah+=total;
                    listdata = listdata + `
                    <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                        <div class="col-md-3" style="text-align: center"><img style="width: 100%;" src="https://admin.kadoqu.com/produk/${el.product.images[0].gambar}"></div>
                        <div class="col-md-6 col-xs-8">
                            <h5 class="detail-barang">${el.product.namaProduk}</h5>
                            <h5 class="detail-barang">${convertToRupiah(el.product.hargaJual)}</h5>
                            <div class="quantity-selector detail-info-entry detail-barang" style="">
                                <div class="entry number" id="tampil-${index}">${el.jumlah}</div>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-4" style="text-align: right">
                            <h5 class="rincian-rp">${convertToRupiah(total.toString())}</h5>
                        </div>
                    </div>
                    `;
                });
                $('#jumlah-sub-total').val(totaljumlah);
                $('#totalberatbarang').val(totalberat);
                $('#cart-list').append(listdata);
                $('#sub-total').html(convertToRupiah(totaljumlah.toString()));
                $('#cart-list-1').hide();
                $('#cart-list-2').hide();
                $('#cart-list-3').hide();
                $('#cart-list').on('click','.number-plus',function(){
                    var currentValue = $(`#tampil-${$(this).data('indeks')}`).html();
                    $(`#tampil-${$(this).data('indeks')}`).html(parseInt(currentValue) + 1);
                });
                $('#cart-list').on('click','.number-minus',function(){
                    var currentValue = $(`#tampil-${$(this).data('indeks')}`).html();
                    $(`#tampil-${$(this).data('indeks')}`).html(parseInt(currentValue) - 1);
                });
            }
        });
        
     }

     $('input[type=radio][name=metode]').change(function() {
        if ($(this).val() == 'Ambil Di Warehose Kadoqu.com') {
            var subtotal = $('#sub-total').html();
            $('#total').html(subtotal);
            $('select[name=selector]').attr('disabled', 'disabled').css('cursor','not-allowed');
            $('#biaya-kurir').append('<option value="0">Tidak ada ongkir</option>');
            $('#biaya-kurir').val('0');
            $('#detail-delivery').hide('slow/400/fast');
            $('#selctor').append('<option value="Ambil di tempat">Ambil Di Tempat</option>');
            $('#selctor').val('Ambil di tempat');
            $('#total-ongkos-kirim').html("-");
        } else {
            $('#total').html("");
            $('select[name=selector]').removeAttr('disabled', 'disabled').css('cursor','pointer');
            $('#biaya-kurir').html("");
            $('#selctor').html("");
            $('#selctor').append(`<option value="">Pilih Kurir</option> <option value="jne">JNE</option>`);
        }
     });

     function testval(){
       var prop = $("#provinsi option:selected").html();
       var kabkot = $('#kab-kota option:selected').html();
       var kec = $('#kecamatan option:selected').html();
        alert(prop +' '+kabkot+' '+kec)
     }
    //Seleksi cekout user atau guest
    function Checkout () {
        var nama_penerima = $('#nama_penerima').val();
        var metode_pengiriman = $("input[name='metode']:checked").val();
        var metode_pembayaran = $("input[name='bank']:checked").val();
        var biaya_pengiriman = parseInt($('#biaya-kurir').val());
        var kurir = $('select[name=selector]').val();
        var alamat_penerima = $('#alamat_penerima').val();
        var email_penerima = $('#email-penerima').val();
        var telepon_penerima = $('#telepon-penerima').val();
        var prop = $("#provinsi option:selected").html();
        var kabkot = $('#kab-kota option:selected').html();
        var kec = $('#kecamatan option:selected').html();
        var kode_pos = $('#kode-pos').val();

        if (metode_pengiriman == 'Ambil Di Warehose Kadoqu.com') {
            biaya_pengiriman = 0;
            let a = Cookies.get('token');
            if (a) {
                CheckoutProcess(a,metode_pengiriman,nama_penerima,metode_pembayaran,biaya_pengiriman,kurir,alamat_penerima,prop,kabkot,kec,kode_pos);
            } else {
                CheckoutProcessGuest(nama_penerima,metode_pengiriman,metode_pembayaran,biaya_pengiriman,kurir,alamat_penerima,email_penerima,telepon_penerima,prop,kabkot,kec,kode_pos);
            }
        } else {
            let a = Cookies.get('token');
            if (a) {
                CheckoutProcess(a,metode_pengiriman,nama_penerima,metode_pembayaran,biaya_pengiriman,kurir,alamat_penerima,prop,kabkot,kec,kode_pos);
            } else {
                CheckoutProcessGuest(nama_penerima,metode_pengiriman,metode_pembayaran,biaya_pengiriman,kurir,alamat_penerima,email_penerima,telepon_penerima,prop,kabkot,kec,kode_pos);
            }
        }
    }
    
    //Proccess  Checkout Untuk User
    function CheckoutProcess(a,metode_pengiriman,nama_penerima,metode_pembayaran,biaya_pengiriman,kurir,alamat_penerima,prop,kabkot,kec,kode_pos) {
        $.ajax({
            url: 'https://admin.kadoqu.com/api/checkout',
            type: 'POST',
            dataType: 'json',
            headers: {
                 'Authorization': `Bearer ${token}`,
            },
            data: {
                metode_pengiriman: metode_pengiriman,
                kurir: kurir,
                nama_penerima: nama_penerima,
                alamat_penerima: alamat_penerima+', Provinsi : '+prop+', Kab/Kota : '+kabkot+', Kecamatan : '+kec+' Kode Pos : '+kode_pos,
                biaya_pengiriman: biaya_pengiriman,
                metode_pembayaran: metode_pembayaran,

            },
        })
        .done(function(data) {
            console.log("success checkout");
            id = data.success.order_no;
            setTimeout("location.href = 'shop-checkout-success?order_no='+id+'';", 500);
         })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }

    
    //Proccess  Checkout Untuk Guest
    function CheckoutProcessGuest(nama_penerima,metode_pengiriman,metode_pembayaran,biaya_pengiriman,kurir,alamat_penerima,email_penerima,telepon_penerima,prop,kabkot,kec,kode_pos) { 
        var CookiesGuestCheck = Cookies.getJSON('guest');
        console.log(CookiesGuestCheck);
        $.ajax({
            url: 'https://admin.kadoqu.com/api/checkoutguest',
            type: 'POST',
            dataType: 'json',
            data: {
                metode_pengiriman: metode_pengiriman,
                kurir: kurir,
                nama_penerima: nama_penerima,
                alamat_penerima: alamat_penerima+', Provinis : '+prop+', Kab/Kota : '+kabkot+', Kecamatan : '+kec+', Kode Pos : '+kode_pos,
                biaya_pengiriman: biaya_pengiriman,
                metode_pembayaran: metode_pembayaran,
                no_telp: telepon_penerima,
                email: email_penerima,
                cart: CookiesGuestCheck

            },
        })
        .done(function(data) {
            Cookies.remove('guest');
            console.log('success checkout');
            id = data.success.order_no;
            setTimeout("location.href = 'shop-checkout-success?order_no='+id+'';", 500);
        })
        .fail(function() {
            console.log("error");
        });
    }

    function checkAgain() {
           var nama = $('#nama_penerima').val();
           var alamat = $('#alamat_penerima').val();
           var email = $('#email-penerima').val();
           var telepon = $('#telepon-penerima').val();
           var e = document.getElementById("biaya-kurir");
           var strUser = e.options[e.selectedIndex].text;
           var kurir = $('select[name=selector]').val();
           var metode_pembayaran = $("input[name='bank']:checked").val();
           var provinsi = `<br>Provinis : ${$('#provinsi option:selected').html()}`;
           var kabkota = `<br>Kab/Kota : ${$('#kab-kota option:selected').html()}`;
           var kec = `<br>Kecamatan : ${$('#kecamatan option:selected').html()}`;
           var kode_pos = `<br>Kode Pos : ${$('#kode-pos').val()}`;
           var ongkir = $('#biaya-kurir').val();
           var total = $('#total').html();


           $('#show-penerima').text(nama+', '+email);
           $('#show-alamat').html(alamat+', '+provinsi+', '+kabkota+', '+kec+', '+kode_pos);
           $('#show-metode').text(metode_pembayaran);
           $('#show-kurir').text(kurir+' - '+strUser);
           $('#show-biaya').html(convertToRupiah(ongkir));
           $('#total-description').html(total);
    }

</script>
@endsection
@include('Parent.footer')