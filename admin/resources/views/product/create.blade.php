@extends('backend.index')
@section('konten')

<div class="clearfix"></div>
<form action="{{ route("products.store") }}" id="product-data" method="POST" enctype="multipart/form-data">
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
                                    <a href="/admin/order" class="m-nav__link">
                                        <span class="m-nav__link-text">
                                            Products
                                        </span>
                                    </a>
                                </li>
                                <li class="m-nav__separator">
                                        -
                                    </li>
                                    <li class="m-nav__item">
                                        <a href="/admin/products/create" class="m-nav__link">
                                            <span class="m-nav__link-text">
                                                Add Products
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
                                    <img src="{{ url("images/blank-image.jpg") }}" class="img-thumbnail">
                                </div>
                                <div class="col-lg-8">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Nama Produk</label>
                                                <input type="text" name="nama" placeholder="Nama Produk" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Brand</label>
                                                <select class="select2 form-control" name="brand">
                                                    <option selected disabled value="">--PILIH BRAND--</option>
                                                    @foreach ($brand as $item)
                                                    <option value="{{ $item->idBrand }}">{{ $item->nameBrand }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>SKU</label>
                                                <input type="text" name="SKU" placeholder="SKU" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Pretty URL</label>
                                                <input type="text" name="prettyUrl" placeholder="Pretty URL" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Status Product</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" name="status_product" id="status_product" type="checkbox" value="1">
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
                                <select class="select2-tags form-control" multiple name="tags[] ">
                                    <option disabled>Masukkan Tags</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="summernote" name="description"></textarea>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab-3" role="tabpanel">
                            <div class="form-group">
                                <label>Meta Title</label>
                                <textarea name="metaTitle" class="form-control" placeholder="Meta Title"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Meta Keyword</label>
                                <textarea name="metaKeyword" class="form-control" placeholder="Meta Keyword"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Meta Description</label>
                                <textarea name="metaDescription" class="form-control" placeholder="Meta Description"></textarea>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab-4" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Size</label>
                                        <select class="select2 form-control" name="ukuran">                                        
                                        @foreach ($size as $item)
                                        <option value="{{ $item->idUkuran }}">{{ $item->ukuran." (".$item->jenis.")" }} </option>    
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Color</label>
                                        <select class="select2 form-control" name="color">
                                        @foreach ($color as $item)
                                        <option value="{{ $item->idColor }}">{{ $item->nameColor }} </option>
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Weight</label>
                                        <div class="input-group m-input-group">
                                            <input type="number" class="form-control m-input" name="weight" placeholder="Weight">
                                            <div class="input-group-append"><span class="input-group-text">gr</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Stok</label>
                                        <div class="input-group m-input-group">
                                            <input type="number" class="form-control m-input" name="stock" placeholder="Stok">
                                            <div class="input-group-append"><span class="input-group-text">Item</span></div>                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Harga Dasar</label>
                                        <div class="input-group m-input-group">
                                            <div class="input-group-append"><span class="input-group-text">Rp.</span></div>
                                            <input type="number" class="form-control m-input" name="hargaDasar" placeholder="Harga Dasar">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Harga Jual</label>
                                        <div class="input-group m-input-group">
                                            <div class="input-group-append"><span class="input-group-text">Rp.</span></div>
                                            <input type="number" class="form-control m-input" name="hargaJual" id="hargaJual" placeholder="Harga Jual">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Harga Diskon</label>
                                        <div class="input-group m-input-group">
                                            <div class="input-group-append"><span class="input-group-text">Rp.</span></div>
                                            <input type="number" class="form-control m-input" name="hargaDiscount" id="hargaDiscount" placeholder="Harga Diskon">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Status Discount</label>
                                        <div class="form-check">
                                            <input class="form-check-input" id="status_discount" name="status_discount" type="checkbox" value="1">
                                            <label class="form-check-label">
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab-5" role="tabpanel">
                            <div class="m-dropzone dropzone m-dropzone--primary" action="{{ route("products.store") }}" id="m-dropzone-two">
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
                        <div class="tab-pane fade" id="tab-6" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Kategori Store 1</label>
                                        <select class="select2 form-control" name="store_category_1" id="store_category_1">
                                        <option selected disabled value="">Pilih Kategori Store 1</option>
                                        @foreach ($store as $item)
                                        <option value="{{ $item->idKategoriStore }}">{{ $item->kategoriStore }}</option>
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Sub Kategori Store 1</label>
                                        <select id="sub_category_1" class="select2 form-control" name="sub_category_1">
                                            <option selected disabled value="">Pilih Kategori Store 1 Terlebih Dahulu</option>                                            
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Kategori Store 2</label>
                                        <select class="select2 form-control" id="store_category_2" name="store_category_2">
                                            <option selected disabled value="">Pilih Kategori Store 2</option>
                                            @foreach ($store as $item)
                                            <option value="{{ $item->idKategoriStore }}">{{ $item->kategoriStore }}</option>
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
                                        <option value="{{ $item->idKategoriGift }}">{{ $item->nameKategoriGift }}</option>
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
                                        <option value="{{ $item->idKategoriGift }}">{{ $item->nameKategoriGift }}</option>
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
        init: function(){
            $("#submitall").click(function (e) {
                e.preventDefault();
                let error = false;
                if(myDropzone.getQueuedFiles().length == 0){
                    swal(
                        'Error!',
                        'Harap Tambahkan Gambar Terlebih dahulu!',
                        'error'
                    );
                    error = true;
                }
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
                    myDropzone.processQueue();
                }
            });
            this.on('sending', function(file, xhr, formData) {
                var data = $('#product-data').serializeArray();
                $.each(data, function(key, el) {
                    formData.append(el.name, el.value);
                });
            });
        },
        success: function(file,response){
            swal({title: "Success", text: "Produk Berhasil Ditambahkan!", type: "success"}).then(
                function(){ 
                    $(location).attr('href', '/admin/products');
                }
            );
        },
        error: function(file,error,xhr){
            showError(error.error);
            this.removeAllFiles(file);
        }
    });
    //Chaining Dropdown
    $("#store_category_1").on("change",function(){
        var kategori = $(this).val();
        $.ajax({
            url : "/api/store_category/" + kategori,
            methode : "GET",
            success : function(data){
                $("#sub_category_1").html('');
                if(data.sub_category.length == 0){
                    $("#sub_category_1").append(`
                        <option selected disabled>Tidak Ada Sub Kategori</option>
                    `);        
                }
                $.each(data.sub_category,function(key,value){
                    $("#sub_category_1").append(`
                        <option value="${value.idSubKategoriStore}">${value.nameSubKategoriStore}</option>
                    `);                    
                })
            }
        })
    });
    $("#store_category_2").on("change",function(){
        var kategori = $(this).val();
        $.ajax({
            url : "/api/store_category/" + kategori,
            methode : "GET",
            success : function(data){
                $("#sub_category_2").html('');
                if(data.sub_category.length == 0){
                    $("#sub_category_2").append(`
                        <option selected disabled>Tidak Ada Sub Kategori</option>
                    `);        
                }
                $.each(data.sub_category,function(key,value){
                    $("#sub_category_2").append(`
                        <option value="${value.idSubKategoriStore}">${value.nameSubKategoriStore}</option>
                    `);                    
                })
            }
        })
    })
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