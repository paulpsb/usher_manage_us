<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">반 그룹관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-md-2">
			<select class="form-control" id="search_semester_id">
				<option value="">년/월</option>
			</select>
		</div>
		<div class="col-md-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_course_group()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title" id="tableTitle"></h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:8%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:8%;" />
								<col style="width:58%;" />
								<col style="width:5%;" />
							</colgroup>						
							<thead>
								<tr>
									<th class="text-center">반 그룹 명</th>
									<th class="text-center">시험</th>
									<th class="text-center">학생 구분</th>
									<th class="text-center">수업 구분</th>
									<th class="text-center">재수강 조사일</th>
									<th class="text-center">스케쥴</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody id="courseGroupList">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-repetition-date">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">재수강 조사일 변경</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-6">재수강 조사일</label>
					<div class="col-6">
						<input type="text" class="form-control" id="repetition_date">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_repetition_date();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<script>
	$('#repetition_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/course/course_group.js"></script>
