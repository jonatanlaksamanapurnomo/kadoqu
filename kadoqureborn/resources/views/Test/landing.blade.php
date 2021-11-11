@extends('layouts.app')

@section('content')
<br>
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators custom-carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <a href=""><img class="d-block w-100" src="{{ asset('img/Landing Page/Photo (slider)/banner-01.jpg') }}" alt="banner-01"></a>
    </div>
    <div class="carousel-item">
      <a href=""><img class="d-block w-100" src="{{ asset('img/Landing Page/Photo (slider)/banner-02.jpg') }}" alt="banner-02"></a>
    </div>
  </div>
</div>
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h5 class="text-center persian-green">KATEGORI PRODUK</h5>
		</div>
	</div>
	<div class="row" id="unggulan-kadoqu">
		<div class="col-md-12">
			
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<h5 class="text-center	 persian-green">TRENDING NOW</h5>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<h5 class="text-center persian-green">BRAND FAVORIT</h5>
		</div>
	</div>
</div>
<br>
<br>
<br>
<br>
<br>

@endsection

@section('scripts')
@endsection