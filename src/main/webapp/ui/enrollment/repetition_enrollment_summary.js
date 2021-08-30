var junior_regular_class_list = [
	[10, 15],
	[20, 30],
	[36, 48],
	[36, 48],
	[36, 48]
]

var junior_special_class_list = [
	[10, 15],
	[15, 30],
	[15, 30],
	[15, 30],
	[15, 30]
]

var senior_regular_class_list = [
	[1, 2],
	[1, 2],
	[1, 2],
	[1, 2],
	[1, 2]
]

var course_id;

var semester_list;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
});

/*
 * 설명 : 년/월 조회
 */
function search_semester()
{
	var to_month = cfmGetToMonth();
	
	$.ajax({
		type : "POST",
		url : "/common/getSemesterList.do",
		data:{
		},
		success:function(data){
			semester_list = data;
			var vHtml = "";
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

/*
 * 설명 : 반 그룹 조회
 */
function search_course_group()
{
	$.ajax({
		type : "POST",
		url : "/common/getCoursegroupList.do",
		data:{
			semester_id:$("#search_semester_id").val(),
			test_type:$("#search_test_type").val()
		},
		success:function(data){
			course_group_list = data;
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				if($("#search_course_group_id").val()){
					form_search();
				}
			});
			
			if(data.length > 0){
				form_search();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var courseGroupInfo;
var courseList;
var enrollmentList;
var semesterEnrollmentList;
var repetitionList;
var classCountList;

var vStudentType = "";
var vSeq = 1;

function form_search()
{
	var semester_id = $("#search_semester_id").val();
	var next_semester_id = 0;
	var max_idx = semester_list.length;
	var se_idx = semester_list.findIndex(t => t.id == semester_id);
	if(se_idx > 0) next_semester_id = semester_list[se_idx-1].id;
	
	var semester_in_data = semester_id+"";
	if(next_semester_id > 0) semester_in_data += ","+next_semester_id+"";
	$.ajax({
		type : "POST",
		url : "/enrollment/getRepetitionEnrollmentSummaryList.do",
		data:{
			course_group_id:$("#search_course_group_id").val(),
			semester_in_data:semester_in_data
		},
		success:function(data){
			vSeq = 1;
			
			courseGroupInfo= data.courseGroupInfo;
			courseList     = data.courseList;
			enrollmentList = data.enrollmentList;
			semesterEnrollmentList = data.semesterEnrollmentList;
			repetitionList = data.repetitionList;
			classCountList = data.classCountList;
			
			var next_date = courseGroupInfo.next_semester_date;
			
			var all_total_count = 0;
			var all_goal_count = 0;
			var all_first_count = 0;
			var all_second_count = 0;
			var all_student_count = 0;
			var all_third_count = 0;
			var all_complete_count = 0;
			
			var vHtml = "";
			//반 전체 체크
			vHtml += '<table id="example" class="table table-bordered table-td-valign-middle m-b-0" style="font-size:1rem;">';
			vHtml += '	<colgroup>	';
			vHtml += '		<col style="width:5%;" />';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:15%;" />';
			vHtml += '	</colgroup>	';
			vHtml += '	<thead>';
			vHtml += '		<tr class="bg-indigo-darker text-white">';
			vHtml += '			<th class="text-center" colspan="3">'+courseGroupInfo.name+' 전체</th>';
			vHtml += '			<th class="text-center">목표 재수강</th>';
			vHtml += '			<th class="text-center">1주차 가능성</th>';
			vHtml += '			<th class="text-center">2주차 가능성</th>';
			vHtml += '			<th class="text-center">3주차 학생조사</th>';
			vHtml += '			<th class="text-center">마지막주(설득) 조사</th>';
			vHtml += '			<th class="text-center">실제 등록</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr class="bg-grey">';
			vHtml += '			<th class="text-center" colspan="3">총인원</th>';
			vHtml += '			<th class="text-center" id="total_count_1">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="total_count_2">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="total_count_3">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="total_count_4">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="total_count_5">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="total_count_6">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr class="bg-grey">';
			vHtml += '			<th class="text-center" colspan="3">재수강 희망자</th>';
			vHtml += '			<th class="text-center" id="repetition_count_1">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_count_2">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_count_3">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_count_4">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_count_5">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_count_6">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr class="bg-grey">';
			vHtml += '			<th class="text-center" colspan="3">재수강율</th>';
			vHtml += '			<th class="text-center" id="repetition_rate_1">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_rate_2">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_rate_3">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_rate_4">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_rate_5">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="repetition_rate_6">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr class="bg-grey">';
			vHtml += '			<th class="text-center" colspan="3">재수강 "눈치"신뢰도<br>(2주차 파악 VS 실제 재수강)</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="achieve_sencond_result">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr class="bg-grey">';
			vHtml += '			<th class="text-center" colspan="3">재수강 "노력"신뢰도<br>(마지막주 "설득"후 조사 VS 실제 재수강)</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '			<th class="text-center" id="achieve_third_result">&nbsp;</th>';
			vHtml += '			<th class="text-center">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += '			<th colspan="10">&nbsp;</th>';
			vHtml += '		</tr>';			
			vHtml += '	</thead>';
			for(var i=0; i<courseList.length; i++)
			{
				var courseInfo = courseList[i];
				var course_id = courseInfo.id;
				var instructor_name = courseInfo.instructor_name;
				var manager_name = courseInfo.manager_name;

				vHtml += '	<thead>';
				vHtml += '		<tr class="bg-indigo-darker text-white">';
				vHtml += '			<th colspan="3">'+courseInfo.name+'반(담당강사 : '+instructor_name+' / 담당 매니저: '+manager_name+')</th>';
				vHtml += '			<th class="text-center">목표 재수강</th>';
				vHtml += '			<th class="text-center">1주차 가능성</th>';
				vHtml += '			<th class="text-center">2주차 가능성</th>';
				vHtml += '			<th class="text-center">3주차 학생조사</th>';
				vHtml += '			<th class="text-center">마지막주(설득) 조사</th>';
				vHtml += '			<th class="text-center">실제 등록</th>';
				vHtml += '			<th class="text-center">&nbsp;</th>';			
				vHtml += '		</tr>';
				vHtml += '		<tr>';
				vHtml += '			<th class="text-center table-grey" colspan="3">재수강률</th>';
				vHtml += '			<th class="text-center table-grey" id="goal_result_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="first_result_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="second_result_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="student_result_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="third_result_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="complete_result_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '		</tr>';
				vHtml += '		<tr>';
				vHtml += '			<th class="text-center table-grey" colspan="3">재수강 "눈치"신뢰도<br>(2주차 파악 VS 실제 재수강)</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="achieve_sencond_result_'+course_id+'">&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '		</tr>';
				vHtml += '		<tr>';
				vHtml += '			<th class="text-center table-grey" colspan="3">재수강 "노력"신뢰도<br>(마지막주 "설득"후 조사 VS 실제 재수강)</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="achieve_third_result_'+course_id+'">&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '		</tr>';
				vHtml += '	</thead>';
			}
			vHtml += '		<tr>';
			vHtml += '			<th colspan="10">&nbsp;</th>';
			vHtml += '		</tr>';				
			var array_course_result = Array();
			for(var i=0; i<courseList.length; i++)
			{
				var courseInfo = courseList[i];
				var course_id = courseInfo.id;

				vHtml += '	<thead>';
				vHtml += '		<tr class="bg-indigo-darker text-white">';
				vHtml += '			<th colspan="10">'+courseInfo.name+'반</th>';
				vHtml += '		</tr>';
				vHtml += '		<tr>';
				vHtml += '			<th class="text-center table-grey" colspan="3">재수강률</th>';
				vHtml += '			<th class="text-center table-grey" id="goal_result_sub_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="first_result_sub_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="second_result_sub_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="student_result_sub_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="third_result_sub_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="complete_result_sub_'+course_id+'" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '		</tr>';
				vHtml += '		<tr>';
				vHtml += '			<th class="text-center table-grey" colspan="3">재수강 "눈치"신뢰도<br>(2주차 파악 VS 실제 재수강)</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="achieve_sencond_result_sub_'+course_id+'">&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '		</tr>';
				vHtml += '		<tr>';
				vHtml += '			<th class="text-center table-grey" colspan="3">재수강 "노력"신뢰도<br>(마지막주 "설득"후 조사 VS 실제 재수강)</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" id="achieve_third_result_sub_'+course_id+'">&nbsp;</th>';
				vHtml += '			<th class="text-center table-grey" >&nbsp;</th>';
				vHtml += '		</tr>';
				vHtml += '		<tr>';
				vHtml += '			<th class="text-center table-active" >번호</th>';
				vHtml += '			<th class="text-center table-active" >이름</th>';
				vHtml += '			<th class="text-center table-active" >기존/신규</th>';
				vHtml += '			<th class="text-center table-success" >목표 재수강</th>';
				vHtml += '			<th class="text-center table-info" >1주차<br>재수강 가능성</th>';
				vHtml += '			<th class="text-center table-warning" >2주차<br>재수강 가능성</th>';
				vHtml += '			<th class="text-center table-primary" >3주차<br>재수강 학생조사</th>';
				vHtml += '			<th class="text-center table-primary" >마지막주(설득)<br>재수강 조사</th>';
				vHtml += '			<th class="text-center table-danger" >실제 등록</th>';
				vHtml += '			<th class="text-center table-danger" >사유(돌아올 날짜 필수 기재)</th>';
				vHtml += '		</tr>';
				vHtml += '	</thead>';
				vHtml += '	<tbody>';
				
				vSeq = 1;
				var course_total_count = 0;
				var course_goal_count = 0;
				var course_first_count = 0;
				var course_second_count = 0;
				var course_student_count = 0;
				var course_third_count = 0;
				var course_complete_count = 0;
				
				for(var j=0; j<enrollmentList.length; j++)
				{
					if(enrollmentList[j].course_id != course_id) continue;
					var course_enrollment_id = enrollmentList[j].course_enrollment_id;
					var user_id              = enrollmentList[j].user_id;
					var end_date             = enrollmentList[j].end_date;
					var memoirs_yn           = enrollmentList[j].memoirs_yn;
					var student_name         = enrollmentList[j].last_name+enrollmentList[j].first_name;
					var v_attend_date        = cfmNvl1(enrollmentList[j].attend_date);
					var a_idx = repetitionList.findIndex(t => t.course_enrollment_id == course_enrollment_id);
					vHtml += '<tr>';
					vHtml += create_student_info_achieve(enrollmentList[j], courseInfo, classCountList);
					if(enrollmentList[j].status != 'PAID'){
						vHtml += '			<td class="text-center bg-black-transparent-5">&nbsp;</td>';
						vHtml += '			<td class="text-center bg-black-transparent-5">&nbsp;</td>';
						vHtml += '			<td class="text-center bg-black-transparent-5">&nbsp;</td>';
						vHtml += '			<td class="text-center bg-black-transparent-5">&nbsp;</td>';
						vHtml += '			<td class="text-center bg-black-transparent-5">&nbsp;</td>';
						vHtml += '			<td class="text-center bg-black-transparent-5">&nbsp;</td>';
						if(a_idx >= 0){
							if(repetitionList[a_idx].unregistered_reason){
								vHtml += '			<td class="text-center bg-black-transparent-5">'+repetitionList[a_idx].unregistered_reason+'</td>';
							}else{
								vHtml += '			<td class="text-center bg-black-transparent-5">&nbsp;</td>';
							}
						}else{
							vHtml += '			<td class="text-center bg-black-transparent-5">&nbsp;</td>';
						}
						if(enrollmentList[j].refund_status != 'FULL_REFUND'){
							if(memoirs_yn != "Y"){
								course_total_count++;
								all_total_count++;
							}
						}
						continue;
					}
					
					course_total_count++;
					all_total_count++;
					
					var attend_date = "";
					
					var first_repetition_result = "";
					var first_repetition_result_name = "";
					var first_repetition_result_date = "";
					var first_repetition_advise = "";
					var first_repetition_advise_name = "";
					var first_repetition_advise_date = "";

					var second_repetition_result = "";
					var second_repetition_result_name = "";
					var second_repetition_result_date = "";
					var second_repetition_advise = "";
					var second_repetition_advise_name = "";
					var second_repetition_advise_date = "";
					
					var third_student_repetition_result = "";
					var third_student_repetition_result_desc = "";
					var third_student_repetition_reason = "";
					var third_student_repetition_reason_desc = "";
					var third_student_repetition_course = "";
					var third_student_repetition_due_date = "";
					var third_student_repetition_date = "";

					var third_repetition_result = "";
					var third_repetition_result_name = "";
					var third_repetition_result_date = "";
					var third_repetition_advise = "";
					var third_repetition_advise_name = "";
					var third_repetition_advise_date = "";
					var unregistered_reason = "";
					var unregistered_reason_name = "";
					var unregistered_reason_date = "";
					
					var complete_repetition_result = "";
					
					
					if(a_idx >= 0){
						
						attend_date                     = repetitionList[a_idx].attend_date;
						
						goal_repetition_advise          = repetitionList[a_idx].goal_repetition_advise;
						goal_repetition_advise_name     = repetitionList[a_idx].goal_repetition_advise_name;
						goal_repetition_advise_date     = repetitionList[a_idx].goal_repetition_advise_date;
						first_repetition_result         = repetitionList[a_idx].first_repetition_result;
						first_repetition_result_name    = repetitionList[a_idx].first_repetition_result_name;
						first_repetition_result_date    = repetitionList[a_idx].first_repetition_result_date;
						first_repetition_advise        = repetitionList[a_idx].first_repetition_advise;
						first_repetition_advise_name   = repetitionList[a_idx].first_repetition_advise_name;
						first_repetition_advise_date   = repetitionList[a_idx].first_repetition_advise_date;
						second_repetition_result        = repetitionList[a_idx].second_repetition_result;
						second_repetition_result_name   = repetitionList[a_idx].second_repetition_result_name;
						second_repetition_result_date   = repetitionList[a_idx].second_repetition_result_date;
						second_repetition_advise        = repetitionList[a_idx].second_repetition_advise;
						second_repetition_advise_name   = repetitionList[a_idx].second_repetition_advise_name;
						second_repetition_advise_date   = repetitionList[a_idx].second_repetition_advise_date;

						third_student_repetition_result = repetitionList[a_idx].third_student_repetition_result;
						third_student_repetition_result_desc = repetitionList[a_idx].third_student_repetition_result_desc;
						third_student_repetition_reason = repetitionList[a_idx].third_student_repetition_reason;
						third_student_repetition_reason_desc = repetitionList[a_idx].third_student_repetition_reason_desc;
						third_student_repetition_course = repetitionList[a_idx].third_student_repetition_course;
						third_student_repetition_due_date = repetitionList[a_idx].third_student_repetition_due_date;
						third_student_repetition_date = repetitionList[a_idx].third_student_repetition_date;
						
						third_repetition_result         = repetitionList[a_idx].third_repetition_result;
						third_repetition_result_name    = repetitionList[a_idx].third_repetition_result_name;
						third_repetition_result_date    = repetitionList[a_idx].third_repetition_result_date;
						third_repetition_advise         = repetitionList[a_idx].third_repetition_advise;
						third_repetition_advise_name    = repetitionList[a_idx].third_repetition_advise_name;
						third_repetition_advise_date    = repetitionList[a_idx].third_repetition_advise_date;
						unregistered_reason             = repetitionList[a_idx].unregistered_reason;
						unregistered_reason_name        = repetitionList[a_idx].unregistered_reason_name;
						unregistered_reason_date        = repetitionList[a_idx].unregistered_reason_date;
						complete_repetition_result      = "N";
						var c_idx = semesterEnrollmentList.findIndex(t => t.user_id == user_id && t.start_date > end_date);
						if(c_idx >= 0) complete_repetition_result      = "Y";
						//complete_repetition_result      = repetitionList[a_idx].complete_repetition_result;
					}
					
					var t_attend_date = "";
					if(attend_date){
						t_attend_date = attend_date;
					}else{
						if(v_attend_date){
							t_attend_date = v_attend_date;
						}
					}
					
					var v_value = "";
					var v_class = "";
					var v_totle_tip = "";
					if(goal_repetition_advise){
						v_tool_tip = 'title="'+goal_repetition_advise+'"';
					}
					
					if(t_attend_date){
						var t_attend_month = t_attend_date.substring(0,7);
						if(next_date <= t_attend_month)
						{
							all_goal_count++;
							course_goal_count++;
							v_value = "<h4 "+v_totle_tip+">O</h4>";
							v_class = "bg-green-lighter";
						}else{
							v_value = "<h4 "+v_totle_tip+">X</h4>";
							v_class = "bg-red-lighter";
						}
					}else{
						v_value = "<h4>X</h4>";
						v_class = "bg-red-lighter";
					}
					
					vHtml += '			<td class="text-center '+v_class+'">'+v_value+'</td>';
					
					if(first_repetition_result)
					{
						var v_value = "";
						var v_class = "";
						var v_totle_tip = "";
						if(first_repetition_advise){
							v_totle_tip = 'title="'+first_repetition_advise+'"';
						}
						if(first_repetition_result == "Y"){
							course_first_count++;
							all_first_count++;
							v_value = "<h4 "+v_totle_tip+">O(등록)</h4>";
							v_class = "bg-green-lighter";
						}else if(first_repetition_result == "Q"){
							v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
							v_class = "bg-yellow-lighter";
						}else if(first_repetition_result == "N"){
							v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
							v_class = "bg-red-lighter";
						}
						vHtml += '			<td class="text-center '+v_class+'">'+v_value+'</td>';
					}else{
						vHtml += '			<td class="text-center">&nbsp;</td>';
					}

					
					if(second_repetition_result)
					{
						var v_value = "";
						var v_class = "";
						var v_totle_tip = "";
						if(second_repetition_advise){
							v_totle_tip = 'title="'+second_repetition_advise+'"';
						}
						if(second_repetition_result == "Y"){
							course_second_count++;
							all_second_count++;
							v_value = "<h4 "+v_totle_tip+">O(등록)</h4>";
							v_class = "bg-green-lighter";
						}else if(second_repetition_result == "Q"){
							v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
							v_class = "bg-yellow-lighter";
						}else if(second_repetition_result == "N"){
							v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
							v_class = "bg-red-lighter";
						}
						vHtml += '			<td class="text-center '+v_class+'">'+v_value+'</td>';
					}else{
						vHtml += '			<td class="text-center">&nbsp;</td>';
					}
					
					if(third_student_repetition_result)
					{
						var v_value = "";
						var v_class = "";
						if(third_student_repetition_result == "Y"){
							course_student_count++;
							all_student_count++;
							v_value = "<h4>O("+third_student_repetition_result_desc+")</h4>";
							v_class = "bg-green-lighter";
						}else if(third_student_repetition_result == "Q"){
							v_value = "<h4>△("+third_student_repetition_result_desc+")</h4>";
							v_class = "bg-yellow-lighter";
						}else if(third_student_repetition_result == "N"){
							v_value = "<h4>X("+third_student_repetition_result_desc+")</h4>";
							v_class = "bg-red-lighter";
						}
						if(third_student_repetition_due_date){
							v_value += "<p>"+third_student_repetition_due_date+"</p>";
						}
						if(third_student_repetition_course){
							v_value += "<p>"+third_student_repetition_course+"</p>";
						}
						if(third_student_repetition_reason_desc){
							if(third_student_repetition_reason){
								v_value += "<p>"+third_student_repetition_reason+": "+third_student_repetition_reason_desc+"</p>";
							}else{
								v_value += "<p>"+third_student_repetition_reason_desc+"</p>";
							}
							
						}
						vHtml += '			<td class="text-center '+v_class+'">'+v_value;
						vHtml += '<p class="text-right">'+third_student_repetition_date+'</p>';
						vHtml += '</td>';
					}else{
						vHtml += '			<td class="text-center">&nbsp;</td>';
					}
					
					if(third_repetition_result)
					{
						var v_value = "";
						var v_class = "";
						var v_tool_tip = "";
						if(third_repetition_advise){
							v_totle_tip = 'title="'+third_repetition_advise+'"';
						}
						if(third_repetition_result == "Y"){
							course_third_count++;
							all_third_count++;
							v_value = "<h4 "+v_totle_tip+">O(등록)</h4>";
							v_class = "bg-green-lighter";
						}else if(third_repetition_result == "Q"){
							v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
							v_class = "bg-yellow-lighter";
						}else if(third_repetition_result == "N"){
							v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
							v_class = "bg-red-lighter";
						}
						vHtml += '			<td class="text-center '+v_class+'">'+v_value + '</td>';
					}else{
						vHtml += '			<td class="text-center">&nbsp;</td>';
					}
					
					
					if(complete_repetition_result){
						var v_value = "";
						var v_class = "";
						if(complete_repetition_result == "Y"){
							course_complete_count++;
							all_complete_count++;
							v_value = "<h4>O(등록)</h4>";
							v_class = "bg-green-lighter";
						}else{
							if(memoirs_yn == "Y"){
								course_complete_count++;
								all_complete_count++;
								v_value = "<h4>O(수기작성)</h4>";
								v_class = "bg-green-lighter";
							}else{
								v_value = "<h4>X(미등록)</h4>";
								v_class = "bg-red-lighter";
							}
						}
						vHtml += '			<td class="text-center '+v_class+'">'+v_value+'</td>';
					}else{
						vHtml += '			<td>&nbsp;</td>';
					}
					
					
					if(unregistered_reason)
					{
						vHtml += '			<td style="width:150px;">';
						vHtml += unregistered_reason+'<br>';
						vHtml += '</td>';
					}else{
						vHtml += '			<td style="width:150px;">&nbsp;</td>';
					}
					vHtml += '</tr>';
				}
				
				vHtml += '	</tbody>';
				
				var objCourseResult = Object();
				objCourseResult.course_id = course_id;
				objCourseResult.course_total_count    = course_total_count;
				objCourseResult.course_goal_count     = course_goal_count;
				objCourseResult.course_first_count    = course_first_count;
				objCourseResult.course_second_count   = course_second_count;
				objCourseResult.course_student_count  = course_student_count;
				objCourseResult.course_third_count    = course_third_count;
				objCourseResult.course_complete_count = course_complete_count;
				
				array_course_result.push(objCourseResult);
			}
			vHtml += '</table>';
			$("#table_info").html(vHtml);
			$("#example").tooltip();
			
			for(var i=0; i<array_course_result.length; i++)
			{
				var v_course_id             = array_course_result[i].course_id;
				var v_course_total_count    = array_course_result[i].course_total_count;
				var v_course_goal_count     = array_course_result[i].course_goal_count;
				var v_course_first_count    = array_course_result[i].course_first_count;
				var v_course_second_count   = array_course_result[i].course_second_count;
				var v_course_student_count  = array_course_result[i].course_student_count;
				var v_course_third_count    = array_course_result[i].course_third_count;
				var v_course_complete_count = array_course_result[i].course_complete_count;
				
				var v_course_goal_rate     = 0;
				var v_course_first_rate     = 0;
				var v_course_second_rate    = 0;
				var v_course_student_rate   = 0;
				var v_course_third_rate     = 0;
				var v_course_complete_rate  = 0;
				
				var v_achieve_sencond_rate  = 0;
				var v_achieve_third_rate    = 0;
				
				if(v_course_total_count > 0){
					v_course_goal_rate     = Math.round(v_course_goal_count/v_course_total_count*100);
					v_course_first_rate    = Math.round(v_course_first_count/v_course_total_count*100);
					v_course_second_rate   = Math.round(v_course_second_count/v_course_total_count*100);
					v_course_student_rate  = Math.round(v_course_student_count/v_course_total_count*100);
					v_course_third_rate    = Math.round(v_course_third_count/v_course_total_count*100);
					v_course_complete_rate = Math.round(v_course_complete_count/v_course_total_count*100);
				}
				
				if(v_course_second_count > 0){
					v_achieve_sencond_rate    = Math.round(v_course_complete_count/v_course_second_count*100);
				}
				
				if(v_course_third_count > 0){
					v_achieve_third_rate      = Math.round(v_course_complete_count/v_course_third_count*100);
				}

				$("#goal_result_"+v_course_id).html(v_course_goal_rate+"%("+v_course_goal_count+"/"+v_course_total_count+")");
				$("#first_result_"+v_course_id).html(v_course_first_rate+"%("+v_course_first_count+"/"+v_course_total_count+")");
				$("#second_result_"+v_course_id).html(v_course_second_rate+"%("+v_course_second_count+"/"+v_course_total_count+")");
				$("#student_result_"+v_course_id).html(v_course_student_rate+"%("+v_course_student_count+"/"+v_course_total_count+")");
				$("#third_result_"+v_course_id).html(v_course_third_rate+"%("+v_course_third_count+"/"+v_course_total_count+")");
				$("#complete_result_"+v_course_id).html(v_course_complete_rate+"%("+v_course_complete_count+"/"+v_course_total_count+")");
				$("#achieve_sencond_result_"+v_course_id).html(v_achieve_sencond_rate+"%("+v_course_complete_count+"/"+v_course_second_count+")");
				$("#achieve_third_result_"+v_course_id).html(v_achieve_third_rate+"%("+v_course_complete_count+"/"+v_course_third_count+")");
				
				$("#goal_result_sub_"+v_course_id).html(v_course_goal_rate+"%("+v_course_goal_count+"/"+v_course_total_count+")");
				$("#first_result_sub_"+v_course_id).html(v_course_first_rate+"%("+v_course_first_count+"/"+v_course_total_count+")");
				$("#second_result_sub_"+v_course_id).html(v_course_second_rate+"%("+v_course_second_count+"/"+v_course_total_count+")");
				$("#student_result_sub_"+v_course_id).html(v_course_student_rate+"%("+v_course_student_count+"/"+v_course_total_count+")");
				$("#third_result_sub_"+v_course_id).html(v_course_third_rate+"%("+v_course_third_count+"/"+v_course_total_count+")");
				$("#complete_result_sub_"+v_course_id).html(v_course_complete_rate+"%("+v_course_complete_count+"/"+v_course_total_count+")");
				$("#achieve_sencond_result_sub_"+v_course_id).html(v_achieve_sencond_rate+"%("+v_course_complete_count+"/"+v_course_second_count+")");
				$("#achieve_third_result_sub_"+v_course_id).html(v_achieve_third_rate+"%("+v_course_complete_count+"/"+v_course_third_count+")");
				
			}
			
			$("#total_count_1").html(all_total_count);
			$("#total_count_2").html(all_total_count);
			$("#total_count_3").html(all_total_count);
			$("#total_count_4").html(all_total_count);
			$("#total_count_5").html(all_total_count);
			$("#total_count_6").html(all_total_count);

			$("#repetition_count_1").html(all_goal_count);
			$("#repetition_count_2").html(all_first_count);
			$("#repetition_count_3").html(all_second_count);
			$("#repetition_count_4").html(all_student_count);
			$("#repetition_count_5").html(all_third_count);
			$("#repetition_count_6").html(all_complete_count);

			var v_total_goal_rate      = 0;
			var v_total_first_rate     = 0;
			var v_total_second_rate    = 0;
			var v_total_student_rate   = 0;
			var v_total_third_rate     = 0;
			var v_total_complete_rate  = 0;
			
			var v_total_achieve_sencond_rate  = 0;
			var v_total_achieve_third_rate    = 0;
			
			if(all_total_count > 0){
				v_total_goal_rate     = Math.round(all_goal_count/all_total_count*100);
				v_total_first_rate    = Math.round(all_first_count/all_total_count*100);
				v_total_second_rate   = Math.round(all_second_count/all_total_count*100);
				v_total_student_rate  = Math.round(all_student_count/all_total_count*100);
				v_total_third_rate    = Math.round(all_third_count/all_total_count*100);
				v_total_complete_rate = Math.round(all_complete_count/all_total_count*100);
			}
			
			if(all_second_count > 0){
				v_total_achieve_sencond_rate    = Math.round(all_complete_count/all_second_count*100);
			}
			
			if(all_third_count > 0){
				v_total_achieve_third_rate      = Math.round(all_complete_count/all_third_count*100);
			}

			$("#repetition_rate_1").html(v_total_goal_rate+"%("+all_goal_count+"/"+all_total_count+")");
			$("#repetition_rate_2").html(v_total_first_rate+"%("+all_first_count+"/"+all_total_count+")");
			$("#repetition_rate_3").html(v_total_second_rate+"%("+all_second_count+"/"+all_total_count+")");
			$("#repetition_rate_4").html(v_total_student_rate+"%("+all_student_count+"/"+all_total_count+")");
			$("#repetition_rate_5").html(v_total_third_rate+"%("+all_third_count+"/"+all_total_count+")");
			$("#repetition_rate_6").html(v_total_complete_rate+"%("+all_complete_count+"/"+all_total_count+")");
			
			$("#achieve_sencond_result").html(v_total_achieve_sencond_rate+"%("+all_complete_count+"/"+all_second_count+")");
			$("#achieve_third_result").html(v_total_achieve_third_rate+"%("+all_complete_count+"/"+all_third_count+")");
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}


function create_student_info_achieve(enrollmentInfo, courseInfo, classCountList, v_date)
{
	var course_enrollment_id = enrollmentInfo.course_enrollment_id;
	var student_id = enrollmentInfo.student_id;
	
	var nClassH = 0;
	var nClassM = 0;
	
	var student_type = courseInfo.student_type; 
	var lecture_type = courseInfo.lecture_type; 
	var difficulty = courseInfo.difficulty; 
	if(student_type == "SENIOR"){
		nClassH = senior_regular_class_list[difficulty-1][1];
		nClassM = senior_regular_class_list[difficulty-1][0];
	}else{
		if(lecture_type == "SPECIAL"){
			nClassH = junior_special_class_list[difficulty-1][1];
			nClassM = junior_special_class_list[difficulty-1][0];
		}else{
			nClassH = junior_regular_class_list[difficulty-1][1];
			nClassM = junior_regular_class_list[difficulty-1][0];
		}
	}
	
	var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
	
	var class_count = 0;
	
	if(c_idx >=0 ){
		class_count = classCountList[c_idx].class_count;	
	}
	
	var class_list = classCountList.filter(function(item, index){
		if(item.student_id == student_id && item.student_type == student_type){
			return true;
		}
	});
	
	var all_class_count = 0;
	for(var k=0; k<class_list.length; k++)
	{
		all_class_count += class_list[k].class_count;
	}
	var class_clazz = "";
	
	if(class_count > nClassH){
		class_clazz = "bg-red text-white";
	}else if(class_count > nClassM){
		class_clazz = "bg-yellow";
	}
	
	var sReg = "신규";
	if(enrollmentInfo.registration_type != "NEW"){
		sReg = "기존";
	}
	
	var sUserNm = enrollmentInfo.last_name+enrollmentInfo.first_name;
	if(enrollmentInfo.chamgang_yn == "Y"){
		sUserNm += "(참강)";
	}
	
	var vClassType = enrollmentInfo.class_gubun;
	if(vClassType != vStudentType){
		vStudentType = vClassType;
		//vSeq = 1;
	}
	if(vClassType=="반이동"){
		class_clazz = 'bg-black-transparent-3';
	}
	if(vClassType=="환불"){
		class_clazz = 'bg-black-transparent-5';
	}
	var vHtml = "";
	vHtml += '			<td class="text-center '+class_clazz+'" >'+vSeq+'</td>';
	vHtml += '			<td class="text-center '+class_clazz+'" ><a href="javascript:student_achieve(\''+enrollmentInfo.username+'\','+enrollmentInfo.course_enrollment_id+',\''+v_date+'\')">'+sUserNm+'</a></td>';
	vHtml += '			<td class="text-center '+class_clazz+'" >'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
	vSeq++;
	return vHtml;
}
