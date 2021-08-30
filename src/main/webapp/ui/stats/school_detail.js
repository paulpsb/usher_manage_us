var to_month;
jQuery(document).ready(function(){
	$("#search_user_name").keydown(function(key) {
		if (key.keyCode == 13) {
			search_student();
		}
	});
	
	var vHtml = "";
    var today = new Date();   

	var eyear = today.getFullYear(); // 년도
	var toYear = today.getFullYear(); // 년도
	var toMonth = today.getMonth() + 1;  // 월
	var fyear = eyear-3;

	to_month = toYear;
	if(toMonth < 10){
		to_month += "-0"+toMonth;
	}else{
		to_month += "-"+toMonth;
	}
	for(var i=toYear; i>= toYear-10; i--)
	{
		var selected = "";
		//if(i == fyear) selected = "selected";
		if(i == toYear) selected = "selected";
		vHtml += '<option value="'+i+'" '+selected+'>'+i+'년</option>';
	}
	$("#search_start_year").html(vHtml);
	vHtml = "";
	for(var i=toYear; i>= toYear-10; i--)
	{
		var selected = "";
		if(i == toYear) selected = "selected";
		vHtml += '<option value="'+i+'" '+selected+'>'+i+'년</option>';
	}
	$("#search_end_year").html(vHtml);
	vHtml = "";
	for(var i=1; i<= 12; i++)
	{
		var vMon = ""+i;
		if(i< 10) vMon = "0"+i;
		
		var selected = "";
		if(i == toMonth) selected = "selected";
		
		vHtml += '<option value="'+vMon+'" '+selected+'>'+i+'월</option>';
	}
	$("#search_start_month").html(vHtml);
	$("#search_end_month").html(vHtml);
	
	$.ajax({
		type : "POST",
		url : "/stats/getStatsSchoolDetailList.do",
		data:{
			foreign_gubun:$("#foreign_gubun").val(),
			school_gubun:$("#school_gubun").val(),
			area1:$("#area1").val(),
			area2:$("#area2").val(),
			school_name:$("#school_name").val()
		},
		success:function(data){
			var nSeq = 1;
			for(var i=fyear; i<=eyear; i++)
			{
				var score1 = 0;
				var score2 = 0;
				var score3 = 0;
				var score4 = 0;
				var score5 = 0;
				
				$("#dataYear"+nSeq).html(i);
				vHtml = "";
				for(var j=1; j<=12; j++)
				{
					var vMonth;
					if(j < 10){
						vMonth = "0"+j;
					}else{
						vMonth = ""+j;
					}
					var vYm = i+"-"+vMonth;
					vHtml += '<tr>';
					vHtml += '<input type="hidden" name="search_ym" value="'+vYm+'">';
					vHtml += '<th class="text-center bg-blue text-white">'+j+'월</th>';
					if(i == toYear && j > toMonth){
						vHtml += '<td class="text-center bg-white">&nbsp;</th>';
						vHtml += '<td class="text-center bg-white">&nbsp;</th>';
						vHtml += '<td class="text-center bg-white">&nbsp;</th>';
						vHtml += '<td class="text-center bg-white">&nbsp;</th>';
						vHtml += '<td class="text-center bg-white">&nbsp;</th>';
					}else{
						var a_idx = data.findIndex(t => t.start_ym == vYm);
						var v_stat_count1 = 0;
						var v_stat_count2 = 0;
						var v_stat_count3 = 0;
						var v_stat_count4 = 0;
						var v_stat_count5 = 0;

						var v_stat_rate3  = 0;
						var v_stat_rate4  = 0;
						if(a_idx >= 0)
						{
							var v_stat_count1 = data[a_idx].stat_count1;
							var v_stat_count2 = data[a_idx].stat_count1;
							var v_stat_count3 = data[a_idx].stat_count1;
							var v_stat_count4 = data[a_idx].stat_count1;
							var v_stat_count5 = data[a_idx].stat_count1;

							var v_stat_rate3  = data[a_idx].stat_rate3;
							var v_stat_rate4  = data[a_idx].stat_rate4;
							
							score1 += data[a_idx].stat_count1;
							score2 += data[a_idx].stat_count2;
							score3 += data[a_idx].stat_count3;
							score4 += data[a_idx].stat_count4;
							score5 += data[a_idx].stat_count5;
							
						}
						
						var v_class = "bg-white";
						if(v_stat_count1 == 0 && v_stat_count2 == 0 )
						{
							v_class = "bg-dark text-white";
						}
						vHtml += '<td class="text-center '+v_class+'">'+v_stat_count1+'</th>';
						vHtml += '<td class="text-center '+v_class+'">'+v_stat_count2+'</th>';
						vHtml += '<td class="text-center '+v_class+'">'+v_stat_count3+' ('+v_stat_rate3+'%)</th>';
						vHtml += '<td class="text-center '+v_class+'">'+v_stat_count4+' ('+v_stat_rate4+'%)</th>';
						vHtml += '<td class="text-center '+v_class+'">'+v_stat_count5+'</th>';

					}
					vHtml += '</tr>';
				}
				vHtml += '<tr>';
				vHtml += '<th class="text-center bg-grey-darker text-white">계</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+score1+'</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+score2+'</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+score3+'</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+score4+'</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+score5+'</th>';
				vHtml += '</tr>';
				
				var totalMonth = 12;
				if(i == toYear){
					totalMonth = toMonth;
				}
				var a_score1 = Math.round(score1 * 10 / totalMonth) / 10;
				var a_score2 = Math.round(score2 * 10 / totalMonth) / 10;
				var a_score3 = Math.round(score3 * 10 / totalMonth) / 10;
				var a_score4 = Math.round(score4 * 10 / totalMonth) / 10;
				var a_score5 = Math.round(score5 * 10 / totalMonth) / 10;
				vHtml += '<tr>';
				vHtml += '<th class="text-center bg-grey-darker text-white">평균</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+a_score1+'</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+a_score2+'</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+a_score3+'</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+a_score4+'</th>';
				vHtml += '<th class="text-center bg-grey-darker text-white">'+a_score5+'</th>';
				vHtml += '</tr>';
				$("#dataList"+nSeq).html(vHtml);
				nSeq++;
			}
			$(document).on("click", "table tbody tr", function() {
		        var val = $(this).find("input[type=hidden]").val();
		        if(val){
		        	var array_val = val.split("-");
		        	$("#search_start_year").val(array_val[0]);
		        	$("#search_start_month").val(array_val[1]);
		        	$("#search_end_year").val(array_val[0]);
		        	$("#search_end_month").val(array_val[1]);
		        	search_student();
		        }

		    });
			search_student();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});

});

function search_student()
{
	var start_ym = $("#search_start_year").val()+"-"+$("#search_start_month").val();
	var end_ym = $("#search_end_year").val()+"-"+$("#search_end_month").val();
	$.ajax({
		type : "POST",
		url : "/stats/getStatsSchoolStudentList.do",
		data:{
			foreign_gubun:$("#foreign_gubun").val(),
			school_gubun:$("#school_gubun").val(),
			area1:$("#area1").val(),
			area2:$("#area2").val(),
			school_name:$("#school_name").val(),
			user_name:$("#search_user_name").val(),
			start_ym:start_ym,
			end_ym:end_ym
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++)
			{
				var user_id = data[i].user_id;
				var user_name = data[i].user_name;
				var foreign_yn = data[i].foreign_yn;
				var first_course_name = data[i].first_course_name;
				var last_course_name = data[i].last_course_name;
				var course_month = data[i].course_month;
				var scholastic_grade = data[i].scholastic_grade;
				if(scholastic_grade > 0){
					scholastic_grade = scholastic_grade + "등급";
				}else{
					scholastic_grade = "";
				}
				var toeic_total_score    = cfmZeroSpace(data[i].toeic_total_score);
				var teps_total_score     = cfmZeroSpace(data[i].teps_total_score);
				var start_toefl_score    = cfmZeroSpace(data[i].start_toefl_score);
				var start_toefl_rc_score = cfmZeroSpace(data[i].start_toefl_rc_score);
				var start_toefl_lc_score = cfmZeroSpace(data[i].start_toefl_lc_score);
				var start_toefl_sp_score = cfmZeroSpace(data[i].start_toefl_sp_score);
				var start_toefl_wr_score = cfmZeroSpace(data[i].start_toefl_wr_score);
				var end_toefl_score      = cfmZeroSpace(data[i].end_toefl_score);
				var end_toefl_rc_score   = cfmZeroSpace(data[i].end_toefl_rc_score);
				var end_toefl_lc_score   = cfmZeroSpace(data[i].end_toefl_lc_score);
				var end_toefl_sp_score   = cfmZeroSpace(data[i].end_toefl_sp_score);
				var end_toefl_wr_score   = cfmZeroSpace(data[i].end_toefl_wr_score);
				var exam_year = data[i].exam_year;
				var exam_month = data[i].exam_month;
				var exam_day = data[i].exam_day;
				var exam_date = "";
				if(exam_year && exam_month && exam_day){
					exam_date = exam_year+"-"+exam_month+"-"+exam_month;
				}

				var last_semester_ym = data[i].last_semester_ym;
				var v_class = "bg-white";
				if(to_month > last_semester_ym) v_class = "bg-dark text-white";
				vHtml += '<tr>';
				vHtml += '<td class="text-center '+v_class+'"><a href="javascript:go_user('+user_id+')">'+user_name+'</a></td>';
				vHtml += '<td class="text-center '+v_class+'">'+foreign_yn+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+first_course_name+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+last_course_name+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+course_month+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+scholastic_grade+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+toeic_total_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+teps_total_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+start_toefl_rc_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+start_toefl_lc_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+start_toefl_sp_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+start_toefl_wr_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+start_toefl_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+end_toefl_rc_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+end_toefl_lc_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+end_toefl_sp_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+end_toefl_wr_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+end_toefl_score+'</td>';
				vHtml += '<td class="text-center '+v_class+'">'+exam_date+'</td>';
				vHtml += '<tr>';
			}
			
			$("#student_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function go_user(v_user_id)
{
	$.ajax({
		type : "POST",
		url : "/stats/getStatsSchoolStudentInfo.do",
		data:{
			user_id:v_user_id
		},
		success:function(data){
			var exam_url = "http://exam-us.usher.co.kr/";
			//var exam_url = "http://127.0.0.1:8080/";
			var url = exam_url + "/achieve/achieve_main.do?username="+data.username+"&&course_enrollment_id="+data.course_enrollment_id+"&&date="+data.date;
			window.open(url, "student_achieve");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}