@extends('backend.index')
@section('konten')
@if(session()->has('success'))
<input type="hidden" id="success" value="{{ session()->get('success') }}">
@endif
@if($errors->any())
<input type="hidden" id="errors" value="{{ $errors }}">
@endif
<div class="m-portlet m-portlet--mobile">
	<div class="m-portlet__body">
	<div class="row">
		<div class="col-md-4">
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
									Products
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="col-md-4">
		<a href="{{ route("products.create") }}" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add Products</a>
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
	<div id="product-list" width="100%"> 
	</div>
	</div>
</div>
<!-- Modal -->
<div class="modal fade" id="images" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Gambar Produk</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="image-list">
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
	var datatable = $('#product-list').mDatatable({
		toolbar: {
			layout: ['pagination'],

			placement: ['bottom'],  //'top', 'bottom'

			items: {
				pagination: {
					type: 'default',

					pages: {
						desktop: {
							layout: 'default',
							pagesNumber: 4
						},
						tablet: {
							layout: 'default',
							pagesNumber: 3
						},
						mobile: {
							layout: 'compact'
						}
					},

					navigation: {
						prev: true,
						next: true,
						first: true,
						last: true
					},

					pageSizeSelect: [10, 20, 30, 50, 100]
				},

				info: true
			}
		},
		data: {
			type: 'remote',
			source: {
				read: {
					method: 'GET',
					url: "/api/products",
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
				width: '50',
				textAlign: 'center',
				template: function (row, index, datatable) {
					// datatable.getCurrentPage();
					return index + 1;
				}
			},
			{
				field: 'images',
				title: 'Image',
				width: '75',
				template: function (row){
					if(row.images == null){
						return `Tidak Ada Gambar`;
					}else if(row.images.length>0){
						return `<img src="/produk/${row.images[0].gambar}" class="img-fluid">`;
					}else{
						return `Tidak Ada Gambar`;
					}
				}
			},
			{
				field: 'SKU',
				title: 'SKU',
				width: '100',
			},
			{
				field: 'namaProduk',
				title: 'Nama Produk',
				width: '200',
			},
			{
				field: 'brand.nameBrand',
				title: 'Brand'
			},
			{
				field: 'Stok',
				title: 'Stok',
				width: '100',
				template: function(row){
					return `<label>Total : ${row.stock.stock}</label> <label>Available : ${row.stock.available}</label> <label>On Hold : ${row.stock.onhold}</label>`
				}
			},
			{
				field: 'detail',
				title: 'Aksi',
				width: '100',
				template: function(row){
					return `<a class="btn-detail btn btn-primary" href="{{ url('admin/products/${row.SKU}') }}">Lihat Detail</a>`;
				}
			},
		],
	});
	if($("#success").val() != undefined){
        toastr.success($("#success").val());
    }
    if($("#errors").val() != undefined){
        var errors = JSON.parse($("#errors").val());
        if(errors != undefined){
            showError(errors);
        }
    }
</script>
@endsection