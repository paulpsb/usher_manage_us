<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Grammar 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_book">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_volume">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_group">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_article">
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row">
		<div class="col-6">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-11">
						<div class="panel-heading">
							<h4 class="panel-title">Grammar 문제 목록</h4>
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
							<h4 class="panel-title">Grammar 문제</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-12">
									<div class="form-group row m-b-15">
										<div class="col-12 text-right">
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
													<td class="text-with-form-control" colspan="4">&nbsp;</td>													
												</tr>
											</tbody>
										</table>
									</div>	
									<div class="form-group row m-b-15">
										<div class="col-12">
											<textarea class="ckeditor" id="grammar_question" name="grammar_question" rows="30"></textarea>
										</div>
									</div>		
									<div class="form-group row m-b-15">
										<div class="col-12" id="div_question">
											
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
<script src="/assets/js/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/exam/grammar_list.js"></script>
