var achieveCourseTimeTable;
var achieveCoursePracticeList;
var achieveCoursePracticeDailyList;
var achieveCourseDashboardList;
var achieveCourseAttendList;
var achieveCourseSylabusList;
var achieveCourseResultList;
var achieveCourseGiveUpList;
var junior_timetable = [
	["17:30","18:25"],
	["18:25","19:20"],
	["19:20","20:15"],
	["20:15","21:10"],
	["21:10","22:00"]
];

var base_timetable = [
	["09:00","10:00"],
	["10:00","11:00"],
	["11:00","12:00"],
	["12:00","13:00"],
	["13:00","14:00"],
	["14:00","15:00"],
	["15:00","16:00"],
	["16:00","17:00"],
	["17:00","18:00"],
	["18:00","19:00"],
	["19:00","20:00"],
	["20:00","21:00"],
	["21:00","22:00"]
];

var monthly_list = [
//	"TWELVE",
//	"APPENDIX",
	"CONJUCTION",
//	"FIVERULES",
	"VERBAL_BLUEPRINT",
	"IRREGULAR"
]

var monthly_list_type = [
	"GRAMMAR_TRANSLATION",
	"GRAMMAR_TRANSLATION_ACUTAL",
	"EXPLANATION"
]

function search_dashboard_achieve()
{
	var end_time = "";
	var sDate = $("#search_date").val();
	var wDate = cfmAddDate(sDate, - 8);
	var nDate = cfmAddDate(sDate, 1);
	if(cfmGetToDate() == sDate)
	{
		var v_today = new Date();
		var v_hours = v_today.getHours(); // 시
		var v_minutes = v_today.getMinutes();
		if(v_hours < 10){
			end_time += "0"+v_hours;
		}else{
			end_time += ""+v_hours;
		}
		if(v_minutes < 10){
			end_time += ":0"+v_minutes;
		}else{
			end_time += ":"+v_minutes;
		}
	}
	
	$.ajax({
		type : "POST",
		url : "/main/getDashboardAchieveList.do",
		data:{
			course_group_id:$("#search_course_group_id").val(),
			date:sDate,
			bef_week_date:wDate,
			next_date:nDate,
			end_time:end_time		
		},
		dataType : "json",
		success:function(data){
			courseGroupInfo = data.courseGroupInfo;
			
			achieveCourseTimeTable         = data.courseTimeTable;
			achieveCoursePracticeList      = data.coursePracticeList;
			achieveCoursePracticeDailyList = data.coursePracticeDailyList;
			achieveCourseDashboardList     = data.courseDashboardList;
			achieveCourseAttendList        = data.courseAttendList;
			achieveCourseSylabusList       = data.courseSylabusList;
			achieveCourseResultList        = data.courseResultList;
			achieveCourseGiveUpList        = data.courseGiveUpList;
			create_dashboard_achieve();
			
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function create_dashboard_achieve()
{
	if(show_private){
		create_dashboard_achieve_private();
	}else{
		create_dashboard_achieve_all();
	}
}

function create_dashboard_achieve_all()
{
	var sDate = $("#search_date").val();
	
	var current_time = courseGroupInfo.current_time;
	var current_date = courseGroupInfo.current_date;
	
	var array_course_result = Array();
	var student_type = courseGroupInfo.student_type;
	var lecture_type = courseGroupInfo.lecture_type;
	
	var array_time;
	if(student_type == "JUNIOR" && lecture_type=="REGULAR")
	{
		array_time = junior_timetable;
	}else{
		array_time = base_timetable;
	}
	
	var vHtml = "";
	vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
	vHtml += '		<thead>';
	vHtml += '			<tr>';
	vHtml += '				<th class="text-center bg-grey" style="width:80px;"  rowspan="2">&nbsp;</th>';
	for(var i=0; i<courseList.length; i++)
	{
		vHtml += '				<th class="text-center bg-grey" style="width:900px;" colspan="4">'+courseList[i].name+'</th>';
	}
	vHtml += '			</tr>';
	vHtml += '			<tr>';
	for(var i=0; i<courseList.length; i++)
	{
		vHtml += '				<th class="text-center bg-grey" style="width:120px;">담당자</th>';
		vHtml += '				<th class="text-center bg-grey" style="width:70px;">전체완료</th>';
		vHtml += '				<th class="text-center bg-grey" style="width:70px;">시간별완료</th>';
		vHtml += '				<th class="text-center bg-grey" style="width:640px;">반별내신</th>';
	}
	vHtml += '			</tr>';
	vHtml += '		</thead>';
	vHtml += '		<tbody>';
	//수업전
	vHtml += '			<tr class="bg-gradient-grey" style="height:60px;">';
	vHtml += '				<th class="text-center">수업전</th>';
	for(var i=0; i<courseList.length; i++)
	{
		var v_course_id = courseList[i].id;
		
		var n_total_count = achieveCourseDashboardList.filter(function(item, index){
			if(item.course_id == v_course_id && item.refund_status != "FULL_REFUND"){
				return true;
			}
		}).length;
		
		var array_sylabus_list = achieveCourseSylabusList.filter(function(item, index){
			if(item.course_id == v_course_id){
				return true;
			}
		});
		
		var n_course_total_count = 0;
		for(var j=0;j<array_sylabus_list.length; j++)
		{
			
			var v_section        = array_sylabus_list[j].section;
			var v_practice_type = array_sylabus_list[j].practice_type;
			var p_idx = achieveCoursePracticeDailyList.findIndex(t => t.course_id == v_course_id && t.section == v_section  && t.practice_type == v_practice_type);
			if(p_idx < 0) continue;
			//var n_giveup_count = dashboard_achieve_giveup_count(v_course_id, v_section, v_practice_type);
			n_course_total_count += n_total_count;
		}
		/*
		var n_sylabus_count = achieveCourseSylabusList.filter(function(item, index){
			if(item.course_id == v_course_id){
				return true;
			}
		}).length;
		*/
		var objCourseResult = Object();
		//objCourseResult.rate = 100;
		objCourseResult.rate = 0;
		objCourseResult.total_rate = 0;
		//objCourseResult.total_count = n_total_count * n_sylabus_count;
		objCourseResult.total_count = n_course_total_count;
		objCourseResult.current_count = 0;
		objCourseResult.success_count = 0;
		array_course_result.push(objCourseResult);
		
		var n_success_count = achieveCourseAttendList.filter(function(item, index){
			if(item.course_id == v_course_id && item.attend_status != 'UNPERMITTED_ABSENT' && item.attend_status != 'PERMITTED_ABSENT'){
				return true;
			}
		}).length;

		var n_rate = 0;
		if(n_total_count >= 0){
			n_rate = Math.round(n_success_count/n_total_count * 100);
		}
		vHtml += '				<td class="text-center">';
		vHtml += '담당강사('+courseList[i].instructor_name+')<br>';
		vHtml += '담당매니저('+courseList[i].manager_name+')<br>';
		vHtml += '				</td>';
		vHtml += '				<td class="text-center">&nbsp;</td>';
		vHtml += '				<td class="text-center">&nbsp;</td>';
		vHtml += '				<td>';
		if(n_total_count > 0)
		{
			var bg_text = "";
			if(n_rate >= 80){
				bg_text = "bg-green-lighter";
			}else if(n_rate >= 60){
				bg_text = "bg-blue-lighter";
			}else if(n_rate >= 40){
				bg_text = "bg-yellow-lighter";
			}else{
				bg_text = "bg-red-lighter";
			}
			
			vHtml += '					<div class="row m-2">';
			vHtml += '						<div class="achieve col-3 text-center '+bg_text+'" style="padding:5px;cursor:pointer;">';
			vHtml += '<input type="hidden" name="section" value="ATTEND">';
			vHtml += '<input type="hidden" name="practice_type" value="ATTEND">';
			vHtml += '<input type="hidden" name="course_id" value="'+v_course_id+'">';
			vHtml += '출결<br>'+n_success_count+'/'+n_total_count+'명('+n_rate+'%)';
			vHtml += '						</div">';
			vHtml += '					</div">';
			
		}
		vHtml += '				</td>';
	}
	vHtml += '			</tr>';
	for(var k=0; k<array_time.length; k++)
	{
		var bg_tr = "";
		var sHour = array_time[k][0];
		var eHour = array_time[k][1];
		if(current_date == sDate)
		{
			if(current_time > sHour){
				//현재시각
				if(current_time < eHour){
					bg_tr = "current_time bg-gradient-aqua";
				}else{
					bg_tr = "bg-gradient-grey";
				}
			}
		}else{
			bg_tr = "bg-gradient-grey";
		}
		
		vHtml += '			<tr class="'+bg_tr+'" style="height:60px;">';
		vHtml += '				<th class="text-center">'+sHour+'</th>';
		for(var i=0; i<courseList.length; i++)
		{
			var v_course_id = courseList[i].id;
			var a_idx = achieveCourseTimeTable.findIndex(t => t.course_id == v_course_id && t.class_hour == sHour);
			vHtml += '				<td class="text-center">';
			if(a_idx >= 0)
			{
				if(achieveCourseTimeTable[a_idx].short_title_kr){
					vHtml += achieveCourseTimeTable[a_idx].short_title_kr+' ';
					if(achieveCourseTimeTable[a_idx].study_type == "CLASS"){
						vHtml += "수업 ";
					}else{
						vHtml += "스터디 ";
					}
					vHtml += '(' + achieveCourseTimeTable[a_idx].user_name + ')';
				}else{
					if(achieveCourseTimeTable[a_idx].study_type == "LUNCH"){
						vHtml +=  "점심시간";
					}else if(achieveCourseTimeTable[a_idx].study_type == "DINNER"){
						vHtml +=  "저녁시간";
					}else if(achieveCourseTimeTable[a_idx].study_type == "INDEPENDENT"){
						vHtml +=  "의무자습";
					}
				}
				
			}else{
				vHtml += '&nbsp;';
			}
			
			var practice_list = achieveCoursePracticeList.filter(function(item, index){
				if(item.course_id == v_course_id && item.start_time == sHour){
					return true;
				}
			});
			
			
			vHtml += '				</td>';
			
			var t_total_course =  achieveCourseDashboardList.filter(function(item, index){
				if(item.course_id == v_course_id && item.refund_status != "FULL_REFUND"){
					return true;
				}
			}).length;

			var t_total_total_count = 0;
			var t_total_success_count = 0;
			var pHtml = "";
			for(var j=0; j<practice_list.length; j++)
			{
				var t_success_count = 0;
				var t_total_count = 0;
				var v_section = practice_list[j].section;
				var v_practice_type = practice_list[j].practice_type;

				//var v_giveup_count = dashboard_achieve_giveup_count(v_course_id, v_section, v_practice_type);
				var v_giveup_count = 0;
				var t_calc_course =  t_total_course - v_giveup_count;
				
				var v_bg_color = "";
				var v_txt_color = "";
				var v_practice_name = practice_list[j].short_title_kr+" "+practice_list[j].practice_name;
				var v_value = "";
				var p_idx = achieveCoursePracticeDailyList.findIndex(t => t.course_id == v_course_id && t.section == v_section  && t.practice_type == v_practice_type);

				if(p_idx >= 0)
				{
					var sylabus_list = achieveCourseSylabusList.filter(function(item, index){
						if(item.course_id == v_course_id && item.section == v_section && item.practice_type == v_practice_type){
							return true;
						}
					});
					
					if(sylabus_list.length > 0)
					{
						
						for(var t=0; t<sylabus_list.length; t++)
						{
							var v_book      = sylabus_list[t].book;
							var v_volume    = sylabus_list[t].volume; 
							var v_group     = sylabus_list[t].group; 
							var v_article   = sylabus_list[t].article;
							var v_paragraph = sylabus_list[t].paragraph;
							
							var t_result_count = dashboard_achieve_result_count(v_course_id, v_section, v_practice_type, v_book, v_volume, v_group, v_article, v_paragraph);
							t_total_count += t_calc_course;
							t_success_count += t_result_count;
							if(t>0){
								v_value += ",";
								if(t % 3 == 0)v_value += "<br/>";
							}
							v_value += t_result_count+"/"+t_calc_course+"명";
						}
						if(t_calc_course > 0)
						{
							var t_rate = Math.round(t_success_count/t_total_count * 100);
							v_value += "("+t_rate+"%)";
							if(v_giveup_count > 0){
								v_value += " 포기:"+v_giveup_count+"명";
							}
							if(t_rate >= 80){
								v_bg_color = "bg-green-lighter";
							}else if(t_rate >= 60){
								v_bg_color = "bg-blue-lighter";
							}else if(t_rate >= 40){
								v_bg_color = "bg-yellow-lighter";
							}else{
								v_bg_color = "bg-red-lighter";
							}
						}else{
							v_bg_color = "bg-dark ";
							v_txt_color = "text-white ";
							v_value = "&nbsp;";
						}
					}else{
						v_bg_color = "bg-dark ";
						v_txt_color = "text-white ";
						v_value = "(실라버스 미기입)";
						
					}
				}else{
					v_bg_color = "bg-dark ";
					v_txt_color = "text-white ";
					v_value = "(당일없음)";
				}
				pHtml += '						<div class="col-3 p-2 text-center">';
				pHtml += '							<div class="achieve '+v_bg_color+v_txt_color+'" style="width:100%;padding:5px;cursor:pointer;">'
				pHtml += '<input type="hidden" name="section" value="'+v_section+'">';
				pHtml += '<input type="hidden" name="practice_type" value="'+v_practice_type+'">';
				pHtml += '<input type="hidden" name="course_id" value="'+v_course_id+'">';
				pHtml += v_practice_name+'<br>';
				pHtml += v_value;
				pHtml += '							</div>';
				pHtml += '						</div>';
				t_total_success_count += t_success_count;
				t_total_total_count   += t_total_count;
			}	
			
			var q_total_count       = array_course_result[i].total_count;
			var q_bef_count         = array_course_result[i].current_count;
			var q_bef_success_count = array_course_result[i].success_count;
			
			var q_count = q_bef_count + t_total_total_count;
			var q_success_count = q_bef_success_count + t_total_success_count;
			
			array_course_result[i].current_count = q_count;
			array_course_result[i].success_count = q_success_count;

			var q_time_rate = Math.round(t_total_success_count/t_total_total_count*1000)/10;
			var q_remain_rate = Math.round(q_success_count/q_total_count*1000)/10;
			var q_total_remain_rate = Math.round(q_count/q_total_count*1000)/10;

			if(q_total_count > 0)
			{
				vHtml += '				<th class="text-center">'+q_remain_rate+'%<br>('+q_total_remain_rate+'%)</th>';
			}else{
				vHtml += '				<th class="text-center">&nbsp;</th>';
			}
			if(t_total_total_count > 0)
			{
				vHtml += '				<th class="text-center">'+q_time_rate+'%</th>';
			}else{
				vHtml += '				<th class="text-center">&nbsp;</th>';
			}
			vHtml += '				<td>';
			vHtml += '					<div class="row  m-2">';
			vHtml += pHtml;
			vHtml += '					</div">';
			
			vHtml += '				</td>';
		}
		vHtml += '			</tr>';
	}
	vHtml += '		</tbody>';
	vHtml += '</table>';
	$("#div_dashboard").html(vHtml);
	
	$(".achieve").click(function(){
		var t_course_id     = $(this).find("input[name=course_id]").val();
		var t_section       = $(this).find("input[name=section]").val();
		var t_practice_type = $(this).find("input[name=practice_type]").val();
		
		var url = "";
		if(t_section == "ATTEND"){
			url = "/enrollment/achievement_new_action.do?orientation_code=voca&&course_id="+t_course_id+"&&orientation_gubun=attend";
		}else if(t_section == "VOCA"){
			url = "/enrollment/achievement_new_action.do?orientation_code=voca&&course_id="+t_course_id+"&&orientation_gubun=voca";
		}else{
			if(t_practice_type == "BLUEPRINT"){
				url = "/enrollment/achievement_new_action.do?orientation_code=practice_blueprint&&section="+t_section+"&&practice_type="+t_practice_type+"&&course_id="+t_course_id;
			}else{
				if(monthly_list.indexOf(t_practice_type) >= 0){
					url = "/enrollment/achievement_new_action.do?orientation_code=practice_monthly&&section="+t_section+"&&practice_type="+t_practice_type+"&&course_id="+t_course_id;
				}else if(monthly_list_type.indexOf(t_practice_type) >= 0){
					url = "/enrollment/achievement_new_action.do?orientation_code=practice_grammar&&section="+t_section+"&&practice_type="+t_practice_type+"&&course_id="+t_course_id;
				}else{
					url = "/enrollment/achievement_new_action.do?orientation_code=practice&&section="+t_section+"&&practice_type="+t_practice_type+"&&course_id="+t_course_id;
				}
			}
		}
		
		window.open(url,"achieve");
	});
	
	oTable = $('#example').DataTable( {
		ordering:false,
        searching: false,
        info:false,
        scrollY:        '50vh',
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   {
            leftColumns: 1
        }
    } );
	$("#example tbody tr td").css("padding","0px");
	
	$('.dataTables_scrollBody').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			window.parent.scrolled = true;
        }
    });
	if($('.current_time').length > 0) {
		$('.dataTables_scrollBody').animate({
			scrollTop:$('.current_time').offset().top - 500
		}, 500);
	}	
}

function create_dashboard_achieve_private()
{
	var sDate = $("#search_date").val();
	var current_time = courseGroupInfo.current_time;
	var current_date = courseGroupInfo.current_date;
	
	var array_course_result = Array();
	var student_type = courseGroupInfo.student_type;
	var lecture_type = courseGroupInfo.lecture_type;
	
	var array_time;
	if(student_type == "JUNIOR" && lecture_type=="REGULAR")
	{
		array_time = junior_timetable;
	}else{
		array_time = base_timetable;
	}
	
	var vHtml = "";
	vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
	vHtml += '		<thead>';
	vHtml += '			<tr>';
	vHtml += '				<th class="text-center bg-grey" style="width:80px;"  rowspan="2">&nbsp;</th>';
	for(var i=0; i<courseList.length; i++)
	{
		vHtml += '				<th class="text-center bg-grey" style="width:900px;" colspan="4">'+courseList[i].name+'</th>';
	}
	vHtml += '			</tr>';
	vHtml += '			<tr>';
	for(var i=0; i<courseList.length; i++)
	{
		vHtml += '				<th class="text-center bg-grey" style="width:120px;">담당자</th>';
		vHtml += '				<th class="text-center bg-grey" style="width:70px;">전체완료</th>';
		vHtml += '				<th class="text-center bg-grey" style="width:70px;">시간별완료</th>';
		vHtml += '				<th class="text-center bg-grey" style="width:640px;">반별내신</th>';
	}
	vHtml += '			</tr>';
	vHtml += '		</thead>';
	vHtml += '		<tbody>';
	//수업전
	vHtml += '			<tr class="bg-gradient-grey" style="height:60px;">';
	vHtml += '				<th class="text-center">수업전</th>';
	for(var i=0; i<courseList.length; i++)
	{
		var v_course_id = courseList[i].id;
		
		var n_total_count = achieveCourseAttendList.filter(function(item, index){
			if(item.course_id == v_course_id){
				return true;
			}
		}).length;
		
		var array_sylabus_list = achieveCourseSylabusList.filter(function(item, index){
			if(item.course_id == v_course_id){
				return true;
			}
		});
		
		var n_course_total_count = 0;
		for(var j=0;j<array_sylabus_list.length; j++)
		{
			
			var v_section        = array_sylabus_list[j].section;
			var v_practice_type = array_sylabus_list[j].practice_type;
			var p_idx = achieveCoursePracticeDailyList.findIndex(t => t.course_id == v_course_id && t.section == v_section  && t.practice_type == v_practice_type);
			if(p_idx < 0) continue;
			var n_giveup_count = dashboard_achieve_giveup_count(v_course_id, v_section, v_practice_type);
			n_course_total_count += n_total_count - n_giveup_count;
		}
		/*
		var n_sylabus_count = achieveCourseSylabusList.filter(function(item, index){
			if(item.course_id == v_course_id){
				return true;
			}
		}).length;
		*/
		var objCourseResult = Object();
		//objCourseResult.rate = 100;
		objCourseResult.rate = 0;
		objCourseResult.total_rate = 0;
		//objCourseResult.total_count = n_total_count * n_sylabus_count;
		objCourseResult.total_count = n_course_total_count;
		objCourseResult.current_count = 0;
		objCourseResult.success_count = 0;
		array_course_result.push(objCourseResult);
		
		var n_success_count = achieveCourseAttendList.filter(function(item, index){
			if(item.course_id == v_course_id && item.attend_status != 'UNPERMITTED_ABSENT' && item.attend_status != 'PERMITTED_ABSENT'){
				return true;
			}
		}).length;

		var n_rate = 0;
		if(n_total_count >= 0){
			n_rate = Math.round(n_success_count/n_total_count * 100);
		}
		vHtml += '				<td class="text-center">';
		vHtml += '담당강사('+courseList[i].instructor_name+')<br>';
		vHtml += '담당매니저('+courseList[i].manager_name+')<br>';
		vHtml += '				</td>';
		vHtml += '				<td class="text-center">&nbsp;</td>';
		vHtml += '				<td class="text-center">&nbsp;</td>';
		vHtml += '				<td>';
		if(n_total_count > 0)
		{
			var bg_text = "";
			if(n_rate >= 80){
				bg_text = "bg-green-lighter";
			}else if(n_rate >= 60){
				bg_text = "bg-blue-lighter";
			}else if(n_rate >= 40){
				bg_text = "bg-yellow-lighter";
			}else{
				bg_text = "bg-red-lighter";
			}
			
			vHtml += '					<div class="row m-2">';
			vHtml += '						<div class="achieve col-3 text-center '+bg_text+'" style="padding:5px;cursor:pointer;">';
			vHtml += '<input type="hidden" name="section" value="ATTEND">';
			vHtml += '<input type="hidden" name="practice_type" value="ATTEND">';
			vHtml += '<input type="hidden" name="course_id" value="'+v_course_id+'">';
			vHtml += '출결<br>'+n_success_count+'/'+n_total_count+'명('+n_rate+'%)';
			vHtml += '						</div">';
			vHtml += '					</div">';
			
		}
		vHtml += '				</td>';
	}
	vHtml += '			</tr>';
	for(var k=0; k<array_time.length; k++)
	{
		var bg_tr = "";
		var sHour = array_time[k][0];
		var eHour = array_time[k][1];
		if(current_date == sDate)
		{
			if(current_time > sHour){
				//현재시각
				if(current_time < eHour){
					bg_tr = "current_time bg-gradient-aqua";
				}else{
					bg_tr = "bg-gradient-grey";
				}
			}
		}else{
			bg_tr = "bg-gradient-grey";
		}
		
		vHtml += '			<tr class="'+bg_tr+'" style="height:60px;">';
		vHtml += '				<th class="text-center">'+sHour+'</th>';
		for(var i=0; i<courseList.length; i++)
		{
			var v_course_id = courseList[i].id;
			var a_idx = achieveCourseTimeTable.findIndex(t => t.course_id == v_course_id && t.class_hour == sHour);
			vHtml += '				<td class="text-center">';
			if(a_idx >= 0)
			{
				if(achieveCourseTimeTable[a_idx].short_title_kr){
					vHtml += achieveCourseTimeTable[a_idx].short_title_kr+' ';
					if(achieveCourseTimeTable[a_idx].study_type == "CLASS"){
						vHtml += "수업 ";
					}else{
						vHtml += "스터디 ";
					}
					vHtml += '(' + achieveCourseTimeTable[a_idx].user_name + ')';
				}else{
					if(achieveCourseTimeTable[a_idx].study_type == "LUNCH"){
						vHtml +=  "점심시간";
					}else if(achieveCourseTimeTable[a_idx].study_type == "DINNER"){
						vHtml +=  "저녁시간";
					}else if(achieveCourseTimeTable[a_idx].study_type == "INDEPENDENT"){
						vHtml +=  "의무자습";
					}
				}
				
			}else{
				vHtml += '&nbsp;';
			}
			
			var practice_list = achieveCoursePracticeList.filter(function(item, index){
				if(item.course_id == v_course_id && item.start_time == sHour){
					return true;
				}
			});
			
			
			vHtml += '				</td>';
			
			var t_total_course =  achieveCourseAttendList.filter(function(item, index){
				if(item.course_id == v_course_id){
					return true;
				}
			}).length;

			var t_total_total_count = 0;
			var t_total_success_count = 0;
			var pHtml = "";
			for(var j=0; j<practice_list.length; j++)
			{
				var t_success_count = 0;
				var t_total_count = 0;
				var v_section = practice_list[j].section;
				var v_practice_type = practice_list[j].practice_type;

				var v_giveup_count = dashboard_achieve_giveup_count(v_course_id, v_section, v_practice_type);
				var t_calc_course =  t_total_course - v_giveup_count;
				
				var v_bg_color = "";
				var v_txt_color = "";
				var v_practice_name = practice_list[j].short_title_kr+" "+practice_list[j].practice_name;
				var v_value = "";
				var p_idx = achieveCoursePracticeDailyList.findIndex(t => t.course_id == v_course_id && t.section == v_section  && t.practice_type == v_practice_type);

				if(p_idx >= 0)
				{
					var sylabus_list = achieveCourseSylabusList.filter(function(item, index){
						if(item.course_id == v_course_id && item.section == v_section && item.practice_type == v_practice_type){
							return true;
						}
					});
					
					if(sylabus_list.length > 0)
					{
						
						for(var t=0; t<sylabus_list.length; t++)
						{
							var v_book      = sylabus_list[t].book;
							var v_volume    = sylabus_list[t].volume; 
							var v_group     = sylabus_list[t].group; 
							var v_article   = sylabus_list[t].article;
							var v_paragraph = sylabus_list[t].paragraph;
							
							var t_result_count = dashboard_achieve_result_count(v_course_id, v_section, v_practice_type, v_book, v_volume, v_group, v_article, v_paragraph);
							t_total_count += t_calc_course;
							t_success_count += t_result_count;
							if(t>0){
								v_value += ",";
								if(t % 3 == 0)v_value += "<br/>";
							}
							v_value += t_result_count+"/"+t_calc_course+"명";
						}
						if(t_calc_course > 0)
						{
							var t_rate = Math.round(t_success_count/t_total_count * 100);
							v_value += "("+t_rate+"%)";
							if(v_giveup_count > 0){
								v_value += " 포기:"+v_giveup_count+"명";
							}
							if(t_rate >= 80){
								v_bg_color = "bg-green-lighter";
							}else if(t_rate >= 60){
								v_bg_color = "bg-blue-lighter";
							}else if(t_rate >= 40){
								v_bg_color = "bg-yellow-lighter";
							}else{
								v_bg_color = "bg-red-lighter";
							}
						}else{
							v_bg_color = "bg-dark ";
							v_txt_color = "text-white ";
							v_value = "&nbsp;";
						}
					}else{
						v_bg_color = "bg-dark ";
						v_txt_color = "text-white ";
						v_value = "(실라버스 미기입)";
						
					}
				}else{
					v_bg_color = "bg-dark ";
					v_txt_color = "text-white ";
					v_value = "(당일없음)";
				}
				pHtml += '						<div class="col-3 p-2 text-center">';
				pHtml += '							<div class="achieve '+v_bg_color+v_txt_color+'" style="width:100%;padding:5px;cursor:pointer;">'
				pHtml += '<input type="hidden" name="section" value="'+v_section+'">';
				pHtml += '<input type="hidden" name="practice_type" value="'+v_practice_type+'">';
				pHtml += '<input type="hidden" name="course_id" value="'+v_course_id+'">';
				pHtml += v_practice_name+'<br>';
				pHtml += v_value;
				pHtml += '							</div>';
				pHtml += '						</div>';
				t_total_success_count += t_success_count;
				t_total_total_count   += t_total_count;
			}	
			
			var q_total_count       = array_course_result[i].total_count;
			var q_bef_count         = array_course_result[i].current_count;
			var q_bef_success_count = array_course_result[i].success_count;
			
			var q_count = q_bef_count + t_total_total_count;
			var q_success_count = q_bef_success_count + t_total_success_count;
			
			array_course_result[i].current_count = q_count;
			array_course_result[i].success_count = q_success_count;

			var q_time_rate = Math.round(t_total_success_count/t_total_total_count*1000)/10;
			var q_remain_rate = Math.round(q_success_count/q_total_count*1000)/10;
			var q_total_remain_rate = Math.round(q_count/q_total_count*1000)/10;

			if(q_total_count > 0)
			{
				vHtml += '				<th class="text-center">'+q_remain_rate+'%<br>('+q_total_remain_rate+'%)</th>';
			}else{
				vHtml += '				<th class="text-center">&nbsp;</th>';
			}
			if(t_total_total_count > 0)
			{
				vHtml += '				<th class="text-center">'+q_time_rate+'%</th>';
			}else{
				vHtml += '				<th class="text-center">&nbsp;</th>';
			}
			vHtml += '				<td>';
			vHtml += '					<div class="row  m-2">';
			vHtml += pHtml;
			vHtml += '					</div">';
			
			vHtml += '				</td>';
		}
		vHtml += '			</tr>';
	}
	vHtml += '		</tbody>';
	vHtml += '</table>';
	$("#div_dashboard").html(vHtml);
	
	$(".achieve").click(function(){
		var t_course_id     = $(this).find("input[name=course_id]").val();
		var t_section       = $(this).find("input[name=section]").val();
		var t_practice_type = $(this).find("input[name=practice_type]").val();
		
		var url = "";
		if(t_section == "ATTEND"){
			url = "/enrollment/achievement_new_action.do?orientation_code=voca&&course_id="+t_course_id+"&&orientation_gubun=attend";
		}else if(t_section == "VOCA"){
			url = "/enrollment/achievement_new_action.do?orientation_code=voca&&course_id="+t_course_id+"&&orientation_gubun=voca";
		}else{
			if(t_practice_type == "BLUEPRINT"){
				url = "/enrollment/achievement_new_action.do?orientation_code=practice_blueprint&&section="+t_section+"&&practice_type="+t_practice_type+"&&course_id="+t_course_id;
			}else{
				if(monthly_list.indexOf(t_practice_type) >= 0){
					url = "/enrollment/achievement_new_action.do?orientation_code=practice_monthly&&section="+t_section+"&&practice_type="+t_practice_type+"&&course_id="+t_course_id;
				}else if(monthly_list_type.indexOf(t_practice_type) >= 0){
					url = "/enrollment/achievement_new_action.do?orientation_code=practice_grammar&&section="+t_section+"&&practice_type="+t_practice_type+"&&course_id="+t_course_id;
				}else{
					url = "/enrollment/achievement_new_action.do?orientation_code=practice&&section="+t_section+"&&practice_type="+t_practice_type+"&&course_id="+t_course_id;
				}
			}
		}
		
		window.open(url,"achieve");
	});
	
	oTable = $('#example').DataTable( {
		ordering:false,
        searching: false,
        info:false,
        scrollY:        '50vh',
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   {
            leftColumns: 1
        }
    } );
	$("#example tbody tr td").css("padding","0px");
	
	$('.dataTables_scrollBody').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			window.parent.scrolled = true;
        }
    });
	if($('.current_time').length > 0) {
		$('.dataTables_scrollBody').animate({
			scrollTop:$('.current_time').offset().top - 500
		}, 500);
	}
}

//포기학생빼기
function dashboard_achieve_giveup_count(v_course_id, v_section, v_practice_type)
{
	var attend_list = achieveCourseAttendList.filter(function(item, index){
		if(item.course_id == v_course_id && item.attend_status != 'UNPERMITTED_ABSENT' && item.attend_status != 'PERMITTED_ABSENT'){
			return true;
		}
	});
	
	var result_count = 0;
	for(var i=0; i<attend_list.length; i++)
	{
		var v_course_enrollment_id = attend_list[i].course_enrollment_id;
		
		//없을경우 포기 과목인지 확인
		var b_idx = achieveCourseGiveUpList.findIndex(t => t.course_id == v_course_id 
														&& t.course_enrollment_id == v_course_enrollment_id  
														&& t.section == v_section  
														&& t.practice_type == v_practice_type);
		if(b_idx >= 0) result_count++;
	}
	

	return result_count;
}

//성공학생 확인
function dashboard_achieve_result_count(v_course_id, v_section, v_practice_type, v_book, v_volume, v_group, v_article, v_paragraph)
{
	var attend_list = achieveCourseAttendList.filter(function(item, index){
		if(item.course_id == v_course_id && item.attend_status != 'UNPERMITTED_ABSENT' && item.attend_status != 'PERMITTED_ABSENT'){
			return true;
		}
	});
	
	var result_count = 0;
	for(var i=0; i<attend_list.length; i++)
	{
		var v_course_enrollment_id = attend_list[i].course_enrollment_id;
		
		//포기 과목인지 확인
		var b_idx = achieveCourseGiveUpList.findIndex(t => t.course_id == v_course_id 
														&& t.course_enrollment_id == v_course_enrollment_id  
														&& t.section == v_section  
														&& t.practice_type == v_practice_type);
		if(b_idx >= 0) continue;
		
		//우선 결과에서 찾는다.
		var a_idx = achieveCourseResultList.findIndex(t => t.course_id == v_course_id 
														&& t.course_enrollment_id == v_course_enrollment_id  
														&& t.section == v_section  
														&& t.practice_type == v_practice_type  
														&& t.book == v_book  
														&& t.volume == v_volume  
														&& t.group == v_group  
														&& t.article == v_article  
														&& t.paragraph == v_paragraph);
		if(a_idx >= 0) result_count++;
	}
	return result_count;
}