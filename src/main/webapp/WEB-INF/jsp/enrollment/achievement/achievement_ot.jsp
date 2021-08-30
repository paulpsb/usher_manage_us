<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
<link href="/assets/plugins/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
<link href="/assets/plugins/datatables.net-fixedcolumns-bs4/css/fixedColumns.bootstrap4.css" rel="stylesheet" />
<!-- ================== END PAGE LEVEL STYLE ================== -->

<div class="row">
	<div class="col-xl-12">
		<div class="panel panel-inverse" data-sortable-id="table-basic-1">
			<div class="panel-heading">
				<h4 class="panel-title">OT명단</h4>
			</div>
			<div class="panel-body">
				<div class="table-responsive" id="table_info">
					
				</div>
			</div>
		</div>
	</div>
</div>

<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<script src="/assets/plugins/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/assets/plugins/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns/js/dataTables.fixedColumns.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.js"></script>

<script>
jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getOtList.do",
		data:{
			course_id : course_id
		},
		success:function(data){
			var vHtml = "";
			var enrollmentList = data.enrollmentList;
			var enrollment_count = enrollmentList.length;
			var baseOrientationList = data.baseOrientationList;
			var base_orientation_count = baseOrientationList.length;
			var programOrientationList = data.programOrientationList;
			var program_orientation_count = programOrientationList.length;
			var courseInfo = data.courseInfo;
			var classCountList = data.classCountList;
			
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
			var nWidth = (base_orientation_count+program_orientation_count)*100 + 259;

			var orientationList = data.orientationList;
			//vHtml += '<table class="table table-bordered m-b-0" style="width:'+nWidth+'px;">';
			//vHtml += '	<thead style="float:left;width:'+nWidth+';">';
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			vHtml += '			<th class="text-center table-info" colspan="10">상담카드</th>';
			vHtml += '			<th class="text-center table-info" colspan="'+base_orientation_count+'">학원생활 안내</th>';
			vHtml += '			<th class="text-center table-info" colspan="'+program_orientation_count+'">프로그램 안내</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" style="width:40px;">성별</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">생년월일</th>';
			vHtml += '			<th class="text-center table-info" style="width:120px;">학교</th>';
			vHtml += '			<th class="text-center table-info" style="width:40px;">학년</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">공부목적</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">목표점수</th>';
			vHtml += '			<th class="text-center table-info" style="width:150px;">학원수강기간</th>';
			vHtml += '			<th class="text-center table-info" style="width:120px;">보유점수</th>';
			vHtml += '			<th class="text-center table-info" style="width:120px;">배치고사점수</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">최초 상중하</th>';
			for(var i=0; i<base_orientation_count; i++)
			{
				vHtml += '				<th class="text-center table-info" style="width:100px;">'+baseOrientationList[i].orientation_name+'</th>';
			}
			for(var i=0; i<program_orientation_count; i++)
			{
				if(i == (program_orientation_count-1))
				{
					vHtml += '				<th class="text-center table-info" style="width:119px;">'+programOrientationList[i].orientation_name+'</th>';
				}else{
					vHtml += '				<th class="text-center table-info" style="width:100px;">'+programOrientationList[i].orientation_name+'</th>';
				}
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			//vHtml += '	<tbody id="data_list" style="overflow: hidden scroll; float: left; width: '+nWidth+'px; height: 229px;">';
			vHtml += '	<tbody>';
			for(var i=0; i<enrollment_count; i++)
			{
				var course_enrollment_id = enrollmentList[i].course_enrollment_id;
				var student_id = enrollmentList[i].student_id;

				var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
				var class_count = 0;
				if(c_idx >=0 ){
					class_count = classCountList[c_idx].class_count;	
				}
				
				var class_list = classCountList.filter(function(item, index){
					if(item.student_id == student_id && item.student_type == student_type){
						return true;
					}
				})
				
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
				if(enrollmentList[i].registration_type != "NEW"){
					sReg = "기존";
				}
				
				vHtml += '		<tr>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+(i+1)+'</td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_login(\''+enrollmentList[i].username+'\')">'+enrollmentList[i].last_name+enrollmentList[i].first_name+'</a></td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
				var username = enrollmentList[i].username;
				var gender = cfmNvl1(enrollmentList[i].gender);
				if(gender == "MALE"){
					gender = "남";
				}else{
					gender = "여";
				}
				var birthday = cfmNvl1(enrollmentList[i].birthday);
				var purpose_detail = cfmNvl1(enrollmentList[i].purpose_detail);
				var goal_score = cfmNvl1(enrollmentList[i].goal_score);
				var attend_start_date = cfmNvl1(enrollmentList[i].attend_start_date);
				var attend_date = cfmNvl1(enrollmentList[i].attend_date);
				var calcMonth = cfmCalcMonth(attend_start_date+"-01", attend_date+"-01") + 1;
				var mobile_no = cfmNvl1(enrollmentList[i].mobile_no);
				var tel_emergency_number = cfmNvl1(enrollmentList[i].tel_emergency_number);
				var school_name = cfmNvl1(enrollmentList[i].school_name);
				var school_grade = cfmNvl1(enrollmentList[i].school_grade);
				var batch_grammar_score1 = cfmNvl1(enrollmentList[i].batch_grammar_score1);
				var batch_grammar_score2 = cfmNvl1(enrollmentList[i].batch_grammar_score2);
				var batch_reading_score = cfmNvl1(enrollmentList[i].batch_reading_score);
				var batch_user_level = cfmNvl1(enrollmentList[i].batch_user_level);
				
				if(goal_score){
					goal_score += "점";
				}
				var attend_dates = "";
				if(attend_start_date)
				{
					attend_dates = attend_start_date+"~"+attend_date+"("+calcMonth+"개월)";
				}
				var batch_score = "";
				if(batch_grammar_score1){
					batch_score += "SW:"+batch_grammar_score1+"+"+batch_grammar_score2+"="+(batch_grammar_score1+batch_grammar_score2);
				}
				if(batch_reading_score){
					batch_score += ", RC:"+batch_reading_score;
				}
				
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
				
				
				vHtml += '			<td class="text-center" style="width:40px;">'+gender+'</td>';
				vHtml += '			<td class="text-center" style="width:80px;">'+birthday+'</td>';
				vHtml += '			<td class="text-center" style="width:120px;">'+school_name+'</td>';
				vHtml += '			<td class="text-center" style="width:40px;">'+school_grade+'</td>';
				vHtml += '			<td class="text-center" style="width:80px;">'+purpose_detail+'</td>';
				vHtml += '			<td class="text-center" style="width:80px;">'+goal_score+'</td>';
				vHtml += '			<td class="text-center" style="width:150px;">'+attend_dates+'</td>';
				vHtml += '			<td class="text-center" style="width:120px;">'+uHtml+'</td>';
				vHtml += '			<td class="text-center" style="width:120px;">'+batch_score+'</td>';
				vHtml += '			<td class="text-center '+select_class+'" style="width:80px;">'+select_level+'</td>';
				
				
				for(var j=0; j<base_orientation_count; j++)
				{
					var orientation_code = baseOrientationList[j].orientation_code;
					var student_type = courseInfo.student_type;
					var lecture_type = courseInfo.lecture_type;
					var chumgang_yn = enrollmentList[i].chamgang_yn;
					var use_orientation = "";
					if(student_type == "SENIOR")
					{
						if(chumgang_yn == "Y"){
							use_orientation = baseOrientationList[j].senior_chamgang;	
						}else{
							use_orientation = baseOrientationList[j].senior_institute;	
						}
						
					}else{
						if(lecture_type == "SPECIAL")
						{
							if(chumgang_yn == "Y"){
								use_orientation = baseOrientationList[j].junior_special_chamgang;	
							}else{
								use_orientation = baseOrientationList[j].junior_special_institute;	
							}
							
						}else{
							if(chumgang_yn == "Y"){
								use_orientation = baseOrientationList[j].junior_chamgang;	
							}else{
								use_orientation = baseOrientationList[j].junior_institute;	
							}
							
						}
					}
					if(use_orientation == "Y")
					{
						var a_idx = orientationList.findIndex(t => t.course_enrollment_id == course_enrollment_id && t.orientation_code == orientation_code); 
						if(a_idx < 0)
						{ 
							vHtml += '			<td class="bg-grey text-center" style="width:100px;">미확인</td>';	
						}else{
							var orientation_accept = orientationList[a_idx].orientation_accept;
							var orientation_reason = cfmNvl1(orientationList[a_idx].orientation_reason);
							if(orientation_code == "flow_002"){
								orientation_reason = mobile_no;
							}
							
							if(orientation_code == "flow_006"){
								orientation_reason = tel_emergency_number;
							}
							
							if(orientation_accept == "Y")
							{
								if(!orientation_reason) orientation_reason="O";
								var openHtml = "";
								if(orientation_code == "flow_017" || orientation_code == "flow_022" || orientation_code == "flow_018" || orientation_code == "flow_019"|| orientation_code == "flow_020"){ //서약서
									openHtml += '<div style="float:right;cursor:pointer;" onclick="openOath(\''+username+'\','+course_enrollment_id+',\''+orientation_code+'\')">';
									openHtml += '	<i class="fas fa-lg fa-fw m-r-10 fa-info-circle"></i>';
									openHtml += '</div>';
								}
								
								vHtml += '			<td class="bg-green text-center" style="width:100px;">'+orientation_reason+openHtml+'</td>';
								
							}else{
								if(!orientation_reason) orientation_reason="X";
								
								vHtml += '			<td class="bg-red text-center" style="width:100px;">'+orientation_reason+'</td>';
							}
						}
						
					}else{
						vHtml += '			<td class="text-center" style="width:100px;">해당없음</td>';
					}
				}
				for(var j=0; j<program_orientation_count; j++)
				{
					var course_enrollment_id = enrollmentList[i].course_enrollment_id;
					var orientation_code = programOrientationList[j].orientation_code;
					
					var student_type = courseInfo.student_type;
					var chumgang_yn = enrollmentList[i].chamgang_yn;
					var lecture_type = courseInfo.lecture_type;
					var use_orientation = "";
					if(student_type == "SENIOR")
					{
						if(chumgang_yn == "Y"){
							use_orientation = programOrientationList[j].senior_chamgang;	
						}else{
							use_orientation = programOrientationList[j].senior_institute;	
						}
						
					}else{
						if(lecture_type == "SPECIAL")
						{
							if(chumgang_yn == "Y"){
								use_orientation = baseOrientationList[j].junior_special_chamgang;	
							}else{
								use_orientation = baseOrientationList[j].junior_special_institute;	
							}
							
						}else{
							if(chumgang_yn == "Y"){
								use_orientation = baseOrientationList[j].junior_chamgang;	
							}else{
								use_orientation = baseOrientationList[j].junior_institute;	
							}
							
						}
					}
					if(use_orientation == "Y")
					{
						var a_idx = orientationList.findIndex(t => t.course_enrollment_id == course_enrollment_id && t.orientation_code == orientation_code); 
						if(a_idx < 0)
						{ 
							vHtml += '			<td class="bg-grey text-center" style="width:100px;">미확인</td>';	
						}else{
							var orientation_accept = orientationList[a_idx].orientation_accept;
							var orientation_reason = cfmNvl1(orientationList[a_idx].orientation_reason);
							if(orientation_accept == "Y")
							{
								if(!orientation_reason) orientation_reason="O";
								vHtml += '			<td class="bg-green text-center" style="width:100px;">'+orientation_reason+'</td>';
							}else{
								if(!orientation_reason) orientation_reason="X";
								vHtml += '			<td class="bg-red text-center" style="width:100px;">'+orientation_reason+'</td>';
							}
						}
					}else{
						vHtml += '			<td class="text-center" style="width:100px;">해당없음</td>';
					}
					
				}
				vHtml += '		</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#table_info").html(vHtml);
			//$("#example tbody tr td").css("padding","0px");
			var window_size = $(window).height();
			
			oTable = $('#example').DataTable( {
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
			
			$("#example tbody tr td").css("padding","0px");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
});

function openOath(username,course_enrollment_id, orientation_code)
{
	var examUrl = "http://exam-us.usher.co.kr/"
	var url = examUrl + "main/oath/oath.do?username="+username+"&&course_enrollment_id="+course_enrollment_id+"&&orientation_code="+orientation_code;
	window.open(url, "oath");
}
</script>