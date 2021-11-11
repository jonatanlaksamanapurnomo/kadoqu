@include('Parent.header')
<title>User Profile</title>
<div class="navigation-profil">
    <div id="menu-profil-web" class="row" style="margin: 0px">
        <table class="table" style="margin: 0px;table-layout: fixed">
            <tr class="hari text-center">
                <td class="menu-profil cen" onclick="javascript:location.href='user-profile'">
                    <a href="{{url('user-profile')}}" style="color: #fff;">
                        <i class="fa fa-user"></i> Profile
                    </a>
                </td>
                <td class="menu-profil cen" onclick="javascript:location.href='event-reminder'">
                    <a href="{{url('event-reminder')}}" style="color: #fff;">
                        <i class="fa fa-calendar"></i> Event Reminder
                    </a>
                </td>
                <!-- <td class="menu-profil cen" onclick="javascript:location.href='daftar-favorit'">
                    <a href="{{url('dafta-favorit')}}" style="color: #fff;">
                        <i class="fa fa-star"></i> Daftar Favorit
                    </a>
                </td> -->
                <td class="menu-profil cen active">
                        <i class="fa fa fa-archive"></i> Belanja Saya
                </td>
            </tr>
        </table>
    </div>
    <div id="menu-profil-mobile" class="row" style="margin: 0px">
        <div class="menu-profil active col-xs-12 "><i class="fa fa-user"></i> Profile</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-calendar"></i> Event Reminder</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-star"></i> Daftar Favorit</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-history "></i> Riwayat Belanja</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-archive "></i> Belanja Saya</div>
    </div>
</div>
<div class="content-push" style="padding-left: 10%;padding-right: 10%;font-family: arial">
<a href="#collapseStatusPembelian" data-toggle="collapse" aria-expanded="false" aria-controls="collapseStatusPembelian">
   <div>
        <h2 class="cart-column-title cekout-sub" style="border-top: 0px"><i class="fa fa-archive" style="padding:3% 0% 0% 3%"></i> Status Pembelian <i class="fa fa-angle-down fa-icon-riwayat"></i></h2>
   </div>
</a>
<div class="collapse show" id="collapseStatusPembelian">
  <!-- <div class="card card-body height">
    <div class="status-pembelian-card">
        <div>
            <div class="status-pembelian-title">
                Rincian Pesanan #12345
            </div>
            <div class="status-pembelian-title total-belanja">
                Total belanja: <div style="display: inline-table; color: red;">Rp. 2.000.000</div>
                <p class="p-date">26 Februari 2018 | 16.40 WIB</p>
            </div>
        </div>
    </div>
    <div id="listitem-index">
        <div class="lists-item">
            <div style="margin-left: 15px;padding-top: 15px;">
                <img src="asset/icon/icon_kado.png" style="width: 100%;max-width: 100px;">
                <p class="p-sub-judul">ina kukis lidah kucing (x2)</p>
                <p class="p-sub-judul harga-sub">Rp. 2.000.000</p>
                <p class="p-sub-judul harga-sub" style="margin-top: 120px; color: red;">Pesanan Dibatalkan</p>
            </div>
        </div>
    </div>
    <div class="button-riwayat-belanja-flex">
        <div class="riwayat-button">
            <a class="button style-7" href="javascript:void(0)" onclick="trackingStuff()">Lacak Pesanan</a>
            <a class="button style-7" href="javascript:void(0)" onclick="confirmPayment()">Konfirmasi Pembayaran</a>
            <a class="button style-7" href="{{url('faq')}}">Ajukan Pengembalian</a>
        </div>
    </div>
    <div class="pembatalan-flex">
        <div>
            <div class="title-pembatalan">
            <p class="p-1-riwayat">Pesanan di batalkan</p>
            <p class="p-2-riwayat">Pesanan di batalkan oleh pembeli</p>
            </div>
            <div class="fa-icon-pembatalan-blancer">
               <img src="{{asset('asset/icon/icon_proses8_pesanan batal.png')}}" class="image-bottom-pembatalan"> 
            </div>
        </div>        
    </div>
    <div class="button-riwayat-mobile">
        <a onclick="trackingStuff()" class="button style-7" style="width: 100%;" href="#">Lacak Pesanan</a>
        <div>
            <a class="button style-7" style="width: 50%;" href="#">Konfirmasi Pembayaran</a>
            <a class="button style-7" style="width: 48%;" href="{{url('faq')}}">Ajukan Pengembalian</a>
        </div>
    </div>
  </div> -->
</div>

<a href="#collapseRiwayatBelanja" data-toggle="collapse" aria-expanded="false" aria-controls="collapseRiwayatBelanja">
    <h2 class="cart-column-title cekout-sub" style="border-top: 0px"><i class="fa fa-history" style="padding:3% 0% 0% 3%"></i> Riwayat Belanja <i class="fa fa-angle-down fa-icon-riwayat"></i></h2>
</a>
<div class="collapse" id="collapseRiwayatBelanja">
  <div class="card card-body">
    <div class="row " style="margin: 0px" id="shopping-history">
         <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="row  riwayat" style="margin: 0px ;padding: 0px">
                <div style="width: 100%;padding: 10px">
                    <div style="font-weight: 700;font-size: 20px;">No. Pesanan</div>
                    <div style="padding-top: 3px;">Tanggal Order: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">Tanggal Selesai: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">penerima iChwan Ganteng</div>
                    <div>
                        <div style="display: flex;width: 100%;height: 120px;margin-top: 20px;">
                        <img src="{{asset('asset/icon/icon_kado.png')}}" style="width: 100%;max-width: 100px;">
                        <div style="margin-left: 10px;margin-top: 25px;">
                            <p style="font-size: 20px;">iChwan</p>    
                            <p style="font-size: 20px;font-weight: bold;margin-top: 10px;">Rp.50.000</p>
                            <p style="color: orange;font-size: 20px;font-weight: bold">Menunggu Konfirmasi</p>
                        </div>
                    </div>
                    <div style="display: flex;width: 100%;height: 120px;margin-top: 20px;">
                        <img src="{{asset('asset/icon/icon_kado.png')}}" style="width: 100%;max-width: 100px;">
                        <div style="margin-left: 10px;margin-top: 25px;">
                            <p style="font-size: 20px;">iChwan</p>    
                            <p style="font-size: 20px;font-weight: bold;margin-top: 10px;">Rp.50.000</p>
                            <p style="color: orange;font-size: 20px;font-weight: bold">Menunggu Konfirmasi</p>
                        </div>
                    </div>
                    <div style="display: flex;width: 100%;height: 120px;margin-top: 20px;">
                        <img src="{{asset('asset/icon/icon_kado.png')}}" style="width: 100%;max-width: 100px;">
                        <div style="margin-left: 10px;margin-top: 25px;">
                            <p style="font-size: 20px;">iChwan</p>    
                            <p style="font-size: 20px;font-weight: bold;margin-top: 10px;">Rp.50.000</p>
                            <p style="color: orange;font-size: 20px;font-weight: bold">Menunggu Konfirmasi</p>
                        </div>
                    </div>
                    <div style="display: flex;width: 100%;height: 120px;margin-top: 20px;">
                        <img src="{{asset('asset/icon/icon_kado.png')}}" style="width: 100%;max-width: 100px;">
                        <div style="margin-left: 10px;margin-top: 25px;">
                            <p style="font-size: 20px;">iChwan</p>    
                            <p style="font-size: 20px;font-weight: bold;margin-top: 10px;">Rp.50.000</p>
                            <p style="color: orange;font-size: 20px;font-weight: bold">Menunggu Konfirmasi</p>
                        </div>
                    </div>    
                    </div>
                </div>
                <div style="width: 100%;height: 40px;background-color: #F4F4F4;display: inline-flex;">
                    <p style="margin-top: 13px;margin-left: 10px;font-size: 15px;">Status Pesanan : <strong style="font-weight: bold;">Pesanan Selesai</strong></p> 
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="row  riwayat" style="margin: 0px ;padding: 0px">
                <div style="width: 100%;padding: 10px">
                    <div style="font-weight: 700;font-size: 20px;">No. Pesanan</div>
                    <div style="padding-top: 3px;">Tanggal Order: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">Tanggal Selesai: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">penerima iChwan Ganteng</div>
                    <div>
                        <div style="display: flex;width: 100%;height: 120px;margin-top: 20px;">
                        <img src="{{asset('asset/icon/icon_kado.png')}}" style="width: 100%;max-width: 100px;">
                        <div style="margin-left: 10px;margin-top: 25px;">
                            <p style="font-size: 20px;">iChwan</p>    
                            <p style="font-size: 20px;font-weight: bold;margin-top: 10px;">Rp.50.000</p>
                            <p style="color: orange;font-size: 20px;font-weight: bold">Menunggu Konfirmasi</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div style="width: 100%;height: 40px;background-color: #F4F4F4;display: inline-flex;">
                    <p style="margin-top: 13px;margin-left: 10px;font-size: 15px;">Status Pesanan : <strong style="font-weight: bold;">Pesanan Selesai</strong></p> 
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="row  riwayat" style="margin: 0px ;padding: 0px">
                <div style="width: 100%;padding: 10px">
                    <div style="font-weight: 700;font-size: 20px;">No. Pesanan: 123464</div>
                    <div style="padding-top: 3px;">Tanggal Order: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">Tanggal Selesai: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">penerima iChwan Ganteng</div>
                    <div style="display: flex;width: 100%;height: 120px;margin-top: 20px;">
                        <img src="{{asset('asset/icon/icon_kado.png')}}" style="width: 100%;max-width: 100px;">
                        <div style="margin-left: 10px;margin-top: 25px;">
                            <p style="font-size: 20px;">iChwan</p>    
                            <p style="font-size: 20px;font-weight: bold;margin-top: 10px;">Rp.50.000</p>
                            <p style="color: orange;font-size: 20px;font-weight: bold">Menunggu Konfirmasi</p>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;height: 40px;background-color: #F4F4F4;display: inline-flex;">
                    <p style="margin-top: 13px;margin-left: 10px;font-size: 15px;">Status Pesanan : <strong style="font-weight: bold;">Pesanan Selesai</strong></p> 
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="row  riwayat" style="margin: 0px ;padding: 0px">
                <div style="width: 100%;padding: 10px">
                    <div style="font-weight: 700;font-size: 20px;">No. Pesanan: 123464</div>
                    <div style="padding-top: 3px;">Tanggal Order: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">Tanggal Selesai: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">penerima iChwan Ganteng</div>
                    <div style="display: flex;width: 100%;height: 120px;margin-top: 20px;">
                        <img src="{{asset('asset/icon/icon_kado.png')}}" style="width: 100%;max-width: 100px;">
                        <div style="margin-left: 10px;margin-top: 25px;">
                            <p style="font-size: 20px;">iChwan</p>    
                            <p style="font-size: 20px;font-weight: bold;margin-top: 10px;">Rp.50.000</p>
                            <p style="color: orange;font-size: 20px;font-weight: bold">Menunggu Konfirmasi</p>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;height: 40px;background-color: #F4F4F4;display: inline-flex;">
                    <p style="margin-top: 13px;margin-left: 10px;font-size: 15px;">Status Pesanan : <strong style="font-weight: bold;">Pesanan Selesai</strong></p> 
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="row  riwayat" style="margin: 0px ;padding: 0px">
                <div style="width: 100%;padding: 10px">
                    <div style="font-weight: 700;font-size: 20px;">No. Pesanan: 123464</div>
                    <div style="padding-top: 3px;">Tanggal Order: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">Tanggal Selesai: 10 Mei 2018</div>
                    <div style="padding-top: 3px;">penerima iChwan Ganteng</div>
                    <div style="display: flex;width: 100%;height: 120px;margin-top: 20px;">
                        <img src="{{asset('asset/icon/icon_kado.png')}}" style="width: 100%;max-width: 100px;">
                        <div style="margin-left: 10px;margin-top: 25px;">
                            <p style="font-size: 20px;">iChwan</p>    
                            <p style="font-size: 20px;font-weight: bold;margin-top: 10px;">Rp.50.000</p>
                            <p style="color: orange;font-size: 20px;font-weight: bold">Menunggu Konfirmasi</p>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;height: 40px;background-color: #F4F4F4;display: inline-flex;">
                    <p style="margin-top: 13px;margin-left: 10px;font-size: 15px;">Status Pesanan : <strong style="font-weight: bold;">Pesanan Selesai</strong></p> 
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
</div>
<!-- Lacak Pesanan -->
<div id="tracking-stuff" class="overlay-popup" style="background-color: #8f8d8d40;">
    <div class="overflow">
        <div class="table-view">
            <div class="cell-view">
                <div class="close-layer"></div>
                <div class="popup-container popup-relative lacak-pesanan-modals" style="overflow: auto;">
                    <div class="lacak-pesanan-header-modal">
                        <div class="lacak-pesanan-title">LACAK PESANAN
                        </div>
                    </div>
                    <div class="lacak-pesanan-body">
                        <div class="lacak-pesanan-box-item">
                            <h6 id="no-resi" style="font-size: 25px; font-weight: 600; width: 500px;">
                            </h6>
                            <div id="reciver-name" style="position: absolute; top: 35px; font-size: 15px;">Nama Penerima: iChwan | Alamat : </div>
                            <div style="position: absolute; top: 75px; font-size: 18px;">
                                <div id="manifest-last-update">Update terakhir: 26 Februari 2018 | 16.40 WIB</div>
                            </div>
                        </div>
                    </div>
                    <div id="list-item-tracking">
                        
                    </div>
                    <div id="tracking-list" style="margin-top: 30px;">
                        
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Konfirmasi Pembayaran -->
<div id="subscribe-popup-6" class="overlay-popup" style="background-color: #8f8d8d40;">
    <div class="overflow">
        <div class="table-view">
            <div class="cell-view">
                <div class="close-layer"></div>
                <div class="popup-container popup-relative konfirmasi-pambayaran-bt">
                    <div style="display: flex; background: #01998d; width: 100%; height: 50px; flex-direction: column;">
                        <div style="font-size: 30px; font-weight: 600; color: #fff; margin-left: 0; margin-top: 10px; text-align: center;">KONFIRMASI PEMBAYARAN</div>
                    </div>
                    <div style="display: flex; position: absolute; top: 0; width: 100%; left: 0; height: 206px;">
                        <div class="konfirmasi-pambayaran-fnet-2">
                            <div style="font-size: 19px; padding-top: 10px; padding-right: 10px; padding-left: 10px; text-align: center;">
                                Terimakasih telah berbelanja di kadoqu.com <br> Untuk memproses pesanan Anda, silahkan konfirmasi pembayaran <br> dengan mengisi kolom di bawah ini
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; left: 0; margin-top: 100px; margin-left: 60px;">
                        <form style="margin-right: 50px;" id="fileUploadForm">
                            <span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Nomer Order</span>
                            <input type="number" class="input-konfirmasi-pembayaran" id="nomer-order" required>

                            <span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Metode Pembayaran</span>
                            <div class="simple-drop-down simple-field size-1" style="background: #fff">
                                <select id="metode-pembayaran" required>
                                    <option value="">Pilih salah satu</option>
                                    <option value="bank-transfer">Bank Transfer</option>
                                    <option value="doku-short-chart">Doku MyShortCart</option>
                                </select>
                            </div>
                            <div style="color: red; margin-top: -1%;position: absolute;" id="metode-pembayaran-validation"></div>

                            <span style="display: block; padding-top: 20px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Bank Pilihan</span>
                            <div class="simple-drop-down simple-field size-1" style="background: #fff">
                                <select id="metode-transfer" required>
                                    <option value="">Pilih salah satu</option>
                                    <option value="BCA">BCA</option>
                                    <option value="Mandiri">Mandiri</option>
                                    <option value="BNI">BNI</option>
                                </select>
                            </div>
                            <div style="color: red; margin-top: -1%;position: absolute;" id="bank-validation"></div>

                            <span style="display: block; padding-top: 20px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Rekening Atas Nama</span>
                            <input id="atas-nama" type="text" class="input-konfirmasi-pembayaran" required>
                            <div style="color: red; margin-top: 6%;position: absolute;" id="rekening-validation"></div>

                            <span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Nominal Transfer</span>
                            <input id="nominal-transfer" type="number" class="input-konfirmasi-pembayaran" required>
                            <div style="color: red; margin-top: 6%;position: absolute;" id="nominal-validation"></div>

                            <span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Tanggal dan Jam Transfer</span>
                            <input id="tanggal" style="line-height: normal; width: 49% !important; margin-right: 10px;" class="simple-field" type="date" required value="" />
                            <div style="color: red; margin-top: -3%;position: absolute;" id="tanggal-waktu-validation"></div>
                            <input id="waktu" style="line-height: normal; width: 48% !important;" class="simple-field" type="time" required value="" />
                            

                            <span style="display: block; padding-top: 0px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Upload Bukti Transfer</span>
                            <input id="file" name="file" type="file" style="font-size: 1.25em;color: black;background-color: white;display: inline-block; cursor: pointer" class="input-konfirmasi-pembayaran" required>
                            <div style="color: red; margin-top: 8%;position: absolute;" id="upload-foto-validation"></div>

                            <button onclick="proccessPayment()" id="konfirmasi-pembayaran-btn" class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-konfirmasi-pembayaran" type="button" style="background: #01998d; height: 5% !important; margin-top: 50px !important; margin-left: 130px; left: 10px;">Konfirmasi Pembayaran
                            </button>
                            <img id="loading-image" src="{{asset('loading-confirmation.gif')}}" style="width: 60px;position: absolute;margin-top: 80px;left: 435px;display: none;">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
<script type="text/javascript">
    userMiddleware();
    //convert to indonesian date
    function convertToIndonesianDate(tanggal) {
      const bulan = ['Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'];
      let split = tanggal.split('-');
      return split[2]+' '+ bulan[parseInt(split[1] - 1)]+' '+split[0];
    }

    //Cart order
    function orderCart(token){
        $.ajax({
          url: "https://admin.kadoqu.com/api/details",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          type: 'POST',
          crossDomain : true,
          success: function(data, status) {
            let listdata = "";
            $.each(data.success.order, function(index, val) {
                // console.log(val.biaya_pengiriman)
                var status;
                var statuspesanan;
                var trackingItemButton;
                var paymentBtn;
                var ongkir = '';
                if (val.biaya_pengiriman == 0) {
                    ongkir = '';
                } else {
                    ongkir = '(Dengan ongkir)'
                }
                if (val.status == 1) {
                    status = `
                    <div class="pembatalan-flex">
                        <div>
                            <div class="title-pembatalan">
                            <p class="p-1-riwayat">Pesnan Sudah di Konfirmasi</p>
                            <p class="p-2-riwayat">Pesnan Sudah di Konfirmasi oleh Pembeli</p>
                            </div>
                            <div class="fa-icon-pembatalan-blancer">
                               <img src="{{asset('asset/icon/icon_proses2_konfirmasi.png')}}" class="image-bottom-pembatalan"> 
                            </div>
                        </div>        
                    </div>
                    `;
                    statuspesanan = `<p class="p-sub-judul harga-sub" style="margin-top: 120px; color: Green;">Pesanan Dikonfirmasi</p>`;
                    trackingItemButton = ``;
                    paymentBtn = `<a class="button style-7" href="javascript:void(0)" onclick="confirmPayment('${val.order_no}')">Konfirmasi Pembayaran</a>`;
                } else if (val.status == 2) {
                    status = `
                    <div class="pembatalan-flex">
                        <div>
                            <div class="title-pembatalan">
                            <p class="p-1-riwayat">Pesnan Sudah di Bayar</p>
                            <p class="p-2-riwayat">Pesnan Sudah di Konfirmasi oleh Admin</p>
                            </div>
                            <div class="fa-icon-pembatalan-blancer">
                               <img src="{{asset('asset/icon/icon_proses3_sudah dibayar.png')}}" class="image-bottom-pembatalan"> 
                            </div>
                        </div>        
                    </div>
                    `;
                    statuspesanan = `<p class="p-sub-judul harga-sub" style="margin-top: 120px; color: Green;">Pesanan Dikonfirmasi Admin</p>`;
                    trackingItemButton = ``;
                    paymentBtn = ``;
                } else if (val.status == 3) {
                    status = `
                    <div class="pembatalan-flex">
                        <div>
                            <div class="title-pembatalan">
                            <p class="p-1-riwayat">Pesnan Sudah di Kirim</p>
                            <p class="p-2-riwayat">Pesnan Sedang dalam perjalanan</p>
                            </div>
                            <div class="fa-icon-pembatalan-blancer">
                               <img src="{{asset('asset/icon/icon_proses5_pesanan dikirim.png')}}" class="image-bottom-pembatalan"> 
                            </div>
                        </div>        
                    </div>
                    <input type="hidden" id="index-${val.no_resi}" value='${JSON.stringify(val.item)}'>
                    `;
                    statuspesanan = `<p class="p-sub-judul harga-sub" style="margin-top: 120px; color: Green;">Pesanan Dalam Pengiriman</p>`;
                    trackingItemButton = `<a class="button style-7" href="javascript:void(0)" onclick="trackingStuff('${val.no_resi}')">Lacak Pesanan</a>`;
                    paymentBtn = ``;
                } else {
                    status = `
                    <div class="pembatalan-flex">
                        <div>
                            <div class="title-pembatalan">
                            <p class="p-1-riwayat">Menunggu Konfirmasi</p>
                            <p class="p-2-riwayat">Menunggu Konfirmasi oleh Pembeli</p>
                            </div>
                            <div class="fa-icon-pembatalan-blancer">
                               <img src="{{asset('asset/icon/icon_proses1_belum dibayar.png')}}" class="image-bottom-pembatalan"> 
                            </div>
                        </div>        
                    </div>
                    `;
                    statuspesanan = `<p class="p-sub-judul harga-sub" style="margin-top: 120px; color: orange;">Menunggu Konfirmasi</p>`;
                    trackingItemButton = ``;
                    paymentBtn = `<a class="button style-7" href="javascript:void(0)" onclick="confirmPayment('${val.order_no}')">Konfirmasi Pembayaran</a>`;
                }
                 if (listdata == "") {
                    listdata = listdata + `
                      <div class="card card-body height">
                        <div class="status-pembelian-card">
                            <div>
                                <div class="status-pembelian-title">
                                    Rincian Pesanan ${val.order_no}
                                </div>
                                <div class="status-pembelian-title total-belanja">
                                    Total belanja: <div style="display: inline-table; color: red;">${convertToRupiah(val.total_bayar.toString())} ${ongkir}</div>
                                    <p class="p-date">${val.date}</p>
                                </div>
                            </div>
                        </div>
                        <div id="item-${index}">
                            
                        </div>
                        <div class="button-riwayat-belanja-flex">
                            <div class="riwayat-button">
                                ${trackingItemButton}
                                ${paymentBtn}
                                <a class="button style-7" href="{{url('faq')}}">Ajukan Pengembalian</a>
                            </div>
                        </div>
                        ${status}
                        <div class="button-riwayat-mobile">
                            <a onclick="trackingStuff()" class="button style-7" style="width: 100%;" href="#">Lacak Pesanan</a>
                            <div>
                                <a class="button style-7" style="width: 50%;" href="#">Konfirmasi Pembayaran</a>
                                <a class="button style-7" style="width: 48%;" href="{{url('faq')}}">Ajukan Pengembalian</a>
                            </div>
                        </div>
                      </div>`;
                 } else {
                    listdata = `
                    <div class="card card-body height">
                        <div class="status-pembelian-card">
                            <div>
                                <div class="status-pembelian-title">
                                    Rincian Pesanan ${val.order_no}
                                </div>
                                <div class="status-pembelian-title total-belanja">
                                    Total belanja: <div style="display: inline-table; color: red;">${convertToRupiah(val.total_bayar.toString())} ${ongkir}</div>
                                    <p class="p-date">${val.date}</p>
                                </div>
                            </div>
                        </div>
                        <div id="item-${index}">
                             
                        </div>
                        <div class="button-riwayat-belanja-flex">
                            <div class="riwayat-button">
                                ${trackingItemButton}
                                ${paymentBtn}
                                <a class="button style-7" href="{{url('faq')}}">Ajukan Pengembalian</a>
                            </div>
                        </div>
                        ${status}
                        <div class="button-riwayat-mobile">
                            <a onclick="trackingStuff()" class="button style-7" style="width: 100%;" href="#">Lacak Pesanan</a>
                            <div>
                                <a class="button style-7" style="width: 50%;" href="#">Konfirmasi Pembayaran</a>
                                <a class="button style-7" style="width: 48%;" href="{{url('faq')}}">Ajukan Pengembalian</a>
                            </div>
                        </div>
                      </div>`;
                 }
                 $('#collapseStatusPembelian').append(listdata);
                 var listitem;
                 var trackingItem;
                 $.each(val.item, function(ind, va) {
                      listitem = `
                            <div class="lists-item">
                                <div style="margin-left: 15px;padding-top: 30px;">
                                    <img src="https://admin.kadoqu.com/produk/${va.product.images[0].gambar}" style="width: 100%;max-width: 100px;">
                                    <p class="p-sub-judul">${va.product.namaProduk} (${va.jumlah}x)</p>
                                    <p class="p-sub-judul harga-sub">${convertToRupiah(va.harga_satuan.toString())}</p>
                                    ${statuspesanan}
                                </div>
                            </div>`;
                    $(`#item-${index}`).append(listitem);
                 });
            });
          },
        });
    } orderCart(token);

    //tracking items
    function trackingStuff(resi){
        var tracking_item = JSON.parse($("#index-"+resi).val());
        var listsitemtracking = "";
        for(let i = 0;i<tracking_item.length;i++){
            console.log(tracking_item[i]);
            listsitemtracking = listsitemtracking+ `
            <div style="position: relative; width: 100%;background-color: #e8faf6;padding-bottom: 20px;">
                <img src="https://admin.kadoqu.com/produk/${tracking_item[i].product.images[0].gambar}" style="margin-top: 3%; width:100px;max-width:100%;margin-left:10px;">
                <div style="position: absolute;top: 23%; left: 19%;">
                    <div style="font-size: 22px;">
                        ${tracking_item[i].product.namaProduk} (${tracking_item[i].jumlah}x)
                    </div>
                    <div style="font-weight: bold; margin-top: 3%; font-size: 15px; font-size: 24px;">
                        ${convertToRupiah(tracking_item[i].harga_total.toString())}
                    </div>
                </div>
            </div>`;
        }
        $('#list-item-tracking').html(listsitemtracking);
        
        $('#tracking-stuff').attr('class', 'overlay-popup visible active');
        $.ajax({
            url: 'https://admin.kadoqu.com/api/waybill',
            type: 'POST',
            dataType: 'json',
            data: {
                "waybill": resi,
                "courier": "jne"
            },
            success: function (data) {
                $('#tracking-list').html('');
                $('#manifest-last-update').html('');
                // console.log(data);
                $('#reciver-name').html(`Nama Penerima: ${data.rajaongkir.result.summary.receiver_name} | Tujuan : ${data.rajaongkir.result.summary.destination}`);
                $('#no-resi').html(`Resi: ${data.rajaongkir.query.waybill} (JNE - ${data.rajaongkir.result.summary.service_code})`);
                let listdata;
                let manifestLastUpdate = [];
                if(data.rajaongkir.result.manifest != null){
                    $.each(data.rajaongkir.result.manifest, function(index, el) {
                        manifestLastUpdate.push(el);
                    });
                }
                if (manifestLastUpdate.length == 0) {
                    console.log('manifest kosong');
                    $('#tracking-list').html('belum ada update');
                    $('#manifest-last-update').html(`Update terakhir: - | - WIB`);
                } else {
                let index = manifestLastUpdate.length - 1;
                var sortData = manifestLastUpdate.sort(function(a,b){
                   var dateA = new Date(a.manifest_date), dateB = new Date(b.manifest_date);
                   return dateB - dateA;
                });
                $.each(sortData, function(index, el) {

                     if (listdata != undefined) {
                        listdata = listdata + `
                        <div class="lacak-pesnan-list-flex">
                            <div style="margin-left: 50px;font-weight: bold;font-size: 12px;">
                                <i class="fa fa-check-circle icon-chacked"></i> ${el.manifest_description}
                            </div>
                            <div class="lacak-pesanan-date" style="font-weight: 600;">
                                ${convertToIndonesianDate(el.manifest_date)}<br>${el.manifest_time} WIB
                            </div>
                        </div>
                        <hr class="hr-lacak-pesanan">`;
                        } else {
                        listdata =`
                        <div class="lacak-pesnan-list-flex">
                            <div style="margin-left: 50px;font-weight: bold;font-size: 12px;">
                                <i class="fa fa-check-circle icon-chacked"></i> ${el.manifest_description}
                            </div>
                            <div class="lacak-pesanan-date" style="font-weight: 600;">
                                ${convertToIndonesianDate(el.manifest_date)}<br>${el.manifest_time} WIB
                            </div>
                        </div>
                        <hr class="hr-lacak-pesanan">`;
                        }
                });
                $('#tracking-list').html(listdata);
                $('#manifest-last-update').html(`Update terakhir: ${convertToIndonesianDate(manifestLastUpdate[index].manifest_date)} | ${manifestLastUpdate[index].manifest_time} WIB`);
                }
            }
        });
       }
       function tutup7(){
        $('#tracking-stuff').removeClass('active');
        setTimeout( function(argument) {
            $('#tracking-stuff').removeClass('visible');
        }, 500);
    }

    var order_no;
    function confirmPayment(ordernum) {
        $('#fileUploadForm')[0].reset();
        order_no = ordernum;
        $('#subscribe-popup-6').attr('class', 'overlay-popup visible active');
        $('#nomer-order').val(order_no).prop('disabled',true);
    }

    //confirm proccess payment
    function proccessPayment(){
        let metode = $('#metode-pembayaran').val();
        let bank = $('#metode-transfer').val();
        let atas_nama = $('#atas-nama').val();
        let nominal = $('#nominal-transfer').val();
        let tanggal_transfer = $('#tanggal').val();
        let waktu_transfer = $('#waktu').val();
        let files = $('#file').val();
        $('#konfirmasi-pembayaran-btn').css({
            'pointer-events' : 'none',
        });
        $('#loading-image').css({
            'display' : '',
        });
        if(metode == ""){
            $('#metode-pembayaran-validation').html("The metode field is required.");
        } else {
            $('#metode-pembayaran-validation').html("");
        }

        var form = $('#fileUploadForm')[0];
        var fd = new FormData(form);    
        fd.append('file', $('#file').files && $('#file').files[0]);
        fd.append('bank', bank);
        fd.append('atas_nama', atas_nama);
        fd.append('nominal', nominal);
        fd.append('tanggal_transfer', tanggal_transfer+waktu_transfer);
        
        $.ajax({
            url: 'https://admin.kadoqu.com/api/konfirmasi_pembayaran/'+order_no,
            type: 'POST',
            dataType: 'json',
            data: fd,
            processData: false,
            contentType: false,
        })
        .done(function() {
         $('#loading-image').css({
            'display' : 'none',
        });
        swal({
          title: 'Konfirmasi Sukses !',
          text: "Bukti pembayaran ada telah berhasil terkirim :)",
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#0ca297',
          confirmButtonText: 'OKE'
        }).then((result) => {
          location.reload();
        });
            console.log("success");
        })
        .fail(function(err){
            $('#konfirmasi-pembayaran-btn').css({
                'pointer-events' : 'auto',
            });
            $('#loading-image').css({
                'display' : 'none',
            });
            var errors = JSON.parse(err.responseText);
            console.log(errors);
            if(errors['error'].bank){
                $('#bank-validation').html(errors['error'].bank[0]);
            } else {
                $('#bank-validation').html("");
            } if(errors['error'].atas_nama){
                $('#rekening-validation').html(errors['error'].atas_nama[0]);
            } else {
                $('#rekening-validation').html("");
            } if(errors['error'].nominal){
                $('#nominal-validation').html(errors['error'].nominal[0]);
            } else {
                $('#nominal-validation').html("");
            } if(errors['error'].tanggal_transfer){
                $('#tanggal-waktu-validation').html("The tanggal and waktu transfer field is required");
            } else {
                $('#tanggal-waktu-validation').html("");
            } if(errors['error'].file){
                if (files  == "") {
                    $('#upload-foto-validation').html("Please upload your payment receipt");
                } else if (files != "") {
                    $('#upload-foto-validation').html(errors['error'].file[0]);
                }
            } 
        });
    }


    //Shopping history
    function shoppingHistory() {
        $.ajax({
            url: "https://admin.kadoqu.com/api/details",
            headers: {
            'Authorization': `Bearer ${token}`,
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                let listdata = '';
                $('#shopping-history').html('')
                $.each(data.success.orders[0], function(index, val) {
                    console.log(val)
                     listdata =  `
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div class="row  riwayat" style="margin: 0px ;padding: 0px">
                                <div style="width: 100%;padding: 10px;overflow: auto;height: 250px;">
                                    <div style="font-weight: 700;font-size: 20px;">No. Pesanan: ${val.order_no}</div>
                                    <div style="padding-top: 3px;">Tanggal Order: ${val.date}</div>
                                    <div style="padding-top: 3px;">Tanggal Selesai: -</div>
                                    <div style="padding-top: 3px;">penerima: ${val.nama_penerima}</div>
                                    <div id="riwayat-item-${index}">
                                        
                                    </div>
                                </div>
                                <div style="width: 100%;height: 40px;background-color: #F4F4F4;display: inline-flex;">
                                    <p class="item-p-riwayatb-4">${val.statusinfo[0]}</strong></p> 
                                </div>
                            </div>
                        </div>`;
                        $('#shopping-history').append(listdata);
                        var listRiwayat;
                        $.each(val.item, function(indx, el) {
                            listRiwayat = `
                            <div style="display: flex;width: 100%;height: 100px;margin-top: 20px;">
                                <img src="https://admin.kadoqu.com/produk/${el.product.images[0].gambar}" style="width: 100%;max-width: 100px;">
                                <div style="margin-left: 10px;margin-top: 5px;">
                                    <p class="item-p-riwayatb-1">${el.product.namaProduk} (${el.jumlah}X)</p>    
                                    <p class="item-p-riwayatb-2">${convertToRupiah(el.harga_total.toString())}</p>
                                    <p class="item-p-riwayatb-3">Menunggu Konfirmasi</p>
                                </div>
                            </div>`;
                            $(`#riwayat-item-${index}`).append(listRiwayat);
                        });
                        
                });
                
            }
        });
    } shoppingHistory()
</script>
@endsection
@include('Parent.footer')
