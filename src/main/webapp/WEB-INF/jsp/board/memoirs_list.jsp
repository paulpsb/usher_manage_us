<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">수기 게시판 관리</h1>
	<hr />
	<!-- end page-header -->
	<input type="hidden" id="search_test_type" value="${memoirsInfo.test_type}">
	<input type="hidden" id="search_student_type" value="${memoirsInfo.student_type}">
	<input type="hidden" id="search_modify_yn" value="${memoirsInfo.modify_yn}">
	<input type="hidden" id="search_page" value="${memoirsInfo.page}">
	
	<div id="search_area" class="row mb-3">
		<div class="col-1">
			<select class="form-control" id="test_type">
				<option value="">전체</option>
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="student_type">
				<option value="">전체</option>
				<option value="SENIOR">성인</option>
				<option value="JUNIOR">중고등</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="modify_yn">
				<option value="">전체</option>
				<option value="Y">수정완료</option>
				<option value="N">미 수정</option>
			</select>
		</div>
		<div class="col-4">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">수기 게시판 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:40%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>번호</th>
									<th class='text-center'>시험구분</th>
									<th class='text-center'>학생구분</th>
									<th class='text-center'>제목</th>
									<th class='text-center'>등록일</th>
									<th class='text-center'>등록자</th>
									<th class='text-center'>최종점수</th>
									<th class='text-center'>소요기간</th>
									<th class='text-center'>조회수</th>
									<th class='text-center'>수정여부</th>
									<th class='text-center'>관리</th>
								</tr>
							</thead>
							<tbody id="dataList">
							</tbody>
						</table>
					</div>	
					<div>
						<ul class="pagination m-t-25 m-b-5" style="justify-content:center;" id="pageList">
						</ul>
					</div>		
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/board/memoirs_list.js"></script>