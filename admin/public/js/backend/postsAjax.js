var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;



//menata data list
manageData();
function manageData(){
	$.ajax({
		dataType: 'json'.
		url 	: url,
		data 	: {page:page}
	}).done(function(data)){
		total_page = data.last_page;
		current_page = data.current_page;
		$('#pagination').twbsPagination({
			totalPages	: total_page,
			visiblePages: current_page,
			onPageClick	: function(event,pageL){
				page=pageL;
				if(is_ajax_fire !=0){
					getPageData();
				}
			}
		});
		manageRow(data.data);
		is_ajax_fire = 1 ;
	}
}

$ajaxSetup({
	headers: {
		'X-CSRF-TOKEN'	: $('meta[name="csrf-token"]').attr('content')
	}
});

//Mengambil data halaman
function getPageData(){
	$.ajax({
		dataType: 'json',
		url 	:  url,
		data 	: {page:page}
	}).done(function(data){
		manageRow(data.data);
	});
}

//menambahkan data ke post table
function manageRow(data){
	var rows = '';
	$.each(data,function(key,value){
		rows = rows + '<tr>';
		rows = rows + '<td>'+value.title+'</td>';
		rows = rows + '<td>'+value.+details'</td>';
		rows = rows + '<td data-id="'+value.id'">';
		rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">EDIT</button>';
		rows = rows + '<button class="btn btn-danger remove-item">DELETE</button>'
		rows = rows + '</td>';
		rows = rows + '</tr>';
	});
	$("tbody").html(rows);
}

//membuat post baru
$(".crud-submit").click(function(e){
	e.preventDefault();
	var form_action = $("#create-item").find("form").attr("action");
	var title = $("#create-item").find("input[name='title']").val();
	var details = $("create-item").find("textarea[name='details']").val();
	$.ajax({
		dataType:'json',
		type 	: 'POST',
		url 	: form_action,
		data 	: {title:title,details:details}
	}).done(function(data){
		getPageData();
		$("modal").modal('hide');
		toastr.success('Post berhasil ditambahkan.','Success Alert',{timeout: 5000});
	});
});

//Menghapus data
$("body").on("click",".remove-item",function(){
	var id = $(this).parent("td").data('id');
	var c_obj = $(this).parents("tr");
	$.ajax({
		dataType: 'json',
		type 	: 'delete',
		url 	: url + '/' +id,
	}).done(function(data){
		c_obj.remove();
		toastr.success('Post')
	})
})