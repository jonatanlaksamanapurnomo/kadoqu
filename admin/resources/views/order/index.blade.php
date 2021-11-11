@extends('backend.index')
@section('konten')

<div class="m-portlet m-portlet--mobile">
	<div class="m-portlet__body">
	<div class="row">
		<div class="col-md-8">
			<div class="d-flex align-items-center">
				<div class="mr-auto">
					<ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
						<li class="m-nav__item m-nav__item--home">
							<a href="/home" class="m-nav__link m-nav__link--icon">
								<i class="m-nav__link-icon la la-home"></i>
							</a>
						</li>
						<li class="m-nav__separator">
							-
						</li>
						<li class="m-nav__item">
							<a href="#" class="m-nav__link">
								<span class="m-nav__link-text">
									Order
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="col-md-4 m--align-right">
			<div class="m-input-icon m-input-icon--right">
				<input type="text" class="form-control m-input" placeholder="Search..." id="generalSearch">
				<span class="m-input-icon__icon m-input-icon__icon--right">
					<span>
						<i class="la la-search"></i>
					</span>
				</span>
			</div>
		</div>
	</div>
	<br>
	<div id="order-list" width="100%"> 
	</div>
	</div>
</div>
<!-- Modal -->
<div class="modal fade" id="detail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Detail Order</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="info">
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
@endsection
@section('scripts')
<script type="text/javascript">
	var datatable = $('#order-list').mDatatable({
		data: {
			type: 'remote',
			source: {
				read: {
					method: 'GET',
					url: "/api/order",
					map: function (raw) {
						var dataSet = raw;
						if (typeof raw !== 'undefined') {
							dataSet = raw;
						}
						return dataSet;
					}
				}
			}
		},
		search: {
			input: $('#generalSearch'),
		},
		columns: [
			{
				field: 'Index',
				title: '#',
				width: 50,
				textAlign: 'center',
				template: function (row, index, datatable) {
					return index + 1;
				}
			},
			{
				field: 'tanggal',
				title: 'Tanggal Order',
				width: 150,
				template: function(row){
					return row.date;
				}
			},
			{
				field: 'order_no',
				title: 'Nomor Order',
				template: function(row){
					return "#" + row.order_no;
				}
			},
            {
                field: 'total_bayar',
                title: 'Total Bayar',
				width: 100
            },
			{
				field: 'total_item',
				title: 'Total Item',
				textAlign: 'center',
				width: 70,
				template: function(row){
					return row.item.length;
				}
			},
			{
				field: 'metode_pembayaran',
				title: 'Payment Method'
			},
            {
                field: 'status',
                title: 'Status',
                template: function(row){
                   return row.statusinfo[row.status];
                }
            },
            {
				field: 'detail',
				title: 'Detail',
				template: function (row){
					if(row.item == null){
						return `Tidak Ada Data`;
					}else{
						return `<a class="btn-detail btn btn-primary" href="{{ url('admin/order/${row.order_no}') }}">Lihat</a>`;
					}
				}
			},
		],
	});
    
</script>
@endsection