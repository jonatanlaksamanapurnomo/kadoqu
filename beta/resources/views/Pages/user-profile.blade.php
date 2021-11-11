@include('Parent.header')
<title>User Profile</title>
<div class="navigation-profil">
    <div id="menu-profil-web" class="row" style="margin: 0px">
        <table class="table" style="margin: 0px;table-layout: fixed">
            <tr class="hari text-center">
                <td class="menu-profil cen active">
                    <i class="fa fa-user"></i> Profile
                </td>
                <td class="menu-profil cen" onclick="javascript:location.href='event-reminder'">
                    <a href="{{url('event-reminder')}}" style="color: #fff;">
                        <i class="fa fa-calendar"></i> Event Reminder
                    </a>
                </td>
                <!-- <td class="menu-profil cen" onclick="javascript:location.href='daftar-favorit'">
                    <a href="{{url('dafta-favorit')}}" style="color: #fff;">
                        <i class="fa fa-star"></i> Daftar Favorit
                    </a>
                </td> -->
                <td class="menu-profil cen" onclick="javascript:location.href='riwayat-belanja'">
                    <a href="{{('riwayat-belanja')}}" style="color: #fff;">
                        <i class="fa fa-history "></i> Riwayat Belanja
                    </a>
                </td>
            </tr>
        </table>
    </div>
    <div id="menu-profil-mobile" class="row" style="margin: 0px">
        <div class="menu-profil active col-xs-12 "><i class="fa fa-user"></i> Profile</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-calendar"></i> Event Reminder</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-star"></i> Daftar Favorit</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-history "></i> Riwayat Belanja</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-archive "></i> Riwayat Status</div>
    </div>
</div>
 <div class="content-push" style="padding-left: 10%;padding-right: 10%;">
    <h2 class="cart-column-title cekout-sub" style="border-top: 0px"><i class="fa fa-user" style="padding:3% 0% 0% 3%"></i> Profile</h2>
    <div style="padding: 3%">
        <div class="row">
            <div class="col-md-6" style="border-right: 1px #f3f3ee solid;">
                <div class="row">
                    <h3 class="cart-column-title hide-border profil-sub-kanan col-md-12"><i class="fa fa-user"></i> Data Diri</h3>
                    <form>
                        <div class="col-md-6">
                            <label>Name Depan</label>
                            <input id="nama-user" class="form-data-diri simple-field" type="text" placeholder="Masukan Nama" required />
                            <label>Email</label>
                            <input id="email-user" class="form-data-diri simple-field" type="email" placeholder="Masukan Alamat Email Pengirim" required/>
                            <label>Jenis Kelamin</label>
                            <div class="row">
                                <label class="checkbox-entry radio col-md-6">
                                    <input class="form-data-diri" type="radio" name="jenis-kelamin" value="Pria" /> <span class="check"></span>Pria
                                </label>
                                <label class="checkbox-entry radio col-md-6" style="margin-top: 0px;">
                                    <input class="form-data-diri" type="radio" name="jenis-kelamin" value="Wanita" /> <span class="check"></span> Wanita
                                </label>
                            </div>
                            <label>Tanggal Lahir</label>
                            <input id="tanggal-lahir" style="line-height: normal;" class="form-data-diri simple-field" type="date" required value="" />
                        </div>
                        <!-- <div class="col-md-6">
                            <label>Name Belakang</label>
                            <input class="form-data-diri simple-field" type="text" placeholder="Masukan Nama Depan Pengirim" required value="" />
                        </div> -->
                        <div class="col-md-12">
                        <!-- id="edit-data-diri" -->    <div ><a class="button style-7" style="display: table;margin: 15px auto;cursor: no-drop;">Edit</a></div>
                            <div id="simpan-data-diri"><button type="submit" class="button style-7" style="display: table;margin: 15px auto;">Simpan</button></div>
                        </div>
                    </form>
                    <div class="clear"></div>
                    <!-- <h3 class="cart-column-title hide-border profil-sub-kanan col-md-12"><i class="fa fa-credit-card"></i> Informasi Tagihan Kartu Debit</h3>
                    <form>
                        <div class="col-md-6">
                            <label>Nama Lengkap</label>
                            <input class="form-info-kartu simple-field" type="text" placeholder="Masukan Nama Lengkap" required value="" />
                            <label>Alamat Tagihan</label>
                            <input class="form-info-kartu simple-field" type="text" placeholder="Masukan Alamat Tagihan" required value="" />
                        </div>
                        <div class="col-md-6">
                            <label>Email Tagihan</label>
                            <input class="form-info-kartu simple-field" type="email" placeholder="Masukan Email Tagihan" required value="" />
                            <label>Alamat Tagihan 2</label>
                            <input class="form-info-kartu simple-field" type="text" placeholder="Masukan Alamat Tagihan 2" required value="" />
                        </div>
                        <div class="col-md-12">
                            <div id="edit-info-kartu"><a class="button style-7" style="display: table;margin: 15px auto;">Edit</a></div>
                            <div id="simpan-info-kartu"><button class="simpan-info-kartu button style-7" type="submit" style="display: table;margin: 15px auto;">Simpan</button></div>
                        </div>
                    </form> -->
                    <div class="clear"></div>
                    <h3 class="cart-column-title hide-border profil-sub-kanan col-md-12"><i class="fa fa-lock"></i> Atur Kata Sandi</h3>
                    <form>
                        <div class="col-md-6">
                            <label>Kata Sandi Lama</label>
                            <input id="old-password" class="form-pass simple-field" type="password" placeholder="Masukan Kata sandi lama" required value="" />
                            <div style="color: red; margin-top: -3%;" id="old-password-validation"></div>
                            <label>Kata Sandi Baru</label>
                            <input id="new-password" class="form-pass simple-field" type="password" placeholder="Masukan Kata sandi baru" required value="" />
                            <div style="color: red; margin-top: -3%;" id="new-password-validation"></div>
                            <label>Konfirmasi Sandi Baru</label>
                            <input id="confirm-new-password" class="form-pass simple-field" type="password" placeholder="Masukan Kata sandi baru" required value="" />
                            <div style="color: red; margin-top: -3%;" id="confirm-new-password-validation"></div>
                        </div>
                        <div class="col-md-12">
                            <div id="edit-pass"><a class="button style-7" style="display: table;margin: 15px auto;">Edit</a></div>
                            <div id="simpan-pass"><button onclick="saveNewPassword()" class="button style-7" type="button" style="display: table;margin: 15px auto;">Simpan</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-md-6">
                <div class="row" style="padding-right: 40px ;padding-left: 40px">
                    <h3 class="cart-column-title hide-border profil-sub col-md-12"><i class="fa fa-home"></i> Alamat Pengiriman</h3>
                    <div id="show-alamat-user" class="col-md-12 profile-kiri">
                        <p>John Doe</p>
                        <p>123 Internet Street,(200)123567</p>
                        <p>Indonesia, Jawa Barat</p>
                        <p>Bandung,suka Jadi,14045</p>
                    </div>
                    <form>
                        <div id="form-alamat-pengirim" class="col-md-12">
                            <div class="row col-md-12">
                                <div class="col-md-6" style="padding-right: 0px">
                                    <label>Alamat Pengirim</label>
                                    <input id="alamat-user" class="simple-field" type="text" placeholder="Masukan Nama Depan Pengirim" required value="" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label>Telepon</label>
                                <input id="telepon-user" class="simple-field" type="text" placeholder="Masukan Alamat Email Pengirim" required value="" />

                            </div>
                            <div class="col-md-6">
                                <label>Kode Pos</label>
                                <input class="simple-field" type="text" placeholder="Masukan Alamat Email Pengirim" required value="" />

                            </div>
                            <!-- <div class="row col-md-12">
                                <div class="col-md-6" style="padding-right: 0px">
                                    <label>Negara</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label>Provinsi</label>
                                <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                    <select>
                                        <option>Indonesia</option>
                                        <option>Great Britain</option>
                                        <option>Canada</option>
                                    </select>
                                </div>
                                <label>Kecamatan</label>
                                <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                    <select>
                                        <option>Indonesia</option>
                                        <option>Great Britain</option>
                                        <option>Canada</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label>Kab.kota</label>
                                <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                    <select>
                                        <option>Indonesia</option>
                                        <option>Great Britain</option>
                                        <option>Canada</option>
                                    </select>
                                </div>
                            </div> -->
                        </div>
                        <div class="col-md-12">
                        <!-- id="edit-alamat-pengirim" -->    <div>
                                <a class="button style-7" style="display: table;margin: 15px auto;cursor: no-drop;">Edit</a>
                            </div>
                            <div id="simpan-alamat-pengirim">
                                <button type="submit" class="button style-7" style="display: table;margin: 15px auto;">simpan</button>
                            </div>
                        </div>

                    </form>
                    <div class="clear"></div>

                   <!--  <h3 class="cart-column-title hide-border profil-sub col-md-12"><i class="fa fa-home"></i> Alamat Penerima</h3>

                    <form>
                        <div id="alamat-penerima">
                            <div class="col-md-12 profile-kiri">
                                <div class="row">
                                    <div class="col-xs-9">
                                        <p>John Doe</p>
                                        <p>123 Internet Street,(200)123567</p>
                                        <p>Indonesia, Jawa Barat</p>
                                        <p>Bandung,suka Jadi,14045</p>
                                    </div>
                                </div>
                                <div class="no-penerima"><i class="no">1</i></div>
                            </div>
                            <div class="col-md-12 profile-kiri">
                                <div class="row">
                                    <div class="col-xs-9">
                                        <p>John Doe</p>
                                        <p>123 Internet Street,(200)123567</p>
                                        <p>Indonesia, Jawa Barat</p>
                                        <p>Bandung,suka Jadi,14045</p>
                                    </div>
                                </div>
                                <div class="no-penerima"><i class="no">2</i></div>
                            </div>
                        </div>
                        <div id="form-alamat-penerima">
                            <div class="row col-md-12">
                                <div class="col-md-6" style="padding-right: 0px">
                                    <label>Nama Pnerima</label>
                                    <input class="simple-field" type="text" placeholder="Masukan Nama Depan Pengirim" required value="" />
                                </div>
                            </div>
                            <div class="row col-md-12">
                                <div class="col-md-6" style="padding-right: 0px">
                                    <label>Alamat Penerima</label>
                                    <input class="simple-field" type="text" placeholder="Masukan Nama Depan Pengirim" required value="" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label>Telepon</label>
                                <input class="simple-field" type="text" placeholder="Masukan Alamat Email Pengirim" required value="" />
                            </div>
                            <div class="col-md-6">
                                <label>Kode Pos</label>
                                <input class="simple-field" type="text" placeholder="Masukan Alamat Email Pengirim" required value="" />

                            </div>
                            <div class="row col-md-12">
                                <div class="col-md-6" style="padding-right: 0px">
                                    <label>Negara</label>
                                    <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                        <select>
                                            <option>Indonesia</option>
                                            <option>Great Britain</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label>Provinsi</label>
                                <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                    <select>
                                        <option>Indonesia</option>
                                        <option>Great Britain</option>
                                        <option>Canada</option>
                                    </select>
                                </div>
                                <label>Kecamatan</label>
                                <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                    <select>
                                        <option>Indonesia</option>
                                        <option>Great Britain</option>
                                        <option>Canada</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label>Kab.kota</label>
                                <div class="simple-drop-down simple-field size-1" style="background: #e8e8e8">
                                    <select>
                                        <option>Indonesia</option>
                                        <option>Great Britain</option>
                                        <option>Canada</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <h3 class="tambah-penerima cart-column-title hide-border profil-sub col-md-12"><i class="fa fa-plus"></i> Tambah Alamat Penerima</h3>
                        <div class="col-md-12">
                            <div id="edit-alamat-penerima">
                                <a class="button style-7" style="display: table;margin: 15px auto;">Edit</a>
                            </div>
                            <div id="simpan-alamat-penerima">
                                <button type="submit" class="button style-7" style="display: table;margin: 15px auto;">simpan</button>
                            </div>
                        </div>
                    </form> -->
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
<script type="text/javascript">
 userMiddleware();
 
 var getDetailsUser = Cookies.get('token');
 function Show(getDetailsUser) {
     $.ajax({
        url: 'https://admin.kadoqu.com/api/details',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'POST',
        crossDomain : true,
        dataType: 'json',
        success: function(data, status) {
            console.log(data.success)
            $('#nama-user').val(data.success.name);
            $('#email-user').val(data.success.email);
            $('#tanggal-lahir').val(data.success.tanggal_lahir);
            $("input[name='jenis-kelamin'][value='"+data.success.jenis_kelamin+"']").prop('checked', true);
            $('#show-alamat-user').html(data.success.alamat);
            $('#alamat-user').val(data.success.alamat);
            $('#telepon-user').val(data.success.no_telp);
        },
     });
     
 } Show(getDetailsUser);

 function saveNewPassword() {
    var oldPassword = $('#old-password').val();
    var newPassword = $('#new-password').val();
    var newPasswordConfirm = $('#confirm-new-password').val();

    console.log(oldPassword+' '+newPassword+' '+newPasswordConfirm);
    $.ajax({
        url: 'https://admin.kadoqu.com/api/user/update/password',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'POST',
        dataType: 'json',
        data: {
            old_password : oldPassword,
            password : newPassword,
            confirm_password : newPasswordConfirm
        },
    })
    .done(function() {
        console.log("success");
    })
    .fail(function(err) {
        var errors = JSON.parse(err.responseText);
        if(typeof(errors.error) == "string"){
            $('#old-password-validation').html("The old password is doesn't match");
            $('#new-password-validation').html("");
            $('#confirm-new-password-validation').html("");
        }else{
            if(errors['error'].old_password){
                $('#old-password-validation').html(errors['error'].old_password[0]);
            } else {
                $('#old-password-validation').html("");
            } if (errors['error'].password) {
                $('#new-password-validation').html(errors['error'].password[0]);
            } else {
                $('#new-password-validation').html("");
            } if (errors['error'].confirm_password) {
                $('#confirm-new-password-validation').html(errors['error'].confirm_password[0]);
            } else {
                $('#confirm-new-password-validation').html("");
            }
        }
    })
    .always(function() {
        console.log("complete");
    });
    
 }
</script>
@endsection
@include('Parent.footer')