@extends('backend.index')
@section('konten')
@if(session()->has('success'))
<input type="hidden" id="success" value="{{ session()->get('success') }}">
@endif
@if($errors->any())
<input type="hidden" id="errors" value="{{ $errors }}">
@endif
<div class="clearfix"></div>
<div class="m-portlet m-portlet--mobile">
	<div class="m-portlet__head">
		<div class="m-portlet__head-caption">
			<div class="m-portlet__head-title">
				<h3 class="m-portlet__head-text">
                    <div class="d-flex align-items-center">
                        <div class="mr-auto">
                            <ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
                                <li class="m-nav__item m-nav__item--home">
                                    <a href="/home" class="m-nav__link m-nav__link--icon">
                                        <i class="m-nav__link-icon la la-home"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </h3>
            </div>
        </div>
        <div class="m-portlet__head-tools">
            <div class="action-area pull-right">
                <button id="today" onclick="getData('today')" class="btn btn-success active">Today</button>
                <button id="week" onclick="getData('week')" class="btn btn-success">1 Week</button>
                <button id="month" onclick="getData('month')" class="btn btn-success">1 Month</button>
                <button id="year" onclick="getData('year')" class="btn btn-success">1 Year</button>

            </div>
        </div>
    </div>
    <div class="m-portlet__body" style="background-color:#f1f1f1">
        <div class="row">
            <div class="col-lg-2">
                <div class="m-portlet m-portlet--border-bottom-brand">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Total Hit</small>
                                570
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="m-portlet m-portlet--border-bottom-warning">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Unique Visitor</small>
                                570
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="m-portlet m-portlet--border-bottom-info">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Total Order</small>
                                <span id="total_order">570</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="m-portlet m-portlet--border-bottom-accent">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Total Item</small>
                                <span id="total_item">570</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="m-portlet m-portlet--border-bottom-success">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Revenue</small>
                                <span id="revenue">Rp. 0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4">
                <div class="m-portlet m-portlet--border-bottom-primary">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>New Order</small>
                                <span id="new_order">570 | Rp. 150.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="m-portlet m-portlet--border-bottom-danger">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Konfirmasi User</small>
                                <span id="konfirmasi_user">570 | Rp. 150.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="m-portlet m-portlet--border-bottom-warning">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Konfirmasi Admin</small>
                                <span id="konfirmasi_admin">570 | Rp. 150.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="m-portlet m-portlet--border-bottom-success">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Barang Dikirim</small>
                                <span id="barang_dikirim">570 | Rp. 150.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="m-portlet m-portlet--border-bottom-info">
                    <div class="m-portlet__body">
                        <div class="m-widget26">
                            <div class="m-widget26__number">
                                <small>Barang Diterima / Selesai</small>
                                <span id="barang_diterima">570 | Rp. 150.000<span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div id="chart-1" style="height:500px; background-color:#fff"></div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-lg-8">
                <div id="chart-2" style="background-color:#fff;"></div>
            </div>
            <div class="col-lg-4">
                <div id="legend" class="donut-legend"></div>
            </div>
        </div>
    </div>
</div>
@endsection
@section("scripts")
<script>
new Morris.Line({
  element: 'chart-1',
  data: [
    { y: '2012', visitor: 100, order: 90 },
    { y: '2013', visitor: 75,  order: 65 },
    { y: '2014', visitor: 50,  order: 40 },
    { y: '2015', visitor: 75,  order: 65 },
    { y: '2016', visitor: 50,  order: 40 },
    { y: '2017', visitor: 75,  order: 65 },
    { y: '2018', visitor: 100, order: 90 }
  ],
  xkey: 'y',
  ykeys: ['visitor', 'order'],
  labels: ['Visitor', 'Order']
});
var browsersChart = new Morris.Line({
  element: 'chart-2',
  data: [
    { y: '2012', visitor: 100, order: 90 },
    { y: '2013', visitor: 75,  order: 65 },
    { y: '2014', visitor: 50,  order: 40 },
    { y: '2015', visitor: 75,  order: 65 },
    { y: '2016', visitor: 50,  order: 40 },
    { y: '2017', visitor: 75,  order: 65 },
    { y: '2018', visitor: 100, order: 90 }
  ],
  hideHover:'auto',
  xkey: 'y',
  ykeys: ['visitor', 'order'],
  labels: ['Visitor', 'Order']
});
browsersChart.options.labels.forEach(function(label, i) {
    var legendItem = $('<span></span>').text(label).prepend('<br><span>&nbsp;</span>');
    legendItem.find('span')
        .css('backgroundColor', browsersChart.options.lineColors[i])
        .css('width', '20px')
        .css('display', 'inline-block')
        .css('margin', '5px');
    $('#legend').append(legendItem)
});
function convertToRupiah(angka) {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ',';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}
function getData(date){
    $("#today,#week,#month,#year").removeClass("active");
    $("#"+date).addClass("active");
    $.ajax({
        url : "/api/dashboard?date="+date,
        methode : "GET",
        success : function(data){
            $("#total_order").html(data.order);
            $("#total_item").html(data.item);
            $("#revenue").html(convertToRupiah(data.revenue));
            keys = Object.keys(data);
            for(let i = 3;i<=7;i++){
                $("#"+keys[i]).html(data[keys[i]].count + " | " + convertToRupiah(data[keys[i]].revenue));
            }
        }
    })
}
getData("today");
</script>
@endsection