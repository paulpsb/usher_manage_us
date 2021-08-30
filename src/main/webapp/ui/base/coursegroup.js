var student_type = {
	SENIOR:{ name:"성인"},
	JUNIOR:{ name:"중고등"}
};

var lecture_type = {
	REGULAR:{ name:"종합"},
	SPECIAL:{ name:"특강"},
	SINGLE:{ name:"단과"}
};

var coursegroup_time = {
	ALL_DAY:{ name:"종일"},
	MORNING:{ name:"오전"},
	AFTERNOON:{ name:"오후"},
	EVENING:{ name:"저녁"}
};

var life_cycle = {
	CREATED_FROM_PRESET:{ name:"프리셋에서 복사"},
	PRESET:{ name:"프리셋"}
};

var array_days = [
	"일","월","화","수","목","금","토"
]

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
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
		url : "/base/getBaseCoursesCoursegroupList.do",
		data:{
			test_type:$("#search_test_type").val(),
			student_type:$("#search_student_type").val(),
			lecture_type:$("#search_lecture_type").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var course_days = data[i].days;
				var arr_course_days = course_days.split(",");
				var arr_days_name = Array();
				for(var j=0; j<arr_course_days.length; j++)
				{
					var int_day = parseInt(arr_course_days[j]) - 1;
					arr_days_name.push(array_days[int_day]);
				}
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+data[i].test_type+'</td>';
				vHtml += '	<td class="text-center">'+student_type[data[i].student_type].name+'</td>';
				vHtml += '	<td class="text-center">'+lecture_type[data[i].lecture_type].name+'</td>';
				vHtml += '	<td class="text-center">'+data[i].name+'</td>';
				vHtml += '	<td class="text-center">'+arr_days_name.join(",")+'</td>';
				vHtml += '	<td class="text-center">'+coursegroup_time[data[i].time].name+'</td>';
				vHtml += '	<td class="text-center">'+life_cycle[data[i].life_cycle].name+'</td>';
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify(\""+data[i].id+"\")'>수정</a>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_delete(\""+data[i].id+"\")'>삭제</a>";
				vHtml += "	</td>";
				vHtml += '</tr>';
				
			}
			
			$("#dataList").html(vHtml);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add()
{
	$("#coursegroup_id").val(0);
	$("#test_type").val("TOEFL");
	$("#student_type").val("SENIOR");
	$("#lecture_type").val("REGULAR");
	$("#coursegroup_time").val("ALL_DAY");
	$("#life_cycle").val("CREATED_FROM_PRESET");
	$("#coursegroup_name").val("");
	fn_checkbox_not_check();
	$("#modal-coursegroup").modal();
}

function form_modify(idx)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseCoursesCoursegroup.do",
		data:{
			id:idx
		},
		success:function(data){
			fn_checkbox_not_check();
			$("#coursegroup_id").val(data.id);
			$("#test_type").val(data.test_type);
			$("#student_type").val(data.student_type);
			$("#lecture_type").val(data.lecture_type);
			$("#coursegroup_time").val(data.time);
			$("#life_cycle").val(data.life_cycle);
			$("#coursegroup_name").val(data.name);
			
			var course_days = data.days;
			var arr_course_days = course_days.split(",");
			for(var j=0; j<arr_course_days.length; j++)
			{
				$('#id_day_'+arr_course_days[j]).prop("checked", true);
			}
			
			$("#modal-coursegroup").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_delete(idx)
{
	if(!confirm("삭제하시겠습니까?")) return;
	$.ajax({
		type : "POST",
		url : "/base/deleteBaseCoursesCoursegroup.do",
		data:{
			id:idx
		},
		success:function(data){
			alert("삭제하였습니다.");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save()
{
	var coursegroup_days = "";
	$('input[name="days"]:checked').each(function(index,item){
		if(index > 0)
		{
			coursegroup_days += ",";
		}
		coursegroup_days += $(this).val();
	});
	
	var url = "/base/updateBaseCoursesCoursegroup.do";
	if($("#coursegroup_id").val() == "0")
	{
		url="/base/insertBaseCoursesCoursegroup.do";
	}
	
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#coursegroup_id").val(),
			test_type:$("#test_type").val(),
			student_type:$("#student_type").val(),
			lecture_type:$("#lecture_type").val(),
			name:$("#coursegroup_name").val(),
			days:coursegroup_days,
			time:$("#coursegroup_time").val(),
			life_cycle:$("#life_cycle").val(),
		},
		success:function(data){
			$("#modal-coursegroup").modal("hide");
			
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}
function fn_checkbox_not_check()
{
	for(var i=1; i<=7; i++)
	{
		$('#id_day_'+i).prop("checked", false);
	}
}