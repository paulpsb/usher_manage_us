<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Monthly 루틴 스케쥴 설정</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">TOEFL</option>
				<option value="TOEIC">TOEIC</option>
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
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">Monthly 루틴 스케쥴 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:4.5%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr class="table-info">
									<th class='text-center'>일차</th>
									<th class='text-center'>1일차</th>
									<th class='text-center'>2일차</th>
									<th class='text-center'>3일차</th>
									<th class='text-center'>4일차</th>
									<th class='text-center'>5일차</th>
									<th class='text-center'>6일차</th>
									<th class='text-center'>7일차</th>
									<th class='text-center'>8일차</th>
									<th class='text-center'>9일차</th>
									<th class='text-center'>10일차</th>
									<th class='text-center'>11일차</th>
									<th class='text-center'>12일차</th>
									<th class='text-center'>13일차</th>
									<th class='text-center'>14일차</th>
									<th class='text-center'>15일차</th>
									<th class='text-center'>16일차</th>
									<th class='text-center'>17일차</th>
									<th class='text-center'>18일차</th>
									<th class='text-center'>19일차</th>
									<th class='text-center'>20일차</th>
									<th class='text-center'>&nbsp;</th>
								</tr>
							</thead>
							<tbody id="data_list">
							</tbody>
						</table>
					</div>	
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-routine-schedule">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center">
					Monthly 루틴 스케쥴 등록/수정
				</h4>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:20%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
						</colgroup>	
						<thead>
							<tr>
								<th class="text-center table-info">시험 타입</th>
								<td class="text-center" colspan="2" id="test_type"></td>
								<th class="text-center table-info">학생 타입</th>
								<td class="text-center" colspan="2" id="student_type"></td>
							</tr>
							<tr>
								<th class="text-center table-info">강의 타입</th>
								<td class="text-center" colspan="2" id="lecture_type"></td>
								<td class="text-center" colspan="3">&nbsp;</td>
							</tr>
							<tr>
								<th class="text-center table-info">루틴 일차</th>
								<td class="with-form-control" colspan="2">
									<select id="routine_course_group_schedule" name="routine_course_group_schedule" class="form-control">
									</select>
								</td>
								<th class="text-center table-info">일차</th>
								<td class="with-form-control" colspan="2">
									<select id="routine_schedule" name="routine_schedule" class="form-control">
									</select>
								</td>
							</tr>					
							<tr>
								<th class="text-center table-info">Daily 일차</th>
								<th class="text-center table-info">시작 일차</th>
								<th class="text-center table-info">종료 일차</th>
								<th class="text-center table-info">Daily 일차</th>
								<th class="text-center table-info">시작 일차</th>
								<th class="text-center table-info">종료 일차</th>
							</tr>					
						</thead>	
						<tbody id="schedule_list">
									
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
<script type="text/javascript" src="/ui/notice/routine_coursegroup_schedule_monthly.js"></script>


