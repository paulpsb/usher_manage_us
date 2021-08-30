<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-4">
			<h1 class="page-header">단어 인터벌 트레이닝(반별)</h1>
		</div>
		<div class="col-4 text-center">
			<h2 class="text-center">현재 시간 : <span id="to_time"></span></h2>
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
					<h4 class="panel-title">단어 인터벌 트레이닝 정보(반별)&nbsp;&nbsp;<span id="schedule_info"></span></h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3 mt-3">
						<div class="col-3">
							<h2 class="text-center">시험 시작 시간 : <span id="start_time"></span></h2>
						</div>
						<div class="col-3">
							<h2 class="text-center">시험 종료 시간 : <span id="end_time"></span></h2>
						</div>
						<div class="col-3">
							<h2 class="text-center">타이머  : <span id="interval_timer"></span></h2>
						</div>
						<div class="col-1">
							<input id="interval_time" type="text" class="form-control form-control-lg"  style="display:none;" />
						</div>
						<div class="col-2">
							<button id="btn_start" type="button" class="btn btn-primary btn-lg" onClick="startExam()" style="display:none;">시험시작</button>
							<button id="btn_end" type="button" class="btn btn-primary btn-lg" onClick="stopExam()" style="display:none;">시험종료</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">단어 인터벌 트레이닝 정보(반별)</h4>
				</div>
				<div class="panel-body">
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
<div class="modal fade" id="add_exception">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="exception_title"></h4>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-5">
					<label class="col-form-label col-12"><h4>사유</h4></label>
				</div>
				<div class="form-group row m-b-15">
					<div class="col-12">
						<textarea class="form-control" id="practice_exception_reason"></textarea>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_exception();" class="btn btn-success">시험 대상에서 제외</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/test/voca_interval_test.js"></script>
