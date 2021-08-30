<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">모의 토플 엑셀업로드</h1>
	<hr />
	<!-- end page-header -->
	
	<div class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_toefl_excel_matching">
				<option value="">매칭 여부</option>
				<option value="Y">매칭</option>
				<option value="N">미매칭</option>
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-9 text-right">
			<button type="button" class="btn btn-primary" onclick="excel_form()">엑셀 업로드</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">모의 토플 엑셀업로드 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">아이디</th>
									<th class="text-center">이름</th>
									<th class="text-center">일자</th>
									<th class="text-center">Reading</th>
									<th class="text-center">Listening</th>
									<th class="text-center">Speaking</th>
									<th class="text-center">Writing</th>
									<th class="text-center">Total</th>
									<th class="text-center">매칭여부</th>
									<th class="text-center">&nbsp;</th>
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
<div class="modal fade" id="modal-toefl-excel">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">모의 토플 Excel Upload</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-12">
						업로드 할 파일을 등록하세요.
					</div>	
				</div>			
				<div class="row mb-3">
					<div class="col-12">
						<form id="form1" name="form1" method="post" enctype="multipart/form-data">
							<input type="file" class="form-control" name="file" id="file">
						</form>
					</div>		
				</div>			
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_excel_save();" class="btn btn-success">업로드</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-student">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">학생 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-8">
						<input type="text" class="form-control" id="search_auth_username">
					</div>	
					<div class="col-4">
						<button type="button" class="btn btn-primary" onclick="auth_search()"><i class="fa fa-search fa-fw"></i> Search</button>
					</div>		
				</div>			
				<div class="table-responsive" style="max-height:300px;overflow-y:auto;">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:15%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:25%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:10%;" />
						</colgroup>	
						<thead>	
							<tr>
								<th class="text-center table-info">아이디</th>
								<th class="text-center table-info">성명</th>
								<th class="text-center table-info">성별</th>
								<th class="text-center table-info">이메일</th>
								<th class="text-center table-info">생년월일</th>
								<th class="text-center table-info">연락처</th>
								<th class="text-center table-info">&nbsp;</th>
							</tr>
						</thead>
						<tbody id="authList"></tbody>
						
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/toefl_excel.js"></script>
