@include('Parent.header')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.print.css" media="print">
    <link rel="stylesheet" href="{{asset('calender/css/AdminLTE.min.css')}}">
    <link href="{{asset('calender/css/mystyle.css')}}" rel="stylesheet" type="text/css" />
    <style type="text/css">
        body .fc {
            overflow: auto;
        }
    </style>
<title>Event Reminder</title>
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
                    <td class="menu-profil cen active">
                        <i class="fa fa-calendar"></i> Event Reminder
                    </td>
                    <!-- <td class="menu-profil cen" onclick="javascript:location.href='daftar-favorit'">
                        <a href="{{url('daftar-favorit')}}" style="color: #fff;">
                            <i class="fa fa-star"></i> Daftar Favorit
                        </a>
                    </td> -->
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
        <div class="menu-profil active col-xs-12"><i class="fa fa-calendar"></i> Event Reminder</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-star"></i> Daftar Favorit</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-history "></i> Riwayat Belanja</div>
        <div class="menu-profil col-xs-12"><i class="fa fa-archive "></i> Riwayat Status</div>
    </div>
</div>
<div class="content-push">
    <h2 class="cart-column-title cekout-sub" style="border-top: 0px"><i class="fa fa-calendar" style="padding:3% 0% 0% 3%"></i> Event Reminder</h2>
    <div style="padding: 3%">
       <div class="content-push" style="padding-left: 10%;padding-right: 10%;">
        <div class="row">
            <div class="col-md-9">
                <div id="calendar"></div>
            </div>
            <div class="col-md-3">
                <div class="box box-solid">
                    <div class="box-header with-border">
                        <h4 class="box-title">Tarik untuk menambahkan</h4>
                    </div>
                    <div class="box-body">
                        <!-- the events -->
                        <div id="external-events">
                            <div id="list-here">
                                
                            </div>
                            <div class="checkbox">
                                <label for="drop-remove">
                                    <input type="checkbox" id="drop-remove">
                                    <div style="padding-top: 3px;">remove after drop</div>
                                </label>
                            </div>
                        </div>

                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /. box -->
                <div class="box box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Buat Event</h3>
                    </div>
                    <div class="box-body">
                        <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                            <!--<button type="button" id="color-chooser-btn" class="btn btn-info btn-block dropdown-toggle" data-toggle="dropdown">Color <span class="caret"></span></button>-->
                            <ul class="fc-color-picker" id="color-chooser">
                                <li>
                                    <a class="text-aqua" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-blue" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-light-blue" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-teal" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-yellow" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-orange" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-green" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-lime" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-red" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-purple" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-fuchsia" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-muted" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-navy" href="#">
                                        <i class="fa fa-square"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- /btn-group -->
                        <div class="input-group">
                            <input id="new-event" type="text" class="form-control" placeholder="Event Title">

                            <div class="input-group-btn">
                                <button id="add-new-event" type="button" class="btn btn-primary btn-flat">Add</button>
                            </div>
                            <!-- /btn-group -->
                        </div>
                        <!-- /input-group -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
	<script type="text/javascript" src="{{asset('calender/js/jquery-ui.min.js')}}"></script>
    <script src="{{asset('calender/js/moment.js')}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.ui.touch@0.0.1/jquery.ui.touch.min.js" type="text/javascript"></script>
    <script>
         userMiddleware();
        $(document).on("click", ".closen-extend i", function () {
            $(this).parents('.external-event').remove();
        });

            /* initialize the external events
             -----------------------------------------------------------------*/
            function init_events(ele) {
                ele.each(function () {

                    // create an Event Object (https://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                    // it doesn't need to have a start or end
                    var eventObject = {
                        title: $.trim($(this).text()) // use the element's text as the event title
                    };

                    // store the Event Object in the DOM element so we can get to it later
                    $(this).data('eventObject', eventObject);

                    // make the event draggable using jQuery UI
                    $(this).draggable({
                        zIndex: 1070,
                        revert: true, // will cause the event to go back to its
                        revertDuration: 0  //  original position after the drag
                    });

                });
            }

            init_events($('#external-events div.external-event'));

            /* initialize the calendar
             -----------------------------------------------------------------*/
            //Date for the calendar events (dummy data)

            var date = new Date();
            var d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear();
            let user; 
            function getEvent(token,event){
                $.ajax({
                    url: "https://admin.kadoqu.com/api/details",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                    type: 'POST',
                    crossDomain : true,
                    dataType: 'json',
                    success: event
                });
            }

            let itemsDate = [];
            getEvent(token,function(returnValue){
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    },
                    buttonText: {
                        today: 'today',
                        month: 'month',
                        week: 'week',
                        day: 'day'
                    },
                    
                    //Random default events
                    events: returnValue.success.event_reminder,
                    eventRender: function (calEvent, element) {
                        element.append(`<span class='closeon' data-id=${calEvent.id}><i class='fa fa-times'></span>`);
                        element.find(".closeon i").click(function () {
                            deleteEventReminder(calEvent.id);
                            $('#calendar').fullCalendar('removeEvents', function (ev) {
                                return (ev._id == calEvent._id);
                            });
                        });
                    },
                    eventClick: function (calEvent, element) {
                        // console.log(element)
                         
                    },
                    editable: true,
                    droppable: true, // this allows things to be dropped onto the calendar !!!
                    drop: function (date, allDay, jsEvent, ui, resourceId) { // this function is called when something is dropped
                        // alert("drop: " + date.format());
                        // console.log(jsEvent.helper.context.innerText)
                        // console.log(jsEvent.helper.context.style.borderColor)
                        var originalEventObject = $(this).data('eventObject');
                        $.ajax({
                            url: `https://admin.kadoqu.com/api/event_reminder`,
                            headers: {
                                'Authorization': `Bearer ${token}`,
                              },
                            method: 'POST',
                            crossDomain : true,
                            dataType: 'json',
                            data: {
                                title:jsEvent.helper.context.innerText,
                                start:date.format(),
                                backgroundColor:jsEvent.helper.context.style.backgroundColor,
                                borderColor:jsEvent.helper.context.style.borderColor
                            },
                            success:function(data){
                                // retrieve the dropped element's stored Event Object
                                // we need to copy it, so that multiple events don't have a reference to the same object
                                var copiedEventObject = $.extend({}, originalEventObject);
                                // assign it the date that was reported
                                copiedEventObject.id = data.event.id;
                                copiedEventObject.start = date;
                                copiedEventObject.allDay = allDay;
                                copiedEventObject.backgroundColor = data.event.backgroundColor;
                                copiedEventObject.borderColor = data.event.borderColor;
                                // render the event on the calendar
                                // the last `true` argument determines if the event "sticks" (https://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                                $('#calendar').fullCalendar('unselect');
                               
                            }
                        });
                         

                        // is the "remove after drop" checkbox checked?
                        if ($('#drop-remove').is(':checked')) {
                            deleteLists(parseInt($('#list-here').find('span').data('id')));
                            // if so, remove the element from the "Draggable Events" list
                            $(this).remove();
                        }
                    },
                    eventDrop: function(event) {
                        console.log(event.id);
                        var endDate = event.end;
                        if (endDate == null) {
                            endDate = convertDate(event.start._d);
                        } else {
                           endDate = convertDate(event.end._d);
                        }
                        function convertDate(date) {
                        date = new Date(date);
                        year = date.getFullYear();
                        month = date.getMonth()+1;
                        dt = date.getDate();

                            if (dt < 10) {
                              dt = '0' + dt;
                            }
                            if (month < 10) {
                              month = '0' + month;
                            }

                             return year+'-' + month + '-'+dt;
                        }
                        $.ajax({
                            url: `https://admin.kadoqu.com/api/event_reminder/${event.id}`,
                            headers: {
                                'Authorization': `Bearer ${token}`,
                              },
                            method: 'PUT',
                            crossDomain : true,
                            dataType: 'json',
                            data: {
                                title:event.title,
                                start:convertDate(event.start._d),
                                end:endDate,
                                backgroundColor:event.backgroundColor,
                                borderColor:event.borderColor
                            }
                        });
                    },
                    eventResize: function(eventes){
                        console.log(eventes.id)
                        var endDate = eventes.end;
                        if (endDate == null) {
                            endDate = convertDate(eventes.start._d);
                        } else {
                           endDate = convertDate(eventes.end._d);
                        }
                        function convertDate(date) {
                        date = new Date(date);
                        year = date.getFullYear();
                        month = date.getMonth()+1;
                        dt = date.getDate();

                            if (dt < 10) {
                              dt = '0' + dt;
                            }
                            if (month < 10) {
                              month = '0' + month;
                            }

                             return year+'-' + month + '-'+dt;
                        }
                        $.ajax({
                            url: `https://admin.kadoqu.com/api/event_reminder/${eventes.id}`,
                            headers: {
                                'Authorization': `Bearer ${token}`,
                              },
                            method: 'PUT',
                            crossDomain : true,
                            dataType: 'json',
                            data: {
                                title:eventes.title,
                                start:convertDate(eventes.start._d),
                                end:endDate,
                                backgroundColor:eventes.backgroundColor,
                                borderColor:eventes.borderColor
                            }
                        });
                    },
                });
            });
            
            var listEvent = [];
            getEvent(token, function(returnValue){
            listEvent = returnValue.success.event;
            /* ADDING EVENTS */
            var currColor = '#3c8dbc'; //Red by default
            //Color chooser button
            var colorChooser = $('#color-chooser-btn');
            $('#color-chooser > li > a').click(function (e) {
                e.preventDefault();
                //Save color
                currColor = $(this).css('color');
                //Add color effect to button
                $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor });
            });
            $('#add-new-event').click(function (e) {
                e.preventDefault();

                //Get value and make sure it is not null
                var val = $('#new-event').val();
                if (val.length == 0) {
                    return;
                }

                //Create events
                var event = $('<div/>');
                event.css({
                    'background-color': currColor,
                    'border-color': currColor,
                    'color': '#fff'
                }).addClass('external-event');
                $.ajax({
                    url: 'https://admin.kadoqu.com/api/event',
                    type: 'POST',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        title: $('#new-event').val(),
                        backgroundColor:currColor,
                        borderColor:currColor
                    },
                }).done(function(data){
                    getListEvent(token);
                });
                // event.html(val + `<span class='closen-extend'><i class='fa fa-times' onclick="deleteLists('${val.id}')"></span>`);
                
                //Add draggable funtionality
                init_events(event);

                //Remove event from text input
                $('#new-event').val('');
            });
                
            });

            function getListEvent(token){
                $.ajax({
                    url: "https://admin.kadoqu.com/api/details",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                    type: 'POST',
                    crossDomain : true,
                    dataType: 'json',
                    success: function (data){
                        $("#list-here").html("");
                        $.each(data.success.event, function(index, val) {
                            let listdata = $('<div/>');
                            listdata.css({
                                'background-color': val.backgroundColor,
                                'border-color': val.backgroundColor,
                                'color': '#fff'
                            }).addClass('external-event');
                            listdata.html(val.title + `<span class='closen-extend' data-id="${val.id}"><i class='fa fa-times' onclick="deleteLists('${val.id}')"></span>`);
                            $('#list-here').prepend(listdata);
                            init_events(listdata);
                        });
                    }
                });
            }getListEvent(token);

            function deleteLists(id){
                $.ajax({
                    url: `https://admin.kadoqu.com/api/event/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                    method: 'DELETE',
                    crossDomain : true,
                    dataType: 'json',
                    success: function (data){
                         console.log('terhapus')
                        
                    }
                });
            }
            
            function deleteEventReminder(id){
                $.ajax({
                    url: `https://admin.kadoqu.com/api/event_reminder/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                    method: 'DELETE',
                    crossDomain : true,
                    dataType: 'json',
                    success: function (data){
                         console.log('terhapus')
                        
                    }
                });
            }
            
    </script>
@endsection
@include('Parent.footer')