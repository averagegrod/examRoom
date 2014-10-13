$(".templates").ready(function() {

	var clip = new ZeroClipboard($("#copy-button"));
	clip.on( "copy", function(event){
		//var w = window.open();
		var clipboard = event.clipboardData;
		var text = '';

		$('form p').children().each(function(){
			if($(this).is('label')){
				text += $(this).text() +' ';
			}else if($(this).is('input')){
				text += $(this).val() + '\n';
			}
		});
		var modalText = text.replace("\n", "<br />");

		clipboard.setData( "text/plain", text);
		clipboard.setData( "text/html", modalText);
		$("#myModal").html("Template Created!</br>Right click and Paste or CTRL+V to insert into HPI</br>" + modalText);

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