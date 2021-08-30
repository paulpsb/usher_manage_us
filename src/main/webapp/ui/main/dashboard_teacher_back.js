var junior_timetable = [
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
	var to_day = cfmGetToDate();
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

function search_form()
{
	$.ajax({
		type : "POST",
		url : "/main/getTeacherScheduleList.do",
		data:{
			user_id:$("#user_id").val(),
			date:$("#search_date").val()
		},
		success:function(data){
			var timetableList = data.timetableList;
			var practiceList  = data.practiceList;
			
			var vHtml = "";
			for(var i=0; i<base_timetable.length; i++)
			{
				var bsHour = base_timetable[i][0];
				var beHour = base_timetable[i][1];
				var jsHour = junior_timetable[i][0];
				var jeHour = junior_timetable[i][1];
				
				var sHour = bsHour;
				if(jsHour) sHour += "<br>"+jsHour+"(주니어)"

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
				
				vHtml += '<tr>';
				vHtml += '	<th class="text-center">'+sHour+'</th>';
				vHtml += '	<th class="text-center">'+v_course+'<br>'+v_practice+'</th>';
				vHtml += '	<td class="droppable">';
				vHtml += '		<div class="schedule row ml-2 mr-2">';
				if(v_section){
					vHtml += '<div class="practice_drop col-2 mb-2 mr-1 text-center bg-dark text-white" style="padding:5px;">';
					vHtml +=v_course+'<br>';
					vHtml +=v_section_name+' 실라바스<br>';
					vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_schedule(\''+v_course_id+'\',\''+v_section+'\')">바로가기</button>';
					vHtml += '</div>';
					vHtml += '<div class="practice_drop col-2 mb-2 mr-1 text-center bg-dark text-white" style="padding:5px;">';
					vHtml +=v_course+'<br>';
					vHtml +=v_section_name+' 성취표<br>';
					vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_achieve(\''+v_course_id+'\',\''+v_section+'\')">바로가기</button>';
					vHtml += '</div>';
					if(v_study_type=="CLASS" && (v_section == "LISTENING" || v_section == "READING" || v_section == "GRAMMAR" || v_section == "SPEAKING" || v_section == "WRITING")){
						vHtml += '<div class="practice_drop col-2 mb-2 mr-1 text-center bg-grey-darker text-white" style="padding:5px;">';
						vHtml +=v_section_name+'<br>';
						vHtml +='수업<br>';
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_class(\''+v_course_id+'\',\''+v_section+'\')">바로가기</button>';
						vHtml += '</div>';
					}
				}
				
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
				for(var j=0; j<practice_list1.length; j++)
				{
					vHtml += '<div class="practice_drop col-2 mb-2 mr-1 text-center bg-grey-darker text-white" style="padding:5px;">';
					vHtml += practice_list1[j].short_title_kr+'<br>';
					vHtml += practice_list1[j].practice_name+'<br>';
					if(practice_list1[j].program_use == "Y"){
						vHtml += '&nbsp;';
					}else{
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_oxtest(\''+v_course_id+'\',\''+practice_list1[j].section+'\',\''+practice_list1[j].practice_type+'\')">OX 바로가기</button>';
					}
					vHtml += '</div>';
				}
				
				for(var j=0; j<practice_list2.length; j++)
				{
					vHtml += '<div class="practice_drop col-2 mb-2 mr-1 text-center bg-grey-darker text-white" style="padding:5px;">';
					vHtml += practice_list2[j].short_title_kr+'<br>';
					vHtml += practice_list2[j].practice_name+'<br>';
					if(practice_list2[j].program_use == "Y"){
						vHtml += '&nbsp;';
					}else{
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block" onClick="go_oxtest(\''+v_course_id+'\',\''+practice_list2[j].section+'\',\''+practice_list2[j].practice_type+'\')">OX 바로가기</button>';
					}
					vHtml += '</div>';
				}
				
				vHtml += '		</div>';
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
		window.open("/test/class/reading_class.do?course_id="+course_id+"&&section="+section+"&&user_id="+$("#user_id").val()+"&&date="+$("#search_date").val(), "class");
	}else if(section == "LISTENING"){
		window.open("/test/class/listening_class.do?course_id="+course_id+"&&section="+section+"&&user_id="+$("#user_id").val()+"&&date="+$("#search_date").val(), "class");
	}else if(section == "GRAMMAR"){
		window.open("/test/class/grammar_class.do?course_id="+course_id+"&&section="+section+"&&user_id="+$("#user_id").val()+"&&date="+$("#search_date").val(), "class");
	}else{
		window.open("/test/class/speaking_writing_class.do?course_id="+course_id+"&&section="+section+"&&user_id="+$("#user_id").val()+"&&date="+$("#search_date").val(), "class");
	}
		
}

function go_oxtest(course_id, section, practice_type)
{
	window.open("/test/ox_test.do?course_id="+course_id+"&&section="+section+"&&practice_type="+practice_type, "oxtest");	
}