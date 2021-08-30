var current_date;
var aws_schedule_url = "https://s3.ap-northeast-2.amazonaws.com/";


var attend_status = {
		REGULAR_ATTENDED:{ name:"정상출석"},
		UNPERMITTED_LATE:{ name:"무단지각"},
		UNPERMITTED_ABSENT:{ name:"무단결석"},
		PERMITTED_LATE:{ name:"사유지각"},
		PERMITTED_ABSENT:{ name:"사유결석"}
	};

var array_btn_color = [
	"",
	"",
	"",
	""	
];

var junior_timetable = [
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["16:30","17:30"],
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

var user_id;
var user_name;

jQuery(document).ready(function(){
	search_oranization();
	user_id = parseInt($("#user_id").val());
	user_name = $("#user_name").val();
	var stats_date = $("#stats_date").val();
	if(stats_date)
	{
		$("#search_date").val(stats_date);
	}else{
		var to_day = cfmGetToDate();
		$("#search_date").val(to_day);
	}
	change_date();
	if(user_id > 0){
		$("#select_user_name").html(user_name);
		search_form();
	}else{
		showOraganization("N");
	}
	
});

var auth_oragnization_list;
var auth_user_oragnization_list;
var oHtml = "";

function search_oranization()
{
	$.ajax({
		type : "POST",
		url : "/base/getAuthOrganizationAllList.do",
		data:{
			
		},
		success:function(data){
			auth_user_oragnization_list = data.authUserOrganizationAllList;
			auth_oragnization_list = data.authOrganizationList;
			
			oHtml = "";
			oHtml += '<ul class="tree">';
			oHtml += '	<li>';
			oHtml += '		<span class="bg-red-lighter">';
			oHtml += '			<h5>어셔어학원</h5>';
			oHtml += '		</span>';
			create_down_organization(0);
			oHtml += '	</li>';
			oHtml += '</ul>';
			
			$("#organization_list").html(oHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_down_organization(v_id)
{
	var array_auth_oragnization = auth_oragnization_list.filter(function(item, index){
		if(item.organization_up_id == v_id){
			return true;
		}
	});
	if(array_auth_oragnization.length > 0){
		oHtml += '<ul>';
		for(var i=0; i<array_auth_oragnization.length; i++)
		{
			var t_id    = array_auth_oragnization[i].id;
			var t_level = array_auth_oragnization[i].organization_level;
			var t_name  = array_auth_oragnization[i].organization_name;
			var t_class = array_auth_oragnization[i].organization_icon;
			
			var array_auth_user_oragnization = auth_user_oragnization_list.filter(function(item, index){
				if(item.organization_id == t_id){
					return true;
				}
			});
			
			oHtml += '	<li>';
			oHtml += '		<span>';
			oHtml += '			<h5 class="text-white '+t_class+'" style="padding:5px;">'+t_name+'</h5>';
			if(array_auth_user_oragnization.length > 0)
			{
				oHtml += '<dl>';
				for(var j=0; j<array_auth_user_oragnization.length; j++)
				{
					var v_user_id   = array_auth_user_oragnization[j].user_id;
					var v_user_name = array_auth_user_oragnization[j].last_name+array_auth_user_oragnization[j].first_name;
					oHtml += '<dd style="text-align:left;font-size:1rem;padding-left:5px;">';
					oHtml += '	<a href="javascript:organization_select('+v_user_id+',\''+v_user_name+'\')" class="text-dark">';
					oHtml += '-&nbsp;'+v_user_name;
					oHtml += '</a>';
					oHtml += '</dd>';
				}
				oHtml += '</dl>';
			}
			oHtml += '		</span>';
			create_down_organization(t_id);
			oHtml += '	</li>';
		}
		oHtml += '</ul>';
	}
}

function showOraganization(isCancel)
{
	if(isCancel == "Y"){
		$("#btn_cancel_organization").show();
	}else{
		$("#btn_cancel_organization").hide();
	}
	
	$('#select_oraganization').modal({backdrop: 'static', keyboard: false}); 
}

function organization_select(v_id, v_name)
{
	$('#select_oraganization').modal("hide"); 
	
	user_id = v_id;
	user_name = v_name;
	
	$("#select_user_name").html(user_name);
	search_form();
}

function form_oraganization_cancel()
{
	$('#select_oraganization').modal("hide"); 
}

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

var array_alaram;
function search_form()
{
	array_alaram = Array();
	
	$.ajax({
		type : "POST",
		url : "/main/getTeacherScheduleList.do",
		data:{
			user_id:user_id,
			date:$("#search_date").val()
		},
		success:function(data){
			var tr_bg_class = "";
			
			var search_date = $("#search_date").val();
			current_date = data.currentInfo.cur_date;
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
			vHtml += '	<th class="text-center" colspan="2">시간 지정 없음</th>';
			//TASK
			vHtml += '	<td>';
			var task_list = noticeTaskList.filter(function(item, index){
				if(item.task_time == "0"){
					return true;
				}
			});
			vHtml += '		<div class="row" style="margin:0">';
			for(var i=0; i<task_list.length; i++)
			{
				vHtml += '<div class="col-3 text-center" style="padding:3px;">';
				vHtml += '	<div class="draggable section-drag bg-grey-lighter" style="width:100%;padding:5px;">';
				vHtml += '		<input type="hidden" name="task_id" value="'+task_list[i].id+'">';
				vHtml += task_list[i].task_title+'<br>';
				vHtml += task_list[i].task_reference_title;
				vHtml += '	</div>';
				vHtml += '</div>';
			}
			vHtml += '		</div>';
			vHtml += '	</td>';
			//Daily
			vHtml += '	<td>';
			var daily_list = noticeScheduleList.filter(function(item, index){
				if(item.schedule_time == "0" && item.schedule_category == "DAILY"){
					return true;
				}
			});
			vHtml += '		<div class="row" style="margin:0">';
			for(var i=0; i<daily_list.length; i++)
			{
				var bg_color = "btn-danger";
				var schedule_success_count = daily_list[i].schedule_success_count;
				var schedule_ignore_count  = daily_list[i].schedule_ignore_count;
				var schedule_problem_count = daily_list[i].schedule_problem_count;
				var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
				var schedule_work_count = daily_list[i].schedule_work_count; 
				if(schedule_work_count == schedule_total_count){
					if(schedule_problem_count > 0){
						bg_color = "btn-yellow";
					}else if(schedule_ignore_count > 0){
						bg_color = "btn-blue";
					}else{
						bg_color = "btn-success";
					}
				}
				vHtml += '<div class="col-12" style="padding:3px;">';
				vHtml += '	<button id="notice_schedule_'+daily_list[i].id+'" type="button" class="btn '+bg_color+' btn-xs btn-block" onclick="open_schedule('+daily_list[i].id+')">'+daily_list[i].schedule_title+'('+daily_list[i].course_group_name+' '+daily_list[i].course_name+')('+schedule_total_count+'/'+schedule_work_count+')'+'</button>';
				vHtml += '</div>';
			}
			vHtml += '		</div>';
			vHtml += '	</td>';
			//Monthly
			vHtml += '	<td>';
			var monthly_list = noticeScheduleList.filter(function(item, index){
				if(item.schedule_time == "0" && item.schedule_category == "MONTHLY"){
					return true;
				}
			});
			
			var uncomplete_list = noticeScheduleUncompleteList.filter(function(item, index){
				if(item.schedule_time == "0" && item.schedule_category == "MONTHLY"){
					return true;
				}
			});
			vHtml += '		<div class="row" style="margin:0">';
			for(var i=0; i<monthly_list.length; i++)
			{
				var bg_color = "btn-danger";
				var schedule_success_count = monthly_list[i].schedule_success_count;
				var schedule_ignore_count  = monthly_list[i].schedule_ignore_count;
				var schedule_problem_count = monthly_list[i].schedule_problem_count;
				var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
				var schedule_work_count = monthly_list[i].schedule_work_count; 
				if(schedule_work_count == schedule_total_count){
					if(schedule_problem_count > 0){
						bg_color = "btn-yellow";
					}else if(schedule_ignore_count > 0){
						bg_color = "btn-blue";
					}else{
						bg_color = "btn-success";
					}
				}
				vHtml += '<div class="col-12 mb-2" style="padding:3px;">';
				vHtml += '	<button  id="notice_schedule_'+monthly_list[i].id+'" type="button" class="btn '+bg_color+' btn-xs btn-block" onclick="open_schedule('+monthly_list[i].id+')">'+monthly_list[i].schedule_title+'('+monthly_list[i].course_group_name+' '+monthly_list[i].course_name+')('+schedule_total_count+'/'+schedule_work_count+')'+'</button>';
				vHtml += '</div>';
			}
			
			for(var i=0; i<uncomplete_list.length; i++)
			{
				var bg_color = "btn-danger";
				var schedule_success_count = uncomplete_list[i].schedule_success_count;
				var schedule_ignore_count  = uncomplete_list[i].schedule_ignore_count;
				var schedule_problem_count = uncomplete_list[i].schedule_problem_count;
				var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
				var schedule_work_count = uncomplete_list[i].schedule_work_count; 
				if(schedule_work_count == schedule_total_count){
					if(schedule_problem_count > 0){
						bg_color = "btn-yellow";
					}else if(schedule_ignore_count > 0){
						bg_color = "btn-blue";
					}else{
						bg_color = "btn-success";
					}
				}
				vHtml += '<div class="col-12 mb-2" style="padding:3px;">';
				vHtml += '	<button  id="notice_schedule_'+uncomplete_list[i].id+'" type="button" class="btn '+bg_color+' btn-xs btn-block" onclick="open_schedule('+uncomplete_list[i].id+')">'+uncomplete_list[i].schedule_title+'('+uncomplete_list[i].course_group_name+' '+uncomplete_list[i].course_name+')('+schedule_total_count+'/'+schedule_work_count+')'+'</button>';
				vHtml += '</div>';
			}
			vHtml += '		</div>';
			vHtml += '	</td>';
			
			vHtml += '</tr>';
			for(var i=0; i<base_timetable.length; i++)
			{
				var is_check_practice = false;
				var bsHour = base_timetable[i][0];
				var beHour = base_timetable[i][1];
				var jsHour = junior_timetable[i][0];
				var jeHour = junior_timetable[i][1];
				
				var sHour = bsHour;
				if(jsHour) sHour += "<br>"+jsHour+"(주니어)"
				
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
					tr_bg_class = "bg-gradient-grey";
					is_check_practice = true;
				}else{
					is_check_practice = true;
					tr_bg_class = "bg-gradient-grey";
				}
				vHtml += '<tr class="'+tr_bg_class+'">';
				vHtml += '	<th class="text-center">'+sHour+'</th>';
				vHtml += '	<th class="text-center">'+v_course+'<br>'+v_practice+'<br>';
				if(v_section){
					vHtml += '<button type="button" class="btn btn-pink btn-xs btn-block" onClick="go_schedule(\''+v_course_id+'\',\''+v_section+'\')">실라바스 바로가기</button>';
					vHtml += '<button type="button" class="btn btn-purple btn-xs btn-block" onClick="go_achieve(\''+v_course_id+'\',\''+v_section+'\')">성취표 바로가기</button>';
					if(v_study_type=="CLASS" && (v_section == "LISTENING" || v_section == "READING" || v_section == "GRAMMAR" || v_section == "SPEAKING" || v_section == "WRITING")){
						vHtml += '<button type="button" class="btn btn-indigo btn-xs btn-block" onClick="go_class(\''+v_course_id+'\',\''+v_section+'\')">수업 바로가기</button>';
					}
				}
				vHtml += '</th>';
				
				//신규학생
				var new_student_list1 = newStudentList.filter(function(item, index){
					if(item.new_time == bsHour){
						return true;
					}
				});
				
				var new_student_list2 = newStudentList.filter(function(item, index){
					if(item.new_time == jsHour){
						return true;
					}
				});
				
				
				//출결
				var attend_list1 = noticeAttendList.filter(function(item, index){
					if(item.attend_time == bsHour){
						return true;
					}
				});
				
				var attend_list2 = noticeAttendList.filter(function(item, index){
					if(item.attend_time == jsHour){
						return true;
					}
				});
				//성적
				var practice_list1 = practiceList.filter(function(item, index){
					if(item.start_time == bsHour){
						return true;
					}
				});
				
				var practice_list2 = practiceList.filter(function(item, index){
					if(item.start_time == jsHour){
						return true;
					}
				});
				
				var task_list = noticeTaskList.filter(function(item, index){
					if(item.task_time == bsHour){
						return true;
					}
				});
				
				vHtml += '	<td>';
				if(v_course){
					vHtml += '		<div class="row" style="margin:0;width:100%;;min-height:55px;">';
				}else{
					vHtml += '		<div class="row droppable" style="margin:0;width:100%;;min-height:55px;">';
					vHtml += '			<input type="hidden" name="task_time" value="'+bsHour+'">';
				}

				for(var j=0; j<new_student_list1.length; j++)
				{
					var student_count = new_student_list1[j].student_count;
					var student_training_count = new_student_list1[j].student_training_count;
					var pTitle = new_student_list1[j].course_group_name+' '+ new_student_list1[j].course_name+'<br>오늘 신규<br>';
					vHtml += '<div class="col-3 text-center" style="padding:5px;">';
					var rate = Math.round(student_training_count/student_count*100);
					if(rate >= 80){
						vHtml += '<div id="new_student_'+new_student_list1[j].course_id+'" class="bg-green-lighter" style="width:100%;padding:5px;">';
					}else if(rate >= 60){
						vHtml += '<div id="new_student_'+new_student_list1[j].course_id+'" class="bg-blue-lighter" style="width:100%;padding:5px;">';
					}else if(rate >= 40){
						vHtml += '<div id="new_student_'+new_student_list1[j].course_id+'" class="bg-yellow-lighter" style="width:100%;padding:5px;">';
					}else{
						vHtml += '<div id="new_student_'+new_student_list1[j].course_id+'" class="bg-red-lighter" style="width:100%;padding:5px;">';
					}
					vHtml += pTitle+'(<span id="new_student_title_'+new_student_list1[j].course_id+'">'+student_training_count+"/"+student_count+'</span>)<br>';
					if(current_date == search_date){
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="open_new_student('+new_student_list1[j].id+')">신규 관리</button>';
					}
					vHtml += '</div>';
					vHtml += '</div>';
				}
				
				for(var j=0; j<new_student_list2.length; j++)
				{
					var student_count = new_student_list2[j].student_count;
					var student_training_count = new_student_list2[j].student_training_count;
					var pTitle = new_student_list2[j].course_group_name+' '+ new_student_list2[j].course_name+'<br>오늘 신규<br>';
					vHtml += '<div class="col-3 text-center" style="padding:5px;">';
					var rate = Math.round(student_training_count/student_count*100);
					if(rate >= 80){
						vHtml += '<div id="new_student_'+new_student_list2[j].course_id+'" class="bg-green-lighter" style="width:100%;padding:5px;">';
					}else if(rate >= 60){
						vHtml += '<div id="new_student_'+new_student_list2[j].course_id+'" class="bg-blue-lighter" style="width:100%;padding:5px;">';
					}else if(rate >= 40){
						vHtml += '<div id="new_student_'+new_student_list2[j].course_id+'" class="bg-yellow-lighter" style="width:100%;padding:5px;">';
					}else{
						vHtml += '<div id="new_student_'+new_student_list2[j].course_id+'" class="bg-red-lighter" style="width:100%;padding:5px;">';
					}
					vHtml += pTitle+'(<span id="new_student_title_'+new_student_list2[j].course_id+'">'+student_training_count+"/"+student_count+'</span>)<br>';
					if(current_date == search_date){
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="open_new_student('+new_student_list2[j].id+')">신규 관리</button>';
					}
					vHtml += '</div>';
					vHtml += '</div>';
				}
				
				
				for(var j=0; j<attend_list1.length; j++)
				{
					var student_count = attend_list1[j].student_count;
					var attend_count = attend_list1[j].attend_count;
					var pTitle = attend_list1[j].course_group_name+' '+ attend_list1[j].course_name+'<br>출결<br>';
					vHtml += '<div class="col-3 text-center" style="padding:5px;">';
					var rate = Math.round(attend_count/student_count*100);
					if(rate >= 80){
						vHtml += '<div class="bg-green-lighter" style="width:100%;padding:5px;">';
					}else if(rate >= 60){
						vHtml += '<div class="bg-blue-lighter" style="width:100%;padding:5px;">';
					}else if(rate >= 40){
						vHtml += '<div class="bg-yellow-lighter" style="width:100%;padding:5px;">';
					}else{
						vHtml += '<div class="bg-red-lighter" style="width:100%;padding:5px;">';
					}
					vHtml += pTitle+'('+attend_count+"/"+student_count+')<br>';
					if(current_date == search_date){
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="open_attend('+attend_list1[j].id+')">출결 작성</button>';
					}
					vHtml += '</div>';
					vHtml += '</div>';
				}
				
				for(var j=0; j<attend_list2.length; j++)
				{
					var student_count = attend_list2[j].student_count;
					var attend_count = attend_list2[j].attend_count;
					var pTitle = attend_list2[j].course_group_name+' '+ attend_list2[j].course_name+'<br>출결<br>';
					vHtml += '<div class="col-3 text-center" style="padding:5px;">';
					var rate = Math.round(attend_count/student_count*100);
					if(rate >= 80){
						vHtml += '<div class="bg-green-lighter" style="width:100%;padding:5px;">';
					}else if(rate >= 60){
						vHtml += '<div class="bg-blue-lighter" style="width:100%;padding:5px;">';
					}else if(rate >= 40){
						vHtml += '<div class="bg-yellow-lighter" style="width:100%;padding:5px;">';
					}else{
						vHtml += '<div class="bg-red-lighter" style="width:100%;padding:5px;">';
					}
					vHtml += pTitle+'('+attend_count+"/"+student_count+')<br>';
					if(current_date == search_date){
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="open_attend('+attend_list2[j].id+')">출결 작성</button>';
					}
					vHtml += '</div>';
					vHtml += '</div>';
				}
				
				

				for(var j=0; j<practice_list1.length; j++)
				{
					var pTitle = practice_list1[j].short_title_kr+'<br>'+ practice_list1[j].practice_name+'<br>';
					
					vHtml += '<div class="col-3 text-center" style="padding:5px;">';
					if(is_check_practice){
						var pSection = practice_list1[j].section;
						var pPractice_type = practice_list1[j].practice_type;
						var result_list = noticePracticeList.filter(function(item, index){
							if(item.course_id == v_course_id && item.section == pSection && item.practice_type == pPractice_type){
								return true;
							}
						});
						if(result_list.length > 0){
							var is_comment = true;
							var is_success = true;
							var rTitle = "";
							var total_count = 0;
							var total_success_count = 0;
							for(var t=0; t<result_list.length; t++)
							{
								if(!result_list[t].is_comments) is_comment = false;
								if(!result_list[t].is_success) is_success = false;
								
								if(t > 0) rTitle += ",";
								var course_count  = result_list[t].course_count;
								var success_count = result_list[t].course_last_success_count;
								var giveup_count  = result_list[t].course_last_giveup_count;
								var calc_count    = course_count - giveup_count;
								rTitle += success_count+"/"+calc_count;
								total_count += calc_count;
								total_success_count += success_count;
							}
							var rate = Math.round(total_success_count/total_count*100);
							if(rate >= 80){
								vHtml += '<div class="bg-green-lighter" style="width:100%;padding:5px;">';
							}else if(rate >= 60){
								vHtml += '<div class="bg-blue-lighter" style="width:100%;padding:5px;">';
							}else if(rate >= 40){
								vHtml += '<div class="bg-yellow-lighter" style="width:100%;padding:5px;">';
							}else{
								vHtml += '<div class="bg-red-lighter" style="width:100%;padding:5px;">';
							}
							vHtml += pTitle+'('+rTitle+')<br>';
							//if(current_date == search_date){
								if(is_success)
								{
									vHtml += '&nbsp;';
								}else{
									if(is_comment){
										vHtml += '<button type="button" id="'+practice_list1[j].section+'_'+practice_list1[j].practice_type+'_'+v_course_id+'" class="btn btn-default btn-xs btn-block text-success" onClick="open_practice(\''+v_course_id+'\',\''+practice_list1[j].section+'\',\''+practice_list1[j].practice_type+'\')">대안 작성</button>';
									}else{
										
										vHtml += '<button type="button" id="'+practice_list1[j].section+'_'+practice_list1[j].practice_type+'_'+v_course_id+'" class="btn btn-default btn-xs btn-block text-danger" onClick="open_practice(\''+v_course_id+'\',\''+practice_list1[j].section+'\',\''+practice_list1[j].practice_type+'\')">대안 작성</button>';
										var objAlaram = Object();
										objAlaram.title = "STUDY";
										objAlaram.content = v_course+'의'+""+practice_list1[j].short_title_kr+" " + practice_list1[j].practice_name+" 대안을 작성하세요.";
										array_alaram.push(objAlaram);
									}
								}
							//}
						}else{
							//vHtml += '<div class="bg-red-lighter" style="width:100%;padding:5px;">';
							//vHtml += pTitle+'실라버스 없음<br>';
							vHtml += '<div class="bg-grey-darker" style="width:100%;padding:5px;">';
							vHtml += pTitle+'&nbsp;<br>';
							
						}
					}else{
						vHtml += '<div class="bg-grey-darker" style="width:100%;padding:5px;">';
						vHtml += pTitle+'<br>';
					}
					
					vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_achieve_detail(\''+v_course_id+'\',\''+practice_list1[j].section+'\',\''+practice_list1[j].practice_type+'\')">상세성취표 바로가기</button>';
					if(practice_list1[j].program_use == "Y"){
						vHtml += '&nbsp;';
					}else{
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_oxtest(\''+v_course_id+'\',\''+practice_list1[j].section+'\',\''+practice_list1[j].practice_type+'\')">OX 바로가기</button>';
					}
					vHtml += '</div>';
					vHtml += '</div>';
				}
				
				for(var j=0; j<practice_list2.length; j++)
				{
					var pTitle = practice_list2[j].short_title_kr+'<br>'+ practice_list2[j].practice_name+'<br>';
					
					vHtml += '<div class="col-3 text-center" style="padding:5px;">';
					if(is_check_practice){
						var pSection = practice_list2[j].section;
						var pPractice_type = practice_list2[j].practice_type;
						var result_list = noticePracticeList.filter(function(item, index){
							if(item.course_id == v_course_id && item.section == pSection && item.practice_type == pPractice_type){
								return true;
							}
						});
						if(result_list.length > 0){
							var rTitle = "";
							var total_count = 0;
							var total_success_count = 0;
							var is_comment = true;
							var is_success = true;
							for(var t=0; t<result_list.length; t++)
							{
								if(!result_list[t].is_comments) is_comment = false;
								if(!result_list[t].is_success) is_success = false;
								if(t > 0) rTitle += ",";
								var course_count  = result_list[t].course_count;
								var success_count = result_list[t].course_last_success_count;
								var giveup_count  = result_list[t].course_last_giveup_count;
								var calc_count    = course_count - giveup_count;
								rTitle += success_count+"/"+calc_count;
								total_count += calc_count;
								total_success_count += success_count;
							}
							var rate = Math.round(total_success_count/total_count*100);
							if(rate >= 80){
								vHtml += '<div class="bg-green-lighter" style="width:100%;padding:5px;">';
							}else if(rate >= 60){
								vHtml += '<div class="bg-blue-lighter" style="width:100%;padding:5px;">';
							}else if(rate >= 40){
								vHtml += '<div class="bg-yellow-lighter" style="width:100%;padding:5px;">';
							}else{
								vHtml += '<div class="bg-red-lighter" style="width:100%;padding:5px;">';
							}
							vHtml += pTitle+'('+rTitle+')<br>';
							//if(current_date == search_date){
								if(is_success)
								{
									vHtml += '&nbsp;';
								}else{
									if(is_comment){
										vHtml += '<button type="button" id="'+practice_list2[j].section+'_'+practice_list2[j].practice_type+'_'+v_course_id+'" class="btn btn-default btn-xs btn-block text-success" onClick="open_practice(\''+v_course_id+'\',\''+practice_list2[j].section+'\',\''+practice_list2[j].practice_type+'\')">대안 작성</button>';
									}else{
										vHtml += '<button type="button" id="'+practice_list2[j].section+'_'+practice_list2[j].practice_type+'_'+v_course_id+'" class="btn btn-default btn-xs btn-block text-danger" onClick="open_practice(\''+v_course_id+'\',\''+practice_list2[j].section+'\',\''+practice_list2[j].practice_type+'\')">대안 작성</button>';
										var objAlaram = Object();
										objAlaram.title = "STUDY";
										objAlaram.content = v_course+'의'+""+practice_list2[j].short_title_kr+" " + practice_list2[j].practice_name+" 대안을 작성하세요.";
										array_alaram.push(objAlaram);

									}
								}
								
							//} 
							
						}else{
							//vHtml += '<div class="bg-red-lighter" style="width:100%;padding:5px;">';
							//vHtml += pTitle+'실라버스 없음<br>';
							vHtml += '<div class="bg-grey-darker" style="width:100%;padding:5px;">';
							vHtml += pTitle+'&nbsp;<br>';
							
						}
					}else{
						vHtml += '<div class="bg-grey-darker" style="width:100%;padding:5px;">';
						vHtml += pTitle+'<br>';
					}
					vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_achieve_detail(\''+v_course_id+'\',\''+practice_list2[j].section+'\',\''+practice_list2[j].practice_type+'\')">상세성취표 바로가기</button>';
					if(practice_list2[j].program_use == "Y"){
						vHtml += '&nbsp;';
					}else{
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_oxtest(\''+v_course_id+'\',\''+practice_list2[j].section+'\',\''+practice_list2[j].practice_type+'\')">OX 바로가기</button>';
					}
					vHtml += '</div>';
					vHtml += '</div>';
				}
				for(var j=0; j<task_list.length; j++)
				{
					var v_task_id = task_list[j].id;
					var v_task_title = "TASK<br>"+task_list[j].task_title+'<br>'+task_list[j].task_reference_title;
					var v_task_status = task_list[j].task_status;
					
					var v_btn_color = "";
					if(v_task_status == "TIMEING"){
						v_btn_color = "btn-grey";
					}else if(v_task_status == "WORKING"){
						v_btn_color = "btn-yellow";
					}else if(v_task_status == "RESPONSE"){
						v_btn_color = "btn-info";
					}else if(v_task_status == "RETURN"){
						v_btn_color = "btn-danger";
					}else if(v_task_status == "COMPLETE"){
						v_btn_color = "btn-success";
					}
					vHtml += '<div class="col-3 style="padding:3px;">';
					vHtml += '<button id="task_'+v_task_id+'" type="button" class="btn '+v_btn_color+' btn-xs btn-block" onClick="open_task('+v_task_id+')">';
					vHtml += v_task_title;
					vHtml += '</button>';
					vHtml += '</div>';
				}
				
				vHtml += '		</div>';
				vHtml += '	</td>';
				
				//Daily
				vHtml += '	<td>';
				var daily_list = noticeScheduleList.filter(function(item, index){
					if((item.schedule_time == sTime1 || item.schedule_time == sTime2 ) && item.schedule_category == "DAILY"){
						return true;
					}
				});
				vHtml += '		<div class="row" style="margin:0">';
				for(var j=0; j<daily_list.length; j++)
				{
					var bg_color = "btn-danger";
					var schedule_success_count = daily_list[j].schedule_success_count;
					var schedule_ignore_count  = daily_list[j].schedule_ignore_count;
					var schedule_problem_count = daily_list[j].schedule_problem_count;
					var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
					var schedule_work_count = daily_list[j].schedule_work_count; 
					if(schedule_work_count == schedule_total_count){
						if(schedule_problem_count > 0){
							bg_color = "btn-yellow";
						}else if(schedule_ignore_count > 0){
							bg_color = "btn-blue";
						}else {
							bg_color = "btn-success";
						}
					}else{
						if(is_check_practice){
							var objAlaram = Object();
							objAlaram.title = "DAILY";
							objAlaram.content = daily_list[j].schedule_title;
							array_alaram.push(objAlaram);
						}
					}
					vHtml += '<div class="col-12" style="padding:3px;">';
					vHtml += '	<button id="notice_schedule_'+daily_list[j].id+'" type="button" class="btn '+bg_color+' btn-xs btn-block" onclick="open_schedule('+daily_list[j].id+')">'+daily_list[j].schedule_title+'('+daily_list[j].course_group_name+' '+daily_list[j].course_name+')('+schedule_total_count+'/'+schedule_work_count+')'+'</button>';
					vHtml += '</div>';
				}
				vHtml += '		</div>';
				vHtml += '	</td>';
				//Monthly
				vHtml += '	<td>';
				var monthly_list = noticeScheduleList.filter(function(item, index){
					if((item.schedule_time == sTime1 || item.schedule_time == sTime2 ) && item.schedule_category == "MONTHLY"){
						return true;
					}
				});
				
				var uncomplete_list = noticeScheduleUncompleteList.filter(function(item, index){
					if((item.schedule_time == sTime1 || item.schedule_time == sTime2 ) && item.schedule_category == "MONTHLY"){
						return true;
					}
				});
				
				vHtml += '		<div class="row" style="margin:0">';
				for(var j=0; j<monthly_list.length; j++)
				{
					var bg_color = "btn-danger";
					var schedule_success_count = monthly_list[j].schedule_success_count;
					var schedule_ignore_count  = monthly_list[j].schedule_ignore_count;
					var schedule_problem_count = monthly_list[j].schedule_problem_count;
					var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
					var schedule_work_count = monthly_list[j].schedule_work_count; 
					if(schedule_work_count == schedule_total_count){
						if(schedule_problem_count > 0){
							bg_color = "btn-yellow";
						}else if(schedule_ignore_count > 0){
							bg_color = "btn-blue";
						}else{
							bg_color = "btn-success";
						}
					}else{
						if(is_check_practice){
							var objAlaram = Object();
							objAlaram.title = "MONTHLY";
							objAlaram.content = monthly_list[j].schedule_title;
							array_alaram.push(objAlaram);
						}
					}
					vHtml += '<div class="col-12 style="padding:3px;">';
					vHtml += '	<button id="notice_schedule_'+monthly_list[j].id+'" type="button" class="btn '+bg_color+' btn-xs btn-block" onclick="open_schedule('+monthly_list[j].id+')">'+monthly_list[j].schedule_title+'('+monthly_list[j].course_group_name+' '+monthly_list[j].course_name+')('+schedule_total_count+'/'+schedule_work_count+')'+'</button>';
					vHtml += '</div>';
				}
				
				for(var j=0; j<uncomplete_list.length; j++)
				{
					var bg_color = "btn-danger";
					var schedule_success_count = uncomplete_list[j].schedule_success_count;
					var schedule_ignore_count  = uncomplete_list[j].schedule_ignore_count;
					var schedule_problem_count = uncomplete_list[j].schedule_problem_count;
					var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
					var schedule_work_count = uncomplete_list[j].schedule_work_count; 
					if(schedule_work_count == schedule_total_count){
						if(schedule_problem_count > 0){
							bg_color = "btn-yellow";
						}else if(schedule_ignore_count > 0){
							bg_color = "btn-blue";
						}else{
							bg_color = "btn-success";
						}
					}else{
						if(is_check_practice){
							var objAlaram = Object();
							objAlaram.title = "MONTHLY";
							objAlaram.content = uncomplete_list[j].schedule_title;
							array_alaram.push(objAlaram);
						}
					}
					vHtml += '<div class="col-12 style="padding:3px;">';
					vHtml += '	<button id="notice_schedule_'+uncomplete_list[j].id+'" type="button" class="btn '+bg_color+' btn-xs btn-block" onclick="open_schedule('+uncomplete_list[j].id+')">'+uncomplete_list[j].schedule_title+'('+uncomplete_list[j].course_group_name+' '+uncomplete_list[j].course_name+')('+schedule_total_count+'/'+schedule_work_count+')'+'</button>';
					vHtml += '</div>';
				}
				vHtml += '		</div>';
				vHtml += '	</td>';
				vHtml += '</tr>';
				
			}
			$("#timetableDataList").html(vHtml);
			/*
			open_alram();
			
			if(current_date == search_date){
				initEvent();
			}
			*/
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function initEvent()
{
	$(".draggable").draggable({
		revert: true,
		zIndex: 999999
	});
	
	$(".droppable").droppable({
		drop: function (event, ui) {
			var task_id      = ui.draggable.find("input[name=task_id]").val();
			var task_time    = $(this).find("input[name=task_time]").val();
			var drop_target  = $(this);
			var drag_target  = ui.draggable;
			$.ajax({
				type : "POST",
				url : "/main/moveNoticesTask.do",
				data : {
					id:task_id,
					task_time:task_time
				},
				success:function(data){
					var task_id = data.id;
					var task_title = "TASK<br>"+data.task_title+'<br>'+data.task_reference_title;
					
					var vHtml = "";
					vHtml += '<div class="col-3 style="padding:3px;">';
					vHtml += '<button id="task_'+task_id+'" type="button" class="btn btn-warning btn-xs btn-block" onClick="open_task('+task_id+')">';
					vHtml += task_title;
					vHtml += '</button>';
					vHtml += '</div>';
					drop_target.append(vHtml);
					drag_target.remove();
				},
				error:function(event){				
					alert("잠시후 다시 시도 바랍니다.");
				}
			});
		}
	});
}

var task_id;
function open_task(v_id)
{
	task_id = v_id;
	$.ajax({
		type : "POST",
		url : "/main/getNoticesTask.do",
		data : {
			id:v_id			
		},
		success:function(data){
			$("#task_title").html(data.task_title);
			$("#task_reference_title").html(data.task_reference_title);
			$("#task_reference_content").html(data.task_reference_content);
			if(data.task_return_content)
			{
				$("#task_return_content").html(data.task_reference_content);
				$("#div_task_return_content").show();
			}else{
				$("#div_task_return_content").hide();
			}
			if(data.task_reference_image)
			{
				$("#task_reference_image").html('<img src="'+data.task_reference_image+'" style="border:1px solid #000;width:100%;">');
				$("#div_task_reference_image").show();
			}else{
				$("#div_task_reference_image").hide();
			}
			
			if(data.task_reference_url)
			{
				$("#task_reference_url").html('<a href="'+data.task_reference_url+'" class="text-dark" target="_blank"><h5>'+data.task_reference_url+'</h5></a>');
				$("#div_task_reference_url").show();
			}else{
				$("#div_task_reference_url").hide();
			}
			
			if(data.task_reference_file)
			{
				$("#task_reference_file").html('<a href="'+data.task_reference_file+'" class="text-dark" target="_blank"><h5>'+data.task_reference_file_name+'</h5></a>');
				$("#div_task_reference_file").show();
			}else{
				$("#div_task_reference_file").hide();
			}
			
			$("#task_content").val(cfmNvl1(data.task_content));
			$("#task_image").val(cfmNvl1(data.task_image));
			$("#task_image_name").val(cfmNvl1(data.task_image_name));
			$("#task_url").val(cfmNvl1(data.task_url));
			$("#task_file").val(cfmNvl1(data.task_file));
			$("#task_file_name").val(cfmNvl1(data.task_file_name));
			
			if(data.task_report_image){
				$("#div_task_image1").show();
				$("#div_task_image2").show();
				$("#div_task_image3").show();
				if(data.task_image){
					$("#span_task_image_name").html(data.task_image_name);
					$("#div_task_image3").html('<a href="'+data.task_image+'" target="_blank"><img src="'+data.task_image+'" style="border:1px solid #000;width:100%;"></a>');
				}else{
					$("#span_task_image_name").html('');
					$("#div_task_image3").html('');
				}
			}else{
				$("#div_task_image1").hide();
				$("#div_task_image2").hide();
				$("#div_task_image3").hide();
			}
			
			if(data.task_report_url){
				$("#div_task_url1").show();
				$("#div_task_url2").show();
			}else{
				$("#div_task_url1").hide();
				$("#div_task_url2").hide();
			}

			
			if(data.task_report_file){
				if(data.task_file){
					$("#span_task_file_name").html('<a href="'+data.task_file+'" class="text-dark" target="_blank">'+data.task_file_name+'</a>');
				}else{
					$("#span_task_file_name").html('');
				}
				$("#div_task_file1").show();
				$("#div_task_file2").show();
			}else{
				$("#div_task_file1").hide();
				$("#div_task_file2").hide();
			}

			$('#modal-notice-task').modal({backdrop: 'static', keyboard: false}); 
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function task_save(v_status)
{
	$.ajax({
		type : "POST",
		url : "/main/updateNoticesTask.do",
		data : {
			id:task_id,
			task_status:v_status,
			task_content:$("#task_content").val(),
			task_image:$("#task_image").val(),
			task_image_name:$("#task_image_name").val(),
			task_url:$("#task_url").val(),
			task_file:$("#task_file").val(),
			task_file_name:$("#task_file_name").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#task_"+task_id).removeClass("btn-warning");
			$("#task_"+task_id).removeClass("btn-purple");
			$("#task_"+task_id).removeClass("btn-info");
			$("#task_"+task_id).removeClass("btn-danger");
			$("#task_"+task_id).removeClass("btn-success");
			if(v_status == "WORKING"){
				$("#task_"+task_id).addClass("btn-purple");
			}else if(v_status == "RESPONSE"){
				$("#task_"+task_id).addClass("btn-info");
			}
			$('#modal-notice-task').modal("hide"); 
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function open_alram()
{
	var vHtml = "";
	
	var study_list = array_alaram.filter(function(item, index){
		if(item.title == "STUDY"){
			return true;
		}
	});
	var daily_list = array_alaram.filter(function(item, index){
		if(item.title == "DAILY"){
			return true;
		}
	});
	var monthly_list = array_alaram.filter(function(item, index){
		if(item.title == "MONTHLY"){
			return true;
		}
	});
	
	if(study_list.length > 0)
	{
		vHtml += '<div class="col-12">';
		vHtml += '	<h5>수업/스터디 대안 작성</h5>';
		vHtml += '</div>';
		
		for(var i=0; i<study_list.length; i++)
		{
			vHtml += '<div class="col-12">';
			vHtml += '	<div class="alert alert-danger fade show m-b-10">';
			vHtml += study_list[i].content;
			vHtml += '	</div>';
			vHtml += '</div>';
		}
	}
	
	if(daily_list.length > 0)
	{
		if(vHtml){
			vHtml += '<div class="col-12">';
			vHtml += '	<div class="divider"></div>';
			vHtml += '</div>';
		}
		vHtml += '<div class="col-12">';
		vHtml += '	<h5>Daily Routine</h5>';
		vHtml += '</div>';
		
		for(var i=0; i<daily_list.length; i++)
		{
			vHtml += '<div class="col-12">';
			vHtml += '	<div class="alert alert-danger fade show m-b-10">';
			vHtml += daily_list[i].content;
			vHtml += '	</div>';
			vHtml += '</div>';
		}
	}
	
	if(monthly_list.length > 0)
	{
		if(vHtml){
			vHtml += '<div class="col-12">';
			vHtml += '	<div class="divider"></div>';
			vHtml += '</div>';
		}
		vHtml += '<div class="col-12">';
		vHtml += '	<h5>Monthly Routine</h5>';
		vHtml += '</div>';
		
		for(var i=0; i<monthly_list.length; i++)
		{
			vHtml += '<div class="col-12">';
			vHtml += '	<div class="alert alert-danger fade show m-b-10">';
			vHtml += monthly_list[i].content;
			vHtml += '	</div>';
			vHtml += '</div>';
		}
	}
	
	$("#notice_alram").html(vHtml);
	
	$(".theme-panel").addClass("active");
}
var schedule_id; 
function open_schedule(v_id)
{
	schedule_id = v_id;
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticeScheduleList.do",
		data : {
			id:v_id			
		},
		success:function(data){
			var scheduleInfo = data.scheduleInfo;
			var scheduleDetailList = data.scheduleDetailList;
			$("#notice_schedule_title").html(scheduleInfo.schedule_title);
			var vHtml = "";
			for(var i=0; i<scheduleDetailList.length; i++)
			{
				var vShow = "";
				var vTime = "";
				if(i==0) vShow = "show";
				var schedule_detail_id = scheduleDetailList[i].id;
				var schedule_detail_use_report_image  = scheduleDetailList[i].schedule_detail_use_report_image;
				var schedule_detail_use_report_url    = scheduleDetailList[i].schedule_detail_use_report_url;
				var schedule_detail_use_report_ox     = scheduleDetailList[i].schedule_detail_use_report_ox;
				var schedule_detail_use_report_file   = scheduleDetailList[i].schedule_detail_use_report_file;
				var schedule_detail_is_report_image   = scheduleDetailList[i].schedule_detail_is_report_image;
				var schedule_detail_is_report_url     = scheduleDetailList[i].schedule_detail_is_report_url;
				var schedule_detail_is_report_ox      = scheduleDetailList[i].schedule_detail_is_report_ox;
				var schedule_detail_is_report_file    = scheduleDetailList[i].schedule_detail_is_report_file;
				
				var schedule_detail_is_success        = scheduleDetailList[i].schedule_detail_is_success;
				var schedule_detail_is_ignore         = scheduleDetailList[i].schedule_detail_is_ignore;
				var schedule_detail_is_problem         = scheduleDetailList[i].schedule_detail_is_problem;
				
				if(schedule_detail_is_success){
					vTime = "("+scheduleDetailList[i].modified+") ";
					vHtml += '<div class="card bg-success text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
					vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-success-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
				}else{
					if(schedule_detail_is_ignore){
						vTime = "("+scheduleDetailList[i].modified+") ";
						vHtml += '<div class="card bg-blue text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
						vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-blue-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
					}else{
						if(schedule_detail_is_problem){
							vTime = "("+scheduleDetailList[i].modified+") ";
							vHtml += '<div class="card bg-yellow text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
							vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-yellow-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
						}else{
							vHtml += '<div class="card bg-danger text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
							vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-danger-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
						}
					}
				}
				var v_schedule_detail_reference_content = cfmNvl1(scheduleDetailList[i].schedule_detail_reference_content);
				v_schedule_detail_reference_content = v_schedule_detail_reference_content.replace(/(?:\r\n|\r|\n)/g, '<br />');
				vHtml += vTime + scheduleDetailList[i].schedule_detail_reference_title;
				vHtml += '	</div>';
				vHtml += '	<div id="collapse'+schedule_detail_id+'" class="bg-white text-dark collapse '+vShow+'" data-parent="#accordion">';
				vHtml += '		<div class="card-body">';
				vHtml += '			<input type="hidden" id="schedule_detail_use_report_image_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_image)+'">';
				vHtml += '			<input type="hidden" id="schedule_detail_use_report_url_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_url)+'">';
				vHtml += '			<input type="hidden" id="schedule_detail_use_report_ox_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_ox)+'">';
				vHtml += '			<input type="hidden" id="schedule_detail_use_report_file_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_file)+'">';
				vHtml += '			<div class="row">';
				vHtml += '				<div class="col-12 mb-3"><h5>'+v_schedule_detail_reference_content+'<h5></div>';
				if(scheduleDetailList[i].schedule_detail_reference_image){
					vHtml += '				<div class="col-12"><h4>참고이미지</h4></div>';
					vHtml += '				<div class="col-12 text-center mb-3"><a href="'+scheduleDetailList[i].schedule_detail_reference_image+'" target="_blank"><img src="'+scheduleDetailList[i].schedule_detail_reference_image+'" style="border:1px solid #000;width:100%;"></a></div>';
					
				}
				if(scheduleDetailList[i].schedule_detail_reference_url){
					vHtml += '				<div class="col-2"><h4>참고 URL : </h4></div>';
					vHtml += '				<div class="col-10 mb-3"><a href="'+scheduleDetailList[i].schedule_detail_reference_url+'" class="text-dark" target="_blank"><h5>'+scheduleDetailList[i].schedule_detail_reference_url+'</h5></a></div>';
				}
				if(scheduleDetailList[i].schedule_detail_reference_file){
					vHtml += '				<div class="col-6"><h4>참고 파일 : </h4></div>';
					vHtml += '				<div class="col-6 text-center"><a href="'+scheduleDetailList[i].schedule_detail_reference_file+'" target="_blank">다운로드</a></div>';
				}
				
				if(schedule_detail_use_report_image){
					vHtml += '				<div class="col-6 mt-3"><h4>사진등록 : </h4></div>';
					vHtml += '				<div class="col-6 mt-3 text-center">';
					vHtml += '					<span id="span_image_name_'+schedule_detail_id+'">'+scheduleDetailList[i].schedule_detail_image_name+'</span><button type="button" class="btn btn-primary" onclick="schedule_add_image('+schedule_detail_id+')">사진 등록</button>';
					vHtml += '					<input type="hidden" id="schedule_detail_image_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_image+'">';
					vHtml += '					<input type="hidden" id="schedule_detail_image_name_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_image_name+'">';					
					vHtml += '				</div>';
					vHtml += '				<div class="col-12 text-center  mb-3" id="div_image_'+schedule_detail_id+'">';
					if(scheduleDetailList[i].schedule_detail_image){
						vHtml += '<a href="'+scheduleDetailList[i].schedule_detail_image+'" target="_blank"><img src="'+scheduleDetailList[i].schedule_detail_image+'" style="border:1px solid #000;width:100%;"></a>';
					}
					vHtml += '</div>';
				}
				if(schedule_detail_use_report_file){
					vHtml += '				<div class="col-6 mt-3"><h4>파일등록 : </h4></div>';
					vHtml += '				<div class="col-6 mt-3 text-center">';
					if(scheduleDetailList[i].schedule_detail_file)
					{
						vHtml += '				<span id="span_file_name_'+schedule_detail_id+'"><a href="'+scheduleDetailList[i].schedule_detail_file+'" class="text-dark" target="_blank">'+scheduleDetailList[i].schedule_detail_file_name+'</a></span>';
					}else{
						vHtml += '				<span id="span_file_name_'+schedule_detail_id+'"></span>';
					}
					vHtml += '<button type="button" class="btn btn-primary" onclick="schedule_add_file('+schedule_detail_id+')">파일 등록</button>';
					vHtml += '				<input type="hidden" id="schedule_detail_file_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_file+'">';
					vHtml += '				<input type="hidden" id="schedule_detail_file_name_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_file_name+'">';
					vHtml += '				</div>';
				}
				if(schedule_detail_use_report_url){
					vHtml += '				<div class="col-12"><h4>URL 등록</h4></div>';
					vHtml += '				<div class="col-12 mb-3">';
					vHtml += '				<input type="text" class="form-control"  id="schedule_detail_url_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_url+'">';
					vHtml += '				</div>';
				}
				if(schedule_detail_use_report_ox){
					vHtml += '				<div class="col-12"><h4>O/X 등록</h4></div>';
					var checked = "";
					vHtml += '				<div class="col-12">';
					vHtml += '					<div class="row" id="search_area">';
					vHtml += '						<div class="offset-6 col-3">';
					checked = "";
					if(scheduleDetailList[i].schedule_detail_ox == "O") checked = "checked";
					vHtml += '							<input type="radio" class="css-input-radio-checkbox" name="schedule_detail_ox_'+schedule_detail_id+'" id="schedule_detail_ox_'+schedule_detail_id+'_o" value="O" '+checked+'>';
					vHtml += '							<label class="css-input-radio-checkbox-label" for="schedule_detail_ox_'+schedule_detail_id+'_o" style="padding:5px;">O</label>';
					vHtml += '						</div>';
					vHtml += '						<div class="col-3">';
					checked = "";
					if(scheduleDetailList[i].schedule_detail_ox == "X") checked = "checked";
					vHtml += '							<input type="radio" class="css-input-radio-checkbox" name="schedule_detail_ox_'+schedule_detail_id+'" id="schedule_detail_ox_'+schedule_detail_id+'_x" value="O" '+checked+'>';
					vHtml += '							<label class="css-input-radio-checkbox-label" for="schedule_detail_ox_'+schedule_detail_id+'_x" style="padding:5px;">X</label>';
					vHtml += '						</div>';
					vHtml += '					</div>';
					vHtml += '				</div>';
				}
				vHtml += '				<div class="col-12"><h4>코멘트</h4></div>';
				vHtml += '				<div class="col-12"><textarea class="form-control" id="schedule_detail_content_'+schedule_detail_id+'">'+scheduleDetailList[i].schedule_detail_content+'</textarea></div>';
				if(current_date == $("#search_date").val())
				{
					vHtml += '				<div class="col-12 mt-3 text-right">';
					vHtml += '					<button type="button" class="btn btn-primary" onclick="schedule_save('+schedule_detail_id+',false, true)">문제보고</button>';
					vHtml += '					<button type="button" class="btn btn-primary" onclick="schedule_save('+schedule_detail_id+',true, false)">해당없음</button>';
					vHtml += '					<button type="button" class="btn btn-primary" onclick="schedule_save('+schedule_detail_id+'),false, false"><i class="fa fa-save fa-fw"></i> 저장</button>';
					vHtml += '				</div>';
				}
				vHtml += '			</div>';
				vHtml += '		</div>';
				vHtml += '	</div>';
				vHtml += '</div>';
					
			}
			$("#accordion").html(vHtml);
			$('#modal-notice-schedule').modal({backdrop: 'static', keyboard: false}); 
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

var file_gubun = "";
var file_type = "";
var file_seq;

function schedule_add_image(v_seq)
{
	file_gubun = "SCHEDULE";
	file_type = "IMAGE";
	file_seq = v_seq;
	
	$("#form1").html('<input type="file" class="form-control" name="file" id="file" accept="image/*">');
	$("#modal-notice-schedule-file").modal({backdrop: 'static', keyboard: false});
}

function schedule_add_file(v_seq)
{
	file_gubun = "SCHEDULE";
	file_type = "FILE";
	file_seq = v_seq;
	$("#form1").html('<input type="file" class="form-control" name="file" id="file">');
	$("#modal-notice-schedule-file").modal({backdrop: 'static', keyboard: false});
}

function task_add_image()
{
	file_gubun = "TASK";
	file_type = "IMAGE";
	file_seq = 0;
	
	$("#form1").html('<input type="file" class="form-control" name="file" id="file" accept="image/*">');
	$("#modal-notice-schedule-file").modal({backdrop: 'static', keyboard: false});
}

function task_add_file()
{
	file_gubun = "TASK";
	file_type = "FILE";
	file_seq = 0;
	$("#form1").html('<input type="file" class="form-control" name="file" id="file">');
	$("#modal-notice-schedule-file").modal({backdrop: 'static', keyboard: false});
}

function schedule_file_save()
{
	var formData=new FormData(document.getElementById('form1'));
	var file_name = document.getElementById('form1').file.value;
	
	
	$.ajax({
        type: 'POST',
        url: '/common/getFileUploadNoticeUpload.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	var array_file_name = data.split("||");
    	if(file_gubun == "SCHEDULE"){
        	if(file_type == "IMAGE"){
        		$("#span_image_name_"+file_seq).html(array_file_name[1]);
        		$("#schedule_detail_image_name_"+file_seq).val(array_file_name[1]);
        		$("#schedule_detail_image_"+file_seq).val(aws_schedule_url+array_file_name[0]);
        		$("#div_image_"+file_seq).html('<img src="'+aws_schedule_url+array_file_name[0]+'" style="border:1px solid #000;width:100%;">');
        		
        	}else{
        		$("#span_file_name_"+file_seq).html(array_file_name[1]);
        		$("#schedule_detail_file_name_"+file_seq).val(array_file_name[1]);
        		$("#schedule_detail_file_"+file_seq).val(aws_schedule_url+array_file_name[0]);
        	}
    		
    	}else if(file_gubun == "TASK"){
        	if(file_type == "IMAGE"){
        		$("#span_task_image_name").html(array_file_name[1]);
        		$("#task_image_name").val(array_file_name[1]);
        		$("#task_image").val(aws_schedule_url+array_file_name[0]);
        		$("#div_task_image3").html('<img src="'+aws_schedule_url+array_file_name[0]+'" style="border:1px solid #000;width:100%;">');
        		
        	}else{
        		$("#span_task_file_name").html(array_file_name[1]);
        		$("#task_file_name").val(array_file_name[1]);
        		$("#task_file").val(aws_schedule_url+array_file_name[0]);
        	}
    	}
    	$("#modal-notice-schedule-file").modal("hide");
    }).fail(function (error) {
    	console.log(error);
    })
    
}


function schedule_save(v_id, is_ignore, is_problem)
{
	var schedule_detail_use_report_image = false;
	var schedule_detail_use_report_url = false;
	var schedule_detail_use_report_ox = false;
	var schedule_detail_use_report_file = false;
	var schedule_detail_content = $("#schedule_detail_content_"+v_id).val();
	var schedule_detail_is_report_image = false;
	var schedule_detail_is_report_url = false;
	var schedule_detail_is_report_ox = false;
	var schedule_detail_is_report_file = false;
	var schedule_detail_image = "";
	var schedule_detail_image_name = "";
	var schedule_detail_url = "";
	var schedule_detail_ox = "";
	var schedule_detail_file = "";
	var schedule_detail_file_name = "";
	if($("#schedule_detail_use_report_image_"+v_id).val() == "1"){
		schedule_detail_use_report_image = true;
	}
	if($("#schedule_detail_use_report_url_"+v_id).val() == "1"){
		schedule_detail_use_report_url = true;
	}
	if($("#schedule_detail_use_report_ox_"+v_id).val() == "1"){
		schedule_detail_use_report_ox = true;
	}
	if($("#schedule_detail_use_report_file_"+v_id).val() == "1"){
		schedule_detail_use_report_file = true;
	}
	
	if(schedule_detail_use_report_image){
		schedule_detail_image      = $("#schedule_detail_image_"+v_id).val();
		schedule_detail_image_name = $("#schedule_detail_image_name_"+v_id).val();
		if(schedule_detail_image){
			schedule_detail_is_report_image = true;
		}
	}
	
	if(schedule_detail_use_report_url){
		schedule_detail_url      = $("#schedule_detail_url_"+v_id).val();
		if(schedule_detail_url){
			schedule_detail_is_report_url = true;
		}
	}
	
	if(schedule_detail_use_report_ox){
		schedule_detail_ox      = $("input[name='schedule_detail_ox_"+v_id+"']:checked").val();
		if(schedule_detail_ox){
			schedule_detail_is_report_ox = true;
		}
	}
	
	if(schedule_detail_use_report_file){
		schedule_detail_file      = $("#schedule_detail_file_"+v_id).val();
		schedule_detail_file_name = $("#schedule_detail_file_name_"+v_id).val();
		if(schedule_detail_file){
			schedule_detail_is_report_file = true;
		}
	}
	
	var schedule_detail_is_success = true;
	if(schedule_detail_use_report_image){
		if(!schedule_detail_is_report_image) schedule_detail_is_success = false; 
	}
	if(schedule_detail_use_report_url){
		if(!schedule_detail_is_report_url) schedule_detail_is_success = false; 
	}
	if(schedule_detail_use_report_ox){
		if(!schedule_detail_is_report_ox) schedule_detail_is_success = false; 
	}
	if(schedule_detail_use_report_file){
		if(!schedule_detail_is_report_file) schedule_detail_is_success = false; 
	}
	
	var schedule_detail_is_ignore = is_ignore;
	var schedule_detail_is_problem = is_problem;
	if(schedule_detail_is_ignore) schedule_detail_is_success = false;
	if(schedule_detail_is_problem) schedule_detail_is_success = false; 
	if(schedule_detail_is_success){
		$("#notice_schedule_detail_"+v_id).removeClass("bg-success");
		$("#notice_schedule_detail_"+v_id).removeClass("bg-danger");
		$("#notice_schedule_detail_"+v_id).removeClass("bg-blue");
		$("#notice_schedule_detail_"+v_id).removeClass("bg-yellow");
		$("#notice_schedule_detail_"+v_id).addClass("bg-success");
		$("#notice_schedule_detail_header_"+v_id).removeClass("bg-success-darker");
		$("#notice_schedule_detail_header_"+v_id).removeClass("bg-danger-darker");
		$("#notice_schedule_detail_header_"+v_id).removeClass("bg-blue-darker");
		$("#notice_schedule_detail_header_"+v_id).removeClass("bg-yellow-darker");
		$("#notice_schedule_detail_header_"+v_id).addClass("bg-success-darker");
	}else{
		if(schedule_detail_is_ignore){
			$("#notice_schedule_detail_"+v_id).removeClass("bg-success");
			$("#notice_schedule_detail_"+v_id).removeClass("bg-danger");
			$("#notice_schedule_detail_"+v_id).removeClass("bg-blue");
			$("#notice_schedule_detail_"+v_id).removeClass("bg-yellow");
			$("#notice_schedule_detail_"+v_id).addClass("bg-blue");
			$("#notice_schedule_detail_header_"+v_id).removeClass("bg-success-darker");
			$("#notice_schedule_detail_header_"+v_id).removeClass("bg-danger-darker");
			$("#notice_schedule_detail_header_"+v_id).removeClass("bg-blue-darker");
			$("#notice_schedule_detail_header_"+v_id).removeClass("bg-yellow-darker");
			$("#notice_schedule_detail_header_"+v_id).addClass("bg-blue-darker");
		}else{
			if(schedule_detail_is_problem){
				$("#notice_schedule_detail_"+v_id).removeClass("bg-success");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-danger");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-blue");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-yellow");
				$("#notice_schedule_detail_"+v_id).addClass("bg-yellow");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-success-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-danger-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-blue-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-yellow-darker");
				$("#notice_schedule_detail_header_"+v_id).addClass("bg-yellow-darker");
			}else{
				$("#notice_schedule_detail_"+v_id).removeClass("bg-success");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-danger");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-blue");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-yellow");
				$("#notice_schedule_detail_"+v_id).addClass("bg-danger");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-success-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-danger-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-blue-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-yellow-darker");
				$("#notice_schedule_detail_header_"+v_id).addClass("bg-danger-darker");
			}
		}
	}
	
	
	$.ajax({
		type : "POST",
		url : "/main/updateNoticesScheduleDetail.do",
		data:{
			id:v_id,
			schedule_detail_content:schedule_detail_content,
			schedule_detail_is_report_image:schedule_detail_is_report_image,
			schedule_detail_is_report_url:schedule_detail_is_report_url,
			schedule_detail_is_report_ox:schedule_detail_is_report_ox,
			schedule_detail_is_report_file:schedule_detail_is_report_file,
			schedule_detail_image:schedule_detail_image,
			schedule_detail_image_name:schedule_detail_image_name,
			schedule_detail_url:schedule_detail_url,
			schedule_detail_ox:schedule_detail_ox,
			schedule_detail_file:schedule_detail_file,
			schedule_detail_file_name:schedule_detail_file_name,
			schedule_id:schedule_id,
			schedule_detail_is_success:schedule_detail_is_success,
			schedule_detail_is_ignore:schedule_detail_is_ignore,
			schedule_detail_is_problem:schedule_detail_is_problem
		},
		success:function(data){
			alert("저장하였습니다.");
			var schedule_success_count = data.schedule_success_count;
			var schedule_ignore_count  = data.schedule_ignore_count;
			var schedule_problem_count = data.schedule_problem_count;
			var schedule_total_count = schedule_success_count+schedule_ignore_count+schedule_problem_count;
			if(data.schedule_work_count == schedule_total_count)
			{
				$("#notice_schedule_"+schedule_id).removeClass("btn-danger");
				$("#notice_schedule_"+schedule_id).removeClass("btn-success");
				$("#notice_schedule_"+schedule_id).removeClass("btn-blue");
				$("#notice_schedule_"+schedule_id).removeClass("btn-yellow");
				
				if(schedule_problem_count > 0){
					$("#notice_schedule_"+schedule_id).addClass("btn-yellow");
				}else if(schedule_ignore_count > 0){
					$("#notice_schedule_"+schedule_id).addClass("btn-blue");
				}else{
					$("#notice_schedule_"+schedule_id).addClass("btn-success");
				}
			}else{
				$("#notice_schedule_"+schedule_id).removeClass("btn-danger");
				$("#notice_schedule_"+schedule_id).removeClass("btn-success");
				$("#notice_schedule_"+schedule_id).removeClass("btn-blue");
				$("#notice_schedule_"+schedule_id).removeClass("btn-yellow");
				$("#notice_schedule_"+schedule_id).addClass("btn-danger");
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}


var notice_new_student_id;
var notice_new_student_course_id;
function open_new_student(v_id)
{
	notice_new_student_id = v_id;
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticeNewStudent.do",
		data:{
			id:v_id
		},
		success:function(data){
			var newStudent = data.newStudent;
			var newStudentDetailList = data.newStudentDetailList;
			notice_new_student_course_id = newStudent.course_id;
			
			$("#new_student_course_name").html(newStudent.course_group_name+ " " + newStudent.course_name+"반");
			
			var vHtml = "";
			for(var i=0; i<newStudentDetailList.length; i++)
			{
				var student_level = cfmNvl1(newStudentDetailList[i].student_level);
				var check_orientation = newStudentDetailList[i].student_name;
				var v_orientation = "미완료";
				var v_orientation_bg = "bg-danger";
				var v_student_level = "";
				var v_student_level_bg = "";
				if(check_orientation){
					v_orientation = "완료";
					v_orientation_bg = "bg-success";
				}
				if(student_level == "H"){
					v_student_level = "상";
					v_student_level_bg = "bg-success";
				}else if(student_level == "M"){
					v_student_level = "중";
					v_student_level_bg = "bg-yellow";
				}else if(student_level == "L"){
					v_student_level = "하";
					v_student_level_bg = "bg-danger";
				}
				
				var no = i+1;
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+no+'</td>';
				vHtml += '	<td class="text-center">'+newStudentDetailList[i].student_name+'</td>';
				vHtml += '	<td class="text-center '+v_orientation_bg+'">'+v_orientation+'</td>';
				vHtml += '	<td class="text-center '+v_student_level_bg+'">'+v_student_level+'</td>';
				vHtml += '	<td class="text-center">';
				vHtml += '		<button type="button" class="btn btn-primary mb-3" style="margin:0px!important" onclick="move_counseling_card('+newStudentDetailList[i].user_id+')">상담카드</button>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" name="new_student_course_enrollment_id" value="'+newStudentDetailList[i].course_enrollment_id+'">';
				vHtml += '		<textarea class="form-control" name="training_desc">'+newStudentDetailList[i].training_desc+'</textarea>';
				vHtml += '	</td>';
				vHtml += '</tr>';
				
			}
			
			$("#new_student_detail_list").html(vHtml);
			
			$("#modal-notice-new-student").modal({backdrop: 'static', keyboard: false});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
function new_student_save()
{
	var $_course_enrollment_id        = $("input[name=new_student_course_enrollment_id]");
	var $_training_desc               = $("textarea[name=training_desc]");
	var student_training_count = 0;
	var detail_list = Array();
	$_course_enrollment_id.each(function(index) {
		var objDetail = Object();
		var training_desc = $_training_desc.eq(index).val();
		
		var is_training_desc = false;
		if(training_desc){
			is_training_desc = true;
			student_training_count++;
		}
		objDetail.course_enrollment_id    = $(this).val();
		objDetail.training_desc           = training_desc;
		objDetail.is_training_desc        = is_training_desc;

		detail_list.push(objDetail);
		
	});
	
	
	var data_value = JSON.stringify(detail_list);
	$.ajax({
		type : "POST",
		url : "/main/updatNoticesNewStudent.do",
		data:{
			id:notice_new_student_id,
			student_training_count:student_training_count,
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			
			var v_div_id = "#new_student_"+data.course_id;
			$(v_div_id).removeClass("bg-green-lighter");
			$(v_div_id).removeClass("bg-blue-lighter");
			$(v_div_id).removeClass("bg-yellow-lighter");
			$(v_div_id).removeClass("bg-red-lighter");
			var student_count = data.student_count;
			var student_training_count = data.student_training_count;
			var rate = Math.round(student_training_count/student_count*100);
			if(rate >= 80){
				$(v_div_id).addClass("bg-green-lighter");
			}else if(rate >= 60){
				$(v_div_id).addClass("bg-blue-lighter");
			}else if(rate >= 40){
				$(v_div_id).addClass("bg-yellow-lighter");
			}else{
				$(v_div_id).addClass("bg-red-lighter");
			}
			
			$("#new_student_title_"+data.course_id).html(student_training_count+"/"+student_count);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
function move_counseling_card(v_user_id)
{
	window.open("/enrollment/counseling_card.do?user_id="+v_user_id, "counseling_card");
}

function go_course_repetition()
{
	window.open("/enrollment/repetition_enrollment.do?course_id="+notice_new_student_course_id, "course_repetition");
}

function go_course_goal()
{
	window.open("/enrollment/achievement_new_action.do?orientation_code=goal&&course_id="+notice_new_student_course_id, "course_goal");
}

var course_id;
var section;
var practice_type;
var notices_practice_id;

function open_practice(v_course_id, v_section, v_practice_type)
{
	course_id = v_course_id;
	section = v_section;
	practice_type = v_practice_type;
	
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticePracticeList.do",
		data : {
			course_id:course_id,			
			section:section,			
			practice_type:practice_type,
			date:$("#search_date").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++)
			{
				var checked = "";
				if(i==0) checked = "checked";
				
				var vTitle = "";
				if(data[i].section == "VOCA"){
					vTitle = data[i].practice_type;
				}else{
					if(data[i].book) vTitle += data[i].book; 
					if(data[i].volume) vTitle += " "+data[i].volume; 
					if(data[i].group) vTitle += " "+data[i].group; 
					if(data[i].article) vTitle += " "+data[i].article; 
					if(data[i].paragraph) vTitle += " "+data[i].paragraph+"문단"; 
				}
				vHtml += '<div class="radio radio-css radio-inline">';
				vHtml += '	<input type="radio" name="notices_practice_id" id="notices_practice_id_'+i+'" value="'+data[i].id+'" '+checked+'>';
				vHtml += '	<label for="notices_practice_id_'+i+'">'+vTitle+'</label>';
				vHtml += '</div>';
				
				$("#search_practice_list").html(vHtml);
				
				$("input[name='notices_practice_id']").click(function(){
					search_practice(false);
				});
				
				search_practice(true);
				
				
			}
			 
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function search_practice(isOpen)
{
	notices_practice_id = $("input[name='notices_practice_id']:checked").val();
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticePractice.do",
		data : {
			id:notices_practice_id			
		},
		success:function(data){
			var practiceInfo = data.practiceInfo;
			var practiceDetailList = data.practiceDetailList;
			
			$("#comments").val(practiceInfo.comments);
			
			var vHtml = "";
			for(var i=0; i<practiceDetailList.length; i++)
			{
				var first_fail_type = practiceDetailList[i].first_fail_type;
				var last_fail_type  = practiceDetailList[i].last_fail_type;
				
				var first_score = practiceDetailList[i].first_score;
				var first_score1 = practiceDetailList[i].first_score1;
				var first_score2 = practiceDetailList[i].first_score2;
				var first_total_score = practiceDetailList[i].first_total_score;
				var first_total_score1 = practiceDetailList[i].first_total_score1;
				var first_total_score2 = practiceDetailList[i].first_total_score2;
				var last_score = practiceDetailList[i].last_score;
				var last_score1 = practiceDetailList[i].last_score1;
				var last_score2 = practiceDetailList[i].last_score2;
				var last_total_score = practiceDetailList[i].last_total_score;
				var last_total_score1 = practiceDetailList[i].last_total_score1;
				var last_total_score2 = practiceDetailList[i].last_total_score2;
				
				var first_title = "";
				var last_title = "";
				if(section== "GRAMMAR" && practice_type == "MOCK_TEST"){ 
					first_title = "SW1:"+first_score1+"/"+first_total_score1+" "+"SW2:"+first_score2+"/"+first_total_score2;
					last_title = "SW1:"+last_score1+"/"+last_total_score1+" "+"SW2:"+last_score2+"/"+last_total_score2;
				}else if(practice_type == "TENTIMES"){
					first_title =  first_score1+"회/"+first_total_score1+"회"+first_score+"%";
					last_title =  last_score1+"회/"+last_total_score1+"회"+last_score+"%";
				}else if(section == "VOCA"){
					first_title =  first_score;
					last_title =  last_score;
				}else{
					if(first_total_score == 1){
						if(first_score == 1){
							first_title = "O";
						}else{
							first_title = "X";
						}
					}else{
						first_title =  first_score+"/"+first_total_score;
					}
					if(last_total_score == 1){
						if(last_score == 1){
							last_title = "O";
						}else{
							last_title = "X";
						}
					}else{
						last_title =  last_score+"/"+last_total_score;
					}
				}
					
				var no = i+1;
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+no+'</td>';
				vHtml += '	<td class="text-center">'+practiceDetailList[i].student_name+'</td>';
				if(first_fail_type == "Y"){
					vHtml += '	<td class="text-center bg-success">'+first_title+'</td>';
				}else if(first_fail_type == "N"){
					vHtml += '	<td class="text-center bg-danger">'+first_title+'</td>';
				}else{
					vHtml += '	<td class="text-center bg-grey-darker">미시행</td>';
				}
				if(last_fail_type == "Y"){
					vHtml += '	<td class="text-center bg-success">'+last_title+'</td>';
				}else if(last_fail_type == "N"){
					vHtml += '	<td class="text-center bg-danger">'+last_title+'</td>';
				}else{
					vHtml += '	<td class="text-center bg-grey-darker">미시행</td>';
				}
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" name="course_enrollment_id" value="'+practiceDetailList[i].course_enrollment_id+'">';
				vHtml += '		<input type="text" class="form-control" name="practice_detail_comments" value="'+practiceDetailList[i].comments+'">';
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			
			$("#practice_detail_list").html(vHtml);
			if(isOpen){
				$('#modal-notice-practice').modal({backdrop: 'static', keyboard: false}); 
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function practice_save()
{
	var is_comment = true;
	var v_comments = $("#comments").val();
	
	//if(v_comments) is_comment = true;
	
	var $_course_enrollment_id                   = $("input[name=course_enrollment_id]");
	var $_practice_detail_comments               = $("input[name=practice_detail_comments]");
	
	var detail_list = Array();
	$_course_enrollment_id.each(function(index) {
		var objDetail = Object();
		var practice_detail_comments = $_practice_detail_comments.eq(index).val();
		var practice_detail_is_comments = false;
		if(practice_detail_comments){
			practice_detail_is_comments = true;
			
		}else{
			is_comment = false;
		}
		objDetail.course_enrollment_id    = $(this).val();
		objDetail.comments                = practice_detail_comments;
		objDetail.is_comments             = practice_detail_is_comments;

		detail_list.push(objDetail);
		
	});
	
	
	var data_value = JSON.stringify(detail_list);
	$.ajax({
		type : "POST",
		url : "/main/updatNoticesPracticeComment.do",
		data:{
			id:notices_practice_id,
			course_id:course_id,			
			section:section,			
			practice_type:practice_type,
			date:$("#search_date").val(),
			comments:v_comments,
			is_comments:is_comment,
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			
			var t_id = section+"_"+practice_type+"-"+course_id;
			$("#"+t_id).removeClass("text-success");
			$("#"+t_id).removeClass("text-danger");
			if(is_comment){
				$("#"+t_id).addClass("text-success");
			}else{
				$("#"+t_id).addClass("text-danger");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}

var notice_attend_id;
function open_attend(v_id)
{
	notice_attend_id = v_id;
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticeAttendList.do",
		data:{
			id:v_id
		},
		success:function(data){
			var attendInfo = data.attendInfo;
			var attendDetailList = data.attendDetailList;
			
			$("#search_attend_title").html(attendInfo.course_group_name+ " " + attendInfo.course_name+"반");
			
			var vHtml = "";
			for(var i=0; i<attendDetailList.length; i++)
			{
				var v_bg = "";
				if(attendDetailList[i].attend_status == "REGULAR_ATTENDED"){
					v_bg = "bg-success"
				}
				var no = i+1;
				vHtml += '<tr class="'+v_bg+'">';
				vHtml += '	<td class="text-center">'+no+'</td>';
				vHtml += '	<td class="text-center">'+attendDetailList[i].student_name+'</td>';
				vHtml += '	<td class="text-center">'+attend_status[attendDetailList[i].attend_status].name+'</td>';
				vHtml += '	<td class="text-center">'+attendDetailList[i].student_reason+'</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" name="attend_course_enrollment_id" value="'+attendDetailList[i].course_enrollment_id+'">';
				if(attendDetailList[i].attend_status == "REGULAR_ATTENDED"){
					vHtml += '		<input type="hidden" name="teacher_reason" value="'+attendDetailList[i].teacher_reason+'">';
				}else{
					vHtml += '		<input type="text" class="form-control" name="teacher_reason" value="'+attendDetailList[i].teacher_reason+'">';
				}
				vHtml += '	</td>';
				vHtml += '</tr>';
				
			}
			
			$("#attend_detail_list").html(vHtml);
			
			$("#modal-notice-attend").modal({backdrop: 'static', keyboard: false});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function attend_save()
{
	var $_course_enrollment_id        = $("input[name=attend_course_enrollment_id]");
	var $_teacher_reason              = $("input[name=teacher_reason]");
	
	var detail_list = Array();
	$_course_enrollment_id.each(function(index) {
		var objDetail = Object();
		
		objDetail.course_enrollment_id    = $(this).val();
		objDetail.teacher_reason          = $_teacher_reason.eq(index).val();;

		detail_list.push(objDetail);
		
	});
	
	
	var data_value = JSON.stringify(detail_list);
	$.ajax({
		type : "POST",
		url : "/main/updatNoticesAttend.do",
		data:{
			id:notice_attend_id,
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
function go_schedule(course_id, section)
{
	window.open("/course/course_schedule.do?course_id="+course_id+"&&section="+section, "schedule");
}

function go_achieve(course_id, section)
{
	var url = "";
	if(section == "VOCA"){
		url="/enrollment/achievement_new_action.do?orientation_code=voca&&course_id="+course_id;
	}else{
		url="/enrollment/achievement_new_action.do?orientation_code=all_practice&&section="+section+"&&course_id="+course_id;
	}
	window.open(url, "achievement");
}

function go_class(course_id, section)
{
	if(section == "READING"){
		window.open("/test/class/reading_class.do?course_id="+course_id+"&&section="+section+"&&user_id="+user_id+"&&date="+$("#search_date").val(), "class");
	}else if(section == "LISTENING"){
		window.open("/test/class/listening_class.do?course_id="+course_id+"&&section="+section+"&&user_id="+user_id+"&&date="+$("#search_date").val(), "class");
	}else if(section == "GRAMMAR"){
		window.open("/test/class/grammar_class.do?course_id="+course_id+"&&section="+section+"&&user_id="+user_id+"&&date="+$("#search_date").val(), "class");
	}else{
		window.open("/test/class/speaking_writing_class.do?course_id="+course_id+"&&section="+section+"&&user_id="+user_id+"&&date="+$("#search_date").val(), "class");
	}
		
}

var monthly_list = [
	"VERBAL_BLUEPRINT"
];

var monthly_list_type = [
	"GRAMMAR_TRANSLATION",
	"GRAMMAR_TRANSLATION_ACUTAL",
	"EXPLANATION"
];

function go_achieve_detail(course_id, section, practice_type)
{
	var url = "";
	if(section == "VOCA"){
		url = "/enrollment/achievement_new_action.do?orientation_code=voca&&course_id="+course_id;
	}else{
		if(practice_type == "BLUEPRINT"){
			url = "/enrollment/achievement_new_action.do?orientation_code=practice_blueprint&&section="+section+"&&practice_type="+practice_type+"&&course_id="+course_id;
		}else{
			if(monthly_list.indexOf(practice_type) >= 0){
				url = "/enrollment/achievement_new_action.do?orientation_code=practice_monthly&&section="+section+"&&practice_type="+practice_type+"&&course_id="+course_id;
			}else if(monthly_list_type.indexOf(practice_type) >= 0){
				url = "/enrollment/achievement_new_action.do?orientation_code=practice_grammar&&section="+section+"&&practice_type="+practice_type+"&&course_id="+course_id;
			}else{
				url = "/enrollment/achievement_new_action.do?orientation_code=practice&&section="+section+"&&practice_type="+practice_type+"&&course_id="+course_id;
			}
		}
	}
	
	window.open(url,'achieve');
}
function go_oxtest(course_id, section, practice_type)
{
	window.open("/test/ox_test.do?course_id="+course_id+"&&section="+section+"&&practice_type="+practice_type, "oxtest");	
}