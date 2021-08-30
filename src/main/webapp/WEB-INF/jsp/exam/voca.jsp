<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Voca 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_book">
				<c:forEach var="book" items="${bookList}">
					<option value="<c:out value="${book.book}"/>"><c:out value="${book.book}"/></option>
				</c:forEach>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_day">
			</select>
		</div>
		<div class="col-md-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">Voca 시험문제 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-striped table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:15%;" />
								<col style="width:20%;" />
								<col style="width:30%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr>
									<th>책 No.</th>
									<th>단어</th>
									<th>발음</th>
									<th>뜻</th>
									<th class="text-center" colspan="2">Difficulty</th>
									<th class="text-center" colspan="2">Exception</th>
									<th>관리</th>
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
<div class="modal fade" id="modal-voca">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">VOCA 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:15%;" />
							<col style="width:35%;" />
							<col style="width:40%;" />
							<col style="width:10%;" />
						</colgroup>	
						<tbody id="data_list">				

						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_voca();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/exam/voca.js"></script>
