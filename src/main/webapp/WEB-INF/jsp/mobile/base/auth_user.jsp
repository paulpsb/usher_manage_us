<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content" style="padding:10px;">
	<!-- begin page-header -->
	<h1 class="page-header">직원 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-4">
			<select class="form-control" id="search_group">
				<option value="2">직원</option>
				<option value="3">매니저</option>
				<option value="4">강사</option>
			</select>
		</div>	
		<div class="col-4">
			<input type="text" class="form-control" id="search_username">
		</div>	
		<div class="col-4">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
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
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:40%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>그룹</th>
									<th class='text-center'>아이디</th>
									<th class='text-center'>성명</th>
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
<!-- end #content -->
<script type="text/javascript" src="/ui/mobile/base/auth_user.js"></script>

