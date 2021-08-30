var audio;
function setNewFontSize(size){
	if(size == '1'){
		$('#wrap').css({fontSize: '14px'});
	}
	else if(size == '2'){
		$('#wrap').css({fontSize: '16px'});
	}
	else if(size == '3'){
		$('#wrap').css({fontSize: '18px'});
	}
	else{
		$('#wrap').css({fontSize: '20px'});
	}
} 

$(document).ready(function(e){
	//$('body').css({background: '#f5f5f5'});
	$('body').on('contextmenu', function(e){
		//return false;
	})
	$('#main_wrap').css({width: '1920px', margin: "0 auto"});
	var header = $("<div>", {id: 'header'}).css({height: 'auto'}).prependTo('#main_wrap');
	var chk = $("<div>", {'class': 'chk'}).appendTo(header);
	
	function putChkClick(obj){
		obj.on('click', function(){
			obj.find('img').each(function(){
				if($(this).hasClass("off")){
					$(this).removeClass('off');
					$(this).addClass('on');
				}
				else{
					$(this).removeClass('on');
					$(this).addClass('off');
				}
				if($(this).hasClass('on')){
					if($(this).attr('flag') == 'on'){
						$(this).parent().attr({flag: 'on'});
					}
					else{
						$(this).parent().attr({flag: 'off'});
					}
				}
			});
			var flag = false;
			$('.chk_box_btn').each(function(){
				if($(this).attr('flag')=='on'){
					flag = true;
				}
			});
			if(!flag){
				alert("모든 체크박스를 해제할수 없습니다.")
				obj.attr({flag: 'on'});
				obj.find('img').each(function(){
					if($(this).hasClass("off")){
						$(this).removeClass('off');
						$(this).addClass('on');
					}
					else{
						$(this).removeClass('on');
						$(this).addClass('off');
					}
				});
			}
		});
		
	}
	
	
	var a1 = $('<a>', {'class': 'chk_box_btn', 'id': 'question_btn'}).attr({flag: 'on'}).appendTo(chk);
	var a1_img1 = $('<img>', {'class': 'off'}).attr({src: '/fs/image/class/teacher/chk.png', alt: '', flag: 'off'}).appendTo(a1);
	var a1_img2 = $('<img>', {'class': 'on'}).attr({src: '/fs/image/class/teacher/nhk.png', alt: '', flag: 'on'}).appendTo(a1);
	var span1 = $('<span>', {id: 'question_btn_text'}).html("문제보기").appendTo(chk);
	putChkClick(a1);
	
	var a2 = $('<a>', {'class': 'chk_box_btn', 'id': 'text_btn'}).attr({flag: 'off'}).appendTo(chk);
	var a2_img1 = $('<img>', {'class': 'on'}).attr({src: '/fs/image/class/teacher/chk.png', alt: '', flag: 'off'}).appendTo(a2);
	var a2_img2 = $('<img>', {'class': 'off'}).attr({src: '/fs/image/class/teacher/nhk.png', alt: '', flag: 'on'}).appendTo(a2);
	var span2 = $('<span>', {id: 'text_btn_text'}).html("지문보기").appendTo(chk);
	putChkClick(a2);
	
	var a3 = $('<a>', {'class': 'chk_box_btn', 'id': 'script_btn'}).attr({flag: 'off'}).appendTo(chk);
	var a3_img1 = $('<img>', {'class': 'on'}).attr({src: '/fs/image/class/teacher/chk.png', alt: '', flag: 'off'}).appendTo(a3);
	var a3_img2 = $('<img>', {'class': 'off'}).attr({src: '/fs/image/class/teacher/nhk.png', alt: '', flag: 'on'}).appendTo(a3);
	var span3 = $('<span>', {id: 'script_btn_text'}).html("Script").appendTo(chk);
	putChkClick(a3);
	
	var a4 = $('<a>', {'class': 'chk_box_btn', 'id': 'reason_btn'}).attr({flag: 'off'}).appendTo(chk);
	var a4_img1 = $('<img>', {'class': 'on'}).attr({src: '/fs/image/class/teacher/chk.png', alt: '', flag: 'off'}).appendTo(a4);
	var a4_img2 = $('<img>', {'class': 'off'}).attr({src: '/fs/image/class/teacher/nhk.png', alt: '', flag: 'on'}).appendTo(a4);
	var span4 = $('<span>', {id: 'reason_btn_text'}).html("답 근거").appendTo(chk);
	putChkClick(a4);
		
	var a5 = $('<a>', {'class': 'chk_box_btn', 'id': 'tagging_btn'}).attr({flag: 'off'}).appendTo(chk);
	var a5_img1 = $('<img>', {'class': 'on'}).attr({src: '/fs/image/class/teacher/chk.png', alt: '', flag: 'off'}).appendTo(a5);
	var a5_img2 = $('<img>', {'class': 'off'}).attr({src: '/fs/image/class/teacher/nhk.png', alt: '', flag: 'on'}).appendTo(a5);
	var span5 = $('<span>', {id: 'tagging_btn_text'}).html("Tagging").appendTo(chk);
	putChkClick(a5);
	
	var a6 = $('<a>', {'class': 'chk_box_btn', 'id': 'chain_btn'}).attr({flag: 'off'}).appendTo(chk);
	var a6_img1 = $('<img>', {'class': 'on'}).attr({src: '/fs/image/class/teacher/chk.png', alt: '', flag: 'off'}).appendTo(a6);
	var a6_img2 = $('<img>', {'class': 'off'}).attr({src: '/fs/image/class/teacher/nhk.png', alt: '', flag: 'on'}).appendTo(a6);
	var span6 = $('<span>', {id: 'chain_btn_text'}).css({width: '39px'}).html("묶기").appendTo(chk);
	putChkClick(a6);
	
	var bod = $('<div>', {'class': 'bod'}).appendTo(header);
	var bod_a1 = $('<a>').appendTo(bod);
	var bod_a1_img = $('<img>').attr({src: '/fs/image/class/teacher/board_1.png'}).appendTo(bod_a1);
	var bod_a2 = $('<a>').appendTo(bod);
	var bod_a2_img = $('<img>').attr({src: '/fs/image/class/teacher/board_2.png'}).appendTo(bod_a2);
	
	var btn_box = $('<div>', {'class': 'btn_box'}).appendTo(header);
	
	var btn_box_a1 = $('<a>').appendTo(btn_box);
	var btn_box_a1_img1 = $('<img>').attr({src: '/fs/image/class/teacher/mp3.png'}).appendTo(btn_box_a1);
	
	
	var btn_box_span1 = $('<span>', {'class': 'count_txt'}).html("A").appendTo(btn_box);
	var count_input =$('<div>', {'class': 'count_input'}).appendTo(btn_box);
	var count_input1 = $("<input type='text' disabled>").val(2).appendTo(count_input);
	var cut_up = $('<a>', {'class': 'cut_up'}).css({cursor: 'pointer'}).html("&#9650;").appendTo(count_input);
	var cut_down = $('<a>', {'class': 'cut_down'}).css({cursor: 'pointer'}).html("&#9660;").appendTo(count_input);
	cut_up.on('click', function(){
		var fSize = parseInt(count_input1.val());
		if(fSize<4){
			fSize++;
			count_input1.val(fSize);
			setNewFontSize(fSize);
		}
	})
	cut_down.on('click', function(){
		var fSize = parseInt(count_input1.val());
		if(fSize>1){
			fSize--;
			count_input1.val(fSize);
			setNewFontSize(fSize);
			
		}
	})
	
	
	var timer_wig_bt1 = $('<a>', {'class': 'timer_wig_bt'}).attr({href: '#'}).appendTo(btn_box);
	var timer_wig_bt1_img = $('<img>').attr({src: '/fs/image/class/teacher/clock.png'}).appendTo(timer_wig_bt1);
	
	var timer_wig_bt2 = $('<a>', {'class': 'sound_wig_bt'}).attr({href: '#'}).appendTo(btn_box);
	var timer_wig_bt2_img = $('<img>').attr({src: '/fs/image/class/teacher/sound.png'}).appendTo(timer_wig_bt2);
	
	var timer_wig_bt3 = $('<a>', {'class': 'test_wig_bt'}).attr({href: '#'}).appendTo(btn_box);
	var timer_wig_bt3_img = $('<img>').attr({src: '/fs/image/class/teacher/test.png'}).appendTo(timer_wig_bt3);
	
	var div_student = $('<div>', {'class': 'student'}).appendTo(btn_box);
	var div_student_span = $('<span>').html($('#USER_NAME').val()).appendTo(div_student);
	var div_student_a = $('<a>').appendTo(div_student);
	var div_student_a_img = $('<img>').attr({src: '/fs/image/class/teacher/name.png'}).appendTo(div_student_a);
	
	var div_ox = $('<div>', {'class':'ox'}).appendTo(btn_box);
	var div_ox_a1 = $('<a>').html('O').appendTo(div_ox);
	var div_ox_a2 = $('<a>').html('X').appendTo(div_ox);
	
	var span_now = $('<span>', {'class': 'now'}).html("현재인원").appendTo(btn_box);
	var span_number = $('<span>', {'class': 'number'}).html("41/60").appendTo(btn_box);
	
	var div_timer = $('<div>', {'class': 'timer'}).appendTo(header);
	var div_timer_div = $('<div>').appendTo(div_timer);
	
	var div_timer_input = $('<input type="text" "id"="inputTime">').val("0").appendTo(div_timer_div);
	var div_timer_a1 = $('<a>', {'class':'s', 'id': 'timerStart'}).html("S").appendTo(div_timer_div);
	var div_timer_a2 = $('<a>', {'class':'e', 'id': 'timerEnd'}).html("E").appendTo(div_timer_div);
	var div_timer_a3 = $('<a>', {'class':'chk', 'id': 'timerChk'}).attr({flag: 'on'}).appendTo(div_timer_div);
	var div_timer_a3_img1 = $('<img>', {'class': 'on'}).attr({src: '/fs/image/class/teacher/chk.png', flag: 'on'}).appendTo(div_timer_a3);
	var div_timer_a3_img2 = $('<img>', {'class': 'off'}).attr({src: '/fs/image/class/teacher/nhk.png', flag: 'off'}).appendTo(div_timer_a3);
	
	div_timer_a3.on('click', function(){
		div_timer_a3.find('img').each(function(){
			if($(this).hasClass("off")){
				$(this).removeClass('off');
				$(this).addClass('on');
			}
			else{
				$(this).removeClass('on');
				$(this).addClass('off');
			}
			
			if($(this).hasClass('on')){
				if($(this).attr('flag') == 'on'){
					$(this).parent().attr({flag: 'on'});
				}
				else{
					$(this).parent().attr({flag: 'off'});
				}
			}
		})
	});
	var fullTimer;
	function makeDigit(number){
		if(number <10){
			number = "0"+number;
		}
		else{
			number = ""+number;
		}
		return number
	}
	function timerStartBtn(){
		$('#timerStart').on('click', function(){
				
			var myTime = parseInt(div_timer_input.val());
			if(myTime == '0'){
				return false;
			}
			$(this).off('click');
			var secTime = myTime*60;
			var maxTime = secTime;
			var startTime = 0;
			div_timer_input.attr({disabled: 'disabled'});
			if(div_timer_a3.attr('flag')=='on'){
				fullTimer = setInterval(function(){
					secTime--;
					var showTime = makeDigit(Math.floor(secTime/60))+":"+makeDigit(secTime%60);
					div_timer_input.val(showTime);
					if(secTime == myTime*60/2){
						alert("시간이 절반 경과 하였습니다.");
					}
					if(secTime<1){
						clearInterval(fullTimer);
						alert("시간이 완료되었습니다.");
						timerStartBtn();
						div_timer_input.removeAttr('disabled');
					}
				},1000);
			}
			else{
				fullTimer = setInterval(function(){
					startTime++;
					var showTime = makeDigit(Math.floor(startTime/60))+":"+makeDigit(startTime%60);
					div_timer_input.val(showTime);
					if(startTime == myTime*60/2){
						alert("시간이 절반 경과 하였습니다.");
					}
					if(startTime>maxTime){
						clearInterval(fullTimer);
						alert("시간이 완료되었습니다.");
						timerStartBtn();
						div_timer_input.removeAttr('disabled');
					}
				},1000);
			}
		});
	}
	timerStartBtn();
	$('#timerEnd').on('click', function(){
		clearInterval(fullTimer);
		div_timer_input.val(0);
		div_timer_input.removeAttr('disabled');
		timerStartBtn();
		alert("타이머가 종료되었습니다.");
	});
	var test_list = $('<div>', {'class': 'test_list'}).appendTo(header);
	var test_list_ul = $('<ul>').appendTo(test_list);
	var test_list_ul_li1 = $('<li>').html("즉시").appendTo(test_list_ul);
	test_list_ul_li1.on('click', function(){
		testJS.showJS();
	})
	var test_list_ul_li2 = $('<li>').html("별지").appendTo(test_list_ul);
	test_list_ul_li2.on('click', function(){
		testBJ.openWindow();
	});
	var test_list_ul_li3 = $('<li>').html("해석").appendTo(test_list_ul);
	test_list_ul_li3.on('click', function(){
		testHS.showHS();
	})
	
	var test_list_ul_li4 = $('<li>').html("청취").appendTo(test_list_ul);
	test_list_ul_li4.on('click', function(){
		testCC.showCC();
	});
	var test_list_ul_li5 = $('<li>').html("구문/단어").appendTo(test_list_ul);
	test_list_ul_li5.on('click', function(){
		testGD.showGD();
	});
	
	var test_list_ul_li6 = $('<li>').html("백지").appendTo(test_list_ul);
	test_list_ul_li6.on('click', function(){
		testBK.openWindow();
	});
	var test_list_ul_li7 = $('<li>').html("문장암기").appendTo(test_list_ul);
	test_list_ul_li7.on('click', function(){
		testMA.showMA();
	});
	
	var sound_wid = $('<div>', {'class': 'sound_wid'}).appendTo(header);
	var sound_wid_img = $('<img>').attr({'src': '/fs/image/class/teacher/sound_bg.jpg'}).appendTo(sound_wid);
	var sound_wid_div = $('<div>').appendTo(sound_wid);
	var sound_wid_div_a = $('<a>').appendTo(sound_wid_div);
	var sound_wid_div_a_img = $('<img>').attr({'src': '/fs/image/class/teacher/sound_btn.png'}).appendTo(sound_wid_div_a);
	
	
	var sound_wid =true;
	var time_wid =true;
	var test_wid =true;
	$(".sound_wig_bt").click(function(e){
		e.preventDefault();
		$(".test_list").hide();
		$(".timer").hide();
		time_wid =true;
		test_wid =true;
		if (sound_wid==true){
			$(".sound_wid").show();
			sound_wid=false;
		}
		else{
			$(".sound_wid").hide();
			sound_wid=true;
		}
	})
	$(".timer_wig_bt").click(function(e){
		e.preventDefault();
		$(".sound_wid").hide();
		$(".test_list").hide();
		sound_wid =true;
		test_wid =true;
		if(time_wid==true){
			$(".timer").show();
			time_wid=false;
		}
		else{
			$(".timer").hide();
			time_wid=true;
		}
	})
	$(".test_wig_bt").click(function(e){
		//alert('a')
		e.preventDefault();
		$(".timer").hide();
		$(".sound_wid").hide();
		sound_wid = true;
		time_wid = true;
		if(test_wid==true){
			$(".test_list").show();
			test_wid=false;
		}
		else{
			$(".test_list").hide();
			test_wid=true;
		}	
	})
	
	
	$('#aside').hide();
	btn_box_a1_img1.on('click', function(){
		if($('#aside').css('display')=='none'){
			$('#aside').slideDown("slow");
		}
		else{
			$('#aside').slideUp("slow");
		}
		
	});
	
	
	function onCanvasMode1(color){
		var canv = new asher_canvas();
		canv.getCanvas(color);
	}
	
	bod_a1_img.on('click', function(){
		$('#canvas_wrap').remove();
		$('#pallet').remove();
		$('#pallet2').remove();
		onCanvasMode1();
	});
	bod_a2_img.on('click', function(){
		$('#canvas_wrap').remove();
		$('#pallet').remove();
		$('#pallet2').remove();
		onCanvasMode1('white');
	});
});