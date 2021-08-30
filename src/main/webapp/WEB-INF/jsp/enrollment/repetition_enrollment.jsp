<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="course_id" value="${courseInfo.course_id}">
<input type="hidden" id="course_name" value="${courseInfo.course_name}">

<!-- begin #content -->
<div id="content" class="content">
	<div id="search_area" class="row">
		<div class="col-9">
			<h1 class="page-header">재수강 관리</h1>
		</div>
		<div class="col-1">
		</div>
		<div class="col-2">
			<h4>
				<input type="hidden" id="course_id" value="${courseInfo.id}">
				<span id="course_info"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>		
	</div>
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">재수강 관리</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive" id="table_info">
						
					</div>
				</div>
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
<div class="modal fade" id="modal-advise">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="advise_title"></h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-12" id="advise_student_name"></label>
				</div>
				<div class="form-group row m-b-15">
					<div class="col-12">
						<textarea class="form-control" id="advise_desc"></textarea>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_advise();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-result">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="result_title"></h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-12" id="result_student_name"></label>
				</div>
				<div class="form-group row m-b-15">
					<div class="offset-2 col-4">
						<button type="button" class="btn btn-success btn-lg btn-block" onclick="save_result('Y');">O</button>
					</div>
					<!-- 
					<div class="col-4">
						<button type="button" class="btn btn-warning btn-lg btn-block" onclick="save_result('Q');">△</button>
					</div>
					 -->
					<div class="col-4">
						<button type="button" class="btn btn-danger btn-lg btn-block" onclick="save_result('N');">X</button>
					</div>
				</div>
				<div class="form-group row m-b-15" id="div_third_repetition_result_due">
					<div class="offset-2 col-4">
						<select class="form-control" id="third_repetition_result_due">
						</select>
					</div>
					<div class="col-4">
						<button type="button" class="btn btn-danger btn-lg btn-block" onclick="save_result_due();">X(이월 예정)</button>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-goal-score">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">목표점수 변경</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-12" id="goal_score_student_name"></label>
				</div>
				<div class="form-group row m-b-15">
					<label class="col-form-label col-4">목표점수</label>
					<div class="col-8">
						<div class="radio radio-css radio-inline">
							<input type="radio" name="goal_score" id="goal_score_115" value="115"/>
							<label for="goal_score_115">115</label>
						</div>
						<div class="radio radio-css radio-inline">
							<input type="radio" name="goal_score" id="goal_score_110" value="110"/>
							<label for="goal_score_110">110</label>
						</div>
						<div class="radio radio-css radio-inline">
							<input type="radio" name="goal_score" id="goal_score_100" value="100"/>
							<label for="goal_score_100">100</label>
						</div>
						<div class="radio radio-css radio-inline">
							<input type="radio" name="goal_score" id="goal_score_90" value="90"/>
							<label for="goal_score_90">90</label>
						</div>
						<div class="radio radio-css radio-inline">
							<input type="radio" name="goal_score" id="goal_score_80" value="80"/>
							<label for="goal_score_80">80</label>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_goal_score();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-attend-start-date">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">시작일자 변경</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-12" id="attend_start_date_student_name"></label>
				</div>
				<div class="form-group row m-b-15">
					<label class="col-form-label col-6">시작일자</label>
					<div class="col-6">
						<input type="text" class="form-control" id="attend_start_date">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_attend_start_date();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-need-date">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">점수 필요기간 변경</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-12" id="need_date_student_name"></label>
				</div>
				<div class="form-group row m-b-15">
					<label class="col-form-label col-6">점수 필요일자</label>
					<div class="col-6">
						<input type="text" class="form-control" id="need_date">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_need_date();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-attend-date">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">학원 수강기간 변경</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-12" id="do_attend_date_student_name"></label>
				</div>
				<div class="form-group row m-b-15">
					<label class="col-form-label col-6">학원 수강일자</label>
					<div class="col-6">
						<input type="text" class="form-control" id="attend_date">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_attend_date();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<script>
	$('#attend_start_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
	
	$('#need_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
	
	$('#attend_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
	
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/repetition_enrollment.js"></script>
