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
									Banners
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="col-md-4">
		<a href="{{ route("banners.create") }}" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add Banners</a>
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
	<div id="banner-list" width="100%"> 
	</div>
	</div>
</div>
@endsection
@section('scripts')
<script type="text/javascript">
	var datatable = $('#banner-list').mDatatable({
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
					url: "/api/banner",
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
					return index + 1;
				}
			},
			{
				field: 'title',
				title: 'Title',
				width: '250'
			},
			{
				field: 'url',
				title: 'Banner',
				width: '350',
				template: function(row){
					return `<img src='${row.url}' width="30%" height="30%">`
				}
			},
			{
				field: 'action',
				title: 'Action',
				width: '150',
				template: function(row){
					return `<a class="btn btn-primary" href="/admin/banners/${row.id}">Detail</a> <form id="form-${row.id}" method="POST" action="/admin/banners/${row.id}" style="display:inline"><input type="hidden" name="_method" value="DELETE">{{ csrf_field() }}<button class="btn btn-danger delete" type="button" onclick="konfirmasi(${row.id},'${row.title}')">Delete</button>`
				}
			}
		],
	});
	function konfirmasi(id,title){
		swal({
			title: '<strong>Yakin ingin menghapus '+title+'?</strong>',
			type: 'warning',
			showCloseButton: true,
			showCancelButton: true,
			focusConfirm: false,
			confirmButtonText:
				'Yakin',
			cancelButtonText:
				'Batal'
		}).then(function(isConfirm){
			if(isConfirm.value==true){
				$("#form-"+id).submit(); 
			}else{
				swal("Cancelled", "Dibatalkan", "error");
				return false;
			}
		})
	}
	if($("#success").val() != undefined){
        swal(
            'Success!',
            `${$("#success").val()}`,
            'success'
        )
    }
	if($("#errors").val() != undefined){
        var errors = JSON.parse($("#errors").val());
        if(errors != undefined){
            showError(errors);
        }
    }
</script>
@endsection