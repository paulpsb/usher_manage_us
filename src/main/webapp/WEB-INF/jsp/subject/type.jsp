<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">시험 타입 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-10 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-2 col-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">시험 타입 관리</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-striped table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:40%;" />
								<col style="width:8%;" />
								<col style="width:4%;" />
							</colgroup>
							<thead>
								<tr>
									<th>타입</th>
									<th>명칭</th>
									<th>프로그램사용</th>
									<th>문단별 시험 사용</th>
									<th>주의문구</th>
									<th>출력순서</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody id="sectionList">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- end #content -->
<script type="text/javascript" src="/ui/subject/type.js"></script>

