/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	form_init();
});

function select_date()
{
	$("#modal-select-date").modal();
}

function create_schedule(v_array_schedule)
{
	var vHtml = "";
	var l_last  = v_array_schedule.length - 1;
	var f_month = v_array_schedule[0].substring(0,7);
	var l_month = v_array_schedule[l_last].substring(0,7);
	$("#div_modal_select_date").removeClass("modal-lg");
	if(f_month != l_month){
		$("#div_modal_select_date").addClass("modal-lg");
		vHtml += '<div class="col-6">';
		vHtml += create_calendar(l_month, v_array_schedule);
		vHtml += '</div>';
		vHtml += '<div class="col-6">';
		vHtml += create_calendar(f_month, v_array_schedule);
		vHtml += '</div>';
	}else{
		vHtml += '<div class="col-12">';
		vHtml += create_calendar(f_month, v_array_schedule);
		vHtml += '</div>';
	}
	$("#div_select_calendar").html(vHtml);
	
	$(".select_date").click(function(){
		var v_acheive_date = $(this).find("input[name='acheive_date']").val();
		location.href = "./achievement_new_action.do?orientation_code=all&&course_id="+$("#course_id").val()+"&&date="+v_acheive_date;
	});
}
function create_calendar(v_year_month, v_array_schedule)
{
	var array_year_month = v_year_month.split("-");
	var v_year  = array_year_month[0];
	var v_month = array_year_month[1];
	var toYear  = parseInt(v_year);
	var toMonth = parseInt(v_month)-1;
	var firstDate = new Date(toYear, toMonth,1);
	var lastDate = new Date(toYear, toMonth+1,0);
	var day = firstDate.getDay();
	var week = 7;
	
	var leftDays = 7; // setDays 와 반비례 
	var setDays = 1;// leftDays 와 반비례 
	var vHtml = "";
	vHtml += '<h4 class="text-center">'+v_year+'년 '+v_month+'월</h4>';
	vHtml += '<table style="width:100%;">';
	vHtml += '	<colgroup>';
	vHtml += '		<col style="width:calc(100%/7);" />';
	vHtml += '		<col style="width:calc(100%/7);" />';
	vHtml += '		<col style="width:calc(100%/7);" />';
	vHtml += '		<col style="width:calc(100%/7);" />';
	vHtml += '		<col style="width:calc(100%/7);" />';
	vHtml += '		<col style="width:calc(100%/7);" />';
	vHtml += '		<col style="width:calc(100%/7);" />';
	vHtml += '	</colgroup>';
	vHtml += '	<tr>';
	vHtml += '		<td class="text-danger text-center p-md-3 p-2"><h4>일</h4></td>';
	vHtml += '		<td class="text-center p-md-2 p-2"><h4>월</h4></td>';
	vHtml += '		<td class="text-center p-md-2 p-2"><h4>화</h4></td>';
	vHtml += '		<td class="text-center p-md-2 p-2"><h4>수</h4></td>';
	vHtml += '		<td class="text-center p-md-2 p-2"><h4>목</h4></td>';
	vHtml += '		<td class="text-center p-md-2 p-2"><h4>금</h4></td>';
	vHtml += '		<td class="text-primary text-center p-2"><h4>토</h4></td>';
	vHtml += '	</tr>';
	for(i = 1; i < week; i++){
		vHtml += '<tr>';
		while(day != 0){
			vHtml += '<td><div class="border p-md-2 p-2"><h4>&nbsp;</h4></div></td>';
			day -= 1;
			leftDays -= 1;
		} // 1주
		while(leftDays != 0){
			if(setDays > lastDate.getDate()){
				vHtml += '<td><div class="border p-md-2 p-2"><h4>&nbsp;</h4></div></td>';
				leftDays -= 1;
			}else{
				var v_date = v_year_month;
				if(setDays < 10){
					v_date += "-0"+setDays;
				}else{
					v_date += "-"+setDays;
				}
				var v_class = "";
				if(leftDays == 7){
					v_class = "text-danger";
				}
				if(leftDays == 1){
					v_class = "text-primary";
				}
				
				var v_div_style = "";
				var v_div_color = "";
				var v_div_input = "";
				var v_idx = v_array_schedule.indexOf(v_date);
				if(v_idx >= 0){
					v_div_style = "cursor:pointer;";
					v_div_color = "select_date bg-primary";
					v_div_input += '<input type="hidden" name="acheive_date" value="'+v_date+'">';
				}
				vHtml += '<td class="'+v_class+' text-center">';
				vHtml += '	<div class="'+v_div_color+' border p-md-2 p-2" style="'+v_div_style+'">';
				vHtml += v_div_input;
				vHtml += '		<h4>'+setDays+'</h4>';
				vHtml += '	</div>';
				vHtml += '</td>';
				setDays +=1;
				leftDays -= 1;
			}
		}
		leftDays = 7;
		vHtml += '</tr>';
	}
	vHtml += '</table>';
	return vHtml;
}

function form_init()
{
	var v_today = cfmGetToDate();
	var v_course_date = $("#course_date").val();
	var v_schedule = $("#course_schedule").val();
	
	var arr_schedule = v_schedule.split(",");
	var course_first_date = arr_schedule[0];
	var array_schedule = Array();
	if(!v_course_date){
		var v_date = "";
		for(var i=arr_schedule.length-1; i>=0; i--)
		{
			if(arr_schedule[i] > v_today) continue;
			v_date = arr_schedule[i];
			break;
		}
		v_course_date = v_date;
	}
	
	for(var i=arr_schedule.length-1; i>=0; i--)
	{
		if(arr_schedule[i] > v_today) continue;
		
		array_schedule.push(arr_schedule[i]);
	}
	create_schedule(array_schedule);
	/*
	var vHtml = "";
	for(var i=arr_schedule.length-1; i>=0; i--)
	{
		if(arr_schedule[i] > v_today) continue;
		
		var selected = "";
		if(v_course_date == arr_schedule[i] ) selected = "selected"; 
		//break;
		vHtml += '<option value="'+arr_schedule[i]+'" '+selected+'>'+arr_schedule[i]+'</option>';
	}
	
	$("#search_course_date").html(vHtml);
	*/
	$("#search_course_date").val(v_course_date);
	
	/*
	$('#search_course_date').change(function(e){
		location.href = "./achievement_new_action.do?orientation_code=all&&course_id="+$("#course_id").val()+"&&date="+$("#search_course_date").val();
	});
	*/
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveAllList.do",
		data:{
			course_id : $("#course_id").val(),
			date : $("#search_course_date").val()
		},
		success:function(data){
			var v_date = $("#search_course_date").val();
			//상단화면을 그려준다.
			create_top_menu(data.sectionList, data.practiceAllList, "all", "", $("#course_id").val(), data.courseInfo.student_type);
			
			
			var enrollmentList = data.enrollmentList;
			
			var courseInfo = data.courseInfo;
			
			var classCountList = data.classCountList;
			
			var sectionList = data.sectionList;
			
			var practiceList = data.practiceList;

			var scheduleVocaList = data.scheduleVocaList;
			var scheduleList = data.scheduleList;
			
			var attendList = data.attendList;
			var speechList = data.speechList;
			var resultList = data.resultList;
			var classCountList = data.classCountList;
			
			var sendList = data.sendList;
			var nWidth = 100;
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="3" style="width:40px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="3" style="width:40px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="3" style="width:80px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="3" style="width:80px;">기존/신규</th>';
			var fix_colume = 4;
			var column_length = 3;
			if(courseInfo.student_type == "JUNIOR"){
				vHtml += '			<th class="text-center table-info" rowspan="3" style="width:100px;">성취표 발송</th>';
				column_length = 4;
				fix_colume = 5;
			}
			var sHtml = "";
			var pHtml = "";
			var aHtml = "";
			
			var v_head_class = "table-info";
			var dayOfWeek = new Date($("#search_course_date").val()).getDay();
			if(dayOfWeek == 1) v_head_class = "table-success";
			
			vHtml += '			<th class="text-center '+v_head_class+'" rowspan="3" style="width:'+nWidth+'px;">출결</th>';
			column_length++;
			
			//발음/단어 체크
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
			sHtml += '			<th class="text-center '+v_head_class+'" colspan="3" style="width:'+(nWidth*2)+'px;">VOCA</th>';
			pHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">발음</th>';
			pHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">단어</th>';
			pHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">단어 인터벌</th>';
			aHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">'+v_volume+'</th>';
			aHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">'+v_volume+'</th>';
			aHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">'+v_volume_interval+'</th>';
			
			//세션별 가져오기.
			for(var j=0;j<sectionList.length; j++)
			{
				if(sectionList[j].section == "VOCA") continue;
				var v_section =  sectionList[j].section;
				var nSectionCount = 0;
				
				var a_practice_type_list = practiceList.filter(function(item, index){
					if(item.section == v_section && item.date == v_date){
						return true;
					}
				});
				
				if(a_practice_type_list.length == 0) continue;
				
				for(var k=0; k<a_practice_type_list.length; k++)
				{
					var v_practice_type = a_practice_type_list[k].practice_type;
					var v_practice_name = a_practice_type_list[k].practice_name;
					var v_paragraph_use = a_practice_type_list[k].paragraph_use;
					var a_schedule_list = scheduleList.filter(function(item, index){
						if(item.section == v_section && item.practice_type == v_practice_type  && item.date == v_date){
							return true;
						}
					});
					if(a_schedule_list.length > 0){
						var nScheduleCount = a_schedule_list.length;
						nSectionCount += nScheduleCount;
						pHtml += '			<th class="text-center '+v_head_class+'" colspan="'+nScheduleCount+'" style="width:'+(nWidth*nScheduleCount)+'px;">'+v_practice_name+'</th>';
						
						for(var a=0; a<nScheduleCount; a++)
						{
							var v_title = '';
							if(a_schedule_list[a].book == "암기시험"){
								if(a_schedule_list[a].article){
									v_title += ' '+a_schedule_list[a].article;
								}
								if(a_schedule_list[a].short_title){
									v_title += ': '+a_schedule_list[a].short_title;
								}
							}else{
								v_title += a_schedule_list[a].book;
								
								if(a_schedule_list[a].volume){
									v_title += ' '+a_schedule_list[a].volume;
								}
								
								if(a_schedule_list[a].group){
									v_title += ' '+a_schedule_list[a].group;
								}
							
								if(a_schedule_list[a].article){
									v_title += ' '+a_schedule_list[a].article;
								}
								if(a_schedule_list[a].end_paragraph > 0 && v_paragraph_use == "Y"){
									v_title += ' '+a_schedule_list[a].end_paragraph+'문단';
								}
							}
							
							aHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">'+v_title+'</th>';
							column_length++;
						}
						
					}else{
						nSectionCount++;
						column_length++;
						pHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">'+v_practice_name+'</th>';
						aHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">&nbsp;</th>';
					}
					
				}
				
				sHtml += '			<th class="text-center '+v_head_class+'" colspan="'+nSectionCount+'" style="width:'+(nWidth*nSectionCount)+'px;">'+v_section+'</th>';
			}
			
			vHtml += sHtml;
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += pHtml;
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += aHtml;
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
				vHtml += create_student_info_achieve(enrollmentList[i], courseInfo, classCountList, $("#search_course_date").val());
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
				if(courseInfo.student_type == "JUNIOR"){
					if(isPaid){
						var l_idx = sendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
						if(l_idx >= 0){
							vHtml += '<td class="text-center" style="width:100px;">O&nbsp;&nbsp;';
							vHtml += '<button type="button" class="btn btn-inverse btn-xs" style="margin-right:5px;" onclick="sendAchieve('+course_enrollment_id+',\''+enrollmentList[i].last_name+enrollmentList[i].first_name+'\',\''+enrollmentList[i].tel_emergency_number+'\',\''+v_date+'\')">성취표 발송</button><br>';
							vHtml += '&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" style="margin-right:5px;" onclick="showAchieve('+course_enrollment_id+',\''+v_date+'\')">성취표 보기</button>';
							vHtml += '</td>';
						}else{
							vHtml += '<td class="text-center bg-grey-darker" style="width:100px;">X&nbsp;&nbsp;';
							vHtml += '<button type="button" class="btn btn-inverse btn-xs" style="margin-right:5px;" onclick="sendAchieve('+course_enrollment_id+',\''+enrollmentList[i].last_name+enrollmentList[i].first_name+'\',\''+enrollmentList[i].tel_emergency_number+'\',\''+v_date+'\')">성취표 발송</button><br>';
							//vHtml += '&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" style="margin-right:5px;" onclick="showAchieve('+course_enrollment_id+',\''+v_date+'\')">성취표 보기</button>';
							vHtml += '</td>';
						}
					}else{
						vHtml += '<td class="text-center" style="width:100px;">&nbsp;</td>';
					}
					
				}

				//출결
				if(isPaid){
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
					var a_idx = scheduleVocaList.findIndex(t => t.date == v_date); 
					var a_idx1 = scheduleVocaList.findIndex(t => t.date == v_date && t.practice_type=="VOCA_INTERVAL"); 
					if(a_idx >= 0 || a_idx1 >= 0){
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
									vHtml += '('+resultList[v_idx1].timem+')</td>';
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
										vHtml += '('+resultList[v_idx1].timem+')</td>';
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
												vHtml += '(중고등-'+resultList[v_idx2].timem+')</td>';
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
													vHtml += '(중고등-'+resultList[v_idx2].timem+')</td>';
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
										vHtml += '(중고등-'+resultList[v_idx2].timem+')</td>';
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
											vHtml += '(중고등-'+resultList[v_idx2].timem+')</td>';
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
									vHtml += '('+resultList[v_idx1].timem+')</td>';
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
										vHtml += '('+resultList[v_idx1].timem+')</td>';
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
												vHtml += '(중고등-'+resultList[v_idx2].timem+')</td>';
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
													vHtml += '(중고등-'+resultList[v_idx2].timem+')</td>';
												}else{
													vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
													vHtml += '<input type="hidden" id="section" value="VOCA">';
													vHtml += '<input type="hidden" id="practice_type" value="VOCA_INTERVAL">';
													vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
													vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
													vHtml += cfmLpad(resultList[v_idx2].score+"",3," ")+"/"+cfmLpad(resultList[v_idx2].total_score+"",3," ")+"실시";
													vHtml += '(중고등)</td>';
												}
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
										vHtml += '(중고등-'+resultList[v_idx2].timem+')</td>';
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
											vHtml += '(중고등-'+resultList[v_idx2].timem+')</td>';
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
						
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
					}
				}else{
					vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
					vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
					vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
					vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
				}
				
				for(var j=0;j<sectionList.length; j++)
				{
					if(sectionList[j].section == "VOCA") continue;
					var v_section =  sectionList[j].section;
					var a_practice_type_list = practiceList.filter(function(item, index){
						if(item.section == v_section && item.date == v_date){
							return true;
						}
					});
					
					if(a_practice_type_list.length == 0) continue;
					
					for(var k=0; k<a_practice_type_list.length; k++)
					{
						var v_practice_type = a_practice_type_list[k].practice_type;
						var v_practice_name = a_practice_type_list[k].practice_name;
						var v_paragraph_use = a_practice_type_list[k].paragraph_use;
						var v_program_use   = a_practice_type_list[k].program_use;
						var a_schedule_list = scheduleList.filter(function(item, index){
							if(item.section == v_section && item.practice_type == v_practice_type  && item.date == v_date){
								return true;
							}
						});
						if(a_schedule_list.length > 0){
							for(var a=0; a<a_schedule_list.length; a++)
							{
								if(isPaid){
									var v_section = a_schedule_list[a].section;
									var v_practice_type = a_schedule_list[a].practice_type;
									var v_book = a_schedule_list[a].book;
									var v_volume = a_schedule_list[a].volume;
									var v_group = a_schedule_list[a].group;
									var v_article = a_schedule_list[a].article;
									var v_end_paragraph = a_schedule_list[a].end_paragraph;

									var objPractice = Object();
									objPractice.section = v_section;
									objPractice.practice_type = v_practice_type;
									objPractice.book = v_book;
									objPractice.volume = v_volume;
									objPractice.group = v_group;
									objPractice.article = v_article;
									objPractice.end_paragraph = v_end_paragraph;
									objPractice.date = v_date;
									
									var r_idx1;
									var r_idx2;
									
									if(v_paragraph_use == "Y"){
										r_idx1 = resultList.findIndex(t => t.section == v_section 
												&& t.practice_type == v_practice_type
												&& t.date == v_date
												&& t.course_enrollment_id == course_enrollment_id
												&& t.book == v_book
												&& t.volume == v_volume
												&& t.group == v_group
												&& t.article == v_article
												&& t.paragraph == v_end_paragraph
												&& t.pass_result == true); 
										r_idx2 = resultList.findIndex(t => t.section == v_section 
												&& t.practice_type == v_practice_type
												&& t.date == v_date
												&& t.course_enrollment_id == course_enrollment_id
												&& t.book == v_book
												&& t.volume == v_volume
												&& t.group == v_group
												&& t.article == v_article
												&& t.paragraph == v_end_paragraph
												&& t.pass_result == false); 
									}else{
										r_idx1 = resultList.findIndex(t => t.section == v_section 
												&& t.practice_type == v_practice_type
												&& t.date == v_date
												&& t.course_enrollment_id == course_enrollment_id
												&& t.book == v_book
												&& t.volume == v_volume
												&& t.group == v_group
												&& t.article == v_article
												&& t.pass_result == true); 
										r_idx2 = resultList.findIndex(t => t.section == v_section 
												&& t.practice_type == v_practice_type
												&& t.date == v_date
												&& t.course_enrollment_id == course_enrollment_id
												&& t.book == v_book
												&& t.volume == v_volume
												&& t.group == v_group
												&& t.article == v_article
												&& t.pass_result == false); 
									}
									if(r_idx1 >=0){
										var class_bg = "bg-green";
										var score;
										if(v_program_use == "Y"){
											if(v_section== "GRAMMAR" && v_practice_type == "MOCK_TEST"){
												var score1 = cfmLpad(resultList[r_idx1].score1+"",3," ");
												var score2 = cfmLpad(resultList[r_idx1].score2+"",3," ");
												var total_score1 = resultList[r_idx1].total_score1;
												var total_score2 = resultList[r_idx1].total_score2;
												score = "SW1:"+ score1+"/"+total_score1+" SW2:"+score2+"/"+total_score2;
											}else if(v_practice_type == "TENTIMES"){
												var score  = cfmLpad(resultList[r_idx1].score+"",3," ");
												var score1 = cfmLpad(resultList[r_idx1].score1+"",3," ");
												var score2 = cfmLpad(resultList[r_idx1].score2+"",3," ");
												var total_score1 = resultList[r_idx1].total_score1;
												var total_score2 = resultList[r_idx1].total_score2;
												score = score1+"회/"+total_score1+"회"+score+"%";
												
											}else{
												var score1 = cfmLpad(resultList[r_idx1].score+"",3," ");
												var total_score1 = resultList[r_idx1].total_score;
												score = score1+"/"+total_score1;
											}
										}else{
											score = "O";
										}
										if(resultList[r_idx1].out_pass_result){
											class_bg = "bg-yellow";
											score += '('+resultList[r_idx1].timem+')';
										}
										
										vHtml += '<td class="click_practice '+class_bg+' text-center" style="width:'+nWidth+'px;cursor:pointer;">';
										vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
										vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
										vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
										vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
										vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
										vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
										vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
										vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
										vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
										vHtml += score;
										vHtml += '</td>';
										
									}else{
										if(r_idx2 >=0){
											var score;
											if(v_program_use == "Y"){
												if(v_section== "GRAMMAR" && v_practice_type == "MOCK_TEST"){
													var score1 = cfmLpad(resultList[r_idx2].score1+"",3," ");
													var score2 = cfmLpad(resultList[r_idx2].score2+"",3," ");
													var total_score1 = resultList[r_idx2].total_score1;
													var total_score2 = resultList[r_idx2].total_score2;
													score = "SW1:"+ score1+"/"+total_score1+" SW2:"+score2+"/"+total_score2;
												}else if(v_practice_type == "TENTIMES"){
													var score  = cfmLpad(resultList[r_idx2].score+"",3," ");
													var score1 = cfmLpad(resultList[r_idx2].score1+"",3," ");
													var score2 = cfmLpad(resultList[r_idx2].score2+"",3," ");
													var total_score1 = resultList[r_idx2].total_score1;
													var total_score2 = resultList[r_idx2].total_score2;
													score = score1+"회/"+total_score1+"회"+score+"%";
													
												}else{
													var score1 = cfmLpad(resultList[r_idx2].score+"",3," ");
													var total_score1 = resultList[r_idx2].total_score;
													score = score1+"/"+total_score1;
												}
											}else{
												score = "X";
											}
											var class_bg = "bg-red";
											if(resultList[r_idx2].user_pass_result){
												class_bg = "bg-blue";
												if(resultList[r_idx2].out_pass_result){
													class_bg = "bg-yellow";
													score += '('+resultList[r_idx2].timem+')';
												}
											}
											vHtml += '<td class="click_practice '+class_bg+' text-center" style="width:'+nWidth+'px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
											vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
											vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
											vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
											vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
											vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
											vHtml += score;
											vHtml += '</td>';
										}else{
											vHtml += createAttendance(course_enrollment_id, attendList, v_date, first_date, objPractice);
										}
									}
								}else{
									vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
								}
							}
						}else{
							if(isPaid){
								vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
							}else{
								vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
							}
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
				var v_book = $(this).find("#book").val();
				var v_volume = $(this).find("#volume").val();
				var v_group = $(this).find("#group").val();
				var v_article = $(this).find("#article").val();
				var v_end_paragraph = $(this).find("#end_paragraph").val();
				move_result(v_section, v_practice_type,v_course_enrollment_id, v_date, v_book, v_volume, v_group, v_article, v_end_paragraph);
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
				"columnDefs": array_column_def,
				orderFixed : [ 0, 'asc' ],
		        searching: false,
		        info:false,
		        scrollY:        '60vh',
		        scrollX:        true,
		        scrollCollapse: true,
		        paging:         false,
		        fixedColumns:   {
		            leftColumns: fix_colume
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

function createAttendance(course_enrollment_id, attendList, v_date, first_date, objPractice)
{
	var vHtml= "";
	var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
	if(t_idx >= 0){
		var v_status = attendList[t_idx].status;
		if(v_status == "REGULAR_ATTENDED")
		{
			//vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
			vHtml += '<td class="click_practice bg-grey-darker text-center" style="width:100px;cursor:pointer;">';
			vHtml += '<input type="hidden" id="section" value="'+objPractice.section+'">';
			vHtml += '<input type="hidden" id="practice_type" value="'+objPractice.practice_type+'">';
			vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
			vHtml += '<input type="hidden" id="date" value="'+objPractice.date+'">';
			vHtml += '<input type="hidden" id="book" value="'+objPractice.book+'">';
			vHtml += '<input type="hidden" id="volume" value="'+objPractice.volume+'">';
			vHtml += '<input type="hidden" id="group" value="'+objPractice.group+'">';
			vHtml += '<input type="hidden" id="article" value="'+objPractice.article+'">';
			vHtml += '<input type="hidden" id="end_paragraph" value="'+objPractice.end_paragraph+'">';
			vHtml += '미시행';
			vHtml += '</td>';
		}else{
			if(v_date == first_date)
			{
				vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">OT진행</td>';
			}else{
				if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
					//vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">지각('+attendList[t_idx].timem+')</td>';
					vHtml += '<td class="click_practice bg-grey-darker text-center" style="width:100px;cursor:pointer;">';
					vHtml += '<input type="hidden" id="section" value="'+objPractice.section+'">';
					vHtml += '<input type="hidden" id="practice_type" value="'+objPractice.practice_type+'">';
					vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
					vHtml += '<input type="hidden" id="date" value="'+objPractice.date+'">';
					vHtml += '<input type="hidden" id="book" value="'+objPractice.book+'">';
					vHtml += '<input type="hidden" id="volume" value="'+objPractice.volume+'">';
					vHtml += '<input type="hidden" id="group" value="'+objPractice.group+'">';
					vHtml += '<input type="hidden" id="article" value="'+objPractice.article+'">';
					vHtml += '<input type="hidden" id="end_paragraph" value="'+objPractice.end_paragraph+'">';
					vHtml += '지각('+attendList[t_idx].timem+')';
					vHtml += '</td>';
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
var q_course_enrollment_id;
var q_tel_emergency_number;
var q_date;
var q_user_name;
function sendAchieve(v_course_enrollment_id, v_user_name, v_tel_emergency_number, v_date)
{
	q_user_name = v_user_name;
	q_course_enrollment_id = v_course_enrollment_id;
	q_tel_emergency_number = v_tel_emergency_number;
	q_date = v_date;
	$("#send_user").html(v_user_name+"("+v_tel_emergency_number+")");
	$("#contents").val("");

	$.ajax({
		type : "POST",
		url : "/enrollment/getSendAchieve.do",
		data:{
			course_enrollment_id : v_course_enrollment_id,
			date : v_date
		},
		success:function(data){
			if(data.contents){
				$("#contents").val(data.contents);
			}
			$("#modal-send-achieve").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}


function save_achieve()
{
	if(!$("#contents").val()){
		alert("담당자의 코멘트를 입력하세요.");
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/enrollment/sendAchieve.do",
		data:{
			course_enrollment_id : q_course_enrollment_id,
			date : q_date,
			contents : $("#contents").val(),
			course_name:$("#course_name").val(),
			user_name:q_user_name,
			resv_mobile : q_tel_emergency_number,
			send_yn:"Y"
		},
		success:function(data){
			alert("발송하였습니다.");
			location.reload();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function disableCourseDays(date){
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	
	var vDate = y+"";
	if(m < 10){
		vDate += "0"+m;
	}else{
		vDate += ""+m;
	}
	if(d < 10){
		vDate += "0"+d;
	}else{
		vDate += ""+d;
	}
	console.log(vDate);
	return false;
}