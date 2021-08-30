<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Reading 지문 관리</h1>
	<hr />
	<!-- end page-header -->
	<input type="hidden" name="v_page" id="v_page" value="${readingInfo.page}">
	<input type="hidden" name="v_book" id="v_book" value="${readingInfo.book}">
	<input type="hidden" name="v_volume" id="v_volume" value="${readingInfo.volume}">
	<input type="hidden" name="reading_id" id="reading_id" value="${readingInfo.id}">
	
	<div id="search_area" class="row mb-3">
		<div class="col-12 text-right">
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
			<button type="button" class="btn btn-primary" onclick="move_question_form()"><i class="fa fa-arrow-right fa-fw"></i> 문제로 이동</button>
			<button type="button" class="btn btn-primary" onclick="move_form()"><i class="fa fa-arrow-right fa-fw"></i> 목록으로 이동</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">Reading 시험문제</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="form-group row m-b-15">
						<label class="col-form-label col-1 text-right">교재</label>
						<div class="col-2">
							<input type="text" class="form-control m-b-5" id="book" name="book" readonly/>
						</div>
						<label class="col-form-label col-1 text-right">볼륨</label>
						<div class="col-2">
							<input type="text" class="form-control m-b-5" id="volume" name="volume" readonly/>
						</div>
						<label class="col-form-label col-1 text-right">그룹</label>
						<div class="col-2">
							<input type="text" class="form-control m-b-5" id="group" name="group" readonly/>
						</div>
						<label class="col-form-label col-1 text-right">지문</label>
						<div class="col-2">
							<input type="text" class="form-control m-b-5" id="article" name="article" readonly/>
						</div>
					</div>					
					<div class="form-group row m-b-15">
						<label class="col-form-label col-1 text-right">제목</label>
						<div class="col-11">
							<input type="text" class="form-control m-b-5" id="passage" name="passage"/>
						</div>
					</div>					
				</div>
			</div>
		</div>
	</div>
	<div class="row" id="passage_list" style="height:350px;overflow-y:auto;">
		<div class="col-6">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-11">
						<div class="panel-heading">
							<h4 class="panel-title">문단 1</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph1" name="internal_reading_paragraph1" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-12">
						<div class="panel-heading">
							<h4 class="panel-title">문단 3</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph3" name="internal_reading_paragraph3" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-13">
						<div class="panel-heading">
							<h4 class="panel-title">문단 5</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph5" name="internal_reading_paragraph5" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-14">
						<div class="panel-heading">
							<h4 class="panel-title">문단 7</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph7" name="internal_reading_paragraph7" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-15">
						<div class="panel-heading">
							<h4 class="panel-title">문단 9</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph9" name="internal_reading_paragraph9" rows="30"></textarea>
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
					<div class="panel panel-inverse" data-sortable-id="table-basic-16">
						<div class="panel-heading">
							<h4 class="panel-title">문단 2</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph2" name="internal_reading_paragraph2" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-17">
						<div class="panel-heading">
							<h4 class="panel-title">문단 4</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph4" name="internal_reading_paragraph4" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-18">
						<div class="panel-heading">
							<h4 class="panel-title">문단 6</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph6" name="internal_reading_paragraph6" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-19">
						<div class="panel-heading">
							<h4 class="panel-title">문단 8</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph8" name="internal_reading_paragraph8" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-10">
						<div class="panel-heading">
							<h4 class="panel-title">문단 10</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="internal_reading_paragraph10" name="internal_reading_paragraph10" rows="30"></textarea>
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
<script src="/assets/js/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/exam/reading_form.js"></script>
