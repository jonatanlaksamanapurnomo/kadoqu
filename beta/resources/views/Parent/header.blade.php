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
        <div class="fixed-header-margin {{ (Request::is('/')) ? 'header-custom' : '' }}">
            <!-- HEADER -->
            <div class="header-wrapper style-21">
                <header class="type-1">
                    <div class="header-top">
                        <div class="header-top-entry ">

                        </div>
                        <div class="header-top-entry hidden-lg">
                            <div class="title"><a href="#"><b>1001 Innspirasi Kado</b></a></div>
                        </div>
                        <div class="header-top-entry hidden-lg">
                            <div class="title"><a href="#"><b>Diskon Minggu Ini</b></a></div>
                        </div>
                        <div class="header-top-entry hidden-lg">
                            <div class="title"><a href="#"><b>Mencari Kado Bersama GIdA</b></a></div>
                        </div>
                        <div class="clear"></div>
                    </div>

                    <div class="header-middle">
                        <div class="logo-wrapper">
                            <a id="logo" href="{{url('/')}}"><img class="logo" src="asset/img/logo_kadoqu.png" alt="" /></a>
                        </div>
                        <div class="right-entries">
                            <div id="web-menu">
                                <div style="widows: 100%;height: 100px;position: relative;">
                                    <div style="width: 100%;height: 55px;right: 0;bottom: 0;position: absolute;">
                                        <div style="display: inline-flex;">
                                            <div style="width: auto;height: auto;z-index: 3">
                                                <div style="width: auto;display: flex;flex-direction: column;">
                                                    <div style="width: auto;position: relative;z-index: 2">
                                                        <a class="header-functionality-entry m-l-10px" style="padding: 5px">
                                                            <div class="search-box size-1">
                                                                <form id="search-box" action="product-category-grid?keyword=">
                                                                    <div class="search-field" style="border: 1px">
                                                                        <input name="keyword" type="text" value="" autocomplete="off" placeholder="Search for product" />
                                                                    </div>
                                                                    <div class="search-button icn-src" style="border: 1px">
                                                                        <i class="fa fa-search"></i>
                                                                        <input type="submit"/>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div style="width: auto;position: relative;">
                                                         <div class="dropdown-search search-box-drpdn">
                                                            <div style="width: 90%;height: 1px;background-color: black;margin-top: 15px;margin-left: 10px;"></div>
                                                            <div style="display: flex;flex-direction: column;height: auto">
                                                                <div id="list-search" style="display: flex;flex-direction: column;height: 160px;overflow-x: auto;">
                                                                <!-- <a class="header-functionality-entry m-l-10px" href="asdwd" style="padding: 0;"><div style="width: 100%;height: 10px;text-align: left;margin-top: 10px;word-spacing: 4px;"><b style="font-size: 16px !important">Sepatu</b> Kulit buaya</div></a>
                                                                <a class="header-functionality-entry m-l-10px" href="asdwd" style="padding: 0;"><div style="width: 100%;height: 10px;text-align: left;margin-top: 10px;word-spacing: 4px;"><b style="font-size: 16px !important">Sepatu</b> Kulit Ular</div></a>
                                                                <a class="header-functionality-entry m-l-10px" href="asdwd" style="padding: 0;"><div style="width: 100%;height: 10px;text-align: left;margin-top: 10px;word-spacing: 4px;"><b style="font-size: 16px !important">Sepatu</b> Kulit Sapi</div></a> -->
                                                                </div>
                                                                
                                                                <div style="width: 90%;height: 1px;background-color: black;margin-top: 20px;margin-left: 10px;"></div>
                                                                <a class="header-functionality-entry m-l-10px" style="padding: 0;pointer-events: none;"><div style="width: 100%;height: 10px;text-align: left;margin-top: 10px;word-spacing: 4px;"><b style="font-size: 16px !important;color: #509FA8;">Brand</b></div></a>
                                                                <div id="brand-seacrh" style="display: flex;flex-direction: column;height: auto;">
                                                                   <!--  <a class="header-functionality-entry m-l-10px" href="asdwd" style="padding: 0;"><div style="width: 100%;height: 10px;text-align: left;margin-top: 10px;word-spacing: 4px;font-size: 17px;">Nike</div></a>
                                                                    <a class="header-functionality-entry m-l-10px" href="asdwd" style="padding: 0;"><div style="width: 100%;height: 10px;text-align: left;margin-top: 10px;word-spacing: 4px;font-size: 17px;">Adidas</div></a> -->
                                                                </div>
                                                                <div style="height: 30px;"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="width: auto;height: auto;">
                                                <a class="header-functionality-entry m-l-10px open-cart-popup account-login" style="padding: 5px" href="javascript:void(0)">
                                                    <img class="ico" src="asset/icon/icon_signin%201.png" alt="" />
                                                </a>
                                                <a class="header-functionality-entry m-l-10px" id="cart-list-1" style="position: relative;padding: 5px" onclick="opencart();getDetails(`${token}`)" href="javascript:void(0)">
                                                    <img class="ico" src="asset/icon/icon_cart%201.png" alt="" />
                                                    <div class="jumlah-barang1"></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="mobile-menu">
                                <a class="header-functionality-entry open-search-popup" style="padding: 5px" href="#">
                                    <i class="fa fa-search ijo-icn"></i>
                                </a>
                                <a class="header-functionality-entry" id="cart-list-2" style="position: relative;padding: 5px" onclick="opencart();getDetails(`${token}`)" href="javascript:void(0)">
                                    <img class="ico" src="asset/icon/icon_cart%201.png" alt="" />
                                    <div class="jumlah-barang1"></div>
                                </a>
                                <a class="header-functionality-entry">
                                    <div class="menu-button responsive-menu-toggle-class" style="padding: 5px"><i class="fa fa-reorder  ijo-icn"></i></div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="close-header-layer" style="display: none;"></div>
                    <div class="navigation">
                        <div class="navigation-header responsive-menu-toggle-class">
                            <div class="title">Menu</div>
                            <div class="close-menu"></div>
                        </div>
                        <div class="nav-overflow">
                            <nav>
                                <ul>
                                    <li class="full-width hidden-lg">
                                        <div style="margin: 5%" class="poto-profil-user-mobile">
                                            <img style="width: 50px;" src="asset/icon/icon_signin%201.png" alt="" />
                                        </div>
                                    </li>
                                    <li class="full-width">
                                        <a href="{{url('/')}}" class="nav-vi {{ (Request::is('/')) ? 'active' : '' }}">Home</a>
                                    </li>
                                    <li class="full-width">
                                        <a href="javascript:void(0)" onclick="showCat()" class="nav-vi {{ (Request::is('product-category-grid')) ? 'active' : '' }}">Kategori <i class="fa fa-chevron-down fa-xs"></i></a>
                                        <div id="submenu" class="submenu " style="    padding:20px 0px;    box-shadow: rgb(136, 136, 136) 0px 0px ; box-shadow: rgba(0, 0, 0, 0.3) 0px 6px 5px 5px;">
                                            <div class="full-width-menu-items-center">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="col-lg-12" style="margin-bottom: 15px;">
                                                            <div class="submenu-list-title"><a class="judul-nav" href="{{url('product-category-grid?KadoquGift=products')}}" style="color: #00998D">Kadoqu<i>Gift</i></a></div>
                                                            <div class="clear"></div>
                                                        </div>
                                                        <div class="col-lg-6" id="kadoqugift1">
                                                            <!-- List Kadoqu gift 1-5  -->
                                                        </div>
                                                        <div class="col-lg-6" id="kadoqugift2">
                                                            <!-- List Kadoqu gift 6-10  -->
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6" style="border-left: 2px #00998D solid">
                                                        <div class="col-lg-12" style="margin-bottom: 15px;">
                                                            <div class="submenu-list-title"><a class="judul-nav" href="{{url('product-category-grid?KadoquStore=store_category')}}" style="color: #00998D">Kadoqu<i>Store</i></a></div>
                                                            <div class="clear"></div>
                                                        </div>
                                                        <div class="col-lg-6" id="kadoqustore1">
                                                           <!-- List Kadoqu store 1-6  -->
                                                       </div>
                                                       <div class="col-lg-6" id="kadoqustore2">
                                                        <!-- List Kadoqu store 7-12  -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                               <!--  <li class="full-width">
                                    <a href="product-category-grid?Saleid=1" class="nav-vi">Sale</a>
                                </li> -->
                                <li class="full-width">
                                    <a href="{{url('gida')}}" class="nav-vi {{ (Request::is('gida')) ? 'active' : '' }}">Gi<b style="text-transform: lowercase;">d</b>a</a>
                                </li>
                                <li class="full-width">
                                    <a href="{{url('login-mobile')}}" class="mobile-nav mo-1 nav-vi">Login</a>
                                </li>
                                <li class="full-width">
                                    <a href="{{url('register-mobile')}}" class="mobile-nav mo-2 nav-vi">Register</a>
                                </li>
                                <li class="fixed-header-visible" style="margin-top: 0px;margin-left: 15px">
                                    <a class="header-functionality-entry">
                                        <div class="search-box size-1">
                                            <form action="product-category-grid?keyword=">
                                                <div class="search-field">
                                                    <input  id="search-produk" type="text" value="" placeholder="Search for product" />
                                                </div>
                                                <div class="search-button icn-src">
                                                    <i class="fa fa-search"></i>
                                                    <input type="submit" />
                                                </div>
                                            </form>
                                        </div>
                                    </a>
                                    <a class="header-functionality-entry open-cart-popup account-login" style="padding: 5px" href="javascript:void(0)">
                                        <img class="ico" src="asset/icon/icon_signin%201.png" alt="" />
                                    </a>
                                    <a class="header-functionality-entry" id="cart-list-3" style="position: relative;padding: 5px" onclick="opencart()" href="javascript:void(0)">
                                        <img class="ico" src="asset/icon/icon_cart%201.png" alt="" />
                                        <div class="jumlah-barang1"></div>
                                    </a>
                                </li>
                                <div class="clear"></div>
                            </ul>
                            <a class="fixed-header-visible additional-header-logo" style="padding: 10px 0px;" href="{{url('/')}}"><img class="logo" src="asset/img/logo_kadoqu.png" alt="" />
                            </a>
                        </nav>
                    </div>
                </div>
            </header>
            <div class="clear"></div>
        </div>
        </div>
        <!--header-->
        <!-- Content Here-->
        