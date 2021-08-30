jQuery(document).ready(function(){
	form_search();
});

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getCounselingCard.do",
		data : {
			user_id : $("#counseling_user_id").val()
		},
		dataType : "json",
		success:function(data){
			var counselingInfo = data.counselingInfo;
			var enrollmentList = data.enrollmentList;
			var batchExamList = data.batchExamList;
			var toeflExamList = data.toeflExamList;
			
			create_counselling(counselingInfo);
			create_batch_exam(batchExamList);
			create_toefl_mock_exam(toeflExamList);
			create_toefl_real_exam(toeflExamList);
			create_enrollment(enrollmentList);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function create_counselling(counselingInfo)
{
	var photo = counselingInfo.photo;
	if(!photo) photo = "/assets/img/photo/no_photo.jpg";
	
	$("#user_photo").html('<img src="'+photo+'" style="width:110px;">');
	$("#student_name").html(cfmNvl1(counselingInfo.name));
	
	//학생 정보
	if(counselingInfo.gender == "MALE"){
		$("#gender").html("남");
	}else{
		$("#gender").html("여");
	}
	
	$("#birthday").html(cfmNvl1(counselingInfo.birthday));
	$("#email").html(cfmNvl1(counselingInfo.email));
	$("#birthday").html(cfmNvl1(counselingInfo.birthday));
	$("#tel_home").html(cfmNvl1(counselingInfo.tel_home_number));
	$("#tel_phone").html(cfmNvl1(counselingInfo.tel_phone_number));
	$("#tel_emergency").html(cfmNvl1(counselingInfo.tel_emergency_number));
	$("#commute_area").html(cfmNvl1(counselingInfo.commute_area1)+" "+cfmNvl1(counselingInfo.commute_area2)+" "+cfmNvl1(counselingInfo.commute_area3));
	
	
	$("#goal_score").html(cfmNvl1(counselingInfo.goal_score)+"점");
	
	//학생 시험 정보 batch_delay_min
	if(counselingInfo.batch_delay_min > 5){
		$("#batch_delay_min").html(cfmNvl1(counselingInfo.batch_delay_min)+"분 지각");
	}else{
		$("#batch_delay_min").html("지각안함");
	}
	
	$("#batch_concentration_yn").html(cfmNvl2(counselingInfo.batch_concentration_yn,"Y"));
	$("#batch_repeat_exam_yn").html(cfmNvl2(counselingInfo.batch_repeat_exam_yn,"N"));
	
	//보유점수
	var teps_total_score  = counselingInfo.teps_total_score;
	var sat_total_score   = counselingInfo.sat_total_score;
	var toeic_total_score = counselingInfo.toeic_total_score;
	var ielts_total_score = counselingInfo.ielts_total_score;
	var ibt_total_score   = counselingInfo.ibt_total_score;
	var ets_total_score   = counselingInfo.ets_total_score;
	var pbt_total_score   = counselingInfo.pbt_total_score;
	var scholastic_grade  = counselingInfo.scholastic_grade;
	
	var uHtml = "";
	if(teps_total_score > 0){
		var vHtml1 = "";
		if(counselingInfo.teps_rc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "RC:"+counselingInfo.teps_rc_score+" ";
		}
		if(counselingInfo.teps_lc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "LC:"+counselingInfo.teps_lc_score+" ";
		}
		if(counselingInfo.teps_grammar_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "GRAMMAR:"+counselingInfo.teps_grammar_score+" ";
		}
		if(counselingInfo.teps_voca_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "VOCA:"+counselingInfo.teps_voca_score+" ";
		}
		if(vHtml1) vHtml1 += ")";
		uHtml += "TEPS<br><span class='text-red'>"+teps_total_score + vHtml1 +"</span><br>";
	}
	
	//아직 기준은 없음
	if(sat_total_score > 0){
		var vHtml1 = "";
		if(counselingInfo.sat_rc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "RC:"+counselingInfo.sat_rc_score+" ";
		}
		if(counselingInfo.sat_wr_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "WR:"+counselingInfo.sat_wr_score+" ";
		}
		if(counselingInfo.sat_math_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "MATH:"+counselingInfo.sat_math_score+" ";
		}
		if(vHtml1) vHtml1 += ")";
		uHtml += "SAT<br><span class='text-red'>"+sat_total_score + vHtml1 +"</span><br>";
	}
	
	if(toeic_total_score > 0){
		var vHtml1 = "";
		if(counselingInfo.toeic_rc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "RC:"+counselingInfo.toeic_rc_score+" ";
		}
		if(counselingInfo.toeic_lc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "LC:"+counselingInfo.toeic_lc_score+" ";
		}
		
		if(vHtml1) vHtml1 += ")";
		
		uHtml += "TOEIC<br><span class='text-red'>"+toeic_total_score + vHtml1 +"</span><br>";
	}

	if(ielts_total_score > 0){
		var vHtml1 = "";
		if(counselingInfo.ielts_rc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "RC:"+counselingInfo.ielts_rc_score+" ";
		}
		if(counselingInfo.ielts_lc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "LC:"+counselingInfo.ielts_lc_score+" ";
		}
		if(counselingInfo.ielts_sp_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "SP:"+counselingInfo.ielts_sp_score+" ";
		}
		if(counselingInfo.ielts_wr_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "WR:"+counselingInfo.ielts_wr_score+" ";
		}
		if(vHtml1) vHtml1 += ")";
		
		uHtml += "IELTS<br><span class='text-red'>"+ielts_total_score + vHtml1+"</span><br>";
	}
	
	if(ibt_total_score > 0){
		var vHtml1 = "";
		if(counselingInfo.ibt_rc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "RC:"+counselingInfo.ibt_rc_score+" ";
		}
		if(counselingInfo.ibt_lc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "LC:"+counselingInfo.ibt_lc_score+" ";
		}
		if(counselingInfo.ibt_sp_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "SP:"+counselingInfo.ibt_sp_score+" ";
		}
		if(counselingInfo.ibt_wr_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "WR:"+counselingInfo.ibt_wr_score+" ";
		}
		if(vHtml1) vHtml1 += ")";
		
		uHtml += "iBT TOEFL<br><span class='text-red'>"+ibt_total_score + vHtml1+"</span><br>";
	}
	
	if(ets_total_score > 0){
		var vHtml1 = "";
		if(counselingInfo.ets_rc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "RC:"+counselingInfo.ets_rc_score+" ";
		}
		if(counselingInfo.ets_lc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "LC:"+counselingInfo.ets_lc_score+" ";
		}
		if(counselingInfo.ets_sp_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "SP:"+counselingInfo.ets_sp_score+" ";
		}
		if(counselingInfo.ets_wr_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "WR:"+counselingInfo.ets_wr_score+" ";
		}
		if(vHtml1) vHtml1 += ")";
		
		uHtml += "ETS iBT 모의토플<br><span class='text-red'>"+ets_total_score + vHtml1+"</span><br>";
	}
	
	if(pbt_total_score > 0){
		var vHtml1 = "";
		if(counselingInfo.pbt_gr_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "GR:"+counselingInfo.pbt_gr_score+" ";
		}
		
		if(counselingInfo.pbt_rc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "RC:"+counselingInfo.pbt_rc_score+" ";
		}
		if(counselingInfo.pbt_lc_score > 0)
		{
			if(!vHtml1) vHtml1 += " (";
			vHtml1 += "LC:"+counselingInfo.pbt_lc_score+" ";
		}

		if(vHtml1) vHtml1 += ")";
		
		uHtml += "기관/ITP/PBT TOEFL<br><span class='text-red'>"+pbt_total_score + vHtml1 +"</span><br>";
	}
	
	//아직 기준은 없음
	if(scholastic_grade > 0){
		uHtml += "수능<br><span class='text-red'>"+scholastic_grade+"등급</h4>";
	}
	
	$("#user_score").html(uHtml);
	
	var bHtml = "";
	if(counselingInfo.test_type == "TOEIC"){
		bHtml += '파트5 : '+counselingInfo.batch_toeic_part5_score+"<br>";
		bHtml += '파트6 : '+counselingInfo.batch_toeic_part6_score+"<br>";
		bHtml += '파트7 : '+counselingInfo.batch_toeic_part7_score+"<br>";
	}else{
		bHtml += 'SW1 : '+counselingInfo.batch_grammar_score1+"<br>";
		bHtml += 'SW2 : '+counselingInfo.batch_grammar_score2+"<br>";
		bHtml += 'SW1+2 : '+(counselingInfo.batch_grammar_score1+counselingInfo.batch_grammar_score2)+"<br>";
		bHtml += 'RC : '+counselingInfo.batch_reading_score+"<br>";
	}
	$("#batch_score").html(bHtml);
	if(counselingInfo.batch_user_courses_level < 0){
		$("#batch_user_courses").html("없음");
	}else{
		$("#batch_user_courses").html(cfmNvl1(counselingInfo.batch_user_courses)+"반");
	}
	$("#batch_courses").html(cfmNvl1(counselingInfo.batch_courses)+"반");
	$("#batch_select_courses").html(cfmNvl1(counselingInfo.batch_select_courses)+"반");
	if(counselingInfo.batch_adviser_courses){
		$("#batch_adviser_courses_1").html(cfmNvl1(counselingInfo.batch_adviser_courses));
	}else{
		$("#batch_adviser_courses_1").html("");
	}	
	
	var select_class="";
	var select_level="";
	if(counselingInfo.batch_user_level == "H")
	{
		select_class="bg-green-lighter";
		select_level="상";
	}else if(counselingInfo.batch_user_level == "L")
	{
		select_class="bg-red-lighter";
		select_level="하";
	}else{
		select_class="bg-yellow-lighter";
		select_level="중";
	}
	$("#batch_user_level").removeClass("bg-green-lighter");
	$("#batch_user_level").removeClass("bg-red-lighter");
	$("#batch_user_level").removeClass("bg-yellow-lighter");
	$("#batch_user_level").addClass(select_class);

	$("#batch_user_level").html(select_level);
	

	$("#school_foreign_gubun").html(cfmNvl1(counselingInfo.school_foreign_gubun));
	$("#school_name").html(cfmNvl1(counselingInfo.school_name));
	$("#school_major").html(cfmNvl1(counselingInfo.school_major));
	$("#school_grade").html(cfmNvl1(counselingInfo.school_grade));
	$("#school_state").html(cfmNvl1(counselingInfo.school_state));
	
	$("#army").html(cfmNvl1(counselingInfo.army));
	$("#commute_min").html(cfmNvl1(counselingInfo.commute_min));
	$("#purpose_gubun").html(cfmNvl1(counselingInfo.purpose_gubun));
	$("#purpose_detail").html(cfmNvl1(counselingInfo.purpose_detail));
	$("#need_date").html(cfmNvl1(counselingInfo.need_date));
	$("#attend_start_date").html(cfmNvl1(counselingInfo.attend_start_date));
	$("#attend_date").html(cfmNvl1(counselingInfo.attend_date));
	$("#week_point").html(cfmNvl1(counselingInfo.week_point));
	$("#foreign_country").html(cfmNvl1(counselingInfo.foreign_country));
	$("#foreign_month").html(cfmNvl1(counselingInfo.foreign_month));
	$("#out_name").html(cfmNvl1(counselingInfo.out_name));
	$("#out_course").html(cfmNvl1(counselingInfo.out_course));
	$("#out_month").html(cfmNvl1(counselingInfo.out_month));
	
	//경험
	$("#location").html(cfmNvl1(counselingInfo.location)+"<br>"+cfmNvl1(counselingInfo.keyword));
	if(counselingInfo.student_type == "JUNIOR" ){
		$("#student_will").html("학생 "+cfmNvl1(counselingInfo.student_will)+"%<br>VS<br>부모 "+cfmNvl1(counselingInfo.parent_will)+"%");
	}else{
		$("#student_will").html("");
	}
	
	$("#health_desc").html(cfmNvl1(counselingInfo.health_desc));
	$("#personal_desc").html(cfmNvl1(counselingInfo.personal_desc));
	$("#batch_user_advice").html(cfmNvl1(counselingInfo.batch_user_advice));
	
	
	//상담자 코멘트
	$("#batch_adviser_advice").html(cfmNvl1(counselingInfo.batch_adviser_advice));
	
	if(counselingInfo.batch_adviser_advice){
		$("#batch_adviser_advice_log").html(counselingInfo.batch_adviser_advice_name+"("+counselingInfo.batch_adviser_advice_date+")");
	}else{
		$("#batch_adviser_advice_log").html("");
	}
}

function create_batch_exam(batchExamList)
{
	var vHtml = '';
	if(batchExamList.length > 0)
	{
		for(var i=0; i<batchExamList.length; i++)
		{
			vHtml += '<tr>';
			vHtml += '	<td class="text-center">';
			vHtml += batchExamList[i].batch_exam_date;
			vHtml += '	</td>';
			vHtml += '	<td class="text-center">';
			vHtml += batchExamList[i].course_name;
			vHtml += '	</td>';
			if(batchExamList[i].batch_grammar_exam_yn == "Y"){
				vHtml += '	<td class="text-right">'+batchExamList[i].batch_grammar_score1+'</td>';
				vHtml += '	<td class="text-right">'+batchExamList[i].batch_grammar_score2+'</td>';
				vHtml += '	<td class="text-right">'+(batchExamList[i].batch_grammar_score1+batchExamList[i].batch_grammar_score2)+'</td>';
			}else{
				vHtml += '	<td class="text-right">&nbsp;</td>';
				vHtml += '	<td class="text-right">&nbsp;</td>';
				vHtml += '	<td class="text-right">&nbsp;</td>';
			}
			if(batchExamList[i].batch_reading_exam_yn == "Y"){
				vHtml += '	<td class="text-right">'+batchExamList[i].batch_reading_score+'</td>';
			}else{
				vHtml += '	<td class="text-right">&nbsp;</td>';
			}
			if(batchExamList[i].batch_listening_exam_yn == "Y"){
				vHtml += '	<td class="text-right">'+batchExamList[i].batch_listening_score+'</td>';
			}else{
				vHtml += '	<td class="text-right">&nbsp;</td>';
			}
			vHtml += '</tr>';
		}
		
	}else{
		vHtml = '<tr><td class="text-center" colspan="7">배치고사 내역이 없습니다.</td></tr>';
	}
	$("#batch_exam_list").html(vHtml);
	
	
}

function create_toefl_mock_exam(toeflExamList)
{
	var mockList = toeflExamList.filter(function(item, index){
		if(item.exams_toefl_type == "MOCK"){
			return true;
		}
	});
	
	var vHtml = '';
	if(mockList.length > 0)
	{
		for(var i=0; i<mockList.length; i++)
		{
			vHtml += '<tr>';
			vHtml += '	<td class="text-center">'+mockList[i].date+'</td>';
			vHtml += '	<td class="text-right">'+mockList[i].reading+'</td>';
			vHtml += '	<td class="text-right">'+mockList[i].listening+'</td>';
			vHtml += '	<td class="text-right">'+mockList[i].speaking+'</td>';
			vHtml += '	<td class="text-right">'+mockList[i].writing+'</td>';
			vHtml += '	<td class="text-right">'+mockList[i].total_score+'</td>';
			vHtml += '<tr>';
		}
		
	}else{
		vHtml = '<tr><td class="text-center" colspan="6">모의 토플 내역이 없습니다.</td></tr>';
	}
	$("#toefl_mock_exam_list").html(vHtml);
}

function create_toefl_real_exam(toeflExamList)
{
	var realList = toeflExamList.filter(function(item, index){
		if(item.exams_toefl_type == "REAL"){
			return true;
		}
	});
	
	var vHtml = '';
	if(realList.length > 0)
	{
		for(var i=0; i<realList.length; i++)
		{
			vHtml += '<tr>';
			vHtml += '	<td class="text-center">'+realList[i].date+'</td>';
			vHtml += '	<td class="text-right">'+realList[i].reading+'</td>';
			vHtml += '	<td class="text-right">'+realList[i].listening+'</td>';
			vHtml += '	<td class="text-right">'+realList[i].speaking+'</td>';
			vHtml += '	<td class="text-right">'+realList[i].writing+'</td>';
			vHtml += '	<td class="text-right">'+realList[i].total_score+'</td>';
			vHtml += '<tr>';
		}
		
	}else{
		vHtml = '<tr><td class="text-center" colspan="6">실제 토플 내역이 없습니다.</td></tr>';
	}
	$("#toefl_real_exam_list").html(vHtml);
}

function create_enrollment(enrollmentList)
{
	var vHtml = '';
	if(enrollmentList.length > 0)
	{
		for(var i=0; i<enrollmentList.length; i++)
		{
			vHtml += '<tr>';
			vHtml += '	<td class="text-center">'+enrollmentList[i].semester_name+'</td>';
			vHtml += '	<td class="text-center">';
			vHtml += enrollmentList[i].course_group_name+" "+enrollmentList[i].course_name+"<br>";
			vHtml += '<button type="button" class="btn btn-success btn-sm" onclick="go_course_achieve('+enrollmentList[i].course_id+')">반 성취표</button>&nbsp;&nbsp;';
			vHtml += '<button type="button" class="btn btn-lime btn-sm" onclick="go_course_enrollment_achieve('+enrollmentList[i].course_enrollment_id+')">개인 성취표</button>';
			vHtml += '	</td>';
			vHtml += '	<td>'+cfmNvl1(enrollmentList[i].first_repetition_advise)+'</td>';
			vHtml += '	<td>'+cfmNvl1(enrollmentList[i].second_repetition_advise)+'</td>';
			vHtml += '	<td>'+cfmNvl1(enrollmentList[i].third_repetition_advise)+'</td>';
			vHtml += '<tr>';
		}
		
	}else{
		vHtml = '<tr><td class="text-center" colspan="5">수강 내역이 없습니다.</td></tr>';
	}
	$("#enrollment_list").html(vHtml);
}

function go_course_achieve(v_course_id)
{
	window.open('/enrollment/achievement_new_action.do?orientation_code=all&&course_id='+v_course_id,'course_achievement');
}

function go_course_enrollment_achieve(v_course_enrollment_id)
{
	window.open('https://exam-us.usher.co.kr/achieve/achieve_enrollment.do?course_enrollment_id='+v_course_enrollment_id,'enrollment_achievement');
}

function go_modify()
{
	var user_id = $("#counseling_user_id").val();
	window.open('http://batch.usher.co.kr/modify/modify_user.do?user_id='+user_id,'modify_user');
}

function go_modify_score()
{
	var user_id = $("#counseling_user_id").val();
	window.open('http://batch.usher.co.kr/modify/modify_user_score.do?user_id='+user_id,'modify_user_score');
}