jQuery(document).ready(function(){
	var next_date = $("#semester_date").val();
	$.ajax({
		type : "POST",
		url : "/course/getCourseExistsStudentList.do",
		data:{
			semester_date:$("#semester_date").val(),
			prev_semester_date:$("#prev_semester_date").val(),
			course_group_name:$("#course_group_name").val()
		},
		success:function(data){
			var v_real_search_register = $("#real_search_register").val();
			var v_course_name          = $("#course_name").val();
			var v_course_group_name    = $("#course_group_name").val()
			$("#span_title").html(v_course_name+"반 - "+v_real_search_register);
			
			var courseExistsList = data.courseExistsList;
			var repetitionList = data.repetitionList;
			var studentList = data.studentList;
			
			var arr_course = courseExistsList.filter(function(item, index){
				if(item.course_name == v_course_name && item.real_register == v_real_search_register){
					return true;
				}
			});
			var vHtml = "";
			
			for(var i=0; i<arr_course.length; i++)
			{
				var v_student_id = arr_course[i].student_id;
				
				var s_idx = studentList.findIndex(t => t.student_id == v_student_id);
				var a_idx = repetitionList.findIndex(t => t.student_id == v_student_id);
				
				var attend_date = "";
				
				var goal_repetition_advise          = "";
				var goal_repetition_advise_name     = "";
				var goal_repetition_advise_date     = "";
				
				var first_repetition_result = "";
				var first_repetition_result_name = "";
				var first_repetition_result_date = "";
				var first_repetition_advise = "";
				var first_repetition_advise_name = "";
				var first_repetition_advise_date = "";

				var second_repetition_result = "";
				var second_repetition_result_name = "";
				var second_repetition_result_date = "";
				var second_repetition_advise = "";
				var second_repetition_advise_name = "";
				var second_repetition_advise_date = "";
				
				var third_student_repetition_result = "";
				var third_student_repetition_result_desc = "";
				var third_student_repetition_reason = "";
				var third_student_repetition_reason_desc = "";
				var third_student_repetition_course = "";
				var third_student_repetition_due_date = "";
				var third_student_repetition_date = "";

				var third_repetition_result = "";
				var third_repetition_result_name = "";
				var third_repetition_result_date = "";
				var third_repetition_advise = "";
				var third_repetition_advise_name = "";
				var third_repetition_advise_date = "";
				var unregistered_reason = "";
				var unregistered_reason_name = "";
				var unregistered_reason_date = "";
				
				var complete_repetition_result = "";
				console.log(a_idx);
				if(a_idx >= 0){
					
					attend_date                     = repetitionList[a_idx].attend_date;
					
					goal_repetition_advise          = repetitionList[a_idx].goal_repetition_advise;
					goal_repetition_advise_name     = repetitionList[a_idx].goal_repetition_advise_name;
					goal_repetition_advise_date     = repetitionList[a_idx].goal_repetition_advise_date;
					first_repetition_result         = repetitionList[a_idx].first_repetition_result;
					first_repetition_result_name    = repetitionList[a_idx].first_repetition_result_name;
					first_repetition_result_date    = repetitionList[a_idx].first_repetition_result_date;
					first_repetition_advise        = repetitionList[a_idx].first_repetition_advise;
					first_repetition_advise_name   = repetitionList[a_idx].first_repetition_advise_name;
					first_repetition_advise_date   = repetitionList[a_idx].first_repetition_advise_date;
					second_repetition_result        = repetitionList[a_idx].second_repetition_result;
					second_repetition_result_name   = repetitionList[a_idx].second_repetition_result_name;
					second_repetition_result_date   = repetitionList[a_idx].second_repetition_result_date;
					second_repetition_advise        = repetitionList[a_idx].second_repetition_advise;
					second_repetition_advise_name   = repetitionList[a_idx].second_repetition_advise_name;
					second_repetition_advise_date   = repetitionList[a_idx].second_repetition_advise_date;

					third_student_repetition_result = repetitionList[a_idx].third_student_repetition_result;
					third_student_repetition_result_desc = repetitionList[a_idx].third_student_repetition_result_desc;
					third_student_repetition_reason = repetitionList[a_idx].third_student_repetition_reason;
					third_student_repetition_reason_desc = repetitionList[a_idx].third_student_repetition_reason_desc;
					third_student_repetition_course = repetitionList[a_idx].third_student_repetition_course;
					third_student_repetition_due_date = repetitionList[a_idx].third_student_repetition_due_date;
					third_student_repetition_date = repetitionList[a_idx].third_student_repetition_date;
					
					third_repetition_result         = repetitionList[a_idx].third_repetition_result;
					third_repetition_result_name    = repetitionList[a_idx].third_repetition_result_name;
					third_repetition_result_date    = repetitionList[a_idx].third_repetition_result_date;
					third_repetition_advise         = repetitionList[a_idx].third_repetition_advise;
					third_repetition_advise_name    = repetitionList[a_idx].third_repetition_advise_name;
					third_repetition_advise_date    = repetitionList[a_idx].third_repetition_advise_date;
					unregistered_reason             = repetitionList[a_idx].unregistered_reason;
					unregistered_reason_name        = repetitionList[a_idx].unregistered_reason_name;
					unregistered_reason_date        = repetitionList[a_idx].unregistered_reason_date;
					
					complete_repetition_result      = repetitionList[a_idx].complete_repetition_result;
				}
				
				var nSeq = i + 1;
				
				vHtml += '<tr>';
				vHtml += '<td class="text-center">'+nSeq+'</td>';
				vHtml += '<td class="text-center">'+arr_course[i].student_name+'</a></td>';
				vHtml += '<td class="text-center">'+arr_course[i].username+'</td>';
				vHtml += '	<td class="text-center">';
				vHtml += arr_course[i].mobile_no;
				//if(arr_course[i].mobile_parent_no) vHtml += '<br>학부모 : ' + arr_course[i].mobile_parent_no;
				vHtml += '	</td>';
				
				var v_course_enrollment_id = studentList[s_idx].course_enrollment_id;
				var v_course_id = studentList[s_idx].course_id;
				vHtml += '	<td class="text-center" style="vertical-align: middle;width:100px;">'+studentList[s_idx].semester_month+'</td>';
				vHtml += '	<td class="text-center" style="vertical-align: middle;width:200px;">'+studentList[s_idx].course_group_name+' '+studentList[s_idx].course_name+'반</td>';
				vHtml += '	<td class="text-center" style="vertical-align: middle;width:100px;">';
				vHtml += '<button type="button" class="btn btn-success btn-sm" onclick="go_course_achieve('+v_course_id+')">반 성취표</button>'
				vHtml += '	</td>';
				vHtml += '	<td class="text-center" style="vertical-align: middle;width:150px;">';
				vHtml += '<button type="button" class="btn btn-lime btn-sm" onclick="go_course_enrollment_achieve('+v_course_enrollment_id+')">개인 성취표</button>'
				vHtml += '	</td>';
				
				vHtml += '	<td class="text-center">';
				if(arr_course[i].school_name)
				{
					vHtml += '<a href="javascript:go_school(\''+arr_course[i].school_foreign_gubun+'\',\''+arr_course[i].school_gubun+'\',\''+arr_course[i].school_area1+'\',\''+arr_course[i].school_area2+'\',\''+arr_course[i].school_name+'\')">';
					vHtml += arr_course[i].school_name;
					vHtml += '</a>';
				}else{
					vHtml += '&nbsp;';
				}
				vHtml += '	</td>';
				
				var t_attend_date = "";
				if(attend_date){
					t_attend_date = attend_date;
				}
				
				var v_value = "";
				var v_class = "";
				var v_totle_tip = "";
				if(goal_repetition_advise){
					v_tool_tip = 'title="'+goal_repetition_advise+'"';
				}
				
				if(t_attend_date){
					var t_attend_month = t_attend_date.substring(0,7);
					if(next_date <= t_attend_month)
					{
						v_value = "<h4 "+v_totle_tip+">O</h4>";
						v_class = "bg-green-lighter";
					}else{
						v_value = "<h4 "+v_totle_tip+">X</h4>";
						v_class = "bg-red-lighter";
					}
				}else{
					v_value = "<h4>X</h4>";
					v_class = "bg-red-lighter";
				}
				
				vHtml += '			<td class="text-center '+v_class+'">'+v_value+'</td>';
				
				if(first_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					var v_totle_tip = "";
					if(first_repetition_advise){
						v_totle_tip = 'title="'+first_repetition_advise+'"';
					}
					if(first_repetition_result == "Y"){
						v_value = "<h4 "+v_totle_tip+">O(등록)</h4>";
						v_class = "bg-green-lighter";
					}else if(first_repetition_result == "Q"){
						v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(first_repetition_result == "N"){
						v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'">'+v_value+'</td>';
				}else{
					vHtml += '			<td class="text-center">&nbsp;</td>';
				}

				
				if(second_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					var v_totle_tip = "";
					if(second_repetition_advise){
						v_totle_tip = 'title="'+second_repetition_advise+'"';
					}
					if(second_repetition_result == "Y"){
						v_value = "<h4 "+v_totle_tip+">O(등록)</h4>";
						v_class = "bg-green-lighter";
					}else if(second_repetition_result == "Q"){
						v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(second_repetition_result == "N"){
						v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'">'+v_value+'</td>';
				}else{
					vHtml += '			<td class="text-center">&nbsp;</td>';
				}
				
				if(third_student_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					if(third_student_repetition_result == "Y"){
						v_value = "<h4>O("+third_student_repetition_result_desc+")</h4>";
						v_class = "bg-green-lighter";
					}else if(third_student_repetition_result == "Q"){
						v_value = "<h4>△("+third_student_repetition_result_desc+")</h4>";
						v_class = "bg-yellow-lighter";
					}else if(third_student_repetition_result == "N"){
						v_value = "<h4>X("+third_student_repetition_result_desc+")</h4>";
						v_class = "bg-red-lighter";
					}
					if(third_student_repetition_due_date){
						v_value += "<p>"+third_student_repetition_due_date+"</p>";
					}
					if(third_student_repetition_course){
						v_value += "<p>"+third_student_repetition_course+"</p>";
					}
					if(third_student_repetition_reason_desc){
						if(third_student_repetition_reason){
							v_value += "<p>"+third_student_repetition_reason+": "+third_student_repetition_reason_desc+"</p>";
						}else{
							v_value += "<p>"+third_student_repetition_reason_desc+"</p>";
						}
						
					}
					vHtml += '			<td class="text-center '+v_class+'">'+v_value;
					vHtml += '<p class="text-right">'+third_student_repetition_date+'</p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center">&nbsp;</td>';
				}
				
				if(third_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					var v_tool_tip = "";
					if(third_repetition_advise){
						v_totle_tip = 'title="'+third_repetition_advise+'"';
					}
					if(third_repetition_result == "Y"){
						v_value = "<h4 "+v_totle_tip+">O(등록)</h4>";
						v_class = "bg-green-lighter";
					}else if(third_repetition_result == "Q"){
						v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(third_repetition_result == "N"){
						v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'">'+v_value + '</td>';
				}else{
					vHtml += '			<td class="text-center">&nbsp;</td>';
				}
				
				
				if(complete_repetition_result){
					var v_value = "";
					var v_class = "";
					if(complete_repetition_result == "Y"){
						v_value = "<h4>O(등록)</h4>";
						v_class = "bg-green-lighter";
					}else{
						v_value = "<h4>X(미등록)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'">'+v_value+'</td>';
				}else{
					vHtml += '			<td>&nbsp;</td>';
				}
				
				
				if(unregistered_reason)
				{
					vHtml += '			<td>';
					vHtml += unregistered_reason+'<br>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td>&nbsp;</td>';
				}
				vHtml += '</tr>';
			}
			$("#result_list").html(vHtml);
			$("#example").tooltip();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
});


function go_school(v_foreign_gubun, v_school_gubun, v_area1, v_area2, v_school_name)
{
	window.open('/stats/school_detail.do?foreign_gubun='+v_foreign_gubun+'&&school_gubun='+v_school_gubun+'&&area1='+v_area1+'&&area2='+v_area2+'&&school_name='+v_school_name+'','school');
}

function go_course_achieve(v_course_id)
{
	window.open('/enrollment/achievement_new_action.do?orientation_code=all&&course_id='+v_course_id,'course_achievement');
}

function go_course_enrollment_achieve(v_course_enrollment_id)
{
	window.open('https://exam-us.usher.co.kr/achieve/achieve_enrollment.do?course_enrollment_id='+v_course_enrollment_id,'enrollment_achievement');
}