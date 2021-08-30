<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">볼륨 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="offset-2 col-2">
			<select class="form-control" id="search_section">
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_book">
			</select>
		</div>	
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>		
		<div class="col-3 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
			<button type="button" class="btn btn-primary" onclick="form_sort_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-2 col-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">볼륨 관리</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-striped table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:25%;" />
								<col style="width:25%;" />
								<col style="width:25%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr>
									<th>section</th>
									<th>교재명</th>
									<th>볼륨</th>
									<th>출력순서</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody id="volumeList">
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
<div class="modal fade" id="modal-volume">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">볼륨 추가/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:15%;" />
							<col style="width:35%;" />
							<col style="width:15%;" />
							<col style="width:35%;" />
						</colgroup>	
						<tbody>				
							<tr>
								<th class="text-center table-info">Section</th>
								<td class="text-with-form-control">
									<input type="hidden" id="volume_id" name="volume_id">
									<select class="form-control" id="practice_section_id" name="practice_section_id">
									</select>
								</td>
								<th class="text-center table-info">교재</th>
								<td class="text-with-form-control">
									<select class="form-control" id="practice_book_id" name="practice_book_id">
									</select>
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">볼륨</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="volume" name="volume">
								</td>
								<th class="text-center table-info">출력순서</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="volume_order" name="volume_order">
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
<!-- end #content -->
<script type="text/javascript" src="/ui/subject/volume.js"></script>
