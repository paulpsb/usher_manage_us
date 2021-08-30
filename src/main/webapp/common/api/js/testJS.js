var test_interval;
var testJS = {
	showJS: function(){
		var _this = this;
		
		var q_num= 1;
		
		$('.test_list').hide();
		$('#wrap').empty();
		var div_wrap = $('<div>', {'class': 'testForm'}).css({float: 'left', width: '1302px', height: '640px',backgroundColor: 'rgba(89,133,154,0.8)', position: 'relative'}).appendTo($('#wrap'));
		var vp = div_wrap;
		div_wrap.css({paddingLeft: '155px', paddingTop: '30px'});
		
		var subject_no = $('<input type="hidden" name="subject_no" id="subject_no">').val(1).appendTo(vp);
		
		var pop_title = $('<div>', {'class': 'pop_title'}).css({fontWeight: 'bold', color: '#fff', textAlign: 'left'}).appendTo(vp);
		var pop_title_div1 = $('<div>').css({position: 'absolute', right: '50px'}).appendTo(pop_title);
		var pop_title_div2 = $('<div>').css({position: 'absolute', top: '90px', right: '50px'}).appendTo(pop_title);
		
		var title_p = $('<p>').appendTo(pop_title);
		var title_p_span = $('<span>').html("제목").appendTo(title_p);
		var title_p_input = $('<input type="text" name="tbj_subject" id="tbj_subject">').css({height: '30px', width: '884px'}).appendTo(title_p);
		
		var detail_pop_window = $('<div>', {'class': 'detail_pop_window'}).css({width: '1284px', height: '452px', overflow: 'auto'}).appendTo(vp);
		var pop_list_wrap = $('<div>', {'class': 'pop_list_wrap'}).css({marginTop: '32px'}).appendTo(detail_pop_window);
		var ul_list = $('<ul>', {'class': 'list'}).appendTo(pop_list_wrap)
		
		function makeList(){
			var li1 = $('<li>').css({marginBottom: '10px', verticalAlign: 'middle', clear: "both", height: '32px', width: '1000px'}).appendTo(ul_list);
			var span_num = $('<span>', {'class':'num'}).css({width: '18px', display: 'block', float: 'left', lineHeight: '30px', marginRight: '14px'}).html(q_num).appendTo(li1);
			var span_txt1 = $('<span>', {'class':'txt1'}).css({width: '136px', display: 'block', float: 'left', lineHeight: '30px', marginRight: '14px'}).appendTo(li1);
			var span_txt1_input = $('<input type="text" name="tbj_word['+q_num+']">').css({width: '100%', height: '30px', lineHeight: '30px', border: 'none'}).appendTo(span_txt1);
			var span_txt2 = $('<span>', {'class':'txt2'}).css({width: '737px', display: 'block', float: 'left', lineHeight: '30px', marginRight: '14px'}).appendTo(li1);
			function makeList2(){
				var idx_input = null;
				if(span_txt2.find('.idx_input').size() > 0){
				}
				else{
					idx_input = $('<input type="hidden" class="idx_input">').val(q_num).appendTo(span_txt2);
				}
				
				var span_txt2_input = $('<input type="text" name="tbj_summary['+span_txt2.find('.idx_input').val()+'][]">').css({width: '100%', height: '30px', lineHeight: '30px', border: 'none'}).appendTo(span_txt2);
				var span_txt3 = $('<span>', {'class':'txt3'}).css({display: 'block', float: 'left', lineHeight: '30px', marginRight: '14px'}).appendTo(li1);
				var span_txt3_btn_plus = $('<a>').css({marginTop: '1px', display: 'block', width: '30px', height: '30px', lineHeight: '25px', backgroundColor: '#1a4459', fontWeight: 'bold', color: '#fff', textAlign: 'center', fontSize: '26px', textDecoration: 'none', cursor: 'pointer'}).html("+").appendTo(span_txt3);
				function makeList3(__this){
					var b_height = parseInt(li1.css('height'));
					li1.css({height: (b_height+32)+'px'});
					$(__this).off('click');
					$(__this).html("-").on('click', function(){
						deleteList();
					});
					makeList2();
				}
				function deleteList(){
					span_txt2_input.remove();
					span_txt3.remove();
					var b_height = parseInt(li1.css('height'));
					li1.css({height: (b_height-32)+'px'});
				}
				
				span_txt3_btn_plus.on('click', function(){
					makeList3(this);
				});
				
				
			}
			makeList2();
			return li1;
			
		}
		makeList();
		
		var ul2 = $('<ul>').css({listStyle: 'none', display: 'block'}).appendTo(pop_list_wrap);
		var li2 = $('<li>').css({marginBottom: '10px', verticalAlign: 'middle'}).appendTo(ul2);
		
		var span2_txt1 = $('<span>', {'class': 'txt1'}).appendTo(li2);
		var span2_txt1_btn_add = $('<a>')
		.css({float: 'left', display: 'block', width: '30px', height: '30px', lineHeight: '25px', backgroundColor: '#1a4459', fontWeight: 'bold', color: '#fff', textAlign: 'center', fontSize: '26px', textDecoration: 'none', cursor: 'pointer'})
		.html("-")
		.appendTo(span2_txt1);
		span2_txt1_btn_add.on('click', function(){
			q_num = $('.list').find('li').size();
			if(q_num == 1){
				alert("더이상 삭제할수 없습니다.");
				return;
			}
			else{
				$('.list').find('li').last().remove();
			}
		});
		
		var span2_txt2_btn_add = $('<a>')
		.css({float: 'left', display: 'block', marginLeft: '10px', width: '30px', height: '30px', lineHeight: '25px', backgroundColor: '#1a4459', fontWeight: 'bold', color: '#fff', textAlign: 'center', fontSize: '26px', textDecoration: 'none', cursor: 'pointer'})
		.html("+")
		.appendTo(span2_txt1);
		span2_txt2_btn_add.on('click', function(){
			q_num = $('.list').find('li').size()+1;
			makeList();
		});
		
		
		var re_cnt = 0;
		$('#wrap').addClass('lectureDisplay');
		var studentForm = $('<div>', {'class': 'studentForm'}).css({verticalAlign: 'middle', font: '', fontSize: '12px'}).appendTo($('#wrap'));
		var box01 = $('<div>', {'class':'box01'}).css({height: 'auto', marginBottom: '10px'}).appendTo(studentForm);
		var topBar = $('<div>', {'class': 'topBar'}).appendTo(box01);
		var a_close = $('<a>', {'class': 'close'}).appendTo(topBar);
		var a_close_img = $('<img>').css({curosr: 'pointer'}).attr({src: '/fs/image/class/teacher/tool_btn_close.gif'}).appendTo(a_close);
		
		
		var formarea_test_now = $('<div>', {'class': 'formArea test_now'}).css({height: 'auto'}).appendTo(box01);
		var temp_div = $('<div>').css({height: '5px', width: '100%'}).appendTo(formarea_test_now);
		var table_edit = $('<table>', {'class':'edit'}).appendTo(formarea_test_now);
		var table_edit_col_group = $('<colgroup>').appendTo(table_edit);
		var col1 = $('<col>').attr({width: '40%'}).appendTo(table_edit_col_group);
		var col2 = $('<col>').attr({width: '60%'}).appendTo(table_edit_col_group);
		
		var tbody = $('<tbody>').appendTo(table_edit);
		
		var tr3 = $('<tr>').appendTo(tbody);
		var tr3_td1 = $('<td>', {'class':'black left'}).html("시간설정(분,초)").appendTo(tr3);
		var tr3_td1 = $('<td>', {'class':'time'}).appendTo(tr3);
		var tr3_td1_select1 = $('<select>').attr({name: 't_minute',id: 't_minute'}).appendTo(tr3_td1);
		for(var i=1;i<=59;i++){
			var option1 = $('<option>').val(i).html(i+"분").appendTo(tr3_td1_select1);
		}
		var tr3_td1_select2 = $('<select>').attr({name: 't_second',id: 't_second'}).appendTo(tr3_td1);
		for(var i=0;i<=59;i++){
			var option1 = $('<option>').val(i).html(i+"초").appendTo(tr3_td1_select2);
		}
		
		var test_start_a = $('<a>').appendTo(formarea_test_now);
		var test_start_a_img = $('<img>', {'id': 'insertTestJs'}).css({cursor: 'pointer'}).attr({src: '/fs/image/class/teacher/test_start.png'}).appendTo(test_start_a);
		
		
		
		var table_etc = $('<table>', {'class': 'etc'}).appendTo(formarea_test_now);
		var table_etc_col_group = $('<colgroup>').appendTo(table_etc);
		var table_etc_col_group_col1 = $('<col>').attr({width: '50%'}).appendTo(table_etc_col_group);
		var table_etc_col_group_col2 = $('<col>').attr({width: '50%'}).appendTo(table_etc_col_group);
		
		var table_etc_thead = $('<thead>').appendTo(table_etc);
		var table_etc_thead_tr = $('<tr>').appendTo(table_etc_thead);
		var table_etc_thead_tr_th1 = $('<th>').html("현재인원").appendTo(table_etc_thead_tr);
		var table_etc_thead_tr_th2 = $('<th>').html("현통과율").appendTo(table_etc_thead_tr);
		var table_etc_tbody = $('<tbody>').appendTo(table_etc);
		var table_etc_tr = $('<tr>').appendTo(table_etc_tbody);
		var table_etc_tr_td1 = $('<td>').html($('#CURRENT_USER').val()+"/"+$('#ALL_USER').val()).appendTo(table_etc_tr);
		var table_etc_tr_td2 = $('<td>').html("0%").appendTo(table_etc_tr);
		
		var table_etc2 = $('<table>', {'class': 'etc'}).appendTo(formarea_test_now);
		var table_etc2_col_group = $('<colgroup>').appendTo(table_etc2);
		var table_etc2_col_group_col1 = $('<col>').attr({width: '50%'}).appendTo(table_etc2_col_group);
		var table_etc2_col_group_col2 = $('<col>').attr({width: '50%'}).appendTo(table_etc2_col_group);
		var table_etc2_thead = $('<thead>').appendTo(table_etc2);
		var table_etc2_thead_tr = $('<tr>').appendTo(table_etc2_thead);
		var table_etc2_thead_tr_th1 = $('<th>').html("통과자").appendTo(table_etc2_thead_tr);
		var table_etc2_thead_tr_th2 = $('<th>').html("재시험횟수").appendTo(table_etc2_thead_tr);
		var table_etc2_tbody = $('<tbody>').appendTo(table_etc2);
		var table_etc2_tr = $('<tr>').appendTo(table_etc2_tbody);
		var table_etc2_tr_td1 = $('<td>').html("0").appendTo(table_etc2_tr);
		var table_etc2_tr_td2 = $('<td>').html(re_cnt).appendTo(table_etc2_tr);
		
		var div_box2 = $('<div>', {'class': 'box02'}).appendTo(studentForm);
		var table_ox = $('<table>', {'class': 'ox'}).appendTo(div_box2);
		var table_ox_col_group = $('<colgroup>').appendTo(table_ox);
		var table_ox_col_group_col1 = $('<col>').attr({width: '33.3%'}).appendTo(table_ox_col_group);
		var table_ox_col_group_col2 = $('<col>').attr({width: '33.3%'}).appendTo(table_ox_col_group);
		var table_ox_col_group_col3 = $('<col>').attr({width: '33.3%'}).appendTo(table_ox_col_group);
		var table_ox_thead = $('<thead>').appendTo(table_ox);
		var table_ox_thead_tr = $('<tr>').appendTo(table_ox_thead);
		var table_ox_thead_tr_th1 = $('<th>').html("O").appendTo(table_ox_thead_tr);
		var table_ox_thead_tr_th2 = $('<th>').html("X").appendTo(table_ox_thead_tr);
		var table_ox_thead_tr_th2 = $('<th>').html("미응시").appendTo(table_ox_thead_tr);
		var table_ox_tbody = $('<tbody>').appendTo(table_ox);
		/*
		var table_ox_tbody_tr1 = $('<tr>').appendTo(table_ox_tbody);
		var table_ox_tbody_tr1_td1 = $('<td>').appendTo(table_ox_tbody_tr1);
		var table_ox_tbody_tr1_td1 = $('<td>').appendTo(table_ox_tbody_tr1);
		*/
		
		
		a_close_img.on('click', function(){
			$('#wrap').empty();
		})
		
		var test_tq_no = null;
		
		function startTest(mode1){
			console.log(mode1);
			var formData = new FormData();
		    formData.append('tbj_subject', title_p_input.val());
		    formData.append('t_minute', tr3_td1_select1.val());
		    formData.append('t_second', tr3_td1_select2.val());
		    formData.append('mode1', mode1);
		    if(mode1 == 'update'){
		    	formData.append('inskey', test_tq_no);
		    }
		    
		    $('.list').find('input').each(function(){
		    	formData.append($(this).attr('name'), $(this).val());
		    });
		    
	        xhr(formData, function(_rs){
	        	var _rs = shine.util.string.json.decode(_rs);
	        	if(_rs.error == API_SUCCESS){
	        		test_tq_no = _rs.data.inskey;
					alert("테스트가 시작되었습니다. 학생 여러분들께서는 노트북을 켜고 홈화면에 있는 시험시작 버튼을 클릭해 주세요.");
					
					var wOpt = {
							size: {w: 620, h: 80},
							pos: {
								mode: false
							},
							border: '2px',
							borderColor: '#d2d2d2',
							boxRadius: '5px',
							boxBgColor: '#fff',
							boxBgImage: '',
							boxShadow : false,
							wrapBgColor: '#d2d2d2',
							wrapOpacity: 1,
							tick: 20,
							effectTerm: 0.06,
							boxId: 'text_js_box',
							wrapId: 'text_js_wrap',
							closeBtn: {
								mode: false,
							},
							wrapClose: false,
					};
					
					var vp = shine.window.showPopup(wOpt);
					
					var min = parseInt(tr3_td1_select1.val());
					var sec = parseInt(tr3_td1_select2.val())
					var time1 =(min*60+sec);
					function makeDigit(num){
						if(num<10){
							return "0"+num;
						}
						else{
							return ""+num;
						}
					}
					var timerBox = $('<div>').css({width:'618px', fontSize: '36px', height: '78px', border: '1px solid #dfdfdf', textAlign: 'center', lineHeight: '78px'})
					.html("시험 종료까지 "+makeDigit(min)+":"+makeDigit(sec)+ " 남았습니다.").appendTo(vp);
					
					
					
					test_interval = setInterval(function(){
						time1--;
						if(time1>=0){
							var t_min = makeDigit(Math.floor(time1/60));
							var t_sec = makeDigit(time1%60);
							timerBox.html("시험 종료까지 "+t_min+":"+t_sec+ " 남았습니다.");
						}
						else{
							clearInterval(test_interval);
							vp.close();
							
							test_start_a_img.off('click');
							test_start_a_img.attr({src: '/fs/image/class/teacher/test_end.png'});
							test_start_a_img.on('click', function(){
								restartTest();
							});
							
							var param_3 = {
									inskey: _rs.data.inskey
							}
							function resultTestJSCallBack(_rs){
								
								if(_rs.error == API_SUCCESS){
									console.log(_rs);
									table_etc2_tr_td2.html(re_cnt);
									$('.testForm').find('input').each(function(){
										$(this).val("");
									});
									var data2 = _rs.data.data1;
									console.log(data2);
									
									var o_list = [];
									var x_list = [];
									var n_list = [];
									function viewStuData(obj1){
										console.log(obj1);
										$('#tbj_subject').val(obj1.tbj_subject);
										function writeStuAns(num,ans1,ans2){
											console.log(ans2);
											$("input[name='tbj_word["+""+num+"]'").val(ans1);
											$("input[name='tbj_summary["+""+num+"][]'").each(function(i){
												console.log(ans2[i])
												$(this).val(ans2[i]);
											})
										}
										for(var a in obj1.tbj_word){
											var tempArr = [];
											console.log(obj1.tbj_summary[""+a]);
											for(var i=0;i<obj1.tbj_summary[""+a].length;i++){
												var stu_ans1 = obj1.tbj_summary[""+a][i];
												tempArr.push(stu_ans1);
												console.log(stu_ans1)
												//$("input[name='tbj_summary["+obj1.tbj_word[a]+"]["+i+"]']").val(stu_ans1);
											}
											writeStuAns(a,obj1.tbj_word[a], tempArr);
										}
									}
									var stu_data = {};
									for(var a in data2){
										stu_data[data2[""+a].user_name] = data2[""+a].tans_data;
										if(data2[""+a].tans_ox=='O'){
											o_list.push(data2[""+a].user_name);
										}
										else if(data2[""+a].tans_ox=='X'){
											x_list.push(data2[""+a].user_name);
										}
										else{
											n_list.push(data2[""+a].user_name);
										}
									}
									console.log(stu_data);
									// 통과자
									table_etc2_tr_td1.html(o_list.length);
									// 현통과율 
									var pass_per = Math.round((parseInt(o_list.length)/parseInt($('#CURRENT_USER').val()))*100);
									if(pass_per == "NaN")pass_per = 0;
									table_etc_tr_td2.html(pass_per+"%");
									var trLength = Math.max(o_list.length, x_list.length, n_list.length);
									table_ox_tbody.empty();
									
									function sendStuData(ele, obj){
										ele.on('click', function(){
											viewStuData(obj);
										})
									}
									
									for(var l=0;l<trLength;l++){
										
										var table_ox_tbody_tr1 = $('<tr>').appendTo(table_ox_tbody);
										var table_ox_tbody_tr1_td1 = $('<td>').appendTo(table_ox_tbody_tr1);
										var table_ox_tbody_tr1_td2 = $('<td>').appendTo(table_ox_tbody_tr1);
										var table_ox_tbody_tr1_td3 = $('<td>').appendTo(table_ox_tbody_tr1);
										if(o_list[l]){
											table_ox_tbody_tr1_td1.css({cursor: 'pointer'}).html(o_list[l]);
											console.log(stu_data[o_list[l]]);
											sendStuData(table_ox_tbody_tr1_td1, stu_data[o_list[l]]);
										}
										if(x_list[l]){
											table_ox_tbody_tr1_td2.css({cursor: 'pointer'}).html(x_list[l]);
											console.log(stu_data[x_list[l]]);
											sendStuData(table_ox_tbody_tr1_td2, stu_data[x_list[l]]);
											
										}
										if(n_list[l]){
											table_ox_tbody_tr1_td3.html(n_list[l]);
											
										}
									}
								}
								else{
									alert("시험에 응시한 학생이 없습니다.");
								}
							}
							requestApi('POST', apiList('resultTestJS'), param_3, resultTestJSCallBack);
						}
					}, 1000);
					
				}
	        });
	        function xhr(data, callback) {
	            var request = new XMLHttpRequest();
	            request.onreadystatechange = function() {
	                if (request.readyState == 4 && request.status == 200) {
	                    callback(request.responseText);
	                }
	            };
	            
	            request.open('POST', location.protocol+"//"+location.host + '/api/async/'+apiList('insertTestJS'));
	            request.send(data);
	        }
	        
	        
			var param = {
					tbj_subject: title_p_input.val(),
				
			};
		}
		
		function restartTest(){
			re_cnt++;
			startTest('update');
			
		}
		
		test_start_a_img.off('click');
		test_start_a_img.on('click', function(){
			startTest('insert');
		});
		
	}
}

