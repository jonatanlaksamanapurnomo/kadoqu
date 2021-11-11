<!DOCTYPE html>

<html lang="en" >
<!-- begin::Head -->
<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>{{ config('app.name', 'E-Commerce') }}</title>
    <meta name="description" content="Latest updates and statistic charts">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        .select2-container{ width: 100% !important; }
        /* Rubah Keseluruhan Font */
        body{
            font-family: Arial !important;
        }
    </style>
    <!--begin::Web font -->
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>
        WebFont.load({
            google: {"families":["Poppins:300,400,500,600,700","Roboto:300,400,500,600,700"]},
            active: function() {
                sessionStorage.fonts = true;
            }
        });
    </script>
    <!--end::Web font -->
    <!--begin::Base Styles -->  
    <!--begin::Page Vendors -->
    <link href="{{asset('css/backend/vendors.bundle.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('css/backend/style.bundle.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('css/backend/fullcalendar.bundle.css')}}" rel="stylesheet" type="text/css"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
    <style type="text/css">
        /* Paste this css to your style sheet file or under head tag */
    /* This only works with JavaScript, 
    if it's not present, don't show loader */
    .no-js #loader { display: none;  }
    .js #loader { display: block; position: absolute; left: 100px; top: 0; }
    .se-pre-con {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999; 
        background: url('Preloader_3.gif') center no-repeat #fff;
    }
    </style>
    <!--end::Base Styles -->
    <link rel="shortcut icon" href="../../../assets/demo/default/media/img/logo/favicon.ico" />
    <script src='https://www.google.com/recaptcha/api.js'></script>
    <script src="{{asset('js/jquery-3.2.1.min.js')}}" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.js"></script>
    <script type="text/javascript">
        $(window).on('load',function() {
            // Animate loader off screen
            $(".se-pre-con").fadeOut("slow");
        });
    </script>
    <link rel="stylesheet" type="text/css" href="{{asset('css/datatables.min.css')}}"/>
    <script type="text/javascript" src="{{asset('js/datatables.min.js')}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/fileinput.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/themes/fa/theme.js" type="text/javascript"></script>
    <script type="text/javascript" src="{{asset('js/bootstrap-notify.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/jquery.validate.js')}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
</head>
<!-- end::Head -->
<!-- end::Body -->
<body class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default m-scroll-top--shown" on >
<div class="se-pre-con"></div>
    <!-- begin:: Page -->
    <div class="m-grid m-grid--hor m-grid--root m-page">
        <!-- BEGIN: Header -->
        <header id="m_header" class="m-grid__item    m-header "  m-minimize-offset="200" m-minimize-mobile-offset="200" >
            <div class="m-container m-container--fluid m-container--full-height">
                <div class="m-stack m-stack--ver m-stack--desktop">
                    <!-- BEGIN: Brand -->
                    <div class="m-stack__item m-brand  m-brand--skin-dark ">
                        <div class="m-stack m-stack--ver m-stack--general">
                            <div class="m-stack__item m-stack__item--middle m-brand__logo">
                                <a href="index.html" class="m-brand__logo-wrapper">
                                    <img alt="" src="assets/demo/default/media/img/logo/logo_default_dark.png"/>
                                </a>
                            </div>
                            <div class="m-stack__item m-stack__item--middle m-brand__tools">
                                <!-- BEGIN: Left Aside Minimize Toggle -->
                                <a href="javascript:;" id="m_aside_left_minimize_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block 
                                ">
                                <span></span>
                            </a>
                            <!-- END -->
                            <!-- BEGIN: Responsive Aside Left Menu Toggler -->
                            <a href="javascript:;" id="m_aside_left_offcanvas_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block">
                                <span></span>
                            </a>
                            <!-- END -->
                            <!-- BEGIN: Responsive Header Menu Toggler -->
                            <!-- <a id="m_aside_header_menu_mobile_toggle" href="javascript:;" class="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
                                <span></span>
                            </a> -->
                            <!-- END -->
                            <!-- BEGIN: Topbar Toggler -->
                            <a id="m_aside_header_topbar_mobile_toggle" href="javascript:;" class="m-brand__icon m--visible-tablet-and-mobile-inline-block">
                                <i class="flaticon-more"></i>
                            </a>
                            <!-- BEGIN: Topbar Toggler -->
                        </div>
                    </div>
                </div>
                <!-- END: Brand -->
                <div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
                    <!-- BEGIN: Horizontal Menu -->
                    <button class="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark " id="m_aside_header_menu_mobile_close_btn">
                        <i class="la la-close"></i>
                    </button>

                    <!-- END: Horizontal Menu -->                               <!-- BEGIN: Topbar -->
                    <div id="m_header_topbar" class="m-topbar  m-stack m-stack--ver m-stack--general">
                        <div class="m-stack__item m-topbar__nav-wrapper">
                            <ul class="m-topbar__nav m-nav m-nav--inline">
                            <li class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" m-dropdown-toggle="click">
                                <a href="#" class="m-nav__link m-dropdown__toggle">
                                    <?php 
                                    $gambar = Auth::user()->images; 
                                    ?>
                                    <span class="m-topbar__userpic">
                                        <img src="{{asset($gambar)}}" class="m--img-rounded m--marginless m--img-centered" alt=""/>
                                    </span>
                                    <span class="m-topbar__username m--hide">
                                        Nick
                                    </span>
                                </a>
                                <div class="m-dropdown__wrapper">
                                    <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
                                    <div class="m-dropdown__inner">
                                        <div class="m-dropdown__header m--align-center" style="background: url(assets/app/media/img/misc/user_profile_bg.jpg); background-size: cover;">
                                            <div class="m-card-user m-card-user--skin-dark">
                                                <div class="m-card-user__pic">
                                                    <img src="assets/app/media/img/users/user4.jpg" class="m--img-rounded m--marginless" alt=""/>
                                                </div>

                                                <div class="m-card-user__details">
                                                    <span class="m-card-user__name m--font-weight-500">
                                                        {{ Auth::user()->name }}
                                                    </span>
                                                    <a href="" class="m-card-user__email m--font-weight-300 m-link">
                                                        {{ Auth::user()->email }}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="m-dropdown__body">
                                            <div class="m-dropdown__content">
                                                <ul class="m-nav m-nav--skin-light">
                                                    <li class="m-nav__section m--hide">
                                                        <span class="m-nav__section-text">
                                                            Section
                                                        </span>
                                                    </li>
                                                    <li class="m-nav__item">
                                                        <a href="header/profile.html" class="m-nav__link">
                                                            <i class="m-nav__link-icon flaticon-profile-1"></i>
                                                            <span class="m-nav__link-title">
                                                                <span class="m-nav__link-wrap">
                                                                    <span class="m-nav__link-text">
                                                                        My Profile
                                                                    </span>
                                                                    <span class="m-nav__link-badge">
                                                                        <span class="m-badge m-badge--success">
                                                                            2
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li class="m-nav__separator m-nav__separator--fit"></li>
                                                    <li class="m-nav__item">
                                                        <a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                        document.getElementById('logout-form').submit();" class="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
                                                        Logout
                                                    </a>
                                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                        {{ csrf_field() }}
                                                    </form>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- END: Topbar -->
        </div>
    </div>
</div>
</header>
<!-- END: Header -->        
<!-- begin::Body -->
<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
    <!-- BEGIN: Left Aside -->
    <button class="m-aside-left-close  m-aside-left-close--skin-dark " id="m_aside_left_close_btn">
        <i class="la la-close"></i>
    </button>
    <div id="m_aside_left" class="m-grid__item  m-aside-left  m-aside-left--skin-dark ">
        <!-- BEGIN: Aside Menu -->
        <div 
        id="m_ver_menu" 
        class="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark " 
        m-menu-vertical="1"
        m-menu-scrollable="0" m-menu-dropdown-timeout="500"  
        >
        <ul class="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
            <li class="m-menu__item  {{ (Request::is('home')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                <a  href="{{url('home')}}" class="m-menu__link ">
                    <i class="m-menu__link-icon flaticon-line-graph"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">
                                Dashboard
                            </span>
                        </span>
                    </span>
                </a>
            </li>
            <li class="m-menu__item  {{ (Request::is('admin/products*')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                <a  href="{{url('admin/products')}}" class="m-menu__link ">
                    <i class="m-menu__link-icon flaticon-cart"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">
                                Product List
                            </span>
                        </span>
                    </span>
                </a>
            </li>
            <li class="m-menu__item  {{ (Request::is('admin/order*')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                <a  href="{{url('admin/order')}}" class="m-menu__link ">
                    <i class="m-menu__link-icon flaticon-list-3"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">
                                Order
                            </span>
                        </span>
                    </span>
                </a>
            </li>
            <li class="m-menu__item  {{ (Request::is('admin/konfirmasi-pembayaran')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                <a  href="{{url('admin/konfirmasi-pembayaran')}}" class="m-menu__link ">
                    <i class="m-menu__link-icon flaticon-bell"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">
                                Konfirmasi Pembayaran
                            </span>
                        </span>
                    </span>
                </a>
            </li>
            <li class="m-menu__item  m-menu__item--submenu {{ (Request::is('admin/banners*','admin/brands')) ? ' m-menu__item--submenu m-menu__item--open m-menu__item--expanded' : '' }}" aria-haspopup="true"  m-menu-submenu-toggle="hover">
                <a  href="javascript:;" class="m-menu__link m-menu__toggle">
                    <i class="m-menu__link-icon flaticon-settings-1"></i>
                    <span class="m-menu__link-text">
                        CMS
                    </span>
                    <i class="m-menu__ver-arrow la la-angle-right"></i>
                </a>
                <div class="m-menu__submenu ">
                    <span class="m-menu__arrow"></span>
                    <ul class="m-menu__subnav">
                        <li class="m-menu__item  m-menu__item--parent" aria-haspopup="true" >
                            <span class="m-menu__link">
                                <span class="m-menu__link-text">
                                    Table
                                </span>
                            </span>
                        </li>
                        <li class="m-menu__item {{ (Request::is('admin/banners*')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                            <a  href="/admin/banners" class="m-menu__link ">
                                <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                    <span></span>
                                </i>
                                <span class="m-menu__link-text">
                                    Banners
                                </span>
                            </a>
                        </li>
                        <li class="m-menu__item {{ (Request::is('admin/brands')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                            <a  href="/admin/brands" class="m-menu__link ">
                                <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                    <span></span>
                                </i>
                                <span class="m-menu__link-text">
                                    Brand Favorite
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="m-menu__item  m-menu__item--submenu {{ (Request::is('admin/subscriber*')) ? ' m-menu__item--submenu m-menu__item--open m-menu__item--expanded' : '' }}" aria-haspopup="true"  m-menu-submenu-toggle="hover">
                <a  href="javascript:;" class="m-menu__link m-menu__toggle">
                    <i class="m-menu__link-icon flaticon-multimedia-3"></i>
                    <span class="m-menu__link-text">
                        Newsletter
                    </span>
                    <i class="m-menu__ver-arrow la la-angle-right"></i>
                </a>
                <div class="m-menu__submenu ">
                    <span class="m-menu__arrow"></span>
                    <ul class="m-menu__subnav">
                        <li class="m-menu__item  m-menu__item--parent" aria-haspopup="true" >
                            <span class="m-menu__link">
                                <span class="m-menu__link-text">
                                    Table
                                </span>
                            </span>
                        </li>
                        <li class="m-menu__item {{ (Request::is('admin/subscriber')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                            <a href="/admin/subscriber" class="m-menu__link ">
                                <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                    <span></span>
                                </i>
                                <span class="m-menu__link-text">
                                    List Subscriber
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="m-menu__item  {{ (Request::is('admin/report*')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                <a  href="{{url('admin/report')}}" class="m-menu__link ">
                    <i class="m-menu__link-icon flaticon-graph"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">
                                Report
                            </span>
                        </span>
                    </span>
                </a>
            </li>
            <li class="m-menu__item  m-menu__item--submenu {{ (Request::is('admin/users','admin/permissions','admin/userLog')) ? ' m-menu__item--submenu m-menu__item--open m-menu__item--expanded' : '' }}" aria-haspopup="true"  m-menu-submenu-toggle="hover">
                <a  href="javascript:;" class="m-menu__link m-menu__toggle">
                    <i class="m-menu__link-icon flaticon-user-settings"></i>
                    <span class="m-menu__link-text">
                        User Management
                    </span>
                    <i class="m-menu__ver-arrow la la-angle-right"></i>
                </a>
                <div class="m-menu__submenu ">
                    <span class="m-menu__arrow"></span>
                    <ul class="m-menu__subnav">
                        <li class="m-menu__item  m-menu__item--parent" aria-haspopup="true" >
                            <span class="m-menu__link">
                                <span class="m-menu__link-text">
                                    Table
                                </span>
                            </span>
                        </li>
                        <li class="m-menu__item {{ (Request::is('admin/users')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                            <a  href="{{route('users.index')}}" class="m-menu__link ">
                                <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                    <span></span>
                                </i>
                                <span class="m-menu__link-text">
                                    Users
                                </span>
                            </a>
                        </li>
                        <li class="m-menu__item {{ (Request::is('admin/permissions')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                            <a  href="{{route('permissions.index')}}" class="m-menu__link ">
                                <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                    <span></span>
                                </i>
                                <span class="m-menu__link-text">
                                    Roles
                                </span>
                            </a>
                        </li>
                        @permission('loguser-act')
                        <li class="m-menu__item {{ (Request::is('admin/userLog')) ? 'm-menu__item--active' : '' }}" aria-haspopup="true" >
                            <a  href="{{route('loguser.users')}}" class="m-menu__link ">
                                <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                    <span></span>
                                </i>
                                <span class="m-menu__link-text">
                                    Log Activity
                                </span>
                            </a>
                        </li>
                        @endpermission
                    </ul>
                </div>
            </li>
        </ul>
    </div>
    <!-- END: Aside Menu -->
</div>
<!-- END: Left Aside -->
<div class="m-grid__item m-grid__item--fluid m-wrapper">
    <!-- BEGIN: Subheader -->
    @yield("subheader")
    <!-- END: Subheader -->
    <div class="m-content" id="content">
        <!--Begin::Section-->
        @yield('konten')
        <!--End::Section-->
        <!--Begin::Section-->
        <div class="row">
            <div class="col-xl-4">
                <!--begin:: Widgets/Blog-->
                <!--end:: Widgets/Blog-->
            </div>
            <div class="col-xl-4">
                <!--begin:: Widgets/Blog-->

                <!--end:: Widgets/Blog-->
            </div>
            <div class="col-xl-4">
                <!--begin:: Packages-->

                <!--end:: Packages-->
            </div>
        </div>
        <!--End::Section-->
        <!--Begin::Section-->
        <div class="row">
            <div class="col-xl-12">
                <!--begin::Portlet-->
                <!--end::Portlet-->
            </div>
        </div>
        <!--End::Section-->
        <!--Begin::Section-->
        <div class="row">
            <div class="col-xl-6">
                <!--begin:: Widgets/Tasks -->
                <!--end:: Widgets/Tasks -->
            </div>
            <div class="col-xl-6">
                <!--begin:: Widgets/Support Tickets -->

                <!--end:: Widgets/Support Tickets -->
            </div>
        </div>
        <!--End::Section-->
        <!--Begin::Section-->
        <div class="row">
            <div class="col-xl-6 col-lg-12">
                <!--Begin::Portlet-->

                <!--End::Portlet-->
            </div>
            <div class="col-xl-6 col-lg-12">
                <!--Begin::Portlet-->

                <!--End::Portlet-->
            </div>
        </div>
        <!--End::Section-->
        <!--Begin::Section-->

        <!--End::Section-->   
        <!--Begin::Section-->
        <div class="row">
            <div class="col-xl-8">
                <!--begin:: Widgets/Best Sellers-->

                <!--end:: Widgets/Best Sellers-->
            </div>
            <div class="col-xl-4">
                <!--begin:: Widgets/Authors Profit-->

                <!--end:: Widgets/Authors Profit-->
            </div>
        </div>
        <!--End::Section-->
    </div>
</div>
</div>
<!-- end:: Body -->
<!-- begin::Footer -->
<footer class="m-grid__item		m-footer">
    <div class="m-container m-container--fluid m-container--full-height m-page__container">
        <div class="m-stack m-stack--flex-tablet-and-mobile m-stack--ver m-stack--desktop">
            <div class="m-stack__item m-stack__item--left m-stack__item--middle m-stack__item--last">
                <span class="m-footer__copyright">
                    2018 &copy; Build with <i class="flaticon-black"></i> and Some <i class="flaticon-tea-cup"></i>
                    || Bandung[<i class="flaticon-placeholder-2"></i>]
                    {{-- <a href="https://keenthemes.com" class="m-link">
                        Keenthemes
                    </a> --}}
                </span>
            </div>
            <div class="m-stack__item m-stack__item--right m-stack__item--middle m-stack__item--first">
                <ul class="m-footer__nav m-nav m-nav--inline m--pull-right">
                    <li class="m-nav__item">
                        <a href="#" class="m-nav__link">
                            <span class="m-nav__link-text">
                                About
                            </span>
                        </a>
                    </li>
                    <li class="m-nav__item">
                        <a href="#"  class="m-nav__link">
                            <span class="m-nav__link-text">
                                Privacy
                            </span>
                        </a>
                    </li>
                    <li class="m-nav__item">
                        <a href="#" class="m-nav__link">
                            <span class="m-nav__link-text">
                                T&C
                            </span>
                        </a>
                    </li>
                    <li class="m-nav__item">
                        <a href="#" class="m-nav__link">
                            <span class="m-nav__link-text">
                                Purchase
                            </span>
                        </a>
                    </li>
                    <li class="m-nav__item m-nav__item">
                        <a href="#" class="m-nav__link" data-toggle="m-tooltip" title="Support Center" data-placement="left">
                            <i class="m-nav__link-icon flaticon-info m--icon-font-size-lg3"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
<!-- end::Footer -->
</div>
<!-- end:: Page -->
<!-- begin::Quick Sidebar -->
<div id="m_quick_sidebar" class="m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light">
    <div class="m-quick-sidebar__content m--hide">
        <span id="m_quick_sidebar_close" class="m-quick-sidebar__close">
            <i class="la la-close"></i>
        </span>
        <ul id="m_quick_sidebar_tabs" class="nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand" role="tablist">
            <li class="nav-item m-tabs__item">
                <a class="nav-link m-tabs__link active" data-toggle="tab" href="#m_quick_sidebar_tabs_messenger" role="tab">
                    Messages
                </a>
            </li>
            <li class="nav-item m-tabs__item">
                <a class="nav-link m-tabs__link"        data-toggle="tab" href="#m_quick_sidebar_tabs_settings" role="tab">
                    Settings
                </a>
            </li>
            <li class="nav-item m-tabs__item">
                <a class="nav-link m-tabs__link" data-toggle="tab" href="#m_quick_sidebar_tabs_logs" role="tab">
                    Logs
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active m-scrollable" id="m_quick_sidebar_tabs_messenger" role="tabpanel">
                <div class="m-messenger m-messenger--message-arrow m-messenger--skin-light">
                    <div class="m-messenger__messages">
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--in">
                                <div class="m-messenger__message-pic">
                                    <img src="assets/app/media/img//users/user3.jpg" alt=""/>
                                </div>
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-username">
                                            Megan wrote
                                        </div>
                                        <div class="m-messenger__message-text">
                                            Hi Bob. What time will be the meeting ?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--out">
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-text">
                                            Hi Megan. It's at 2.30PM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--in">
                                <div class="m-messenger__message-pic">
                                    <img src="assets/app/media/img//users/user3.jpg" alt=""/>
                                </div>
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-username">
                                            Megan wrote
                                        </div>
                                        <div class="m-messenger__message-text">
                                            Will the development team be joining ?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--out">
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-text">
                                            Yes sure. I invited them as well
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__datetime">
                            2:30PM
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--in">
                                <div class="m-messenger__message-pic">
                                    <img src="assets/app/media/img//users/user3.jpg"  alt=""/>
                                </div>
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-username">
                                            Megan wrote
                                        </div>
                                        <div class="m-messenger__message-text">
                                            Noted. For the Coca-Cola Mobile App project as well ?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--out">
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-text">
                                            Yes, sure.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--out">
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-text">
                                            Please also prepare the quotation for the Loop CRM project as well.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__datetime">
                            3:15PM
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--in">
                                <div class="m-messenger__message-no-pic m--bg-fill-danger">
                                    <span>
                                        M
                                    </span>
                                </div>
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-username">
                                            Megan wrote
                                        </div>
                                        <div class="m-messenger__message-text">
                                            Noted. I will prepare it.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--out">
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-text">
                                            Thanks Megan. I will see you later.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-messenger__wrapper">
                            <div class="m-messenger__message m-messenger__message--in">
                                <div class="m-messenger__message-pic">
                                    <img src="assets/app/media/img//users/user3.jpg"  alt=""/>
                                </div>
                                <div class="m-messenger__message-body">
                                    <div class="m-messenger__message-arrow"></div>
                                    <div class="m-messenger__message-content">
                                        <div class="m-messenger__message-username">
                                            Megan wrote
                                        </div>
                                        <div class="m-messenger__message-text">
                                            Sure. See you in the meeting soon.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-messenger__seperator"></div>
                    <div class="m-messenger__form">
                        <div class="m-messenger__form-controls">
                            <input type="text" name="" placeholder="Type here..." class="m-messenger__form-input">
                        </div>
                        <div class="m-messenger__form-tools">
                            <a href="" class="m-messenger__form-attachment">
                                <i class="la la-paperclip"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane  m-scrollable" id="m_quick_sidebar_tabs_settings" role="tabpanel">
                <div class="m-list-settings">
                    <div class="m-list-settings__group">
                        <div class="m-list-settings__heading">
                            General Settings
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                Email Notifications
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" checked="checked" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                Site Tracking
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                SMS Alerts
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                Backup Storage
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                Audit Logs
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" checked="checked" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="m-list-settings__group">
                        <div class="m-list-settings__heading">
                            System Settings
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                System Logs
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                Error Reporting
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                Applications Logs
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                Backup Servers
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" checked="checked" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div class="m-list-settings__item">
                            <span class="m-list-settings__item-label">
                                Audit Logs
                            </span>
                            <span class="m-list-settings__item-control">
                                <span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane  m-scrollable" id="m_quick_sidebar_tabs_logs" role="tabpanel">
                <div class="m-list-timeline">
                    <div class="m-list-timeline__group">
                        <div class="m-list-timeline__heading">
                            System Logs
                        </div>
                        <div class="m-list-timeline__items">
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    12 new users registered
                                    <span class="m-badge m-badge--warning m-badge--wide">
                                        important
                                    </span>
                                </a>
                                <span class="m-list-timeline__time">
                                    Just now
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    System shutdown
                                </a>
                                <span class="m-list-timeline__time">
                                    11 mins
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
                                <a href="" class="m-list-timeline__text">
                                    New invoice received
                                </a>
                                <span class="m-list-timeline__time">
                                    20 mins
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
                                <a href="" class="m-list-timeline__text">
                                    Database overloaded 89%
                                    <span class="m-badge m-badge--success m-badge--wide">
                                        resolved
                                    </span>
                                </a>
                                <span class="m-list-timeline__time">
                                    1 hr
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    System error
                                </a>
                                <span class="m-list-timeline__time">
                                    2 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    Production server down
                                    <span class="m-badge m-badge--danger m-badge--wide">
                                        pending
                                    </span>
                                </a>
                                <span class="m-list-timeline__time">
                                    3 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    Production server up
                                </a>
                                <span class="m-list-timeline__time">
                                    5 hrs
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="m-list-timeline__group">
                        <div class="m-list-timeline__heading">
                            Applications Logs
                        </div>
                        <div class="m-list-timeline__items">
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    New order received
                                    <span class="m-badge m-badge--info m-badge--wide">
                                        urgent
                                    </span>
                                </a>
                                <span class="m-list-timeline__time">
                                    7 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    12 new users registered
                                </a>
                                <span class="m-list-timeline__time">
                                    Just now
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    System shutdown
                                </a>
                                <span class="m-list-timeline__time">
                                    11 mins
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
                                <a href="" class="m-list-timeline__text">
                                    New invoices received
                                </a>
                                <span class="m-list-timeline__time">
                                    20 mins
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
                                <a href="" class="m-list-timeline__text">
                                    Database overloaded 89%
                                </a>
                                <span class="m-list-timeline__time">
                                    1 hr
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    System error
                                    <span class="m-badge m-badge--info m-badge--wide">
                                        pending
                                    </span>
                                </a>
                                <span class="m-list-timeline__time">
                                    2 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    Production server down
                                </a>
                                <span class="m-list-timeline__time">
                                    3 hrs
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="m-list-timeline__group">
                        <div class="m-list-timeline__heading">
                            Server Logs
                        </div>
                        <div class="m-list-timeline__items">
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    Production server up
                                </a>
                                <span class="m-list-timeline__time">
                                    5 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    New order received
                                </a>
                                <span class="m-list-timeline__time">
                                    7 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    12 new users registered
                                </a>
                                <span class="m-list-timeline__time">
                                    Just now
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    System shutdown
                                </a>
                                <span class="m-list-timeline__time">
                                    11 mins
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
                                <a href="" class="m-list-timeline__text">
                                    New invoice received
                                </a>
                                <span class="m-list-timeline__time">
                                    20 mins
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
                                <a href="" class="m-list-timeline__text">
                                    Database overloaded 89%
                                </a>
                                <span class="m-list-timeline__time">
                                    1 hr
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    System error
                                </a>
                                <span class="m-list-timeline__time">
                                    2 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    Production server down
                                </a>
                                <span class="m-list-timeline__time">
                                    3 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
                                <a href="" class="m-list-timeline__text">
                                    Production server up
                                </a>
                                <span class="m-list-timeline__time">
                                    5 hrs
                                </span>
                            </div>
                            <div class="m-list-timeline__item">
                                <span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
                                <a href="" class="m-list-timeline__text">
                                    New order received
                                </a>
                                <span class="m-list-timeline__time">
                                    1117 hrs
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end::Quick Sidebar -->         
<!-- begin::Scroll Top -->
<div id="m_scroll_top" class="m-scroll-top">
    <i class="la la-arrow-up"></i>
</div>
<!-- end::Scroll Top -->            <!-- begin::Quick Nav -->
<!-- end:: Page -->
<!--end::Page Snippets -->
<!--begin::Base Scripts -->
<script src="{{asset('js/backend/vendors.bundle.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/scripts.bundle.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/dashboard.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/select2.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/fullcalendar.bundle.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/html-table.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/sweetalert2.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/form-controls.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/bootstrap-datepicker.js')}}" type="text/javascript"></script>
<script src="{{asset('js/apexcharts.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/backend/summernote.js')}}" type="text/javascript"></script>
<!--end::Base Scripts -->   
<!--begin::Page Snippets -->
<script src="{{asset('js/backend/login.js')}}" type="text/javascript"></script>
<script src="{{asset('js/show-error.js')}}" type="text/javascript"></script>
{{-- PJAX --}}
<script type="text/javascript" src="{{asset('js/jquery.pjax.js')}}"></script>
{{-- <script type="text/javascript">
    $(function(){
    // pjax
    $(document).pjax('a', '#content')
    })
    $(document).ready(function(){
        if ($.support.pjax) {
        $.pjax.defaults.timeout = 2000; // time in milliseconds
        }
    });
</script> --}}
@yield('scripts')
<script src="{{asset('js/toolbar-position.js')}}" type="text/javascript"></script>
</body>
<!-- end::Body -->
</html>
