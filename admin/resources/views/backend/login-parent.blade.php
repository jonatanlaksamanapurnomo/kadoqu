<!DOCTYPE html>
<html lang="en" >
    <!-- begin::Head -->
    <head>
        <meta charset="utf-8" />
        <title>
            Kadoqu | Login Page
        </title>
        <meta name="description" content="Latest updates and statistic charts">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
        <link href="{{asset('css/backend/vendors.bundle.css')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('css/backend/style.bundle.css')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('css/backend/fullcalendar.bundle.css')}}" rel="stylesheet" type="text/css" />
        <!--end::Base Styles -->
        <link rel="shortcut icon" href="../../../assets/demo/default/media/img/logo/favicon.ico" />
    </head>
    <!-- end::Head -->
    <!-- end::Body -->
    <body  class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default"  >
        <!-- begin:: Page -->
                @yield('konten')
                @include('layouts._flash')

        <!-- end:: Page -->
        <!--begin::Base Scripts -->
        <script src="{{asset('js/backend/vendors.bundle.js')}}" type="text/javascript"></script>
        <script src="{{asset('js/backend/scripts.bundle.js')}}" type="text/javascript"></script>
        <script src="{{asset('js/backend/fullcalendar.bundle.js')}}" type="text/javascript"></script>
        <script src="{{asset('js/backend/dashboard.js')}}" type="text/javascript"></script>
        <!--end::Base Scripts -->   
        <!--begin::Page Snippets -->
        <script src="{{asset('js/backend/login.js')}}" type="text/javascript"></script>
        <!--end::Page Snippets -->
    </body>
    <!-- end::Body -->
</html>
