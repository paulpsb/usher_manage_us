<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">조직도 관리</h1>
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
					<h4 class="panel-title">조직도 관리</h4>
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

<div class="modal fade" id="modal-organization">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">조직도 추가/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:30%;" />
							<col style="width:70%;" />
						</colgroup>	
						<tbody>				
							<tr>
								<th class="text-center table-info">상위 조직</th>
								<td id="organization_up_name"></td>
							</tr>
							<tr>
								<th class="text-center table-info">조직명</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="organization_name" name="organization_name">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">조직 Color</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="organization_icon" name="organization_icon">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_save();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->

<div class="modal fade" id="modal-organization-info">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="organization_title"></h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-footer">
				<a id="btn_add" href="javascript:form_add();" class="btn btn-success">하위 조직도 추가</a>
				<a id="btn_modify" href="javascript:form_modify();" class="btn btn-info">수정</a>
				<a id="btn_delete" href="javascript:form_delete();" class="btn btn-danger">삭제</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->

<!-- end #content -->
<script type="text/javascript" src="/ui/base/auth_organization.js"></script>
