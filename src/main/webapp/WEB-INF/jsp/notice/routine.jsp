<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">루틴 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area">
		<div class="row mb-2">
			<div class="col-2">
				<select class="form-control" id="search_routine_category" name="search_routine_category">
					<option value="">카테고리</option>
					<option value="DAILY">Daily</option>
					<option value="MONTHLY">Monthly</option>
					<option value="YEARLY">Yearly</option>
				</select>
			</div>	
			<div class="col-2">
				<select class="form-control" id="search_routine_type" name="search_routine_type">
					<option value="">전송대상</option>
					<option value="CLASS">교실</option>
					<option value="ORGANIZATION">조직</option>
				</select>
			</div>	
			<div class="col-2">
				<select class="form-control" id="search_routine_organization_id" name="search_routine_organization_id">
					
				</select>
			</div>	
			<div class="col-1">
				<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			</div>	
			<div class="offset-4 col-1">
				<button type="button" class="btn btn-primary form-control" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> Routine 추가</button>
			</div>	
		</div>
		<!-- 
		<div class="row">
			<div class="col-1">
				<h4>카테고리</h4>
			</div>
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_1" value="" checked>
				<label class="css-input-radio-checkbox-label" for="search_routine_category_1" style="padding:5px;">전체</label>
			</div>
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_2" value="DAILY">
				<label class="css-input-radio-checkbox-label" for="search_routine_category_2" style="padding:5px;">Daily</label>
			</div>
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_3" value="MONTHLY">
				<label class="css-input-radio-checkbox-label" for="search_routine_category_3" style="padding:5px;">Monthly</label>
			</div>
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_4" value="YEARLY">
				<label class="css-input-radio-checkbox-label" for="search_routine_category_4" style="padding:5px;">Yearly</label>
			</div>
			<div class="offset-2 col-1">
				<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			</div>
		</div>
		<div class="row">
			<div class="col-1">
				<h4>전송대상</h4>
			</div>
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_routine_type" id="search_routine_type_1" value="" checked>
				<label class="css-input-radio-checkbox-label" for="search_routine_type_1" style="padding:5px;">전체</label>
			</div>
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_routine_type" id="search_routine_type_2" value="CLASS">
				<label class="css-input-radio-checkbox-label" for="search_routine_type_2" style="padding:5px;">교실</label>
			</div>
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_routine_type" id="search_routine_type_3" value="GENERAL">
				<label class="css-input-radio-checkbox-label" for="search_routine_type_3" style="padding:5px;">일반</label>
			</div>
			<div class="offset-4 col-1">
				<button type="button" class="btn btn-primary form-control" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> Routine 추가</button>
			</div>
		</div>
		 -->
	</div>
	
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">루틴 목록</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:8%;" />
								<col style="width:43%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:8%;" />
								<col style="width:8%;" />
								<col style="width:8%;" />
							</colgroup>							
							<thead>
								<tr>
									<th class="text-center table-info">No.</th>
									<th class="text-center table-info">카테고리</th>
									<th class="text-center table-info">제목</th>
									<th class="text-center table-info">최초 작성일자</th>
									<th class="text-center table-info">최종 수정일자</th>
									<th class="text-center table-info">전송대상</th>
									<th class="text-center table-info">조직</th>
									<th class="text-center table-info">&nbsp;</th>
								</tr>							
							</thead>
							<tbody id="dataList"></tbody>
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
<div class="modal fade" id="modal-routine">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center">
					루틴 등록/수정
				</h4>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:90%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-info">카테고리</th>
							<td class="with-radio">
								  <div class="radio radio-css radio-inline">
									<input type="radio" name="routine_category" id="routine_category_daily" value="DAILY" checked>
									<label for="routine_category_daily">Daily</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="routine_category" id="routine_category_monthly" value="MONTHLY">
									<label for="routine_category_monthly">Monthly</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="routine_category" id="routine_category_yearly" value="YEARLY">
									<label for="routine_category_yearly">Yearly</label>
								</div>
							</td>
						</tr>
						<tr>
							<th class="text-center table-info">제목</th>
							<td class="with-form-control">
								<input type="text" class="form-control" name="routine_title" id="routine_title">  
							</td>
						</tr>					
						<tr>
							<th class="text-center table-info">전송대상</th>
							<td class="with-radio">
								<div class="radio radio-css radio-inline">
									<input type="radio" name="routine_type" id="routine_type_class" value="CLASS" checked>
									<label for="routine_type_class">교실</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="routine_type" id="routine_type_organization" value="ORGANIZATION">
									<label for="routine_type_organization">조직</label>
								</div>
							
							</td>
						</tr>					
						<tr>
							<th class="text-center table-info">조직도</th>
							<td class="with-radio" id="routine_organization">
								
							
							</td>
						</tr>					
					</table>
				</div>
				<hr/>
				<div class="row mb-3">
					<div class="col-6">
						<h4>상세내역</h4>
					</div>
					<div class="col-6 text-right">
						<button type="button" class="btn btn-primary" onclick="form_detail_add()"><i class="fa fa-plus fa-fw"></i> 내용 추가</button>
					</div>
				</div>		
				<div id="routine_detail_list" class="table-responsive" style="height:500px;overflow-y:auto;">
					
					
				</div>	
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_form();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-routin-file">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="title_routine_file">파일 Upload</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-12">
						업로드 할 파일을 등록하세요.
					</div>	
				</div>			
				<div class="row mb-3">
					<div class="col-12">
						<form id="form1" name="form1" method="post" enctype="multipart/form-data">
							<input type="file" class="form-control" name="file" id="file">
						</form>
					</div>		
				</div>			
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_file_save();" class="btn btn-success">업로드</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/notice/routine.js"></script>
