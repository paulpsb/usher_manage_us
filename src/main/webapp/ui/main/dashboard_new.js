var show_refund = true;
var show_new_student = true;
var show_absend = true;
var show_late = true;
var show_speech = true;
var show_voca = true;
var show_goal= true;
var show_sylabus = true;
var show_achieve = true;
var show_confidence = true;
var show_noteffect = true;
var show_levelup = true;
var show_notsend = true;
var show_notschool = true;

var show_private = false;

var courseList;
var sectionList;
var dashboardList;
var dashboardSpeechList;
var dashboardVocaList;
var dashboardGoalList;
var dashboardSylabusList;
var dashboardProblemList;
var dashboardAchieveCountList;
var dashboardAchieveList;
var dashboardConfidenceCountList;
var dashboardConfidenceList;
var dashboardNotEffectCountList;
var dashboardJuniorLevelUpList;
var dashboardJuniorNotSendList;

var dashboardNotSchoolList;

var courseGroupInfo;
var course_count;
var week = [
		'일요일', 
		'월요일', 
		'화요일', 
		'수요일', 
		'목요일', 
		'금요일', 
		'토요일'
];

/*
 * 설명 : 화면이 로딩후 
 */
jQuery(document).ready(function(){
	//버튼 컨트롤
	$('#chk_private').change(function(e){
		if($('#chk_private').is(":checked")){
			$(".refund").hide();
			$(".sylabus").hide();
			$(".goal").hide();
			$(".noteffect").hide();
			$(".levelup").hide();
			$(".notsend").hide();
			$(".notschool").hide();
			
			show_private = true;
		}else{
			$(".refund").show();
			$(".sylabus").show();
			$(".goal").show();
			$(".noteffect").show();
			$(".levelup").show();
			$(".notsend").show();
			$(".notschool").show();
			
			if(show_refund){
				$('.show_refund').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_refund_detail').show();
			}else{
				$('.show_refund').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_refund_detail').hide();
			}
			if(show_refund){
				$('.show_sylabus').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_sylabus_detail').show();
			}else{
				$('.show_sylabus').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_sylabus_detail').hide();
			}
			
			
			if(show_goal){
				$('.show_goal').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_goal_detail').show();
			}else{
				$('.show_goal').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_goal_detail').hide();
			}
			
			if(show_noteffect){
				$('.show_noteffect').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_noteffect_detail').show();
			}else{
				$('.show_noteffect').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_noteffect_detail').hide();
			}
			if(show_levelup){
				$('.show_levelup').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_levelup_detail').show();
			}else{
				$('.show_levelup').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_levelup_detail').hide();
			}
			if(show_notsend){
				$('.show_notsend').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_notsend_detail').show();
			}else{
				$('.show_notsend').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_notsend_detail').hide();
			}
			if(show_notschool){
				$('.show_notschool').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_notschool_detail').show();
			}else{
				$('.show_notschool').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_notschool_detail').hide();
			}
			show_private = false;
		}
	});
	
	var to_day = cfmGetToDate();
	$("#search_date").val(to_day);
	change_date();
    search_semester();
});

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
	search_dashboard();
}

function date_next()
{
	var v_date = cfmAddDate($("#search_date").val(), 1);
	$("#search_date").val(v_date);
	change_date();
	search_dashboard();
}

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
					search_course();
				}else{
					$("#search_course_id").html("<option>반</option>");				
				}
			});
			
			if(data.length > 0){
				search_course();
			}else{
				$("#search_course_id").html("<option>반</option>");		
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

/*
 * 설명 : 반 조회.
 */
function search_course()
{
	$.ajax({
		type : "POST",
		url : "/common/getCourseList.do",
		data:{
			course_group_id:$("#search_course_group_id").val()
		},
		success:function(data){
			courseList = data;
			search_dashboard();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function search_dashboard()
{
	var end_time = "";
	var sDate = $("#search_date").val();
	var wDate = cfmAddDate(sDate, - 8);
	var nDate = cfmAddDate(sDate, 1);
	if(cfmGetToDate() == sDate)
	{
		var v_today = new Date();
		var v_hours = v_today.getHours(); // 시
		var v_minutes = v_today.getMinutes();
		if(v_hours < 10){
			end_time += "0"+v_hours;
		}else{
			end_time += ""+v_hours;
		}
		if(v_minutes < 10){
			end_time += ":0"+v_minutes;
		}else{
			end_time += ":"+v_minutes;
		}
	}
	$.ajax({
		type : "POST",
		url : "/main/getDashboardNewList.do",
		data:{
			course_group_id:$("#search_course_group_id").val(),
			date:sDate,
			bef_week_date:wDate,
			next_date:nDate,
			end_time:end_time
			
		},
		success:function(data){
			sectionList = data.sectionList;
			
			courseGroupInfo = data.courseGroupInfo;
			
			dashboardList = data.dashboardList;
			dashboardSpeechList = data.dashboardSpeechList;
			dashboardVocaList = data.dashboardVocaList;
			dashboardGoalList = data.dashboardGoalList;
			dashboardSylabusList = data.dashboardSylabusList;
			dashboardProblemList = data.dashboardProblemList;
			dashboardAchieveCountList = data.dashboardAchieveCountList;
			dashboardAchieveList = data.dashboardAchieveList;
			dashboardConfidenceCountList = data.dashboardConfidenceCountList;
			dashboardConfidenceList = data.dashboardConfidenceList;
			dashboardNotEffectCountList = data.dashboardNotEffectCountList;
			dashboardJuniorLevelUpList = data.dashboardJuniorLevelUpList;
			dashboardJuniorNotSendList = data.dashboardJuniorNotSendList;
			dashboardNotSchoolList = data.dashboardNotSchoolList;
			
			course_count = courseList.length;
			
			
			$("#table_dashboard").html("");
			
			var nWidth = 75/course_count;

			//화면을 그려본다.
			var vHtml = "";
			
			//col width 설정
			vHtml += '<colgroup>';
			vHtml += '	<col style="width:15%;" />';
			vHtml += '	<col style="width:10%;" />';
			for(var i=0; i<course_count; i++)
			{
				vHtml += '	<col style="width:'+nWidth+'%;" />';
			}
			vHtml += '</colgroup>';
			
			
			//타이틀쪽을 작업한다.
			vHtml += '<thead>';
			
			vHtml += '	<tr>';
			vHtml += '		<th>&nbsp;</th>';
			vHtml += '		<th class="text-center">담당강사</th>';
			for(var i=0; i<course_count; i++)
			{
				vHtml += '		<th class="text-center">'+courseList[i].instructor_name+'</th>';
			}
			vHtml += '	</tr>';

			vHtml += '	<tr>';
			vHtml += '		<th>&nbsp;</th>';
			vHtml += '		<th class="text-center">담당 매니저</th>';
			for(var i=0; i<course_count; i++)
			{
				vHtml += '		<th class="text-center">'+courseList[i].manager_name+'</th>';
			}
			vHtml += '	</tr>';

			vHtml += '	<tr>';
			vHtml += '		<th>&nbsp;</th>';
			vHtml += '		<th class="text-center">학생수</th>';
			for(var i=0; i<course_count; i++)
			{
				var v_course_id = courseList[i].id;
				var c_count = dashboardList.filter(function(item, index){
					//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
					if(item.course_id == v_course_id && item.refund_status != "FULL_REFUND" && item.status == "PAID"){
						return true;
					}
				}).length;
				if(c_count > 0){
					vHtml += '		<th class="text-center">'+c_count+'</th>';
				}else{
					vHtml += '		<th class="text-center"></th>';
				}
			}
			vHtml += '	</tr>';
			
			vHtml += '	<tr>';
			vHtml += '		<th>&nbsp;</th>';
			vHtml += '		<th class="text-center">강의실</th>';
			for(var i=0; i<course_count; i++)
			{
				vHtml += '		<th class="text-center">'+cfmNvl1(courseList[i].building_name)+' '+cfmNvl1(courseList[i].room_no)+'</th>';
			}
			vHtml += '	</tr>';
			
			
			vHtml += '	<tr>';
			vHtml += '		<th>반</th>';
			vHtml += '		<th class="text-center">총계</th>';
			for(var i=0; i<course_count; i++)
			{
				vHtml += '		<th class="text-center"><a href="javascript:go_achieve_ot('+courseList[i].id+')">'+courseList[i].name+'</a></th>';
			}
			vHtml += '	</tr>';
			vHtml += '</thead>';
			vHtml += '<tbody>';
			
			//참강URL을 넣는다. 작업한다.
			vHtml += '<thead>';
			vHtml += '	<tr>';
			vHtml += '		<th>참강 강의실</th>';
			vHtml += '		<td>&nbsp;</td>';
			for(var i=0; i<course_count; i++)
			{
				if(courseList[i].zoom_url){
					vHtml += '		<td><a href="'+courseList[i].zoom_url+'" target="_blank">'+courseList[i].zoom_url+'</a></td>';
				}else{
					vHtml += '		<td>&nbsp;</td>';
				}
			}
			vHtml += '	</tr>';
			vHtml += '</thead>';
			vHtml += '<tbody>';
			
			//출석 현재원 최초
			vHtml += create_student();
			
			//이번달 환불(신청/확인/완료)
			vHtml += create_refund();
			
			//신규
			vHtml += create_new_student();
			
			//결석
			vHtml += create_absent();
			
			//지각
			vHtml += create_late();
			
			//목표설정
			vHtml += create_goal();
			
			//SPEECH
			vHtml += create_speech();
			
			//VOCA
			vHtml += create_voca();
			
			//Sylabus
			vHtml += create_sylabus();

			//Problem
			vHtml += create_problem();

			//성취도
			vHtml += create_achieve();

			//신뢰도
			vHtml += create_confidence();
			
			//실기간 성취표 미시행
			vHtml += create_noteffect();
			
			//주니어
			if(courseGroupInfo.student_type == "JUNIOR")
			{
				vHtml += create_levelup();
				vHtml += create_notsend();
			}
			
			//학교 미입력
			vHtml += create_notschool();
			
			vHtml += '</tbody>';

			$("#table_dashboard").html(vHtml);
			
			$("#table_dashboard").tooltip();
			
			//버튼 컨트롤
			$('.show_refund').click(function(e){
				if(show_refund){
					show_refund = false;
					$('.show_refund').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_refund_detail').hide();
				}else{
					show_refund = true;
					$('.show_refund').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_refund_detail').show();
				}
			});

			$('.show_new_student').click(function(e){
				if(show_new_student){
					show_new_student = false;
					$('.show_new_student').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_new_student_detail').hide();
				}else{
					show_new_student = true;
					$('.show_new_student').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_new_student_detail').show();
				}
			});

			$('.show_absend').click(function(e){
				if(show_absend){
					show_absend = false;
					$('.show_absend').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_absend_detail').hide();
				}else{
					show_absend = true;
					$('.show_absend').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_absend_detail').show();
				}
			});

			$('.show_late').click(function(e){
				if(show_late){
					show_late = false;
					$('.show_late').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_late_detail').hide();
				}else{
					show_late = true;
					$('.show_late').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_late_detail').show();
				}
			});

			$('.show_speech').click(function(e){
				if(show_speech){
					show_speech = false;
					$('.show_speech').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_speech_detail').hide();
				}else{
					show_speech = true;
					$('.show_speech').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_speech_detail').show();
				}
			});

			$('.show_voca').click(function(e){
				if(show_voca){
					show_voca = false;
					$('.show_voca').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_voca_detail').hide();
				}else{
					show_voca = true;
					$('.show_voca').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_voca_detail').show();
				}
			});

			$('.show_goal').click(function(e){
				if(show_goalplan){
					show_goalplan = false;
					$('.show_goal').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_goal_detail').hide();
				}else{
					show_goalplan = true;
					$('.show_goal').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_goal_detail').show();
				}
			});
			
			$('.show_sylabus').click(function(e){
				if(show_sylabus){
					show_sylabus = false;
					$('.show_sylabus').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_sylabus_detail').hide();
				}else{
					show_sylabus = true;
					$('.show_sylabus').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_sylabus_detail').show();
				}
			});
			
			$('.show_achieve').click(function(e){
				if(show_achieve){
					show_achieve = false;
					$('.show_achieve').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_achieve_detail').hide();
				}else{
					show_achieve = true;
					$('.show_achieve').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_achieve_detail').show();
				}
			});
			
			$('.show_confidence').click(function(e){
				if(show_confidence){
					show_confidence = false;
					$('.show_confidence').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_confidence_detail').hide();
				}else{
					show_confidence = true;
					$('.show_confidence').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_confidence_detail').show();
				}
			});
			
			$('.show_noteffect').click(function(e){
				if(show_noteffect){
					show_noteffect = false;
					$('.show_noteffect').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_noteffect_detail').hide();
				}else{
					show_noteffect = true;
					$('.show_noteffect').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_noteffect_detail').show();
				}
			});
			
			$('.show_levelup').click(function(e){
				if(show_levelup){
					show_levelup = false;
					$('.show_levelup').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_levelup_detail').hide();
				}else{
					show_levelup = true;
					$('.show_levelup').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_levelup_detail').show();
				}
			});
			
			$('.show_notsend').click(function(e){
				if(show_notsend){
					show_notsend = false;
					$('.show_notsend').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_notsend_detail').hide();
				}else{
					show_notsend = true;
					$('.show_notsend').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_notsend_detail').show();
				}
			});
			
			$('.show_notschool').click(function(e){
				if(show_notschool){
					show_notschool = false;
					$('.show_notschool').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_notschool_detail').hide();
				}else{
					show_notschool = true;
					$('.show_notschool').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_notschool_detail').show();
				}
			});
			
			setTimeout(search_dashboard, 300000);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function create_student()
{
	var vHtml = '';
	
	vHtml += '<tr>';
	vHtml += '<th>출석/현재원/최초</th>';
	
	var f_count = dashboardList.filter(function(item, index){
						if(item.refund_status != "FULL_REFUND"){
							return true;
						}
				}).length;
	var c_count = dashboardList.filter(function(item, index){
							//if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
							if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID"){
								return true;
							}
					}).length;
	var a_count = dashboardList.filter(function(item, index){
							//if(item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
							if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
								return true;
							}
					}).length;
	
	var fc_count = dashboardList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.refund_status != "FULL_REFUND"){
				return true;
			}
	}).length;
	var cc_count = dashboardList.filter(function(item, index){
				//if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
				if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND"  && item.status == "PAID"){
					return true;
				}
		}).length;
	var ac_count = dashboardList.filter(function(item, index){
				//if(item.chamgang_yn == "Y" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
				if(item.chamgang_yn == "Y" && item.current_status == "OK" &&  item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
					return true;
				}
		}).length;

	var rate = Math.round(a_count/f_count * 100);
	var bg_text = "";
	if(rate > 0)
	{
		if(rate >= 80){
			bg_text = "bg-green-lighter";
		}else if(rate >= 60){
			bg_text = "bg-blue-lighter";
		}else if(rate >= 40){
			bg_text = "bg-yellow-lighter";
		}else{
			bg_text = "bg-red-lighter";
		}
		
	}
	vHtml += '<td class="'+bg_text+'" title="최초 인원 '+f_count+'명 대비 오늘의 출석율 '+rate+'%">'+a_count+'/'+c_count+'/'+f_count+'(참강 : '+ac_count+'/'+cc_count+'/'+fc_count+')</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardList.filter(function(item, index){
							if(item.course_id == course_id && item.refund_status != "FULL_REFUND"){
								return true;
							}
					}).length;
		c_count = dashboardList.filter(function(item, index){
								//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
								if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status == "PAID"){
									return true;
								}
						}).length;
		a_count = dashboardList.filter(function(item, index){
								//if(item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
								if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
									return true;
								}
						}).length;
		
		fc_count = dashboardList.filter(function(item, index){
						if(item.chamgang_yn == "Y" && item.course_id == course_id && item.refund_status != "FULL_REFUND"){
							return true;
						}
				}).length;
		cc_count = dashboardList.filter(function(item, index){
						//if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
						if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status == "PAID"){
							return true;
						}
				}).length;
		ac_count = dashboardList.filter(function(item, index){
						//if(item.chamgang_yn == "Y" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
			if(item.current_status == "OK" && item.chamgang_yn == "Y" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
							return true;
						}
				}).length;
		var rate = Math.round(a_count/f_count * 100);
		if(f_count == 0){
			rate = 0;
		}
		bg_text = "";
		if(rate > 0)
		{
			if(rate >= 80){
				bg_text = "bg-green-lighter";
			}else if(rate >= 60){
				bg_text = "bg-blue-lighter";
			}else if(rate >= 40){
				bg_text = "bg-yellow-lighter";
			}else{
				bg_text = "bg-red-lighter";
			}
			
		}
		
		vHtml += '<td class="'+bg_text+'"  title="최초 인원 '+f_count+'명 대비 오늘의 출석율 '+rate+'%">'+a_count+'/'+c_count+'/'+f_count+'(참강 : '+ac_count+'/'+cc_count+'/'+fc_count+')</td>';
	}			
	vHtml += '</tr>';
	
	return vHtml;
}

function create_refund()
{
	var display = "";
	var array_student;
	var vHtml = '';
	if(show_private){
		display = 'style="display:none;"';
	}

	vHtml += '<tr class="refund" '+display+'>';
	vHtml += '<th>이번 달 환불(신청/확인/완료)';
	if(show_refund)
	{
		vHtml += '<div class="show_refund" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_refund" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';
	var f_count = dashboardList.filter(function(item, index){
						if(item.status == "REFUND_REQUESTED"){
							return true;
						}
				}).length;
	var c_count = dashboardList.filter(function(item, index){
							if(item.status == "REFUND_CONFIRMED"){
								return true;
							}
					}).length;
	var a_count = dashboardList.filter(function(item, index){
							if(item.status == "REFUND_COMPLETED"){
								return true;
							}
					}).length;
	var fc_count = dashboardList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.status == "REFUND_REQUESTED"){
				return true;
			}
		}).length;
	var cc_count = dashboardList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.status == "REFUND_CONFIRMED"){
					return true;
				}
		}).length;
	var ac_count = dashboardList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.status == "REFUND_COMPLETED"){
					return true;
				}
		}).length;
	vHtml += '<td>'+f_count+'/'+c_count+'/'+a_count+'(참강 : '+fc_count+'/'+cc_count+'/'+ac_count+')</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardList.filter(function(item, index){
							if(item.course_id == course_id && item.status == "REFUND_REQUESTED"){
								return true;
							}
					}).length;
		c_count = dashboardList.filter(function(item, index){
								if(item.course_id == course_id && item.status == "REFUND_CONFIRMED"){
									return true;
								}
						}).length;
		a_count = dashboardList.filter(function(item, index){
								if(item.course_id == course_id && item.status == "REFUND_COMPLETED"){
									return true;
								}
						}).length;
		fc_count = dashboardList.filter(function(item, index){
					if(item.chamgang_yn == "Y" && item.course_id == course_id && item.status == "REFUND_REQUESTED"){
						return true;
					}
			}).length;
		cc_count = dashboardList.filter(function(item, index){
						if(item.chamgang_yn == "Y" && item.course_id == course_id && item.status == "REFUND_CONFIRMED"){
							return true;
						}
				}).length;
		ac_count = dashboardList.filter(function(item, index){
						if(item.chamgang_yn == "Y" && item.course_id == course_id && item.status == "REFUND_COMPLETED"){
							return true;
						}
				}).length;
		vHtml += '<td>'+f_count+'/'+c_count+'/'+a_count+'(참강 : '+fc_count+'/'+cc_count+'/'+ac_count+')</td>';
	}			
	vHtml += '</tr>';
	
	//학생이 환불 신청
	vHtml += '<tr class="refund show_refund_detail" '+display+'>';
	vHtml += '<th class="text-right">학생이 환불 신청</th>';
	array_student = dashboardList.filter(function(item, index){
							if(item.status == "REFUND_REQUESTED"){
								return true;
							}
					});
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardList.filter(function(item, index){
								if(item.course_id == course_id && item.status == "REFUND_REQUESTED"){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(array_student[j].chamgang_yn == "Y")
			{
				vHtml += '<div class="text-blue" style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].refund_reason+'">'+array_student[j].name+':'+array_student[j].refund_reason+'</div>';
			}else{
				vHtml += '<div style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].refund_reason+'">'+array_student[j].name+':'+array_student[j].refund_reason+'</div>';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
		
	//직원이 환불 신청
	vHtml += '<tr class="refund show_refund_detail" '+display+'>';
	vHtml += '<th class="text-right">직원이 환불 완료</th>';
	array_student = dashboardList.filter(function(item, index){
							if(item.status == "REFUND_CONFIRMED"){
								return true;
							}
					});
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardList.filter(function(item, index){
								if(item.course_id == course_id && item.status == "REFUND_CONFIRMED"){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(array_student[j].chamgang_yn == "Y")
			{
				vHtml += '<div class="text-blue" style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].refund_reason+'">'+array_student[j].name+':'+array_student[j].refund_reason+'</div>';
			}else{
				vHtml += '<div style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].refund_reason+'">'+array_student[j].name+':'+array_student[j].refund_reason+'</div>';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';	
	
	//환불 완료
	vHtml += '<tr class="refund show_refund_detail" '+display+'>';
	vHtml += '<th class="text-right">환불 완료</th>';
	array_student = dashboardList.filter(function(item, index){
							if(item.status == "REFUND_COMPLETED"){
								return true;
							}
					});
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardList.filter(function(item, index){
								if(item.course_id == course_id && item.status == "REFUND_COMPLETED"){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(array_student[j].chamgang_yn == "Y")
			{
				vHtml += '<div class="text-blue" style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].refund_reason+'">'+array_student[j].name+':'+array_student[j].refund_reason+'</div>';
			}else{
				vHtml += '<div style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].refund_reason+'">'+array_student[j].name+':'+array_student[j].refund_reason+'</div>';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	return vHtml;
}

function create_new_student()
{
	var display = '';
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>오늘 신규</th>';
	var f_count = dashboardList.filter(function(item, index){
						if(item.current_new == "OK"){
							return true;
						}
				}).length;	
	var fc_count = dashboardList.filter(function(item, index){
						if(item.chamgang_yn == "Y" && item.current_new == "OK"){
							return true;
						}
				}).length;	
	vHtml += '<td>'+f_count+'(참강: '+fc_count+')</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardList.filter(function(item, index){
							if(item.course_id == course_id && item.current_new == "OK"){
								return true;
							}
					}).length;	
		fc_count = dashboardList.filter(function(item, index){
							if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_new == "OK"){
								return true;
							}
					}).length;	
		vHtml += '<td>'+f_count+'(참강: '+fc_count+')</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr>';
	vHtml += '<th>내일 신규';
	if(show_new_student)
	{
		vHtml += '<div class="show_new_student" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_new_student" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';
	f_count = dashboardList.filter(function(item, index){
			if(item.next_new == "OK"){
				return true;
			}
	}).length;		
	fc_count = dashboardList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.next_new == "OK"){
				return true;
			}
	}).length;		
	vHtml += '<td>'+f_count+'(참강: '+fc_count+')</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardList.filter(function(item, index){
							if(item.course_id == course_id && item.next_new == "OK"){
								return true;
							}
					}).length;			
		fc_count = dashboardList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.next_new == "OK"){
					return true;
				}
		}).length;			
		vHtml += '<td>'+f_count+'(참강: '+fc_count+')</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_new_student_detail" '+display+'>';
	vHtml += '<th>&nbsp;</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		var array_student = dashboardList.filter(function(item, index){
								if(item.course_id == course_id && item.next_new == "OK"){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			if(array_student[j].chamgang_yn == "Y"){
				vHtml += "<span class='text-blue'>"+array_student[j].name+'</span>&nbsp;&nbsp;';
			}else{
				vHtml += array_student[j].name+'&nbsp;&nbsp;';
			}
			
		}	
		vHtml += '</td>'
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_absent()
{
	var display = '';
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>결석';
	if(show_absend)
	{
		vHtml += '<div class="show_absend" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_absend" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';
	
	var f_count = dashboardList.filter(function(item, index){
			//if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_ABSENT" || item.attend_status == "PERMITTED_ABSENT")){
			if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && (item.attend_status == "UNPERMITTED_ABSENT" || item.attend_status == "PERMITTED_ABSENT")){
				return true;
			}
		}).length;
	var c_count = dashboardList.filter(function(item, index){
			//if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "UNPERMITTED_ABSENT"){
			if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "UNPERMITTED_ABSENT"){
				return true;
			}
		}).length;
	var a_count = dashboardList.filter(function(item, index){
			//if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "PERMITTED_ABSENT"){
			if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "PERMITTED_ABSENT"){
				return true;
			}
		}).length;

	var fc_count = dashboardList.filter(function(item, index){
		//if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_ABSENT" || item.attend_status == "PERMITTED_ABSENT")){
		if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && (item.attend_status == "UNPERMITTED_ABSENT" || item.attend_status == "PERMITTED_ABSENT")){
			return true;
		}
	}).length;
	var cc_count = dashboardList.filter(function(item, index){
			//if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "UNPERMITTED_ABSENT"){
			if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "UNPERMITTED_ABSENT"){
				return true;
			}
		}).length;
	var ac_count = dashboardList.filter(function(item, index){
			//if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "PERMITTED_ABSENT"){
			if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "PERMITTED_ABSENT"){
				return true;
			}
		}).length;

	vHtml += '<td>'+f_count+'(<span class="text-danger">'+c_count+'</span>/'+a_count+') 참강:'+fc_count+'(<span class="text-danger">'+cc_count+'</span>/'+ac_count+')</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardList.filter(function(item, index){
				//if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_ABSENT" || item.attend_status == "PERMITTED_ABSENT")){
				if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && (item.attend_status == "UNPERMITTED_ABSENT" || item.attend_status == "PERMITTED_ABSENT")){
					return true;
				}
			}).length;
		c_count = dashboardList.filter(function(item, index){
				//if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "UNPERMITTED_ABSENT"){
				if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "UNPERMITTED_ABSENT"){
					return true;
				}
			}).length;
		a_count = dashboardList.filter(function(item, index){
				//if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "PERMITTED_ABSENT"){
				if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "PERMITTED_ABSENT"){
					return true;
				}
			}).length;
		fc_count = dashboardList.filter(function(item, index){
			//if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_ABSENT" || item.attend_status == "PERMITTED_ABSENT")){
			if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && (item.attend_status == "UNPERMITTED_ABSENT" || item.attend_status == "PERMITTED_ABSENT")){
				return true;
			}
		}).length;
		cc_count = dashboardList.filter(function(item, index){
				//if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "UNPERMITTED_ABSENT"){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "UNPERMITTED_ABSENT"){
					return true;
				}
			}).length;
		ac_count = dashboardList.filter(function(item, index){
				//if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "PERMITTED_ABSENT"){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "PERMITTED_ABSENT"){
					return true;
				}
			}).length;
		vHtml += '<td>'+f_count+'(<span class="text-danger">'+c_count+'</span>/'+a_count+') 참강:'+fc_count+'(<span class="text-danger">'+cc_count+'</span>/'+ac_count+')</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_absend_detail" '+display+'>';
	vHtml += '<th class="text-right">무단 결석</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		array_student = dashboardList.filter(function(item, index){
								//if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "UNPERMITTED_ABSENT"){
								if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "UNPERMITTED_ABSENT"){
									return true;
								}
						});
		if(array_student.length > 0){
			vHtml += '<td class="bg-red text-white">';
		}else{
			vHtml += '<td>';
		}
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			if(array_student[j].chamgang_yn == "Y")
			{
				vHtml += "<span class='text-blue'>"+array_student[j].name+'</span>&nbsp;&nbsp;';
			}else{
				vHtml += array_student[j].name+'&nbsp;&nbsp;';
			}
			
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_absend_detail" '+display+'>';
	vHtml += '<th class="text-right">일반 결석</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardList.filter(function(item, index){
					//if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status == "PERMITTED_ABSENT"){
					if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status == "PERMITTED_ABSENT"){
						return true;
					}
			});		
		for(var j=0; j<array_student.length; j++)
		{
			if(array_student[j].chamgang_yn == "Y")
			{
				vHtml += '<div class="text-blue" style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].reason_type+':'+array_student[j].extra_reason+'">'+array_student[j].name+':'+array_student[j].reason_type+':'+array_student[j].extra_reason+'</div>';
			}else{
				vHtml += '<div style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].reason_type+':'+array_student[j].extra_reason+'">'+array_student[j].name+':'+array_student[j].reason_type+':'+array_student[j].extra_reason+'</div>';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_late()
{
	var display = '';
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>지각';
	if(show_late)
	{
		vHtml += '<div class="show_late" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_late" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	var f_count = dashboardList.filter(function(item, index){
			if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_LATE" || item.attend_status == "PERMITTED_LATE")){
				return true;
			}
		}).length;
	var fc_count = dashboardList.filter(function(item, index){
		if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_LATE" || item.attend_status == "PERMITTED_LATE")){
			return true;
		}
	}).length;


	vHtml += '<td>'+f_count+'(참강: '+fc_count+')</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardList.filter(function(item, index){
				if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_LATE" || item.attend_status == "PERMITTED_LATE")){
					return true;
				}
			}).length;
		fc_count = dashboardList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_LATE" || item.attend_status == "PERMITTED_LATE")){
				return true;
			}
		}).length;
		vHtml += '<td>'+f_count+'(참강: '+fc_count+')</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_late_detail" '+display+'>';
	vHtml += '<th class="text-right">지각 사유</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardList.filter(function(item, index){
								if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && (item.attend_status == "UNPERMITTED_LATE" || item.attend_status == "PERMITTED_LATE") && item.reason_type != ""){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(array_student[j].chamgang_yn == "Y")
			{
				vHtml += '<div class="text-blue" style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].reason_type+':'+array_student[j].extra_reason+'(등원예정:'+array_student[j].will_time+' / 실제등원:'+array_student[j].come_time+'">'+array_student[j].name+':'+array_student[j].reason_type+':'+array_student[j].extra_reason+'(등원예정:'+array_student[j].will_time+' / 실제등원:'+array_student[j].come_time+')</div>';
			}else{
				vHtml += '<div style="width:250px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden" title="'+array_student[j].name+':'+array_student[j].reason_type+':'+array_student[j].extra_reason+'(등원예정:'+array_student[j].will_time+' / 실제등원:'+array_student[j].come_time+'">'+array_student[j].name+':'+array_student[j].reason_type+':'+array_student[j].extra_reason+'(등원예정:'+array_student[j].will_time+' / 실제등원:'+array_student[j].come_time+')</div>';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_goal()
{
	var display = '';
	var vHtml = '';
	if(show_private){
		display = 'style="display:none;"';
	}

	vHtml += '<tr class="goal" '+display+'>';
	
	vHtml += '<th>목표설정 승인 미완료(명수/건수)';
	if(show_speech)
	{
		vHtml += '<div class="show_goal" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_goal" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	
	var fc_array = dashboardGoalList.filter(function(item, index){
		if(item.chamgang_yn == "Y"){
			return true;
		}
	});
	var f_count = dashboardGoalList.length;
	var fc_count = dashboardGoalList.length;
	var r_count = 0;
	var rc_count = 0;
	for(var i=0; i<dashboardGoalList.length; i++)
	{
		r_count += dashboardGoalList[i].goal_not_count;
	}
	for(var i=0; i<fc_array.length; i++)
	{
		rc_count += fc_array[i].goal_not_count;
	}
	if(f_count > 0)
	{
		vHtml += '<td class="bg-red-lighter text-white">'+f_count+'명/'+r_count+'건(참강 : '+fc_count+'명/'+rc_count+'건)</td>';
	}else{
		vHtml += '<td>'+f_count+'명/'+r_count+'건(참강 : '+fc_count+'명/'+rc_count+'건)</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_array = dashboardGoalList.filter(function(item, index){
				if(item.course_id == course_id){
					return true;
				}
			});
		fc_array = dashboardGoalList.filter(function(item, index){
			if(item.course_id == course_id && item.chamgang_yn == "Y"){
				return true;
			}
		});
		f_count = f_array.length;
		fc_count = fc_array.length;
		r_count = 0;
		rc_count = 0;
		for(var j=0; j<f_array.length; j++)
		{
			r_count += f_array[j].goal_not_count;
		}
		for(var j=0; j<fc_array.length; j++)
		{
			rc_count += fc_array[j].goal_not_count;
		}
		if(f_count > 0)
		{
			vHtml += '<td class="bg-red-lighter text-white"><a href="javascript:go_achieve_goal('+course_id+')" class="text-white">'+f_count+'명/'+r_count+'건(참강 : '+fc_count+'명/'+rc_count+'건)</a></td>';
		}else{
			vHtml += '<td>'+f_count+'명/'+r_count+'건(참강 : '+fc_count+'명/'+rc_count+'건)</td>';
		}
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="goal show_goal_detail" '+display+'>';
	vHtml += '<th>&nbsp;</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardGoalList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			if(array_student[j].chamgang_yn == "Y"){
				vHtml += '<a href="javascript:go_student_login(\''+array_student[j].username+'\','+array_student[j].course_enrollment_id+')" class="text-blue">'+array_student[j].name+'</a>&nbsp;&nbsp;';
			}else{
				vHtml += '<a href="javascript:go_student_login(\''+array_student[j].username+'\','+array_student[j].course_enrollment_id+')" class="text-dark">'+array_student[j].name+'</a>&nbsp;&nbsp;';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_speech()
{
	var display = '';
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>발음 80% 이상 O/X';
	if(show_speech)
	{
		vHtml += '<div class="show_speech" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_speech" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	
	var f_count = dashboardSpeechList.filter(function(item, index){
			if(item.pass_result == true){
				return true;
			}
		}).length;

	var r_count = dashboardSpeechList.filter(function(item, index){
			if(item.pass_result == false){
				return true;
			}
		}).length;

	var fc_count = dashboardSpeechList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.pass_result == true){
				return true;
			}
		}).length;
	
	var rc_count = dashboardSpeechList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.pass_result == false){
				return true;
			}
		}).length;
	
	vHtml += '<td>'+f_count+'/<span class="text-danger">'+r_count+'</span>(참강: '+fc_count+'/<span class="text-danger">'+rc_count+'</span>)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardSpeechList.filter(function(item, index){
				if(item.course_id == course_id && item.pass_result == true){
					return true;
				}
			}).length;
		
		r_count = dashboardSpeechList.filter(function(item, index){
				if(item.course_id == course_id && item.pass_result == false){
					return true;
				}
			}).length;
		fc_count = dashboardSpeechList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.pass_result == true){
					return true;
				}
			}).length;
		
		rc_count = dashboardSpeechList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.pass_result == false){
					return true;
				}
			}).length;
		vHtml += '<td>'+f_count+'/<span class="text-danger">'+r_count+'</span>(참강: '+fc_count+'/<span class="text-danger">'+rc_count+'</span>)</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_speech_detail" '+display+'>';
	vHtml += '<th class="text-right">80% 이상 불합격 - 토플 VOCA</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardSpeechList.filter(function(item, index){
								if(item.course_id == course_id && item.pass_result == false && item.book == "toefl"){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			if(array_student[j].chamgang_yn == "Y"){
				vHtml += '<span class="text-blue">'+array_student[j].name+'</span>&nbsp;&nbsp;';
			}else{
				vHtml += array_student[j].name+'&nbsp;&nbsp;';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_speech_detail" '+display+'>';
	vHtml += '<th class="text-right">80% 이상 불합격 - 중고등 VOCA</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardSpeechList.filter(function(item, index){
								if(item.course_id == course_id && item.pass_result == false && item.book == "basic"){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			if(array_student[j].chamgang_yn == "Y"){
				vHtml += '<span class="text-blue">'+array_student[j].name+'</span>&nbsp;&nbsp;';
			}else{
				vHtml += array_student[j].name+'&nbsp;&nbsp;';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_voca()
{
	var display = '';
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>VOCA 90% 이상 O/X';
	if(show_voca)
	{
		vHtml += '<div class="show_voca" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_voca" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	
	var f_count = dashboardVocaList.filter(function(item, index){
			if(item.pass_result == true){
				return true;
			}
		}).length;

	var r_count = dashboardVocaList.filter(function(item, index){
			if(item.pass_result == false){
				return true;
			}
		}).length;

	var fc_count = dashboardVocaList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.pass_result == true){
				return true;
			}
		}).length;
	
	var rc_count = dashboardVocaList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.pass_result == false){
				return true;
			}
		}).length;
	
	vHtml += '<td>'+f_count+'/<span class="text-danger">'+r_count+'</span>(참강: '+fc_count+'/<span class="text-danger">'+rc_count+'</span>)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardVocaList.filter(function(item, index){
				if(item.course_id == course_id && item.pass_result == true){
					return true;
				}
			}).length;
		
		r_count = dashboardVocaList.filter(function(item, index){
				if(item.course_id == course_id && item.pass_result == false){
					return true;
				}
			}).length;
		fc_count = dashboardVocaList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.pass_result == true){
					return true;
				}
			}).length;
		
		rc_count = dashboardVocaList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.pass_result == false){
					return true;
				}
			}).length;
		vHtml += '<td>'+f_count+'/<span class="text-danger">'+r_count+'</span>(참강: '+fc_count+'/<span class="text-danger">'+rc_count+'</span>)</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_voca_detail" '+display+'>';
	vHtml += '<th class="text-right">90% 이상 불합격 - 토플 VOCA</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardVocaList.filter(function(item, index){
								if(item.course_id == course_id && item.pass_result == false && item.book == "toefl"){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			if(array_student[j].chamgang_yn == "Y"){
				vHtml += '<span class="text-blue">'+array_student[j].name+'</span>&nbsp;&nbsp;';
			}else{
				vHtml += array_student[j].name+'&nbsp;&nbsp;';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_voca_detail" '+display+'>';
	vHtml += '<th class="text-right">90% 이상 불합격 - 중고등 VOCA</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardVocaList.filter(function(item, index){
								if(item.course_id == course_id && item.pass_result == false && item.book == "basic"){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			if(array_student[j].chamgang_yn == "Y"){
				vHtml += '<span class="text-blue">'+array_student[j].name+'</span>&nbsp;&nbsp;';
			}else{
				vHtml += array_student[j].name+'&nbsp;&nbsp;';
			}
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_sylabus()
{
	var display = '';
	var vHtml = '';
	if(show_private){
		display = 'style="display:none;"';
	}

	vHtml += '<tr class="sylabus" '+display+'>';
	vHtml += '<th>실라버스 기입  O/X';

	if(show_sylabus)
	{
		vHtml += '<div class="show_sylabus" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_sylabus" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		var f_array = dashboardSylabusList.filter(function(item, index){
				if(item.course_id == course_id){
					return true;
				}
			});
		var f_count = 0;
		var r_count = 0;
		for(var j=0; j<f_array.length; j++)
		{
			f_count += f_array[j].section_all_count;
			r_count += f_array[j].section_all_not_count;
		}
		vHtml += '<td>'+f_count+'/<span class="text-danger">'+r_count+'</span></td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="sylabus show_sylabus_detail" '+display+'>';
	vHtml += '<th class="text-right">월 전체 O/X</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		var f_array = dashboardSylabusList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		});
		for(var j=0; j<f_array.length; j++)
		{
			if(j > 0){
				vHtml += "<br>";
			}
			vHtml += f_array[j].section_short+' : '+f_array[j].section_all_count+'/<span class="text-danger">'+f_array[j].section_all_not_count+'</span>';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="sylabus show_sylabus_detail" '+display+'>';
	vHtml += '<th class="text-right">오늘 실라버스 O/X</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		var f_array = dashboardSylabusList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		});
		for(var j=0; j<f_array.length; j++)
		{
			if(j > 0){
				vHtml += "<br>";
			}
			vHtml += f_array[j].section_short+' : '+f_array[j].section_cur_count+'/<span class="text-danger">'+f_array[j].section_cur_not_count+'</span>';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class=" sylabus show_sylabus_detail" '+display+'>';
	vHtml += '<th class="text-right">내일 실라버스 O/X</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		var f_array = dashboardSylabusList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		});
		for(var j=0; j<f_array.length; j++)
		{
			if(j > 0){
				vHtml += "<br>";
			}
			vHtml += f_array[j].section_short+' : '+f_array[j].section_next_count+'/<span class="text-danger">'+f_array[j].section_next_not_count+'</span>';
		}	
		
		vHtml += '</td>';
	}
	vHtml += '</tr>';

	return vHtml;
}

function create_problem()
{
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>오늘 교재/지문</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		var f_array = dashboardProblemList.filter(function(item, index){
				if(item.course_id == course_id){
					return true;
				}
			});
		vHtml += '<td>';
		for(var j=0; j<f_array.length; j++)
		{
			if(j>0) vHtml += "<br>";
			vHtml += f_array[j].section_short+": "+f_array[j].passage;
		}
		vHtml += '</td>';

	}
	vHtml += '</tr>';
	return vHtml;
}

function create_achieve()
{
	var display = '';
	var vHtml = '';

	vHtml += '<tr>';
	vHtml += '<th>반 성취도';

	if(show_achieve)
	{
		vHtml += '<div class="show_achieve" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_achieve" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	var t_count = 0;
	var s_count = 0;
	for(var i=0; i<dashboardAchieveCountList.length; i++)
	{
		t_count += dashboardAchieveCountList[i].total_count;
		s_count += dashboardAchieveCountList[i].success_count;
	}
	var rate = Math.round(s_count/t_count * 100);
	var bg_text = "";
	if(t_count > 0)
	{
		if(rate >= 80){
			bg_text = "bg-green-lighter";
		}else if(rate >= 60){
			bg_text = "bg-blue-lighter";
		}else if(rate >= 40){
			bg_text = "bg-yellow-lighter";
		}else{
			bg_text = "bg-red-lighter";
		}
		vHtml += '<td class="'+bg_text+' text-center" title="전 학생 합격 내신 '+t_count+'개 대비 오늘의 합격 내신 '+s_count+'개">'+rate+'%</td>';
	}else{
		vHtml += '<td>&nbsp;</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		var a_idx = dashboardAchieveCountList.findIndex(t => t.course_id == course_id);
		if(a_idx < 0)
		{
			vHtml += '<td>&nbsp;</td>';
		}else{
			t_count = dashboardAchieveCountList[a_idx].total_count;
			s_count = dashboardAchieveCountList[a_idx].success_count;
			rate = Math.round(s_count/t_count * 100);
			bg_text = "";
			
			if(rate >= 80){
				bg_text = "bg-green-lighter";
			}else if(rate >= 60){
				bg_text = "bg-blue-lighter";
			}else if(rate >= 40){
				bg_text = "bg-yellow-lighter";
			}else{
				bg_text = "bg-red-lighter";
			}
			vHtml += '<td class="'+bg_text+' text-center" title="전 학생 합격 내신 '+t_count+'개 대비 오늘의 합격 내신 '+s_count+'개">'+rate+'%</td>';
		}
		
	}
	vHtml += '</tr>';
	
	//상
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">상</th>';
	var t_count = dashboardAchieveList.length;
	
	var f_count = dashboardAchieveList.filter(function(item, index){
		if(item.achieve_level == 'H'){
			return true;
		}
	}).length;
	var r_rate = 0
	if(t_count > 0)	r_rate = Math.floor(f_count/t_count * 100);
	vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		t_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		}).length;
		
		f_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'H'){
				return true;
			}
		}).length;
		
		r_rate = 0
		if(t_count > 0)
		{
			r_rate = Math.floor(f_count/t_count * 100);
			vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
		}else{
			vHtml += '<td class="text-center">&nbsp;</td>';
		}
		
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td class="text-center">&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		array_student = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'H'){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	//중
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">중</th>';
	var t_count = dashboardAchieveList.length;
	
	var f_count = dashboardAchieveList.filter(function(item, index){
		if(item.achieve_level == 'M'){
			return true;
		}
	}).length;
	var r_rate = 0
	if(t_count > 0)	r_rate = Math.floor(f_count/t_count * 100);
	vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		t_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		}).length;
		
		f_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'M'){
				return true;
			}
		}).length;
		
		r_rate = 0
		if(t_count > 0)
		{
			r_rate = Math.floor(f_count/t_count * 100);
			vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
		}else{
			vHtml += '<td class="text-center">&nbsp;</td>';
		}
		
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td class="text-center">&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		array_student = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'M'){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	//하(자기목표 O)
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">하(자기목표 O)</th>';
	var t_count = dashboardAchieveList.length;
	
	var f_count = dashboardAchieveList.filter(function(item, index){
		if(item.achieve_level == 'L1'){
			return true;
		}
	}).length;
	var r_rate = 0
	if(t_count > 0)	r_rate = Math.floor(f_count/t_count * 100);
	vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		t_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		}).length;
		
		f_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'L1'){
				return true;
			}
		}).length;
		
		r_rate = 0
		if(t_count > 0)
		{
			r_rate = Math.floor(f_count/t_count * 100);
			vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
		}else{
			vHtml += '<td class="text-center">&nbsp;</td>';
		}
		
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td class="text-center">&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		array_student = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'L1'){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	//하(자기목표 X)
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">하(자기목표 X)</th>';
	var t_count = dashboardAchieveList.length;
	
	var f_count = dashboardAchieveList.filter(function(item, index){
		if(item.achieve_level == 'L2'){
			return true;
		}
	}).length;
	var r_rate = 0
	if(t_count > 0)	r_rate = Math.floor(f_count/t_count * 100);
	vHtml += '<td class="text-center bg-red-lighter text-white">'+f_count+'명('+r_rate+'%)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		t_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		}).length;
		
		f_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'L2'){
				return true;
			}
		}).length;
		
		r_rate = 0
		if(t_count > 0)
		{
			r_rate = Math.floor(f_count/t_count * 100);
			vHtml += '<td class="text-center bg-red-lighter text-white">'+f_count+'명('+r_rate+'%)</td>';
		}else{
			vHtml += '<td class="text-center">&nbsp;</td>';
		}
		
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td class="text-center">&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		array_student = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'L2'){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	//극하
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">극하</th>';
	var t_count = dashboardAchieveList.length;
	
	var f_count = dashboardAchieveList.filter(function(item, index){
		if(item.achieve_level == 'LL'){
			return true;
		}
	}).length;
	var r_rate = 0
	if(t_count > 0)	r_rate = Math.floor(f_count/t_count * 100);
	vHtml += '<td class="text-center bg-red-lighter text-white">'+f_count+'명('+r_rate+'%)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		t_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		}).length;
		
		f_count = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'LL'){
				return true;
			}
		}).length;
		
		r_rate = 0
		if(t_count > 0)
		{
			r_rate = Math.floor(f_count/t_count * 100);
			vHtml += '<td class="text-center bg-red-lighter text-white">'+f_count+'명('+r_rate+'%)</td>';
		}else{
			vHtml += '<td class="text-center">&nbsp;</td>';
		}
		
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_achieve_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td class="text-center">&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		array_student = dashboardAchieveList.filter(function(item, index){
			if(item.course_id == course_id && item.achieve_level == 'LL'){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_confidence()
{
	var display = '';
	var vHtml = '';

	vHtml += '<tr>';
	vHtml += '<th>반 신뢰도';

	if(show_confidence)
	{
		vHtml += '<div class="show_confidence" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_confidence" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	var t_count = 0;
	var s_count = 0;
	for(var i=0; i<dashboardConfidenceCountList.length; i++)
	{
		t_count += dashboardConfidenceCountList[i].total_count;
		s_count += dashboardConfidenceCountList[i].success_count;
	}
	var rate = Math.round(s_count/t_count * 100);
	var bg_text = "";
	if(t_count > 0)
	{
		if(rate >= 80){
			bg_text = "bg-green-lighter";
		}else if(rate >= 60){
			bg_text = "bg-blue-lighter";
		}else if(rate >= 40){
			bg_text = "bg-yellow-lighter";
		}else{
			bg_text = "bg-red-lighter";
		}
		vHtml += '<td class="'+bg_text+' text-center" title="총 목표 합격 내신 '+t_count+'개 대비 오늘의 합격 내신 '+s_count+'개">'+rate+'%</td>';
	}else{
		vHtml += '<td>&nbsp;</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		var a_idx = dashboardConfidenceCountList.findIndex(t => t.course_id == course_id);
		if(a_idx < 0)
		{
			vHtml += '<td>&nbsp;</td>';
		}else{
			t_count = dashboardConfidenceCountList[a_idx].total_count;
			s_count = dashboardConfidenceCountList[a_idx].success_count;
			rate = Math.round(s_count/t_count * 100);
			bg_text = "";
			
			if(rate >= 80){
				bg_text = "bg-green-lighter";
			}else if(rate >= 60){
				bg_text = "bg-blue-lighter";
			}else if(rate >= 40){
				bg_text = "bg-yellow-lighter";
			}else{
				bg_text = "bg-red-lighter";
			}
			vHtml += '<td class="'+bg_text+' text-center" title="전 목표 합격 내신 '+t_count+'개 대비 오늘의 합격 내신 '+s_count+'개">'+rate+'%</td>';
		}
		
	}
	vHtml += '</tr>';
	//상
	vHtml += '<tr class="show_confidence_detail" '+display+'>';
	vHtml += '<th class="text-right">상</th>';
	var t_count = dashboardConfidenceList.length;
	
	var f_count = dashboardConfidenceList.filter(function(item, index){
		if(item.total_rate == 100){
			return true;
		}
	}).length;
	var r_rate = 0
	if(t_count > 0)	r_rate = Math.floor(f_count/t_count * 100);
	vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		t_count = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		}).length;
		
		f_count = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id && item.total_rate == 100){
				return true;
			}
		}).length;
		
		r_rate = 0
		if(t_count > 0)
		{
			r_rate = Math.floor(f_count/t_count * 100);
			vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
		}else{
			vHtml += '<td class="text-center">&nbsp;</td>';
		}
		
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_confidence_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td class="text-center">&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		array_student = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id && item.total_rate == 100){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';

	//중
	vHtml += '<tr class="show_confidence_detail" '+display+'>';
	vHtml += '<th class="text-right">중</th>';
	var t_count = dashboardConfidenceList.length;
	
	var f_count = dashboardConfidenceList.filter(function(item, index){
		if(item.total_rate < 100 && item.total_rate >= 80 ){
			return true;
		}
	}).length;
	var r_rate = 0
	if(t_count > 0)	r_rate = Math.floor(f_count/t_count * 100);
	vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		t_count = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		}).length;
		
		f_count = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id && item.total_rate < 100 && item.total_rate >= 80){
				return true;
			}
		}).length;
		
		r_rate = 0
		if(t_count > 0)
		{
			r_rate = Math.floor(f_count/t_count * 100);
			vHtml += '<td class="text-center">'+f_count+'명('+r_rate+'%)</td>';
		}else{
			vHtml += '<td class="text-center">&nbsp;</td>';
		}
		
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_confidence_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td class="text-center">&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		array_student = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id && item.total_rate < 100 && item.total_rate >= 80){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	//하
	vHtml += '<tr class="show_confidence_detail" '+display+'>';
	vHtml += '<th class="text-right">하</th>';
	var t_count = dashboardConfidenceList.length;
	
	var f_count = dashboardConfidenceList.filter(function(item, index){
		if(item.total_rate < 80){
			return true;
		}
	}).length;
	var r_rate = 0
	if(t_count > 0)	r_rate = Math.floor(f_count/t_count * 100);
	vHtml += '<td class="text-center bg-red-lighter text-white">'+f_count+'명('+r_rate+'%)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		t_count = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		}).length;
		
		f_count = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id && item.total_rate < 80){
				return true;
			}
		}).length;
		
		r_rate = 0
		if(t_count > 0)
		{
			r_rate = Math.floor(f_count/t_count * 100);
			vHtml += '<td class="text-center bg-red-lighter text-white">'+f_count+'명('+r_rate+'%)</td>';
		}else{
			vHtml += '<td class="text-center">&nbsp;</td>';
		}
		
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_confidence_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td class="text-center">&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		vHtml += '<td>';
		array_student = dashboardConfidenceList.filter(function(item, index){
			if(item.course_id == course_id && item.total_rate < 80){
				return true;
			}
		});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	
	return vHtml;	
}

function create_noteffect()
{
	var display = '';
	var vHtml = '';
	if(show_private){
		display = 'style="display:none;"';
	}

	vHtml += '<tr class="noteffect" '+display+'>';
	vHtml += '<th>실시간 성취표 미시행 갯수';

	if(show_confidence)
	{
		vHtml += '<div class="show_noteffect" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_noteffect" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	var t_count = 0;
	for(var i=0; i<dashboardNotEffectCountList.length; i++)
	{
		t_count += dashboardNotEffectCountList[i].total_count;
	}
	if(t_count > 0)
	{
		vHtml += '<td>'+t_count+'</td>';
	}else{
		vHtml += '<td>&nbsp;</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		var f_array = dashboardNotEffectCountList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		});
		t_count = 0;
		for(var j=0; j<f_array.length; j++)
		{
			t_count += f_array[j].total_count;
		}
		if(t_count > 0)
		{
			vHtml += '<td><a href="javascript:go_achieve('+course_id+',\'all\',\''+$("#search_date").val()+'\')">'+t_count+'</a></td>';
		}else{
			vHtml += '<td>&nbsp;</td>';
		}
	}
	for(var i=0; i<sectionList.length; i++)
	{
		var section = sectionList[i].section;
		var short_title = sectionList[i].short_title_kr;
		vHtml += '<tr class="noteffect show_noteffect_detail" '+display+'>';
		vHtml += '<th class="text-right">'+short_title+'</th>';
		var f_array = dashboardNotEffectCountList.filter(function(item, index){
			if(item.section == section){
				return true;
			}
		});
		t_count = 0;
		for(var j=0; j<f_array.length; j++)
		{
			t_count += f_array[j].total_count;
		}
		if(t_count > 0)
		{
			vHtml += '<td>'+t_count+'</td>';
		}else{
			vHtml += '<td>&nbsp;</td>';
		}
		for(var j=0; j<course_count; j++)
		{
			var course_id = courseList[j].id;
			var a_idx = dashboardNotEffectCountList.findIndex(t => t.course_id == course_id && t.section == section);
			if(a_idx >= 0)
			{
				if(dashboardNotEffectCountList[a_idx].total_count > 0)
				{
					vHtml += '<td><a href="javascript:go_achieve('+course_id+',\''+section+'\',\''+$("#search_date").val()+'\')">'+dashboardNotEffectCountList[a_idx].total_count+'</a></td>';
				}else{
					vHtml += '<td>&nbsp;</td>';
				}
			}else{
				vHtml += '<td>&nbsp;</td>';
			}
		}
		
	}
	vHtml += '</tr>';
	
	return vHtml;	
}

function create_levelup()
{
	var display = '';
	var vHtml = '';
	if(show_private){
		display = 'style="display:none;"';
	}

	vHtml += '<tr class="levelup" '+display+'>';
	vHtml += '<th>오늘 주니어 승반 시험 가능자';

	if(show_levelup)
	{
		vHtml += '<div class="show_levelup" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_levelup" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	var t_count = dashboardJuniorLevelUpList.length;
	if(t_count > 0)
	{
		vHtml += '<td>'+t_count+'</td>';
	}else{
		vHtml += '<td>&nbsp;</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		var f_array = dashboardJuniorLevelUpList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		});
		t_count = f_array.length;
		if(t_count > 0)
		{
			vHtml += '<td>'+t_count+'</td>';
		}else{
			vHtml += '<td>&nbsp;</td>';
		}
	}
	
	vHtml += '</tr>';
	vHtml += '<tr class="levelup show_levelup_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		var array_student = dashboardJuniorLevelUpList.filter(function(item, index){
								if(item.course_id == course_id){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_notsend()
{
	var display = '';
	var vHtml = '';
	if(show_private){
		display = 'style="display:none;"';
	}

	vHtml += '<tr class="notsend" '+display+'>';
	vHtml += '<th>학부모 성취표 미전송 갯수';

	if(show_notsend)
	{
		vHtml += '<div class="show_notsend" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_notsend" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	var t_count = 0;
	for(var i=0; i<dashboardJuniorNotSendList.length;i++)
	{
		t_count += dashboardJuniorNotSendList[i].total_count
	}
	if(t_count > 0)
	{
		vHtml += '<td>'+t_count+'</td>';
	}else{
		vHtml += '<td>&nbsp;</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		var a_idx = dashboardJuniorNotSendList.findIndex(t => t.course_id == course_id);
		
		t_count = 0;
		if(a_idx >= 0){
			t_count = dashboardJuniorNotSendList[a_idx].total_count;
		}
		if(t_count > 0)
		{
			vHtml += '<td>'+t_count+'</td>';
		}else{
			vHtml += '<td>&nbsp;</td>';
		}
	}
	
	vHtml += '</tr>';
	vHtml += '<tr class="notsend show_notsend_detail" '+display+'>';
	vHtml += '<th class="text-right">어제</th>';
	t_count = 0;
	for(var i=0; i<dashboardJuniorNotSendList.length;i++)
	{
		t_count += dashboardJuniorNotSendList[i].total_prev_count
	}
	if(t_count > 0)
	{
		vHtml += '<td>'+t_count+'</td>';
	}else{
		vHtml += '<td>&nbsp;</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		var a_idx = dashboardJuniorNotSendList.findIndex(t => t.course_id == course_id);
		
		t_count = 0;
		if(a_idx >= 0){
			t_count = dashboardJuniorNotSendList[a_idx].total_prev_count;
		}
		if(t_count > 0)
		{
			vHtml += '<td>'+t_count+'</td>';
		}else{
			vHtml += '<td>&nbsp;</td>';
		}
	}
	vHtml += '</tr>';
	vHtml += '<tr class="show_notsend_detail" '+display+'>';
	vHtml += '<th class="text-right">오늘</th>';
	t_count = 0;
	for(var i=0; i<dashboardJuniorNotSendList.length;i++)
	{
		t_count += dashboardJuniorNotSendList[i].total_curr_count
	}
	if(t_count > 0)
	{
		vHtml += '<td>'+t_count+'</td>';
	}else{
		vHtml += '<td>&nbsp;</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		
		var a_idx = dashboardJuniorNotSendList.findIndex(t => t.course_id == course_id);
		
		t_count = 0;
		if(a_idx >= 0){
			t_count = dashboardJuniorNotSendList[a_idx].total_curr_count;
		}
		if(t_count > 0)
		{
			vHtml += '<td>'+t_count+'</td>';
		}else{
			vHtml += '<td>&nbsp;</td>';
		}
	}
	vHtml += '</tr>';
	return vHtml;
}

function create_notschool()
{
	var display = '';
	var vHtml = '';
	if(show_private){
		display = 'style="display:none;"';
	}

	vHtml += '<tr class="notschool" '+display+'>';
	vHtml += '<th>학교 미기입자';

	if(show_confidence)
	{
		vHtml += '<div class="show_notschool" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_notschool" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';	
	var t_count = dashboardNotSchoolList.length;
	if(t_count > 0)
	{
		vHtml += '<td>'+t_count+'</td>';
	}else{
		vHtml += '<td>&nbsp;</td>';
	}
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		var f_array = dashboardNotSchoolList.filter(function(item, index){
			if(item.course_id == course_id){
				return true;
			}
		});
		t_count = f_array.length;
		if(t_count > 0)
		{
			vHtml += '<td>'+t_count+'</td>';
		}else{
			vHtml += '<td>&nbsp;</td>';
		}
	}
	
	vHtml += '</tr>';
	vHtml += '<tr class="notschool show_notschool_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		var array_student = dashboardNotSchoolList.filter(function(item, index){
								if(item.course_id == course_id){
									return true;
								}
						});
		for(var j=0; j<array_student.length; j++)
		{
			if(j > 0 && j%5 ==0){
				vHtml += "<br>";
			}
			vHtml += array_student[j].name+'&nbsp;&nbsp;';
		}	
		vHtml += '</td>';
	}
	vHtml += '</tr>';
	return vHtml;
}

function go_achieve_goal(v_course_id)
{
	window.open("/enrollment/achievement_new_action.do?orientation_code=goal&&course_id="+v_course_id, "achieve_goal");
}

function go_achieve(v_course_id, v_section, v_date)
{
	if(v_section == "all"){
		window.open("/enrollment/achievement_new_action.do?orientation_code=all&&course_id="+v_course_id+"&&date="+v_date, "achieve");
	}else if(v_section == "VOCA"){
		window.open("/enrollment/achievement_new_action.do?orientation_code=voca&&course_id="+v_course_id, "achieve");
	}else{
		window.open("/enrollment/achievement_new_action.do?orientation_code=all_practice&&section="+v_section+"&&course_id="+v_course_id, "achieve");
	}
}
var s_username;
var s_course_enrollment_id;
function go_student_login(username, course_enrollment_id)
{
	s_username = username;
	s_course_enrollment_id = course_enrollment_id;
	$.ajax({
		type : "POST",
		url : "/common/getCourseenrollmentAttend.do",
		data:{
			course_enrollment_id:course_enrollment_id
		},
		success:function(data){
			if(data.status == "UNPERMITTED_ABSENT" || data.status == "PERMITTED_ABSENT" ){
				swal({
					title: '미출석',
					text: '이 학생은 아직 출석처리되지 않은 학생입니다.\n직원이 로그인 하게되면 학생이 출석처리가 되어버립니다.\n그래도 로그인 하시겠습니까?',
					icon: 'info',
					buttons: {
						cancel: {
							text: '아니오',
							value: null,
							visible: true,
							className: 'btn btn-default',
							closeModal: true,
						},
						confirm: {
							text: '로그인',
							value: true,
							visible: true,
							className: 'btn btn-primary',
							closeModal: true
						}
					}
				}).then((confirm) => {
				    if (confirm) {
						var exam_url = "http://exam.usher.co.kr/";
						//var exam_url = "http://127.0.0.1:8080/";
						var url = exam_url + "/member/login_manage.do?username="+s_username+"&&course_enrollment_id="+s_course_enrollment_id;
						window.open(url, "student_exam");
				    }
				});
			}else{
				var exam_url = "http://exam.usher.co.kr/";
				//var exam_url = "http://127.0.0.1:8080/";
				var url = exam_url + "/member/login_manage.do?username="+s_username+"&&course_enrollment_id="+s_course_enrollment_id;
				window.open(url, "student_exam");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function go_achieve_ot(v_course_id)
{
	window.open("/enrollment/achievement_new_action.do?orientation_code=ot&&course_id="+v_course_id, "achieve_ot");
}