<div style="display: flex;align-content: center;justify-content: center;z-index: 7">
	<a href="javascript:void(0)" id="show-product-grid"><h1>Show Product Grid</h1></a>
	<a href="javascript:void(0)" id="show-gida"><h1>Show GIDA</h1></a>
</div>
@include('Parent.header')
<div id="content-here">
	
</div>
@include('Parent.footer')
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script type="text/javascript">
	$('#show-product-grid').on('click', function(e) {
		    $.ajax({
		    	url: '{{url("komponen1")}}',
		    	type: 'GET',
		    	dataType: 'html',
		    	success: (data) => {
		    		$('#content-here').html(data);
		    		history.pushState(null, '', '{{url("komponen1")}}');
		    	}
		    });
		});
		$('#show-gida').on('click', function(e) {
		    $.ajax({
		    	url: '{{url("komponen2")}}',
		    	type: 'GET',
		    	dataType: 'html',
		    	success: (data) => {
		    		$('#content-here').html(data);
		    		history.pushState(null, '', '{{url("komponen2")}}');
		    	}
		    });
		});
</script>
