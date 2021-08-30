<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">배치고사 Reading 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-1">
			<select class="form-control" id="search_type">
				<option value="RC DIAGNOSTIC">RC DIAGNOSTIC</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_num">
				
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_sub_num">
				<option value="1">Passage 1</option>
				<option value="2">Passage 2</option>
				<option value="3">Passage 3</option>
			</select>
		</div>
		<div class="col-4">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
			<button type="button" class="btn btn-primary" onclick="create_num()"><i class="fa fa-list fa-fw"></i> 회차 생성</button>
		</div>		
		<div class="col-5 text-right">
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
			<button type="button" class="btn btn-primary" onclick="move_question()"><i class="fa fa-arrow-right fa-fw"></i> Question 이동</button>
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
						<label class="col-form-label col-1 text-right">제목</label>
						<div class="col-9">
							<input type="text" class="form-control m-b-5" id="passage" name="passage"/>
						</div>
						<label class="col-form-label col-1 text-right">문항수</label>
						<div class="col-1">
							<input type="text" class="form-control m-b-5" id="q_num" name="q_num"/>
						</div>
					</div>					
					<div class="form-group row m-b-15">
						<label class="col-form-label col-1 text-right">등록자/등록일시</label>
						<div class="col-2">
							<input type="text" class="form-control m-b-5 text-center" id="created_name" name="created_name" readonly/>
						</div>
						<div class="col-3">
							<input type="text" class="form-control m-b-5 text-center" id="created" name="created" readonly/>
						</div>
						<label class="col-form-label col-1 text-right">수정자/수정일시</label>
						<div class="col-2">
							<input type="text" class="form-control m-b-5 text-center" id="modified_name" name="modified_name" readonly/>
						</div>
						<div class="col-3">
							<input type="text" class="form-control m-b-5 text-center" id="modified" name="modified" readonly/>
						</div>
					</div>					
				</div>
			</div>
		</div>
	</div>
	<div class="row">
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
									<textarea class="ckeditor" id="paragraph1" name="paragraph1" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph3" name="paragraph3" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph5" name="paragraph5" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph7" name="paragraph7" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph9" name="paragraph9" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph2" name="paragraph2" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph4" name="paragraph4" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph6" name="paragraph6" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph8" name="paragraph8" rows="30"></textarea>
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
									<textarea class="ckeditor" id="paragraph10" name="paragraph10" rows="30"></textarea>
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
<script type="text/javascript" src="/ui/batch/reading_exam.js"></script>
