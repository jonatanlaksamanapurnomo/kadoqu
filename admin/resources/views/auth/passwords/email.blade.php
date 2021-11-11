@extends('backend.login-parent')

@section('konten')
<div class="m-grid m-grid--hor m-grid--root m-page">
    <div class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-1" id="m_login" style="background-image: url(./images/assets/bg-1.jpg);">
        <div class="m-grid__item m-grid__item--fluid m-login__wrapper">
            <div class="m-login__container">
                <div class="m-login__logo">
                    <img src="{{asset('images/assets/logo-1.png')}}">
                </div>
                @if(session('status'))
                <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-brand alert-dismissible fade show" role="alert">
                    <div class="m-alert__icon">
                        <i class="flaticon-exclamation-1"></i>
                        <span></span>
                    </div>
                    <div class="m-alert__text">
                        <strong> {{ session('status') }}</strong>
                    </div>
                    <div class="m-alert__close">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                @endif

                {!! Form::open(['url'=>'/password/email','class'=>'m-login__form m-form']) !!}
                <form class="m-login__form m-form" action="">
                    <div class="form-group m-form__group">
                        <input class="form-control m-input" type="text" placeholder="Email" name="email" id="m_email" autocomplete="off">
                        {!! $errors->first('email','<p class="help-block">:message</p>') !!}
                    </div>
                    <div class="m-login__form-action">
                        <button type="submit" class="btn m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn">
                        </i> Kirim link reset password
                    </button>
                    &nbsp;&nbsp;
                    <a href="{{URL('')}}" class="btn m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn">
                        Kembali
                    </a>
                </div>
            </form>
            {!! Form::close() !!}
        </div>
    </div>
</div>

</div>

@endsection

