<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">반 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<input type="hidden" id="input_semester_id" name="input_semester_id" value="${courseInfo.semester_id}">
		<input type="hidden" id="input_test_type" name="input_test_type" value="${courseInfo.test_type}">
		<input type="hidden" id="input_course_group_id" name="input_course_group_id" value="${courseInfo.course_group_id}">
		<div class="col-md-2">
			<select class="form-control" id="search_semester_id">
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="search_course_group_id">
			</select>
		</div>		
		<div class="col-md-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_course()"><i class="fa fa-search fa-fw"></i> Search</button>
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
							<thead>
								<tr>
									<th>반 명</th>
									<th>난이도</th>
									<th colspan="2">강의실</th>
									<th>개강</th>
									<th>참강 URL</th>
									<th>OT URL</th>
									<th>집중과목</th>
									<th>담당강사</th>
									<th>담당매니저</th>
									<th></th>
								</tr>
							</thead>
							<tbody id="courseList">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-room">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">강의실 변경</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:15%;" />
							<col style="width:25%;" />
							<col style="width:40%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey" rowspan="2">수업</th>
								<th class="text-center bg-grey">신관/본관</th>
								<td class="text-with-form-control">
									<select class="form-control"  name="building_name" id="building_name">
									<c:forEach var="addressInfo" items="${addressList}">
										<option value="${addressInfo.building_name}">${addressInfo.building_name}</option>
									</c:forEach>
									</select>
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">강의실</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control"  name="room_no" id="room_no">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" rowspan="2">OT</th>
								<th class="text-center bg-grey">신관/본관</th>
								<td class="text-with-form-control">
									<select class="form-control"  name="chamgang_building_name" id="chamgang_building_name">
									<c:forEach var="addressInfo" items="${addressList}">
										<option value="${addressInfo.building_name}">${addressInfo.building_name}</option>
									</c:forEach>
									</select>
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">강의실</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control"  name="chamgang_room_no" id="chamgang_room_no">
								</td>
							</tr>			
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_room();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-course-zoom">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">참강 URL 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:80%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey">참강 URL</th>
								<td class="text-with-form-control">
									<input type="hidden" name="course_id" id="course_id">
									<input type="text" class="form-control"  name="zoom_url" id="zoom_url">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">참강 OT URL</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control"  name="zoom_ot_url" id="zoom_ot_url">
								</td>
							</tr>			
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_course_zoom();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-course-section">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">집중과목 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="progressbar-wrapper mb-3">
						<ul class="progressbar" id="progressbar_section">
						</ul>
					</div>
				</div>		
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_section();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-auth">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">강사/매니저 조회</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-8">
						<input type="text" class="form-control" id="search_auth_username">
					</div>	
					<div class="col-4">
						<button type="button" class="btn btn-primary" onclick="auth_search()"><i class="fa fa-search fa-fw"></i> Search</button>
					</div>		
				</div>			
				<div class="table-responsive" style="max-height:300px;overflow-y:auto;">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:40%;" />
							<col style="width:30%;" />
							<col style="width:30%;" />
						</colgroup>	
						<thead>	
							<tr>
								<th class="text-center table-info">아이디</th>
								<th class="text-center table-info">성명</th>
								<th class="text-center table-info">&nbsp;</th>
							</tr>
						</thead>
						<tbody id="authList"></tbody>
						
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<!-- end #content -->
<script type="text/javascript" src="/ui/course/course.js"></script>
