@extends('backend.index')
@section('konten')
@if(session()->has('success'))
<input type="hidden" id="success" value="{{ session()->get('success') }}">
@endif
@if($errors->any())
<input type="hidden" id="errors" value="{{ $errors }}">
@endif
<div class="clearfix"></div>
<form action="{{ route("banners.store") }}" id="banners-data" method="POST" enctype="multipart/form-data">
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
                                <li class="m-nav__separator">
                                    -
                                </li>
                                <li class="m-nav__item">
                                    <a href="/admin/banners" class="m-nav__link">
                                        <span class="m-nav__link-text">
                                            Banners
                                        </span>
                                    </a>
                                </li>
                                <li class="m-nav__separator">
                                    -
                                </li>
                                <li class="m-nav__item">
                                    <a href="/admin/banners/create" class="m-nav__link">
                                        <span class="m-nav__link-text">
                                            Add Banners
                                        </span>
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
                <a class="btn btn-danger" href="{{ url()->previous() }}">Cancel</a>
                <button type="submit" id="submitall" class="btn btn-success">Submit</button>
            </div>
        </div>
    </div>
    <div class="m-portlet__body">
        {{ csrf_field() }}
        <div class="row">
            <div class="col-lg-4 text-center">
                <img id="preview" src="{{ url("images/blank-image.jpg") }}" width="100%" class="img-thumbnail">
            </div>
            <div class="col-lg-8">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" name="title" placeholder="Title">
                </div>
                <div class="form-group">
                    <label>Banner</label>
                    <input type="file" class="form-control" name="banner" id="banner" accept="image/x-png,image/jpeg">             
                </div>
                <label>Status</label>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" name="status" value="1">
                    <label class="form-check-label">Active</label>
                </div>
            </div>
        </div>
    </div>
</div>
</form>
@endsection
@section("scripts")
<script>
    if($("#success").val() != undefined){
        swal(
            'Success!',
            `${$("#success").val()}`,
            'success'
        ).then(
        function(){ 
            window.location = "/admin/banners";
        });
    }
    if($("#errors").val() != undefined){
        var errors = JSON.parse($("#errors").val());
        if(errors != undefined){
            showError(errors);
        }
    }
    function preview(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
        }
    }

    $("#banner").change(function() {
        preview(this);
    });
</script>
@endsection