var junior_regular_class_list = [
	[10, 15],
	[20, 30],
	[36, 48],
	[36, 48],
	[36, 48]
]

var junior_special_class_list = [
	[10, 15],
	[15, 30],
	[15, 30],
	[15, 30],
	[15, 30]
]

var senior_regular_class_list = [
	[1, 2],
	[1, 2],
	[1, 2],
	[1, 2],
	[1, 2]
]

var course_id;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_school_name").keydown(function(key) {
		if (key.keyCode == 13) {
			search_school_list();
		}
	});
	
	
	search_semester();
	showCourses(false);
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
			courseList = data.courseList;
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
					vHtml += '		<a href="javascript:form_sitemap_select(\''+vTitle+'\','+arr_course[j].id+','+arr_course[j].course_group_id+')"><h5>'+arr_course[j].name+'반</h5></a>';
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

function form_sitemap_select(v_title, v_course_id, v_group_id)
{
	course_id = v_course_id;
	//$("#select_course_name").html(v_title);
	$('#select_courses').modal("hide"); 
	//search_course(v_group_id);
	
	//location.replace("/enrollment/repetition_enrollment.do?id="+v_course_id);
	form_search();
}

function form_course_cancel()
{
	$('#select_courses').modal("hide"); 
}

var courseInfo;
var enrollmentList;
var repetitionList;
var classCountList;
function form_search()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getRepetitionEnrollmentSummaryList.do",
		data:{
			course_id:course_id
		},
		success:function(data){
			vSeq = 1;
			courseInfo     = data.courseInfo;
			enrollmentList = data.enrollmentList;
			repetitionList = data.repetitionList;
			classCountList = data.classCountList;
			
			$("#course_info").html(courseInfo.course_group_name+" "+courseInfo.name+"반");
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-grey" style="width:240px;" colspan="3">재수강률</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;" id="first_repetition_result">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;" id="second_repetition_result">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;" id="third_student_result">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;" id="third_repetition_result">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;" id="complete_repetition_result">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:150px;">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-grey" style="width:240px;" colspan="3">강사 신뢰도</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:150px;">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-grey" style="width:240px;" colspan="3">매니저 신뢰도</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:100px;">&nbsp;</th>';
			vHtml += '			<th class="text-center table-grey" style="width:150px;">&nbsp;</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">기존/신규</th>';
			vHtml += '			<th class="text-center table-success" style="width:100px;">1주차<br>재수강 가능성</th>';
			vHtml += '			<th class="text-center table-warning" style="width:100px;">2주차<br>재수강 가능성</th>';
			vHtml += '			<th class="text-center table-primary" style="width:100px;">3주차<br>재수강 학생조사</th>';
			vHtml += '			<th class="text-center table-primary" style="width:100px;">3주차<br>재수강 조사</th>';
			vHtml += '			<th class="text-center table-danger" style="width:100px;">실제 등록</th>';
			vHtml += '			<th class="text-center table-danger" style="width:150px;">사유</th>';
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			
			var first_repetition_result_count = 0;
			var second_repetition_result_count = 0;
			var third_student_result_count = 0;
			var third_repetition_result_count = 0;
			var complete_repetition_result_count = 0;
			var total_student_count = 0;
			for(var i=0; i<enrollmentList.length; i++)
			{
				total_student_count++;
				var course_enrollment_id = enrollmentList[i].course_enrollment_id;
				var user_id              = enrollmentList[i].user_id;;
				var student_name         = enrollmentList[i].last_name+enrollmentList[i].first_name;
				vHtml += '<tr>';
				vHtml += create_student_info_achieve(enrollmentList[i], courseInfo, classCountList);
				
				var first_repetition_result = "";
				var first_repetition_result_name = "";
				var first_repetition_result_date = "";
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
				
				var a_idx = repetitionList.findIndex(t => t.course_enrollment_id == course_enrollment_id);
				if(a_idx >= 0){

					goal_repetition_advise          = repetitionList[a_idx].goal_repetition_advise;
					goal_repetition_advise_name     = repetitionList[a_idx].goal_repetition_advise_name;
					goal_repetition_advise_date     = repetitionList[a_idx].goal_repetition_advise_date;
					first_repetition_result         = repetitionList[a_idx].first_repetition_result;
					first_repetition_result_name    = repetitionList[a_idx].first_repetition_result_name;
					first_repetition_result_date    = repetitionList[a_idx].first_repetition_result_date;
					second_repetition_result        = repetitionList[a_idx].second_repetition_result;
					second_repetition_result_name   = repetitionList[a_idx].second_repetition_result_name;
					second_repetition_result_date   = repetitionList[a_idx].second_repetition_result_date;
					second_repetition_advise        = repetitionList[a_idx].second_repetition_advise;
					second_repetition_advise_name   = repetitionList[a_idx].second_repetition_advise_name;
					second_repetition_advise_date   = repetitionList[a_idx].second_repetition_advise_date;

					third_student_repetition_result = repetitionList[a_idx].third_student_repetition_result;
					third_student_repetition_result_desc = repetitionList[a_idx].third_student_repetition_result;
					third_student_repetition_reason = repetitionList[a_idx].third_student_repetition_result;
					third_student_repetition_reason_desc = repetitionList[a_idx].third_student_repetition_result;
					third_student_repetition_course = repetitionList[a_idx].third_student_repetition_result;
					third_student_repetition_due_date = repetitionList[a_idx].third_student_repetition_result;
					third_student_repetition_date = repetitionList[a_idx].third_student_repetition_result;
					
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
				
				
				if(first_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					var v_tool_tip = "";
					if(goal_repetition_advise){
						v_totle_tip = 'title="'+goal_repetition_advise+'"';
					}
					if(first_repetition_result == "Y"){
						v_value = "<h4 "+v_totle_tip+">O(등록)</h4>";
						v_class = "bg-green-lighter";
						first_repetition_result_count++;
					}else if(first_repetition_result == "Q"){
						v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(first_repetition_result == "N"){
						v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value+'</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
				}

				
				if(second_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					var v_tool_tip = "";
					if(second_repetition_advise){
						v_totle_tip = 'title="'+second_repetition_advise+'"';
					}
					if(second_repetition_result == "Y"){
						v_value = "<h4 "+v_totle_tip+">O(등록)</h4>";
						v_class = "bg-green-lighter";
						second_repetition_result_count++;
					}else if(second_repetition_result == "Q"){
						v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(second_repetition_result == "N"){
						v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value+'</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
				}
				
				if(third_student_repetition_result)
				{
					var v_value = "";
					var v_class = "";
					if(third_student_repetition_result == "Y"){
						v_value = "<h4>O("+third_student_repetition_result_desc+")</h4>";
						v_class = "bg-green-lighter";
						third_student_result_count++;
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
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value;
					vHtml += '<p class="text-right">'+third_student_repetition_date+'</p>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
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
						third_repetition_result_count++;
					}else if(third_repetition_result == "Q"){
						v_value = "<h4 "+v_totle_tip+">△(고민)</h4>";
						v_class = "bg-yellow-lighter";
					}else if(third_repetition_result == "N"){
						v_value = "<h4 "+v_totle_tip+">X(거절)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value + '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
				}
				
				
				if(complete_repetition_result){
					var v_value = "";
					var v_class = "";
					if(complete_repetition_result == "Y"){
						v_value = "<h4>O(등록)</h4>";
						v_class = "bg-green-lighter";
						complete_repetition_result_count++;
					}else{
						v_value = "<h4>X(미등록)</h4>";
						v_class = "bg-red-lighter";
					}
					vHtml += '			<td class="text-center '+v_class+'" style="width:100px;">'+v_value+'</td>';
				}else{
					vHtml += '			<td style="width:100px;">&nbsp;</td>';
				}
				
				
				if(unregistered_reason)
				{
					vHtml += '			<td style="width:150px;">';
					vHtml += unregistered_reason+'<br>';
					vHtml += '</td>';
				}else{
					vHtml += '			<td style="width:150px;">&nbsp;</td>';
				}
				vHtml += '</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#table_info").html(vHtml);
			$("#example").tooltip();
			
			
			var rate_first_repetition_result    = Math.round(first_repetition_result_count/total_student_count*100);
			var rate_second_repetition_result   = Math.round(second_repetition_result_count/total_student_count*100);
			var rate_third_student_result       = Math.round(third_student_result_count/total_student_count*100);
			var rate_third_repetition_result    = Math.round(third_repetition_result_count/total_student_count*100);
			var rate_complete_repetition_result = Math.round(complete_repetition_result_count/total_student_count*100);

			$("#first_repetition_result").html(rate_first_repetition_result+"%("+first_repetition_result_count+"/"+total_student_count+")");
			$("#second_repetition_result").html(rate_second_repetition_result+"%("+second_repetition_result_count+"/"+total_student_count+")");
			$("#third_student_result").html(rate_third_repetition_result+"%("+third_student_result_count+"/"+total_student_count+")");
			$("#third_repetition_result").html(rate_third_repetition_result+"%("+third_repetition_result_count+"/"+total_student_count+")");
			$("#complete_repetition_result").html(rate_complete_repetition_result+"%("+complete_repetition_result_count+"/"+total_student_count+")");
			
			var array_column_def = Array();
			for(var i=0; i<9; i++)
			{
				var objColumn = new Object();
				objColumn.targets = i;
				objColumn.orderData = [i];
				array_column_def.push(objColumn);
			}
			oTable = $('#example').DataTable( {
				"columnDefs": array_column_def,
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
			$("#example tbody tr td").css("padding","5px");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

var vStudentType = "";
var vSeq = 1;
function create_student_info_achieve(enrollmentInfo, courseInfo, classCountList, v_date)
{
	var course_enrollment_id = enrollmentInfo.course_enrollment_id;
	var student_id = enrollmentInfo.student_id;
	
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
	
	var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
	
	var class_count = 0;
	
	if(c_idx >=0 ){
		class_count = classCountList[c_idx].class_count;	
	}
	
	var class_list = classCountList.filter(function(item, index){
		if(item.student_id == student_id && item.student_type == student_type){
			return true;
		}
	});
	
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
	if(enrollmentInfo.registration_type != "NEW"){
		sReg = "기존";
	}
	
	var sUserNm = enrollmentInfo.last_name+enrollmentInfo.first_name;
	if(enrollmentInfo.chamgang_yn == "Y"){
		sUserNm += "(참강)";
	}
	
	var vClassType = enrollmentInfo.class_gubun;
	if(vClassType != vStudentType){
		vStudentType = vClassType;
		vSeq = 1;
	}
	if(vClassType=="반이동"){
		class_clazz = 'bg-black-transparent-3';
	}
	if(vClassType=="환불"){
		class_clazz = 'bg-black-transparent-5';
	}
	var vHtml = "";
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+vSeq+'</td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_achieve(\''+enrollmentInfo.username+'\','+enrollmentInfo.course_enrollment_id+',\''+v_date+'\')">'+sUserNm+'</a></td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
	vSeq++;
	return vHtml;
}
