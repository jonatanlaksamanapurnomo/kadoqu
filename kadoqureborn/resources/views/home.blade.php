@extends('layouts.app')

@section('styles')
<link rel="stylesheet" href="{{ asset('owlcarousel/owl.carousel.min.css') }}">
<link rel="stylesheet" href="{{ asset('owlcarousel/owl.theme.default.min.css') }}">

<style>
  .owl-prev, .owl-next {
    font-size: 3em;
  }

  #brand-favorit .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 5em;
  }
  #unggulan-kadoqu {
    background-color: #F0F0EE;
  }

  .gotham-light {
    font-family: 'gotham-light';
    font-size: 1.2em;
  }

  .gotham-medium {
    font-family: 'gotham-medium';
  }

  .gotham-bold {
    font-family: 'gotham-bold';
  }

  #unggulan-kadoqu .row > * {
    line-height: 1;
  }

  #unggulan-kadoqu .row > *:not(:first-child) {
    border-left: 1.4px solid #97D4CC;
  }

  #trending-now > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #trending-now button {
    margin-top: 0.75rem;
    margin-right: 0.75rem;
  }

  #trending-1001-container, #trending-sale-container, #trending-gida-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #trending-1001, #trending-sale, #trending-gida {
    position: absolute;
    line-height: 1;
    padding: 0 1rem 0 2rem;
  }

  #kategori-gift-container, #kategori-store-container  {
    display:flex; 
    flex-direction:column; 
    align-items: center; 
    justify-content: center;
  }

  #kategori-gift-container > .label, #kategori-store-container > .label {
    position: absolute; 
    font-size: 4em; 
    padding-left: 10rem;
  }

</style>
@endsection

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

@include('home.produkterbaru')



<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h4 class="my-4 persian-green text-center gotham-medium">KATEGORI PRODUK</h4>
      <div id="kategori-gift-container">
        <div class="gotham-light label"><span class="gotham-bold">KADOQU</span>GIFT</div>
        <div><a data-toggle="collapse" href="#kategori-gift"><img class="w-100" src="{{ asset('img/Landing Page/Tombol Kategori/bigButtonGift.jpg')}}" alt="KADOQU GIFT"></a></div>
      </div>
      <div class="collapse" id="kategori-gift">
        <div class="card card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </div>
      <br>
      <div id="kategori-store-container">
        <div class="gotham-light label"><span class="gotham-bold">KADOQU</span>STORE</div>
        <div><a data-toggle="collapse" href="#kategori-store"><img class="w-100" src="{{ asset('img/Landing Page/Tombol Kategori/bigButtonStore.jpg')}}" alt="KADOQU STORE"></a></div>
      </div>
      <div class="collapse" id="kategori-store">
        <div class="card card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </div>
    </div>
  </div>
</div>
<div id="unggulan-kadoqu" class="my-5 py-4 gotham-light">
  <div class="container">
    <div class="row">
      <div class="col-md-4 text-center">
        <img style="height: 4.8em" src="{{ asset('img/Landing Page/Unggulan Kadoqu/unggulan_pilih.png')}}" alt="Pilih kado sesuai karakter si dia"> 
        <br><span>Pilih kado sesuai<br>karakter si dia</span>
      </div>
      <div class="col-md-4 text-center">
        <img style="height: 4.8em" src="{{ asset('img/Landing Page/Unggulan Kadoqu/unggulan_bungkus.png')}}" alt="Bungkus rapi kado sesuai keinginanmu"> 
        <br><span>Bungkus rapi kado<br>sesuai keinginanmu</span>
      </div>
      <div class="col-md-4 text-center">
        <img style="height: 4.8em" src="{{ asset('img/Landing Page/Unggulan Kadoqu/unggulan_kirim.png')}}" alt="Kejutan pengiriman langsung buat dia"> 
        <br><span>Kejutan pengiriman<br>langsung buat dia</span>
      </div>
    </div>
  </div>
</div>
<div class="container">
	<div class="row">
		<div class="col-md-12">
      <h4 class="my-4 persian-green text-center gotham-medium">TRENDING NOW</h4>
      <div id="trending-now" class="row">
        <div class="col-md-6">
          <div id="trending-1001-container">
            <div id="trending-1001" class="gotham-light text-right" style="align-self: flex-end; font-size: 2.5em">
              <span class="gotham-bold">1001</span>
              <br>INSPIRASI KADO
              <br><button class="btn btn-primary montserrat">Cek Sekarang</button>
            </div>
            <div><a href=""><img class="w-100" src="{{ asset('img/Landing Page/Banner Trending Now/banner_1001.jpg')}}" alt="1001 INSPIRASI KADO"></a></div>
          </div>
        </div>
        <div class="col-md-6">
          <div id="trending-sale-container">
            <div id="trending-sale" class="gotham-light text-center">
              <span class="gotham-bold" style="font-size: 4em; line-height: 1">SALE</span>
              <br>DISKON MINGGU INI
              <br><button class="btn btn-primary montserrat">Cek Sekarang</button>
            </div>
            <div><a href=""><img class="w-100" src="{{ asset('img/Landing Page/Banner Trending Now/banner_sale.jpg')}}" alt="SALE DISKON MINGGU INI"></a></div>
          </div>
          <div id="trending-gida-container">
            <div id="trending-gida" class="gotham-light text-right">
            </div>
            <div><a href=""><img class="w-100" src="{{ asset('img/Landing Page/Banner Trending Now/banner_gida.jpg')}}" alt="Coming Soon! GIDA (Gift Idea Assistant"></a></div>
          </div>
          </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h4 class="my-4 persian-green text-center gotham-medium">BRAND FAVORIT</h4>
    </div>
    <div class="col-md-1 owl-prev">‹</div>
    <div class="col-md-10">
      <div id="brand-favorit" class="owl-carousel owl-theme">
          <div class="item"><h4>1</h4></div>
          <div class="item"><h4>2</h4></div>
          <div class="item"><h4>3</h4></div>
          <div class="item"><h4>4</h4></div>
          <div class="item"><h4>5</h4></div>
          <div class="item"><h4>6</h4></div>
          <div class="item"><h4>7</h4></div>
          <div class="item"><h4>8</h4></div>
          <div class="item"><h4>9</h4></div>
          <div class="item"><h4>10</h4></div>
          <div class="item"><h4>11</h4></div>
          <div class="item"><h4>12</h4></div>
      </div>
    </div>
    <div class="col-md-1 owl-next">›</div>
  </div>
</div>

@endsection



@section('scripts')
<script src="{{ asset('owlcarousel/owl.carousel.min.js') }}"></script>
<script>
  $(document).ready(function(){
    $('.owl-next').click(function(){
        $(this).siblings().find('.owl-carousel').trigger('next.owl.carousel');
    })
    $('.owl-prev').click(function(){
        $(this).siblings().find('.owl-carousel').trigger('prev.owl.carousel');
    })

    $('#brand-favorit').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      dots:false,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:5
          }
      }
  })
  });


  // Carousel Produk Terbaru

  $('.produk-terbaru-carousel').owlCarousel({
      loop:true,
      margin:10,
      dots:false,
      responsive:{
          0:{
              items:1
          },
          700:{
              items:3
          },
          1200:{
              items:5
          }
      }
  })

</script>
@endsection