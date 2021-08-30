var page = 1;
var row_num = 20

var week = [
	'일요일', 
	'월요일', 
	'화요일', 
	'수요일', 
	'목요일', 
	'금요일', 
	'토요일'
];


var search_notice_types = {
		class:{type:"class",      category:""},
		daily:{type:"schedule",   category:"DAILY"},
		monthly:{type:"schedule", category:"MONTHLY"},
		yearly:{type:"schedule",  category:"YEARLY"},
		task:{type:"task",        category:""}
	};

var notice_types = {
		new_student:{value:"신규"},
		attend:{value:"출결"},
		practice:{value:"수업"},
		DAILY:{value:"Daily Routine"},
		MONTHLY:{value:"Monthly Routine"},
		YEARLY:{value:"Yearly Routine"},
		task:{value:"Task"}
	};

var rates = [
	'bg-green-lighter', 
	'bg-blue-lighter', 
	'bg-yellow-lighter', 
	'bg-red-lighter'
];

var task_stats = {
		REQUEST:{name:"작업요청",   color:"bg-grey-darker"},
		TIMEING:{name:"시간지정",   color:"bg-grey-darker"},
		STARTING:{name:"작업시작",  color:"bg-yellow-transparent-7"},
		WORKING:{name:"작업중",    color:"bg-yellow-transparent-7"},
		RESPONSE:{name:"작업전송",  color:"bg-blue-transparent-7"},
		RETURN:{name:"반려",       color:"bg-red-transparent-7"},
		COMPLETE:{name:"작업완료",  color:"bg-teal-transparent-7"}
	};

var attend_status = {
		REGULAR_ATTENDED:{ name:"정상출석"},
		UNPERMITTED_LATE:{ name:"무단지각"},
		UNPERMITTED_ABSENT:{ name:"무단결석"},
		PERMITTED_LATE:{ name:"사유지각"},
		PERMITTED_ABSENT:{ name:"사유결석"}
	};

jQuery(document).ready(function(){
	var to_day  = cfmGetToDate();
	
	$("#search_notice_date").val(to_day);
	
	$("input[name='search_notice_type']").click(function(e){
		form_search();
	});	
	
	$('#search_notice_date').change(function(e){
		form_search();
	});	
	
	$('#search_is_success').change(function(e){
		form_search();
	});	
	
	$("#search_notice_user_name").keydown(function(key) {
		if (key.keyCode == 13) {
			form_search();
		}
	});
	
	change_date();
	form_search();
});

function change_date(){
	var vDate = $("#search_notice_date").val();
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
	var v_date = cfmAddDate($("#search_notice_date").val(), -1);
	$("#search_notice_date").val(v_date);
	change_date();
	form_search();
}

function date_next()
{
	var v_date = cfmAddDate($("#search_notice_date").val(), 1);
	$("#search_notice_date").val(v_date);
	change_date();
	form_search();
}

function form_search()
{
	search_list(1);
}

function search_list(vPage)
{
	page = vPage;
	
	var notice_type = "";
	var notice_category = "";
	
	var search_notice_type = $("input[name='search_notice_type']:checked").val();
	if(search_notice_type){
		notice_type = search_notice_types[search_notice_type].type;
		notice_category = search_notice_types[search_notice_type].category;
	}	
	var notice_date         = $("#search_notice_date").val();
	var notice_user_name    = $("#search_notice_user_name").val();
	var is_success          = $("#search_is_success").val();
	
	$.ajax({
		type : "POST",
		url : "/notice/getNoticeWorkLogList.do",
		data : {
			notice_type : notice_type,
			notice_category:notice_category,
			notice_date:notice_date,
			notice_user_name:notice_user_name,
			is_success:is_success,
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.logCount.page_total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var logList = data.logList;
			var vHtml = "";
			if(logList.length > 0)
			{
				for(var i=0; i<logList.length; i++){
					var no = total_count - (row_num * (vPage-1)) - i;
					var notice_id = logList[i].notice_id;
					
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+no+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(logList[i].notice_date)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(logList[i].notice_course_name)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(notice_types[logList[i].notice_category].value)+"</td>";
					vHtml += "<td>"+cfmNvl1(logList[i].notice_title)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(logList[i].notice_user_name)+"</td>";
					var bg = "";
					var v_title = "";
					if(logList[i].notice_type == "class")
					{
						var rate = Math.round((logList[i].success_count)/(logList[i].total_count-logList[i].giveup_count)*100);
						if(rate >= 80){
							bg = rates[0];
						}else if(rate >= 60){
							bg = rates[1];
						}else if(rate >= 40){
							bg = rates[2];
						}else{
							bg = rates[3];
						}
						
						v_title = logList[i].notice_course_name;
						if(logList[i].notice_category == "new_student")
						{
							v_title += " 신규("+logList[i].success_count+"/"+logList[i].total_count+")";
							v_title += '<br><button type="button" class="btn btn-default btn-xs" onClick="open_new_student('+logList[i].notice_id+')">신규 관리 보기</button>';
						}else if(logList[i].notice_category == "attend")
						{
							v_title += " 출석("+logList[i].success_count+"/"+logList[i].total_count+")";
							v_title += '<br><button type="button" class="btn btn-default btn-xs" onClick="open_attend('+logList[i].notice_id+')">출결 관리 보기</button>';
						}else{
							v_title += " "+logList[i].notice_title+"("+logList[i].success_count+"/"+(logList[i].total_count-logList[i].giveup_count)+")";
							v_title += '<br><button type="button" class="btn btn-default btn-xs" onClick="open_practice(\''+logList[i].notice_course_id+'\',\''+logList[i].section+'\',\''+logList[i].practice_type+'\')">대안 보기</button>';
							v_title += '&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs" onClick="go_achieve_detail(\''+logList[i].notice_course_id+'\',\''+logList[i].section+'\',\''+logList[i].practice_type+'\')">상세성취표 바로가기</button>';
							
						}
					}else if(logList[i].notice_type == "schedule"){
						if(logList[i].status == "SUCCESS"){
							bg = rates[0];
						}else if(logList[i].status == "PROBLEM"){
							bg = rates[2];
						}else if(logList[i].status == "IGNORE"){
							bg = rates[1];
						}else{
							bg = rates[3];
						}
						v_title = logList[i].notice_sub_title;
						v_title += '<br><button type="button" class="btn btn-default btn-xs" onClick="open_routine('+logList[i].notice_id+')">routine 보기</button>';
					}else if(logList[i].notice_type == "task"){
						v_title = task_stats[logList[i].status].name+"("+logList[i].notice_course_name+")";
						v_title += '<br><button type="button" class="btn btn-default btn-xs" onClick="open_task('+logList[i].notice_id+')">Task 보기</button>';
						bg  = task_stats[logList[i].status].color;
					}
					vHtml += "<td class='"+bg+"'>";
					vHtml += v_title;
					vHtml += "</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml = "<tr><td class='text-center' colspan='8'>조회된 데이터가 없습니다.</td></tr>";
			}
			
			$("#data_list").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#page_list").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
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
			date:$("#search_notice_date").val()
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
				vHtml += practiceDetailList[i].comments;
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
				vHtml +=newStudentDetailList[i].training_desc;
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
				vHtml += attendDetailList[i].teacher_reason;
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

function open_routine(v_id)
{
	$.ajax({
		type : "POST",
		url : "/main/getNoticesScheduleDetail.do",
		data:{
			id:v_id
		},
		success:function(data){
			
			var vHtml = "";
			var vShow = "";
			var vTime = "";
			vShow = "show";
			var schedule_detail_id = data.id;
			var schedule_detail_use_report_image  = data.schedule_detail_use_report_image;
			var schedule_detail_use_report_url    = data.schedule_detail_use_report_url;
			var schedule_detail_use_report_ox     = data.schedule_detail_use_report_ox;
			var schedule_detail_use_report_file   = data.schedule_detail_use_report_file;
			var schedule_detail_is_report_image   = data.schedule_detail_is_report_image;
			var schedule_detail_is_report_url     = data.schedule_detail_is_report_url;
			var schedule_detail_is_report_ox      = data.schedule_detail_is_report_ox;
			var schedule_detail_is_report_file    = data.schedule_detail_is_report_file;
			
			var schedule_detail_is_success        = data.schedule_detail_is_success;
			var schedule_detail_is_ignore         = data.schedule_detail_is_ignore;
			var schedule_detail_is_problem        = data.schedule_detail_is_problem;
			
			if(schedule_detail_is_success){
				vTime = "("+data.modified+") ";
				vHtml += '<div class="card bg-success text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
				vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-success-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
			}else{
				if(schedule_detail_is_ignore){
					vTime = "("+data.modified+") ";
					vHtml += '<div class="card bg-blue text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
					vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-blue-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
				}else{
					if(schedule_detail_is_problem){
						vTime = "("+data.modified+") ";
						vHtml += '<div class="card bg-yellow text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
						vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-yellow-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
					}else{
						vHtml += '<div class="card bg-danger text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
						vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-danger-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
					}
				}
			}
			var v_schedule_detail_reference_content = cfmNvl1(data.schedule_detail_reference_content);
			v_schedule_detail_reference_content = v_schedule_detail_reference_content.replace(/(?:\r\n|\r|\n)/g, '<br />');
			vHtml += vTime + data.schedule_detail_reference_title;
			vHtml += '	</div>';
			vHtml += '	<div id="collapse'+schedule_detail_id+'" class="bg-white text-dark collapse '+vShow+'" data-parent="#accordion">';
			vHtml += '		<div class="card-body">';
			vHtml += '			<input type="hidden" id="schedule_detail_use_report_image_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_image)+'">';
			vHtml += '			<input type="hidden" id="schedule_detail_use_report_url_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_url)+'">';
			vHtml += '			<input type="hidden" id="schedule_detail_use_report_ox_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_ox)+'">';
			vHtml += '			<input type="hidden" id="schedule_detail_use_report_file_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_file)+'">';
			vHtml += '			<div class="row">';
			vHtml += '				<div class="col-12 mb-3"><h5>'+v_schedule_detail_reference_content+'<h5></div>';
			if(data.schedule_detail_reference_image){
				vHtml += '				<div class="col-12"><h4>참고이미지</h4></div>';
				vHtml += '				<div class="col-12 text-center mb-3"><img src="'+data.schedule_detail_reference_image+'" style="border:1px solid #000;width:100%;"></div>';
				
			}
			if(data.schedule_detail_reference_url){
				vHtml += '				<div class="col-2"><h4>참고 URL : </h4></div>';
				vHtml += '				<div class="col-10 mb-3"><a href="'+data.schedule_detail_reference_url+'" class="text-dark" target="_blank"><h5>'+data.schedule_detail_reference_url+'</h5></a></div>';
			}
			if(data.schedule_detail_reference_file){
				vHtml += '				<div class="col-6"><h4>참고 파일 : </h4></div>';
				vHtml += '				<div class="col-6 text-center"><a href="'+data.schedule_detail_reference_file+'" target="_blank">다운로드</a></div>';
			}
			
			if(schedule_detail_use_report_image){
				vHtml += '				<div class="col-6 mt-3"><h4>사진등록 : </h4></div>';
				vHtml += '				<div class="col-6 mt-3 text-center">';
				vHtml += '					<span id="span_image_name_'+schedule_detail_id+'">'+data.schedule_detail_image_name+'</span><button type="button" class="btn btn-primary" onclick="schedule_add_image('+schedule_detail_id+')">사진 등록</button>';
				vHtml += '					<input type="hidden" id="schedule_detail_image_'+schedule_detail_id+'" value="'+data.schedule_detail_image+'">';
				vHtml += '					<input type="hidden" id="schedule_detail_image_name_'+schedule_detail_id+'" value="'+data.schedule_detail_image_name+'">';					
				vHtml += '				</div>';
				vHtml += '				<div class="col-12 text-center  mb-3" id="div_image_'+schedule_detail_id+'">';
				if(data.schedule_detail_image){
					vHtml += '<img src="'+data.schedule_detail_image+'" style="border:1px solid #000;width:100%;">';
				}
				vHtml += '</div>';
			}
			if(schedule_detail_use_report_file){
				vHtml += '				<div class="col-6 mt-3"><h4>파일등록 : </h4></div>';
				vHtml += '				<div class="col-6 mt-3 text-center">';
				if(data.schedule_detail_file)
				{
					vHtml += '				<span id="span_file_name_'+schedule_detail_id+'"><a href="'+data.schedule_detail_file+'" class="text-dark" target="_blank">'+data.schedule_detail_file_name+'</a></span>';
				}else{
					vHtml += '				<span id="span_file_name_'+schedule_detail_id+'"></span>';
				}
				vHtml += '<button type="button" class="btn btn-primary" onclick="schedule_add_file('+schedule_detail_id+')">파일 등록</button>';
				vHtml += '				<input type="hidden" id="schedule_detail_file_'+schedule_detail_id+'" value="'+data.schedule_detail_file+'">';
				vHtml += '				<input type="hidden" id="schedule_detail_file_name_'+schedule_detail_id+'" value="'+data.schedule_detail_file_name+'">';
				vHtml += '				</div>';
			}
			if(schedule_detail_use_report_url){
				vHtml += '				<div class="col-12"><h4>URL 등록</h4></div>';
				vHtml += '				<div class="col-12 mb-3">';
				vHtml += '				<input type="text" class="form-control"  id="schedule_detail_url_'+schedule_detail_id+'" value="'+data.schedule_detail_url+'">';
				vHtml += '				</div>';
			}
			if(schedule_detail_use_report_ox){
				vHtml += '				<div class="col-12"><h4>O/X 등록</h4></div>';
				var checked = "";
				vHtml += '				<div class="col-12">';
				vHtml += '					<div class="row" id="search_area">';
				vHtml += '						<div class="offset-6 col-3">';
				checked = "";
				if(data.schedule_detail_ox == "O") checked = "checked";
				vHtml += '							<input type="radio" class="css-input-radio-checkbox" name="schedule_detail_ox_'+schedule_detail_id+'" id="schedule_detail_ox_'+schedule_detail_id+'_o" value="O" '+checked+'>';
				vHtml += '							<label class="css-input-radio-checkbox-label" for="schedule_detail_ox_'+schedule_detail_id+'_o" style="padding:5px;">O</label>';
				vHtml += '						</div>';
				vHtml += '						<div class="col-3">';
				checked = "";
				if(data.schedule_detail_ox == "X") checked = "checked";
				vHtml += '							<input type="radio" class="css-input-radio-checkbox" name="schedule_detail_ox_'+schedule_detail_id+'" id="schedule_detail_ox_'+schedule_detail_id+'_x" value="O" '+checked+'>';
				vHtml += '							<label class="css-input-radio-checkbox-label" for="schedule_detail_ox_'+schedule_detail_id+'_x" style="padding:5px;">X</label>';
				vHtml += '						</div>';
				vHtml += '					</div>';
				vHtml += '				</div>';
			}
			vHtml += '				<div class="col-12"><h4>코멘트</h4></div>';
			vHtml += '				<div class="col-12"><textarea class="form-control" id="schedule_detail_content_'+schedule_detail_id+'">'+data.schedule_detail_content+'</textarea></div>';
			vHtml += '			</div>';
			vHtml += '		</div>';
			vHtml += '	</div>';
			vHtml += '</div>';
			
			$("#accordion").html(vHtml);
			$('#modal-notice-schedule').modal({backdrop: 'static', keyboard: false}); 
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

var task_id;
function open_task(v_id)
{
	task_id = v_id;
	$.ajax({
		type : "POST",
		url : "/notice/getTask.do",
		data : {
			id : v_id
		},
		success:function(data){
			$("#task_title").html(data.task_title);
			$("#task_reference_title").html(data.task_reference_title);
			$("#task_reference_content").html(data.task_reference_content);

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
			
			$("#task_content").html(cfmNvl1(data.task_content));
			
			if(data.task_report_image){
				$("#div_task_image1").show();
				$("#div_task_image2").show();
				if(data.task_image){
					$("#div_task_image2").html('<img src="'+data.task_image+'" style="border:1px solid #000;width:100%;">');
				}else{
					$("#div_task_image2").html('');
				}
			}else{
				$("#div_task_image1").hide();
				$("#div_task_image2").hide();
			}
			
			if(data.task_report_url){
				if(data.task_url){
					$("#div_task_url2").html('<a href="'+data.task_url+'" class="text-dark" target="_blank"><h5>'+data.task_url+'</h5></a>');
				}else{
					$("#div_task_url2").html('');
				}
				$("#div_task_url1").show();
				$("#div_task_url2").show();
			}else{
				$("#div_task_url1").hide();
				$("#div_task_url2").hide();
			}

			
			if(data.task_report_file){
				if(data.task_file){
					$("#div_task_file2").html('<a href="'+data.task_file+'" class="text-dark" target="_blank"><h5>'+data.task_file_name+'</h5></a>');
				}else{
					$("#div_task_file2").html('');
				}
				$("#div_task_file1").show();
				$("#div_task_file2").show();
			}else{
				$("#div_task_file1").hide();
				$("#div_task_file2").hide();
			}

			$("#task_return_content").val(cfmNvl1(data.task_return_content));
			
			$('#modal-notice-task').modal({backdrop: 'static', keyboard: false}); 
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}