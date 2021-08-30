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

var base_course_id;

function form_search(){
	base_course_id = "";

	$("#dataList").html("");
	$("#test_type").html("");
	$("#student_type").html("");
	$("#lecture_type").html("");
	$("#coursegroup_name").html("");
	$("#days").html("");
	$("#coursegroup_time").html("");
	$("#course_name").html("");
	
	$.ajax({
		type : "POST",
		url : "/base/getBaseCoursesCourseAllList.do",
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
				vHtml += '	<td class="text-center">'+data[i].course_group_name+'</td>';
				vHtml += '	<td class="text-center">'+coursegroup_time[data[i].time].name+'</td>';
				vHtml += '	<td class="text-center">'+arr_days_name.join(",")+'</td>';
				vHtml += '	<td class="text-center">'+data[i].name+'</td>';
				vHtml += '	<td class="text-center">'+data[i].difficulty+'</td>';
				vHtml += '	<td class="text-center">'+data[i].inner_difficulty+'</td>';
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
		url : "/base/getBaseCoursesCourseAll.do",
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
			
			base_course_id = data.id;
			
			$("#test_type").html(data.test_type);
			$("#student_type").html(student_type[data.student_type].name);
			$("#lecture_type").html(lecture_type[data.lecture_type].name);
			$("#coursegroup_name").html(data.coursegroup_name);
			$("#days").html(arr_days_name.join(","));
			$("#coursegroup_time").html(coursegroup_time[data.time].name);
			$("#course_name").html(data.name);
			form_detail_list(v_idx);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_detail_list(v_idx)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseCoursesCoursePracticeList.do",
		data:{
			base_course_id:v_idx
		},
		success:function(data){
			var sectionList = data.sectionList;
			var practiceList = data.practiceList;
			var coursePracticeList = data.coursePracticeList;
			var nSeq = 1;
			var vHtml = "";
			for(var i=0; i<sectionList.length; i++){
				var v_section = sectionList[i].section;
				var a_practice_type_list = practiceList.filter(function(item, index){
					if(item.section == v_section){
						return true;
					}
				}); 
				var n_practice_type = a_practice_type_list.length;
				if(n_practice_type > 0)
				{
					for(var j=0; j<n_practice_type; j++)
					{
						var checked = "";
						var v_practice_type = a_practice_type_list[j].practice_type;
						vHtml += '<tr>';
						if(j == 0){
							vHtml += '	<td class="text-center" rowspan="'+n_practice_type+'">'+v_section+'</td>';
						}
						vHtml += '	<td class="text-center">'+a_practice_type_list[j].practice_name+'</td>';
						var idx = coursePracticeList.findIndex(t => t.section == v_section && t.practice_type == v_practice_type);
						if(idx >= 0) checked = "checked";
						vHtml += '		<td class="text-center">';
						vHtml += '			<input type="hidden" name="section" value="'+v_section+'">';
						vHtml += '			<input type="hidden" name="practice_type" value="'+v_practice_type+'">';
						vHtml += '			<div class="switcher">';
						vHtml += '				<input type="checkbox" name="practice_type_use" id="practice_type_use_'+nSeq+'" value="1" '+checked+'>';
						vHtml += '				<label for="practice_type_use_'+nSeq+'"></label>';
						vHtml += '			</div>';
						vHtml += '		</td>';
						nSeq++;
						
						
						vHtml += '</tr>';
					}
				}
				
			}
			$("#dataList").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_all_check(isChecked)
{
	$("input[name=practice_type_use]").each(function(index) {
		$(this).prop("checked", isChecked);
	});
}

function form_save()
{
	if(!base_course_id) return;
	
	var $_section           = $("input[name=section]");
	var $_practice_type     = $("input[name=practice_type]");
	var $_practice_type_use = $("input[name=practice_type_use]");
	
	var section_list = Array();
	
	$_section.each(function(index) {
		var section        = $(this).val();
		var practice_type  = $_practice_type.eq(index).val();
		
		if($_practice_type_use.eq(index).is(":checked"))
		{
			var objSection = Object();
			objSection.status = "ACTIVE";
			objSection.section = section;
			objSection.practice_type = practice_type;
			section_list.push(objSection);
		}
		
	});
	
	var data_value = JSON.stringify(section_list);
	$.ajax({
		type : "POST",
		url : "/base/saveBaseCoursesCoursePractice.do",
		data:{
			base_course_id:base_course_id,
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			form_detail_list(base_course_id);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}
