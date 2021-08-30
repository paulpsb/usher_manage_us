<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">듀오링고 빈칸 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" name="v_section" id="v_section" value="${blankInfo.section}">
	<input type="hidden" name="v_book" id="v_book" value="${blankInfo.book}">
	<input type="hidden" name="v_volume" id="v_volume" value="${blankInfo.volume}">
	<input type="hidden" name="v_group" id="v_group" value="${blankInfo.group}">
	<input type="hidden" name="v_article" id="v_article" value="${blankInfo.article}">
	<input type="hidden" name="v_blank_id" id="v_blank_id" value="${blankInfo.id}">
	<div id="search_area" class="row mb-3">
		<div class="col-12 text-right">
			<button type="button" class="btn btn-sm btn-primary m-r-2" onclick="move_list()">목록으로 이동</button>
			<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="save_form()">저장</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">듀오링고 빈칸 시험</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
							</colgroup>
							<tr>
								<th class="text-center bg-grey" >book</th>
								<td>${blankInfo.book}</td>
								<th class="text-center bg-grey" >volume</th>
								<td>${blankInfo.volume}</td>
								<th class="text-center bg-grey">group</th>
								<td>${blankInfo.group}</td>
								<th class="text-center bg-grey">article</th>
								<td>${blankInfo.article}</td>
							</tr>
							<tr>
								<th class="text-center bg-grey">제목</th>
								<td class="with-form-control" colspan="7">
									<input type="text" class="form-control" name="blank_title" id="blank_title">
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>	
	<div class="row">
		<div class="col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-2">
				<div class="panel-heading">
					<h4 class="panel-title">듀오링고 빈칸 지문</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-1">
						<div class="col-md-12 text-right mb-1">
							<button type="button" class="btn btn-primary" onclick="add_question()">Block-&gt;Question</button>
						</div>
						<div class="col-md-12">
							<textarea class="ckeditor" id="blank_contents" name="blank_contents" rows="30"></textarea>
						</div>	
					</div>				
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-3">
				<div class="panel-heading">
					<h4 class="panel-title">듀오링고 빈칸 시험문제 목록</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-1">
						<div class="col-md-12 text-right mb-1">
							<button type="button" class="btn btn-primary" onclick="clear_question()">문제 초기화</button>
						</div>
					</div>				
					<div class="table-responsive" style="height:400px;overflow-y:auto;">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:15%;" />
								<col style="width:70%;" />
								<col style="width:15%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">번호</th>
									<th class="text-center">단어/문장</th>
									<th class="text-center">관리</th>
								</tr>
							</thead>
							<tbody id="question_list">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>		
	</div>
</div>

<!-- end #content -->
<script src="/assets/js/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/exam/duolingo_blank_form.js"></script>
