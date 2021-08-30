<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">배치고사 Grammar 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-1">
			<select class="form-control" id="search_type">
				<option value="SW DIAGNOSTIC">SW DIAGNOSTIC</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_num">
				
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_question_num">

			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="score" name="score">
				<option value="0.6">0.6</option>
				<option value="0.7">0.7</option>
				<option value="0.75">0.75</option>
				<option value="1">1</option>
				<option value="1.25">1.25</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>			
			</select>		
		</div>		
		<div class="col-4">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
			<button type="button" class="btn btn-primary" onclick="create_num()"><i class="fa fa-list fa-fw"></i> 회차 생성</button>
			<button type="button" class="btn btn-primary" onclick="create_question_num()"><i class="fa fa-list fa-fw"></i> 문제 생성</button>
		</div>		
		<div class="col-4 text-right">
			<button type="button" class="btn btn-primary" onclick="form_submit()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-6">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-3">
						<div class="panel-heading">
							<h4 class="panel-title">질문</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="question" name="question" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>				
		</div>
		<div class="col-6">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-11">
						<div class="panel-heading">
							<h4 class="panel-title">보기</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12" id="div_question">
									
								</div>
							</div>	
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script src="/assets/plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/batch/grammar_exam.js"></script>
