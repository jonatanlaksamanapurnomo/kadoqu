@extends('backend.index')
@section('konten')
@if(session()->has('success'))
<input type="hidden" id="success" value="{{ session()->get('success') }}">
@endif
@if($errors->any())
<input type="hidden" id="errors" value="{{ $errors }}">
@endif
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
                                            Order
                                        </span>
                                    </a>
                                </li>
                                <li class="m-nav__separator">
                                    -
                                </li>
                                <li class="m-nav__item">
                                    <a href="/admin/order/{{ $order->order_no }}" class="m-nav__link">
                                        <span class="m-nav__link-text">
                                            #{{$order->order_no}}
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
				</h3>
			</div>
		</div>
	</div>
	<div class="m-portlet__body">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-selected="true">Order</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-selected="false">Konfirmasi Pembayaran</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
                <table class="table">
                    <tr>
                        <td>Order No</td>
                        <td>:</td>
                        <td>#{{ $order->order_no }}</td>
                    </tr>
                    <tr>
                        <td>Tanggal Order</td>
                        <td>:</td>
                        <td>{{ $order->date }}</td>
                    </tr>
                    <tr>
                        <td>Nama Penerima</td>
                        <td>:</td>
                        <td>{{ $order->nama_penerima }}</td>
                    </tr>
                    <tr>
                        <td>Nomor Telfon</td>
                        <td>:</td>
                        <td>{{ $order->no_telp }}</td>
                    </tr>
                    <tr>
                        <td>E-Mail</td>
                        <td>:</td>
                        <td>{{ $order->email }}</td>
                    </tr>
                    <tr>
                        <td>Metode Pembayaran</td>
                        <td>:</td>
                        <td>{{ $order->metode_pembayaran }}</td>
                    </tr>
                    <tr>
                        <td>Metode Pengiriman</td>
                        <td>:</td>
                        <td>{{ $order->metode_pengiriman }}</td>
                    </tr>
                    <tr>
                        <td>Kurir</td>
                        <td>:</td>
                        <td>{{ $order->kurir }}</td>
                    </tr>
                    <tr>
                        <td>Biaya Pengiriman</td>
                        <td>:</td>
                        <td>{{ $order->biaya_pengiriman }}</td>
                    </tr>
                    <tr>
                        <td>Total Bayar</td>
                        <td>:</td>
                        <td>{{ $order->total_bayar }}</td>
                    </tr>
                    <form action="{{ route("orders.update",$order->id) }}" method="POST" id="data-status">
                    {{ csrf_field() }}
                    <input type="hidden" id="old_status" name="old_status" value="{{ $order->status }}">
                    <input type="hidden" id="old_resi" name="old_resi" value="{{ $order->no_resi }}">
                    <input type="hidden" name="_method" value="PUT">
                    <tr>
                        <td>Status Order</td>
                        <td>:</td>
                        @if($order->status > 0)
                        <td>
                            <select class="form-control" name="status" id="status">
                                <option value="0" {{ $order->status == "0" ? "selected" : "" }} {{ $order->status > 0 ? "hidden" : "" }}>Menunggu Pembayaran</option>
                                <option value="1" {{ $order->status == "1" ? "selected" : "" }} {{ $order->status > 1 || $order->status < 0 ? "hidden" : "" }}>Sudah Konfirmasi</option>
                                <option value="2" {{ $order->status == "2" ? "selected" : "" }} {{ $order->status > 2 || $order->status < 1 ? "hidden" : "" }}>Sudah Dibayar</option>
                                <option value="3" {{ $order->status == "3" ? "selected" : "" }} {{ $order->status < 2 ? "hidden" : "" }}>Barang Dikirim</option>
                                <option value="4" {{ $order->status == "4" ? "selected" : "" }} {{ $order->status > 4 || $order->status < 3 ? "hidden" : "" }}>Barang Diterima</option>
                            </select>
                        </td>
                        @else
                        <td>
                            Menunggu Konfirmasi Pembayaran
                        </td>
                        @endif
                    </tr>
                    <tr id="resi" {{ $order->status < 3 ? "hidden" : "" }}>
                        <td>Nomor Resi</td>
                        <td>:</td>
                        <td><input type="text" class="form-control" id="no_resi" name="no_resi" placeholder="Nomor Resi" value="{{ $order->no_resi }}" required {{ $order->status == 4 ? "disabled" : "" }}></td>
                    </tr>
                    @if($order->status > 0)
                    <tr>
                        <td colspan="3" class="text-right">
                            <a href="{{ url()->previous() }}" class="btn btn-danger">Cancel</a>
                            <button type="button" onclick="showConfirm()" class="btn btn-success">Save</button>
                        </td>
                    </tr>
                    @endif
                    </form>
                    <tr>
                        <td colspan="3">
                            <caption>Item Details</caption>
                            <table class="table">
                                <tr>
                                    <td>#</td>
                                    <td>SKU</td>
                                    <td>Nama Produk</td>
                                    <td>Harga Satuan</td>
                                    <td>Qty</td>
                                    <td>Total</td>
                                </tr>
                                @foreach($order->item as $index=>$item)
                                <tr>
                                    <td>{{ $index+1 }}</td>
                                    <td>{{ $item->SKU }}</td>
                                    <td>{{ $item->product->namaProduk }}</td>
                                    <td>{{ $item->harga_satuan }}</td>
                                    <td>{{ $item->jumlah }}</td>
                                    <td>{{ $item->harga_total }}</td>
                                </tr>
                                @endforeach
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="tab-pane fade" id="tab-2" role="tabpanel">
                @if($order->Konfirmasi_pembayaran == null)
                    Belum Ada Konfirmasi Pembayaran
                @else
                <div class="row">
                        <div class="col-lg-4">
                        <img src="/uploads/{{ $order->konfirmasi_pembayaran->bukti_transfer }}" class="img-thumbnail" onclick="sendData('{{ $order->konfirmasi_pembayaran->bukti_transfer }}','{{$order->konfirmasi_pembayaran->order_no}}')" data-toggle="modal" data-target="#view">
                        </div>
                        <div class="col-lg-8">
                            <table class="table">
                                <tr>
                                    <td>Tanggal Transfer</td>
                                    <td>:</td>
                                    <td>{{ $order->konfirmasi_pembayaran->tanggal_transfer }}</td>
                                </tr>
                                <tr>
                                    <td>Atas Nama</td>
                                    <td>:</td>
                                    <td>{{ $order->konfirmasi_pembayaran->atas_nama }}</td>
                                </tr>
                                <tr>
                                    <td>Bank</td>
                                    <td>:</td>
                                    <td>{{ $order->konfirmasi_pembayaran->bank }}</td>
                                </tr>
                                <tr>
                                    <td>Nominal</td>
                                    <td>:</td>
                                    <td>{{ $order->konfirmasi_pembayaran->nominal }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                @endif
            </div>
        </div>
        
    </div>
</div>
<div class="modal fade" id="view" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="bukti_label">Bukti Transfer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" id="bukti_content">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
</div>
@endsection
@section('scripts')
<script>
    if($("#success").val() != undefined){
        swal(
            'Success!',
            `${$("#success").val()}`,
            'success'
        ).then(
        function(){ 
            window.location = "/admin/order";
        });
    }
    if($("#errors").val() != undefined){
        var errors = JSON.parse($("#errors").val());
        if(errors != undefined){
            showError(errors);
        }
    }
    $("#status").on("change",function(){
        let status = $(this).val();
        if(status == 3){
            $("#resi").removeAttr("hidden");
            $("input[name='no_resi']").removeAttr("disabled","disabled")

        }else{
            if(status == 4){
                $("input[name='no_resi']").attr("disabled","disabled")

            }else{
                $("#resi").attr("hidden","hidden");
            }
        }
    })
    function showConfirm(){
        if($("#old_status").val() == $("#status").val() && $("#status").val() != 3 || $("#old_resi").val() == $("#no_resi").val() && $("#old_status").val() == $("#status").val() && $("#no_resi").val() != ""){
            location.reload();
        }else{
            if($("#status").val() == 3){
                if($("#no_resi").val() == ""){
                    swal("Gagal","Harap Masukkan Nomor Resi","error");
                }else{
                    swal({
                        title: '<strong>Yakin ingin merubah order #{{ $order->order_no }}?</strong>',
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
                            $("#data-status").submit(); 
                        }else{
                            swal("Cancelled", "Dibatalkan", "error");
                            return false;
                        }
                    })
                }
            }else{
                swal({
                    title: '<strong>Yakin ingin merubah status order #{{ $order->order_no }}?</strong>',
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
                        $("#data-status").submit(); 
                    }else{
                        swal("Cancelled", "Dibatalkan", "error");
                        return false;
                    }
                })
            }
        }
    }
    function sendData(img,order){
		$("#bukti_label").html("Bukti Transfer #" + order);
		$("#bukti_content").html(`<img src="/uploads/${img}" class="img-fluid">`);
	}
</script>
@endsection