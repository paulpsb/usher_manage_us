var array_test1 = [
	["전반<br>모아보기"		,"NONE"	,"NONE"	,"NONE", 8]
];

var array_test2 = [
	["전반<br>모아보기"		,"NONE"	,"NONE"	,"NONE", 2],
	["토플<br>모아보기"			,"TOEFL"	,"SENIOR"	,"NONE",	3],
	["주니어 토플<br>모아보기"	,"TOEFL"	,"JUNIOR"	,"NONE",	3],
	["토익<br>모아보기"		,"TOEIC"	,"SENIOR"	,"NONE",	2]
];

var array_test3 = [
	["토플 종합반<br>&nbsp;"		,"TOEFL"	,"SENIOR"	,"REGULAR"			,1,	"종합반"],
	["토플 종합반<br>Light"			,"TOEFL"	,"SENIOR"	,"LIGHT"			,1,	"종합반 Light"],
	["토플 단과반<br>&nbsp;"		,"TOEFL"	,"SENIOR"	,"SINGLE"			,1,	"단과반"],
	["주니어 토플<br>정규 월/수/금"	,"TOEFL"	,"JUNIOR"	,"REGULAR_MON_FRI"	,1,	"정규 월/수/금"],
	["주니어 토플<br>정규 화/목"		,"TOEFL"	,"JUNIOR"	,"REGULAR_TUE_THU"	,1,	"정규 화/목"],
	["주니어 토플<br>방학특강"		,"TOEFL"	,"JUNIOR"	,"SPECIAL"			,1,	"방학특강"],
	["토익 종합반<br>&nbsp;"		,"TOEIC"	,"SENIOR"	,"REGULAR"			,1,	"종합반"],
	["토익 단과반<br>&nbsp;"		,"TOEIC"	,"SENIOR"	,"SINGLE"			,1,	"단과반"]
];

var course_groups = {
		REGULAR:{name:"종합반"},
		LIGHT:{name:"종합반<br>Light"},
		SINGLE:{name:"단과반"},
		LIGHT_RC:{name:"RC 단과반"},
		LIGHT_LC:{name:"LC 단과반"},
		REGULAR_MON_FRI:{name:"정규<br>월/수/금"},
		REGULAR_TUE_THU:{name:"정규<br>화/목"},
		SPECIAL:{name:"방학특강"}
	};

var week = [
	'일요일', 
	'월요일', 
	'화요일', 
	'수요일', 
	'목요일', 
	'금요일', 
	'토요일'
];



var sort_id = "";
var sort_asc = "";

var batch_schedule_list;
var resultList;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$(window).resize(resizeContents);
    resizeContents();
    
	$(".batch_sort").css("cursor","pointer");
	var nSeq = 1;
	
	var vHtml = "";
	/*
	vHtml += '<div class="row">';
	for(var i=0; i<array_test1.length; i++){
		vHtml += '	<div class="col-'+array_test1[i][4]+'">';
		vHtml += '		<input type="radio" class="css-input-radio-checkbox" name="search_test" id="search_test_'+nSeq+'" value="'+array_test1[i][1]+','+array_test1[i][2]+','+array_test1[i][3]+'" checked>';
		vHtml += '		<label class="css-input-radio-checkbox-label" for="search_test_'+nSeq+'">'+array_test1[i][0]+'</label>';
		vHtml += '	</div>';
		nSeq++;
	}
	vHtml += '</div>';
	*/
	vHtml += '<div class="row">';
	for(var i=0; i<array_test2.length; i++){
		var checked = "";
		if(i == 0 ) checked = "checked";
		vHtml += '	<div class="col-'+array_test2[i][4]+' ">';
		vHtml += '		<input type="radio" class="css-input-radio-checkbox" name="search_test" id="search_test_'+nSeq+'" value="'+array_test2[i][1]+','+array_test2[i][2]+','+array_test2[i][3]+'" '+checked+'>';
		vHtml += '		<label class="css-input-radio-checkbox-label" for="search_test_'+nSeq+'">'+array_test2[i][0]+'</label>';
		vHtml += '	</div>';
		nSeq++;
	}
	vHtml += '</div>';

	vHtml += '<div class="row">';
	for(var i=0; i<array_test3.length; i++){
		var offset = "";
		if(i==0) offset = "offset-2";
		vHtml += '	<div class="col-'+array_test3[i][4]+' '+offset+'">';
		vHtml += '		<input type="radio" class="css-input-radio-checkbox" name="search_test" id="search_test_'+nSeq+'" value="'+array_test3[i][1]+','+array_test3[i][2]+','+array_test3[i][3]+'">';
		vHtml += '		<label class="css-input-radio-checkbox-label" for="search_test_'+nSeq+'">'+array_test3[i][0]+'</label>';
		vHtml += '	</div>';
		nSeq++;
	}	
	
	
	vHtml += '	<div class="col-md-1" style="padding-top:5px">';
	vHtml += '		<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>';
	vHtml += '	</div>';
	vHtml += '</div>';
	
	
	$("#search_area").html(vHtml);
	
	var to_day = cfmGetToDate();
	$("#search_date").val(to_day);
	change_date();
	
	$("input[name='search_test']").click(function(){
		form_search();
	});
	
	$(".batch_sort").click(function(){
		
		var s_a = $(this).find("input[name='sort_asc']").val();

		clear_sort();
		
		if(s_a == "A"){
			$(this).find("input[name='sort_asc']").val("D");
			$(this).find(".show_new_student").html('<i class="fas fa-lg fa-fw m-r-10 fa-sort-down"></i>');
			sort_id =$(this).find("input[name='sort_id']").val();
			sort_asc ="desc";			
		}else if(s_a == "D"){
			$(this).find("input[name='sort_asc']").val("");
			$(this).find(".show_new_student").html('<i class="fas fa-lg fa-fw m-r-10 fa-sort"></i>');
			sort_id ="";
			sort_asc ="";			
		}else{
			$(this).find("input[name='sort_asc']").val("A");
			$(this).find(".show_new_student").html('<i class="fas fa-lg fa-fw m-r-10 fa-sort-up"></i>');
			sort_id =$(this).find("input[name='sort_id']").val();
			sort_asc ="asc";			
		}
		
		search_batch();
	});
	//form_search();
	search_schedule();
});

/*
 * 설명 : 화면 사이즈 변경시 문제 영역 변경
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();
	
	$("#table_data_list").height(window_size-530);

}

function search_schedule()
{
	var batch_exam_date = $("#search_date").val();
	
	$.ajax({
		type : "POST",
		url : "/batch/getBatchResultScheduleList.do",
		data : {
			date : batch_exam_date,
			course_id:0
		},
		dataType : "json",
		success:function(data){
			batch_schedule_list = data;
			var vHtml = "";
			if(data.length > 0){
				$("#btn_advice_complete").show();
				var sCount = 0;
				
				
				for(var i=0; i < data.length; i++)
				{
					if(data[i].course_id == 0)
					{
						vHtml += '<option value="'+data[i].id+'">'+data[i].start_time+' ~ '+data[i].end_time+'</option>';
						sCount++;
					}
				}
				if(sCount > 0){
					vHtml = '<option value="0">전체</option>'+vHtml;
				}else{
					vHtml += '<option value="0">Schedule이 없습니다.</option>';
				}
			}else{
				vHtml += '<option value="0">Schedule이 없습니다.</option>';
				$("#btn_advice_complete").hide();
			}
			
			$("#search_batch_schedule").html(vHtml);
			
			$("#search_batch_schedule").change(function(){
				form_search();
			});
			
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function change_date(){
	var vDate = $("#search_date").val();
	var to_day = cfmGetToDate();
	if(vDate < to_day){
		$("#btn_next").attr("disabled", false);
	}else{
		$("#btn_next").attr("disabled", true);
	}
	var sDate = cfmGetDigit(vDate);
    var yy = parseInt(sDate.substr(0, 4), 10);
    var mm = parseInt(sDate.substr(4, 2), 10);
    var dd = parseInt(sDate.substr(6, 2), 10);

    var d = new Date(yy, mm - 1, dd);
    var w = d.getDay();
    $("#select_date_text").val(yy+"년 "+parseInt(mm)+"월"+parseInt(dd)+"일,"+week[w]);
    
}

function date_prev()
{
	var v_date = cfmAddDate($("#search_date").val(), -1);
	$("#search_date").val(v_date);
	change_date();
	search_schedule();
}

function date_next()
{
	var v_date = cfmAddDate($("#search_date").val(), 1);
	$("#search_date").val(v_date);
	change_date();
	search_schedule();
}

function form_search()
{
	clear_sort();
	search_batch();
}

function clear_sort(){
	$(".batch_sort").each(function() {
		$(this).find("input[name='sort_asc']").val("");
		$(this).find(".show_new_student").html('<i class="fas fa-lg fa-fw m-r-10 fa-sort"></i>');
	});
	
	sort_id ="";
	sort_asc ="";
}
function search_batch()
{
	var sort_value = "c.name asc";
	if(sort_id){
		sort_value = sort_id+" "+sort_asc;
	}
	var batch_exam_date = $("#search_date").val();

	var search_test = $("input[name='search_test']:checked").val();
	var array_search_test = search_test.split(",");
	var test_type = array_search_test[0];
	var student_type = array_search_test[1];
	var course_group = array_search_test[2];
	var batch_schedule_id = $("#search_batch_schedule").val();
	if(test_type == "NONE") test_type = "";
	if(student_type == "NONE") student_type = "";
	if(course_group == "NONE") course_group = "";
	
	
	$.ajax({
		type : "POST",
		url : "/batch/getBatchConsultation.do",
		data : {
			batch_exam_date : batch_exam_date,
			test_type : test_type,
			student_type : student_type,
			course_group : course_group,
			batch_schedule_id:batch_schedule_id,
			sort_value:sort_value,
			course_id:0
		},
		dataType : "json",
		success:function(data){
			$("#data_list").html("");
			var vHtml = "";
			var countList= data.countList;
			resultList= data.resultList;
			
			var nSeq = 0;
			for(var i=0; i<countList.length; i++)
			{
				var test_type = countList[i].batch_finally_test_type;
				var student_type = countList[i].batch_finally_student_type;
				var course_group = countList[i].batch_finally_course_group;
				var batch_select_courses = countList[i].batch_finally_courses;
				var batch_select_count = countList[i].batch_select_count;
				var array_result = resultList.filter(function(item, index){
					if(item.batch_finally_test_type == test_type && item.batch_finally_student_type == student_type && item.batch_finally_course_group == course_group && item.batch_finally_courses == batch_select_courses){
						return true;
					}
				});
				
				for(var j=0; j<array_result.length; j++)
				{
					vHtml += '<tr>';
					if(j==0){
						if(batch_select_courses){
							batch_select_courses = cfmNvl1(test_type)+"<br>"+course_groups[course_group].name+"<br>"+batch_select_courses + "반";
						}else{
							batch_select_courses = cfmNvl1(test_type)+"<br>"+cfmNvl1(student_type)+"<br>"+"미분류";
						}
						vHtml += '<td class="text-center table-info" rowspan="'+batch_select_count+'" style="vertical-align: middle;">'+batch_select_courses+'<br>('+batch_select_count+'명)</td>';
					}
					
					vHtml += '<td class="text-center" style="vertical-align: middle;">'+array_result[j].batch_schedule_adviser_name+'</td>';
					//학생 정보
					vHtml += '<td class="text-center" style="vertical-align: middle;">'+array_result[j].name+'</td>';
					if(array_result[j].gender == "MALE"){
						vHtml += '<td class="text-center" style="vertical-align: middle;">남</td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;">여</td>';
					}
					
					var calcMonth = cfmCalcMonth(array_result[j].attend_start_date+"-01", array_result[j].attend_date+"-01") + 1;
					vHtml += '<td class="text-center" style="vertical-align: middle;">'+array_result[j].goal_score+'점</td>';
					if(array_result[j].attend_start_date){
						vHtml += '<td class="text-center" style="vertical-align: middle;">'+array_result[j].attend_start_date+'</td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;">&nbsp;</td>';

					}
					
					if(array_result[j].attend_start_date || array_result[j].attend_date){
						vHtml += '<td class="text-center" style="vertical-align: middle;"><p>'+array_result[j].attend_date+'<br>('+calcMonth+'개월)</p></td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;">&nbsp;</td>';

					}
					
					//학생 시험 정보 batch_delay_min
					if(array_result[j].batch_delay_min > 5){
						vHtml += '<td class="text-center" style="vertical-align: middle;">'+array_result[j].batch_delay_min+'분 지각</td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;">지각안함</td>';
					}			
					
					if(array_result[j].batch_concentration_yn){
						vHtml += '<td class="text-center" style="vertical-align: middle;">'+cfmNvl2(array_result[j].batch_concentration_yn,"Y")+'</td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;">&nbsp;</td>';

					}

					if(array_result[j].batch_repeat_exam_yn){
						vHtml += '<td class="text-center" style="vertical-align: middle;">'+cfmNvl2(array_result[j].batch_repeat_exam_yn,"N")+'</td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;">&nbsp;</td>';

					}

					
					//보유점수
					var teps_total_score  = array_result[j].teps_total_score;
					var sat_total_score   = array_result[j].sat_total_score;
					var toeic_total_score = array_result[j].toeic_total_score;
					var ielts_total_score = array_result[j].ielts_total_score;
					var ibt_total_score   = array_result[j].ibt_total_score;
					var ets_total_score   = array_result[j].ets_total_score;
					var pbt_total_score   = array_result[j].pbt_total_score;
					var scholastic_grade  = array_result[j].scholastic_grade;
					
					var uHtml = "";
					if(teps_total_score > 0){
						var vHtml1 = "";
						if(array_result[j].teps_rc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "RC:"+array_result[j].teps_rc_score+" ";
						}
						if(array_result[j].teps_lc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "LC:"+array_result[j].teps_lc_score+" ";
						}
						if(array_result[j].teps_grammar_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "GRAMMAR:"+array_result[j].teps_grammar_score+" ";
						}
						if(array_result[j].teps_voca_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "VOCA:"+array_result[j].teps_voca_score+" ";
						}
						if(vHtml1) vHtml1 += ")";
						uHtml += "TEPS<br><span class='text-red'>"+teps_total_score + vHtml1 +"</span><br>";
					}
					
					//아직 기준은 없음
					if(sat_total_score > 0){
						var vHtml1 = "";
						if(array_result[j].sat_rc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "RC:"+array_result[j].sat_rc_score+" ";
						}
						if(array_result[j].sat_wr_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "WR:"+array_result[j].sat_wr_score+" ";
						}
						if(array_result[j].sat_math_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "MATH:"+array_result[j].sat_math_score+" ";
						}
						if(vHtml1) vHtml1 += ")";
						uHtml += "SAT<br><span class='text-red'>"+sat_total_score + vHtml1 +"</span><br>";
					}
					
					if(toeic_total_score > 0){
						var vHtml1 = "";
						if(array_result[j].toeic_rc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "RC:"+array_result[j].toeic_rc_score+" ";
						}
						if(array_result[j].toeic_lc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "LC:"+array_result[j].toeic_lc_score+" ";
						}
						
						if(vHtml1) vHtml1 += ")";
						
						uHtml += "TOEIC<br><span class='text-red'>"+toeic_total_score + vHtml1 +"</span><br>";
					}

					if(ielts_total_score > 0){
						var vHtml1 = "";
						if(array_result[j].ielts_rc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "RC:"+array_result[j].ielts_rc_score+" ";
						}
						if(array_result[j].ielts_lc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "LC:"+array_result[j].ielts_lc_score+" ";
						}
						if(array_result[j].ielts_sp_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "SP:"+array_result[j].ielts_sp_score+" ";
						}
						if(array_result[j].ielts_wr_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "WR:"+array_result[j].ielts_wr_score+" ";
						}
						if(vHtml1) vHtml1 += ")";
						
						uHtml += "IELTS<br><span class='text-red'>"+ielts_total_score + vHtml1+"</span><br>";
					}
					
					if(ibt_total_score > 0){
						var vHtml1 = "";
						if(array_result[j].ibt_rc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "RC:"+array_result[j].ibt_rc_score+" ";
						}
						if(array_result[j].ibt_lc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "LC:"+array_result[j].ibt_lc_score+" ";
						}
						if(array_result[j].ibt_sp_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "SP:"+array_result[j].ibt_sp_score+" ";
						}
						if(array_result[j].ibt_wr_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "WR:"+array_result[j].ibt_wr_score+" ";
						}
						if(vHtml1) vHtml1 += ")";
						
						uHtml += "iBT TOEFL<br><span class='text-red'>"+ibt_total_score + vHtml1+"</span><br>";
					}
					
					if(ets_total_score > 0){
						var vHtml1 = "";
						if(array_result[j].ets_rc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "RC:"+array_result[j].ets_rc_score+" ";
						}
						if(array_result[j].ets_lc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "LC:"+array_result[j].ets_lc_score+" ";
						}
						if(array_result[j].ets_sp_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "SP:"+array_result[j].ets_sp_score+" ";
						}
						if(array_result[j].ets_wr_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "WR:"+array_result[j].ets_wr_score+" ";
						}
						if(vHtml1) vHtml1 += ")";
						
						uHtml += "ETS iBT 모의토플<br><span class='text-red'>"+ets_total_score + vHtml1+"</span><br>";
					}
					
					if(pbt_total_score > 0){
						var vHtml1 = "";
						if(array_result[j].pbt_gr_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "GR:"+array_result[j].pbt_gr_score+" ";
						}
						
						if(array_result[j].pbt_rc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "RC:"+array_result[j].pbt_rc_score+" ";
						}
						if(array_result[j].pbt_lc_score > 0)
						{
							if(!vHtml1) vHtml1 += " (";
							vHtml1 += "LC:"+array_result[j].pbt_lc_score+" ";
						}

						if(vHtml1) vHtml1 += ")";
						
						uHtml += "기관/ITP/PBT TOEFL<br><span class='text-red'>"+pbt_total_score + vHtml1 +"</span><br>";
					}
					
					//아직 기준은 없음
					if(scholastic_grade > 0){
						uHtml += "수능<br><span class='text-red'>"+scholastic_grade+"등급</h4>";
					}
					
					vHtml += '<td style="vertical-align: middle;">';
					vHtml += uHtml;
					vHtml += '</td>';

					

					if(test_type == "TOEIC")
					{
						vHtml += '<td class="text-center" style="vertical-align: middle;">';
						if(array_result[j].batch_toeic_exam_yn == "Y")
						{
							vHtml += '파트5 : '+array_result[j].batch_toeic_part5_score+"<br>";
							vHtml += '파트6 : '+array_result[j].batch_toeic_part6_score+"<br>";
							vHtml += '파트7 : '+array_result[j].batch_toeic_part7_score+"<br>";
						}
					}else{
						var batch_grammar_score1 = array_result[j].batch_grammar_score1;
						var batch_grammar_score2 = array_result[j].batch_grammar_score2;
						var batch_grammar_score  = batch_grammar_score1 + batch_grammar_score2;
						var batch_reading_score  = array_result[j].batch_reading_score;
						
						var batch_grammar_level = 0;
						var batch_reading_level = 0;
						
						if(batch_reading_score >= 35){
							batch_reading_level = 3;
						}else if(batch_reading_score >= 30){
							batch_reading_level = 2;
						}else if(batch_reading_score >= 25){
							batch_reading_level = 1;
						}
						
						if(batch_grammar_score1 >= 13 && batch_grammar_score >= 33)
						{
							if(batch_reading_level == 3){
								batch_grammar_level = 3;
							}else{
								batch_grammar_level = 2;
							}
						}else if(batch_grammar_score1 >= 10 && batch_grammar_score >= 30){
							batch_grammar_level = 1;
						}
						
						var batch_class = "";
						var batch_result = "";
						if(batch_reading_level == batch_grammar_level){
							batch_result += '<p>동일</p>';
							batch_class = "bg-green-lighter";
						}else{
							var diff;
							if(batch_reading_level > batch_grammar_level){
								diff = batch_reading_level - batch_grammar_level;
							}else{
								diff = batch_grammar_level - batch_reading_level;
							}
							batch_result += '<p>'+diff+'단계차이</p>';
							if(diff >= 2){
								batch_class = "bg-red-lighter";
							}else{
								batch_class = "bg-yellow-lighter";
							}
						}
						
						if(array_result[j].batch_grammar_exam_yn == "Y" && array_result[j].batch_reading_exam_yn == "Y")
						{
							vHtml += '<td class="text-center '+batch_class+'" style="vertical-align: middle;">';
						}else{
							vHtml += '<td class="text-center" style="vertical-align: middle;">';
						}
						if(array_result[j].batch_grammar_exam_yn == "Y")
						{
							vHtml += '<a href="javascript:open_result_grammar('+array_result[j].id+')">';
							vHtml += 'SW1 : '+array_result[j].batch_grammar_score1+"<br>";
							vHtml += 'SW2 : '+array_result[j].batch_grammar_score2+"<br>";
							vHtml += 'SW1+2 : '+batch_grammar_score+"</a><br>";
						}
						
						if(array_result[j].batch_reading_exam_yn == "Y")
						{
							vHtml += '<a href="javascript:open_result_reading('+array_result[j].id+')">';
							vHtml += 'RC : '+array_result[j].batch_reading_score+"<br>"+'</a>';
							vHtml += batch_result;
						}						
					}

					vHtml += '</td>';
					
					//학생 반배치 정보
					if(array_result[j].batch_user_courses)
					{
						if(array_result[j].batch_user_courses_level < 0){
							vHtml += '<td class="text-center" style="vertical-align: middle;">없음</td>';
						}else{
							vHtml += '<td class="text-center" style="vertical-align: middle;">'+array_result[j].batch_user_courses+'반</td>';

						}
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;"></td>';
					}
					
					if(array_result[j].batch_courses)
					{
						vHtml += '<td class="text-center" style="vertical-align: middle;">'+array_result[j].batch_courses+'반</td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;"></td>';
					}
					
					if(array_result[j].batch_select_courses)
					{
						vHtml += '<td class="text-center" style="vertical-align: middle;">'+array_result[j].batch_select_courses+'반</td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;"></td>';
					}

					
					var select_class="";
					var select_level="";
					var select_type="";
					
					if(array_result[j].batch_user_level == "H")
					{
						select_class="bg-green-lighter";
						select_level="상";
					}else if(array_result[j].batch_user_level == "L")
					{
						select_class="bg-red-lighter";
						select_level="하";
					}else{
						select_class="bg-yellow-lighter";
						select_level="중";
					}
					
					if(array_result[j].batch_select_level == "U")
					{
						select_type="높음반";
					}else if(array_result[j].batch_select_level == "D")
					{
						select_type="낮은반";
					}else{
						select_type="동일";
					}
					if(array_result[j].batch_select_courses)
					{
						vHtml += '<td class="text-center '+select_class+'" style="vertical-align: middle;">';
						vHtml += '<p>'+select_level+'</p>';
						vHtml += '<p>'+select_type+'</p>';
						vHtml += '</td>';
					}else{
						vHtml += '<td class="text-center" style="vertical-align: middle;">';
					}
					
					
					var memoirs_yn = array_result[j].memoirs_yn;
					var memoirs_class = "";
					if(memoirs_yn == "Y")
					{
						memoirs_class="bg-blue-lighter";
					}else{
						memoirs_yn = "";
					}
					
					vHtml += '<td class="text-center '+memoirs_class+'" style="vertical-align: middle;cursor:pointer;" onclick="open_memoirs(\''+array_result[j].user_id+'\',\''+array_result[j].batch_exam_date+'\')">';
					vHtml += '<p>'+memoirs_yn+'</p>';
					vHtml += '</td>';
					var reg_class = "";
					var reg_text  = "";
					if(array_result[j].batch_user_register_yn == "Y"){
						reg_class = "bg-green-lighter";
						reg_text  = "<p>당일등록</p>";
					}else if(array_result[j].batch_user_register_yn == "N"){ //거절
						reg_class = "bg-red-lighter";
						reg_text  = "<p>거절</p>";
					}else if(array_result[j].batch_user_register_yn == "S"){ //예정
						reg_class = "bg-blue-lighter";
						reg_text  = "<p>예정등록<br>("+array_result[j].batch_user_register_date+")</p>";
					}else if(array_result[j].batch_user_register_yn == "Q"){ //고민
						reg_class = "bg-yellow-lighter";
						reg_text  = "<p>고민<br>("+array_result[j].batch_user_register_date+")</p>";
					}
					vHtml += '<td class="text-center '+reg_class+'" style="vertical-align: middle;">';
					vHtml += reg_text;
					vHtml += '</td>';
					
					//상담자
					vHtml += '<td class="text-center bg-yellow-transparent-1" style="vertical-align: middle;">';
					if(array_result[j].batch_adviser_courses){
						vHtml += '<p>'+array_result[j].batch_adviser_courses+'반</p>';
					}
					if(array_result[j].batch_adviser_register_yn == "Y"){
						vHtml += '<p><a href="javascript:go_detail_advice('+array_result[j].user_id +',\''+array_result[j].batch_exam_date+'\','+nSeq+')" class="text-black-lighter"><strong>수정하기</strong></a></p>';
					}else{
						vHtml += '<p><a href="javascript:go_detail_advice('+array_result[j].user_id +',\''+array_result[j].batch_exam_date+'\','+nSeq+')" class="text-black-lighter"><strong>입력하기</strong></a></p>';
					}
					vHtml += '</td>';
					
					var adv_class = "";
					var adv_text  = "";
					
					if(array_result[j].batch_adviser_register_yn == "Y"){
						adv_class = "bg-green-lighter";
						adv_text  = "<p>당일등록</p>";
					}else if(array_result[j].batch_adviser_register_yn == "N"){ //거절
						adv_class = "bg-red-lighter";
						adv_text  = "<p>거절</p>";
					}else if(array_result[j].batch_adviser_register_yn == "S"){ //예정
						adv_class = "bg-blue-lighter";
						adv_text  = "<p>예정등록<br>("+array_result[j].batch_adviser_register_date+")</p>";
					}else if(array_result[j].batch_adviser_register_yn == "Q"){ //고민
						adv_class = "bg-yellow-lighter";
						adv_text  = "<p>고민<br>("+array_result[j].batch_adviser_register_date+")</p>";
					}

					
					vHtml += '<td class="text-center '+adv_class+'" style="vertical-align: middle;">';
					vHtml += adv_text;
					vHtml += '<p><a href="javascript:go_detail_adviser_register('+array_result[j].user_id +',\''+array_result[j].batch_exam_date+'\')" class="text-black-lighter"><strong>수정하기</strong></a></p>';
					vHtml += '</td>';
					
					//데스크
					
					var desk_class = "";
					var desk_text  = "";
					if(array_result[j].batch_desk_register_yn == "Y"){
						desk_class = "bg-green-lighter";
						desk_text  = "<p>당일등록</p>";
					}else if(array_result[j].batch_desk_register_yn == "N"){ //거절
						desk_class = "bg-red-lighter";
						desk_text  = "<p>거절</p>";
					}else if(array_result[j].batch_desk_register_yn == "S"){ //예정
						desk_class = "bg-blue-lighter";
						desk_text  = "<p>예정등록<br>("+array_result[j].batch_desk_register_date+")</p>";
					}else if(array_result[j].batch_desk_register_yn == "Q"){ //고민
						desk_class = "bg-yellow-lighter";
						desk_text  = "<p>고민<br>("+array_result[j].batch_desk_register_date+")</p>";
					}
					
					vHtml += '<td class="text-center '+desk_class+'" style="vertical-align: middle;">';
					vHtml += desk_text;
					vHtml += '<p><a href="javascript:go_detail_desk_register('+array_result[j].user_id +',\''+array_result[j].batch_exam_date+'\')" class="text-black-lighter"><strong>수정하기</strong></a></p>';
					vHtml += '</td>';
					
					desk_class = "";
					desk_text  = "";
					if(array_result[j].batch_finally_register_yn == "Y"){
						desk_class = "bg-green-lighter";
						desk_text  = "<p>등록</p>";
					}else{
						desk_class = "bg-red-lighter";
						desk_text  = "<p>"+cfmNvl1(array_result[j].batch_finally_not_register_desc)+"</p>";
					}
					/*
					vHtml += '<td class="text-center '+desk_class+'" style="vertical-align: middle;">';
					vHtml += desk_text;
					if(array_result[j].batch_finally_register_yn != "Y"){
						vHtml += '<p><a href="javascript:go_finally_not_register_desc('+array_result[j].user_id +',\''+array_result[j].batch_exam_date+'\')" class="text-black-lighter"><strong>입력하기</strong></a></p>';
					}
					vHtml += '</td>';
					*/
					vHtml += '</tr>';
					nSeq++;
				}
				
				$("#data_list").html(vHtml);
			}

			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function open_result_grammar(id){
	var url = '/batch/review/grammar_review.do?id='+id;
	var option = "scrollbars=no,toolbar=no,location=no,resizable=no,status=no,menubar=no,resizable=no,width=1024,height=750,left=0,top=0";
	window.open(url,'batchwin',option);		
}


function open_result_reading(id){
	var url = '/batch/review/rc_review.do?id='+id;
	var option = "scrollbars=no,toolbar=no,location=no,resizable=no,status=no,menubar=no,resizable=no,width=1024,height=750,left=0,top=0";
	window.open(url,'batchwin',option);			
}

var currow_seq;
function go_detail_advice(user_id, batch_exam_date, seq)
{
	currow_seq = seq;
	go_detail_advice_not_modal(true);
	/*
	$("#user_id").val(user_id);
	$("#batch_exam_date").val(batch_exam_date);
	$.ajax({
		type : "POST",
		url : "/batch/getBatchResult.do",
		data : {
			user_id : user_id,
			batch_exam_date : batch_exam_date
		},
		dataType : "json",
		success:function(data){
			var sHtml = "<option value=''>선택</option>";
			$("#batch_adviser_test_type").html(sHtml+"<option value='TOEFL'>토플</option>"+"<option value='TOEIC'>토익</option>");
			$("#batch_adviser_student_type").html(sHtml);
			$("#batch_adviser_course_group").html(sHtml);
			$("#batch_adviser_courses").html(sHtml);
			
			$("#batch_adviser_test_type").change(function(){
				change_test_type();
			});
			
			$("#batch_adviser_student_type").change(function(){
				change_student_type();
			});
			
			$("#batch_adviser_course_group").change(function(){
				change_course_group();
			});

			
			$("#student_name").html(cfmNvl1(data.name));
			
			//학생 정보
			if(data.gender == "MALE"){
				$("#gender").html("남");
			}else{
				$("#gender").html("여");
			}
			
			$("#goal_score").html(cfmNvl1(data.goal_score)+"점");
			
			//학생 시험 정보 batch_delay_min
			if(data.batch_delay_min > 5){
				$("#batch_delay_min").html(cfmNvl1(data.batch_delay_min)+"분 지각");
			}else{
				$("#batch_delay_min").html("");
			}
			
			$("#batch_concentration_yn").html(cfmNvl2(data.batch_concentration_yn,"Y"));
			$("#batch_repeat_exam_yn").html(cfmNvl2(data.batch_repeat_exam_yn,"N"));
			
			//보유점수
			var teps_total_score  = data.teps_total_score;
			var sat_total_score   = data.sat_total_score;
			var toeic_total_score = data.toeic_total_score;
			var ielts_total_score = data.ielts_total_score;
			var ibt_total_score   = data.ibt_total_score;
			var ets_total_score   = data.ets_total_score;
			var scholastic_grade  = data.scholastic_grade;
			
			var uHtml = "";
			if(teps_total_score > 0){
				uHtml += "TEPS<br><span class='text-red'>"+teps_total_score+"</span><br>";
			}
			
			//아직 기준은 없음
			if(sat_total_score > 0){
				uHtml += "SAT<br><span class='text-red'>"+sat_total_score+"</span><br>";
			}
			
			if(toeic_total_score > 0){
				uHtml += "TOEIC<br><span class='text-red'>"+toeic_total_score+"</span><br>";
			}

			if(ielts_total_score > 0){
				uHtml += "IELTS<br><span class='text-red'>"+ielts_total_score+"</span><br>";
			}
			
			if(ibt_total_score > 0){
				uHtml += "iBT TOEFL<br><span class='text-red'>"+ibt_total_score+"</span><br>";
			}
			
			if(ets_total_score > 0){
				uHtml += "ETS iBT 모의토플<br><span class='text-red'>"+ibt_total_score+"</span><br>";
			}
			
			//아직 기준은 없음
			if(scholastic_grade > 0){
				uHtml += "수능<br><span class='text-red'>"+scholastic_grade+"등급</h4>";
			}
			
			$("#user_score").html(uHtml);
			
			var bHtml = "";
			if(data.test_type == "TOEIC"){
				bHtml += '파트5 : '+data.batch_toeic_part5_score+"<br>";
				bHtml += '파트6 : '+data.batch_toeic_part6_score+"<br>";
				bHtml += '파트7 : '+data.batch_toeic_part7_score+"<br>";
			}else{
				bHtml += 'SW1 : '+data.batch_grammar_score1+"<br>";
				bHtml += 'SW2 : '+data.batch_grammar_score2+"<br>";
				bHtml += 'RC : '+data.batch_reading_score+"<br>";
			}
			$("#batch_score").html(bHtml);
			if(data.batch_user_courses_level < 0){
				$("#batch_user_courses").html("없음");
			}else{
				$("#batch_user_courses").html(cfmNvl1(data.batch_user_courses)+"반");
			}
			$("#batch_courses").html(cfmNvl1(data.batch_courses)+"반");
			$("#batch_select_courses").html(cfmNvl1(data.batch_select_courses)+"반");
			if(data.batch_adviser_courses){
				$("#batch_adviser_courses_1").html(cfmNvl1(data.batch_adviser_courses));
			}else{
				$("#batch_adviser_courses_1").html("");
			}	
			
			var select_class="";
			var select_level="";
			if(data.batch_user_level == "H")
			{
				select_class="bg-green-lighter";
				select_level="상";
			}else if(data.batch_user_level == "L")
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
			
			var school_type = "";
			var school_gubun = "";
			var school_area = "";
			var school_name = "";
			var school_grade = "";
			var school_state = "";

			if(data.school_univ_name){
				school_type = "대학교";
				school_gubun = cfmNvl1(data.school_univ_gubun);
				school_area = cfmNvl1(data.school_univ_area1)+" "+cfmNvl1(data.school_univ_area2);
				school_name = cfmNvl1(data.school_univ_name);
				school_grade = cfmNvl1(data.school_univ_grade);
				school_state = cfmNvl1(data.school_univ_state);			
			}else if(data.school_high_name){
				school_type = "고등학교";
				school_gubun = cfmNvl1(data.school_high_gubun);
				school_area = cfmNvl1(data.school_high_area1)+" "+cfmNvl1(data.school_high_area2);
				school_name = cfmNvl1(data.school_high_name);
				school_grade = cfmNvl1(data.school_high_grade);
				school_state = cfmNvl1(data.school_high_state);			
			}else{
				school_type = "중학교";
				school_gubun = cfmNvl1(data.school_mid_gubun);
				school_area = cfmNvl1(data.school_mid_area1)+" "+cfmNvl1(data.school_mid_area2);
				school_name = cfmNvl1(data.school_mid_name);
				school_grade = cfmNvl1(data.school_mid_grade);
				school_state = cfmNvl1(data.school_mid_state);			
			}

			$("#school_type").html(school_type);
			$("#school_gubun").html(school_gubun);
			$("#school_area").html(school_area);
			$("#school_name").html(school_name);
			$("#school_grade").html(school_grade);
			$("#school_state").html(school_state);
			
			$("#army").html(cfmNvl1(data.army));
			$("#commute_min").html(cfmNvl1(data.commute_min));
			$("#purpose_gubun").html(cfmNvl1(data.purpose_gubun));
			$("#purpose_detail").html(cfmNvl1(data.purpose_detail));
			$("#need_date").html(cfmNvl1(data.need_date));
			$("#attend_date").html(cfmNvl1(data.attend_date));
			$("#week_point").html(cfmNvl1(data.week_point));
			$("#foreign_country").html(cfmNvl1(data.foreign_country));
			$("#foreign_month").html(cfmNvl1(data.foreign_month));
			$("#out_name").html(cfmNvl1(data.out_name));
			$("#out_course").html(cfmNvl1(data.out_course));
			$("#out_month").html(cfmNvl1(data.out_month));
			$("#health_desc").html(cfmNvl1(data.health_desc));
			
			$("#personal_desc").html(cfmNvl1(data.personal_desc));
			$("#batch_user_advice").html(cfmNvl1(data.batch_user_advice));
			
			$("#batch_adviser_advice").val(cfmNvl1(data.batch_adviser_advice));
			$("#batch_adviser_courses").val(cfmNvl1(data.batch_adviser_courses));
			
			if(data.batch_adviser_advice){
				$("#batch_adviser_advice_log").html(data.batch_adviser_advice_name+"("+data.batch_adviser_advice_date+")");
			}else{
				$("#batch_adviser_advice_log").html("");
			}
			
			if(data.batch_adviser_courses){
				var tHtml = "";
				tHtml += data.batch_adviser_test_type+"/";
				tHtml += data.batch_adviser_student_type+"/";
				tHtml += data.batch_adviser_course_group+"/";
				tHtml += data.batch_adviser_courses+"반 (";
				tHtml += data.batch_adviser_courses_name+":";
				tHtml += data.batch_adviser_courses_date+")"
				$("#batch_adviser_courses_log").html(tHtml);
			}else{
				$("#batch_adviser_courses_log").html("");
			}

			$("#modal-advice").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	*/
}

function go_prev()
{
	if(currow_seq == 0){
		alert("첫번째 학생입니다.");
		currow_seq = resultList.length-1;
	}else{
		currow_seq--;
	}
	
	go_detail_advice_not_modal(false);
}

function go_next()
{
	if(currow_seq == (resultList.length-1)){
		alert("마지막 학생입니다.");
		currow_seq  = 0;
	}else{
		currow_seq++;
	}
	
	go_detail_advice_not_modal(false);
}
function go_detail_advice_not_modal(isModal)
{
	$("#advice_title").html("("+(currow_seq+1)+"/"+resultList.length+")");
	$("#user_id").val(resultList[currow_seq].user_id);
	$("#batch_exam_date").val(resultList[currow_seq].batch_exam_date);
	$.ajax({
		type : "POST",
		url : "/batch/getBatchResult.do",
		data : {
			user_id : resultList[currow_seq].user_id,
			batch_exam_date : resultList[currow_seq].batch_exam_date,
			course_id:0
		},
		dataType : "json",
		success:function(data){
			var sHtml = "<option value=''>선택</option>";
			$("#batch_adviser_test_type").html(sHtml+"<option value='TOEFL'>토플</option>"+"<option value='TOEIC'>토익</option>");
			//$("#batch_adviser_student_type").html(sHtml);
			//$("#batch_adviser_course_group").html(sHtml);
			//$("#batch_adviser_courses").html(sHtml);
			$("#batch_adviser_test_type").val(data.batch_finally_test_type);
			change_test_type(data.batch_finally_test_type, data.batch_finally_student_type);
			change_student_type(data.batch_finally_test_type, data.batch_finally_student_type, data.batch_finally_course_group);
			change_course_group(data.batch_finally_test_type, data.batch_finally_student_type, data.batch_finally_course_group, data.batch_finally_courses);
			
			
			$("#batch_adviser_test_type").change(function(){
				change_test_type($("#batch_adviser_test_type").val(),"");
			});
			
			$("#batch_adviser_student_type").change(function(){
				change_student_type($("#batch_adviser_test_type").val(), $("#batch_adviser_student_type").val(), "");
			});
			
			$("#batch_adviser_course_group").change(function(){
				change_course_group($("#batch_adviser_test_type").val(), $("#batch_adviser_student_type").val(), $("#batch_adviser_course_group").val(), "");
			});

			
			$("#student_name").html(cfmNvl1(data.name));
			
			//학생 정보
			if(data.gender == "MALE"){
				$("#gender").html("남");
			}else{
				$("#gender").html("여");
			}
			
			$("#birthday").html(cfmNvl1(data.birthday));
			$("#email").html(cfmNvl1(data.email));
			$("#birthday").html(cfmNvl1(data.birthday));
			$("#tel_home").html(cfmNvl1(data.tel_home_number));
			$("#tel_phone").html(cfmNvl1(data.tel_phone_number));
			$("#tel_emergency").html(cfmNvl1(data.tel_emergency_number));
			$("#commute_area").html(cfmNvl1(data.commute_area1)+" "+cfmNvl1(data.commute_area2)+" "+cfmNvl1(data.commute_area3));
			
			
			$("#goal_score").html(cfmNvl1(data.goal_score)+"점");
			
			//학생 시험 정보 batch_delay_min
			if(data.batch_delay_min > 5){
				$("#batch_delay_min").html(cfmNvl1(data.batch_delay_min)+"분 지각");
			}else{
				$("#batch_delay_min").html("지각안함");
			}
			
			$("#batch_concentration_yn").html(cfmNvl2(data.batch_concentration_yn,"Y"));
			$("#batch_repeat_exam_yn").html(cfmNvl2(data.batch_repeat_exam_yn,"N"));
			
			//보유점수
			var teps_total_score  = data.teps_total_score;
			var sat_total_score   = data.sat_total_score;
			var toeic_total_score = data.toeic_total_score;
			var ielts_total_score = data.ielts_total_score;
			var ibt_total_score   = data.ibt_total_score;
			var ets_total_score   = data.ets_total_score;
			var pbt_total_score   = data.pbt_total_score;
			var scholastic_grade  = data.scholastic_grade;
			
			var uHtml = "";
			if(teps_total_score > 0){
				var vHtml1 = "";
				if(data.teps_rc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "RC:"+data.teps_rc_score+" ";
				}
				if(data.teps_lc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "LC:"+data.teps_lc_score+" ";
				}
				if(data.teps_grammar_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "GRAMMAR:"+data.teps_grammar_score+" ";
				}
				if(data.teps_voca_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "VOCA:"+data.teps_voca_score+" ";
				}
				if(vHtml1) vHtml1 += ")";
				uHtml += "TEPS<br><span class='text-red'>"+teps_total_score + vHtml1 +"</span><br>";
			}
			
			//아직 기준은 없음
			if(sat_total_score > 0){
				var vHtml1 = "";
				if(data.sat_rc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "RC:"+data.sat_rc_score+" ";
				}
				if(data.sat_wr_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "WR:"+data.sat_wr_score+" ";
				}
				if(data.sat_math_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "MATH:"+data.sat_math_score+" ";
				}
				if(vHtml1) vHtml1 += ")";
				uHtml += "SAT<br><span class='text-red'>"+sat_total_score + vHtml1 +"</span><br>";
			}
			
			if(toeic_total_score > 0){
				var vHtml1 = "";
				if(data.toeic_rc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "RC:"+data.toeic_rc_score+" ";
				}
				if(data.toeic_lc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "LC:"+data.toeic_lc_score+" ";
				}
				
				if(vHtml1) vHtml1 += ")";
				
				uHtml += "TOEIC<br><span class='text-red'>"+toeic_total_score + vHtml1 +"</span><br>";
			}

			if(ielts_total_score > 0){
				var vHtml1 = "";
				if(data.ielts_rc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "RC:"+data.ielts_rc_score+" ";
				}
				if(data.ielts_lc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "LC:"+data.ielts_lc_score+" ";
				}
				if(data.ielts_sp_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "SP:"+data.ielts_sp_score+" ";
				}
				if(data.ielts_wr_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "WR:"+data.ielts_wr_score+" ";
				}
				if(vHtml1) vHtml1 += ")";
				
				uHtml += "IELTS<br><span class='text-red'>"+ielts_total_score + vHtml1+"</span><br>";
			}
			
			if(ibt_total_score > 0){
				var vHtml1 = "";
				if(data.ibt_rc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "RC:"+data.ibt_rc_score+" ";
				}
				if(data.ibt_lc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "LC:"+data.ibt_lc_score+" ";
				}
				if(data.ibt_sp_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "SP:"+data.ibt_sp_score+" ";
				}
				if(data.ibt_wr_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "WR:"+data.ibt_wr_score+" ";
				}
				if(vHtml1) vHtml1 += ")";
				
				uHtml += "iBT TOEFL<br><span class='text-red'>"+ibt_total_score + vHtml1+"</span><br>";
			}
			
			if(ets_total_score > 0){
				var vHtml1 = "";
				if(data.ets_rc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "RC:"+data.ets_rc_score+" ";
				}
				if(data.ets_lc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "LC:"+data.ets_lc_score+" ";
				}
				if(data.ets_sp_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "SP:"+data.ets_sp_score+" ";
				}
				if(data.ets_wr_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "WR:"+data.ets_wr_score+" ";
				}
				if(vHtml1) vHtml1 += ")";
				
				uHtml += "ETS iBT 모의토플<br><span class='text-red'>"+ets_total_score + vHtml1+"</span><br>";
			}
			
			if(pbt_total_score > 0){
				var vHtml1 = "";
				if(data.pbt_gr_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "GR:"+data.pbt_gr_score+" ";
				}
				
				if(data.pbt_rc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "RC:"+data.pbt_rc_score+" ";
				}
				if(data.pbt_lc_score > 0)
				{
					if(!vHtml1) vHtml1 += " (";
					vHtml1 += "LC:"+data.pbt_lc_score+" ";
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
			if(data.test_type == "TOEIC"){
				bHtml += '파트5 : '+data.batch_toeic_part5_score+"<br>";
				bHtml += '파트6 : '+data.batch_toeic_part6_score+"<br>";
				bHtml += '파트7 : '+data.batch_toeic_part7_score+"<br>";
			}else{
				bHtml += 'SW1 : '+data.batch_grammar_score1+"<br>";
				bHtml += 'SW2 : '+data.batch_grammar_score2+"<br>";
				bHtml += 'SW1+2 : '+(data.batch_grammar_score1+data.batch_grammar_score2)+"<br>";
				bHtml += 'RC : '+data.batch_reading_score+"<br>";
			}
			$("#batch_score").html(bHtml);
			if(data.batch_user_courses_level < 0){
				$("#batch_user_courses").html("없음");
			}else{
				$("#batch_user_courses").html(cfmNvl1(data.batch_user_courses)+"반");
			}
			$("#batch_courses").html(cfmNvl1(data.batch_courses)+"반");
			$("#batch_select_courses").html(cfmNvl1(data.batch_select_courses)+"반");
			if(data.batch_adviser_courses){
				$("#batch_adviser_courses_1").html(cfmNvl1(data.batch_adviser_courses));
			}else{
				$("#batch_adviser_courses_1").html("");
			}	
			
			var select_class="";
			var select_level="";
			if(data.batch_user_level == "H")
			{
				select_class="bg-green-lighter";
				select_level="상";
			}else if(data.batch_user_level == "L")
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
			

			$("#school_foreign_gubun").html(cfmNvl1(data.school_foreign_gubun));
			$("#school_name").html(cfmNvl1(data.school_name));
			$("#school_major").html(cfmNvl1(data.school_major));
			$("#school_grade").html(cfmNvl1(data.school_grade));
			$("#school_state").html(cfmNvl1(data.school_state));
			
			$("#army").html(cfmNvl1(data.army));
			$("#commute_min").html(cfmNvl1(data.commute_min));
			$("#purpose_gubun").html(cfmNvl1(data.purpose_gubun));
			$("#purpose_detail").html(cfmNvl1(data.purpose_detail));
			$("#need_date").html(cfmNvl1(data.need_date));
			$("#attend_start_date").html(cfmNvl1(data.attend_start_date));
			$("#attend_date").html(cfmNvl1(data.attend_date));
			$("#week_point").html(cfmNvl1(data.week_point));
			$("#foreign_country").html(cfmNvl1(data.foreign_country));
			$("#foreign_month").html(cfmNvl1(data.foreign_month));
			$("#out_name").html(cfmNvl1(data.out_name));
			$("#out_course").html(cfmNvl1(data.out_course));
			$("#out_month").html(cfmNvl1(data.out_month));
			
			//경험
			$("#location").html(cfmNvl1(data.location)+"<br>"+cfmNvl1(data.keyword));
			if(data.student_type == "JUNIOR" ){
				$("#student_will").html("학생 "+cfmNvl1(data.student_will)+"%<br>VS<br>부모 "+cfmNvl1(data.parent_will)+"%");
			}else{
				$("#student_will").html("");
			}
			
			$("#health_desc").html(cfmNvl1(data.health_desc));
			$("#personal_desc").html(cfmNvl1(data.personal_desc));
			$("#batch_user_advice").html(cfmNvl1(data.batch_user_advice));
			
			
			//상담자 코멘트
			$("#batch_adviser_advice").val(cfmNvl1(data.batch_adviser_advice));
			//$("#batch_adviser_courses").val(cfmNvl1(data.batch_adviser_courses));
			
			if(data.batch_adviser_advice){
				$("#batch_adviser_advice_log").html(data.batch_adviser_advice_name+"("+data.batch_adviser_advice_date+")");
			}else{
				$("#batch_adviser_advice_log").html("");
			}
			
			//강제 반변경
			if(data.batch_adviser_courses){
				var tHtml = "";
				tHtml += data.batch_adviser_test_type+"/";
				tHtml += data.batch_adviser_student_type+"/";
				tHtml += data.batch_adviser_course_group+"/";
				tHtml += data.batch_adviser_courses+"반 (";
				tHtml += data.batch_adviser_courses_name+":";
				tHtml += data.batch_adviser_courses_date+")"
				$("#batch_adviser_courses_log").html(tHtml);
			}else{
				$("#batch_adviser_courses_log").html("");
			}
			
			if(isModal){
				$("#modal-advice").modal();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	

}

function save_advice_schedule()
{
	$.ajax({
		type : "POST",
		url : "/batch/updateBatchScheduleAdvise.do",
		data : {
			id : $("#search_batch_schedule").val(),
			course_id:0
		},
		success:function(data){
			alert("상담완료 하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function save_advice()
{
	$.ajax({
		type : "POST",
		url : "/batch/updateBatchResultAdviserAdvice.do",
		data : {
			user_id : $("#user_id").val(),
			batch_exam_date : $("#batch_exam_date").val(),
			batch_adviser_advice : $("#batch_adviser_advice").val(),
			course_id:0
		},
		success:function(data){
			alert("상담내역을 등록하였습니다.");
			search_batch();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function save_courses()
{
	$.ajax({
		type : "POST",
		url : "/batch/updateBatchResultAdviserCourse.do",
		data : {
			user_id : $("#user_id").val(),
			batch_exam_date : $("#batch_exam_date").val(),
			batch_adviser_courses : $("#batch_adviser_courses").val(),
			batch_adviser_test_type : $("#batch_adviser_test_type").val(),
			batch_adviser_student_type : $("#batch_adviser_student_type").val(),
			batch_adviser_course_group : $("#batch_adviser_course_group").val(),
			course_id:0
		},
		success:function(data){
			alert("반배치를 변경하였습니다.");
			search_batch();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function go_detail_adviser_register(user_id, batch_exam_date)
{
	$("#user_id").val(user_id);
	$("#batch_exam_date").val(batch_exam_date);
	$.ajax({
		type : "POST",
		url : "/batch/getBatchResult.do",
		data : {
			user_id : user_id,
			batch_exam_date : batch_exam_date,
			course_id:0
		},
		dataType : "json",
		success:function(data){
			$("#adviser_student_name").html(cfmNvl1(data.name));
			
			//학생 정보
			if(data.gender == "MALE"){
				$("#adviser_gender").html("남");
			}else{
				$("#adviser_gender").html("여");
			}
			$("#adviser_goal_score").html(cfmNvl1(data.goal_score)+"점");
			$("#adviser_attend_date").html(cfmNvl1(data.attend_date));
			$("#batch_adviser_attend_start_date").val(cfmNvl1(data.attend_start_date));
			if(data.batch_adviser_courses){
				$("#adviser_batch_courses").html(cfmNvl1(data.batch_adviser_courses)+"반");
			}else{
				$("#adviser_batch_courses").html(cfmNvl1(data.batch_select_courses)+"반");
			}
			
			var vHtml = "";
			
			if(data.batch_user_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
			}else if(data.batch_user_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
			}else if(data.batch_user_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_user_register_date+")</p>";
			}else if(data.batch_user_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_user_register_date+")</p>";
			}
			$("#adviser_user_register").html(vHtml);
			
			vHtml = "";
			if(data.batch_adviser_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_adviser_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_adviser_name+"</p>";
			}else if(data.batch_adviser_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_adviser_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_adviser_name+"</p>";
			}else if(data.batch_adviser_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_adviser_register_date+")</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_adviser_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_adviser_name+"</p>";
			}else if(data.batch_adviser_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_adviser_register_date+")</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_adviser_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_adviser_name+"</p>";
			}			
			$("#adviser_adviser_register").html(vHtml);

			vHtml = "";
			if(data.batch_desk_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_desk_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_desk_name+"</p>";
			}else if(data.batch_desk_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_desk_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_desk_name+"</p>";
			}else if(data.batch_desk_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_desk_register_date+")</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_desk_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_desk_name+"</p>";
			}else if(data.batch_desk_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_desk_register_date+")</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_desk_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_desk_name+"</p>";
			}			
			$("#adviser_desk_register").html(vHtml);

			vHtml = "";
			
			if(data.batch_user_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
			}else if(data.batch_user_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
			}else if(data.batch_user_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_user_register_date+")</p>";
			}else if(data.batch_user_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_user_register_date+")</p>";
			}
			$("#adviser_user_register1").html(vHtml);
			
			$("#batch_adviser_register_yn_Y").prop("checked", false);
			$("#batch_adviser_register_yn_N").prop("checked", false);
			$("#batch_adviser_register_yn_Q").prop("checked", false);
			$("#batch_adviser_register_yn_S").prop("checked", false);
			$("#batch_adviser_register_date").hide();
			if(data.batch_adviser_register_yn){
				$("#batch_adviser_register_yn_"+data.batch_adviser_register_yn).prop("checked", true);
				$("#batch_adviser_register_date").val(data.batch_adviser_register_date);
				$("#batch_adviser_not_register_desc").val(data.batch_adviser_not_register_desc);
				if(data.batch_adviser_register_yn == "S"){
					$("#adviser_register_txt").html("학생에게 등록예정일자를 물어보고 기입해주세요.");
					$("#batch_adviser_register_date").show();
				}else if(data.batch_adviser_register_yn == "Q"){
					$("#adviser_register_txt").html("학생에게 언제까지 결정해줄실 수 있을지 물어보고 기입해주세요.");
					$("#batch_adviser_register_date").show();
				}else{
					$("#adviser_register_txt").html("&nbsp;");
					$("#batch_adviser_register_date").hide();
				}
			}else{
				$("#adviser_register_txt").html("&nbsp;");
				$("#batch_adviser_register_date").val("");
				$("#batch_adviser_not_register_desc").val("");
			}
			$("input[name='batch_adviser_register_yn']").click(function(){
				var register_yn = $("input[name='batch_adviser_register_yn']:checked").val();
				if(register_yn == "S"){
					$("#adviser_register_txt").html("학생에게 등록예정일자를 물어보고 기입해주세요.");
					$("#batch_adviser_register_date").show();
				}else if(register_yn == "Q"){
					$("#adviser_register_txt").html("학생에게 언제까지 결정해줄실 수 있을지 물어보고 기입해주세요.");
					$("#batch_adviser_register_date").show();
				}else{
					$("#adviser_register_txt").html("&nbsp;");
					$("#batch_adviser_register_date").hide();
				}
			});
			
			$("#batch_adviser_chamgang_yn_"+data.chamgang_yn).prop("checked", true);
			
			$("#modal-adviser-register").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	

}

function save_adviser_register()
{
	$.ajax({
		type : "POST",
		url : "/batch/updateBatchResultAdviserRegister.do",
		data : {
			user_id : $("#user_id").val(),
			batch_exam_date : $("#batch_exam_date").val(),
			batch_adviser_register_yn : $('input[name="batch_adviser_register_yn"]:checked').val(),
			batch_adviser_not_register_desc : $("#batch_adviser_not_register_desc").val(),
			batch_adviser_register_date : $("#batch_adviser_register_date").val(),
			attend_start_date:$("#batch_adviser_attend_start_date").val(),
			chamgang_yn : $('input[name="batch_adviser_chamgang_yn"]:checked').val(),
			course_id:0
		},
		success:function(data){
			$("#modal-adviser-register").modal("hide");
			search_batch();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function go_detail_desk_register(user_id, batch_exam_date)
{
	$("#user_id").val(user_id);
	$("#batch_exam_date").val(batch_exam_date);
	$.ajax({
		type : "POST",
		url : "/batch/getBatchResult.do",
		data : {
			user_id : user_id,
			batch_exam_date : batch_exam_date,
			course_id:0
		},
		dataType : "json",
		success:function(data){
			$("#desk_student_name").html(cfmNvl1(data.name));
			
			//학생 정보
			if(data.gender == "MALE"){
				$("#desk_gender").html("남");
			}else{
				$("#desk_gender").html("여");
			}
			
			$("#desk_goal_score").html(cfmNvl1(data.goal_score)+"점");
			$("#desk_attend_date").html(cfmNvl1(data.attend_date));
			$("#batch_desk_attend_start_date").val(cfmNvl1(data.attend_start_date));
			if(data.batch_adviser_courses){
				$("#desk_batch_courses").html(cfmNvl1(data.batch_adviser_courses)+"반");
			}else{
				$("#desk_batch_courses").html(cfmNvl1(data.batch_select_courses)+"반");
			}
			
			var vHtml = "";
			
			if(data.batch_user_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
			}else if(data.batch_user_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
			}else if(data.batch_user_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_user_register_date+")</p>";
			}else if(data.batch_user_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_user_register_date+")</p>";
			}
			$("#desk_user_register").html(vHtml);
			
			vHtml = "";
			if(data.batch_adviser_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_adviser_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_adviser_name+"</p>";
			}else if(data.batch_adviser_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_adviser_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_adviser_name+"</p>";
			}else if(data.batch_adviser_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_adviser_register_date+")</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_adviser_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_adviser_name+"</p>";
			}else if(data.batch_adviser_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_adviser_register_date+")</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_adviser_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_adviser_name+"</p>";
			}			
			$("#desk_adviser_register").html(vHtml);

			vHtml = "";
			if(data.batch_desk_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_desk_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_desk_name+"</p>";
			}else if(data.batch_desk_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_desk_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_desk_name+"</p>";
			}else if(data.batch_desk_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_desk_register_date+")</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_desk_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_desk_name+"</p>";
			}else if(data.batch_desk_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_desk_register_date+")</p>";
				vHtml += "<p>&nbsp;</p>";
				vHtml += "<p>"+data.batch_desk_date+"</p>";
				vHtml += "<p>상담자:"+data.batch_desk_name+"</p>";
			}			
			$("#desk_desk_register").html(vHtml);

			vHtml = "";
			
			if(data.batch_user_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
			}else if(data.batch_user_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
			}else if(data.batch_user_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_user_register_date+")</p>";
			}else if(data.batch_user_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_user_register_date+")</p>";
			}
			$("#desk_user_register1").html(vHtml);
			
			

			vHtml = "";
			
			if(data.batch_adviser_register_yn == "Y"){
				vHtml += "<p>당일등록</p>";
			}else if(data.batch_adviser_register_yn == "N"){ //거절
				vHtml += "<p>거절</p>";
			}else if(data.batch_adviser_register_yn == "S"){ //예정
				vHtml += "<p>예정등록<br>("+data.batch_adviser_register_date+")</p>";
			}else if(data.batch_adviser_register_yn == "Q"){ //고민
				vHtml += "<p>고민<br>("+data.batch_adviser_register_date+")</p>";
			}
			$("#desk_adviser_register1").html(vHtml);
			
			$("#batch_desk_register_yn_Y").prop("checked", false);
			$("#batch_desk_register_yn_N").prop("checked", false);
			$("#batch_desk_register_yn_Q").prop("checked", false);
			$("#batch_desk_register_yn_S").prop("checked", false);
			$("#batch_desk_register_date").hide();
			
			if(data.batch_desk_register_yn){
				$("#batch_desk_register_yn_"+data.batch_desk_register_yn).prop("checked", true);
				$("#batch_desk_register_date").val(data.batch_desk_register_date);
				$("#batch_desk_not_register_desc").val(data.batch_desk_not_register_desc);
				if(data.batch_desk_register_yn == "S"){
					$("#desk_register_txt").html("학생에게 등록예정일자를 물어보고 기입해주세요.");
					$("#batch_desk_register_date").show();
				}else if(data.batch_desk_register_yn == "Q"){
					$("#desk_register_txt").html("학생에게 언제까지 결정해줄실 수 있을지 물어보고 기입해주세요.");
					$("#batch_desk_register_date").show();
				}else{
					$("#desk_register_txt").html("&nbsp;");
					$("#batch_desk_register_date").hide();
				}
			}else{
				$("#desk_register_txt").html("&nbsp;");
				$("#batch_desk_register_date").val("");
				$("#batch_desk_not_register_desc").val("");
			}
			
			$("input[name='batch_desk_register_yn']").click(function(){
				var register_yn = $("input[name='batch_desk_register_yn']:checked").val();
				if(register_yn == "S"){
					$("#desk_register_txt").html("학생에게 등록예정일자를 물어보고 기입해주세요.");
					$("#batch_desk_register_date").show();
				}else if(register_yn == "Q"){
					$("#desk_register_txt").html("학생에게 언제까지 결정해줄실 수 있을지 물어보고 기입해주세요.");
					$("#batch_desk_register_date").show();
				}else{
					$("#desk_register_txt").html("&nbsp;");
					$("#batch_desk_register_date").hide();
				}
			});
			
			$("#batch_desk_chamgang_yn_"+data.chamgang_yn).prop("checked", true);
			
			$("#modal-desk-register").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	

}

function save_desk_register()
{
	$.ajax({
		type : "POST",
		url : "/batch/updateBatchResultDeskRegister.do",
		data : {
			user_id : $("#user_id").val(),
			batch_exam_date : $("#batch_exam_date").val(),
			batch_desk_register_yn : $('input[name="batch_desk_register_yn"]:checked').val(),
			batch_desk_not_register_desc : $("#batch_desk_not_register_desc").val(),
			batch_desk_register_date : $("#batch_desk_register_date").val(),
			attend_start_date:$("#batch_desk_attend_start_date").val(),
			chamgang_yn : $('input[name="batch_desk_chamgang_yn"]:checked').val(),
			course_id:0
		},
		success:function(data){
			$("#modal-desk-register").modal("hide");
			search_batch();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function change_test_type(v_test_type, v_student_type){
	var vHtml = "";
	var vSelected = "";
	if(v_test_type){
		if(v_test_type == 'TOEIC'){
			vHtml += "<option value=''>선택</option>";
			if(v_student_type == "SENIOR") vSelected = "selected";
			vHtml += "<option value='SENIOR' "+vSelected+">성인</option>";
			$("#batch_adviser_student_type").html(vHtml);
		}else{
			vHtml += "<option value=''>선택</option>";
			
			if(v_student_type == "SENIOR") vSelected = "selected";
			vHtml += "<option value='SENIOR' "+vSelected+">성인</option>";
			vSelected = "";
			
			if(v_student_type == "JUNIOR") vSelected = "selected";
			vHtml += "<option value='JUNIOR' "+vSelected+">중고등</option>";
			
			$("#batch_adviser_student_type").html(vHtml);
		}
		$("#batch_adviser_course_group").html("<option value=''>선택</option>");
		$("#batch_adviser_courses").html("<option value=''>선택</option>");
	}else{
		$("#batch_adviser_student_type").html("<option value=''>선택</option>");
		$("#batch_adviser_course_group").html("<option value=''>선택</option>");
		$("#batch_adviser_courses").html("<option value=''>선택</option>");
	}
}

function change_student_type(v_test_type, v_student_type, v_course_group){
	if(v_student_type){
		var vHtml = "<option value=''>선택</option>";
		var vSelected = "";
		if(v_test_type == "TOEIC"){
			if(v_course_group == "REGULAR") vSelected = "selected";
			vHtml += "<option value='REGULAR' "+vSelected+">종합반</option>";
			vSelected = "";
			
			if(v_course_group == "LIGHT_RC") vSelected = "selected";
			vHtml += "<option value='LIGHT_RC' "+vSelected+">RC단과반</option>";
			vSelected = "";
			
			if(v_course_group == "LIGHT_LC") vSelected = "selected";
			vHtml += "<option value='LIGHT_LC' "+vSelected+">LC단과반</option>";
			vSelected = "";
			
		}else{
			if(v_student_type == "JUNIOR"){
				if(v_course_group == "REGULAR_MON_FRI") vSelected = "selected";
				vHtml += "<option value='REGULAR_MON_FRI' "+vSelected+">정규 월/수/금</option>";
				vSelected = "";
				
				if(v_course_group == "REGULAR_TUE_THU") vSelected = "selected";
				vHtml += "<option value='REGULAR_TUE_THU' "+vSelected+">정규 화/목</option>";
				vSelected = "";
				
				if(v_course_group == "SPECIAL") vSelected = "selected";
				vHtml += "<option value='SPECIAL' "+vSelected+">방학특강</option>";
				vSelected = "";
			}else{
				if(v_course_group == "REGULAR") vSelected = "selected";
				vHtml += "<option value='REGULAR' "+vSelected+">종합반</option>";
				vSelected = "";
				
				if(v_course_group == "LIGHT") vSelected = "selected";
				vHtml += "<option value='LIGHT' "+vSelected+">종합반(Light)</option>";
				vSelected = "";
				
				if(v_course_group == "SINGLE") vSelected = "selected";
				vHtml += "<option value='SINGLE' "+vSelected+">저녁반(단과반)</option>";
				vSelected = "";
			}
		}
		$("#batch_adviser_course_group").html(vHtml);
		$("#batch_adviser_courses").html("<option value=''>선택</option>");
	}else{
		$("#batch_adviser_course_group").html("<option value=''>선택</option>");
		$("#batch_adviser_courses").html("<option value=''>선택</option>");
	}
}

function change_course_group(v_test_type, v_student_type, v_course_group, v_courses){
	if(v_course_group){
		var vHtml = "<option value=''>선택</option>";
		var vSelected = "";
		if(v_test_type == "TOEIC"){
			if(v_courses == "750") vSelected = "selected";
			vHtml += "<option value='750' "+vSelected+">750반</option>";
			vSelected = "";
			
			if(v_courses == "850") vSelected = "selected";
			vHtml += "<option value='850' "+vSelected+">850반</option>";
			vSelected = "";
			
		}else{
			if(v_student_type == "JUNIOR"){
				if(v_courses == "U") vSelected = "selected";
				vHtml += "<option value='U' "+vSelected+">U반</option>";
				vSelected = "";
				
				if(v_courses == "S") vSelected = "selected";
				vHtml += "<option value='S' "+vSelected+">S반</option>";
				vSelected = "";
				
				if(v_courses == "H") vSelected = "selected";
				vHtml += "<option value='H' "+vSelected+">H반</option>";
				vSelected = "";
				
				if(v_courses == "E") vSelected = "selected";
				vHtml += "<option value='E' "+vSelected+">E반</option>";
				vSelected = "";
				
				if(v_courses == "R") vSelected = "selected";
				vHtml += "<option value='R' "+vSelected+">R반</option>";
				vSelected = "";
			}else{
				if(v_course_group == "SINGLE"){
					if(v_courses == "단과종합") vSelected = "selected";
					vHtml += "<option value='단과종합' "+vSelected+">단과종합반</option>";
					vSelected = "";
					
					if(v_courses == "단과") vSelected = "selected";
					vHtml += "<option value='단과' "+vSelected+">단과반</option>";
					vSelected = "";
				}else{
					if(v_courses == "완초1") vSelected = "selected";
					vHtml += "<option value='완초1' "+vSelected+">완초1반</option>";
					vSelected = "";
					
					if(v_courses == "완초2") vSelected = "selected";
					vHtml += "<option value='완초2' "+vSelected+">완초2반</option>";
					vSelected = "";
					
					if(v_courses == "Intermediate") vSelected = "selected";
					vHtml += "<option value='Intermediate' "+vSelected+">Intermediate반</option>";
					vSelected = "";
					
					if(v_courses == "K1") vSelected = "selected";
					vHtml += "<option value='K1' "+vSelected+">K1반</option>";
					vSelected = "";
					
					if(v_courses == "K2") vSelected = "selected";
					vHtml += "<option value='K2' "+vSelected+">K2반</option>";
					vSelected = "";
				}
			}
		}
		$("#batch_adviser_courses").html(vHtml);
	}else{
		$("#batch_adviser_courses").html("<option value=''>선택</option>");
	}
}

function go_question_all()
{
	var vHtml = "";
	for(var i=0; i<resultList.length; i++)
	{
		
		var name = resultList[i].name;
		var test_type = resultList[i].test_type;
		var student_type = resultList[i].student_type;
		var course_group = resultList[i].course_group;
		var batch_user_advice = resultList[i].batch_user_advice;
		var batch_select_courses = resultList[i].batch_select_courses;
		//if(!batch_user_advice) continue;
		
		vHtml += '<tr>';
		vHtml += '	<td class="text-center">'+name+'</td>';
		vHtml += '	<td class="text-center">';
		if(test_type=="TOEIC"){
			vHtml += '토익';
		}else{
			vHtml += '토플';
		}
		vHtml += '	</td>';
		vHtml += '	<td class="text-center">';
		var course_group_name = find_group(test_type, student_type, course_group);
		vHtml += course_group_name;
		vHtml += '	</td>';
		vHtml += '	<td class="text-center">';
		if(batch_select_courses){
			vHtml += batch_select_courses;
		}else{
			vHtml += '없음';
		}
		vHtml += '	</td>';
		vHtml += '	<td>';
		if(batch_user_advice){
			vHtml += batch_user_advice;
		}else{
			vHtml += '질문없음';
		}
		vHtml += '	</td>';
		vHtml += '</tr>';
	}
	$("#question_list").html(vHtml);
	$("#modal-question").modal();
}

function find_group(test_type, student_type, course_group)
{
	var rtn = '';
	for(var i=0; i<array_test3.length;i++)
	{
		if(array_test3[i][1] == test_type && array_test3[i][2] == student_type && array_test3[i][3] == course_group){
			rtn = array_test3[i][5];
			break;
		}
	}
	
	return rtn;
}

function open_memoirs(user_id, batch_exam_date)
{
	//alert(user_id+"||"+batch_exam_date);
	window.open('http://batch.usher.co.kr/flow/flow_memoris.do?user_id='+user_id+'&&batch_exam_date='+batch_exam_date,'memoirs');
}

function go_modify()
{
	var user_id = $("#user_id").val();
	window.open('http://batch.usher.co.kr/modify/modify_user.do?user_id='+user_id,'modify_user');
}

function go_modify_score()
{
	var user_id = $("#user_id").val();
	window.open('http://batch.usher.co.kr/modify/modify_user_score.do?user_id='+user_id,'modify_user_score');
}

var finally_user_id;
var finally_batch_exam_date;

function go_finally_not_register_desc(v_user_id,v_batch_exam_date)
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchResult.do",
		data : {
			user_id : v_user_id,
			batch_exam_date : v_batch_exam_date,
			course_id:0
		},
		dataType : "json",
		success:function(data){
			finally_user_id = v_user_id;
			finally_batch_exam_date = v_batch_exam_date;
			$("#batch_finally_not_register_desc").val(cfmNvl1(data.batch_finally_not_register_desc));
			$("#modal-finally-not-register-desc").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_finally_not_register_desc()
{
	$.ajax({
		type : "POST",
		url : "/batch/updateBatchResultFinallyNotRegister.do",
		data : {
			user_id : finally_user_id,
			batch_exam_date : finally_batch_exam_date,
			batch_finally_not_register_desc : $("#batch_finally_not_register_desc").val(),
			course_id:0
		},
		success:function(data){
			$("#modal-finally-not-register-desc").modal("hide");
			search_batch();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}