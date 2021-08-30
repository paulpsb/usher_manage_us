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

var array_life_cycle = [
	{code:"CREATED_FROM_PRESET",name:"프리셋에서 복사"},
	{code:"PRESET",name:"프리셋"}
];

var array_days = [
	"일","월","화","수","목","금","토"
];

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

var base_course_group_id = "";

function form_search(){
	base_course_group_id = "";
	$("#dataList").html("");
	$("#test_type").html("");
	$("#student_type").html("");
	$("#lecture_type").html("");
	$("#coursegroup_name").html("");
	$("#days").html("");
	$("#coursegroup_time").html("");
	$("#life_cycle").html("");
	
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
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_detail(\""+data[i].id+"\")'>선택</a>";
				vHtml += "	</td>";
				vHtml += '</tr>';
				
			}
			
			$("#courseList").html(vHtml);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}
function form_detail(v_idx)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseCoursesCoursegroup.do",
		data:{
			id:v_idx
		},
		success:function(data){
			var course_days = data.days;
			var arr_course_days = course_days.split(",");
			var arr_days_name = Array();
			for(var j=0; j<arr_course_days.length; j++)
			{
				var int_day = parseInt(arr_course_days[j]) - 1;
				arr_days_name.push(array_days[int_day]);
			}
			
			base_course_group_id = data.id;
			
			$("#test_type").html(data.test_type);
			$("#student_type").html(student_type[data.student_type].name);
			$("#lecture_type").html(lecture_type[data.lecture_type].name);
			$("#coursegroup_name").html(data.name);
			$("#days").html(arr_days_name.join(","));
			$("#coursegroup_time").html(coursegroup_time[data.time].name);
			$("#coursegroup_life_cycle").html(life_cycle[data.life_cycle].name);
			form_detail_list(v_idx);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var array_delete_idx = Array();
function form_detail_list(v_idx)
{
	array_delete_idx = Array();
	
	$.ajax({
		type : "POST",
		url : "/base/getBaseCoursesCourseList.do",
		data:{
			base_course_group_id:v_idx
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" value="'+data[i].id+'" name="course_id" class="form-control">';
				vHtml += '		<input type="text" value="'+data[i].name+'" name="course_name" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].difficulty+'" name="difficulty" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].inner_difficulty+'" name="inner_difficulty" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].lecture_code+'" name="lecture_code" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<select name="life_cycle" class="form-control">';
				for(var t=0; t<array_life_cycle.length; t++)
				{
					var selected = "";
					if(array_life_cycle[t].code == data[i].life_cycle) selected = "selected";
					vHtml += '			<option value="'+array_life_cycle[t].code+'" '+selected+'>'+array_life_cycle[t].name+'</option>';
				}
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_course"><i class="fa fa-times"></i></a></td>';
				vHtml += '</tr>';
			}
			$("#dataList").html(vHtml);
			initEvent();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add()
{
	if(!base_course_group_id) return;
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="hidden" value="0" name="course_id" class="form-control">';
	vHtml += '		<input type="text" value="" name="course_name" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="difficulty" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="inner_difficulty" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="lecture_code" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<select name="life_cycle" class="form-control">';
	for(var t=0; t<array_life_cycle.length; t++)
	{
		var selected = "";
		vHtml += '			<option value="'+array_life_cycle[t].code+'">'+array_life_cycle[t].name+'</option>';
	}
	vHtml += '		</select>';
	vHtml += '	</td>';
	
	vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_course"><i class="fa fa-times"></i></a></td>';
	vHtml += '</tr>';
	$("#dataList").append(vHtml);
	initEvent();
}

function form_save()
{
	var $_course_id        = $("input[name=course_id]");
	var $_course_name      = $("input[name=course_name]");
	var $_difficulty       = $("input[name=difficulty]");
	var $_inner_difficulty = $("input[name=inner_difficulty]");
	var $_lecture_code     = $("input[name=lecture_code]");
	var $_life_cycle       = $("select[name=life_cycle]");
	
	var data_list = Array();
	
	$_course_id.each(function(index) {
		var course_id        = $(this).val();
		var course_name      = $_course_name.eq(index).val();
		var difficulty       = $_difficulty.eq(index).val();
		var inner_difficulty = $_inner_difficulty.eq(index).val();
		var lecture_code     = $_lecture_code.eq(index).val();
		var life_cycle       = $_life_cycle.eq(index).val();
		
		var objData = Object();
		if(course_id != "0"){
			objData.flag = "U";
		}else{
			objData.flag = "I";
		}
		objData.base_course_group_id = base_course_group_id;
		objData.course_id = course_id;
		objData.course_name = course_name;
		objData.difficulty = difficulty;
		objData.inner_difficulty   = inner_difficulty;
		objData.lecture_code = lecture_code;
		objData.life_cycle = life_cycle;
		
		data_list.push(objData);
	});
	
	for(var i=0; i<array_delete_idx.length; i++)
	{
		var objData = Object();
		objData.flag = "D";
		objData.base_course_group_id = base_course_group_id;
		objData.course_id = array_delete_idx[i];
		objData.course_name = "";
		objData.difficulty = "0";
		objData.inner_difficulty   = "0";
		objData.lecture_code = "0";
		objData.life_cycle = "";
		
		data_list.push(objData);
	}
	
	var data_value = JSON.stringify(data_list);
	$.ajax({
		type : "POST",
		url : "/base/saveBaseCoursesCourse.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			form_detail_list(base_course_group_id);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}

function initEvent()
{
	$('.remove_course').click(function(e){
		var idx = $(this).closest("tr").find("input[name=course_id]");
		if(idx > 0) array_delete_idx.push(idx);
		$(this).closest("tr").remove();
	});
}