<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div class="content">
	<!-- begin page-header -->
	<h1 class="page-header">수기 게시판 수정</h1>
	<hr />
	<!-- end page-header -->
	<div class="row">
		<div class="offset-2 col-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">수기 게시판 상세</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="form-group row  ">
						<input type="hidden" id="search_test_type" value="${memoirsInfo.test_type}">
						<input type="hidden" id="search_student_type" value="${memoirsInfo.student_type}">
						<input type="hidden" id="search_modify_yn" value="${memoirsInfo.modify_yn}">
						<input type="hidden" id="search_page" value="${memoirsInfo.page}">
						
						<input type="hidden" id="memoirs_id" value="${memoirsInfo.id}">
						<label class="col-form-label col-1">분류</label>
						<div class="col-11">
							<div class="form-group row">
								<div class="col-2">
									<select class="form-control" id="test_type">
										<option value="">시험구분</option>
										<option value="TOEFL">토플</option>
										<option value="TOEIC">토익</option>
									</select>								
								</div>
								<div class="col-2">
									<select class="form-control" id="student_type">
										<option value="">반 그룹</option>
										<option value="SENIOR">성인</option>
										<option value="JUNIOR">주니어</option>
									</select>								
								</div>
								<div class="col-2">
									<select class="form-control" id="service_type">

									</select>								
								</div>
								<div class="col-2">
									<select class="form-control" id="study_abroad">
										<option value="">어학연수경험</option>
										<option value="Y">유</option>
										<option value="N">무</option>
									</select>								
								</div>
							</div>
							<hr />
							<div class="form-group row">
								<div class="col-2">
									<select class="form-control" id="first_course">
										<option value="">최초시작반</option>
									</select>								
								</div>
								<div class="col-2">
									<select class="form-control" id="last_course">
										<option value="">최종수강반</option>
									</select>								
								</div>
								<div class="col-2">
									<select class="form-control" id="course_month">
										<option value="">총 수강개월</option>
									</select>								
								</div>
							</div>
							<hr />							
							<div class="form-group row">
								<label class="col-form-label col-2">시작점수(토익)</label>
								<div class="col-2">
									<input type="text" class="form-control m-b-5" id="start_toeic_score">							
								</div>
								<label class="col-form-label col-2">시작점수(텝스)</label>
								<div class="col-2">
									<input type="text" class="form-control m-b-5" id="start_teps_score">							
								</div>
								<label class="col-form-label col-2">시작점수(수능)</label>
								<div class="col-2">
									<input type="text" class="form-control m-b-5" id="start_scholastic_score">							
								</div>
							</div>
							<hr />
							<div class="form-group row">
								<label class="col-form-label col-2">시작점수(토플)</label>
								<div class="col-2">
									<input type="text" class="form-control m-b-5" id="start_toefl_score">							
								</div>
								<label class="col-form-label col-1">RC</label>
								<div class="col-1">
									<input type="text" class="form-control m-b-5" id="start_toefl_rc_score">							
								</div>
								<label class="col-form-label col-1">LC</label>
								<div class="col-1">
									<input type="text" class="form-control m-b-5" id="start_toefl_lc_score">							
								</div>
								<label class="col-form-label col-1">SP</label>
								<div class="col-1">
									<input type="text" class="form-control m-b-5" id="start_toefl_sp_score">							
								</div>
								<label class="col-form-label col-1">WR</label>
								<div class="col-1">
									<input type="text" class="form-control m-b-5" id="start_toefl_wr_score">							
								</div>
							</div>
							<hr />
							<div class="form-group row">
								<label class="col-form-label col-2">최종점수(토플)</label>
								<div class="col-2">
									<input type="text" class="form-control m-b-5" id="end_toefl_score">							
								</div>
								<label class="col-form-label col-1">RC</label>
								<div class="col-1">
									<input type="text" class="form-control m-b-5" id="end_toefl_rc_score">							
								</div>
								<label class="col-form-label col-1">LC</label>
								<div class="col-1">
									<input type="text" class="form-control m-b-5" id="end_toefl_lc_score">							
								</div>
								<label class="col-form-label col-1">SP</label>
								<div class="col-1">
									<input type="text" class="form-control m-b-5" id="end_toefl_sp_score">							
								</div>
								<label class="col-form-label col-1">WR</label>
								<div class="col-1">
									<input type="text" class="form-control m-b-5" id="end_toefl_wr_score">							
								</div>
							</div>
							<hr />
							<div class="form-group row">
								<label class="col-form-label col-2">시험일자</label>
								<div class="col-2">
									<select class="form-control" id="exam_year">
										<option value="">년</option>
									</select>					
								</div>
								<div class="col-1">
									<select class="form-control" id="exam_month">
										<option value="">월</option>
									</select>					
								</div>
								<div class="col-1">
									<select class="form-control" id="exam_day">
										<option value="">일</option>
									</select>					
								</div>
								<div class="col-6 text-right">
									<button type="button" class="btn btn-primary" onclick="form_submit()">저장</button>					
								</div>
								
							</div>
						</div>
					</div>		
					<hr />			
					<div class="form-group row ">
						<label class="col-form-label col-1">제목</label>
						<div class="col-11" id="title">
						</div>
					</div>	
					<hr />				
					<div class="form-group row ">
						<div class="offset-3 col-6" id="content" style="word-break:break-all;">
						</div>
					</div>					
				</div>
			</div>
		</div>
	</div>
</div>
<script src="/assets/plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/board/memoirs_form.js"></script>