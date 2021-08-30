<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="course_id" value="${courseInfo.id}">
<input type="hidden" id="course_schedule" value="${courseInfo.schedule}">
<input type="hidden" id="course_date" value="${archieveInfo.date}">
<input type="hidden" id="course_name" value="${courseInfo.course_group_name} ${courseInfo.name}반">

<!-- begin #content -->
<div id="content" class="content">
	<div id="search_area" class="row">
		<div class="col-8" id="search_archeive">
		</div>
		<div class="col-4 text-right">
			<h4>
				<span>${courseInfo.course_group_name} ${courseInfo.name}반(담당강사:${courseInfo.instructor_name} / 담당매니저:${courseInfo.manager_name})</span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>
	</div>
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">과제</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="offset-8 col-2">
							<!-- 
							<select class="form-control" id="search_course_date">
							</select>
							 -->
						</div>
						<div class="col-2">
							<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default">
								<input id="search_course_date" class="form-control"  type="text" readonly/>
								<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
							</div>					
						</div>
					</div>				
					<div class="table-responsive" id="table_info">
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-send-achieve">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">성취표 전송</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12">
						<h4 id="send_user"></h4>
					</div>
				</div>			
				<div class="row mb-1">
					<div class="col-12">
						<textarea class="form-control" id="contents" style="height:150px;"></textarea>
					</div>
				</div>			
				<div class="row">
					<div class="col-12">
						<h4>※담당자의 코멘트를 입력하세요</h4>
					</div>
				</div>			
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_achieve();" class="btn btn-success">전송</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-result">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">시험 결과</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<ul id="result_list">
				</ul>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="select_courses" style="z-index:9999999;">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">반 선택</h4>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-3 text-right"><h4>년/월</h4></label>
					<div class="col-6">
						<select class="form-control" id="search_semester_id">
						</select>
					</div>
				</div>
				<div id="site_map">
				</div>
			</div>
			<div class="modal-footer" id="btn_cancel_course" style="display:none;">
				<a href="javascript:form_course_cancel();" class="btn btn-white">취소</a>
			</div>
		</div>
	</div>
</div>
<!-- 
<div id="select_courses" style='position:absolute; left:35%; top:20%; right:35%; display:none; z-index:10000;background-color:#ffffff;padding:20px;'>
	<div class="panel panel-inverse" data-sortable-id="table-basic-1">
		<div class="panel-heading">
			<h4 class="panel-title">반 선택</h4>
		</div>
		<div class="panel-body">
			<div class="form-group row m-b-15">
				<label class="col-form-label col-3">년/월</label>
				<div class="col-9">
					<select class="form-control" id="search_semester_id">
					</select>
				</div>
			</div>
			<div id="site_map">
			</div>
			<div class="form-group row m-b-15">
				<div class="offset-8 col-4">
					<button id="btn_cancel_course" style="display:none;" type="button" class="btn btn-danger form-control" onclick="form_course_cancel()">취소</button>
				</div>
			</div>		
		</div>
	</div>
</div>
 -->
<!-- end #content -->
<div class="modal fade" id="modal-select-mode" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-lg" style="top:30%;left:35%;width:25%;">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title text-center" style="width:100%;" id="mode_select_student_name"></h3>
				<button type="button" class="close" onClick="close_select_mode()">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<div class="col-12 text-center">
						<h4 class="text-blue" id="mode_select_schedule_name"></h4>
						<select class="form-control" id="mode_select_passage">
							
						</select>
					</div>
				</div>	
				<div class="form-group row m-b-15">
					<div class="col-6 text-center">
						<button type="button" class="btn btn-success btn-block" style="height:300px;" onclick="complete_mode_student('O')">
							<p style="margin:0;padding:0;font-size:10rem;">O</p>
						</button>
					</div>
					<div class="col-6 text-center">
						<button type="button" class="btn btn-danger btn-block" style="height:300px;" onclick="complete_mode_student('X')">
							<p style="margin:0;padding:0;font-size:10rem;">X</p>
						</button>
					</div>
				</div>	
			</div>
		</div>
	</div>
</div>
<script>
	var v_schedule_date = "${courseInfo.schedule}";
	var v_schedule_date_array = v_schedule_date.split(",");
	$('#datepicker-disabled-past').datepicker({
		todayHighlight: false,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom left",
		beforeShowDay:disableDate
	}).on("changeDate", function(e) {
		location.href = "./achievement_new_action.do?orientation_code=homework&&course_id="+$("#course_id").val()+"&&date="+$("#search_course_date").val();
	});
	function disableDate(date){
		var today = new Date();   

		var y1 = today.getFullYear(); // 년도
		var m1= today.getMonth() + 1;  // 월
		var d1 = today.getDate();  // 날짜
		
		var v_today = y1+"-";
		if(m1 < 10){
			v_today = v_today+"0"+m1+"-";
		}else{
			v_today = v_today+m1+"-";
		}

		if(d1 < 10){
			v_today = v_today+"0"+d1;
		}else{
			v_today = v_today+d1;
		}
		
		
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		
		var vDate = y+"-";
		if(m < 10){
			vDate += "0"+m+"-";
		}else{
			vDate += m+"-";
		}
		if(d < 10){
			vDate += "0"+d;
		}else{
			vDate += ""+d;
		}
		
		if(v_schedule_date_array.indexOf(vDate) >= 0){
			return true;
		}
		return false;
	}
</script>
<script type="text/javascript" src="/ui/enrollment/achievement_new_homework.js"></script>
<script type="text/javascript" src="/ui/enrollment/achievement_new_common.js"></script>
