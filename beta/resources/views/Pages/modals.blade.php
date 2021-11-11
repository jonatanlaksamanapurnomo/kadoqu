@include('Parent.header')
<div>

	<div class="information-blocks">
		<div style="display: flex; flex-direction: column; width: 100%;">
			<button type="button" class="button style-7 col-md-2 button_modal_click" onclick="showme()">Modals Popup Banner</button>
			<button type="button" class="button style-7 col-md-2 button_modal_click" onclick="showme2()">Item Page 2 Modal</button>
			<button type="button" class="button style-7 col-md-2 button_modal_click" onclick="showme3()">GIDA Wrapping 2</button>
			<button type="button" class="button style-7 col-md-2 button_modal_click" onclick="showme4()">GIDA Wrapping 3</button>
			<button type="button" class="button style-7 col-md-2 button_modal_click" onclick="showme5()">Konfirmasi Pembayaran Fnet</button>
			<button type="button" class="button style-7 col-md-2 button_modal_click" onclick="showme6()">Konfirmasi Pembayaran Bt</button>
			<button type="button" class="button style-7 col-md-2 button_modal_click" onclick="showme7()">Lacak Pesanan</button>
		</div>
		<!--popup-->
		<div id="subscribe-popup" class="overlay-popup" style="background-color: #8f8d8d40;">
			<div class="overflow">
				<div class="table-view">
					<div class="cell-view">
						<div class="close-layer"></div>
						<div class="popup-container popup-relative">
							<img class="popup-background" src="asset/cart/banner_done%201.jpg" alt="" />

							<div style="display: flex; position: absolute; top: 0; width: 100%; left: 0">
								<button onclick="tutup()" style="background: none; border: none; position: absolute; right: 0">
									<i class="fa fa-times" style="font-size: 35px;"></i>
								</button>
								<div class="modal-flex-blancer">
									<!-- KOSONGINAJA -->
								</div>
								<div class="modal-flex-blancer-2">
									<div id="titlev" style="color: #0f0030;" >DAPATKAN 1 ALAS KAKI </div>
									<div id="valuev" style="color: #0f0030;">GRATIS!</div>
									<div style="color: #0f0030; margin-right: 90px; margin-bottom: 15px;">
										Kirimkan Vocer Saya Ke
									</div>
									<form action="#" method="get">
										<input type="text" class="input-email-voucher" style="margin-bottom: 10px !important;" placeholder="Masukan email anda disini">
									</form>
									<div style="display: flex; top: 100px;">
										<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer" style="background: #01092d;">Kirim!
										</button>
										<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer" style="background-color: #666666;" onclick="tutup()">Lain Kali Saja
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Modals - Item Page Modal 2 -->
		<div id="subscribe-popup-2" class="overlay-popup" style="background-color: #8f8d8d40;">
			<div class="overflow">
				<div class="table-view">
					<div class="cell-view">
						<div class="close-layer"></div>
						<div class="popup-container popup-relative gida-warpping-2">
							<div style="display: flex; position: absolute; top: 0; width: 100%; left: 0;">
								<div class="gida-modal-flex-blancer">
									<!-- KOSONGINAJA -->
								</div>
								<div class="gida-modal-flex-blancer-2">
									<img src="asset/icon/icon_cart 1.png" class="img-page-2-mdl" />
									<div class="page-2-title">Pesanan kamu sudah dimasukan ke dalam keranjang!</div>
									<div class="btn-page-2-mdl">
										<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-vocer-gida-wrap-2 btn-page-2-btn">Cek Keranjang!
										</button>
										<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-vocer-gida-wrap-2 btn-page-2-btn" onclick="tutup2()">Lanjut Belanja
										</button>
									</div>
								</div>
								<div class="gida-modal-flex-blancer">
									<!-- KOSONGINAJA -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Modals - GIDA Wrapping Modal 2 -->
		<div id="subscribe-popup-3" class="overlay-popup" style="background-color: #8f8d8d40;">
			<div class="overflow">
				<div class="table-view">
					<div class="cell-view">
						<div class="close-layer"></div>
						<div class="popup-container popup-relative gida-warpping-2">
							<div class="gida-flex-modals">
								<div class="gida-modal-flex-blancer">
									<!-- KOSONGINAJA -->
								</div>
								<div class="gida-modal-flex-blancer-2">
									<div class="gida-2-wrap-frame">
										<img src="asset/gida/gida_3.png" alt="" class="gida-wrap-2-img"/>
										<div class="gida-wrap-2-body">
											<div class="gida-wrap-2-title">Pesanan GIDA catat dan siap dibungkus!</div>
											<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-vocer-gida-wrap-2 gida-3-button">Cek Keranjang!
											</button>
											<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-vocer-gida-wrap-2 gida-3-button" onclick="tutup3()">Lanjut Belanja
											</button>
										</div>
									</div>
								</div>
								<div class="gida-modal-flex-blancer">
									<!-- KOSONGINAJA -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Modals -GIDA Wrapping 3 -->
		<div id="subscribe-popup-4" class="overlay-popup" style="background-color: #8f8d8d40;">
			<div class="overflow">
				<div class="table-view">
					<div class="cell-view">
						<div class="close-layer"></div>
						<div class="popup-container popup-relative gida-warpping-2">
							<div class="gida-flex-modals">
								<div class="gida-modal-flex-blancer">
									<!-- KOSONGINAJA -->
								</div>
								<div class="gida-modal-flex-blancer-2">
									<div class="gida-2-wrap-frame">
										<img src="asset/gida/gida_3.png" alt="" class="gida-wrap-2-img gida-wrap-3-img"/>
										<div class="gida-wrap-2-body">
											<div class="gida-wrap-2-title gida-wrap-3-title">Keranjang kamu kosong...!</div>
											<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-vocer-gida-wrap-2 gida-3-button">Belanja Sekarang!
											</button>
										</div>
									</div>
								</div>
								<div class="gida-modal-flex-blancer">
									<!-- KOSONGINAJA -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Konfirmasi Pembayaran Fnet-->
		<div id="subscribe-popup-5" class="overlay-popup" style="background-color: #8f8d8d40;">
			<div class="overflow">
				<div class="table-view">
					<div class="cell-view">
						<div class="close-layer"></div>
						<div class="popup-container popup-relative konfirmasi-pambayaran-fnet">
							<div style="display: flex; background: #01998d; width: 100%; height: 50px; flex-direction: column;">
								<div style="font-size: 30px; font-weight: 600; color: #fff; margin-left: 115px; margin-top: 10px;">KONFIRMASI PEMBAYARAN</div>
							</div>
							<div style="display: flex; position: absolute; top: 0; width: 100%; left: 0; height: 206px;">
								<div class="konfirmasi-pambayaran-fnet-2">
									<div style="font-size: 19px; padding-top: 10px; padding-right: 10px; padding-left: 10px; text-align: center;">
										Terimakasih telah berbelanja di kadoqu.com <br> Untuk memproses pesanan Anda, silahkan konfirmasi pembayaran <br> dengan mengisi kolom di bawah ini
									</div>
								</div>
							</div>
							<div style="display: flex; left: 0; margin-top: 100px; margin-left: 60px;">
								<form>
									<span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Nomer Order</span>
									<input type="number" class="input-konfirmasi-pembayaran">

									<span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Metode Pembayaran</span>
									<div class="simple-drop-down simple-field size-1" style="background: #fff">
										<select required>
											<option>Bank Transfer</option>
											<option>Cash On Delivery</option>
											<option>Cicilan</option>
										</select>
									</div>

									<span style="display: block; padding-top: 20px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Upload Bukti</span>
									<input type="text" class="input-konfirmasi-pembayaran">

									<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-konfirmasi-pembayaran" style="background: #01998d; height: 10% !important; margin-top: 50px !important; margin-left: 130px; left: 10px;">Konfirmasi Pembayaran
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Konfirmasi Pembayaran bt -->
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
								<form style="margin-right: 50px;">
									<span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Nomer Order</span>
									<input type="number" class="input-konfirmasi-pembayaran" required>

									<span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Metode Pembayaran</span>
									<div class="simple-drop-down simple-field size-1" style="background: #fff">
										<select required>
											<option>Bank Transfer</option>
											<option>Cash On Delivery</option>
											<option>Cicilan</option>
										</select>
									</div>

									<span style="display: block; padding-top: 20px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Bank Pilihan</span>
									<div class="simple-drop-down simple-field size-1" style="background: #fff">
										<select required>
											<option>BCA</option>
											<option>Mandiri</option>
											<option>BNI</option>
										</select>
									</div>

									<span style="display: block; padding-top: 20px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Rekening Atas Nama</span>
									<input type="text" class="input-konfirmasi-pembayaran" required>

									<span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Nominal Transfer</span>
									<input type="number" class="input-konfirmasi-pembayaran" required>

									<span style="display: block; padding-top: 60px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Tanggal dan Jam Transfer</span>
									<input id="tanggal" style="line-height: normal; width: 49% !important; margin-right: 10px;" class="simple-field" type="date" required value="" />
									<input id="waktu" style="line-height: normal; width: 48% !important;" class="simple-field" type="time" required value="" />

									<span style="display: block; padding-top: 0px; font-size: 15px; font-weight: bold; padding-bottom: 10px;">Upload Bukti Transfer</span>
									<input type="file" style="font-size: 1.25em;color: black;background-color: white;display: inline-block; cursor: pointer" class="input-konfirmasi-pembayaran" required>

									<button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-konfirmasi-pembayaran" style="background: #01998d; height: 5% !important; margin-top: 50px !important; margin-left: 130px; left: 10px;">Konfirmasi Pembayaran
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Lacak Pesanan -->
		<div id="subscribe-popup-7" class="overlay-popup visible active" style="background-color: #8f8d8d40;">
			<div class="overflow">
				<div class="table-view">
					<div class="cell-view">
						<div class="close-layer"></div>
						<div class="popup-container popup-relative lacak-pesanan-modals">
							<div class="lacak-pesanan-header-modal">
								<div class="lacak-pesanan-title">LACAK PESANAN
								</div>
							</div>
							<div class="lacak-pesanan-body">
								<div class="lacak-pesanan-box-item">
									<h6 style="font-size: 29px; font-weight: 600;">No. Resi: 1234567890 (JNE - Reg)</h6>
									<div style="position: absolute; top: 35px; font-size: 18px;">
										Update terakhir: 26 Februari 2018 | 16.40 WIB
										<img src="asset/kado/icon_wrappingdus2.png" style="margin-top: 5%;">
									</div>
								</div>
								<div style="position: absolute;top: 19%; left: 19%;">
									<div style="font-size: 22px;">
										Ina Cookies Lidah Kucing (x2)
									</div>
									<div style="font-weight: bold; margin-top: 3%; font-size: 15px; font-size: 24px;">
										Rp.200.000
									</div>
								</div>
							</div>
							<div>
								<div class="lacak-pesnan-list-flex">
									<div style="margin-left: 50px;">
										<i class="fa fa-check-circle icon-chacked"></i> Pesanan diterima
									</div>
									<div class="lacak-pesanan-date">
										26 Februari 2018<br>16.04 WIB
									</div>
								</div>
								<hr class="hr-lacak-pesanan">
							</div>
							<div>
								<div class="lacak-pesnan-list-flex">
									<div style="margin-left: 50px;">
										<i class="fa fa-check-circle icon-chacked"></i> [KEPALA GADING, JAKARTA] Delivered
									</div>
									<div class="lacak-pesanan-date">
										26 Februari 2018<br>16.04 WIB
									</div>
								</div>
								<hr class="hr-lacak-pesanan">
							</div>
							<div>
								<div class="lacak-pesnan-list-flex">
									<div style="margin-left: 50px;">
										<i class="fa fa-check-circle icon-chacked"></i> [JAKARTA] Received on destination
									</div>
									<div class="lacak-pesanan-date">
										26 Februari 2018<br>16.04 WIB
									</div>
								</div>
								<hr class="hr-lacak-pesanan">
							</div>
							<div>
								<div class="lacak-pesnan-list-flex">
									<div style="margin-left: 50px;">
										<i class="fa fa-check-circle icon-chacked"></i> [GATEWAY, JAKARATA] On transit
									</div>
									<div class="lacak-pesanan-date">
										26 Februari 2018<br>16.04 WIB
									</div>
								</div>
								<hr class="hr-lacak-pesanan">
							</div>
							<div>
								<div class="lacak-pesnan-list-flex">
									<div style="margin-left: 50px;">
										<i class="fa fa-check-circle icon-chacked"></i> [BANDUNG] Manifested
									</div>
									<div class="lacak-pesanan-date">
										26 Februari 2018<br>16.04 WIB
									</div>
								</div>
								<hr class="hr-lacak-pesanan">
							</div>
							<div>
								<div class="lacak-pesnan-list-flex">
									<div style="margin-left: 50px;">
										<i class="fa fa-check-circle icon-chacked"></i> [BANDUNG] On process
									</div>
									<div class="lacak-pesanan-date">
										26 Februari 2018<br>16.04 WIB
									</div>
								</div>
								<hr class="hr-lacak-pesanan">
							</div>
							<div>
								<div class="lacak-pesnan-list-flex">
									<div style="margin-left: 50px;">
										<i class="fa fa-check-circle icon-chacked""></i> Pesanan dikirim
									</div>
									<div class="lacak-pesanan-date">
										26 Februari 2018<br>16.04 WIB
									</div>
								</div>
								<hr class="hr-lacak-pesanan">
							</div>
							<div>
								<div class="lacak-pesnan-list-flex">
									<div style="margin-left: 50px;">
										<i class="fa fa-check-circle icon-chacked";"></i> Pesanan dibuat
									</div>
									<div class="lacak-pesanan-date">
										26 Februari 2018<br>16.04 WIB
									</div>
								</div>
								<hr class="hr-lacak-pesanan">
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
       function showme(){
        $('#subscribe-popup').attr('class', 'overlay-popup visible active');
       }
       function tutup(){
        $('#subscribe-popup').removeClass('active');
        setTimeout( function(argument) {
            $('#subscribe-popup').removeClass('visible');
        }, 500);
       }

       function showme2(){
        $('#subscribe-popup-2').attr('class', 'overlay-popup visible active');
       }
       function tutup2(){
        $('#subscribe-popup-2').removeClass('active');
        setTimeout( function(argument) {
            $('#subscribe-popup-2').removeClass('visible');
        }, 500);
       }

        function showme3(){
        $('#subscribe-popup-3').attr('class', 'overlay-popup visible active');
       }
       function tutup3(){
        $('#subscribe-popup-3').removeClass('active');
        setTimeout( function(argument) {
            $('#subscribe-popup-3').removeClass('visible');
        }, 500);
       }

       function showme4(){
        $('#subscribe-popup-4').attr('class', 'overlay-popup visible active');
       }
       function tutup4(){
        $('#subscribe-popup-4').removeClass('active');
        setTimeout( function(argument) {
            $('#subscribe-popup-4').removeClass('visible');
        }, 500);
       }

       function showme5(){
        $('#subscribe-popup-5').attr('class', 'overlay-popup visible active');
       }
       function tutup5(){
        $('#subscribe-popup-5').removeClass('active');
        setTimeout( function(argument) {
            $('#subscribe-popup-5').removeClass('visible');
        }, 500);
       }

       function showme6(){
        $('#subscribe-popup-6').attr('class', 'overlay-popup visible active');
       }
       function tutup6(){
        $('#subscribe-popup-6').removeClass('active');
        setTimeout( function(argument) {
            $('#subscribe-popup-6').removeClass('visible');
        }, 500);
       }

       function showme7(){
        $('#subscribe-popup-7').attr('class', 'overlay-popup visible active');
       }
       function tutup7(){
        $('#subscribe-popup-7').removeClass('active');
        setTimeout( function(argument) {
            $('#subscribe-popup-7').removeClass('visible');
        }, 500);
       }

    </script>
@endsection
@include('Parent.footer')