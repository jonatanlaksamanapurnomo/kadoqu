@include('Parent.header')
<div class="content-push" style="padding-left: 10%;padding-right: 10%;">
    <div class="banner-relative">
        <div id="berhasil-banner" class="row">
            <img class="col-md-12 col-sm-12" src="asset/cart/banner_done%202.jpg">
        </div>
        <div id="m-berhasil-banner" class="row">
            <img class=" col-xs-12" src="asset/cart/banner_done%201.jpg">
        </div>
        <p class="col-xs-8">Pesanan Kamu Sudah Diproses</p>
    </div>
    <div class="row text-center">
        <div class="berhasil-text">Lakukan Pembayaran Sebesar</div>
    </div>
    <div class="row text-center font-merah">
        <div class="berhasil-text" id="total-bayar"></div>
    </div>
    <div class="row text-center">
        <div class="berhasil-text">Melalui Bank Transfer ke Salah Satu Rekening</div>
    </div>
    <div class="row text-center" style="margin: 0 15%;">
        <div class="col-md-4 col-sm-6 col-xs-12 bank-detail">
            <img class="image-payment" src="asset/payment/BCA-bank-logo-transparent-1024x318.png">
            <div class="berhasil-text-bank">No.rekening : <i class="tebal">5e17 030 8079</i></div>
            <div class="berhasil-text-bank">Atas Nama : <i class="tebal">Frigard Harjono</i></div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bank-detail">
            <img class="image-payment" src="asset/payment/Bank_Mandiri_logo.svg.png">
            <div class="berhasil-text-bank">No.rekening : <i class="tebal">131 001 409 3902</i></div>
            <div class="berhasil-text-bank">Atas Nama : <i class="tebal">Frigard Harjono</i></div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bank-detail">
            <img class="image-payment" src="asset/payment/Logo Bank BNI PNG.png">
            <div class="berhasil-text-bank">No.rekening : <i class="tebal">041 968 6981</i></div>
            <div class="berhasil-text-bank">Atas Nama : <i class="tebal">Frigard Harjono</i></div>
        </div>
    </div>
    <div class="row text-center">
        <div class="berhasil-text">Dalam Waktu Kurang dari </div>
    </div>
    <div class="row text-center font-merah">
        <div id="remainingTime" class="berhasil-text">24 : 00 : 00</div>
    </div>
    <div class="row" style="margin-bottom: 40px">
        <div class="col-md-6 col-sm-6 col-xs-12 tombol-berhasil">
            <a href="{{url('/')}}" class="button style-7 col-md-4 col-xs-12" style="float: right">ok!</a>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12 tombol-berhasil">
            <a href="{{url('riwayat-belanja')}}" class="button style-7 col-md-4 col-xs-12">Cek riwayat Belanja</a>
        </div>
    </div>
</div>
@section('scripts')
<script type="text/javascript">
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    let uri = getUrlVars()['order_no'];

    function showResults() {
        $.ajax({
            url: 'https://admin.kadoqu.com/api/order',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index, val) {
                    if (val.order_no == uri) {
                        $('#total-bayar').text(convertToRupiah(val.total_bayar.toString()));
                    }
                });
            },
        });
        
    } showResults();
    
</script>
@endsection
@include('Parent.footer')