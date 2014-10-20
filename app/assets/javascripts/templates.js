$(".templates").ready(function() {

	var clip = new ZeroClipboard($("#copy-button"));
	clip.on( "copy", function(event){
		//var w = window.open();
		var clipboard = event.clipboardData;
		var text = '';
		var modalCloseButton ="<a class='close-reveal-modal'>&#215;</a>";

		$('form p').children().each(function(){
			if($(this).is('label')){
				text += $(this).text() +' ';
			}else if($(this).is('input')){
				text += $(this).val() + '\n';
			}
		});
		
		var modalText = text.replace(/\n/g, "<br />");
		clipboard.setData( "text/html", modalText);
		clipboard.setData( "text/plain", text);
		$("#myModal").html("Template Created!</br>Right click and Paste or CTRL+V to insert into HPI</br>" + modalText + modalCloseButton);
		
	});

	$('input').blur(function(){
		if($(this).val() === 'n'){
			$(this).val('No ').focus();
		}
		if($(this).val() === 'y'){
			$(this).val('Yes ').focus();
		}
	});
});

$(".templates.edit").ready(function() {
	$('#question_content').focus();


	$('#question_content').blur(function(){
		var macro = $('#question_content');
		
		if(macro.val().substr(macro.length - 3) === 'pw'){
			macro.val(macro.val().slice(0, -3));
			macro.val(macro.val() + ' pain & where?');
			macro.focus();
		}
		if(macro.val().substr(macro.length - 3) === 'sw'){
			macro.val(macro.val().slice(0, -3));
			macro.val(macro.val() + ' swelling & where?');
			macro.focus();
		}
		if(macro.val().substr(macro.length - 4) === 'plr'){
			macro.val(macro.val().slice(0, -4));
			macro.val(macro.val() + 'Pain Level with Rest:');
		}
		if(macro.val().substr(macro.length - 4) === 'pla'){
			macro.val(macro.val().slice(0, -4));
			macro.val(macro.val() + 'Pain Level with Activity:');
		}
		if(macro.val().substr(macro.length - 3) === 'dp'){
			macro.val(macro.val().slice(0, -3));
			macro.val(macro.val() + 'Describe the pain:');
		}
		if(macro.val().substr(macro.length - 3) === 'nn'){
			macro.val(macro.val().slice(0, -3));
			macro.val(macro.val() + 'Neurogenic or Neuropathic Pain:');
		}
	});

});