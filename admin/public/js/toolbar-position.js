
//Rubah posisi toolbar (pagination dan info)
function toolbarPosition(){
    $(".m-datatable__pager .m-datatable__pager-nav").css("float","right");
    $(".m-datatable__pager .m-datatable__pager-info").css("float","left");
}
try { 
    $(datatable).on('m-datatable--on-init m-datatable--on-layout-updated m-datatable--on-update-perpage m-datatable--on-goto-page m-datatable--on-reloaded', function(){
        toolbarPosition();
    });
} catch (error) {
    
}