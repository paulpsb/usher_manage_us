<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">배치고사 Listening 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" name="v_type" id="v_type" value="${listeningInfo.type}">
	<input type="hidden" name="v_num" id="v_num" value="${listeningInfo.num}">
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_type">
				<option value="LC DIAGNOSTIC">LC DIAGNOSTIC</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_num">
				<option value="0">선택</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-7 text-right">
			<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="add_form()">추가</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">리스닝 시험문제 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">Type</th>
									<th class="text-center">Num</th>
									<th class="text-center">Set</th>
									<th class="text-center">Article</th>
									<th class="text-center">타입</th>
									<th class="text-center">이미지</th>
									<th class="text-center">관리</th>
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
<div class="modal fade" id="modal-listening">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">지문 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:80%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey">Type</th>
								<td class="text-with-form-control">
									<input type="hidden" name="listening_id" id="listening_id">
									<select class="form-control" name="type" id="type">
										<option value="LC DIAGNOSTIC">LC DIAGNOSTIC</option>
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">Num</th>
								<td class="text-with-form-control">
									<select class="form-control" name="num" id="num">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>									
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">Set</th>
								<td class="text-with-form-control">
									<select class="form-control" name="sub_num" id="sub_num">
										<option value="1">1</option>
										<option value="2">2</option>
									</select> 
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey">Article</th>
								<td class="text-with-form-control">
									<select class="form-control" name="article_num" id="article_num">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</select> 
								</td>
							</tr>							
							<tr>
								<th class="text-center bg-grey">타입</th>
								<td class="text-with-form-control">
									<select class="form-control" name="exam_type" id="exam_type">
										<option value="Conversation">Conversation</option>
										<option value="Lecture">Lecture</option>
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">이미지</th>
								<td class="text-with-form-control">
									<select class="form-control" name="image" id="image">
										
									</select> 
								</td>
							</tr>			
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_form();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/batch/listening_exam.js"></script>
