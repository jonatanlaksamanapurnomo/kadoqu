@extends('backend.index')
@section('konten')

<div class="m-content">
	<div class="m-portlet m-portlet--mobile">
		<div class="m-portlet__body">
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item">
					<a class="nav-link active" data-toggle="tab" href="#m_tabs_1_3">
						<i class="la flaticon-user"></i>
						Age &amp; Gender 
					</a>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
						<i class="flaticon-arrows m--font-success"></i>
						Size
					</a>
					<div class="dropdown-menu">
						<a class="nav-link" data-toggle="tab" href="#m_tabs_1_2">
						<i class="la flaticon-more-v2 m--font-warning"></i>
							Size Setting
						</a>
						<a class="dropdown-item" data-toggle="tab" href="#m_tabs_1_2_1">
						<i class="la la-list m--font-danger"></i>
							Type Setting
						</a>
					</div>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#m_tabs_1_4">
						<i class="la la-puzzle-piece m--font-info"></i>
						Color Setting
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#m_tabs_1_5">
						<i class="flaticon-interface-10 m--font-danger"></i>
						Brand Setting
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#m_tabs_1_1">
						<i class="la flaticon-folder m--font-primary"></i>
						Categories
					</a>
				</li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane" id="m_tabs_1_1" role="tabpanel">
					<div class="m-portlet__head">
						<div class="m-portlet__head-caption">
							<div class="m-portlet__head-title">
								<h3 class="m-portlet__head-text">
									CATEGORIES
								</h3>
							</div>
						</div>
					</div>
					<div class="m-portlet__body">
						<button id="formCategories" type="button" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add Category</button>
						<div id="data_table_categories"> 
						<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
							<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="asdwd">
								<caption>table title and/or explanatory text</caption>
								<thead>
									<tr>
										<th>NO</th>
										<th>Category</th>
										<th>Parent Category</th>
										<th>Status</th>
										<th>Updated By</th>
										<th>Updated At</th>
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
					$('#form').validate({
						rule : {
							status 		 : {required:true},
					 		has_product  : {required:true},
					 		has_page 	 : {required:true},
					 		parent_categori : {required:true}
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
							ajax: "{{ route('api.categories') }}",
							columns: [
							{
								"data": null,
								"width": "5%",
								"searchable": false,
								"orderable": false
							},
							{data: 'categori', name: 'categori'},
							{data: 'parent_categori', name: 'parent_categori'},
							{data: 'status', name: 'status',
							render : function (data) {
								if (data == 1 ) { return '<span style="width: 110px;"><span class="m-badge  m-badge--success m-badge--wide">Active</span></span>'; }
								else { return '<span style="width: 110px;"><span class="m-badge  m-badge--danger m-badge--wide">Inactive</span></span>'; }
							}
						},
						{data: 'updated_by', name: 'updated_by'},
						{data: 'updated_at', name: 'updated_at'},
						{data: 'action', name: 'action', orderable :false, searchable :false}
						]
					});
						table.on('draw.dt search.dt', function () {
							table.column(0, {search:'applied'}).nodes().each(function (cell, i) {
								cell.innerHTML = i+1;
							});
						}).draw();

						function closeForm() {
							$("#form").toggle();
							$("#data_table_categories").toggle();
							$("#formCategories").show();
						}

						function addForm() {
							save_method = "add";
								$("#formCategories").hide();
								$('input[name=_method]').val('POST');
						        $("#form").toggle();
						        $("#form")[0].reset();
						        $("#data_table_categories").toggle();
						        $("#categoriesTitle").text('Create Categories');
						}

						function editForm(id) {
							save_method = "edit";
							$('input[name=_method]').val('PATCH');
							$('#form')[0].reset();
							$.ajax({
								url  : "{{ url('admin/product-setting') }}" + '/' +id+ '/edit',
								type : "GET" ,
								data : "JSON",
								success : function(data) {
									$("#categoriesTitle").text('Edit Categories');
									$("#formCategories").hide();
									$("#form").toggle();
									$("#data_table_categories").toggle();

									$('#id').val(data.id);
									$('#categori').val(data.categori);
									$('#parent_categori').val(data.parent_categori);
									$('#code').val(data.code);

									if (data.has_page == 1 ) {
										$('#has_page').val(1);
									} else { $('#has_page').val(0); }
									if (data.has_product == 1 ) {
										$('#has_product').val(1);
									} else { $('#has_product').val(0); }
									if (data.status == 1 ) {
										$('#status').val(1);
									} else { $('#status').val(0); }

									$('#description').val(data.description);
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
										url  : "{{ url('admin/product-setting') }}" + '/' + id,
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
									if (save_method == 'add') url = "{{ url('admin/product-setting') }}";
									else url = "{{ url('admin/product-setting').'/' }}" + id;

									$.ajax({
										url  : url,
										type : "POST",
										data : $('#form').serialize(),
										success : function($data) {
											$('#modal_form').modal('hide');
											if (save_method == 'add') {
												$.notify("<strong>Success Add Data <u>" +$data.categori+ "</u> !</strong>", {
													animate: {
														enter: 'animated bounceIn',
														exit: 'animated bounceOut'
													}
												});
											} else {
												$.notify("<strong>Success Edit <u>" +$data.categori+ "</u> !</strong>", {
													animate: {
														enter: 'animated bounceIn',
														exit: 'animated bounceOut'
													}
												});
											}
											$("#form").hide();
											$("#data_table_categories").show();
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
				</div>
				<div class="tab-pane active" id="m_tabs_1_3" role="tabpanel">
					<div class="m-portlet__head">
						<div class="m-portlet__head-caption">
							<div class="m-portlet__head-title">
								<h3 class="m-portlet__head-text">
									AGE &amp; GENDER
								</h3>
							</div>
						</div>
					</div>
					<div class="m-portlet__body">
					<u> <h3 id="agesTitle"></h3> </u> <div style=" height: 20px;"></div>
					<button id="buttonAge" type="button" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add Age &amp; Gender</button>
					<div id="data_table_ages"> 
						<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
							<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="wasd">
								<caption>table title and/or explanatory text</caption>
								<thead>
									<tr>
										<th>NO</th>
										<th>Name</th>
										<th>Type</th>
										<th>Status</th>
										<th>Updated At</th>
										<th>Updated By</th>
										<th align="center" style="text-align: center;">Action</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table> 
						</div>
					</div>
					</div>
				</div>
				<div class="tab-pane" id="m_tabs_1_2" role="tabpanel">
					<div class="m-portlet__head">
						<div class="m-portlet__head-caption">
							<div class="m-portlet__head-title">
								<h3 class="m-portlet__head-text">
									Size Setting
								</h3>
							</div>
						</div>
					</div>
					<style type="text/css">
						#form_setting{
					  display:none;
					}
					</style>
					<div class="m-portlet__body">
					<u> <h3 id="settingsTitle"></h3> </u> <div style=" height: 20px;"></div>
					<form name="form_setting" id="form_setting" accept="#">
						{{ csrf_field() }}  {{ method_field('POST') }}
						<input type="hidden" id="id_setting" name="id">
						<input type="hidden" id="created_by" name="created_by" value="{{ Auth::user()->name }}">
						<input type="hidden" id="updated_by" name="updated_by" value="{{ Auth::user()->name }}">
						<div class="form-group">
							<label for="name" class="form-control-label">
								Name:
							</label>
							<input type="text" name="name" class="form-control" id="name_setting" required>
						</div>
						<div class="form-group m-form__group">
							<label for="type">
								Type:
							</label>
							<select class="form-control m-input m-input--solid" name="sizetype_id" id="type_setting" required>
								<option value="">Select Type</option>
							</select>
						</div>
						<div class="form-group m-form__group">
							<label for="type">
								Age &amp; Gender:
							</label>
							<select class="form-control m-input m-input--solid" name="agegender_id" id="age_setting" required>
								<option value="">Select Age & Gender</option>
							</select>
						</div>
						<div class="form-group m-form__group">
							<label for="status">
								Status:
							</label>
							<select class="form-control m-input m-input--solid" name="status" id="status_setting" required>
								<option value="">Select</option>
								<option value="0">Inactive</option>
								<option value="1">Active</option>
							</select>
						</div>
						<div class="form-group m-form__group">
							<label for="description">
								Description:
							</label>
							<textarea id="description_setting" name="description" class="form-control m-input" rows="3" required></textarea>
						</div>
						<div class="modal-footer">
							<button type="button" onclick="closeFormSetting()" class="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
							<button type="submit"  class="btn btn-primary">
								Save
							</button>
						</div>
					</form>
					<button onclick="addFormSetting()" id="buttonSetting" type="button" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add Size </button>
					<div id="data_table_settiings"> 
						<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
							<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="table_setting">
								<caption>table title and/or explanatory text</caption>
								<thead>
									<tr>
										<th>NO</th>
										<th>Name</th>
										<th>Age & Genre</th>
										<th>Type</th>
										<th>Status</th>
										<th>Updated At</th>
										<th>Updated By</th>
										<th align="center" style="text-align: center;">Action</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table> 
						</div>
					</div>
					</div>
				</div>
				<div class="tab-pane" id="m_tabs_1_2_1" role="tabpanel">
					<div class="m-portlet__head">
						<div class="m-portlet__head-caption">
							<div class="m-portlet__head-title">
								<h3 class="m-portlet__head-text">
									Type Setting
								</h3>
							</div>
						</div>
					</div>
					<style type="text/css">
						#form_type{
					  display:none;
					}
					</style>
					<div class="m-portlet__body">
					<u> <h3 id="typesTitle"></h3> </u> <div style=" height: 20px;"></div>
					<form name="form_type" id="form_type" accept="#">
						{{ csrf_field() }}  {{ method_field('POST') }}
						<input type="hidden" id="id_type" name="id">
						<input type="hidden" id="created_by" name="created_by" value="{{ Auth::user()->name }}">
						<input type="hidden" id="updated_by" name="updated_by" value="{{ Auth::user()->name }}">
						<div class="form-group">
							<label for="name" class="form-control-label">
								Name:
							</label>
							<input type="text" name="name" class="form-control" id="name_type" required>
						</div>
						<div class="form-group">
							<label for="code_type" class="form-control-label">
								Code:
							</label>
							<input type="text" name="code" class="form-control" id="code_type" required>
						</div>
						<div class="form-group m-form__group">
							<label for="status_type">
								Status:
							</label>
							<select class="form-control m-input m-input--solid" name="status" id="status_type" required>
								<option value="">Select</option>
								<option value="0">Inactive</option>
								<option value="1">Active</option>
							</select>
						</div>
						<div class="form-group m-form__group">
							<label for="description_type">
								Description:
							</label>
							<textarea id="description_type" name="description" class="form-control m-input" rows="3" required></textarea>
						</div>
						<div class="modal-footer">
							<button type="button" onclick="closeFormType()" class="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
							<button type="submit"  class="btn btn-primary">
								Save
							</button>
						</div>
					</form>
					<button onclick="addFormType()"  id="buttonType"  type="button" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add Type </button>
					<div id="data_table_types"> 
						<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
							<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="table_type">
								<caption>table title and/or explanatory text</caption>
								<thead>
									<tr>
										<th>NO</th>
										<th>Name</th>
										<th>Code</th>
										<th>Description</th>
										<th>Status</th>
										<th>Updated At</th>
										<th>Updated By</th>
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
					$('#form_type').validate({
						rule : {
							status_type : {required:true}
						}
					});

						function notiftype()
						{
							$.notify("Enter:  Setting Anjing", {
								animate: {
									enter: 'animated bounceIn',
									exit: 'animated bounceOut'
								}
							});
						}


						var table_type = $('#table_type').DataTable({
							processing: true,
							serverSide: true,
							ajax: "{{ route('api.sizetype') }}",
							columns: [
							{
								"data": null,
								"width": "5%",
								"searchable": false,
								"orderable": false
							},
							{data: 'name', name: 'name'},
							{data: 'code', name: 'code'},
							{data: 'description', name: 'description'},
							{data: 'status', name: 'status',
							render : function (data) {
								if (data == 1 ) { return '<span style="width: 110px;"><span class="m-badge  m-badge--success m-badge--wide">Active</span></span>'; }
								else { return '<span style="width: 110px;"><span class="m-badge  m-badge--danger m-badge--wide">Inactive</span></span>'; }
							}
						},
							{data: 'updated_at', name: 'updated_at'},
							{data: 'updated_by', name: 'updated_by',
							 render: (data) => {
							 	if (data == null) {return 'Not Updateted Yet';}
							 	else { return data; }
							 }
							},
							{data: 'action', name: 'action', orderable :false, searchable :false}
							]
						});
						table_type.on('draw.dt search.dt', function () {
							table_type.column(0, {search:'applied'}).nodes().each(function (cell, i) {
								cell.innerHTML = i+1;
							});
						}).draw();

						function closeFormType() {
							$("#form_type").toggle();
							$("#data_table_types").toggle();
							$("#buttonType").show();
							$("#typesTitle").hide();
						}

						function addFormType() {
							save_method = "add";
							$("#buttonType").hide();
							$('input[name=_method]').val('POST');
					        $("#form_type").toggle();
					        $("#form_type")[0].reset();
					        $("#data_table_types").toggle();
					        $("#typesTitle").text('Create Type');
						}

						function editFormType(id) {
							save_method = "edit";
							$('input[name=_method]').val('PATCH');
							$('#form_type')[0].reset();
							$.ajax({
								url  : "{{ url('admin/sizetype') }}" + '/' +id+ '/edit',
								type : "GET" ,
								data : "JSON",
								success : function(data) {
									$("#typesTitle").text('Edit Type');
									$("#buttonType").hide();
									$("#form_type").toggle();
									$("#data_table_types").toggle();

									$('#id_type').val(data.id);
									$('#name_type').val(data.name);
									$('#code_type').val(data.code);

									if (data.type == 1 ) {
										$('#type').val(1);
									} else { $('#type').val(0); }
									if (data.status == 1 ) {
										$('#status_type').val(1);
									} else { $('#status_type').val(0); }

									$('#description_type').val(data.description);
								},
								error : function() {
									alert('Somethink Worng');
								}
							});
						}



						function deleteDataType(id) {
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
										url  : "{{ url('admin/sizetype') }}" + '/' + id,
										type : "POST",
										data : {'_method' : 'DELETE', '_token' : csrf_token},
										success : function(data) {
											table_type.ajax.reload();
											$('#modal_form_type').modal('hide');
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
							$('#form_type').on('submit', function (e) {
								if (!e.isDefaultPrevented()) {
									var id = $('#id_type').val();
									if (save_method == 'add') url = "{{ url('admin/sizetype') }}";
									else url = "{{ url('admin/sizetype').'/' }}" + id;

									$.ajax({
										url  : url,
										type : "POST",
										data : $('#form_type').serialize(),
										success : function($data) {
											$('#modal_form_type').modal('hide');
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
											$("#buttonType").show();
											$("#typesTitle").hide();
											$("#form_type").hide();
											$("#data_table_types").show();
											table_type.ajax.reload();
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
				</div>
				<div class="tab-pane" id="m_tabs_1_4" role="tabpanel">
					<div class="m-portlet__head">
						<div class="m-portlet__head-caption">
							<div class="m-portlet__head-title">
								<h3 class="m-portlet__head-text">
									Colour Setting
								</h3>
							</div>
						</div>
					</div>
					<style type="text/css">
						#form_color{
					  display:none;
					}
					</style>
					<div class="m-portlet__body">
					<u> <h3 id="coloursTitle"></h3> </u> <div style=" height: 20px;"></div>
					<form name="form_color" id="form_color" accept="#">
						{{ csrf_field() }}  {{ method_field('POST') }}
						<input type="hidden" id="id_color" name="id">
						<input type="hidden" id="created_by" name="created_by" value="{{ Auth::user()->name }}">
						<input type="hidden" id="updated_by" name="updated_by" value="{{ Auth::user()->name }}">
						<div class="form-group">
							<label for="name" class="form-control-label">
								Name:
							</label>
							<input type="text" name="name" class="form-control" id="name_color" required>
						</div>
						<div class="form-group">
							<label for="colorpallete" class="col-2 col-form-label">
								Color
							</label>
							<div class="col-10">
								<input class="form-control m-input" type="color" name="colour" id="colorpallete" required>
							</div>
						</div>
						<div class="form-group m-form__group">
							<label for="status_color">
								Status:
							</label>
							<select class="form-control m-input m-input--solid" name="status" id="status_color" required>
								<option value="">Select</option>
								<option value="0">Inactive</option>
								<option value="1">Active</option>
							</select>
						</div>
						<div class="form-group m-form__group">
							<label for="description_color">
								Description:
							</label>
							<textarea id="description_color" name="description" class="form-control m-input" rows="3" required></textarea>
						</div>
						<div class="modal-footer">
							<button type="button" onclick="closeFormColor()" class="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
							<button type="submit"  class="btn btn-primary">
								Save
							</button>
						</div>
					</form>
					<button onclick="addFormColor()" id="buttonColour" type="button" class="btn m-btn--pill m-btn--air btn-primary"> <i class="flaticon-plus"></i> Add Colour </button>
					<div id="data_table_colours"> 
						<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
							<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="table_color">
								<caption>table title and/or explanatory text</caption>
								<thead>
									<tr>
										<th>NO</th>
										<th>Name</th>
										<th>Color Pallete</th>
										<th>Status</th>
										<th>Updated At</th>
										<th>Updated By</th>
										<th align="center" style="text-align: center;">Action</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table> 
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


@endsection
