<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Speaking 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_book">
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-9 text-right">
			<button type="button" class="btn btn-primary width-60 m-r-2" onclick="add_form()">추가</button>
			<button type="button" class="btn btn-primary" onclick="form_excel()"><i class="fa fa-file-excel fa-fw"></i> Excel</button>
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
								<col style="width:55%;" />
								<col style="width:15%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">교재</th>
									<th class="text-center">번호</th>
									<th class="text-center">질문</th>
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
<div class="modal fade" id="modal-speaking">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">스피킹 등록/수정</h4>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:30%;" />
							<col style="width:20%;" />
							<col style="width:30%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey">교재</th>
								<td class="text-with-form-control">
									<input type="hidden" name="speaking_id" id="speaking_id">
									<select class="form-control" name="book" id="book">
									</select> 
								</td>
								<th class="text-center bg-grey">번호</th>
								<td class="text-with-form-control">
									<input type="text"  class="form-control" name="article" id="article">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">제목</th>
								<td class="text-with-form-control" colspan="3">
									<input type="text" class="form-control" name="title" id="title">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">지문</th>
								<td class="text-with-form-control" colspan="3">
									<textarea class="form-control" name="passage" id="passage" style="height:150px;"></textarea> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">질문</th>
								<td class="text-with-form-control" colspan="3">
									<textarea class="form-control" name="question" id="question" style="height:150px;"></textarea> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" rowspan="2">음원</th>
								<td class="text-with-form-control" colspan="3">
									<div id="div_sound"></div> 
								</td>
							</tr>			
							<tr>
								<td class="text-with-form-control" colspan="3">
									<textarea class="form-control" name="sound_script" id="sound_script" style="height:150px;"></textarea> 
								</td>
							</tr>			
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:close_form()" class="btn btn-white" >Close</a>
				<a href="javascript:save_form();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<form id="excelFrm" name="excelFrm" method="post" enctype="multipart/form-data">
	
</form>
<!-- end #content -->
<script type="text/javascript" src="/ui/exam/speaking_list.js"></script>
