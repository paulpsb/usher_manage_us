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
					<h4 class="panel-title">사진모음</h4>
				</div>
				<div class="panel-body">
					<div class="row" id="photo_info">
						
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

<script type="text/javascript" src="/ui/enrollment/achievement_new_photo.js"></script>
<script type="text/javascript" src="/ui/enrollment/achievement_new_common.js"></script>
