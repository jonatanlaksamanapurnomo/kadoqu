@extends('backend.index')
@section('konten')

<div class="m-content">
    <div class="m-portlet m-portlet--mobile">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        Configuration
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                <div class="row align-items-center">
                    <div class="col-xl-8 order-2 order-xl-1">
                        <div class="form-group m-form__group row align-items-center">
                            <div class="col-md-4">
                                <div class="m-input-icon m-input-icon--left">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-portlet__body">
                        @foreach($data as $key)
                         @permission('configuration-menu')
                        <button type="button"  class="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill" onclick="editForm(<?php echo $key->id ?>)" data-toggle="modal">
                           <i class="flaticon-edit"></i> Edit Data
                       </button>
                       @endpermission
                       @endforeach
                       {{-- Tampilan --}}
                       <div id="refresh">
                           <div class="form-group m-form__group m--margin-top-10">
                            <div class="alert m-alert m-alert--default" role="alert">
                                The example form below demonstrates common HTML form elements that receive updated styles from Bootstrap with additional classes.
                            </div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                Status
                            </label>
                            <div id="stathus"></div>

                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                JUDUL
                            </label>
                            <div id="judhul"></div>

                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                TAGLINE
                            </label>
                            <div id="thagline"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                SLOGAN
                            </label>
                            <div id="sloghan"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                FACEBOOK
                            </label>
                            <div id="facebookh"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                TWITTER
                            </label>
                            <div id="twitther"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                INSTAGRAM
                            </label>
                            <div id="instahagram"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                PHONE
                            </label>
                            <div id="phoneh"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                E-MAIL
                            </label>
                            <div id="emahil"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                ADDRESS
                            </label>
                            <div id="addressh"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleTextarea">
                                ABOUT THIS COMPANY
                            </label>
                            <div id="abhout"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label for="exampleInputEmail1">
                                COVER
                            </label>
                            <div id="chover"></div>
                        </div>
                    </div>
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
                    {{-- Modals --}}
                    <div class="modal-body">
                        <form name="form" id="form" enctype="multipart/form-data">
                            {{ csrf_field() }}  {{ method_field('POST') }}
                            <input type="hidden" id="id" name="id">
                            <div class="form-group m-form__group">
                                <label for="status">
                                    Status:
                                </label>
                                <select class="form-control m-input m-input--solid" name="status" id="status">
                                    <option value="0">
                                        Closed
                                    </option>
                                    <option value="1">
                                        Open
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="judul" class="form-control-label">
                                    Judul:
                                </label>
                                <input type="text" name="judul" class="form-control" id="judul">
                            </div>
                            <div class="form-group">
                                <label for="tagline" class="form-control-label">
                                    Tagline:
                                </label>
                                <input type="text" name="tagline" class="form-control" id="tagline">
                            </div>
                            <div class="form-group">
                                <label for="slogan" class="form-control-label">
                                    Slogan:
                                </label>
                                <input type="text" name="slogan" class="form-control" id="slogan">
                            </div>
                            <div class="form-group">
                                <label for="facebook" class="form-control-label">
                                    Facebook:
                                </label>
                                <input type="text" name="facebook" class="form-control" id="facebook">
                            </div>
                            <div class="form-group">
                                <label for="twitter" class="form-control-label">
                                    Twitter:
                                </label>
                                <input type="text" name="twitter" class="form-control" id="twitter">
                            </div>
                            <div class="form-group">
                                <label for="instagram" class="form-control-label">
                                    Instagram:
                                </label>
                                <input type="text" name="instagram" class="form-control" id="instagram">
                            </div>
                            <div class="form-group">
                                <label for="phone" class="form-control-label">
                                    Phone:
                                </label>
                                <input type="number" name="phone" class="form-control" id="phone">
                            </div>
                            <div class="form-group">
                                <label for="email" class="form-control-label">
                                    E-Mail:
                                </label>
                                <input type="text" name="email" class="form-control" id="email">
                            </div>
                            <div class="form-group m-form__group">
                                <label for="exampleTextarea">
                                    Address:
                                </label>
                                <textarea id="address" name="address" class="form-control m-input" id="exampleTextarea" rows="3"></textarea>
                            </div>
                            <div class="form-group m-form__group">
                                <label for="exampleTextarea">
                                    About:
                                </label>
                                <textarea id="about" name="about" class="form-control m-input" id="exampleTextarea" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="cover" class="form-control-label">
                                    Cover:
                                </label>
                                <div class="custom-file">
                                    <input type="file" name="cover" class="custom-file-input">
                                    <label class="custom-file-label" " for="customFile">
                                        Choose file
                                    </label>
                                </div>
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
    </div>
</div>
</div>
<script type="text/javascript">
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var refresh = $('#refresh');

    var ed = 1;
    function apicms(ed) {
        save_method = "edit";
        $('input[name=_method]').val('PATCH');
        $('#form')[0].reset();
        $.ajax({
            url  : "{{ url('admin/apicms') }}",
            type : "GET" ,
            data : "JSON",
            dataType: 'json',
            success : function(data) {

                console.log('data',data);

                var status = data.status;
                var base_url = window.location.origin;
                if (status == 0) {
                    $("#stathus").append('<input type="text" class="form-control m-input" placeholder=" Closed " disabled="" >' );
                } else {
                    $("#stathus").append('<input type="text" class="form-control m-input" placeholder=" Open " disabled="" >' );
                }
                $("#judhul").append('<input type="text" class="form-control m-input" placeholder=" '+data.judul+'" disabled="" >' );
                $("#thagline").append('<input type="text" class="form-control m-input" placeholder=" '+data.tagline+'" disabled="" >');
                $("#sloghan").append('<input type="text" class="form-control m-input" placeholder=" '+data.slogan+'" disabled="" >' );
                $("#facebookh").append('<input type="text" class="form-control m-input" placeholder=" '+data.facebook+'" disabled="" >' );
                $("#twitther").append('<input type="text" class="form-control m-input" placeholder=" '+data.twitter+'" disabled="" >' );
                $("#instahagram").append('<input type="text" class="form-control m-input" placeholder=" '+data.instagram+'" disabled="" >' );
                $("#phoneh").append('<input type="text" class="form-control m-input" placeholder=" '+data.phone+'" disabled="" >' );
                $("#emahil").append('<input type="text" class="form-control m-input" placeholder=" '+data.email+'" disabled="" >' );
                $("#chover").append('<img width="100px" height="100px" src="'+base_url+'/web-shop-e-commerce/public/uploads/'+data.cover+'" >');
                // $("#chover").append('<input type="text" class="form-control m-input" placeholder=" '+data.cover+'" disabled="" >' );
                $("#addressh").append('<textarea class="form-control m-input" id="exampleTextarea" rows="3" disabled=""> '+data.address+' </textarea>');
                $("#abhout").append('<textarea class="form-control m-input" id="exampleTextarea" rows="3" disabled=""> '+data.about+' </textarea>');

                // console.log(data[0]);
            },
            error : function() {
                alert('Somethink Wrong');
            }
        });
    }

    apicms();

    function editForm(id) {
        save_method = "edit";
        $('input[name=_method]').val('PATCH');
        $('#form')[0].reset();
        $.ajax({
            url  : "{{ url('admin/cms') }}" + '/' +id+ '/edit',
            type : "GET" ,
            data : "JSON",
            success : function(data) {
                $('#modal_form').modal('show');
                $('.modal-title').text('Edit Configuration');

                var sampul = data.cover;
                $('#id').val(data.id);
                $('#status').val(data.status);
                $('#judul').val(data.judul);
                $('#tagline').val(data.tagline);
                $('#slogan').val(data.slogan);
                $('#facebook').val(data.facebook);
                $('#twitter').val(data.twitter);
                $('#instagram').val(data.instagram);
                $('#phone').val(data.phone);
                $('#email').val(data.email);
                $('#cover').val(data.cover);
                $('#address').val(data.address);
                $('#about').val(data.about);
                alert(sampul);
            },
            error : function() {
                alert('Somethink Worng');
            }
        });
    }

    $(function(){
        $('#form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var id = $('#id').val();
                var base_url = window.location.origin;
                if (save_method == 'add') url = "{{ url('admin/cms') }}";
                else url = "{{ url('admin/cms')}}"+'/'+id;
                $.ajax({
                    url  : url,
                    type : "POST",
                    // data : $('#form').serialize(),
                    data : new FormData($('#form')[0]),
                    contentType : false,
                    processData : false,
                    success : function($data) {
                        $('#modal_form').modal('hide');

                        //mengganti data lama dengan data yang baru
                        var status = $data.status;
                        if (status == 0) {
                            status = 'Closed';
                            $("#stathus").html('<input type="text" class="form-control m-input" placeholder=" '+status+'" disabled="" >' ); 
                        } else { 
                            status = 'Open';
                            $("#stathus").html('<input type="text" class="form-control m-input" placeholder=" '+status+'" disabled="" >' ); 
                        }
                        $("#judhul").html('<input type="text" class="form-control m-input" placeholder=" '+$data.judul+'" disabled="" >' );
                        $("#thagline").html('<input type="text" class="form-control m-input" placeholder=" '+$data.tagline+'" disabled="" >' );
                        $("#sloghan").html('<input type="text" class="form-control m-input" placeholder=" '+$data.slogan+'" disabled="" >' );
                        $("#facebookh").html('<input type="text" class="form-control m-input" placeholder=" '+$data.facebook+'" disabled="" >' );
                        $("#twitther").html('<input type="text" class="form-control m-input" placeholder=" '+$data.twitter+'" disabled="" >' );
                        $("#instahagram").html('<input type="text" class="form-control m-input" placeholder=" '+$data.instagram+'" disabled="" >' );
                        $("#phoneh").html('<input type="text" class="form-control m-input" placeholder=" '+$data.phone+'" disabled="" >' );
                        $("#emahil").html('<input type="text" class="form-control m-input" placeholder=" '+$data.email+'" disabled="" >' );
                        $("#chover").html('<img width="100px" height="100px" src="'+base_url+'/e-commerce/public/uploads/'+$data.cover+'" >');
                        $("#addressh").html('<textarea class="form-control m-input" id="exampleTextarea" rows="3" disabled=""> '+$data.address+' </textarea>');
                        $("#abhout").html('<textarea class="form-control m-input" id="exampleTextarea" rows="3" disabled=""> '+$data.about+' </textarea>' );

                       // Fade Out Lalu Fade In
                       $("#stathus").fadeOut(function(){ $("#stathus").fadeIn().delay(2000); });
                       $("#judhul").fadeOut(function(){ $("#judhul").fadeIn().delay(2000); });
                       $("#thagline").fadeOut(function(){ $("#thagline").fadeIn().delay(2000); });
                       $("#sloghan").fadeOut(function(){ $("#sloghan").fadeIn().delay(2000); });
                       $("#facebookh").fadeOut(function(){ $("#facebookh").fadeIn().delay(2000); });
                       $("#twitter").fadeOut(function(){ $("#twitter").fadeIn().delay(2000); });
                       $("#instahagram").fadeOut(function(){ $("#instahagram").fadeIn().delay(2000); });
                       $("#phoneh").fadeOut(function(){ $("#phoneh").fadeIn().delay(2000); });
                       $("#emahil").fadeOut(function(){ $("#emahil").fadeIn().delay(2000); });
                       $("#addressh").fadeOut(function(){ $("#addressh").fadeIn().delay(2000); });
                       $("#chover").fadeOut(function(){ $("#chover").fadeIn().delay(2000); });
                       $("#abhout").fadeOut(function(){ $("#abhout").fadeIn().delay(2000); });

                       //Bootstrap Notify
                       $.notify("<strong>Success Edit Data !</strong>", {
                        animate: {
                            enter: 'animated bounceIn',
                            exit: 'animated bounceOut'
                        }
                    });
                       console.log($data);
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