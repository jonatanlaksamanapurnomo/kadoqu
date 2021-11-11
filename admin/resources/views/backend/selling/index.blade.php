@extends('backend.index')
@section('konten')

<div class="m-portlet m-portlet--mobile">
	<div class="m-portlet__head">
		<div class="m-portlet__head-caption">
			<div class="m-portlet__head-title">
				<h3 class="m-portlet__head-text">
					SELLING
				</h3>
			</div>
		</div>
	</div>
	<div class="m-portlet__body">
		<button onclick="addForm()" type="button" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add Data</button>
		<select class="btn btn-outline-primary" name="tahun">
			<option>Tahun</option>
		<?php $tahun = 2011; for($tahun;$tahun<=2020;$tahun++){ ?>
			<option value="<?php echo $tahun ?>"><?php echo $tahun ?></option>
		<?php }?>
		</select>
		<select class="btn btn-outline-primary" name="bulan">
			<option>Bulan</option>
			<option value="01">Januari</option>
			<option value="02">Februari</option>
			<option value="03">Maret</option>
			<option value="04">April</option>
			<option value="05">Mei</option>
			<option value="06">Juni</option>
			<option value="07">Juli</option>
			<option value="08">Augustus</option>
			<option value="09">September</option>
			<option value="10">Oktober</option>
			<option value="11">November</option> 
			<option value="12">Desember</option> 
		</select>
		<div>
			<span id="switch" class="m-switch m-switch--outline m-switch--icon m-switch--warning">
				<label>
					<input id="hidenseek" type="checkbox" value="" checked="checked" name="">
					<span></span>
				</label>
			</span>
		</div>
		<div id="chart">
			{{-- Charts --}}
		</div>
		<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
			<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="asdwd">
				<caption>table title and/or explanatory text</caption>
				<thead>
					<tr>
						<th>NO</th>
						<th>Date</th>
						<th>Amount</th>
						<th align="center" style="text-align: center;">Action</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table> 
		</div>
	</div>
</div>

{{-- Modals --}}

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
				<form name="form" id="form" accept="#">
					{{ csrf_field() }}  {{ method_field('POST') }}
					<input type="hidden" id="id" name="id">
					<div class="form-group m-form__group row">
						<label class="col-form-label col-lg-3 col-sm-12">
							Date
						</label>
						<div class="col-lg-12 col-md-9 col-sm-12">
							<div class="input-group date">
								<input type="text" class="form-control m-input" name="date" readonly="" placeholder="Select date" id="m_datepicker_2">
								<div class="input-group-append">
									<span class="input-group-text">
										<i class="la la-calendar-check-o"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="amount" class="form-control-label">
							Amount:
						</label>
						<input type="number" placeholder="Insert Amount" name="amount" class="form-control" id="amount">
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
	var table = $('#asdwd').DataTable({
		processing: true,
		serverSide: true,
		ajax: "{{ route('api.selling') }}",
		columns: [
		{
			"data": null,
			"width": "5%",
			"searchable": false,
			"orderable": false
		},
		{data: 'date', name: 'date',
		render: function(data){
				var d = new Date(data);
				var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate(); 
				var month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1): d.getMonth() + 1;
				var year = d.getFullYear();
				return  day + "-" + month + "-" + year;
			}
		},
		{data: 'amount', name: 'amount',
		render: function convertToRupiah(amount) {
		        var rupiah = '';
		        var angkarev = amount.toString().split('').reverse().join('');
		        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ',';
		        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    		}},
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
		$('.modal-title').text('Add Data');
	}

	function editForm(id) {
		save_method = "edit";
		$('input[name=_method]').val('PATCH');
		$('#form')[0].reset();
		$.ajax({
			url  : "{{ url('admin/selling') }}" + '/' +id+ '/edit',
			type : "GET" ,
			data : "JSON",
			success : function(data) {
				$('#modal_form').modal('show');
				$('.modal-title').text('Edit Data');

				$('#id').val(data.id);
				$('#m_datepicker_2').val(data.date);
				$('#amount').val(data.amount);
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
				url  : "{{ url('admin/selling') }}" + '/' + id,
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
				if (save_method == 'add') url = "{{ url('admin/selling') }}";
				else url = "{{ url('admin/selling').'/' }}" + id;

				$.ajax({
					url  : url,
					type : "POST",
					data : $('#form').serialize(),
					success : function($data) {
						$('#modal_form').modal('hide');
						if (save_method == 'add') {
							$.notify("<strong>Success Add Data <u>" +$data.amount+ "</u> !</strong>", {
								animate: {
									enter: 'animated bounceIn',
									exit: 'animated bounceOut'
								}
							});
						} else {
							$.notify("<strong>Success Edit <u>" +$data.amount+ "</u> !</strong>", {
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

	// Charts
	$('#switch').hide();
	$('#hidenseek').click(function() {
	   if ($(this).val() == "on") {
	      $(this).val("off");
	      $('#chart').show('slow/400/fast');
	   }
	   else {
	      $(this).val("on");
	     $('#chart').hide('slow/400/fast');
	   }
	});

	$('[name=tahun]').change(function(){
		$('[name=bulan]').val('01').trigger('change');
		$.get('{{url('/admin/selling')}}'+'/'+$(this).val()+'/01',function(data){
			return chartCtrl(data);
		});
		$('#switch').show();
	});
	$('[name=bulan]').change(function(){
		var tahun = $('[name=tahun]').val();
		$.get('{{url('/admin/selling')}}'+'/'+tahun+'/'+$(this).val(),function(data){
			return chartCtrl(data);
		});
	});
	function getDaysInMonth(year,month){
		return new Date(year,month,0).getDate();
	}
	function chartCtrl(data){
		var days       = getDaysInMonth(2018,01);
		var selling = [];
		for(var i = 1; i <= days; i++){
			selling.push(i);
		}

		var options = {
			chart: {
				type: 'line'
			},
			series: [{
				name: 'sales',
				data: data
			}],
			xaxis: {
				selling: selling
			}
		};

		var chart = new ApexCharts(document.querySelector("#chart"), options);

		chart.render();    
	}
</script>
@endsection