var course_id;

var is_start_time = false;
var is_exam_time = false;

var to_hour;
var to_min;
var to_sec;

var exam_remain_time;

var exam_timer_init;

var to_timer_init;

var schedule_list;

var enrollment_list;
var practice_result_list;
var practice_prev_result_list;

var reflash_timer_init;
var is_reflash_timer = false;
/*
* 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	showCourses("N");
	search_semester();
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
			var courseList = data.courseList;
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
	
	form_search();
}

function form_course_cancel()
{
	$('#select_courses').modal("hide"); 
}

function to_time_sec()
{
	to_sec++;
	
	if(to_sec > 59){
		to_sec = 0;
		to_min++;
	}
	if(to_min > 59){
		to_min = 0;
		to_hour++;
	}
	
	if(to_hour > 23){
		to_hour = 0;
	}
	
	var to_time = "";
	if(to_hour < 10){
		to_time += "0" + to_hour + ":";
	}else{
		to_time += "" + to_hour + ":";
	}
	if(to_min < 10){
		to_time += "0" + to_min + ":";
	}else{
		to_time += "" + to_min + ":";
	}

	if(to_sec < 10){
		to_time += "0" + to_sec;
	}else{
		to_time += "" + to_sec;
	}
	
	$('#to_time').text(to_time);
}

function exam_time_sec()
{
	exam_remain_time--;
	
	var min;
	var sec;
	
	min = Math.floor( exam_remain_time / 60 );
	sec = exam_remain_time - (min*60);
	
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	
	$('#interval_timer').text(min + ":" + sec);
	
	if(exam_remain_time == 0){
		clearInterval(exam_timer_init);
		is_exam_time = false;
		
		stopExam();
	}
}

function form_search()
{
	search_schedule();
}


function search_schedule()
{
	$.ajax({
		type : "POST",
		url : "/test/getPracticeScheduleVocaIntervalPracticeTypeList.do",
		data:{
			section:"VOCA",
			practice_type:"VOCA_INTERVAL",
			course_id:course_id
		},
		success:function(data){
			if(is_exam_time){
				clearInterval(exam_timer_init);
				is_exam_time = false;
			}
			schedule_list = data;
			if(data.length > 0){
				var v_schedule_title = "";
				for(var i=0; i<data.length; i++)
				{
					var v_book = data[i].book;
					var v_day  = data[i].volume;
					if(i>0) v_schedule_title += " / ";
					if(v_book == 'toefl'){
						v_schedule_title += "토플 ";
					}else{
						v_schedule_title += "중고등 ";
					}
					v_schedule_title += v_day;
				}
				$("#schedule_info").html("("+v_schedule_title+")");
				var to_time = data[0].practice_schedule_current_time;
				var array_to_time = to_time.split(":");
				to_hour = parseInt(array_to_time[0]);
				to_min = parseInt(array_to_time[1]);
				to_sec = parseInt(array_to_time[2]);
				
				if(!is_start_time){
					is_start_time = true;
					to_timer_init = setInterval("to_time_sec()",1000);
				}
				
				var practice_schedule_start_yn = data[0].practice_schedule_start_yn;
				var interval_time = data[0].interval_time;
				if(interval_time == 0){
					interval_time = 120;
				}
				if(practice_schedule_start_yn == "Y"){
					
					$("#start_time").html(data[0].practice_schedule_start_time);
					$("#end_time").html(data[0].practice_schedule_end_time);

					$("#interval_time").val(interval_time);
					$("#interval_time").hide();
					$("#btn_start").hide();
					$("#btn_end").show();
					
					exam_remain_time = data[0].remain_time;
					if(exam_remain_time <= 0)
					{
						stopExam();
					}else{
						is_exam_time = true;
						exam_timer_init = setInterval("exam_time_sec()",1000);
					}
				}else{
					$("#interval_timer").html("");
					$("#start_time").html("");
					$("#end_time").html("");
					
					$("#interval_time").val(interval_time);
					$("#interval_time").show();
					$("#btn_start").show();
					$("#btn_end").hide();
				}
				if(is_reflash_timer){
					is_reflash_timer = false;
					clearInterval(reflash_timer_init);
				}
				search_student_result();
			}else{
				$("#interval_timer").html("");
				$("#start_time").html("");
				$("#end_time").html("");
				
				$("#interval_time").hide();
				$("#btn_start").hide();
				$("#btn_end").hide();
				alert("오늘 실라버스가 없습니다.");
				$("#voca_interval_result").html("");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function search_student_result()
{
	$.ajax({
		type : "POST",
		url : "/test/getPracticeResultVocaIntervalList.do",
		data:{
			course_id:course_id,
			date:cfmGetToDate()
		},
		success:function(data){
			practice_result_list = data.resultList;
			enrollment_list = data.enrollmentList;
			practice_prev_result_list = data.preResultList;
			
			create_student_result();
			
			if(!is_reflash_timer){
				is_reflash_timer = true;
				reflash_timer_init = setInterval("search_student_result()",300000);
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}
function create_student_result()
{
	var array_schedule_list = Array();
	var max_interval_count = 0;
	for(var i=0; i<schedule_list.length; i++)
	{
		var exam_count = schedule_list[i].exam_count;
		var total_exam_count = schedule_list[i].total_score;
		
		var half_exam_count = parseInt(exam_count / 2);
		var interval_exam_count = parseInt(total_exam_count / exam_count);
		if((total_exam_count % exam_count) > half_exam_count)
		{
			interval_exam_count++;
		}
		
		if(max_interval_count < interval_exam_count) max_interval_count = interval_exam_count;
		
		var array_schedule_exam_list = Array();
		for(var j=0; j<interval_exam_count; j++)
		{
			var start_count = j * exam_count + 1;
			var end_count = (j+1) * exam_count;
			if(j == (interval_exam_count-1)){
				end_count = total_exam_count;
			}
			
			var objSchedule = Object();
			objSchedule.start_no = start_count;
			objSchedule.end_no = end_count;
			array_schedule_exam_list.push(objSchedule);
		}
		array_schedule_list.push(array_schedule_exam_list);
	}	
	var vHtml = "";
	vHtml += '<colgroup>';
	vHtml += '	<col style="width:8%;" />';
	vHtml += '	<col style="width:8%;" />';
	vHtml += '	<col style="width:8%;" />';
	vHtml += '	<col style="width:5%;" />';
	for(var i=0; i<max_interval_count; i++)
	{
		vHtml += '	<col style="width:5%;" />';
	}
	vHtml += '</colgroup>';
	vHtml += '<thead>';
	vHtml += '	<tr class="table-active">';
	vHtml += '		<th class="text-center">이름</th>';
	vHtml += '		<th class="text-center">실전 VOCA</th>';
	
	var v_schedule_title = "";
	for(var i=0; i<schedule_list.length; i++)
	{
		var v_book = schedule_list[i].book;
		var v_day  = schedule_list[i].volume;
		if(i>0) v_schedule_title += "<br>";
		if(v_book == 'toefl'){
			v_schedule_title += "토플 ";
		}else{
			v_schedule_title += "중고등 ";
		}
		v_schedule_title += v_day;
	}
	
	vHtml += '		<th class="text-center">'+v_schedule_title+'</th>';
	vHtml += '		<th class="text-center">인터벌</th>';
	for(var j=0; j<max_interval_count; j++)
	{
		var v_interval_title = "";
		for(var i=0; i<schedule_list.length; i++)
		{
			if(i > 0) v_interval_title  += "<br>";
			var array_schedule_exam_list = array_schedule_list[i];
			if(array_schedule_exam_list.length-1 < j)
			{
				v_interval_title  += "&nbsp;";
			}else{
				v_interval_title  += array_schedule_exam_list[j].start_no+"-"+array_schedule_exam_list[j].end_no;
			}
		}
		
		vHtml += '		<th class="text-center">'+v_interval_title+'</th>';
	}
	vHtml += '</thead>';
	vHtml += '<tbody>';
	for(var k=0; k<enrollment_list.length; k++)
	{
		var v_course_id = enrollment_list[k].course_id;
		var student_name = enrollment_list[k].last_name+enrollment_list[k].first_name;
		
		if(enrollment_list[k].chamgang_yn == "Y"){
			student_name += "(참강)";
		}
		
		var v_course_enrollment_id = enrollment_list[k].course_enrollment_id;
		var n_count = 0;
		for(var i=0; i<schedule_list.length; i++)
		{
			var v_schedule_id = schedule_list[i].id;
			var v_idx = practice_result_list.findIndex(t => t.practice_schedule_id == v_schedule_id && t.course_enrollment_id == v_course_enrollment_id);
			if(v_idx >= 0) n_count++;
		}
		
		var rowspan = "";
		if(n_count > 1) rowspan = " rowspan='"+n_count+"'";
		if(enrollment_list[k].practice_exception_yn == "Y"){
			vHtml += '<tr class="bg-black-transparent-5">';
		}else{
			vHtml += '<tr>';
		}
		
		vHtml += '	<td class="text-center"'+rowspan+'><a href="javascript:go_achieve(\''+v_course_id+'\');">'+student_name+'</a><br>';
		
		if(enrollment_list[k].practice_exception_yn == "Y"){
			vHtml += '<button type="button" class="btn btn-info btn-xs" onClick="delete_exception('+v_course_enrollment_id+',\''+student_name+'\')">시험 대상 제외 해제</button>';
		}else{
			vHtml += '<button type="button" class="btn btn-info btn-xs" onClick="add_exception('+v_course_enrollment_id+',\''+student_name+'\')">시험 대상 제외 설정</button>';
		}
		vHtml += '</td>';
		

		//전날 인터벌
		var v_idx1 = practice_prev_result_list.findIndex(t => t.course_enrollment_id == v_course_enrollment_id && t.practice_type=="VOCA" && t.book=="toefl");
		var v_idx2 = practice_prev_result_list.findIndex(t => t.course_enrollment_id == v_course_enrollment_id && t.practice_type=="VOCA" && t.book=="basic");
		if(v_idx1 >= 0){
			//통과했을경우(토플)
			if(practice_prev_result_list[v_idx1].pass_result){
				if(practice_prev_result_list[v_idx1].out_pass_result){
					vHtml += '<td class="bg-yellow text-center"'+rowspan+'>';
					vHtml += cfmLpad(practice_prev_result_list[v_idx1].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx1].total_score+"",3," ");
					vHtml += '<br>(시간외)</td>';
				}else{
					vHtml += '<td class="bg-green text-center"'+rowspan+'>';
					vHtml += cfmLpad(practice_prev_result_list[v_idx1].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx1].total_score+"",3," ");
					vHtml += '</td>';
				}
			}else{
				if(practice_prev_result_list[v_idx1].user_pass_result){
					if(practice_prev_result_list[v_idx1].out_pass_result){
						vHtml += '<td class="bg-yellow text-center"'+rowspan+'>';
						vHtml += cfmLpad(practice_prev_result_list[v_idx1].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx1].total_score+"",3," ");
						vHtml += '<br>(시간외)</td>';
					}else{
						vHtml += '<td class="bg-blue text-center"'+rowspan+'>';
						vHtml += cfmLpad(practice_prev_result_list[v_idx1].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx1].total_score+"",3," ");
						vHtml += '</td>';
					}
				}else{
					if(v_idx2 >= 0){
						if(practice_prev_result_list[v_idx2].pass_result){
							if(practice_prev_result_list[v_idx2].out_pass_result){
								vHtml += '<td class="bg-yellow text-center"'+rowspan+'>';
								vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
								vHtml += '<br>(중고등-시간외)</td>';
							}else{
								vHtml += '<td class="bg-blue text-center"'+rowspan+'>';
								vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
								vHtml += '<br>(중고등)</td>';
							}
						}else{
							if(practice_prev_result_list[v_idx2].user_pass_result){
								if(practice_prev_result_list[v_idx2].out_pass_result){
									vHtml += '<td class="bg-yellow text-center"'+rowspan+'>';
									vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
									vHtml += '<br>(중고등-시간외)</td>';
								}else{
									vHtml += '<td class="bg-blue text-center"'+rowspan+'>';
									vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
									vHtml += '<br>(중고등)</td>';
								}
							}else{
								vHtml += '<td class="bg-red text-center"'+rowspan+'>';
								vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
								vHtml += '<br>(중고등)</td>';
							}
						}
					}else{
						vHtml += '<td class="bg-red text-center"'+rowspan+'>';
						vHtml += cfmLpad(practice_prev_result_list[v_idx1].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx1].total_score+"",3," ");
						vHtml += '</td>';
					}
				}
			}
		}else{
			if(v_idx2 >= 0){
				if(practice_prev_result_list[v_idx2].pass_result){
					if(practice_prev_result_list[v_idx2].out_pass_result){
						vHtml += '<td class="bg-yellow text-center"'+rowspan+'>';
						vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
						vHtml += '<br>(중고등-시간외)</td>';
					}else{
						vHtml += '<td class="bg-blue text-center"'+rowspan+'>';
						vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
						vHtml += '<br>(중고등)</td>';
					}
				}else{
					if(practice_prev_result_list[v_idx2].user_pass_result){
						if(practice_prev_result_list[v_idx2].out_pass_result){
							vHtml += '<td class="bg-yellow text-center"'+rowspan+'>';
							vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
							vHtml += '<br>(중고등-시간외)</td>';
						}else{
							vHtml += '<td class="bg-blue text-center"'+rowspan+'>';
							vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
							vHtml += '<br>(중고등)</td>';
						}
					}else{
						vHtml += '<td class="bg-red text-center"'+rowspan+'>';
						vHtml += cfmLpad(practice_prev_result_list[v_idx2].score+"",3," ")+"/"+cfmLpad(practice_prev_result_list[v_idx2].total_score+"",3," ");
						vHtml += '<br>(중고등)</td>';
					}
				}
			}else{
				vHtml += '<td class="bg-grey-darker text-center">';
				vHtml += '미시행';
				vHtml += '</td>';
			}
		}
		
		if(enrollment_list[k].practice_exception_yn == "Y"){
			vHtml += '	<td colspan="'+(max_interval_count+2)+'">'+enrollment_list[k].practice_exception_reason+'</td>';	
		}else{
			var n_seq = 0;
			if(n_count > 0)
			{
				for(var i=0; i<schedule_list.length; i++)
				{
					var v_schedule_id = schedule_list[i].id;
					var array_result_list = practice_result_list.filter(function(item, index){
						if(item.practice_schedule_id == v_schedule_id && item.course_enrollment_id == v_course_enrollment_id){
							return true;
						}
					});
					if(array_result_list.length > 0){
						if(n_seq > 0){
							vHtml += '</tr>';
							vHtml += '<tr>';
						}
						var v_schedule_title = "";
						var v_book = schedule_list[i].book;
						var v_day  = schedule_list[i].volume;
						if(i>0) v_schedule_title += "<br>";
						if(v_book == 'toefl'){
							v_schedule_title += "토플 ";
						}else{
							v_schedule_title += "중고등 ";
						}
						v_schedule_title += v_day;
						vHtml += '	<td class="text-center">'+v_schedule_title+'</td>';	
						var v_total_score = 0;
						var v_score = 0;
						for(var t=0; t<array_result_list.length; t++)
						{
							v_total_score += array_result_list[t].total_score;
							v_score += array_result_list[t].score;
						}
						vHtml += '	<td class="text-center">'+v_score+"/"+v_total_score+'</td>';	
						for(var j=0; j<max_interval_count; j++)
						{
							var v_score2 = j+1;
							var v_idx = practice_result_list.findIndex(t => t.practice_schedule_id == v_schedule_id && t.course_enrollment_id == v_course_enrollment_id&& t.score2 == v_score2);
							if(v_idx >= 0)
							{
								vHtml += '	<td class="text-center">';
								vHtml += '		<a href="javascript:go_result('+practice_result_list[v_idx].id+')">';
								vHtml += practice_result_list[v_idx].score+'/'+practice_result_list[v_idx].total_score+'<br>'+practice_result_list[v_idx].timem;
								vHtml += '		</a>';
								vHtml += '	</td>';
							}else{
								vHtml += '	<td class="text-center">&nbsp;</td>';
							}
						}
						n_seq++;
					}
				}
			}else{
				vHtml += '	<td class="text-center">&nbsp;</td>';	
				vHtml += '	<td class="text-center">&nbsp;</td>';
				for(var j=0; j<max_interval_count; j++)
				{
					vHtml += '	<td class="text-center">&nbsp;</td>';
				}
				
			}			
		}
		vHtml += '</tr>';
	}
	vHtml += '</tbody>';
	$("#voca_interval_result").html(vHtml);
}

var course_enrollment_id;
function add_exception(v_course_enrollment_id, v_student_name)
{
	course_enrollment_id = v_course_enrollment_id;
	$("#exception_title").html(v_student_name);
	$.ajax({
		type : "POST",
		url : "/test/getPracticeException.do",
		data:{
			section:"VOCA",
			practice_type:"VOCA_INTERVAL",
			course_enrollment_id:v_course_enrollment_id
		
		},
		success:function(data){
			if(data){
				$("#practice_exception_reason").val(data.reason);
			}else{
				$("#practice_exception_reason").val("");
				
			}
			$("#add_exception").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function save_exception()
{
	$.ajax({
		type : "POST",
		url : "/test/insertPracticeException.do",
		data:{
			section:"VOCA",
			practice_type:"VOCA_INTERVAL",
			course_enrollment_id:course_enrollment_id,
			reason:$("#practice_exception_reason").val()
		
		},
		success:function(data){
			if(is_reflash_timer){
				is_reflash_timer = false;
				clearInterval(reflash_timer_init);
			}
			$("#add_exception").modal("hide");
			search_student_result();
			
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}
function delete_exception(v_course_enrollment_id, v_student_name)
{
	if(!confirm(v_student_name+"학생 시험 대상제외를 취소하시겠습니까?")) return;
	$.ajax({
		type : "POST",
		url : "/test/deletePracticeException.do",
		data:{
			section:"VOCA",
			practice_type:"VOCA_INTERVAL",
			course_enrollment_id:v_course_enrollment_id
		
		},
		success:function(data){
			if(is_reflash_timer){
				is_reflash_timer = false;
				clearInterval(reflash_timer_init);
			}
			search_student_result();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
function startExam()
{
	$.ajax({
		type : "POST",
		url : "/test/updatePracticeScheduleInterval.do",
		data:{
			section:"VOCA",
			practice_type:"VOCA_INTERVAL",
			course_id:course_id,
			interval_time:$("#interval_time").val(),
			practice_schedule_start_yn:"Y"
		
		},
		success:function(data){
			search_schedule();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function stopExam()
{
	$.ajax({
		type : "POST",
		url : "/test/updatePracticeScheduleInterval.do",
		data:{
			section:"VOCA",
			practice_type:"VOCA_INTERVAL",
			course_id:course_id,
			interval_time:$("#interval_time").val(),
			practice_schedule_start_yn:"N"
		
		},
		success:function(data){
			search_schedule();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function go_result(v_id)
{
	var exam_url = "https://exam-us.usher.co.kr/";
	var url = exam_url + "exam/voca_interval/result.do?id="+v_id;
	window.open(url, "voca_interval_result");
}

function go_achieve(v_course_id)
{
	var url = "/enrollment/achievement_new_action.do?orientation_code=voca&&course_id="+v_course_id;
	window.open(url, "achieve");
}