<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">암기 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" name="v_page" id="v_page" value="${memorizationInfo.page}">
	<input type="hidden" name="v_section" id="v_section" value="${memorizationInfo.section}">
	<input type="hidden" name="v_practice_type" id="v_practice_type" value="${memorizationInfo.practice_type}">
	<input type="hidden" name="v_book" id="v_book" value="${memorizationInfo.book}">
	<input type="hidden" name="v_volume" id="v_volume" value="${memorizationInfo.volume}">
	<input type="hidden" name="memorization_id" id="memorization_id" value="${memorizationInfo.id}">
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
					<h4 class="panel-title">암기 시험</h4>
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
								<th class="text-center bg-grey" >section</th>
								<td class="" id="td_section"></td>
								<th class="text-center bg-grey" >시험과목</th>
								<td class="" id="td_practice_name"></td>
								<th class="text-center bg-grey">book</th>
								<td class="" id="td_book"></td>
								<th class="text-center bg-grey">volume</th>
								<td class="" id="td_volume"></td>
							</tr>
							<tr>
								<th class="text-center bg-grey">group</th>
								<td class="" id="td_group"></td>
								<th class="text-center bg-grey">article</th>
								<td class="" id="td_article"></td>
								<th class="text-center bg-grey">Easy Time</th>
								<td class="with-form-control">
									<input type="text" class="form-control" name="easy_mode_time" id="easy_mode_time">
								</td>
								<th class="text-center bg-grey">Hard Time</th>
								<td class="with-form-control">
									<input type="text" class="form-control" name="hard_mode_time" id="hard_mode_time">
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
					<h4 class="panel-title">암기 지문</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-1">
						<div class="col-md-12 text-right mb-1">
							<button type="button" class="btn btn-primary" onclick="add_question()">Block-&gt;Question</button>
						</div>
						<div class="col-md-12">
							<textarea class="ckeditor" id="internal_memorization" name="internal_memorization" rows="30"></textarea>
						</div>	
					</div>				
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-3">
				<div class="panel-heading">
					<h4 class="panel-title">암기 시험문제 목록</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-1">
						<div class="col-md-12 text-right mb-1">
							<button type="button" class="btn btn-primary" onclick="clear_question()">문제 초기화</button>
						</div>
					</div>				
					<div class="table-responsive" style="height:500px;overflow-y:auto;">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:7%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:13%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center" rowspan="2">번호</th>
									<th class="text-center" colspan="5">단어/문장</th>
								</tr>
								<tr class="table-active">
									<th class="text-center">Easy</th>
									<th class="text-center">Hard</th>
									<th class="text-center">채점방식</th>
									<th class="text-center">가중치</th>
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
<script type="text/javascript" src="/ui/exam/memorization_form.js"></script>
