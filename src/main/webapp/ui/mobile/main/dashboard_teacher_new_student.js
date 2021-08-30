var course_id;
var section;
var practice_type;
var notice_attend_id;
var schedule_date;
var current_date;
var notice_new_student_id;

jQuery(document).ready(function(){
	user_id = $("#user_id").val();
	course_id = $("#course_id").val();
	section = $("#section").val();
	practice_type = $("#practice_type").val();
	schedule_date = $("#schedule_date").val();
	current_date = $("#current_date").val();
	notice_new_student_id = $("#notice_new_student_id").val();
	if(schedule_date == current_date) $("#btn_save").show();
	search_form();
});

function go_home()
{
	location.href = "/main/dashboard_teacher.do?user_id="+user_id+"&&section=PRACTICE&&schedule_date="+schedule_date;
}

function search_form()
{
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticeNewStudent.do",
		data:{
			id:notice_new_student_id
		},
		success:function(data){
			var newStudent = data.newStudent;
			var newStudentDetailList = data.newStudentDetailList;
			notice_new_student_course_id = newStudent.course_id;
			
			$("#search_new_student_title").html(newStudent.course_group_name+ " " + newStudent.course_name+"반");
			
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
				vHtml += '	<td class="text-center" rowspan="2">'+no+'</td>';
				vHtml += '	<td class="text-center" colspan="2">'+newStudentDetailList[i].student_name+'</td>';
				vHtml += '	<td class="with-form-control" rowspan="2">';
				vHtml += '		<input type="hidden" name="new_student_course_enrollment_id" value="'+newStudentDetailList[i].course_enrollment_id+'">';
				vHtml += '		<textarea class="form-control" name="training_desc">'+newStudentDetailList[i].training_desc+'</textarea>';
				vHtml += '	</td>';
				vHtml += '</tr>';
				vHtml += '<tr>';
				vHtml += '	<td class="text-center '+v_orientation_bg+'">'+v_orientation+'</td>';
				vHtml += '	<td class="text-center '+v_student_level_bg+'">'+v_student_level+'</td>';
				vHtml += '</tr>';
				
			}
			
			$("#new_student_detail_list").html(vHtml);
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
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}