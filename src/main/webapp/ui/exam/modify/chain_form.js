var arrow = [];

jQuery(document).ready(function(){
	$('#wrap').css('line-height','40px');
	$('#wrap').addClass('voca_test_wrap');
	$('#wrap').css({padding: '0px'});
	$('#note').css({marginTop: '0px'});

	$.ajax({
		type : "POST",
		url : "/exam/getChain.do",
		data:{
			id:$("#chain_id").val()
		},
		success:function(data){
			color_set = data.color_set;
			modifier_set = data.modifier_set;
			contents = data.contents;
			createExam(data.contents);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
});

function createExam(note)
{
	//note = note.replace(/\(/gi, ""); 
	//note = note.replace(/\)/gi, ""); 
	//note = note.replace(/\[/gi, ""); 
	//note = note.replace(/\]/gi, ""); 
	
	var note_all = note.split('\n');
	var span_num=0;
	var line_num=0;
	
	var t = '';
	for(var each_row in note_all){
		if(note_all[each_row]=='' || note_all[each_row]==' '){
			continue;
		}
		
		var row_num = parseInt(each_row)+1;
		row_num = ++line_num;
		t+= '<span id="line_number'+row_num+'" class="line_number">'+row_num+'. </span>';
		var each_line = note_all[each_row].trim().split(' ');
		for(var each_note in each_line){
			t += '<span id="w'+span_num+'" class="">'+each_line[each_note]+' </span>';
			span_num++;
		}
		if(each_row != note_all.length-1){
			t += '<br />';
		}
	}
	$('#note').html(t);
	
	create_rst();
	
	initEvent();
}

function create_rst()
{
	
	if(!color_set) color_set = "{}";
	color_set = JSON.parse(color_set);
	//우선 세팅을 해준다.
	for(var each_color in color_set){
        var pos = color_set[each_color].split(',');
        for(var each_pos in pos){
            $('#w'+pos[each_pos]).addClass(each_color);
        }
    }
	if(!modifier_set) modifier_set = "{}";
	arrow = eval('('+modifier_set+')');


    for(var each_line in arrow){
        if(arrow[each_line] == -2){
            continue;
        }
        var note_offset = $('#note').offset();
        var t1 = $('#w'+each_line).offset();
        t1.left -= note_offset.left;
        t1.top -= note_offset.top;
        t1.top += $('#note').scrollTop();
        var t1_w = $('#w'+each_line).width()/2;

        if(arrow[each_line] == -1){
            $('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
            $('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-15, {color:"#D60004", stroke:2, zindex:1001});
            $('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-5, {color:"#D60004", stroke:2, zindex:1001});
            continue;
        }else if(arrow[each_line] == -3){
            $('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
            $('#note').line(t1.left+t1_w+5, t1.top-15, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
            $('#note').line(t1.left+t1_w+5, t1.top-5, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
            continue;
        }

        var t2 = $('#w'+rst_arrow[each_line]).offset();

        t2.left -= note_offset.left;
        t2.top -= note_offset.top;
        t2.top += $('#note').scrollTop();
        var t2_w = parseInt($('#w'+rst_arrow[each_line]).width()/2);


        $('#note').line(t1.left+t1_w, t1.top, t1.left+t1_w, t1.top-10, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });
        $('#note').line(t1.left+t1_w, t1.top-10, t2.left+t2_w, t2.top-10, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });
        $('#note').line(t2.left+t2_w, t2.top-10, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });

        $('#note').line(t2.left+t2_w-5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });
        $('#note').line(t2.left+t2_w+5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });
    }	
}

var s_pos, e_pos, orgin_txt;
function initEvent()
{
	$('#btnMainNext').on('click', function(){
		submit_form();
	});
	
	$('#note').mouseup(function(e){
		var txt = '';
		var range;
		txt = document.getSelection();
		range = txt.getRangeAt(0);

		if(txt.type != 'Range'){
			$('#control').hide();
			return;
		}

		if($(range.startContainer.parentNode).hasClass('line_number')){
			s_pos = $(range.startContainer.parentNode).next().attr('id').replace('w','');
		}else{
			s_pos = $(range.startContainer.parentNode).attr('id').replace('w','');
		}

		if($('#w'+s_pos).text().length-1 == range.startOffset){
			s_pos++;
		}
		e_pos = $(range.endContainer.parentNode).attr('id').replace('w','');

		s_pos = parseInt(s_pos);
		e_pos = parseInt(e_pos);

		orgin_txt='';
		for(var i=s_pos;i<=e_pos;i++){
			orgin_txt += $('#w'+i).text();
		}

		var note_offset = $('#note').offset();
		var s_pos_offset = $('#w'+s_pos).offset();
		var e_pos_offset = $('#w'+e_pos).offset();
	
		if(s_pos_offset.top<500){
			$('#control').css({top: s_pos_offset.top - note_offset.top + 80});
		}else{
			$('#control').css({top: s_pos_offset.top - note_offset.top - 40});
		}
		
		var control_left = 0;
		if(e_pos_offset.left>($('#control').width()+50)){
			//$('#control').css({left: e_pos_offset.left - note_offset.left - $('#control').width() + 50});
			control_left = e_pos_offset.left - note_offset.left - $('#control').width() + 50;
		}else{
			//$('#control').css({left: s_pos_offset.left - note_offset.left + 40});
			control_left = s_pos_offset.left - note_offset.left + 40;
		}
		
		if(control_left < 0){
			control_left = 0;
		}
		$('#control').css({left: control_left});

		if(s_pos == e_pos){
			$('#word_sel').hide();
			$('#one_word_sel').show();
		}else{
			$('#word_sel').show();
			$('#one_word_sel').hide();
		}
		for(var each_arrow in arrow){
			var center_pos = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			if(parseInt(each_arrow) == center_pos && parseInt(arrow[each_arrow]) >= 0){
				$('#unlink').show();
				break;
			}else{
				$('#unlink').hide();
			}
		}
		$('#control').show();
	});
	
	//사이즈조절이나 창 크기 달라질때 화살표 갱신
	$( window ).resize(function() {
		$('#note div').remove();
		for(var each_line in arrow){
			if(arrow[each_line] == -2){
				continue;
			}
			var note_offset = $('#note').offset();

			var t1 = $('#w'+each_line).offset();
			t1.left -= note_offset.left;
			t1.top -= note_offset.top;
			t1.top += $('#note').scrollTop();

			var t1_w = parseInt($('#w'+each_line).width()/2);

			if(arrow[each_line] == -1){
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-15, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-5, {color:"#D60004", stroke:2, zindex:10});
				continue;
			}else if(arrow[each_line] == -3){
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w+5, t1.top-15, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w+5, t1.top-5, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				continue;
			}

			var t2 = $('#w'+arrow[each_line]).offset();
			t2.left -= note_offset.left;
			t2.top -= note_offset.top;
			t2.top +=$('#note').scrollTop();
		
			var t2_w = parseInt($('#w'+arrow[each_line]).width()/2);
		
			$('#note').line(t1.left+t1_w, t1.top, t1.left+t1_w, t1.top-10, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			
			$('#note').line(t1.left+t1_w, t1.top-10, t2.left+t2_w, t2.top-10, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w, t2.top-10, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
		
			$('#note').line(t2.left+t2_w-5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w+5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});

			$('#control .'+each_line).remove();
		}
	});
	
	$('#control').on('click','input',function(){
		if($(this).val() == '()'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();

			if(start_t.indexOf('(') == -1 && end_t.indexOf(')') == -1){//추가
				if(start_t.indexOf('[')>-1){
					$('#w'+s_pos).text(addStrFront(start_t,'[','('));
				}else{
					$('#w'+s_pos).text('('+start_t);
				}
				if(end_t.indexOf(']')>-1){
					$('#w'+e_pos).text(addStrEnd(end_t,']',')'));
				}else{
					$('#w'+e_pos).text(end_t.replace(' ',') '));
				}
			}else if(start_t.indexOf('(') > -1 && end_t.indexOf(')') > -1){//삭제
				$('#w'+s_pos).text(start_t.replace('(',''));
				$('#w'+e_pos).text(end_t.replace(')',''));
			}else if(start_t.indexOf('(') > -1 && end_t.indexOf(')') == -1){//추가
				if(start_t.indexOf('[')>-1){
					$('#w'+s_pos).text(addStrFront(start_t,'[','('));
				}else{
					$('#w'+s_pos).text('('+start_t);
				}
				if(end_t.indexOf(']')>-1){
					$('#w'+e_pos).text(addStrEnd(end_t,']',')'));
				}else{
					$('#w'+e_pos).text(end_t.replace(' ',') '));
				}
			}else if(start_t.indexOf('(') == -1 && end_t.indexOf(')') > -1){//추가
				if(start_t.indexOf('[')>-1){
					$('#w'+s_pos).text(addStrFront(start_t,'[','('));
				}else{
					$('#w'+s_pos).text('('+start_t);
				}
				if(end_t.indexOf(']')>-1){
					$('#w'+e_pos).text(addStrEnd(end_t,']',')'));
				}else{
					$('#w'+e_pos).text(end_t.replace(' ',') '));
				}
			}
		}else if($(this).val() == '[]'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			if(start_t.indexOf('[') == -1 && end_t.indexOf(']') == -1){//추가
				$('#w'+s_pos).text('['+start_t);
				$('#w'+e_pos).text(end_t.replace(' ','] '));
			}else if(start_t.indexOf('[') > -1 && end_t.indexOf(']') > -1){//삭제
				$('#w'+s_pos).text(start_t.replace('[',''));
				$('#w'+e_pos).text(end_t.replace(']',''));
			}else if(start_t.indexOf('[') > -1 && end_t.indexOf(']') == -1){//추가
				$('#w'+s_pos).text('['+start_t);
				$('#w'+e_pos).text(end_t.replace(' ','] '));
			}else if(start_t.indexOf('[') == -1 && end_t.indexOf(']') > -1){//추가
				$('#w'+s_pos).text('['+start_t);
				$('#w'+e_pos).text(end_t.replace(' ','] '));
			}
		}else if($(this).val() == '주어'){
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('green')){
					$('#w'+i).removeClass('green');
				}else{
					resetColor('#w'+i,true);
					$('#w'+i).addClass('green');
				}
			}
		}else if($(this).val() == '동사'){
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('yellow')){
					$('#w'+i).removeClass('yellow');
				}else{
					resetColor('#w'+i,true);
					$('#w'+i).addClass('yellow');
				}
			}
		}else if($(this).val() == '후치수식'){
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('antiquewhite')){
					$('#w'+i).removeClass('antiquewhite');
				}else{
					resetColor('#w'+i,true);
					$('#w'+i).addClass('antiquewhite');
				}
			}
		}else if($(this).val() == '←'){
			//-1값 지정
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			if($('#w'+center_class).hasClass('cornflowerblue')){
				arrow[center_class]=-2;
			}else{
				arrow[center_class]=-1;
			}
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('cornflowerblue')){
					$('#w'+i).removeClass('cornflowerblue');
				}else{
					resetColor('#w'+i,false);
					$('#w'+i).addClass('cornflowerblue');
				}
			}
		}else if($(this).val() == ' ←'){
			//-3값 지정
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			if($('#w'+center_class).hasClass('hotpink')){
				arrow[center_class]=-2;
			}else{
				arrow[center_class]=-1;
			}
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('hotpink')){
					$('#w'+i).removeClass('hotpink');
				}else{
					resetColor('#w'+i,false);
					$('#w'+i).addClass('hotpink');
				}
			}
		}else if($(this).val() == '  ←'){
			//-3값 지정
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			if($('#w'+center_class).hasClass('coral')){
				arrow[center_class]=-2;
			}else{
				arrow[center_class]=-1;
			}
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('coral')){
					$('#w'+i).removeClass('coral');
				}else{
					resetColor('#w'+i,false);
					$('#w'+i).addClass('coral');
				}
			}
		}else if($(this).val() == '( 추가'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			$('#w'+s_pos).text('('+start_t);
		}else if($(this).val() == '( 제거'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			$('#w'+s_pos).text(start_t.replace('(',''));
		}else if($(this).val() == ') 추가'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			$('#w'+e_pos).text(end_t.replace(' ',') '));
		}else if($(this).val() == ') 제거'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			$('#w'+e_pos).text(end_t.replace(')',''));
		}else if($(this).val() == '[ 추가'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			$('#w'+s_pos).text('['+start_t);
		}else if($(this).val() == '[ 제거'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			$('#w'+s_pos).text(start_t.replace('[',''));
		}else if($(this).val() == '] 추가'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			$('#w'+e_pos).text(end_t.replace(' ','] '));
		}else if($(this).val() == '] 제거'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			$('#w'+e_pos).text(end_t.replace(']',''));
		}else if($(this).val() == '수식어 추가'){
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			$('#control').append('<input type="button" style="width:150px;overflow:hidden;text-overflow:ellipsis;" class="'+center_class+'" value="'+orgin_txt+'수식">');
			arrow[center_class]=-2;
			for(var i=s_pos;i<=e_pos;i++){
				resetColor('#w'+i,false);
				$('#w'+i).addClass('yellow');
			}
		}else if($(this).val().indexOf("수식") > 0){
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			arrow[$(this).attr('class')]=center_class;
			for(var i=s_pos;i<=e_pos;i++){
				resetColor('#w'+i,false);
				$('#w'+i).addClass('green');
			}
		}else if($(this).val() == "연결 끊기"){
			var center_pos = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			var del_arrow_pos=0;
			for(var each_arrow in arrow){
				if(parseInt(each_arrow) == center_pos && parseInt(arrow[each_arrow]) >= 0){
					//시작부분 색 제거
					for(var i=s_pos;i<=e_pos;i++){
						resetColor('#w'+i);
					}
					//도착부분 색 제거
					var end_words = parseInt(arrow[each_arrow]);
					$('#w'+end_words).removeClass('green');
					for(var p=end_words-1;p>=0;p--){
						if($('#w'+p).hasClass('green')){
							resetColor('#w'+p);
						}else{
							break;
						}
					}
					for(var p=end_words+1;p<=999999;p++){
						if($('#w'+p).hasClass('green')){
							resetColor('#w'+p);
						}else{
							break;
						}
					}
					del_arrow_pos = each_arrow;
					break;
				}
			}
			delete arrow[center_pos];
		}else{
			for(var i=s_pos;i<=e_pos;i++){
				resetColor('#w'+i,false);
				$('#w'+i).addClass($(this).val());
			}
		}

		$('#control').hide();
		$('#note div').remove();
		for(var each_line in arrow){
			if(arrow[each_line] == -2){
				continue;
			}
			var note_offset = $('#note').offset();
			var t1 = $('#w'+each_line).offset();
			t1.left -= note_offset.left;
			t1.top -= note_offset.top;
			t1.top += $('#note').scrollTop();

			var t1_w = parseInt($('#w'+each_line).width()/2);

			if(arrow[each_line] == -1){
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-15, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-5, {color:"#D60004", stroke:2, zindex:10});
				continue;
			}else if(arrow[each_line] == -3){
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w+5, t1.top-15, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w+5, t1.top-5, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				continue;
			}

			var t2 = $('#w'+arrow[each_line]).offset();
			t2.left -= note_offset.left;
			t2.top -= note_offset.top;
			t2.top +=$('#note').scrollTop();

			var t2_w = parseInt($('#w'+arrow[each_line]).width()/2);

			$('#note').line(t1.left+t1_w, t1.top, t1.left+t1_w, t1.top-10, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t1.left+t1_w, t1.top-10, t2.left+t2_w, t2.top-10, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w, t2.top-10, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w-5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w+5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#control .'+each_line).remove();
		}

		localStorage.setItem("control_history_10", localStorage.getItem("control_history_9"));
		localStorage.setItem("control_history_9", localStorage.getItem("control_history_8"));
		localStorage.setItem("control_history_8", localStorage.getItem("control_history_7"));
		localStorage.setItem("control_history_7", localStorage.getItem("control_history_6"));
		localStorage.setItem("control_history_6", localStorage.getItem("control_history_5"));
		localStorage.setItem("control_history_5", localStorage.getItem("control_history_4"));
		localStorage.setItem("control_history_4", localStorage.getItem("control_history_3"));
		localStorage.setItem("control_history_3", localStorage.getItem("control_history_2"));
		localStorage.setItem("control_history_2", localStorage.getItem("control_history_1"));
		localStorage.setItem("control_history_1", JSON.stringify({'control':$(this).val(),'s_pos':s_pos,'e_pos':e_pos,'origin_txt':orgin_txt,'prev_class':$(this).attr('class')}));
	});	
	
	$('#rollback').click(function (){
		var target = localStorage.getItem("control_history_1");
		if(target == ''){
			alert('작업 내역이 없습니다.');
			return;
		}
		target = JSON.parse(target);
		var s_pos = target.s_pos;
		var e_pos = target.e_pos;
		var origin_txt = target.origin_txt;
		var prev_class = target.prev_class;

		localStorage.setItem("control_history_1", localStorage.getItem("control_history_2"));
		localStorage.setItem("control_history_2", localStorage.getItem("control_history_3"));
		localStorage.setItem("control_history_3", localStorage.getItem("control_history_4"));
		localStorage.setItem("control_history_4", localStorage.getItem("control_history_5"));
		localStorage.setItem("control_history_5", localStorage.getItem("control_history_6"));
		localStorage.setItem("control_history_6", localStorage.getItem("control_history_7"));
		localStorage.setItem("control_history_7", localStorage.getItem("control_history_8"));
		localStorage.setItem("control_history_8", localStorage.getItem("control_history_9"));
		localStorage.setItem("control_history_9", localStorage.getItem("control_history_10"));
		localStorage.setItem("control_history_10", '');

		if(target.control == '()'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			if(start_t.indexOf('(') == -1 && end_t.indexOf(')') == -1){//추가
				if(start_t.indexOf('[')>-1){
					$('#w'+s_pos).text(addStrFront(start_t,'[','('));
				}else{
					$('#w'+s_pos).text('('+start_t);
				}
				if(end_t.indexOf(']')>-1){
					$('#w'+e_pos).text(addStrEnd(end_t,']',')'));
				}else{
					$('#w'+e_pos).text(end_t.replace(' ',') '));
				}
			}else if(start_t.indexOf('(') > -1 && end_t.indexOf(')') > -1){//삭제
				$('#w'+s_pos).text(start_t.replace('(',''));
				$('#w'+e_pos).text(end_t.replace(')',''));
			}else if(start_t.indexOf('(') > -1 && end_t.indexOf(')') == -1){//추가
				if(start_t.indexOf('[')>-1){
					$('#w'+s_pos).text(addStrFront(start_t,'[','('));
				}else{
					$('#w'+s_pos).text('('+start_t);
				}
				if(end_t.indexOf(']')>-1){
					$('#w'+e_pos).text(addStrEnd(end_t,']',')'));
				}else{
					$('#w'+e_pos).text(end_t.replace(' ',') '));
				}
			}else if(start_t.indexOf('(') == -1 && end_t.indexOf(')') > -1){//추가
				if(start_t.indexOf('[')>-1){
					$('#w'+s_pos).text(addStrFront(start_t,'[','('));
				}else{
					$('#w'+s_pos).text('('+start_t);
				}
				if(end_t.indexOf(']')>-1){
					$('#w'+e_pos).text(addStrEnd(end_t,']',')'));
				}else{
					$('#w'+e_pos).text(end_t.replace(' ',') '));
				}
			}
		}else if(target.control == '[]'){
			var start_t = $('#w'+s_pos).text();
			var end_t = $('#w'+e_pos).text();
			if(start_t.indexOf('[') == -1 && end_t.indexOf(']') == -1){//추가
				$('#w'+s_pos).text('['+start_t);
				$('#w'+e_pos).text(end_t.replace(' ','] '));
			}else if(start_t.indexOf('[') > -1 && end_t.indexOf(']') > -1){//삭제
				$('#w'+s_pos).text(start_t.replace('[',''));
				$('#w'+e_pos).text(end_t.replace(']',''));
			}else if(start_t.indexOf('[') > -1 && end_t.indexOf(']') == -1){//추가
				$('#w'+s_pos).text('['+start_t);
				$('#w'+e_pos).text(end_t.replace(' ','] '));
			}else if(start_t.indexOf('[') == -1 && end_t.indexOf(']') > -1){//추가
				$('#w'+s_pos).text('['+start_t);
				$('#w'+e_pos).text(end_t.replace(' ','] '));
			}
		}else if(target.control == '주어'){
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('green')){
					$('#w'+i).removeClass('green');
				}else{
					resetColor('#w'+i,true);
					$('#w'+i).addClass('green');
				}
			}
		}else if(target.control == '동사'){
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('yellow')){
					$('#w'+i).removeClass('yellow');
				}else{
					resetColor('#w'+i,true);
					$('#w'+i).addClass('yellow');
				}
			}
		}else if(target.control == '후치수식'){
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('antiquewhite')){
					$('#w'+i).removeClass('antiquewhite');
				}else{
					resetColor('#w'+i,true);
					$('#w'+i).addClass('antiquewhite');
				}
			}
		}else if(target.control == '←'){
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			if($('#w'+center_class).hasClass('cornflowerblue')){
				arrow[center_class]=-2;
			}else{
				arrow[center_class]=-1;
			}
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('cornflowerblue')){
					$('#w'+i).removeClass('cornflowerblue');
				}else{
					resetColor('#w'+i,false);
					$('#w'+i).addClass('cornflowerblue');
				}
			}
		}else if(target.control == ' ←'){
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			if($('#w'+center_class).hasClass('hotpink')){
				arrow[center_class]=-2;
			}else{
				arrow[center_class]=-1;
			}
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('hotpink')){
					$('#w'+i).removeClass('hotpink');
				}else{
					resetColor('#w'+i,false);
					$('#w'+i).addClass('hotpink');
				}
			}
		}else if(target.control == '  ←'){
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			if($('#w'+center_class).hasClass('hotpink')){
				arrow[center_class]=-2;
			}else{
				arrow[center_class]=-1;
			}
			for(var i=s_pos;i<=e_pos;i++){
				if($('#w'+i).hasClass('hotpink')){
					$('#w'+i).removeClass('hotpink');
				}else{
					resetColor('#w'+i,false);
					$('#w'+i).addClass('hotpink');
				}
			}
		}else if(target.control == '수식어 추가'){
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			$('#control .'+center_class).remove();

			arrow[center_class]=-2;

			for(var i=s_pos;i<=e_pos;i++){
				$('#w'+i).removeClass('yellow');

			}

		}else if(target.control.indexOf("수식") > 0){
			var center_class = parseInt(s_pos)+parseInt((e_pos-s_pos)/2);
			$('#control').append('<input type="button" class="'+prev_class+'" value="'+target.control+'">');
			arrow[prev_class]=-2;
			for(var i=s_pos;i<=e_pos;i++){
				$('#w'+i).removeClass('green');
			}
		}else{
			for(var i=s_pos;i<=e_pos;i++){
				resetColor('#w'+i,true);
				$('#w'+i).addClass(target.control);
			}
		}


		$('#control').hide();

		$('#note div').remove();
		for(var each_line in arrow){
			if(arrow[each_line] == -2){
				continue;
			}
			var note_offset = $('#note').offset();
	
	
			var t1 = $('#w'+each_line).offset();
			t1.left -= note_offset.left;
			t1.top -= note_offset.top;
			t1.top += $('#note').scrollTop();
			var t1_w = parseInt($('#w'+each_line).width()/2);
	
	
			if(arrow[each_line] == -1){
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-15, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-5, {color:"#D60004", stroke:2, zindex:10});
				continue;
			}else if(arrow[each_line] == -3){
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w+5, t1.top-15, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w+5, t1.top-5, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				continue;
			}
	
			var t2 = $('#w'+arrow[each_line]).offset();
			t2.left -= note_offset.left;
			t2.top -= note_offset.top;
			var t2_w = parseInt($('#w'+arrow[each_line]).width()/2);
	
			$('#note').line(t1.left+t1_w, t1.top, t1.left+t1_w, t1.top-10, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t1.left+t1_w, t1.top-10, t2.left+t2_w, t2.top-10, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w, t2.top-10, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
	
			$('#note').line(t2.left+t2_w-5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w+5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
	
	
			$('#control .'+each_line).remove();
		}
	});	
}


//대괄호있는 상황에서 소괄호 들어왔을 떄 앞부분에 처리
function addStrFront(fulltext,str,addStr){
	var returnStr = '';
	for(var pos in fulltext){
		
		returnStr += fulltext[pos];
		if(fulltext.lastIndexOf(str)==pos){
			returnStr+=addStr;
		}
	}
	return returnStr;
}
//대괄호있는 상황에서 소괄호 들어왔을 떄 뒷부분에 처리
function addStrEnd(fulltext,str,addStr){
	var returnStr = '';
	for(var pos in fulltext){
		
		if(fulltext.indexOf(str)==pos){
			returnStr+=addStr;
		}
		returnStr += fulltext[pos];
		
	}
	return returnStr;
}

function htmlEncode(value){
	return $('<div/>').text(value).html();
}

function htmlDecode(value){
	return $('<div/>').html(value).text();
}

function htmlEscape(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function resetColor(target,resetArrow){
	//색상 초기화
	$(target).removeClass('green');
	$(target).removeClass('yellow');
	$(target).removeClass('antiquewhite');
	$(target).removeClass('cornflowerblue');
	$(target).removeClass('hotpink');
	$(target).removeClass('coral');
	
	if(resetArrow){
		var target_id = $(target).prop('id').replace('w','');
		if(arrow[target_id] == -1 || arrow[target_id] == -3){
			arrow[target_id]=-2;

		}
	}
}

//대괄호있는 상황에서 소괄호 들어왔을 떄 앞부분에 처리
function addStrFront(fulltext,str,addStr){
	var returnStr = '';
	for(var pos in fulltext){
		
		returnStr += fulltext[pos];
		if(fulltext.lastIndexOf(str)==pos){
			returnStr+=addStr;
		}
	}
	return returnStr;
}
//대괄호있는 상황에서 소괄호 들어왔을 떄 뒷부분에 처리
function addStrEnd(fulltext,str,addStr){
	var returnStr = '';
	for(var pos in fulltext){
		
		if(fulltext.indexOf(str)==pos){
			returnStr+=addStr;
		}
		returnStr += fulltext[pos];
		
	}
	return returnStr;
}

function submit_form()
{
	//색상값 추출
	var array_green = Array();
	var array_yellow = Array();
	var array_cornflowerblue = Array();
	var array_antiquewhite = Array();
	var array_hotpink = Array();
	var array_coral = Array();

	for(var i=0;i<=$('#note span').length;i++){
		if($('#w'+i).hasClass('green')){
			array_green.push(i);
		}
		if($('#w'+i).hasClass('yellow')){
			array_yellow.push(i);
		}
		if($('#w'+i).hasClass('cornflowerblue')){
			array_cornflowerblue.push(i);
		}
		if($('#w'+i).hasClass('antiquewhite')){
			array_antiquewhite.push(i);
		}
		if($('#w'+i).hasClass('hotpink')){
			array_hotpink.push(i);
		}
		if($('#w'+i).hasClass('coral')){
			array_coral.push(i);
		}
	}

	var objColor = Object();
	if(array_green.length > 0)
	{
		objColor.green = array_green.join(",");
	}
	if(array_yellow.length > 0)
	{
		objColor.yellow = array_yellow.join(",");
	}
	if(array_cornflowerblue.length > 0)
	{
		objColor.cornflowerblue = array_cornflowerblue.join(",");
	}
	if(array_antiquewhite.length > 0)
	{
		objColor.antiquewhite = array_antiquewhite.join(",");
	}
	if(array_hotpink.length > 0)
	{
		objColor.hotpink = array_hotpink.join(",");
	}
	if(array_coral.length > 0)
	{
		objColor.coral = array_coral.join(",");
	}
	
	var color_set = JSON.stringify(objColor);
	var modifier_set = JSON.stringify(arrow);
	modifier_set = modifier_set.replace(/\"/g,'');
	
	$.ajax({
		type : "POST",
		url : "/exam/updateChainAnswer.do",
		data:{
			id:$("#chain_id").val(),
			modifier_set:modifier_set,
			color_set:color_set
		},
		success:function(data){
			alert("수정하였습니다.");
			self.close();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}