<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="file"   id="image_file" accept="image/*" style="display:none;" onChange="load_image(this);">
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">카카오 메시지 관리</h1>
	<hr />
	<!-- end page-header -->
	<div id="search_area" class="row mb-3">
		<div class="col-4 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
		</div>
		<div class="col-8 text-right">
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
	</div>
	<div class="row">
		<div class="col-4">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">카카오 메시지 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:40%;" />
								<col style="width:40%;" />
								<col style="width:20%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class='text-center'>메시지 ID</th>
									<th class='text-center'>메시지 명</th>
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
		<div class="col-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">카카오 메시지 상세</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="form-group row" style="overflow-y:auto;">
						<label class="col-2 col-form-label">메시지 ID</label>
						<div class="col-4">
							<input type="text" id="send_message_gubun" class="form-control" disabled>
						</div>
						<label class="col-2 col-form-label">메시지 명</label>
						<div class="col-4">
							<input type="text" id="send_message_name" class="form-control" disabled>
						</div>
					</div>
					<div class="form-group row mb-3" id="div_send_code">
						
					</div>
					<div class="form-group row m-b-15">
						<div class="col-md-12">
							<textarea class="ckeditor" id="send_message_desc" name="send_message_desc" rows="30"></textarea>
						</div>
					</div>	
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script src="/assets/plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/base/kakao_send_message.js"></script>

