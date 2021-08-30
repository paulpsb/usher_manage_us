var achieveCourseTimeTable;
var achieveCoursePracticeList;
var achieveCoursePracticeDailyList;
var achieveCourseAttendList;
var achieveCourseResultList;
var junior_timetable = [
	["17:30","18:25"],
	["18:25","19:20"],
	["19:20","20:15"],
	["20:15","21:10"],
	["21:10","22:00"]
];

var base_timetable = [
	["09:00","10:00"],
	["10:00","11:00"],
	["11:00","12:00"],
	["12:00","13:00"],
	["13:00","14:00"],
	["14:00","15:00"],
	["15:00","16:00"],
	["16:00","17:00"],
	["17:00","18:00"],
	["18:00","19:00"],
	["19:00","20:00"],
	["20:00","21:00"],
	["21:00","22:00"]
];

function search_dashboard_achieve()
{

	var sDate = $("#search_date").val();
	
	$.ajax({
		type : "POST",
		url : "/main/getDashboardAchieveList.do",
		data:{
			course_group_id:$("#search_course_group_id").val(),
			date:sDate			
		},
		dataType : "json",
		success:function(data){
			courseGroupInfo = data.courseGroupInfo;
			
			achieveCourseTimeTable         = data.courseTimeTable;
			achieveCoursePracticeList      = data.coursePracticeList;
			achieveCoursePracticeDailyList = data.coursePracticeDailyList;
			achieveCourseAttendList        = data.courseAttendList;
			achieveCourseResultList        = data.courseResultList;
			
			var student_type = courseGroupInfo.student_type;
			var lecture_type = courseGroupInfo.lecture_type;
			
			var array_time;
			if(student_type == "JUNIOR" && lecture_type=="REGULAR")
			{
				array_time = junior_timetable;
			}else{
				array_time = base_timetable;
			}
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '		<thead>';
			vHtml += '			<tr>';
			vHtml += '				<th class="text-center bg-grey" style="width:80px;"  rowspan="2">&nbsp;</th>';
			for(var i=0; i<courseList.length; i++)
			{
				vHtml += '				<th class="text-center bg-grey" style="width:860px;" colspan="4">'+courseList[i].name+'</th>';
			}
			vHtml += '			</tr>';
			vHtml += '			<tr>';
			for(var i=0; i<courseList.length; i++)
			{
				vHtml += '				<th class="text-center bg-grey" style="width:120px;">담당자</th>';
				vHtml += '				<th class="text-center bg-grey" style="width:80px;">전체완료</th>';
				vHtml += '				<th class="text-center bg-grey" style="width:80px;">시간별완료</th>';
				vHtml += '				<th class="text-center bg-grey" style="width:600px;">반별내신</th>';
			}
			vHtml += '			</tr>';
			vHtml += '		</thead>';
			vHtml += '		<tbody>';
			//수업전
			vHtml += '			<tr style="height:60px;">';
			vHtml += '				<th class="text-center">수업전</th>';
			for(var i=0; i<courseList.length; i++)
			{
				var v_course_id = courseList[i].id;
				var a_idx = achieveCourseAttendList.findIndex(t => t.course_id == v_course_id);
				var n_total_count = 0;
				var n_success_count = 0;
				var n_rate = 0;
				if(a_idx >= 0){
					n_total_count = achieveCourseAttendList[a_idx].total_count;
					n_success_count = achieveCourseAttendList[a_idx].success_count;
					n_rate = Math.round(n_success_count/n_total_count * 100);
				}
				vHtml += '				<td class="text-center">';
				vHtml += '담당강사('+courseList[i].instructor_name+')<br>';
				vHtml += '담당매니저('+courseList[i].manager_name+')<br>';
				vHtml += '				</td>';
				vHtml += '				<td class="text-center">&nbsp;</td>';
				vHtml += '				<td class="text-center">&nbsp;</td>';
				vHtml += '				<td>';
				if(n_total_count > 0)
				{
					var bg_text = "";
					if(n_rate >= 80){
						bg_text = "bg-green-lighter";
					}else if(n_rate >= 60){
						bg_text = "bg-blue-lighter";
					}else if(n_rate >= 40){
						bg_text = "bg-yellow-lighter";
					}else{
						bg_text = "bg-red-lighter";
					}
					
					vHtml += '					<div class="row m-2">';
					vHtml += '						<div class="col-3 text-center '+bg_text+'" style="padding:5px;">';
					vHtml += '출결<br>'+n_success_count+'/'+n_total_count+'명('+n_rate+'%)';
					vHtml += '						</div">';
					vHtml += '					</div">';
					
				}
				vHtml += '				</td>';
			}
			vHtml += '			</tr>';
			for(var k=0; k<array_time.length; k++)
			{
				var sHour = array_time[k][0];
				
				vHtml += '			<tr style="height:60px;">';
				vHtml += '				<th class="text-center">'+sHour+'</th>';
				for(var i=0; i<courseList.length; i++)
				{
					var v_course_id = courseList[i].id;
					var a_idx = achieveCourseTimeTable.findIndex(t => t.course_id == v_course_id && t.class_hour == sHour);
					vHtml += '				<td class="text-center">';
					if(a_idx >= 0)
					{
						if(achieveCourseTimeTable[a_idx].short_title_kr){
							vHtml += achieveCourseTimeTable[a_idx].short_title_kr+' ';
							if(achieveCourseTimeTable[a_idx].study_type == "CLASS"){
								vHtml += "수업 ";
							}else{
								vHtml += "스터디 ";
							}
							vHtml += '(' + achieveCourseTimeTable[a_idx].user_name + ')';
						}else{
							if(achieveCourseTimeTable[a_idx].study_type == "LUNCH"){
								vHtml +=  "점심시간";
							}else if(achieveCourseTimeTable[a_idx].study_type == "DINNER"){
								vHtml +=  "저녁시간";
							}else if(achieveCourseTimeTable[a_idx].study_type == "INDEPENDENT"){
								vHtml +=  "의무자습";
							}
						}
						
					}else{
						vHtml += '&nbsp;';
					}
					
					var practice_list = achieveCoursePracticeList.filter(function(item, index){
						if(item.course_id == v_course_id && item.start_time == sHour){
							return true;
						}
					});
					vHtml += '				</td>';
					vHtml += '				<td class="text-center">&nbsp;</td>';
					vHtml += '				<td class="text-center">&nbsp;</td>';
					vHtml += '				<td>';
					vHtml += '					<div class="row  m-2">';
					for(var j=0; j<practice_list.length; j++)
					{
						var v_section = practice_list[j].section;
						var v_practice_type = practice_list[j].practice_type;
						
						var v_bg_color = "";
						var v_txt_color = "";
						var v_practice_name = practice_list[j].short_title_kr+" "+practice_list[j].practice_name;
						var v_value = "";
						var p_idx = achieveCoursePracticeDailyList.findIndex(t => t.course_id == v_course_id && t.section == v_section  && t.practice_type == v_practice_type);
						if(p_idx >= 0)
						{
							var result_list = achieveCourseResultList.filter(function(item, index){
								if(item.course_id == v_course_id && item.section == v_section && item.practice_type == v_practice_type){
									return true;
								}
							});
							
							if(result_list.length > 0)
							{
								var t_total_course = 0;
								var a_idx = achieveCourseAttendList.findIndex(t => t.course_id == v_course_id);
								if(a_idx >= 0){
									t_total_course = achieveCourseAttendList[a_idx].total_count;
								}
								var t_total_count = 0;
								var t_success_count = 0;
								for(var t=0; t<result_list.length; t++)
								{
									t_total_count += t_total_course;
									t_success_count += result_list[t].total_count;
									if(t>0){
										v_value += ",";
									}
									v_value += result_list[t].total_count+"/"+t_total_course+"명";
								}
								if(t_total_count > 0)
								{
									var t_rate = Math.round(t_success_count/t_total_count * 100);
									v_value += "("+t_rate+"%)";
									
									if(t_rate >= 80){
										v_bg_color = "bg-green-lighter";
									}else if(t_rate >= 60){
										v_bg_color = "bg-blue-lighter";
									}else if(t_rate >= 40){
										v_bg_color = "bg-yellow-lighter";
									}else{
										v_bg_color = "bg-red-lighter";
									}
								}else{
									v_bg_color = "bg-dark ";
									v_txt_color = "text-white ";
									v_value = "&nbsp;";
								}
							}else{
								v_bg_color = "bg-dark ";
								v_txt_color = "text-white ";
								v_value = "(실라버스 미기입)";
								
							}
						}else{
							v_bg_color = "bg-dark ";
							v_txt_color = "text-white ";
							v_value = "(당일없음)";
						}
						vHtml += '						<div class="col-3 p-2 text-center">';
						vHtml += '							<div class="'+v_bg_color+v_txt_color+'" style="width:100%;padding:5px;">'
						vHtml += v_practice_name+'<br>';
						vHtml += v_value;
						vHtml += '							</div>';
						vHtml += '						</div>';
					}
					vHtml += '					</div">';
					vHtml += '				</td>';
				}
				vHtml += '			</tr>';
			}
			vHtml += '		</tbody>';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '';
			vHtml += '</table>';
			$("#div_dashboard").html(vHtml);
			oTable = $('#example').DataTable( {
				ordering:false,
		        searching: false,
		        info:false,
		        scrollY:        '50vh',
		        scrollX:        true,
		        scrollCollapse: true,
		        paging:         false
		    } );
			$("#example tbody tr td").css("padding","0px");
			
			setTimeout(search_dashboard, 300000);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}