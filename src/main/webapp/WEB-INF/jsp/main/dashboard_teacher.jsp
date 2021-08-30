<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.section-drag {
	cursor: move;
	
	z-index: 995;
	text-align: center;
	filter: alpha(opacity=70);
	line-height: 20px;
	width:100%;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
	
}

.section-drop {
	margin: auto;
	z-index: 10;
	text-align: center;
	filter: alpha(opacity=70);
	line-height: 20px;
	width:100%;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
}

</style>
<input type="hidden" id="user_id" value="${teacherInfo.user_id}">
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">강사홈</h4>
					<div class="panel-heading-btn">
						<h4 class="panel-title">${teacherInfo.last_name}${teacherInfo.first_name}</h4>
					</div>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-3" style="padding-top:7px;">
							<h4>현재 시간 : <span id="current_time">00:00:00</span></h4>
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
								<input id="search_date" type="hidden" placeholder="Select Date" />
								<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
							</div>					
						</div>
						<div class="col-3">
							<table class="table table-bordered m-b-0">
								<colgroup>
									<col style="width:25%;" />
									<col style="width:25%;" />
									<col style="width:25%;" />
									<col style="width:25%;" />
								</colgroup>	
								<thead>
									<tr>
										<th class="bg-green-lighter">80% 이상</th>
										<th class="bg-blue-lighter">60% 이상</th>
										<th class="bg-yellow-lighter">40% 이상</th>
										<th class="bg-red-lighter">40% 이하</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:10%;" />
								<col style="width:45%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
							</colgroup>
							<thead>
								<tr class="table-info">
									<th class='text-center' colspan="2">&nbsp;</th>
									<th class='text-center'>수업/스터디/TASK</th>
									<th class='text-center'>Daily Routine</th>
									<th class='text-center'>Monthly Routine</th>
								</tr>
							</thead>
							<tbody id="timetableDataList">
							</tbody>
						</table>
					</div>					
				</div>
			</div>
		</div>
	</div>
</div>
<div class="theme-panel theme-panel-lg">
	<a href="javascript:;" data-click="theme-panel-expand" class="theme-collapse-btn"><i class="fa fa-cog"></i></a>
	<div class="theme-panel-content">
		<div class="row" id="notice_alram">
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
<div class="modal fade" id="modal-notice-schedule-file" style="z-index:1100;">
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
				<a href="javascript:schedule_file_save();" class="btn btn-success">업로드</a>
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
					<div class="col-10 mb-3" id="search_practice_list">
						
					</div>					
					<div class="col-2 text-right">
						<button type="button" class="btn btn-primary" onclick="practice_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
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
						<button type="button" class="btn btn-primary mb-3" onclick="new_student_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
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
					<div class="col-10 mb-3" >
						<h5 id="search_attend_title"></h5>
					</div>					
					<div class="col-2 text-right">
						<button type="button" class="btn btn-primary  mb-3" onclick="attend_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
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
				<h4 class="modal-title text-center">TASK</h4>
			</div>
			<div class="modal-body" style="max-height:700px;overflow-y:auto;">
				<div class="row">
					<div class="col-12"><h4>TASK 항목</h4></div>					
					<div class="col-12 mb-3"><h5 id="task_title"></h5></div>					
					<div class="col-12"><h4>TASK 제목</h4></div>					
					<div class="col-12 mb-3"><h5 id="task_reference_title"></h5></div>
					<div class="col-12"><h4>TASK 내용</h4></div>					
					<div class="col-12 mb-3"><h5 id="task_reference_content"></h5></div>
					<div class="col-12" id="div_task_return_content">
						<div class="row">
							<div class="col-12"><h4>반려 사유</h4></div>					
							<div class="col-12 mb-3"><h5 id="task_return_content"></h5></div>	
						</div>
					</div>
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
					<div class="col-12 mb-3"><textarea class="form-control" id="task_content"></textarea></div>					
					<div class="col-6" id="div_task_image1"><h4>사진등록</h4></div>
					<div class="col-6 text-right" id="div_task_image2">
						<span id="span_task_image_name"></span>
						<button type="button" class="btn btn-primary" onclick="task_add_image()">사진 등록</button>
						<input type="hidden" id="task_image">
						<input type="hidden" id="task_image_name">
					</div>
					<div class="col-12 text-center mb-3" id="div_task_image3"></div>
					<div class="col-6" id="div_task_file1"><h4>파일등록</h4></div>
					<div class="col-6 mb-3 text-right" id="div_task_file2">
						<span id="span_task_file_name"></span>
						<button type="button" class="btn btn-primary" onclick="task_add_file()">파일 등록</button>
						<input type="hidden" id="task_file">
						<input type="hidden" id="task_file_name">
					</div>
					<div class="col-12" id="div_task_url1"><h4>URL</h4></div>					
					<div class="col-12 mb-3"  id="div_task_url2"><textarea class="form-control" id="task_url"></textarea></div>
				</div>	
			</div>
			<div class="modal-footer">
				<button id="btn_task_starting" type="button" class="btn btn-purple" onclick="task_save('STARTING')">작업 시작</button>
				<button id="btn_task_working" type="button" class="btn btn-purple" onclick="task_save('WORKING')">작업 중</button>
				<button id="btn_task_response" type="button" class="btn btn-info" onclick="task_save('RESPONSE')">작업 완료 전송</button>
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
		search_form();
	});
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/main/dashboard_teacher.js"></script>
