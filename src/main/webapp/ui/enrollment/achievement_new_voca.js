var show_type;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	
	
	show_type = $("#orientation_gubun").val();
	if(!show_type) show_type = "all";
	$("#check_"+show_type).prop("checked", true);
	search_semester();
	form_init();
	
	$("input[name=check_show]").click(function(){
		location.href="./achievement_new_action.do?orientation_code=voca&&course_id="+$("#course_id").val()+"&&orientation_gubun="+$("input[name=check_show]:checked").val();
	});

}); 

function form_init()
{
	var v_today = cfmGetToDate();
	var v_course_date = $("#course_date").val();
	var v_schedule = $("#course_schedule").val();
	
	var arr_schedule = v_schedule.split(",");
	
	var course_first_date = arr_schedule[0];
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveVocaList.do",
		data:{
			course_id : $("#course_id").val()
		},
		success:function(data){
			
			//상단화면을 그려준다.
			create_top_menu(data.sectionList, data.practiceAllList, "voca", "", $("#course_id").val(), data.courseInfo.student_type);
			
			
			var enrollmentList = data.enrollmentList;
			
			var courseInfo = data.courseInfo;
			
			var classCountList = data.classCountList;
			
			var sectionList = data.sectionList;
			
			var practiceList = data.practiceList;

			var scheduleVocaList = data.scheduleVocaList;
			
			var attendList = data.attendList;
			var speechList = data.speechList;
			var resultList = data.resultList;
			var classCountList = data.classCountList;
			
			var nWidth = 100;
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:40px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:40px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			var column_length = 4;
		
			for(var i=arr_schedule.length-1; i>=0; i--)
			{
				var v_date = arr_schedule[i];
				if(v_today < v_date) continue;
				var colspan=1;
				
				if(show_type == "all"){
					colspan=4;
				}
				
				var dayOfWeek = new Date(arr_schedule[i]).getDay();
				if(dayOfWeek == 1){
					vHtml += '			<th class="text-center table-success" colspan="'+colspan+'" style="width:'+(nWidth*colspan)+'px;">'+arr_schedule[i]+'</th>';
				}else{
					vHtml += '			<th class="text-center table-info" colspan="'+colspan+'" style="width:'+(nWidth*colspan)+'px;">'+arr_schedule[i]+'</th>';
				}
				
			}
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			for(var i=arr_schedule.length-1; i>=0; i--)
			{
				var v_date = arr_schedule[i];
				if(v_today < v_date) continue;
				
				var dayOfWeek = new Date(arr_schedule[i]).getDay();
				var a_idx = scheduleVocaList.findIndex(t => t.date == v_date && t.practice_type=="VOCA"); 
				var a_idx1 = scheduleVocaList.findIndex(t => t.date == v_date && t.practice_type=="VOCA_INTERVAL");
				var v_volume = "";
				var v_volume_interval = "";
				if(a_idx >= 0){
					v_volume = scheduleVocaList[a_idx].volume;
				}
				
				if(a_idx1 >= 0){
					v_volume_interval = scheduleVocaList[a_idx1].volume;
				}
				
				if(dayOfWeek == 1){
					if(show_type == "all" || show_type == "attend"){
						vHtml += '			<th class="text-center table-success" style="width:100px;">출결</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "speech"){
						vHtml += '			<th class="text-center table-success" style="width:100px;">발음 '+v_volume+'</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "voca"){
						vHtml += '			<th class="text-center table-success" style="width:100px;">단어 '+v_volume+'</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "voca_interval"){
						vHtml += '			<th class="text-center table-success" style="width:100px;">단어 인터벌 '+v_volume_interval+'</th>';
						column_length++;
					}
				}else{
					if(show_type == "all" || show_type == "attend"){
						vHtml += '			<th class="text-center table-info" style="width:100px;">출결</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "speech"){
						vHtml += '			<th class="text-center table-info" style="width:100px;">발음 '+v_volume+'</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "voca"){
						vHtml += '			<th class="text-center table-info" style="width:100px;">단어 '+v_volume+'</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "voca_interval"){
						vHtml += '			<th class="text-center table-info" style="width:100px;">단어 인터벌 '+v_volume_interval+'</th>';
						column_length++;
					}
				}
				
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			
			for(var i=0; i<enrollmentList.length; i++)
			{
				
				if(enrollmentList[i].class_gubun == "반이동"){
					if(enrollmentList[i].user_first_date == course_first_date){
						continue;
					}
				}
				var course_enrollment_id = enrollmentList[i].course_enrollment_id;
				var student_id = enrollmentList[i].student_id;
				
				var arr_enrollment_schedule = enrollmentList[i].schedule.split(",");
				var first_date = arr_enrollment_schedule[0];
				
				vHtml += '		<tr>';
				vHtml += create_student_info(enrollmentList[i], courseInfo, classCountList);
				for(var j=arr_schedule.length-1; j>=0; j--)
				{
					
					var v_date = arr_schedule[j];
					if(v_today < v_date) continue;
					
					//모두 빈칸으로 체크할경우
					var isPaid = true;
					var isMove  = false;
					var isFirst = false;
					var isMiddle = false;
					var isEmpty = false;
					if(enrollmentList[i].class_gubun == "반이동"){
						if(v_date >= enrollmentList[i].move_date)
						{
							isPaid = false;
							isEmpty = true;
						}else if(v_date < first_date){
							isPaid = false;
							isMiddle = true;
						}else if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
							isPaid = false;
							isEmpty = true;
						}
					}else if(enrollmentList[i].class_gubun == "환불"){
						if(v_date >= enrollmentList[i].refund_date)
						{
							if(v_date >= enrollmentList[i].move_date)
							{
								isPaid = false;
								isEmpty = true;
							}else if(v_date < first_date){
								isPaid = false;
								isMiddle = true;
							}else if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
								isPaid = false;
								isEmpty = true;
							}
						}					
					}else{
						if(v_date < enrollmentList[i].move_date)
						{
							isPaid = false;
							isMove = true;
						}else if(v_date < first_date){
							isPaid = false;
							isFirst = true;
						}else if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
							isPaid = false;
							isEmpty = true;
						}
					}
					//출결
					if(isPaid){
						if(show_type == "all" || show_type == "attend"){
							var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
							if(t_idx >= 0){
								var v_status = attendList[t_idx].status;
								if(v_status == "REGULAR_ATTENDED")
								{
									vHtml += '			<td class="show_attend bg-green text-center" style="width:100px;">O('+attendList[t_idx].timem+')</td>';
								}else{
									if(v_date == first_date)
									{
										vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">OT진행</td>';
									}else{
										if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
											vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">지각('+attendList[t_idx].timem+')</td>';
										}else{
											if(attendList[t_idx].attendance_reason_type){
												vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">일반결석</td>';
											}else{
												vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">무단결석</td>';
											}
										}
									}
								} 
							}
						}
						var a_idx = scheduleVocaList.findIndex(t => t.date == v_date && t.practice_type=="VOCA"); 
						var a_idx1 = scheduleVocaList.findIndex(t => t.date == v_date && t.practice_type=="VOCA_INTERVAL"); 
						if(a_idx >= 0 || a_idx1 >= 0){
							if(show_type == "all" || show_type == "speech"){
								var s_idx1 = speechList.findIndex(t => t.date == v_date && t.student_id == student_id && t.book=="toefl");
								var s_idx2 = speechList.findIndex(t => t.date == v_date && t.student_id == student_id && t.book=="basic");
								if(s_idx1 >= 0){
									if(speechList[s_idx1].pass_result){
										vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
										vHtml += '<input type="hidden" id="section" value="VOCA">';
										vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
										vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
										vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
										vHtml += cfmLpad(speechList[s_idx1].score+"",3," ");
										vHtml += '</td>';
									}else{
										if(s_idx2 >= 0){
											if(speechList[s_idx2].pass_result){
												vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(speechList[s_idx2].score+"",3," ");
												vHtml += '(중고등)</td>';
											}else{
												vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(speechList[s_idx2].score+"",3," ");
												vHtml += '(중고등)</td>';
											}
										}else{
											vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(speechList[s_idx1].score+"",3," ");
											vHtml += '</td>';
										}
									}
								}else{
									if(s_idx2 >= 0){
										if(speechList[s_idx2].pass_result){
											vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(speechList[s_idx2].score+"",3," ");
											vHtml += '(중고등)</td>';
										}else{
											vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(speechList[s_idx2].score+"",3," ");
											vHtml += '(중고등)</td>';
										}
									}else{
										vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
									}
								}
							}
							if(show_type == "all" || show_type == "voca"){
								var v_idx1 = resultList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id && t.practice_type=="VOCA" && t.book=="toefl");
								var v_idx2 = resultList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id && t.practice_type=="VOCA" && t.book=="basic");
								if(v_idx1 >= 0){
									//통과했을경우(토플)
									if(resultList[v_idx1].pass_result){
										if(resultList[v_idx1].out_pass_result){
											vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
											vHtml += '(시간외)</td>';
										}else{
											vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
											vHtml += '</td>';
										}
									//실패(토플)
									}else{
										//성공(토플) - 자기기록
										if(resultList[v_idx1].user_pass_result){
											if(resultList[v_idx1].out_pass_result){
												vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
												vHtml += '(시간외)</td>';
											}else{
												vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
												vHtml += '</td>';
											}
										//실패(토플)
										}else{
											if(v_idx2 >= 0){
												//성공(주니어)
												if(resultList[v_idx2].pass_result){
													//성공(주니어)시간외
													if(resultList[v_idx2].out_pass_result){
														vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
														vHtml += '<input type="hidden" id="section" value="VOCA">';
														vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
														vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
														vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
														vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
														vHtml += '(중고등-시간외)</td>';
													//성공(주니어)
													}else{
														vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
														vHtml += '<input type="hidden" id="section" value="VOCA">';
														vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
														vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
														vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
														vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
														vHtml += '(중고등)</td>';
													}
												//실패(주니어)
												}else{
													if(resultList[v_idx2].user_pass_result){
														//성공(주니어)시간외
														if(resultList[v_idx2].out_pass_result){
															vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
															vHtml += '<input type="hidden" id="section" value="VOCA">';
															vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
															vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
															vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
															vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
															vHtml += '(중고등-시간외)</td>';
														}else{
															vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
															vHtml += '<input type="hidden" id="section" value="VOCA">';
															vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
															vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
															vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
															vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
															vHtml += '(중고등)</td>';
														}
													}
												}
											}else{
												vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
												vHtml += '</td>';
											}									
										}
		
									}
								}else{
									if(v_idx2 >= 0){
										//성공(주니어)
										if(resultList[v_idx2].pass_result){
											//성공(주니어)시간외
											if(resultList[v_idx2].out_pass_result){
												vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
												vHtml += '(중고등-시간외)</td>';
											//성공(주니어)
											}else{
												vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
												vHtml += '(중고등)</td>';
											}
										//실패(주니어)
										}else{
											if(resultList[v_idx2].user_pass_result){
												//성공(주니어)시간외
												if(resultList[v_idx2].out_pass_result){
													vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
													vHtml += '<input type="hidden" id="section" value="VOCA">';
													vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
													vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
													vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
													vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
													vHtml += '(중고등-시간외)</td>';
												}else{
													vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
													vHtml += '<input type="hidden" id="section" value="VOCA">';
													vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
													vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
													vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
													vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
													vHtml += '(중고등)</td>';
												}
											}else{
												vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
												vHtml += '(중고등)</td>';
											}
										}
									}else{
										vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
									}
								}
							}
							
							if(show_type == "all" || show_type == "voca_interval"){
								
								var v_idx1 = resultList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id && t.practice_type=="VOCA_INTERVAL" && t.book=="toefl");
								var v_idx2 = resultList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id && t.practice_type=="VOCA_INTERVAL" && t.book=="basic");
								if(v_idx1 >= 0){
									//통과했을경우(토플)
									if(resultList[v_idx1].pass_result){
										if(resultList[v_idx1].out_pass_result){
											vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(resultList[v_idx1].score+"",3," ")+"/"+cfmLpad(resultList[v_idx1].total_score+"",3," ")+"실시";
											vHtml += '(시간외)</td>';
										}else{
											vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(resultList[v_idx1].score+"",3," ")+"/"+cfmLpad(resultList[v_idx1].total_score+"",3," ")+"실시";
											vHtml += '</td>';
										}
									//실패(토플)
									}else{
										
										//성공(토플) - 자기기록
										if(resultList[v_idx1].user_pass_result){
											if(resultList[v_idx1].out_pass_result){
												vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx1].score+"",3," ")+"/"+cfmLpad(resultList[v_idx1].total_score+"",3," ")+"실시";
												vHtml += '(시간외)</td>';
											}else{
												vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx1].score+"",3," ")+"/"+cfmLpad(resultList[v_idx1].total_score+"",3," ")+"실시";
												vHtml += '</td>';
											}
										//실패(토플)
										}else{
											if(v_idx2 >= 0){
												
												//성공(주니어)
												if(resultList[v_idx2].pass_result){
													//성공(주니어)시간외
													if(resultList[v_idx2].out_pass_result){
														vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
														vHtml += '<input type="hidden" id="section" value="VOCA">';
														vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
														vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
														vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
														vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
														vHtml += '(중고등-시간외)</td>';
													//성공(주니어)
													}else{
														vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
														vHtml += '<input type="hidden" id="section" value="VOCA">';
														vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
														vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
														vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
														vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
														vHtml += '(중고등)</td>';
													}
												//실패(주니어)
												}else{
													if(resultList[v_idx2].user_pass_result){
														//성공(주니어)시간외
														if(resultList[v_idx2].out_pass_result){
															vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
															vHtml += '<input type="hidden" id="section" value="VOCA">';
															vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
															vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
															vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
															vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
															vHtml += '(중고등-시간외)</td>';
														}else{
															vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
															vHtml += '<input type="hidden" id="section" value="VOCA">';
															vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
															vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
															vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
															vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
															vHtml += '(중고등)</td>';
														}
													}else{
														vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
														vHtml += '<input type="hidden" id="section" value="VOCA">';
														vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
														vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
														vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
														vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
														vHtml += '</td>';
													}
												}
												
											}else{
												vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx1].score+"",3," ")+"/"+cfmLpad(resultList[v_idx1].total_score+"",3," ")+"실시";
												vHtml += '</td>';
											}									
										}
										
		
									}
								}else{
									if(v_idx2 >= 0){
										//성공(주니어)
										if(resultList[v_idx2].pass_result){
											//성공(주니어)시간외
											if(resultList[v_idx2].out_pass_result){
												vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
												vHtml += '(중고등-시간외)</td>';
											//성공(주니어)
											}else{
												vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
												vHtml += '(중고등)</td>';
											}
										//실패(주니어)
										}else{
											if(resultList[v_idx2].user_pass_result){
												//성공(주니어)시간외
												if(resultList[v_idx2].out_pass_result){
													vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
													vHtml += '<input type="hidden" id="section" value="VOCA">';
													vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
													vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
													vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
													vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
													vHtml += '(중고등-시간외)</td>';
												}else{
													vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
													vHtml += '<input type="hidden" id="section" value="VOCA">';
													vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
													vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
													vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
													vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
													vHtml += '(중고등)</td>';
												}
											}else{
												vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
												vHtml += '(중고등)</td>';
											}
										}
									}else{
										vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
									}
								}
							}
						}else{
							if(show_type == "all" || show_type == "speech"){
								vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
							}
							
							if(show_type == "all" || show_type == "voca"){
								vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
							}
							
							if(show_type == "all" || show_type == "voca_interval"){
								vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
							}
						}
					}else{
						if(show_type == "all" || show_type == "attend"){
							vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
						}
						if(show_type == "all" || show_type == "speech"){
							vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
						}
						if(show_type == "all" || show_type == "voca"){
							vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
						}
						if(show_type == "all" || show_type == "voca_interval"){
							vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
						}
					}
				}
				vHtml += '		</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';			
			$("#table_info").html(vHtml);
			
			$(".click_practice").click(function(e){
				var v_section = $(this).find("#section").val();	
				var v_practice_type = $(this).find("#practice_type").val();
				var v_course_enrollment_id = $(this).find("#course_enrollment_id").val();
				var v_date = $(this).find("#date").val();
				move_result(v_section, v_practice_type,v_course_enrollment_id, v_date, "", "", "", "", 0);
			});
			
			var array_column_def = Array();
			var objColumnDef = new Object();
			objColumnDef.targets = 0;
			objColumnDef.orderable = false;
			array_column_def.push(objColumnDef);
			for(var i=1; i<column_length; i++)
			{
				var objColumn = new Object();
				objColumn.targets = i;
				objColumn.orderData = [0, i];
				array_column_def.push(objColumn);
			}
			oTable = $('#example').DataTable( {
				//"columnDefs": array_column_def,
				orderFixed : [ 0, 'asc' ],
		        searching: false,
		        info:false,
		        scrollY:        '60vh',
		        scrollX:        true,
		        scrollCollapse: true,
		        paging:         false,
		        fixedColumns:   {
		            leftColumns: 4
		        }
		    } );
			$("#example tbody tr td").css("padding","0px");
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth)
{
	if(isMove){
		return '<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
	}
	if(isFirst){
		return '<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
	}
	if(isMiddle){
		return '<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
	}
	if(isEmpty){
		return '<td class="text-center" style="width:'+nWidth+'px;"></td>';
	}
}

function createAttendance(course_enrollment_id, attendList, v_date, first_date)
{
	var vHtml= "";
	var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
	if(t_idx >= 0){
		var v_status = attendList[t_idx].status;
		if(v_status == "REGULAR_ATTENDED")
		{
			vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
		}else{
			if(v_date == first_date)
			{
				vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">OT진행</td>';
			}else{
				if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
					vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">지각('+attendList[t_idx].timem+')</td>';
				}else{
					if(attendList[t_idx].attendance_reason_type){
						vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">일반결석</td>';
					}else{
						vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">무단결석</td>';
					}
				}
			}
		} 
	}
	
	return vHtml;
}