$(document).ready(function(e){
	//$('body').css({background: '#f5f5f5'});
	
	//document.oncontextmenu = new Function('return false');
	
	function noCTRL(e)
	{
		var msg = "Ctrl + C / Ctrl + V키를 금지합니다 ";
		
		
			if (event.ctrlKey && event.keyCode==86) //CTRL+V
			{
				alert(msg);
				event.keyCode = 0;
				window.event.returnValue = false;
			}
			else if (event.ctrlKey && event.keyCode==67) //CTRL+C (Copy)
			{
				alert(msg);
				event.keyCode = 0;
				window.event.returnValue = false;
			}
		
		
	} 
	//document.onkeydown = noCTRL;
	//document.onmousedown = noCTRL;
	
	document.onkeydown = function(){
		if(event.keyCode > 111 && event.keyCode<124){
			event.keyCode = 505;
		}
		if(event.keyCode == 505){
			return false;
		}
			
	}
	var header = $("<div>", {id: 'header'}).prependTo('#main_wrap').css({background: '#9c2525'});
	var logo = $("<div>", {'class': 'logo'}).appendTo(header);
	var h1 = $("<h1>")
	.css({fontSize: "20px", margin: "0px", padding: "0px", color: "#ddd", fontWeight: "", position: "absolute", top: "30px", left: "35px"})
	.html("USHER")
	.appendTo(logo);
	
	var title1 = $('#p_title').val();
	var h2 = $("<h2>")
	.css({fontSize: "18px", margin: "0px", padding: "0px", color: "#fff", fontWeight: "bold", position: "absolute", top: "30px", left: "100px"})
	.html(title1)
	.appendTo(logo);
	
	var hmenu = $("<div>", {"class": 'hmenu'}).appendTo(header)
	var ul = $("<ul>").appendTo(hmenu);
	
	var menu_list = 
		[{src: '/img/titleBtnNext.gif', alt: 'NEXT', id: 'btnMainNext', display: 'block'},
	     {src: '/img/titleBtnVolHelp.gif', alt: 'REVIEW', id: 'btnMainReview', display: 'block'},
	     {src: '/fs/image/common/hm_1.png', alt: 'VIEW TEXT', id: 'btnMainViewText', display: 'none'}];
	
	for(i=0;i<menu_list.length;i++){
		var li = $('<li>').appendTo(ul);
		var img = $('<img>', {id: menu_list[i].id}).attr({src : menu_list[i].src})
		.css({cursor: 'pointer', display: menu_list[i].display}).appendTo(li);
		
	}
	
	/*var div1 = $('<div>').css({margin: "0 auto", width: "300px", textAlign: "center", height: "80px", paddingTop: "3px"}).appendTo(header);
	var div1_1 = $('<div>').css({marginTop: '1px'}).appendTo(div1); 
	var input1 = $("<input type='button' class='btn_time'>").on('click', function(e){
		if($(this).val() == "SHOW TIME"){
		    $(this).parent().next().show();
	        $(this).val("HIDE TIME")
	    }
		else{
	        $(this).parent().next().hide();
	        $(this).val("SHOW TIME")
	    }
	}).val("HIDE TIME").appendTo(div1_1);
	var p1 = $('<p>', {'id': 'headTimer'}).css({color:'#fff',fontSize: '18px'}).html("30:00").appendTo(div1);
	var p2 = $('<p>', {id: 'mainQNum'}).css({color:'#fff',fontSize: '18px'}).html("question").appendTo(div1);*/
	
	var player_container = $('<div>', {id: 'asher_player'}).appendTo('#main_wrap');
});
