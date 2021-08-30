<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">TASK 현황</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area">
		<div class="row mb-2">
			<div class="col-2">
				<input type="text" class="form-control" id="search_task_start_date" name="search_task_start_date">
			</div>	
			<div class="col-2">
				<input type="text" class="form-control" id="search_task_end_date" name="search_task_end_date">
			</div>	
			<div class="col-2">
				<select class="form-control" id="search_task_status" name="search_task_status">
					<option value="">상태</option>
					<option value="REQUEST">작업요청</option>
					<option value="TIMEING">시간지정</option>
					<option value="STARTING">작업시작</option>
					<option value="WORKING">작업중</option>
					<option value="RESPONSE">작업전송</option>
					<option value="RETURN">반려</option>
					<option value="COMPLETE">작업완료</option>
				</select>
			</div>	
			<div class="col-2">
				<input type="text" class="form-control" id="search_task_title" name="search_task_title" placeholder="항목 검색">
			</div>	
			<div class="col-2">
				<input type="text" class="form-control" id="search_task_reference_content" name="search_task_reference_content" placeholder="제목 검색">
			</div>	
			<div class="col-1">
				<input type="text" class="form-control" id="search_task_user_name" name="search_task_user_name" placeholder="담당자 검색">
			</div>	
			<div class="col-1">
				<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			</div>	
		</div>
	</div>
	
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">TASK 목록</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:30%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:10%;" />
							</colgroup>							
							<thead>
								<tr>
									<th class="text-center table-info">No.</th>
									<th class="text-center table-info">TASK</th>
									<th class="text-center table-info">세부내용</th>
									<th class="text-center table-info">예상소요시간</th>
									<th class="text-center table-info">담당자</th>
									<th class="text-center table-info">작업진행상황</th>
									<th class="text-center table-info">이미지</th>
									<th class="text-center table-info">파일</th>
									<th class="text-center table-info">URL</th>
									<th class="text-center table-info">&nbsp;</th>
								</tr>							
							</thead>
							<tbody id="data_list"></tbody>
						</table>
					</div>
					<div>
						<ul class="pagination m-t-25 m-b-5" style="justify-content:center;" id="page_list">
						</ul>
					</div>	
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-notice-task">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center">TASK 상세</h4>
			</div>
			<div class="modal-body" style="max-height:700px;overflow-y:auto;">
				<div class="row">
					<div class="col-12"><h4>TASK 항목</h4></div>					
					<div class="col-12 mb-3"><h5 id="task_title"></h5></div>					
					<div class="col-12"><h4>TASK 제목</h4></div>					
					<div class="col-12 mb-3"><h5 id="task_reference_title"></h5></div>
					<div class="col-12"><h4>TASK 내용</h4></div>					
					<div class="col-12 mb-3"><h5 id="task_reference_content"></h5></div>
					<div class="col-12" id="div_task_reference_image">
						<div class="row">
							<div class="col-12"><h4>참고이미지</h4></div>				
							<div class="col-12 mb-3" id="task_reference_image"></div>
						</div>
					</div>	
					<div class="col-12" id="div_task_reference_url">
						<div class="row">
							<div class="col-12"><h4>참고 URL</h4></div>
							<div class="col-12 mb-3" id="task_reference_url"></div>
						</div>
					</div>	
					<div class="col-12" id="div_task_reference_file">
						<div class="row">
							<div class="col-12"><h4>참고 파일</h4></div>
							<div class="col-12 mb-3" id="task_reference_file"></div>
						</div>
					</div>	
					<div class="col-12"><h4>코멘트</h4></div>					
					<div class="col-12 mb-3" id="task_content"></div>					
					<div class="col-12" id="div_task_image1"><h4>사진</h4></div>
					<div class="col-12 text-center mb-3" id="div_task_image2"></div>
					<div class="col-6 mb-3" id="div_task_file1"><h4>파일</h4></div>
					<div class="col-6 mb-3 text-right" id="div_task_file2">
						
					</div>
					<div class="col-12" id="div_task_url1"><h4>URL</h4></div>					
					<div class="col-12 mb-3"  id="div_task_url2"></div>
					<div class="col-12"><h4>반려사유</h4></div>					
					<div class="col-12 mb-3"><textarea class="form-control" id="task_return_content"></textarea></div>
				</div>	
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" onclick="task_save_return()">반려</button>
				<button type="button" class="btn btn-success" onclick="task_save_complete()">작업 완료</button>
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-notice-task-detail">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center">TASK Log</h4>
			</div>
			<div class="modal-body" style="max-height:700px;overflow-y:auto;">
				<div class="table-responsive">
					<table class="table table-bordered m-b-0">
						<colgroup>
							<col style="width:15%;" />
							<col style="width:20%;" />
							<col style="width:20%;" />
							<col style="width:25%;" />
							<col style="width:20%;" />
						</colgroup>							
						<thead>
							<tr>
								<th class="text-center table-info">No.</th>
								<th class="text-center table-info">일자</th>
								<th class="text-center table-info">시간</th>
								<th class="text-center table-info">등록자</th>
								<th class="text-center table-info">상태</th>
							</tr>							
						</thead>
						<tbody id="log_list"></tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<script>
	$('#search_task_start_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	});
	$('#search_task_end_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	});
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/notice/task_stats.js"></script>
