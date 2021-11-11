@include('Parent.header')
<title>Item List</title>
<div class="information-blocks">
    <div class="row">
        <div class="col-lg-12" id="banner-title">
            <!-- Banner & Title -->
        </div>
    </div>
</div>
<div class="content-push" style="padding-left: 10%;padding-right: 10%;">

    <div class="breadcrumb-box">
        <a href="{{url('/')}}"><i class="fa fa-home"></i></a>
        <a href="#" id="title1"></a>
        <a href="#" id="title2"></a>
    </div>

    <div class="information-blocks">
        <div class="row">
            <div class="col-md-4 col-sm-12 col-xs-12 blog-sidebar item-kat">
                <div class="information-blocks hidden-lg hidden-md hea"style="box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3)">
                    <div id="b-fil-mobile" class="row" style="text-align: center;border-top: 1px #f3f3ee solid;">
                        <div class="col-xs-4"><div id="show-filter"><i class="fa fa-filter block-title g-font" style="float: left"></i></div></div>
                        <div class="col-xs-4"><p class="block-title g-font">Kategory</p></div>
                        <div class="col-xs-4">
                            <div style="float: right">
                            <i class="fa fa-th g-font"></i>
                            <i class="fa fa-list g-font"></i>
                            </div>
                        </div>
                    </div>
                    <div id="a-fil-mobile" style="background: #00968a"><i class="fa fa-filter block-title white-font"> filter</i></div>
                </div>
                <style type="text/css" media="screen">
                </style>
                <div id="bod" class="information-blocks cat-grid-container">
                    <div class="information-entry products-list side-shop">
                        <div class="accordeon">
                            <div class="inline-product-entry" id="subcat-position" style="display: none;">
                                <h3 class="block-title inline-product-column-title accordeon-title" id="sub-cat-title"><!-- title sub cat --></h3>
                                <div class="article-container">
                                    <ul id="list-sub-cat">
                                        <!-- list sub cat -->
                                    </ul>
                                </div>
                            </div>
                            <div class="inline-product-entry">
                                <div class="block-title size-2 inline-product-column-title accordeon-title">Price</div>
                                <div class="accordeon-entry">
                                    <div class="range-wrapper" style="margin-top: 5px">
                                        <div id="prices-range"></div>
                                        <div class="range-price">
                                            Price:
                                            <div class="min-price"><b>Rp.<span></span></b></div>
                                            <b>-</b>
                                            <div class="max-price"><b>Rp.<span></span></b></div>
                                        </div>
                                        <a onclick="filterByPrice()" class="button style-7">filter</a>
                                    </div>
                                </div>
                            </div>
                            <div class="inline-product-entry">
                                <h3 class="block-title inline-product-column-title accordeon-title">Color</h3>
                                <div class="color-selector detail-info-entry accordeon-entry" id="show-colour">
                                    <!-- Colour -->
                                </div>
                                <div class="clear"></div>
                            </div>

                            <div class="inline-product-entry">
                                <h3 class="block-title inline-product-column-title accordeon-title">Size</h3>
                                <div class="size-selector detail-info-entry  accordeon-entry" id="show-size">
                                    <!-- Sizes -->
                                </div>
                                <div class="clear"></div>
                            </div>

                            <div class="inline-product-entry" style="border-bottom: 0px !important;">
                                <h3 class="block-title inline-product-column-title accordeon-title">Brands</h3>
                                <div class="row  accordeon-entry" id="filtercheckbox">
                                    <div class="col-md-6 col-sm-12 col-xs-6" id="brand1">
                                <!-- Brand1 -->
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-6" id="brand2">
                                <!-- Brand2 -->
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>

                           <!--  <div class="inline-product-entry hidden-md hidden-sm hidden-lg" style="border-bottom: 0px !important;">
                                <h3 class="block-title inline-product-column-title accordeon-title">Sort</h3>
                                <div class="row  accordeon-entry">
                                    <div class="col-md-6 col-sm-12 col-xs-6">
                                        <label class="checkbox-entry">
                                            <input type="checkbox" /> <span class="check"></span> Position
                                        </label>
                                        <label class="checkbox-entry">
                                            <input type="checkbox" /> <span class="check"></span> Price
                                        </label>
                                        <label class="checkbox-entry">
                                            <input type="checkbox" /> <span class="check"></span> Katgori
                                        </label>
                                        <label class="checkbox-entry">
                                            <input type="checkbox" /> <span class="check"></span> Rating
                                        </label>
                                        <label class="checkbox-entry">
                                            <input type="checkbox" /> <span class="check"></span> color
                                        </label>
                                    </div>
                                </div>
                                    <div class="button style-7 col-xs-12">pasang</div>
                                <div class="clear"></div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-8 col-sm-9 m-categori">
                <div class="page-selector" style="padding-top: 1px">
                    <div class="pages-box ">

                    </div>
                    <div class="shop-grid-controls hidden-sm hidden-xs" style="margin-right: 0px ;">
                        <!-- <div class="entry col-md-6">
                            <div class="inline-text hi">Sorty by</div>
                            <div class="simple-drop-down">
                                <select>
                                    <option>Position</option>
                                    <option>Price</option>
                                    <option>Category</option>
                                    <option>Rating</option>
                                    <option>Color</option>
                                </select>
                            </div>
                            <div class="sort-button"></div>
                        </div> -->
                        <div class="row col-md-6" style="float: right; padding-right: 0px;">
                            <div class="entry" style="margin-right: 0px; float: right;">
                                <div class="view-button active grid" onclick="change2()"><i class="fa fa-th"></i></div>
                                <div class="view-button list" onclick="change()"><i class="fa fa-list"></i></div>
                            </div>
                            <div class="entry" style="margin-right: 0px; float: right;">
                                <div class="inline-text">Show</div>
                                <div class="simple-drop-down" style="width: 75px;">
                                    <select id="number-of-items">
                                        <option value="12">12</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="all-item">all</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="row shop-grid grid-view" id="grid-product">
                    <div id="animation-preloader-item"></div>
                    <!-- Product  Grid -->
                </div>
                <div class="page-selector" style="border-top: 1px #f0f0f0 solid; margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <!-- <div class="simple-drop-down" style="width: 75px;">
                                <select>
                                    <option>12</option>
                                    <option>20</option>
                                    <option>30</option>
                                    <option>40</option>
                                    <option>all</option>
                                </select>
                            </div> -->
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div id="paging" class="pages-box">
                                <a href="javascript:void(0)" onclick="list(1)" class="square-button active">1</a>
                                <a href="javascript:void(0)" onclick="list(2)" class="square-button">2</a>
                                <a href="javascript:void(0)" onclick="list(3)" class="square-button">3</a>
                                <div class="divider">...</div>
                                <a href="#" class="square-button"><i class="fa fa-angle-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.plugins.min.js"></script>
<script src="{{asset('js/jquery-ui.min.js')}}"></script>
<script type="text/javascript">
       $(function() {
        $('.lazy').lazy({
                placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7..."
            });
        }); 
        //OPTIONAL
        function change() {
            $('.product-image').css({"position": "absolute", "top": "10%"});
        }
        function change2() {
            $('.product-image').css({"position": "relative","top": ""});
        }
        //END

       function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }

        var uri = '';
        var Giftid      = getUrlVars()['Giftid'];
        var Storeid     = getUrlVars()['Storeid'];
        var Colours     = getUrlVars()['Colours'];
        var Sizes       = getUrlVars()['Sizes'];
        var KadoquGift  = getUrlVars()['KadoquGift'];
        var KadoquStore = getUrlVars()['KadoquStore'];
        var Keyword     = getUrlVars()['keyword'];
        var Brandid     = getUrlVars()['Brandid'];
        var idSub       = getUrlVars()['idSub'];
        // console.log('Gift id = ' + Giftid);    
        // console.log('Store id = ' + Storeid); 
        /* Line 957 - 969
            Pengecekan url jika masuk dalam url Gift category
            maka akan ditampilkan uri ke gift category,
            dan jika masuk ke uri Store category, maka akan masuk 
            ke url Store category
        */
        if (typeof Giftid == 'undefined') {
            // console.log('Gift tidak ada'); ->kosongin aja
        } else if (typeof Giftid != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/gift_category/'+Giftid+' ';
        }
        if (typeof Storeid == 'undefined') {
            // console.log('Store tidak ada');  ->kosongin aja
        } else if (typeof Storeid != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/store_category/'+Storeid+' ';
            if (Storeid == 1 || Storeid == 2) {
                subCategory();
            } else { }
        }
        if (typeof Colours == 'undefined') {
            // console.log('Store tidak ada');  ->kosongin aja
        } else if (typeof Colours != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/colors/'+Colours+' ';
            $('#title1').text('Color');
        } if (typeof Sizes == 'undefined') {
            // console.log('Store tidak ada');  ->kosongin aja
        } else if (typeof Sizes != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/sizes/'+Sizes+' ';
            $('#title1').text('Size');
        } if (typeof KadoquGift == 'undefined') {
            //Kosonin aja
        } else if (typeof KadoquGift != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/gift_category';
            $('#title1').text('Kadoqu Gift');
        } if (typeof KadoquStore == 'undefined') {
            //Kosonin aja
        } else if (typeof KadoquStore != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/store_category';
            $('#title1').text('Kadoqu Store');
        } if (typeof Keyword == 'undefined') {
            //Kosonin aja
        } else if (typeof Keyword != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/products?keyword='+Keyword;
            $('#title1').text('Search');
            $('#title2').text(Keyword);
            searchEngine();
        } if (typeof Brandid == 'undefined') {
            //Kosonin aja
        } else if (typeof Brandid != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/brands/'+Brandid;
            $('#title1').text('Brand');
            $('#title2').css("display","none");
        } if (typeof idSub == 'undefined') {
            // console.log('Gift tidak ada'); ->kosongin aja
        } else if (typeof idSub != 'undefined') {
            uri = 'https://admin.kadoqu.com/api/sub_category_store/'+idSub+' ';
            $('#title1').text('Sub Kategori');
        }


        function titleGift() {
            $.ajax({
                url: 'https://admin.kadoqu.com/api/gift_category/'+Giftid+'',
                type: 'GET',
                dataType: 'json',
                data: 'JSON',
                success:  function (data) {
                        // console.log('ini '+ data.nameKategoriGift);
                        $('#banner-title').html(`<img class="project-thumbnail" src="https://admin.kadoqu.com/img/${data.banner}" alt="" />
                        <div class="katagori-title" id="title">${data.nameKategoriGift}</div>`);
                        $('#title1').text('Kadoqu Gift');
                        $('#title2').text(data.nameKategoriGift);
                    }
                });
            }
            titleGift();
            function titleStore() {
            $.ajax({
                url: 'https://admin.kadoqu.com/api/store_category/'+Storeid+'',
                type: 'GET',
                dataType: 'json',
                data: 'JSON',
                success:  function (data) {
                        console.log('ini '+ data.kategoriStore);
                        $('#banner-title').html('<img class="project-thumbnail" src="https://admin.kadoqu.com/img/'+data.banner+'" alt="" />'+
                    '<div class="katagori-title" id="title">'+data.kategoriStore+'</div>');
                        $('#title1').text('Kadoqu Store');
                        $('#title2').text(data.kategoriStore);
                    }
                });
            }
            titleStore();


        function list(arg = 1) {
            $.ajax({
            url: uri+'/products?page='+arg+' ',
            type: 'GET',
            dataType: 'json',
            data: 'JSON',
            success: function(data) {
                var listdata;
                var paging = "";

                if (data.data.length) {

                    paging = paging + '<a href="javascript:void(0)" onclick="list('+(parseInt(arg)-1)+')" class="square-button"><i class="fa fa-angle-left"></i></a>';
                    if(arg !== 1) {
                        paging = paging + '<div class="divider">...</div>';
                    }
                    for (var i = arg - 1; i < data.last_page; i++) {
                        paging = paging+'<a href="javascript:void(0)" onclick="list('+(parseInt(i)+1)+')" class="square-button">'+(parseInt(i)+1)+'</a>';
                        if(arg + 2 == i) {
                            paging = paging + '<div class="divider">...</div>';
                            break;
                        }
                    }
                    paging = paging + '<a href="javascript:void(0)" onclick="list('+(parseInt(arg)+1)+')" class="square-button"><i class="fa fa-angle-right"></i></a>';

                    $.each(data.data, function(index, el) {
                    //masih blueprint
                    // console.log(el);
                    var data = [];
                    let text = el.namaProduk;
                    let title = text.length;
                    if (title > 22) {
                       text = text.substr(0,20)+'...';
                    } 
                    $.each(el.images, function(index, el) {
                        // console.log(el.gambar);
                        data.push(el.gambar);
                    });
                    if(listdata != undefined){
                        listdata = listdata +  `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>`+
                                        // <div class="product-image-label type-1"><span>NEW</span></div>
                                        // `<div class="bottom-line">
                                        //     <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                        //         <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                        //         <a class="bottom-line-a square" href="product-detail?id=${el.SKU}"><i class="fa fa-eye "></i></a>
                                        //         <a class="bottom-line-a square"><i class="fa fa-star"></i></a>`+
                                        //         // <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                        //     `</div>
                                        // </div>
                                    `</div>`+
                                    // <div class="rating-box">
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star none"><i class="fa fa-star"></i></div>
                                    // </div>
                                    `<a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>${el.metaDescription}</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>`;
                        } else {
                            var data = [];
                            let text = el.namaProduk;
                            let title = text.length;
                            if (title > 22) {
                               text = text.substr(0,20)+'...';
                            } 
                            $.each(el.images, function(index, el) {
                                // console.log(el.gambar);
                                data.push(el.gambar);
                            });
                            listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>`+
                                        // <div class="product-image-label type-1"><span>NEW</span></div>
                                        // `<div class="bottom-line">
                                        //     <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                        //         <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                        //         <a class="bottom-line-a square" href="product-detail?id=${el.SKU}"><i class="fa fa-eye "></i></a>
                                        //         <a class="bottom-line-a square"><i class="fa fa-star"></i></a>`+
                                        //         // <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                        //     `</div>
                                        // </div>
                                    `</div>`+
                                    // <div class="rating-box">
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star none"><i class="fa fa-star"></i></div>
                                    // </div>
                                    `<a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>${el.metaDescription}</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                        `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>`;
                        }
                    
                });
                } if(data.data.length == 0) {
                    listdata = "<div style='font-size: 50px;margin-left: 16%'>Barang Belum Tersedia</div>";
                }
                $('#paging').html(paging);
                $('#grid-product').html(listdata);
            }
        });
        } list();

        function searchEngine(arg = 1) {
            $.ajax({
            url: uri+'&page='+arg+'&limit=12',
            type: 'GET',
            dataType: 'json',
            data: 'JSON',
            success: function(data) {
                var listdata;
                var paging = "";

                if (data.data.length) {
                    paging = paging + '<a href="javascript:void(0)" onclick="searchEngine('+(parseInt(arg)-1)+')" class="square-button"><i class="fa fa-angle-left"></i></a>';
                    if(arg !== 1) {
                        paging = paging + '<div class="divider">...</div>';
                    }
                    for (var i = arg - 1; i < data.last_page; i++) {
                        paging = paging+'<a href="javascript:void(0)" onclick="searchEngine('+(parseInt(i)+1)+')" class="square-button active">'+(parseInt(i)+1)+'</a>';
                        if(arg + 2 == i) {
                            paging = paging + '<div class="divider">...</div>';
                            break;
                        }
                    }
                    paging = paging + '<a href="javascript:void(0)" onclick="list('+(parseInt(arg)+1)+')" class="square-button"><i class="fa fa-angle-right"></i></a>';

                    $.each(data.data, function(index, el) {
                    //masih blueprint
                    // console.log(el);
                    var data = [];
                    let text = el.namaProduk;
                    let title = text.length;
                    if (title > 22) {
                       text = text.substr(0,20)+'...';
                    } 
                    $.each(el.images, function(index, el) {
                        // console.log(el.gambar);
                        data.push(el.gambar);
                    });
                    if(listdata != undefined){
                        listdata = listdata +  `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>`+
                                        // <div class="product-image-label type-1"><span>NEW</span></div>
                                        // `<div class="bottom-line">
                                        //     <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                        //         <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                        //         <a class="bottom-line-a square" href="product-detail?id=${el.SKU}"><i class="fa fa-eye "></i></a>
                                        //         <a class="bottom-line-a square"><i class="fa fa-star"></i></a>`+
                                        //         // <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                        //     `</div>
                                        // </div>
                                    `</div>`+
                                    // <div class="rating-box">
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star none"><i class="fa fa-star"></i></div>
                                    // </div>
                                    `<a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>${el.metaDescription}</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>`;
                        } else {
                            var data = [];
                            let text = el.namaProduk;
                            let title = text.length;
                            if (title > 22) {
                               text = text.substr(0,20)+'...';
                            } 
                            $.each(el.images, function(index, el) {
                                // console.log(el.gambar);
                                data.push(el.gambar);
                            });
                            console.log(data[0]);
                            listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>`+
                                        // <div class="product-image-label type-1"><span>NEW</span></div>
                                        // `<div class="bottom-line">
                                        //     <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                        //         <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                        //         <a class="bottom-line-a square" href="product-detail?id=${el.SKU}"><i class="fa fa-eye "></i></a>
                                        //         <a class="bottom-line-a square"><i class="fa fa-star"></i></a>`+
                                        //         // <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                        //     `</div>
                                        // </div>
                                    `</div>`+
                                    // <div class="rating-box">
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star get"><i class="fa fa-star"></i></div>
                                    //     <div class="star none"><i class="fa fa-star"></i></div>
                                    // </div>
                                    `<a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>${el.metaDescription}</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                        `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>`;
                        }
                    
                });
                } if(data.data.length == 0) {
                    listdata = "<div style='font-size: 50px'>Barang Belum Tersedia</div>";
                }
                $('#paging').html(paging);
                $('#grid-product').html(listdata);
            }
        });
        }

        function colours() {
            $.ajax({
                url: uri+'/products',
                type: 'GET',
                dataType: 'json',
                crossDomain: true,
                success: function(data) {
                    let listdata;
                    let colorList=[];
                    $.each(data, function(index, val) {
                        if (colorList.includes(val.color.codeColor)) {

                         } else {
                            colorList.push({"idColor" : val.color.idColor, "codeColor" : val.color.codeColor});
                         }
                    });
                    var obj = {};
                    for ( var i=0, len=colorList.length; i < len; i++ )
                        obj[colorList[i]['codeColor']] = colorList[i];
                    colorList= new Array();
                    for ( var key in obj )
                        colorList.push(obj[key]);
                    $.each(colorList, function(index, val) {
                         if (listdata != undefined) {
                            listdata = listdata + 
                            `<a onclick="filterByColor('${val.idColor}')" class="color">
                                <div style="background-color: ${val.codeColor};" class="entry"></div>
                                <a/>`;
                            } else {
                            listdata = 
                            `<a onclick="filterByColor('${val.idColor}')"  class="color">
                                <div style="background-color: ${val.codeColor};" class="entry"></div>
                                <a/>`;
                            }
                    });
                    $('#show-colour').append(listdata);
                }
            });
        }  colours();

        function sizes () {
            $.ajax({
                url: uri+'/products',
                type: 'GET',
                dataType: 'json',
                crossDomain: true,
                success: function (data) {
                    let listdata;
                    let listSize = [];
                    $.each(data, function(index, el) {
                        if (el.size == null) {
                            return false;
                         } 
                        if (listSize.includes(el.size.ukuran)) {

                         } else {
                            listSize.push({"idUkuran" : el.size.idUkuran, "ukuran" : el.size.ukuran});
                         }                          
                    });
                    var obj = {};
                    for ( var i=0, len=listSize.length; i < len; i++ )
                        obj[listSize[i]['ukuran']] = listSize[i];
                    listSize= new Array();
                    for ( var key in obj )
                        listSize.push(obj[key]);
                    $.each(listSize, function(index, val) {
                         if (listdata != undefined) {
                        listdata = listdata + `
                        <a class="size" onclick="filterBySize('${val.idUkuran}')">
                            <div class="entry">${val.ukuran}</div>
                        </a>`;
                        } else {
                        listdata = `
                        <a class="size" onclick="filterBySize('${val.idUkuran}')">
                            <div class="entry">${val.ukuran}</div>
                        </a>
                        `;
                        }
                    });
                    $('#show-size').append(listdata);
                }
            });
        } sizes();
        
        let brandArray;

        function brands() {
            $.ajax({
                url: uri+'/products',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    let listdata1;
                    let listdata2;
                    let brandList = [];
                    $.each(data, function(index, val) {
                         if (brandList.includes(val.brand.nameBrand)) {

                         } else {
                            brandList.push({"idBrand" : val.brand.idBrand, "nameBrand" : val.brand.nameBrand});
                         }
                    });
                    var obj = {};
                    for ( var i=0, len=brandList.length; i < len; i++ )
                        obj[brandList[i]['nameBrand']] = brandList[i];
                    brandList= new Array();
                    for ( var key in obj )
                        brandList.push(obj[key]);
                    $.each(brandList, function(index, el) {
                        if (index <= 11 ) {
                            listdata1 = `
                            <label class="checkbox-entry">
                                    <input type="checkbox" class="checkbox-brand" value="${el.idBrand}" /> 
                                    <span class="check"></span> ${el.nameBrand}
                            </label>`;
                            $('#brand1').append(listdata1);
                            } if (index >= 12) {
                            listdata2 = `
                            <label class="checkbox-entry">
                                    <input type="checkbox" class="checkbox-brand" value="${el.idBrand}" /> 
                                    <span class="check"></span> ${el.nameBrand}
                            </label>`;
                            $('#brand2').append(listdata2);
                            }
                    });
                    brandArray = [];
                    $('.checkbox-entry').on('click', '.checkbox-brand', function() {
                        if ($(this).prop('checked') == true) {
                            var a = $(this).val();
                            brandArray.push(a);
                        } else {
                            index = brandArray.map(function(e) { return e; }).indexOf($(this).val());
                            brandArray.splice(index,1);
                        }
                        filterByBrand(brandArray);
                    });
                    // console.log(brandArray);
                }
            });
            
        } brands();

        function priceSortir() {
            $.ajax({
                url: uri+'/products',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    let priceSort = [];
                    let listdata;
                    $.each(data, function(index, el) {
                         if (priceSort.includes(el.hargaJual)) {

                         } else {
                            priceSort.push( el.hargaJual);
                         }
                    });
                    var obj = {};
                    for ( var i=0, len=priceSort.length; i < len; i++ )
                        obj[priceSort[i]] = priceSort[i];
                    priceSort= new Array();
                    for ( var key in obj )
                        priceSort.push(obj[key]);
                    var penyortiranHarga = priceSort.sort(function(a, b){return a - b});
                    var minHarga = parseInt(penyortiranHarga[0]);
                    var maxHarga = parseInt(penyortiranHarga[penyortiranHarga.length - 1 ]);
                    $('.min-price span').text(minHarga);
                    $('.max-price span').text(maxHarga);
                    $("#prices-range").slider({
                        range: true,
                        min: minHarga,
                        max: maxHarga,
                        step: 5,
                        values: [minHarga, maxHarga],
                        slide: function(event, ui) {
                            $('.min-price span').text(ui.values[0]);
                            $('.max-price span').text(ui.values[1]);
                        }
                    });
                }
            });
        } priceSortir();

        //Subcategory waniota pria
        function subCategory() {
            $.ajax({
                url: 'https://admin.kadoqu.com/api/store_category/'+Storeid,
                type: 'GET',
                dataType: 'json',
                crossDomain: true,
                success: function(data) {
                    let listdata;
                    $.each(data.sub_category, function(index, el) {
                        if (listdata != undefined) {
                            listdata = listdata + `
                            <li><a onclick="filterBySubCategory('${el.idSubKategoriStore}')">${el.nameSubKategoriStore}</a></li>`;
                        } else {
                            listdata = `<li><a onclick="filterBySubCategory('${el.idSubKategoriStore}')">${el.nameSubKategoriStore}</a></li>`;
                        }
                    });
                    $('#sub-cat-title').text(data.kategoriStore);
                    $('#list-sub-cat').append(listdata);
                    $('#subcat-position').show();
                }
            });  
        }
</script>
<script type="text/javascript">
    //FILTERING ITEMS

    //Number of items to show
    $('#number-of-items').on('change', function() {
        let totalLists = $('#number-of-items').val();
        $.ajax({
            url: 'https://admin.kadoqu.com/api/products',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let tampungData = [];
                let listdata = "";
                var paging = "";
                var totalPaging;
                $.each(data, function(index, val) {
                   tampungData.push(val);
                });
                var i ;
                for (i = 0, l = tampungData.length; i < l; ++i) {
                    i++;
                }
                if (totalLists == "all-item") {
                    $.each(tampungData, function(index, el) {
                    if (index <= i) {
                        var data = [];
                        let text = el.namaProduk;
                        let title = text.length;
                        if (title > 22) {
                           text = text.substr(0,20)+'...';
                        }
                        $.each(el.images, function(index, el) {
                            data.push(el.gambar);
                        });
                        if(listdata != undefined){
                            listdata = listdata +  `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                    <div class="product-slide-entry text-center shift-image carousel-slides">
                                        <div class="product-image">
                                        <a href="product-detail?id=${el.SKU}">
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                        </a>`+
                                            // <div class="product-image-label type-1"><span>NEW</span></div>
                                            // `<div class="bottom-line">
                                            //     <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                            //         <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                            //         <a class="bottom-line-a square" href="product-detail?id=${el.SKU}"><i class="fa fa-eye "></i></a>
                                            //         <a class="bottom-line-a square"><i class="fa fa-star"></i></a>`+
                                            //         // <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                            //     `</div>
                                            // </div>
                                        `</div>`+
                                        // <div class="rating-box">
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star none"><i class="fa fa-star"></i></div>
                                        // </div>
                                        `<a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                        <div class="article-container style-1">
                                            <p>${el.metaDescription}</p>
                                        </div>
                                        <div class="price">`+
                                            // <div class="prev">Rp. ${el.hargaDasar}</div>
                                           `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                        </div>
                                        <div class="list-buttons">
                                            <a class="button style-10">Add to cart</a>
                                            <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>`;
                            } else {
                                var data = [];
                                let text = el.namaProduk;
                                let title = text.length;
                                if (title > 22) {
                                   text = text.substr(0,20)+'...';
                                } 
                                $.each(el.images, function(index, el) {
                                    // console.log(el.gambar);
                                    data.push(el.gambar);
                                });
                                listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                    <div class="product-slide-entry text-center shift-image carousel-slides">
                                        <div class="product-image">
                                        <a href="product-detail?id=${el.SKU}">
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                        </a>`+
                                            // <div class="product-image-label type-1"><span>NEW</span></div>
                                            // `<div class="bottom-line">
                                            //     <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                            //         <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                            //         <a class="bottom-line-a square" href="product-detail?id=${el.SKU}"><i class="fa fa-eye "></i></a>
                                            //         <a class="bottom-line-a square"><i class="fa fa-star"></i></a>`+
                                            //         // <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                            //     `</div>
                                            // </div>
                                        `</div>`+
                                        // <div class="rating-box">
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star none"><i class="fa fa-star"></i></div>
                                        // </div>
                                        `<a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                        <div class="article-container style-1">
                                            <p>${el.metaDescription}</p>
                                        </div>
                                        <div class="price">`+
                                            // <div class="prev">Rp. ${el.hargaDasar}</div>
                                            `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                        </div>
                                        <div class="list-buttons">
                                            <a class="button style-10">Add to cart</a>
                                            <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>`;
                            }
                       }
                    });
                } else {
                    $.each(tampungData, function(index, el) {
                    if (index < totalLists) {
                        var data = [];
                        let text = el.namaProduk;
                        let title = text.length;
                        if (title > 22) {
                           text = text.substr(0,20)+'...';
                        }
                        $.each(el.images, function(index, el) {
                            data.push(el.gambar);
                        });
                        if(listdata != undefined){
                            listdata = listdata +  `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                    <div class="product-slide-entry text-center shift-image carousel-slides">
                                        <div class="product-image">
                                        <a href="product-detail?id=${el.SKU}">
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                        </a>`+
                                            // <div class="product-image-label type-1"><span>NEW</span></div>
                                            // `<div class="bottom-line">
                                            //     <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                            //         <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                            //         <a class="bottom-line-a square" href="product-detail?id=${el.SKU}"><i class="fa fa-eye "></i></a>
                                            //         <a class="bottom-line-a square"><i class="fa fa-star"></i></a>`+
                                            //         // <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                            //     `</div>
                                            // </div>
                                        `</div>`+
                                        // <div class="rating-box">
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star none"><i class="fa fa-star"></i></div>
                                        // </div>
                                        `<a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                        <div class="article-container style-1">
                                            <p>${el.metaDescription}</p>
                                        </div>
                                        <div class="price">`+
                                            // <div class="prev">Rp. ${el.hargaDasar}</div>
                                           `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                        </div>
                                        <div class="list-buttons">
                                            <a class="button style-10">Add to cart</a>
                                            <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>`;
                            } else {
                                var data = [];
                                let text = el.namaProduk;
                                let title = text.length;
                                if (title > 22) {
                                   text = text.substr(0,20)+'...';
                                } 
                                $.each(el.images, function(index, el) {
                                    // console.log(el.gambar);
                                    data.push(el.gambar);
                                });
                                listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                    <div class="product-slide-entry text-center shift-image carousel-slides">
                                        <div class="product-image">
                                        <a href="product-detail?id=${el.SKU}">
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                            <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                        </a>`+
                                            // <div class="product-image-label type-1"><span>NEW</span></div>
                                            // `<div class="bottom-line">
                                            //     <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                            //         <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                            //         <a class="bottom-line-a square" href="product-detail?id=${el.SKU}"><i class="fa fa-eye "></i></a>
                                            //         <a class="bottom-line-a square"><i class="fa fa-star"></i></a>`+
                                            //         // <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                            //     `</div>
                                            // </div>
                                        `</div>`+
                                        // <div class="rating-box">
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star get"><i class="fa fa-star"></i></div>
                                        //     <div class="star none"><i class="fa fa-star"></i></div>
                                        // </div>
                                        `<a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                        <div class="article-container style-1">
                                            <p>${el.metaDescription}</p>
                                        </div>
                                        <div class="price">`+
                                            // <div class="prev">Rp. ${el.hargaDasar}</div>
                                            `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                        </div>
                                        <div class="list-buttons">
                                            <a class="button style-10">Add to cart</a>
                                            <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>`;
                            }
                       }
                    });
                }
                console.log(totalLists)
                $('#paging').html(paging);
                $('#grid-product').html(listdata);
            }
        });
    });

    //Filter By Colours
    function filterByColor(id) {
        $('#show-colour .color').find('div').removeClass('active'); //-> remopve class active
        let addActive = $('#show-colour').on('click', '.color', function() {
            $(this).children().addClass('active');
        });
        var warna = id;
        var inisialisasi =''; //-> menginisialisasikan bahwa yang dipilih berasal dari giftid atau storeid
        var idCategori; //->menentukan id dari gift atau store id
        let listdata;
        var paging ="";
        var tampungdata = [];
        if (Giftid != undefined) {
            inisialisasi = 'idKategoriGift';
            idCategori = Giftid;
        } else if (Giftid == undefined) {
            // ->return false
        }
        if (Storeid != undefined) {
            inisialisasi = 'idKategoriStore';
            idCategori=Storeid;
        } else if (Storeid == undefined) {
            // ->return false
        } 
        // console.log(warna+' '+inisialisasi+' '+idCategori);
        $('#grid-product').html(`<div style="align-items: center;display: flex;justify-content: center;"> <img src="loading-items.gif"/> </div>`).show();
        $.ajax({
            url:  uri+'/products',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                $.each(data, function(index, val) {
                    if (val.idKategoriGift == idCategori && val.color.idColor == warna) {
                        tampungdata.push(val);
                    } else if (val.idKategoriGift2 == idCategori && val.color.idColor == warna) {
                        tampungdata.push(val);
                    } else if (val.idKategoriStore == idCategori && val.color.idColor == warna) {
                        tampungdata.push(val);
                    } else if (val.idKategoriStore2 == idCategori && val.color.idColor == warna) {
                        tampungdata.push(val);
                    } else {}
                });
                if (tampungdata.length) {
                    $.each(tampungdata, function(index, el) {
                    var data = [];
                    let text = el.namaProduk;
                    let title = text.length;
                    if (title > 22) {
                       text = text.substr(0,20)+'...';
                    }
                    $.each(el.images, function(index, el) {
                        data.push(el.gambar);
                    });
                    if (listdata != undefined) {
                        listdata = listdata + `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>${el.metaDescription}</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    } else {
                        listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>${el.metaDescription}</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    }
                    });
                } else if (tampungdata.length == 0) {
                    listdata = "<div style='font-size: 50px;margin-left: 16%;'>Barang Belum Tersedia</div>";
                }
                $('#paging').html(paging);
                $('#grid-product').html(listdata);
            }
        });
    }

    function filterByBrand(brandArray) {
        var penampungan = [];
        $.each(brandArray, function(index, el) {
            penampungan.push(parseInt(el))
        });
       $('#grid-product').html(`<div style="align-items: center;display: flex;justify-content: center;"> <img src="loading-items.gif"/> </div>`).show();
       $.ajax({
           url: uri+'/products',
           type: 'GET',
           dataType: 'json',
           success: function (data) {
            let listdata;
            var paging ="";
            if (penampungan.length == 0) {
                list(arg = 1);
            }
            $.each(penampungan, function(index, idBrand) {
                $.each(data, function(index, el) {
                    if (el.brand.idBrand == idBrand ) {
                        var data = [];
                        let text = el.namaProduk;
                        let title = text.length;
                        if (title > 22) {
                           text = text.substr(0,20)+'...';
                        }
                        $.each(el.images, function(index, el) {
                            data.push(el.gambar);
                        });
                        if (listdata != undefined) {
                        listdata = listdata + `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    } else {
                        listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    }
                    }
                });
                $('#paging').html(paging);
                $('#grid-product').html(listdata);
            });
                
           }
       });
    }

    function filterBySize(idUkuran) {
        $('#show-size .size').find('div').removeClass('active') //-> remopve class active
        let addActive = $('#show-size').on('click', '.size', function() {
            $(this).children().addClass('active');
        });
        var ukuran = idUkuran;
        var inisialisasi =''; //-> menginisialisasikan bahwa yang dipilih berasal dari giftid atau storeid
        var idCategori; //->menentukan id dari gift atau store id
        let listdata;
        var paging ="";
        var tampungdata = [];
        if (Giftid != undefined) {
            inisialisasi = 'idKategoriGift';
            idCategori = Giftid;
        } else if (Giftid == undefined) {
            // ->return false
        }
        if (Storeid != undefined) {
            inisialisasi = 'idKategoriStore';
            idCategori=Storeid;
        } else if (Storeid == undefined) {
            // ->return false
        } 
        // console.log(warna+' '+inisialisasi+' '+idCategori);
        $('#grid-product').html(`<div style="align-items: center;display: flex;justify-content: center;"> <img src="loading-items.gif"/> </div>`).show();
        $.ajax({
            url:  uri+'/products',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                $.each(data, function(index, val) {
                    if (val.idKategoriGift == idCategori && val.size.idUkuran == ukuran) {
                        tampungdata.push(val);
                    } else if (val.idKategoriGift2 == idCategori && val.size.idUkuran == ukuran) {
                        tampungdata.push(val);
                    } else if (val.idKategoriStore == idCategori && val.size.idUkuran == ukuran) {
                        tampungdata.push(val);
                    } else if (val.idKategoriStore2 == idCategori && val.size.idUkuran == ukuran) {
                        tampungdata.push(val);
                    } else {}
                });
                if (tampungdata.length) {
                    $.each(tampungdata, function(index, el) {
                    var data = [];
                    let text = el.namaProduk;
                    let title = text.length;
                    if (title > 22) {
                       text = text.substr(0,20)+'...';
                    }
                    $.each(el.images, function(index, el) {
                        data.push(el.gambar);
                    });
                    if (listdata != undefined) {
                        listdata = listdata + `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    } else {
                        listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    }
                    });
                } else if (tampungdata.length == 0) {
                    listdata = "<div style='font-size: 50px;margin-left: 16%;'>Barang Belum Tersedia</div>";
                }
                $('#paging').html(paging);
                $('#grid-product').html(listdata);
            }
        });
    }

    function filterByPrice(){
        var min = parseInt($('.min-price span').html());
        var max = parseInt($('.max-price span').html());
        console.log(min+' - '+max);
        $('#grid-product').html(`<div style="align-items: center;display: flex;justify-content: center;"> <img src="loading-items.gif"/> </div>`).show();
        $.ajax({
            url: uri+'/products',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let listdata;
                let paging ="";
                $.each(data, function(index, el) {
                    if (el.hargaJual >= min && el.hargaJual <= max) {
                        var data = [];
                        let text = el.namaProduk;
                        let title = text.length;
                        if (title > 22) {
                           text = text.substr(0,20)+'...';
                        }
                        $.each(el.images, function(index, el) {
                            data.push(el.gambar);
                        });
                        if (listdata != undefined) {
                        listdata = listdata + `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    } else {
                        listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    }
                    }
                });
                $('#paging').html(paging);
                $('#grid-product').html(listdata);
            }
        });
    }

    function filterBySubCategory(idsubcat) {
        $('#grid-product').html(`<div style="align-items: center;display: flex;justify-content: center;"> <img src="loading-items.gif"/> </div>`).show();
        $.ajax({
            url: 'https://admin.kadoqu.com/api/sub_category_store/'+idsubcat+'/products',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let listdata;
                if (data.length == 0) {
                    listdata = "<div style='font-size: 50px;margin-left: 16%;'>Barang Belum Tersedia</div>";
                }
                $.each(data, function(index, el) {
                    var data = [];
                        let text = el.namaProduk;
                        let title = text.length;
                        if (title > 22) {
                           text = text.substr(0,20)+'...';
                        }
                        $.each(el.images, function(index, el) {
                            data.push(el.gambar);
                        });
                        if (listdata != undefined) {
                        listdata = listdata + `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    } else {
                        listdata = `<div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                                <div class="product-slide-entry text-center shift-image carousel-slides">
                                    <div class="product-image">
                                    <a href="product-detail?id=${el.SKU}">
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[0]}" alt="" />
                                        <img class="lazy" src="https://admin.kadoqu.com/produk/${data[1]}" alt="" />
                                    </a>
                                    <a class="title" href="product-detail?id=${el.SKU}">${text}</a>
                                    <div class="article-container style-1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div class="price">`+
                                        // <div class="prev">Rp. ${el.hargaDasar}</div>
                                       `<div class="current">${convertToRupiah(el.hargaJual.toString())}</div>
                                    </div>
                                    <div class="list-buttons">
                                        <a class="button style-10">Add to cart</a>
                                        <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </div>`;
                    }
                });
                $('#paging').html(paging);
                $('#grid-product').html(listdata);
            }
        });
        
    }
</script>
@endsection
@include('Parent.footer')
