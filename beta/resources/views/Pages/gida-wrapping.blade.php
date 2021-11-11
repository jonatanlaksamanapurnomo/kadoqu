@include('Parent.header')
<style>
#div1,#div2,#div3 {
	float: left;
	width: 100%;
	height: 200px;
	display: inherit;
	border: ;
}
</style>
<script>
	function allowDrop(ev) {
		ev.preventDefault();
		dropzoneValidation();
	}

	function drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
		dropzoneValidation();
	}

	function drop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		ev.target.appendChild(document.getElementById(data));
		dropzoneValidation();
	}
</script>
<style type="text/css" media="screen">
.horizontal-scroll-wrapper {
	width: 600px;
	height: 300px;
	overflow-y: auto;
	overflow-x: hidden;
	transform:rotate(-90deg) translateY(-100px);
	transform-origin: left;

}
.horizontal-scroll-wrapper > div {
	width: 100px;
	height: 100px;
	transform: rotate(90deg);
	transform-origin: left;
} 	
.img-wrapping{
	width: 200px;
}
.img-wrapping.active{
	border: 5px solid;
	border-color: #48A796;
}
.scrolling-wrapper-flexbox {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	width: 100%;
	height: 220px;
}
.scrolling-wrapper-flexbox::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

.scrolling-wrapper-flexbox::-webkit-scrollbar {
	width: 1px;
	background-color: #FFFFFF;
}

.scrolling-wrapper-flexbox::-webkit-scrollbar-thumb {
	background-image: -webkit-gradient(linear,
		left bottom,
		left top,
		color-stop(0.44, rgb(72, 167, 150)),
		color-stop(0.72, rgb(72, 167, 150)),
		color-stop(0.86, rgb(72, 167, 150 )));
	border-radius: 10px;
}
.card {
	flex: 0 0 auto;
}
</style>
<div class="content-push" style="padding-left: 10%;padding-right: 10%;">
	<div class="row" style=" margin-right: 0px; margin-left: 0px;">
		<div class="nopadding col-md-5">
			<div class="nopadding pull-right col-md-6">
				<img src="{{asset('asset/gida/gida_3.png')}}" style="width: 100%;" class="img-responsive">
			</div>
		</div>
		<div class="col-md-7">
			<div class="nopadding col-xs-12">
				<h1 style="font-size: 300%;font-weight: bold; margin-top: 10%">WRAPPING LAB</h1>
				<p style="position: absolute;">Pilih bungkus kado sesuai keinginan kamu untuk <br> orang terdekat tanpa harus repot.</p>
			</div>
		</div>
	</div>
	<div>
		<div style="margin-top: 70px;" class="block-title PT">ISI KERANJANG KAMU</div>
		<div style="width:100%;background-color: #DAEFE8;height: 200px;">
			<div class="scrolling-wrapper-flexbox" id="scrollingme">
				<div id="div3" class="card" ondrop="drop(event)" ondragover="allowDrop(event)">
					<div class="card">
						<div style="margin-top: 35px;margin-left: 20px;cursor: -webkit-grab; cursor: grab;" draggable="true" ondragstart="drag(event)" id="drag1">
							<img src="asset/produk/5a_1_3.jpg" style="width: 100px;pointer-events: none;" />
							<div style="width: 100px;text-align: center;margin-top: 7px;">
								<p>Kaos Panjangggggg</p>
							</div>
						</div>
					</div>
					<div class="card">
					<div style="margin-top: 35px;margin-left: 20px;cursor: -webkit-grab; cursor: grab; "  draggable="true" ondragstart="drag(event)" id="drag2">
						<img src="asset/produk/5a_1_3.jpg" style="width: 100px;pointer-events: none;" />
						<div style="width: 100px;text-align: center;margin-top: 7px;">
							<p>Kaos Panjang</p>
						</div>
					</div>
				</div>
					<div class="card">
					<div style="margin-top: 35px;margin-left: 20px;cursor: -webkit-grab; cursor: grab;" draggable="true" ondragstart="drag(event)" id="drag4">
						<img src="asset/produk/5a_1_3.jpg" style="width: 100px;pointer-events: none;" />
						<div style="width: 100px;text-align: center;margin-top: 7px;">
							<p>Kaos Panjang</p>
						</div>
					</div>
				</div>
				<div class="card">
					<div style="margin-top: 35px;margin-left: 20px;cursor: -webkit-grab; cursor: grab; "  draggable="true" ondragstart="drag(event)" id="drag3">
						<img src="asset/produk/5a_1_3.jpg" style="width: 100px;pointer-events: none;" />
						<div style="width: 100px;text-align: center;margin-top: 7px;">
							<p>Kaos Panjang</p>
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
	<div>
		<div style="margin-top: 70px;" class="block-title PT">APA SAJA YANG MAU DI BUNGKUS</div>
		<div style="width:100%;background-color: #DAEFE8;height: 200px;">
			<div class="scrolling-wrapper-flexbox" id="scrollingme">
				<div id="div1" class="card" ondrop="drop(event)" ondragover="allowDrop(event)">
					<div id="div2" class="card" style="width: 100%;height: 20px;display: flex;justify-content: center;font-size: 30px;margin-top: 85px;">
						<span style="opacity: 0.5">TARIK / DRAG BELANJAAN KESINI UNTUK DIBUNGKUS</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div style="display: flex;align-content: center;justify-content: center;margin-top: 30px;border-bottom: 2px solid;padding-bottom: 40px;border-bottom-color: #48A796;">
		<button type="button" class="button style-7" style="width: 160px;height: 61px;font-size: 27px;font-weight: 600;">MULAI</button>
	</div>
	<div id="wrapping-cover">
		<div class="row">
			<div style="margin-top: 70px;"><span  class="block-title PT">PILIH WRAPPING</span><i style="font-style: italic"> (corak wrapping bisa berubah sewaktu-waktu, kontak CS untuk info lebih lanjut)</i></div>
			<div style="width: 100%;height: 200px;">
				<div class="information-blocks" style="margin: 40px 0px">
					<div class="client-logo-wrapper">
						<div class="swiper-container" data-autoplay="0" data-loop="0" data-speed="500" data-center="0" data-slides-per-view="responsive" data-xs-slides="1" data-int-slides="2" data-sm-slides="3" data-md-slides="4" data-lg-slides="5" data-add-slides="5">
							<div class="swiper-wrapper">
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping active"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
									<div style="width: 100%;position: relative;height: 50px;display: flex;justify-content: center;">
										<div style="width: 30px;height: 30px;position: absolute;bottom: 0;width: 0; height: 0; border-left: 20px solid transparent;border-right: 20px solid transparent;border-bottom: 30px solid #DAEFE8;">

										</div>
									</div>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>

							</div>
							<div class="pagination" style="visibility: hidden;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div style="width:100%;background-color: #DAEFE8;height: 200px;margin-top: 130px;">
				<div class="scrolling-wrapper-flexbox" id="scrollingme">
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" class="img-wrapping active" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div style="margin-top: 70px;"><span  class="block-title PT">PILIH PITA</span><i style="font-style: italic"> (bentuk dan warna bisa berubah sewaktu-waktu, kontak CS untuk info lebih lanjut)</i></div>
			<div style="width: 100%;height: 200px;">
				<div class="information-blocks" style="margin: 40px 0px">
					<div class="client-logo-wrapper">
						<div class="swiper-container" data-autoplay="0" data-loop="0" data-speed="500" data-center="0" data-slides-per-view="responsive" data-xs-slides="1" data-int-slides="2" data-sm-slides="3" data-md-slides="4" data-lg-slides="5" data-add-slides="5">
							<div class="swiper-wrapper">
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping active"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
									<div style="width: 100%;position: relative;height: 50px;display: flex;justify-content: center;">
										<div style="width: 30px;height: 30px;position: absolute;bottom: 0;width: 0; height: 0; border-left: 20px solid transparent;border-right: 20px solid transparent;border-bottom: 30px solid #DAEFE8;"></div>
									</div>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>
								<div class="swiper-slide no-shadow active" data-val="0">
									<a href="#">
										<img src="asset/produk/5a_1_3.jpg" class="img-wrapping"/>
									</a>
									<p style="font-size: 20px;">Kertas Kado Reguler</p>
									<p style="font-size: 20px;font-weight: bold;color: #48A796;">Rp.3000</p>
								</div>

							</div>
							<div class="pagination" style="visibility: hidden;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div style="width:100%;background-color: #DAEFE8;height: 200px;margin-top: 130px;">
				<div class="scrolling-wrapper-flexbox" id="scrollingme">
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" class="img-wrapping active" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
					<div class="card">
						<div class="col-xs-3">
							<div style="margin-top: 45px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="wrapping-info">
		<div class="row">
			<div style="margin-top: 70px;"><span  class="block-title PT">TAMBAH KARTU UCAPAN</span></div>
			<form>
				<div class="col-md-6">
					<div class="row">
						<label class="checkbox-entry radio col-md-6" style="font-size: 15px;font-weight: unset;">
							<input type="radio" name="tanpa-kartu" value="tanpa kartu ucapan"> <span class="check"></span>Tanpa kartu ucapan
						</label>
					</div>
					<div class="clear"></div>
					<div class="col-md-3">
						<label style="font-size: 15px">Jenis acara</label>
					</div>
					<div class="col-md-6">
						<input type="text" name="" placeholder="masukan jenis acara" style="width:100%;box-sizing: border-box;border-color: black;">
					</div>
					<div class="clear"></div>

					<div class="col-md-3">
						<label style="font-size: 15px">Isi ucapan</label>
					</div>
					<div class="col-md-9">
						<textarea name="" placeholder="masukan isi ucapan (max 25 kata)" style="width:100%;border:2px solid;border-color: black;" rows="10"></textarea>
					</div>
					<div class="clear"></div>
				</div>
			</form>
		</div>
		<div style="display: flex;align-content: center;justify-content: center;margin-top: 50px;border-bottom: 2px solid;padding-bottom: 40px;border-bottom-color: #48A796;">
			<button type="button" class="button style-7" style="width: 160px;height: 61px;font-size: 27px;font-weight: 600;">SELESAI</button>
		</div>
	</div>
	<div id="rincian-bungkusan">
		<div class="row" style="margin-top: 60px;">
			<div class="col-md-7">
				<div style="width:100%;background-color: #DAEFE8;height: 200px;">
					<div class="scrolling-wrapper-flexbox" id="scrollingme">
						<div class="card">
							<div style="margin-top: 35px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px;pointer-events: none;" />
								<div style="width: 100px;text-align: center;margin-top: 7px;">
									<p>Kaos Panjangggggg</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div style="margin-top: 35px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px;pointer-events: none;" />
								<div style="width: 100px;text-align: center;margin-top: 7px;">
									<p>Kaos Panjang</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div style="margin-top: 35px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px;pointer-events: none;" />
								<div style="width: 100px;text-align: center;margin-top: 7px;">
									<p>Kaos Panjang</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div style="margin-top: 35px;margin-left: 20px;">
								<img src="asset/produk/5a_1_3.jpg" style="width: 100px;pointer-events: none;" />
								<div style="width: 100px;text-align: center;margin-top: 7px;">
									<p>Kaos Panjang</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-5" style="margin-top: 30px;">
				<div style="width:100%;">
					<table width="100%">
						<thead>
							<tr>
								<th width="70%"><h1 style="font-size: 30px;color: #48A796;font-weight: bold">BIAYA WRAPPING</h1></th>
							</tr>
							<tr>
								<th style="padding-top: 15px;"></th>
							</tr>
							<tr style="font-size: 20px;">
								<th width="50%" style="padding: 5px">Kertas Kado Reguler</th>
								<th width="50%" style="font-weight: bold">Rp3.000</th>
							</tr>
							<tr style="font-size: 20px;">
								<th width="50%" style="padding: 5px">Pita S</th>
								<th width="50%" style="font-weight: bold">Rp3.000</th>
							</tr>
							<tr style="font-size: 20px;">
								<th width="50%" style="padding: 5px">Kertas Kado Reguler</th>
								<th width="50%" style="font-weight: bold">Rp4.000</th>
							</tr>
							<tr style="font-size: 20px;">
								<th width="50%" style="padding: 5px">Kartu Ucapan</th>
								<th width="50%" style="font-weight: bold">Rp3.000</th>
							</tr>
							<tr style="font-size: 20px;border-bottom: 1px solid;border-bottom-color: #48A796">
								<th width="50%" style="padding: 5px">Free Bungkus</th>
								<th width="50%" style="font-weight: bold">Rp5.000</th>
							</tr>
							<tr style="font-size: 20px;">
								<th width="30%" style="padding: 10px;font-weight: bold;text-align: center;">Total</th>
								<th width="50%" style="font-weight: bold">Rp15.000</th>
							</tr>
						</thead>
					</table>
					<div style="display: flex;align-content: center;justify-content: center;margin-top: 50px;">
						<button type="button" class="button style-7" style="width: 185px;height: 61px;font-size: 27px;font-weight: 600;">BUNGKUS !</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	

</div>
@section('scripts')
<script type="text/javascript">
	initSwiper();
	function dropzoneValidation () {
		if ($('#div1').children().length == 1) {
			$('#div2').css('display','')
		} else {
			$('#div2').css('display','none')
		}
	} dropzoneValidation();
</script>
@endsection
@include('Parent.footer')
