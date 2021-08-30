var teacherRC = {
		qNum: 0,
		setData: function(_rs){
			teacherRC.qData = _rs.data_list;
			teacherRC.cData = _rs.cData;
			teacherRC.aData = {};
			for(var i=0;i<_rs.answer.length;i++){
				var question_idx = _rs.answer[i]['question_idx'];
				var answer_cnt = parseInt(_rs.answer[i]['cnt']);
				var s_answer_1 = _rs.answer[i]['s_answer_1'];
				var s_answer_2 = _rs.answer[i]['s_answer_2'];
				if(!teacherRC.aData[question_idx]){
					teacherRC.aData[question_idx] = {};
				}
				if(!teacherRC.aData[question_idx]['s_answer_1']){
					teacherRC.aData[question_idx]['s_answer_1'] = {};
				}
				
				if(!teacherRC.aData[question_idx]['s_answer_1'][s_answer_1]){
					teacherRC.aData[question_idx]['s_answer_1'][s_answer_1] = answer_cnt;
				}	
				else{
					var tempCnt = parseInt(teacherRC.aData[question_idx]['s_answer_1'][s_answer_1]);
					tempCnt = tempCnt + parseInt(answer_cnt);
					teacherRC.aData[question_idx]['s_answer_1'][s_answer_1] = tempCnt;
				}

				if(!teacherRC.aData[question_idx]['s_answer_2']){
					teacherRC.aData[question_idx]['s_answer_2'] = {};
				}
				
				if(!teacherRC.aData[question_idx]['s_answer_2'][s_answer_2]){
					teacherRC.aData[question_idx]['s_answer_2'][s_answer_2] = answer_cnt;
				}
				else{
					var tempCnt = parseInt(teacherRC.aData[question_idx]['s_answer_2'][s_answer_2]);
					tempCnt = tempCnt + parseInt(answer_cnt);
					teacherRC.aData[question_idx]['s_answer_2'][s_answer_2] = tempCnt;
				}

				
			}
			
			teacherRC.makeFirstView();
		},

		makeFirstView: function(){

			var wrap = $('#wrap');
			var viewer1 = $('<div>', {'class': 'te_1'}).appendTo(wrap);
			var title = $('<h4>').css({textAlign: 'left'}).html(teacherRC.qData[teacherRC.qNum].question).appendTo(viewer1);
			var ol1 = $('<ol>').appendTo(title);

			var ex = teacherRC.qData[teacherRC.qNum].exam;
			for(var i=0;i<ex.length;i++){
				if(ex[i]){
					var li1 = $('<li>').css({textAlign: 'left'}).html(ex[i]+" ( "+teacherRC.getPercent(teacherRC.qData[teacherRC.qNum].index_no, ex_map[i+1])+"% ) ").appendTo(ol1);
				}
			}
			var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
			var back_q = $('<a>', {'class':'back_q'}).html("이전문제보기").appendTo(pr_nx);
			var next_q = $('<a>', {'class':'next_q'}).html("다음문제보기").appendTo(pr_nx);
			back_q.on('click', function(){
				if(teacherRC.qNum>0){
					teacherRC.qNum--;
					teacherRC.chkList = [];
					teacherRC.chkList.push('question_btn');
					teacherRC.makeView();
				}
				else{
					alert("첫번째 문제입니다.");
				}
			});
			next_q.on('click', function(){
				if(teacherRC.qNum+1<teacherRC.qData.length){
					teacherRC.qNum++;
					teacherRC.chkList = [];
					teacherRC.chkList.push('question_btn');
					teacherRC.makeView();
				}
				else{
					alert("마지막 문제입니다.");
				}
			});
			
			teacherRC.setChkBox();
		},
		getPercent: function(index_no, ansKey){
			
			var tot1 = 0;
			var ansCnt1 = 0;
			
			for(var aa in teacherRC.aData[""+index_no]){
				
				if(aa == 's_answer_1'){
					
					for(var bb in teacherRC.aData[""+index_no][aa]){
						
						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){
							
							tot1 += parseInt(teacherRC.aData[""+index_no]['s_answer_1'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt1 += parseInt(teacherRC.aData[""+index_no]['s_answer_1'][bb]);
							}
						}
					}
				}
			}
			
			var per = Math.round(ansCnt1/tot1*100);
			if(isNaN(per)){
				per = 0;
			}
			return per;
		},
		getPercentArr: function(index_no, ansKey){
			
			var tot1 = 0;
			var ansCnt1 = 0;
			
			for(var aa in teacherRC.aData[""+index_no]){
				
				if(aa == 's_answer_1'){
					for(var bb in teacherRC.aData[""+index_no][aa]){
						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){
							tot1 += parseInt(teacherRC.aData[""+index_no]['s_answer_1'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt1 += parseInt(teacherRC.aData[""+index_no]['s_answer_1'][bb]);
							}
						}
					}
				}
				
			}
			var per = Math.round(ansCnt1/tot1*100);
			if(isNaN(per)){
				per = 0;
			}
			return per;
		},
		getPercentArr2: function(index_no, ansKey){
			
			var tot1 = 0;
			var tot2 = 0;
			var ansCnt1 = 0;
			var ansCnt2 = 0;
			
			for(var aa in teacherRC.aData[""+index_no]){
				if(aa == 's_answer_1'){
					for(var bb in teacherRC.aData[""+index_no][aa]){
						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){
							tot1 += parseInt(teacherRC.aData[""+index_no]['s_answer_1'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt1 += parseInt(teacherRC.aData[""+index_no]['s_answer_1'][bb]);
							}
						}
					}
				}
				if(aa == 's_answer_2'){
					for(var bb in teacherRC.aData[""+index_no][aa]){
						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){
							tot2 += parseInt(teacherRC.aData[""+index_no]['s_answer_2'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt2 += parseInt(teacherRC.aData[""+index_no]['s_answer_2'][bb]);
							}
						}
					}
				}
			}
			
			
			var per1 = Math.round(ansCnt1/tot1*100);
			var per2 = Math.round(ansCnt2/tot2*100);
			if(isNaN(per1)){
				per1 = 0;
			}
			if(isNaN(per2)){
				per2 = 0;
			}
			return ""+per1+"% , "+per2+"%";
		},
		makeView: function(){
			var _this = this;
			for(var i=0;i<teacherRC.chkList.length;i++){
				//alert(teacherRC.chkList[i]);
				var wrap = $('#wrap');
				if(teacherRC.chkList.length==1 || teacherRC.chkList[0] == 'text_btn'){
					if(teacherRC.chkList[i] != 'chain_btn'){
						wrap.empty();
					}
				}
				else{
					if(i==0){
						wrap.empty();
						var wrap = $('<div>', {'id':'te_half', 'class': 'te_half'}).appendTo(wrap);
					}
					else{
						wrap = $('#te_half');
					}
				}
				//alert(teacherRC.chkList[i]);
				if(teacherRC.chkList[i] == "question_btn"){
					var viewerWrap = $('<div>', {'class': 'te_1'}).appendTo(wrap);
					var viewer1 = $('<div>').css({width: '100%', height: '630px', overflowY:'auto'}).appendTo(viewerWrap);
					viewerWrap.css({overflow: 'hidden'});
					var type = teacherRC.qData[teacherRC.qNum].type;
					
					switch (type) {
					case "CATEGORY":
						var question = teacherRC.qData[teacherRC.qNum].question;
						var ex = teacherRC.qData[teacherRC.qNum].exam;
						var sample = teacherRC.qData[teacherRC.qNum].sample;

						var title = $('<h4>').css({textAlign: 'left', fontSize: '14px', lineHeight: '200%'}).html(question).appendTo(viewer1);
						var answer_box1 = $('<div>').css({textAlign: 'left', border: '1px solid #999', padding: '0px 20px', marginTop: '15px'}).appendTo(viewer1);
						var answer_box1_title = $('<p>').html('Aggressive Singless Bees').css({lineHeight: '20px', font: 'normal', fontSize: '12px', height: '20px'}).appendTo(answer_box1);
						var answer_box2 = $('<div>').css({textAlign: 'left', border: '1px solid #999', padding: '0px 20px', marginTop: '15px'}).appendTo(viewer1);
						var answer_box2_title = $('<p>').html('Non aggressive Stingless Bees').css({lineHeight: '20px', fontSize: '12px', height: '20px'}).appendTo(answer_box2);

						var ans_ul_1 = $('<ul>').appendTo(answer_box1);
						var li1_1 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop1'}).css({fontSize: '13px', minHeight: '25px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul_1);
						removeItem(li1_1);
						var li1_2 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop2'}).css({fontSize: '13px', minHeight: '25px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul_1);
						removeItem(li1_2);
						var li1_3 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop3'}).css({fontSize: '13px', minHeight: '25px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul_1);
						removeItem(li1_3);
						
						var ans_ul_2 = $('<ul>').appendTo(answer_box2);
						var li2_1 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop4'}).css({fontSize: '13px', minHeight: '25px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul_2);
						removeItem(li2_1);
						var li2_2 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop5'}).css({fontSize: '13px', minHeight: '25px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul_2);
						removeItem(li2_2);
						var li2_3 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop6'}).css({fontSize: '13px', minHeight: '25px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul_2);
						removeItem(li2_3);
						
						
						
						var drag_box = $('<div>', {'class':'drag'}).css({textAlign: 'left'}).appendTo(viewer1);
						var p_answer = $('<p>').css({textAlign: 'left'}).html("Answer Choice").appendTo(drag_box);
						var ex = teacherRC.qData[teacherRC.qNum].exam;
						var drag_ul = $('<ul>').appendTo(drag_box);
						for(var j=0;j<ex.length;j++){
							if(ex[j]){
								var drag_li = $('<li>', {'class': 'drag_li drop_li answer_choice', 'id': 'drag_li_'+j})
								.attr({ans: ex_map[j]})
								.html(ex[j]+"    ("+ teacherRC.getPercentArr2(teacherRC.qData[teacherRC.qNum].index_no, ex_map[j+1])+")")
								.css({fontSize: '13px', lineHeight: '200%', textAlign: 'left', listStyle: 'initial', cursor: 'pointer'})
								.appendTo(drag_ul);
							}
						}
						$('.drag_li').each(function(){
							$(this).draggable({
								revert: true
							});
						});
						

						function drop_start(q_num){
							$('.drop_li').each(function(){
								var _this = this;
								$(this).droppable({
									hoverClass:'dragline',
							  		tolerance: 'pointer',
							        drop: function(event, ui){
								    	if(!$(_this).hasClass('answer_choice')){
										   	if(ui.draggable.text() != ''){
										       	if($(_this).text()==''){
										       		$(_this).attr({ans: ui.draggable.attr('ans'), drag_id: ui.draggable.attr('id')});
										       		var span1 = $('<span>', {'class': 'drag_li'}).html(ui.draggable.text()).appendTo($(_this));
										       		
										       		span1.draggable({
														revert: true,
														drag: function(event, ui){
															//console.log($(ui)[0].offset);
															//console.log($(_this).parent().parent().offset());
															var box_size = {
																	x: $(_this).parent().parent().offset().left, 
																	y: $(_this).parent().parent().offset().top,
																	w: $(_this).parent().parent().width(),
																	h: $(_this).parent().parent().height(),
															}
															if($(ui)[0].offset.left < box_size.x || 
																$(ui)[0].offset.left > (box_size.x+box_size.w) ||
																$(ui)[0].offset.top < box_size.y ||
																$(ui)[0].offset.top > (box_size.y+box_size.h)){
																
																	var pa = $(ui)[0].helper[0];
																	var d_id = $(pa).parent().attr('drag_id');
																	$('#'+d_id).html($(pa).text());
																	pa.remove();
															} 
															
														}
													});
											        	
										        }
										        else{
											       	var before_text = $(_this).text();
											       	var drag_id = $(_this).attr('drag_id');
											       	$('#'+drag_id).html(before_text);
											       	$(_this).attr({ans: ui.draggable.attr('ans'), drag_id: ui.draggable.attr('id')}).html(ui.draggable.text());
											        	
											    }
										        if($(ui.draggable).hasClass('answer_choice')){
									        		$(ui.draggable).empty();
									        	}
									        	else{
									        		var ans = $(ui.draggable).parent().attr('ans');
									        		var drag_id = $(ui.draggable).parent().attr('drag_id');
									        		$(_this).attr({ans: ans, drag_id: drag_id});
									        		$(ui.draggable).parent().removeAttr('ans');
									    			$(ui.draggable).parent().removeAttr('drag_id');
									        		$(ui.draggable).remove();
									        	}
										    }
										}
								    	else{
								    		if($(_this).text() == '' && !$(ui.draggable).hasClass('answer_choice') && $(_this).attr('id') == $(ui.draggable).parent().attr('drag_id')){
								    			$(_this).html($(ui.draggable).text());
								    			$(ui.draggable).parent().removeAttr('ans');
								    			$(ui.draggable).parent().removeAttr('drag_id');
								    			$(ui.draggable).empty();
								    		}
								    	}	
								        	
									}
								});
							});
						}
						function drag_start(){
							$('.drag_li').each(function(){
								$(this).draggable({
									revert: true
								});
							});
							$('.drag_p').each(function(){
								$(this).draggable({
									revert: true
								});
							});
							drop_start();
						}
						drag_start();
						
						break;
					case "SUMMARY":
						var title = $('<h4>').css({textAlign: 'left', fontSize: '14px', lineHeight: '200%'}).html(teacherRC.qData[teacherRC.qNum].question).appendTo(viewer1);

						var answer_box = $('<div>').css({textAlign: 'left', border: '1px solid #999', padding: '5px 20px', marginTop: '15px'}).appendTo(viewer1);
						var sample_p = $('<p>').css({fontSize: '14px', fontWeight: 'bold'}).html(teacherRC.qData[teacherRC.qNum].sample).appendTo(answer_box);
						var ans_ul = $('<ul>').appendTo(answer_box);
						function removeItem(obj){
							obj.on('dblclick', function(){
								if(obj.text() != ""){
									var drag_id = obj.attr('drag_id');
									$('#'+drag_id).html(obj.text());
									obj.empty();
									obj.removeAttr('drag_id');
									obj.removeAttr('ans');
								}
							});
						}
						var li1 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop1'}).css({minHeight: '30px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul);
						removeItem(li1);
						var li2 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop2'}).css({minHeight: '30px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul);
						removeItem(li2);
						var li3 = $('<li>', {'class': 'drop_li', 'id': 'ans_drop3'}).css({minHeight: '30px', listStyle: 'initial', width: '98%', cursor: 'pointer', background: 'none'}).appendTo(ans_ul);
						removeItem(li3);
						
						var drag_box = $('<div>', {'class':'drag'}).css({textAlign: 'left'}).appendTo(viewer1);
						var p_answer = $('<p>').css({textAlign: 'left'}).html("Answer Choice").appendTo(drag_box);
						var ex = teacherRC.qData[teacherRC.qNum].exam;
						var drag_ul = $('<ul>').appendTo(drag_box);
						for(var j=0;j<ex.length;j++){
							if(ex[j]){
								var drag_li = $('<li>', {'class': 'drag_li drop_li answer_choice', 'id': 'drag_li_'+j})
								.attr({ans: ex_map[j+1]})
								.html(ex[j])
								.css({fontSize: '13px', lineHeight: '200%', textAlign: 'left', listStyle: 'initial', cursor: 'pointer'})
								.appendTo(drag_ul);
							}
						}
						$('.drag_li').each(function(){
							$(this).draggable({
								revert: true
							});
						});
						var answer_info = $('<p>', {'class' : 'add_info'}).css({textAlign: 'left'}).appendTo(viewer1);
						for(var j=0;j<ex.length;j++){
							if(ex[j]){
								
								var div_ans = $('<span>').css({marginLeft: '20px'}).html(ex_map[j+1]+" ( "+teacherRC.getPercentArr(teacherRC.qData[teacherRC.qNum].index_no, ex_map[j+1])+"% ) ").appendTo(answer_info);
							}
						}
						
						function drop_start(q_num){
							$('.drop_li').each(function(){
								var _this = this;
								$(this).droppable({
									hoverClass:'dragline',
							  		tolerance: 'pointer',
							        drop: function(event, ui){
								    	if(!$(_this).hasClass('answer_choice')){
										   	if(ui.draggable.text() != ''){
										       	if($(_this).text()==''){
										       		$(_this).attr({ans: ui.draggable.attr('ans'), drag_id: ui.draggable.attr('id')});
										       		var span1 = $('<span>', {'class': 'drag_li'}).html(ui.draggable.text()).appendTo($(_this));
										       		
										       		span1.draggable({
														revert: true,
														drag: function(event, ui){
															//console.log($(ui)[0].offset);
															//console.log($(_this).parent().parent().offset());
															var box_size = {
																	x: $(_this).parent().parent().offset().left, 
																	y: $(_this).parent().parent().offset().top,
																	w: $(_this).parent().parent().width(),
																	h: $(_this).parent().parent().height(),
															}
															if($(ui)[0].offset.left < box_size.x || 
																$(ui)[0].offset.left > (box_size.x+box_size.w) ||
																$(ui)[0].offset.top < box_size.y ||
																$(ui)[0].offset.top > (box_size.y+box_size.h)){
																
																	var pa = $(ui)[0].helper[0];
																	var d_id = $(pa).parent().attr('drag_id');
																	$('#'+d_id).html($(pa).text());
																	pa.remove();
															} 
															
														}
													});
											        	
										        }
										        else{
											       	var before_text = $(_this).text();
											       	var drag_id = $(_this).attr('drag_id');
											       	$('#'+drag_id).html(before_text);
											       	$(_this).attr({ans: ui.draggable.attr('ans'), drag_id: ui.draggable.attr('id')}).html(ui.draggable.text());
											        	
											    }
										        if($(ui.draggable).hasClass('answer_choice')){
									        		$(ui.draggable).empty();
									        	}
									        	else{
									        		var ans = $(ui.draggable).parent().attr('ans');
									        		var drag_id = $(ui.draggable).parent().attr('drag_id');
									        		$(_this).attr({ans: ans, drag_id: drag_id});
									        		$(ui.draggable).parent().removeAttr('ans');
									    			$(ui.draggable).parent().removeAttr('drag_id');
									        		$(ui.draggable).remove();
									        	}
										    }
										}
								    	else{
								    		if($(_this).text() == '' && !$(ui.draggable).hasClass('answer_choice') && $(_this).attr('id') == $(ui.draggable).parent().attr('drag_id')){
								    			$(_this).html($(ui.draggable).text());
								    			$(ui.draggable).parent().removeAttr('ans');
								    			$(ui.draggable).parent().removeAttr('drag_id');
								    			$(ui.draggable).empty();
								    		}
								    	}	
								        	
									}
								});
							});
						}
						function drag_start(){
							$('.drag_li').each(function(){
								$(this).draggable({
									revert: true
								});
							});
							$('.drag_p').each(function(){
								$(this).draggable({
									revert: true
								});
							});
							drop_start();
						}
						drag_start();
						
						break;
					case "INSERTION":
						var title = $('<h4>').css({textAlign: 'left'}).html(teacherRC.qData[teacherRC.qNum].question).appendTo(viewer1);

						var p_arrage = $('<p>').css({textAlign: 'left', minHeight: '40px', margin: '30px 40px 40px 30px', fontWeight: 'bold', fontSize: '15px'}).appendTo(viewer1);
						var drag_sapn = $('<span>', {'class': 'drag_p'}).html(teacherRC.qData[teacherRC.qNum].sample).appendTo(p_arrage);

						var info_txt = "Where would the sentence best fit? Click on a square <img class=\"chk_img\" src=\"/fs/image/class/rc/chk.png\" alt=\"check_images\"/>to add the sentence to the passage.";
						var p_info = $('<p>', {'class' : 'add_info'}).css({textAlign: 'left'}).html(info_txt).appendTo(viewer1);

						var answer_info = $('<p>', {'class' : 'add_info'}).css({textAlign: 'left'}).appendTo(viewer1);
						var ex = teacherRC.qData[teacherRC.qNum].exam;
						for(var j=0;j<ex.length;j++){
							if(ex[j]){
								var div_ans = $('<div>').html(ex_map[j+1]+" ( "+teacherRC.getPercent(teacherRC.qData[teacherRC.qNum].index_no, ex_map[j+1])+"% ) ").appendTo(answer_info);
							}
						} 

						break;
					default:
						var title = $('<h4>').css({textAlign: 'left'}).html(teacherRC.qData[teacherRC.qNum].question).appendTo(viewer1);
						var ol1 = $('<ol>').appendTo(title);

						var ex = teacherRC.qData[teacherRC.qNum].exam;
						for(var j=0;j<ex.length;j++){
							if(ex[j]){
								var li1 = $('<li>').css({textAlign: 'left'}).html(ex[j]+" ( "+teacherRC.getPercent(teacherRC.qData[teacherRC.qNum].index_no, ex_map[j+1])+"% ) ").appendTo(ol1);
							}
						}
						break;
					}
					
					var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
					var back_q = $('<a>', {'class':'back_q'}).html("이전문제보기").appendTo(pr_nx);
					back_q.on('click', function(){
						if(teacherRC.qNum>0){
							teacherRC.qNum--;
							teacherRC.makeView();
						}
						else{
							alert("첫번째 문제입니다.");
						}
					});
					var next_q = $('<a>', {'class':'next_q'}).html("다음문제보기").appendTo(pr_nx);
					next_q.on('click', function(){
						if(teacherRC.qNum+1<teacherRC.qData.length){
							teacherRC.qNum++;
							teacherRC.makeView();
						}
						else{
							alert("마지막 문제입니다.");
						}
					});
				}
				else if(teacherRC.chkList[i] == "text_btn"){
					teacherRC.makeData();
					var viewer1 = $('<div>', {'class': 'te_1', 'id':'viewer'}).css({textAlign: 'left'}).appendTo(wrap);
					var title = $('<h4>').css({textAlign: 'center'}).html(teacherRC.cData.title).appendTo(viewer1);

					
					var contents = $('<p id="paragraph">').html(teacherRC.cData.recontent).appendTo(viewer1);
				}
				else if(teacherRC.chkList[i] == "reason_btn"){

					var paragraph = $('#paragraph').html();
					var reason = teacherRC.qData[teacherRC.qNum].reason;
					for(var j=0;j<reason.length;j++){
						if(reason[j]){
							var new_html = change_sentence(paragraph, reason[j]);
							$('#paragraph').html(new_html);
						}
					}

				}
				else if(teacherRC.chkList[i] == "tagging_btn"){
				
					var paragraph = $('#paragraph').html();

					var param = {
							type1: 'RC',
							q_idx: 'TPO_1_RC_1',
							reData: paragraph
					};
					function getTaggingCallBack(_rs){

						if(_rs.error == API_SUCCESS){
							console.log(_rs);
							var taggingList = _rs.data.data_list;

							var html = '';
							var newData = '';
							for(var i=0;i<taggingList.length;i++){
								var tmp1 = taggingList[i].str
								if(tmp1.indexOf("(")!= -1){

									var a1 = paragraph.indexOf(tmp1);
									var b1 = paragraph.indexOf(tmp1)+tmp1.length;
									newData = paragraph.substring(0, a1)+"<span style='background-color: rgba(255,0,0,0.1);'>"+paragraph.substring(a1, b1)+"</span>"+paragraph.substring(b1, paragraph.length-1);
								}
								else if(tmp1.indexOf(")")!= -1){
									var a1 = paragraph.indexOf(tmp1);
									var b1 = paragraph.indexOf(tmp1)+tmp1.length;
									newData = paragraph.substring(0, a1)+"<span style='background-color: rgba(255,0,0,0.1);'>"+paragraph.substring(a1, b1)+"</span>"+paragraph.substring(b1, paragraph.length-1);

								}
								else{
									newData = paragraph.replace(new RegExp(tmp1), function($1){
										return "<span style='background-color: rgba(255,0,0,0.1);'>"+$1+"</span>";
									});
								}
								if(i == taggingList.length-1){
									html += newData = "<div style='position:absolute; left: 0; top: 0; width: 100%;'>"+newData+"</div>";
								}
								else{
									html += newData = "<div style='position:absolute; left: 0; top: 0; width: 100%; color: rgba(255,255,255,0);'>"+newData+"</div>";
								}

							}

							$('#paragraph').css({position:'relative'}).html(html);

						}
					}
					requestApi('POST', apiList('getTagging'), param, getTaggingCallBack);
				}
				else if(teacherRC.chkList[i] == "chain_btn"){
					
					var paragraph = $('#paragraph').html();
					console.log(paragraph);

					/*var paragraph_raw = $('#paragraph')
					                       .html()
					                       .replace('<br>&nbsp;&nbsp;&nbsp;&nbsp;<span id="myp">➡</span>','')
					                       .replace(/\n/g,'')
					                       .replace(/<br>/g,'')
					                       .replace(/&nbsp;/g,' ')
					                       .replace(/  /g,' ')
					                       .trim();
					*/
                    //return;
					var param = {
							q_idx: 'TPO_1_RC_1'
					};
					function getChainCallBack(_rs){

						if(_rs.error == API_SUCCESS){
							console.log(_rs);
							var d = _rs.data.data_list;
							$('#paragraph').html(d.contents);
							var note_all = $('#paragraph').text().replace(/\n/g,' ').split(' ');
                            var t = '';
                            var going_flag = [0,0];
                            var is_on = '';
                            for(var each_note in note_all){

                                if(note_all[each_note].indexOf('(') > -1 ){
                                    going_flag[0]=1;
                                }
                                if(note_all[each_note].indexOf('[') > -1 ){
                                    going_flag[1]=1;
                                }
                                if(note_all[each_note].indexOf(')') > -1 ){
                                    going_flag[0]=0;
                                }
                                if(note_all[each_note].indexOf(']') > -1 ){
                                    going_flag[1]=0;
                                }
                                if(going_flag[0] == 1 || going_flag[1] == 1 ){
                                    is_on='-';
                                }


                                t += '<span id="r'+each_note+'" class="'+is_on+'">'+note_all[each_note]+' </span>';

                                if(going_flag[0] == 0 && going_flag[1] == 0 ){
                                    is_on='';
                                }

                                //마지막이 .이면 <br> 추가
                                if(note_all[each_note].charAt(note_all[each_note].length-1) == '.'){
                                    t += '<br />';
                                }


                            }
                            $('#paragraph').html(t);


                            var rst_arrow = d.modifier_set;
							rst_arrow = rst_arrow.replace('{','{"').replace(/:/g,'":').replace(/,/g,',"');
							rst_arrow = JSON.parse(rst_arrow);
							
                            for(var each_line in rst_arrow){
                                if(rst_arrow[each_line] == -2){
                                    continue;
                                }
                                var note_offset = $('#paragraph').offset();
                                var t1 = $('#r'+each_line).offset();
                                t1.left -= note_offset.left;
								t1.left += 20;
								t1.top += $('#paragraph').scrollTop();
								t1.top -= 20;
                                var t1_w = $('#r'+each_line).width()/2;


                                if(rst_arrow[each_line] == -1){
                                    $('#paragraph').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
                                    $('#paragraph').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-15, {color:"#D60004", stroke:2, zindex:1001});
                                    $('#paragraph').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-5, {color:"#D60004", stroke:2, zindex:1001});
                                    continue;
                                }
                                console.log(rst_arrow[each_line]);
                                var t2 = $('#r'+rst_arrow[each_line]).offset();
                                console.log(t2);
                                t2.left -= note_offset.left;
								t2.left += 20;
                                t2.top -= note_offset.top;
                                t2.top += $('#paragraph').scrollTop();
								t2.top -= 20;
                                var t2_w = parseInt($('#r'+rst_arrow[each_line]).width()/2);


                                $('#paragraph').line(t1.left+t1_w, t1.top, t1.left+t1_w, t1.top-10, {color:"#D60004", stroke:2, zindex:1001}, function(){
                                    $(this).addClass('l');
                                });
                                $('#paragraph').line(t1.left+t1_w, t1.top-10, t2.left+t2_w, t2.top-10, {color:"#D60004", stroke:2, zindex:1001}, function(){
                                    $(this).addClass('l');
                                });
                                $('#paragraph').line(t2.left+t2_w, t2.top-10, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
                                    $(this).addClass('l');
                                });

                                $('#note').line(t2.left+t2_w-5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
                                    $(this).addClass('l');
                                });
                                $('#paragraph').line(t2.left+t2_w+5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
                                    $(this).addClass('l');
                                });
                            }

                            var color_set = JSON.parse(d.color_set);
                            for(var each_color in color_set){
                                var pos = color_set[each_color].split(',');
                                for(var each_pos in pos){
                                    $('#r'+pos[each_pos]).addClass(each_color);
                                }
                            }



							return;
							var taggingList = _rs.data.data_list;

							var html = '';
							var newData = '';
							for(var i=0;i<taggingList.length;i++){
								var tmp1 = taggingList[i].str
								if(tmp1.indexOf("(")!= -1){

									var a1 = paragraph.indexOf(tmp1);
									var b1 = paragraph.indexOf(tmp1)+tmp1.length;
									newData = paragraph.substring(0, a1)+"<span style='background-color: rgba(255,0,0,0.1);'>"+paragraph.substring(a1, b1)+"</span>"+paragraph.substring(b1, paragraph.length-1);
								}
								else if(tmp1.indexOf(")")!= -1){
									var a1 = paragraph.indexOf(tmp1);
									var b1 = paragraph.indexOf(tmp1)+tmp1.length;
									newData = paragraph.substring(0, a1)+"<span style='background-color: rgba(255,0,0,0.1);'>"+paragraph.substring(a1, b1)+"</span>"+paragraph.substring(b1, paragraph.length-1);

								}
								else{
									newData = paragraph.replace(new RegExp(tmp1), function($1){
										return "<span style='background-color: rgba(255,0,0,0.1);'>"+$1+"</span>";
									});
								}
								if(i == taggingList.length-1){
									html += newData = "<div style='position:absolute; left: 0; top: 0; width: 100%;'>"+newData+"</div>";
								}
								else{
									html += newData = "<div style='position:absolute; left: 0; top: 0; width: 100%; color: rgba(255,255,255,0);'>"+newData+"</div>";
								}

							}

							$('#paragraph').css({position:'relative'}).html(html);

						}
					}
					requestApi('POST', apiList('getChainMeta'), param, getChainCallBack);
				}
			}
			function change_sentence(data, change){
				console.log(data);
				console.log(change);
				var new_data = data.replace(new RegExp(change), function($1){
					return "<span style='background-color: yellow;'>"+$1+"</span>";
				});

				return new_data;
			}

		},

		makeData: function(){
			//alert("make");
			var data = teacherRC.cData.content;
			//alert(data);
			var phrase = "";
			var reData = data;
			var _this = this;
			reData =  reData.replace(/★/g, function($1){
				return "";
			});
			reData =  reData.replace(/◆/g, function($1){
				return "";
			});

			reData =  reData.replace(/\d\./g, function($1){
				var p_idx = -1;
				if(teacherRC.qData[teacherRC.qNum].c_text != "" && teacherRC.chkList && teacherRC.chkList[0] == 'question_btn'){

					phrase = teacherRC.qData[teacherRC.qNum].c_text;
					if(phrase.indexOf("|")==-1){
						if(phrase.indexOf("_")!=-1 ){
							var p_idx_arr = phrase.split("_");
							p_idx = parseInt(p_idx_arr[1]);
						}
					}
				}
				var str = '';

				p_idx = parseInt(p_idx);

				if($1 == '1.'){
					str = "<br />";
				}
				else{
					str = "<br /><br />";
				}
				if(p_idx>-1 && parseInt($1.substr(0,1))==p_idx){

					str = str+"&nbsp&nbsp&nbsp&nbsp"+"<span id='myp'>➡</span>";
				}
				else{
					str = str+"&nbsp&nbsp&nbsp&nbsp";
				}
				return str;
			});

			if(teacherRC.qData[teacherRC.qNum].c_text != "" && teacherRC.chkList && teacherRC.chkList[0] == 'question_btn'){
				phrase = teacherRC.qData[teacherRC.qNum].c_text;
				if(phrase.indexOf("|")!=-1 || (phrase.indexOf("|")==-1 && phrase.indexOf("_")==-1)){
					var strk = "";
					if(phrase.indexOf("|")!=-1){
						var tmp_arr = phrase.split("|");
						strk = tmp_arr[1]; 
					}
					else{
						strk = phrase;
					}
					
					if(strk.indexOf("_")==-1){
						reData =  reData.replace(new RegExp(strk), function($1){
							return "<span style='background-color: gray;'>"+$1+"</span>";
						});
						var phrase_para_sIdx = reData.indexOf(strk);
	
						var sIdx = 0;
						while(true){
							if(reData.substr(phrase_para_sIdx,6) == "<br />" && !teacherRC.firstStep){
								reData1 = reData.substring(0,phrase_para_sIdx);
								reData2 = reData.substring(phrase_para_sIdx+26);
								reData = reData1+"<br />&nbsp&nbsp&nbsp&nbsp"+"<span id='myp'>➡</span>"+reData2;
								break;
							}
							phrase_para_sIdx--;
							sIdx++;
							if(sIdx>1000){
								break;
							}
						}
					}
				}
			}


			if(teacherRC.qData[teacherRC.qNum].type == "INSERTION"){
				reData =  reData.replace(/<[1-9]>/g, function($1){
					var answerIdx = $1.substr(1,1);

					var answerC = ex_map[answerIdx];
					return "<span style=''><span ans='"+answerC+"' class='drop_li' style='cursor: pointer'> ■</span></span>";
				});
				var sqStr = "■";
				var sqIdx = reData.indexOf(sqStr);
				var sIdx = 0;
				while(true){
					if(reData.substr(sqIdx,6) == "<br />"){
						reData1 = reData.substring(0,sqIdx);
						reData2 = reData.substring(sqIdx+26);
						reData = reData1+"<br />&nbsp&nbsp&nbsp&nbsp"+"<span id='myp'>➡</span>"+reData2;
						break;
					}
					sqIdx--;
					sIdx++;
					if(sIdx>1000){
						break;
					}
				}
				var tmp_timer = setTimeout(function(){
					$('.drop_li').each(function(){
						
						$(this).on('click', function(){
							var parent = $(this).parent();
							
							if(parent.find('.drag_p').length > 0){
								var span1 = $('<span>').html($('.drag_p').text()).css({background: 'gray'}).appendTo($('#drag_text_wrap'));
							}
							else{
								var span1 = $('<span>').html($('.drag_p').text()).css({background: 'gray'}).appendTo(parent);
								var a_num = $(this).attr('ans');
							}
							$('.drag_p').remove();
							span1.addClass('drag_p');
							span1.draggable({
								revert: true
							});
							
							
						})
								
					});
					clearTimeout(tmp_timer)
				}, 500);
			}
			else{
				reData =  reData.replace(/<[1-9]>/g, function($1){
					var answerIdx = $1.substr(1,1);
					var answerC = ex_map[answerIdx];
					return "";
				});
			}
			/*
			reData =  reData.replace(/<[1-9]>/g, function($1){

				return "";
			});
			*/
			//alert(reData)
			teacherRC.cData.recontent = reData;
			var tmp_timer2 = setTimeout(function(){
				if($('#myp')[0]){
					
					$('#viewer').scrollTop($('#myp').offset().top-130);
				}
			}, 500);

			
		},
		setChkBox: function(){
			teacherRC.chkList = [];
			$('.chk_box_btn').each(function(){
				$(this).on('click', function(){
					if($(this).attr('id') == "reason_btn" || 
							$(this).attr('id') == "tagging_btn"){
						if($(this).attr('flag')== 'on' && ($('#text_btn').attr('flag') != 'on' || $('#question_btn').attr('flag') != 'on')){
							alert("반드시 문제보기와 함께 지문보기 또는 scipt가 먼저 체크 되어야 합니다.");
							$(this).find('img').each(function(){
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
							return false;
						}
					}
					if($(this).attr('id') == "reason_btn" || $(this).attr('id') == "tagging_btn"){
						if($(this).attr('flag')== 'on' && $('#chain_btn').attr('flag') == 'on'){
							alert("묶기와 함께 사용할 수 없습니다.");
							$(this).find('img').each(function(){
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
							return false;
						}

					} 
					
					// 묶기 중복 X
					if($(this).attr('id') == "chain_btn"){
						if($(this).attr('flag')== 'on' && ($('#tagging_btn').attr('flag') == 'on' || $('#reason_btn').attr('flag') == 'on')){
							alert("답근거 또는 태깅보기와 함께 사용할 수 없습니다.");
							$(this).find('img').each(function(){
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
							return false;

						}

					}

					if($(this).attr('id') == "text_btn"){
						if($(this).attr('flag')== 'off'){
							
							$('#reason_btn').find('img').each(function(){

								if($(this).parent().attr('flag') == 'off'){

								}
								else{
									if($(this).attr('flag') == 'off'){
										$(this).removeClass('off');
										$(this).addClass('on');

									}
									else if($(this).attr('flag') == 'on'){
										$(this).removeClass('on');
										$(this).addClass('off');
									}
									
									
								}
														
							});
							$('#reason_btn').find('img').each(function(){
								if($(this).hasClass('on')){
									if($(this).attr('flag') == 'on'){
										$(this).parent().attr({flag: 'on'});
									}
									else{
										$(this).parent().attr({flag: 'off'});
									}
								}
							});
							
							$('#tagging_btn').find('img').each(function(){
								if($(this).parent().attr('flag') == 'off'){

								}
								else{
									if($(this).attr('flag') == 'off'){
										$(this).removeClass('off');
										$(this).addClass('on');

									}
									else if($(this).attr('flag') == 'on'){
										$(this).removeClass('on');
										$(this).addClass('off');
									}
									
									
								}				

								
							});
							$('#tagging_btn').find('img').each(function(){
								if($(this).hasClass('on')){
									if($(this).attr('flag') == 'on'){
										$(this).parent().attr({flag: 'on'});
									}
									else{
										$(this).parent().attr({flag: 'off'});
									}
								}
							});
							
							
						}

					}
					
					
					teacherRC.chkList = [];
					$('.chk_box_btn').each(function(){
						if($(this).attr('flag')=='on'){
							teacherRC.chkList.push($(this).attr('id'));
						}
					});
					
					teacherRC.makeView();
					
				});
			});

		}

}