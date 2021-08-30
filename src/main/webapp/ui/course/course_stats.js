var array_type=[
	{test_type:"TOEFL", student_type:"SENIOR", lecture_type:"REGULAR", days:"2,3,4,5,6", name:"성인 정규"},
	{test_type:"TOEFL", student_type:"JUNIOR", lecture_type:"REGULAR", days:"2,4,6",     name:"주니어 월수금"},
	{test_type:"TOEFL", student_type:"JUNIOR", lecture_type:"REGULAR", days:"3,5",       name:"주니어 화목"},
	{test_type:"TOEFL", student_type:"JUNIOR", lecture_type:"SPECIAL", days:"2,3,4,5,6", name:"주니어 특강"}
]
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
		url : "/course/getCourseStatsSemesterList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(i == (data.length-1)) selected = "selected";
				vHtml += "<option value='"+data[i].semester_id+"' "+selected+">"+data[i].semester_date+"</option>";
			}
			
			$("#search_semester_start_id").html(vHtml);
			
			vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(i == 0) selected = "selected";
				vHtml += "<option value='"+data[i].semester_id+"' "+selected+">"+data[i].semester_date+"</option>";
			}
			$("#search_semester_end_id").html(vHtml);
			
			$('#search_semester_start_id').change(function(e){
				form_search();
			});
			
			$('#search_semester_end_id').change(function(e){
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
	var t_table_seq = 1;
	$.ajax({
		type : "POST",
		url : "/course/getCourseStatsList.do",
		data:{
			semester_start_id:$("#search_semester_start_id").val(),
			semester_end_id:$("#search_semester_end_id").val()
		},
		success:function(data){
			$("#data_list").html("");
			var vHtml = "";
			var courseSemesterList = data.courseSemesterList;
			var courseUserList     = data.courseUserList;
			var courseStatsList    = data.courseStatsList;
			
			for(var i=0; i<array_type.length; i++)
			{
				var v_test_type    = array_type[i].test_type;
				var v_student_type = array_type[i].student_type;
				var v_lecture_type = array_type[i].lecture_type;
				var v_days         = array_type[i].days;
				var v_name         = array_type[i].name;
				
				var array_course_group_stats = courseStatsList.filter(function(item, index){
													if(item.test_type == v_test_type &&
														item.student_type == v_student_type &&
														item.lecture_type == v_lecture_type &&
														item.days == v_days
													){
														return true;
													}
												});
				
				if(array_course_group_stats.length > 0){
					vHtml = "";
					vHtml += '<div class="row mt-3">';
					vHtml += '	<div class="col-12">';
					vHtml += '		<h4>'+v_name+'</h4>';
					vHtml += '	</div>';
					vHtml += '</div>';
					$("#data_list").append(vHtml);
					
					//강사 부분
					var array_course_group_teacher_stats = array_course_group_stats.filter(function(item, index){
						if(item.course_teacher_id > 0 ){
							return true;
						}
					});
					if(array_course_group_teacher_stats.length > 0){
						vHtml = "";
						vHtml += '<div class="row mt-2">';
						vHtml += '	<div class="col-12">';
						vHtml += '		<h5>강사</h5>';
						vHtml += '	</div>';
						vHtml += '</div>';
						$("#data_list").append(vHtml);
						
						for(var j=0; j<courseUserList.length; j++)
						{
							var v_course_teacher_id   = courseUserList[j].course_teacher_id;
							var v_course_teacher_name = courseUserList[j].course_teacher_name;
							var array_stats = array_course_group_stats.filter(function(item, index){
								if(item.course_teacher_id == v_course_teacher_id ){
									return true;
								}
							});
							if(array_stats.length > 0){
								create_table(v_course_teacher_name, t_table_seq, courseSemesterList, array_stats, v_lecture_type);
								t_table_seq++;
							}
							
						}
					}
					//매니저 부분
					var array_course_group_manage_stats = array_course_group_stats.filter(function(item, index){
						if(item.course_manage_id > 0 ){
							return true;
						}
					});
					
					if(array_course_group_manage_stats.length > 0){
						
						vHtml = "";
						vHtml += '<div class="row mt-3">';
						vHtml += '	<div class="col-12">';
						vHtml += '		<h5>매니저</h5>';
						vHtml += '	</div>';
						vHtml += '</div>';
						$("#data_list").append(vHtml);
						
						for(var j=0; j<courseUserList.length; j++)
						{
							var v_course_teacher_id   = courseUserList[j].course_teacher_id;
							var v_course_teacher_name = courseUserList[j].course_teacher_name;
							var array_stats = array_course_group_stats.filter(function(item, index){
								if(item.course_manage_id == v_course_teacher_id ){
									return true;
								}
							});
							if(array_stats.length > 0){
								create_table(v_course_teacher_name, t_table_seq, courseSemesterList, array_stats, v_lecture_type);
								t_table_seq++;
							}
							
						}
					}
				}
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_table(v_teacher_name, v_table_seq, courseSemesterList, statsList, v_lecture_type)
{
	var v_table_id = "table_group_"+v_table_seq;
	var nWidth  = 200;
	var nHeight = 40;
	var vHtml = "";
	vHtml += '<div class="row">';
	vHtml += '	<div class="col-12">';
	vHtml += '		<div class="table-responsive">';
	vHtml += '			<table id="'+v_table_id+'"  class="table table-bordered table-td-valign-middle m-b-0">';
	vHtml += '				<thead>';
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<th class="text-center table-info" style="width:80px;">이름</th>';
	vHtml += '						<th class="text-center table-info" style="width:80px;">항목</th>';
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		var nColspan = 1;
		if(array_stats.length > 1) nColspan = array_stats.length;
		//vHtml += '						<th class="text-center table-info" colspan="'+nColspan+'" style="width:'+(nWidth*nColspan)+'px;">'+v_semester_date+'</th>';
		for(var t=0; t<nColspan; t++){
			vHtml += '						<th class="text-center table-info" style="width:'+nWidth+'px;">'+v_semester_date+'</th>';
		}
	}
	vHtml += '						<th class="text-center table-info" style="width:'+nWidth+'px;">평균</th>';
	vHtml += '					</tr>';
	vHtml += '				<thead>';
	vHtml += '				<tbody>';
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">'+v_teacher_name+'</td>';
	vHtml += '						<td class="text-center" style="width:80px;">반</td>';
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var v_course_name = "";
				if(v_lecture_type == "SPECIAL"){
					v_course_name = array_stats[j].course_group_name+" ";
				}
				v_course_name += array_stats[j].course_name;
				vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+v_course_name+'</td>';
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
	vHtml += '					</tr>';

	//재수강율
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">&nbsp;</td>';
	vHtml += '						<td class="text-center" style="width:80px;">재수강율</td>';
	var total_repeat_class_count = 0;
	var total_repeat_class_total_count = 0;
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var repeat_class_count = array_stats[j].repeat_class_count;
				var repeat_class_total_count = array_stats[j].repeat_class_total_count;
				var repeat_class_rate = 0;
				total_repeat_class_count += repeat_class_count;
				total_repeat_class_total_count += repeat_class_total_count;
				if(repeat_class_total_count > 0){
					repeat_class_rate = Math.round(repeat_class_count/repeat_class_total_count*100);
				}
				
				vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+repeat_class_rate+'%('+repeat_class_count+'/'+repeat_class_total_count+')</td>';
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	var total_repeat_class_rate = 0;
	if(total_repeat_class_total_count > 0){
		total_repeat_class_rate = Math.round(total_repeat_class_count/total_repeat_class_total_count*100);
	}
	
	vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+total_repeat_class_rate+'%('+total_repeat_class_count+'/'+total_repeat_class_total_count+')</td>';
	vHtml += '					</tr>';
	
	//출석율
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">&nbsp;</td>';
	vHtml += '						<td class="text-center" style="width:80px;">출석율</td>';
	var total_attendance_count = 0;
	var total_attendance_total_count = 0;
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var attendance_count = array_stats[j].attendance_count;
				var attendance_total_count = array_stats[j].attendance_total_count;
				var attendance_rate = 0;
				total_attendance_count += attendance_count;
				total_attendance_total_count += attendance_total_count;
				if(attendance_total_count > 0){
					attendance_rate = Math.round(attendance_count/attendance_total_count*100);
				}
				
				vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+attendance_rate+'%('+attendance_count+'/'+attendance_total_count+')</td>';
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	var total_attendance_rate = 0;
	if(total_attendance_total_count > 0){
		attendance_rate = Math.round(total_attendance_count/total_attendance_total_count*100);
	}
	
	vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+attendance_rate+'%('+total_attendance_count+'/'+total_attendance_total_count+')</td>';
	vHtml += '					</tr>';
	
	//VOCA
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">&nbsp;</td>';
	vHtml += '						<td class="text-center" style="width:80px;">VC</td>';
	var total_exam_voca_pass_count = 0;
	var total_exam_voca_total_count = 0;
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var exam_voca_class_name = array_stats[j].exam_voca_class_name;
				var exam_voca_study_name = array_stats[j].exam_voca_study_name;
				var exam_voca_name = "";
				if(exam_voca_class_name){
					exam_voca_name = exam_voca_class_name;
				}
				if(exam_voca_study_name){
					if(exam_voca_name) exam_voca_name += "/";
					exam_voca_name += exam_voca_study_name;
				}
				var exam_voca_pass_count = array_stats[j].exam_voca_pass_count;
				var exam_voca_total_count = array_stats[j].exam_voca_total_count;
				var exam_voca_rate = 0;
				total_exam_voca_pass_count += exam_voca_pass_count;
				total_exam_voca_total_count += exam_voca_total_count;
				if(exam_voca_total_count > 0){
					exam_voca_rate = Math.round(exam_voca_pass_count/exam_voca_total_count*100);
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+exam_voca_rate+'%('+exam_voca_pass_count+'/'+exam_voca_total_count+')('+exam_voca_name+')</td>';
				}else{
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
				}
				
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	var total_exam_voca_rate = 0;
	if(total_exam_voca_total_count > 0){
		total_exam_voca_rate = Math.round(total_exam_voca_pass_count/total_exam_voca_total_count*100);
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+total_exam_voca_rate+'%('+total_exam_voca_pass_count+'/'+total_exam_voca_total_count+')</td>';
	}else{
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
	}
	
	vHtml += '					</tr>';
	
	//GR
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">&nbsp;</td>';
	vHtml += '						<td class="text-center" style="width:80px;">GR</td>';
	var total_exam_gr_pass_count = 0;
	var total_exam_gr_total_count = 0;
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var exam_gr_class_name = array_stats[j].exam_gr_class_name;
				var exam_gr_study_name = array_stats[j].exam_gr_study_name;
				var exam_gr_name = "";
				if(exam_gr_class_name){
					exam_gr_name = exam_gr_class_name;
				}
				if(exam_gr_study_name){
					if(exam_gr_name) exam_gr_name += "/";
					exam_gr_name += exam_gr_study_name;
				}
				var exam_gr_pass_count = array_stats[j].exam_gr_pass_count;
				var exam_gr_total_count = array_stats[j].exam_gr_total_count;
				var exam_gr_rate = 0;
				total_exam_gr_pass_count += exam_gr_pass_count;
				total_exam_gr_total_count += exam_gr_total_count;
				if(exam_gr_total_count > 0){
					exam_gr_rate = Math.round(exam_gr_pass_count/exam_gr_total_count*100);
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+exam_gr_rate+'%('+exam_gr_pass_count+'/'+exam_gr_total_count+')('+exam_gr_name+')</td>';
				}else{
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
				}
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	var total_exam_gr_rate = 0;
	if(total_exam_gr_total_count > 0){
		total_exam_gr_rate = Math.round(total_exam_gr_pass_count/total_exam_gr_total_count*100);
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+total_exam_gr_rate+'%('+total_exam_gr_pass_count+'/'+total_exam_gr_total_count+')</td>';
	}else{
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
	}
	
	vHtml += '					</tr>';
	
	//RC
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">&nbsp;</td>';
	vHtml += '						<td class="text-center" style="width:80px;">RC</td>';
	var total_exam_rc_pass_count = 0;
	var total_exam_rc_total_count = 0;
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var exam_rc_class_name = array_stats[j].exam_rc_class_name;
				var exam_rc_study_name = array_stats[j].exam_rc_study_name;
				var exam_rc_name = "";
				if(exam_rc_class_name){
					exam_rc_name = exam_rc_class_name;
				}
				if(exam_rc_study_name){
					if(exam_rc_name) exam_rc_name += "/";
					exam_rc_name += exam_rc_study_name;
				}
				var exam_rc_pass_count = array_stats[j].exam_rc_pass_count;
				var exam_rc_total_count = array_stats[j].exam_rc_total_count;
				var exam_rc_rate = 0;
				total_exam_rc_pass_count += exam_rc_pass_count;
				total_exam_rc_total_count += exam_rc_total_count;
				if(exam_rc_total_count > 0){
					exam_rc_rate = Math.round(exam_rc_pass_count/exam_rc_total_count*100);
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+exam_rc_rate+'%('+exam_rc_pass_count+'/'+exam_rc_total_count+')('+exam_rc_name+')</td>';
				}else{
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
				}
				
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	var total_exam_rc_rate = 0;
	if(total_exam_rc_total_count > 0){
		total_exam_rc_rate = Math.round(total_exam_rc_pass_count/total_exam_rc_total_count*100);
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+total_exam_rc_rate+'%('+total_exam_rc_pass_count+'/'+total_exam_rc_total_count+')</td>';
	}else{
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
	}
	
	vHtml += '					</tr>';
	
	//LC
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">&nbsp;</td>';
	vHtml += '						<td class="text-center" style="width:80px;">LC</td>';
	var total_exam_lc_pass_count = 0;
	var total_exam_lc_total_count = 0;
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var exam_lc_class_name = array_stats[j].exam_lc_class_name;
				var exam_lc_study_name = array_stats[j].exam_lc_study_name;
				var exam_lc_name = "";
				if(exam_lc_class_name){
					exam_lc_name = exam_lc_class_name;
				}
				if(exam_lc_study_name){
					if(exam_lc_name) exam_lc_name += "/";
					exam_lc_name += exam_lc_study_name;
				}
				var exam_lc_pass_count = array_stats[j].exam_lc_pass_count;
				var exam_lc_total_count = array_stats[j].exam_lc_total_count;
				var exam_lc_rate = 0;
				total_exam_lc_pass_count += exam_lc_pass_count;
				total_exam_lc_total_count += exam_lc_total_count;
				if(exam_lc_total_count > 0){
					exam_lc_rate = Math.round(exam_lc_pass_count/exam_lc_total_count*100);
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+exam_lc_rate+'%('+exam_lc_pass_count+'/'+exam_lc_total_count+')('+exam_lc_name+')</td>';
				}else{
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
				}
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	var total_exam_lc_rate = 0;
	if(total_exam_lc_total_count > 0){
		total_exam_lc_rate = Math.round(total_exam_lc_pass_count/total_exam_lc_total_count*100);
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+total_exam_lc_rate+'%('+total_exam_lc_pass_count+'/'+total_exam_lc_total_count+')</td>';
	}else{
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
	}
	
	vHtml += '					</tr>';
	
	//SP
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">&nbsp;</td>';
	vHtml += '						<td class="text-center" style="width:80px;">SP</td>';
	var total_exam_sp_pass_count = 0;
	var total_exam_sp_total_count = 0;
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var exam_sp_class_name = array_stats[j].exam_sp_class_name;
				var exam_sp_study_name = array_stats[j].exam_sp_study_name;
				var exam_sp_name = "";
				if(exam_sp_class_name){
					exam_sp_name = exam_sp_class_name;
				}
				if(exam_sp_study_name){
					if(exam_sp_name) exam_sp_name += "/";
					exam_sp_name += exam_sp_study_name;
				}
				var exam_sp_pass_count = array_stats[j].exam_sp_pass_count;
				var exam_sp_total_count = array_stats[j].exam_sp_total_count;
				var exam_sp_rate = 0;
				total_exam_sp_pass_count += exam_sp_pass_count;
				total_exam_sp_total_count += exam_sp_total_count;
				if(exam_sp_total_count > 0){
					exam_sp_rate = Math.round(exam_sp_pass_count/exam_sp_total_count*100);
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+exam_sp_rate+'%('+exam_sp_pass_count+'/'+exam_sp_total_count+')('+exam_sp_name+')</td>';
				}else{
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
				}
				
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	var total_exam_sp_rate = 0;
	if(total_exam_sp_total_count > 0){
		total_exam_sp_rate = Math.round(total_exam_sp_pass_count/total_exam_sp_total_count*100);
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+total_exam_sp_rate+'%('+total_exam_sp_pass_count+'/'+total_exam_sp_total_count+')</td>';
	}else{
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
	}
	
	vHtml += '					</tr>';
	
	//WR
	vHtml += '					<tr style="height:'+nHeight+'px">';
	vHtml += '						<td class="text-center" style="width:80px;">&nbsp;</td>';
	vHtml += '						<td class="text-center" style="width:80px;">WR</td>';
	var total_exam_wr_pass_count = 0;
	var total_exam_wr_total_count = 0;
	for(var i=0;i<courseSemesterList.length; i++)
	{
		var v_semester_id   = courseSemesterList[i].semester_id;
		var v_semester_date = courseSemesterList[i].semester_date;
		var array_stats = statsList.filter(function(item, index){
			if(item.semester_id == v_semester_id ){
				return true;
			}
		});
		
		if(array_stats.length > 0){
			for(var j=0; j<array_stats.length; j++)
			{
				var exam_wr_class_name = array_stats[j].exam_wr_class_name;
				var exam_wr_study_name = array_stats[j].exam_wr_study_name;
				var exam_wr_name = "";
				if(exam_wr_class_name){
					exam_wr_name = exam_wr_class_name;
				}
				if(exam_wr_study_name){
					if(exam_wr_name) exam_wr_name += "/";
					exam_wr_name += exam_wr_study_name;
				}
				var exam_wr_pass_count = array_stats[j].exam_wr_pass_count;
				var exam_wr_total_count = array_stats[j].exam_wr_total_count;
				var exam_wr_rate = 0;
				total_exam_wr_pass_count += exam_wr_pass_count;
				total_exam_wr_total_count += exam_wr_total_count;
				if(exam_wr_total_count > 0){
					exam_wr_rate = Math.round(exam_wr_pass_count/exam_wr_total_count*100);
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+exam_wr_rate+'%('+exam_wr_pass_count+'/'+exam_wr_total_count+')('+exam_wr_name+')</td>';
				}else{
					vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
				}
				
			}			
		}else{
			vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
		}
	}
	var total_exam_wr_rate = 0;
	if(total_exam_wr_total_count > 0){
		total_exam_wr_rate = Math.round(total_exam_wr_pass_count/total_exam_wr_total_count*100);
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">'+total_exam_wr_rate+'%('+total_exam_wr_pass_count+'/'+total_exam_wr_total_count+')</td>';
	}else{
		vHtml += '						<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
	}
	
	vHtml += '					</tr>';
	
	vHtml += '				<tbody>';
	vHtml += '			</table>';
	vHtml += '		</div>';
	vHtml += '	</div>';
	vHtml += '</div>';
	
	$("#data_list").append(vHtml);
	
	oTable = $('#'+v_table_id).DataTable( {
		ordering:false,
		searching:false,
        info:false,
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   {
            leftColumns: 2,
            //rightColumns: 1
        }
    } );
	
	$("#"+v_table_id+" tbody tr td").css("padding","10px");
}