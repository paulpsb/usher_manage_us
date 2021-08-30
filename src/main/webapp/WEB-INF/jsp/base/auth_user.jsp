<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">직원 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_group">
				<option value="2">직원</option>
				<option value="3">매니저</option>
				<option value="4">강사</option>
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_actice">
				<option value="Y">사용</option>
				<option value="N">미사용</option>
			</select>
		</div>	
		<div class="col-2">
			<input type="text" class="form-control" id="search_username">
		</div>	
		<div class="col-2">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>		
		<div class="col-4 text-right">
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">직원 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:6%;" />
								<col style="width:9%;" />
								<col style="width:6%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:12%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:12%;" />
								<col style="width:6%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>그룹</th>
									<th class='text-center'>아이디</th>
									<th class='text-center'>성명</th>
									<th class='text-center'>사용여부</th>
									<th class='text-center'>VOCA</th>
									<th class='text-center'>GRAMMAR</th>
									<th class='text-center'>READING</th>
									<th class='text-center'>LISTENING</th>
									<th class='text-center'>SPEAKING</th>
									<th class='text-center'>WRITING</th>
									<th class='text-center'>
										User Color
										<a href="/base/auth_user_color.do" class="btn btn-sm btn-primary m-r-2" target="_blank">색상표</a>
									</th>
									<th class='text-center'>출근시간</th>
									<th class='text-center'>퇴근시간</th>
									<th class='text-center'>관리</th>
									<th class='text-center'>&nbsp;</th>
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
<div class="modal fade" id="modal-auth">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">직원 등록</h4>
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
							<col style="width:30%;" />
							<col style="width:20%;" />
							<col style="width:50%;" />
						</colgroup>	
						<thead>	
							<tr>
								<th class="text-center table-info">아이디</th>
								<th class="text-center table-info">성명</th>
								<th class="text-center table-info">관리</th>
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
<script type="text/javascript" src="/ui/base/auth_user.js"></script>

