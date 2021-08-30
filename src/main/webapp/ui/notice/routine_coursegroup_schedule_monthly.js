var student_types = {
	SENIOR:{ name:"성인"},
	JUNIOR:{ name:"중고등"}
};

var lecture_types = {
	REGULAR:{ name:"종합"},
	SPECIAL:{ name:"특강"},
	SINGLE:{ name:"단과"}
};

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	var vHtml = "";
	for(var i=30; i>0; i--)
	{
		vHtml += '<option value="'+i+'">'+i+'일차</option>';
	}
	$("#routine_schedule").html(vHtml);
	
	$('#routine_schedule').change(function(e){
		create_schedule();
	});	
	
	$('#search_test_type').change(function(e){
		form_search();
	});	
	
	$('#search_student_type').change(function(e){
		form_search();
	});	
	
	$('#search_lecture_type').change(function(e){
		form_search();
	});	
	
	form_search();
});

function form_search(){
	
	$.ajax({
		type : "POST",
		url : "/notice/getRoutineCourseGroupMonthlyList.do",
		data:{
			test_type:$("#search_test_type").val(),
			student_type:$("#search_student_type").val(),
			lecture_type:$("#search_lecture_type").val()
		},
		success:function(data){
			var monthlyGroupList = data.monthlyGroupList;
			var monthlyList = data.monthlyList;
			var groupScheduleList = data.groupScheduleList;

			var vHtml = "";
			for(var i=0; i<monthlyGroupList.length; i++){
				var test_type = monthlyGroupList[i].test_type;
				var student_type = monthlyGroupList[i].student_type;
				var lecture_type = monthlyGroupList[i].lecture_type;
				var routine_schedule = monthlyGroupList[i].routine_schedule;
				
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+routine_schedule+'일차</td>';
				for(var j=1; j<=20; j++)
				{
					if(j > routine_schedule)
					{
						vHtml += '	<td class="text-center">&nbsp;</td>';
					}else{
						var a_idx = monthlyList.findIndex(t => t.test_type == test_type
															&& t.student_type == student_type
															&& t.lecture_type == lecture_type
															&& t.routine_schedule == routine_schedule
															&& t.routine_day == j);
						if(a_idx >= 0){
							var routine_start_day = monthlyList[a_idx].routine_start_day;
							var routine_end_day   = monthlyList[a_idx].routine_end_day;
							if(routine_start_day == routine_end_day){
								vHtml += '	<td class="text-center">'+routine_end_day+'일차</td>';
							}else{
								vHtml += '	<td class="text-center">'+routine_start_day+'~'+routine_end_day+'일차</td>';
							}
						}else{
							vHtml += '	<td class="text-center">&nbsp;</td>';
						}
					}
					
				}
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify(\""+test_type+"\",\""+student_type+"\",\""+lecture_type+"\",\""+routine_schedule+"\")'>수정</a>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_delete(\""+test_type+"\",\""+student_type+"\",\""+lecture_type+"\",\""+routine_schedule+"\")'>삭제</a>";
				vHtml += "	</td>";
				vHtml += '</tr>';
			}
			
			$("#data_list").html(vHtml);
			
			vHtml = "";
			for(var i=0; i<groupScheduleList.length; i++)
			{
				vHtml += '<option value="'+groupScheduleList[i].routine_schedule+'">'+groupScheduleList[i].routine_schedule+'일차</option>';
			}
			$("#routine_course_group_schedule").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add()
{
	test_type = $("#search_test_type").val();
	student_type = $("#search_student_type").val();
	lecture_type = $("#search_lecture_type").val();
	
	$("#routine_schedule").val($("#routine_course_group_schedule").val());
	$("#routine_schedule").attr("disabled", false);
	create_schedule_title();
	create_schedule();
	
	$("#modal-routine-schedule").modal({backdrop: 'static', keyboard: false});
}

var test_type; 
var student_type; 
var lecture_type;
function form_modify(v_test_type, v_student_type, v_lecture_type, v_routine_schedule)
{
	test_type = v_test_type; 
	student_type = v_student_type; 
	lecture_type = v_lecture_type;
	$.ajax({
		type : "POST",
		url : "/notice/getNoticesRoutineTransCoursegroupMonthlyAsGroupList.do",
		data:{
			test_type:v_test_type,
			student_type:v_student_type,
			lecture_type:v_lecture_type,
			routine_schedule:v_routine_schedule
		},
		success:function(data){
			console.log(data);
			$("#routine_schedule").val(v_routine_schedule);
			$("#routine_schedule").attr("disabled", true);
			
			create_schedule_title();
			create_schedule();
			var seq = 1;
			for(var i=0; i<data.length; i++)
			{
				$("#routine_start_day_"+seq).val(data[i].routine_start_day);
				$("#routine_end_day_"+seq).val(data[i].routine_end_day);
				seq++;
			}
			$("#modal-routine-schedule").modal({backdrop: 'static', keyboard: false});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_delete(v_test_type, v_student_type, v_lecture_type, v_routine_schedule)
{
	$.ajax({
		type : "POST",
		url : "/notice/deleteNoticesRoutineTransCoursegroupMonthly.do",
		data:{
			test_type:v_test_type,
			student_type:v_student_type,
			lecture_type:v_lecture_type,
			routine_schedule:v_routine_schedule
		},
		success:function(data){
			alert("삭제하였습니다.");;
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save()
{
	var routine_schedule = parseInt($("#routine_schedule").val());
	var routine_course_group_schedule = $("#routine_course_group_schedule").val();
	
	var array_data = Array();
	for(var i=1; i<=routine_schedule; i++)
	{
		var routine_day = i;
		var routine_start_day = $("#routine_start_day_"+i).val();
		var routine_end_day = $("#routine_end_day_"+i).val();
		
		var objData = Object();
		objData.routine_day = routine_day;
		objData.routine_start_day = routine_start_day;
		objData.routine_end_day = routine_end_day;
		
		array_data.push(objData);
	}
	
	var data_value = JSON.stringify(array_data);
	$.ajax({
		type : "POST",
		url : "/notice/saveNoticesRoutineTransCoursegroupMonthly.do",
		data:{
			test_type:test_type,
			student_type:student_type,
			lecture_type:lecture_type,
			routine_schedule:routine_schedule,
			routine_course_group_schedule:routine_course_group_schedule,
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");;
			$("#modal-routine-schedule").modal("hide");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function create_schedule_title()
{
	$("#test_type").html(test_type);
	$("#student_type").html(student_types[student_type].name);
	$("#lecture_type").html(lecture_types[lecture_type].name);
}
function create_schedule()
{
	var n_schedule = parseInt($("#routine_schedule").val());
	
	var n_row = parseInt(n_schedule/2);
	if((n_schedule%2) > 0) n_row++;
	
	var nSeq = 1;
	var vHtml = "";
	for(var i=0; i<n_row; i++)
	{
		vHtml += '<tr>';
		if(nSeq > n_schedule)
		{
			vHtml += '	<td class="text-center" colspan="3">&nbsp;</td>';
		}else{
			vHtml += '	<th class="text-center">'+nSeq+'일차</th>';
			vHtml += '	<td class="with-form-control">';
			vHtml += '		<input type="text" id="routine_start_day_'+nSeq+'" name="routine_start_day_'+nSeq+'" class="form-control">';
			vHtml += '	</td>';
			vHtml += '	<td class="with-form-control">';
			vHtml += '		<input type="text" id="routine_end_day_'+nSeq+'" name="routine_end_day_'+nSeq+'" class="form-control">';
			vHtml += '	</td>';
		}
		nSeq++;
		
		if(nSeq > n_schedule)
		{
			vHtml += '	<td class="text-center" colspan="3">&nbsp;</td>';
		}else{
			vHtml += '	<th class="text-center">'+nSeq+'일차</th>';
			vHtml += '	<td class="with-form-control">';
			vHtml += '		<input type="text" id="routine_start_day_'+nSeq+'" name="routine_start_day_'+nSeq+'" class="form-control">';
			vHtml += '	</td>';
			vHtml += '	<td class="with-form-control">';
			vHtml += '		<input type="text" id="routine_end_day_'+nSeq+'" name="routine_end_day_'+nSeq+'" class="form-control">';
			vHtml += '	</td>';
		}
		nSeq++;
		vHtml += '</tr>';
	}
	
	$("#schedule_list").html(vHtml);
}