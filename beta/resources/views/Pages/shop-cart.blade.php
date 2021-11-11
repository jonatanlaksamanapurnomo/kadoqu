@include('Parent.header')
<div class="content-push" style="padding-left: 10%;padding-right: 10%;">
    <h2 class="cart-column-title hide-border cekout">Isi Keranjang</h2>
    <div class="information-blocks">
        <div class="table-responsive">
            <div class="table-jarak">
                <table class="compare-table">
                    <tr class="thead-item border-hide">
                        <td class="text-left" style="padding-top: 30px;padding-left: 0px;font-size: 20px;font-family: arial;"><b>Nama Produk</b></td>
                        <td></td>
                        <td class="text-left" style="font-size: 20px;font-family: arial;"></td>
                        <td class="text-center" style="font-size: 20px;font-family: arial;"><b>Harga Unit</b></td>
                        <td class="text-center" style="font-size: 20px;font-family: arial;"><b>Kuantitas</b></td>
                        <td class="text-right" style="font-size: 20px;font-family: arial;"><b>Subtotal</b></td>
                    </tr> 
                    <tbody id="data-here">
                        
                    </tbody>
                </table>
            </div>
           
        </div>
    </div>
    <div class="information-block">
        <div class="row">
            <div class="col-md-6 col-md-push-6 col-sm-4 col-sm-push-8 col-xs-12">
                <div class="row">
                    <div class="col-md-4 col-md-push-4 col-xs-6 text-right">
                        <p class="subtotal" style="font-size: 20px;font-family: arial;">Sub Total</p>
                        <p class="Potongan" style="font-size: 20px;font-family: arial;">Potongan</p>
                        <p class="Total" style="font-weight: 100;font-size: 20px;font-family: arial;">Total keseluruhan</p>    
                    </div>
                    <div class="col-md-4 col-md-push-4 col-xs-6 text-center">
                        <div style="display: flex; flex-direction: column; width: 100%; height: 100px; margin-left: 0; margin-left: 22%;">
                            <p class="subtotal" id="subtotal" style="font-weight: bold;font-size: 20px;font-family: arial;"></p>
                            <p class="Potongan" style="font-weight: bold;font-size: 20px;font-family: arial;">-</p>
                            <p class="Total" id="total-keseluruhan" style="font-weight: bold;font-size: 20px;font-family: arial;"></p>
                        </div>
                        
                    </div>
                    <div class="clear"></div>
                    <div class="col-md-4 col-md-push-8 col-sm-6 col-sm-push-6 col-xs-12">
                        <a id="checkout-button-final" onclick="checkoutFromCart()"  class="button style-7 col-xs-12" style="font-size: 20px;font-family: arial;">Checkout</a> <!-- href="{{url('shop-checkout')}}" -->
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-8 col-md-pull-6 col-sm-pull-4 col-xs-12">
                <div class="col-md-10 col-sm-11 col-xs-12" style="background: #333;padding: 20px">
                    <p style="color: white;font-size: 20px ;font-weight: 600;margin-bottom: 20px;font-size: 20px;font-family: arial;">Kode Kupon</p>
                    <form>
                        <label style="color: white;font-size: 20px;font-family: arial;">Masukan kode kupon yang anda miliki</label>
                        <div class="row" style="display: flex;justify-content:center; margin: 15px 0">
                            <input type="text" placeholder="Masukan kode kupon Anda disini" style="border: none;padding: 8px; float: right;width: 70%">
                            <a class="button style-2" style="border: none;margin-left: 10px;margin-bottom:0px; padding: 8px; float: left ;width: 30%;font-size: 15px;font-family: arial;">Pakai Kupon</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
<script type="text/javascript">
    //checkout from cart
    function checkoutFromCart() {
        let a = Cookies.get('token');
        if (a != undefined) {
            var checkStock = $('#data-here').find('.jumlahstock').length;
            // console.log(checkStock)
            var counter =0;
            for (var i = 0; i < checkStock; ++i) {
                if ($($('#data-here').find('.jumlahstock')[i]).data('stock')==0) {
                    counter++;
                }
            }
            // ${$($('#data-here').find('.jumlahstock')[i]).data('namaproduk')} -> untuk ambil nama produk
            if (counter > 0 ) {
                swal({
                        'type' : 'warning',
                        'title' : `Oops! terjadi kesalahan`,
                        'text' : `Stock salah satu produk tidak mencukupi, Silahkan hapus terlebih dahulu sebelum melanjutkan checkout`,
                        'confirmButtonColor': '#00968a',
                    });                
            } else {
                location.href = "{{url('shop-checkout')}}";
            }
        } else {
            location.href = "{{url('shop-checkout')}}";
        }
    }

    //get token cart
    function getTokenCart (){
       let a = Cookies.get('token');
       if (a != undefined) {
        showCart(a);
        $('#cart-list-1').hide();
        $('#cart-list-2').hide();
        $('#cart-list-3').hide();
       } else {
         cartGuest();
       }
    }
    getTokenCart();

    //cart update selection
    function UpdateCart(sku,index) {
        let token = Cookies.get('token');
        let sku2 = sku;
        let index2 = parseInt($(`#tampil-${index}`).html());
        if (token != undefined) {
            UpdateUserCart(token,sku2,index2);
        } else {
    
        }
    }
    
    //User cart update
    function UpdateUserCart(token,sku2,index2) {
        $.ajax({
            url: 'https://admin.kadoqu.com/api/editproduct',
            type: 'POST',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: {
                SKU: sku2,
                jumlah: index2
            },
        });
    }
 
    //guest cart 
    function cartGuest() {
        let list = Cookies.getJSON('guest');
        let listdata= '';
        var totaljumlah = 0;
        var tot = 0;
        let availableStocks = [];
        $('#data-here').html();
        $.each(list, function(index, el) {
        let productName = '';
        $.ajax({
            url: 'https://admin.kadoqu.com/api/product/'+el.SKU,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if(el.stock > data[0].stock.available){
                    console.log("STOK KURANG");
                    $(`#product-${index}`).html('<br>(Stok Produk Habis, silahkan hapus terlebih dahulu sebelum checkout)');
                    availableStocks.push(el.SKU);
                }
            }
        })
        .done(function() {
            if (availableStocks.length == 0) {
                $('#checkout-button-final').css('pointer-events','auto');
            } else {
                $('#checkout-button-final').css('pointer-events','none');
            }
        });
        console.log(availableStocks)
        
        let stockValidationPlus;
        if (el.jumlah < el.stock) {
            stockValidationPlus = `<div class="entry number-plus" onclick='editCart("${el.SKU}","${parseInt(el.jumlah) + 1}","${index}")'>&nbsp;</div>`;
        } else {
            stockValidationPlus = `<div class="entry number-plus" style="pointer-events: none;">&nbsp;</div>`;
        }
        let stockValidationMinus;
        if (el.jumlah <= 1) {
            stockValidationMinus = `<div class="entry number-minus" style="pointer-events: none;">&nbsp;</div>`;
        } else {
            stockValidationMinus = `<div class="entry number-minus" onclick='editCart("${el.SKU}","${parseInt(el.jumlah) - 1}","${index}")'>&nbsp;</div>`;
        }
        let jumlah = parseInt(el.jumlah);
        let harga = parseInt(el.hargaProduk);
        let total = jumlah  * harga;
        totaljumlah+=total;
        listdata = listdata + 
        `<tr class="thead-item-T" style="border: 1px #e6e6e6 solid;">
            <td class="text-left"></td>
            <td>
                <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">`+
                    // <div class="col-md-3" style="background-image:url(asset/icon/icon_kado.png);width: 29px; height: 35px;background-size: cover; padding-right: 0px; padding-left: 0px; text-align: center ;margin-right: 10px"><i class="rincian-nomer">1</i></div>
                `</div>
            </td>
            <td class=" text-left">`+
                // <h5 class="rincian-text">Gift 1 - Jasa Bungkus</h5>
            `</td>
            <td class=" text-center"></td>
            <td class=" text-center"></td>
            <td class=" text-right"></td>
        </tr>
        <tr class="border-hide" style="border: 1px #e6e6e6 solid;">
            <td>
            <i class="fa fa-trash" style="padding-top:10px;font-size:35px;color:gainsboro; cursor:pointer;margin-left: 15px;" onclick="removeCartGuestWithBtn('${el.SKU}',0)"></i>
            </td>
            <td style="padding-left: 0px;">
                <img style="width: 120px;max-width:100%;" src="https://admin.kadoqu.com/produk/${el.fotoProduk}">
            </td>
            <td class="text-left" style="padding-left: 0px;font-size:20px;font-family:arial;" >
                ${el.namaProduk} <b  style="font-size: 13px;" id="product-${index}"></b>
            </td>
            <td class="text-center" style="font-size:20px;font-family:arial;">${convertToRupiah(el.hargaProduk.toString())}</td>
            <td class="text-center" style="padding:0;">
                <div class="quantity-selector detail-info-entry detail-barang" style="">
                    ${stockValidationMinus}
                    <div class="entry number edited" id="tampilkan">${el.jumlah}</div>
                    ${stockValidationPlus}
                    
                </div>
                
            </td>
            <td class="text-right"  style="width:200px;font-size:20px;font-family:arial;">${convertToRupiah(total.toString())}</td>
            <div class="clear"></div>
        </tr>`;
    });
        $('#data-here').html(listdata);
        $('#subtotal').html(convertToRupiah(totaljumlah.toString()));
        $('#total-keseluruhan').html(convertToRupiah(totaljumlah.toString()));
        $('#cart-list-1').hide();
        $('#cart-list-2').hide();
        $('#cart-list-3').hide();
    }
    //end token cart
</script>
@endsection
@include('Parent.footer')