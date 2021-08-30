<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-3">
			<h1 class="page-header">노티스 작업로그</h1>
		</div>
		<div class="col-2 text-right">
			<button type="button" class="btn btn-default" onclick="date_prev()"><</button>
		</div>
		<div class="col-2" >
			<input type="text" id="select_date_text" class="form-control text-center" readonly>
		</div>
		<div class="col-2">
			<button id="btn_next" type="button" class="btn btn-default" onclick="date_next()" disabled>></button>
			<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default" style="width:auto;display:inline-block;">
				<input id=search_notice_date type="hidden" placeholder="Select Date" />
				<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
			</div>					
		</div>
	</div>
	<div id="search_area">
		<div class="row mb-2">
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_notice_type" id="search_notice_type_1" value="" checked>
				<label class="css-input-radio-checkbox-label" for="search_notice_type_1" style="padding:5px;">전체</label>
			</div>	
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_notice_type" id="search_notice_type_2" value="class">
				<label class="css-input-radio-checkbox-label" for="search_notice_type_2" style="padding:5px;">수업/스터디</label>
			</div>	
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_notice_type" id="search_notice_type_3" value="daily">
				<label class="css-input-radio-checkbox-label" for="search_notice_type_3" style="padding:5px;">Daily Routine</label>
			</div>	
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_notice_type" id="search_notice_type_4" value="monthly">
				<label class="css-input-radio-checkbox-label" for="search_notice_type_4" style="padding:5px;">Monthly Routine</label>
			</div>	
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_notice_type" id="search_notice_type_5" value="yearly">
				<label class="css-input-radio-checkbox-label" for="search_notice_type_5" style="padding:5px;">Yearly Routine</label>
			</div>	
			<div class="col-2">
				<input type="radio" class="css-input-radio-checkbox" name="search_notice_type" id="search_notice_type_6" value="task">
				<label class="css-input-radio-checkbox-label" for="search_notice_type_6" style="padding:5px;">Task</label>
			</div>	
		</div>
		<div class="row mb-2">
			<div class="col-2">
				<select class="form-control" id="search_is_success" name="search_is_success">
					<option value="">성공/실패 모두 보기</option>
					<option value="Y">성공만 보기</option>
					<option value="N">실패만 보기</option>
				</select>
			</div>	
			<div class="col-1">
				<input type="text" class="form-control" id="search_notice_user_name" name="search_notice_user_name" placeholder="담당자 검색">
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
					<h4 class="panel-title">노티스 작업로그</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:20%;" />
								<col style="width:5%;" />
								<col style="width:30%;" />
								<col style="width:10%;" />
							</colgroup>							
							<thead>
								<tr>
									<th class="text-center table-info">No.</th>
									<th class="text-center table-info">날짜</th>
									<th class="text-center table-info">반</th>
									<th class="text-center table-info">종류</th>
									<th class="text-center table-info">제목/수업</th>
									<th class="text-center table-info">담당자</th>
									<th class="text-center table-info">보고내용</th>
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
<div class="modal fade" id="modal-notice-schedule">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center" id="notice_schedule_title"></h4>
			</div>
			<div class="modal-body" style="max-height:700px;overflow-y:auto;">
				<div class="row">
					<div class="col-12">
						<div id="accordion" class="accordion">
						</div>
					</div>					
				</div>	
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-notice-practice">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center">대안 작성</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12 mb-3" id="search_practice_list">
						
					</div>					
					<div class="col-12 mb-3">
						<h5>대안</h5>
					</div>					
					<div class="col-12 mb-3">
						<textarea class="form-control" id="comments"></textarea>
					</div>					
					<div class="col-12" style="max-height:500px;overflow-y:auto;">
						<div class="table-responsive">
							<table class="table table-bordered m-b-0">
								<colgroup>
									<col style="width:5%;" />
									<col style="width:10%;" />
									<col style="width:15%;" />
									<col style="width:15%;" />
									<col style="width:55%;" />
								</colgroup>							
								<thead>
									<tr>
										<th class="text-center table-info">No.</th>
										<th class="text-center table-info">이름</th>
										<th class="text-center table-info">최초</th>
										<th class="text-center table-info">최종</th>
										<th class="text-center table-info">대안</th>
									</tr>							
								</thead>
								<tbody id="practice_detail_list"></tbody>
							</table>
						</div>
					</div>					
				</div>	
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-notice-new-student">
	<div class="modal-dialog modal-lg" style="max-width:1000px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center">신규 학생 관리</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-6 mb-3" >
						<h5 id="new_student_course_name"></h5>
					</div>					
					<div class="col-6 text-right">
						<button type="button" class="btn btn-primary mb-3" onclick="go_course_repetition()">재수강 상담</button>
						<button type="button" class="btn btn-primary mb-3" onclick="go_course_goal()">목표 관리</button>
					</div>					
					<div class="col-12" style="max-height:500px;overflow-y:auto;">
						<div class="table-responsive">
							<table class="table table-bordered table-td-valign-middle m-b-0">
								<colgroup>
									<col style="width:5%;" />
									<col style="width:10%;" />
									<col style="width:10%;" />
									<col style="width:10%;" />
									<col style="width:10%;" />
									<col style="width:55%;" />
								</colgroup>							
								<thead>
									<tr>
										<th class="text-center table-info">No.</th>
										<th class="text-center table-info">이름</th>
										<th class="text-center table-info">OT완료여부</th>
										<th class="text-center table-info">상중하</th>
										<th class="text-center table-info">상담카드</th>
										<th class="text-center table-info">교육사항</th>
									</tr>							
								</thead>
								<tbody id="new_student_detail_list"></tbody>
							</table>
						</div>
					</div>					
				</div>	
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-notice-attend">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center">출결 작성</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12 mb-3" >
						<h5 id="search_attend_title"></h5>
					</div>					
					<div class="col-12" style="max-height:500px;overflow-y:auto;">
						<div class="table-responsive">
							<table class="table table-bordered m-b-0">
								<colgroup>
									<col style="width:5%;" />
									<col style="width:10%;" />
									<col style="width:15%;" />
									<col style="width:35%;" />
									<col style="width:35%;" />
								</colgroup>							
								<thead>
									<tr>
										<th class="text-center table-info">No.</th>
										<th class="text-center table-info">이름</th>
										<th class="text-center table-info">출결상태</th>
										<th class="text-center table-info">출결내역(학생)</th>
										<th class="text-center table-info">출결내역</th>
									</tr>							
								</thead>
								<tbody id="attend_detail_list"></tbody>
							</table>
						</div>
					</div>					
				</div>	
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
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
	$('#datepicker-disabled-past').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {
		change_date();
		form_search();
	});
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/notice/notice_work_log.js"></script>
