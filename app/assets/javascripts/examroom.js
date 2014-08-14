/*
# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
*/

themeChanger();
clickyRows();

if($.cookie()){
	setTheme($.cookie().theme);
}

function themeChanger(){
	var buttons = $('.controls > button');
	buttons.on('click', function(){
		theme = $(this).data('theme');
		console.log(theme);
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
	//console.log(event);
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
		console.log(room);

		$.ajax({
			url: "/examroom/update_room",
			type: "POST",
			data: { room:room, patientName:patientName, staff:staff, provider:provider, comments:comments }
		})
		.success(function(jqXHR, textStatus){
			showMessage("Updated room " + room);
		})
		.fail(function(jqXHR, textStatus){
			showMessage("Error: " + textStatus);
		});
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

function showMessage(message){
	$("#message").text(message);
	$("#message").stop();
	$("#message").fadeTo(2000, 1, function(){
		$("#message").fadeTo(2000, 0);
	});
}

function compareDates(){
	var rows = $('tbody > tr > .date');
}
//buttons.removeAttr('disabled');
//		$(this).attr('disabled', true);