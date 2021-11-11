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
									Subscriber
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
	<div id="subscriber-list" width="100%"> 
	</div>
	</div>
</div>

@endsection
@section('scripts')
<script type="text/javascript">
	$(document).ready(function(){
		var datatable = $('#subscriber-list').mDatatable({
		data: {
			type: 'remote',
			source: {
				read: {
					method: 'GET',
					url: "/api/subscriber",
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
				field: 'email',
				title: 'Email',
            },
            {
                field: 'date',
                title: 'Tanggal Subscribe',
            }
		],
	});
	})
</script>
@endsection