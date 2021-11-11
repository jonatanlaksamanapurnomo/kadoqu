function showError(error){
    var list = document.createElement('ul');
    $.each(error,function(key,value){
         // Create the list item:
        var item = document.createElement('li');
        // Set its contents:
        item.appendChild(document.createTextNode(value.join(",")));
        // Add it to the list:
        list.appendChild(item);
    });
    swal({
        title: "Error!",
        html: list,
        type: 'error',
    });
}
