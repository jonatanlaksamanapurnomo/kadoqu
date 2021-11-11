@extends('layouts.app')

@section('styles')
<style>

.square {
	font-size:64pt;
}

.gotham-light {
    font-family: 'Gotham-Light';
}

.gotham-medium {
    font-family: 'Gotham-Medium';
}

.gotham-bold {
    font-family: 'Gotham-Bold';
}

</style>
@endsection

@section('content')
<div class="container">
	<div id="color-palette">
		<span class="square dark-gray">&#x25A0;</span>
		<span class="square jelly-bean">&#x25A0;</span>
		<span class="square persian-green">&#x25A0;</span>
		<span class="square sinbad">&#x25A0;</span>
		<span class="square morning-glory">&#x25A0;</span>
		<span class="square light-cyan">&#x25A0;</span>
		<span class="square clear-day">&#x25A0;</span>
		<span class="square whisper">&#x25A0;</span>
		<span class="square sugar-cane">&#x25A0;</span>
		<span class="square white-smoke">&#x25A0;</span>
		<br>
		<span class="square pale-cornflower-blue">&#x25A0;</span>
		<span class="square lavender-rose">&#x25A0;</span>
		<span class="square sweet-corn">&#x25A0;</span>
		<span class="square melon">&#x25A0;</span>
		<span class="square vivid-tangerine">&#x25A0;</span>
		<span class="square mandy">&#x25A0;</span>
		<span class="square eucalyptus">&#x25A0;</span>
		<span class="square lime-green">&#x25A0;</span>
		<span class="square red">&#x25A0;</span>
		<span id="color-name"></span>
	</div>
	<div id="typography-headings">
		<h1>KADOQU</h1>
		<h2>KADOQU</h2>
		<h3>KADOQU</h3>
		<h4>KADOQU</h4>
		<h5>KADOQU</h5>
		<h6>KADOQU</h6>
		<h2 class="gotham-medium persian-green">KADOQU</h2>
		<h2 class="gotham-medium persian-green"><i>KADOQU</i></h2>
		<h2 class="gotham-bold persian-green">KADOQU</h2>
		<h2 class="gotham-bold persian-green"><i>KADOQU</i></h2>
		<h2 class="gotham-light persian-green">KADOQU</h2>
		<h2 class="gotham-light persian-green"><i>KADOQU</i></h2>
	</div>
	<div class="row gotham-light">
		<div class="col-md-6">
			<div class="form-group">
				<label for="name">Name</label>
				<input class="form-control" type="text" id="name" name="name">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="password">Password</label>
				<input class="form-control" type="password" id="password">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="email">Email</label>
				<input class="form-control" type="email" id="email">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="phone">Phone</label>
				<input class="form-control" type="phone" id="phone">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="number">Number</label>
				<input class="form-control" type="number" id="number">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="textarea">Textarea</label>
				<textarea class="form-control" id="textarea" rows=5>...</textarea>
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="select">Choose</label>
				<select class="form-control" 	id="select">
					<option>a</option>
					<option>b</option>
					<option>c</option>
					<option>d</option>
				</select>
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-check">
			  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
			  <label class="form-check-label" for="defaultCheck1">
			    Default checkbox
			  </label>
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
			  <label class="form-check-label" for="exampleRadios1">
			    Default radio
			  </label>
			</div>
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
			  <label class="form-check-label" for="exampleRadios1">
			    Default radio
			  </label>
			</div>
		</div>
		<div class="col-md-6">
			<input type="submit" value="Input type submit" class="btn btn-default">
			<button type="submit" class="btn btn-default">Button type submit</button>
		</div>
		<div class="col-md-6">
			<div class="form-group">
			    <label for="formControlRange">Example Range input</label>
			    <input type="range" class="form-control-range" id="formControlRange">
			</div>
  		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="date">Date</label>
				<input class="form-control" type="date" id="date">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="time">time</label>
				<input class="form-control" type="time" id="time">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label for="search">Date</label>
				<input class="form-control" type="search" id="search">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
			    <label for="exampleFormControlFile1">Example file input</label>
			    <input type="file" class="form-control-file" id="exampleFormControlFile1">
			  </div>
		</div>
	</div>
</div>
<br>
<br>
<br>
<br>
<br>

@endsection

@section('scripts')
<script>
	$('document').ready(function(){
		$('.square').hover(function(){
			var color = this.className.split(' ')[1];
			$('#color-name').text(color).attr('class',color);
		})
	})
</script>
@endsection