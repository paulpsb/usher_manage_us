var test_type = "";
var student_type = "";
var lecture_type = "";

var routineCoursegroupInfo;
var routineCoursegroupDetailList;
var routineList;
var timescheduleList;

var routine_trans_coursegroup_id;
/*
* 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("input[name='search_routine_category']").click(function(){
		var search_routine_category = $("input[name='search_routine_category']:checked").val();
		if(search_routine_category == "MONTHLY"){
			location.href="/notice/routine_coursegroup_monthly.do?test_type="+test_type+"&&student_type="+student_type+"&&lecture_type="+lecture_type;
		}else if(search_routine_category == "YEARLY"){
			location.href="/notice/routine_coursegroup_yearly.do?test_type="+test_type+"&&student_type="+student_type+"&&lecture_type="+lecture_type;
		}
	});
	
	test_type = $("#test_type").val();
	student_type = $("#student_type").val();
	lecture_type = $("#lecture_type").val();
	
	if(!test_type){
		showCourseGroup("N");
	}else{
		var course_group_name = test_type;
		if(student_type == "SENIOR"){
			course_group_name += " 성인";
		}else{
			course_group_name += " 중고등";
		}
		if(lecture_type == "REGULAR"){
			course_group_name += " 정규";
		}else if(lecture_type == "SPECIAL"){
			course_group_name += " 특강";
		}else{
			course_group_name += " 단과";
		}
		$("#select_course_group_name").html(course_group_name);
		form_search();
	}
});

function showCourseGroup(isCancel)
{
	if(isCancel == "Y"){
		$("#btn_cancel_coursegroup").show();
	}else{
		$("#btn_cancel_coursegroup").hide();
	}
	
	$("#search_test_type_toefl").prop("checked", true);
	$("#search_student_type_senior").prop("checked", true);
	$("#search_lecture_type_regular").prop("checked", true);
	
	$('#select_coursegroup').modal({backdrop: 'static', keyboard: false}); 
}

function form_coursegroup_select()
{
	$('#select_coursegroup').modal("hide"); 
	
	test_type = $("input[name='search_test_type']:checked").val();
	student_type = $("input[name='search_student_type']:checked").val();
	lecture_type = $("input[name='search_lecture_type']:checked").val();
	
	var course_group_name = test_type;
	if(student_type == "SENIOR"){
		course_group_name += " 성인";
	}else{
		course_group_name += " 중고등";
	}
	if(lecture_type == "REGULAR"){
		course_group_name += " 정규";
	}else if(lecture_type == "SPECIAL"){
		course_group_name += " 특강";
	}else{
		course_group_name += " 단과";
	}
	
	$("#select_course_group_name").html(course_group_name);
	
	form_search();
}

function form_coursegroup_cancel()
{
	$('#select_coursegroup').modal("hide"); 
}

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/notice/getRoutineCourseGroupList.do",
		data : {
			test_type:test_type,
			student_type:student_type,
			lecture_type:lecture_type,
			routine_category:"DAILY",
			routine_schedule:0			
		},
		success:function(data){
			routineCoursegroupInfo       = data.routineCoursegroupInfo;
			routineCoursegroupDetailList = data.routineCoursegroupDetailList;
			routineList                  = data.routineList;
			timescheduleList             = data.timescheduleList;
			
			routine_trans_coursegroup_id = routineCoursegroupInfo.id;
			createRoutineTable();
			createTimeTable();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createTimeTable()
{
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '	<th class="text-center bg-black-transparent-5 text-white">시간 미지정</th>';
	vHtml += '	<td>';
	vHtml += '		<div class="row droppable" style="margin:0px;width:100%;min-height:18px;">';
	vHtml += '			<input type="hidden" name="routine_start_time" value="0">';
	var array_group_detail = routineCoursegroupDetailList.filter(function(item, index){
		//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
		if(item.routine_start_time == "0"){
			return true;
		}
	});
	for(var j=0; j<array_group_detail.length; j++)
	{
		vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-4 mb-2">';
		vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
		vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
		vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
		vHtml += array_group_detail[j].routine_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	vHtml += '		</div>';
	vHtml += '	</td>';
	vHtml += '</tr>';
	
	var before_hour = parseInt(timescheduleList[0].start_time.substr(0,2)) - 1;
	var before_min  = timescheduleList[0].start_time.substr(3,2);
	var before_time = "";
	if(before_hour < 10){
		before_time = "0"+before_hour+":"+before_min;
	}else{
		before_time = before_hour+":"+before_min;
	}
	
	vHtml += '<tr>';
	vHtml += '	<th class="text-center bg-black-transparent-5 text-white">'+before_time+'</th>';
	vHtml += '	<td>';
	vHtml += '		<div class="row droppable" style="margin:0px;width:100%;min-height:18px;">';
	vHtml += '			<input type="hidden" name="routine_start_time" value="'+before_time+'">';
	var array_group_detail = routineCoursegroupDetailList.filter(function(item, index){
		//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
		if(item.routine_start_time == before_time){
			return true;
		}
	});
	for(var j=0; j<array_group_detail.length; j++)
	{
		vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-4 mb-2">';
		vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
		vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
		vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
		vHtml += array_group_detail[j].routine_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	vHtml += '		</div>';
	vHtml += '	</td>';
	vHtml += '</tr>';
	
	for(var i=0; i<timescheduleList.length; i++)
	{
		var start_time = timescheduleList[i].start_time;
		vHtml += '<tr>';
		vHtml += '	<th class="text-center bg-black-transparent-5 text-white">'+start_time+'</th>';
		vHtml += '	<td>';
		vHtml += '		<div class="row droppable" style="margin:0px;width:100%;min-height:18px;">';
		vHtml += '			<input type="hidden" name="routine_start_time" value="'+start_time+'">';
		var array_group_detail = routineCoursegroupDetailList.filter(function(item, index){
			//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
			if(item.routine_start_time == start_time){
				return true;
			}
		});
		for(var j=0; j<array_group_detail.length; j++)
		{
			vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-4 mb-2">';
			vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
			vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
			vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
			vHtml += array_group_detail[j].routine_title;
			vHtml += '	</div>';
			vHtml += '</div>';
		}
		vHtml += '		</div>';
		vHtml += '	</td>';
		vHtml += '</tr>'
	}
	
	var last_idx = timescheduleList.length -1;
	var last_hour = parseInt(timescheduleList[last_idx].start_time.substr(0,2)) + 1;
	var last_min  = timescheduleList[last_idx].start_time.substr(3,2);
	var last_time = "";
	if(last_hour < 10){
		last_time = "0"+last_hour+":"+last_min;
	}else{
		last_time = last_hour+":"+last_min;
	}
	last_time = "22:00";
	vHtml += '<tr>';
	vHtml += '	<th class="text-center bg-black-transparent-5 text-white">'+last_time+'</th>';
	vHtml += '	<td>';
	vHtml += '		<div class="row droppable" style="margin:0px;width:100%;min-height:18px;">';
	vHtml += '			<input type="hidden" name="routine_start_time" value="'+last_time+'">';
	var array_group_detail = routineCoursegroupDetailList.filter(function(item, index){
		//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
		if(item.routine_start_time == last_time){
			return true;
		}
	});
	for(var j=0; j<array_group_detail.length; j++)
	{
		vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-4 mb-2">';
		vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
		vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
		vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
		vHtml += array_group_detail[j].routine_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	vHtml += '		</div>';
	vHtml += '	</td>';
	vHtml += '</tr>';
	
	$("#time_list").html(vHtml);
	
	$(".droppable").droppable({
		drop: function (event, ui) {
			var routine_id         = ui.draggable.find("input[name=routine_id]").val();
			var routine_title      = ui.draggable.find("input[name=routine_title]").val();
			var routine_start_time = $(this).find("input[name=routine_start_time]").val();
			var drop_target   = $(this);
			
			$.ajax({
				type : "POST",
				url : "/notice/insertRoutineTransCoursegroupDetail.do",
				data : {
					routine_day:0,
					routine_date:"0",
					routine_start_time:routine_start_time,
					routine_trans_coursegroup_id:routine_trans_coursegroup_id,
					routine_id:routine_id			
				},
				success:function(data){
					routine_trans_coursegroup_detail_id = data.id;
					
					var vHtml = "";
					
					vHtml += '<div id="routine_group_detail_'+routine_trans_coursegroup_detail_id+'" class="col-4 mb-2">';
					vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
					vHtml += '		<input type="hidden" name="group_detail_id" value="'+routine_trans_coursegroup_detail_id+'">';
					vHtml += '		<input type="hidden" name="routine_id" value="'+routine_id+'">';
					vHtml += routine_title;
					vHtml += '	</div>';
					vHtml += '</div>';
					drop_target.append(vHtml);
					$("#routine_"+routine_id).hide();
					$(".section-drop").dblclick(function(){
						var v_group_id = $(this).find("input[name=group_detail_id]").val();
						var v_routine_id      = $(this).find("input[name=routine_id]").val();
						deleteGroupDetail(v_group_id, v_routine_id);
					});
				},
				error:function(event){				
					alert("잠시후 다시 시도 바랍니다.");
				}
			});
		}
	});
	
	$(".section-drop").dblclick(function(){
		var v_group_id = $(this).find("input[name=group_detail_id]").val();
		var v_routine_id      = $(this).find("input[name=routine_id]").val();
		deleteGroupDetail(v_group_id, v_routine_id);
	});
}

function deleteGroupDetail(v_group_id, v_routine_id)
{
	$.ajax({
		type : "POST",
		url : "/notice/deleteRoutineTransCoursegroupDetail.do",
		data : {
			id:v_group_id			
		},
		success:function(data){
			$("#routine_group_detail_"+v_group_id).remove();
			$("#routine_"+v_routine_id).show();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createRoutineTable()
{
	var vHtml = "";
	for(var i=0; i<routineList.length; i++)
	{
		var routine_id    = routineList[i].id;
		var routine_title = routineList[i].routine_title;
		var display = "";
		var a_idx = routineCoursegroupDetailList.findIndex(t => t.routine_id == routine_id);
		if(a_idx >= 0) display = "style='display:none;'";
		vHtml += '<div id="routine_'+routine_id+'" class="col-6 mb-2" '+display+'>';
		vHtml += '	<div class="draggable bg-aqua-transparent-7 section-drag text-center">';
		vHtml += '		<input type="hidden" name="routine_id" value="'+routine_id+'">';
		vHtml += '		<input type="hidden" name="routine_title" value="'+routine_title+'">';
		vHtml += routine_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	$("#routine_list").html(vHtml);
	
	$(".draggable").draggable({
		revert: true,
		zIndex: 999999
	});
}