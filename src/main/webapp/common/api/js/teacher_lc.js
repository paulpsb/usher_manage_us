var teacherLC = {
		qNum: 0,
		setData: function(_rs){
			teacherLC.qData = _rs.data_list;
			teacherLC.cData = _rs.cData;
			teacherLC.aData = {};
			for(var i=0;i<_rs.answer.length;i++){
				var question_idx = _rs.answer[i]['question_idx'];
				var answer_cnt = parseInt(_rs.answer[i]['cnt']);
				var s_answer_1 = _rs.answer[i]['s_answer_1'];
				var s_answer_2 = _rs.answer[i]['s_answer_2'];
				if(!teacherLC.aData[question_idx]){
					teacherLC.aData[question_idx] = {};
				}
				if(!teacherLC.aData[question_idx]['s_answer_1']){
					teacherLC.aData[question_idx]['s_answer_1'] = {};
				}

				if(!teacherLC.aData[question_idx]['s_answer_1'][s_answer_1]){
					teacherLC.aData[question_idx]['s_answer_1'][s_answer_1] = answer_cnt;
				}
				else{
					var tempCnt = parseInt(teacherLC.aData[question_idx]['s_answer_1'][s_answer_1]);
					tempCnt = tempCnt + parseInt(answer_cnt);
					teacherLC.aData[question_idx]['s_answer_1'][s_answer_1] = tempCnt;
				}

				if(!teacherLC.aData[question_idx]['s_answer_2']){
					teacherLC.aData[question_idx]['s_answer_2'] = {};
				}

				if(!teacherLC.aData[question_idx]['s_answer_2'][s_answer_2]){
					teacherLC.aData[question_idx]['s_answer_2'][s_answer_2] = answer_cnt;
				}
				else{
					var tempCnt = parseInt(teacherLC.aData[question_idx]['s_answer_2'][s_answer_2]);
					tempCnt = tempCnt + parseInt(answer_cnt);
					teacherLC.aData[question_idx]['s_answer_2'][s_answer_2] = tempCnt;
				}
			}
			$('#asher_player').remove();
			$('#aside').remove();

			teacherLC.player_container = $('<div>', {id: 'asher_player'}).appendTo('#main_wrap');
			teacherLC.audio = {
					audioPlayer: function(file, opt, callBackF){
						if(teacherLC.top_audio){

						}
						else{
							teacherLC.top_audio = new asher_player();
							//this.top_audio.aside();
						}
						teacherLC.top_audio.init(file, opt, callBackF);
					},
					start: function(){
						var opt = {hidden: true, aside: true, txt1:teacherLC.cData.txt_1 , txt2: teacherLC.cData.txt_2};
						var soundPath = "/sound/class/lc/direction";
						var soundFile = teacherLC.cData.sound_1;

						teacherLC.audio.audioPlayer(soundPath+soundFile, opt, function(){
							alert("재생 완료");
						});
					}
			}
			teacherLC.audio.start();
			teacherLC.makeFirstView();
		},

		makeFirstView: function(){

			var wrap = $('#wrap');
			var viewer1 = $('<div>', {'class': 'te_1'}).appendTo(wrap);
			var title = $('<h4>').css({textAlign: 'left'}).html(teacherLC.qData[teacherLC.qNum].question).appendTo(viewer1);
			var ol1 = $('<ol>').appendTo(title);

			var ex = teacherLC.qData[teacherLC.qNum].exam;
			for(var i=0;i<ex.length;i++){
				if(ex[i]){
					var li1 = $('<li>').css({textAlign: 'left'}).html(ex[i]+" ( "+teacherLC.getPercent(teacherLC.qData[teacherLC.qNum].index_no, ex_map[i+1])+"% ) ").appendTo(ol1);
				}
			}

			var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
			var back_q = $('<img>').attr({src: '/fs/image/class/teacher/01.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			var next_q = $('<img>').attr({src: '/fs/image/class/teacher/02.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			//var back_q = $('<a>', {'class':'back_q'}).html("이전문제보기").appendTo(pr_nx);
			//var next_q = $('<a>', {'class':'next_q'}).html("다음문제보기").appendTo(pr_nx);
			back_q.on('click', function(){
				if(teacherLC.qNum>0){
					teacherLC.qNum--;
					teacherLC.chkList = [];
					teacherLC.chkList.push('question_btn');
					teacherLC.makeView();
				}
				else{
					alert("첫번째 문제입니다.");
				}
			});

			next_q.on('click', function(){
				if(teacherLC.qNum+1<teacherLC.qData.length){
					teacherLC.qNum++;
					teacherLC.chkList = [];
					teacherLC.chkList.push('question_btn');
					teacherLC.makeView();
				}
				else{
					alert("마지막 문제입니다.");
				}
			});

			teacherLC.setChkBox();
		},
		getPercent: function(index_no, ansKey){

			var tot1 = 0;
			var ansCnt1 = 0;

			for(var aa in teacherLC.aData[""+index_no]){

				if(aa == 's_answer_1'){

					for(var bb in teacherLC.aData[""+index_no][aa]){

						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){

							tot1 += parseInt(teacherLC.aData[""+index_no]['s_answer_1'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt1 += parseInt(teacherLC.aData[""+index_no]['s_answer_1'][bb]);
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

			for(var aa in teacherLC.aData[""+index_no]){

				if(aa == 's_answer_1'){
					for(var bb in teacherLC.aData[""+index_no][aa]){
						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){
							tot1 += parseInt(teacherLC.aData[""+index_no]['s_answer_1'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt1 += parseInt(teacherLC.aData[""+index_no]['s_answer_1'][bb]);
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

			for(var aa in teacherLC.aData[""+index_no]){
				if(aa == 's_answer_1'){
					for(var bb in teacherLC.aData[""+index_no][aa]){
						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){
							tot1 += parseInt(teacherLC.aData[""+index_no]['s_answer_1'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt1 += parseInt(teacherLC.aData[""+index_no]['s_answer_1'][bb]);
							}
						}
					}
				}
				if(aa == 's_answer_2'){
					for(var bb in teacherLC.aData[""+index_no][aa]){
						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){
							tot2 += parseInt(teacherLC.aData[""+index_no]['s_answer_2'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt2 += parseInt(teacherLC.aData[""+index_no]['s_answer_2'][bb]);
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

			for(var i=0;i<teacherLC.chkList.length;i++){
				//alert(teacherLC.chkList[i]);
				var wrap = $('#wrap');
				if(teacherLC.chkList.length==1 || teacherLC.chkList[0] == 'script_btn'){
					if(teacherLC.chkList[i] != 'chain_btn'){
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
				//alert(teacherLC.chkList[i]);
				if(teacherLC.chkList[i] == "question_btn"){
					var viewerWrap = $('<div>', {'class': 'te_1'}).appendTo(wrap);
					var viewer1 = $('<div>').css({width: '100%', height: '630px', overflowY:'auto'}).appendTo(viewerWrap);
					viewerWrap.css({overflow: 'hidden'});
					var type = teacherLC.qData[teacherLC.qNum].type;

					switch (type) {
					case "CATEGORY":
						var question = teacherLC.qData[teacherLC.qNum].question;
						var ex = teacherLC.qData[teacherLC.qNum].exam;
						var sample = teacherLC.qData[teacherLC.qNum].sample;

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
						var ex = teacherLC.qData[teacherLC.qNum].exam;
						var drag_ul = $('<ul>').appendTo(drag_box);
						for(var j=0;j<ex.length;j++){
							if(ex[j]){
								var drag_li = $('<li>', {'class': 'drag_li drop_li answer_choice', 'id': 'drag_li_'+j})
								.attr({ans: ex_map[j]})
								.html(ex[j]+"    ("+ teacherLC.getPercentArr2(teacherLC.qData[teacherLC.qNum].index_no, ex_map[j+1])+")")
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

					default:
						var title = $('<h4>').css({textAlign: 'left'}).html(teacherLC.qData[teacherLC.qNum].question).appendTo(viewer1);
						var ol1 = $('<ol>').appendTo(title);

						var ex = teacherLC.qData[teacherLC.qNum].exam;
						for(var j=0;j<ex.length;j++){
							if(ex[j]){
								var li1 = $('<li>').css({textAlign: 'left'}).html(ex[j]+" ( "+teacherLC.getPercent(teacherLC.qData[teacherLC.qNum].index_no, ex_map[j+1])+"% ) ").appendTo(ol1);
							}
						}
						break;
					}

					var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
					var back_q = $('<img>').attr({src: '/fs/image/class/teacher/01.png'})
					.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
					back_q.on('click', function(){
						if(teacherLC.qNum>0){
							teacherLC.qNum--;
							teacherLC.makeView();
						}
						else{
							alert("첫번째 문제입니다.");
						}
					});
					var next_q = $('<img>').attr({src: '/fs/image/class/teacher/02.png'})
					.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);

					next_q.on('click', function(){
						if(teacherLC.qNum+1<teacherLC.qData.length){
							teacherLC.qNum++;
							teacherLC.makeView();
						}
						else{
							alert("마지막 문제입니다.");
						}
					});
				}
				else if(teacherLC.chkList[i] == "script_btn"){
					var viewer1 = $('<div>', {'class': 'te_1', 'id':'viewer'}).css({textAlign: 'left'}).appendTo(wrap);
					var title = $('<h4>').css({textAlign: 'center'}).html(teacherLC.cData.title).appendTo(viewer1);

					var contents = $('<div>', {'id':'paragraph'}).css({width: '99%', height: '700px'}).appendTo(viewer1);

					teacherLC.top_audio.putSelect();
					teacherLC.makeData();
					contents.html(teacherLC.cData.recontent);


				}
				else if(teacherLC.chkList[i] == "reason_btn"){

					var paragraph = $('#paragraph').html();
					var reason = teacherLC.qData[teacherLC.qNum].reason;
					for(var j=0;j<reason.length;j++){
						if(reason[j]){
							var new_html = change_sentence(paragraph, reason[j]);
							$('#paragraph').html(new_html);
						}
					}

				}
				else if(teacherLC.chkList[i] == "tagging_btn"){

					var paragraph = $('#paragraph').html();

					var param = {
							type1: 'RC',
							q_idx: 'TPO_1_RC_1',
							reData: paragraph
					};
					function getTaggingCallBack(_rs){

						if(_rs.error == API_SUCCESS){

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
				else if(teacherLC.chkList[i] == "chain_btn"){

					var paragraph = $('#paragraph').html();

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

                                var t2 = $('#r'+rst_arrow[each_line]).offset();

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
				var new_data = data.replace(new RegExp(change), function($1){
					return "<span style='background-color: yellow;'>"+$1+"</span>";
				});

				return new_data;
			}

		},

		makeData: function(){
			var data = teacherLC.cData.txt_2;
			var reData = '';
			var reData_arr = data.split("\n");
			var val = '';

			for(var a=0;a<reData_arr.length;a++){
				reData_arr[a] = reData_arr[a].replace(new RegExp(String.fromCharCode(13), 'g'), "");
				val = val+(reData_arr[a]+" ");
			}

			teacherLC.cData.recontent = val;


		},
		chkBoxType: function(obj, sw){
			if(sw == true){
				if($(obj).attr('flag') == 'off'){
					$(obj).find('img').each(function(){
						if($(this).attr('flag') == 'on'){
							$(this).removeClass('off');
							$(this).addClass('on');
						}
						else if($(this).attr('flag') == 'off'){
							$(this).removeClass('on');
							$(this).addClass('off');
						}
					});

				}
				$(obj).attr({flag: 'on'});
			}
			else{

				if($(obj).attr('flag') == 'on'){
					$(obj).find('img').each(function(){
						if($(this).attr('flag') == 'on'){
							$(this).removeClass('on');
							$(this).addClass('off');

						}
						else if($(this).attr('flag') == 'off'){
							$(this).removeClass('off');
							$(this).addClass('on');

						}
					});

				}
				$(obj).attr({flag: 'off'});
			}
		},
		setChkBox: function(){
			teacherLC.chkList = [];
			$('.chk_box_btn').each(function(){
				$(this).on('click', function(){
					if($(this).attr('id') == 'text_btn' && $(this).attr('flag') == 'on'){
						alert("지문 보기 버튼은 RC 문제이서만 사용할 수 있습니다.");
						teacherLC.chkBoxType(this, false);
						return false;
					}
					if($(this).attr('id') == 'chain_btn' && $(this).attr('flag') == 'on'){
						alert("묶기 버튼은 RC 문제이서만 사용할 수 있습니다.");
						teacherLC.chkBoxType(this, false);
						return false;
					}
					if($(this).attr('id') == 'reason_btn' && $(this).attr('flag') == 'on'){
						if($('#script_btn').attr('flag') == 'off' || $('#question').attr('flag') == 'off'){
							alert("답근거 버튼은 스크립트와 문제보기가 활성화 되어야 합니다.");
							teacherLC.chkBoxType(this, false);
							return false;
						}

					}
					if($(this).attr('id') == 'tagging_btn' && $(this).attr('flag') == 'on'){
						if($('#script_btn').attr('flag') == 'off' || $('#question').attr('flag') == 'off'){
							alert("태깅 버튼은 스크립트와 문제보기가 활성화 되어야 합니다.");
							teacherLC.chkBoxType(this, false);
							return false;
						}

					}

					if($(this).attr('id') == 'script_btn' && $(this).attr('flag') == 'off'){
						teacherLC.chkBoxType($('#reason_btn'), false);
						teacherLC.chkBoxType($('#tagging_btn'), false);
					}

					teacherLC.chkList = [];
					$('.chk_box_btn').each(function(){
						if($(this).attr('flag')=='on'){
							teacherLC.chkList.push($(this).attr('id'));
						}
					});
					console.log(teacherLC.chkList);
					teacherLC.makeView();
				});
			});


		}

}