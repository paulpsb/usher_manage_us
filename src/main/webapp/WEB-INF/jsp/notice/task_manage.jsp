<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">TASK 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area">
		<div class="row mb-2">
			<div class="col-2">
				<select class="form-control" id="search_status" name="search_status">
					<option value="">상태</option>
					<option value="ACTIVE">활성화</option>
					<option value="INACTIVE">비활성화</option>
				</select>
			</div>	
			<div class="col-1">
				<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			</div>	
		</div>
	</div>
	
	<div class="row">
		<div class="col-5">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">TASK 항목 목록</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-2">
						<div class="col-12 text-right">
							<button type="button" class="btn btn-primary" onclick="form_add_category()"><i class="fa fa-plus fa-fw"></i> TASK 항목 추가</button>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:35%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:20%;" />
							</colgroup>							
							<thead>
								<tr>
									<th class="text-center table-info">No.</th>
									<th class="text-center table-info">항목명</th>
									<th class="text-center table-info">상태</th>
									<th class="text-center table-info">시작일자</th>
									<th class="text-center table-info">종료일자</th>
									<th class="text-center table-info">&nbsp;</th>
								</tr>							
							</thead>
							<tbody id="category_list"></tbody>
						</table>
					</div>
					<div>
						<ul class="pagination m-t-25 m-b-5" style="justify-content:center;" id="category_page">
						</ul>
					</div>	
				</div>
			</div>
		</div>
		<div class="col-7">
			<div class="panel panel-inverse" data-sortable-id="table-basic-2">
				<div class="panel-heading">
					<h4 class="panel-title">TASK 항목별 상세 목록</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-2">
						<div class="col-10">
							<h5 id="search_task_category_title"></h5>
						</div>
						<div class="col-2 text-right">
							<button type="button" class="btn btn-primary" onclick="form_add_detail()"><i class="fa fa-plus fa-fw"></i> TASK 상세 추가</button>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:50%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
							</colgroup>							
							<thead>
								<tr>
									<th class="text-center table-info">No.</th>
									<th class="text-center table-info">제목</th>
									<th class="text-center table-info">보고(이미지)</th>
									<th class="text-center table-info">보고(URL)</th>
									<th class="text-center table-info">보고(첨부파일)</th>
									<th class="text-center table-info">&nbsp;</th>
								</tr>							
							</thead>
							<tbody id="detail_list"></tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-task-category">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center">
					TASK 항목 등록/수정
				</h4>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:25%;" />
							<col style="width:10%;" />
							<col style="width:25%;" />
							<col style="width:10%;" />
							<col style="width:20%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-info">항목명</th>
							<td class="with-form-control" colspan="5">
								<input type="hidden" name="task_category_id" id="task_category_id">  
								<input type="text" class="form-control" name="task_category_title" id="task_category_title">  
							</td>
						</tr>
						<tr>
							<th class="text-center table-info">시작일자</th>
							<td class="with-form-control">
								<input type="text" class="form-control" name="task_category_start_date" id="task_category_start_date">  
							</td>
							<th class="text-center table-info">종료일자</th>
							<td class="with-form-control">
								<input type="text" class="form-control" name="task_category_end_date" id="task_category_end_date">  
							</td>
							<th class="text-center table-info">상태</th>
							<td class="with-form-control">
								<div class="switcher">
									<input type="checkbox" name="task_category_status" id="task_category_status" value="1">
									<label for="task_category_status"></label>
								</div>  
							</td>
						</tr>					
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_save_category();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-task-detail">
	<div class="modal-dialog modal-lg">
		<div class="modal-content" >
			<div class="modal-header">
				<h4 class="modal-title text-center">
					TASK 상세 등록/수정
				</h4>
			</div>
			<div class="modal-body"style="max-height:650px;overflow-y:auto;">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:90%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-info">항목</th>
							<td class="with-form-control" id="td_task_category_title">
							</td>
						</tr>
						<tr>
							<th class="text-center table-info">세부 항목</th>
							<td class="with-form-control">
								<input type="hidden" name="task_detail_id" id="task_detail_id">  
								<input type="text" class="form-control" name="reference_title" id="reference_title">  
							</td>
						</tr>
						<tr>
							<th class="text-center table-info">소요 시간</th>
							<td class="with-form-control">
								<select class="form-control" name="reference_time" id="reference_time"></select>  
							</td>
						</tr>
						
						<tr>
							<th class="text-center table-info">세부 내용</th>
							<td class="with-form-control">
								<textarea class="form-control" name="reference_contents" id="reference_contents"></textarea>
							</td>
						</tr>					
						<tr>
							<th class="text-center table-info">참고URL</th>
							<td class="with-form-control">
								<textarea class="form-control" name="reference_url" id="reference_url"></textarea>
							</td>
						</tr>					
						<tr>
							<th class="text-center table-info">참고사진</th>
							<td class="with-form-control">
								<span id="span_reference_image"></span>
								<button type="button" class="btn btn-primary" onclick="form_add_detail_image()">참고사진 등록</button>
								<button type="button" class="btn btn-primary" onclick="form_delete_detail_image()">참고사진 삭제</button>
								<input type="hidden" name="reference_image" id="reference_image">
								<input type="hidden" name="reference_image_name" id="reference_image_name">
								<div style="width:100%;padding:5px;" id="div_reference_image"></div>
							</td>
						</tr>					
						<tr>
							<th class="text-center table-info">참고파일</th>
							<td class="with-form-control">
								<span id="span_reference_file"></span>
								<button type="button" class="btn btn-primary" onclick="form_add_detail_file()">참고파일 등록</button>
								<button type="button" class="btn btn-primary" onclick="form_delete_detail_file()">참고파일 삭제</button>
								<input type="hidden" name="reference_file" id="reference_file">
								<input type="hidden" name="reference_file_name" id="reference_file_name">
							</td>
						</tr>
						<tr>
							<th class="text-center table-info">보고형식</th>
							<td class="with-checkbox">
								<div class="checkbox checkbox-css pt-0 checkbox-inline">
									<input type="checkbox" name="report_image" id="report_image" value="1">
									<label for="report_image">사진보고</label>
								</div>
								<div class="checkbox checkbox-css pt-0 checkbox-inline">
									<input type="checkbox" name="report_url" id="report_url" value="1">
									<label for="report_url">URL 보고</label>
								</div>
								<div class="checkbox checkbox-css pt-0 checkbox-inline">
									<input type="checkbox" name="report_file" id="report_file" value="1">
									<label for="report_file">파일 보고</label>
								</div>
							</td>
						</tr>					
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_save_detail();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-task-file">
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
<script>
	$('#task_category_start_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	});
	$('#task_category_end_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	});
</script>
<script type="text/javascript" src="/ui/notice/task_manage.js"></script>
