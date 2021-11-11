<form action="/upload" method="POST" enctype="multipart/form-data">
	{{ csrf_field() }}
	<input type="file" name="gambar[]" multiple>
	<button type="submit">Submit</button>
</form>