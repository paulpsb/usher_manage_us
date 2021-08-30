<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">반 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_test_type">
				<option value="">시험 타입</option>
				<option value="TOEFL">TOEFL</option>
				<option value="TOEIC">TOEIC</option>
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_student_type">
				<option value="">학생 타입</option>
				<option value="SENIOR">성인</option>
				<option value="JUNIOR">중고등</option>
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_lecture_type">
				<option value="">강의 타입</option>
				<option value="REGULAR">종합</option>
				<option value="SPECIAL">특강</option>
				<option value="SINGLE">단과</option>
			</select>
		</div>	
		<div class="col-2">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>		
		<div class="col-4 text-right">
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
	</div>
	<div class="row">
		<div class="col-7">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">반 그룹 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:14%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>시험 타입</th>
									<th class='text-center'>학생 타입</th>
									<th class='text-center'>강의 타입</th>
									<th class='text-center'>반 그룹 명</th>
									<th class='text-center'>시간</th>
									<th class='text-center'>요일</th>
									<th class='text-center'>생성 주기</th>
									<th class='text-center'>&nbsp;</th>
								</tr>
							</thead>
							<tbody id="courseList">
							</tbody>
						</table>
					</div>	
				</div>
			</div>
		</div>
		<div class="col-5">
			<div class="panel panel-inverse" data-sortable-id="table-basic-2">
				<div class="panel-heading">
					<h4 class="panel-title">반 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:20%;" />
								<col style="width:30%;" />
								<col style="width:20%;" />
								<col style="width:30%;" />
							</colgroup>	
							<tbody>	
								<tr>
									<th class="text-center table-info">시험 타입</th>
									<td class="text-center" id="test_type"></td>
									<th class="text-center table-info">학생 타입</th>
									<td class="text-center" id="student_type"></td>
								</tr>
								<tr>
									<th class="text-center table-info">강의 타입</th>
									<td class="text-center" id="lecture_type"></td>
									<th class="text-center table-info">반 그룹 명</th>
									<td class="text-center" id="coursegroup_name"></td>
								</tr>
								<tr>
									<th class="text-center table-info">요일</th>
									<td class="text-center" id="days"></td>
									<th class="text-center table-info">시간</th>
									<td class="text-center" id="coursegroup_time"></td>
								</tr>
								<tr>
									<th class="text-center table-info">생성 주기</th>
									<td class="text-center" colspan="3" id="coursegroup_life_cycle"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="table-responsive">
						<table class="table table-striped m-b-10">
							<colgroup>
								<col style="width:25%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:25%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>반 명</th>
									<th class='text-center'>난이도</th>
									<th class='text-center'>내부 난이도</th>
									<th class='text-center'>L-Code</th>
									<th class='text-center'>새성주기</th>
									<th class='text-center'>&nbsp;</th>
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
<script type="text/javascript" src="/ui/base/course.js"></script>


