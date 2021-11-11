@extends('backend.index')
@section('konten')

<div class="m-portlet m-portlet--mobile">
	<div class="m-portlet__head">
		<div class="m-portlet__head-caption">
			<div class="m-portlet__head-title">
				<h3 class="m-portlet__head-text">
					LOG USERS
				</h3>
			</div>
		</div>
	</div>
	<div class="m-portlet__body">
	<button onclick="refresh()" type="button" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-refresh"></i> Refresh</button>
		<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
			<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="asdwd">
				<caption>table title and/or explanatory text</caption>
				<thead>
					<tr>
						<th>NO</th>
						<th>Log Name</th>
						<th>Role</th>
						<th>Description</th>
						<th>Date</th>
						<th align="center" style="text-align: center;">Action</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table> 
		</div>
	</div>
</div>

<script type="text/javascript">
function refresh() {
	table.ajax.reload();
	console.log('Refreshed');
}

	var table = $('#asdwd').DataTable({
		responsive: true,
		scrollX : true,
		processing: true,
		serverSide: true,
		ajax: "{{ route('apiloguser.users') }}",
		columns: [
		{
			"data": null,
			"width": "5%",
			"searchable": false,
			"orderable": false
		},
		{data: 'properties.customProperty', name: 'properties.customProperty'},
		{data: 'subject_id', name: 'subject_id',
		render: function(data){
			if (data == 1) {return 'Super Admin';}
			if (data == 2) {return 'Admin';}
			if (data == 3) {return 'Member';}
			}
		},
		{data: 'description', name : 'description'},
		{data: 'created_at', name: 'created_at'},
		{data: 'action', name: 'action', orderable :false, searchable :false}
	]
});
	table.on('draw.dt search.dt', function () {
		table.column(0, {search:'applied'}).nodes().each(function (cell, i) {
			cell.innerHTML = i+1;
		});
	}).draw();

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
					url  : "{{ url('admin/userLog') }}" + '/' + id,
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
</script>


@endsection