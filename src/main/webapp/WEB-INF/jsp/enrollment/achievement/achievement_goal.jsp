<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
<link href="/assets/plugins/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
<link href="/assets/plugins/datatables.net-fixedcolumns-bs4/css/fixedColumns.bootstrap4.css" rel="stylesheet" />
<!-- ================== END PAGE LEVEL STYLE ================== -->

<div class="row">
	<div class="col-12">
		<div class="panel panel-inverse" data-sortable-id="table-basic-1">
			<div class="panel-heading">
				<h4 class="panel-title">목표설정</h4>
			</div>
			<div class="panel-body">
				<div class="table-responsive" id="table_info">
					
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-concentration">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">집중과목 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12">
						<h4 id="course_title"></h4>
						<input type="hidden" id="course_enrollment_id"> 
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<div class="progressbar-wrapper">
							<ul class="progressbar" id="progressbar_course">
								
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4 id="user_title"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<div class="progressbar-wrapper">
							<ul class="progressbar" id="progressbar_user">
								
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4>학생사유</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<textarea id="txt_concentration" class="form-control" style="height:100px;" readonly></textarea>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4>강사/매니져 코멘트(강제로 집중과목 바꿀경우)</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<textarea id="txt_teacher_concentration" class="form-control" style="height:100px;"></textarea>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_concentration();" class="btn btn-success">집중과목 수정</a>
			</div>			
		</div>
	</div>
</div>
<div class="modal fade" id="modal-practice">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">목표설정 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12">
						<h4>학생사유</h4>
						<input type="hidden" id="practice_id"> 
						<input type="hidden" id="pass_user_score"> 
						<input type="hidden" id="pass_course_score">
						<input type="hidden" id="practice_book"> 
						<input type="hidden" id="orginal_book">
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<textarea id="txt_practice" class="form-control" style="height:100px;" readonly></textarea>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4>강사/매니져 코멘트</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<textarea id="txt_teacher_practice" class="form-control" style="height:100px;"></textarea>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:save_practice_success();" class="btn btn-success">승인</a>
				<a href="javascript:save_practice_fail();" class="btn btn-danger">거부</a>
			</div>			
		</div>
	</div>
</div>
<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<script src="/assets/plugins/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/assets/plugins/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns/js/dataTables.fixedColumns.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.js"></script>

<script>
jQuery(document).ready(function(){
	init_data();
});
function init_data(){
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getGoalList.do",
		data:{
			course_id : course_id
		},
		success:function(data){
			var vHtml = "";
			var enrollmentList = data.enrollmentList;
			var enrollment_count = enrollmentList.length;
			
			var sectionList = data.sectionList;
			var practiceList = data.practiceList;
			var concentrationList = data.concentrationList;
			var concentrationPracticeList = data.concentrationPracticeList;
			
			var courseInfo = data.courseInfo;
			var classCountList = data.classCountList;
			
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

			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">집중과목</th>';
			for(var i=0; i<sectionList.length; i++)
			{
				var section = sectionList[i].section;
				
				var practice_count = practiceList.filter(function(item, index){
					if(item.section == section){
						return true;
					}
				}).length;
				if(practice_count > 0){
					var nWidth = practice_count * 100;
					vHtml += '			<th class="text-center table-info" colspan="'+practice_count+'" style="width:'+nWidth+'px;">'+section+'</th>';
				}
			}
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			for(var i=0; i<practiceList.length; i++)
			{
				vHtml += '			<th class="text-center table-info" style="width:100px;">'+practiceList[i].practice_name+'</th>';
			}

			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			for(var i=0; i<enrollment_count; i++)
			{
				var course_enrollment_id = enrollmentList[i].course_enrollment_id;
				var student_id = enrollmentList[i].student_id;

				var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
				var class_count = 0;
				if(c_idx >=0 ){
					class_count = classCountList[c_idx].class_count;	
				}
				
				var class_list = classCountList.filter(function(item, index){
					if(item.student_id == student_id && item.student_type == student_type){
						return true;
					}
				})
				
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
				if(enrollmentList[i].registration_type != "NEW"){
					sReg = "기존";
				}
				
				vHtml += '		<tr>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+(i+1)+'</td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_login(\''+enrollmentList[i].username+'\')">'+enrollmentList[i].last_name+enrollmentList[i].first_name+'</a></td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
				
				var q_idx = concentrationList.findIndex(t => t.course_enrollment_id == course_enrollment_id);
				if(q_idx >= 0)
				{
					var enrollment_level= concentrationList[q_idx].enrollment_level;
					var course_level= concentrationList[q_idx].course_level;
					var v_title = "";
					var v_class = "";
					var v_section = sectionList[enrollment_level].short_title_kr+"집중";
					
					if(enrollment_level == course_level)
					{
						v_title = "(기본 범위)";
						v_class = "bg-yellow-darker";
					}else{
						if(enrollment_level > course_level)
						{
							v_title = "(기본보다 넓은 범위)";	
							v_class = "bg-green-darker";
						}else{
							v_title = "(기본보다 좁은 범위)";
							v_class = "bg-red-darker";
						}
					}
					vHtml += '<td class="text-center text-white '+v_class+'" style="width:100px;">';
					vHtml += v_section+'<br>';
					vHtml += v_title+'<br>';
					vHtml += '<button type="button" class="btn btn-inverse btn-xs" onClick="modifyConcentration('+course_enrollment_id+')">집중과목 수정</button>';
					
					vHtml += '</td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
				}
				
				for(var j=0; j<practiceList.length; j++)
				{
					var a_section = practiceList[j].section;
					var a_practice_type = practiceList[j].practice_type;
					
					var a_idx = concentrationPracticeList.findIndex(t => t.course_enrollment_id == course_enrollment_id && t.section == a_section && t.practice_type == a_practice_type);
					if(a_idx >=0 )
					{
						var program_use = concentrationPracticeList[a_idx].program_use;
						var pass_user_score = concentrationPracticeList[a_idx].pass_user_score;
						var pass_course_score = concentrationPracticeList[a_idx].pass_course_score;
						vHtml += '			<td class="text-center" style="width:100px;">';
						if(program_use == "Y"){
							if(a_section == 'VOCA'){
								vHtml += '<div class="bg-indigo text-white">'+pass_course_score+'개</div>';
							}else{
								vHtml += '<div class="bg-indigo text-white">'+pass_course_score+'%</div>';
							}
						}else{
							vHtml += '<div class="bg-indigo text-white"">O/X</div>';
						}
						
						if(pass_user_score >= pass_course_score && concentrationPracticeList[a_idx].book != "basic")
						{
							if(program_use == "Y"){
								if(a_section == 'VOCA'){
									vHtml += '<div class="bg-green text-white">'+pass_user_score+'개</div>';
								}else{
									vHtml += '<div class="bg-green text-white">'+pass_user_score+'%</div>';
								}
							}else{
								vHtml += '<div class="bg-green text-white"">한다</div>';
							}
							
						}else{
							if(pass_user_score == 0)
							{
								vHtml += '<button type="button" class="btn btn-danger btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">포기</button>';
							}else{
								if(program_use == "Y"){
									if(a_section == 'VOCA'){
										var v_basic = "";
										if(concentrationPracticeList[a_idx].book == "basic") v_basic = "(중고등)";
										
										vHtml += '<button type="button" class="btn btn-warning btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">'+pass_user_score+'개'+v_basic+'</button>';
									}else{
										vHtml += '<button type="button" class="btn btn-warning btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">'+pass_user_score+'%</button>';
									}
								}
							}
						}
						vHtml += '</td>';
					}else{
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';	
					}
					
				}
				
				vHtml += '		</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#table_info").html(vHtml);

			var window_size = $(window).height();
			
			oTable = $('#example').DataTable( {
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
			
			$("#example tbody tr td").css("padding","0px");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}

var enrollment_level;
var course_level;
var sectionList;
function modifyConcentration(course_enrollment_id)
{
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getGoalConcentration.do",
		data:{
			course_id:course_id,
			course_enrollment_id:course_enrollment_id
		},
		success:function(data){ 
			
			$("#course_enrollment_id").val(course_enrollment_id);
			sectionList = data.sectionList;
			var concentrationInfo = data.concentrationInfo;
			var courseInfo = data.courseInfo;
			
			var course_section = "";
			var user_section = "";
			
			var vHtml = "";
			//우선 서로의 레벨을 찾는다.
			for(var i=0; i<sectionList.length; i++)
			{
				var section_id = "is_"+sectionList[i].section.toLowerCase();
				var actice = "";
				if(courseInfo[section_id]){
					course_section = sectionList[i].section;
					actice = "yellow";
					course_level = i;
				}
				
				vHtml += '<li class="'+actice+'">';
				vHtml += sectionList[i].section;
				vHtml += '</li>';
				
				if(concentrationInfo[section_id]){
					user_section = sectionList[i].section;
					enrollment_level = i;
				}
			}
			$("#progressbar_course").html(vHtml);
			$("#course_title").html(courseInfo.name+"반 기본 집중과목범위 : VOCA ~ "+course_section);
			$("#user_title").html("나의 집중과목범위 : VOCA ~ "+user_section);
			
			vHtml = "";
			var enrollment_color = "";
			if(enrollment_level == course_level)
			{
				enrollment_color = "yellow";
			}else{
				if(enrollment_level > course_level){
					enrollment_color = "green";
				}else{
					enrollment_color = "red";
				}
			}
			for(var i=0; i<sectionList.length; i++)
			{
				var section_id = "is_"+sectionList[i].section.toLowerCase();
				var actice = "";
				var value = "0";
				if(concentrationInfo[section_id]){
					actice = enrollment_color;
					value = "1";
				}
				
				vHtml += '<li id="user_'+section_id+'" class="is_section '+actice+'" style="cursor:pointer;">';
				vHtml += sectionList[i].section;
				vHtml += '<input type="hidden" id="'+section_id+'" value="'+value+'">';
				vHtml += '<input type="hidden" name="section_id" value="'+sectionList[i].section+'">';
				vHtml += '<input type="hidden" name="section_level" value="'+i+'">';
				vHtml += '</li>';
			}
			$("#progressbar_user").html(vHtml);
			
			$("#txt_concentration").val(cfmNvl1(concentrationInfo.comments));
			$("#txt_teacher_concentration").val(cfmNvl1(concentrationInfo.writer_comments));
			
			$(".is_section").click(function(){
				var section = $(this).find("input[name=section_id]").val();
				$("#user_title").html("나의 집중과목범위 : VOCA ~ "+section);
				enrollment_level = parseInt($(this).find("input[name=section_level]").val());
				var enrollment_color = "";
				if(enrollment_level == course_level)
				{
					enrollment_color = "yellow";
				}else{
					if(enrollment_level > course_level){
						enrollment_color = "green";
					}else{
						enrollment_color = "red";
					}
				}
				
				//우선 모두 active를 날려버린다.
				for(var i=0; i<sectionList.length; i++)
				{
					var section_id = "is_"+sectionList[i].section.toLowerCase();
					$("#user_"+section_id).removeClass("yellow");
					$("#user_"+section_id).removeClass("green");
					$("#user_"+section_id).removeClass("red");
					
					$("#"+section_id).val("0");
				}
				
				for(var i=0; i<=enrollment_level; i++)
				{
					var section_id = "is_"+sectionList[i].section.toLowerCase();
					$("#user_"+section_id).addClass(enrollment_color);
					
					$("#"+section_id).val("1");
				}
			});
			
			
			$("#modal-concentration").modal();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_concentration()
{
	var resv_data = Object();

	//우선 모두 active를 날려버린다.
	for(var i=0; i<sectionList.length; i++)
	{
		var section_id = "is_"+sectionList[i].section.toLowerCase();
		
		if($("#"+section_id).val() == "1"){
			resv_data[section_id] = true;
		}else{
			resv_data[section_id] = false;
		}
	}
	resv_data.course_enrollment_id = $("#course_enrollment_id").val();
	resv_data.enrollment_level = enrollment_level;
	resv_data.course_level = course_level;
	resv_data.writer_comments = $("#txt_teacher_concentration").val();
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/saveGoalConcentration.do",
		data:resv_data,
		success:function(data){ 
			alert("수정하였습니다.");
			$("#modal-concentration").modal("hide");
			init_data();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function modifyPractice(practice_id){
	$("#practice_id").val(practice_id);
	
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getGoalConcentrationPactice.do",
		data:{
			id:practice_id
		},
		success:function(data){ 
			$("#pass_user_score").val(data.pass_user_score);
			$("#pass_course_score").val(data.pass_course_score);
			$("#practice_book").val(data.book);
			if(data.practice_type == "VOCA")
			{
				$("#orginal_book").val("toefl");
			}else{
				$("#orginal_book").val("");
			}
			$("#txt_practice").val(cfmNvl1(data.comments));
			$("#txt_teacher_practice").val(cfmNvl1(data.writer_comments));
			
			
			$("#modal-practice").modal();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_practice_success()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/saveGoalConcentrationPactice.do",
		data:{
			id:$("#practice_id").val(),
			pass_user_score:$("#pass_user_score").val(),
			writer_comments:$("#txt_teacher_practice").val(),
			book:$("#practice_book").val()
		},
		success:function(data){ 
			alert("승인하였습니다.");
			$("#modal-practice").modal("hide");
			init_data();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}


function save_practice_fail()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/saveGoalConcentrationPactice.do",
		data:{
			id:$("#practice_id").val(),
			pass_user_score:$("#pass_course_score").val(),
			writer_comments:$("#txt_teacher_practice").val(),
			book:$("#orginal_book").val()
		},
		success:function(data){ 
			alert("거부하였습니다.");
			$("#modal-practice").modal("hide");
			init_data();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function openOath(username,course_enrollment_id, orientation_code)
{
	var examUrl = "http://exam.usher.co.kr/"
	var url = examUrl + "main/oath/oath.do?username="+username+"&&course_enrollment_id="+course_enrollment_id+"&&orientation_code="+orientation_code;
	window.open(url, "oath");
}
</script>