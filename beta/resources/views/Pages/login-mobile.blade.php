 <!DOCTYPE html>
<html>

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, minimal-ui" />
    <link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('css/my.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('css/idangerous.swiper.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('css/font-awesome.min.css')}}" rel="stylesheet" type="text/css" />
    <link href='https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700%7CDancing+Script%7CMontserrat:400,700%7CMerriweather:400,300italic%7CLato:400,700,900' rel='stylesheet' type='text/css' />
    <link href='https://fonts.googleapis.com/css?family=Cantata+One' rel='stylesheet' type='text/css' />
    <link href="{{asset('css/style.css')}}" rel="stylesheet" type="text/css" />
    <!--[if IE 9]>
        <link href="css/ie9.css" rel="stylesheet" type="text/css" />
    <![endif]-->
    <link rel="shortcut icon" href="asset/icon/tab_icon.png" />
</head>

<body class="style-15">
    <div id="loader-wrapper">
        <div id="img-load"><img class="col-lg-3 col-md-3 col-sm-4 col-xs-6" src="asset/gif/mockup_loading.gif" style="position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;"></div>
    </div>
    <div id="content-block">
    <img style="width: 100%" src="asset/login/topborder.png">
        <div class="row" style="margin:10px 5px">
            <div id="isi-nya">
                <div id="masuk-btn" class="col-xs-3" style="border-right: 1px #9b9b9b solid;text-align: center;color: #00998D">login</div>
                <a href="{{url('register-mobile')}}">
                    <div id="daftar-btn" class="col-xs-3" style="border-left: 1px #9b9b9b solid;text-align: center">daftar</div>
                </a>
                <div class="col-xs-12" style="margin:10px 0px">
                    <form>
                        <label>Email</label>
                        <input id="email-login" class="simple-field" type="email" placeholder="email anda" required value="" />
                        <div style="color: red;" id="login-email-validation"></div>
                        <div class="clear"></div>
                        <label>Password</label>
                        <input id="password-login" class="simple-field" style="margin-bottom: 5px;" type="password" placeholder="password anda" required value="" />
                        <div style="color: red;" id="login-password-validation"></div>
                        <div class="clear"></div>
                        <!-- <label class="checkbox-entry">
                            <input type="checkbox" /> <span class="check"></span> Beritahu saya promo terbaru
                        </label> -->
                        <div class="btn-center-align">
                            <div id="masuk-user" class="button style-3 col-xs-5" onclick="login_user()">Masuk </div>
                        </div>
                    </form>
                    <div class="garis"><i>atau masuk dengan</i>
                        <div class="line"></div>
                    </div>
                    <div class="cart-buttons btn-login-etc">
                        <div class="col-xs-5">
                            <a class="button facebook masuk-dgn"><i class="fa fa-facebook"></i></a>
                            <div class="clear"></div>
                        </div>
                        <div class="col-xs-5">
                            <a class="button google masuk-dgn"><i class="fa fa-google"></i></a>
                            <div class="clear"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            
        </div></div>
        <img class="bottom-banner-m"  src="asset/login/bottomborder.png">
    
    	<!--popup-->
        <script src="{{asset('js/jquery-2.1.3.min.js')}}"></script>
        <script src="{{asset('js/my.js')}}"></script>
        <script src="{{asset('js/idangerous.swiper.min.js')}}"></script>
        <script src="{{asset('js/global.js')}}"></script>
        <!-- custom scrollbar -->
        <script src="{{asset('js/jquery.mousewheel.js')}}"></script>
        <script src="{{asset('js/jquery.jscrollpane.min.js')}}"></script>
        <script src="{{asset('js/js.cookie.min.js')}}"></script>
        <script src="{{asset('js/sweetalert2.all.min.js')}}"></script>
        <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
	    <script type="text/javascript">
	        //LOGIN USER
		    function login_user () {
		      var email = $('#email-login').val();
		      var password = $('#password-login').val();

		      if (email == "") {$('#login-email-validation').html('email is required')}
		      else if (email != "") {$('#login-email-validation').html('')}
		      if (password == "") {$('#login-password-validation').html('password is required')}
		      else if (password != "") {$('#login-password-validation').html('')}

		      $.ajax({
		      url: "https://admin.kadoqu.com/api/login",
		      type: 'POST',
		      data:{
		        email: email,
		        password: password
		      },
		      success: function(data, status) {
		        getDetails(data.success.token);
		        Cookies.set('token',data.success.token);
		        return console.log("The returned data", data.success.token);
		      }
		      }).done(function() {
		        console.log("success");
		        location.href="{{url('/')}}";
		      })
		      .fail(function(e) {
		        var errors = JSON.parse(e.responseText);
		        if(errors['error']){
		            if (email == "") {
		                $('#login-email-validation').html('email is required');
		            } else {
		                $('#login-password-validation').html('Your email or password is incorrect');              
		            }
		        }
		      });
		    }

		    function getDetails(token){
		        $.ajax({
		          url: "https://admin.kadoqu.com/api/details",
		          headers: {
		            'Authorization': `Bearer ${token}`,
		          },
		          type: 'POST',
		          crossDomain : true,
		          success: function(data, status) {
		            // console.log(data.success.cart);
		            $('#detail-pemesanan-users').html("");
		            if (data.success) {
		                // console.log(data.success);
		                $('#user-name').text(data.success.name);
		                //Total Barang di Cart
		                let total = 0;
		                let pemesanan ='';
		                var total_index = 0;
		                $.each(data.success.cart, function(index, el) {
		                    total_index++;
		                    total += el.jumlah;
		                    var sku = el.SKU;
		                    pemesanan = pemesanan + `
		                                <div class="row rincian-row" style="margin-right: 0px; margin-left: 0px;">
		                                    <div class="col-md-3" style="text-align: center"><img style="width: 100%;" src="https://admin.kadoqu.com/produk/${el.product.images[0].gambar}"></div>
		                                    <div class="col-md-6 col-xs-8">
		                                        <h5 class="detail-barang" id="detail-barang">${el.product.namaProduk}</h5>
		                                        <h5 class="detail-barang" id="detail-harga">${convertToRupiah(el.product.hargaJual.toString())}</h5>
		                                        <div class="quantity-selector detail-info-entry detail-barang" style="">
		                                            <div class="entry number-minus" id="btn_minus_min-${index}" data-indeks='${index}' data-sku='${el.SKU}'" onclick="minus('${el.SKU}','${index}')">&nbsp;</div>
		                                            <div class="entry number updathe" id="tampilkanu-${index}">${el.jumlah}</div>
		                                            <div class="entry number-plus" data-sku='${el.SKU}' data-indeks='${index}'" onclick="plus('${el.SKU}','${index}')">&nbsp;</div>
		                                            <i class="fa fa-trash" style="padding-top:10px;font-size:20px;cursor:pointer;" onclick="removeCartUser('${token}','${el.SKU}')"></i>
		                                        </div>
		                                    </div>
		                                    <div class="col-md-3 col-xs-4" style="text-align: right">`+
		                                        // <h5 class="rincian-rp">Rp.50000</h5>
		                                    `</div>
		                                </div>`;
		                });
		                $('#detail-pemesanan-users').html("");
		                $('#detail-pemesanan-users').html(pemesanan);
		                if ($('#detail-pemesanan-users').children().length == 0) {
		                    $('#checkout-button').css({
		                        "pointer-events" : "none",
		                        "color" : "rgba(192,192,192,0.3)"
		                    });
		                    $('#checkout-button-final').css({
		                        "pointer-events" : "none",
		                        "color" : "rgba(192,192,192,0.3)"
		                    });
		                } else {
		                    $('#checkout-button').css("pointer-events","auto");
		                }
		                kuantitas = total;
		                if (data.success.cart.length) {
		                    $('.jumlah-barang1').html(`<div class="cart-float-label type-1"><span style="display: block">${total}</span></div>`);
		                    $('#jumlah-barang2').html(`<div class="cart-float-label type-1"><span style="display: block">${total}</span></div>`);
		                } else {
		                    $('.jumlah-barang1').replaceWith('');
		                    $('#jumlah-barang2').replaceWith('');
		                }

		            } else {
		                // Kosongin Aja 
		            }
		            // return console.log("Hasil getDetails", data);
		          },
		        }); 
		    }

	        //Set Cookies
	        var token = Cookies.get();

	        function cookies(token) {
	          Cookies.set('token', ''+token+'', { expires: 1 } );
	        }
	    </script>
</body>

</html>
