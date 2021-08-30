var show_refund = true;
var show_new_student = true;
var show_absend = true;
var show_late = true;
var show_speech = true;
var show_voca = true;
var show_goalplan = true;
var show_goalarchive = true;
var show_goalconfirm = true;

var show_private = false;

var courseList;
var dashboardList;
var dashboardSpeechList;
var dashboardVocaList;
var dashboardGoalList;
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
			show_private = true;
		}else{
			$(".refund").show();
			if(show_refund){
				$('.show_refund').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_refund_detail').show();
			}else{
				$('.show_refund').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_refund_detail').hide();
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
	
	var sDate = $("#search_date").val();
	var wDate = cfmAddDate(sDate, - 8);
	var nDate = cfmAddDate(sDate, 1);
	$.ajax({
		type : "POST",
		url : "/main/getDashboardList.do",
		data:{
			course_group_id:$("#search_course_group_id").val(),
			date:sDate,
			bef_week_date:wDate,
			next_date:nDate
			
		},
		success:function(data){
			dashboardList = data.dashboardList;
			dashboardSpeechList = data.dashboardSpeechList;
			dashboardVocaList = data.dashboardVocaList;
			dashboardGoalList = data.dashboardGoalList;
			
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
			vHtml += '		<th>반</th>';
			vHtml += '		<th>총계</th>';
			for(var i=0; i<course_count; i++)
			{
				vHtml += '		<th>'+courseList[i].name+'</th>';
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
			
			//SPEECH
			vHtml += create_speech();
			
			//VOCA
			vHtml += create_voca();
			
			//목표설정
			vHtml += create_goalplan();
			
			//목표제출
			vHtml += create_goalarchive();
			
			//목표승인
			vHtml += create_goalconfirm();

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

			$('.show_goalplan').click(function(e){
				if(show_goalplan){
					show_goalplan = false;
					$('.show_goalplan').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_goalplan_detail').hide();
				}else{
					show_goalplan = true;
					$('.show_goalplan').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_goalplan_detail').show();
				}
			});
			
			$('.show_goalarchive').click(function(e){
				if(show_goalarchive){
					show_goalarchive = false;
					$('.show_goalarchive').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_goalarchive_detail').hide();
				}else{
					show_goalarchive = true;
					$('.show_goalarchive').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_goalarchive_detail').show();
				}
			});

			$('.show_goalconfirm').click(function(e){
				if(show_goalconfirm){
					show_goalconfirm = false;
					$('.show_goalconfirm').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
					$('.show_goalconfirm_detail').hide();
				}else{
					show_goalconfirm = true;
					$('.show_goalconfirm').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
					$('.show_goalconfirm_detail').show();
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
							if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
								return true;
							}
					}).length;
	var a_count = dashboardList.filter(function(item, index){
							if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
								return true;
							}
					}).length;
	
	var fc_count = dashboardList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.refund_status != "FULL_REFUND"){
				return true;
			}
	}).length;
	var cc_count = dashboardList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
					return true;
				}
		}).length;
	var ac_count = dashboardList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
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
			if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status == "PAID" && item.attend_status != "UNPERMITTED_ABSENT" && item.attend_status != "PERMITTED_ABSENT"){
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

function create_speech()
{
	var display = '';
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>발음 80% 이상 토플/중고등';
	if(show_speech)
	{
		vHtml += '<div class="show_speech" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_speech" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';
	
	var f_count = dashboardSpeechList.filter(function(item, index){
			if(item.book == "toefl"){
				return true;
			}
		}).length;

	var r_count = dashboardSpeechList.filter(function(item, index){
			if(item.book == "basic"){
				return true;
			}
		}).length;

	var fc_count = dashboardSpeechList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.book == "toefl"){
				return true;
			}
		}).length;
	
	var rc_count = dashboardSpeechList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.book == "basic"){
				return true;
			}
		}).length;
	

	vHtml += '<td>'+f_count+'/'+r_count+'(참강: '+fc_count+'/'+rc_count+')</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardSpeechList.filter(function(item, index){
				if(item.course_id == course_id && item.book == "toefl"){
					return true;
				}
			}).length;
		
		r_count = dashboardSpeechList.filter(function(item, index){
				if(item.course_id == course_id && item.book == "basic"){
					return true;
				}
			}).length;
		fc_count = dashboardSpeechList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.book == "toefl"){
					return true;
				}
			}).length;
		
		rc_count = dashboardSpeechList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.book == "basic"){
					return true;
				}
			}).length;
		vHtml += '<td>'+f_count+'/'+r_count+'(참강: '+fc_count+'/'+rc_count+')</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_speech_detail" '+display+'>';
	vHtml += '<th class="text-right">80% 이상 합격 - 토플</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardSpeechList.filter(function(item, index){
								if(item.course_id == course_id && item.book == "toefl"){
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
	vHtml += '<th class="text-right">80% 이상 합격 - 중고등</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardSpeechList.filter(function(item, index){
								if(item.course_id == course_id && item.book == "basic"){
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


function create_goalplan()
{
	var display = '';
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>목표 설정 X';
	if(show_goalplan)
	{
		vHtml += '<div class="show_goalplan" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_goalplan" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';
	
	var f_count = dashboardList.filter(function(item, index){
			if(item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.goal_plan == false){
				return true;
			}
		}).length;

	var fc_count = dashboardList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.goal_plan == false){
				return true;
			}
		}).length;
	vHtml += '<td><span class="text-danger">'+f_count+'</span>(참강 : <span class="text-danger">'+fc_count+'</span>)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardList.filter(function(item, index){
				if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.goal_plan == false){
					return true;
				}
			}).length;
		fc_count = dashboardList.filter(function(item, index){
				if(item.chamgang_yn == "Y" && item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.goal_plan == false){
					return true;
				}
			}).length;
		vHtml += '<td><span class="text-danger">'+f_count+'</span>(참강 : <span class="text-danger">'+fc_count+'</span>)</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_goalplan_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardList.filter(function(item, index){
								if(item.course_id == course_id && item.current_status == "OK" && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED" && item.goal_plan == false){
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

function create_goalarchive()
{
	var display = '';
	var vHtml = '';
	vHtml += '<tr>';
	vHtml += '<th>오늘의 목표 제출 O/X';
	if(show_goalarchive)
	{
		vHtml += '<div class="show_goalarchive" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_goalarchive" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';
	
	var f_count = dashboardGoalList.length;

	var c_count = dashboardGoalList.filter(function(item, index){
		if(item.goal_achive == false){
			return true;
		}
	}).length;

	var fc_count = dashboardGoalList.filter(function(item, index){
		if(item.chamgang_yn == "Y"){
			return true;
		}
	}).length;

	var cc_count = dashboardGoalList.filter(function(item, index){
		if(item.chamgang_yn == "Y" && item.goal_achive == false){
			return true;
		}
	}).length;

	vHtml += '<td>'+c_count+'/<span class="text-danger">'+f_count+'</span>(참강: '+cc_count+'/<span class="text-danger">'+fc_count+'</span>)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardGoalList.filter(function(item, index){
				if(item.course_id == course_id ){
					return true;
				}
			}).length;
		c_count = dashboardGoalList.filter(function(item, index){
			if(item.course_id == course_id && item.goal_achive == false){
				return true;
			}
		}).length;

		fc_count = dashboardGoalList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.course_id == course_id ){
				return true;
			}
		}).length;
		cc_count = dashboardGoalList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.course_id == course_id && item.goal_achive == false){
				return true;
			}
		}).length;
		vHtml += '<td>'+c_count+'/<span class="text-danger">'+f_count+'</span>(참강: '+cc_count+'/<span class="text-danger">'+fc_count+'</span>)</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_goalarchive_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardGoalList.filter(function(item, index){
				if(item.course_id == course_id && item.goal_achive == false){
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
function create_goalconfirm()
{	
	var display = '';
	var vHtml = '';
	
	vHtml += '<tr>';
	vHtml += '<th>오늘의 목표 승인 O/X';
	if(show_goalconfirm)
	{
		vHtml += '<div class="show_goalconfirm" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-up"></i></div>';
	}else{
		vHtml += '<div class="show_goalconfirm" style="float:right"><i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i></div>';
		display = 'style="display:none;"';
	}
	vHtml += '</th>';
	
	var f_count = dashboardGoalList.filter(function(item, index){
		if(item.goal_achive == true && item.goal_confirmed == true){
			return true;
		}
	}).length;
	
	var c_count = dashboardGoalList.filter(function(item, index){
		if(item.goal_achive == true && item.goal_confirmed == false){
			return true;
		}
	}).length;

	var fc_count = dashboardGoalList.filter(function(item, index){
		if(item.chamgang_yn == "Y" && item.goal_achive == true && item.goal_confirmed == true){
			return true;
		}
	}).length;
	
	var cc_count = dashboardGoalList.filter(function(item, index){
		if(item.chamgang_yn == "Y" && item.goal_achive == true && item.goal_confirmed == false){
			return true;
		}
	}).length;

	vHtml += '<td>'+f_count+'/<span class="text-danger">'+c_count+'</span>(참강: '+fc_count+'/<span class="text-danger">'+cc_count+'</span>)</td>';
	for(var i=0; i<course_count; i++)
	{
		var course_id = courseList[i].id;
		f_count = dashboardGoalList.filter(function(item, index){
				if(item.course_id == course_id && item.goal_achive == true && item.goal_confirmed == true){
					return true;
				}
			}).length;
		c_count = dashboardGoalList.filter(function(item, index){
			if(item.course_id == course_id && item.goal_achive == true && item.goal_confirmed == false){
				return true;
			}
		}).length;

		fc_count = dashboardGoalList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.course_id == course_id && item.goal_achive == true && item.goal_confirmed == true){
				return true;
			}
		}).length;
		cc_count = dashboardGoalList.filter(function(item, index){
			if(item.chamgang_yn == "Y" && item.course_id == course_id && item.goal_achive == true && item.goal_confirmed == false){
				return true;
			}
		}).length;
	
		vHtml += '<td>'+f_count+'/<span class="text-danger">'+c_count+'</span>(참강: '+fc_count+'/<span class="text-danger">'+cc_count+'</span>)</td>';
	}
	vHtml += '</tr>';
	
	vHtml += '<tr class="show_goalconfirm_detail" '+display+'>';
	vHtml += '<th class="text-right">&nbsp;</th>';
	vHtml += '<td>&nbsp;</td>';
	for(var i=0; i<course_count; i++)
	{
		vHtml += '<td>';
		var course_id = courseList[i].id;
		array_student = dashboardGoalList.filter(function(item, index){
				if(item.course_id == course_id && item.goal_achive == true && item.goal_confirmed == false){
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