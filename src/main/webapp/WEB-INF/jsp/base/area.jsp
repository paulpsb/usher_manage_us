<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">지역 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-9 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-3 col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">지역 관리</h4>
				</div>
				<div class="panel-body">
					<div id="search_area" class="row mb-3">
						<div class="col-6 text-right">
							<button type="button" class="btn btn-primary" onclick="form_add_area1()"><i class="fa fa-plus fa-fw"></i>시/도 추가</button>
							<div class="table-responsive">
								<table class="table table-striped table-th-valign-middle table-td-valign-middle m-b-0">
									<colgroup>
										<col style="width:80%;" />
										<col style="width:20%;" />
									</colgroup>
									<thead>
										<tr>
											<th class="text-center">시/도</th>
											<th class="text-center">&nbsp;</th>
										</tr>
									</thead>
									<tbody id="area1List">
									</tbody>
								</table>
							</div>
						</div>
						<div class="col-6 text-right">
							<button type="button" class="btn btn-primary" onclick="form_add_area2()"><i class="fa fa-plus fa-fw"></i>시/구/군 추가</button>
							<div class="table-responsive">
								<table class="table table-striped table-th-valign-middle table-td-valign-middle m-b-0">
									<colgroup>
										<col style="width:80%;" />
										<col style="width:20%;" />
									</colgroup>
									<thead>
										<tr>
											<th class="text-center">시/구/군</th>
											<th class="text-center">&nbsp;</th>
										</tr>
									</thead>
									<tbody id="area2List">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-area1">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">시/도 추가/수정</h4>
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
								<th class="text-center table-info">시/도</th>
								<td class="text-with-form-control">
									<input type="hidden" id="area1_id" name="area1_id">
									<input type="text" class="form-control" id="area1" name="area1">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_save_area1();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->

<div class="modal fade" id="modal-area2">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">시/구/군 추가/수정</h4>
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
								<th class="text-center table-info">시/구/군</th>
								<td class="text-with-form-control">
									<input type="hidden" id="area2_id" name="area2_id">
									<input type="text" class="form-control" id="area2" name="area2">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_save_area2();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->

<!-- end #content -->
<script type="text/javascript" src="/ui/base/area.js"></script>
