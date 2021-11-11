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