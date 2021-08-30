var testBK = {
	openWindow: function(){
		var _this = this;
		
		var wOpt = {
				size: {w: 320, h: 50},
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
				wrapOpacity: 0.6,
				tick: 20,
				effectTerm: 0.06,
				boxId: 'text_bk_box',
				wrapId: 'oriImgWrap',
				closeBtn: {
					mode: false,
				},
				wrapClose: true,
		};
		
		var vp = shine.window.showPopup(wOpt);
		$('.test_list').hide();
		
		var select = $('<select>').css({position: 'absolute', borderColor: '#d2d2d2', left: '12px', top: '12px', width: '220px', height: '25px'}).appendTo(vp);
		
		var btn_send = $('<input type="button">').css({backgroundColor: '#efefef', cursor: 'pointer', width: '60px', height: '25px', position: 'relative', left: '246px', top: '11px', fontSize: '12px', lineHeight: '12px'}).val("전송").appendTo(vp);
		
		
		for(var i=1;i<=5;i++){
			var opti = $('<option>').val(i).html(i+"일차").appendTo(select);
			
			
		}
		btn_send.on('click', function(){
			vp.close();
			testBK.showBK(select.val());
			
			
			
		});
			
		
		
		
	},
	showBK: function(day1){
		
		
		var _this = this;
		
		var q_num= 1;
		
		$('.test_list').hide();
		$('#wrap').empty();
		var div_wrap = $('<div>', {'class': 'testForm'}).css({float: 'left', width: '1302px', height: '640px',backgroundColor: 'rgba(89,133,154,0.8)', position: 'relative'}).appendTo($('#wrap'));
		var vp = div_wrap;
		div_wrap.css({paddingLeft: '155px', paddingTop: '30px'});
		
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
				
		a_close_img.on('click', function(){
			$('#wrap').empty();
		})
		
		var test_tq_no = null;
		
		function startTest(mode1){
			console.log(mode1);
			var formData = new FormData();
		    formData.append('day1', day1);
		    formData.append('t_minute', tr3_td1_select1.val());
		    formData.append('t_second', tr3_td1_select2.val());
		    
	        xhr(formData, function(_rs){
	        	var _rs = shine.util.string.json.decode(_rs);
	        	if(_rs.error == API_SUCCESS){
	        		console.log(_rs.data)
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
							//alert(test_tq_no)
							var param_3 = {
									inskey: test_tq_no
							}
							function resultTestBKCallBack(_rs){
								
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
									
									
									for(var l=0;l<trLength;l++){
										
										var table_ox_tbody_tr1 = $('<tr>').appendTo(table_ox_tbody);
										var table_ox_tbody_tr1_td1 = $('<td>').appendTo(table_ox_tbody_tr1);
										var table_ox_tbody_tr1_td2 = $('<td>').appendTo(table_ox_tbody_tr1);
										var table_ox_tbody_tr1_td3 = $('<td>').appendTo(table_ox_tbody_tr1);
										if(o_list[l]){
											table_ox_tbody_tr1_td1.css({cursor: 'pointer'}).html(o_list[l]);
											sendStuData(table_ox_tbody_tr1_td1, stu_data[o_list[l]]);
										}
										if(x_list[l]){
											table_ox_tbody_tr1_td2.css({cursor: 'pointer'}).html(x_list[l]);
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
							requestApi('POST', apiList('resultTestBK'), param_3, resultTestBKCallBack);
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
	            
	            request.open('POST', location.protocol+"//"+location.host + '/api/async/'+apiList('insertTestBK'));
	            request.send(data);
	        }
	        
	        
			
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