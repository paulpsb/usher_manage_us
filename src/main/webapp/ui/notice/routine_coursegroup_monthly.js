var test_type = "";
var student_type = "";
var lecture_type = "";
var routine_schedule;

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
		if(search_routine_category == "DAILY"){
			location.href="/notice/routine_coursegroup_daily.do?test_type="+test_type+"&&student_type="+student_type+"&&lecture_type="+lecture_type;
		}else if(search_routine_category == "YEARLY"){
			location.href="/notice/routine_coursegroup_yearly.do?test_type="+test_type+"&&student_type="+student_type+"&&lecture_type="+lecture_type;
		}
	});
	
	test_type = $("#test_type").val();
	student_type = $("#student_type").val();
	lecture_type = $("#lecture_type").val();
	routine_schedule = $("#routine_schedule").val();
	
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
		
		search_schedule();
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
	
	location.href="/notice/routine_coursegroup_monthly.do?test_type="+test_type+"&&student_type="+student_type+"&&lecture_type="+lecture_type;
}

function form_coursegroup_cancel()
{
	$('#select_coursegroup').modal("hide"); 
}

function search_schedule()
{
	$.ajax({
		type : "POST",
		url : "/notice/getRoutineTransCoursegroupScheuleList.do",
		data : {
			test_type:test_type,
			student_type:student_type,
			lecture_type:lecture_type,
			routine_category:"MONTHLY"	
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++)
			{
				var checked = "";
				if(routine_schedule == data[i].routine_schedule) checked = "checked";
				vHtml += '<div class="col-1">';
				vHtml += '	<input type="radio" class="css-input-radio-checkbox" name="search_routine_schedule" id="search_routine_schedule_'+i+'" value="'+data[i].routine_schedule+'" '+checked+'>';
				vHtml += '	<label class="css-input-radio-checkbox-label" for="search_routine_schedule_'+i+'" style="padding:5px;">'+data[i].routine_schedule+'일</label>';
				vHtml += '</div>';
			}
			/*
			vHtml += '<div class="col-2">';
			vHtml += '	<button type="button" class="btn btn-primary form-control" onclick="add_schedule()"><i class="fa fa-plus fa-fw"></i> 스케쥴 추가</button>';
			vHtml += '</div>';
			*/
			$("#search_schedule").html(vHtml);
			
			$("input[name='search_routine_schedule']").click(function(){
				routine_schedule = $("input[name='search_routine_schedule']:checked").val();
				form_search();
			});
			
			form_search();
				
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function add_schedule()
{
	$("#add_routine_schedule").val("");
	$("#modal-routin-schedule").modal();
}

function save_schedule()
{
	if(!$("#add_routine_schedule").val()) return;
	routine_schedule = $("#add_routine_schedule").val();
	$.ajax({
		type : "POST",
		url : "/notice/insertRoutineTransCoursegroup.do",
		data : {
			test_type:test_type,
			student_type:student_type,
			lecture_type:lecture_type,
			routine_category:"MONTHLY",
			routine_schedule:routine_schedule
		},
		success:function(data){
			$("#modal-routin-schedule").modal("hide");
			search_schedule();
				
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
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
			routine_category:"MONTHLY",
			routine_schedule:routine_schedule			
		},
		success:function(data){
			routineCoursegroupInfo       = data.routineCoursegroupInfo;
			routineCoursegroupDetailList = data.routineCoursegroupDetailList;
			routineList                  = data.routineList;
			timescheduleList             = data.timescheduleList;
			
			routine_trans_coursegroup_id = routineCoursegroupInfo.id;
			createRoutineTable();
			createDailyTable();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createDailyTable()
{
	var vHtml = "";
	var nCount = parseInt(routine_schedule/5);
	if((routine_schedule%5) > 0) nCount++;
	var nSeq1 = 1;
	var nSeq2 = 1; 
	for(var i=0; i<nCount; i++)
	{
		vHtml += '<tr>';
		for(var k=0; k<5; k++){
			if(nSeq1 > routine_schedule)
			{
				vHtml += '<td rowspan="2"></td>';
			}else{
				vHtml += '<th class="bg-black-transparent-5 text-white"><a class="text-white" href="javascript:go_monthly_daily('+nSeq1+')">'+nSeq1+'일차</a></th>';
			}
			nSeq1++;
		}
		
		vHtml += '</tr>';
		vHtml += '<tr>';
		for(var k=0; k<5; k++){
			if(nSeq2 > routine_schedule)
			{
			}else{
				vHtml += '<td>';
				vHtml += '	<div class="row droppable" style="margin:0px;width:100%;min-height:120px;">';
				vHtml += '		<input type="hidden" name="routine_day" value="'+nSeq2+'">';
				var array_group_detail = routineCoursegroupDetailList.filter(function(item, index){
					//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
					if(item.routine_day == nSeq2){
						return true;
					}
				});
				for(var j=0; j<array_group_detail.length; j++)
				{
					vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-12 mb-2">';
					vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
					vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
					vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
					vHtml += array_group_detail[j].routine_title;
					vHtml += '	</div>';
					vHtml += '</div>';
				}
				vHtml += '	</div>';
				vHtml += '</td>';
			}
			nSeq2++;
		}
		
		vHtml += '</tr>';
	}
	
	$("#daily_list").html(vHtml);
	
	$(".droppable").droppable({
		drop: function (event, ui) {
			var routine_id         = ui.draggable.find("input[name=routine_id]").val();
			var routine_title      = ui.draggable.find("input[name=routine_title]").val();
			var routine_day        = $(this).find("input[name=routine_day]").val();
			var drop_target   = $(this);
			
			$.ajax({
				type : "POST",
				url : "/notice/insertRoutineTransCoursegroupDetail.do",
				data : {
					routine_day:routine_day,
					routine_date:"0",
					routine_start_time:"0",
					routine_trans_coursegroup_id:routine_trans_coursegroup_id,
					routine_id:routine_id			
				},
				success:function(data){
					routine_trans_coursegroup_detail_id = data.id;
					
					var vHtml = "";
					
					vHtml += '<div id="routine_group_detail_'+routine_trans_coursegroup_detail_id+'" class="col-12 mb-2">';
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

function go_monthly_daily(v_day)
{
	location.href="/notice/routine_coursegroup_monthly_day.do?test_type="+test_type+"&&student_type="+student_type+"&&lecture_type="+lecture_type+"&&routine_schedule="+routine_schedule+"&&routine_day="+v_day;
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
		vHtml += '<div id="routine_'+routine_id+'" class="col-12 mb-2" '+display+'>';
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