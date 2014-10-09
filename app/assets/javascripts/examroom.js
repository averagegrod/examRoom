/*
# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
*/
$(".examroom.show, .settings.show").ready(function() {
	themeChanger();
	$("time.timeago").timeago();
	clickyRows();

	refreshTable();
	if($.cookie().theme){
		setTheme($.cookie().theme);
	}else{
		setTheme('blue');
	}

	$("#refresh_btn").click(function(){
		window.location.reload();
	});

	$(".moveable").mousedown(function(){
		$(this).addClass("moving");
	});

	$(".moveable").mouseup(function(){
		$(this).removeClass("moving");
	});

	function themeChanger(){
		var buttons = $('.controls > button');
		buttons.on('click', function(){
			theme = $(this).data('theme');
			setTheme(theme);
		});
	}

	function setTheme(theme){
		$.cookie('theme', theme, {expires: 30, path: '/'});
		$("#root, #footer").removeClass().addClass('theme-' + theme);
		$("tbody").removeClass().addClass('theme-' + theme + '-text');
		$("th, tfoot, .roomLinks a").removeClass().addClass('theme-' + theme + '-dark');
		$("textarea, input, li").removeClass().addClass('text-' + theme);
		$("select").removeClass().addClass('select-' + theme);
		$("li:even, tr:even, input:odd, input:last, tr:even>td>select, tr:even>td>textarea").removeClass().addClass('theme-' + theme + '-row').addClass('text-' + theme);
		$("button[disabled=disabled").removeAttr('disabled');
	$("button[data-theme=" + theme).attr('disabled', true);
	$("[data-button='button']").addClass('button, postfix');
}

function clickyRows(){
	var rows = $('tbody > tr');
	var $nameInput = "<input type='text' tabindex='1' class='form-" + $.cookie().theme + "''>";

	$("select").focusin(function(){
		$(this).addClass('select-'+$.cookie().theme);
	});

	$("textarea, input").focusin(function(){
		$(this).addClass('text-'+$.cookie().theme);
	});

	$("td.name").focusout(function(){
		$(this).removeClass();
	});

	$(".roomLinks a").click(function(){
		$parent = $(this).parent().next();
		room = $(this).text();
		patientName = $parent.next().children().first().val();
		staff = $parent.siblings(".staff").children("select").val();
		provider = $parent.siblings(".providers").children("select").val();
		comments = $parent.siblings(".comments").children().first().val();
		success = ("Updated room: " + room);
		updateRoom(room, patientName, staff, provider, comments, success);
	});

	$("td.date").click(function(){
		room = $(this).closest("tr").data("room");
		clearRow(room);
	});
}

$("#rooms").on('change', function(){
	var rooms = $(this).val();
	$.ajax({
		url: "/examroom/set_rooms",
		type: "POST",
		data: { rooms: rooms },
	});

	$("#flash").append(function(){
		$message = $("<div data-alert class='alert-box round success'><div>Room Updated</div><a href='#'' class='close'>&times;</a></div>");
		return $message.click(function(){$(this).remove();});
	});
});

$("#waitingRoom_btn").click(function(){
	comments = $("#waitingRoom").val();
	$.ajax({
		url: "/examroom/edit_waiting_room",
		type: "POST",
		data: { comments:comments }
	})
	.success(function(){
		showMessage("Waiting Room Updated.");
	})
	.fail(function(jqXHR, textStatus){
		showMessage("Error: " + textStatus);
	});
});

function updateRoom(room, patientName, staff, provider, comments, success){
	$.ajax({
		url: "/examroom/update_room",
		type: "POST",
		data: { room:room, patientName:patientName, staff:staff, provider:provider, comments:comments }
	})
	.success(function(){
		showMessage(success);
		compareDates();
	})
	.fail(function(jqXHR, textStatus){
		showMessage("Error: " + textStatus);
	});
}

function showMessage(message){
	$("#message").text(message);
	$("#message").stop();
	$("#message").fadeTo(2000, 1, function(){
		$("#message").fadeTo(2000, 0);
	});
}

function compareDates(){
	$.ajax({
		url: "/examroom/update_all",
		type: "POST"
	})
	.success(function(data){
		$.each(data, function(i){
			time = data[i].updated_at;
			$time = $("<time class=\"timeago\" datetime =\""+time+"\"></time>");
			$('[data-room="'+data[i].room+'"] > .date > span > time').remove();
			$('[data-room="'+data[i].room+'"] > .date > span').append($time);
			$('[data-room="'+data[i].room+'"] > .patient > input').val(data[i].patientName);
			$('[data-room="'+data[i].room+'"] > .staff > select').val(data[i].staff);
			$('[data-room="'+data[i].room+'"] > .providers > select').val(data[i].provider);
			$('[data-room="'+data[i].room+'"] > .comments > textarea').val(data[i].comments);

		});
		$("time.timeago").timeago();
	})
	.fail(function(jqXHR, textStatus){
		showMessage("Error: " + textStatus);
	});
}

function clearRow(room){
	patientName = staff = provider = comments = "";
	success = "Cleared room:" + room;
	updateRoom(room, patientName, staff, provider, comments, success);

}

function updateWaitingRoom(){
	$.ajax({
		url: "/examroom/update_waiting_room",
		type: "POST"
	})
	.success(function(data){
		currentText = $('#waitingRoom').val();
		if( currentText != data){
			$.titleAlert("Waiting Room Updated", {
				stopOnFocus:true,
				duration:0,
				interval:500
			});
			$('#waitingRoom').val(data);
		}
	})
	.fail(function(jqXHR, textStatus){
		showMessage(" Update Waiting Room Error: " + textStatus);
	});
}

function refreshTable(){
	if ( $('input:focus, textarea:focus').length === 0 ) {
		compareDates();
		updateWaitingRoom();
	}
	var timer1 = setTimeout(refreshTable, 30000);
}

});