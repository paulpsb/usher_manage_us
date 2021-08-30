var toefl_service = ["토플종합반","토플저녁반","정규반 월수금","정규반 화목","방학특강","토익종합"];
var toeic_service = ["종합반","단과반 RC","단과반 LC"]
var toefl_course = ["완초1","완초2","Intermediate","K1","K2","저녁반 종합","저녁반 RC","저녁반 LC","저녁반 SP","저녁반 WR","U","S","H","E","R"];
var toeic_course = ["750","850"]

/*
 * 
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	var vHtml;
	
	//총 수강개월
	vHtml = "";
	vHtml += '<option value="">총 수강개월</option>';
	for(var i=1; i<=20 ; i++)
	{
		vHtml += '<option value="'+i+'">'+i+'개월</option>';
	}
	$("#course_month").html(vHtml);
	
	//년도 데이터 만들기
	var today = new Date();   
	var str_year = today.getFullYear(); // 년도
	var lst_year = str_year - 10;
	vHtml = "";
	vHtml += '<option value="">년</option>';
	for(var i=str_year; i>=lst_year ; i--)
	{
		vHtml += '<option value="'+i+'">'+i+'년</option>';
	}
	$("#exam_year").html(vHtml);
	
	//월 데이터 만들기
	vHtml = "";
	vHtml += '<option value="">월</option>';
	for(var i=1; i<=12 ; i++)
	{
		var mon;
		if(i >= 10){
			mon = ""+i;
		}else{
			mon = "0"+i;
		}
		vHtml += '<option value="'+mon+'">'+mon+'월</option>';
	}
	$("#exam_month").html(vHtml);
	
	//일 데이터 만들기
	vHtml = "";
	vHtml += '<option value="">일</option>';
	for(var i=1; i<=31 ; i++)
	{
		var day;
		if(i >= 10){
			day = ""+i;
		}else{
			day = "0"+i;
		}
		vHtml += '<option value="'+day+'">'+day+'일</option>';
	}
	$("#exam_day").html(vHtml);
	
	$.ajax({
		type : "POST",
		url : "/board/getBoardMemoirs.do",
		data:{
			id:$("#memoirs_id").val(),
		},
		success:function(data){
			create_courses(data.test_type);
			
			$("#test_type").val(data.test_type);
			$("#student_type").val(data.student_type);
			$("#study_abroad").val(data.study_abroad);
			$("#first_course").val(data.first_course);
			$("#last_course").val(data.last_course);
			$("#course_month").val(cfmZeroSpace(data.course_month));
			$("#start_toeic_score").val(cfmZeroSpace(data.start_toeic_score));
			$("#start_teps_score").val(cfmZeroSpace(data.start_teps_score));
			$("#start_scholastic_score").val(cfmZeroSpace(data.start_scholastic_score));
			$("#start_toefl_score").val(cfmZeroSpace(data.start_toefl_score));
			$("#start_toefl_rc_score").val(cfmZeroSpace(data.start_toefl_rc_score));
			$("#start_toefl_lc_score").val(cfmZeroSpace(data.start_toefl_lc_score));
			$("#start_toefl_sp_score").val(cfmZeroSpace(data.start_toefl_sp_score));
			$("#start_toefl_wr_score").val(cfmZeroSpace(data.start_toefl_wr_score));
			$("#end_toefl_score").val(cfmZeroSpace(data.end_toefl_score));
			$("#end_toefl_rc_score").val(cfmZeroSpace(data.end_toefl_rc_score));
			$("#end_toefl_lc_score").val(cfmZeroSpace(data.end_toefl_lc_score));
			$("#end_toefl_sp_score").val(cfmZeroSpace(data.end_toefl_sp_score));
			$("#end_toefl_wr_score").val(cfmZeroSpace(data.end_toefl_wr_score));
			$("#exam_year").val(data.exam_year);
			$("#exam_month").val(data.exam_month);
			$("#exam_day").val(data.exam_day);
			$("#service_type").val(data.service_type);
			
			$("#title").html(data.title);
			$("#content").html(data.content.replace(/\n/gi,"<br/>"));
			
			$('#test_type').change(function(e){
				create_courses($('#test_type').val());
			});
			
			$("#start_toefl_rc_score").change(function(e){
				sum_start_toefl();
			});
			$("#start_toefl_lc_score").change(function(e){
				sum_start_toefl();
			});
			$("#start_toefl_sp_score").change(function(e){
				sum_start_toefl();
			});
			$("#start_toefl_wr_score").change(function(e){
				sum_start_toefl();
			});
			
			$("#end_toefl_rc_score").change(function(e){
				sum_end_toefl();
			});
			$("#end_toefl_lc_score").change(function(e){
				sum_end_toefl();
			});
			$("#end_toefl_sp_score").change(function(e){
				sum_end_toefl();
			});
			$("#end_toefl_wr_score").change(function(e){
				sum_end_toefl();
			});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
});

function sum_start_toefl()
{
	var total_score = 0;
	total_score += parseInt(cfmNullToZero($("#start_toefl_rc_score").val()));
	total_score += parseInt(cfmNullToZero($("#start_toefl_lc_score").val()));
	total_score += parseInt(cfmNullToZero($("#start_toefl_sp_score").val()));
	total_score += parseInt(cfmNullToZero($("#start_toefl_wr_score").val()));
	
	$("#start_toefl_score").val(total_score);
}

function sum_end_toefl()
{
	var total_score = 0;
	total_score += parseInt(cfmNullToZero($("#end_toefl_rc_score").val()));
	total_score += parseInt(cfmNullToZero($("#end_toefl_lc_score").val()));
	total_score += parseInt(cfmNullToZero($("#end_toefl_sp_score").val()));
	total_score += parseInt(cfmNullToZero($("#end_toefl_wr_score").val()));
	
	$("#end_toefl_score").val(total_score);
}
function create_courses(vTestType, vStudentType)
{
	var vHtml1 = "";
	var vHtml2 = "";
	var vHtml3 = "";
	if(vTestType == "TOEFL"){
		
		vHtml1 += '<option value="">반 그룹</option><option value="SENIOR">성인</option><option value="JUNIOR">주니어</option>';
		for(var i=0; i<toefl_service.length; i++)
		{
			vHtml2 += '<option value="'+toefl_service[i]+'">'+toefl_service[i]+'</option>';
		}
		for(var i=0; i<toefl_course.length; i++)
		{
			vHtml3 += '<option value="'+toefl_course[i]+'">'+toefl_course[i]+'</option>';
		}
	}else{
		vHtml1 += '<option value="">반 그룹</option>';
		for(var i=0; i<toeic_service.length; i++)
		{
			vHtml2 += '<option value="'+toeic_service[i]+'">'+toeic_service[i]+'</option>';
		}
		for(var i=0; i<toeic_course.length; i++)
		{
			vHtml3 += '<option value="'+toeic_course[i]+'">'+toeic_course[i]+'</option>';
		}
	}
	$("#student_type").html(vHtml1);
	$("#service_type").html('<option value="">서비스구분</option>'+vHtml2);
	$("#first_course").html('<option value="">최초시작반</option>'+vHtml3);
	$("#last_course").html('<option value="">최종수강반</option>'+vHtml3);
}

function form_submit()
{
	$.ajax({
		type : "POST",
		url : "/board/saveBoardMemoirs.do",
		data:{
			id:$("#memoirs_id").val(),
			test_type:$("#test_type").val(),
			student_type:$("#student_type").val(),
			study_abroad:$("#study_abroad").val(),
			first_course:$("#first_course").val(),
			last_course:$("#last_course").val(),
			course_month:cfmNullToZero($("#course_month").val()),
			start_toeic_score:cfmNullToZero($("#start_toeic_score").val()),
			start_teps_score:cfmNullToZero($("#start_teps_score").val()),
			start_scholastic_score:cfmNullToZero($("#start_scholastic_score").val()),
			start_toefl_score:cfmNullToZero($("#start_toefl_score").val()),
			start_toefl_rc_score:cfmNullToZero($("#start_toefl_rc_score").val()),
			start_toefl_lc_score:cfmNullToZero($("#start_toefl_lc_score").val()),
			start_toefl_sp_score:cfmNullToZero($("#start_toefl_sp_score").val()),
			start_toefl_wr_score:cfmNullToZero($("#start_toefl_wr_score").val()),
			end_toefl_score:cfmNullToZero($("#end_toefl_score").val()),
			end_toefl_rc_score:cfmNullToZero($("#end_toefl_rc_score").val()),
			end_toefl_lc_score:cfmNullToZero($("#end_toefl_lc_score").val()),
			end_toefl_sp_score:cfmNullToZero($("#end_toefl_sp_score").val()),
			end_toefl_wr_score:cfmNullToZero($("#end_toefl_wr_score").val()),
			exam_year:$("#exam_year").val(),
			exam_month:$("#exam_month").val(),
			exam_day:$("#exam_day").val(),
			modify_yn:"Y",
			service_type:$("#service_type").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			location.href="/board/memoirs_list.do?test_type="+$("#search_test_type").val()+"&&student_type="+$("#search_student_type").val()+"&&modify_yn="+$("#search_modify_yn").val()+"&&page="+$("#search_page").val();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
