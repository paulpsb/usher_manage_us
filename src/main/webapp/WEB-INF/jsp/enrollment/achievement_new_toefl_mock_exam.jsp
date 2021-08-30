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
					<h4 class="panel-title">모의토플</h4>
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
<div class="modal fade" id="modal-exam">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">성적 입력</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row m-b-3">
					<div class="col-8">
						<h4 id="exam_user"></h4>
					</div>
					<div class="col-4 text-right">
						<button type="button" class="btn btn-primary" onclick="exam_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
					</div>
				</div>			
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:5%;" />
						</colgroup>	
						<thead>	
							<tr class="table-info">
								<th class="text-center">일자</th>
								<th class="text-center">RC</th>
								<th class="text-center">LC</th>
								<th class="text-center">SP</th>
								<th class="text-center">WR</th>
								<th class="text-center">Total</th>
								<th class="text-center">&nbsp;</th>
							</tr>
						</thead>
						<tbody id="examList">
						</tbody>
					</table>			
				</div>	
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_exam();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/enrollment/achievement_new_toefl_mock_exam.js"></script>
<script type="text/javascript" src="/ui/enrollment/achievement_new_common.js"></script>
