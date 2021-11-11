@include('Parent.header')
<div class="navigation-profil">
    <div id="menu-profil-web" class="row" style="margin: 0px">
        <table class="table" style="margin: 0px;table-layout: fixed">
            <tr class="hari text-center">
                <tr class="hari text-center">
                <td class="menu-profil cen" onclick="javascript:location.href='user-profile'">
                    <a href="{{url('user-profile')}}" style="color: #fff;">
                        <i class="fa fa-user"></i> Profile
                    </a>
                </td>
                <td class="menu-profil cen" onclick="javascript:location.href='event-reminder'">
                    <a href="{{url('event-reminder')}}" style="color: #fff;">
                        <i class="fa fa-calendar"></i> Event Reminder
                    </a>
                </td>
                <td class="menu-profil cen active">
                    <i class="fa fa-star"></i> Daftar Favorit
                </td>
                <td class="menu-profil cen" onclick="javascript:location.href='riwayat-belanja'">
                    <a href="{{url('riwayat-belanja')}}" style="color: #fff;">
                        <i class="fa fa-history "></i> Riwayat Belanja
                    </a>
                </td>
            </tr>
            </tr>
        </table>
    </div>
    <div id="menu-profil-mobile" class="row" style="margin: 0px">
        <div class="menu-profil col-xs-12"><i class="fa fa-user"></i> Profile</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-calendar"></i> Event Reminding</div>
        <div class="menu-profil active col-xs-12"><i class="fa fa-star"></i> Daftar Favorit</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-history "></i> Riwayat Belanja</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-archive "></i> Riwayat Status</div>
    </div>
</div>
<div class="clear"></div>
<div class="content-push" style="padding-left: 10%;padding-right: 10%;">
    <h2 class="cart-column-title cekout-sub" style="border-top: 0px"><i class="fa fa-star" style="padding:3% 0% 0% 3%"></i> Daftar Favorit</h2>
    <div style="padding: 3%">
        <div class="row">
            <div class="row shop-grid grid-view">
                <div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                    <div class="product-slide-entry text-center shift-image">
                        <div class="product-image">
                            <img src="asset/produk/10_4_6.jpg" alt="" />
                            <img src="asset/produk/10a_2_9.jpg" alt="" />
                            <div class="product-image-label type-1"><span>NEW</span></div>
                            <div class="bottom-line">
                                <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                    <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-eye "></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-star"></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="rating-box">
                            <div class="star get"><i class="fa fa-star"></i></div>
                            <div class="star get"><i class="fa fa-star"></i></div>
                            <div class="star get"><i class="fa fa-star"></i></div>
                            <div class="star get"><i class="fa fa-star"></i></div>
                            <div class="star none"><i class="fa fa-star"></i></div>
                        </div>
                        <a class="title" href="item.html">Blue Pullover Batwing Sleeve Zigzag</a>
                        <div class="article-container style-1">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div class="price">
                            <div class="prev">$199,99</div>
                            <div class="current">$119,99</div>
                        </div>
                        <div class="list-buttons">
                            <a class="button style-10">Add to cart</a>
                            <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                    <div class="product-slide-entry text-center shift-image">
                        <div class="product-image">
                            <img src="asset/produk/5a_1_3.jpg" alt="" />
                            <img src="asset/produk/5_4_3.jpg" alt="" />
                            <div class="product-image-label type-2"><span>-41%</span></div>
                            <div class="bottom-line">
                                <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                    <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-eye "></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-star"></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="rating-box">
                            <div class="star none"><i class="fa fa-star"></i></div>
                            <div class="star none"><i class="fa fa-star"></i></div>
                            <div class="star none"><i class="fa fa-star"></i></div>
                            <div class="star none"><i class="fa fa-star"></i></div>
                            <div class="star none"><i class="fa fa-star"></i></div>
                        </div>
                        <a class="title" href="item.html">Blue Pullover Batwing Sleeve Zigzag</a>
                        <div class="article-container style-1">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div class="price">
                            <div class="prev">$199,99</div>
                            <div class="current">$119,99</div>
                        </div>
                        <div class="list-buttons">
                            <a class="button style-10">Add to cart</a>
                            <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="col-md-3 col-sm-4 shop-grid-item text-center item-shadow">
                    <div class="product-slide-entry text-center shift-image">
                        <div class="product-image">
                            <img src="asset/produk/1_8_3.jpg" alt="" />
                            <img src="asset/produk/1a_1_19.jpg" alt="" />
                            <div class="product-image-label-1 type-3"><span>Sold Out</span></div>
                            <div class="bottom-line">
                                <div class="" style="display:flex;justify-content:center;margin-bottom: 5px">
                                    <a class="bottom-line-a square"><i class="fa fa-cart-plus"></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-eye "></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-star"></i></a>
                                    <a class="bottom-line-a square"><i class="fa fa-share-alt"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="rating-box">
                            <div class="star get"><i class="fa fa-star"></i></div>
                            <div class="star get"><i class="fa fa-star"></i></div>
                            <div class="star get"><i class="fa fa-star"></i></div>
                            <div class="star get"><i class="fa fa-star"></i></div>
                            <div class="star get"><i class="fa fa-star"></i></div>
                        </div>
                        <a class="title" href="item.html">Blue Pullover Batwing Sleeve Zigzag</a>
                        <div class="article-container style-1">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div class="price">
                            <div class="prev">$199,99</div>
                            <div class="current">$119,99</div>
                        </div>
                        <div class="list-buttons">
                            <a class="button style-10">Add to cart</a>
                            <a class="button style-11"><i class="fa fa-heart"></i> Add to Wishlist</a>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
@endsection
@include('Parent.footer')