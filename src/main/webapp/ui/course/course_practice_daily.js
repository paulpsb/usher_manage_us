var sectionList;

var section_color = [
	"bg-red-darker",
	"bg-green-darker",
	"bg-purple-darker",
	"bg-orange-darker",
	"bg-aqua-darker",
	"bg-blue-darker"
];

var practice_section_color = {
	VOCA:{color:"bg-red-darker"},
	GRAMMAR:{color:"bg-green-darker"},
	READING:{color:"bg-purple-darker"},
	LISTENING:{color:"bg-orange-darker"},
	WRITING:{color:"bg-aqua-darker"},
	SPEAKING:{color:"bg-blue-darker"}
};

var array_etc = [
	{ study_type:"LUNCH", study_name:"점심시간" },
	{ study_type:"DINNER", study_name:"저녁시간" },
	{ study_type:"INDEPENDENT", study_name:"의무자습" }
];

var voca_score = [
	180,
	160,
	150,
	120,
	100
];

var etc_score = [
	90,
	80,
	70,
	60,
	50
];


var test_type = "";
var student_type = "";
var lecture_type = "";

var courseList;
var course_id;
/*
* 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	showCourses("N");
	search_semester();

	$('#search_schedule').change(function(e){
		form_search();
	});
});

/*
 * 설명 : 년/월 조회
 */
function search_semester()
{

	$.ajax({
		type : "POST",
		url : "/common/getSemesterList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			var to_month = cfmGetToMonth();

			for(var i=0; i<data.length; i++){
				var selected = "";
				if(to_month == data[i].date) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date+"</option>";
			}
			$("#search_semester_id").html(vHtml);

			$('#search_semester_id').change(function(e){
				search_course_group();
			});
			
			$('#search_test_type').change(function(e){
				search_course_group();
			});
			
			search_course_group();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_course_group()
{
	$.ajax({
		type : "POST",
		url : "/common/getCourseAllList.do",
		data:{
			semester_id:$("#search_semester_id").val()
		},
		success:function(data){
			var vHtml = "";
			var coursegroupList = data.coursegroupList;
			courseList = data.courseList;
			for(var i=0; i<coursegroupList.length; i++)
			{
				var courseGorupId = coursegroupList[i].id;
				vHtml += '<div class="form-group row m-b-15">';
				vHtml += '	<div class="col-9">';
				vHtml += '		<h5>'+coursegroupList[i].name+'<h5>';
				vHtml += '	</div>';
				vHtml += '</div>';
				vHtml += '<div class="form-group row m-b-15">';
				
				var arr_course = courseList.filter(function(item, index){
					if(item.course_group_id == courseGorupId){
						return true;
					}
				});
				for(var j=0; j<arr_course.length; j++)
				{
					var vTitle = coursegroupList[i].name+' '+arr_course[j].name+'반';
					vHtml += '	<div class="col-2 text-center">';
					vHtml += '		<a href="javascript:form_sitemap_select(\''+vTitle+'\','+arr_course[j].id+')"><h5>'+arr_course[j].name+'반</h5></a>';
					vHtml += '	</div>';
				}
				vHtml += '</div>';
				$("#site_map").html(vHtml);
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function showCourses(isCancel)
{
	if(isCancel == "Y"){
		$("#btn_cancel_course").show();
	}else{
		$("#btn_cancel_course").hide();
	}
	$('#select_courses').modal({backdrop: 'static', keyboard: false}); 
}

function form_sitemap_select(v_title, v_course_id)
{
	course_id = v_course_id;
	$("#select_course_name").html(v_title);
	$('#select_courses').modal("hide"); 
	
	var q_idx = courseList.findIndex(t => t.id == v_course_id);
	var arr_schedule = courseList[q_idx].schedule.split(",");
	test_type    =  courseList[q_idx].test_type;
	student_type =  courseList[q_idx].student_type;
	lecture_type =  courseList[q_idx].lecture_type;
	var sHtml = "";
	for(var i=0; i<arr_schedule.length; i++)
	{
		sHtml += '<option value="'+arr_schedule[i]+'">'+arr_schedule[i]+'</option>';
	}
	$("#search_schedule").html(sHtml);
	
	search_group_timetable();
}

function form_course_cancel()
{
	$('#select_courses').modal("hide"); 
}

var course_group_timetable;
function search_group_timetable()
{
	$.ajax({
		type : "POST",
		url : "/common/getBaseCoursegroupTimescheduleList.do",
		data:{
			test_type:test_type,
			student_type:student_type,
			lecture_type,lecture_type
		},
		success:function(data){
			course_group_timetable = data;
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_search(){

	var url = "/course/getCoursePracticeDailyList.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:{
			course_id:course_id,
			date:$("#search_schedule").val()
		},
		success:function(data){
			sectionList = data.sectionList;
			var typeList = data.typeList;
			var sectionTypeList = data.sectionTypeList;
			var coursePracticeList = data.coursePracticeList;
			var courseTimetableList = data.courseTimetableList;
			var courseInfo = data.courseInfo;
			
			var sectionCount = sectionList.length;
			var vHtml = "";
			
			
			for(var i=0; i<course_group_timetable.length; i++)
			{
				var sHour = course_group_timetable[i].start_time;
				var eHour = course_group_timetable[i].end_time;
				var a_idx = courseTimetableList.findIndex(t => t.class_hour == sHour);
				var v_class = "";
				var v_time_class = "bg-grey-darker";
				if(a_idx >= 0){
					var search_section_short = "";
					var search_study_name = "";
					if(courseTimetableList[a_idx].study_type == "CLASS"){
						search_study_name = "수업";
					}else{
						search_study_name = "스터디";
					}
					
					if(courseTimetableList[a_idx].section == "VOCA"){
						search_section_short = "VC ";
					}else if(courseTimetableList[a_idx].section == "GRAMMAR"){
						search_section_short = "GR ";
					}else if(courseTimetableList[a_idx].section == "READING"){
						search_section_short = "RC ";
					}else if(courseTimetableList[a_idx].section == "LISTENING"){
						search_section_short = "LC ";
					}else if(courseTimetableList[a_idx].section == "WRITING"){
						search_section_short = "WR ";
					}else if(courseTimetableList[a_idx].section == "SPEAKING"){
						search_section_short = "SP ";
					}else{
						if(courseTimetableList[a_idx].study_type == "LUNCH"){
							search_study_name = "점심시간";
						}else if(courseTimetableList[a_idx].study_type == "DINNER"){
							search_study_name = "저녁시간";
						}else if(courseTimetableList[a_idx].study_type == "INDEPENDENT"){
							search_study_name = "의무자습";
						}
					}
						
					if(search_section_short) v_class += search_section_short+" ";
					v_class += search_study_name;
					if(courseTimetableList[a_idx].user_name) v_class += "<br>("+courseTimetableList[a_idx].user_name+")";
					if(courseTimetableList[a_idx].user_color) v_time_class = courseTimetableList[a_idx].user_color;
				}
				
				var practice_list = coursePracticeList.filter(function(item, index){
					if(item.start_time == sHour){
						return true;
					}
				});
				
				var rHtml = "";
				for(var j=0; j<practice_list.length; j++)
				{
					rHtml += '<div class="practice_drop col-2 mb-2 mr-1 text-center '+practice_section_color[practice_list[j].section].color+' text-white" style="cursor: pointer;padding:5px;">';
					rHtml += "<input type='hidden' value='"+practice_list[j].section+"' name='section'>";
					rHtml += "<input type='hidden' value='"+practice_list[j].practice_type+"' name='practice_type'>";
					rHtml += "<input type='hidden' value='"+practice_list[j].start_time+"' name='start_time'>";
					rHtml += "<input type='hidden' value='"+practice_list[j].end_time+"' name='end_time'>";
					rHtml += practice_list[j].short_title_kr+"<br>";
					rHtml += practice_list[j].practice_name+"<br>";
					if(practice_list[j].program_use == "Y"){
						rHtml += "<select name='pass_score' style='width:100%;'>";
						if(practice_list[j].section == "VOCA"){
							for(var k=0; k<voca_score.length; k++){
								var checked = "";
								if(practice_list[j].pass_score == voca_score[k]) checked = "selected";
								rHtml += "<option value='"+voca_score[k]+"' "+checked+">"+voca_score[k]+"개</option>";
							}
						}else{
							for(var k=0; k<etc_score.length; k++){
								var checked = "";
								if(practice_list[j].pass_score == etc_score[k]) checked = "selected";
								rHtml += "<option value='"+etc_score[k]+"' "+checked+">"+etc_score[k]+"%</option>";
							}
						}
						rHtml += "</select>";
					}else{
						rHtml += "<select name='pass_score' style='width:100%;'>";
						rHtml += "<option value='1'>O</option>";
						rHtml += "</select>";
					}
					rHtml += '</div>';

				}
				vHtml += '<tr>';
				vHtml += '	<th class="text-center '+v_time_class+'">'+sHour+'</th>';
				vHtml += '	<th class="text-center '+v_time_class+'">'+v_class+'</th>';
				vHtml += '	<td class="droppable">';
				rHtml += "		<input type='hidden' value='"+sHour+"' name='search_start_time'>";
				rHtml += "		<input type='hidden' value='"+eHour+"' name='search_end_time'>";
				vHtml += '		<div class="schedule row ml-2 mr-2">';
				vHtml += rHtml;
				vHtml += '		</div>';
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			$("#timetableDataList").html(vHtml);
			
			vHtml = "";
			for(var i=0; i<sectionCount; i++)
			{
				vHtml += '<tr>';
				vHtml += '	<th class="text-center">'+sectionList[i].section+'</th>';
				vHtml += '	<td>';
				vHtml += '		<div class="row ml-2 mr-2">';
				for(var j=0; j<sectionTypeList.length; j++ )
				{
					if(sectionList[i].section == sectionTypeList[j].section)
					{
						var c_section = sectionTypeList[j].section;
						var c_practice_type = sectionTypeList[j].practice_type;
						var c_idx = coursePracticeList.findIndex(t => t.section == c_section && t.practice_type == c_practice_type);
						var c_display = "";
						if(c_idx >= 0 ) c_display = "display:none;";
						vHtml += '<div id="'+sectionTypeList[j].section+'_'+sectionTypeList[j].practice_type+'" class="draggable col-2 mb-2 mr-1 text-center '+section_color[i]+' text-white" style="cursor: move;padding:10px;'+c_display+'">';
						vHtml += "<input type='hidden' value='"+sectionTypeList[j].section+"' name='search_section'>";
						vHtml += "<input type='hidden' value='"+sectionTypeList[j].practice_type+"' name='search_practice_type'>";
						vHtml += "<input type='hidden' value='"+sectionTypeList[j].short_title_kr+"' name='search_short_title_kr'>";
						vHtml += "<input type='hidden' value='"+sectionTypeList[j].practice_name+"' name='search_practice_name'>";
						vHtml += "<input type='hidden' value='"+sectionTypeList[j].program_use+"' name='search_program_use'>";
						
						vHtml += sectionTypeList[j].short_title_kr+"<br>";
						vHtml += sectionTypeList[j].practice_name;
						vHtml += '</div>';
					}
				}
				vHtml += '		</div>';
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			$("#practiceDataList").html(vHtml);
			
			$(".draggable").draggable({
				revert: true,
				zIndex: 9900
			});
			
			$(".droppable").droppable({
				drop: function (event, ui) {
					var section       = ui.draggable.find("input[name=search_section]").val();
					var practice_type = ui.draggable.find("input[name=search_practice_type]").val();
					var section_short = ui.draggable.find("input[name=search_short_title_kr]").val();
					var practice_name  = ui.draggable.find("input[name=search_practice_name]").val();
					var program_use    = ui.draggable.find("input[name=search_program_use]").val();
					var start_time     = $(this).find("input[name=search_start_time]").val();
					var end_time       = $(this).find("input[name=search_end_time]").val();
					var rHtml = "";
					
					rHtml += '<div class="practice_drop col-2 mb-2 mr-1 text-center '+practice_section_color[section].color+' text-white" style="cursor: pointer;padding:5px;">';
					rHtml += "<input type='hidden' value='"+section+"' name='section'>";
					rHtml += "<input type='hidden' value='"+practice_type+"' name='practice_type'>";
					rHtml += "<input type='hidden' value='"+start_time+"' name='start_time'>";
					rHtml += "<input type='hidden' value='"+end_time+"' name='end_time'>";
					rHtml += section_short+"<br>";
					rHtml += practice_name+"<br>";
					if(program_use == "Y"){
						rHtml += "<select name='pass_score' style='width:100%;'>";
						if(section == "VOCA"){
							for(var k=0; k<voca_score.length; k++){
								var checked = "";
								rHtml += "<option value='"+voca_score[k]+"' "+checked+">"+voca_score[k]+"개</option>";
							}
						}else{
							for(var k=0; k<etc_score.length; k++){
								var checked = "";
								rHtml += "<option value='"+etc_score[k]+"' "+checked+">"+etc_score[k]+"%</option>";
							}
						}
						rHtml += "</select>";
					}else{
						rHtml += "<select name='pass_score' style='width:100%;'>";
						rHtml += "<option value='0'>O</option>";
						rHtml += "</select>";
					}
					rHtml += '</div>';

					$(this).find(".schedule").append(rHtml);
					
					ui.draggable.hide();
					$(".practice_drop").dblclick(function(){
						var section = $(this).find("input[name=section]").val();
						var practice_type = $(this).find("input[name=practice_type]").val();
						$("#"+section+"_"+practice_type).show();
						$(this).remove();
					});
				}
			});
			
			$(".practice_drop").dblclick(function(){
				var section = $(this).find("input[name=section]").val();
				var practice_type = $(this).find("input[name=practice_type]").val();
				$("#"+section+"_"+practice_type).show();
				$(this).remove();
			});
			$(".is_section").click(function(){
				var section = $(this).find("input[name=section_id]").val();
				var t_idx = sectionList.findIndex(t => t.section == section);
				//우선 모두 active를 날려버린다.
				for(var i=0; i<sectionList.length; i++)
				{
					var section_id = "is_"+sectionList[i].section.toLowerCase();
					$("#course_"+section_id).removeClass("active");
					
					$("#"+section_id).val("0");
				}
				
				for(var i=0; i<=t_idx; i++)
				{
					var section_id = "is_"+sectionList[i].section.toLowerCase();
					$("#course_"+section_id).addClass("active");
					
					$("#"+section_id).val("1");
				}
			});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save(){
	$("#btn_save").hide();
	var $_section           = $("input[name=section]");
	var $_practice_type     = $("input[name=practice_type]");
	var $_start_time        = $("input[name=start_time]");
	var $_end_time          = $("input[name=end_time]");
	var $_pass_score        = $("select[name=pass_score]");
	
	var section_list = Array();
	
	var resv_data = Object();

	//우선 모두 active를 날려버린다.
	for(var i=0; i<sectionList.length; i++)
	{
		var section_id = "is_"+sectionList[i].section.toLowerCase();
		
		if($("#"+section_id).val() == "1"){
			resv_data[section_id] = true;
		}else{
			resv_data[section_id] = false;
		}
	}
	
	$_section.each(function(index) {
		var section        = $(this).val();
		var practice_type  = $_practice_type.eq(index).val();
		var start_time     = $_start_time.eq(index).val();
		var end_time       = $_end_time.eq(index).val();
		var pass_score     = $_pass_score.eq(index).val();
		
		var objSection = Object();
		objSection.status = "ACTIVE";
		objSection.section = section;
		objSection.practice_type = practice_type;
		objSection.start_time    = start_time;
		objSection.end_time      = end_time;
		objSection.pass_score    = pass_score;
		section_list.push(objSection);
	});
	
	var data_value = JSON.stringify(section_list);
	
	resv_data.course_id = course_id;
	resv_data.data_value = data_value;
	resv_data.date = $("#search_schedule").val();
	
	var url = "/course/saveCoursePracticeDaily.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:resv_data,
		success:function(data){
			alert("저장하였습니다.");
			$("#btn_save").show();
			form_search();

		},
		error:function(event){	
			$("#btn_save").show();
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}