<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Reading 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" name="v_page" id="v_page" value="${readingInfo.page}">
	<input type="hidden" name="v_book" id="v_book" value="${readingInfo.book}">
	<input type="hidden" name="v_volume" id="v_volume" value="${readingInfo.volume}">
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_book">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_volume">
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
					<h4 class="panel-title">리딩 시험문제 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:25%;" />
								<col style="width:15%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">교재</th>
									<th class="text-center">볼륨</th>
									<th class="text-center">그룹</th>
									<th class="text-center">지문</th>
									<th class="text-center">제목</th>
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
<div class="modal fade" id="modal-reading">
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
								<th class="text-center bg-grey">교재</th>
								<td class="text-with-form-control">
									<input type="hidden" name="reading_id" id="reading_id">
									<select class="form-control" name="book" id="book">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">볼륨</th>
								<td class="text-with-form-control">
									<select class="form-control" name="volume" id="volume">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">그룹</th>
								<td class="text-with-form-control">
									<select class="form-control" name="group" id="group">
									</select> 
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey">지문</th>
								<td class="text-with-form-control">
									<select class="form-control" name="article" id="article">
									</select> 
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey">제목</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="passage" id="passage">
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
<script type="text/javascript" src="/ui/exam/reading_list.js"></script>
