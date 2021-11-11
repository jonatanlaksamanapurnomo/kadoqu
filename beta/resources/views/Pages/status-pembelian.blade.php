@include('Parent.header')
<title>User Profile</title>
<div class="navigation-profil">
    <div id="menu-profil-web" class="row" style="margin: 0px">
        <table class="table" style="margin: 0px;table-layout: fixed">
            <tr class="hari text-center">
                <td class="menu-profil cen" onclick="javascript:location.href='status-pembelian'">
                    <a href="{{url('event-reminder')}}" style="color: #fff;">
                        <i class="fa fa-user"></i> Profile
                    </a>
                </td>
                <td class="menu-profil cen" onclick="javascript:location.href='event-reminder'">
                    <a href="{{url('event-reminder')}}" style="color: #fff;">
                        <i class="fa fa-calendar"></i> Event Reminder
                    </a>
                </td>
                <td class="menu-profil cen" onclick="javascript:location.href='daftar-favorit'">
                    <a href="{{url('dafta-favorit')}}" style="color: #fff;">
                        <i class="fa fa-star"></i> Daftar Favorit
                    </a>
                </td>
                <td class="menu-profil cen" onclick="javascript:location.href='riwayat-belanja'">
                    <a href="{{('riwayat-belanja')}}" style="color: #fff;">
                        <i class="fa fa-history "></i> Riwayat Belanja
                    </a>
                </td>
                <td class="menu-profil cen active">
                       <i class="fa fa-archive "></i> Status Pembelian
                </td>
            </tr>
        </table>
    </div>
    <div id="menu-profil-mobile" class="row" style="margin: 0px">
        <div class="menu-profil active col-xs-12 "><i class="fa fa-user"></i> Profile</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-calendar"></i> Event Reminder</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-star"></i> Daftar Favorit</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-history "></i> Riwayat Belanja</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-archive "></i> Riwayat Status</div>
    </div>
</div>
<div class="content-push" style="padding-left: 10%;padding-right: 10%;">
    <h2 class="cart-column-title cekout-sub" style="border-top: 0px"><i class="fa fa-history" style="padding:3% 0% 0% 3%"></i> Status Pembelian</h2>
    <div style="padding: 3%">
        <div class="row">
            <div class="col-sm-6 information-entry">
                <div class="bg-green-1" style="padding:0 15px">
                    <h3 class="cart-column-title judul-cart-kanan">Rincian Barang</h3>
                    <div class="traditional-cart-entry style-1 isi-cart-kanan">
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-2 col-xs-2">
                                <div style="background-image:url(asset/icon/icon_kado.png);width: 29px; height: 35px;background-size: cover; padding-right: 0px; padding-left: 0px; text-align: center"><i class="rincian-nomer">1</i></div>
                            </div>
                            <div class="col-md-7 col-xs-6 rincian-text">
                                Gift 1 - Jasa Bungkus
                            </div>
                            <div class="col-md-3 col-xs-4 rincian-rp">
                                Rp.5000
                            </div>
                        </div>
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-3" style="text-align: center"><img src="asset/icon/icon_kado.png"></div>
                            <div class="col-md-6 col-xs-8">
                                <h5 class="detail-barang">Lidah Kucing</h5>
                                <h5 class="detail-barang">Rp.50000</h5>
                                <div class="quantity-selector detail-info-entry detail-barang" style="">
                                    <div class="entry number-minus ">&nbsp;</div>
                                    <div class="entry number ">10</div>
                                    <div class="entry number-plus ">&nbsp;</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-xs-4" style="text-align: right">
                                <h5 class="rincian-rp">Rp.50000</h5>
                            </div>
                        </div>
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-3" style="text-align: center"><img src="asset/icon/icon_kado.png"></div>
                            <div class="col-md-6 col-xs-8">
                                <h5 class="detail-barang">Lidah Kucing</h5>
                                <h5 class="detail-barang">Rp.50000</h5>
                                <div class="quantity-selector detail-info-entry detail-barang" style="">
                                    <div class="entry number-minus ">&nbsp;</div>
                                    <div class="entry number ">10</div>
                                    <div class="entry number-plus ">&nbsp;</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-xs-4" style="text-align: right">
                                <h5 class="rincian-rp">Rp.50000</h5>
                            </div>
                        </div>
                    </div>
                    <div class="traditional-cart-entry style-1 isi-cart-kanan">
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-2 col-xs-2">
                                <div style="background-image:url(asset/icon/icon_kado.png);width: 29px; height: 35px;background-size: cover; padding-right: 0px; padding-left: 0px; text-align: center"><i class="rincian-nomer">1</i></div>
                            </div>
                            <div class="col-md-7 col-xs-6 rincian-text">
                                Gift 1 - Jasa Bungkus
                            </div>
                            <div class="col-md-3 col-xs-4 rincian-rp">
                                Rp.5000
                            </div>
                        </div>
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-3" style="text-align: center"><img src="asset/icon/icon_kado.png"></div>
                            <div class="col-md-6 col-xs-8">
                                <h5 class="detail-barang">Lidah Kucing</h5>
                                <h5 class="detail-barang">Rp.50000</h5>
                                <div class="quantity-selector detail-info-entry detail-barang" style="">
                                    <div class="entry number-minus ">&nbsp;</div>
                                    <div class="entry number ">10</div>
                                    <div class="entry number-plus ">&nbsp;</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-xs-4" style="text-align: right">
                                <h5 class="rincian-rp">Rp.50000</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 col-xs-3" style="text-align: center">
                            <i class="fa fa-times-circle fa-4x" style="color: #f30001;"></i>
                        </div>
                        <div class="col-md-9 col-xs-9 ket-his">
                            <p style="font-weight: bold">Total Pembayaran</p>
                            <p style="font-weight: bold ;color:#f30001">$ 28.00</p>
                            <p style="font-weight: bold">Pesanan Belum Dibayar</p>
                            <p>Lakukan Pembayaran Sebelum Batas Waktu</p>
                        </div>
                    </div>
                    <a class="button style-7" style="display: table;margin: 15px auto;">Cek Rincian</a>
                </div>
            </div>
            <div class="col-sm-6 information-entry">
                <div class="bg-green-1" style="padding:0 15px">
                    <h3 class="cart-column-title judul-cart-kanan">Rincian Barang</h3>
                    <div class="traditional-cart-entry style-1 isi-cart-kanan">
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-2 col-xs-2">
                                <div style="background-image:url(asset/icon/icon_kado.png);width: 29px; height: 35px;background-size: cover; padding-right: 0px; padding-left: 0px; text-align: center"><i class="rincian-nomer">1</i></div>
                            </div>
                            <div class="col-md-7 col-xs-6 rincian-text">
                                Gift 1 - Jasa Bungkus
                            </div>
                            <div class="col-md-3 col-xs-4 rincian-rp">
                                Rp.5000
                            </div>
                        </div>
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-3" style="text-align: center"><img src="asset/icon/icon_kado.png"></div>
                            <div class="col-md-6 col-xs-8">
                                <h5 class="detail-barang">Lidah Kucing</h5>
                                <h5 class="detail-barang">Rp.50000</h5>
                                <div class="quantity-selector detail-info-entry detail-barang" style="">
                                    <div class="entry number-minus ">&nbsp;</div>
                                    <div class="entry number ">10</div>
                                    <div class="entry number-plus ">&nbsp;</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-xs-4" style="text-align: right">
                                <h5 class="rincian-rp">Rp.50000</h5>
                            </div>
                        </div>
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-3" style="text-align: center"><img src="asset/icon/icon_kado.png"></div>
                            <div class="col-md-6 col-xs-8">
                                <h5 class="detail-barang">Lidah Kucing</h5>
                                <h5 class="detail-barang">Rp.50000</h5>
                                <div class="quantity-selector detail-info-entry detail-barang" style="">
                                    <div class="entry number-minus ">&nbsp;</div>
                                    <div class="entry number ">10</div>
                                    <div class="entry number-plus ">&nbsp;</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-xs-4" style="text-align: right">
                                <h5 class="rincian-rp">Rp.50000</h5>
                            </div>
                        </div>
                    </div>
                    <div class="traditional-cart-entry style-1 isi-cart-kanan">
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-2 col-xs-2">
                                <div style="background-image:url(asset/icon/icon_kado.png);width: 29px; height: 35px;background-size: cover; padding-right: 0px; padding-left: 0px; text-align: center"><i class="rincian-nomer">1</i></div>
                            </div>
                            <div class="col-md-7 col-xs-6 rincian-text">
                                Gift 1 - Jasa Bungkus
                            </div>
                            <div class="col-md-3 col-xs-4 rincian-rp">
                                Rp.5000
                            </div>
                        </div>
                        <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
                            <div class="col-md-3" style="text-align: center"><img src="asset/icon/icon_kado.png"></div>
                            <div class="col-md-6 col-xs-8">
                                <h5 class="detail-barang">Lidah Kucing</h5>
                                <h5 class="detail-barang">Rp.50000</h5>
                                <div class="quantity-selector detail-info-entry detail-barang" style="">
                                    <div class="entry number-minus ">&nbsp;</div>
                                    <div class="entry number ">10</div>
                                    <div class="entry number-plus ">&nbsp;</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-xs-4" style="text-align: right">
                                <h5 class="rincian-rp">Rp.50000</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 col-xs-3" style="text-align: center">
                            <i class="fa fa-times-circle fa-4x" style="color: #f30001;"></i>
                        </div>
                        <div class="col-md-9 col-xs-9 ket-his">
                            <p style="font-weight: bold">Total Pembayaran</p>
                            <p style="font-weight: bold ;color:#f30001">$ 28.00</p>
                            <p style="font-weight: bold">Pesanan Belum Dibayar</p>
                            <p>Lakukan Pembayaran Sebelum Batas Waktu</p>
                        </div>
                    </div>
                    <a class="button style-7" style="display: table;margin: 15px auto;">Cek Rincian</a>
                </div>
            </div>
        </div>
    </div>
</div>

@section('scripts')
@endsection
@include('Parent.footer')