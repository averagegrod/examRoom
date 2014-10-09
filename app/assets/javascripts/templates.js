$(".templates").ready(function() {
	
	var clip = new ZeroClipboard($("#copy-button"));
	
	

	clip.on( "copy", function(event){
		//var w = window.open();
		var clipboard = event.clipboardData;
		var text = '';
		$('form p').children().each(function(){
			if($(this).is('label')){
				text += $(this).text() +': ';
			}else if($(this).is('input')){
				text += $(this).val() + '\n';
			}
		});
		clipboard.setData( "text/plain", text);
		//w.document.write(text);
	});
	/*$('#copy-button').click(function(){
		//var w = window.open();
		var clip = new ZeroClipboard($("#copy-button"));
		var clipboard = event.clipboardData;
		var text = '';
		$('form p').children().each(function(){
			if($(this).is('label')){
				text += $(this).text() +': ';
			}else if($(this).is('input')){
				text += $(this).val() + '<br />';
			}
		});
		clipboard.setData( "text/plain", text);
		//w.document.write(text);
	});*/

	$('input').blur(function(){
		if($(this).val() === 'n'){
			$(this).val('No ').focus();
		}
		if($(this).val() === 'y'){
			$(this).val('Yes ').focus();
		}
	});
});