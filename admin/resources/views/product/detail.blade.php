@extends('backend.index')
@section('konten')
<div class="clearfix"></div>
@if(session()->has('success'))
<input type="hidden" id="success" value="{{ session()->get('success') }}">
@endif
@if($errors->any())
<input type="hidden" id="errors" value="{{ $errors }}">
@endif
<form method="POST" action="{{ route("products.delete",$data->SKU) }}" id="data-form">
    <input type="hidden" name="_method" value="DELETE">
    {{ csrf_field() }}
</form>
<form action="{{ route("products.update",$data->SKU) }}" id="product-data" method="POST" enctype="multipart/form-data">
<input name="_method" type="hidden" value="PUT">
<div class="m-portlet m-portlet--mobile">
	<div class="m-portlet__head">
		<div class="m-portlet__head-caption">
			<div class="m-portlet__head-title">
				<h3 class="m-portlet__head-text">
                    {{ $data->namaProduk }}
                </h3>
            </div>
        </div>
       <div class="m-portlet__head-tools">
            <div class="action-area pull-right">
                <button type="button" onclick="deleteProduct()" class="btn btn-danger">Delete</button>
                <a class="btn btn-warning text-white" href="{{ url()->previous() }}">Cancel</a>
                <button type="submit" id="submitall" class="btn btn-success">Submit</button>
            </div>
        </div>
    </div>
    
    <div class="m-portlet__body">
            {{ csrf_field() }}
            <div class="row">
                <div class="col-lg-12">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="false">General</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="true">Description</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">SEO Settings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">Variant & Price List</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tab-5" role="tab" aria-controls="tab-5" aria-selected="false">Images</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tab-6" role="tab" aria-controls="tab-6" aria-selected="false">Categories</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-4">
                                    @if(sizeof($data->images) > 0)
                                    <img src="{{ url("produk/".$data->images[0]->gambar) }}" class="img-thumbnail">
                                    @else
                                    <img src="{{ url("images/blank-image.jpg") }}" class="img-thumbnail">
                                    @endif
                                </div>
                                <div class="col-lg-8">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Nama Produk</label>
                                                <input type="text" name="nama" value="{{ $data->namaProduk }}" placeholder="Nama Produk" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Brand</label>
                                                <select class="select2 form-control" name="brand">
                                                    <option selected disabled value="">--PILIH BRAND--</option>
                                                    @foreach ($brand as $item)
                                                    <option value="{{ $item->idBrand }}" {{ $item->idBrand == $data->idBrand ? "selected" : "" }}>{{ $item->nameBrand }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>SKU</label>
                                                <input type="hidden" name="SKU" placeholder="SKU" class="form-control">
                                                <input type="text" value="{{ $data->SKU }}" placeholder="SKU" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Pretty URL</label>
                                                <input type="text" name="prettyUrl" value="{{ $data->prettyURL }}" placeholder="Pretty URL" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Status Product</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" name="status_product" id="status_product" type="checkbox" value="1" {{ $data->status_product == 1 ? "checked" : "" }}>
                                                    <label class="form-check-label">
                                                        Active
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab-2" role="tabpanel">
                            <div class="form-group">
                                <label>Tags</label>
                                @php $tags = explode(",",$data->tags) @endphp
                                <select class="select2-tags form-control" multiple name="tags[] ">
                                    @foreach ($tags as $item)
                                    <option value="{{ $item }}" selected>{{ $item }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="summernote" name="description">{{ $data->description }}</textarea>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab-3" role="tabpanel">
                            <div class="form-group">
                                <label>Meta Title</label>
                                <textarea name="metaTitle" class="form-control" placeholder="Meta Title">{{ $data->metaTitle }}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Meta Keyword</label>
                                <textarea name="metaKeyword" class="form-control" placeholder="Meta Keyword">{{ $data->metaKeyword }}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Meta Description</label>
                                <textarea name="metaDescription" class="form-control" placeholder="Meta Description">{{ $data->metaDescription }}</textarea>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab-4" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Size</label>
                                        <select class="select2 form-control" name="ukuran">                                        
                                        @foreach ($size as $item)
                                        <option value="{{ $item->idUkuran }}" {{ $item->idUkuran == $data->idUkuran ? "selected" : "" }}>{{ $item->ukuran." (".$item->jenis.")" }} </option>    
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Color</label>
                                        <select class="select2 form-control" name="color">
                                        @foreach ($color as $item)
                                        <option value="{{ $item->idColor }}" {{ $item->idColor == $data->idColor ? "selected" : "" }}>{{ $item->nameColor }} </option>
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Weight</label>
                                        <div class="input-group m-input-group">
                                            <input type="number" class="form-control m-input" name="weight" placeholder="Weight" value="{{ $data->weight }}">
                                            <div class="input-group-append"><span class="input-group-text">gr</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label>Stok Total</label>
                                                <div class="input-group m-input-group">
                                                    <input type="number" class="form-control m-input" name="stockTotal" placeholder="Stok" value="{{ $data->stock->stock }}">
                                                    <div class="input-group-append"><span class="input-group-text">Item</span></div>                                            
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label>Stok Available</label>
                                                <div class="input-group m-input-group">
                                                    <input type="number" class="form-control m-input" name="stockAvailable" placeholder="Stok" value="{{ $data->stock->available }}">
                                                    <div class="input-group-append"><span class="input-group-text">Item</span></div>                                            
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label>Stok On Hold</label>
                                                <div class="input-group m-input-group">
                                                    <input type="number" class="form-control m-input" name="stockOnhold" placeholder="Stok" value="{{ $data->stock->onhold }}">
                                                    <div class="input-group-append"><span class="input-group-text">Item</span></div>                                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Harga Dasar</label>
                                        <div class="input-group m-input-group">
                                            <div class="input-group-append"><span class="input-group-text">Rp.</span></div>
                                            <input type="number" class="form-control m-input" name="hargaDasar" placeholder="Harga Dasar" value="{{ $data->hargaDasar }}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Harga Jual</label>
                                        <div class="input-group m-input-group">
                                            <div class="input-group-append"><span class="input-group-text">Rp.</span></div>
                                            <input type="number" class="form-control m-input" name="hargaJual" id="hargaJual" placeholder="Harga Jual" value="{{ $data->hargaJual }}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Harga Diskon</label>
                                        <div class="input-group m-input-group">
                                            <div class="input-group-append"><span class="input-group-text">Rp.</span></div>
                                            <input type="number" class="form-control m-input" name="hargaDiscount" id="hargaDiscount" placeholder="Harga Diskon" value="{{ $data->hargaDiscount }}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Status Discount</label>
                                        <div class="form-check">
                                            <input class="form-check-input" id="status_discount" name="status_discount" type="checkbox" value="1" {{ $data->status_discount == 1 ? "checked" : "" }}>
                                            <label class="form-check-label">
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab-5" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="row">
                                    @if(sizeof($data->images) > 0)
                                    @foreach ($data->images as $image)
                                        <div class="col-lg-3">
                                            <img src="{{ asset("produk/".$image->gambar) }}" class="img-thumbnail">
                                            <button type="button" class="btn btn-danger btn-block" onclick="deleteImage('{{ $image->gambar }}')">Delete</button>
                                        </div>
                                    @endforeach
                                    @endif
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="m-dropzone dropzone m-dropzone--primary" action="{{ route("products.update",$data->SKU) }}" id="m-dropzone-two">
                                        <div class="m-dropzone__msg dz-message needsclick">
                                            <h3 class="m-dropzone__msg-title">
                                                Drop files here or click to upload.
                                            </h3>
                                            <span class="m-dropzone__msg-desc">
                                                Upload up to 10 files
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab-6" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Kategori Store 1</label>
                                        <select class="select2 form-control" name="store_category_1" id="store_category_1">
                                        <option selected value="">Pilih Kategori Store 1</option>
                                        @foreach ($store as $item)
                                        <option value="{{ $item->idKategoriStore }}" {{ $item->idKategoriStore == $data->idKategoriStore ? "selected" : "" }}>{{ $item->kategoriStore }}</option>
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Sub Kategori Store 1</label>
                                        <select id="sub_category_1" class="select2 form-control" name="sub_category_1">
                                            <option selected value="">Pilih Kategori Store 1 Terlebih Dahulu</option>                                            
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Kategori Store 2</label>
                                        <select class="select2 form-control" id="store_category_2" name="store_category_2">
                                            <option selected value="">Pilih Kategori Store 2</option>
                                            @foreach ($store as $item)
                                            <option value="{{ $item->idKategoriStore }}" {{ $item->idKategoriStore == $data->idKategoriStore2 ? "selected" : "" }}>{{ $item->kategoriStore }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Sub Kategori Store 2</label>
                                        <select id="sub_category_2" class="select2 form-control" name="sub_category_2">
                                            <option selected disabled value="">Pilih Kategori Store 2 Terlebih Dahulu</option>                                            
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Kategori Gift 1</label>
                                        <select class="select2 form-control" name="category_gift_1">
                                        <option value="">Pilih Kategori Gift 1</option>
                                        @foreach ($gift as $item)
                                        <option value="{{ $item->idKategoriGift }}" {{ $item->idKategoriGift == $data->idKategoriGift ? "selected" : "" }}>{{ $item->nameKategoriGift }}</option>
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Kategori Gift 2</label>
                                        <select class="select2 form-control" name="category_gift_2">
                                        <option value="">Pilih Kategori Gift 2</option>
                                        @foreach ($gift as $item)
                                        <option value="{{ $item->idKategoriGift }}" {{ $item->idKategoriGift == $data->idKategoriGift2 ? "selected" : "" }}>{{ $item->nameKategoriGift }}</option>
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
    </div>
</div>
</form>
@endsection
@section('scripts')

<script src="{{ asset("js/summernote.js") }}"></script>

<script>
    function deleteProduct(){
        swal({
            title: '<strong>Yakin ingin menghapus produk #{{ $data->SKU }}?</strong>',
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
                $("#data-form").submit(); 
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
        ).then(
        function(){ 
            window.location = "/admin/products";
        });
    }
    if($("#errors").val() != undefined){
        var errors = JSON.parse($("#errors").val());
        if(errors != undefined){
            showError(errors);
        }
    }
    $(".select2").select2();
    $(".select2-tags").select2({
        tags: true
    });
    Dropzone.autoDiscover = false;

    var myDropzone = new Dropzone("#m-dropzone-two", {
        autoProcessQueue: false,
        addRemoveLinks: true,
        uploadMultiple: true, 
        maxFilesize: 10, // MB
        parallelUploads: 10,   
        maxFiles: 10,   
        methode: "PUT", 
        init: function(){
            $("#submitall").click(function (e) {
                e.preventDefault();
                let error = false;
                if(parseInt($("#hargaDiscount").val()) >= parseInt($("#hargaJual").val())){
                    swal(
                        'Error!',
                        'Harga Diskon Tidak Bisa Lebih Mahal atau Sama Dengan Harga Jual!',
                        'error'
                    );
                    $("#hargaDiscount").val(0);
                    error = true;
                }
                if($("#status_discount").is(":checked")){
                    console.log($("#hargaDiscount").val())
                    if($("#hargaDiscount").val() == ""){
                        swal(
                            'Error!',
                            'Jika Diskon Aktif, Harga Diskon Tidak Boleh Kosong!',
                            'error'
                        );
                        error = true;
                    }
                }
                if(!error){
                    if(myDropzone.getQueuedFiles().length > 0){
                        myDropzone.processQueue();
                    }else{
                        $("#product-data").submit();
                    }
                }
            });
            this.on('sending', function(file, xhr, formData) {
                var data = $('#product-data').serializeArray();
                formData.append("fromAPI", true);
                $.each(data, function(key, el) {
                    formData.append(el.name, el.value);
                });
            });
        },
        success: function(file,response){
            swal({title: "Success", text: "Produk Berhasil Diedit!", type: "success"}).then(
            function(){ 
                $(location).attr('href', '/admin/products');
            });
        },
        error: function(file,error,xhr){
            showError(error.error);
            this.removeAllFiles(file);
        }
    });
    //Chaining Dropdown
    var kategori1 = $("#store_category_1").val() == "" ? 0 : $("#store_category_1").val();
    var kategori2 = $("#store_category_2").val() == "" ? 0 : $("#store_category_2").val();
    if(kategori1 != null){
        showSub1(kategori1);
    }
    if(kategori2 != null){
        showSub2(kategori2);
    }
    $("#store_category_1").on("change",function(){
        var kategori = $(this).val();
        showSub1(kategori);
    });
    $("#store_category_2").on("change",function(){
        var kategori = $(this).val();
        showSub2(kategori);        
    })
    function showSub1(kategori){
        $.ajax({
            url : "/api/store_category/" + kategori,
            methode : "GET",
            success : function(data){
                $("#sub_category_1").html('');
                if(data.sub_category != undefined && data.sub_category.length > 0){
                    $.each(data.sub_category,function(key,value){
                        $("#sub_category_1").append(`
                            <option value="${value.idSubKategoriStore}" ${value.idSubKategoriStore == "{{ $data->idSubKategoriStore }}"  ? "selected" : "" } >${value.nameSubKategoriStore}</option>
                        `);                    
                    })       
                }else{
                    $("#sub_category_1").append(`
                        <option selected disabled>Tidak Ada Sub Kategori</option>
                    `); 
                }
            }
        })
    }
    function showSub2(kategori){
        $.ajax({
            url : "/api/store_category/" + kategori,
            methode : "GET",
            success : function(data){
                $("#sub_category_2").html('');
                if(data.sub_category != undefined && data.sub_category.length > 0){
                    $.each(data.sub_category,function(key,value){
                        $("#sub_category_2").append(`
                            <option value="${value.idSubKategoriStore}" ${value.idSubKategoriStore == "{{ $data->idSubKategoriStore }}"  ? "selected" : "" } >${value.nameSubKategoriStore}</option>
                        `);                    
                    })       
                }else{
                    $("#sub_category_2").append(`
                        <option selected disabled>Tidak Ada Sub Kategori</option>
                    `); 
                }
            }
        })
    }
    function deleteImage(image){
        $.ajax({
            url:"/api/images/",
            method: "DELETE",
            data: {
                image : image
            },
            success: function(data){
                swal({title: "Success", text: "Gambar Berhasil Dihapus!", type: "success"}).then(
                function(){ 
                    location.reload();
                });
            }
        })
    }
    $("#hargaJual").on("change",function(){
        if($("#hargaDiscount").val() != null){
            if($("#hargaDiscount").val() >= $(this).val()){
                swal(
                    'Error!',
                    'Harga Diskon Tidak Bisa Lebih Mahal atau Sama Dengan Harga Jual!',
                    'error'
                );
                $("#hargaDiscount").val(0);
            }
        }
    });
    $("#hargaDiscount").on("change",function(){
        if($("#hargaDiscount").val() != null){
            if(parseInt($("#hargaDiscount").val()) >= parseInt($("#hargaJual").val())){
                swal(
                    'Error!',
                    'Harga Diskon Tidak Bisa Lebih Mahal atau Sama Dengan Harga Jual!',
                    'error'
                );
                $("#hargaDiscount").val(0);
            }
        }
    })
</script>
@endsection