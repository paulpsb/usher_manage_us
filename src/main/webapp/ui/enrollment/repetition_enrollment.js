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
var semester_in_data;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_school_name").keydown(function(key) {
		if (key.keyCode == 13) {
			search_school_list();
		}
	});
	
	course_id = $("#course_id").val();
	var course_name = $("#course_name").val();
	
	search_semester();
	if(!course_name){
		showCourses(false);
	}else{
		form_search();
	}
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
			semester_list = data;
			var vHtml = "";
			var to_month = cfmGetToMonth();

			for(var i=0; i<data.length; i++){
				var selected = "";
				if(to_month == data[i].date) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date+"</option>";
			}
			
			$("#search_semester_id").html(vHtml);
			
			$('#search_semester_id').change(function(e){
				create_due();
				search_course_group();
			});
			create_due();
			search_course_group();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_due()
{
	var semester_name = $("#search_semester_id option:checked").text();
	semester_name = semester_name.replace(" ","");
	semester_name = semester_name.replace("년","");
	semester_name = semester_name.replace("월","");
	var n_year = parseInt(semester_name.substr(0,4));
	var n_month = parseInt(semester_name.substr(4,2))+2;
	
	var vHtml = "";
	for(var i=0; i<6; i++)
	{
		var n_mon = n_month + i;
		var n_yy = n_year;
		if(n_mon > 12){
			n_mon = n_mon-12;
			n_yy++;
		}
		var t_month     = n_yy+"-";
		var t_month_txt = n_yy+"년 ";
		if(n_mon < 10){
			t_month += "0"+n_mon;
			t_month_txt += "0"+n_mon+"월";
		}else{
			t_month += ""+n_mon;
			t_month_txt += ""+n_mon+"월";
		}
		vHtml += "<option value='"+t_month+"'>"+t_month_txt+"</option>";
	}
	$("#third_repetition_result_due").html(vHtml);
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
					vHtml += '		<a href="javascript:form_sitemap_select(\''+vTitle+'\','+arr_course[j].id+','+arr_course[j].course_group_id+','+$("#search_semester_id").val()+')"><h5>'+arr_course[j].name+'반</h5></a>';
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

function form_sitemap_select(v_title, v_course_id, v_group_id, v_semester_id)
{

	var next_semester_id = 0;
	var max_idx = semester_list.length;
	var se_idx = semester_list.findIndex(t => t.id == v_semester_id);
	if(se_idx > 0) next_semester_id = semester_list[se_idx-1].id;
	
	semester_in_data = v_semester_id+"";
	if(next_semester_id > 0) semester_in_data += ","+next_semester_id+"";
	
	course_id = v_course_id;
	//$("#select_course_name").html(v_title);
	$('#select_courses').modal("hide"); 
	//search_course(v_group_id);
	
	//location.replace("/enrollment/repetition_enrollment.do?id="+v_course_id);
	form_search();
}

function form_course_cancel()
{
	$('#select_courses').modal("hide"); 
}

var courseInfo;
var enrollmentList;
var semesterEnrollmentList;
var repetitionList;
var classCountList;
function form_search()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getRepetitionEnrollmentList.do",
		data:{
			course_id:course_id,
			semester_in_data:semester_in_data
		},
		success:function(data){
			vSeq = 1;
			courseInfo     = data.courseInfo;
			enrollmentList = data.enrollmentList;
			repetitionList = data.repetitionList;
			classCountList = data.classCountList;
			semesterEnrollmentList = data.semesterEnrollmentList;
			var next_date = courseInfo.next_semester_date;
			
			$("#course_info").html(courseInfo.course_group_name+" "+courseInfo.name+"반");
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-active" style="width:60px;">상태</th>';
			vHtml += '			<th class="text-center table-active" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-active" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-active" style="width:80px;">기존/신규</th>';
			vHtml += '			<th class="text-center table-active" style="width:80px;">최초 상중하</th>';
			vHtml += '			<th class="text-center table-active" style="width:150px;">상담자<br>코멘트</th>';
			vHtml += '			<th class="text-center table-active" style="width:120px;">보유점수</th>';
			vHtml += '			<th class="text-center table-active" style="width:120px;">역대 최고<br>배치고사 점수</th>';
			vHtml += '			<th class="text-center table-active" style="width:120px;">역대 최고<br>모의토플</th>';
			vHtml += '			<th class="text-center table-active" style="width:120px;">역대 최고<br>실제토플</th>';
			vHtml += '			<th class="text-center table-active" style="width:80px;">공부목적</th>';
			vHtml += '			<th class="text-center table-success" style="width:100px;">목표점수</th>';
			vHtml += '			<th class="text-center table-success" style="width:100px;">수기기준<br>필요기간</th>';
			vHtml += '			<th class="text-center table-success" style="width:100px;">학생기재<br>점수필요기간</th>';
			vHtml += '			<th class="text-center table-success" style="width:100px;">학생기재<br>학원수강기간</th>';
			vHtml += '			<th class="text-center table-success" style="width:100px;">목표 재수강</th>';
			vHtml += '			<th class="text-center table-success" style="width:150px;">목표 재수강 상담</th>';
			vHtml += '			<th class="text-center table-info" style="width:100px;">1주차<br>재수강 가능성</th>';
			vHtml += '			<th class="text-center table-info" style="width:150px;">1주차 상담</th>';
			vHtml += '			<th class="text-center table-warning" style="width:100px;">2주차<br>재수강 가능성</th>';
			vHtml += '			<th class="text-center table-warning" style="width:150px;">2주차 상담</th>';
			vHtml += '			<th class="text-center table-primary" style="width:100px;">3주차<br>재수강 학생조사</th>';
			vHtml += '			<th class="text-center table-primary" style="width:150px;">학생사유</th>';
			vHtml += '			<th class="text-center table-primary" style="width:100px;">마지막주(설득)<br>재수강 조사</th>';
			vHtml += '			<th class="text-center table-primary" style="width:150px;">마지막주(설득) 상담</th>';
			vHtml += '			<th class="text-center table-danger" style="width:100px;">실제 등록</th>';
			vHtml += '			<th class="text-center table-danger" style="width:150px;">사유(돌아올 날짜 필수 기재)</th>';
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			for(var i=0; i<enrollmentList.length; i++)
			{
				var course_enrollment_id = enrollmentList[i].course_enrollment_id;
				var user_id              = enrollmentList[i].user_id;
				var end_date             = enrollmentList[i].end_date;
				var memoirs_yn           = enrollmentList[i].memoirs_yn;
				var student_name         = enrollmentList[i].last_name+enrollmentList[i].first_name;
				vHtml += '<tr>';
				vHtml += create_student_info_achieve(enrollmentList[i], courseInfo, classCountList);
				//기준점수
				var student_goal_score = enrollmentList[i].student_goal_score;
				var student_goal_month = enrollmentList[i].student_goal_month;
				var course_goal_score = enrollmentList[i].course_goal_score;
				var course_goal_month = enrollmentList[i].course_goal_month;
				
				//최초 상중하
				var batch_user_level = cfmNvl1(enrollmentList[i].batch_user_level);
				var select_class="";
				var select_level="";
				if(batch_user_level)
				{
					if(batch_user_level == "H")
					{
						select_class="bg-green-lighter";
						select_level="상";
					}else if(batch_user_level == "L")
					{
						select_class="bg-red-lighter";
						select_level="하";
					}else{
						select_class="bg-yellow-lighter";
						select_level="중";
					}
					
				}
				
				//배치고사
				var batch_grammar_score1 = cfmNvl1(enrollmentList[i].batch_max_grammar_score1);
				var batch_grammar_score2 = cfmNvl1(enrollmentList[i].batch_max_grammar_score2);
				var batch_reading_score = cfmNvl1(enrollmentList[i].batch_max_reading_score);
				var batch_score = "";
				if(batch_grammar_score1){
					batch_score += "SW:"+batch_grammar_score1+"+"+batch_grammar_score2+"="+(batch_grammar_score1+batch_grammar_score2);
				}
				if(batch_reading_score){
					batch_score += ", RC:"+batch_reading_score;
				}
				
				//보유점수
				var teps_total_score  = enrollmentList[i].teps_total_score;
				var sat_total_score   = enrollmentList[i].sat_total_score;
				var toeic_total_score = enrollmentList[i].toeic_total_score;
				var ielts_total_score = enrollmentList[i].ielts_total_score;
				var ibt_total_score   = enrollmentList[i].ibt_total_score;
				var ets_total_score   = enrollmentList[i].ets_total_score;
				var pbt_total_score   = enrollmentList[i].pbt_total_score;
				var scholastic_grade  = enrollmentList[i].scholastic_grade;
				
				var uHtml = "";
				if(teps_total_score > 0){
					var vHtml1 = "";
					if(enrollmentList[i].teps_rc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "RC:"+enrollmentList[i].teps_rc_score+" ";
					}
					if(enrollmentList[i].teps_lc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "LC:"+enrollmentList[i].teps_lc_score+" ";
					}
					if(enrollmentList[i].teps_grammar_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "GRAMMAR:"+enrollmentList[i].teps_grammar_score+" ";
					}
					if(enrollmentList[i].teps_voca_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "VOCA:"+enrollmentList[i].teps_voca_score+" ";
					}
					if(vHtml1) vHtml1 += ")";
					uHtml += "TEPS <span class='text-red'>"+teps_total_score + vHtml1 +"</span><br>";
				}
				
				//아직 기준은 없음
				if(sat_total_score > 0){
					var vHtml1 = "";
					if(enrollmentList[i].sat_rc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "RC:"+enrollmentList[i].sat_rc_score+" ";
					}
					if(enrollmentList[i].sat_wr_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "WR:"+enrollmentList[i].sat_wr_score+" ";
					}
					if(enrollmentList[i].sat_math_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "MATH:"+enrollmentList[i].sat_math_score+" ";
					}
					if(vHtml1) vHtml1 += ")";
					uHtml += "SAT <span class='text-red'>"+sat_total_score + vHtml1 +"</span><br>";
				}
				
				if(toeic_total_score > 0){
					var vHtml1 = "";
					if(enrollmentList[i].toeic_rc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "RC:"+enrollmentList[i].toeic_rc_score+" ";
					}
					if(enrollmentList[i].toeic_lc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "LC:"+enrollmentList[i].toeic_lc_score+" ";
					}
					
					if(vHtml1) vHtml1 += ")";
					
					uHtml += "TOEIC <span class='text-red'>"+toeic_total_score + vHtml1 +"</span><br>";
				}

				if(ielts_total_score > 0){
					var vHtml1 = "";
					if(enrollmentList[i].ielts_rc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "RC:"+enrollmentList[i].ielts_rc_score+" ";
					}
					if(enrollmentList[i].ielts_lc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "LC:"+enrollmentList[i].ielts_lc_score+" ";
					}
					if(enrollmentList[i].ielts_sp_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "SP:"+enrollmentList[i].ielts_sp_score+" ";
					}
					if(enrollmentList[i].ielts_wr_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "WR:"+enrollmentList[i].ielts_wr_score+" ";
					}
					if(vHtml1) vHtml1 += ")";
					
					uHtml += "IELTS <span class='text-red'>"+ielts_total_score + vHtml1+"</span><br>";
				}
				
				if(ibt_total_score > 0){
					var vHtml1 = "";
					if(enrollmentList[i].ibt_rc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "RC:"+enrollmentList[i].ibt_rc_score+" ";
					}
					if(enrollmentList[i].ibt_lc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "LC:"+enrollmentList[i].ibt_lc_score+" ";
					}
					if(enrollmentList[i].ibt_sp_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "SP:"+enrollmentList[i].ibt_sp_score+" ";
					}
					if(enrollmentList[i].ibt_wr_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "WR:"+enrollmentList[i].ibt_wr_score+" ";
					}
					if(vHtml1) vHtml1 += ")";
					
					uHtml += "iBT TOEFL <span class='text-red'>"+ibt_total_score + vHtml1+"</span><br>";
				}
				
				if(ets_total_score > 0){
					var vHtml1 = "";
					if(enrollmentList[i].ets_rc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "RC:"+enrollmentList[i].ets_rc_score+" ";
					}
					if(enrollmentList[i].ets_lc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "LC:"+enrollmentList[i].ets_lc_score+" ";
					}
					if(enrollmentList[i].ets_sp_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "SP:"+enrollmentList[i].ets_sp_score+" ";
					}
					if(enrollmentList[i].ets_wr_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "WR:"+enrollmentList[i].ets_wr_score+" ";
					}
					if(vHtml1) vHtml1 += ")";
					
					uHtml += "ETS iBT 모의토플 <span class='text-red'>"+ets_total_score + vHtml1+"</span><br>";
				}
				
				if(pbt_total_score > 0){
					var vHtml1 = "";
					if(enrollmentList[i].pbt_gr_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "GR:"+enrollmentList[i].pbt_gr_score+" ";
					}
					
					if(enrollmentList[i].pbt_rc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "RC:"+enrollmentList[i].pbt_rc_score+" ";
					}
					if(enrollmentList[i].pbt_lc_score > 0)
					{
						if(!vHtml1) vHtml1 += " (";
						vHtml1 += "LC:"+enrollmentList[i].pbt_lc_score+" ";
					}

					if(vHtml1) vHtml1 += ")";
					
					uHtml += "기관/ITP/PBT TOEFL <span class='text-red'>"+pbt_total_score + vHtml1 +"</span><br>";
				}
				
				//아직 기준은 없음
				if(scholastic_grade > 0){
					uHtml += "수능 <span class='text-red'>"+scholastic_grade+"등급</h4>";
				}
				
				vHtml += '			<td class="text-center '+select_class+'" style="width:80px;">'+select_level+'</td>';
				vHtml += '			<td style="width:150px;">'+cfmNvl1(enrollmentList[i].batch_adviser_advice)+'</td>';
				vHtml += '			<td class="text-center" style="width:120px;">'+uHtml;
				vHtml += '				<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="go_user_score('+user_id+')">보유점수 수정</button></p>';
				vHtml += '			</td>';
				vHtml += '			<td class="text-center" style="width:120px;">'+batch_score;
				vHtml += '			</td>';
				vHtml += '			<td class="text-center" style="width:120px;">&nbsp;</td>';
				vHtml += '			<td class="text-center" style="width:120px;">&nbsp;</td>';
				vHtml += '			<td class="text-center" style="width:80px;">'+cfmNvl1(enrollmentList[i].purpose_detail)+'</td>';
				var v_goal_score = cfmNvl1(enrollmentList[i].goal_score);
				var v_attend_start_date = cfmNvl1(enrollmentList[i].attend_start_date);
				var v_need_date= cfmNvl1(enrollmentList[i].need_date);
				var v_attend_date= cfmNvl1(enrollmentList[i].attend_date);
				var goal_score = "";
				var goal_score_name = "";
				var goal_score_date = "";
				var attend_start_date = "";
				var attend_start_date_name = "";
				var attend_start_date_date = "";
				var need_date = "";
				var need_date_name = "";
				var need_date_date = "";
				var attend_date = "";
				var attend_date_name = "";
				var attend_date_date = "";
				var goal_repetition_advise = "";
				var goal_repetition_advise_name = "";
				var goal_repetition_advise_date = "";
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
				var third_repetition_result_due_date = "";
				var third_repetition_advise = "";
				var third_repetition_advise_name = "";
				var third_repetition_advise_date = "";
				var unregistered_reason = "";
				var unregistered_reason_name = "";
				var unregistered_reason_date = "";
				
				var complete_repetition_result = "";
				
				var a_idx = repetitionList.findIndex(t => t.course_enrollment_id == course_enrollment_id);
				if(a_idx >= 0){
					goal_score                      = repetitionList[a_idx].goal_score;
					goal_score_name                 = repetitionList[a_idx].goal_score_name;
					goal_score_date                 = repetitionList[a_idx].goal_score_date;
					attend_start_date               = repetitionList[a_idx].attend_start_date;
					attend_start_date_name          = repetitionList[a_idx].attend_start_date_name;
					attend_start_date_date          = repetitionList[a_idx].attend_start_date_date;
					need_date                       = repetitionList[a_idx].need_date;
					need_date_name                  = repetitionList[a_idx].need_date_name;
					need_date_date                  = repetitionList[a_idx].need_date_date;
					attend_date                     = repetitionList[a_idx].attend_date;
					attend_date_name                = repetitionList[a_idx].attend_date_name;
					attend_date_date                = repetitionList[a_idx].attend_date_date;
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
					third_repetition_result_due_date = repetitionList[a_idx].third_repetition_result_due_date;;
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
				
				var t_goal_score = "";
				if(goal_score){
					t_goal_score = goal_score;
				}else{
					if(v_goal_score){
						t_goal_score = v_goal_score;
					}
				}
				
				var t_attend_start_date = "";
				if(attend_start_date){
					t_attend_start_date = attend_start_date;
				}else{
					if(v_attend_start_date){
						t_attend_start_date = v_attend_start_date;
					}
				}
				
				var t_need_date = "";
				if(need_date ){
					t_need_date  = need_date ;
				}else{
					if(v_need_date ){
						t_need_date = v_need_date;
					}
				}
				
				var t_attend_date = "";
				if(attend_date){
					t_attend_date = attend_date;
				}else{
					if(v_attend_date){
						t_attend_date = v_attend_date;
					}
				}
				
				//목표점수
				vHtml += '			<td class="text-center" style="width:100px;">';
				if(t_goal_score){
					vHtml += t_goal_score+'점';
				}else{
					vHtml += '목표점수 없음';
				}
				vHtml += '<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_goal_score('+user_id+','+course_enrollment_id+', \''+student_name+'\', \''+t_goal_score+'\')">목표점수 변경</button></p>';
				if(t_attend_start_date){
					vHtml += '시작일자 : '+t_attend_start_date;
				}else{
					vHtml += '시작일자 없음';
				}
				vHtml += '<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_attend_start_date('+user_id+','+course_enrollment_id+', \''+student_name+'\', \''+t_attend_start_date+'\')">시작일자 변경</button></p>';
				vHtml += '</td>';
				
				var t_goal_month = 0;
				//점수기준
				vHtml += '			<td class="text-center" style="width:100px;">';
				if(student_goal_month > 0){
					t_goal_month = student_goal_month;
					vHtml += '<p class="text-center" style="margin:0;">보유점수기준</p>';
					vHtml += '<p class="text-center" style="margin:0;">(평균 '+student_goal_month+'개월, '+student_goal_score+'점)</p>';
					vHtml += '<p class="text-center" style="margin:0;">&nbsp;</p>';
				}
				if(course_goal_month > 0){
					if(t_goal_month > course_goal_month || t_goal_month == 0) t_goal_month = course_goal_month;
					vHtml += '<p class="text-center" style="margin:0;">현재 반 기준</p>';
					vHtml += '<p class="text-center" style="margin:0;">(평균 '+course_goal_month+'개월, '+course_goal_score+'점)</p>';
				}
				vHtml += '</td>';

				var t_class ="";
				var t_value = "";
				//점수필요기간
				if(t_need_date){
					var calcMonth = "";
					if(t_attend_start_date){
						calcMonth = cfmNvl2(cfmCalcMonth(t_attend_start_date, t_need_date),0);
						var t_1 = Math.floor(t_goal_month);
						var t_2 = Math.floor(calcMonth);
						var v_1 = t_2 - t_1;
						//if(t_goal_month > calcMonth){
						if(v_1 < 0){
							t_class="bg-red-lighter";
							t_value += v_1+'개월<br>';
						}else{
							t_class="bg-green-lighter";
							t_value += '충분<br>';
						}
						t_value += '('+t_need_date+')';
					}
					
				}else{
					t_class="bg-red-lighter";
					t_value += '필요기간 없음';
				}
				
				if(t_class=="bg-red-lighter"){
					if(goal_repetition_advise)
					{
						t_class ="bg-yellow-lighter";
					}
				}

				vHtml += '			<td class="text-center '+t_class+'" style="width:100px;">'+t_value;
				vHtml += '<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_need_date('+user_id+','+course_enrollment_id+', \''+student_name+'\', \''+t_need_date+'\')">필요기간 변경</button></p>';
				vHtml += '</td>';

				
				t_class ="";
				t_value = "";
				//학원수강기간
				if(t_attend_date){
					var calcMonth = "";
					if(t_attend_start_date){
						calcMonth = cfmNvl2(cfmCalcMonth(t_attend_start_date, t_attend_date),0);
						var t_1 = Math.floor(t_goal_month);
						var t_2 = Math.floor(calcMonth);
						var v_1 = t_2 - t_1;
						//if(t_goal_month > calcMonth){
						if(v_1 < 0){
							t_class="bg-red-lighter";
							t_value += v_1+'개월<br>';
						}else{
							t_class="bg-green-lighter";
							t_value += '충분<br>';
						}
						//t_value += calcMonth+'개월<br>';
						t_value += '('+t_attend_date+')';
					}
					
				}else{
					t_class="bg-red-lighter";
					t_value += '수강기간 없음';
				}
				if(t_class=="bg-red-lighter"){
					if(goal_repetition_advise)
					{
						t_class ="bg-yellow-lighter";
					}
				}
				vHtml += '			<td class="text-center '+t_class+'" style="width:100px;">'+t_value;
				vHtml += '<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_attend_date('+user_id+','+course_enrollment_id+', \''+student_name+'\', \''+t_attend_date+'\')">필요기간 변경</button></p>';
				vHtml += '</td>';
				
				var v_value = "";
				var v_class = "";
				if(t_attend_date){
					var t_attend_month = t_attend_date.substring(0,7);
					if(next_date <= t_attend_month)
					{
						v_value = "<h4>O</h4>";
						v_class = "bg-green-lighter";
					}else{
						v_value = "<h4>X</h4>";
						v_class = "bg-red-lighter";
					}
				}else{
					v_value = "<h4>X</h4>";
					v_class = "bg-red-lighter";
				}
				vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value+'</td>';
				
				
				//목표재수강 상담
				if(goal_repetition_advise)
				{
					vHtml += '			<td style="width:150px;">';
					vHtml += goal_repetition_advise+'<br>';
					vHtml += '<p class="text-right">'+goal_repetition_advise_name+'('+goal_repetition_advise_date+')</p>';
					vHtml += '<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'goal_repetition_advise\')">상담내역 변경</button></p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:150px;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'goal_repetition_advise\')">상담내역 변경</button></td>';
				}
				
				if(first_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					if(first_repetition_result == "Y"){
						v_value = "<h4>O(등록)</h4>";
						v_class = "bg-green-lighter";
					}else if(first_repetition_result == "Q"){
						v_value = "<h4>△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(first_repetition_result == "N"){
						v_value = "<h4>X(거절)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value;
					vHtml += '<p class="text-right">'+first_repetition_result_name+'('+first_repetition_result_date+')</p>';
					vHtml += '<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_result('+course_enrollment_id+', \''+student_name+'\', \'first_repetition_result\')">재수강 변경</button></p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_result('+course_enrollment_id+', \''+student_name+'\', \'first_repetition_result\')">재수강 변경</button></td>';
				}

				if(first_repetition_advise)
				{
					vHtml += '			<td style="width:150px;">';
					vHtml += first_repetition_advise+'<br>';
					vHtml += '<p class="text-right">'+first_repetition_advise_name+'('+first_repetition_advise_date+')</p>';
					vHtml += '<p class="text-center"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'first_repetition_advise\')">상담내역 변경</button></p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:150px;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'first_repetition_advise\')">상담내역 변경</button></td>';
				}
				
				if(second_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					if(second_repetition_result == "Y"){
						v_value = "<h4>O(등록)</h4>";
						v_class = "bg-green-lighter";
					}else if(second_repetition_result == "Q"){
						v_value = "<h4>△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(second_repetition_result == "N"){
						v_value = "<h4>X(거절)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value;
					vHtml += '<p class="text-right">'+second_repetition_result_name+'('+second_repetition_result_date+')</p>';
					vHtml += '<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_result('+course_enrollment_id+', \''+student_name+'\', \'second_repetition_result\')">재수강 변경</button></p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_result('+course_enrollment_id+', \''+student_name+'\', \'second_repetition_result\')">재수강 변경</button></td>';
				}
				
				if(second_repetition_advise)
				{
					vHtml += '			<td style="width:150px;">';
					vHtml += second_repetition_advise+'<br>';
					vHtml += '<p class="text-right">'+second_repetition_advise_name+'('+second_repetition_advise_date+')</p>';
					vHtml += '<p class="text-center"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'second_repetition_advise\')">상담내역 변경</button></p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:150px;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'second_repetition_advise\')">상담내역 변경</button></td>';
				}
				
				if(third_student_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					if(third_student_repetition_result == "Y"){
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
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value;
					vHtml += '<p class="text-right">'+third_student_repetition_date+'</p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
				}
				
				if(third_student_repetition_reason_desc){
					if(third_student_repetition_reason){
						vHtml += '			<td style="width:150px;">' + third_student_repetition_reason+": "+third_student_repetition_reason_desc+ '</td>';
					}else{
						vHtml += '			<td style="width:150px;">' + third_student_repetition_reason_desc+ '</td>';
					}
					
				}else{
					vHtml += '			<td style="width:150px;">' + cfmNvl1(third_student_repetition_reason)+ '</td>';
				}
				
				if(third_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					if(third_repetition_result == "Y"){
						v_value = "<h4>O(등록)</h4>";
						v_class = "bg-green-lighter";
					}else if(third_repetition_result == "Q"){
						v_value = "<h4>△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(third_repetition_result == "N"){
						if(third_repetition_result_due_date)
						{
							v_value = "<h4>X("+third_repetition_result_due_date+"예정)</h4>";
						}else{
							v_value = "<h4>X(거절)</h4>";
						}
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value;
					vHtml += '<p class="text-right">'+third_repetition_result_name+'('+third_repetition_result_date+')</p>';
					vHtml += '<p class="text-center" style="margin:0;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_result('+course_enrollment_id+', \''+student_name+'\', \'third_repetition_result\')">재수강 변경</button></p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_result('+course_enrollment_id+', \''+student_name+'\', \'third_repetition_result\')">재수강 변경</button></td>';
				}
				
				if(third_repetition_advise)
				{
					vHtml += '			<td style="width:150px;">';
					vHtml += third_repetition_advise+'<br>';
					vHtml += '<p class="text-right">'+third_repetition_advise_name+'('+third_repetition_advise_date+')</p>';
					vHtml += '<p class="text-center"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'third_repetition_advise\')">상담내역 변경</button></p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:150px;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'third_repetition_advise\')">상담내역 변경</button></td>';
				}
				
				if(complete_repetition_result){
					var v_value = "";
					var v_class = "";
					if(complete_repetition_result == "Y"){
						v_value = "<h4>등록</h4>";
						v_class = "bg-green-lighter";
					}else{
						if(memoirs_yn == "Y"){
							v_value = "<h4>수기작성</h4>";
							v_class = "bg-green-lighter";
						}else{
							v_value = "<h4>미등록</h4>";
							v_class = "bg-red-lighter";
						}
					}
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value+'</td>';
				}else{
					vHtml += '			<td style="width:100px;">&nbsp;</td>';
				}
				
				
				if(unregistered_reason)
				{
					vHtml += '			<td style="width:150px;">';
					vHtml += unregistered_reason+'<br>';
					vHtml += '<p class="text-right">'+unregistered_reason_name+'('+unregistered_reason_date+')</p>';
					vHtml += '<p class="text-center"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'unregistered_reason\')">사유 변경</button></p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:150px;"><button type="button" class="btn btn-default btn-xs m-r-5 m-b-5" onclick="do_advise('+course_enrollment_id+', \''+student_name+'\', \'unregistered_reason\')">사유 변경</button></td>';
				}
				vHtml += '</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#table_info").html(vHtml);
			
			
			var array_column_def = Array();
			for(var i=0; i<26; i++)
			{
				var objColumn = new Object();
				objColumn.targets = i;
				objColumn.orderData = [i];
				array_column_def.push(objColumn);
			}
			oTable = $('#example').DataTable( {
				"columnDefs": array_column_def,
		        searching: false,
		        info:false,
		        scrollY:        '60vh',
		        scrollX:        true,
		        scrollCollapse: true,
		        paging:         false,
		        fixedColumns:   {
		            leftColumns: 3
		        }
		    } );
			$("#example tbody tr td").css("padding","5px");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

var t_course_enrollment_id;
var t_user_id;
var t_type;
function do_advise(v_course_enrollment_id, v_student_name, v_type)
{
	t_course_enrollment_id = v_course_enrollment_id;
	t_type = v_type;
	$.ajax({
		type : "POST",
		url : "/enrollment/getRepetitionEnrollment.do",
		data:{
			course_enrollment_id:v_course_enrollment_id
		},
		success:function(data){
			$("#advise_student_name").html(v_student_name)
			if(v_type == "goal_repetition_advise"){
				$("#advise_title").html("목표 재수강 상담");
				$("#advise_desc").val(cfmNvl1(data.goal_repetition_advise));
			}else if(v_type == "first_repetition_advise"){
				$("#advise_title").html("1주차 재수강 상담");
				$("#advise_desc").val(cfmNvl1(data.first_repetition_advise));
			}else if(v_type == "second_repetition_advise"){
				$("#advise_title").html("2주차 재수강 상담");
				$("#advise_desc").val(cfmNvl1(data.second_repetition_advise));
			}else if(v_type == "third_repetition_advise"){
				$("#advise_title").html("3주차 재수강 상담");
				$("#advise_desc").val(cfmNvl1(data.third_repetition_advise));
			}else if(v_type == "unregistered_reason"){
				$("#advise_title").html("사유");
				$("#advise_desc").val(cfmNvl1(data.unregistered_reason));
			}
			
			$("#modal-advise").modal();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_advise()
{
	if(!$("#advise_desc").val()){
		alert($("#advise_title").html()+"을(를) 입력하세요.")
		return;
	}
	var data = Object();
	data.course_enrollment_id = t_course_enrollment_id;
	
	var url = "";
	var v_advise_desc = $("#advise_desc").val();
	if(t_type == "goal_repetition_advise"){
		url = "/enrollment/insertRepetitaionGoalRepetitionAdvise.do";
		data.goal_repetition_advise = v_advise_desc;
	}else if(t_type == "first_repetition_advise"){
		url = "/enrollment/insertRepetitaionFirstRepetitionAdvise.do";
		data.first_repetition_advise = v_advise_desc;
	}else if(t_type == "second_repetition_advise"){
		url = "/enrollment/insertRepetitaionSecondRepetitionAdvise.do";
		data.second_repetition_advise = v_advise_desc;
	}else if(t_type == "third_repetition_advise"){
		url = "/enrollment/insertRepetitaionThirdRepetitionAdvise.do";
		data.third_repetition_advise = v_advise_desc;
	}else if(t_type == "unregistered_reason"){
		url = "/enrollment/insertRepetitaionUnregisteredReason.do";
		data.unregistered_reason = v_advise_desc;
	}
	
	$.ajax({
		type : "POST",
		url : url,
		data:data,
		success:function(data){
			alert("등록하였습니다.");
			form_search();
			
			$("#modal-advise").modal("hide");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function do_result(v_course_enrollment_id, v_student_name, v_type)
{
	t_course_enrollment_id = v_course_enrollment_id;
	t_type = v_type;
	$.ajax({
		type : "POST",
		url : "/enrollment/getRepetitionEnrollment.do",
		data:{
			course_enrollment_id:v_course_enrollment_id
		},
		success:function(data){
			$("#result_student_name").html(v_student_name)
			if(v_type == "first_repetition_result"){
				$("#div_third_repetition_result_due").hide();
				$("#result_title").html("1주차 재수강 조사");
			}else if(v_type == "second_repetition_result"){
				$("#div_third_repetition_result_due").hide();
				$("#result_title").html("2주차 재수강 조사");
			}else if(v_type == "second_repetition_accept"){
				$("#div_third_repetition_result_due").hide();
				$("#result_title").html("2주차 학원 납득");
			}else if(v_type == "third_repetition_result"){
				$("#div_third_repetition_result_due").show();
				$("#result_title").html("3주차 재수강 조사");
			}
			
			$("#modal-result").modal();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_result(v_result)
{
	var data = Object();
	data.course_enrollment_id = t_course_enrollment_id;
	
	var url = "";
	
	if(t_type == "first_repetition_result"){
		data.first_repetition_result = v_result;
		url = "/enrollment/insertRepetitaionFirstRepetitionResult.do";
	}else if(t_type == "second_repetition_result"){
		data.second_repetition_result = v_result;
		url = "/enrollment/insertRepetitaionSecondRepetitionResult.do";
	}else if(t_type == "second_repetition_accept"){
		data.second_repetition_accept = v_result;
		url = "/enrollment/insertRepetitaionSecondRepetitionAccept.do";
	}else if(t_type == "third_repetition_result"){
		data.third_repetition_result = v_result;
		data.third_repetition_result_due = "";
		url = "/enrollment/insertRepetitaionThirdRepetitionResult.do";
	}
	
	$.ajax({
		type : "POST",
		url : url,
		data:data,
		success:function(data){
			alert("등록하였습니다.");
			form_search();
			
			$("#modal-result").modal("hide");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_result_due()
{
	var data = Object();
	data.course_enrollment_id = t_course_enrollment_id;
	
	var url = "/enrollment/insertRepetitaionThirdRepetitionResult.do";
	data.third_repetition_result = "N";
	data.third_repetition_result_due_date = $("#third_repetition_result_due").val();
	
	$.ajax({
		type : "POST",
		url : url,
		data:data,
		success:function(data){
			alert("등록하였습니다.");
			form_search();
			
			$("#modal-result").modal("hide");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function do_goal_score(v_user_id, v_course_enrollment_id, v_student_name, v_goal_score)
{
	t_user_id = v_user_id;
	t_course_enrollment_id = v_course_enrollment_id;
	$("#goal_score_student_name").html(v_student_name)
	if(v_goal_score){
		$("#goal_score_"+v_goal_score).prop("checked", true);
	}
	$("#modal-goal-score").modal();
}

function save_goal_score()
{
	var data = Object();
	data.user_id = t_user_id;
	data.course_enrollment_id = t_course_enrollment_id;
	data.goal_score = $('input[name="goal_score"]:checked').val();
	
	var url = "/enrollment/insertRepetitaionGoalScore.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:data,
		success:function(data){
			alert("등록하였습니다.");
			form_search();
			
			$("#modal-goal-score").modal("hide");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function do_attend_start_date(v_user_id, v_course_enrollment_id, v_student_name, v_attend_start_date)
{
	t_user_id = v_user_id;
	t_course_enrollment_id = v_course_enrollment_id;
	$("#attend_start_date_student_name").html(v_student_name)
	if(v_attend_start_date){
		$("#attend_start_date").val(v_attend_start_date);
	}
	$("#modal-attend-start-date").modal();
}

function save_attend_start_date()
{
	var data = Object();
	data.course_enrollment_id = t_course_enrollment_id;
	data.user_id = t_user_id;
	data.attend_start_date = $('#attend_start_date').val();
	var url = "/enrollment/insertRepetitaionAttendStartDate.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:data,
		success:function(data){
			alert("등록하였습니다.");
			form_search();
			
			$("#modal-attend-start-date").modal("hide");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function do_need_date(v_user_id, v_course_enrollment_id, v_student_name, v_need_date)
{
	t_user_id = v_user_id;
	t_course_enrollment_id = v_course_enrollment_id;
	$("#attend_start_date_student_name").html(v_student_name)
	if(v_need_date){
		$("#need_date").val(v_need_date);
	}
	$("#modal-need-date").modal();
}

function save_need_date()
{
	var data = Object();
	data.course_enrollment_id = t_course_enrollment_id;
	data.user_id = t_user_id;
	data.need_date = $('#need_date').val();
	
	var url = "/enrollment/insertRepetitaionNeedDate.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:data,
		success:function(data){
			alert("등록하였습니다.");
			form_search();
			
			$("#modal-need-date").modal("hide");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function do_attend_date(v_user_id, v_course_enrollment_id, v_student_name, v_attend_date)
{
	t_user_id = v_user_id;
	t_course_enrollment_id = v_course_enrollment_id;
	$("#attend_date_student_name").html(v_student_name)
	if(v_attend_date){
		$("#attend_date").val(v_attend_date);
	}
	$("#modal-attend-date").modal();
}

function save_attend_date()
{
	var data = Object();
	data.user_id = t_user_id;
	data.course_enrollment_id = t_course_enrollment_id;
	data.attend_date = $('#attend_date').val();
	
	var url = "/enrollment/insertRepetitaionAttendDate.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:data,
		success:function(data){
			alert("등록하였습니다.");
			form_search();
			
			$("#modal-attend-date").modal("hide");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

var vStudentType = "";
var vSeq = 1;
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
		vSeq = 1;
	}
	if(vClassType=="반이동"){
		class_clazz = 'bg-black-transparent-3';
	}
	if(vClassType=="환불"){
		class_clazz = 'bg-black-transparent-5';
	}
	var vHtml = "";
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+vClassType+'</td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+vSeq+'</td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_achieve(\''+enrollmentInfo.username+'\','+enrollmentInfo.course_enrollment_id+',\''+v_date+'\')">'+sUserNm+'</a></td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
	vSeq++;
	return vHtml;
}

function go_user_score(user_id)
{
	window.open('http://batch.usher.co.kr/modify/modify_user_score.do?user_id='+user_id,'modify_user_score');
	//window.open('http://127.0.0.1:8070/modify/modify_user_score.do?user_id='+user_id,'modify_user_score');
}