<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">배치고사 Listening 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	<input type="hidden" name="listening_id" id="listening_id" value="${listeningInfo.id}">
	<div id="search_area" class="row mb-3">
		<div class="col-12 text-right">
			<button type="button" class="btn btn-sm btn-primary m-r-2" onclick="move_form()">목록으로 이동</button>
		</div>		
	</div>	
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">Listening 시험문제</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="form-group row m-b-15">
						<label class="col-form-label col-1 text-right">Type</label>
						<div class="col-1">
							<input type="text" class="form-control m-b-5" id="type" name="type" value="${listeningInfo.type}" readonly/>
						</div>
						<label class="col-form-label col-1 text-right">Num</label>
						<div class="col-1">
							<input type="text" class="form-control m-b-5" id="num" name="num" value="${listeningInfo.num}" readonly/>
						</div>
						<label class="col-form-label col-1 text-right">Set</label>
						<div class="col-1">
							<input type="text" class="form-control m-b-5" id="sub_num" name="sub_num" value="${listeningInfo.sub_num}" readonly/>
						</div>
						<label class="col-form-label col-1 text-right">Article</label>
						<div class="col-1">
							<input type="text" class="form-control m-b-5" id="article_num" name="article_num" value="${listeningInfo.article_num}" readonly/>
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
							<h4 class="panel-title">Listening 문제 목록</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12 text-right">
									<button type="button" class="btn btn-sm btn-primary m-r-2" onclick="add_question()">추가</button>
								</div>
							</div>							
							<div class="table-responsive">
								<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
									<colgroup>
										<col style="width:7%;" />
										<col style="width:78%;" />
										<col style="width:10%;" />
										<col style="width:5%;" />
									</colgroup>
									<thead>
										<tr class="table-active">
											<th class="text-center">Num</th>
											<th class="text-center">제목</th>
											<th class="text-center">Answer</th>
											<th class="text-center">관리</th>
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
		<div class="col-6">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-11">
						<div class="panel-heading">
							<h4 class="panel-title">Listening 문제</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<div class="form-group row m-b-15">
										<div class="col-md-12 text-right">
											<button type="button" class="btn btn-sm btn-primary m-r-2" onclick="save_question()">저장</button>
										</div>
									</div>							
									<div class="table-responsive m-b-15">
										<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
											<colgroup>
												<col style="width:15%;" />
												<col style="width:16%;" />
												<col style="width:15%;" />
												<col style="width:17%;" />
												<col style="width:15%;" />
												<col style="width:17%;" />
											</colgroup>
											<tbody>
												<tr>
													<th class="text-center bg-grey">문제번호</th>
													<td class="text-with-form-control">
														<input type="text" class="form-control" name="question_num" id="question_num" readonly>
													</td>													
													<th class="text-center bg-grey">출제유형</th>
													<td class="text-with-form-control">
														<select class="form-control" name="question_type" id="question_type">
															<option value="MA">Main Idea</option>
															<option value="DE">Detail</option>
															<option value="IN">Inferenc</option>
															<option value="CA">Category</option>
														</select> 
													</td>													
													<th class="text-center bg-grey">구현기준</th>
													<td class="text-with-form-control">
														<select class="form-control" name="category" id="category">
															<option value="A">기본형</option>
															<option value="B">복수답</option>
															<option value="C">재청취</option>
															<option value="D">정렬형</option>
															<option value="E">분류형</option>	
														</select> 
													</td>													
												</tr>
											</tbody>
										</table>
									</div>	
									<div class="form-group row m-b-15">
										<div class="col-md-12">
											<textarea class="ckeditor" id="batch_listening_question" name="batch_listening_question" rows="30"></textarea>
										</div>
									</div>		
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
</div>
<!-- end #content -->
<script src="/assets/plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/batch/listening_exam_question.js"></script>
