<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="course_id" value="${courseInfo.id}">
<input type="hidden" id="course_schedule" value="${courseInfo.schedule}">
<input type="hidden" id="section" value="${archieveInfo.section}">

<!-- begin #content -->
<div id="content" class="content">
	<div id="search_area" class="row">
		<div class="col-7">
			<h1 class="page-header">재수강율(요약)</h1>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_semester_id">
				<option value="">년/월</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_course_group_id">
				<option value="">반 그룹</option>
			</select>
		</div>
		<div class="col-md-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_dashboard()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>	
	</div>
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">재수강율(요약)</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive" id="table_info">
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/enrollment/repetition_enrollment_summary.js"></script>
