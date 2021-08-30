var course_id;
var section;
var practice_type;
var notice_attend_id;
var schedule_date;
var current_date;
var user_id;

var attend_status = {
		REGULAR_ATTENDED:{ name:"정상출석"},
		UNPERMITTED_LATE:{ name:"무단지각"},
		UNPERMITTED_ABSENT:{ name:"무단결석"},
		PERMITTED_LATE:{ name:"사유지각"},
		PERMITTED_ABSENT:{ name:"사유결석"}
	};

jQuery(document).ready(function(){
	user_id = $("#user_id").val();
	course_id = $("#course_id").val();
	section = $("#section").val();
	practice_type = $("#practice_type").val();
	schedule_date = $("#schedule_date").val();
	current_date = $("#current_date").val();
	notice_attend_id = $("#notice_attend_id").val();
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
		url : "/main/getTeacherNoticeAttendList.do",
		data:{
			id:notice_attend_id
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
				vHtml += '	<td class="text-center" rowspan="2">'+no+'</td>';
				vHtml += '	<td class="text-center" rowspan="2">'+attendDetailList[i].student_name+'</td>';
				vHtml += '	<td class="text-center" rowspan="2">'+attend_status[attendDetailList[i].attend_status].name+'</td>';
				vHtml += '	<td class="text-center">'+attendDetailList[i].student_reason+'&nbsp;</td>';
				vHtml += '</tr>';
				vHtml += '<tr class="'+v_bg+'">';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" name="attend_course_enrollment_id" value="'+attendDetailList[i].course_enrollment_id+'">';
				if(attendDetailList[i].attend_status == "REGULAR_ATTENDED"){
					vHtml += '		<input type="hidden" name="teacher_reason" value="'+attendDetailList[i].teacher_reason+'">&nbsp;';
				}else{
					vHtml += '		<input type="text" class="form-control" name="teacher_reason" value="'+attendDetailList[i].teacher_reason+'">';
				}
				vHtml += '	</td>';
				vHtml += '</tr>';
				
			}
			
			$("#attend_detail_list").html(vHtml);
			
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