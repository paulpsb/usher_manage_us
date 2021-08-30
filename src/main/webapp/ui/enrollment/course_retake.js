var nextSemesterInfo;
var courseGroupList;
var courseList;
var enrollmentList;
var trackingList;
var nextEnrollmentList;

/*
* 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_test_type').change(function(e){
		create_tracking();
	});
	$('#search_student_type').change(function(e){
		var vHtml = "";
		if($('#search_student_type').val() == "JUNIOR"){
			vHtml += '<option value="REGULAR">정규</option>';
			vHtml += '<option value="SPECIAL">특강</option>';
		}else{
			vHtml += '<option value="REGULAR">종합</option>';
			vHtml += '<option value="SINGLE">단과</option>';
		}
		$('#search_lecture_type').html(vHtml);
		create_tracking();
	});
	$('#search_lecture_type').change(function(e){
		create_tracking();
	});
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
			for(var i=1; i<data.length; i++){
				var selected = "";
				vHtml += "<option value='"+data[i].date_code+"'>"+data[i].date+"</option>";
			}
			
			$("#search_semester_date").html(vHtml);
			
			$('#search_semester_date').change(function(e){
				form_search();
			});
			
			form_search();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getCourseRetakeList.do",
		data:{
			semester_date:$("#search_semester_date").val()
		},
		success:function(data){
			courseGroupList = data.courseGroupList;
			courseList = data.courseList;
			enrollmentList = data.enrollmentList;
			trackingList = data.trackingList;
			nextSemesterInfo = data.nextSemesterInfo;
			nextEnrollmentList = data.nextEnrollmentList;	
			
			create_tracking();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_tracking()
{
	var test_type    = $("#search_test_type").val();
	var student_type = $("#search_student_type").val();
	var lecture_type = $("#search_lecture_type").val();
	
	var total_enrollment_count  = 0;
	var total_goal_count        = 0;
	var total_success_count     = 0;
	var total_due_count         = 0;
	var total_tracking_count    = 0;
	
	var total_enrollment_count1 = 0;
	var total_goal_count1       = 0;
	var total_success_count1    = 0;
	var total_due_count1        = 0;
	var total_tracking_count1   = 0;
	
	var total_enrollment_count2 = 0;
	var total_goal_count2       = 0;
	var total_success_count2    = 0;
	var total_due_count2        = 0;
	var total_tracking_count2   = 0;
	
	var total_enrollment_count3 = 0;
	var total_goal_count3       = 0;
	var total_success_count3    = 0;
	var total_due_count3        = 0;
	var total_tracking_count3   = 0;

	var total_enrollment_count4 = 0;
	var total_goal_count4       = 0;
	var total_success_count4    = 0;
	var total_due_count4        = 0;
	var total_tracking_count4   = 0;

	var array_course_group = courseGroupList.filter(function(item, index){
		if(item.test_type == test_type && item.student_type == student_type && item.lecture_type == lecture_type){
			return true;
		}
	});
	
	var vHtml = "";
	
	for(var i=0; i<array_course_group.length; i++)
	{
		var course_group_id = array_course_group[i].course_group_id;
		var array_course = courseList.filter(function(item, index){
			if(item.course_group_id == course_group_id){
				return true;
			}
		});
		
		var start_date = array_course_group[i].start_date;
		var end_date = array_course_group[i].end_date;
		
		for(var j=0;j<array_course.length; j++)
		{
			var success_list = Array();
			var due_list = Array();
			var reject_list = Array();
			
			var course_id = array_course[j].course_id;
			
			var days = array_course[j].days;
			var difficulty = array_course[j].difficulty;
			var inner_difficulty = array_course[j].inner_difficulty;
			
			var array_enrollment = enrollmentList.filter(function(item, index){
				if(item.course_id == course_id){
					return true;
				}
			});
			
			var goal_count      = 0;
			var success_count   = 0;
			var total_count     = 0;
			var due_count       = 0;
			var tracking_count  = 0;
			
			for(var k=0;k<array_enrollment.length; k++)
			{
				total_count++;
				if(array_enrollment[k].repetition_result == "Y") goal_count++;
				var user_id = array_enrollment[k].user_id;
				var objStudent = Object();
				objStudent.student_name = array_enrollment[k].last_name+array_enrollment[k].first_name;
				objStudent.status = array_enrollment[k].status;
				//우선 등록된 학생인지 먼저 찾는다.
				//이번달 그룹이 늦게 생긴경우
				var is_success = false;
				var a_idx = enrollmentList.findIndex(t => t.user_id == user_id
														&&t.test_type == test_type
														&&t.student_type == student_type
														&&t.lecture_type == lecture_type
														&&t.days == days
														&&t.start_date > end_date );
				if(a_idx>=0){
					success_count++;
					is_success = true;
					
					objStudent.course_name = "";
					success_list.push(objStudent);
					
				}else{
					var b_idx = enrollmentList.findIndex(t => t.user_id == user_id
															&&t.start_date > end_date );
					if(b_idx>=0){
						success_count++;
						is_success = true;

						objStudent.course_name = enrollmentList[b_idx].course_group_name+" "+enrollmentList[b_idx].course_name;
						success_list.push(objStudent);
					}else{
						//다음달에 등록한 학생인지 체크.
						var c_idx = nextEnrollmentList.findIndex(t => t.user_id == user_id
																	&&t.test_type == test_type
																	&&t.student_type == student_type
																	&&t.lecture_type == lecture_type
																	&&t.days == days );
						if(c_idx>=0){
							success_count++;
							is_success = true;
							
							objStudent.course_name = "";
							success_list.push(objStudent);
						}else{
							//다음달에 등록한 학생인지 체크.
							var d_idx = nextEnrollmentList.findIndex(t => t.user_id == user_id );
							if(d_idx>=0){
								success_count++;
								is_success = true;
								
								objStudent.course_name = nextEnrollmentList[d_idx].course_group_name+" "+nextEnrollmentList[d_idx].course_name;
								success_list.push(objStudent);
							}
						}
					}
				}
				
				//등록한 학생이 아닌경우
				if(!is_success){
					if(array_enrollment[k].status == "PAID"){
						if(array_enrollment[k].repetition_result == "Y"){
							due_count++;
							objStudent.due_type = "Y";
							objStudent.semester_date = "";
							objStudent.course_name = "";
							objStudent.teacher_name = "";
							due_list.push(objStudent);
						}else{
							objStudent.reject_desc = array_enrollment[k].repetition_desc;
							if(array_enrollment[k].repetition_date){
								objStudent.reject_type = "T";
								objStudent.reject_date = array_enrollment[k].repetition_date;
								reject_list.push(objStudent);
							}else{
								objStudent.reject_type = "N";
								reject_list.push(objStudent)
							}
						}
					}else{
						objStudent.reject_type = "R";
						objStudent.reject_desc = array_enrollment[k].refund_reason;
						reject_list.push(objStudent);
					}
				}
			}
			
			//이전에 이월된 학생을 트래킹한다.(due_list, tracking_count)
			var tracking_list;
			if(inner_difficulty == 1){
				tracking_list = trackingList.filter(function(item, index){
					if(item.test_type == test_type && item.student_type == student_type && item.lecture_type == lecture_type && item.days == days && item.difficulty == difficulty){
						return true;
					}
				});
				
				for(var q=0; q<tracking_list.length; q++)
				{
					if(inner_difficulty != tracking_list[q].inner_difficulty){
						var q_idx = courseList.findIndex(t => t.test_type == test_type
																&&t.student_type == student_type
																&&t.lecture_type == lecture_type
																&&t.days == days
																&&t.difficulty == difficulty
																&&t.inner_difficulty == tracking_list[q].inner_difficulty );
						if(q_idx>=0) continue;
					}
					var s_idx = nextEnrollmentList.findIndex(t => t.user_id == tracking_list[q].user_id);
					if(s_idx>=0) continue;
					
					var objStudent = Object();
					objStudent.student_name = tracking_list[q].last_name+tracking_list[q].first_name;
					objStudent.semester_date = tracking_list[q].semester_date;
					
					var v_teacher = tracking_list[q].instructor_name;
					if(tracking_list[q].manager_name){
						v_teacher += "/"+tracking_list[q].manager_name;
					}
					objStudent.teacher_name = v_teacher;
					due_list.push(objStudent);
					tracking_count++;
				}
				
			}else{
				tracking_list = trackingList.filter(function(item, index){
					if(item.test_type == test_type && item.student_type == student_type && item.lecture_type == lecture_type && item.days == days && item.difficulty == difficulty && item.inner_difficulty == inner_difficulty){
						return true;
					}
				});
				for(var q=0; q<tracking_list.length; q++)
				{
					var s_idx = nextEnrollmentList.findIndex(t => t.user_id == tracking_list[q].user_id);
					if(s_idx>=0) continue;
					
					var objStudent = Object();
					objStudent.student_name = tracking_list[q].last_name+tracking_list[q].first_name;
					objStudent.semester_date = tracking_list[q].semester_date;
					
					var v_teacher = tracking_list[q].instructor_name;
					if(tracking_list[q].manager_name){
						v_teacher += "/"+tracking_list[q].manager_name;
					}
					objStudent.teacher_name = v_teacher;
					due_list.push(objStudent);
					tracking_count++;
				}
			}
			
			if(i == 0){
				total_enrollment_count1 += total_count;
				total_goal_count1       += goal_count;
				total_success_count1    += success_count;
				total_due_count1        += due_count;
				total_tracking_count1   += tracking_count;
			}else if(i == 1){
				total_enrollment_count2 += total_count;
				total_goal_count2       += goal_count;
				total_success_count2    += success_count;
				total_due_count2        += due_count;
				total_tracking_count2   += tracking_count;
			}else if(i == 2){
				total_enrollment_count3 += total_count;
				total_goal_count3       += goal_count;
				total_success_count3    += success_count;
				total_due_count3        += due_count;
				total_tracking_count3   += tracking_count;
			}else if(i == 3){
				total_enrollment_count4 += total_count;
				total_goal_count4       += goal_count;
				total_success_count4    += success_count;
				total_due_count4        += due_count;
				total_tracking_count4   += tracking_count;
			}
			
			var nCount = 0;
			if(success_list.length > nCount) nCount = success_list.length;
			if(due_list.length > nCount) nCount = due_list.length;
			if(reject_list.length > nCount) nCount = reject_list.length;
			
			if(nCount > 0)
			{
				vHtml += '<tr class="bg-indigo">';
				vHtml += '	<th colspan="8"><h2>';
				vHtml += array_course[j].course_group_name+" "+array_course[j].course_name+"반";
				vHtml += '(';
				vHtml += '담당강사 : '+array_course[j].instructor_name;
				vHtml += ' / ';
				vHtml += '담당매니져: '+array_course[j].manager_name;
				vHtml += ')</h2>';
				vHtml += '	</th>';
				vHtml += '</tr>';
				vHtml += '<tr>';
				vHtml += '	<th class="bg-primary">재수강(률)</th>';
				vHtml += '	<th class="bg-success" colspan="2">등록('+success_list.length+'명)</th>';
				vHtml += '	<th class="bg-primary" colspan="2">등록예정('+due_list.length+'명)</th>';
				vHtml += '	<th class="bg-danger" colspan="2">거절/이월/환불('+reject_list.length+'명)</th>';
				vHtml += '	<th class="bg-danger">사유</th>';
				vHtml += '</tr>';
				for(var t=0; t<nCount; t++)
				{
					vHtml += '<tr>';
					if(t == 0){
						var rate      = Math.round(success_count/total_count*100);
						var goal_rate = Math.round(goal_count/total_count*100);
						vHtml += '	<td class="text-center" rowspan="'+nCount+'">';
						vHtml += '<h2>목표 : '+goal_count+"/"+total_count+"명("+goal_rate+"%)"+'</h2>';
						vHtml += '<h2>현재 : '+success_count+"/"+total_count+"명("+rate+"%)"+'</h2>';
						vHtml += '	</td>';
					}
					
					if(t < success_list.length){
						vHtml += '	<td class="text-center">'+(t+1)+'</td>';
						vHtml += '	<td>';
						vHtml += success_list[t].student_name;
						if(success_list[t].course_name){
							vHtml += "("+success_list[t].course_name+"반)";
						}
						vHtml += '	</td>';
					}else{
						vHtml += '	<td>&nbsp;</td>';
						vHtml += '	<td>&nbsp;</td>';
					}
					if(t < due_list.length){
						vHtml += '	<td class="text-center">'+(t+1)+'</td>';
						vHtml += '	<td>';
						vHtml += due_list[t].student_name;
						if(due_list[t].semester_date){
							vHtml += "("+due_list[t].semester_date+")";
						}
						if(due_list[t].teacher_name){
							vHtml += "("+due_list[t].teacher_name+")";
						}
						vHtml += '	</td>';
					}else{
						vHtml += '	<td>&nbsp;</td>';
						vHtml += '	<td>&nbsp;</td>';
					}
					var vClass= "";
					if(t < reject_list.length){
						if(reject_list[t].reject_type == "T"){
							vClass= "bg-yellow";
						}else if(reject_list[t].reject_type == "R"){
							vClass= "bg-danger";
						}
					}
					
					if(t < reject_list.length){
						vHtml += '	<td class="text-center '+vClass+'">'+(t+1)+'</td>';
						vHtml += '	<td class="'+vClass+'">';
						vHtml += reject_list[t].student_name;
						if(reject_list[t].reject_type == "T"){
							vHtml += "(이월 : " + reject_list[t].reject_date+")";
						}else if(reject_list[t].reject_type == "R"){
							vHtml += "(환불)";
						}
						vHtml += '	</td>';
					}else{
						vHtml += '	<td>&nbsp;</td>';
						vHtml += '	<td>&nbsp;</td>';
					}
					if(t < reject_list.length){
						vHtml += '	<td class="'+vClass+'">';
						vHtml += reject_list[t].reject_desc;
						vHtml += '	</td>';
					}else{
						vHtml += '	<td>&nbsp;</td>';
					}
					vHtml += '</tr>';
				}
			}
			
		}
	}
	
	$("#data_list").html(vHtml);
	
	vHtml = "";
	
	total_enrollment_count  = total_enrollment_count1+total_enrollment_count2+total_enrollment_count3+total_enrollment_count4;
	total_goal_count        = total_goal_count1+total_goal_count2+total_goal_count3+total_goal_count4;
	total_success_count     = total_success_count1+total_success_count2+total_success_count3+total_success_count4;
	total_due_count         = total_due_count1+total_due_count2+total_due_count3+total_due_count4;
	total_tracking_count    = total_tracking_count1+total_tracking_count2+total_tracking_count3+total_tracking_count4;
	
	var n_cnt = array_course_group.length + 1;
	
	vHtml += '<tr class="bg-indigo">';
	vHtml += '	<th class="text-center" colspan="'+n_cnt+'"><h1>'+$("#search_semester_date").val()+' > '+nextSemesterInfo.semester_date+'<h1></th>';
	vHtml += '</tr>';
	vHtml += '<tr class="">';
	vHtml += '	<td class="text-center"><h2>';
	vHtml += '<'+$("#search_test_type option:checked").text()+" "+$("#search_student_type option:checked").text()+" "+$("#search_lecture_type option:checked").text()+" 총 인원><br>";
	var total_goal_rate    =  Math.round(total_goal_count/total_enrollment_count*100);
	var total_success_rate =  Math.round(total_success_count/total_enrollment_count*100);
	vHtml += '목표 : '+total_goal_count+"/"+total_enrollment_count+"명("+total_goal_rate+"%)<br>";
	vHtml += '현재 : '+total_success_count+"/"+total_enrollment_count+"명("+total_success_rate+"%)<br>";
	vHtml += '</h2></td>';
	for(var i=0; i<array_course_group.length; i++)
	{
		vHtml += '	<td class="text-center"><h2>';
		vHtml += '<'+$("#search_test_type option:checked").text()+" "+array_course_group[i].course_group_name+"><br>";
		if(i == 0){
			var total_goal_rate    =  Math.round(total_goal_count1/total_enrollment_count1*100);
			var total_success_rate =  Math.round(total_success_count1/total_enrollment_count1*100);
			vHtml += '목표 : '+total_goal_count1+"/"+total_enrollment_count1+"명("+total_goal_rate+"%)<br>";
			vHtml += '현재 : '+total_success_count1+"/"+total_enrollment_count1+"명("+total_success_rate+"%)<br>";
			vHtml += '미달-등록예정 : '+total_due_count1+"명<br>";
			vHtml += '미달-이월 : '+total_tracking_count1+"명<br>";
		}else if(i == 1){
			var total_goal_rate    =  Math.round(total_goal_count2/total_enrollment_count2*100);
			var total_success_rate =  Math.round(total_success_count2/total_enrollment_count2*100);
			vHtml += '목표 : '+total_goal_count2+"/"+total_enrollment_count2+"명("+total_goal_rate+"%)<br>";
			vHtml += '현재 : '+total_success_count2+"/"+total_enrollment_count2+"명("+total_success_rate+"%)<br>";
			vHtml += '미달-등록예정 : '+total_due_count2+"명<br>";
			vHtml += '미달-이월 : '+total_tracking_count2+"명<br>";
		}else if(i == 2){
			var total_goal_rate    =  Math.round(total_goal_count3/total_enrollment_count3*100);
			var total_success_rate =  Math.round(total_success_count3/total_enrollment_count3*100);
			vHtml += '목표 : '+total_goal_count3+"/"+total_enrollment_count3+"명("+total_goal_rate+"%)<br>";
			vHtml += '현재 : '+total_success_count3+"/"+total_enrollment_count3+"명("+total_success_rate+"%)<br>";
			vHtml += '미달-등록예정 : '+total_due_count3+"명<br>";
			vHtml += '미달-이월 : '+total_tracking_count3+"명<br>";
		}else if(i == 3){
			var total_goal_rate    =  Math.round(total_goal_count4/total_enrollment_count4*100);
			var total_success_rate =  Math.round(total_success_count4/total_enrollment_count4*100);
			vHtml += '목표 : '+total_goal_count4+"/"+total_enrollment_count4+"명("+total_goal_rate+"%)<br>";
			vHtml += '현재 : '+total_success_count4+"/"+total_enrollment_count4+"명("+total_success_rate+"%)<br>";
			vHtml += '미달-등록예정 : '+total_due_count4+"명<br>";
			vHtml += '미달-이월 : '+total_tracking_count4+"명<br>";
		}
		
		vHtml += '</h2></td>';
	}
	vHtml += '</tr>';
	
	$("#summery_table").html(vHtml);
	
}