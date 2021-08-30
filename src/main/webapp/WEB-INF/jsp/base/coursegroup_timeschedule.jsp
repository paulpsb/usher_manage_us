<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">반그룹별 시간관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="offset-2 col-2">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_student_type">
				<option value="SENIOR">성인</option>
				<option value="JUNIOR">중고등</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_lecture_type">
				<option value="REGULAR">정규</option>
				<option value="SINGLE">단과</option>
				<option value="SPECIAL">특강</option>
			</select>
		</div>
		<div class="col-2">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> Add</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-2 col-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">반그룹별 시간목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:16%;" />
								<col style="width:16%;" />
								<col style="width:16%;" />
								<col style="width:16%;" />
								<col style="width:16%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>No.</th>
									<th class='text-center'>시험구분</th>
									<th class='text-center'>학생구분</th>
									<th class='text-center'>반그룹 구분</th>
									<th class='text-center'>시작시간</th>
									<th class='text-center'>종료시간</th>
									<th class='text-center'>관리</th>
								</tr>
							</thead>
							<tbody id="dataList">
							</tbody>
						</table>
					</div>	
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/base/coursegroup_timeschedule.js"></script>
