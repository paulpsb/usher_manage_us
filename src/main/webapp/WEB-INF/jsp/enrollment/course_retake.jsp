<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<h1 class="page-header">재수강 트래킹</h1>
	<hr />
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_semester_date">
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_student_type">
				<option value="SENIOR">성인</option>
				<option value="JUNIOR">주니어</option>
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_lecture_type">
				<option value="REGULAR">종합</option>
				<option value="SINGLE">단과</option>
			</select>
		</div>	
		<div class="col-2">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>		
	</div>	
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">재수강 트래킹</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive mb-5">
						<table class="table table-bordered m-b-0" id="summery_table">
							
						</table>
					</div>
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:25%;" />
								<col style="width:3%;" />
								<col style="width:12%;" />
								<col style="width:3%;" />
								<col style="width:12%;" />
								<col style="width:3%;" />
								<col style="width:12%;" />
								<col style="width:30%;" />
							</colgroup>
							<tbody id="data_list">
							
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>

<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/course_retake.js"></script>
