<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-8">
			<h1 class="page-header">단어 인터벌 트레이닝 조회</h1>
		</div>
		<div class="col-4 text-right">
			<h4>
				<span id="select_course_name"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>	
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">단어 인터벌 트레이닝 정보</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-2" >
						</div>
						<div class="col-3 text-right">
							<button type="button" class="btn btn-default" onclick="date_prev()"><</button>
						</div>
						<div class="col-2" >
							<input type="text" id="select_date_text" class="form-control text-center" readonly>
						</div>
						<div class="col-2">
							<button id="btn_next" type="button" class="btn btn-default" onclick="date_next()" disabled>></button>
							<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default" style="width:auto;display:inline-block;">
								<input id="search_date" type="hidden" placeholder="Select Date" />
								<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
							</div>					
						</div>
						<div class="col-3">
						</div>
					</div>				
					<div class="row mb-3">
						<div class="col-12">
							<div class="table-responsive">
								<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0" id="voca_interval_result">
									
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>
<div class="modal fade" id="select_courses">
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
<script>
	$('#datepicker-disabled-past').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {
		change_date();
		form_search()();
	});
</script>
<script type="text/javascript" src="/ui/test/voca_interval_test_achieve.js"></script>