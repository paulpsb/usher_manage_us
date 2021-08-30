var search_date;
var current_date;
var current_time;
var aws_schedule_url = "https://s3.ap-northeast-2.amazonaws.com/";
var check_task_id = 0;

var junior_timetable = [
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["17:30","18:25"],
	["18:25","19:20"],
	["19:20","20:15"],
	["20:15","21:10"],
	["21:10","22:00"],
	["",""]
];

var base_timetable = [
	["08:00","09:00"],
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
	["21:00","22:00"],
	["22:00","23:00"],
];

var week = [
	'일요일', 
	'월요일', 
	'화요일', 
	'수요일', 
	'목요일', 
	'금요일', 
	'토요일'
];

jQuery(document).ready(function(){
	var to_day = $("#schedule_date").val();
	if(!to_day) to_day = cfmGetToDate();
	$("#search_date").val(to_day);
	change_date();
	search_form();
});
function change_date(){
	var vDate = $("#search_date").val();
	var to_day = cfmGetToDate();
	if(vDate < to_day){
		$("#btn_next").attr("disabled", false);
	}else{
		$("#btn_next").attr("disabled", true);
	}
	var sDate = cfmGetDigit(vDate);
    var yy = parseInt(sDate.substr(0, 4), 10);
    var mm = parseInt(sDate.substr(4, 2), 10);
    var dd = parseInt(sDate.substr(6, 2), 10);

    var d = new Date(yy, mm - 1, dd);
    var w = d.getDay();
    $("#select_date_text").val(yy+"년 "+parseInt(mm)+"월"+parseInt(dd)+"일,"+week[w]);
    
}

function date_prev()
{
	var v_date = cfmAddDate($("#search_date").val(), -1);
	$("#search_date").val(v_date);
	change_date();
	search_form();
}

function date_next()
{
	var v_date = cfmAddDate($("#search_date").val(), 1);
	$("#search_date").val(v_date);
	change_date();
	search_form();
}

var search_type = "class";
function change_type(v_type)
{
	if(search_type != v_type)
	{
		$("#btn_type_"+search_type).removeClass("btn-primary");
		$("#btn_type_"+search_type).addClass("btn-default");
		$("#btn_type_"+v_type).removeClass("btn-default");
		$("#btn_type_"+v_type).addClass("btn-primary");
		
		search_type = v_type;
		
		if(v_type == "class"){
			$("#table_title").html("수업/스터디/TASK");
		}else if(v_type == "daily"){
			$("#table_title").html("Daily Routine");
		}else if(v_type == "monthly"){
			$("#table_title").html("Monthly Routine");
		}
		search_form();
	}
}
function search_form()
{
	check_task_id = 0;
	
	array_alaram = Array();
	
	$.ajax({
		type : "POST",
		url : "/main/getTeacherScheduleList.do",
		data:{
			user_id:$("#user_id").val(),
			date:$("#search_date").val()
		},
		success:function(data){
			var tr_bg_class = "";
			search_date = $("#search_date").val();
			current_date = data.currentInfo.cur_date;
			var to_time = data.currentInfo.cur_time;
			var array_to_time = to_time.split(":");
			to_hour = parseInt(array_to_time[0]);
			current_time = to_hour+":00";
			
			var timetableList = data.timetableList;
			var practiceList  = data.practiceList;
			var noticeScheduleList = data.noticeScheduleList;
			var noticeScheduleUncompleteList = data.noticeScheduleUncompleteList;
			var noticePracticeList = data.noticePracticeList;
			var noticeAttendList   = data.noticeAttendList;
			var noticeTaskList     = data.noticeTaskList;
			var newStudentList     = data.newStudentList;
			
			var vHtml = "";
			
			if(current_date != search_date) tr_bg_class = "bg-gradient-grey";
			vHtml += '<tr class="'+tr_bg_class+'">';
			vHtml += '	<th class="text-center">시간 지정<br>없음</th>';
			vHtml += '	<td>';
			if(search_type == "daily"){
				vHtml += createSchedule(noticeScheduleList, noticeScheduleUncompleteList, "DAILY", "0" , "0");
			}else if(search_type == "monthly"){
				vHtml += createSchedule(noticeScheduleList, noticeScheduleUncompleteList, "MONTHLY", "0" , "0" );
			}else{
				//vHtml += createTask(noticeTaskList, "0" );
			}
			vHtml += '	</td>';
			vHtml += '</tr>';
			for(var i=0; i<base_timetable.length; i++)
			{
				var is_check_practice = false;
				var bsHour = base_timetable[i][0];
				var beHour = base_timetable[i][1];
				var jsHour = junior_timetable[i][0];
				var jeHour = junior_timetable[i][1];
				
				var sHour = bsHour+"<br>";
				if(jsHour) sHour += jsHour+"(주니어)<br>";
				
				var sTime1 = bsHour;
				var sTime2 = "99:99";
				if(jsHour) sTime2 = jsHour;
				
				var b_idx = timetableList.findIndex(t => t.class_hour == bsHour);
				var j_idx = timetableList.findIndex(t => t.class_hour == jsHour);
				
				var v_course = "";
				var v_practice= "";
				var v_section = "";
				var v_section_name = "";
				var v_study_type = "";
				var v_course_id = "";
				
				if(b_idx >= 0){
					v_course = timetableList[b_idx].course_group_name+" "+timetableList[b_idx].course_name+"반";
					v_practice = timetableList[b_idx].section_name+" "+timetableList[b_idx].study_type_name;
					v_section    = timetableList[b_idx].section;
					v_section_name= timetableList[b_idx].section_name;
					v_study_type = timetableList[b_idx].study_type;
					v_course_id  = timetableList[b_idx].course_id;
				}else if(j_idx >= 0){
					v_course = timetableList[j_idx].course_group_name+" "+timetableList[j_idx].course_name+"반";
					v_practice = timetableList[j_idx].section_name+" "+timetableList[j_idx].study_type_name;
					v_section    = timetableList[j_idx].section;
					v_section_name= timetableList[j_idx].section_name;
					v_study_type = timetableList[j_idx].study_type;
					v_course_id  = timetableList[j_idx].course_id;
				}
				
				tr_bg_class = "";
				if(current_date == search_date){
					if(bsHour < current_time){
						tr_bg_class = "bg-gradient-grey";
						is_check_practice = true;
					}else if(bsHour == current_time){
						tr_bg_class = "bg-gradient-aqua";
					}
				}else{
					is_check_practice = true;
					tr_bg_class = "bg-gradient-grey";
				}
				vHtml += '<tr class="'+tr_bg_class+'">';
				vHtml += '	<th class="text-center">'+sHour +v_course+'<br>'+v_practice+'</th>';
				vHtml += '	<td>';
				if(search_type == "daily"){
					vHtml += createSchedule(noticeScheduleList, noticeScheduleUncompleteList, "DAILY", sTime1 , sTime2);
				}else if(search_type == "monthly"){
					vHtml += createSchedule(noticeScheduleList, noticeScheduleUncompleteList, "MONTHLY", sTime1 , sTime2 );
				}else if(search_type == "class"){
					vHtml += createPractice(v_course_id, newStudentList, noticeAttendList, practiceList, noticePracticeList, sTime1 , sTime2, is_check_practice );
					vHtml += createTask(noticeTaskList, sTime1 );
				}
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			$("#timetableDataList").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createSchedule(noticeScheduleList, noticeScheduleUncompleteList, categoryType, scheduleTime1, scheduleTime2 )
{
	var vHtml = "";
	var schedule_list = noticeScheduleList.filter(function(item, index){
		if((item.schedule_time == scheduleTime1 || item.schedule_time == scheduleTime2 ) && item.schedule_category == categoryType){
			return true;
		}
	});
	
	var uncomplete_list = noticeScheduleUncompleteList.filter(function(item, index){
		if((item.schedule_time == scheduleTime1 || item.schedule_time == scheduleTime2 ) && item.schedule_category == categoryType){
			return true;
		}
	});
	
	vHtml += '		<div class="row" style="margin:0">';
	for(var i=0; i<schedule_list.length; i++)
	{
		var schedule_success_count = schedule_list[i].schedule_success_count;
		var schedule_ignore_count  = schedule_list[i].schedule_ignore_count;
		var schedule_problem_count = schedule_list[i].schedule_problem_count;
		var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
		
		var bg_color = "btn-danger";
		if(schedule_list[i].schedule_work_count == schedule_total_count){
			if(schedule_problem_count > 0){
				bg_color = "btn-yellow";
			}else if(schedule_ignore_count > 0){
				bg_color = "btn-blue";
			}else{
				bg_color = "btn-success";
			}
		}
		vHtml += '<div class="col-4" style="padding:5px;padding-bottom:3px;">';
		vHtml += '	<button type="button" class="btn '+bg_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;" onclick="open_schedule('+schedule_list[i].id+')">';
		vHtml += schedule_list[i].schedule_title+'<br>('+schedule_list[i].course_group_name+' '+schedule_list[i].course_name+'반)';
		vHtml += '</button>';
		vHtml += '</div>';
	}
	
	for(var i=0; i<uncomplete_list.length; i++)
	{
		var schedule_success_count = uncomplete_list[i].schedule_success_count;
		var schedule_ignore_count  = uncomplete_list[i].schedule_ignore_count;
		var schedule_problem_count = uncomplete_list[i].schedule_problem_count;
		var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
		
		console.log(uncomplete_list[i].schedule_title+"==>"+schedule_success_count+"||"+schedule_ignore_count+"||"+schedule_problem_count+"||"+schedule_total_count);
		var bg_color = "btn-danger";
		if(uncomplete_list[i].schedule_work_count == schedule_total_count){
			if(schedule_problem_count > 0){
				bg_color = "btn-yellow";
			}else if(schedule_ignore_count > 0){
				bg_color = "btn-blue";
			}else{
				bg_color = "btn-success";
			}
		}
		vHtml += '<div class="col-4" style="padding:5px;padding-bottom:3px;">';
		vHtml += '	<button type="button" class="btn '+bg_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;" onclick="open_schedule('+uncomplete_list[i].id+')">';
		vHtml += uncomplete_list[i].schedule_title+'<br>('+uncomplete_list[i].course_group_name+' '+uncomplete_list[i].course_name+'반)';
		vHtml += '</button>';
		vHtml += '</div>';
	}
	vHtml += '		</div>';
	return vHtml;
}

function createPractice(v_course_id,newStudentList, noticeAttendList, practiceList, noticePracticeList, scheduleTime1, scheduleTime2, is_check_practice)
{
	var vHtml = "";
	//신규학생
	var new_student_list1 = newStudentList.filter(function(item, index){
		if(item.new_time == scheduleTime1){
			return true;
		}
	});
	
	var new_student_list2 = newStudentList.filter(function(item, index){
		if(item.new_time == scheduleTime2){
			return true;
		}
	});
	
	//출결
	var attend_list1 = noticeAttendList.filter(function(item, index){
		if(item.attend_time == scheduleTime1){
			return true;
		}
	});
	
	var attend_list2 = noticeAttendList.filter(function(item, index){
		if(item.attend_time == scheduleTime2){
			return true;
		}
	});
	
	var practice_list1 = practiceList.filter(function(item, index){
		if(item.start_time == scheduleTime1){
			return true;
		}
	});
	
	var practice_list2 = practiceList.filter(function(item, index){
		if(item.start_time == scheduleTime2){
			return true;
		}
	});
	
	vHtml += '<div class="row" style="margin:0">';
	
	for(var j=0; j<new_student_list1.length; j++)
	{
		var student_count = new_student_list1[j].student_count;
		var student_training_count = new_student_list1[j].student_training_count;
		var pTitle = new_student_list1[j].course_group_name+' '+ new_student_list1[j].course_name+'<br>오늘 신규<br>';
		vHtml += '<div class="col-4 text-center" style="padding:5px;">';
		var rate = Math.round(student_training_count/student_count*100);
		if(rate >= 80){
			bg_color = "btn-success";
		}else if(rate >= 60){
			bg_color = "btn-primary";
		}else if(rate >= 40){
			bg_color = "btn-yellow";
		}else{
			bg_color = "btn-danger";
		}
		vHtml += '	<button type="button" class="btn '+bg_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;" onClick="open_new_student('+new_student_list1[j].id+')">';
		vHtml += pTitle+'('+student_training_count+"/"+student_count+')';
		vHtml += '	</button>';
		vHtml += '</div>';
	}
	
	for(var j=0; j<new_student_list2.length; j++)
	{
		var student_count = new_student_list2[j].student_count;
		var student_training_count = new_student_list2[j].student_training_count;
		var pTitle = new_student_list2[j].course_group_name+' '+ new_student_list2[j].course_name+'<br>오늘 신규<br>';
		vHtml += '<div class="col-4 text-center" style="padding:5px;">';
		var rate = Math.round(student_training_count/student_count*100);
		if(rate >= 80){
			bg_color = "btn-success";
		}else if(rate >= 60){
			bg_color = "btn-primary";
		}else if(rate >= 40){
			bg_color = "btn-yellow";
		}else{
			bg_color = "btn-danger";
		}
		vHtml += '	<button type="button" class="btn '+bg_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;" onClick="open_new_student('+new_student_list2[j].id+')">';
		vHtml += pTitle+'('+student_training_count+"/"+student_count+')';
		vHtml += '	</button>';
		vHtml += '</div>';
	}
	
	for(var j=0; j<attend_list1.length; j++)
	{
		var student_count = attend_list1[j].student_count;
		var attend_count = attend_list1[j].attend_count;
		var pTitle = attend_list1[j].course_group_name+' '+ attend_list1[j].course_name+'<br>출결<br>';
		vHtml += '<div class="col-4 text-center" style="padding:5px;">';
		var rate = Math.round(attend_count/student_count*100);
		if(rate >= 80){
			bg_color = "btn-success";
		}else if(rate >= 60){
			bg_color = "btn-primary";
		}else if(rate >= 40){
			bg_color = "btn-yellow";
		}else{
			bg_color = "btn-danger";
		}
		vHtml += '	<button type="button" class="btn '+bg_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;" onClick="open_attend('+attend_list1[j].id+')">';
		vHtml += pTitle+'('+attend_count+"/"+student_count+')';
		vHtml += '</button>';
		vHtml += '</div>';
	}
	
	for(var j=0; j<attend_list2.length; j++)
	{
		var student_count = attend_list2[j].student_count;
		var attend_count = attend_list2[j].attend_count;
		var pTitle = attend_list2[j].course_group_name+' '+ attend_list2[j].course_name+'<br>출결<br>';
		vHtml += '<div class="col-4 text-center" style="padding:5px;">';
		var rate = Math.round(attend_count/student_count*100);
		if(rate >= 80){
			bg_color = "btn-success";
		}else if(rate >= 60){
			bg_color = "btn-primary";
		}else if(rate >= 40){
			bg_color = "btn-yellow";
		}else{
			bg_color = "btn-danger";
		}
		vHtml += '	<button type="button" class="btn '+bg_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;" onClick="open_attend('+attend_list2[j].id+')">';
		vHtml += pTitle+'('+attend_count+"/"+student_count+')';
		vHtml += '</button>';
		vHtml += '</div>';
	}
	
	for(var i=0; i<practice_list1.length; i++)
	{
		vHtml += '<div class="col-4 text-center" style="padding:5px;">';
		var pTitle = practice_list1[i].short_title_kr+'<br>'+ practice_list1[i].practice_name+'<br>';
		var disabled = "";
		var bg_color = "";
		var borderd = "";
		if(is_check_practice){
			var pSection = practice_list1[i].section;
			var pPractice_type = practice_list1[i].practice_type;
			var result_list = noticePracticeList.filter(function(item, index){
				if(item.course_id == v_course_id && item.section == pSection && item.practice_type == pPractice_type){
					return true;
				}
			});
			if(result_list.length > 0){
				var is_comment = true;
				var is_success = true;
				var total_count = 0;
				var total_success_count = 0;
				for(var t=0; t<result_list.length; t++)
				{
					if(!result_list[t].is_comments) is_comment = false;
					if(!result_list[t].is_success) is_success = false;
					
					var course_count  = result_list[t].course_count;
					var success_count = result_list[t].course_last_success_count;
					var giveup_count  = result_list[t].course_last_giveup_count;
					var calc_count    = course_count - giveup_count;
					total_count += calc_count;
					total_success_count += success_count;
				}
				var rate = Math.round(total_success_count/total_count*100);
				if(rate >= 80){
					bg_color = "btn-success";
				}else if(rate >= 60){
					bg_color = "btn-primary";
				}else if(rate >= 40){
					bg_color = "btn-yellow";
				}else{
					bg_color = "btn-danger";
				}
				
				if(is_success){
					disabled = "disabled";
				}else{
					if(is_comment){
						borderd = "border:5px solid #5ac8fa;";
						pTitle += "(작성 완료)"; 
					}else{
						pTitle += "(대안 작성)"; 
					}
				}
				
			}else{
				bg_color = "btn-inverse";
				disabled = "disabled";
			}
			
		}else{
			bg_color = "btn-inverse";
			disabled = "disabled";
		}
		vHtml += '	<button type="button" class="btn '+bg_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;'+borderd+'" onclick="open_practice(\''+v_course_id+'\',\''+practice_list1[i].section+'\',\''+practice_list1[i].practice_type+'\')" '+disabled+'>';
		vHtml += pTitle;
		vHtml += '</button>';

		vHtml += '</div>';
	}
	
	for(var i=0; i<practice_list2.length; i++)
	{
		vHtml += '<div class="col-4 text-center" style="padding:5px;">';
		var pTitle = practice_list2[i].short_title_kr+'<br>'+ practice_list2[i].practice_name+'<br>';
		var disabled = "";
		var bg_color = "";
		var borderd = "";
		if(is_check_practice){
			var pSection = practice_list2[i].section;
			var pPractice_type = practice_list2[i].practice_type;
			var result_list = noticePracticeList.filter(function(item, index){
				if(item.course_id == v_course_id && item.section == pSection && item.practice_type == pPractice_type){
					return true;
				}
			});
			if(result_list.length > 0){
				var is_comment = true;
				var is_success = true;
				var total_count = 0;
				var total_success_count = 0;
				for(var t=0; t<result_list.length; t++)
				{
					if(!result_list[t].is_comments) is_comment = false;
					if(!result_list[t].is_success) is_success = false;
					
					var course_count  = result_list[t].course_count;
					var success_count = result_list[t].course_last_success_count;
					var giveup_count  = result_list[t].course_last_giveup_count;
					var calc_count    = course_count - giveup_count;
					total_count += calc_count;
					total_success_count += success_count;
				}
				var rate = Math.round(total_success_count/total_count*100);
				if(rate >= 80){
					bg_color = "btn-success";
				}else if(rate >= 60){
					bg_color = "btn-primary";
				}else if(rate >= 40){
					bg_color = "btn-yellow";
				}else{
					bg_color = "btn-danger";
				}
				
				if(is_success){
					disabled = "disabled";
				}else{
					if(is_comment){
						borderd = "border:5px solid #5ac8fa;";
						pTitle += "(작성 완료)"; 
					}else{
						pTitle += "(대안 작성)"; 
					}
				}
				
			}else{
				bg_color = "btn-inverse";
				disabled = "disabled";
			}
			
		}else{
			bg_color = "btn-inverse";
			disabled = "disabled";
		}
		vHtml += '	<button type="button" class="btn '+bg_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;'+borderd+'" onclick="open_practice(\''+v_course_id+'\',\''+practice_list2[i].section+'\',\''+practice_list2[i].practice_type+'\')" '+disabled+'>';
		vHtml += pTitle;
		vHtml += '</button>';

		vHtml += '</div>';
	}
	vHtml += '</div>';
	return vHtml;
}

function createTask(noticeTaskList, taskTime )
{
	var task_list = noticeTaskList.filter(function(item, index){
		if(item.task_time == taskTime){
			return true;
		}
	});
	var vHtml = "";
		
	vHtml += '		<div class="row" style="margin:0">';
	for(var j=0; j<task_list.length; j++)
	{
		var v_task_id = task_list[j].id;
		var v_task_title = "TASK<br>"+task_list[j].task_title+'<br>'+task_list[j].task_reference_title;
		var v_task_status = task_list[j].task_status;
		
		var v_btn_color = "bg-grey";
		if(v_task_status == "TIMEING"){
			v_btn_color = "btn-grey";
		}else if(v_task_status == "STARTING"){
			v_btn_color = "btn-yellow";
		}else if(v_task_status == "WORKING"){
			v_btn_color = "btn-yellow";
		}else if(v_task_status == "RESPONSE"){
			v_btn_color = "btn-info";
		}else if(v_task_status == "RETURN"){
			v_btn_color = "btn-danger";
		}else if(v_task_status == "COMPLETE"){
			v_btn_color = "btn-success";
		}
		if(taskTime != "0")
		{
			vHtml += '<div class="col-6 style="padding:3px;">';
			vHtml += '<button type="button" class="btn '+v_btn_color+' btn-xs btn-block" style="font-size:0.7rem;min-height:75px;" onClick="open_task('+v_task_id+')">';
			vHtml += v_task_title;
			vHtml += '</button>';
			vHtml += '</div>';
		}
	}
	vHtml += '		</div>';
	
	return vHtml;
}

function open_task(v_id)
{
	location.href = "/main/dashboard_teacher_task.do?user_id="+$("#user_id").val()+"&&task_id="+v_id+"&&schedule_date="+$("#search_date").val()+"&&current_date="+current_date;
}

function open_new_student(v_id)
{
	location.href = "/main/dashboard_teacher_new_student.do?user_id="+$("#user_id").val()+"&&notice_new_student_id="+v_id+"&&schedule_date="+$("#search_date").val()+"&&current_date="+current_date;
}

function open_attend(v_id)
{
	location.href = "/main/dashboard_teacher_attend.do?user_id="+$("#user_id").val()+"&&notice_attend_id="+v_id+"&&schedule_date="+$("#search_date").val()+"&&current_date="+current_date;
}

function open_practice(v_course_id, v_section, v_practice_type)
{
	location.href = "/main/dashboard_teacher_practice.do?user_id="+$("#user_id").val()+"&&course_id="+v_course_id+"&&section="+v_section+"&&practice_type="+v_practice_type+"&&schedule_date="+$("#search_date").val()+"&&current_date="+current_date;
}

function open_schedule(v_id)
{
	location.href = "/main/dashboard_teacher_schedule.do?user_id="+$("#user_id").val()+"&&notice_schedule_id="+v_id+"&&current_date="+current_date+"&&schedule_date="+$("#search_date").val();
}