var semesterList;
var courseGroupList;
var courseList;
var courseAllList;
var lecture_type;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
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
			semesterList = data;
			var vHtml = "";
			var to_month = cfmGetToMonth();
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(to_month == data[i].date) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date_code+"</option>";
			}
			
			$("#search_semester_id").html(vHtml);
			
			$('#search_semester_id').change(function(e){
				search_course_all();
			});
			
			search_course_all();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_course_all()
{
	var c_semester_id = parseInt($("#search_semester_id").val());
	var c_idx = semesterList.findIndex(t => t.id == c_semester_id);
	var b_idx = c_idx + 1;
	var b_semester_id = semesterList[b_idx].id;
	
	$.ajax({
		type : "POST",
		url : "/common/getCourseAllList.do",
		data:{
			semester_id:b_semester_id
		},
		success:function(data){
		
			courseAllList = data.courseList;
			
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
		url : "/common/getCoursegroupList.do",
		data:{
			semester_id:$("#search_semester_id").val(),
			test_type:'TOEFL'
		},
		success:function(data){
			courseGroupList = data;
			var vHtml = "";
			
			for(var i=0; i<data.length; i++){
				var selected = "";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				search_course();
			});
			
			search_course();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});			
}

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
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_search()
{
	var semester_date = $("#search_semester_id option:checked").text();
	var course_group_name = $("#search_course_group_id option:checked").text();
	var course_group_id = $("#search_course_group_id").val();
	var s_idx = semesterList.findIndex(t => t.date_code == semester_date);
	var c_idx = courseGroupList.findIndex(t => t.id == course_group_id);
	var prev_semester_date = semesterList[s_idx+1].date_code;
	lecture_type = courseGroupList[c_idx].lecture_type;
	var url = "/course/getCourseStudentList.do";
	if(lecture_type=="SPECIAL"){
		url = "/course/getCourseStudentSpecialList.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			semester_date:semester_date,
			prev_semester_date:prev_semester_date,
			course_group_name:course_group_name
		},
		success:function(data){
			var courseExistsList = data.courseExistsList;
			var courseNewList = data.courseNewList;
			var enrollmentNewList = data.enrollmentNewList;
			
			var vHtml = "";
			
			//등록자
			var v_e_count = courseExistsList.filter(function(item, index){
					if(item.real_register == "등록"){
						return true;
					}
			}).length;

			var v_e_count_1 = courseExistsList.filter(function(item, index){
					if(item.real_register == "등록" && item.chamgang_yn == "N"){
						return true;
					}
			}).length;

			var v_e_count_2 = courseExistsList.filter(function(item, index){
					if(item.real_register == "등록" && item.chamgang_yn == "Y"){
						return true;
					}
			}).length;
			
			var v_n_count = enrollmentNewList.filter(function(item, index){
					if(item.real_register == "등록"){
						return true;
					}
			}).length;
			
			var v_n_count_1 = enrollmentNewList.filter(function(item, index){
					if(item.real_register == "등록" && item.chamgang_yn == "N"){
						return true;
					}
			}).length;

			var v_n_count_2 = enrollmentNewList.filter(function(item, index){
					if(item.real_register == "등록" && item.chamgang_yn == "Y"){
						return true;
					}
			}).length;

			var v_count   = v_e_count + v_n_count;
			var v_count_1 = v_e_count_1 + v_n_count_1;
			var v_count_2 = v_e_count_2 + v_n_count_2;
			
			for(var i=0; i<courseList.length; i++)
			{
				var v_course = courseList[i].name;
				var v_course_nm = "<span style='font-size:1rem;'>"+courseList[i].name+"</span>";
				var t_idx = courseAllList.findIndex(t => t.name == v_course);
				if(t_idx >= 0)
				{
					v_course_nm += "<br><span style='font-size:0.8rem;'>강사 : "+ courseAllList[t_idx].instructor_name;
					v_course_nm += "<br>매니저 : "+ courseAllList[t_idx].manager_name+"</span>";
				}
				//등록자
				var v_c_e_count = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "등록"){
							return true;
						}
				}).length;
				
				var v_c_e_count_1 = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "등록" && item.chamgang_yn == "N"){
							return true;
						}
				}).length;

				var v_c_e_count_2 = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "등록" && item.chamgang_yn == "Y"){
							return true;
						}
				}).length;
				
				var v_c_n_count = enrollmentNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "등록"){
							return true;
						}
				}).length;
				
				var v_c_n_count_1 = enrollmentNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "등록" && item.chamgang_yn == "N"){
							return true;
						}
				}).length;
				
				var v_c_n_count_2 = enrollmentNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "등록" && item.chamgang_yn == "Y"){
							return true;
						}
				}).length;
				
				var v_c_n_e_count = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "등록"){
							return true;
						}
				}).length;
				
				var v_c_n_e_count_1 = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "등록" && item.chamgang_yn == "N"){
							return true;
						}
				}).length;

				var v_c_n_e_count_2 = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "등록" && item.chamgang_yn == "Y"){
							return true;
						}
				}).length;

				var v_c_count   = v_c_e_count  + v_c_n_count;
				var v_c_count_1 = v_c_e_count_1 + v_c_n_count_1;
				var v_c_count_2 = v_c_e_count_2 + v_c_n_count_2;
				var v_c_m_count = v_c_n_count - v_c_n_e_count;
				vHtml += '<tr>';
				//기존
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-teal">등록자(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_e_count+'('+v_e_count_1+'/'+v_e_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center">'+v_course_nm+'</th>';
				
				vHtml += '<td class="text-center" style="font-size:1.2rem"><a href="javascript:go_detail_exists(\''+v_course+'\', \'등록\', '+v_c_e_count+')">'+v_c_e_count+'('+v_c_e_count_1+'/'+v_c_e_count_2+')'+'</a></td>';
				
				//신규
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-teal ">등록자(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_n_count+'('+v_n_count_1+'/'+v_n_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center">'+v_course_nm+'</th>';
				
				/*
				if(v_c_m_count > 0)
				{
					var array_not_student = Array();
					
					var arr_enrollment = enrollmentNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "등록"){
							return true;
						}
					});
					
					var arr_batch = courseNewList.filter(function(item, index){
							if(item.course_name == v_course &&item.real_register == "등록"){
								return true;
							}
					});
					for(var j=0; j<arr_enrollment.length; j++)
					{
						var v_user_id = arr_enrollment[j].user_id;
						
						var a_idx = arr_batch.findIndex(t => t.user_id == v_user_id);
						if(a_idx < 0){
							array_not_student.push(v_user_id);
						}
					}
					vHtml += '<td class="text-center" style="font-size:1.2rem"><a href="javascript:go_detail(\''+v_course+'\', \'등록\', '+v_c_n_count+')">'+v_c_n_count+'</a>(<a href="javascript:go_detail_not(\''+array_not_student.join(",")+'\')">'+v_c_m_count+')</td>';
				}else{
					vHtml += '<td class="text-center" style="font-size:1.2rem"><a href="javascript:go_detail(\''+v_course+'\', \'등록\', '+v_c_n_count+')">'+v_c_n_count+'</a></td>';
				}
				*/
				
				vHtml += '<td class="text-center" style="font-size:1.2rem"><a href="javascript:go_detail(\''+v_course+'\', \'등록\', '+v_c_n_count+')">'+v_c_n_count+'('+v_c_n_count_1+'/'+v_c_n_count_2+')'+'</a></td>';
				//합계
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-teal">등록자(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_count+'('+v_count_1+'/'+v_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center" >'+v_course_nm+'</th>';
				vHtml += '<td class="text-center"  style="font-size:1.2rem">'+v_c_count+'('+v_c_count_1+'/'+v_c_count_2+')'+'</td>';
				
				vHtml += '</tr>';
			}
			
			//예정
			var v_e_count = courseExistsList.filter(function(item, index){
					if(item.real_register == "예정"){
						return true;
					}
			}).length;

			var v_e_count_1 = courseExistsList.filter(function(item, index){
					if(item.real_register == "예정" && item.chamgang_yn == "N"){
						return true;
					}
			}).length;

			var v_e_count_2 = courseExistsList.filter(function(item, index){
					if(item.real_register == "예정" && item.chamgang_yn == "Y"){
						return true;
					}
			}).length;

			var v_n_count = courseNewList.filter(function(item, index){
					if(item.real_register == "예정"){
						return true;
					}
			}).length;
			
			var v_n_count_1 = courseNewList.filter(function(item, index){
					if(item.real_register == "예정" && item.chamgang_yn == "N"){
						return true;
					}
			}).length;

			var v_n_count_2 = courseNewList.filter(function(item, index){
					if(item.real_register == "예정" && item.chamgang_yn == "Y"){
						return true;
					}
			}).length;

			var v_count   = v_e_count   + v_n_count;
			var v_count_1 = v_e_count_1 + v_n_count_1;
			var v_count_2 = v_e_count_2 + v_n_count_2;
			
			for(var i=0; i<courseList.length; i++)
			{
				var v_course = courseList[i].name;
				var v_course_nm = "<span style='font-size:1rem;'>"+courseList[i].name+"</span>";
				var t_idx = courseAllList.findIndex(t => t.name == v_course);
				if(t_idx >= 0)
				{
					v_course_nm += "<br><span style='font-size:0.8rem;'>강사 : "+ courseAllList[t_idx].instructor_name;
					v_course_nm += "<br>매니저 : "+ courseAllList[t_idx].manager_name+"</span>";
				}
				
				//등록자
				var v_c_e_count = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "예정"){
							return true;
						}
				}).length;

				var v_c_e_count_1 = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "예정" && item.chamgang_yn == "N"){
							return true;
						}
				}).length;

				var v_c_e_count_2 = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "예정" && item.chamgang_yn == "Y"){
							return true;
						}
				}).length;

				var v_c_n_count = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "예정"){
							return true;
						}
				}).length;
				
				var v_c_n_count_1 = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "예정" && item.chamgang_yn == "N"){
							return true;
						}
				}).length;

				var v_c_n_count_2 = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "예정" && item.chamgang_yn == "Y"){
							return true;
						}
				}).length;

				var v_c_count   = v_c_e_count + v_c_n_count;
				var v_c_count_1 = v_c_e_count_1 + v_c_n_count_1;
				var v_c_count_2 = v_c_e_count_2 + v_c_n_count_2;

				vHtml += '<tr>';
				//기존
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-aqua">예정자(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_e_count+'('+v_e_count_1+'/'+v_e_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center">'+v_course_nm+'</th>';
				vHtml += '<td class="text-center" style="font-size:1.2rem"><a href="javascript:go_detail_exists(\''+v_course+'\', \'예정\', '+v_c_e_count+')">'+v_c_e_count+'('+v_c_e_count_1+'/'+v_c_e_count_2+')'+'</a></td>';
				//신규
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-aqua">예정자(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_n_count+'('+v_n_count_1+'/'+v_n_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center">'+v_course_nm+'</th>';
				vHtml += '<td class="text-center" style="font-size:1.2rem"><a href="javascript:go_detail(\''+v_course+'\', \'예정\', '+v_c_n_count+')">'+v_c_n_count+'('+v_c_n_count_1+'/'+v_c_n_count_2+')'+'</a></td>';

				//합계
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-aqua">미등록(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_count+'('+v_count_1+'/'+v_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center">'+v_course_nm+'</th>';
				vHtml += '<td class="text-center" style="font-size:1.2rem">'+v_c_count+'('+v_c_count_1+'/'+v_c_count_2+')'+'</td>';
				
				vHtml += '</tr>';
			}
			
			//고민
			var v_e_count = courseExistsList.filter(function(item, index){
					if(item.real_register == "고민"){
						return true;
					}
			}).length;

			var v_e_count_1 = courseExistsList.filter(function(item, index){
					if(item.real_register == "고민" && item.chamgang_yn == "N"){
						return true;
					}
			}).length;

			var v_e_count_2 = courseExistsList.filter(function(item, index){
					if(item.real_register == "고민" && item.chamgang_yn == "Y"){
						return true;
					}
			}).length;

			var v_n_count = courseNewList.filter(function(item, index){
					if(item.real_register == "고민"){
						return true;
					}
			}).length;
			
			var v_n_count_1 = courseNewList.filter(function(item, index){
					if(item.real_register == "고민" && item.chamgang_yn == "N"){
						return true;
					}
			}).length;

			var v_n_count_2 = courseNewList.filter(function(item, index){
					if(item.real_register == "고민" && item.chamgang_yn == "Y"){
						return true;
					}
			}).length;

			var v_count   = v_e_count   + v_n_count;
			var v_count_1 = v_e_count_1 + v_n_count_1;
			var v_count_2 = v_e_count_2 + v_n_count_2;
			
			for(var i=0; i<courseList.length; i++)
			{
				var v_course = courseList[i].name;
				var v_course_nm = "<span style='font-size:1rem;'>"+courseList[i].name+"</span>";
				var t_idx = courseAllList.findIndex(t => t.name == v_course);
				if(t_idx >= 0)
				{
					v_course_nm += "<br><span style='font-size:0.8rem;'>강사 : "+ courseAllList[t_idx].instructor_name;
					v_course_nm += "<br>매니저 : "+ courseAllList[t_idx].manager_name+"</span>";
				}
				//등록자
				var v_c_e_count = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "고민"){
							return true;
						}
				}).length;

				var v_c_e_count_1 = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "고민" && item.chamgang_yn == "N"){
							return true;
						}
				}).length;

				var v_c_e_count_2 = courseExistsList.filter(function(item, index){
						if(item.course_name == v_course && item.real_register == "고민" && item.chamgang_yn == "Y"){
							return true;
						}
				}).length;

				var v_c_n_count = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "고민"){
							return true;
						}
				}).length;
				
				var v_c_n_count_1 = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "고민" && item.chamgang_yn == "N"){
							return true;
						}
				}).length;

				var v_c_n_count_1 = courseNewList.filter(function(item, index){
						if(item.course_name == v_course &&item.real_register == "고민" && item.chamgang_yn == "Y"){
							return true;
						}
				}).length;

				var v_c_count   = v_c_e_count   + v_c_n_count;
				var v_c_count_1 = v_c_e_count_1 + v_c_n_count_1;
				var v_c_count_2 = v_c_e_count_2 + v_c_n_count_2;

				vHtml += '<tr>';
				//기존
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-yellow-lighter">고민자(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_e_count+'('+v_e_count_1+'/'+v_e_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center">'+v_course_nm+'</th>';
				vHtml += '<td class="text-center" style="font-size:1.2rem">'+v_c_e_count+'('+v_c_e_count_1+'/'+v_c_e_count_2+')'+'</td>';
				//신규
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-yellow-lighter">고민자(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_n_count+'('+v_n_count_1+'/'+v_n_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center">'+v_course_nm+'</th>';
				vHtml += '<td class="text-center" style="font-size:1.2rem"><a href="javascript:go_detail(\''+v_course+'\', \'고민\', '+v_c_n_count+')">'+v_c_n_count+'('+v_c_n_count_1+'/'+v_c_n_count_2+')'+'</a></td>';

				//합계
				if(i == 0)
				{
					vHtml += '<th class="text-center bg-yellow-lighter">고민(현강/참강)</th>';
				}else if(i == 1)
				{
					vHtml += '<th class="text-center" style="font-size:1.2rem">'+v_count+'('+v_count_1+'/'+v_count_2+')'+'</th>';
				}else{
					vHtml += '<th class="text-center">&nbsp;</th>';
				}
				vHtml += '<th class="text-center ">'+v_course_nm+'</th>';
				vHtml += '<td class="text-center " style="font-size:1.2rem">'+v_c_count+'('+v_c_count_1+'/'+v_c_count_2+')'+'</td>';
				
				vHtml += '</tr>';
			}
			
			$("#data_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function go_detail(v_course_name, v_real_search_register, v_count)
{
	var v_semester_date = $("#search_semester_id option:checked").text();
	var v_course_group_name = $("#search_course_group_id option:checked").text();
	if(lecture_type == 'SPECIAL'){
		v_course_group_name = "주니어 특강";
	}
	if(v_count > 0)
	{
		window.open("/course/course_student_form.do?semester_date="+v_semester_date+"&&course_group_name="+v_course_group_name+"&&course_name="+v_course_name+"&&real_search_register="+v_real_search_register,'course_student_stats');
	}
}

function go_detail_exists(v_course_name, v_real_search_register, v_count)
{
	var v_semester_date = $("#search_semester_id option:checked").text();
	var v_course_group_name = $("#search_course_group_id option:checked").text();
	var s_idx = semesterList.findIndex(t => t.date_code == v_semester_date);
	var v_prev_semester_date = semesterList[s_idx+1].date_code;
	
	if(v_count > 0)
	{
		window.open("/course/course_student_exists_form.do?prev_semester_date="+v_prev_semester_date+"&&semester_date="+v_semester_date+"&&course_group_name="+v_course_group_name+"&&course_name="+v_course_name+"&&real_search_register="+v_real_search_register+"&&lecture_type="+lecture_type,'course_student_stats');
	}
}
function go_detail_not(user_list)
{
	window.open("/course/course_student_not_form.do?user_multi_id="+user_list,'course_student_not');
}