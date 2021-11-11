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
				<a href="{{url('login-mobile')}}">
					<div id="masuk-btn" class="col-xs-3" style="border-right: 1px #9b9b9b solid;text-align: center;">login</div>
				</a>
				<div id="daftar-btn" class="col-xs-3" style="border-left: 1px #9b9b9b solid;text-align: center;color: #00998D">daftar</div>
				<div class="col-xs-12" style="margin:10px 0px">
					<div class="col-xs-12" style="margin:10px 0px">
						<form>
							<label>Nama Depan</label>
							<input id="name" class="simple-field" type="text" placeholder="nama depan anda" required value="" />
							<div style="color: red;" id="nama-validation"></div>
							<div class="clear"></div>
                            <!-- <label>Nama Belakang</label>
                            <input class="simple-field" type="text" placeholder="nama belakang anda" required value="" />
                            <div class="clear"></div> -->
                            <label>Email</label>
                            <input id="email" class="simple-field" type="email" placeholder="email anda" required value="" />
                            <div style="color: red;" id="email-validation"></div>
                            <div class="clear"></div>
                            <label>Password</label>
                            <input id="password" class="simple-field" type="password" placeholder="password anda" required value="" />
                            <div style="color: red;" id="password-validation"></div>
                            <div class="clear"></div>
                            <label>Konfirmasi Password</label>
                            <input id="confirm_password" class="simple-field" style="margin-bottom: 5px;" type="password" placeholder="password anda" required value="" />
                            <div style="color: red;" id="confirm-password-validation"></div>
                            <div class="clear"></div>
                            <label>Alamat</label>
                            <input id="alamat" type="text" class="simple-field" name="" value="" placeholder="alamat anda">
                            <div style="color: red;" id="alamat-validation"></div>
                            <div class="clear"></div>
                            <label>No Telephone</label>
                            <input id="no_telp" type="number" class="simple-field" name="" value="" placeholder="no thelepone anda">
                            <div style="color: red;" id="no-telp-validation"></div>
                            <div class="clear"></div>
                            <!-- <label class="checkbox-entry">
                            	<input type="checkbox" /> <span class="check"></span> Beritahu saya promo terbaru
                            </label> -->
                            <div style="display: flex;justify-content: center;align-items: center;">
                            	<div id="daftar-user" class="button style-4 col-xs-5" onclick="send()">Daftar </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <img style="width: 100%; margin-top: 20px;" src="asset/login/bottomborder.png">
    </div>
    <script src="js/jquery-2.1.3.min.js"></script>
    <script src="js/my.js"></script>
    <script src="js/idangerous.swiper.min.js"></script>
    <script src="js/global.js"></script>
    <script src="js/sweetalert2.all.min.js"></script>
    <!-- custom scrollbar -->
    <script src="js/jquery.mousewheel.js"></script>
    <script src="js/jquery.jscrollpane.min.js"></script>
    <script type="text/javascript">
    	function register() {
    		var nama = $('#name').val();
    		var email = $('#email').val();
    		var password = $('#password').val();
    		var confirm_password = $('#confirm_password').val();
    		var alamat = $('#alamat').val();
    		var no_telp = $('#no_telp').val();
    		$.ajax({
    			url: 'http://admin.kadoqu.com/api/register',
    			type: 'POST',
    			dataType: 'json',
    			data: {
    				name : nama,
    				email: email,
    				password: password,
    				confirm_password : confirm_password,
    				alamat : alamat,
    				no_telp : no_telp
    			},
    		})
    		.done(function() {
    			location.href = "m_user_login.html";
    		})
    		.fail(function() {
    			console.log("error");
    		})
    		.always(function() {
    			console.log("complete");
    		});

    	}

    	function send () {
        var nama = $('#name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var confirm_password = $('#confirm_password').val();
        var alamat = $('#alamat').val();
        var no_telp = $('#no_telp').val();
        
        if (nama == "") {$('#nama-validation').html('nama is required')} 
        else if (nama != "") {$('#nama-validation').html('')}
        if (email == "") {$('#email-validation').html('email is required')}
        else if (email != "") {$('#email-validation').html('')}
        if (password == "") {$('#password-validation').html('password is required')} 
        else if (password != "") {$('#password-validation').html('')}
        if (confirm_password == "") {$('#confirm-password-validation').html('confirm password is required')} 
        else if (confirm_password != "") {$('#confirm-password-validation').html('')}
        if (alamat == "") {$('#alamat-validation').html('alamat is required')} 
        else if (alamat != "") {$('#alamat-validation').html('')}
        if (no_telp == "") {$('#no-telp-validation').html('no telp is required')} 
        else if (no_telp != "") {$('#no-telp-validation').html('')}

        $.ajax({
            url: 'https://admin.kadoqu.com/api/register',
            type: 'POST',
            dataType: 'json',
            data:{
              name : nama,
              email: email,
              password: password,
              confirm_password : confirm_password,
              alamat : alamat,
              no_telp : no_telp
            },
        })
        .done(function() {
            swal(
            'Good job!',
            'You has been registered',
            'success'
          );
            location.href = "login-mobile";
            $('#form-register')[0].reset();
        })
        .fail(function(e) {
             var errors = JSON.parse(e.responseText);
             // console.log(errors)
             if (errors['error'].name) {
                $('#nama-validation').html(errors['error'].name[0]);
             } else {
                $('#nama-validation').html("");
             } if (errors['error'].confirm_password) {
                $('#confirm-password-validation').html(errors['error'].confirm_password[0]);
             } else {
                $('#confirm-password-validation').html("");
             } if (errors['error'].email) {
                $('#email-validation').html(errors['error'].email[0]);
             } else {
                $('#email-validation').html("");
             } if (errors['error'].alamat) {
             	$('#alamat-validation').html(errors['error'].alamat[0]);
             } else {
             	$('#alamat-validation').html("");
             } if (errors['error'].no_telp) {
             	$('#no-telp-validation').html(errors['error'].no_telp[0]);
             } else {
             	$('#no-telp-validation').html("");
             }

        });
        
    }
    </script>
</body>

</html>
