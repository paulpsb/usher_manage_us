<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="file"   id="image_file" accept="image/*" style="display:none;" onChange="load_image(this);">
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">건물 관리</h1>
	<hr />
	<!-- end page-header -->
	<div id="search_area" class="row mb-3">
		<div class="col-12 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">건물 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>건물구분</th>
									<th class='text-center'>주소</th>
									<th class='text-center'>주소 URL</th>
									<th class='text-center'>사용여부</th>
									<th class='text-center'>등록일시/등록자</th>
									<th class='text-center'>수정일시/수정자</th>
									<th class='text-center'>&nbsp;</th>
								</tr>
							</thead>
							<tbody id="dataList">
							</tbody>
						</table>
					</div>	
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-address">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">건물 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive" style="max-height:600px;overflow-y:auto;">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:30%;" />
							<col style="width:20%;" />
							<col style="width:30%;" />
						</colgroup>	
						<tbody>	
							<tr>
								<th class="text-center table-info">건물구분</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="building_name">
								</td>
								<th class="text-center table-info">사용여부</th>
								<td class="text-with-form-control">
									<div class="switcher">
										<input type="checkbox" name="status" id="status" value="1">
										<label for="status"></label>
									</div>
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">주소</th>
								<td class="text-with-form-control" colspan="3">
									<input type="text" class="form-control" id="building_address">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">주소 URL</th>
								<td class="text-with-form-control" colspan="3">
									<input type="text" class="form-control" id="building_url">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">이미지</th>
								<td class="with-btn" colspan="3">
									<input type="hidden" id="building_image">
									<button class="btn btn-sm btn-primary m-2" onClick="add_image()">이미지 찾기</button>
								</td>
							</tr>								
							<tr>
								<td class="text-center" id="td_building_image" colspan="4">
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
<script type="text/javascript" src="/ui/base/address.js"></script>

