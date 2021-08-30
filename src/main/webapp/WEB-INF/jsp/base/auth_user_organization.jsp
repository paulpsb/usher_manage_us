<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">조직별 회원 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_country" class="row mb-3">
		<div class="col-12 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">조직도</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-12" id="organization_list">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-auth-user">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">조직별 직원리스트</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:80%;" />
						</colgroup>	
						<tbody>	
							<tr>
								<th class="text-center table-info">조직명</th>
								<td class="text-center" id="organization_name"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="row mb-3">
					<div class="col-6">
					</div>
					<div class="col-6 text-right">
						<!-- <button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button> -->
						<button type="button" class="btn btn-primary" onclick="form_add()">추가</button>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:15%;" />
							<col style="width:30%;" />
							<col style="width:20%;" />
							<col style="width:10%;" />
						</colgroup>
						<thead>
							<tr class="table-info">
								<th class='text-center'>그룹</th>
								<th class='text-center'>ID</th>
								<th class='text-center'>성명</th>
								<th class='text-center'>&nbsp;</th>
							</tr>
						</thead>
						<tbody id="user_list">
						</tbody>
					</table>
				</div>	
			</div>
			<div class="modal-footer">
				<a href="javascript:close_auth_user();" class="btn btn-white">Close</a>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-auth">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">직원 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-3">
						<select class="form-control" id="search_auth_group">
							<option value="2">직원</option>
							<option value="3">매니저</option>
							<option value="4">강사</option>
						</select>
					</div>					
					<div class="col-5">
						<input type="text" class="form-control" id="search_auth_username">
					</div>	
					<div class="col-4">
						<button type="button" class="btn btn-primary" onclick="auth_search()"><i class="fa fa-search fa-fw"></i> Search</button>
					</div>		
				</div>			
				<div class="table-responsive" style="max-height:300px;overflow-y:auto;">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:50%;" />
							<col style="width:40%;" />
						</colgroup>	
						<thead>	
							<tr>
								<th class="text-center table-info">&nbsp;</th>
								<th class="text-center table-info">아이디</th>
								<th class="text-center table-info">성명</th>
							</tr>
						</thead>
						<tbody id="authList"></tbody>
						
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:auth_add();" class="btn btn-success">조직도에 회원 추가</a>
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>

<!-- end #content -->
<script type="text/javascript" src="/ui/base/auth_user_organization.js"></script>
