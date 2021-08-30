<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">반 그룹 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="offset-1 col-2">
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
		<div class="col-2 text-right">
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-1 col-10">
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
<div class="modal fade" id="modal-coursegroup">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">반 그룹 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:40%;" />
							<col style="width:20%;" />
							<col style="width:20%;" />
						</colgroup>	
						<tbody>	
							<tr>
								<th class="text-center table-info">시험 타입</th>
								<td class="text-with-form-control">
									<input type="hidden" id="coursegroup_id" name="coursegroup_id">
									<select class="form-control" id="test_type">
										<option value="TOEFL">TOEFL</option>
										<option value="TOEIC">TOEIC</option>
									</select>								
								</td>
								<th class="text-center table-info" rowspan="6">요일</th>
								<td class="text-with-form-control" rowspan="6">
									<div class="checkbox checkbox-css">
										<input type="checkbox" value="1" id="id_day_1" name="days">
										<label for="id_day_1">일요일</label>
									</div>
									<div class="checkbox checkbox-css">
										<input type="checkbox" value="2" id="id_day_2" name="days">
										<label for="id_day_2">월요일</label>
									</div>
									<div class="checkbox checkbox-css">
										<input type="checkbox" value="3" id="id_day_3" name="days">
										<label for="id_day_3">화요일</label>
									</div>
									<div class="checkbox checkbox-css">
										<input type="checkbox" value="4" id="id_day_4" name="days">
										<label for="id_day_4">수요일</label>
									</div>
									<div class="checkbox checkbox-css">
										<input type="checkbox" value="5" id="id_day_5" name="days">
										<label for="id_day_5">목요일</label>
									</div>
									<div class="checkbox checkbox-css">
										<input type="checkbox" value="6" id="id_day_6" name="days">
										<label for="id_day_6">금요일</label>
									</div>
									<div class="checkbox checkbox-css">
										<input type="checkbox" value="7" id="id_day_7" name="days">
										<label for="id_day_7">토요일</label>
									</div>
								</td>
								
							</tr>
							<tr>
								<th class="text-center table-info">학생 타입</th>
								<td class="text-with-form-control">
									<select class="form-control" id="student_type">
										<option value="SENIOR">성인</option>
										<option value="JUNIOR">중고등</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">강의 타입</th>
								<td class="text-with-form-control">
									<select class="form-control" id="lecture_type">
										<option value="">강의 타입</option>
										<option value="REGULAR">종합</option>
										<option value="SPECIAL">특강</option>
										<option value="SINGLE">단과</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">반 그룹 명</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="coursegroup_name" name="coursegroup_name">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">시간</th>
								<td class="text-with-form-control">
									<select class="form-control" id="coursegroup_time">
										<option value="ALL_DAY">종일</option>
										<option value="MORNING">오전</option>
										<option value="AFTERNOON">오후</option>
										<option value="EVENING">저녁</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">생성 주기</th>
								<td class="text-with-form-control">
									<select class="form-control" id="life_cycle">
										<option value="CREATED_FROM_PRESET">프리셋에서 복사</option>
										<option value="PRESET">프리셋</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_save();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/base/coursegroup.js"></script>


