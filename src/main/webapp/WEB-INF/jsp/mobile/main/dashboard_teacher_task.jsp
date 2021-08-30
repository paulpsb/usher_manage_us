<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.filebox input[type="file"] { 
	position: absolute; 
	width: 1px; 
	height: 1px; 
	padding: 0; 
	margin: -1px; 
	overflow: hidden; 
	clip:rect(0,0,0,0); 
	border: 0; 
} 
.filebox label { 
	margin-top:5px;
	display: inline-block; 
	padding: .5em .75em; 
	color: #fff;
    background-color: #337ab7;
	font-size: inherit; 
	line-height: normal; 
	vertical-align: middle; 
	cursor: pointer; 
	border: 1px solid #2e6da4; 
	border-bottom-color: #e2e2e2; 
	border-radius: .25em; 
} 
.filebox .upload-name { 
	margin-top:-4px;
	display: inline-block; 
	padding: .5em .75em; 
	font-size: inherit; 
	font-family: inherit; 
	line-height: normal; 
	vertical-align: middle; 
	background-color: #f5f5f5; 
	border: 1px solid #ebebeb; 
	border-bottom-color: #e2e2e2;
	border-radius: .25em; 
	-webkit-appearance: none; 
	-moz-appearance: none; 
	appearance: none; 
}
</style>
<input type="hidden" id="user_id" value="${teacherInfo.user_id}">
<input type="hidden" id="task_id" value="${teacherInfo.task_id}">
<input type="hidden" id="current_date" value="${teacherInfo.current_date}">
<input type="hidden" id="schedule_date" value="${teacherInfo.schedule_date}">
<input type="file"   id="image_file" accept="image/*" style="display:none;" onChange="load_image(this);">
<!-- begin #content -->
<div id="content" class="content" style="padding:0;">
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">TASK</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-3">
							<button type="button" class="btn btn-primary" onclick="go_home()">홈으로</button>
						</div>
						<div class="col-9 text-right">
							<button id="btn_task_starting" type="button" class="btn btn-purple" onclick="task_save('STARTING')">작업 시작</button>
							<button id="btn_task_working" type="button" class="btn btn-purple" onclick="task_save('WORKING')">작업 중</button>
							<button id="btn_task_response" type="button" class="btn btn-info" onclick="task_save('RESPONSE')">작업 완료 전송</button>
						</div>
					</div>
					<div class="row mb-3">
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
							<button type="button" class="btn btn-primary" onclick="task_add_image()">사진 등록</button>
							<input type="hidden" id="task_image">
							<input type="hidden" id="task_image_name">
						</div>
						<div class="col-12 text-center mb-3" id="div_task_image3"></div>
						<div class="col-6" id="div_task_file1"><h4>파일등록</h4></div>
						<div class="col-6 mb-3 text-right" id="div_task_file2">
							<button type="button" class="btn btn-primary" onclick="task_add_file()">파일 등록</button>
							<input type="hidden" id="task_file">
							<input type="hidden" id="task_file_name">
						</div>
						<div class="col-12 mb-3" id="div_task_file3"></div>
						<div class="col-12" id="div_task_url1"><h4>URL</h4></div>					
						<div class="col-12 mb-3"  id="div_task_url2"><textarea class="form-control" id="task_url"></textarea></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-notice-task-file">
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
				<a href="javascript:task_file_save();" class="btn btn-success">업로드</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/mobile/main/dashboard_teacher_task.js"></script>
