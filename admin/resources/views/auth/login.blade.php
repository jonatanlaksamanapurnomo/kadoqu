@extends('backend.login-parent')

@section('konten')
<div class="m-grid m-grid--hor m-grid--root m-page">
    <div class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-1" id="m_login">
        <div class="m-grid__item m-grid__item--fluid m-login__wrapper">
            <div class="m-login__container">
                <div class="card">
                    <div class="card-body">
                            <div class="m-login__logo">
                                    <img src="{{asset('/assets/images/logo_kadoqu.png')}}" width="200px">
                                </div>
                                @if(Session::has('alert-success'))
                                <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-brand alert-dismissible fade show" role="alert">
                                    <div class="m-alert__icon">
                                        <i class="flaticon-exclamation-1"></i>
                                        <span></span>
                                    </div>
                                    <div class="m-alert__text">
                                        <strong> {{ \Illuminate\Support\Facades\Session::get('alert-success') }}</strong>
                                    </div>
                                    <div class="m-alert__close">
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                                @endif
                                {!! Form::open(['url'=>'login','class'=>'']) !!}
                
                                <div class="m-login__signin">
                                    <div class="form-group m-form__group{{$errors->has('email')?'has-error' :''}}">
                                        {!! Form::email('email',null,['class'=>'form-control m-input','placeholder'=>'Email']) !!}
                                        {!! $errors->first('email','<p class="help-block">:message</p>') !!}
                                    </div>
                                    <div class="form-group m-form__group{{$errors->has('password')?'has-error' :''}}">
                                        <input class="form-control m-input m-login__form-input--last" type="password" placeholder="Password" name="password">
                                        {!! $errors->first('password','<p class="help-block">:message</p>') !!}
                                    </div>
                                    <div class="row m-login__form-sub">
                                        <div class="col m--align-right m-login__form-right">
                                            <a href="javascript:;" id="m_login_forget_password">
                                                Forget Password ?
                                            </a>
                                        </div>
                                    </div>
                                    <div class="m-login__form-action">
                                        <button type="submit" class="btn m-btn m-btn--custom m-btn--air btn-success">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                                {!! Form::close() !!}
                
                                <div class="m-login__forget-password">
                                    {!! Form::open(['url'=>'/password/email','class'=>'']) !!}
                                    <form class="m-login__form m-form" action="">
                                        <div class="form-group m-form__group{{$errors->has('email')?'has-error' :''}}">
                                                {!! Form::email('email',null,['class'=>'form-control m-input','placeholder'=>'Email']) !!}
                                                {!! $errors->first('email','<p class="help-block">:message</p>') !!}
                                        </div>
                                        <div class="m-login__form-action">
                                            <button type="submit" class="btn m-btn m-btn--custom m-btn--air btn-success">
                                            </i> Kirim link reset password
                                        </button>
                                        &nbsp;&nbsp;
                                        <button id="m_login_forget_password_cancel" class="btn m-btn m-btn--custom m-btn--air">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                {!! Form::close() !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

@endsection

