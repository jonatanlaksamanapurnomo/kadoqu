$('#to-reciver').click(function(e) {
    $('#sender').fadeOut('slow', function() {
        $('#reciver').fadeIn('slow');
        $('.btn-reciver').addClass('active');
    });
});
$('#to-deliver').click(function(e) {
   console.log($('#nama_penerima').val());

    $('#reciver').fadeOut('slow', function() {
        $('#deliver').fadeIn('slow');
        $('.btn-deliver').addClass('active');
    });
});
 
$('#to-reciver').click(function(e) {
    $('#sender').fadeOut('slow', function() {
        $('#reciver').fadeIn('slow');
        $('.btn-reciver').addClass('active');
    });
});
$('#to-rincian').click(function(e) {
    $('#hasil-rincian').fadeIn('slow');
});

$("#proses-delay").click(
    function() {
        console.log("clicked...waiting...");

        // setTimeout("location.href = 'shop-checkout-success';", 2000);
    });

function opencart() {
    document.getElementById("mySidecart").style.width = "100%";
    document.getElementById("mySidecart").style.background = "rgba(0, 0, 0, 0.3)";
    document.getElementById("mySidecart").style.transition = " width 0.5s, background 0.3s 0.4s";
    document.getElementById("cart-inner").style.opacity = "1";
    document.getElementById("cart-inner").style.transition = "opacity 1s 0.5s";
}

function closecart() {
    document.getElementById("cart-inner").style.opacity = "0";
    document.getElementById("mySidecart").style.background = "rgba(0, 0, 0, 0.0)";
    document.getElementById("cart-inner").style.transition = "opacity 0.2s";
    document.getElementById("mySidecart").style.width = "0";
    document.getElementById("mySidecart").style.transition = " background 0.1s 0.3s,width 1s 0.3s ";
}
// Get the modal
var modal = document.getElementById('gida-help');

// Get the button that opens the modal
var btn = document.getElementById("btn-open-help");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-chat")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
        modal.style.display = "none";
    };
    //kategori-dropdown
$('#btn-1').on('click', function() {
    $('.dropdwn-1').toggleClass('expand');
});
$('#btn-2').on('click', function() {
    $('.dropdwn-2').toggleClass('expand');
});
//login-signin
$('#masuk,#masuk-btn').click(function(e) {
    $('#welcome').fadeOut('slow', function() {
        $('#form-content').fadeIn('slow');
        $('#isi-daftar').fadeOut('slow', function() {
            $('#masuk-btn').css('color', '#00998D');
            $('#daftar-btn').css('color', '#9b9b9b');
            $('#isi-login').fadeIn('slow');
        });
    });
});
$('#daftar,#daftar-btn').click(function(e) {
    $('#welcome').fadeOut('slow', function() {
        $('#form-content').fadeIn('slow');
        $('#isi-login').fadeOut('slow', function() {
            $('#daftar-btn').css('color', '#00998D');
            $('#masuk-btn').css('color', '#9b9b9b');
            $('#isi-daftar').fadeIn('slow');
        });
    });
});
$('#masuk-user,#daftar-user').click(function(e) {
    $('#isi-nya').fadeOut('slow', function() {
        $('#daftar-user').fadeIn('slow');
    });
});
$('#ganti-photo').click(function(e) {
    $('#user-tab').fadeOut('slow', function() {
        $('#select-profile').fadeIn('slow');
    });
});
$('.form-data-diri').prop('disabled', true);
$('#edit-data-diri').click(function(e) {
    $('#edit-data-diri').fadeOut('fast', function() {
        $('#simpan-data-diri').fadeIn('fast');
        $('.form-data-diri').prop('disabled', false);
    });
});

$('.form-info-kartu').prop('disabled', true);
$('#edit-info-kartu').click(function(e) {
    $('#edit-info-kartu').fadeOut('fast', function() {
        $('#simpan-info-kartu').fadeIn('fast');
        $('.form-info-kartu').prop('disabled', false);
    });
});
$('.form-pass').prop('disabled', true);
$('#edit-pass').click(function(e) {
    $('#edit-pass').fadeOut('fast', function() {
        $('#simpan-pass').fadeIn('fast');
        $('.form-pass').prop('disabled', false);
    });
});
$('#edit-alamat-pengirim').click(function(e) {
    $('#edit-alamat-pengirim,#alamat-pengirim').fadeOut('fast', function() {
        $('#simpan-alamat-pengirim').fadeIn('fast');
        $('#form-alamat-pengirim').fadeIn('fast');
        $('#form-alamat-pengirim').fadeIn('fast');
    });
});
$('#edit-alamat-penerima').click(function(e) {
    $('#edit-alamat-penerima').fadeOut('fast', function() {
        $('#simpan-alamat-penerima').fadeIn('fast');
    });
});
$('.tambah-penerima').css('cursor', 'pointer');
$('.tambah-penerima').click(function(e) {
    $('#alamat-penerima,#edit-alamat-penerima').fadeOut('slow', function() {
        $('#form-alamat-penerima,#simpan-alamat-penerima').fadeIn('slow');
    });
});

//filter-mobile
$('#show-filter').click(function(e) {
    $('#bod').toggle('slow/400/fast');
    $('#a-fil-mobile').css('display', 'block');
    $('#b-fil-mobile').css('display', 'none');
});
$('#a-fil-mobile').click(function(e) {
    $('#bod').toggle('slow/400/fast');
    $('#a-fil-mobile').css('display', 'none');
    $('#b-fil-mobile').css('display', 'block');
});
 


function Timer(duration, display) {
    var timer = duration,
        hours, minutes, seconds;
    setInterval(function() {
        hours = parseInt((timer / 3600) % 24, 10);
        minutes = parseInt((timer / 60) % 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(hours + " : " + minutes + " : " + seconds);

        --timer;
    }, 1000);
}

jQuery(function($) {
    var twentyFourHours = 24 * 60 * 60;
    var display = $('#remainingTime');
    Timer(twentyFourHours, display);
});

HowManyDivs = 2;

////////////////////////////////////
var CookieName = 'DivRamdomValueCookie';

function RandomDiv() {
    var r = Math.ceil(Math.random() * HowManyDivs);
    if (HowManyDivs > 1) {
        var ck = 0;
        var cookiebegin = document.cookie.indexOf(CookieName + "=");

        if (cookiebegin > -1) {
            cookiebegin += 1 + CookieName.length;
            cookieend = document.cookie.indexOf(";", cookiebegin);
            if (cookieend < cookiebegin) {
                cookieend = document.cookie.length;
            }
            ck = parseInt(document.cookie.substring(cookiebegin, cookieend));
        }

        while (r == ck) {
            r = Math.ceil(Math.random() * HowManyDivs);
        }
        document.cookie = CookieName + "=" + r;
    }

    for (var i = 1; i <= HowManyDivs; i++) {
        document.getElementById("content" + i).style.display = "none";
    }

    document.getElementById("content" + r).style.display = "block";
}

RandomDiv();