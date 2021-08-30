<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">시험 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_section">
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_book">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_oral_test_type">
				<option value="GENEALOGY">족보</option>
				<option value="READY">준비영상</option>
				<option value="SAMPLE">샘풀영상</option>
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-5 text-right">
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">시험 관리 목록</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:40%;" />
								<col style="width:20%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">&nbsp;</th>
									<th class="text-center">section</th>
									<th class="text-center">book</th>
									<th class="text-center">구분</th>
									<th class="text-center">제목</th>
									<th class="text-center">URL/비메오ID</th>
									<th class="text-center">&nbsp;</th>
								</tr>
							</thead>
							<tbody id="itemBoxWrap">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/correction/oral_test.js"></script>
