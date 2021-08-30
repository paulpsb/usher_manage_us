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
<input type="hidden" id="notice_schedule_id" value="${teacherInfo.notice_schedule_id}">
<input type="hidden" id="current_date" value="${teacherInfo.current_date}">
<input type="hidden" id="schedule_date" value="${teacherInfo.schedule_date}">
<input type="file"   id="image_file" accept="image/*" style="display:none;" onChange="load_image(this);">
<!-- begin #content -->
<div id="content" class="content" style="padding:0;">
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title" id="schedule_title"></h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-12 text-right">
							<button type="button" class="btn btn-primary" onclick="go_home()">홈으로</button>
						</div>
					</div>
					<div class="row mb-3">
						<div class="col-12">
							<div id="accordion" class="accordion">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-notice-schedule-file">
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
<script type="text/javascript" src="/ui/mobile/main/dashboard_teacher_schedule.js"></script>
