<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">OT 항목 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="offset-1 col-2">
			<select class="form-control" id="search_orientation_gubun">
				<option value="BASE">학원 생활 안내</option>
				<option value="PROGRAM">프로그램 안내</option>
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
		</div>
			
		<div class="col-7 text-right">
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-1 col-10">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">OT 항목 관리</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-striped table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:7%;" />
								<col style="width:20%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:10%;" />
								<col style="width:6%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr>
									<th class="text-center" rowspan="2">항목구분</th>
									<th class="text-center" rowspan="2">항목코드</th>
									<th class="text-center" rowspan="2">항목명</th>
									<th class="text-center" rowspan="2">출력순서</th>
									<th class="text-center" colspan="2">성인</th>
									<th class="text-center" colspan="2">중/고등</th>
									<th class="text-center" colspan="2">중/고등(특강)</th>
									<th class="text-center" rowspan="2">영상시간</th>
									<th class="text-center" rowspan="2">사용유무</th>
									<th class="text-center" rowspan="2">&nbsp;</th>
								</tr>
								<tr>
									<th class="text-center">현장</th>
									<th class="text-center">참강</th>
									<th class="text-center">현장</th>
									<th class="text-center">참강</th>
									<th class="text-center">현장</th>
									<th class="text-center">참강</th>
								</tr>
							</thead>
							<tbody id="data_list">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- end #content -->
<script type="text/javascript" src="/ui/base/orientation.js"></script>
