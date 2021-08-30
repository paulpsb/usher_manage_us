<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">학교 비매칭 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="offset-1 col-10 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-1 col-10">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">학교 비매칭 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:30%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>국/내외</th>
									<th class='text-center'>학교구분</th>
									<th class='text-center'>시/도 & 대륙</th>
									<th class='text-center'>시/구/군 & 국가</th>
									<th class='text-center'>학교명</th>
									<th class='text-center'>관리</th>
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
<div class="modal fade" id="modal-school-matching">
	<div class="modal-dialog modal-lg" style="max-width:1100px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">학교 조회</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-1">
						<select class="form-control" id="search_school_foreign_gubun">
							<option value="">전체</option>
							<option value="국내">국내</option>
							<option value="해외">해외</option>
						</select>
					</div>
					<div class="col-3">
						<select class="form-control" id="search_school_area1">
							<option value="">전체</option>
						</select>
					</div>
					<div class="col-3">
						<select class="form-control" id="search_school_area2">
							<option value="">전체</option>
						</select>
					</div>
					<div class="col-2">
						<select id="search_school_gubun" class="form-control">
							<option value="">전체</option>
							<option value="초등학교">초등학교</option>
							<option value="중학교">중학교</option>
							<option value="고등학교">고등학교</option>
							<option value="대학교">대학교</option>
							<option value="대학원">대학원</option>
							<option value="그외">그외</option>
						</select>	
					</div>
					<div class="col-2">
						<input type="text" id="search_school_name" class="form-control">
					</div>		
					<div class="col-1">
						<button type="button" class="btn btn-primary" onclick="search_school()"><i class="fa fa-search fa-fw"></i></button>
					</div>
				</div>			
				<div class="table-responsive">
					<table class="table table-bordered m-b-10" style="width:1060px;">
						<thead style="float:left; width:1060px;">
							<tr>
								<th class="text-center table-info" style="width:100px;">국/내외</th>
								<th class="text-center table-info" style="width:120px;">학교구분</th>
								<th class="text-center table-info" style="width:160px;">시/도 & 대륙</th>
								<th class="text-center table-info" style="width:160px;">시/구/군 & 국가</th>
								<th class="text-center table-info" style="width:250px;">학교명(한글)</th>
								<th class="text-center table-info" style="width:270px;">학교명(영문)</th>
							</tr>
						</thead>
						<tbody style="overflow-y:scroll; overflow-x:hidden; float:left; width:1060px; height:350px" id="matching_list">	
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_matching_save();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-school-create">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">학교 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:30%;" />
							<col style="width:30%;" />
							<col style="width:20%;" />
						</colgroup>	
						<tbody>	
							<tr>
								<th class="text-center table-info">국/내외</th>
								<th class="text-center table-info">학교구분</th>
								<th class="text-center table-info">시/도 & 대륙</th>
								<th class="text-center table-info">시/구/군 & 국가</th>
							</tr>
							<tr>
								<td>
									<div style="height:200px;overflow-y:auto;">
										<ul>
											<li onclick="add_school_foreign_gubun('국내')" style="cursor:pointer;">국내</li>
											<li onclick="add_school_foreign_gubun('해외')" style="cursor:pointer;">해외</li>
										</ul>
									</div>
								</td>
								<td>
									<div style="height:200px;overflow-y:auto;">
										<ul id="ul_school_area1">
										</ul>
									</div>
								</td>
								<td>
									<div style="height:200px;overflow-y:auto;">
										<ul id="ul_school_area2">
										</ul>
									</div>
								</td>
								<td>
									<div style="height:200px;overflow-y:auto;">
										<ul>
											<li onclick="add_school_gubun('초등학교')" style="cursor:pointer;">초등학교</li>
											<li onclick="add_school_gubun('중학교')" style="cursor:pointer;">중학교</li>
											<li onclick="add_school_gubun('고등학교')" style="cursor:pointer;">고등학교</li>
											<li onclick="add_school_gubun('대학교')" style="cursor:pointer;">대학교</li>
											<li onclick="add_school_gubun('대학원')" style="cursor:pointer;">대학원</li>
											<li onclick="add_school_gubun('그외')" style="cursor:pointer;">그외</li>
										</ul>
									</div>
								</td>
							</tr>			
							<tr>
								<td>
									<input type="text" id="school_foreign_gubun" class="form-control" readonly>
								</td>
								<td>
									<input type="text" id="school_area1" class="form-control" readonly>
								</td>
								<td>
									<input type="text" id="school_area2" class="form-control" readonly>
								</td>
								<td>
									<input type="text" id="school_gubun" class="form-control" readonly>
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">학교명(한글)</th>
								<td colspan="4">
									<input type="text" id="school_name_kr" class="form-control">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">학교명(영문)</th>
								<td colspan="4">
									<input type="text" id="school_name_en" class="form-control">
								</td>
							</tr>							
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_create_save();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/base/user_school.js"></script>
