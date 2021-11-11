@include('Parent.header')

<title>Detail Produk</title>
<input id="sku" type="hidden">
<input type="hidden" id="harga-guest">
<input type="hidden" id="fotoproduk">
<input type="hidden" id="stock-form">
<input type="hidden" id="idcatgift1">
<input type="hidden" id="idcatgift2">
<input type="hidden" id="idcatstore1">
<input type="hidden" id="idcatstore2">

<div class="content-push" style="padding-left: 10%;padding-right: 10%;">
    <div class="breadcrumb-box">
        <a href="#"><i class="fa fa-home"></i></a>
        <a href="#" id="title1"></a>
        <a href="#" id="title2"></a>
    </div>
    <div id="content-block">

        <div class="content-center" style="padding-left: 0 !important ;
        padding-right: 0 !important ;">
        <!-- HEADER -->
        <div class="information-blocks" id="item-not-ready">
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-11 nopadding">
                        <div class="shine-loading"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-2 nopadding">
                        <div style="height: 20px;margin-top: 20px;">
                            <div class="shine-loading" style="height: 20px"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 nopadding">
                        <div style="height: 20px;margin-top: 20px;">
                            <div class="shine-loading" style="height: 20px"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-7 nopadding">
                        <div style="height: 20px;margin-top: 20px;">
                            <div class="shine-loading" style="height: 20px"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 nopadding">
                        <div style="height: 20px;margin-top: 20px;">
                            <div class="shine-loading" style="height: 20px"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="information-blocks" style="display: none;" id="item-ready">
            <div class="row">
                <div class="col-sm-5 col-md-4 information-entry">
                    <div class="product-preview-box">
                        <div class="swiper-container product-preview-swiper" data-autoplay="0" data-loop="1" data-speed="500" data-center="0" data-slides-per-view="1">
                            <div class="cart-float-label type-item"><span class="star-item"><i class="fa fa-star"></i></span></div>
                            <div class="swiper-wrapper" id="images">
                                 
                            </div>
                            <div class="pagination"></div>
                            <div class="product-zoom-container">
                                <div class="move-box">
                                    <img class="default-image" src="img/product-main-1.jpg" alt="" />
                                    <img class="zoomed-image" src="img/product-main-1-zoom.jpg" alt="" />
                                </div>
                                <div class="zoom-area"></div>
                            </div>
                        </div>
                        <div class="swiper-hidden-edges">
                            <div class="swiper-container product-thumbnails-swiper" data-autoplay="0" data-loop="0" data-speed="500" data-center="0" data-slides-per-view="responsive" data-xs-slides="3" data-int-slides="3" data-sm-slides="3" data-md-slides="4" data-lg-slides="4" data-add-slides="4">
                                <div class="swiper-wrapper" id="images-tumbler">
                                    
                                </div>
                                <div class="pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-7 col-md-7 information-entry" style="margin-left: 20px;">
                    <div class="product-detail-box">
                        <h1 class="product-title bold" style="margin-bottom: 0px;" id="product-title"><!-- Judul --></h1>
                        <h3 class="product-subtitle" id="brand-product">Loremous Clothing</h3>
                        <div class="product-description detail-info-entry" id="product-description"> <!-- Description  --></div>
                        <div class="price detail-info-entry harga">
                            <!-- <div class="prev" style="font-size: 20px">RP90.000</div> -->
                            <div class="current" style="font-size: 25px; font-weight: bold" id="price"><!-- Harga --></div>
                            <div class="stok" id="stock-product"></div>
                        </div>
                        <div class="row">
                            <div class="color-selector detail-info-entry col-md-6">
                                <div class="detail-info-entry-title" id="colour-product">Colour</div>
                                <!-- Colour -->
                                <div class="spacer"></div>
                            </div>
                            <div class="size-selector detail-info-entry col-md-6">
                                <!-- <div class="detail-info-entry-title">Size</div>
                                <div class="entry ukuran active">xs</div>
                                <div class="entry ukuran">s</div>
                                <div class="entry ukuran">m</div>
                                <div class="entry ukuran">l</div>
                                <div class="entry ukuran">xl</div>
                                <div class="spacer"></div> -->
                            </div>
                        </div>
                        <div class="detail-info-entry-title" style="margin-top: 20px;">Quantity</div>
                        <div class="row" style="margin-bottom: 35px;">
                            <div class="quantity-selector detail-info-entry col-md-3" style="margin-bottom:10px;">
                                <div class="entry number-minus">&nbsp;</div>
                                <div class="entry number" id="quantity-product">1</div>
                                <div class="entry number-plus">&nbsp;</div>
                            </div>
                            <div class="detail-info-entry col-md-6">
                                <div id="open-alert-cart-in" class="button style-7-1" onclick="selection()">Beli</div>
                                <!-- <a href="costum%20kado.html" class="button style-7">Bungkus</a> -->
                                <div class="clear"></div>
                            </div>
                        </div>
                        <div class="tags-selector detail-info-entry" style="margin-bottom: 10px">
                            <div class="detail-info-entry-title">Category : </div>
                            <a href="#" id="metakeyword">Woman</a>
                        </div>
                        <!-- <div class="share-box detail-info-entry" style="border-top: 1.4px #228573 solid;border-bottom: 0px;">
                            <div class="socials-box" style="float: left;">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-google-plus"></i></a>
                                <a href="#"><i class="fa fa-youtube"></i></a>
                                <a href="#"><i class="fa fa-linkedin"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                            </div>
                            <div class="clear"></div>
                        </div> -->
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>
</div>
<div class="row-p-2" style="padding-right: 5% !important;padding-left: 5% !important;">
    <div class="container">
        <p class="block-title text-center">Coba Produk Sejenis</p>
        <div class="clear"></div>
    </div>
    <div class="products-swiper" style="text-align: center ;">
        <div class="swiper-container" data-autoplay="0" data-loop="0" data-speed="500" data-center="0" data-slides-per-view="responsive" data-xs-slides="2" data-int-slides="2" data-sm-slides="3" data-md-slides="4" data-lg-slides="5" data-add-slides="5">
            <div id="carousel-not-ready" style="width: 100%;height: 220px;overflow-x: auto; display: flex;align-items: center;justify-content: center;">
                <div class="col-xs-12">
                    <div class="shine-loading"></div>
                </div>
           </div>
            <div class="swiper-wrapper" id="product-carousel-detail" style="display: none;">
               <!-- Carousel -->

               
           </div>
           <div class="pagination"></div>
       </div>
   </div>
</div>
<!-- MODALS -->
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
                                <button class="button style-7 col-md-5 col-sm-6 col-xs-6 button-vocer button-vocer-gida-wrap-2 btn-page-2-btn" onclick="javascript:location.href='shop-cart'">Cek Keranjang!
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
@section('scripts')
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.min.js"></script>
<script type="text/javascript">
     $(function() {
        $('.lazy').Lazy();
    });
    function tutup2(){
        var cek = Cookies.get('token');
    $('#subscribe-popup-2').removeClass('active');
        setTimeout( function(argument) {
            $('#subscribe-popup-2').removeClass('visible');
        }, 500);
        if (cek != undefined) {
        // getDetails(cek);
        location.reload();
        } else {
        // cartGuests();
        location.reload();
        }
    }
    //GET URL Name and value
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    var id = getUrlVars()['id'];

    // Get Detail Product
    function detail() {
        $.ajax({
            url: 'https://admin.kadoqu.com/api/product/'+id+'',
            type: 'GET',
            dataType: 'json',
            data: 'JSON',
            success: function(data) {
                
            },
            complete: function (data) {
                completed();
            }
        }).done(function(data){
            // console.log(data);
            var images = [];
            var listimages;
            var imagestumbler;
            if (data[0].stock.available == 0) {
                $('#open-alert-cart-in').css({
                    'pointer-events': 'none',
                    'background-color' : 'grey'
                });
            }
            $.each(data,function(index, el) {
                $.each(el.images,function(index, el) {
                    images.push(el.gambar);
                });
            });
            $.each(images, function(index, el) {
                if(listimages != undefined){
                    listimages = listimages + `
                <div class="swiper-slide">
                    <div class="product-zoom-image" id="images">
                        <img class="lazy" src="https://admin.kadoqu.com/produk/${el}" alt="" data-zoom="https://admin.kadoqu.com/produk/${el}" />
                    </div>
                </div>
                `;
                imagestumbler = imagestumbler + `
                <div class="swiper-slide">
                    <div class="paddings-container">
                        <img class="lazy" src="https://admin.kadoqu.com/produk/${el}" alt="" />
                    </div>
                </div>
                `;
                } else {
                    listimages = `
                <div class="swiper-slide">
                    <div class="product-zoom-image" id="images">
                        <img class="lazy" src="https://admin.kadoqu.com/produk/${el}" alt="" data-zoom="https://admin.kadoqu.com/produk/${el}" />
                    </div>
                </div>
                `;
                imagestumbler =`
                <div class="swiper-slide">
                    <div class="paddings-container">
                        <img class="lazy" src="https://admin.kadoqu.com/produk/${el}" alt="" />
                    </div>
                </div>
                `;
                }
            });
            $('#title1').html(`<a href="product-category-grid?Brandid=${data[0].brand.idBrand}">${data[0].brand.nameBrand}</a>`);
            $('#title2').text(data[0].namaProduk);
            $('#images').append(listimages);
            $('#images-tumbler').append(imagestumbler);
            $('#product-title').text(data[0].namaProduk);
            $('#price').text(convertToRupiah(data[0].hargaJual.toString()));
            $('#harga-guest').val(data[0].hargaJual);
            $('#product-description').html(data[0].description);
            $('#metakeyword').text(data[0].metaKeyword);
            $('#brand-product').text(data[0].brand.nameBrand);
            $('#stock-product').text('Sisa '+data[0].stock.available+' Stock');
            $('#stock-form').val(data[0].stock.available);
            $('#colour-product').append('<div class="entry active" style="margin-left: 10px; background-color: '+data[0].color.codeColor+';">&nbsp;</div>');
            $('#sku').val(data[0].SKU);
            $('#fotoproduk').val(images[0]);
            $('#idcatgift1').val(data[0].idKategoriGift);
            $('#idcatgift2').val(data[0].idKategoriGift2);
            $('#idcatstore1').val(data[0].idKategoriStore);
            $('#idcatstore2').val(data[0].idKategoriStore2);
            $('#item-not-ready').fadeOut('slow').hide();
            $('#item-ready').fadeIn('slow');
        });
    }
    
    var count_success = 0;
    function completed(){
        count_success++;
        // console.log(count_success)
        if(count_success == 1 ){
            initSwiper();
       }
    }

    //Produk Sejenis
    function productsejenis() {
        $.ajax({
            url: 'https://admin.kadoqu.com/api/products',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let showdata = [];
                showdata.push(data)
                console.log(showdata[0].length)
                if (showdata[0].length > 6) {
                    console.log('terpenuhi')
                    $('#carousel-not-ready').fadeOut('fast').hide();
                    $('#product-carousel-detail').fadeIn('slow');
                }
                let selectionId;
                let listdata;
                if ($('#idcatgift1').val() == "") {} 
                else {
                    selectionId = $('#idcatgift1').val();
                }
                if ($('#idcatgift2').val() == "") {} 
                else {
                    selectionId = $('#idcatgift2').val();
                }
                if ($('#idcatstore1').val() == "") {}
                else {
                    selectionId = $('#idcatstore1').val();
                }
                if ($('#idcatstore2').val() == "") {}
                else {
                    selectionId = $('#idcatstore2').val();
                }

                let tampungData = [];
                $.each(data, function(index, val) {
                     if (val.idKategoriGift == selectionId) {
                        tampungData.push(val);
                     }
                     else if (val.idKategoriGift2 == selectionId) {
                        tampungData.push(val);
                     }
                     else if (val.idKategoriStore == selectionId) {
                        tampungData.push(val);
                     }
                     else if (val.idKategoriStore2 == selectionId) {
                        tampungData.push(val);
                     }
                });
                $.each(tampungData, function(index, el) {
                     if (index <= 5 ) {
                        let data = [];
                        let listdata = '';
                        let text = el.namaProduk;
                        let title = text.length;
                        if (title > 22) {
                           text = text.substr(0,20)+'...';
                        } 
                        $.each(el.images, function(index, el) {
                        data.push(el.gambar);
                        });
                        listdata = `<div class="swiper-slide">
                                <div class="paddings-container">
                                    <div class="product-slide-entry shift-image">
                                        <div class="product-image">
                                        <a href="product-detail?id=${el.SKU}">
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                        </a>
                                        </div>
                                        <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                        <div class="price">
                                            <div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        $('#product-carousel-detail').append(listdata);
                     }
                });
            },
            complete: function (data) {
                // completed();
                resizeCall();
            }
        });
    }
    
    setTimeout(function(){
        detail();
        productsejenis();
    }, 1500);
</script>

<script type="text/javascript">
    function selection() {
        let sku = $('#sku').val();
        let jumlah = parseInt($('#quantity-product').html());
        let namaproduk =  $('#product-title').html();
        let hargaproduk = $('#harga-guest').val();
        let fotoproduk = $('#fotoproduk').val();
        let stock = $('#stock-form').val();
        let jumlahlimit = $('#stock-form').val();
        if (jumlah > stock) {
            swal({
              title: 'Apakah anda yakin ?',
              text: "Stock tinggal tersisa "+stock+" Apakah anda ingin menambahkan ke keranjang?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0ca297',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Iya, Saya mau',
              cancelButtonText: 'Tidak',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
                let check = Cookies.get('token');
                if (check != undefined) {
                 addToChartSwitch(token,stock); 
                } else {
                 guestCookies(sku,stock,jumlahlimit,namaproduk,hargaproduk,fotoproduk);
                } 
              }
            });
        } else if (jumlah <= stock) {
            let check = Cookies.get('token');
            if (check != undefined) {
             addToChart(token); 
            } else {
             guestCookies(sku,stock,jumlah,namaproduk,hargaproduk,fotoproduk);
            } 
       }
        
    }

    //Add To Cart
    function addToChart(token) {
        let sku = $('#sku').val();
        let jumlah = $('#quantity-product').html();
        $.ajax({
            url: 'https://admin.kadoqu.com/api/addtocart',
            type: 'POST',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: {
                SKU: sku,
                jumlah: jumlah
            },
        })
        .done(function() {
            $('#subscribe-popup-2').attr('class', 'overlay-popup visible active');
            return true;
        });
    }
    //add Cart Switch
    function addToChartSwitch(token,stock) {
        let sku = $('#sku').val();
        let jumlah = stock;
        $.ajax({
            url: 'https://admin.kadoqu.com/api/addtocart',
            type: 'POST',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: {
                SKU: sku,
                jumlah: jumlah
            },
        })
        .done(function() {
            $('#subscribe-popup-2').attr('class', 'overlay-popup visible active');
            return true;
        });
    }
</script>

<!-- Cookies Guests -->
<script type="text/javascript">
    Cookies.json = true;
    var guest = Cookies.set("guest") || [];
    function guestCookies(sku,stock,jumlah,namaproduk,hargaproduk,fotoproduk) {
        var exist = false;
            $.each(guest,function(index,value){
                if(value.SKU == sku){
                    jumlah = parseInt(value.jumlah) + parseInt(jumlah);
                    editCart(sku,jumlah);
                    exist = true;
                }
            });
            if(!exist){
            guest.push({
                'SKU': sku,
                'jumlah': jumlah,
                'namaProduk' : namaproduk,
                'hargaProduk' : hargaproduk,
                'fotoProduk' : fotoproduk,
                'stock' : parseInt(stock)
            });   
            }
            $('#subscribe-popup-2').attr('class', 'overlay-popup visible active');
            var test = Cookies.getJSON("guest", guest);
        }
</script>
@endsection
@include('Parent.footer')