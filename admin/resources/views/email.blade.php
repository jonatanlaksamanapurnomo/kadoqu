<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="{{ asset('assets/css/bootstrap.css') }}">
</head>
<body>
<br>
<div class=container>
	<img src="{{ asset('assets/images/logo_kadoqu.png') }}" alt="Logo Kadoqu" title="Logo Kadoqu" width="10%" height="10%">
	<br>
	<br>
	<h6>Dear {{ $order->nama_penerima }},</h6>
	<br>
	<div class="row">
	  <div class="col-sm-4"></div>
	  <div class="col-sm-4"><img src="{{ asset('assets/images/confirm gida.png') }}" alt="Gida" title="Gida" width="100%" height="100%"></div>
	  <div class="col-sm-4"></div>
	</div>
	<br>
	<div class="colored">
		<h3><center>Pesanan Kamu sedang GIdA Proses!</center></h3>
	</div>
	<br>
	<pre><center>Terima Kasih telah berbelanja di Kadoqu.com
	Pembayaran menggunakan Bank Transfer telah dikomfirmasi dan berhasil.</pre></center>
	<br>
	<div class="row">
		<div class="col-sm-3"><h6></h6></div>
		<div class="col-sm-3"><h6>Total Pembayaran</h6></div>
		<div class="col-sm-3"><h6>No. Pemesanan</h6></div>
		<div class="col-sm-3"><h6></h6></div>
	</div>
	<div class="row">
		<div class="col-sm-3"><h6-2></h6-2></div>
		<div class="col-sm-3"><h6-2>Rp 310.000</h6-2></div>
		<div class="col-sm-3"><h6-2>#12345678</h6-2></div>
		<div class="col-sm-3"><h6-2></h6-2></div>
	</div>
	<br>
	<div class="row">
		<div class="col-sm-3"><h6></h6></div>
		<div class="col-sm-3"><h6>Metode Pembayaran</h6></div>
		<div class="col-sm-3"><h6>Waktu Pembayaran</h6></div>
		<div class="col-sm-3"><h6></h6></div>
	</div>
	<div class="row">
		<div class="col-sm-3"><h6-2></h6-2></div>
		<div class="col-sm-3"><h6-2>Bank Transfer</h6-2></div>
		<div class="col-sm-3"><h6-2>Rabu, 31 Oktober 2018 12:00 WIB</h6-2></div>
		<div class="col-sm-3"><h6-2></h6-2></div>
	</div>
	<br>
	<div class="row">
		<div class="col-sm-3"><h6></h6></div>
		<div class="col-sm-3"><h6>Metode Pengiriman</h6></div>
		<div class="col-sm-3"><h6>Alamat Pengiriman</h6></div>
		<div class="col-sm-3"><h6></h6></div>
	</div>
	<div class="row">
		<div class="col-sm-3"><h6-2></h6-2></div>
		<div class="col-sm-3"><h6-2>JNE YES</h6-2></div>
		<div class="col-sm-3"><h6-2>Jl. Prof Eyckman 28P Sukajadi, Bandung, Jawa Barat 40161</h6-2></div>
		<div class="col-sm-3"><h6-2></h6-2></div>
	</div>
	<br>
	<br>
	<div class="container">
		<center>
			<button type="button" class="btn btn-primary btn-lg">Cek Pesanan</button>
		</center>
	</div>
	<br>
	<br>
	<hr>
	<h6>Detail Pesanan #12345678</h6>
	<div class=row>
		<div class="col-sm-8">
			<div class=row>
				<div class="col-sm-4"><img src="{{ asset('assets/images/contoh cemilin.jpg') }}" width="80%" height="90%">
				</div>
				<div class="col-sm-8">
					<h6-2>Cemilin Rasa Pedas</h6-2>
					<br><br>
					<div class=row>
						<div class="col-sm-4"><h6>Harga</h6></div>
						<div class="col-sm-4"><h6>Jumlah</h6></div>
						<div class="col-sm-4"><h6>Total</h6></div>
					</div>
					<div class=row>
						<div class="col-sm-4"><h6-3>Rp 100.000</h6-3></div>
						<div class="col-sm-4"><h6-3>2</h6-3></div>
						<div class="col-sm-4"><h6-3>Rp 200.000</h6-3></div>
					</div>
				</div>

			</div>
			<div class=row>
				<div class="col-sm-4"><img src="{{ asset('assets/images/contoh cemilin.jpg') }}" width="80%" height="90%">
				</div>
				<div class="col-sm-8">
					<h6-2>Cemilin Rasa Pedas</h6-2>
					<br><br>
					<div class=row>
						<div class="col-sm-4"><h6>Harga</h6></div>
						<div class="col-sm-4"><h6>Jumlah</h6></div>
						<div class="col-sm-4"><h6>Total</h6></div>
					</div>
					<div class=row>
						<div class="col-sm-4"><h6-3>Rp 100.000</h6-3></div>
						<div class="col-sm-4"><h6-3>2</h6-3></div>
						<div class="col-sm-4"><h6-3>Rp 200.000</h6-3></div>
					</div>
				</div>

			</div>
		</div>
		<div class="col-sm-4" style="background-color: #ecf8f8; padding-top: 30px; padding-bottom: 30px; padding-left: 50px; padding-right: 50px;">
				<div class="row">
					<div class="col-sm-6"><h6-3>Total harga barang</h6-3></div>
					<div class="col-sm-6"><h6-3>Rp 300.000</h6-3></div>
				</div>
				<br>
				<div class="row">
					<div class="col-sm-6"><h6-3>Biaya pengiriman</h6-3></div>
					<div class="col-sm-6"><h6-3>Rp 20.000</h6-3></div>
				</div>
				<br>
				<div class="row">
					<div class="col-sm-6"><h6-3>Jasa bungkus</h6-3></div>
					<div class="col-sm-6"><h6-3>Rp 10.000</h6-3></div>
				</div>
				<br>
				<div class="row">
					<div class="col-sm-6"><h6-3 style="color: red;">Potongan diskon</h6-3></div>
					<div class="col-sm-6"><h6-3 style="color: red;">Rp 20.000</h6-3></div>
				</div>
				<hr>
				<div class="row">
					<div class="col-sm-6"><h6>Grand Total</h6></div>
					<div class="col-sm-6"><h6>Rp 310.000</h6></div>
				</div>
		</div>
	</div>
	<br>
	<hr>
	<pre><center>Jika kamu memiliki pertanyaan, silahkan kontak kami di hello@kadoqu.com
	atau kontak GIdA di 08123456789</center></pre>
	<center>
	<a href="#" class="btn btn-secondary btn-sm active" style="background-color: #485e90" role="button" aria-pressed="true"><img src="assets/images/facebook.png" alt="facebook" title="facebook" width="50%" height="50%"></a>
	<a href="#" class="btn btn-secondary btn-sm active" style="background-color: #7e5f40" role="button" aria-pressed="true"><img src="assets/images/instagram.png" alt="instagram" title="instagram" width="100%" height="100%"></a>
	</center>
	<br>
</div>
</body>
</html>