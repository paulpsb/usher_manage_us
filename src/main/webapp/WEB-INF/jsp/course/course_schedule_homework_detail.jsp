<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.section-drag {
	cursor: move;
	margin: auto;
	z-index: 995;
	text-align: center;
	filter: alpha(opacity=70);
	line-height: 20px;
	background-color: #AAC8E2;
	color:#000;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
	
}

.section-drog {
	margin: auto;
	margin-bottom:5px;
	z-index: 10;
	text-align: center;
	filter: alpha(opacity=70);
	line-height: 20px;
	background-color: #4cd964;
	color:#000;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
}

.section-value {
	margin: auto;
	margin-bottom:5px;
	z-index: 10;
	text-align: center;
	min-width:100px;
	filter: alpha(opacity=70);
	line-height: 20px;
	background-color: #ff2d55;
	color:#fff;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
}
</style>
<input type="hidden" id="course_id" value="${courseInfo.course_id}">
<input type="hidden" id="section" value="${courseInfo.section}">
<input type="hidden" id="course_name" value="${courseInfo.course_name}">
<input type="hidden" id="schedule" value="${courseInfo.schedule}">
<input type="hidden" id="cur_date" value="${courseInfo.cur_date}">
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-2">
			<h1 class="page-header" id="select_course_title">과제(개인별)</h1>
		</div>
		<div class="col-5 text-right">
			<h4>
				<span id="select_course_name"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_section">
				<option value="">섹션</option>
			</select>
		</div>	
		<div class="col-1">
			<select class="form-control" id="search_schedule">
			
			</select>
		</div>		
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-1">
			<button type="button" id="btn_save" class="btn btn-primary form-control" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">
						과제(개인별)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<button type="button" class="btn_select btn btn-default btn-sm" onClick="go_sylabus()">Syllabus</button>&nbsp;&nbsp;
						<button type="button" class="btn_select btn btn-default btn-sm" onClick="go_homework()">&nbsp;&nbsp;&nbsp;&nbsp;과제&nbsp;&nbsp;&nbsp;&nbsp;</button>&nbsp;&nbsp;
						<button type="button" class="btn_select btn btn-primary btn-sm" >과제(개인별)</button>
					</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-12">
							<h5>Actual Test와 SW19 교재의 경우는 한 문단이 5문장을 포함합니다.(<span class="text-red">주의해서 넣어주세요</span>)</h5>
							<p>Ex)
								<span class="text-red">1문단</span>: 1번~5번 문장,  
								<span class="text-red">2문단</span>: 6번~10번 문장,  
								<span class="text-red">3문단</span>: 11번~15번 문장,  
								<span class="text-red">4문단</span>: 16번~20번 문장,  
								<span class="text-red">5문단</span>: 21번~25번 문장,  
								<span class="text-red">6문단</span>: 26번~30번 문장,  
								<span class="text-red">7문단</span>: 31번~35번 문장,  
								<span class="text-red">8문단</span>: 36번~40번 문장  
							</p>
						</div>
					</div>
					<div class="row mb-3">
						<div class="col-8">
							<div class="table-responsive" id="div_schedule" style="overflow-y:auto;">
								<table class="table table-bordered m-b-0" id="scheduleTableList">
								
								</table>
							</div>
						</div>
						<div class="col-4">
							<div class="row mb-3">
								<div class="col-5">
									<select class="form-control" id="search_book">
									</select>
								</div>	
								<div class="col-5">
									<select class="form-control" id="search_volume">
									</select>
								</div>							
							</div>
							<div class="row mb-3" id="problemList">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>		
</div>
<div class="modal fade" id="select_courses" style="z-index:9999999;">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">반 선택</h4>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-3 text-right"><h4>년/월</h4></label>
					<div class="col-6">
						<select class="form-control" id="search_semester_id">
						</select>
					</div>
				</div>
				<div id="site_map">
				</div>
			</div>
			<div class="modal-footer" id="btn_cancel_course" style="display:none;">
				<a href="javascript:form_course_cancel();" class="btn btn-white">취소</a>
			</div>
		</div>
	</div>
</div>

<!-- end #content -->
<script type="text/javascript" src="/assets/plugins/redips-drag/redips-drag-min.js"></script>
<script type="text/javascript" src="/ui/course/course_schedule_homework_detail.js"></script>
