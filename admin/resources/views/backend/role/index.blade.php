@extends('backend.index')
@section('konten')

<div class="m-portlet m-portlet--mobile">
	<div class="m-portlet__head">
		<div class="m-portlet__head-caption">
			<div class="m-portlet__head-title">
				<h3 class="m-portlet__head-text">
					permissions MANAGEMENT
				</h3>
			</div>
		</div>
	</div>
	<div class="m-portlet__body">
	@permission('loguser-act')
		<button onclick="addForm()" type="button" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add permissions</button>
	@endpermission
		<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
			<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="asdwd">
				<caption>table title and/or explanatory text</caption>
				<thead>
					<tr>
						<th>NO</th>
						<th>Name</th>
						<th align="center" style="text-align: center;">Action</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table> 
		</div>
	</div>
</div>

{{-- //modals// --}}

<div class="modal fade" id="modal_form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">
					New message
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">
						&times;
					</span>
				</button>
			</div>

			<div class="modal-body">
				<form name="form" id="form" accept="#" enctype="multipart/form-data">
					{{ csrf_field() }}  {{ method_field('POST') }}
					<input type="hidden" id="id" name="id">
					<input type="hidden" name="images" class="form-control" id="images">
					<div class="form-group">
						<label for="name" class="form-control-label">
							Name:
						</label>
						<input type="text" name="name" class="form-control" id="name">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">
						Close
					</button>
					<button type="submit"  class="btn btn-primary">
						Save
					</button>
				</div>
			</form>
		</div>
	</div>
</div>


<script type="text/javascript">
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	function notifytest()
	{
		$.notify("Enter: Bounce InExit: Bounce Out", {
			animate: {
				enter: 'animated bounceIn',
				exit: 'animated bounceOut'
			}
		});
	}


	var table = $('#asdwd').DataTable({
		processing: true,
		serverSide: true,
		ajax: "{{ route('api.permissions') }}",
		columns: [
		{
			"data": null,
			"width": "5%",
			"searchable": false,
			"orderable": false
		},
		{data: 'name', name: 'name'},
		{data: 'action', name: 'action', orderable :false, searchable :false}
		]
});
	table.on('draw.dt search.dt', function () {
		table.column(0, {search:'applied'}).nodes().each(function (cell, i) {
			cell.innerHTML = i+1;
		});
	}).draw();

	//Modals
	function addForm() {
		save_method = "add";
		$('input[name=_method]').val('POST');
		$('#modal_form').modal('show');
		$('#form')[0].reset();
		$('.modal-title').text('Add Permissions');
	}

	function editForm(id) {
		save_method = "edit";
		$('input[name=_method]').val('PATCH');
		$('#form')[0].reset();
		$.ajax({
			url  : "{{ url('admin/permissions') }}" + '/' +id+ '/edit',
			type : "GET" ,
			data : "JSON",
			success : function(data) {
				$('#modal_form').modal('show');
				$('.modal-title').text('Edit Category');

				$('#id').val(data.id);
				$('#name').val(data.name);
			},
			error : function() {
				alert('Somethink Worng');
			}
		});
	}

	function deleteData(id) {
		var csrf_token = $('meta[name="csrf-token"]').attr('content');
		swal({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!'
		}).then(function(result) {
			if (result.value) {
				$.ajax({
					url  : "{{ url('admin/permissions') }}" + '/' + id,
					type : "POST",
					data : {'_method' : 'DELETE', '_token' : csrf_token},
					success : function(data) {
						table.ajax.reload();
						$('#modal_form').modal('hide');
						$.notify({
							title: '<strong>Success Delete Data !</strong>',
							message: 'The data Already Deleted'
						},{
							type: 'danger'
						});
						console.log('success deleting data');
					},
					error : function() {
						alert("Oops! Somethink Worng");
					}
				});
			} else {
				console.log('Canceled!');
			}
		});

	}


	$(function(){
		$('#form').on('submit', function (e) {
			if (!e.isDefaultPrevented()) {
				var id = $('#id').val();
				if (save_method == 'add') url = "{{ url('admin/permissions') }}";
				else url = "{{ url('admin/permissions').'/' }}" + id;

				$.ajax({
					url  : url,
					type : "POST",
					// data : $('#form').serialize(),
					data : new FormData($('#form')[0]),
					contentType : false,
					processData : false,
					success : function($data) {
						$('#modal_form').modal('hide');
						if (save_method == 'add') {
							$.notify("<strong>Success Add Data <u>" +$data.name+ "</u> !</strong>", {
								animate: {
									enter: 'animated bounceIn',
									exit: 'animated bounceOut'
								}
							});
						} else {
							$.notify("<strong>Success Edit <u>" +$data.name+ "</u> !</strong>", {
								animate: {
									enter: 'animated bounceIn',
									exit: 'animated bounceOut'
								}
							});
						}
						table.ajax.reload();
					},
					error : function() {
						alert("Oops! Somethink Worng");
					}
				});

				return false;
			}
		});
	});
</script>

@endsection