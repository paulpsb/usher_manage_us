<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Writing 첨삭 관리</h1>
	<hr />
	<!-- end page-header -->
	<input type="hidden" id="search_book" value="${resultInfo.book}">
	<input type="hidden" id="search_student_pen_yn" value="${resultInfo.student_pen_yn}">
	<input type="hidden" id="search_answer_rublic_yn" value="${resultInfo.answer_rublic_yn}">
	<input type="hidden" id="search_answer_pen_yn" value="${resultInfo.answer_pen_yn}">
	<input type="hidden" id="search_answer_spk_yn" value="${resultInfo.answer_spk_yn}">
	<input type="hidden" id="search_page" value="${resultInfo.page}">
	
	<div id="search_area" class="row mb-3">
		<div class="col-1">
			<select class="form-control" id="book">
				<option value="">유형</option>
				<option value="independent">독립형</option>
				<option value="integrated">통합형</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="student_pen_yn">
				<option value="">개인첨삭여부</option>
				<option value="SENIOR">첨삭</option>
				<option value="JUNIOR">미첨삭</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="answer_rublic_yn">
				<option value="">채점여부</option>
				<option value="Y">채점</option>
				<option value="N">미채점</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="answer_pen_yn">
				<option value="">첨삭여부</option>
				<option value="Y">첨삭</option>
				<option value="N">미첨삭</option>
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
		</div>		
		<div class="col-7 text-right">
			<h4>
				<span id="select_course_name">전체</span>
				<button type="button" class="btn btn-white" onclick="showCourses();">반 선택</button>
				<button type="button" class="btn btn-white" onclick="form_all_select();">전체 보기</button>
			</h4>
		</div>			
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">Writing 첨삭 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:7%;" />
								<col style="width:6%;" />
								<col style="width:45%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>문제유형</th>
									<th class='text-center'>문제번호</th>
									<th class='text-center'>제목</th>
									<th class='text-center'>작성자</th>
									<th class='text-center'>작성일</th>
									<th class='text-center'>자가첨삭</th>
									<th class='text-center'>루브릭 채점</th>
									<th class='text-center'>첨삭</th>
									<th class='text-center'>오답노트</th>
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
			<div class="modal-footer">
				<a href="javascript:form_course_cancel();" class="btn btn-white">취소</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/test/correct_writing_list.js"></script>