var asher_tagging = function(){};

asher_tagging.prototype.init = function(id, type){
	var _this = this
	this.areaId = id;
	this.type = type;
	//var txt = $('#'+id).text();
	//this.setText(txt);
	if(type != 'gr'){
		this.rcGetSelection()
	}
	
	
};
asher_tagging.prototype.setText = function(txt){
	this.txt = txt
	if(this.txt){
		this.arrTxt = txt.split(' ');
	}
	
};
asher_tagging.prototype.makeQPop = function(){
	var _this = this;
	var wOpt = {
			size: {w: 1000, h: 465},
			pos: {
				mode: false
			},
			border: '2px',
			borderColor: '#e6dfc1',
			boxRadius: '5px',
			boxBgColor: '#ffffff',
			boxBgImage: '',
			boxShadow : false,
			wrapBgColor: '#e6dfc1',
			wrapOpacity: 0.6,
			tick: 20,
			effectTerm: 0.06,
			boxId: 'oriImg',
			wrapId: 'oriImgWrap',
	
			closeBtn: {
				mode: false,
				pos: {x: 378, y: 10},
				img: '/images/main/x.png'
			},
			wrapClose: true,
			
		};
	
	var vp = shine.window.showPopup(wOpt);
	
	var question_pop_wrap = $('<div>', {'class': 'question_pop_wrap'}).appendTo(vp)
	
	var question_pop_head = $('<div>', {'class': 'question_pop_head'}).appendTo(question_pop_wrap);
	var tit = $('<p>', {'class':'tit'}).html("수업 질문사항을 정리합니다.").appendTo(question_pop_head);
	
	var question_pop_cont = $('<div>', {'class': 'question_pop_cont'}).css({backgroundColor: '#fff'}).appendTo(question_pop_wrap);
	var question_type = $('<div>', {'class': 'question_type'}).appendTo(question_pop_cont);
	
	var label_html = '<label for="q_type1">지문 <input type="checkbox" class="type-check" id="q_type1" checked value="A" /></label>&nbsp;&nbsp;';
    label_html += '<label for="q_type2">문제 <input type="checkbox" class="type-check" id="q_type2" value="B" /></label>&nbsp;&nbsp;';
    label_html += '<label for="q_type3">일반 <input type="checkbox" class="type-check" id="q_type3" value="C" /></label>';
    question_type.html(label_html);
	
    
    
    
    var type1_question_wrap = $('<div>',{'class':'question_wrap'}).appendTo(question_pop_cont);
	
	var type1_left = $('<div>', {'class': 'left'}).appendTo(type1_question_wrap);
	var type1_left_head = $('<div>', {'class': 'left_head'}).html("지문").appendTo(type1_left);
	var type1_left_text = $('<div>', {'class': 'left_text', 'id': 'type1_text'}).appendTo(type1_left);
	if(this.txt){
		type1_left_text.html(studentRc.reData);
	}
	else{
		type1_left_text.html("지문이 존재하지 않습니다.");
	}
	
	
	var type1_right = $('<div>', {'class':'right'}).appendTo(type1_question_wrap);
	var type1_right_top = $('<div>', {'class':'right_top'}).appendTo(type1_right);
	
	var type1_txt = this.selectedText;
	
	var type1_right_top_head = $('<div>', {'class': 'right_top_head'}).html("질문").appendTo(type1_right_top);
	var type1_right_top_text = $('<div>', {'class': 'right_top_text'}).html(type1_txt).appendTo(type1_right_top);
	
	var type1_right_bottom = $('<div>', {'class': 'right_bottom'}).appendTo(type1_right);
	var type1_right_bottom_head = $('<div>', {'class': 'right_bottom_head'}).appendTo(type1_right_bottom);
	var type1_right_bottom_head_span = $('<span>').html("질문").appendTo(type1_right_bottom_head);
	var type1_right_bottom_head_select = $('<select>').appendTo(type1_right_bottom_head_span);
	var type1_right_bottom_head_select_opt1 = $('<option>').val("A").html("해석").appendTo(type1_right_bottom_head_select);
	var type1_right_bottom_head_select_opt2 = $('<option>').val("B").html("문장구조").appendTo(type1_right_bottom_head_select);
	var type1_right_bottom_head_select_opt3 = $('<option>').val("C").html("답근거").appendTo(type1_right_bottom_head_select);
	var type1_right_bottom_head_select_opt4 = $('<option>').val("D").html("구문").appendTo(type1_right_bottom_head_select);

	var type1_right_bottom_text = $('<div>', {'class': 'right_bottom_text'}).appendTo(type1_right_bottom);
	var type1_student_input = $('<textarea>').css({width: '100%', height: '100%'}).appendTo(type1_right_bottom_text);
	
	if(_this.type != 'gr'){
		if (!window.x) {
		    x = {};
		}
		x.Selector = {};
		x.Selector.getSelected = function() {
		    var t = '';
		    if (window.getSelection) {
		    	t = window.getSelection();
		    }
		    else if (document.getSelection) {
		    	t = document.getSelection();
		    }
		    else if (document.selection) {
		    	t = document.selection.createRange().text;
		    }
		    return t;
		}
		type1_left_text.on('mouseup', function(){
			var mytext = x.Selector.getSelected();
			type1_right_top_text.html(mytext.toString());
		})
	}
	var type1_question_pop_btn = $('<div>', {'class':'question_pop_btn'}).appendTo(question_pop_cont);
	var type1_a1 = $('<a>', {'class': ''}).appendTo(type1_question_pop_btn);
	var type1_img1 = $('<img>').attr({src: '/fs/image/common/pop_btn_confirm.gif', alt: '확인'}).appendTo(type1_a1);
	var type1_a2 = $('<a>', {'class': ''}).appendTo(type1_question_pop_btn);
	var type1_img2 = $('<img>').attr({src: '/fs/image/common/pop_btn_cancel.gif', alt: '취소'}).appendTo(type1_a2);
	
	
	type1_img1.on('click', function(){
		if(_this.type != 'gr'){
			var param = {
					book_nm: studentRc.book_nm,
					q_idx: studentRc.q_idx,
					rc_num: studentRc.qData[studentRc.qNum].rc_num.charAt(studentRc.qData[studentRc.qNum].rc_num.length-1),
					type1: 'A',
					type2: type1_right_bottom_head_select.val(),
					stu_selected: type1_right_top_text.text(),
					stu_q: type1_student_input.val()
			}
		}
		else if(_this.type == 'gr'){
			var param = {
					type: 'gr',
					q_idx: studentGr.q_idx,
					type1: 'A',
					type2: type1_right_bottom_head_select.val(),
					stu_q: type1_student_input.val()
			}
		}
		function taggingQCallBack(_rs){
			if(_rs.error == API_SUCCESS){
				alert("질문성공");
				vp.close();
				
			}
		}
		requestApi('POST', apiList('taggingQ'), param, taggingQCallBack);

	});
	
	type1_img2.on('click', function(){
		vp.close();
	});
    
    
    
  
    
	var type2_question_wrap = $('<div>',{'class':'question_wrap'}).css({display: 'none'}).appendTo(question_pop_cont);
	
	var type2_left = $('<div>', {'class': 'left'}).appendTo(type2_question_wrap);
	var type2_left_head = $('<div>', {'class': 'left_head t_left'}).html("지문").appendTo(type2_left);
	var type2_left_text = $('<div>', {'class': 'left_text'}).appendTo(type2_left);
	var type2_p1 = $('<p>').appendTo(type2_left_text);
	if(this.txt){
		type2_p1.html(studentRc.reData);
	}
	else{
		type2_p1.html("지문이 존재하지 않습니다.");
	}
	var type2_right = $('<div>', {'class':'right'}).appendTo(type2_question_wrap);
	var type2_right_top = $('<div>', {'class':'right_top'}).appendTo(type2_right);
	
	
	
	var type2_right_top_head = $('<div>', {'class': 'right_top_head'}).html("문제").appendTo(type2_right_top);
	var type2_right_top_text = $('<div>', {'class': 'right_top_text type2'}).appendTo(type2_right_top);
	
	
	
	if(_this.type != 'gr'){
		var type2_right_top_text_q = $('<div>').html(studentRc.qData[studentRc.qNum].question).appendTo(type2_right_top_text);
		var type = studentRc.qData[studentRc.qNum].type;
		switch (type) {
		case "SUMMARY":
		case "CATERGORY CHOICE":
			
			break;
		case "INSERTION":
			
			break;
		default:
			for(var i=0;i<studentRc.qData[studentRc.qNum].exam.length;i++){
				if(studentRc.qData[studentRc.qNum].exam[i]){
					var type2_right_top_text_a1 = $('<div>').html("< "+ex_map[i+1]+" > "+studentRc.qData[studentRc.qNum].exam[i]).appendTo(type2_right_top_text);
				}
			}
			break;
		}
	}
	else if(_this.type == 'gr'){
		var type2_right_top_text_q = $('<div>').html(studentGr.qData[studentGr.qNum].question).appendTo(type2_right_top_text);
		for(var i=0;i<studentGr.qData[studentGr.qNum].exam.length;i++){
			if(studentGr.qData[studentGr.qNum].exam[i]){
				var type2_right_top_text_a1 = $('<div>').html("< "+ex_map[i+1]+" > "+studentGr.qData[studentGr.qNum].exam[i]).appendTo(type2_right_top_text);
			}
		}
	}
	
	
	var type2_right_bottom = $('<div>', {'class': 'right_bottom type2'}).appendTo(type2_right);
	var type2_table_type = $('<div>', {'class': 'table_type'}).appendTo(type2_right_bottom);
	var type2_table1 = $('<table>').appendTo(type2_table_type);
	var type2_colgroup1 = $('<colgroup>').attr({'width': '25%'}).appendTo(type2_table1);
	var type2_col1 = $('<col>').attr({width: '25%'}).appendTo(type2_colgroup1);
	var type2_col2 = $('<col>').attr({width: '25%'}).appendTo(type2_colgroup1);
	var type2_col3 = $('<col>').attr({width: '25%'}).appendTo(type2_colgroup1);
	var type2_col4 = $('<col>').attr({width: '25%'}).appendTo(type2_colgroup1);
	
	var type2_tbody = $('<tbody>').appendTo(type2_table1);
	var type2_tr1 = $('<tr>').appendTo(type2_tbody);
	var type2_tr1_th1 = $('<th>', {'class': 'none'}).html("정답").appendTo(type2_tr1);
	
	var correct_answer = "";
	if(_this.type != 'gr'){
		for(var i=0;i<studentRc.qData[studentRc.qNum].result.length;i++){
			if(studentRc.qData[studentRc.qNum].result[i]){
				if(i==0){
					correct_answer = correct_answer+studentRc.qData[studentRc.qNum].result[i];
				}
				else{
					correct_answer = ","+correct_answer+studentRc.qData[studentRc.qNum].result[i];
				}
			}
		}
	}
	else{
		correct_answer = studentGr.qData[studentGr.qNum].result;
	}
	
	var type2_tr1_td1 = $('<td>').html(correct_answer).appendTo(type2_tr1);
	var type2_tr1_th2 = $('<th>').html("선택한 답").appendTo(type2_tr1);
	var type2_tr1_td2 = $('<td>').appendTo(type2_tr1);
	
	var type2_tr2 = $('<tr>').appendTo(type2_tbody);
	var type2_tr2_th1 = $('<th>', {'class': 'none none2'}).html("헷갈린 번호").appendTo(type2_tr2);
	var type2_tr2_td1 = $('<td>', {'class': 'none none2'}).attr({'colspan': 3}).appendTo(type2_tr2);
	var type2_tr2_td1_select = $('<select>').appendTo(type2_tr2_td1);
	var type2_tr2_td1_option1 = $('<option>').val("A").html("A").appendTo(type2_tr2_td1_select);
	var type2_tr2_td1_option2 = $('<option>').val("B").html("B").appendTo(type2_tr2_td1_select);
	var type2_tr2_td1_option3 = $('<option>').val("C").html("C").appendTo(type2_tr2_td1_select);
	var type2_tr2_td1_option4 = $('<option>').val("D").html("D").appendTo(type2_tr2_td1_select);
	
	var type2_right_bottom_head = $('<div>', {'class': 'right_bottom_head'}).html("질문 내용").appendTo(type2_right_bottom);
	var type2_right_bottom_text = $('<div>', {'class': 'right_bottom_text'}).appendTo(type2_right_bottom);
	var type2_student_input = $('<textarea>').css({width: '100%', height: '100%'}).appendTo(type2_right_bottom_text);
	
	var type2_question_pop_btn = $('<div>', {'class':'question_pop_btn'}).css({display: 'none'}).appendTo(question_pop_cont);
	var type2_a1 = $('<a>', {'class': ''}).appendTo(type2_question_pop_btn);
	var type2_img1 = $('<img>').attr({src: '/fs/image/common/pop_btn_confirm.gif', alt: '확인'}).appendTo(type2_a1);
	var type2_a2 = $('<a>', {'class': ''}).appendTo(type2_question_pop_btn);
	var type2_img2 = $('<img>').attr({src: '/fs/image/common/pop_btn_cancel.gif', alt: '취소'}).appendTo(type2_a2);
	type2_img2.on('click', function(){
		vp.close();
	});
	type2_img1.on('click', function(){
		var param = {
				book_nm: studentRc.book_nm,
				q_idx: studentRc.q_idx,
				rc_num: studentRc.qData[studentRc.qNum].rc_num.charAt(studentRc.qData[studentRc.qNum].rc_num.length-1),
				type1: 'B',
				type2: type2_tr2_td1_select.val(),
				stu_q: type2_student_input.val()
		}
		function taggingQCallBack(_rs){
			if(_rs.error == API_SUCCESS){
				alert("질문성공");
				vp.close();
				
			}
		}
		requestApi('POST', apiList('taggingQ'), param, taggingQCallBack);

	});
	  // 수업관련, 시험일정관련, 생활관련
	
	var type3_question_wrap = $('<div>',{'class':'question_wrap'}).css({display: 'none'}).appendTo(question_pop_cont);
	var type3_question = $('<div>', {'class':'question_type3'}).appendTo(type3_question_wrap);
	var type3_question_head = $('<div>', {'class': 'question_type3_head'}).appendTo(type3_question);
	var type3_question_head_select = $('<select>').appendTo(type3_question_head);
	var type3_question_head_select_option1 = $('<option>').val("A").html("수업관련").appendTo(type3_question_head_select);
	var type3_question_head_select_option2 = $('<option>').val("B").html("시험일정관련").appendTo(type3_question_head_select);
	var type3_question_head_select_option3 = $('<option>').val("C").html("생활관련").appendTo(type3_question_head_select);
	var type3_question_text = $('<div>', {'class': 'question_type3_text'}).appendTo(type3_question);
	var type3_student_input = $('<textarea>').css({width: '100%', height: '100%'}).appendTo(type3_question_text);
	
	var type3_question_pop_btn = $('<div>', {'class':'question_pop_btn'}).css({display: 'none'}).appendTo(question_pop_cont);
	var type3_a1 = $('<a>', {'class': 'btn3'}).appendTo(type3_question_pop_btn);
	var type3_img1 = $('<img>').attr({src: '/fs/image/common/pop_btn_submit.gif', alt: '제출'}).appendTo(type3_a1);
	
	type3_img1.on('click', function(){
		var param = {
				book_nm: studentRc.book_nm,
				q_idx: studentRc.q_idx,
				rc_num: studentRc.qData[studentRc.qNum].rc_num.charAt(studentRc.qData[studentRc.qNum].rc_num.length-1),
				type1: 'C',
				type2: type3_question_head_select.val(),
				stu_q: type3_student_input.val()
		}
		function taggingQCallBack(_rs){
			if(_rs.error == API_SUCCESS){
				alert("질문성공");
				vp.close();
			}
		}
		requestApi('POST', apiList('taggingQ'), param, taggingQCallBack);

	});
	
	$('#q_type1').on('click', function(){
    	
		type1_question_wrap.show();
    	type1_question_pop_btn.show();
		type2_question_wrap.hide();
    	type2_question_pop_btn.hide();
    	type3_question_wrap.hide();
    	type3_question_pop_btn.hide();
    	
    	$('#q_type1').attr({checked: true});
    	$('#q_type2').attr({checked: false});
    	$('#q_type3').attr({checked: false});
    	
    });
	$('#q_type2').on('click', function(){
		type1_question_wrap.hide();
    	type1_question_pop_btn.hide();
    	type2_question_wrap.show();
    	type2_question_pop_btn.show();
    	type3_question_wrap.hide();
    	type3_question_pop_btn.hide();
    	$('#q_type1').attr({checked: false});
    	$('#q_type2').attr({checked: true});
    	$('#q_type3').attr({checked: false});
    
    });
	$('#q_type3').on('click', function(){
		type1_question_wrap.hide();
    	type1_question_pop_btn.hide();
    	type2_question_wrap.hide();
    	type2_question_pop_btn.hide();
    	type3_question_wrap.show();
    	type3_question_pop_btn.show();
    	$('#q_type1').attr({checked: false});
    	$('#q_type2').attr({checked: false});
    	$('#q_type3').attr({checked: true});
	});
}
asher_tagging.prototype.rcGetSelection = function(){
	var _this = this
	$('#'+this.areaId).on('mouseup', function(e){
		console.log(_this.airCommand);
		if(_this.airCommand != undefined){
			_this.airCommand = undefined
			return false;
		}
		var range = null;
		var sel = window.getSelection();
		
	    range = sel.getRangeAt(0);
	    range = range.toString();
	    
		var text = sel.anchorNode.nodeValue;
		
		
		text = text.toString();
		var index = sel.focusOffset;
		
		var startPos = parseInt(index)-parseInt(range.length);
		var endPos = parseInt(index);
		
		if(startPos == endPos){return false}
		
		var start_tmp_pos = 0;
		var end_tmp_pos = 0;
		while(true){
			if(text.substring(startPos-start_tmp_pos, startPos-(start_tmp_pos+1)) == " " || startPos-start_tmp_pos<1){
				break;
			}
			else{
				start_tmp_pos++;
			}
			if(startPos-start_tmp_pos<1){
				break;
			}
		}
		while(true){
			if(text.substring(endPos+end_tmp_pos, endPos+(end_tmp_pos+1)) == " " || endPos+end_tmp_pos>text.length){
				endPos = endPos+end_tmp_pos+1;
				break;
			}
			else{
				end_tmp_pos++;
			}
			if(end_tmp_pos> text.length){
				break;
			}
		}
		
		startPos = startPos-start_tmp_pos;
		
		if(text == '' || text == null || text == undefined){
			return false;
		}
		var selectedText = text.substring(startPos,endPos);
		
	
		_this.airCommand = $('<div>').appendTo($('body'));
		//var div1 = $("<div>").text("Q").css({border: '1px solid', width: '25px', height: '20px', 'float': 'left'}).appendTo(_this.airCommand);
		var div1 = $("<div>").css({position: 'absolute', left: '0px', top: '0px'}).appendTo(_this.airCommand);
		var img1 = $('<img>').attr({src: '/fs/image/class/tagging/q.jpg'}).appendTo(div1);
		var t_type="q";
		div1.on('click', function(e){
			//alert("q")
			e.stopPropagation();
			e.preventDefault();
			//updateTagging('Q');
			$('#contents').off('mousedown');
			_this.airCommand.remove();
			_this.airCommand = undefined
			_this.makeQPop();
		});

		//var div2 = $("<div>").text("T").css({border: '1px solid', width: '25px', height: '20px', 'float': 'left'}).appendTo(_this.airCommand);
		var div2 = $("<div>").css({position: 'absolute', left: '52px', top: '0px'}).appendTo(_this.airCommand);
		var img2 = $('<img>').attr({src: '/fs/image/class/tagging/t.jpg'}).appendTo(div2);
		img2.on('click', function(e3){
			
			e3.stopPropagation();
			e3.preventDefault();
		
			updateTagging('T');
			$('#contents').off('mousedown');
			
		}); 
		_this.airCommand.css({position: 'absolute', width: '104px', height: '28px', backgroundColor: 'blue'});
		
		_this.airCommand.css({left: e.pageX, top: e.pageY});
		_this.mouseDown = $('#contents').on('mousedown', function(e){
			e.stopPropagation();
			e.preventDefault();
			if(_this.airCommand){
				_this.airCommand.remove();
				_this.airCommand = undefined
				$('#contents').off('mousedown');
			}
		});
		
		_this.selectedText = selectedText;
		
		var length_cnt = 0;
		var sss = 0;
		var eee = 0;
		for(var i=0;i<_this.txt.length-_this.selectedText.length;i++){
			var ss = i;
			var ee = i+_this.selectedText.length;
			if(_this.txt.substring(ss,ee) == _this.selectedText){
				
				
				sss = ss;
				eee = ee;
				length_cnt++;
			}
		}
		if(length_cnt>1){
			
		}
		
		function updateTagging(t_type){
			
			var q_data = {};
			var param = {
					startIdx: sss,
					endIdx: eee,
					str1: selectedText,
					type1: "RC",
					type2: t_type,
					q_idx: studentRc.q_idx
			}
			
			function taggingCallBack(_rs){
				if(_rs.error == API_SUCCESS){
					_this.airCommand.remove();
					_this.airCommand = undefined
					alert("태깅에 성공하였습니다.");
					return false;
				}
			}
			requestApi('POST', apiList('tagging'), param, taggingCallBack);
		}
	});
}
